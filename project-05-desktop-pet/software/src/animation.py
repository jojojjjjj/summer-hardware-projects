"""
桌宠 "萌桌面" -- 动画系统
Desktop Pet "PetDesk" -- Animation System

功能：帧动画管理、Sprite Sheet加载、多状态动画切换
"""

import os
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import Qt, QTimer


class AnimationManager:
    """动画管理器 -- 管理多套动画的加载和切换

    负责：
    1. 从目录加载帧动画序列
    2. 从Sprite Sheet切割帧
    3. 管理当前播放状态
    4. 驱动帧切换定时器
    """

    def __init__(self, label, frame_size=200):
        """初始化动画管理器

        参数:
            label: 显示动画的QLabel控件
            frame_size: 帧显示大小（像素）
        """
        self.label = label
        self.frame_size = frame_size
        self.animations = {}        # {"状态名": {"frames": [...], "fps": int}}
        self.current_state = None   # 当前播放的状态名
        self.current_frame = 0      # 当前帧索引
        self.is_playing = False     # 是否正在播放

        # 帧切换定时器
        self.timer = QTimer()
        self.timer.timeout.connect(self.next_frame)

    def load_animation(self, state_name, sprite_dir, fps=8):
        """从目录加载一套动画

        扫描目录中的所有PNG图片，按文件名排序后加载为动画帧。

        参数:
            state_name: 状态名称（如 "idle", "walk"）
            sprite_dir: 包含帧图片的目录路径
            fps: 帧率（每秒帧数）
        """
        frames = []

        if not os.path.exists(sprite_dir):
            print(f"[动画] 警告：目录不存在 {sprite_dir}")
            return

        # 获取目录中的所有PNG文件，按文件名排序
        files = sorted([
            f for f in os.listdir(sprite_dir)
            if f.lower().endswith('.png')
        ])

        for filename in files:
            filepath = os.path.join(sprite_dir, filename)
            pixmap = QPixmap(filepath)
            if not pixmap.isNull():
                # 缩放到指定大小
                scaled = pixmap.scaled(
                    self.frame_size, self.frame_size,
                    Qt.KeepAspectRatio,
                    Qt.SmoothTransformation
                )
                frames.append(scaled)

        if frames:
            self.animations[state_name] = {
                "frames": frames,
                "fps": fps
            }
            print(f"[动画] 已加载 '{state_name}'：{len(frames)} 帧，{fps} FPS")
        else:
            print(f"[动画] 警告：目录 {sprite_dir} 中没有有效的PNG图片")

    def load_from_sprite_sheet(self, state_name, sheet_path, cols, rows, frame_w, frame_h, fps=8):
        """从Sprite Sheet加载动画

        Sprite Sheet是一张包含所有帧的大图，按网格排列。

        参数:
            state_name: 状态名称
            sheet_path: Sprite Sheet图片路径
            cols: 列数
            rows: 行数
            frame_w: 每帧宽度
            frame_h: 每帧高度
            fps: 帧率
        """
        sheet = QPixmap(sheet_path)
        if sheet.isNull():
            print(f"[动画] 警告：无法加载Sprite Sheet {sheet_path}")
            return

        frames = []
        for row in range(rows):
            for col in range(cols):
                # 从大图中裁剪出单帧
                frame = sheet.copy(
                    col * frame_w,
                    row * frame_h,
                    frame_w,
                    frame_h
                )
                if not frame.isNull():
                    scaled = frame.scaled(
                        self.frame_size, self.frame_size,
                        Qt.KeepAspectRatio,
                        Qt.SmoothTransformation
                    )
                    frames.append(scaled)

        if frames:
            self.animations[state_name] = {
                "frames": frames,
                "fps": fps
            }
            print(f"[动画] 从Sprite Sheet加载 '{state_name}'：{len(frames)} 帧")

    def switch_to(self, state_name):
        """切换到指定动画状态

        参数:
            state_name: 目标状态名
        """
        if state_name not in self.animations:
            print(f"[动画] 警告：动画 '{state_name}' 不存在")
            return

        # 如果已经是当前状态，不重复切换
        if state_name == self.current_state and self.is_playing:
            return

        self.current_state = state_name
        self.current_frame = 0

        # 获取该动画的帧率
        fps = self.animations[state_name]["fps"]
        interval = max(16, int(1000 / fps))  # 最小间隔16ms（约60FPS）

        # 重启定时器
        self.timer.stop()
        self.timer.start(interval)
        self.is_playing = True

        # 立即显示第一帧
        self.show_frame(0)

    def show_frame(self, index):
        """显示指定索引的帧

        参数:
            index: 帧索引
        """
        if self.current_state is None:
            return

        frames = self.animations[self.current_state]["frames"]
        if 0 <= index < len(frames):
            self.label.setPixmap(frames[index])

    def next_frame(self):
        """切换到下一帧（定时器回调）"""
        if self.current_state is None:
            return

        frames = self.animations[self.current_state]["frames"]
        self.current_frame = (self.current_frame + 1) % len(frames)
        self.show_frame(self.current_frame)

    def pause(self):
        """暂停动画"""
        self.timer.stop()
        self.is_playing = False

    def resume(self):
        """恢复动画"""
        if self.current_state:
            fps = self.animations[self.current_state]["fps"]
            self.timer.start(int(1000 / fps))
            self.is_playing = True

    def stop(self):
        """停止动画"""
        self.timer.stop()
        self.is_playing = False
        self.current_state = None

    def get_current_state(self):
        """获取当前动画状态名"""
        return self.current_state

    def has_animation(self, state_name):
        """检查是否有指定状态的动画"""
        return state_name in self.animations
