# Day 06: 宠物行为系统 | Pet Behavior System

> **今日目标:**
> - 设计宠物需求系统（饥饿度、心情值、体力值）
> - 实现方向感知的行走动画
> - 添加随机行为选择器
> - 让桌宠拥有"自主意识"
>
> **产出:** 桌宠能自主做出多种行为决策，有需求系统驱动的状态切换

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 状态机运行效果展示 |
| 09:15 - 10:30 | 知识讲解 | 需求系统设计、行为树概念 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 实现需求系统 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 行为选择器和方向感知移动 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 个性化行为、表情系统 |
| 16:30 - 17:00 | 总结分享 | 行为系统设计讨论 |

---

## 上午: 需求系统 | Morning: Needs System

### 为什么要学这个? | Why Learn This?

真正让桌宠有"生命感"的不是动画有多好看，而是它有没有自己的"需求"。想想你养的真实宠物：它会饿、会困、会无聊、会想玩。这些需求驱动着它的行为 -- 肚子饿了就找吃的，困了就去睡觉，无聊了就来找你玩。

What gives a desktop pet its "lifelike" quality is not just animation quality, but its "needs". Think about a real pet: it gets hungry, sleepy, bored, and wants to play. These needs drive its behavior -- hungry means seeking food, sleepy means finding a place to nap, bored means coming to interact with you.

这个概念在游戏设计中叫做"需求系统"（Needs System），模拟人生（The Sims）就是最著名的例子。在AI和机器人领域，这叫做"基于动机的行为选择"。

In game design, this is called the "Needs System" -- The Sims is the most famous example. In AI and robotics, it is called "motivation-based behavior selection".

### 任务6.1: 设计需求系统 (30分钟)

**步骤:**

创建文件 `needs_system.py`：

```python
import time

class NeedsSystem:
    """宠物需求系统 -- 管理宠物的各种需求值"""

    def __init__(self):
        # 需求值范围: 0（最低）到 100（最高）
        self.hunger = 80       # 饱食度：越高越饱，越低越饿
        self.energy = 100      # 体力值：越高越精神，越低越困
        self.happiness = 70    # 快乐值：越高越开心
        self.boredom = 30      # 无聊度：越高越无聊

        # 需求衰减速率（每秒减少多少）
        self.hunger_decay_rate = 0.5     # 每秒饱食度-0.5
        self.energy_decay_rate = 0.3     # 每秒体力-0.3
        self.happiness_decay_rate = 0.2  # 每秒快乐值-0.2
        self.boredom_increase_rate = 0.4 # 每秒无聊度+0.4

        # 阈值设置
        self.HUNGRY_THRESHOLD = 30      # 饱食度低于30 -> 饥饿
        self.SLEEPY_THRESHOLD = 20      # 体力低于20 -> 困倦
        self.SAD_THRESHOLD = 25         # 快乐值低于25 -> 不开心
        self.BORED_THRESHOLD = 70       # 无聊度高于70 -> 无聊

        self.last_update_time = time.time()

    def update(self):
        """更新需求值（每帧调用）"""
        now = time.time()
        elapsed = now - self.last_update_time
        self.last_update_time = now

        # 需求值自然衰减
        self.hunger = max(0, self.hunger - self.hunger_decay_rate * elapsed)
        self.energy = max(0, self.energy - self.energy_decay_rate * elapsed)
        self.happiness = max(0, self.happiness - self.happiness_decay_rate * elapsed)
        self.boredom = min(100, self.boredom + self.boredom_increase_rate * elapsed)

    def feed(self, amount=30):
        """喂食 -- 提高饱食度"""
        self.hunger = min(100, self.hunger + amount)
        self.happiness = min(100, self.happiness + 10)  # 吃东西也开心

    def rest(self, amount=2):
        """休息 -- 恢复体力"""
        self.energy = min(100, self.energy + amount)

    def play(self):
        """玩耍 -- 提高快乐值，降低无聊度"""
        self.happiness = min(100, self.happiness + 15)
        self.boredom = max(0, self.boredom - 20)
        self.energy = max(0, self.energy - 5)  # 玩耍消耗体力

    def pet(self):
        """抚摸 -- 提高快乐值"""
        self.happiness = min(100, self.happiness + 10)

    # 需求检查方法
    def is_hungry(self):
        return self.hunger < self.HUNGRY_THRESHOLD

    def is_sleepy(self):
        return self.energy < self.SLEEPY_THRESHOLD

    def is_sad(self):
        return self.happiness < self.SAD_THRESHOLD

    def is_bored(self):
        return self.boredom > self.BORED_THRESHOLD

    def get_most_urgent_need(self):
        """获取最紧急的需求"""
        if self.is_hungry():
            return "hungry"
        elif self.is_sleepy():
            return "sleepy"
        elif self.is_sad():
            return "sad"
        elif self.is_bored():
            return "bored"
        else:
            return "content"

    def get_status_text(self):
        """获取当前状态的文字描述"""
        needs = []
        if self.is_hungry():
            needs.append("饿了")
        if self.is_sleepy():
            needs.append("困了")
        if self.is_sad():
            needs.append("不开心")
        if self.is_bored():
            needs.append("无聊")
        if not needs:
            needs.append("心情不错")
        return "，".join(needs)

    def __str__(self):
        return (f"饱食:{self.hunger:.0f} 体力:{self.energy:.0f} "
                f"快乐:{self.happiness:.0f} 无聊:{self.boredom:.0f}")
```

**预期结果:**
- 理解需求值如何随时间自然衰减
- 理解喂食、休息等操作如何改变需求值
- 理解"最紧急需求"的判断逻辑

**常见问题:**
- **需求值衰减太快/太慢**：调整decay_rate的数值
- **不知道什么时候调用update()**：应该在状态机的update定时器中同步调用

### 任务6.2: 将需求系统集成到状态机 (30分钟)

```python
class HungryState(State):
    """饥饿状态 -- 宠物饿了会原地不动，等待喂食"""

    def __init__(self):
        super().__init__("hungry")
        self.wait_time = 0

    def on_enter(self, pet):
        super().on_enter(pet)
        self.wait_time = 0
        if hasattr(pet, 'show_hint'):
            pet.show_hint("肚子好饿...", 3000)

    def update(self, pet):
        self.wait_time += 16
        # 如果被喂食了（饱食度恢复），回到idle
        if not pet.needs.is_hungry():
            pet.state_machine.transition_to("idle")
            return
        # 等太久没人喂，可能去睡觉
        if self.wait_time > 15000:
            pet.state_machine.transition_to("sleep")

    def handle_event(self, pet, event):
        if event == "feed":
            pet.needs.feed()
            pet.show_hint("好好吃！", 2000)
            pet.state_machine.transition_to("happy")
```

---

## 下午: 行为选择器 | Afternoon: Behavior Selector

### 为什么要学随机行为? | Why Randomized Behavior?

观察真实的宠物，你会发现它的行为是"有规律但不可预测"的。它大部分时间在睡觉，偶尔会走来走去，突然又会跑过来找你玩。如果我们用固定的模式（走10秒 -> 睡5秒 -> 走10秒），桌宠会显得很机械。

Observing real pets, you will notice their behavior is "patterned but unpredictable". They sleep most of the time, occasionally walk around, and suddenly come to play with you. Fixed patterns (walk 10s -> sleep 5s -> walk 10s) make the pet feel robotic.

引入随机性是让AI行为更自然的关键技巧。游戏中的NPC之所以不会让你觉得无聊，正是因为它们的行为包含了随机元素。

Introducing randomness is the key technique for natural AI behavior. Game NPCs remain interesting because their behavior includes random elements.

### 任务6.3: 实现行为选择器 (40分钟)

```python
import random

class BehaviorSelector:
    """行为选择器 -- 基于需求和随机性选择下一个行为"""

    def __init__(self, needs_system):
        self.needs = needs_system

    def choose_next_behavior(self):
        """选择下一个行为"""
        # 首先检查紧急需求
        urgent_need = self.needs.get_most_urgent_need()

        if urgent_need == "hungry":
            return "hungry"    # 饿了 -> 找吃的
        elif urgent_need == "sleepy":
            return "sleep"     # 困了 -> 睡觉

        # 没有紧急需求时，按概率随机选择
        roll = random.random()  # 0到1之间的随机数

        if roll < 0.4:
            return "idle"      # 40%概率待着不动
        elif roll < 0.7:
            return "walk"      # 30%概率到处走走
        elif roll < 0.85:
            return "play"      # 15%概率找主人玩
        else:
            return "explore"   # 15%概率四处探索
```

### 任务6.4: 方向感知行走 (30分钟)

让宠物走路时面朝移动方向：

```python
class WalkState(State):
    """走路状态 -- 支持方向感知"""

    def __init__(self):
        super().__init__("walk")
        self.target_x = 0
        self.target_y = 0
        self.walk_speed = 2
        self.direction = "right"  # "left" 或 "right"

    def on_enter(self, pet):
        super().on_enter(pet)
        screen = QApplication.desktop().screenGeometry()
        self.target_x = random.randint(0, screen.width() - 200)
        self.target_y = random.randint(0, screen.height() - 200)

        # 确定方向
        self.direction = "right" if self.target_x > pet.x() else "left"

        # 根据方向选择动画
        anim_name = f"walk_{self.direction}"
        if hasattr(pet, 'anim_manager'):
            if anim_name in pet.anim_manager.animations:
                pet.anim_manager.switch_to(anim_name)
            else:
                pet.anim_manager.switch_to("walk")

        # 水平翻转图片（如果只有一套walk动画）
        self.update_sprite_direction(pet)

    def update_sprite_direction(self, pet):
        """根据方向翻转图片"""
        if self.direction == "left":
            # PyQt5中可以通过QTransform水平翻转
            from PyQt5.QtGui import QTransform
            transform = QTransform().scale(-1, 1)
            # 翻转当前帧
            current_pixmap = pet.pet_label.pixmap()
            if current_pixmap:
                flipped = current_pixmap.transformed(transform)
                pet.pet_label.setPixmap(flipped)

    def update(self, pet):
        current_x = pet.x()
        current_y = pet.y()

        dx = self.target_x - current_x
        dy = self.target_y - current_y
        distance = (dx ** 2 + dy ** 2) ** 0.5

        if distance < self.walk_speed:
            pet.move(self.target_x, self.target_y)
            pet.state_machine.transition_to("idle")
        else:
            move_x = int(dx / distance * self.walk_speed)
            move_y = int(dy / distance * self.walk_speed)
            pet.move(current_x + move_x, current_y + move_y)
```

### 任务6.5: 整合行为系统 (20分钟)

在桌宠主类中整合需求系统和行为选择器：

```python
class PetWindow(QWidget):
    def __init__(self):
        super().__init__()
        # 初始化需求系统
        self.needs = NeedsSystem()
        # 初始化行为选择器
        self.behavior_selector = BehaviorSelector(self.needs)
        # ... 其他初始化

    def setup_state_machine(self):
        """初始化状态机和行为系统"""
        self.state_machine = StateMachine(self)
        self.state_machine.add_state(IdleState())
        self.state_machine.add_state(WalkState())
        self.state_machine.add_state(SleepState())
        self.state_machine.add_state(HappyState())
        self.state_machine.add_state(HungryState())
        self.state_machine.set_initial_state("idle")

        # 启动更新定时器
        self.update_timer = QTimer()
        self.update_timer.timeout.connect(self.game_loop)
        self.update_timer.start(16)

    def game_loop(self):
        """主游戏循环 -- 每帧调用"""
        # 更新需求系统
        self.needs.update()
        # 更新状态机
        self.state_machine.update()

    def contextMenuEvent(self, event):
        """右键菜单 -- 添加喂食选项"""
        menu = QMenu(self)

        feed_action = QAction("喂食", self)
        feed_action.triggered.connect(lambda: self.do_feed())
        menu.addAction(feed_action)

        play_action = QAction("玩耍", self)
        play_action.triggered.connect(lambda: self.do_play())
        menu.addAction(play_action)

        status_action = QAction("查看状态", self)
        status_action.triggered.connect(lambda: self.show_status())
        menu.addAction(status_action)

        menu.addSeparator()

        quit_action = QAction("退出", self)
        quit_action.triggered.connect(QApplication.quit)
        menu.addAction(quit_action)

        menu.exec_(event.globalPos())

    def do_feed(self):
        self.needs.feed()
        self.show_hint("谢谢喂食！", 2000)
        self.state_machine.handle_event("feed")

    def do_play(self):
        self.needs.play()
        self.show_hint("一起玩！", 2000)

    def show_status(self):
        status = self.needs.get_status_text()
        self.show_hint(f"我现在{status}", 3000)
```

**预期结果:**
- 桌宠有完整的饥饿、体力、快乐、无聊系统
- 饥饿时会显示"肚子好饿..."并等待喂食
- 困了会自动去睡觉，睡觉恢复体力
- 右键菜单可以喂食、玩耍、查看状态
- 走路时角色面朝移动方向

---

## 今日作业 | Homework

### 必做题
1. 实现NeedsSystem类，包含至少3种需求
2. 实现BehaviorSelector，根据需求优先级选择行为
3. 右键菜单添加"喂食"和"查看状态"功能

### 挑战题
1. 实现需求值的可视化显示（如底部小进度条）
2. 添加"清洁度"需求，宠物长时间不洗澡会变脏
3. 实现日夜节律：白天更活跃，晚上更容易困

### 思考题
1. 需求值衰减速度对宠物行为有什么影响？太快和太慢分别会导致什么问题？
2. 行为选择中为什么要有概率，而不是全部由需求值决定？

---

## 明日预告 | Tomorrow's Preview

明天我们将为桌宠添加"说话"的能力！实现气泡对话框，让宠物能用文字表达自己的想法和心情。你将学习自定义Widget、QSS样式设计、以及如何让对话内容更丰富有趣。

Tomorrow we give the pet the ability to "speak"! We will implement bubble dialog boxes so the pet can express its thoughts and feelings with text. You will learn custom widgets, QSS styling, and making dialogue content more engaging.

---

## 参考资源 | References

- [模拟人生需求系统分析（搜索 "Sims needs system"）](https://search.bilibili.com/all?keyword=%E6%A8%A1%E6%8B%9F%E4%BA%BA%E7%94%9F%20%E9%9C%80%E6%B1%82%E7%B3%BB%E7%BB%9F)
- [行为树 vs 状态机（游戏AI设计）](https://search.bilibili.com/all?keyword=%E8%A1%8C%E4%B8%BA%E6%A0%91%20%E7%8A%B6%E6%80%81%E6%9C%BA%20%E6%B8%B8%E6%88%8FAI)
- [pixelgotchi Pygame桌宠（GitHub）](https://github.com/elohcrypto/pixelgotchi) -- 包含需求系统参考
- [VPet 需求系统源码（GitHub）](https://github.com/LorisYounger/VPet)

*最后更新：2026-05-26*
