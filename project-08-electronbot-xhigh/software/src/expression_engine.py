"""
表情动画引擎模块
Expression Animation Engine Module

功能：
1. 从图片文件加载表情资源
2. 动画状态机 (idle -> enter -> loop -> exit -> idle)
3. 表情切换过渡动画（含缓动）
4. 预定义表情：happy, sad, angry, surprised, sleepy, love 等
5. 事件触发反应系统

Features:
1. Load expression assets from image files
2. Animation state machine (idle -> enter -> loop -> exit -> idle)
3. Expression transitions with easing
4. Predefined expressions: happy, sad, angry, surprised, sleepy, love, etc.
5. Event-triggered reaction system
"""

import os
import time
import logging
import threading
from enum import Enum, auto
from typing import Dict, Optional, List

from utils import clamp, lerp, ease_in_out


logger = logging.getLogger('electronbot.expression')


class ExpressionState(Enum):
    """表情动画状态 | Expression animation states"""
    IDLE = auto()       # 空闲，播放默认表情 | Idle, playing default expression
    ENTER = auto()      # 进入动画 | Enter animation
    LOOP = auto()       # 循环播放 | Loop playback
    EXIT = auto()       # 退出动画 | Exit animation


# 预定义表情名称 | Predefined expression names
PREDEFINED_EXPRESSIONS = [
    "idle",         # 空闲/默认 | Idle/default
    "happy",        # 开心 | Happy
    "sad",          # 悲伤 | Sad
    "angry",        # 生气 | Angry
    "surprised",    # 惊讶 | Surprised
    "sleepy",       # 困倦 | Sleepy
    "love",         # 爱心 | Love
    "thinking",     # 思考 | Thinking
    "confused",     # 困惑 | Confused
    "excited",      # 兴奋 | Excited
    "scared",       # 害怕 | Scared
    "wink",         # 眨眼 | Wink
]


class Expression:
    """
    表情资源类
    Expression asset class

    一个表情由多帧图像组成，支持进入、循环和退出三个阶段。
    An expression consists of multiple frames, supporting enter, loop, and exit phases.
    """

    def __init__(self, name: str, frames: Optional[Dict[str, List[bytes]]] = None,
                 fps: float = 12.0, loop_count: int = -1):
        """
        初始化表情
        Initialize expression

        Args:
            name: 表情名称
            frames: 帧数据字典，包含 'enter', 'loop', 'exit' 三个键
            fps: 播放帧率
            loop_count: 循环次数 (-1 表示无限循环) | Loop count (-1 for infinite)
        """
        self.name = name
        self.frames = frames or {
            'enter': [],    # 进入帧 | Enter frames
            'loop': [],     # 循环帧 | Loop frames
            'exit': [],     # 退出帧 | Exit frames
        }
        self.fps = fps
        self.loop_count = loop_count
        self.frame_duration = 1.0 / fps if fps > 0 else 0.1

    def get_frames(self, phase: str) -> List[bytes]:
        """获取指定阶段的帧 | Get frames for a phase"""
        return self.frames.get(phase, [])

    def total_frames(self) -> int:
        """获取总帧数 | Get total frame count"""
        return sum(len(f) for f in self.frames.values())


class ExpressionEngine:
    """
    表情动画引擎
    Expression Animation Engine

    管理表情加载、状态机转换和动画播放。
    Manages expression loading, state machine transitions, and animation playback.

    状态机流程 | State machine flow:
        IDLE -> (play_expression called) -> ENTER -> LOOP -> EXIT -> IDLE
    """

    # I2C 显示命令字 | I2C display command bytes
    CMD_SET_EXPRESSION = 0x10
    CMD_DISPLAY_IMG = 0x11
    CMD_BLINK = 0x12

    def __init__(self, bridge, asset_path: str = "assets/expressions/",
                 default_expression: str = "idle"):
        """
        初始化表情引擎
        Initialize expression engine

        Args:
            bridge: USBBridge 实例
            asset_path: 表情资源目录路径
            default_expression: 默认表情名称
        """
        self.bridge = bridge
        self.asset_path = asset_path
        self.default_expression_name = default_expression

        # 表情资源库 | Expression asset library
        self.expressions: Dict[str, Expression] = {}

        # 状态机 | State machine
        self.state = ExpressionState.IDLE
        self.current_expression: Optional[Expression] = None
        self.current_frame_index = 0
        self.current_loop_count = 0

        # 控制标志 | Control flags
        self._running = False
        self._stop_requested = False
        self._thread: Optional[threading.Thread] = None
        self._lock = threading.Lock()

        # 加载预设表情 | Load preset expressions
        self._load_default_expressions()

        logger.info(f"表情引擎初始化完成 | Expression engine initialized")
        logger.info(f"已加载 {len(self.expressions)} 个表情 | Loaded {len(self.expressions)} expressions")

    def play_expression(self, name: str, loop_count: int = -1) -> bool:
        """
        播放指定表情
        Play the specified expression

        Args:
            name: 表情名称
            loop_count: 循环次数 (-1=无限) | Loop count (-1=infinite)

        Returns:
            bool: 是否成功开始播放
        """
        with self._lock:
            if name not in self.expressions:
                logger.warning(f"表情不存在 | Expression not found: {name}")
                # 发送表情名称到 STM32（固件端可能有内置表情）
                self._send_expression_command(name)
                return False

            # 如果当前正在播放其他表情，先请求退出
            # If currently playing another expression, request exit first
            if self.state != ExpressionState.IDLE and self.current_expression:
                self._stop_requested = True

            expr = self.expressions[name]
            expr.loop_count = loop_count

            self.current_expression = expr
            self.current_frame_index = 0
            self.current_loop_count = 0
            self.state = ExpressionState.ENTER
            self._stop_requested = False

            logger.info(f"播放表情 | Playing expression: {name}")
            return True

    def set_idle_expression(self, name: str) -> None:
        """
        设置空闲表情
        Set the idle/default expression

        Args:
            name: 表情名称
        """
        if name in self.expressions:
            self.default_expression_name = name
            logger.info(f"空闲表情设置为 | Idle expression set to: {name}")
            if self.state == ExpressionState.IDLE:
                self.play_expression(name)
        else:
            logger.warning(f"表情不存在 | Expression not found: {name}")

    def trigger_reaction(self, event: str) -> None:
        """
        触发事件反应
        Trigger a reaction to an event

        根据事件类型自动选择合适的表情和持续时间。
        Automatically selects an appropriate expression and duration
        based on the event type.

        Args:
            event: 事件名称（如 "poke", "wave", "clap", "face_detected" 等）
        """
        # 事件 -> 表情映射 | Event -> expression mapping
        reaction_map = {
            'poke': ('surprised', 1),       # 戳 -> 惊讶 | Poke -> surprised
            'wave': ('happy', 2),           # 挥手 -> 开心 | Wave -> happy
            'clap': ('excited', 3),         # 拍手 -> 兴奋 | Clap -> excited
            'face_detected': ('love', 1),   # 人脸 -> 爱心 | Face -> love
            'loud_sound': ('scared', 1),    # 大声 -> 害怕 | Loud -> scared
            'darkness': ('sleepy', 5),      # 黑暗 -> 困倦 | Dark -> sleepy
            'pet': ('happy', 2),            # 抚摸 -> 开心 | Pet -> happy
            'ignored': ('sad', 3),          # 忽略 -> 悲伤 | Ignored -> sad
        }

        if event in reaction_map:
            expr_name, loops = reaction_map[event]
            logger.info(f"事件反应 | Event reaction: {event} -> {expr_name}")
            self.play_expression(expr_name, loop_count=loops)
        else:
            logger.debug(f"未知的反应事件 | Unknown reaction event: {event}")

    def stop(self) -> None:
        """
        停止表情引擎
        Stop the expression engine
        """
        self._running = False
        self._stop_requested = True
        if self._thread and self._thread.is_alive():
            self._thread.join(timeout=2.0)
        logger.info("表情引擎已停止 | Expression engine stopped")

    def start(self) -> None:
        """
        启动表情引擎的动画循环
        Start the expression engine animation loop
        """
        if self._running:
            return
        self._running = True
        self._thread = threading.Thread(target=self._animation_loop, daemon=True)
        self._thread.start()
        logger.info("表情引擎已启动 | Expression engine started")

    def is_playing(self) -> bool:
        """是否正在播放表情 | Whether an expression is playing"""
        return self.state != ExpressionState.IDLE

    # ---- 内部方法 | Internal methods ----

    def _animation_loop(self) -> None:
        """
        动画主循环（在独立线程中运行）
        Main animation loop (runs in a separate thread)
        """
        while self._running:
            with self._lock:
                self._update_state_machine()
            time.sleep(0.02)  # 50 Hz 更新率 | 50 Hz update rate

    def _update_state_machine(self) -> None:
        """
        更新状态机
        Update the state machine

        状态转换逻辑 | State transition logic:
            IDLE: 等待 play_expression 调用
            ENTER: 播放进入帧，完成后转到 LOOP
            LOOP: 循环播放循环帧，达到次数或被停止后转到 EXIT
            EXIT: 播放退出帧，完成后回到 IDLE
        """
        if self.current_expression is None:
            return

        if self.state == ExpressionState.IDLE:
            # 空闲状态，什么都不做 | Idle, do nothing
            return

        elif self.state == ExpressionState.ENTER:
            enter_frames = self.current_expression.get_frames('enter')
            if enter_frames and self.current_frame_index < len(enter_frames):
                self._display_frame(enter_frames[self.current_frame_index])
                self.current_frame_index += 1
            else:
                # 进入帧播放完毕，切换到循环 | Enter done, switch to loop
                self.state = ExpressionState.LOOP
                self.current_frame_index = 0
                self.current_loop_count = 0

        elif self.state == ExpressionState.LOOP:
            loop_frames = self.current_expression.get_frames('loop')

            # 检查是否应该停止 | Check if should stop
            if self._stop_requested:
                self.state = ExpressionState.EXIT
                self.current_frame_index = 0
                return

            # 如果没有循环帧，直接退出 | If no loop frames, exit directly
            if not loop_frames:
                self.state = ExpressionState.EXIT
                self.current_frame_index = 0
                return

            # 播放循环帧 | Play loop frames
            if self.current_frame_index < len(loop_frames):
                self._display_frame(loop_frames[self.current_frame_index])
                self.current_frame_index += 1
            else:
                # 一轮循环结束 | One loop cycle complete
                self.current_frame_index = 0
                self.current_loop_count += 1

                # 检查循环次数 | Check loop count
                if (self.current_expression.loop_count > 0 and
                        self.current_loop_count >= self.current_expression.loop_count):
                    self.state = ExpressionState.EXIT
                    self.current_frame_index = 0

        elif self.state == ExpressionState.EXIT:
            exit_frames = self.current_expression.get_frames('exit')
            if exit_frames and self.current_frame_index < len(exit_frames):
                self._display_frame(exit_frames[self.current_frame_index])
                self.current_frame_index += 1
            else:
                # 退出完成，回到空闲 | Exit done, return to idle
                self.state = ExpressionState.IDLE
                self.current_expression = None
                self.current_frame_index = 0
                self._stop_requested = False

                # 播放默认空闲表情 | Play default idle expression
                self.play_expression(self.default_expression_name)

    def _display_frame(self, frame_data: bytes) -> None:
        """
        发送一帧到显示屏
        Send one frame to the display

        Args:
            frame_data: 帧图像数据 (原始像素或压缩格式)
        """
        if not self.bridge or not self.bridge.is_connected:
            return

        try:
            self.bridge.send_command(cmd=self.CMD_DISPLAY_IMG, data=frame_data)
        except Exception as e:
            logger.error(f"发送显示帧失败 | Display frame send failed: {e}")

    def _send_expression_command(self, name: str) -> None:
        """
        发送表情名称命令到 STM32（使用固件内置表情）
        Send expression name command to STM32 (using built-in firmware expressions)

        Args:
            name: 表情名称
        """
        if not self.bridge or not self.bridge.is_connected:
            return

        try:
            name_bytes = name.encode('ascii')[:16]  # 最多 16 字节 | Max 16 bytes
            self.bridge.send_command(cmd=self.CMD_SET_EXPRESSION, data=name_bytes)
        except Exception as e:
            logger.error(f"发送表情命令失败 | Expression command send failed: {e}")

    def _load_default_expressions(self) -> None:
        """
        加载默认表情资源
        Load default expression assets

        尝试从磁盘加载图片文件，如果文件不存在则创建占位符表情。
        Attempts to load image files from disk; creates placeholder expressions
        if files do not exist.
        """
        for name in PREDEFINED_EXPRESSIONS:
            expr = self._load_expression_from_disk(name)
            if expr is None:
                # 创建占位符表情（仅名称，固件端有内置资源）
                # Create placeholder expression (name only, firmware has built-in assets)
                expr = Expression(
                    name=name,
                    fps=12.0,
                    loop_count=-1 if name == 'idle' else 3,
                )
            self.expressions[name] = expr

    def _load_expression_from_disk(self, name: str) -> Optional[Expression]:
        """
        从磁盘加载表情资源
        Load expression assets from disk

        期望的目录结构 | Expected directory structure:
            assets/expressions/
                happy/
                    enter_0.bin, enter_1.bin, ...
                    loop_0.bin, loop_1.bin, ...
                    exit_0.bin, exit_1.bin, ...

        Args:
            name: 表情名称

        Returns:
            Expression 实例或 None（如果目录不存在）
        """
        expr_dir = os.path.join(self.asset_path, name)
        if not os.path.isdir(expr_dir):
            return None

        frames = {'enter': [], 'loop': [], 'exit': []}

        for phase in ['enter', 'loop', 'exit']:
            phase_frames = []
            index = 0
            while True:
                frame_path = os.path.join(expr_dir, f"{phase}_{index}.bin")
                if not os.path.exists(frame_path):
                    break
                try:
                    with open(frame_path, 'rb') as f:
                        phase_frames.append(f.read())
                except IOError as e:
                    logger.warning(f"读取帧文件失败 | Frame read failed: {frame_path}: {e}")
                index += 1
            frames[phase] = phase_frames

        total = sum(len(f) for f in frames.values())
        if total == 0:
            return None

        logger.info(f"从磁盘加载表情 | Loaded expression from disk: {name} ({total} frames)")
        return Expression(
            name=name,
            frames=frames,
            fps=12.0,
            loop_count=-1 if name == 'idle' else 3,
        )
