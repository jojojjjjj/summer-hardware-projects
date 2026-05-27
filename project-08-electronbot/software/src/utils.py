"""
工具函数模块
Utility Functions Module

功能：
1. 配置文件加载 (YAML)
2. 角度转换（度 <-> 弧度）
3. 数值钳位 (clamp)
4. 线性插值 (lerp)
5. 缓动函数 (ease_in_out)
6. 值域映射 (map_range)
7. 校验和计算
8. 日志系统设置

Features:
1. Configuration file loading (YAML)
2. Angle conversion (degrees <-> radians)
3. Value clamping
4. Linear interpolation (lerp)
5. Easing functions (ease_in_out)
6. Value range mapping (map_range)
7. Checksum calculation
8. Logging system setup
"""

import os
import math
import logging
from typing import Optional, Dict, Any


def load_config(config_path: Optional[str] = None) -> Dict[str, Any]:
    """
    加载配置文件
    Load configuration file

    按以下优先级查找配置文件：
    1. 指定的路径
    2. 当前工作目录的 config.yaml
    3. 软件目录下的 config.yaml
    4. 软件目录下的 config.template.yaml
    5. 使用默认值

    Args:
        config_path: 配置文件路径 (None=自动查找)

    Returns:
        dict: 配置字典
    """
    # 默认配置 | Default configuration
    default_config = {
        'usb': {
            'port': 'COM3',
            'baudrate': 115200,
            'timeout': 2,
        },
        'servos': [
            {'id': 0, 'name': 'head_yaw', 'min_angle': -90, 'max_angle': 90,
             'offset': 0, 'pid_p': 1.2, 'pid_i': 0.02, 'pid_d': 0.5},
            {'id': 1, 'name': 'head_pitch', 'min_angle': -45, 'max_angle': 45,
             'offset': 0, 'pid_p': 1.0, 'pid_i': 0.01, 'pid_d': 0.4},
            {'id': 2, 'name': 'left_arm', 'min_angle': -90, 'max_angle': 90,
             'offset': 5, 'pid_p': 0.8, 'pid_i': 0.01, 'pid_d': 0.3},
            {'id': 3, 'name': 'right_arm', 'min_angle': -90, 'max_angle': 90,
             'offset': -5, 'pid_p': 0.8, 'pid_i': 0.01, 'pid_d': 0.3},
            {'id': 4, 'name': 'body_yaw', 'min_angle': -30, 'max_angle': 30,
             'offset': 0, 'pid_p': 1.5, 'pid_i': 0.02, 'pid_d': 0.6},
            {'id': 5, 'name': 'body_pitch', 'min_angle': -20, 'max_angle': 20,
             'offset': 0, 'pid_p': 1.5, 'pid_i': 0.02, 'pid_d': 0.6},
        ],
        'display': {
            'width': 240,
            'height': 240,
            'spi_speed': 40000000,
        },
        'camera': {
            'device_id': 0,
            'resolution': [640, 480],
            'fps': 30,
        },
        'expressions': {
            'path': 'assets/expressions/',
            'default_expression': 'idle',
        },
        'ai': {
            'api_key': '',
            'model': 'gpt-4o-mini',
            'system_prompt': 'You are ElectronBot, a cute desktop pet robot.',
        },
        'behavior': {
            'reaction_enabled': True,
            'idle_timeout': 30,
            'gesture_sensitivity': 0.7,
        },
        'logging': {
            'level': 'INFO',
            'save_logs': False,
            'log_dir': 'logs',
        },
    }

    # 尝试加载 YAML 配置文件 | Try loading YAML config file
    try:
        import yaml
    except ImportError:
        print("警告: PyYAML 未安装，使用默认配置 | Warning: PyYAML not installed, using defaults")
        return default_config

    # 查找配置文件 | Find config file
    if config_path is None:
        candidates = [
            'config.yaml',
            os.path.join(os.path.dirname(__file__), '..', 'config.yaml'),
            os.path.join(os.path.dirname(__file__), '..', 'config.template.yaml'),
        ]
        for candidate in candidates:
            candidate = os.path.normpath(candidate)
            if os.path.exists(candidate):
                config_path = candidate
                break

    if config_path and os.path.exists(config_path):
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                loaded = yaml.safe_load(f)
                if loaded:
                    _merge_config(default_config, loaded)
                    print(f"已加载配置文件 | Loaded config: {config_path}")
        except Exception as e:
            print(f"配置文件加载失败 | Config load failed: {e}")

    return default_config


def _merge_config(base: dict, override: dict) -> None:
    """
    递归合并配置字典
    Recursively merge configuration dictionaries

    override 中的值覆盖 base 中的同名值。
    Values in override replace values with the same key in base.

    Args:
        base: 基础配置 (会被修改)
        override: 覆盖配置
    """
    for key, value in override.items():
        if key in base and isinstance(base[key], dict) and isinstance(value, dict):
            _merge_config(base[key], value)
        else:
            base[key] = value


def setup_logging(log_config: Optional[Dict[str, Any]] = None) -> logging.Logger:
    """
    设置日志系统
    Setup logging system

    Args:
        log_config: 日志配置字典

    Returns:
        logging.Logger: 日志器实例
    """
    if log_config is None:
        log_config = {}

    level_str = log_config.get('level', 'INFO').upper()
    level_map = {
        'DEBUG': logging.DEBUG,
        'INFO': logging.INFO,
        'WARNING': logging.WARNING,
        'ERROR': logging.ERROR,
    }
    level = level_map.get(level_str, logging.INFO)

    # 配置日志格式 | Configure log format
    logging.basicConfig(
        level=level,
        format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
        datefmt='%H:%M:%S',
    )

    return logging.getLogger('electronbot')


# ---- 数学工具函数 | Math utility functions ----

def angle_to_radians(degrees: float) -> float:
    """
    角度转弧度
    Convert degrees to radians

    Args:
        degrees: 角度值

    Returns:
        float: 弧度值
    """
    return degrees * math.pi / 180.0


def angle_to_degrees(radians: float) -> float:
    """
    弧度转角度
    Convert radians to degrees

    Args:
        radians: 弧度值

    Returns:
        float: 角度值
    """
    return radians * 180.0 / math.pi


def clamp(value: float, min_val: float, max_val: float) -> float:
    """
    将值限制在 [min_val, max_val] 范围内
    Clamp value to the range [min_val, max_val]

    Args:
        value: 输入值
        min_val: 最小值
        max_val: 最大值

    Returns:
        float: 钳位后的值
    """
    return max(min_val, min(max_val, value))


def lerp(start: float, end: float, t: float) -> float:
    """
    线性插值
    Linear interpolation

    当 t=0 时返回 start，t=1 时返回 end。

    Args:
        start: 起始值
        end: 终止值
        t: 插值因子 [0.0, 1.0]

    Returns:
        float: 插值结果
    """
    return start + (end - start) * clamp(t, 0.0, 1.0)


def ease_in_out(t: float) -> float:
    """
    缓入缓出函数 (三次 Hermite)
    Ease-in-out function (cubic Hermite)

    使用 3t^2 - 2t^3 曲线实现平滑的加减速效果。
    Uses a 3t^2 - 2t^3 curve for smooth acceleration/deceleration.

    Args:
        t: 输入因子 [0.0, 1.0]

    Returns:
        float: 缓动后的因子 [0.0, 1.0]
    """
    t = clamp(t, 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def map_range(value: float, in_min: float, in_max: float,
              out_min: float, out_max: float) -> float:
    """
    将值从一个范围映射到另一个范围
    Map a value from one range to another

    例如: map_range(0.5, 0, 1, -90, 90) = 0
    例如: map_range(0.75, 0, 1, -90, 90) = 45

    Args:
        value: 输入值
        in_min: 输入范围最小值
        in_max: 输入范围最大值
        out_min: 输出范围最小值
        out_max: 输出范围最大值

    Returns:
        float: 映射后的值
    """
    if in_max == in_min:
        return out_min
    ratio = (value - in_min) / (in_max - in_min)
    return out_min + ratio * (out_max - out_min)


def calculate_checksum(data: bytes) -> int:
    """
    计算校验和 (XOR)
    Calculate checksum (XOR)

    对 data 中的所有字节逐个进行异或运算。
    XOR all bytes in data.

    Args:
        data: 输入字节串

    Returns:
        int: 校验和 (0-255)
    """
    checksum = 0x00
    for byte in data:
        checksum ^= byte
    return checksum & 0xFF
