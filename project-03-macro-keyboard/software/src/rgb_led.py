# -*- coding: utf-8 -*-
"""
RGB LED 控制模块
RGB LED Control Module

模拟 WS2812B 可寻址 RGB LED 的操作。
支持设置颜色、灯效模式和亮度控制。

Simulates WS2812B addressable RGB LED operations.
Supports color setting, effect modes, and brightness control.

最后更新 | Last updated: 2026-05-26
"""

import math
from dataclasses import dataclass
from typing import List, Tuple


@dataclass
class RGBColor:
    """
    RGB 颜色数据类
    RGB color data class

    属性 Attributes:
        r (int): 红色分量 (0-255) | Red component
        g (int): 绿色分量 (0-255) | Green component
        b (int): 蓝色分量 (0-255) | Blue component
    """
    r: int = 0
    g: int = 0
    b: int = 0

    def to_grb(self) -> Tuple[int, int, int]:
        """
        转换为 WS2812B 的 GRB 数据格式
        Convert to WS2812B GRB data format

        WS2812B 的数据顺序是 GRB（绿色、红色、蓝色），不是 RGB。
        WS2812B data order is GRB (Green, Red, Blue), not RGB.

        返回 Returns:
            tuple: (green, red, blue) 各 0-255
        """
        return (self.g, self.r, self.b)

    @staticmethod
    def from_hsv(hue: float, saturation: float = 1.0, value: float = 1.0) -> 'RGBColor':
        """
        从 HSV 颜色空间转换为 RGB
        Convert from HSV color space to RGB

        参数 Args:
            hue: 色相 (0.0-360.0 度) | Hue in degrees
            saturation: 饱和度 (0.0-1.0) | Saturation
            value: 明度 (0.0-1.0) | Value/Brightness

        返回 Returns:
            RGBColor: 对应的 RGB 颜色
        """
        hue = hue % 360
        c = value * saturation
        x = c * (1 - abs((hue / 60) % 2 - 1))
        m = value - c

        if hue < 60:
            r, g, b = c, x, 0
        elif hue < 120:
            r, g, b = x, c, 0
        elif hue < 180:
            r, g, b = 0, c, x
        elif hue < 240:
            r, g, b = 0, x, c
        elif hue < 300:
            r, g, b = x, 0, c
        else:
            r, g, b = c, 0, x

        return RGBColor(
            r=int((r + m) * 255),
            g=int((g + m) * 255),
            b=int((b + m) * 255)
        )

    @staticmethod
    def black() -> 'RGBColor':
        """黑色（关闭）| Black (off)"""
        return RGBColor(0, 0, 0)

    @staticmethod
    def white() -> 'RGBColor':
        """白色 | White"""
        return RGBColor(255, 255, 255)

    @staticmethod
    def red() -> 'RGBColor':
        """红色 | Red"""
        return RGBColor(255, 0, 0)

    @staticmethod
    def green() -> 'RGBColor':
        """绿色 | Green"""
        return RGBColor(0, 255, 0)

    @staticmethod
    def blue() -> 'RGBColor':
        """蓝色 | Blue"""
        return RGBColor(0, 0, 255)


# 灯效模式枚举
EFFECT_MODES = ["static", "breathing", "rainbow", "rainbow_swirl", "gradient"]


class RGBLed:
    """
    RGB LED 管理类
    RGB LED Manager

    管理 WS2812B 灯珠的颜色和灯效。
    Manages colors and effects for WS2812B LEDs.
    """

    def __init__(self, config: dict):
        """
        初始化 RGB LED 控制器
        Initialize RGB LED controller

        参数 Args:
            config: 键盘配置字典 | Keyboard config dict
        """
        rgb_cfg = config.get("rgb", {})

        self.enabled: bool = rgb_cfg.get("enabled", True)
        self.type: str = rgb_cfg.get("type", "WS2812B")
        self.num_leds: int = rgb_cfg.get("count", 16)
        self.data_pin: str = rgb_cfg.get("data_pin", "PA8")
        self.max_brightness: int = rgb_cfg.get("max_brightness", 128)
        self.effect_mode: str = rgb_cfg.get("default_mode", "rainbow")

        # LED 颜色缓冲区
        self._colors: List[RGBColor] = [RGBColor.black() for _ in range(self.num_leds)]

        # 全局亮度 (0-255)
        self._brightness: int = self.max_brightness

        # 动画帧计数器
        self._frame: int = 0

    def set_color(self, index: int, color: RGBColor) -> None:
        """
        设置指定 LED 的颜色
        Set color of specified LED

        参数 Args:
            index: LED 编号 (0 to num_leds-1)
            color: RGB 颜色
        """
        if 0 <= index < self.num_leds:
            self._colors[index] = color

    def set_all(self, color: RGBColor) -> None:
        """
        设置所有 LED 为同一颜色
        Set all LEDs to same color

        参数 Args:
            color: RGB 颜色
        """
        for i in range(self.num_leds):
            self._colors[i] = color

    def get_color(self, index: int) -> RGBColor:
        """
        获取指定 LED 的颜色
        Get color of specified LED

        参数 Args:
            index: LED 编号

        返回 Returns:
            RGBColor: 当前颜色
        """
        if 0 <= index < self.num_leds:
            return self._colors[index]
        return RGBColor.black()

    def set_brightness(self, brightness: int) -> None:
        """
        设置全局亮度
        Set global brightness

        参数 Args:
            brightness: 亮度值 (0-255)
        """
        self._brightness = max(0, min(255, brightness))

    def set_effect(self, mode: str) -> None:
        """
        设置灯效模式
        Set effect mode

        参数 Args:
            mode: 灯效模式名 | Effect mode name
        """
        if mode in EFFECT_MODES:
            self.effect_mode = mode

    def update_effect(self) -> None:
        """
        更新一帧灯效动画
        Update one frame of effect animation

        根据当前灯效模式更新所有 LED 的颜色。
        Updates all LED colors based on current effect mode.
        """
        self._frame += 1

        if self.effect_mode == "static":
            # 静态模式：保持当前颜色
            pass

        elif self.effect_mode == "breathing":
            # 呼吸灯模式
            brightness = (math.sin(self._frame * 0.05) + 1) / 2
            val = int(brightness * 255)
            color = RGBColor(val, 0, val // 2)  # 紫色呼吸
            self.set_all(color)

        elif self.effect_mode == "rainbow":
            # 彩虹模式：每颗 LED 一种颜色
            for i in range(self.num_leds):
                hue = (i * 360 / self.num_leds + self._frame * 2) % 360
                self._colors[i] = RGBColor.from_hsv(hue, 1.0, self._brightness / 255)

        elif self.effect_mode == "rainbow_swirl":
            # 彩虹旋涡模式
            for i in range(self.num_leds):
                hue = (i * 360 / self.num_leds + self._frame * 3) % 360
                self._colors[i] = RGBColor.from_hsv(hue, 1.0, self._brightness / 255)

        elif self.effect_mode == "gradient":
            # 渐变模式
            for i in range(self.num_leds):
                ratio = i / max(1, self.num_leds - 1)
                self._colors[i] = RGBColor(
                    r=int(255 * (1 - ratio)),
                    g=0,
                    b=int(255 * ratio)
                )

    def to_grb_bytes(self) -> bytes:
        """
        将所有 LED 颜色转换为 WS2812B GRB 数据格式
        Convert all LED colors to WS2812B GRB data format

        返回 Returns:
            bytes: GRB 格式的字节序列（每 LED 3 字节）
        """
        data = bytearray()
        for color in self._colors:
            g, r, b = color.to_grb()
            # 应用亮度
            data.extend([
                int(g * self._brightness / 255),
                int(r * self._brightness / 255),
                int(b * self._brightness / 255)
            ])
        return bytes(data)

    def get_display_string(self) -> str:
        """
        生成 LED 状态的可视化字符串
        Generate visual string of LED status

        返回 Returns:
            str: LED 状态的 ASCII 表示
        """
        lines = []
        for row in range(4):
            line = ""
            for col in range(4):
                idx = row * 4 + col
                if idx < self.num_leds:
                    c = self._colors[idx]
                    if c.r == 0 and c.g == 0 and c.b == 0:
                        line += " [OFF] "
                    elif c.r > 200 and c.g < 50 and c.b < 50:
                        line += " [RED] "
                    elif c.r < 50 and c.g > 200 and c.b < 50:
                        line += " [GRN] "
                    elif c.r < 50 and c.g < 50 and c.b > 200:
                        line += " [BLU] "
                    else:
                        line += f"[{c.r:02X}{c.g:02X}{c.b:02X}]"
            lines.append(line)
        return "\n".join(lines)

    def __repr__(self) -> str:
        return f"RGBLed(count={self.num_leds}, mode={self.effect_mode}, brightness={self._brightness})"
