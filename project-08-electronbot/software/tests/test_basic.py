"""
基础测试模块
Basic Test Module

功能：测试 ElectronBot PC 端工具函数、舵机命令、表情状态机、USB 数据包格式、运动学计算
Features: Test ElectronBot PC-side utilities, servo commands, expression state machine,
          USB packet format, and kinematics calculations
"""

import sys
import os
import unittest
import math

# 添加源代码目录到路径 | Add source directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from utils import (
    angle_to_radians, angle_to_degrees, clamp, lerp,
    ease_in_out, map_range, calculate_checksum, load_config,
)
from usb_bridge import USBBridge
from servo_controller import ServoController
from expression_engine import ExpressionEngine, ExpressionState, Expression


class TestAngleConversion(unittest.TestCase):
    """
    角度转换测试
    Angle Conversion Tests
    """

    def test_degrees_to_radians_zero(self):
        """测试 0 度转换 | Test 0-degree conversion"""
        self.assertAlmostEqual(angle_to_radians(0), 0.0)

    def test_degrees_to_radians_90(self):
        """测试 90 度转换 | Test 90-degree conversion"""
        self.assertAlmostEqual(angle_to_radians(90), math.pi / 2)

    def test_degrees_to_radians_180(self):
        """测试 180 度转换 | Test 180-degree conversion"""
        self.assertAlmostEqual(angle_to_radians(180), math.pi)

    def test_degrees_to_radians_negative(self):
        """测试负角度转换 | Test negative angle conversion"""
        self.assertAlmostEqual(angle_to_radians(-45), -math.pi / 4)

    def test_radians_to_degrees_zero(self):
        """测试 0 弧度转换 | Test 0-radian conversion"""
        self.assertAlmostEqual(angle_to_degrees(0), 0.0)

    def test_radians_to_degrees_pi(self):
        """测试 pi 弧度转换 | Test pi radian conversion"""
        self.assertAlmostEqual(angle_to_degrees(math.pi), 180.0)

    def test_round_trip(self):
        """测试度 -> 弧度 -> 度的往返转换 | Test degree -> radian -> degree round trip"""
        for deg in [-180, -90, -45, 0, 30, 45, 90, 180]:
            result = angle_to_degrees(angle_to_radians(deg))
            self.assertAlmostEqual(result, deg, places=10)


class TestClamp(unittest.TestCase):
    """
    钳位函数测试
    Clamp Function Tests
    """

    def test_within_range(self):
        """值在范围内 | Value within range"""
        self.assertEqual(clamp(5, 0, 10), 5)

    def test_below_min(self):
        """值低于最小值 | Value below minimum"""
        self.assertEqual(clamp(-5, 0, 10), 0)

    def test_above_max(self):
        """值高于最大值 | Value above maximum"""
        self.assertEqual(clamp(15, 0, 10), 10)

    def test_at_boundary(self):
        """值在边界上 | Value at boundary"""
        self.assertEqual(clamp(0, 0, 10), 0)
        self.assertEqual(clamp(10, 0, 10), 10)

    def test_float_values(self):
        """浮点数值 | Float values"""
        self.assertAlmostEqual(clamp(0.5, 0.0, 1.0), 0.5)


class TestLerp(unittest.TestCase):
    """
    线性插值测试
    Linear Interpolation Tests
    """

    def test_at_start(self):
        """t=0 时返回起始值 | Returns start at t=0"""
        self.assertAlmostEqual(lerp(10, 20, 0), 10)

    def test_at_end(self):
        """t=1 时返回终止值 | Returns end at t=1"""
        self.assertAlmostEqual(lerp(10, 20, 1), 20)

    def test_at_middle(self):
        """t=0.5 时返回中间值 | Returns midpoint at t=0.5"""
        self.assertAlmostEqual(lerp(0, 100, 0.5), 50)

    def test_negative_range(self):
        """负范围插值 | Negative range interpolation"""
        self.assertAlmostEqual(lerp(-90, 90, 0.5), 0)


class TestEaseInOut(unittest.TestCase):
    """
    缓动函数测试
    Easing Function Tests
    """

    def test_at_zero(self):
        """t=0 时返回 0 | Returns 0 at t=0"""
        self.assertAlmostEqual(ease_in_out(0), 0)

    def test_at_one(self):
        """t=1 时返回 1 | Returns 1 at t=1"""
        self.assertAlmostEqual(ease_in_out(1), 1)

    def test_at_half(self):
        """t=0.5 时返回 0.5 | Returns 0.5 at t=0.5"""
        self.assertAlmostEqual(ease_in_out(0.5), 0.5)

    def test_monotonic(self):
        """缓动函数单调递增 | Easing function is monotonically increasing"""
        prev = 0.0
        for i in range(1, 101):
            t = i / 100.0
            val = ease_in_out(t)
            self.assertGreaterEqual(val, prev)
            prev = val

    def test_clamped_input(self):
        """超出范围的输入被钳位 | Out-of-range input is clamped"""
        self.assertAlmostEqual(ease_in_out(-1.0), 0.0)
        self.assertAlmostEqual(ease_in_out(2.0), 1.0)


class TestMapRange(unittest.TestCase):
    """
    值域映射测试
    Value Range Mapping Tests
    """

    def test_middle(self):
        """中间值映射 | Midpoint mapping"""
        self.assertAlmostEqual(map_range(0.5, 0, 1, -90, 90), 0)

    def test_start(self):
        """起始值映射 | Start value mapping"""
        self.assertAlmostEqual(map_range(0, 0, 1, -90, 90), -90)

    def test_end(self):
        """终止值映射 | End value mapping"""
        self.assertAlmostEqual(map_range(1, 0, 1, -90, 90), 90)

    def test_quarter(self):
        """四分之一映射 | Quarter mapping"""
        self.assertAlmostEqual(map_range(0.25, 0, 1, -90, 90), -45)


class TestChecksum(unittest.TestCase):
    """
    校验和计算测试
    Checksum Calculation Tests
    """

    def test_empty_data(self):
        """空数据校验和为 0 | Empty data checksum is 0"""
        self.assertEqual(calculate_checksum(b''), 0)

    def test_single_byte(self):
        """单字节数据 | Single byte data"""
        self.assertEqual(calculate_checksum(bytes([0xAA])), 0xAA)

    def test_known_pattern(self):
        """已知模式测试 | Known pattern test"""
        # 0xAA ^ 0x01 = 0xAB
        self.assertEqual(calculate_checksum(bytes([0xAA, 0x01])), 0xAB)

    def test_xor_identity(self):
        """相同字节异或为 0 | XOR of identical bytes is 0"""
        self.assertEqual(calculate_checksum(bytes([0x55, 0x55])), 0)

    def test_packet_header(self):
        """测试典型数据包头的校验和 | Test typical packet header checksum"""
        # 帧头 0xAA + 命令 0x01 + 长度 0x0003
        data = bytes([0xAA, 0x01, 0x00, 0x03])
        expected = 0xAA ^ 0x01 ^ 0x00 ^ 0x03
        self.assertEqual(calculate_checksum(data), expected)


class TestUSBPacketFormat(unittest.TestCase):
    """
    USB 数据包格式测试
    USB Packet Format Tests
    """

    def setUp(self):
        """创建 USBBridge 实例（不连接） | Create USBBridge instance (not connected)"""
        self.bridge = USBBridge(port="COM_TEST", baudrate=115200)

    def test_packet_structure_ping(self):
        """
        测试 PING 命令数据包结构
        Test PING command packet structure

        期望格式: [0xAA] [0xFF] [0x00] [0x01] [0x00] [checksum] [0x55]
        """
        packet = self.bridge.build_packet_static(cmd=0xFF, data=b'\x00')

        # 检查帧头和帧尾 | Check header and footer
        self.assertEqual(packet[0], 0xAA)       # 帧头 | Header
        self.assertEqual(packet[1], 0xFF)       # 命令 PING | PING command
        self.assertEqual(packet[-1], 0x55)      # 帧尾 | Footer

        # 检查长度字段 (big-endian) | Check length field
        length = (packet[2] << 8) | packet[3]
        self.assertEqual(length, 1)             # 数据长度 1 字节

        # 检查数据 | Check data
        self.assertEqual(packet[4], 0x00)

    def test_packet_structure_no_data(self):
        """
        测试无数据的命令数据包
        Test command packet with no data

        期望格式: [0xAA] [cmd] [0x00] [0x00] [checksum] [0x55]
        """
        packet = self.bridge.build_packet_static(cmd=0x01, data=b'')

        self.assertEqual(packet[0], 0xAA)
        self.assertEqual(packet[1], 0x01)
        length = (packet[2] << 8) | packet[3]
        self.assertEqual(length, 0)
        self.assertEqual(packet[-1], 0x55)

    def test_packet_structure_multi_byte_data(self):
        """
        测试多字节数据的数据包
        Test packet with multi-byte data
        """
        data = bytes([0x10, 0x20, 0x30, 0x40])
        packet = self.bridge.build_packet_static(cmd=0x10, data=data)

        self.assertEqual(packet[0], 0xAA)
        self.assertEqual(packet[1], 0x10)
        length = (packet[2] << 8) | packet[3]
        self.assertEqual(length, 4)

        # 验证数据部分 | Verify data portion
        self.assertEqual(packet[4:8], data)
        self.assertEqual(packet[-1], 0x55)

    def test_packet_checksum_correctness(self):
        """
        测试校验和正确性
        Test checksum correctness in packet
        """
        packet = self.bridge.build_packet_static(cmd=0x01, data=bytes([0x42]))

        # 手动计算校验和 | Manually calculate checksum
        header_and_data = packet[:5]  # header(1) + cmd(1) + length(2) + data(1)
        expected_checksum = calculate_checksum(header_and_data)

        # 数据包中校验和位于倒数第二个字节 | Checksum is second-to-last byte
        actual_checksum = packet[-2]
        self.assertEqual(actual_checksum, expected_checksum)


class TestServoCommandPacket(unittest.TestCase):
    """
    舵机命令数据包构造测试
    Servo Command Packet Construction Tests
    """

    def setUp(self):
        """创建舵机控制器 | Create servo controller"""
        # 使用 None 作为 bridge（离线模式） | Use None as bridge (offline mode)
        self.ctrl = ServoController(
            bridge=None,
            servo_configs=[
                {'id': 0, 'name': 'head_yaw', 'min_angle': -90, 'max_angle': 90,
                 'offset': 0, 'pid_p': 1.2, 'pid_i': 0.02, 'pid_d': 0.5},
                {'id': 1, 'name': 'head_pitch', 'min_angle': -45, 'max_angle': 45,
                 'offset': 0, 'pid_p': 1.0, 'pid_i': 0.01, 'pid_d': 0.4},
            ]
        )

    def test_angle_set_and_get(self):
        """测试角度设置和获取 | Test angle set and get"""
        self.ctrl.set_angle(0, 45)
        self.assertAlmostEqual(self.ctrl.get_angle(0), 45.0)

    def test_angle_clamping(self):
        """测试角度钳位 | Test angle clamping"""
        self.ctrl.set_angle(0, 150)  # 超过最大值 90
        self.assertAlmostEqual(self.ctrl.get_angle(0), 90.0)

        self.ctrl.set_angle(0, -150)  # 低于最小值 -90
        self.assertAlmostEqual(self.ctrl.get_angle(0), -90.0)

    def test_offset_applied(self):
        """测试偏移应用 | Test offset application"""
        ctrl_offset = ServoController(
            bridge=None,
            servo_configs=[
                {'id': 0, 'name': 'test', 'min_angle': -90, 'max_angle': 90,
                 'offset': 10, 'pid_p': 1.0, 'pid_i': 0.01, 'pid_d': 0.3},
            ]
        )
        # 设置角度 0，加上偏移 10 后实际角度为 10
        # Set angle 0, with offset 10, actual angle is 10
        ctrl_offset.set_angle(0, 0)
        self.assertAlmostEqual(ctrl_offset.get_angle(0), 10.0)

    def test_invalid_servo_id(self):
        """测试无效舵机 ID | Test invalid servo ID"""
        self.ctrl.set_angle(10, 45)   # 无效 ID，应该静默失败 | Invalid ID, should silently fail
        self.assertIsNone(self.ctrl.get_angle(10))

    def test_set_all(self):
        """测试设置所有舵机角度 | Test setting all servo angles"""
        angles = [30, -20, 0, 0, 0, 0]
        self.ctrl.set_all(angles)
        self.assertAlmostEqual(self.ctrl.get_angle(0), 30.0)
        self.assertAlmostEqual(self.ctrl.get_angle(1), -20.0)

    def test_emergency_stop(self):
        """测试紧急停止 | Test emergency stop"""
        self.ctrl.set_angle(0, 45)
        self.ctrl.emergency_stop()
        # 紧急停止后目标角度应清零 | Target angles should be zeroed
        for i in range(6):
            self.assertAlmostEqual(self.ctrl.target_angles[i], 0.0)


class TestKinematics(unittest.TestCase):
    """
    运动学计算测试
    Kinematics Calculation Tests
    """

    def setUp(self):
        """创建舵机控制器 | Create servo controller"""
        self.ctrl = ServoController(
            bridge=None,
            servo_configs=[
                {'id': 0, 'name': 'head_yaw', 'min_angle': -90, 'max_angle': 90,
                 'offset': 0, 'pid_p': 1.0, 'pid_i': 0.01, 'pid_d': 0.3},
                {'id': 1, 'name': 'head_pitch', 'min_angle': -45, 'max_angle': 45,
                 'offset': 0, 'pid_p': 1.0, 'pid_i': 0.01, 'pid_d': 0.3},
                {'id': 2, 'name': 'left_arm', 'min_angle': -90, 'max_angle': 90,
                 'offset': 0, 'pid_p': 1.0, 'pid_i': 0.01, 'pid_d': 0.3},
                {'id': 3, 'name': 'right_arm', 'min_angle': -90, 'max_angle': 90,
                 'offset': 0, 'pid_p': 1.0, 'pid_i': 0.01, 'pid_d': 0.3},
                {'id': 4, 'name': 'body_yaw', 'min_angle': -30, 'max_angle': 30,
                 'offset': 0, 'pid_p': 1.0, 'pid_i': 0.01, 'pid_d': 0.3},
                {'id': 5, 'name': 'body_pitch', 'min_angle': -20, 'max_angle': 20,
                 'offset': 0, 'pid_p': 1.0, 'pid_i': 0.01, 'pid_d': 0.3},
            ]
        )

    def test_zero_angles(self):
        """
        测试零角度时的正向运动学
        Test forward kinematics at zero angles
        """
        result = self.ctrl.forward_kinematics([0, 0, 0, 0, 0, 0])
        self.assertIn('head', result)
        self.assertIn('left_hand', result)
        self.assertIn('right_hand', result)

        # 在零角度时，头部应该在身体上方 | At zero angles, head should be above body
        head = result['head']
        self.assertGreater(head[1], 0)  # y > 0

    def test_output_structure(self):
        """
        测试输出结构正确性
        Test output structure correctness
        """
        result = self.ctrl.forward_kinematics([0, 0, 0, 0, 0, 0])
        for key in ['head', 'left_hand', 'right_hand']:
            self.assertEqual(len(result[key]), 3)  # (x, y, z) 三元组 | (x, y, z) tuple

    def test_symmetry(self):
        """
        测试左右对称性
        Test left-right symmetry

        当左右臂角度互为相反数时，x 坐标应近似对称。
        When left and right arm angles are opposite, x coordinates
        should be approximately symmetric.
        """
        result_left = self.ctrl.forward_kinematics([0, 0, 30, 0, 0, 0])
        result_right = self.ctrl.forward_kinematics([0, 0, 0, 30, 0, 0])

        left_x = result_left['left_hand'][0]
        right_x = result_right['right_hand'][0]

        # 符号相反 | Opposite signs
        self.assertLess(left_x, 0)
        self.assertGreater(right_x, 0)

    def test_insufficient_angles(self):
        """
        测试角度数量不足时返回空
        Test returns empty when insufficient angles
        """
        result = self.ctrl.forward_kinematics([0, 0])
        self.assertEqual(result, {})


class TestExpressionStateMachine(unittest.TestCase):
    """
    表情状态机转换测试
    Expression State Machine Transition Tests
    """

    def setUp(self):
        """创建表情引擎 | Create expression engine"""
        self.engine = ExpressionEngine(
            bridge=None,
            asset_path="nonexistent/",
            default_expression="idle",
        )

    def test_initial_state_is_idle(self):
        """测试初始状态为 IDLE | Test initial state is IDLE"""
        self.assertEqual(self.engine.state, ExpressionState.IDLE)

    def test_play_expression_transitions_to_enter(self):
        """
        测试播放表情后状态转为 ENTER
        Test state transitions to ENTER after playing expression
        """
        # idle 表情是预加载的 | idle expression is preloaded
        result = self.engine.play_expression("idle")
        self.assertTrue(result)
        self.assertEqual(self.engine.state, ExpressionState.ENTER)

    def test_unknown_expression_returns_false(self):
        """测试播放不存在的表情返回 False | Test unknown expression returns False"""
        result = self.engine.play_expression("nonexistent_xyz")
        self.assertFalse(result)

    def test_trigger_reaction(self):
        """
        测试事件触发反应
        Test event-triggered reaction

        poke 事件应触发 surprised 表情
        poke event should trigger surprised expression
        """
        self.engine.trigger_reaction('poke')
        self.assertEqual(self.engine.state, ExpressionState.ENTER)

    def test_unknown_event_no_crash(self):
        """测试未知事件不会导致崩溃 | Test unknown event doesn't crash"""
        self.engine.trigger_reaction('unknown_event')
        # 不应抛出异常 | Should not raise exception

    def test_set_idle_expression(self):
        """测试设置空闲表情 | Test setting idle expression"""
        self.engine.set_idle_expression("happy")
        self.assertEqual(self.engine.default_expression_name, "happy")

    def test_stop(self):
        """测试停止引擎 | Test stopping engine"""
        self.engine.start()
        self.assertTrue(self.engine._running)
        self.engine.stop()
        self.assertFalse(self.engine._running)


class TestConfigLoading(unittest.TestCase):
    """
    配置加载测试
    Configuration Loading Tests
    """

    def test_default_config_loads(self):
        """测试默认配置加载 | Test default config loading"""
        config = load_config("nonexistent_path.yaml")
        self.assertIsInstance(config, dict)
        self.assertIn('usb', config)
        self.assertIn('servos', config)
        self.assertIn('display', config)

    def test_default_usb_config(self):
        """测试 USB 默认配置值 | Test USB default config values"""
        config = load_config("nonexistent_path.yaml")
        self.assertEqual(config['usb']['port'], 'COM3')
        self.assertEqual(config['usb']['baudrate'], 115200)

    def test_default_servo_count(self):
        """测试默认舵机数量 | Test default servo count"""
        config = load_config("nonexistent_path.yaml")
        self.assertEqual(len(config['servos']), 6)

    def test_servo_ids(self):
        """测试舵机 ID 从 0 到 5 | Test servo IDs are 0-5"""
        config = load_config("nonexistent_path.yaml")
        ids = [s['id'] for s in config['servos']]
        self.assertEqual(ids, [0, 1, 2, 3, 4, 5])

    def test_display_config(self):
        """测试显示屏配置 | Test display config"""
        config = load_config("nonexistent_path.yaml")
        self.assertEqual(config['display']['width'], 240)
        self.assertEqual(config['display']['height'], 240)


if __name__ == '__main__':
    unittest.main()
