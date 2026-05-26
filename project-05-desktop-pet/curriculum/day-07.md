# Day 07: 气泡对话框与文字显示 | Bubble Dialog & Text Display

> **今日目标:**
> - 设计和实现自定义气泡对话框Widget
> - 学习QSS样式表美化界面
> - 创建宠物对话内容管理系统
> - 实现打字机效果的文字显示
>
> **产出:** 桌宠能通过气泡对话框表达想法，支持多种对话内容和打字效果

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 行为系统运行展示 |
| 09:15 - 10:30 | 知识讲解 | 自定义Widget、QSS样式、对话设计 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 实现气泡对话框Widget |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 对话内容管理和打字效果 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 丰富对话内容、表情符号 |
| 16:30 - 17:00 | 总结分享 | 对话系统设计讨论 |

---

## 上午: 气泡对话框设计 | Morning: Bubble Dialog Design

### 为什么要学这个? | Why Learn This?

想象一下，你的宠物走到屏幕边缘，头顶冒出一个气泡："好无聊啊~ 有人想和我玩吗？"。这种气泡对话框不仅让宠物有了"语言"，更赋予了它"个性"。用户不需要右键查看状态，宠物自己会告诉你它的想法。

Imagine your pet walking to the screen edge and a bubble appears: "So boring~ Anyone want to play?". This bubble dialog not only gives the pet "language" but also "personality". Users do not need to right-click to check status -- the pet tells you its thoughts directly.

自定义Widget和QSS样式是GUI开发的核心技能。在前端开发中对应的是HTML+CSS，在移动开发中对应的是自定义View+样式。学会这些技能后，你可以设计出美观的界面。

Custom widgets and QSS styling are core GUI development skills, analogous to HTML+CSS in web development and custom Views in mobile development.

### 任务7.1: 实现基础气泡对话框 (40分钟)

**步骤:**

创建文件 `dialog.py`：

```python
from PyQt5.QtWidgets import QLabel, QWidget, QGraphicsOpacityEffect
from PyQt5.QtCore import Qt, QTimer, QPropertyAnimation, QEasingCurve
from PyQt5.QtGui import QPainter, QColor, QPainterPath, QFont

class BubbleDialog(QWidget):
    """气泡对话框 -- 宠物头顶的文字气泡"""

    def __init__(self, parent=None):
        super().__init__(parent)
        self.text = ""
        self.display_text = ""  # 当前已显示的文字（打字效果用）
        self.char_index = 0
        self.typing_timer = QTimer()
        self.typing_timer.timeout.connect(self.typing_next_char)
        self.hide_timer = QTimer()
        self.hide_timer.setSingleShot(True)
        self.hide_timer.timeout.connect(self.fade_out)

        # 淡入淡出效果
        self.opacity_effect = QGraphicsOpacityEffect(self)
        self.setGraphicsEffect(self.opacity_effect)
        self.opacity_effect.setOpacity(0)  # 初始不可见

        self.setup_ui()

    def setup_ui(self):
        """设置UI样式"""
        self.setWindowFlags(Qt.FramelessWindowHint | Qt.Tool)
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.resize(200, 60)

    def show_message(self, text, duration=3000, typing_speed=50):
        """显示气泡消息（带打字效果）

        参数:
            text: 要显示的文字
            duration: 显示持续时间（毫秒）
            typing_speed: 每个字符的显示间隔（毫秒）
        """
        self.text = text
        self.display_text = ""
        self.char_index = 0

        # 调整窗口大小以适应文字长度
        text_width = max(100, len(text) * 16 + 30)
        self.resize(text_width, 50)

        # 淡入
        self.fade_in()

        # 开始打字效果
        self.typing_timer.start(typing_speed)

        # 设置自动隐藏定时器（打字完成后持续一段时间再隐藏）
        typing_duration = len(text) * typing_speed
        total_duration = typing_duration + duration
        self.hide_timer.start(total_duration)

        self.show()

    def typing_next_char(self):
        """打字效果 -- 逐字显示"""
        if self.char_index < len(self.text):
            self.display_text += self.text[self.char_index]
            self.char_index += 1
            self.update()  # 触发重绘
        else:
            self.typing_timer.stop()  # 打字完成

    def paintEvent(self, event):
        """自定义绘制气泡"""
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)

        # 绘制气泡背景（圆角矩形 + 小尾巴）
        bubble_path = QPainterPath()
        bubble_rect = self.rect().adjusted(5, 5, -5, -15)
        bubble_path.addRoundedRect(bubble_rect, 12, 12)

        # 绘制小三角尾巴
        tail_x = 30
        tail_top = bubble_rect.bottom()
        bubble_path.moveTo(tail_x, tail_top)
        bubble_path.lineTo(tail_x - 5, tail_top + 10)
        bubble_path.lineTo(tail_x + 10, tail_top)
        bubble_path.closeSubpath()

        # 填充白色背景
        painter.fillPath(bubble_path, QColor(255, 255, 255, 230))

        # 绘制边框
        painter.setPen(QColor(200, 200, 200))
        painter.drawPath(bubble_path)

        # 绘制文字
        painter.setPen(QColor(50, 50, 50))
        font = QFont("Microsoft YaHei", 11)
        painter.setFont(font)
        text_rect = bubble_rect.adjusted(10, 5, -10, -5)
        painter.drawText(text_rect, Qt.AlignLeft | Qt.AlignVCenter, self.display_text)

        painter.end()

    def fade_in(self):
        """淡入动画"""
        animation = QPropertyAnimation(self.opacity_effect, b"opacity")
        animation.setDuration(200)
        animation.setStartValue(0.0)
        animation.setEndValue(1.0)
        animation.setEasingCurve(QEasingCurve.InOutQuad)
        animation.start()
        self._fade_animation = animation  # 保持引用防止被垃圾回收

    def fade_out(self):
        """淡出动画"""
        animation = QPropertyAnimation(self.opacity_effect, b"opacity")
        animation.setDuration(300)
        animation.setStartValue(1.0)
        animation.setEndValue(0.0)
        animation.setEasingCurve(QEasingCurve.InOutQuad)
        animation.finished.connect(self.hide)
        animation.start()
        self._fade_animation = animation
```

**预期结果:**
- 气泡从宠物头顶弹出，带有圆角和小尾巴
- 文字逐字显示（打字机效果）
- 显示一段时间后自动淡出消失
- 气泡有白色半透明背景，文字清晰可读

**常见问题:**
- **气泡不显示**：确认parent参数正确，气泡位置在宠物窗口上方
- **打字速度太快/太慢**：调整typing_speed参数（数字越小越快）
- **气泡被桌面挡住**：确认气泡窗口也设置了WindowStaysOnTopHint

### 任务7.2: 集成气泡到桌宠 (30分钟)

```python
class PetWindow(QWidget):
    def __init__(self):
        super().__init__()
        self._drag_pos = None
        self.init_ui()
        self.setup_bubble()

    def init_ui(self):
        self.setWindowFlags(
            Qt.FramelessWindowHint |
            Qt.WindowStaysOnTopHint |
            Qt.Tool
        )
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.resize(200, 200)

        self.pet_label = QLabel(self)
        self.pet_label.setGeometry(0, 0, 200, 200)

        self.show()

    def setup_bubble(self):
        """设置气泡对话框"""
        self.bubble = BubbleDialog()
        # 气泡位置在宠物头顶
        self.update_bubble_position()

    def update_bubble_position(self):
        """更新气泡位置（跟随宠物移动）"""
        pet_pos = self.pos()
        bubble_x = pet_pos.x() + 20  # 稍微偏右
        bubble_y = pet_pos.y() - 60   # 在头顶上方
        self.bubble.move(bubble_x, bubble_y)

    def show_bubble(self, text, duration=3000):
        """显示气泡消息"""
        self.update_bubble_position()
        self.bubble.show_message(text, duration)

    def moveEvent(self, event):
        """窗口移动时同步更新气泡位置"""
        super().moveEvent(event)
        self.update_bubble_position()
```

---

## 下午: 对话内容管理 | Afternoon: Dialogue Content Management

### 任务7.3: 创建对话内容库 (30分钟)

```python
import random

class DialogueManager:
    """对话管理器 -- 管理宠物的所有对话内容"""

    def __init__(self):
        # 按场景分类的对话内容
        self.dialogues = {
            # 通用随机对话
            "random": [
                "今天天气真好呀~",
                "你想和我玩吗？",
                "我在想一些事情...",
                "嘿嘿，我在这里！",
                "你知道吗？我很喜欢你！",
                "让我看看你在干什么~",
                "无聊的时候可以摸摸我哦",
                "我觉得你今天特别帅！",
                "我刚才偷偷学了个新技能~",
                "嘘...我在观察人类",
            ],
            # 饥饿时
            "hungry": [
                "肚子好饿啊...",
                "想吃东西了~",
                "有没有好吃的？",
                "我快饿扁了！",
                "喂我嘛~",
            ],
            # 被抚摸时
            "petted": [
                "好舒服！",
                "嘿嘿~",
                "再摸一下嘛~",
                "开心！",
                "你是最好的主人！",
                "喵~",
                "汪！",
            ],
            # 困倦时
            "sleepy": [
                "好困啊...",
                "让我打个盹...",
                "晚安...",
                "zZZ...",
                "需要休息一下~",
            ],
            # 走路时
            "walking": [
                "去那边看看~",
                "散步真开心",
                "这边有什么呢？",
                "探险中...",
                "我去去就来~",
            ],
            # 早上
            "morning": [
                "早上好！新的一天开始了！",
                "早安~ 昨晚睡得好吗？",
                "今天要做什么呢？",
            ],
            # 晚上
            "night": [
                "该睡觉了吧？",
                "晚安~明天见！",
                "夜深了，早点休息哦",
            ],
        }

    def get_random_dialogue(self, category="random"):
        """获取指定类别的随机对话"""
        if category in self.dialogues:
            return random.choice(self.dialogues[category])
        return random.choice(self.dialogues["random"])

    def get_contextual_dialogue(self, needs, current_state, hour=None):
        """根据上下文（需求、状态、时间）选择合适的对话"""
        # 时间相关对话
        if hour is not None:
            if 6 <= hour < 12:
                if random.random() < 0.3:
                    return self.get_random_dialogue("morning")
            elif 22 <= hour or hour < 6:
                if random.random() < 0.3:
                    return self.get_random_dialogue("night")

        # 需求相关对话
        if needs and needs.is_hungry():
            return self.get_random_dialogue("hungry")
        if needs and needs.is_sleepy():
            return self.get_random_dialogue("sleepy")

        # 状态相关对话
        if current_state == "walk":
            return self.get_random_dialogue("walking")

        # 默认随机对话
        return self.get_random_dialogue("random")

    def add_dialogue(self, category, text):
        """添加自定义对话"""
        if category not in self.dialogues:
            self.dialogues[category] = []
        self.dialogues[category].append(text)
```

### 任务7.4: 随机对话触发器 (20分钟)

```python
class RandomTalker:
    """随机说话器 -- 定时让宠物说随机对话"""

    def __init__(self, pet_window, dialogue_manager):
        self.pet = pet_window
        self.dialogues = dialogue_manager
        self.timer = QTimer()
        self.timer.timeout.connect(self.talk)
        self.min_interval = 15000   # 最短间隔15秒
        self.max_interval = 60000   # 最长间隔60秒
        self.schedule_next()

    def schedule_next(self):
        """安排下一次说话"""
        interval = random.randint(self.min_interval, self.max_interval)
        self.timer.start(interval)

    def talk(self):
        """让宠物说一句话"""
        from datetime import datetime
        hour = datetime.now().hour

        text = self.dialogues.get_contextual_dialogue(
            needs=self.pet.needs if hasattr(self.pet, 'needs') else None,
            current_state=self.pet.state_machine.get_current_state_name() if hasattr(self.pet, 'state_machine') else None,
            hour=hour
        )
        self.pet.show_bubble(text)
        self.schedule_next()
```

### 任务7.5: QSS样式美化 (20分钟)

学习QSS（Qt Style Sheets）美化控件：

```python
# QSS样式示例
MENU_STYLE = """
QMenu {
    background-color: #2c2c2c;
    border: 1px solid #555;
    border-radius: 8px;
    padding: 5px;
    color: white;
}
QMenu::item {
    padding: 8px 25px;
    border-radius: 4px;
}
QMenu::item:selected {
    background-color: #4CAF50;
}
QMenu::separator {
    height: 1px;
    background-color: #555;
    margin: 5px 10px;
}
"""

# 在右键菜单中使用
def contextMenuEvent(self, event):
    menu = QMenu(self)
    menu.setStyleSheet(MENU_STYLE)
    # ... 添加菜单项
```

---

## 今日作业 | Homework

### 必做题
1. 实现气泡对话框Widget，支持打字机效果
2. 创建对话内容库，至少包含3个场景共15条对话
3. 将气泡系统集成到桌宠，移动时气泡跟随

### 挑战题
1. 实现不同情感的气泡样式（开心时绿色、难过时蓝色、饥饿时橙色）
2. 添加"打字音效"（每显示一个字符播放一个轻微的声音）
3. 实现气泡的"弹出"动画（从小到大缩放出现）

### 思考题
1. 为什么用自定义paintEvent来绘制气泡，而不是用QLabel + QSS样式？
2. 如何设计对话系统才能让宠物的"性格"更鲜明？

---

## 明日预告 | Tomorrow's Preview

明天我们将为桌宠添加音效和视觉特效。当宠物走路时有脚步声，被点击时有可爱的声音，开心时有心形粒子飘出。这些"感觉反馈"将让你的桌宠从"看得见"升级为"看得见也听得到"！

Tomorrow we add sound effects and visual effects. Footsteps when walking, cute sounds when clicked, heart particles when happy. These sensory feedbacks upgrade your pet from "visible" to "visible and audible"!

---

## 参考资源 | References

- [PyQt5 QSS样式表教程](https://www.runoob.com/pyqt5/pyqt5-stylesheet.html)
- [Qt 样式表参考](https://doc.qt.io/qt-5/stylesheet-reference.html)
- [Pixabay 免费音效](https://pixabay.com/sound-effects/)
- [Google Fonts 免费字体](https://fonts.google.com/)
- [3分钟智能对话AI多功能桌宠，零基础也能一键制作](https://www.bilibili.com/video/BV1MaSeBPEus/) -- UP主：彻喵，展示AI对话功能与桌宠的结合
- [AI桌宠详细教程，如果这都做不出来，那我送你了！](https://www.bilibili.com/video/BV1KMQnBFEHu/) -- UP主：VOID造物主，AI桌宠入门教程，含对话系统讲解

*最后更新：2026-05-26*
