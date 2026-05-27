# -*- coding: utf-8 -*-
"""
键盘矩阵扫描模块
Keyboard Matrix Scanning Module

模拟 STM32 上的矩阵扫描逻辑，用于 PC 端测试和验证。
Simulates the matrix scanning logic from STM32 for PC-side testing.

矩阵扫描原理：
1. 将当前行设为 LOW，其余行为 HIGH
2. 读取所有列的状态
3. 如果某列为 LOW，则该行该列的按键被按下
4. 逐行扫描，完成一帧

Matrix scanning:
1. Set current row LOW, others HIGH
2. Read all columns
3. If column reads LOW, the key at (row, col) is pressed
4. Scan row by row to complete one frame

最后更新 | Last updated: 2026-05-26
"""

from dataclasses import dataclass, field
from typing import List, Optional, Callable


@dataclass
class KeyEvent:
    """
    按键事件数据类
    Key event data class

    属性 Attributes:
        row (int): 按键所在行 | Row of the key
        col (int): 按键所在列 | Column of the key
        pressed (bool): 是否按下 | Whether pressed
        timestamp (float): 事件时间戳 | Event timestamp
    """
    row: int
    col: int
    pressed: bool
    timestamp: float = 0.0


class KeyMatrix:
    """
    键盘矩阵管理类
    Keyboard Matrix Manager

    负责管理 4x4 键盘矩阵的状态和扫描逻辑。
    Manages the state and scanning logic of a 4x4 key matrix.

    使用方法 Usage:
        matrix = KeyMatrix(config)
        matrix.press_key(0, 0)  # 模拟按下 (0,0) 键
        matrix.release_key(0, 0)  # 模拟释放
        matrix.scan()  # 执行一次扫描
    """

    def __init__(self, config: dict):
        """
        初始化矩阵
        Initialize matrix from configuration

        参数 Args:
            config: 键盘配置字典 | Keyboard config dict
        """
        matrix_cfg = config.get("matrix", {})
        kb_cfg = config.get("keyboard", {})

        # 矩阵尺寸
        self.rows: int = kb_cfg.get("rows", 4)
        self.cols: int = kb_cfg.get("cols", 4)

        # GPIO 引脚配置
        self.row_pins: list = matrix_cfg.get("row_pins", [f"PA{i}" for i in range(4)])
        self.col_pins: list = matrix_cfg.get("col_pins", [f"PA{i+4}" for i in range(4)])

        # 消抖配置
        self.debounce_ms: int = matrix_cfg.get("debounce_ms", 5)
        self.scan_rate_hz: int = matrix_cfg.get("scan_rate_hz", 1000)

        # 按键状态矩阵（True = 按下，False = 未按下）
        # Key state matrix (True = pressed, False = released)
        self._state: List[List[bool]] = [
            [False for _ in range(self.cols)] for _ in range(self.rows)
        ]

        # 上一次扫描的状态（用于检测变化）
        self._prev_state: List[List[bool]] = [
            [False for _ in range(self.cols)] for _ in range(self.rows)
        ]

        # 消抖计数器
        self._debounce_count: List[List[int]] = [
            [0 for _ in range(self.cols)] for _ in range(self.rows)
        ]

        # 事件回调列表
        self._event_callbacks: List[Callable[[KeyEvent], None]] = []

        # 扫描帧计数
        self.scan_count: int = 0

    def press_key(self, row: int, col: int) -> None:
        """
        模拟按键按下（用于测试）
        Simulate key press (for testing)

        参数 Args:
            row: 行号 (0-3) | Row number
            col: 列号 (0-3) | Column number
        """
        if 0 <= row < self.rows and 0 <= col < self.cols:
            self._state[row][col] = True

    def release_key(self, row: int, col: int) -> None:
        """
        模拟按键释放（用于测试）
        Simulate key release (for testing)

        参数 Args:
            row: 行号 | Row number
            col: 列号 | Column number
        """
        if 0 <= row < self.rows and 0 <= col < self.cols:
            self._state[row][col] = False

    def is_pressed(self, row: int, col: int) -> bool:
        """
        检查指定按键是否按下
        Check if a specific key is pressed

        参数 Args:
            row: 行号 | Row number
            col: 列号 | Column number

        返回 Returns:
            bool: 是否按下 | Whether pressed
        """
        if 0 <= row < self.rows and 0 <= col < self.cols:
            return self._state[row][col]
        return False

    def scan(self) -> List[KeyEvent]:
        """
        执行一次矩阵扫描
        Perform one matrix scan

        扫描逻辑与 STM32 上的 QMK 扫描逻辑一致：
        逐行拉低，读取列状态，检测按键变化。

        Scanning logic matches QMK on STM32:
        Pull each row low, read columns, detect key changes.

        返回 Returns:
            List[KeyEvent]: 本次扫描中状态变化的按键事件列表
                           List of key events with state changes this scan
        """
        events = []
        self.scan_count += 1

        for row in range(self.rows):
            for col in range(self.cols):
                current = self._state[row][col]
                previous = self._prev_state[row][col]

                # 检测状态变化
                if current != previous:
                    event = KeyEvent(
                        row=row,
                        col=col,
                        pressed=current,
                        timestamp=self.scan_count / self.scan_rate_hz
                    )
                    events.append(event)

                    # 触发回调
                    for callback in self._event_callbacks:
                        callback(event)

                # 更新上一次状态
                self._prev_state[row][col] = current

        return events

    def get_all_pressed(self) -> List[tuple]:
        """
        获取所有当前按下的按键
        Get all currently pressed keys

        返回 Returns:
            List[tuple]: [(row, col), ...] 格式的按下按键列表
        """
        pressed = []
        for row in range(self.rows):
            for col in range(self.cols):
                if self._state[row][col]:
                    pressed.append((row, col))
        return pressed

    def register_callback(self, callback: Callable[[KeyEvent], None]) -> None:
        """
        注册按键事件回调函数
        Register key event callback

        参数 Args:
            callback: 回调函数，接收 KeyEvent 参数
                     Callback function receiving KeyEvent parameter
        """
        self._event_callbacks.append(callback)

    def get_state_string(self) -> str:
        """
        获取矩阵状态的可视化字符串
        Get a visual string representation of matrix state

        返回 Returns:
            str: 矩阵状态的 ASCII 表示
        """
        lines = ["    C0  C1  C2  C3"]
        for row in range(self.rows):
            line = f"R{row} "
            for col in range(self.cols):
                line += f" [{'X' if self._state[row][col] else '.'}] "
            lines.append(line)
        return "\n".join(lines)

    def __repr__(self) -> str:
        return f"KeyMatrix(rows={self.rows}, cols={self.cols}, pressed={len(self.get_all_pressed())})"
