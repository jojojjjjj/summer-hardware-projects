# Day 04: 事件处理与鼠标交互 | Event Handling & Mouse Interaction

> **今日目标:**
> - 深入理解Qt事件系统
> - 实现多种鼠标交互（点击、双击、悬停、拖拽）
> - 学习键盘事件处理
> - 为桌宠添加丰富的交互反馈
>
> **产出:** 桌宠能对不同鼠标操作做出不同反应（点击开心、拖拽跟随、悬停好奇）

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 动画系统效果展示，讨论最佳实践 |
| 09:15 - 10:30 | 知识讲解 | Qt事件系统、事件过滤器、事件传播 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 实现多种鼠标交互 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 集成交互系统到桌宠 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 键盘快捷键、桌面边界检测 |
| 16:30 - 17:00 | 总结分享 | 交互设计讨论 |

---

## 上午: Qt事件系统 | Morning: Qt Event System

### 为什么要学这个? | Why Learn This?

"交互"是桌宠区别于普通桌面壁纸的核心。一个好的桌宠应该对用户的每个操作都有反馈：鼠标移过来时好奇地看、点击时开心地跳、拖拽时跟着走、放下来时摇摇尾巴。

"Interaction" is what distinguishes a desktop pet from wallpaper. A good pet reacts to every user action: curious when the mouse approaches, happy when clicked, follows when dragged, and wags its tail when released.

事件处理是所有GUI应用的核心。无论是手机App的滑动、网页的点击、还是游戏的按键操作，底层都是"事件驱动"机制。掌握事件处理，是成为合格软件开发者的必经之路。

Event handling is the core of all GUI apps. Whether it is swiping on mobile, clicking on web pages, or pressing keys in games, the underlying mechanism is event-driven programming.

### Qt事件传播机制 | Qt Event Propagation

```
事件产生（操作系统）
    ↓
QApplication（应用级分发）
    ↓
QWidget（接收事件）
    ↓
事件处理函数被调用
    ├── 处理了 -> event.accept()，事件到此结束
    └── 没处理 -> event.ignore()，事件传给父控件
```

**常用鼠标事件：**

| 事件 | 触发时机 | 方法名 |
|------|----------|--------|
| 鼠标按下 | 按下鼠标按键 | `mousePressEvent` |
| 鼠标释放 | 松开鼠标按键 | `mouseReleaseEvent` |
| 鼠标移动 | 移动鼠标 | `mouseMoveEvent` |
| 鼠标双击 | 快速按两次 | `mouseDoubleClickEvent` |
| 鼠标进入 | 鼠标移入控件 | `enterEvent` |
| 鼠标离开 | 鼠标移出控件 | `leaveEvent` |
| 滚轮滚动 | 滚动鼠标滚轮 | `wheelEvent` |

### 任务4.1: 综合鼠标事件处理 (40分钟)

**步骤:**

创建文件 `interaction_demo.py`：

```python
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import Qt, QTimer, QPoint

class InteractivePetWindow(QWidget):
    """支持多种鼠标交互的桌宠窗口"""

    def __init__(self):
        super().__init__()
        self._drag_pos = None
        self._click_count = 0
        self.init_ui()

    def init_ui(self):
        # 透明窗口设置
        self.setWindowFlags(
            Qt.FramelessWindowHint |
            Qt.WindowStaysOnTopHint |
            Qt.Tool
        )
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.resize(200, 200)

        # 宠物图片
        self.pet_label = QLabel(self)
        self.pet_label.setGeometry(0, 0, 200, 200)
        self.pet_label.setAlignment(Qt.AlignCenter)
        self.load_image("assets/sprites/idle_01.png")

        # 提示标签（临时文字提示）
        self.hint_label = QLabel("", self)
        self.hint_label.setGeometry(0, -30, 200, 30)
        self.hint_label.setAlignment(Qt.AlignCenter)
        self.hint_label.setStyleSheet("""
            font-size: 14px;
            color: #FF6B6B;
            background-color: rgba(255, 255, 255, 180);
            border-radius: 10px;
            padding: 2px 8px;
        """)
        self.hint_label.hide()

        # 恢复定时器（用于延迟恢复表情）
        self.recover_timer = QTimer()
        self.recover_timer.setSingleShot(True)  # 只触发一次
        self.recover_timer.timeout.connect(self.recover_to_idle)

        self.move(800, 400)
        self.show()

    def load_image(self, path):
        """加载图片"""
        pixmap = QPixmap(path)
        if not pixmap.isNull():
            scaled = pixmap.scaled(
                self.pet_label.size(),
                Qt.KeepAspectRatio,
                Qt.SmoothTransformation
            )
            self.pet_label.setPixmap(scaled)

    def show_hint(self, text, duration=2000):
        """显示临时提示文字"""
        self.hint_label.setText(text)
        self.hint_label.show()
        # duration毫秒后自动隐藏
        QTimer.singleShot(duration, self.hint_label.hide)

    # ---- 鼠标事件处理 ----

    def mousePressEvent(self, event):
        """鼠标按下"""
        if event.button() == Qt.LeftButton:
            self._drag_pos = event.globalPos() - self.frameGeometry().topLeft()
            self._click_count += 1

            # 根据点击次数显示不同反应
            if self._click_count == 1:
                self.show_hint("喵~")
            elif self._click_count == 3:
                self.show_hint("摸够了啦！")
                self._click_count = 0
            else:
                reactions = ["嘿嘿~", "好舒服！", "继续~", "开心！"]
                import random
                self.show_hint(random.choice(reactions))

            event.accept()

        elif event.button() == Qt.RightButton:
            # 右键不处理（留给contextMenuEvent）
            event.ignore()

    def mouseReleaseEvent(self, event):
        """鼠标释放"""
        if event.button() == Qt.LeftButton:
            self._drag_pos = None
            event.accept()

    def mouseMoveEvent(self, event):
        """鼠标移动 -- 拖拽"""
        if self._drag_pos and event.buttons() == Qt.LeftButton:
            new_pos = event.globalPos() - self._drag_pos
            self.move(new_pos)
            event.accept()

    def mouseDoubleClickEvent(self, event):
        """鼠标双击"""
        if event.button() == Qt.LeftButton:
            self.show_hint("被双击了！好痒！", 3000)
            event.accept()

    def enterEvent(self, event):
        """鼠标移入"""
        self.show_hint("有人来了？", 1500)

    def leaveEvent(self, event):
        """鼠标移出"""
        self.hint_label.hide()

    def wheelEvent(self, event):
        """鼠标滚轮"""
        delta = event.angleDelta().y()
        if delta > 0:
            self.show_hint("往上滚了~")
        else:
            self.show_hint("往下滚了~")
        event.accept()

    def recover_to_idle(self):
        """恢复到待机状态"""
        self.load_image("assets/sprites/idle_01.png")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = InteractivePetWindow()
    sys.exit(app.exec_())
```

**预期结果:**
- 鼠标移入：显示"有人来了？"
- 单击：显示随机反应文字
- 双击：显示"被双击了！好痒！"
- 滚轮：显示"往上/下滚了~"
- 拖拽：宠物跟随鼠标移动

**常见问题:**
- **事件不触发**：确认窗口设置中没有`Qt.WindowTransparentForInput`（鼠标穿透）
- **拖拽和点击冲突**：在`mousePressEvent`中记录起始位置，在`mouseMoveEvent`中检查
- **文字显示位置不对**：调整`hint_label`的Geometry

### 任务4.2: 区域点击检测 (20分钟)

让宠物对不同部位的点击有不同反应：

```python
def mousePressEvent(self, event):
    """根据点击位置给出不同反应"""
    if event.button() == Qt.LeftButton:
        click_pos = event.pos()  # 窗口内的相对坐标

        # 将窗口分为上下两部分（假设200x200窗口）
        if click_pos.y() < 100:  # 上半部分 = 头部
            self.show_hint("摸头了~好舒服！")
        else:  # 下半部分 = 身体
            self.show_hint("摸肚子了~痒痒的！")

        # 记录拖拽位置
        self._drag_pos = event.globalPos() - self.frameGeometry().topLeft()
        event.accept()
```

---

## 下午: 键盘事件与桌面边界 | Afternoon: Keyboard Events & Boundary Detection

### 任务4.3: 键盘事件处理 (20分钟)

```python
def keyPressEvent(self, event):
    """键盘按下事件"""
    key = event.key()

    if key == Qt.Key_Escape:
        # ESC键退出
        QApplication.quit()
    elif key == Qt.Key_Space:
        # 空格键 -- 宠物跳跃
        self.show_hint("跳！", 1000)
    elif key == Qt.Key_F:
        # F键 -- 喂食
        self.show_hint("谢谢喂食！", 2000)
    elif key == Qt.Key_H:
        # H键 -- 打招呼
        self.show_hint("你好呀！", 2000)

    event.accept()
```

**注意：** 键盘事件需要窗口有焦点才能接收。对于桌宠来说，你可能更希望它不抢夺焦点（用`Qt.Tool`标志已经实现了）。

### 任务4.4: 桌面边界检测 (30分钟)

防止宠物走出屏幕：

```python
def move_to(self, x, y):
    """移动宠物到指定位置，防止走出屏幕"""
    screen = QApplication.desktop().screenGeometry()

    # 计算边界限制
    max_x = screen.width() - self.width()
    max_y = screen.height() - self.height()

    # 限制在屏幕范围内
    x = max(0, min(x, max_x))
    y = max(0, min(y, max_y))

    self.move(x, y)

def get_position(self):
    """获取宠物当前位置"""
    pos = self.pos()
    return pos.x(), pos.y()
```

### 任务4.5: 整合交互系统 (30分钟)

将今天学习的所有交互整合到桌宠中：

```python
class InteractivePetWindow(QWidget):
    """完整交互桌宠 -- 第一阶段最终版本"""

    def __init__(self):
        super().__init__()
        self._drag_pos = None
        self._click_count = 0
        self.is_dragging = False
        self.init_ui()
        self.setup_animations()

    def init_ui(self):
        self.setWindowFlags(
            Qt.FramelessWindowHint |
            Qt.WindowStaysOnTopHint |
            Qt.Tool
        )
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.resize(200, 200)

        # 宠物显示
        self.pet_label = QLabel(self)
        self.pet_label.setGeometry(0, 0, 200, 200)

        # 提示气泡（简化版，Day 7会详细实现）
        self.hint_label = QLabel("", self)
        self.hint_label.setGeometry(0, -30, 200, 30)
        self.hint_label.setAlignment(Qt.AlignCenter)
        self.hint_label.setStyleSheet(
            "font-size: 14px; color: #333; "
            "background-color: rgba(255,255,255,200); "
            "border-radius: 10px; padding: 2px 8px;"
        )
        self.hint_label.hide()

        self.show()

    def setup_animations(self):
        """设置动画（集成Day 3的AnimationManager）"""
        from animation_manager import AnimationManager

        self.anim_manager = AnimationManager(self.pet_label)
        self.anim_manager.load_animation("idle", "assets/sprites/idle", fps=8)
        self.anim_manager.load_animation("happy", "assets/sprites/happy", fps=10)
        self.anim_manager.load_animation("walk", "assets/sprites/walk", fps=10)
        self.anim_manager.switch_to("idle")

    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            self._drag_pos = event.globalPos() - self.frameGeometry().topLeft()
            self.anim_manager.switch_to("happy")  # 被点击时切换到开心动画
            self.show_hint("喵~", 2000)
            event.accept()

    def mouseMoveEvent(self, event):
        if self._drag_pos and event.buttons() == Qt.LeftButton:
            new_pos = event.globalPos() - self._drag_pos
            self.move(new_pos)
            if not self.is_dragging:
                self.is_dragging = True
                self.anim_manager.switch_to("walk")  # 拖拽时切换到走路动画
            event.accept()

    def mouseReleaseEvent(self, event):
        if event.button() == Qt.LeftButton:
            self._drag_pos = None
            self.is_dragging = False
            self.anim_manager.switch_to("idle")  # 释放后回到待机
            event.accept()

    def show_hint(self, text, duration=2000):
        self.hint_label.setText(text)
        self.hint_label.show()
        QTimer.singleShot(duration, self.hint_label.hide)
```

**预期结果（第一阶段完整版本）：**
- 透明无边框窗口显示宠物
- 待机动画自动循环播放
- 点击显示开心反应
- 拖拽跟随移动并切换走路动画
- 松开后回到待机状态
- 右键弹出功能菜单

---

## 今日作业 | Homework

### 必做题
1. 实现完整的鼠标交互系统（单击、双击、拖拽、悬停）
2. 实现桌面边界检测，防止宠物走出屏幕
3. 将动画系统和交互系统整合到一起

### 挑战题
1. 实现"碰撞反弹"效果：宠物走到屏幕边缘时自动折返
2. 添加键盘快捷键（至少3个功能键）
3. 实现鼠标悬停时宠物眼睛跟随鼠标方向转动（需要额外的动画帧）

### 思考题
1. `mousePressEvent`和`mouseDoubleClickEvent`会冲突吗？如果你快速点击两次，两个事件都会触发吗？如何处理这个问题？
2. 为什么Qt中要用`event.accept()`和`event.ignore()`？它们有什么作用？

---

## 明日预告 | Tomorrow's Preview

恭喜完成第一阶段！从明天开始进入第二阶段，我们将学习"状态机设计模式"。这是一个在游戏开发、机器人控制、UI设计中广泛使用的设计模式。学会了它，你就能让桌宠拥有自主行为 -- 它会自己决定什么时候走路、什么时候睡觉、什么时候找你玩！

Congratulations on completing Phase 1! Starting tomorrow, we enter Phase 2 with the "State Machine Design Pattern". This is a widely used pattern in game development, robotics, and UI design. With it, your pet will autonomously decide when to walk, sleep, or play with you!

---

## 参考资源 | References

- [Qt 事件系统文档](https://doc.qt.io/qt-5/eventsandfilters.html)
- [PyQt5 鼠标事件详解](https://www.riverbankcomputing.com/static/Docs/PyQt5/api/qtgui/qmouseevent.html)
- [事件驱动编程（Wikipedia）](https://zh.wikipedia.org/wiki/%E4%BA%8B%E4%BB%B6%E9%A9%B1%E5%8A%A8%E7%BC%96%E7%A8%8B)
- [Python桌面宠物脚本（B站）](https://www.bilibili.com/video/BV1DE4m1R7z5/)

*最后更新：2026-05-26*
