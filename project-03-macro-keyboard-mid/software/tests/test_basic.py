# -*- coding: utf-8 -*-
"""
宏键盘基础测试套件
Macro Keyboard Basic Test Suite

测试 PC 端工具模块的基本功能。
Tests basic functionality of PC-side tool modules.

运行方法 | How to run:
    cd software
    python -m pytest tests/test_basic.py -v

最后更新 | Last updated: 2026-05-26
"""

import sys
import os
import pytest

# 将 src 目录加入搜索路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))

from keymatrix import KeyMatrix, KeyEvent
from oled_display import OLEDDisplay, FONT_5X7
from rgb_led import RGBLed, RGBColor
from encoder import Encoder, EncoderDirection
from usb_hid import USBHIDDevice, HIDReport, HID_KEYCODES
from utils import load_config, format_hex, format_binary, pad_to_matrix


# ===== 测试配置 Fixture =====

@pytest.fixture
def config():
    """提供测试用的配置字典 | Provide test configuration dict"""
    return {
        "keyboard": {
            "name": "KeyVerse Test",
            "layout": "ortho_4x4",
            "rows": 4,
            "cols": 4,
            "total_keys": 16
        },
        "matrix": {
            "row_pins": ["PA0", "PA1", "PA2", "PA3"],
            "col_pins": ["PA4", "PA5", "PA6", "PA7"],
            "debounce_ms": 5,
            "scan_rate_hz": 1000
        },
        "oled": {
            "enabled": True,
            "type": "SSD1306",
            "resolution": "128x64",
            "interface": "I2C",
            "address": "0x3C",
            "contrast": 200,
            "flip": False
        },
        "rgb": {
            "enabled": True,
            "type": "WS2812B",
            "count": 16,
            "data_pin": "PA8",
            "max_brightness": 128,
            "default_mode": "rainbow"
        },
        "encoder": {
            "enabled": True,
            "a_pin": "PB0",
            "b_pin": "PB1",
            "switch_pin": "PB5",
            "resolution": 4,
            "base_cw": "KC_VOLU",
            "base_ccw": "KC_VOLD",
            "base_press": "KC_MUTE"
        },
        "usb": {
            "vid": "0xFEED",
            "pid": "0x6060",
            "max_power_ma": 100
        }
    }


# ===== 矩阵扫描测试 | Matrix Tests =====

class TestKeyMatrix:
    """键盘矩阵测试类 | Keyboard Matrix Test Class"""

    def test_init(self, config):
        """测试矩阵初始化 | Test matrix initialization"""
        matrix = KeyMatrix(config)
        assert matrix.rows == 4
        assert matrix.cols == 4
        assert len(matrix.row_pins) == 4
        assert len(matrix.col_pins) == 4

    def test_press_release(self, config):
        """测试按键按下和释放 | Test key press and release"""
        matrix = KeyMatrix(config)
        assert not matrix.is_pressed(0, 0)

        matrix.press_key(0, 0)
        assert matrix.is_pressed(0, 0)

        matrix.release_key(0, 0)
        assert not matrix.is_pressed(0, 0)

    def test_scan_events(self, config):
        """测试扫描事件检测 | Test scan event detection"""
        matrix = KeyMatrix(config)

        # 第一次扫描：无变化
        events = matrix.scan()
        assert len(events) == 0

        # 按下按键
        matrix.press_key(1, 2)
        events = matrix.scan()
        assert len(events) == 1
        assert events[0].row == 1
        assert events[0].col == 2
        assert events[0].pressed is True

    def test_release_event(self, config):
        """测试释放事件 | Test release event"""
        matrix = KeyMatrix(config)
        matrix.press_key(0, 0)
        matrix.scan()  # 检测按下

        matrix.release_key(0, 0)
        events = matrix.scan()
        assert len(events) == 1
        assert events[0].pressed is False

    def test_multiple_keys(self, config):
        """测试多键同时按下 | Test multiple simultaneous keys"""
        matrix = KeyMatrix(config)
        matrix.press_key(0, 0)
        matrix.press_key(1, 1)
        matrix.press_key(3, 3)
        matrix.scan()

        pressed = matrix.get_all_pressed()
        assert len(pressed) == 3
        assert (0, 0) in pressed
        assert (1, 1) in pressed
        assert (3, 3) in pressed

    def test_callback(self, config):
        """测试事件回调 | Test event callback"""
        matrix = KeyMatrix(config)
        events_received = []
        matrix.register_callback(lambda e: events_received.append(e))

        matrix.press_key(2, 1)
        matrix.scan()

        assert len(events_received) == 1
        assert events_received[0].row == 2
        assert events_received[0].col == 1

    def test_out_of_bounds(self, config):
        """测试越界访问 | Test out of bounds access"""
        matrix = KeyMatrix(config)
        assert not matrix.is_pressed(-1, 0)
        assert not matrix.is_pressed(4, 0)
        assert not matrix.is_pressed(0, 4)


# ===== OLED 显示测试 | OLED Tests =====

class TestOLEDDisplay:
    """OLED 显示测试类 | OLED Display Test Class"""

    def test_init(self, config):
        """测试 OLED 初始化 | Test OLED initialization"""
        oled = OLEDDisplay(config)
        assert oled.width == 128
        assert oled.height == 64
        assert oled.type == "SSD1306"

    def test_clear(self, config):
        """测试清屏 | Test clear screen"""
        oled = OLEDDisplay(config)
        oled.set_pixel(10, 10, True)
        oled.clear()
        assert not oled.get_pixel(10, 10)

    def test_set_get_pixel(self, config):
        """测试像素读写 | Test pixel read/write"""
        oled = OLEDDisplay(config)
        oled.set_pixel(50, 30, True)
        assert oled.get_pixel(50, 30) is True
        assert oled.get_pixel(51, 30) is False

    def test_out_of_bounds_pixel(self, config):
        """测试越界像素 | Test out of bounds pixel"""
        oled = OLEDDisplay(config)
        oled.set_pixel(-1, 0, True)  # 不应报错
        oled.set_pixel(128, 0, True)  # 不应报错
        assert not oled.get_pixel(-1, 0)
        assert not oled.get_pixel(128, 0)

    def test_draw_char(self, config):
        """测试字符绘制 | Test character drawing"""
        oled = OLEDDisplay(config)
        width = oled.draw_char(0, 0, 'A')
        assert width == 6  # 5 像素 + 1 间距

    def test_draw_string(self, config):
        """测试字符串绘制 | Test string drawing"""
        oled = OLEDDisplay(config)
        oled.draw_string(0, 0, "Hello")
        # 验证有像素被点亮
        has_pixels = any(oled.get_pixel(x, y) for x in range(30) for y in range(7))
        assert has_pixels

    def test_draw_rect(self, config):
        """测试矩形绘制 | Test rectangle drawing"""
        oled = OLEDDisplay(config)
        oled.draw_rect(10, 10, 20, 15)
        assert oled.get_pixel(10, 10)   # 左上角
        assert oled.get_pixel(29, 10)   # 右上角
        assert oled.get_pixel(10, 24)   # 左下角
        assert oled.get_pixel(29, 24)   # 右下角
        assert not oled.get_pixel(15, 15)  # 内部为空

    def test_to_string(self, config):
        """测试 ASCII 输出 | Test ASCII output"""
        oled = OLEDDisplay(config)
        oled.draw_rect(0, 0, 5, 5)
        output = oled.to_string()
        assert isinstance(output, str)
        assert len(output) > 0


# ===== RGB LED 测试 | RGB LED Tests =====

class TestRGBLed:
    """RGB LED 测试类 | RGB LED Test Class"""

    def test_init(self, config):
        """测试 RGB 初始化 | Test RGB initialization"""
        rgb = RGBLed(config)
        assert rgb.num_leds == 16
        assert rgb.effect_mode == "rainbow"

    def test_set_color(self, config):
        """测试设置颜色 | Test set color"""
        rgb = RGBLed(config)
        color = RGBColor(255, 128, 0)
        rgb.set_color(0, color)
        assert rgb.get_color(0).r == 255
        assert rgb.get_color(0).g == 128
        assert rgb.get_color(0).b == 0

    def test_set_all(self, config):
        """测试全部设色 | Test set all"""
        rgb = RGBLed(config)
        color = RGBColor(0, 0, 255)
        rgb.set_all(color)
        for i in range(16):
            assert rgb.get_color(i).b == 255

    def test_grb_conversion(self):
        """测试 GRB 格式转换 | Test GRB format conversion"""
        color = RGBColor(r=100, g=200, b=50)
        g, r, b = color.to_grb()
        assert g == 200  # 绿色在前
        assert r == 100  # 红色在中
        assert b == 50   # 蓝色在后

    def test_hsv_conversion(self):
        """测试 HSV 转换 | Test HSV conversion"""
        # 纯红色 (H=0, S=1, V=1)
        red = RGBColor.from_hsv(0, 1.0, 1.0)
        assert red.r == 255
        assert red.g == 0
        assert red.b == 0

        # 纯绿色 (H=120, S=1, V=1)
        green = RGBColor.from_hsv(120, 1.0, 1.0)
        assert green.g == 255

    def test_brightness(self, config):
        """测试亮度控制 | Test brightness control"""
        rgb = RGBLed(config)
        rgb.set_brightness(64)
        assert rgb._brightness == 64

    def test_effect_modes(self, config):
        """测试灯效模式 | Test effect modes"""
        rgb = RGBLed(config)
        for mode in ["static", "breathing", "rainbow", "rainbow_swirl", "gradient"]:
            rgb.set_effect(mode)
            assert rgb.effect_mode == mode

    def test_update_effect(self, config):
        """测试灯效更新 | Test effect update"""
        rgb = RGBLed(config)
        rgb.set_effect("rainbow")
        rgb.update_effect()
        # 彩虹模式下每颗 LED 颜色不同
        c0 = rgb.get_color(0)
        c1 = rgb.get_color(1)
        assert not (c0.r == c1.r and c0.g == c1.g and c0.b == c1.b)


# ===== 编码器测试 | Encoder Tests =====

class TestEncoder:
    """编码器测试类 | Encoder Test Class"""

    def test_init(self, config):
        """测试编码器初始化 | Test encoder initialization"""
        enc = Encoder(config)
        assert enc.enabled is True
        assert enc.position == 0

    def test_clockwise_rotation(self, config):
        """测试顺时针旋转 | Test clockwise rotation"""
        enc = Encoder(config)
        # 需要 resolution 个脉冲才产生一步
        for _ in range(enc.resolution):
            result = enc.rotate(EncoderDirection.CLOCKWISE)

        assert enc.position == 1
        assert result == "KC_VOLU"

    def test_counter_clockwise_rotation(self, config):
        """测试逆时针旋转 | Test counter-clockwise rotation"""
        enc = Encoder(config)
        for _ in range(enc.resolution):
            result = enc.rotate(EncoderDirection.COUNTER_CLOCKWISE)

        assert enc.position == -1
        assert result == "KC_VOLD"

    def test_partial_rotation(self, config):
        """测试部分旋转（不足一步）| Test partial rotation (not enough for a step)"""
        enc = Encoder(config)
        result = enc.rotate(EncoderDirection.CLOCKWISE)
        assert result is None  # 不足 resolution 个脉冲
        assert enc.position == 0

    def test_button_press(self, config):
        """测试按键按下 | Test button press"""
        enc = Encoder(config)
        result = enc.press()
        assert result == "KC_MUTE"
        assert enc.is_pressed

        enc.release()
        assert not enc.is_pressed

    def test_callback(self, config):
        """测试回调 | Test callback"""
        enc = Encoder(config)
        events = []
        enc.on_rotate(lambda d, p: events.append((d, p)))

        for _ in range(enc.resolution):
            enc.rotate(EncoderDirection.CLOCKWISE)

        assert len(events) == 1
        assert events[0] == (EncoderDirection.CLOCKWISE, 1)


# ===== USB HID 测试 | USB HID Tests =====

class TestUSBHID:
    """USB HID 测试类 | USB HID Test Class"""

    def test_init(self, config):
        """测试 HID 设备初始化 | Test HID device initialization"""
        hid = USBHIDDevice(config)
        assert hid.vid == "0xFEED"
        assert hid.pid == "0x6060"
        assert not hid.connected

    def test_connect(self, config):
        """测试连接 | Test connection"""
        hid = USBHIDDevice(config)
        hid.connect()
        assert hid.connected

    def test_key_press(self, config):
        """测试按键按下 | Test key press"""
        hid = USBHIDDevice(config)
        hid.connect()

        report = hid.press_key("KC_A")
        assert report is not None
        assert 0x04 in report.keycodes  # KC_A = 0x04

    def test_key_release(self, config):
        """测试按键释放 | Test key release"""
        hid = USBHIDDevice(config)
        hid.connect()

        hid.press_key("KC_A")
        report = hid.release_key("KC_A")
        assert 0x04 not in report.keycodes

    def test_modifier(self, config):
        """测试修饰键 | Test modifier keys"""
        hid = USBHIDDevice(config)
        hid.connect()

        report = hid.press_key("KC_LCTL")
        assert report.modifiers & 0x01  # Left Ctrl = 0x01

    def test_report_bytes(self):
        """测试报告字节格式 | Test report byte format"""
        report = HIDReport(modifiers=0x01, keycodes=[0x04, 0, 0, 0, 0, 0])
        data = report.to_bytes()
        assert len(data) == 8
        assert data[0] == 0x01  # 修饰键
        assert data[1] == 0x00  # 保留
        assert data[2] == 0x04  # KC_A

    def test_six_key_limit(self, config):
        """测试 6 键限制 | Test 6-key limit"""
        hid = USBHIDDevice(config)
        hid.connect()

        keys = ["KC_A", "KC_B", "KC_C", "KC_D", "KC_E", "KC_F", "KC_G"]
        for key in keys:
            hid.press_key(key)

        report = hid.get_last_report()
        non_zero = [k for k in report.keycodes if k != 0]
        assert len(non_zero) == 6  # 最多 6 个

    def test_release_all(self, config):
        """测试全部释放 | Test release all"""
        hid = USBHIDDevice(config)
        hid.connect()

        hid.press_key("KC_A")
        hid.press_key("KC_LCTL")
        report = hid.release_all()

        assert report.modifiers == 0
        assert all(k == 0 for k in report.keycodes)


# ===== 工具函数测试 | Utility Tests =====

class TestUtils:
    """工具函数测试类 | Utility Test Class"""

    def test_format_hex(self):
        """测试十六进制格式化 | Test hex formatting"""
        assert format_hex(0) == "0x00"
        assert format_hex(255) == "0xFF"
        assert format_hex(10, 4) == "0x000A"

    def test_format_binary(self):
        """测试二进制格式化 | Test binary formatting"""
        assert format_binary(0) == "0b00000000"
        assert format_binary(255) == "0b11111111"
        assert format_binary(5) == "0b00000101"

    def test_pad_to_matrix(self):
        """测试矩阵转换 | Test matrix conversion"""
        flat = [1, 2, 3, 4, 5, 6]
        matrix = pad_to_matrix(flat, 2, 3)
        assert matrix == [[1, 2, 3], [4, 5, 6]]

    def test_pad_to_matrix_with_fill(self):
        """测试带填充值的矩阵转换 | Test matrix conversion with fill"""
        flat = [1, 2]
        matrix = pad_to_matrix(flat, 2, 2, fill=0)
        assert matrix == [[1, 2], [0, 0]]
