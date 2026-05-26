"""
桌宠 "萌桌面" -- 宠物主类
Desktop Pet "PetDesk" -- Pet Main Class

功能：桌宠窗口的核心类，整合所有子系统（动画、状态机、交互、对话等）
"""

import os
import sys
import random
import threading
from datetime import datetime

from PyQt5.QtWidgets import (QWidget, QLabel, QApplication, QMenu, QAction,
                               QGraphicsOpacityEffect)
from PyQt5.QtGui import QPixmap, QTransform
from PyQt5.QtCore import Qt, QTimer, QPoint

from animation import AnimationManager
from state_machine import StateMachine, State, IdleState, WalkState, SleepState, HappyState
from interaction import PhysicsBody, BubbleDialog, DialogueManager
from dialog import AIDialogManager, ChatDialog
from utils import get_resource_path


class PetWindow(QWidget):
    """桌宠主窗口类

    整合所有子系统：
    - 动画系统（AnimationManager）
    - 状态机（StateMachine）
    - 需求系统（NeedsSystem）
    - 物理系统（PhysicsBody）
    - 对话系统（BubbleDialog + DialogueManager）
    - 音效系统（SoundEffectManager，如有素材）
    """

    def __init__(self, config):
        """初始化桌宠窗口

        参数:
            config: 配置字典（从main.py传入）
        """
        super().__init__()
        self.config = config
        self.resource_base = config.get("_resource_base", "")

        # 初始化各子系统
        self._drag_pos = None           # 拖拽起始位置
        self._drag_history = []         # 拖拽轨迹记录

        # 初始化需求系统
        self.needs = NeedsSystem(config.get("needs", {}))

        # 初始化UI
        self.init_ui()

        # 初始化动画系统
        self.setup_animations()

        # 初始化状态机
        self.setup_state_machine()

        # 初始化物理系统
        self.setup_physics()

        # 初始化对话系统
        self.setup_dialog()

        # 初始化音效（如果有的话）
        self.sound_manager = None
        self.setup_sound()

        # 初始化粒子系统（简化版）
        self.particles = []
        self.particle_timer = QTimer()
        self.particle_timer.timeout.connect(self.update_particles)
        self.particle_timer.start(16)

    def init_ui(self):
        """初始化透明无边框窗口"""
        # 窗口标志：无边框 + 始终置顶 + 不在任务栏显示
        self.setWindowFlags(
            Qt.FramelessWindowHint |
            Qt.WindowStaysOnTopHint |
            Qt.Tool
        )
        # 背景透明
        self.setAttribute(Qt.WA_TranslucentBackground)

        # 获取宠物大小
        size = self.config.get("pet", {}).get("size", 200)
        self.resize(size, size)

        # 宠物图片标签
        self.pet_label = QLabel(self)
        self.pet_label.setGeometry(0, 0, size, size)
        self.pet_label.setAlignment(Qt.AlignCenter)

        # 气泡标签（简化版，详细的气泡在dialog模块中）
        self.hint_label = QLabel("", self)
        self.hint_label.setAlignment(Qt.AlignCenter)
        self.hint_label.setStyleSheet("""
            QLabel {
                font-size: 13px;
                color: #333;
                background-color: rgba(255, 255, 255, 210);
                border-radius: 12px;
                padding: 4px 12px;
            }
        """)
        self.hint_label.hide()

        # 设置初始位置
        self.move_to_start_position()

    def move_to_start_position(self):
        """将桌宠移动到配置的起始位置"""
        pos_type = self.config.get("pet", {}).get("start_position", "bottom_right")
        screen = QApplication.desktop().screenGeometry()
        w, h = self.width(), self.height()

        if pos_type == "bottom_right":
            self.move(screen.width() - w - 50, screen.height() - h - 100)
        elif pos_type == "center":
            self.move((screen.width() - w) // 2, (screen.height() - h) // 2)
        elif pos_type == "random":
            self.move(random.randint(0, screen.width() - w),
                       random.randint(0, screen.height() - h))

    def setup_animations(self):
        """初始化动画管理器"""
        size = self.config.get("pet", {}).get("size", 200)
        sprites_dir = self.config.get("animation", {}).get("sprites_dir", "assets/sprites")
        default_fps = self.config.get("pet", {}).get("fps", 8)

        self.anim_manager = AnimationManager(self.pet_label, frame_size=size)

        # 尝试加载各状态的动画
        sprites_path = get_resource_path(sprites_dir, self.resource_base)
        for state_name in ["idle", "walk", "happy", "sleep", "dragged", "sad"]:
            anim_dir = os.path.join(sprites_path, state_name)
            if os.path.exists(anim_dir):
                self.anim_manager.load_animation(state_name, anim_dir, fps=default_fps)

        # 如果没有任何动画资源，创建默认的占位图
        if not self.anim_manager.animations:
            self._create_default_display()
        else:
            default_state = self.config.get("animation", {}).get("default_state", "idle")
            self.anim_manager.switch_to(default_state)

    def _create_default_display(self):
        """当没有素材时，创建默认的文字显示"""
        pet_name = self.config.get("pet", {}).get("name", "萌萌")
        self.pet_label.setText(f"({pet_name})")
        self.pet_label.setStyleSheet("""
            QLabel {
                font-size: 40px;
                background-color: rgba(255, 200, 200, 200);
                border-radius: 80px;
                color: #333;
            }
        """)

    def setup_state_machine(self):
        """初始化状态机"""
        self.state_machine = StateMachine(self)

        # 注册所有状态
        self.state_machine.add_state(IdleState())
        self.state_machine.add_state(WalkState())
        self.state_machine.add_state(SleepState())
        self.state_machine.add_state(HappyState())

        # 设置初始状态
        default_state = self.config.get("animation", {}).get("default_state", "idle")
        self.state_machine.set_initial_state(default_state)

        # 状态机更新定时器（约60FPS）
        self.update_timer = QTimer()
        self.update_timer.timeout.connect(self.game_loop)
        self.update_timer.start(16)

    def setup_physics(self):
        """初始化物理系统"""
        self.physics = PhysicsBody(self.x(), self.y())
        self.physics.friction = 0.92
        self.physics.bounce = 0.5

        # 物理更新定时器
        self.physics_timer = QTimer()
        self.physics_timer.timeout.connect(self.update_physics)
        self.physics_timer.start(16)

    def setup_dialog(self):
        """初始化对话系统"""
        self.dialogue_manager = DialogueManager()
        self._hint_timer = QTimer()
        self._hint_timer.setSingleShot(True)
        self._hint_timer.timeout.connect(self.hint_label.hide)

        # 随机对话定时器
        ui_config = self.config.get("ui", {})
        min_interval = ui_config.get("random_talk_min_interval", 15000)
        max_interval = ui_config.get("random_talk_max_interval", 60000)
        self._schedule_random_talk(min_interval, max_interval)

    def _schedule_random_talk(self, min_interval, max_interval):
        """安排下一次随机对话"""
        interval = random.randint(min_interval, max_interval)
        QTimer.singleShot(interval, lambda: self._random_talk(min_interval, max_interval))

    def _random_talk(self, min_interval, max_interval):
        """随机说话"""
        state_name = self.state_machine.get_current_state_name()
        hour = datetime.now().hour
        text = self.dialogue_manager.get_contextual_dialogue(
            needs=self.needs,
            current_state=state_name,
            hour=hour
        )
        self.show_hint(text, self.config.get("ui", {}).get("bubble_duration", 3000))
        self._schedule_random_talk(min_interval, max_interval)

    def setup_sound(self):
        """初始化音效系统（如果素材存在）"""
        # 延迟导入，避免没有PyQt5.QtMultimedia时报错
        try:
            from PyQt5.QtMultimedia import QSoundEffect
            sounds_dir = get_resource_path(
                self.config.get("sound", {}).get("sounds_dir", "assets/sounds"),
                self.resource_base
            )
            if os.path.exists(sounds_dir):
                self.sound_effects = {}
                volume = self.config.get("sound", {}).get("volume", 50) / 100.0
                for filename in os.listdir(sounds_dir):
                    if filename.endswith(('.wav', '.ogg')):
                        name = os.path.splitext(filename)[0]
                        effect = QSoundEffect()
                        from PyQt5.QtCore import QUrl
                        effect.setSource(QUrl.fromLocalFile(
                            os.path.join(sounds_dir, filename)
                        ))
                        effect.setVolume(volume)
                        self.sound_effects[name] = effect
                print(f"[音效] 已加载 {len(self.sound_effects)} 个音效")
            else:
                self.sound_effects = {}
        except ImportError:
            self.sound_effects = {}
            print("[音效] PyQt5.QtMultimedia 不可用，音效功能禁用")

    def play_sound(self, name):
        """播放音效"""
        if self.config.get("sound", {}).get("enabled", True):
            if hasattr(self, 'sound_effects') and name in self.sound_effects:
                self.sound_effects[name].play()

    # ---- 游戏主循环 ----

    def game_loop(self):
        """主游戏循环 -- 每帧调用"""
        # 更新需求系统
        self.needs.update()
        # 更新状态机
        self.state_machine.update()

    def update_physics(self):
        """更新物理位置"""
        if self.physics.is_moving():
            screen = QApplication.desktop().screenGeometry()
            self.physics.update(screen.width(), screen.height(), self.width(), self.height())
            self.move(int(self.physics.x), int(self.physics.y))
            self.update_hint_position()

    # ---- 气泡与提示 ----

    def show_hint(self, text, duration=None):
        """显示文字提示（气泡）

        参数:
            text: 要显示的文字
            duration: 显示时长（毫秒），默认从配置读取
        """
        if duration is None:
            duration = self.config.get("ui", {}).get("bubble_duration", 3000)

        self.update_hint_position()
        self.hint_label.setText(text)
        self.hint_label.adjustSize()
        self.hint_label.show()
        self._hint_timer.start(duration)

    def update_hint_position(self):
        """更新气泡位置（跟随宠物移动）"""
        w = self.hint_label.width()
        pet_w = self.width()
        self.hint_label.move((pet_w - w) // 2, -30)

    # ---- 粒子效果（简化版）----

    def emit_particles(self, char="*", count=5, color="#FF6B6B"):
        """发射粒子（简化实现，使用QLabel显示）"""
        for _ in range(count):
            label = QLabel(char, self)
            label.setStyleSheet(f"font-size: 18px; color: {color}; background: transparent;")
            label.move(random.randint(0, self.width() - 20),
                       random.randint(0, self.height() - 20))
            label.show()

            # 简单的"飘散"效果：定时器控制透明度
            def fade_out(lbl=label):
                lbl.hide()
                lbl.deleteLater()
            QTimer.singleShot(random.randint(800, 1500), fade_out)

    def update_particles(self):
        """粒子更新（简化版，预留接口）"""
        pass

    # ---- 鼠标事件 ----

    def mousePressEvent(self, event):
        """鼠标按下"""
        if event.button() == Qt.LeftButton:
            self._drag_pos = event.globalPos() - self.frameGeometry().topLeft()
            self._drag_history = [(event.globalPos().x(), event.globalPos().y())]
            self.physics.stop()

            # 通知状态机"被点击"
            self.state_machine.handle_event("clicked")
            self.play_sound("click")

            # 简单的粒子效果
            self.emit_particles(char="*", count=5, color="#FFD700")

            event.accept()

    def mouseMoveEvent(self, event):
        """鼠标移动（拖拽）"""
        if self._drag_pos and event.buttons() == Qt.LeftButton:
            new_pos = event.globalPos() - self._drag_pos
            self.move(new_pos)

            # 记录拖拽轨迹
            self._drag_history.append((event.globalPos().x(), event.globalPos().y()))
            if len(self._drag_history) > 5:
                self._drag_history.pop(0)

            event.accept()

    def mouseReleaseEvent(self, event):
        """鼠标释放"""
        if event.button() == Qt.LeftButton:
            if len(self._drag_history) >= 2:
                # 计算抛掷速度
                last = self._drag_history[-1]
                first = self._drag_history[0]
                steps = len(self._drag_history)
                vx = (last[0] - first[0]) / steps * 0.5
                vy = (last[1] - first[1]) / steps * 0.5

                self.physics.x = self.x()
                self.physics.y = self.y()
                self.physics.fling(vx, vy)

            self._drag_pos = None
            self._drag_history = []
            self.state_machine.handle_event("released")
            event.accept()

    def mouseDoubleClickEvent(self, event):
        """鼠标双击"""
        if event.button() == Qt.LeftButton:
            reactions = ["被双击了！好痒！", "嘿嘿~别闹！", "哎呀！"]
            self.show_hint(random.choice(reactions))
            self.play_sound("happy")
            event.accept()

    def enterEvent(self, event):
        """鼠标移入"""
        self.show_hint("有人来了？", 1500)

    def leaveEvent(self, event):
        """鼠标移出"""
        self.hint_label.hide()

    # ---- 右键菜单 ----

    def contextMenuEvent(self, event):
        """右键菜单"""
        menu = QMenu(self)
        menu.setStyleSheet("""
            QMenu {
                background-color: #2c2c2c;
                color: white;
                border: 1px solid #555;
                border-radius: 8px;
                padding: 5px;
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
        """)

        pet_name = self.config.get("pet", {}).get("name", "萌萌")

        # 喂食
        feed_action = QAction(f"喂{pet_name}吃东西", self)
        feed_action.triggered.connect(self.do_feed)
        menu.addAction(feed_action)

        # 摸摸
        pet_action = QAction(f"摸摸{pet_name}", self)
        pet_action.triggered.connect(self.do_pet)
        menu.addAction(pet_action)

        # 玩耍
        play_action = QAction(f"和{pet_name}玩", self)
        play_action.triggered.connect(self.do_play)
        menu.addAction(play_action)

        menu.addSeparator()

        # 查看状态
        status_action = QAction("查看状态", self)
        status_action.triggered.connect(self.show_status)
        menu.addAction(status_action)

        # AI聊天（需在配置中启用 ai.enabled）
        ai_config = self.config.get("ai", {})
        if ai_config.get("enabled", False):
            chat_action = QAction(f"和{pet_name}聊天", self)
            chat_action.triggered.connect(self.open_chat)
            menu.addAction(chat_action)

        menu.addSeparator()

        # 退出
        quit_action = QAction("退出", self)
        quit_action.triggered.connect(QApplication.quit)
        menu.addAction(quit_action)

        menu.exec_(event.globalPos())

    # ---- 互动操作 ----

    def do_feed(self):
        """喂食"""
        self.needs.feed()
        self.play_sound("eat")
        self.show_hint("好好吃！谢谢！", 3000)
        self.emit_particles(char="❤", count=5, color="#FF6B6B")

    def do_pet(self):
        """抚摸"""
        self.needs.pet()
        self.play_sound("meow")
        self.show_hint("好舒服~", 2000)
        self.emit_particles(char="♥", count=3, color="#FF69B4")

    def do_play(self):
        """玩耍"""
        self.needs.play()
        self.play_sound("happy")
        self.show_hint("一起玩！", 2000)
        self.emit_particles(char="♪", count=4, color="#87CEEB")

    def show_status(self):
        """显示当前状态"""
        status = self.needs.get_status_text()
        self.show_hint(f"我现在{status}", 3000)

    def open_chat(self):
        """打开AI聊天对话框"""
        ai_config = self.config.get("ai", {})
        api_key = ai_config.get("api_key", "")
        base_url = ai_config.get("base_url", "https://api.openai.com/v1")
        model = ai_config.get("model", "gpt-3.5-turbo")
        pet_name = self.config.get("pet", {}).get("name", "萌萌")

        if not api_key:
            self.show_hint("AI功能未配置哦~请在config.yaml中设置api_key。", 4000)
            return

        # 打开聊天输入对话框
        dialog = ChatDialog(pet_name=pet_name, parent=self)
        if dialog.exec_() == ChatDialog.Accepted:
            user_msg = dialog.get_message()
            if user_msg:
                # 在后台线程调用AI，避免阻塞UI
                self.show_hint("让我想想...", 2000)
                def do_chat():
                    try:
                        ai_mgr = AIDialogManager(api_key, base_url, model, pet_name)
                        reply = ai_mgr.chat(user_msg)
                        # 通过信号回到主线程更新UI
                        QTimer.singleShot(0, lambda: self.show_hint(reply, 5000))
                    except Exception as e:
                        print(f"[AI] 聊天失败: {e}")
                        QTimer.singleShot(0, lambda: self.show_hint("呜...我说不出话了...", 3000))
                threading.Thread(target=do_chat, daemon=True).start()

    # ---- 键盘事件 ----

    def keyPressEvent(self, event):
        """键盘事件"""
        if event.key() == Qt.Key_Escape:
            QApplication.quit()
        event.accept()

    # ---- 窗口事件 ----

    def moveEvent(self, event):
        """窗口移动时更新气泡位置"""
        super().moveEvent(event)
        self.update_hint_position()


class NeedsSystem:
    """宠物需求系统 -- 管理饥饿度、体力、快乐值、无聊度"""

    def __init__(self, config=None):
        config = config or {}
        # 需求值 (0-100)
        self.hunger = 80        # 饱食度
        self.energy = 100       # 体力
        self.happiness = 70     # 快乐值
        self.boredom = 30       # 无聊度

        # 衰减速率
        self.hunger_decay = config.get("hunger_decay_rate", 0.5)
        self.energy_decay = config.get("energy_decay_rate", 0.3)
        self.happiness_decay = config.get("happiness_decay_rate", 0.2)
        self.boredom_increase = config.get("boredom_increase_rate", 0.4)

        # 阈值
        self.HUNGRY_THRESHOLD = 30
        self.SLEEPY_THRESHOLD = 20
        self.SAD_THRESHOLD = 25
        self.BORED_THRESHOLD = 70

        self._last_time = None

    def update(self):
        """更新需求值（每帧调用）"""
        import time
        now = time.time()
        if self._last_time is None:
            self._last_time = now
            return
        dt = now - self._last_time
        self._last_time = now

        self.hunger = max(0, self.hunger - self.hunger_decay * dt)
        self.energy = max(0, self.energy - self.energy_decay * dt)
        self.happiness = max(0, self.happiness - self.happiness_decay * dt)
        self.boredom = min(100, self.boredom + self.boredom_increase * dt)

    def feed(self, amount=30):
        """喂食"""
        self.hunger = min(100, self.hunger + amount)
        self.happiness = min(100, self.happiness + 10)

    def rest(self, amount=2):
        """休息"""
        self.energy = min(100, self.energy + amount)

    def play(self):
        """玩耍"""
        self.happiness = min(100, self.happiness + 15)
        self.boredom = max(0, self.boredom - 20)
        self.energy = max(0, self.energy - 5)

    def pet(self):
        """抚摸"""
        self.happiness = min(100, self.happiness + 10)

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
        return "content"

    def get_status_text(self):
        """获取当前状态文字"""
        needs = []
        if self.is_hungry():
            needs.append("饿了")
        if self.is_sleepy():
            needs.append("困了")
        if self.is_sad():
            needs.append("不开心")
        if self.is_bored():
            needs.append("无聊")
        return "，".join(needs) if needs else "心情不错"
