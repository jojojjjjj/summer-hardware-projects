"""
舵机控制模块
Servo Control Module

功能：
1. 管理 6 个舵机的角度控制
2. 构造 I2C 命令数据包
3. 实现平滑运动（含缓动函数）
4. 正向运动学计算（关节角 -> 末端位置）
5. 紧急停止

Features:
1. Manage angle control for 6 servos
2. Construct I2C command packets
3. Implement smooth motion with easing functions
4. Forward kinematics calculation (joint angles -> end-effector position)
5. Emergency stop
"""

import time
import math
import logging
from typing import List, Dict, Optional, Tuple

from utils import clamp, lerp, ease_in_out, angle_to_radians, angle_to_degrees


logger = logging.getLogger('electronbot.servo')


class ServoController:
    """
    舵机控制器
    Servo Controller

    管理 6 个舵机，提供角度设置、平滑运动和运动学计算功能。
    Manages 6 servos with angle setting, smooth motion, and kinematics.

    舵机布局 | Servo layout:
        0: head_yaw    - 头部偏航 | Head yaw
        1: head_pitch  - 头部俯仰 | Head pitch
        2: left_arm    - 左臂 | Left arm
        3: right_arm   - 右臂 | Right arm
        4: body_yaw    - 躯干偏航 | Body yaw
        5: body_pitch  - 躯干俯仰 | Body pitch
    """

    # 舵机数量 | Number of servos
    NUM_SERVOS = 6

    # I2C 命令字 | I2C command bytes
    CMD_SET_ANGLE = 0x01
    CMD_SET_ALL = 0x02
    CMD_GET_ANGLE = 0x03
    CMD_EMERGENCY_STOP = 0xFF

    def __init__(self, bridge, servo_configs: List[Dict]):
        """
        初始化舵机控制器
        Initialize servo controller

        Args:
            bridge: USBBridge 实例（用于发送命令）
            servo_configs: 舵机配置列表，每项包含 id, name, min_angle, max_angle, offset, pid_p/i/d
        """
        self.bridge = bridge
        self.current_angles = [0.0] * self.NUM_SERVOS
        self.target_angles = [0.0] * self.NUM_SERVOS

        # 舵机参数表 | Servo parameter table
        self.servo_params = {}
        for cfg in servo_configs:
            sid = cfg.get('id', 0)
            self.servo_params[sid] = {
                'name': cfg.get('name', f'servo_{sid}'),
                'min_angle': cfg.get('min_angle', -90),
                'max_angle': cfg.get('max_angle', 90),
                'offset': cfg.get('offset', 0),
                'pid_p': cfg.get('pid_p', 1.0),
                'pid_i': cfg.get('pid_i', 0.01),
                'pid_d': cfg.get('pid_d', 0.3),
            }

        logger.info(f"舵机控制器初始化完成，共 {len(self.servo_params)} 个舵机")
        logger.info(f"Servo controller initialized with {len(self.servo_params)} servos")

    def set_angle(self, servo_id: int, angle: float, smooth: bool = False,
                  duration: float = 0.3) -> None:
        """
        设置单个舵机角度
        Set angle for a single servo

        Args:
            servo_id: 舵机 ID (0-5)
            angle: 目标角度 (度)
            smooth: 是否使用平滑运动 | Whether to use smooth motion
            duration: 平滑运动持续时间 (秒) | Smooth motion duration (seconds)
        """
        if not self._validate_servo_id(servo_id):
            return

        # 应用偏移并钳位 | Apply offset and clamp
        params = self.servo_params[servo_id]
        adjusted_angle = angle + params['offset']
        clamped_angle = clamp(
            adjusted_angle,
            params['min_angle'],
            params['max_angle']
        )

        self.target_angles[servo_id] = clamped_angle

        if smooth:
            self._smooth_move(servo_id, clamped_angle, duration)
        else:
            self.current_angles[servo_id] = clamped_angle
            self._send_servo_command(servo_id, clamped_angle)

        logger.debug(f"舵机 {servo_id} ({params['name']}): "
                     f"{angle} -> {clamped_angle} deg")

    def get_angle(self, servo_id: int) -> Optional[float]:
        """
        获取舵机当前角度
        Get current servo angle

        Args:
            servo_id: 舵机 ID (0-5)

        Returns:
            当前角度 (度)，如果 servo_id 无效则返回 None
        """
        if not self._validate_servo_id(servo_id):
            return None
        return self.current_angles[servo_id]

    def set_all(self, positions: List[float], smooth: bool = False,
                duration: float = 0.5) -> None:
        """
        同时设置所有舵机角度
        Set angles for all servos simultaneously

        Args:
            positions: 6 个舵机的目标角度列表
            smooth: 是否使用平滑运动
            duration: 平滑运动持续时间 (秒)
        """
        if len(positions) != self.NUM_SERVOS:
            logger.error(f"需要 {self.NUM_SERVOS} 个角度值，收到 {len(positions)}")
            return

        for i, angle in enumerate(positions):
            self.target_angles[i] = angle

        if smooth:
            self._smooth_move_all(positions, duration)
        else:
            for i, angle in enumerate(positions):
                self.current_angles[i] = angle
            self._send_all_servos_command(positions)

        logger.debug(f"所有舵机设置为 | All servos set to: {positions}")

    def emergency_stop(self) -> None:
        """
        紧急停止所有舵机
        Emergency stop all servos
        """
        logger.warning("紧急停止！ | Emergency stop!")

        # 发送紧急停止命令 | Send emergency stop command
        if self.bridge and self.bridge.is_connected:
            try:
                self.bridge.send_command(
                    cmd=self.CMD_EMERGENCY_STOP,
                    data=bytes([0x00])
                )
            except Exception as e:
                logger.error(f"发送紧急停止命令失败 | Emergency stop send failed: {e}")

        # 清零目标角度 | Clear target angles
        self.target_angles = [0.0] * self.NUM_SERVOS

    def forward_kinematics(self, angles: Optional[List[float]] = None) -> Dict[str, Tuple[float, float, float]]:
        """
        正向运动学计算：从关节角度计算末端执行器位置
        Forward kinematics: compute end-effector positions from joint angles

        简化模型，使用 DH 参数法计算头部和双手的位置。
        Simplified model using DH parameters for head and hand positions.

        Args:
            angles: 关节角度列表 (度)，None 则使用当前角度

        Returns:
            字典，包含各末端的位置 (x, y, z) 坐标 (mm)
        """
        if angles is None:
            angles = self.current_angles

        if len(angles) < self.NUM_SERVOS:
            logger.error(f"运动学计算需要 {self.NUM_SERVOS} 个角度")
            return {}

        # 角度转弧度 | Convert degrees to radians
        a = [angle_to_radians(deg) for deg in angles]

        # --- 链接长度参数 (mm) | Link length parameters (mm) ---
        BODY_HEIGHT = 80.0      # 躯干高度 | Body height
        NECK_LENGTH = 20.0      # 颈部长度 | Neck length
        HEAD_RADIUS = 30.0      # 头部半径 | Head radius
        ARM_LENGTH = 50.0       # 臂长 | Arm length
        ARM_OFFSET = 25.0       # 臂部横向偏移 | Arm lateral offset

        # 躯干旋转后的基座 | Body-rotated base
        body_yaw = a[4]
        body_pitch = a[5]
        cos_by = math.cos(body_yaw)
        sin_by = math.sin(body_yaw)
        cos_bp = math.cos(body_pitch)
        sin_bp = math.sin(body_pitch)

        # 头部位置计算 | Head position calculation
        # 颈部偏移 + 头部偏航/俯仰
        head_x = NECK_LENGTH * sin_by * cos_bp + HEAD_RADIUS * math.sin(a[0]) * cos(a[1])
        head_y = BODY_HEIGHT + NECK_LENGTH * cos_by * cos_bp + HEAD_RADIUS * math.sin(a[1])
        head_z = NECK_LENGTH * sin_bp + HEAD_RADIUS * math.cos(a[0]) * math.cos(a[1])

        # 左臂位置计算 | Left arm position calculation
        left_arm_angle = a[2]
        left_x = -ARM_OFFSET * cos_by + ARM_LENGTH * math.sin(left_arm_angle) * cos_by
        left_y = BODY_HEIGHT * 0.7 + ARM_LENGTH * math.cos(left_arm_angle)
        left_z = ARM_OFFSET * sin_by - ARM_LENGTH * math.sin(left_arm_angle) * sin_by

        # 右臂位置计算 | Right arm position calculation
        right_arm_angle = a[3]
        right_x = ARM_OFFSET * cos_by + ARM_LENGTH * math.sin(right_arm_angle) * cos_by
        right_y = BODY_HEIGHT * 0.7 + ARM_LENGTH * math.cos(right_arm_angle)
        right_z = -ARM_OFFSET * sin_by - ARM_LENGTH * math.sin(right_arm_angle) * sin_by

        result = {
            'head': (head_x, head_y, head_z),
            'left_hand': (left_x, left_y, left_z),
            'right_hand': (right_x, right_y, right_z),
        }

        logger.debug(f"正向运动学 | FK: {result}")
        return result

    # ---- 内部方法 | Internal methods ----

    def _validate_servo_id(self, servo_id: int) -> bool:
        """
        验证舵机 ID 是否有效
        Validate servo ID

        Args:
            servo_id: 舵机 ID

        Returns:
            bool: 是否有效
        """
        if 0 <= servo_id < self.NUM_SERVOS:
            return True
        logger.error(f"无效的舵机 ID: {servo_id} (有效范围 0-{self.NUM_SERVOS - 1})")
        return False

    def _send_servo_command(self, servo_id: int, angle: float) -> None:
        """
        发送单个舵机控制命令
        Send single servo control command

        Args:
            servo_id: 舵机 ID
            angle: 角度 (度)
        """
        if not self.bridge or not self.bridge.is_connected:
            return

        # 构造命令数据包 | Build command packet
        # 格式: [servo_id(1B), angle_high(1B), angle_low(1B)]
        # 角度放大 10 倍以保留 0.1 度精度，转为无符号整数 (0-3600)
        angle_int = int((angle + 180.0) * 10)  # 映射 -180~180 到 0~3600
        angle_int = clamp(angle_int, 0, 3600)

        data = bytes([
            servo_id & 0xFF,
            (angle_int >> 8) & 0xFF,  # 高字节 | High byte
            angle_int & 0xFF,          # 低字节 | Low byte
        ])

        try:
            self.bridge.send_command(cmd=self.CMD_SET_ANGLE, data=data)
        except Exception as e:
            logger.error(f"发送舵机命令失败 | Servo command send failed: {e}")

    def _send_all_servos_command(self, positions: List[float]) -> None:
        """
        发送所有舵机控制命令
        Send all-servo control command

        Args:
            positions: 6 个舵机的角度列表
        """
        if not self.bridge or not self.bridge.is_connected:
            return

        # 构造数据包: 6 * 2 字节 (每个角度 2 字节)
        # Build packet: 6 * 2 bytes (2 bytes per angle)
        data = bytearray()
        for angle in positions:
            angle_int = int((angle + 180.0) * 10)
            angle_int = clamp(angle_int, 0, 3600)
            data.append((angle_int >> 8) & 0xFF)
            data.append(angle_int & 0xFF)

        try:
            self.bridge.send_command(cmd=self.CMD_SET_ALL, data=bytes(data))
        except Exception as e:
            logger.error(f"发送批量舵机命令失败 | Batch servo command send failed: {e}")

    def _smooth_move(self, servo_id: int, target: float, duration: float) -> None:
        """
        单个舵机平滑移动
        Smooth move for a single servo

        Args:
            servo_id: 舵机 ID
            target: 目标角度 (度)
            duration: 运动持续时间 (秒)
        """
        start = self.current_angles[servo_id]
        steps = max(int(duration / 0.02), 1)  # 50Hz 更新率 | 50Hz update rate
        dt = duration / steps

        for i in range(steps + 1):
            t = i / steps
            eased_t = ease_in_out(t)
            angle = lerp(start, target, eased_t)
            self.current_angles[servo_id] = angle
            self._send_servo_command(servo_id, angle)
            time.sleep(dt)

    def _smooth_move_all(self, targets: List[float], duration: float) -> None:
        """
        所有舵机同步平滑移动
        Synchronized smooth move for all servos

        Args:
            targets: 目标角度列表
            duration: 运动持续时间 (秒)
        """
        starts = self.current_angles.copy()
        steps = max(int(duration / 0.02), 1)
        dt = duration / steps

        for i in range(steps + 1):
            t = i / steps
            eased_t = ease_in_out(t)
            current = [lerp(starts[j], targets[j], eased_t) for j in range(self.NUM_SERVOS)]
            self.current_angles = current
            self._send_all_servos_command(current)
            time.sleep(dt)
