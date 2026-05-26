# Day 02: 窗口透明与无边框技术 | Transparent & Frameless Window

> **今日目标:**
> - 理解窗口透明的原理和实现方式
> - 实现无边框、透明背景的桌宠窗口
> - 让宠物图片"悬浮"在桌面上
> - 处理透明窗口下的鼠标事件
>
> **产出:** 一个无边框透明窗口，宠物角色直接显示在桌面上

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 回顾Day 1作业，解答疑问 |
| 09:15 - 10:30 | 知识讲解 | 窗口属性、透明原理、Qt窗口标志 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 实现透明无边框窗口 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 在透明窗口中显示宠物并处理鼠标 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 右键菜单、窗口置顶 |
| 16:30 - 17:00 | 总结分享 | 透明窗口的技术原理分享 |

---

## 上午: 透明窗口原理与实现 | Morning: Transparent Window Theory & Implementation

### 为什么要学这个? | Why Learn This?

如果你用过Shimeji桌宠或BongoCat，你会发现宠物是直接"站"在桌面上的，没有白色或灰色的窗口背景。这不是魔法，而是通过"窗口透明"技术实现的。

If you have used Shimeji or BongoCat, you know the pet stands directly on the desktop without a white/gray window background. This is not magic -- it is achieved through "window transparency" technology.

这项技术不仅用于桌宠。在游戏开发中，HUD（平视显示器）、屏幕录制工具的悬浮窗、直播软件的弹幕显示，都用到了同样的原理。掌握透明窗口是制作桌面应用的必备技能。

This technique is used beyond desktop pets: game HUDs, screen recording overlays, and streaming software floating windows all use the same principle.

### 任务2.1: 理解窗口透明的层次 (30分钟)

**窗口透明有三个层次：**

```
层次1: 完全不透明（默认）
┌──────────────┐
│   窗口背景    │  宠物在窗口里面
│   ┌──────┐   │
│   │ 宠物  │   │
│   └──────┘   │
└──────────────┘

层次2: 窗口背景透明
                 宠物浮在桌面上，但窗口还是一个矩形
   ┌──────┐
   │ 宠物  │     点击宠物旁边的位置 -> 穿透到桌面
   └──────┘

层次3: 完全透明（鼠标穿透）
   ┌──────┐
   │ 宠物  │     只有宠物图片的部分响应鼠标
   └──────┘     其他区域完全穿透到桌面
```

**关键Qt属性：**

| 属性 | 作用 | 代码 |
|------|------|------|
| `Qt.FramelessWindowHint` | 去掉标题栏和边框 | `self.setWindowFlags(Qt.FramelessWindowHint)` |
| `Qt.WA_TranslucentBackground` | 窗口背景透明 | `self.setAttribute(Qt.WA_TranslucentBackground)` |
| `Qt.WindowStaysOnTopHint` | 窗口始终在最上层 | `self.setWindowFlags(Qt.WindowStaysOnTopHint)` |
| `Qt.Tool` | 不在任务栏显示图标 | `self.setWindowFlags(Qt.Tool)` |

### 任务2.2: 创建透明无边框窗口 (30分钟)

**步骤:**

创建文件 `transparent_pet.py`：

```python
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import Qt

class TransparentPetWindow(QWidget):
    """透明无边框的桌宠窗口"""

    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        # 设置无边框 + 背景透明 + 始终置顶
        self.setWindowFlags(
            Qt.FramelessWindowHint |      # 无边框
            Qt.WindowStaysOnTopHint |     # 始终在最上层
            Qt.Tool                       # 不在任务栏显示
        )
        self.setAttribute(Qt.WA_TranslucentBackground)  # 背景透明

        # 设置窗口大小
        self.resize(200, 200)

        # 创建图片标签
        self.pet_label = QLabel(self)
        self.pet_label.setGeometry(0, 0, 200, 200)
        self.pet_label.setAlignment(Qt.AlignCenter)

        # 加载宠物图片
        self.load_pet_image("assets/sprites/idle_01.png")

        # 将窗口放在屏幕右下角
        self.move_to_bottom_right()

        self.show()

    def load_pet_image(self, image_path):
        """加载宠物图片"""
        pixmap = QPixmap(image_path)
        if not pixmap.isNull():
            scaled = pixmap.scaled(
                self.pet_label.size(),
                Qt.KeepAspectRatio,
                Qt.SmoothTransformation
            )
            self.pet_label.setPixmap(scaled)
        else:
            self.pet_label.setText("请放入图片！")

    def move_to_bottom_right(self):
        """将窗口移到屏幕右下角"""
        screen = QApplication.desktop().screenGeometry()
        window = self.geometry()
        x = screen.width() - window.width() - 50
        y = screen.height() - window.height() - 100
        self.move(x, y)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = TransparentPetWindow()
    sys.exit(app.exec_())
```

**预期结果:**
- 窗口没有标题栏和边框
- 窗口背景完全透明，只能看到宠物图片
- 宠物"悬浮"在桌面右下角
- 宠物始终在其他窗口上方

**常见问题:**
- **窗口背景不透明**：确认同时设置了`FramelessWindowHint`和`WA_TranslucentBackground`
- **图片有灰色背景**：图片本身必须是PNG格式，带透明通道
- **窗口不见了**：可能被其他窗口遮挡，加`WindowStaysOnTopHint`

### 任务2.3: 添加鼠标拖拽功能 (20分钟)

透明窗口没有标题栏，无法通过拖拽标题栏移动。我们需要自己实现拖拽：

A frameless window has no title bar, so we implement our own drag functionality:

```python
class TransparentPetWindow(QWidget):
    def __init__(self):
        super().__init__()
        self._drag_pos = None  # 记录拖拽起始位置
        self.init_ui()

    def init_ui(self):
        # ... (之前的代码不变)
        pass

    def mousePressEvent(self, event):
        """鼠标按下事件"""
        if event.button() == Qt.LeftButton:
            # 记录鼠标按下时的全局位置
            self._drag_pos = event.globalPos() - self.frameGeometry().topLeft()
            event.accept()

    def mouseMoveEvent(self, event):
        """鼠标移动事件 -- 实现拖拽"""
        if self._drag_pos and event.buttons() == Qt.LeftButton:
            # 移动窗口到新位置
            self.move(event.globalPos() - self._drag_pos)
            event.accept()

    def mouseReleaseEvent(self, event):
        """鼠标释放事件"""
        self._drag_pos = None
```

**预期结果:**
- 按住宠物图片拖拽，可以移动桌宠位置
- 松开鼠标后，桌宠停在新位置

---

## 下午: 窗口行为与右键菜单 | Afternoon: Window Behavior & Context Menu

### 为什么要学右键菜单? | Why Context Menus?

右键菜单是桌面应用最常用的交互模式之一。当你右键桌宠时，应该弹出一个菜单，提供"喂食"、"设置"、"退出"等选项。这也是很多成熟桌宠（如VPet）的标准交互方式。

Context menus are one of the most common interaction patterns in desktop apps. Right-clicking the pet should show a menu with options like "Feed", "Settings", "Exit". This is the standard interaction pattern in mature desktop pets like VPet.

### 任务2.4: 实现右键菜单 (30分钟)

```python
from PyQt5.QtWidgets import QMenu, QAction

class TransparentPetWindow(QWidget):
    def __init__(self):
        super().__init__()
        self._drag_pos = None
        self.init_ui()

    def init_ui(self):
        # 设置透明窗口 (同上)
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
        self.load_pet_image("assets/sprites/idle_01.png")

        self.move_to_bottom_right()
        self.show()

    def contextMenuEvent(self, event):
        """右键菜单事件"""
        menu = QMenu(self)

        # 添加菜单项
        feed_action = QAction("喂食", self)
        feed_action.triggered.connect(self.feed_pet)
        menu.addAction(feed_action)

        talk_action = QAction("聊天", self)
        talk_action.triggered.connect(self.talk_to_pet)
        menu.addAction(talk_action)

        menu.addSeparator()  # 分割线

        settings_action = QAction("设置", self)
        settings_action.triggered.connect(self.open_settings)
        menu.addAction(settings_action)

        quit_action = QAction("退出", self)
        quit_action.triggered.connect(QApplication.quit)
        menu.addAction(quit_action)

        # 在鼠标位置显示菜单
        menu.exec_(event.globalPos())

    def feed_pet(self):
        """喂食宠物"""
        self.pet_label.setText("好好吃！谢谢！")

    def talk_to_pet(self):
        """和宠物聊天"""
        self.pet_label.setText("你好呀~")

    def open_settings(self):
        """打开设置"""
        print("设置功能开发中...")

    # ... 其他方法同上
```

**预期结果:**
- 右键点击桌宠，弹出包含"喂食"、"聊天"、"设置"、"退出"的菜单
- 点击"喂食"显示感谢文字
- 点击"退出"关闭程序

### 任务2.5: 双击交互 (15分钟)

```python
def mouseDoubleClickEvent(self, event):
    """双击事件 -- 宠物互动"""
    if event.button() == Qt.LeftButton:
        self.pet_label.setText("被双击了！好开心！")
        # 2秒后恢复（Day 3学QTimer后可以实现自动恢复）
```

---

## 今日作业 | Homework

### 必做题
1. 创建透明无边框窗口，宠物图片直接显示在桌面上
2. 实现鼠标拖拽移动宠物位置
3. 实现右键菜单，至少包含3个选项

### 挑战题
1. 让右键菜单的样式更美观（提示：使用QSS样式表）
2. 尝试让宠物窗口不遮挡桌面图标的点击（提示：研究鼠标穿透）
3. 根据鼠标位置改变宠物的表情（左键点击头部vs身体的不同反应）

### 思考题
1. 为什么透明窗口需要同时设置`FramelessWindowHint`和`WA_TranslucentBackground`？只设置一个会怎样？
2. 没有标题栏的窗口如何实现拖拽？你在代码中是如何记录拖拽起始位置的？

---

## 明日预告 | Tomorrow's Preview

明天我们将学习帧动画系统，让桌宠"活"起来！不再是一张静态图片，而是一个会呼吸、会眨眼、会走路的动态角色。

Tomorrow we will learn the sprite animation system to make the pet "alive"! No longer a static image, but a dynamic character that breathes, blinks, and walks.

---

## 参考资源 | References

- [PyQt5 窗口属性文档](https://www.riverbankcomputing.com/static/Docs/PyQt5/api/qtcore/qt.html#WindowType-enum)
- [Qt 窗口标志详解](https://doc.qt.io/qt-5/qt.html#WindowType-enum)
- [五分钟学会自制桌面宠物（B站）](https://www.bilibili.com/video/BV1YmCdYhEoc/)
- [Shimeji桌宠制作教程（B站）](https://www.bilibili.com/video/BV1q441127zw/)

*最后更新：2026-05-26*
