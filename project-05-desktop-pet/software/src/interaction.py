"""
桌宠 "萌桌面" -- 交互系统
Desktop Pet "PetDesk" -- Interaction System

功能：物理模拟（抛掷、碰撞）、气泡对话框、对话内容管理
"""

import random

from PyQt5.QtWidgets import QWidget, QApplication
from PyQt5.QtGui import QPainter, QColor, QPainterPath, QFont
from PyQt5.QtCore import Qt, QTimer, QPropertyAnimation, QEasingCurve, QGraphicsOpacityEffect


class PhysicsBody:
    """物理体 -- 带速度、摩擦力和边界碰撞的物体

    用于实现桌宠的惯性抛掷和边界反弹效果。
    """

    def __init__(self, x=0, y=0):
        """初始化物理体

        参数:
            x, y: 初始位置
        """
        self.x = float(x)
        self.y = float(y)
        self.vx = 0.0           # 水平速度（像素/帧）
        self.vy = 0.0           # 垂直速度（像素/帧）
        self.friction = 0.95    # 摩擦力（每帧速度衰减比例）
        self.gravity = 0.5      # 重力加速度
        self.bounce = 0.6       # 弹跳系数
        self.use_gravity = False # 是否启用重力

    def update(self, screen_width, screen_height, obj_width, obj_height):
        """更新物理状态（每帧调用）

        参数:
            screen_width: 屏幕宽度
            screen_height: 屏幕高度
            obj_width: 物体宽度
            obj_height: 物体高度
        """
        # 应用重力
        if self.use_gravity:
            self.vy += self.gravity

        # 应用摩擦力
        self.vx *= self.friction
        if self.use_gravity:
            self.vy *= self.friction

        # 更新位置
        self.x += self.vx
        self.y += self.vy

        # 边界碰撞检测
        self._check_boundary(screen_width, screen_height, obj_width, obj_height)

        # 速度过小时停止（避免无限微小运动）
        if abs(self.vx) < 0.1:
            self.vx = 0
        if abs(self.vy) < 0.1 and not self.use_gravity:
            self.vy = 0

    def _check_boundary(self, screen_w, screen_h, obj_w, obj_h):
        """边界碰撞检测与反弹

        当物体碰到屏幕边缘时，反转速度方向并乘以弹跳系数。
        """
        # 左边界
        if self.x < 0:
            self.x = 0
            self.vx = abs(self.vx) * self.bounce
        # 右边界
        elif self.x > screen_w - obj_w:
            self.x = screen_w - obj_w
            self.vx = -abs(self.vx) * self.bounce

        # 上边界
        if self.y < 0:
            self.y = 0
            self.vy = abs(self.vy) * self.bounce

        # 下边界（地面）
        if self.y > screen_h - obj_h:
            self.y = screen_h - obj_h
            self.vy = -abs(self.vy) * self.bounce
            # 弹跳速度很小时停止弹跳
            if abs(self.vy) < 1.0:
                self.vy = 0

    def fling(self, vx, vy):
        """抛掷 -- 设置初始速度

        参数:
            vx: 水平速度
            vy: 垂直速度
        """
        self.vx = vx
        self.vy = vy

    def stop(self):
        """停止运动"""
        self.vx = 0
        self.vy = 0

    def is_moving(self):
        """是否在运动"""
        return abs(self.vx) > 0.5 or abs(self.vy) > 0.5


class BubbleDialog(QWidget):
    """气泡对话框 -- 宠物头顶的文字气泡

    支持：
    - 圆角矩形气泡背景
    - 小三角"尾巴"指向宠物
    - 打字机效果（逐字显示）
    - 淡入淡出动画
    """

    def __init__(self, parent=None):
        super().__init__(parent)
        self.text = ""
        self.display_text = ""
        self.char_index = 0

        # 打字效果定时器
        self.typing_timer = QTimer()
        self.typing_timer.timeout.connect(self._typing_next)

        # 淡入淡出效果
        self.opacity_effect = QGraphicsOpacityEffect(self)
        self.setGraphicsEffect(self.opacity_effect)
        self.opacity_effect.setOpacity(0)

        # 自动隐藏定时器
        self.hide_timer = QTimer()
        self.hide_timer.setSingleShot(True)
        self.hide_timer.timeout.connect(self._fade_out)

        self.setAttribute(Qt.WA_TranslucentBackground)
        self.resize(200, 50)

    def show_message(self, text, duration=3000, typing_speed=50):
        """显示气泡消息

        参数:
            text: 要显示的文字
            duration: 打字完成后持续显示的时间（毫秒）
            typing_speed: 每个字符的显示间隔（毫秒）
        """
        self.text = text
        self.display_text = ""
        self.char_index = 0

        # 根据文字长度调整窗口宽度
        text_width = max(120, min(300, len(text) * 16 + 40))
        self.resize(text_width, 55)

        # 淡入
        self._fade_in()

        # 开始打字效果
        self.typing_timer.start(typing_speed)

        # 设置自动隐藏（打字完成后持续duration毫秒）
        typing_duration = len(text) * typing_speed + duration
        self.hide_timer.start(typing_duration)

        self.show()

    def _typing_next(self):
        """打字效果 -- 逐字显示下一个字符"""
        if self.char_index < len(self.text):
            self.display_text += self.text[self.char_index]
            self.char_index += 1
            self.update()  # 触发paintEvent重绘
        else:
            self.typing_timer.stop()

    def paintEvent(self, event):
        """自定义绘制气泡外观"""
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)

        # 气泡主体（圆角矩形）
        bubble_rect = self.rect().adjusted(5, 5, -5, -12)
        bubble_path = QPainterPath()
        bubble_path.addRoundedRect(bubble_rect, 12, 12)

        # 小三角尾巴
        tail_x = 25
        tail_top = bubble_rect.bottom()
        bubble_path.moveTo(tail_x, tail_top)
        bubble_path.lineTo(tail_x - 5, tail_top + 8)
        bubble_path.lineTo(tail_x + 10, tail_top)
        bubble_path.closeSubpath()

        # 填充白色半透明背景
        painter.fillPath(bubble_path, QColor(255, 255, 255, 220))

        # 绘制浅灰色边框
        painter.setPen(QColor(200, 200, 200, 180))
        painter.drawPath(bubble_path)

        # 绘制文字
        painter.setPen(QColor(50, 50, 50))
        font = QFont("Microsoft YaHei", 11)
        painter.setFont(font)
        text_rect = bubble_rect.adjusted(10, 3, -10, -3)
        painter.drawText(text_rect, Qt.AlignLeft | Qt.AlignVCenter, self.display_text)

        painter.end()

    def _fade_in(self):
        """淡入动画"""
        anim = QPropertyAnimation(self.opacity_effect, b"opacity")
        anim.setDuration(200)
        anim.setStartValue(0.0)
        anim.setEndValue(1.0)
        anim.setEasingCurve(QEasingCurve.InOutQuad)
        anim.start()
        self._animation = anim  # 保持引用防止被垃圾回收

    def _fade_out(self):
        """淡出动画"""
        anim = QPropertyAnimation(self.opacity_effect, b"opacity")
        anim.setDuration(300)
        anim.setStartValue(1.0)
        anim.setEndValue(0.0)
        anim.setEasingCurve(QEasingCurve.InOutQuad)
        anim.finished.connect(self.hide)
        anim.start()
        self._animation = anim


class DialogueManager:
    """对话内容管理器 -- 按场景分类存储和检索对话内容

    根据宠物的当前需求、行为状态和时间，选择合适的对话文字。
    """

    def __init__(self):
        # 按场景分类的对话内容
        self.dialogues = {
            "random": [
                "今天天气真好呀~",
                "你想和我玩吗？",
                "我在想一些事情...",
                "嘿嘿，我在这里！",
                "你知道吗？我很喜欢你！",
                "让我看看你在干什么~",
                "无聊的时候可以摸摸我哦",
                "我觉得你今天特别棒！",
                "我刚才偷偷学了个新技能~",
                "嘘...我在观察人类",
                "你会一直陪着我吗？",
                "今天过得怎么样呀？",
            ],
            "hungry": [
                "肚子好饿啊...",
                "想吃东西了~",
                "有没有好吃的？",
                "我快饿扁了！",
                "喂我嘛~",
                "闻到了什么好吃的！",
            ],
            "petted": [
                "好舒服！",
                "嘿嘿~",
                "再摸一下嘛~",
                "开心！",
                "你是最好的主人！",
                "喵~",
                "喜欢被摸摸！",
            ],
            "sleepy": [
                "好困啊...",
                "让我打个盹...",
                "晚安...",
                "zZZ...",
                "需要休息一下~",
                "眼睛快睁不开了...",
            ],
            "walking": [
                "去那边看看~",
                "散步真开心",
                "这边有什么呢？",
                "探险中...",
                "我去去就来~",
                "溜达溜达~",
            ],
            "morning": [
                "早上好！新的一天开始了！",
                "早安~ 昨晚睡得好吗？",
                "今天要做什么呢？",
            ],
            "night": [
                "该睡觉了吧？",
                "晚安~明天见！",
                "夜深了，早点休息哦",
            ],
        }

    def get_random_dialogue(self, category="random"):
        """获取指定类别的随机对话

        参数:
            category: 对话类别

        返回:
            随机选取的对话文字
        """
        if category in self.dialogues:
            return random.choice(self.dialogues[category])
        return random.choice(self.dialogues["random"])

    def get_contextual_dialogue(self, needs=None, current_state=None, hour=None):
        """根据上下文选择合适的对话

        优先级：时间 > 需求 > 状态 > 随机

        参数:
            needs: NeedsSystem实例
            current_state: 当前状态名
            hour: 当前小时（0-23）

        返回:
            合适的对话文字
        """
        # 时间相关对话（30%概率）
        if hour is not None:
            if 6 <= hour < 12 and random.random() < 0.3:
                return self.get_random_dialogue("morning")
            elif (22 <= hour or hour < 6) and random.random() < 0.3:
                return self.get_random_dialogue("night")

        # 需求相关对话
        if needs:
            if needs.is_hungry():
                return self.get_random_dialogue("hungry")
            if needs.is_sleepy():
                return self.get_random_dialogue("sleepy")

        # 状态相关对话
        if current_state == "walk":
            return self.get_random_dialogue("walking")

        # 默认随机对话
        return self.get_random_dialogue("random")

    def add_dialogue(self, category, text):
        """添加自定义对话内容

        参数:
            category: 对话类别
            text: 对话文字
        """
        if category not in self.dialogues:
            self.dialogues[category] = []
        self.dialogues[category].append(text)
