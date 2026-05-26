# Day 09: 拖拽与桌面互动 | Drag & Desktop Interaction

> **今日目标:**
> - 实现完善的拖拽系统（包含惯性抛掷）
> - 实现屏幕边缘检测和碰撞效果
> - 模拟简单的重力/弹跳物理效果
> - 让桌宠能"爬墙"和"掉落"
>
> **产出:** 桌宠支持拖拽抛掷、屏幕边缘碰撞、简单物理模拟

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 第二阶段回顾，介绍第三阶段目标 |
| 09:15 - 10:30 | 知识讲解 | 物理模拟基础、碰撞检测 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 实现惯性拖拽和边界碰撞 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 物理效果和桌面互动 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 攀爬和掉落效果 |
| 16:30 - 17:00 | 总结分享 | 物理模拟讨论 |

---

## 上午: 惯性拖拽与碰撞 | Morning: Inertial Drag & Collision

### 为什么要学这个? | Why Learn this?

你用手机时，滑动列表会继续滚动一段距离才停下。这种"惯性"效果让交互感觉更自然、更流畅。在桌宠中，如果你快速甩动宠物然后松手，它应该沿着你甩的方向继续移动一段距离再停下。

When you swipe on a mobile phone, the list continues scrolling before stopping. This "inertia" effect makes interaction feel more natural and fluid. For the desktop pet, if you quickly fling it and release, it should continue moving in that direction before stopping.

物理模拟是游戏开发的基础知识。从愤怒的小鸟的抛物线，到赛车游戏的碰撞，再到3D游戏的刚体物理，都建立在同样的数学基础之上。

Physics simulation is foundational in game development. From Angry Birds' parabolas to racing game collisions to 3D rigid body physics, all build on the same mathematical foundations.

### 任务9.1: 实现惯性抛掷 (40分钟)

**步骤:**

创建文件 `physics.py`：

```python
import math

class PhysicsBody:
    """物理体 -- 带速度和加速度的物体"""

    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y
        self.vx = 0.0       # 水平速度
        self.vy = 0.0       # 垂直速度
        self.friction = 0.95  # 摩擦力（每帧速度乘以此系数）
        self.gravity = 0.5   # 重力加速度（像素/帧²）
        self.bounce = 0.6    # 弹跳系数（碰撞后保留的速度比例）
        self.use_gravity = False  # 是否启用重力

    def update(self, screen_width, screen_height, obj_width, obj_height):
        """更新物理状态"""
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
        self.check_boundary_collision(screen_width, screen_height, obj_width, obj_height)

        # 速度过小时停止（避免无限微小运动）
        if abs(self.vx) < 0.1:
            self.vx = 0
        if abs(self.vy) < 0.1 and not self.use_gravity:
            self.vy = 0

    def check_boundary_collision(self, screen_w, screen_h, obj_w, obj_h):
        """边界碰撞检测与反弹"""
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
            # 如果弹跳速度很小，就停在地面上
            if abs(self.vy) < 1:
                self.vy = 0

    def fling(self, vx, vy):
        """抛掷 -- 设置初始速度"""
        self.vx = vx
        self.vy = vy

    def stop(self):
        """停止运动"""
        self.vx = 0
        self.vy = 0

    def is_moving(self):
        """是否在运动"""
        return abs(self.vx) > 0.5 or abs(self.vy) > 0.5
```

### 任务9.2: 集成物理到桌宠 (30分钟)

```python
class PetWindow(QWidget):
    def __init__(self):
        super().__init__()
        self._drag_pos = None
        self._drag_history = []  # 记录拖拽轨迹
        self.init_ui()
        self.setup_physics()

    def setup_physics(self):
        """设置物理系统"""
        self.physics = PhysicsBody(self.x(), self.y())
        self.physics.friction = 0.92
        self.physics.bounce = 0.5

        # 物理更新定时器
        self.physics_timer = QTimer()
        self.physics_timer.timeout.connect(self.update_physics)
        self.physics_timer.start(16)  # 约60FPS

    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            self._drag_pos = event.globalPos() - self.frameGeometry().topLeft()
            self._drag_history = [(event.globalPos().x(), event.globalPos().y())]
            self.physics.stop()  # 拖拽时停止物理运动
            event.accept()

    def mouseMoveEvent(self, event):
        if self._drag_pos and event.buttons() == Qt.LeftButton:
            new_pos = event.globalPos() - self._drag_pos
            self.move(new_pos)

            # 记录拖拽轨迹（保留最近5个点）
            self._drag_history.append((event.globalPos().x(), event.globalPos().y()))
            if len(self._drag_history) > 5:
                self._drag_history.pop(0)

            event.accept()

    def mouseReleaseEvent(self, event):
        if event.button() == Qt.LeftButton:
            if len(self._drag_history) >= 2:
                # 计算抛掷速度
                last = self._drag_history[-1]
                first = self._drag_history[0]
                dx = last[0] - first[0]
                dy = last[1] - first[1]
                steps = len(self._drag_history)

                # 速度 = 位移 / 时间，这里简化为位移 / 帧数
                vx = dx / steps * 0.5  # 缩放系数，避免太快
                vy = dy / steps * 0.5

                # 应用抛掷
                self.physics.x = self.x()
                self.physics.y = self.y()
                self.physics.fling(vx, vy)

            self._drag_pos = None
            self._drag_history = []
            event.accept()

    def update_physics(self):
        """更新物理位置"""
        if self.physics.is_moving():
            screen = QApplication.desktop().screenGeometry()
            self.physics.update(screen.width(), screen.height(), self.width(), self.height())
            self.move(int(self.physics.x), int(self.physics.y))
```

**预期结果:**
- 拖拽宠物时跟随鼠标移动
- 快速甩动后松手，宠物沿着甩动方向继续移动
- 遇到屏幕边缘会反弹
- 速度逐渐减小直到停止

**常见问题:**
- **抛掷太快**：减小fling计算中的缩放系数
- **不反弹**：检查`check_boundary_collision`的实现
- **运动不流畅**：确认定时器间隔是16ms

---

## 下午: 物理效果与桌面互动 | Afternoon: Physics & Desktop Interaction

### 任务9.3: 添加重力效果 (20分钟)

```python
def toggle_gravity(self):
    """切换重力模式（右键菜单选项）"""
    self.physics.use_gravity = not self.physics.use_gravity
    if self.physics.use_gravity:
        self.show_bubble("好重！", 2000)
    else:
        self.show_bubble("轻飘飘~", 2000)
```

**预期结果:**
- 开启重力后，宠物会"掉落"到屏幕底部
- 掉落后会弹跳几次然后静止
- 拖拽并抛掷时有抛物线效果

### 任务9.4: 屏幕边缘行为 (30分钟)

```python
class EdgeBehavior:
    """屏幕边缘行为 -- 让宠物在屏幕边缘有特殊反应"""

    def __init__(self, pet_window):
        self.pet = pet_window

    def check_edge(self):
        """检查宠物是否在屏幕边缘"""
        screen = QApplication.desktop().screenGeometry()
        x, y = self.pet.x(), self.pet.y()
        w, h = self.pet.width(), self.pet.height()

        edges = []

        if x <= 0:
            edges.append("left")
        elif x >= screen.width() - w:
            edges.append("right")

        if y <= 0:
            edges.append("top")
        elif y >= screen.height() - h:
            edges.append("bottom")

        return edges

    def on_edge(self, edges):
        """到达边缘时的反应"""
        if not edges:
            return

        if "bottom" in edges:
            # 落到地面
            reactions = ["着陆！", "安全着地~", "砰！"]
            self.pet.show_bubble(random.choice(reactions), 2000)

        elif "left" in edges or "right" in edges:
            # 撞到侧墙
            reactions = ["哎呀，到头了！", "碰壁了~", "这里走不通"]
            self.pet.show_bubble(random.choice(reactions), 2000)

        elif "top" in edges:
            # 撞到天花板
            reactions = ["好高！", "飞起来了！"]
            self.pet.show_bubble(random.choice(reactions), 2000)
```

### 任务9.5: 完善拖拽状态管理 (20分钟)

```python
class DragState(State):
    """拖拽状态 -- 被用户拖拽时的状态"""

    def __init__(self):
        super().__init__("dragged")

    def on_enter(self, pet):
        super().on_enter(pet)
        if hasattr(pet, 'anim_manager'):
            # 切换到被拖拽的动画（如惊恐表情）
            if "dragged" in pet.anim_manager.animations:
                pet.anim_manager.switch_to("dragged")
            else:
                pet.anim_manager.switch_to("walk")
        pet.show_bubble("啊~别拽我！", 1500)

    def on_exit(self, pet):
        super().on_exit(pet)

    def handle_event(self, pet, event):
        if event == "released":
            # 被释放后，进入抛掷状态或idle
            if pet.physics.is_moving():
                pass  # 让物理系统处理
            else:
                pet.state_machine.transition_to("idle")
```

### 任务9.6: 整合所有功能 (10分钟)

确保以下交互流程正常工作：
1. 拖拽宠物 -> 切换到dragged状态 -> 播放拖拽动画/音效
2. 甩动松手 -> 惯性抛掷 -> 边界反弹 -> 最终停止
3. 停止后 -> 自动回到idle状态 -> 播放idle动画
4. 右键菜单可以切换重力模式

---

## 今日作业 | Homework

### 必做题
1. 实现PhysicsBody类，支持速度、摩擦力和边界碰撞
2. 实现惯性抛掷效果，拖拽甩动后宠物继续移动
3. 边界碰撞时显示不同的反应文字

### 挑战题
1. 实现宠物"自动走回屏幕中央"的功能（当用户长时间不操作时）
2. 添加"弹跳"动画效果（碰撞时图片缩小再恢复）
3. 实现多个桌宠之间的碰撞检测

### 思考题
1. `friction`（摩擦力）和`bounce`（弹跳系数）这两个参数如何影响宠物的运动？试着调出不同的效果。
2. 为什么在`mouseReleaseEvent`中要用最近几个点的速度而不是单个点的位移？

---

## 明日预告 | Tomorrow's Preview

明天是一个令人兴奋的日子！我们将给桌宠添加AI对话功能，让它能理解你说的话并做出回应。你将学习如何调用LLM（大语言模型）API，实现真正的智能对话。

Tomorrow is exciting! We add AI dialogue capability so the pet can understand what you say and respond. You will learn to call LLM (Large Language Model) APIs for real intelligent conversation.

---

## 参考资源 | References

- [游戏物理基础教程](https://zhuanlan.zhihu.com/p/26241987)
- [碰撞检测算法简介](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
- [Qt 物理动画（QPropertyAnimation）](https://doc.qt.io/qt-5/qpropertyanimation.html)
- [Shimeji桌宠制作教程（B站）](https://www.bilibili.com/video/BV1q441127zw/) -- 学习Shimeji的桌面互动机制

*最后更新：2026-05-26*
