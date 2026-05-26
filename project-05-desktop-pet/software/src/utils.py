"""
桌宠 "萌桌面" -- 工具函数
Desktop Pet "PetDesk" -- Utility Functions

功能：通用工具函数，如资源路径获取、配置读取等
"""

import sys
import os


def get_resource_path(relative_path, resource_base=None):
    """获取资源文件的绝对路径

    兼容两种运行模式：
    1. PyInstaller打包后的exe模式（资源在临时目录）
    2. 开发模式（资源在项目目录中）

    参数:
        relative_path: 相对于资源根目录的路径
        resource_base: 资源根目录（如果为None则自动检测）

    返回:
        绝对路径字符串
    """
    if resource_base:
        return os.path.join(resource_base, relative_path)

    if getattr(sys, 'frozen', False):
        # 打包后的exe模式
        base_path = sys._MEIPASS
    else:
        # 开发模式 -- 从src/向上到software/目录
        base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    return os.path.join(base_path, relative_path)


def clamp(value, min_val, max_val):
    """将值限制在指定范围内

    参数:
        value: 输入值
        min_val: 最小值
        max_val: 最大值

    返回:
        限制后的值
    """
    return max(min_val, min(max_val, value))


def lerp(start, end, t):
    """线性插值

    参数:
        start: 起始值
        end: 结束值
        t: 插值系数（0.0-1.0）

    返回:
        插值结果
    """
    return start + (end - start) * t


def distance(x1, y1, x2, y2):
    """计算两点之间的距离

    参数:
        x1, y1: 第一个点的坐标
        x2, y2: 第二个点的坐标

    返回:
        距离值（浮点数）
    """
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5


def random_color():
    """生成随机颜色的十六进制字符串

    返回:
        如 "#FF6B6B" 格式的颜色字符串
    """
    import random
    r = random.randint(100, 255)
    g = random.randint(100, 255)
    b = random.randint(100, 255)
    return f"#{r:02X}{g:02X}{b:02X}"


def format_time_delta(seconds):
    """将秒数格式化为可读的时间描述

    参数:
        seconds: 秒数

    返回:
        如 "3分钟前"、"1小时前" 的字符串
    """
    if seconds < 60:
        return f"{int(seconds)}秒前"
    elif seconds < 3600:
        return f"{int(seconds / 60)}分钟前"
    elif seconds < 86400:
        return f"{int(seconds / 3600)}小时前"
    else:
        return f"{int(seconds / 86400)}天前"
