# Day 03: 帧动画与Sprite系统 | Sprite Animation System

> **今日目标:**
> - 理解帧动画的工作原理
> - 使用QTimer实现帧动画播放
> - 构建Sprite管理器，支持多套动画切换
> - 制作或编辑帧动画素材
>
> **产出:** 一个会播放帧动画的桌宠（待机动画：呼吸/眨眼）

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 回顾Day 2作业，透明窗口效果展示 |
| 09:15 - 10:30 | 知识讲解 | 帧动画原理、QTimer、Sprite Sheet |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 实现基本帧动画播放器 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 构建多状态Sprite管理器 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 制作像素画动画素材 |
| 16:30 - 17:00 | 总结分享 | 动画系统设计讨论 |

---

## 上午: 帧动画基础 | Morning: Frame Animation Basics

### 为什么要学这个? | Why Learn This?

你玩过的每一款2D游戏 -- 从超级马里奥到空洞骑士 -- 角色的行走、跳跃、攻击动画，都是"帧动画"实现的。原理很简单：快速切换一组静态图片，利用人眼的视觉残留效应，看起来就像在动。

Every 2D game you have played -- from Super Mario to Hollow Knight -- uses frame animation for character movement. The principle is simple: rapidly switch between a set of static images, exploiting the persistence of vision to create the illusion of motion.

帧动画是游戏开发、动画制作、UI动效的基础技术。学会了帧动画，你不仅能做桌宠，还能做简单的游戏。

Frame animation is foundational for game development, animation production, and UI effects. Mastering it opens the door to making simple games as well.

### 帧动画原理 | Frame Animation Theory

```
帧序列：  [帧1] -> [帧2] -> [帧3] -> [帧4] -> [帧1] -> ...
时间间隔：  100ms    100ms    100ms    100ms

播放效果：
帧1: 眼睛睁开
帧2: 眼睛半闭
帧3: 眼睛闭上  -> 看起来就像在眨眼！
帧4: 眼睛半闭
```

**关键参数：**
- **帧率（FPS）**：每秒切换多少帧。8-12 FPS适合像素画风格，24+ FPS适合流畅动画
- **帧间隔**：每帧显示多长时间（毫秒）。1000ms / FPS = 帧间隔
- **Sprite Sheet**：把所有帧排列在一张大图上，方便加载和切割

### 任务3.1: 用QTimer实现简单帧动画 (30分钟)

**步骤:**

创建文件 `animation_basic.py`：

```python
import sys
import os
from PyQt5.QtWidgets import QApplication, QWidget, QLabel
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import Qt, QTimer

class AnimatedPetWindow(QWidget):
    """带帧动画的桌宠窗口"""

    def __init__(self):
        super().__init__()
        self.current_frame = 0  # 当前帧索引
        self.frames = []        # 动画帧列表
        self.init_ui()
        self.load_animation()
        self.start_animation()

    def init_ui(self):
        """初始化透明窗口"""
        self.setWindowFlags(
            Qt.FramelessWindowHint |
            Qt.WindowStaysOnTopHint |
            Qt.Tool
        )
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.resize(200, 200)

        # 宠物图片标签
        self.pet_label = QLabel(self)
        self.pet_label.setGeometry(0, 0, 200, 200)
        self.pet_label.setAlignment(Qt.AlignCenter)

        self.show()

    def load_animation(self):
        """加载帧动画图片"""
        sprite_dir = "assets/sprites/idle"  # 待机动画帧目录

        # 加载目录中所有PNG图片
        if os.path.exists(sprite_dir):
            files = sorted([
                f for f in os.listdir(sprite_dir)
                if f.endswith('.png')
            ])
            for f in files:
                pixmap = QPixmap(os.path.join(sprite_dir, f))
                if not pixmap.isNull():
                    scaled = pixmap.scaled(
                        200, 200,
                        Qt.KeepAspectRatio,
                        Qt.SmoothTransformation
                    )
                    self.frames.append(scaled)
        else:
            print(f"警告：动画目录 {sprite_dir} 不存在")

    def start_animation(self):
        """启动动画定时器"""
        self.timer = QTimer()
        self.timer.timeout.connect(self.next_frame)
        self.timer.start(100)  # 每100ms切换一帧（约10 FPS）

    def next_frame(self):
        """切换到下一帧"""
        if self.frames:
            self.current_frame = (self.current_frame + 1) % len(self.frames)
            self.pet_label.setPixmap(self.frames[self.current_frame])


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = AnimatedPetWindow()
    sys.exit(app.exec_())
```

**素材目录结构：**
```
assets/sprites/idle/
├── idle_01.png    # 第1帧
├── idle_02.png    # 第2帧
├── idle_03.png    # 第3帧
└── idle_04.png    # 第4帧
```

**预期结果:**
- 桌宠每100ms切换一帧，播放待机动画
- 动画循环播放，看起来角色在"呼吸"或"眨眼"

**常见问题:**
- **动画不播放**：检查定时器是否启动（`self.timer.start()`），检查帧列表是否为空
- **动画太快/太慢**：调整`start(100)`中的数字，数字越小越快
- **只显示第一帧**：确认`next_frame`方法被正确连接到定时器

### 任务3.2: Sprite Sheet切割 (30分钟)

在实际项目中，动画帧通常排列在一张大图上（Sprite Sheet），而不是单独的图片文件：

```python
class SpriteSheet:
    """Sprite Sheet切割工具"""

    def __init__(self, image_path, frame_width, frame_height):
        """
        参数:
            image_path: Sprite Sheet图片路径
            frame_width: 每帧的宽度
            frame_height: 每帧的高度
        """
        self.sheet = QPixmap(image_path)
        self.frame_width = frame_width
        self.frame_height = frame_height

    def get_frame(self, col, row):
        """获取指定位置的帧"""
        x = col * self.frame_width
        y = row * self.frame_height
        return self.sheet.copy(x, y, self.frame_width, self.frame_height)

    def get_row(self, row, num_frames):
        """获取一整行的帧（一个动画序列）"""
        frames = []
        for col in range(num_frames):
            frame = self.get_frame(col, row)
            if not frame.isNull():
                frames.append(frame)
        return frames
```

**使用示例：**
```python
# 假设Sprite Sheet是4列2行，每帧64x64
sheet = SpriteSheet("assets/sprites/pet_sheet.png", 64, 64)

# 第0行是idle动画（4帧）
idle_frames = sheet.get_row(0, 4)

# 第1行是walk动画（4帧）
walk_frames = sheet.get_row(1, 4)
```

**Sprite Sheet布局示例：**
```
┌──────┬──────┬──────┬──────┐
│idle1 │idle2 │idle3 │idle4 │  第0行：待机动画
├──────┼──────┼──────┼──────┤
│walk1 │walk2 │walk3 │walk4 │  第1行：行走动画
├──────┼──────┼──────┼──────┤
│sleep1│sleep2│sleep3│sleep4│  第2行：睡觉动画
└──────┴──────┴──────┴──────┘
  64px   64px   64px   64px
```

---

## 下午: 多状态动画管理 | Afternoon: Multi-State Animation Manager

### 为什么要学这个? | Why Learn This?

一个真正的桌宠不会只有一个动画。它需要：待机动画、行走动画、睡觉动画、吃东西动画、被点击动画......我们需要一个"动画管理器"来管理这些不同的动画状态，并在它们之间切换。

A real desktop pet needs more than one animation: idle, walking, sleeping, eating, clicked reactions, etc. We need an "animation manager" to handle these different animation states and switch between them.

这就是游戏引擎中"动画状态机"的核心思想，也是我们Day 5要深入学习的状态机设计模式的预演。

This is the core idea behind "animation state machines" in game engines, and a preview of the state machine design pattern we will study in depth on Day 5.

### 任务3.3: 构建AnimationManager (40分钟)

创建文件 `animation_manager.py`：

```python
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import Qt, QTimer
import os

class AnimationManager:
    """动画管理器 -- 管理多套动画的加载和切换"""

    def __init__(self, label, frame_size=200):
        """
        参数:
            label: 显示动画的QLabel控件
            frame_size: 帧显示大小
        """
        self.label = label
        self.frame_size = frame_size
        self.animations = {}    # 存储所有动画 {"状态名": [帧列表]}
        self.current_state = None
        self.current_frame = 0

        # 动画定时器
        self.timer = QTimer()
        self.timer.timeout.connect(self.next_frame)

    def load_animation(self, state_name, sprite_dir, fps=10):
        """从目录加载一套动画"""
        frames = []
        if os.path.exists(sprite_dir):
            files = sorted([
                f for f in os.listdir(sprite_dir)
                if f.endswith('.png')
            ])
            for f in files:
                pixmap = QPixmap(os.path.join(sprite_dir, f))
                if not pixmap.isNull():
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
            print(f"已加载动画 '{state_name}'：{len(frames)} 帧，{fps} FPS")

    def switch_to(self, state_name):
        """切换到指定动画状态"""
        if state_name not in self.animations:
            print(f"警告：动画 '{state_name}' 不存在")
            return

        if state_name == self.current_state:
            return  # 已经是当前状态，不重复切换

        self.current_state = state_name
        self.current_frame = 0

        # 获取该动画的FPS
        fps = self.animations[state_name]["fps"]
        interval = int(1000 / fps)

        # 重启定时器
        self.timer.stop()
        self.timer.start(interval)

        # 立即显示第一帧
        self.show_frame(0)

    def show_frame(self, index):
        """显示指定帧"""
        frames = self.animations[self.current_state]["frames"]
        if 0 <= index < len(frames):
            self.label.setPixmap(frames[index])

    def next_frame(self):
        """切换到下一帧"""
        if self.current_state is None:
            return
        frames = self.animations[self.current_state]["frames"]
        self.current_frame = (self.current_frame + 1) % len(frames)
        self.show_frame(self.current_frame)

    def stop(self):
        """停止动画"""
        self.timer.stop()

    def get_current_state(self):
        """获取当前动画状态"""
        return self.current_state
```

### 任务3.4: 将AnimationManager集成到窗口 (20分钟)

```python
class AnimatedPetWindow(QWidget):
    def __init__(self):
        super().__init__()
        self._drag_pos = None
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

        self.pet_label = QLabel(self)
        self.pet_label.setGeometry(0, 0, 200, 200)

        self.show()

    def setup_animations(self):
        """加载并启动动画"""
        self.anim_manager = AnimationManager(self.pet_label, frame_size=200)

        # 加载不同状态的动画
        self.anim_manager.load_animation("idle", "assets/sprites/idle", fps=8)
        self.anim_manager.load_animation("walk", "assets/sprites/walk", fps=10)
        self.anim_manager.load_animation("sleep", "assets/sprites/sleep", fps=4)

        # 默认播放idle动画
        self.anim_manager.switch_to("idle")

    def mousePressEvent(self, event):
        """点击宠物切换到walk动画"""
        if event.button() == Qt.LeftButton:
            self.anim_manager.switch_to("walk")
            self._drag_pos = event.globalPos() - self.frameGeometry().topLeft()

    def mouseReleaseEvent(self, event):
        """松开鼠标回到idle动画"""
        self.anim_manager.switch_to("idle")
        self._drag_pos = None

    def mouseMoveEvent(self, event):
        """拖拽移动"""
        if self._drag_pos and event.buttons() == Qt.LeftButton:
            self.move(event.globalPos() - self._drag_pos)
```

**预期结果:**
- 默认播放idle（待机）动画
- 点击或拖拽时切换到walk动画
- 松开后回到idle动画

---

## 今日作业 | Homework

### 必做题
1. 实现帧动画播放器，至少有idle和walk两套动画
2. 构建AnimationManager，支持动画状态切换
3. 使用Piskel制作或编辑至少一套4帧的待机动画

### 挑战题
1. 制作一套8帧的行走动画（包含角色左右移动）
2. 实现动画播放完毕后自动回到idle状态的功能
3. 尝试用Sprite Sheet替代单独的图片文件

### 思考题
1. 为什么用QTimer而不是Python的`time.sleep()`来实现帧动画？
2. 如果让你设计一个"被摸头"动画，你会设计几帧？每帧分别是什么动作？

---

## 明日预告 | Tomorrow's Preview

明天我们将深入学习事件处理，让桌宠对各种鼠标操作做出不同的反应 -- 点击、双击、拖拽、悬停。同时开始学习如何判断宠物在屏幕上的位置。

Tomorrow we dive deeper into event handling, making the pet react differently to clicks, double-clicks, drags, and hover. We will also learn how to track the pet's position on screen.

---

## 参考资源 | References

- [Piskel 在线像素画编辑器](https://www.piskelapp.com/) -- 制作帧动画素材
- [帧动画基础原理（MDN Canvas动画）](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations)
- [QTimer 官方文档](https://www.riverbankcomputing.com/static/Docs/PyQt5/api/qtcore/qtimer.html)
- [itch.io 像素画素材](https://itch.io/game-assets/free/tag-pixel-art)
- [虚拟桌宠模拟器VPET动画制作（B站）](https://www.bilibili.com/video/BV18z4y1u7wi/)

*最后更新：2026-05-26*
