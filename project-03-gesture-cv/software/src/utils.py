"""
工具函数模块 | Utility Functions Module

提供配置加载、日志记录等辅助功能。
Provides configuration loading, logging, and other utility functions.
"""

import yaml
import logging
from pathlib import Path


def load_config(config_path=None):
    """
    加载配置文件
    Load configuration file
    """
    default_config = {
        'camera': {'device_id': 0, 'width': 1280, 'height': 720, 'fps': 30},
        'mediapipe': {'model_complexity': 1, 'max_num_hands': 2},
        'gestures': {'smoothing_window': 5},
        'display': {'show_landmarks': True, 'mirror': True}
    }

    if config_path and Path(config_path).exists():
        with open(config_path, 'r', encoding='utf-8') as f:
            user_config = yaml.safe_load(f)
            # 合并配置
            for key in user_config:
                if key in default_config and isinstance(default_config[key], dict):
                    default_config[key].update(user_config[key])
                else:
                    default_config[key] = user_config[key]

    return default_config


def setup_logging(level='INFO'):
    """设置日志 | Setup logging"""
    logging.basicConfig(
        level=getattr(logging, level),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )


def calculate_distance(point1, point2):
    """计算两点之间的距离 | Calculate distance between two points"""
    return ((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)**0.5


def calculate_angle(point1, point2, point3):
    """计算三点形成的角度 | Calculate angle formed by three points"""
    import math
    a = calculate_distance(point2, point3)
    b = calculate_distance(point1, point3)
    c = calculate_distance(point1, point2)

    if a * c == 0:
        return 0

    cos_angle = (a**2 + c**2 - b**2) / (2 * a * c)
    return math.degrees(math.acos(max(-1, min(1, cos_angle))))
