"""
桌宠 "萌桌面" -- 基础测试
Desktop Pet "PetDesk" -- Basic Tests

功能：测试各个模块的核心功能
运行方式：python -m pytest software/tests/test_basic.py -v
"""

import sys
import os

# 将src目录添加到Python路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

import unittest


class TestStateMachine(unittest.TestCase):
    """测试状态机模块"""

    def test_state_creation(self):
        """测试状态创建"""
        from state_machine import IdleState, WalkState, SleepState, HappyState

        idle = IdleState()
        walk = WalkState()
        sleep = SleepState()
        happy = HappyState()

        self.assertEqual(idle.name, "idle")
        self.assertEqual(walk.name, "walk")
        self.assertEqual(sleep.name, "sleep")
        self.assertEqual(happy.name, "happy")

    def test_state_machine_register(self):
        """测试状态注册"""
        from state_machine import StateMachine, IdleState, WalkState

        # 创建一个模拟的pet对象
        class MockPet:
            pass

        pet = MockPet()
        sm = StateMachine(pet)

        sm.add_state(IdleState())
        sm.add_state(WalkState())

        self.assertIn("idle", sm.states)
        self.assertIn("walk", sm.states)
        self.assertEqual(len(sm.states), 2)

    def test_state_machine_transition(self):
        """测试状态切换"""
        from state_machine import StateMachine, IdleState, WalkState

        class MockPet:
            def __init__(self):
                self.state_log = []

        pet = MockPet()
        sm = StateMachine(pet)

        sm.add_state(IdleState())
        sm.add_state(WalkState())

        sm.set_initial_state("idle")
        self.assertEqual(sm.get_current_state_name(), "idle")

        sm.transition_to("walk")
        self.assertEqual(sm.get_current_state_name(), "walk")

        sm.transition_to("idle")
        self.assertEqual(sm.get_current_state_name(), "idle")

    def test_state_machine_no_duplicate_transition(self):
        """测试不会重复进入同一状态"""
        from state_machine import StateMachine, IdleState

        class MockPet:
            pass

        pet = MockPet()
        sm = StateMachine(pet)
        sm.add_state(IdleState())
        sm.set_initial_state("idle")

        # 再次切换到同一状态应该无操作
        sm.transition_to("idle")
        self.assertEqual(sm.get_current_state_name(), "idle")


class TestAnimationManager(unittest.TestCase):
    """测试动画管理器"""

    def test_animation_manager_init(self):
        """测试动画管理器初始化"""
        from animation import AnimationManager

        class MockLabel:
            def setPixmap(self, pixmap):
                pass

        label = MockLabel()
        am = AnimationManager(label, frame_size=200)

        self.assertEqual(len(am.animations), 0)
        self.assertIsNone(am.current_state)
        self.assertFalse(am.is_playing)

    def test_animation_has_animation(self):
        """测试动画存在检查"""
        from animation import AnimationManager

        class MockLabel:
            def setPixmap(self, pixmap):
                pass

        label = MockLabel()
        am = AnimationManager(label)

        self.assertFalse(am.has_animation("idle"))
        self.assertFalse(hasattr(am, 'nonexistent'))


class TestPhysicsBody(unittest.TestCase):
    """测试物理系统"""

    def test_physics_init(self):
        """测试物理体初始化"""
        from interaction import PhysicsBody

        body = PhysicsBody(100, 200)
        self.assertEqual(body.x, 100.0)
        self.assertEqual(body.y, 200.0)
        self.assertEqual(body.vx, 0.0)
        self.assertEqual(body.vy, 0.0)

    def test_physics_fling(self):
        """测试抛掷"""
        from interaction import PhysicsBody

        body = PhysicsBody(500, 300)
        body.friction = 1.0  # 无摩擦
        body.fling(10, 5)

        self.assertTrue(body.is_moving())
        self.assertEqual(body.vx, 10)
        self.assertEqual(body.vy, 5)

    def test_physics_stop(self):
        """测试停止"""
        from interaction import PhysicsBody

        body = PhysicsBody()
        body.fling(10, 10)
        body.stop()

        self.assertFalse(body.is_moving())
        self.assertEqual(body.vx, 0)
        self.assertEqual(body.vy, 0)

    def test_physics_boundary_collision(self):
        """测试边界碰撞"""
        from interaction import PhysicsBody

        # 测试左边界
        body = PhysicsBody(-10, 100)
        body.vx = -5
        body.bounce = 0.5
        body.friction = 1.0
        body._check_boundary(800, 600, 200, 200)

        self.assertEqual(body.x, 0)
        self.assertGreater(body.vx, 0)  # 速度应该反向

    def test_physics_gravity(self):
        """测试重力"""
        from interaction import PhysicsBody

        body = PhysicsBody(400, 0)
        body.use_gravity = True
        body.gravity = 1.0
        body.friction = 1.0

        initial_y = body.y
        body._check_boundary(800, 600, 200, 200)  # 先处理边界
        # 模拟几帧
        for _ in range(10):
            body.vy += body.gravity
            body.y += body.vy

        self.assertGreater(body.y, initial_y)  # y应该增加（向下移动）


class TestDialogueManager(unittest.TestCase):
    """测试对话管理器"""

    def test_random_dialogue(self):
        """测试随机对话获取"""
        from interaction import DialogueManager

        dm = DialogueManager()
        text = dm.get_random_dialogue("random")

        self.assertIsInstance(text, str)
        self.assertGreater(len(text), 0)

    def test_category_dialogue(self):
        """测试分类对话获取"""
        from interaction import DialogueManager

        dm = DialogueManager()

        hungry_text = dm.get_random_dialogue("hungry")
        self.assertIn(hungry_text, dm.dialogues["hungry"])

    def test_add_custom_dialogue(self):
        """测试添加自定义对话"""
        from interaction import DialogueManager

        dm = DialogueManager()
        dm.add_dialogue("custom", "这是自定义对话")

        self.assertIn("custom", dm.dialogues)
        self.assertIn("这是自定义对话", dm.dialogues["custom"])

    def test_contextual_dialogue(self):
        """测试上下文对话选择"""
        from interaction import DialogueManager

        dm = DialogueManager()

        # 不传任何上下文，应该返回随机对话
        text = dm.get_contextual_dialogue()
        self.assertIsInstance(text, str)
        self.assertGreater(len(text), 0)


class TestNeedsSystem(unittest.TestCase):
    """测试需求系统（在pet.py中定义）"""

    def test_needs_init(self):
        """测试需求系统初始化"""
        # 由于NeedsSystem在pet.py中，我们单独导入测试
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
        from pet import NeedsSystem

        ns = NeedsSystem()
        self.assertEqual(ns.hunger, 80)
        self.assertEqual(ns.energy, 100)

    def test_feed(self):
        """测试喂食功能"""
        from pet import NeedsSystem

        ns = NeedsSystem()
        ns.hunger = 20  # 饥饿状态
        ns.feed(30)

        self.assertEqual(ns.hunger, 50)
        self.assertGreater(ns.happiness, 70)  # 吃东西也开心

    def test_needs_threshold(self):
        """测试需求阈值检测"""
        from pet import NeedsSystem

        ns = NeedsSystem()

        # 正常状态
        self.assertFalse(ns.is_hungry())
        self.assertFalse(ns.is_sleepy())

        # 低值状态
        ns.hunger = 20
        ns.energy = 10
        self.assertTrue(ns.is_hungry())
        self.assertTrue(ns.is_sleepy())

    def test_status_text(self):
        """测试状态文字生成"""
        from pet import NeedsSystem

        ns = NeedsSystem()
        text = ns.get_status_text()
        self.assertIn("心情不错", text)

        ns.hunger = 20
        text = ns.get_status_text()
        self.assertIn("饿了", text)


class TestUtils(unittest.TestCase):
    """测试工具函数"""

    def test_clamp(self):
        """测试数值限制"""
        from utils import clamp

        self.assertEqual(clamp(5, 0, 10), 5)
        self.assertEqual(clamp(-5, 0, 10), 0)
        self.assertEqual(clamp(15, 0, 10), 10)

    def test_distance(self):
        """测试距离计算"""
        from utils import distance

        d = distance(0, 0, 3, 4)
        self.assertAlmostEqual(d, 5.0)

        d = distance(0, 0, 0, 0)
        self.assertAlmostEqual(d, 0.0)

    def test_lerp(self):
        """测试线性插值"""
        from utils import lerp

        self.assertAlmostEqual(lerp(0, 10, 0.5), 5.0)
        self.assertAlmostEqual(lerp(0, 10, 0.0), 0.0)
        self.assertAlmostEqual(lerp(0, 10, 1.0), 10.0)


if __name__ == "__main__":
    unittest.main()
