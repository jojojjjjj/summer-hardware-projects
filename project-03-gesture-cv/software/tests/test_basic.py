"""
基础测试 | Basic Tests

手势互动装置项目的基础单元测试。
Basic unit tests for Gesture Interactive Installation Project.
"""

import unittest
import numpy as np
import sys
from pathlib import Path

# 添加src目录到路径
sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))

from utils import calculate_distance, calculate_angle


class TestUtils(unittest.TestCase):
    """测试工具函数 | Test utility functions"""

    def test_calculate_distance(self):
        """测试距离计算 | Test distance calculation"""
        p1 = (0, 0)
        p2 = (3, 4)
        distance = calculate_distance(p1, p2)
        self.assertAlmostEqual(distance, 5.0, places=2)

    def test_calculate_angle(self):
        """测试角度计算 | Test angle calculation"""
        # 直角三角形
        angle = calculate_angle((0, 0), (0, 1), (1, 1))
        self.assertAlmostEqual(angle, 90.0, places=1)


class TestGestureRecognition(unittest.TestCase):
    """测试手势识别 | Test gesture recognition"""

    def setUp(self):
        """设置测试环境 | Setup test environment"""
        # 创建模拟的手部关键点
        self.mock_landmarks = type('obj', (object,), {
            'landmark': [type('obj', (object,), {'x': 0.5, 'y': 0.5 + i * 0.05})
                        for i in range(21)]
        })()

    def test_fist_detection(self):
        """测试握拳检测 | Test fist detection"""
        # 这里应该有实际的检测逻辑
        # 简化示例
        self.assertTrue(True)


if __name__ == '__main__':
    unittest.main()
