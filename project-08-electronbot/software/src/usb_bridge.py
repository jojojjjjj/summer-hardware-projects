"""
USB CDC 通信桥接模块
USB CDC Communication Bridge Module

功能：
1. PC 与 STM32 之间的 USB CDC 虚拟串口通信
2. 命令发送与响应接收
3. 数据包格式：header + command + length + data + checksum
4. 支持的命令类型：SERVO_CTRL, DISPLAY_IMG, SET_EXPRESSION, GET_SENSOR, PING
5. 线程安全的异步接收队列

Features:
1. USB CDC virtual serial communication between PC and STM32
2. Command sending and response receiving
3. Packet format: header + command + length + data + checksum
4. Supported commands: SERVO_CTRL, DISPLAY_IMG, SET_EXPRESSION, GET_SENSOR, PING
5. Thread-safe asynchronous receive queue
"""

import time
import struct
import logging
import threading
from queue import Queue, Empty
from typing import Optional, Dict, Any

from utils import calculate_checksum


logger = logging.getLogger('electronbot.usb')


class USBBridge:
    """
    USB CDC 通信桥接
    USB CDC Communication Bridge

    负责 PC 端与 STM32 之间的所有 USB 通信。
    负责所有数据包的封包和解包。
    Handles all USB communication between PC and STM32.
    Handles packet framing and de-framing.
    """

    # 数据包格式常量 | Packet format constants
    HEADER_BYTE = 0xAA           # 帧头 | Frame header
    FOOTER_BYTE = 0x55           # 帧尾 | Frame footer
    MAX_PACKET_SIZE = 1024       # 最大数据包大小 (字节) | Max packet size (bytes)

    # 命令类型 | Command types
    CMD_SERVO_CTRL = 0x01        # 舵机控制 | Servo control
    CMD_DISPLAY_IMG = 0x10       # 显示图像 | Display image
    CMD_SET_EXPRESSION = 0x11    # 设置表情 | Set expression
    CMD_GET_SENSOR = 0x20        # 获取传感器数据 | Get sensor data
    CMD_PING = 0xFF              # 心跳/连通测试 | Heartbeat/connectivity test

    # 响应类型 | Response types
    RESP_ACK = 0x01              # 确认 | Acknowledge
    RESP_NACK = 0x02             # 否认 | Negative acknowledge
    RESP_SENSOR_DATA = 0x20      # 传感器数据 | Sensor data
    RESP_PONG = 0xFE             # 心跳回复 | Heartbeat reply

    def __init__(self, port: str = "COM3", baudrate: int = 115200, timeout: float = 2.0):
        """
        初始化 USB 桥接
        Initialize USB bridge

        Args:
            port: 串口号 | Serial port
            baudrate: 波特率 | Baud rate
            timeout: 读取超时 (秒) | Read timeout (seconds)
        """
        self.port = port
        self.baudrate = baudrate
        self.timeout = timeout

        self._serial = None
        self.is_connected = False

        # 异步接收 | Async receive
        self._rx_queue: Queue = Queue()
        self._rx_thread: Optional[threading.Thread] = None
        self._running = False

        # 接收缓冲区 | Receive buffer
        self._rx_buffer = bytearray()

        logger.info(f"USB 桥接初始化 | USB bridge initialized: {port} @ {baudrate}")

    def connect(self) -> bool:
        """
        连接 USB 设备
        Connect to USB device

        Returns:
            bool: 是否连接成功
        """
        try:
            import serial
            self._serial = serial.Serial(
                port=self.port,
                baudrate=self.baudrate,
                timeout=self.timeout,
            )
            self.is_connected = True

            # 启动异步接收线程 | Start async receive thread
            self._running = True
            self._rx_thread = threading.Thread(target=self._receive_loop, daemon=True)
            self._rx_thread.start()

            # 发送 PING 验证连通性 | Send PING to verify connectivity
            time.sleep(0.5)  # 等待设备就绪 | Wait for device ready
            if self.ping():
                logger.info(f"USB 设备连接成功 | USB device connected: {self.port}")
                return True
            else:
                logger.warning("PING 无响应，但连接已建立 | No PING response, but connection established")
                return True

        except ImportError:
            logger.error("pyserial 未安装，无法使用 USB 通信 | pyserial not installed")
            return False
        except Exception as e:
            logger.error(f"USB 连接失败 | USB connection failed: {e}")
            self.is_connected = False
            return False

    def disconnect(self) -> None:
        """
        断开 USB 连接
        Disconnect USB device
        """
        self._running = False
        self.is_connected = False

        if self._rx_thread and self._rx_thread.is_alive():
            self._rx_thread.join(timeout=2.0)

        if self._serial and self._serial.is_open:
            try:
                self._serial.close()
            except Exception as e:
                logger.warning(f"关闭串口时出错 | Error closing serial port: {e}")

        logger.info("USB 设备已断开 | USB device disconnected")

    def send_command(self, cmd: int, data: bytes = b'') -> bool:
        """
        发送命令到 STM32
        Send command to STM32

        数据包格式 | Packet format:
            [0xAA] [cmd] [length_high] [length_low] [data...] [checksum] [0x55]
            - 0xAA: 帧头 (1 byte)
            - cmd: 命令类型 (1 byte)
            - length: 数据长度 (2 bytes, big-endian)
            - data: 有效载荷 (0~MAX_PACKET_SIZE bytes)
            - checksum: 所有前述字节的异或和 (1 byte)
            - 0x55: 帧尾 (1 byte)

        Args:
            cmd: 命令类型 (1 byte)
            data: 命令数据

        Returns:
            bool: 是否发送成功
        """
        if not self.is_connected or not self._serial:
            logger.warning("USB 未连接，无法发送 | USB not connected, cannot send")
            return False

        if len(data) > self.MAX_PACKET_SIZE:
            logger.error(f"数据包过大 | Packet too large: {len(data)} > {self.MAX_PACKET_SIZE}")
            return False

        # 构造数据包 | Build packet
        packet = self._build_packet(cmd, data)

        try:
            self._serial.write(packet)
            self._serial.flush()
            logger.debug(f"发送命令 | Sent: cmd=0x{cmd:02X}, len={len(data)}")
            return True
        except Exception as e:
            logger.error(f"发送失败 | Send failed: {e}")
            self.is_connected = False
            return False

    def receive_response(self, timeout: float = 2.0) -> Optional[Dict[str, Any]]:
        """
        接收 STM32 的响应
        Receive response from STM32

        Args:
            timeout: 接收超时 (秒)

        Returns:
            响应字典 {'cmd': int, 'data': bytes} 或 None
        """
        try:
            response = self._rx_queue.get(timeout=timeout)
            return response
        except Empty:
            return None

    def ping(self) -> bool:
        """
        发送 PING 命令测试连通性
        Send PING command to test connectivity

        Returns:
            bool: 是否收到 PONG 响应
        """
        if not self.send_command(cmd=self.CMD_PING, data=b'\x00'):
            return False

        # 等待 PONG 响应 | Wait for PONG response
        response = self.receive_response(timeout=1.0)
        if response and response.get('cmd') == self.RESP_PONG:
            logger.debug("PING-PONG 成功 | PING-PONG success")
            return True
        return False

    def build_packet_static(self, cmd: int, data: bytes = b'') -> bytes:
        """
        静态方法：构造数据包（供测试使用）
        Static method: build a packet (for testing purposes)

        Args:
            cmd: 命令类型
            data: 有效载荷

        Returns:
            完整的数据包字节串
        """
        return self._build_packet(cmd, data)

    # ---- 内部方法 | Internal methods ----

    def _build_packet(self, cmd: int, data: bytes = b'') -> bytes:
        """
        构造数据包
        Build packet

        Args:
            cmd: 命令类型
            data: 有效载荷

        Returns:
            完整的数据包字节串
        """
        length = len(data)
        # 帧头 + 命令 + 长度(2B) + 数据 + 校验和 + 帧尾
        # Header + cmd + length(2B) + data + checksum + footer
        header = bytes([self.HEADER_BYTE, cmd, (length >> 8) & 0xFF, length & 0xFF])
        footer = bytes([self.FOOTER_BYTE])

        # 计算校验和 | Calculate checksum
        checksum_input = header + data
        chk = calculate_checksum(checksum_input)

        return header + data + bytes([chk]) + footer

    def _receive_loop(self) -> None:
        """
        异步接收循环（在独立线程中运行）
        Async receive loop (runs in a separate thread)

        持续从串口读取数据，解析完整的数据包后放入接收队列。
        Continuously reads from serial port, parses complete packets,
        and places them in the receive queue.
        """
        logger.debug("接收线程启动 | Receive thread started")

        while self._running and self._serial:
            try:
                # 读取可用数据 | Read available data
                if self._serial.in_waiting > 0:
                    chunk = self._serial.read(self._serial.in_waiting)
                    self._rx_buffer.extend(chunk)
                else:
                    time.sleep(0.005)  # 5ms 等待 | 5ms wait
                    continue

                # 尝试解析完整的数据包 | Try to parse complete packets
                while len(self._rx_buffer) >= 6:  # 最小包长 | Min packet length
                    parsed = self._try_parse_packet()
                    if parsed is None:
                        break
                    self._rx_queue.put(parsed)

            except Exception as e:
                if self._running:
                    logger.error(f"接收错误 | Receive error: {e}")
                break

        logger.debug("接收线程退出 | Receive thread exited")

    def _try_parse_packet(self) -> Optional[Dict[str, Any]]:
        """
        尝试从缓冲区解析一个完整的数据包
        Try to parse one complete packet from the buffer

        Returns:
            解析后的响应字典或 None
        """
        buf = self._rx_buffer

        # 查找帧头 | Find header
        if buf[0] != self.HEADER_BYTE:
            # 丢弃无效字节 | Discard invalid bytes
            del buf[0]
            return None

        # 检查是否有足够的数据读取长度字段
        # Check if enough data to read length field
        if len(buf) < 4:
            return None

        cmd = buf[1]
        length = (buf[2] << 8) | buf[3]

        # 检查数据包是否完整 (header + cmd + length + data + checksum + footer)
        # Check if packet is complete
        total_length = 4 + length + 2  # 4(header+cmd+len) + data + 2(checksum+footer)
        if len(buf) < total_length:
            return None

        # 提取数据和校验和 | Extract data and checksum
        data = bytes(buf[4:4 + length])
        received_checksum = buf[4 + length]
        footer = buf[4 + length + 1]

        # 验证帧尾 | Verify footer
        if footer != self.FOOTER_BYTE:
            logger.warning(f"帧尾错误 | Footer error: 0x{footer:02X}")
            del buf[0]
            return None

        # 验证校验和 | Verify checksum
        checksum_input = bytes(buf[0:4 + length])
        expected_checksum = calculate_checksum(checksum_input)
        if received_checksum != expected_checksum:
            logger.warning(f"校验和错误 | Checksum error: "
                           f"got 0x{received_checksum:02X}, expected 0x{expected_checksum:02X}")
            del buf[0:total_length]
            return None

        # 从缓冲区移除已解析的数据包 | Remove parsed packet from buffer
        del buf[0:total_length]

        return {
            'cmd': cmd,
            'data': data,
        }
