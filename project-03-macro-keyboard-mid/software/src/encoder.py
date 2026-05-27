# -*- coding: utf-8 -*-
"""
旋钮编码器模块
Rotary Encoder Module

模拟 EC11 旋转编码器的正交解码逻辑。
支持旋转方向检测和按键功能。

Simulates EC11 rotary encoder quadrature decoding.
Supports rotation direction detection and push button.

最后更新 | Last updated: 2026-05-26
"""

from enum import Enum
from typing import Optional, Callable


class EncoderDirection(Enum):
    """旋转方向枚举 | Rotation direction enum"""
    CLOCKWISE = 1           # 顺时针
    COUNTER_CLOCKWISE = -1  # 逆时针
    NONE = 0                # 无旋转


class Encoder:
    """
    旋钮编码器管理类
    Rotary Encoder Manager

    模拟 EC11 编码器的正交解码（A/B 相）和按键功能。
    编码器每转一个"棘格"产生若干脉冲，通过 A/B 相的相位差判断方向。

    Simulates EC11 encoder quadrature decoding (A/B phase) and button.
    Each detent produces several pulses; direction determined by A/B phase difference.
    """

    def __init__(self, config: dict):
        """
        初始化编码器
        Initialize encoder

        参数 Args:
            config: 键盘配置字典 | Keyboard config dict
        """
        enc_cfg = config.get("encoder", {})

        self.enabled: bool = enc_cfg.get("enabled", True)
        self.pin_a: str = enc_cfg.get("a_pin", "PB0")
        self.pin_b: str = enc_cfg.get("b_pin", "PB1")
        self.pin_sw: str = enc_cfg.get("switch_pin", "PB5")
        self.resolution: int = enc_cfg.get("resolution", 4)

        # 键码映射
        self.cw_keycode: str = enc_cfg.get("base_cw", "KC_VOLU")
        self.ccw_keycode: str = enc_cfg.get("base_ccw", "KC_VOLD")
        self.press_keycode: str = enc_cfg.get("base_press", "KC_MUTE")

        # 内部状态
        self._position: int = 0         # 编码器累计位置
        self._last_direction: EncoderDirection = EncoderDirection.NONE
        self._button_pressed: bool = False
        self._pulse_count: int = 0      # 当前棘格内的脉冲计数

        # 事件回调
        self._rotate_callback: Optional[Callable] = None
        self._press_callback: Optional[Callable] = None

    def rotate(self, direction: EncoderDirection) -> Optional[str]:
        """
        模拟旋转事件（用于测试）
        Simulate rotation event (for testing)

        参数 Args:
            direction: 旋转方向 | Rotation direction

        返回 Returns:
            str or None: 对应的键码 | Corresponding keycode
        """
        if not self.enabled:
            return None

        self._pulse_count += 1

        # 每 resolution 个脉冲算一"步"
        if self._pulse_count >= self.resolution:
            self._pulse_count = 0

            if direction == EncoderDirection.CLOCKWISE:
                self._position += 1
                self._last_direction = direction
                keycode = self.cw_keycode
            elif direction == EncoderDirection.COUNTER_CLOCKWISE:
                self._position -= 1
                self._last_direction = direction
                keycode = self.ccw_keycode
            else:
                return None

            # 触发回调
            if self._rotate_callback:
                self._rotate_callback(direction, self._position)

            return keycode

        return None

    def press(self) -> Optional[str]:
        """
        模拟按下旋钮（用于测试）
        Simulate button press (for testing)

        返回 Returns:
            str or None: 按键对应的键码 | Corresponding keycode
        """
        if not self.enabled:
            return None

        self._button_pressed = True

        if self._press_callback:
            self._press_callback(True)

        return self.press_keycode

    def release(self) -> None:
        """
        模拟释放旋钮按键
        Simulate button release
        """
        self._button_pressed = False

        if self._press_callback:
            self._press_callback(False)

    @property
    def position(self) -> int:
        """获取编码器当前位置 | Get current encoder position"""
        return self._position

    @property
    def is_pressed(self) -> bool:
        """检查旋钮是否被按下 | Check if button is pressed"""
        return self._button_pressed

    @property
    def last_direction(self) -> EncoderDirection:
        """获取最后一次旋转方向 | Get last rotation direction"""
        return self._last_direction

    def reset_position(self) -> None:
        """重置位置为零 | Reset position to zero"""
        self._position = 0
        self._pulse_count = 0

    def on_rotate(self, callback: Callable) -> None:
        """
        注册旋转事件回调
        Register rotation event callback

        参数 Args:
            callback: 回调函数，参数为 (direction, position)
        """
        self._rotate_callback = callback

    def on_press(self, callback: Callable) -> None:
        """
        注册按键事件回调
        Register button event callback

        参数 Args:
            callback: 回调函数，参数为 (pressed: bool)
        """
        self._press_callback = callback

    def __repr__(self) -> str:
        return (f"Encoder(pos={self._position}, "
                f"pins={self.pin_a}/{self.pin_b}/{self.pin_sw}, "
                f"pressed={self._button_pressed})")
