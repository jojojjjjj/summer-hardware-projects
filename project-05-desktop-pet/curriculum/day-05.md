# Day 05: 状态机设计模式 | State Machine Design Pattern

> **今日目标:**
> - 理解有限状态机（FSM）的概念和原理
> - 学习State设计模式的Python实现
> - 为桌宠设计完整的行为状态图
> - 实现基础状态机框架
>
> **产出:** 一个状态机框架，桌宠能在idle/walk/sleep三个状态之间自动切换

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 第一阶段回顾，介绍第二阶段目标 |
| 09:15 - 10:30 | 知识讲解 | 状态机概念、状态图、State设计模式 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 实现基础状态机框架 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 为桌宠设计和实现行为状态机 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 状态转换条件设计 |
| 16:30 - 17:00 | 总结分享 | 状态机设计讨论 |

---

## 上午: 状态机理论 | Morning: State Machine Theory

### 为什么要学这个? | Why Learn This?

想象一下你的日常生活：早上起床 -> 洗漱 -> 吃早餐 -> 上课 -> 午餐 -> 下午活动 -> 晚餐 -> 睡觉。你一直在不同的"状态"之间切换，每个状态有自己的行为，切换的条件也是确定的（到了饭点就吃饭，困了就睡觉）。

Think about your daily routine: wake up -> wash -> breakfast -> class -> lunch -> afternoon activity -> dinner -> sleep. You are constantly switching between different "states", each with its own behavior, and the switching conditions are deterministic.

这就是状态机的核心思想。在游戏中，NPC的AI（巡逻->发现敌人->追击->攻击->回到巡逻）用的就是状态机。工业自动化中，生产线的控制逻辑也是状态机。甚至你手机上的App界面（登录页->主页->详情页->返回主页）本质上也是一种状态机。

This is the core idea of state machines. In games, NPC AI (patrol -> detect enemy -> chase -> attack -> return to patrol) uses state machines. Industrial automation control logic is also a state machine. Even your mobile app navigation (login -> home -> detail -> back to home) is essentially a state machine.

### 状态机核心概念 | Core Concepts

```
状态机 = 状态 + 转换 + 事件

┌─────────────────────────────────────┐
│           宠物状态图                  │
│                                     │
│   ┌──────┐  被点击  ┌──────┐       │
│   │ IDLE │ ───────> │HAPPY │       │
│   │ 待机  │ <─────── │ 开心  │       │
│   └──┬───┘  3秒后   └──────┘       │
│      │                              │
│      │ 随机触发                     │
│      ▼                              │
│   ┌──────┐  走到目标 ┌──────┐      │
│   │ WALK │ ───────> │ IDLE │      │
│   │ 行走  │          │ 待机  │      │
│   └──────┘          └──┬───┘      │
│                        │           │
│                        │ 无操作30秒 │
│                        ▼           │
│                     ┌──────┐      │
│                     │SLEEP │      │
│                     │ 睡觉  │      │
│                     └──────┘      │
└─────────────────────────────────────┘
```

**三要素：**
1. **状态（State）**：宠物当前的行为模式（idle、walk、sleep、happy）
2. **转换（Transition）**：从一个状态切换到另一个状态
3. **事件/条件（Event/Condition）**：触发状态转换的原因（被点击、定时器、到达目标）

### 任务5.1: 用生活例子理解状态机 (20分钟)

**练习：画出"交通灯"的状态图**

```
┌─────┐  60秒  ┌─────┐  5秒   ┌──────┐
│ 绿灯 │ ─────> │ 黄灯 │ ─────> │ 红灯  │
└─────┘       └─────┘       └──┬───┘
                                │ 60秒
                                ▼
                            ┌─────┐
                            │ 绿灯 │  (回到开始)
                            └─────┘
```

**练习：画出"自动售货机"的状态图**

思考以下状态：待机 -> 投币 -> 选择商品 -> 出货 -> 找零 -> 待机

### 任务5.2: 实现基础状态机框架 (40分钟)

**步骤:**

创建文件 `state_machine.py`：

```python
from abc import ABC, abstractmethod

class State(ABC):
    """状态基类 -- 所有具体状态都继承这个类"""

    def __init__(self, name):
        self.name = name

    def on_enter(self, pet):
        """进入状态时调用（子类可重写）"""
        print(f"[状态机] 进入 {self.name} 状态")

    def on_exit(self, pet):
        """退出状态时调用（子类可重写）"""
        print(f"[状态机] 离开 {self.name} 状态")

    def update(self, pet):
        """状态更新（每帧调用，子类应重写）"""
        pass

    def handle_event(self, pet, event):
        """处理事件（子类应重写）"""
        pass


class StateMachine:
    """状态机 -- 管理状态的切换和更新"""

    def __init__(self, pet):
        self.pet = pet              # 持有宠物引用
        self.states = {}            # 所有注册的状态 {"name": State}
        self.current_state = None   # 当前状态

    def add_state(self, state):
        """注册一个状态"""
        self.states[state.name] = state

    def set_initial_state(self, state_name):
        """设置初始状态"""
        if state_name in self.states:
            self.current_state = self.states[state_name]
            self.current_state.on_enter(self.pet)

    def transition_to(self, state_name):
        """切换到指定状态"""
        if state_name not in self.states:
            print(f"[状态机] 警告：状态 {state_name} 不存在")
            return

        if self.current_state:
            if self.current_state.name == state_name:
                return  # 已经是当前状态
            self.current_state.on_exit(self.pet)

        self.current_state = self.states[state_name]
        self.current_state.on_enter(self.pet)

    def update(self):
        """更新当前状态（每帧调用）"""
        if self.current_state:
            self.current_state.update(self.pet)

    def handle_event(self, event):
        """将事件传递给当前状态"""
        if self.current_state:
            self.current_state.handle_event(self.pet, event)

    def get_current_state_name(self):
        """获取当前状态名称"""
        return self.current_state.name if self.current_state else None
```

**代码解读：**
- `State` 是抽象基类，定义了所有状态必须实现的接口
- `on_enter` / `on_exit` 是状态的"入口/出口动作"
- `update` 每帧被调用，用于检查是否需要转换
- `StateMachine` 管理所有状态，负责状态的注册和切换

**预期结果:**
- 理解State基类和StateMachine类的关系
- 能够解释"每帧调用update"的含义

### 任务5.3: 实现第一个具体状态 (20分钟)

```python
import random

class IdleState(State):
    """待机状态 -- 宠物安静地站在原地"""

    def __init__(self):
        super().__init__("idle")
        self.idle_time = 0           # 已经待机了多长时间
        self.next_walk_time = 0      # 下次走路的随机时间

    def on_enter(self, pet):
        """进入待机状态"""
        super().on_enter(pet)
        self.idle_time = 0
        # 随机决定5-15秒后开始走路
        self.next_walk_time = random.randint(5000, 15000)
        # 切换到idle动画
        if hasattr(pet, 'anim_manager'):
            pet.anim_manager.switch_to("idle")

    def update(self, pet):
        """每帧检查是否该走路了"""
        self.idle_time += 16  # 假设约60FPS，每帧约16ms
        if self.idle_time >= self.next_walk_time:
            # 切换到走路状态
            pet.state_machine.transition_to("walk")

    def handle_event(self, pet, event):
        """处理外部事件"""
        if event == "clicked":
            pet.state_machine.transition_to("happy")
        elif event == "sleepy":
            pet.state_machine.transition_to("sleep")
```

---

## 下午: 完整行为状态机 | Afternoon: Complete Behavior State Machine

### 任务5.4: 实现walk和sleep状态 (40分钟)

```python
class WalkState(State):
    """走路状态 -- 宠物在屏幕上随机走动"""

    def __init__(self):
        super().__init__("walk")
        self.target_x = 0
        self.target_y = 0
        self.walk_speed = 2  # 每帧移动的像素数

    def on_enter(self, pet):
        """进入走路状态，随机选择目标位置"""
        super().on_enter(pet)
        # 随机选择屏幕上的一个位置作为目标
        from PyQt5.QtWidgets import QApplication
        screen = QApplication.desktop().screenGeometry()
        self.target_x = random.randint(0, screen.width() - 200)
        self.target_y = random.randint(0, screen.height() - 200)
        print(f"[走路] 目标位置: ({self.target_x}, {self.target_y})")

        if hasattr(pet, 'anim_manager'):
            pet.anim_manager.switch_to("walk")

    def update(self, pet):
        """每帧向目标位置移动"""
        current_x = pet.x()
        current_y = pet.y()

        # 计算方向
        dx = self.target_x - current_x
        dy = self.target_y - current_y
        distance = (dx ** 2 + dy ** 2) ** 0.5

        if distance < self.walk_speed:
            # 到达目标，回到待机
            pet.move(self.target_x, self.target_y)
            pet.state_machine.transition_to("idle")
        else:
            # 向目标移动一步
            move_x = int(dx / distance * self.walk_speed)
            move_y = int(dy / distance * self.walk_speed)
            pet.move(current_x + move_x, current_y + move_y)


class SleepState(State):
    """睡觉状态 -- 宠物安静地睡觉"""

    def __init__(self):
        super().__init__("sleep")
        self.sleep_time = 0
        self.sleep_duration = 0

    def on_enter(self, pet):
        super().on_enter(pet)
        self.sleep_time = 0
        # 随机睡10-30秒
        self.sleep_duration = random.randint(10000, 30000)
        if hasattr(pet, 'anim_manager'):
            pet.anim_manager.switch_to("sleep")

    def update(self, pet):
        self.sleep_time += 16
        if self.sleep_time >= self.sleep_duration:
            pet.state_machine.transition_to("idle")

    def handle_event(self, pet, event):
        """被点击可以唤醒"""
        if event == "clicked":
            pet.state_machine.transition_to("happy")


class HappyState(State):
    """开心状态 -- 被点击后的开心反应"""

    def __init__(self):
        super().__init__("happy")
        self.happy_time = 0

    def on_enter(self, pet):
        super().on_enter(pet)
        self.happy_time = 0
        if hasattr(pet, 'anim_manager'):
            pet.anim_manager.switch_to("happy")

    def update(self, pet):
        self.happy_time += 16
        if self.happy_time >= 3000:  # 开心3秒后回到待机
            pet.state_machine.transition_to("idle")
```

### 任务5.5: 将状态机集成到桌宠 (30分钟)

```python
# 在桌宠窗口类中集成状态机

class PetWindow(QWidget):
    def __init__(self):
        super().__init__()
        self._drag_pos = None
        self.init_ui()
        self.setup_animations()
        self.setup_state_machine()

    def setup_state_machine(self):
        """初始化状态机"""
        self.state_machine = StateMachine(self)

        # 注册所有状态
        self.state_machine.add_state(IdleState())
        self.state_machine.add_state(WalkState())
        self.state_machine.add_state(SleepState())
        self.state_machine.add_state(HappyState())

        # 设置初始状态
        self.state_machine.set_initial_state("idle")

        # 启动状态机更新定时器
        self.update_timer = QTimer()
        self.update_timer.timeout.connect(self.state_machine.update)
        self.update_timer.start(16)  # 约60FPS

    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            self._drag_pos = event.globalPos() - self.frameGeometry().topLeft()
            # 通知状态机"被点击"事件
            self.state_machine.handle_event("clicked")
            event.accept()

    def mouseMoveEvent(self, event):
        if self._drag_pos and event.buttons() == Qt.LeftButton:
            self.move(event.globalPos() - self._drag_pos)
            event.accept()

    def mouseReleaseEvent(self, event):
        if event.button() == Qt.LeftButton:
            self._drag_pos = None
            event.accept()
```

**预期结果:**
- 桌宠默认处于idle状态，播放待机动画
- 5-15秒后自动切换到walk状态，在屏幕上随机走动
- 到达目标后回到idle状态
- 点击时切换到happy状态，3秒后回到idle
- 10-30秒无操作后可能进入sleep状态

---

## 今日作业 | Homework

### 必做题
1. 实现State基类和StateMachine类
2. 实现idle、walk、happy、sleep四个状态
3. 将状态机集成到桌宠程序中，验证状态自动切换

### 挑战题
1. 添加一个新的状态"hungry"（饥饿），每隔一段时间自动触发
2. 设计状态优先级系统：happy > walk > hungry > sleep > idle
3. 添加状态日志功能，记录宠物的状态转换历史

### 思考题
1. 为什么状态机要用"每帧调用update"而不是"定时器检查"的方式？
2. 如果两个状态同时需要触发（比如正在走路时该吃饭了），你会如何设计优先级？

---

## 明日预告 | Tomorrow's Preview

明天我们将完善宠物行为系统：让走路动画与实际移动方向匹配，实现随机行为选择，添加"需求系统"（饥饿度、心情值）。你的桌宠将变得更加"智能"！

Tomorrow we will enhance the pet behavior system: matching walk animations to actual movement direction, implementing random behavior selection, and adding a "needs system" (hunger, mood). Your pet will become more "intelligent"!

---

## 参考资源 | References

- [状态机设计模式详解（Refactoring Guru）](https://refactoring.guru/design-patterns/state)
- [Python 状态机实现](https://python-3-patterns-idioms-test.readthedocs.io/en/latest/StateMachine.html)
- [游戏AI状态机（B站搜索 "游戏AI 状态机"）](https://search.bilibili.com/all?keyword=%E6%B8%B8%E6%88%8FAI%20%E7%8A%B6%E6%80%81%E6%9C%BA)
- [VPet 虚拟桌宠模拟器（GitHub）](https://github.com/LorisYounger/VPet) -- 学习桌宠状态机的实际设计

*最后更新：2026-05-26*
