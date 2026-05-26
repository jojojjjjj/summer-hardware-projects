"""
桌宠 "萌桌面" -- 状态机系统
Desktop Pet "PetDesk" -- State Machine System

功能：有限状态机（FSM）框架，管理宠物的行为状态切换
"""

import random
from abc import ABC, abstractmethod
from PyQt5.QtWidgets import QApplication


class State(ABC):
    """状态基类 -- 所有具体状态都应继承此类

    每个状态有三个核心方法：
    - on_enter: 进入状态时调用
    - on_exit: 退出状态时调用
    - update: 每帧调用（用于检查是否需要转换）
    """

    def __init__(self, name):
        self.name = name

    def on_enter(self, pet):
        """进入状态时调用

        参数:
            pet: PetWindow实例的引用
        """
        print(f"[状态机] 进入 {self.name}")

    def on_exit(self, pet):
        """退出状态时调用

        参数:
            pet: PetWindow实例的引用
        """
        print(f"[状态机] 离开 {self.name}")

    def update(self, pet):
        """状态更新（每帧调用，约60FPS）

        参数:
            pet: PetWindow实例的引用
        """
        pass

    def handle_event(self, pet, event):
        """处理外部事件

        参数:
            pet: PetWindow实例的引用
            event: 事件名称字符串（如 "clicked", "released", "feed"）
        """
        pass


class StateMachine:
    """状态机 -- 管理状态的注册、切换和更新"""

    def __init__(self, pet):
        """初始化状态机

        参数:
            pet: PetWindow实例的引用
        """
        self.pet = pet
        self.states = {}            # 所有注册的状态 {"name": State}
        self.current_state = None   # 当前活跃状态

    def add_state(self, state):
        """注册一个状态

        参数:
            state: State的子类实例
        """
        self.states[state.name] = state

    def set_initial_state(self, state_name):
        """设置初始状态（仅在启动时调用一次）

        参数:
            state_name: 初始状态名称
        """
        if state_name in self.states:
            self.current_state = self.states[state_name]
            self.current_state.on_enter(self.pet)
        else:
            print(f"[状态机] 警告：初始状态 '{state_name}' 不存在")

    def transition_to(self, state_name):
        """切换到指定状态

        参数:
            state_name: 目标状态名称
        """
        if state_name not in self.states:
            print(f"[状态机] 警告：状态 '{state_name}' 不存在")
            return

        # 避免重复进入同一状态
        if self.current_state and self.current_state.name == state_name:
            return

        # 退出当前状态
        if self.current_state:
            self.current_state.on_exit(self.pet)

        # 进入新状态
        self.current_state = self.states[state_name]
        self.current_state.on_enter(self.pet)

    def update(self):
        """更新当前状态（每帧调用）"""
        if self.current_state:
            self.current_state.update(self.pet)

    def handle_event(self, event):
        """将事件传递给当前状态

        参数:
            event: 事件名称字符串
        """
        if self.current_state:
            self.current_state.handle_event(self.pet, event)

    def get_current_state_name(self):
        """获取当前状态名称"""
        return self.current_state.name if self.current_state else None


# ============ 具体状态实现 ============

class IdleState(State):
    """待机状态 -- 宠物安静地站在原地，随机决定下一个行为"""

    def __init__(self):
        super().__init__("idle")
        self.idle_time = 0
        self.next_action_time = 0

    def on_enter(self, pet):
        super().on_enter(pet)
        self.idle_time = 0
        # 随机5-20秒后执行下一个动作
        self.next_action_time = random.randint(5000, 20000)
        # 切换到idle动画
        if hasattr(pet, 'anim_manager'):
            if pet.anim_manager.has_animation("idle"):
                pet.anim_manager.switch_to("idle")

    def update(self, pet):
        self.idle_time += 16  # 约60FPS

        # 检查是否应该进入睡眠状态
        if hasattr(pet, 'needs') and pet.needs.is_sleepy():
            if self.idle_time > 3000:  # 至少idle 3秒再考虑睡觉
                pet.state_machine.transition_to("sleep")
                return

        # 检查是否应该开始走路
        if self.idle_time >= self.next_action_time:
            if hasattr(pet, 'needs') and not pet.needs.is_hungry():
                pet.state_machine.transition_to("walk")
            else:
                # 如果饿了，继续保持idle（等待喂食）
                self.idle_time = 0
                self.next_action_time = random.randint(3000, 8000)

    def handle_event(self, pet, event):
        if event == "clicked":
            pet.state_machine.transition_to("happy")


class WalkState(State):
    """走路状态 -- 宠物在屏幕上随机走动"""

    def __init__(self):
        super().__init__("walk")
        self.target_x = 0
        self.target_y = 0
        self.walk_speed = 2

    def on_enter(self, pet):
        super().on_enter(pet)
        # 随机选择屏幕上的目标位置
        screen = QApplication.desktop().screenGeometry()
        self.target_x = random.randint(0, screen.width() - pet.width())
        self.target_y = random.randint(0, screen.height() - pet.height())

        # 切换到walk动画
        if hasattr(pet, 'anim_manager'):
            if pet.anim_manager.has_animation("walk"):
                pet.anim_manager.switch_to("walk")

    def update(self, pet):
        current_x = pet.x()
        current_y = pet.y()

        # 计算到目标的距离和方向
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

    def handle_event(self, pet, event):
        if event == "clicked":
            pet.state_machine.transition_to("happy")


class SleepState(State):
    """睡觉状态 -- 宠物安静地睡觉，恢复体力"""

    def __init__(self):
        super().__init__("sleep")
        self.sleep_time = 0
        self.sleep_duration = 0

    def on_enter(self, pet):
        super().on_enter(pet)
        self.sleep_time = 0
        self.sleep_duration = random.randint(10000, 30000)  # 随机睡10-30秒

        if hasattr(pet, 'anim_manager'):
            if pet.anim_manager.has_animation("sleep"):
                pet.anim_manager.switch_to("sleep")

        if hasattr(pet, 'show_hint'):
            pet.show_hint("zZZ...", 3000)

    def update(self, pet):
        self.sleep_time += 16

        # 睡觉恢复体力
        if hasattr(pet, 'needs'):
            pet.needs.rest()

        # 睡够了就醒来
        if self.sleep_time >= self.sleep_duration:
            if hasattr(pet, 'needs') and not pet.needs.is_sleepy():
                pet.state_machine.transition_to("idle")
            else:
                # 还是很困，继续睡
                self.sleep_time = 0
                self.sleep_duration = random.randint(10000, 30000)

    def handle_event(self, pet, event):
        if event == "clicked":
            pet.state_machine.transition_to("happy")


class HappyState(State):
    """开心状态 -- 被抚摸或喂食后的开心反应"""

    def __init__(self):
        super().__init__("happy")
        self.happy_time = 0

    def on_enter(self, pet):
        super().on_enter(pet)
        self.happy_time = 0

        if hasattr(pet, 'anim_manager'):
            if pet.anim_manager.has_animation("happy"):
                pet.anim_manager.switch_to("happy")

        # 显示随机开心反应
        reactions = ["好开心！", "嘿嘿~", "喵~", "谢谢你！", "最爱你了！"]
        if hasattr(pet, 'show_hint'):
            pet.show_hint(random.choice(reactions), 2000)

    def update(self, pet):
        self.happy_time += 16
        # 开心3秒后回到待机
        if self.happy_time >= 3000:
            pet.state_machine.transition_to("idle")

    def handle_event(self, pet, event):
        # 开心状态下再次被点击，重置计时
        if event == "clicked":
            self.happy_time = 0
