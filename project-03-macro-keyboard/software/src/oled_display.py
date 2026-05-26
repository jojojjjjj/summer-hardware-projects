# -*- coding: utf-8 -*-
"""
OLED 显示模块
OLED Display Module

模拟 SSD1306 OLED 显示屏的操作，用于 PC 端测试。
模拟功能包括：初始化、清屏、绘制像素、显示文字。

Simulates SSD1306 OLED display operations for PC-side testing.
Includes: init, clear, pixel drawing, text display.

最后更新 | Last updated: 2026-05-26
"""

from typing import List, Optional


# 基础 ASCII 字体 (5x7 像素)
# Basic ASCII font (5x7 pixels)
# 每个字符由 5 个字节表示，每字节的低 7 位表示一列像素
FONT_5X7 = {
    ' ': [0x00, 0x00, 0x00, 0x00, 0x00],
    '!': [0x00, 0x00, 0x5F, 0x00, 0x00],
    '0': [0x3E, 0x51, 0x49, 0x45, 0x3E],
    '1': [0x00, 0x42, 0x7F, 0x40, 0x00],
    '2': [0x42, 0x61, 0x51, 0x49, 0x46],
    '3': [0x21, 0x41, 0x45, 0x4B, 0x31],
    '4': [0x18, 0x14, 0x12, 0x7F, 0x10],
    '5': [0x27, 0x45, 0x45, 0x45, 0x39],
    '6': [0x3C, 0x4A, 0x49, 0x49, 0x30],
    '7': [0x01, 0x71, 0x09, 0x05, 0x03],
    '8': [0x36, 0x49, 0x49, 0x49, 0x36],
    '9': [0x06, 0x49, 0x49, 0x29, 0x1E],
    'A': [0x7E, 0x11, 0x11, 0x11, 0x7E],
    'B': [0x7F, 0x49, 0x49, 0x49, 0x36],
    'C': [0x3E, 0x41, 0x41, 0x41, 0x22],
    'D': [0x7F, 0x41, 0x41, 0x22, 0x1C],
    'E': [0x7F, 0x49, 0x49, 0x49, 0x41],
    'F': [0x7F, 0x09, 0x09, 0x09, 0x01],
    'G': [0x3E, 0x41, 0x49, 0x49, 0x7A],
    'H': [0x7F, 0x08, 0x08, 0x08, 0x7F],
    'I': [0x00, 0x41, 0x7F, 0x41, 0x00],
    'J': [0x20, 0x40, 0x41, 0x3F, 0x01],
    'K': [0x7F, 0x08, 0x14, 0x22, 0x41],
    'L': [0x7F, 0x40, 0x40, 0x40, 0x40],
    'M': [0x7F, 0x02, 0x0C, 0x02, 0x7F],
    'N': [0x7F, 0x04, 0x08, 0x10, 0x7F],
    'O': [0x3E, 0x41, 0x41, 0x41, 0x3E],
    'P': [0x7F, 0x09, 0x09, 0x09, 0x06],
    'Q': [0x3E, 0x41, 0x51, 0x21, 0x5E],
    'R': [0x7F, 0x09, 0x19, 0x29, 0x46],
    'S': [0x46, 0x49, 0x49, 0x49, 0x31],
    'T': [0x01, 0x01, 0x7F, 0x01, 0x01],
    'U': [0x3F, 0x40, 0x40, 0x40, 0x3F],
    'V': [0x1F, 0x20, 0x40, 0x20, 0x1F],
    'W': [0x3F, 0x40, 0x38, 0x40, 0x3F],
    'X': [0x63, 0x14, 0x08, 0x14, 0x63],
    'Y': [0x07, 0x08, 0x70, 0x08, 0x07],
    'Z': [0x61, 0x51, 0x49, 0x45, 0x43],
    ':': [0x00, 0x36, 0x36, 0x00, 0x00],
    '/': [0x20, 0x10, 0x08, 0x04, 0x02],
    '-': [0x08, 0x08, 0x08, 0x08, 0x08],
    '_': [0x40, 0x40, 0x40, 0x40, 0x40],
    '.': [0x00, 0x60, 0x60, 0x00, 0x00],
    '*': [0x04, 0x2A, 0x1C, 0x2A, 0x04],
    '+': [0x08, 0x08, 0x3E, 0x08, 0x08],
}


class OLEDDisplay:
    """
    OLED 显示模拟类
    OLED Display Simulator

    模拟 SSD1306 128x64 OLED 显示屏的基本操作。
    每个像素用一个布尔值表示（True = 亮，False = 灭）。

    Simulates basic operations of an SSD1306 128x64 OLED.
    Each pixel is a boolean (True = on, False = off).
    """

    def __init__(self, config: dict):
        """
        初始化 OLED 显示屏
        Initialize OLED display

        参数 Args:
            config: 键盘配置字典 | Keyboard config dict
        """
        oled_cfg = config.get("oled", {})

        # 解析分辨率
        resolution = oled_cfg.get("resolution", "128x64")
        w, h = resolution.split("x")
        self.width: int = int(w)
        self.height: int = int(h)

        # 硬件配置
        self.enabled: bool = oled_cfg.get("enabled", True)
        self.type: str = oled_cfg.get("type", "SSD1306")
        self.interface: str = oled_cfg.get("interface", "I2C")
        self.address: str = oled_cfg.get("address", "0x3C")
        self.contrast: int = oled_cfg.get("contrast", 200)
        self.flip: bool = oled_cfg.get("flip", False)

        # 帧缓冲区（像素矩阵）
        self._buffer: List[List[bool]] = [
            [False for _ in range(self.width)] for _ in range(self.height)
        ]

        # 光标位置（用于文字绘制）
        self._cursor_x: int = 0
        self._cursor_y: int = 0

    def clear(self) -> None:
        """
        清除屏幕（清除所有像素）
        Clear screen (clear all pixels)
        """
        for y in range(self.height):
            for x in range(self.width):
                self._buffer[y][x] = False
        self._cursor_x = 0
        self._cursor_y = 0

    def set_pixel(self, x: int, y: int, on: bool = True) -> None:
        """
        设置指定位置的像素
        Set pixel at specified position

        参数 Args:
            x: 水平坐标 (0 to width-1)
            y: 垂直坐标 (0 to height-1)
            on: 是否点亮 | Whether to turn on
        """
        if 0 <= x < self.width and 0 <= y < self.height:
            self._buffer[y][x] = on

    def get_pixel(self, x: int, y: int) -> bool:
        """
        获取指定位置的像素状态
        Get pixel state at specified position

        参数 Args:
            x: 水平坐标 | Horizontal coordinate
            y: 垂直坐标 | Vertical coordinate

        返回 Returns:
            bool: 像素是否点亮 | Whether pixel is on
        """
        if 0 <= x < self.width and 0 <= y < self.height:
            return self._buffer[y][x]
        return False

    def draw_char(self, x: int, y: int, char: str) -> int:
        """
        在指定位置绘制一个 ASCII 字符 (5x7 像素)
        Draw an ASCII character at specified position (5x7 pixels)

        参数 Args:
            x: 起始 x 坐标 | Start x coordinate
            y: 起始 y 坐标 | Start y coordinate
            char: 要绘制的字符 | Character to draw

        返回 Returns:
            int: 字符宽度 (6，含间距) | Character width (6, with spacing)
        """
        if char not in FONT_5X7:
            char = ' '  # 未知字符用空格替代

        glyph = FONT_5X7[char]
        for col in range(5):
            for row in range(7):
                if glyph[col] & (1 << row):
                    self.set_pixel(x + col, y + row, True)

        return 6  # 5 像素宽 + 1 像素间距

    def draw_string(self, x: int, y: int, text: str) -> None:
        """
        在指定位置绘制字符串
        Draw a string at specified position

        参数 Args:
            x: 起始 x 坐标 | Start x coordinate
            y: 起始 y 坐标 | Start y coordinate
            text: 要绘制的字符串 | String to draw
        """
        cx = x
        for char in text:
            if char == '\n':
                # 换行符：回到起始 x，y 增加一行高度
                cx = x
                y += 9  # 7 像素字高 + 2 像素行距
            else:
                cx += self.draw_char(cx, y, char.upper())

    def draw_rect(self, x: int, y: int, w: int, h: int) -> None:
        """
        绘制矩形边框
        Draw rectangle outline

        参数 Args:
            x, y: 左上角坐标 | Top-left corner
            w, h: 宽度和高度 | Width and height
        """
        for i in range(x, x + w):
            self.set_pixel(i, y)
            self.set_pixel(i, y + h - 1)
        for j in range(y, y + h):
            self.set_pixel(x, j)
            self.set_pixel(x + w - 1, j)

    def to_string(self) -> str:
        """
        将屏幕内容转换为 ASCII 字符画
        Convert screen content to ASCII art

        返回 Returns:
            str: 屏幕的 ASCII 表示
        """
        lines = []
        for y in range(0, self.height, 2):
            line = ""
            for x in range(self.width):
                top = self._buffer[y][x] if y < self.height else False
                bottom = self._buffer[y + 1][x] if y + 1 < self.height else False
                if top and bottom:
                    line += "█"
                elif top:
                    line += "▀"
                elif bottom:
                    line += "▄"
                else:
                    line += " "
            lines.append(line.rstrip())
        return "\n".join(lines)

    def __repr__(self) -> str:
        return f"OLEDDisplay({self.width}x{self.height}, {self.type}, addr={self.address})"
