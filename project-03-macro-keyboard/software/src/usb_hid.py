# -*- coding: utf-8 -*-
"""
USB HID 协议模拟模块
USB HID Protocol Simulation Module

模拟 USB HID 键盘报告的生成和解析。
标准键盘报告格式：8 字节（修饰键 + 保留 + 6 个键码）。

Simulates USB HID keyboard report generation and parsing.
Standard keyboard report: 8 bytes (modifier + reserved + 6 keycodes).

最后更新 | Last updated: 2026-05-26
"""

from dataclasses import dataclass, field
from typing import List, Optional


# USB HID 键码定义（部分常用键码）
# USB HID Usage Codes (common keycodes)
HID_KEYCODES = {
    # 字母键 | Letter keys
    'KC_A': 0x04, 'KC_B': 0x05, 'KC_C': 0x06, 'KC_D': 0x07,
    'KC_E': 0x08, 'KC_F': 0x09, 'KC_G': 0x0A, 'KC_H': 0x0B,
    'KC_I': 0x0C, 'KC_J': 0x0D, 'KC_K': 0x0E, 'KC_L': 0x0F,
    'KC_M': 0x10, 'KC_N': 0x11, 'KC_O': 0x12, 'KC_P': 0x13,
    'KC_Q': 0x14, 'KC_R': 0x15, 'KC_S': 0x16, 'KC_T': 0x17,
    'KC_U': 0x18, 'KC_V': 0x19, 'KC_W': 0x1A, 'KC_X': 0x1B,
    'KC_Y': 0x1C, 'KC_Z': 0x1D,
    # 数字键 | Number keys
    'KC_1': 0x1E, 'KC_2': 0x1F, 'KC_3': 0x20, 'KC_4': 0x21,
    'KC_5': 0x22, 'KC_6': 0x23, 'KC_7': 0x24, 'KC_8': 0x25,
    'KC_9': 0x26, 'KC_0': 0x27,
    # 功能键 | Function keys
    'KC_ENTER': 0x28, 'KC_ESC': 0x29, 'KC_BSPC': 0x2A,
    'KC_TAB': 0x2B, 'KC_SPACE': 0x2C,
    # 小键盘 | Numpad
    'KC_P1': 0x59, 'KC_P2': 0x5A, 'KC_P3': 0x5B, 'KC_P4': 0x5C,
    'KC_P5': 0x5D, 'KC_P6': 0x5E, 'KC_P7': 0x5F, 'KC_P8': 0x60,
    'KC_P9': 0x61, 'KC_P0': 0x62, 'KC_PDOT': 0x63, 'KC_PENT': 0x58,
    'KC_PPLS': 0x57, 'KC_PMNS': 0x56, 'KC_PAST': 0x55, 'KC_PSLS': 0x54,
    # 媒体键 | Media keys (Consumer Usage)
    'KC_MUTE': 0xE2, 'KC_VOLU': 0xE9, 'KC_VOLD': 0xEA,
    'KC_MPLY': 0xCD, 'KC_MNXT': 0xB5, 'KC_MPRV': 0xB6,
}

# 修饰键位掩码 | Modifier key bitmasks
MODIFIER_MASKS = {
    'KC_LCTL': 0x01,   # Left Ctrl
    'KC_LSFT': 0x02,   # Left Shift
    'KC_LALT': 0x04,   # Left Alt
    'KC_LGUI': 0x08,   # Left GUI (Win/Cmd)
    'KC_RCTL': 0x10,   # Right Ctrl
    'KC_RSFT': 0x20,   # Right Shift
    'KC_RALT': 0x40,   # Right Alt
    'KC_RGUI': 0x80,   # Right GUI
}


@dataclass
class HIDReport:
    """
    USB HID 键盘报告
    USB HID Keyboard Report

    标准键盘报告格式（8 字节）：
    Byte 0: 修饰键（Ctrl/Shift/Alt/GUI）
    Byte 1: 保留（0x00）
    Byte 2-7: 按键码（最多 6 个同时按键）

    Standard keyboard report format (8 bytes):
    Byte 0: Modifiers (Ctrl/Shift/Alt/GUI)
    Byte 1: Reserved (0x00)
    Byte 2-7: Keycodes (up to 6 simultaneous keys)
    """
    modifiers: int = 0          # 修饰键位掩码
    reserved: int = 0           # 保留字节
    keycodes: List[int] = field(default_factory=lambda: [0] * 6)

    def to_bytes(self) -> bytes:
        """
        转换为 8 字节报告
        Convert to 8-byte report

        返回 Returns:
            bytes: 8 字节 HID 报告
        """
        result = bytearray()
        result.append(self.modifiers & 0xFF)
        result.append(self.reserved)
        for i in range(6):
            result.append(self.keycodes[i] if i < len(self.keycodes) else 0)
        return bytes(result)

    def __repr__(self) -> str:
        return (f"HIDReport(mod=0x{self.modifiers:02X}, "
                f"keys=[{', '.join(f'0x{k:02X}' for k in self.keycodes if k != 0)}])")


class USBHIDDevice:
    """
    USB HID 键盘设备模拟类
    USB HID Keyboard Device Simulator

    模拟 USB HID 键盘设备，管理报告的生成和发送。
    Simulates a USB HID keyboard device, managing report generation.

    标准键盘报告：8 字节
    - 6KRO 模式：最多同时 6 个普通键 + 8 个修饰键
    - 报告通过 USB 中断传输发送给主机

    Standard keyboard report: 8 bytes
    - 6KRO mode: up to 6 regular keys + 8 modifiers
    - Report sent to host via USB interrupt transfer
    """

    def __init__(self, config: dict):
        """
        初始化 USB HID 设备
        Initialize USB HID device

        参数 Args:
            config: 键盘配置字典 | Keyboard config dict
        """
        usb_cfg = config.get("usb", {})

        self.vid: str = usb_cfg.get("vid", "0xFEED")
        self.pid: str = usb_cfg.get("pid", "0x6060")
        self.max_power: int = usb_cfg.get("max_power_ma", 100)
        self.poll_interval: int = usb_cfg.get("poll_interval_ms", 1)

        # 当前报告状态
        self._modifier: int = 0
        self._pressed_keys: List[int] = []

        # 报告历史（用于调试）
        self._report_history: List[HIDReport] = []

        # 是否已连接
        self.connected: bool = False

    def connect(self) -> None:
        """模拟 USB 连接 | Simulate USB connection"""
        self.connected = True

    def disconnect(self) -> None:
        """模拟 USB 断开 | Simulate USB disconnection"""
        self.connected = False
        self._modifier = 0
        self._pressed_keys = []

    def press_key(self, keycode_name: str) -> Optional[HIDReport]:
        """
        模拟按下按键
        Simulate key press

        参数 Args:
            keycode_name: 键码名称（如 'KC_A', 'KC_VOLU'）
                         Keycode name (e.g., 'KC_A', 'KC_VOLU')

        返回 Returns:
            HIDReport: 更新后的 HID 报告 | Updated HID report
        """
        if not self.connected:
            return None

        # 检查是否是修饰键
        if keycode_name in MODIFIER_MASKS:
            self._modifier |= MODIFIER_MASKS[keycode_name]
            return self._build_report()

        # 普通键码
        if keycode_name in HID_KEYCODES:
            hid_code = HID_KEYCODES[keycode_name]
            if hid_code not in self._pressed_keys:
                if len(self._pressed_keys) < 6:
                    self._pressed_keys.append(hid_code)
                # 超过 6 个键时忽略（6KRO 限制）

        return self._build_report()

    def release_key(self, keycode_name: str) -> Optional[HIDReport]:
        """
        模拟释放按键
        Simulate key release

        参数 Args:
            keycode_name: 键码名称 | Keycode name

        返回 Returns:
            HIDReport: 更新后的 HID 报告 | Updated HID report
        """
        if not self.connected:
            return None

        # 修饰键
        if keycode_name in MODIFIER_MASKS:
            self._modifier &= ~MODIFIER_MASKS[keycode_name]
            return self._build_report()

        # 普通键码
        if keycode_name in HID_KEYCODES:
            hid_code = HID_KEYCODES[keycode_name]
            if hid_code in self._pressed_keys:
                self._pressed_keys.remove(hid_code)

        return self._build_report()

    def release_all(self) -> Optional[HIDReport]:
        """
        释放所有按键
        Release all keys

        返回 Returns:
            HIDReport: 空的 HID 报告 | Empty HID report
        """
        self._modifier = 0
        self._pressed_keys = []
        return self._build_report()

    def _build_report(self) -> HIDReport:
        """
        构建当前状态的 HID 报告
        Build HID report for current state

        返回 Returns:
            HIDReport: 8 字节键盘报告
        """
        keycodes = [0] * 6
        for i, code in enumerate(self._pressed_keys[:6]):
            keycodes[i] = code

        report = HIDReport(
            modifiers=self._modifier,
            keycodes=keycodes
        )

        self._report_history.append(report)
        return report

    def get_last_report(self) -> Optional[HIDReport]:
        """获取最后一次报告 | Get last report"""
        return self._report_history[-1] if self._report_history else None

    def get_report_history(self) -> List[HIDReport]:
        """获取报告历史 | Get report history"""
        return list(self._report_history)

    def clear_history(self) -> None:
        """清除报告历史 | Clear report history"""
        self._report_history.clear()

    def __repr__(self) -> str:
        return (f"USBHIDDevice(vid={self.vid}, pid={self.pid}, "
                f"connected={self.connected}, "
                f"pressed={len(self._pressed_keys)})")
