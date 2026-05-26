"""
桌宠 "萌桌面" -- 主入口文件
Desktop Pet "PetDesk" -- Main Entry Point

功能：初始化应用、加载配置、启动桌宠窗口
Usage: python src/main.py
"""

import sys
import os
import yaml
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import Qt

# 将src目录添加到Python路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from pet import PetWindow


def get_resource_path(relative_path):
    """获取资源文件的绝对路径（兼容打包和开发模式）

    打包后的exe中，资源文件在临时目录 sys._MEIPASS 中
    开发模式下，资源文件在项目目录中

    参数:
        relative_path: 相对于项目根目录的路径

    返回:
        绝对路径字符串
    """
    if getattr(sys, 'frozen', False):
        # PyInstaller打包后的模式
        base_path = sys._MEIPASS
    else:
        # 开发模式 -- 从src/向上一级到software/目录
        base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    return os.path.join(base_path, relative_path)


def load_config():
    """加载配置文件

    优先读取 config.yaml，如果不存在则使用默认配置。
    配置文件不存在时会自动生成一份模板。

    返回:
        dict: 配置字典
    """
    config_path = get_resource_path("config.yaml")

    # 默认配置
    default_config = {
        "pet": {
            "name": "萌萌",
            "size": 200,
            "start_position": "bottom_right",
            "fps": 8,
        },
        "animation": {
            "sprites_dir": "assets/sprites",
            "default_state": "idle",
        },
        "needs": {
            "hunger_decay_rate": 0.5,
            "energy_decay_rate": 0.3,
            "happiness_decay_rate": 0.2,
            "boredom_increase_rate": 0.4,
        },
        "sound": {
            "enabled": True,
            "volume": 50,
            "sounds_dir": "assets/sounds",
        },
        "ai": {
            "enabled": False,
            "api_key": "",
            "base_url": "https://api.deepseek.com",
            "model": "deepseek-chat",
            "max_tokens": 100,
            "temperature": 0.8,
        },
        "hardware": {
            "enabled": False,
            "port": "COM3",
            "baudrate": 9600,
        },
        "ui": {
            "bubble_duration": 3000,
            "bubble_typing_speed": 50,
            "random_talk_min_interval": 15000,
            "random_talk_max_interval": 60000,
        },
    }

    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                user_config = yaml.safe_load(f)
            if user_config:
                _deep_merge(default_config, user_config)
                print(f"[配置] 已加载配置文件: {config_path}")
        except Exception as e:
            print(f"[配置] 加载配置失败，使用默认配置: {e}")
    else:
        print(f"[配置] 配置文件不存在，使用默认配置")

    return default_config


def _deep_merge(base, override):
    """深度合并两个字典（override覆盖base中的对应值）

    参数:
        base: 基础字典（会被修改）
        override: 覆盖字典
    """
    for key, value in override.items():
        if key in base and isinstance(base[key], dict) and isinstance(value, dict):
            _deep_merge(base[key], value)
        else:
            base[key] = value


def main():
    """程序主入口"""
    # 启用高DPI缩放支持（适配Windows高分辨率屏幕）
    if hasattr(Qt, 'AA_EnableHighDpiScaling'):
        QApplication.setAttribute(Qt.AA_EnableHighDpiScaling, True)
    if hasattr(Qt, 'AA_UseHighDpiPixmaps'):
        QApplication.setAttribute(Qt.AA_UseHighDpiPixmaps, True)

    # 创建Qt应用实例（每个PyQt5程序必须有且只有一个QApplication）
    app = QApplication(sys.argv)
    app.setQuitOnLastWindowClosed(False)  # 关闭窗口不退出程序（因为无边框窗口关闭=退出）

    # 加载配置
    config = load_config()

    # 设置资源路径
    config["_resource_base"] = get_resource_path("")

    # 打印启动信息
    pet_name = config["pet"]["name"]
    print("=" * 40)
    print(f"  桌宠 '{pet_name}' 启动中...")
    print(f"  版本: 1.0.0")
    print("=" * 40)

    # 创建并显示桌宠窗口
    try:
        pet = PetWindow(config)
        pet.show()
        print(f"[启动] '{pet_name}' 已就绪！")
        print("[提示] 左键拖拽移动 | 右键查看菜单 | ESC退出")
    except Exception as e:
        print(f"[错误] 启动失败: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

    # 运行Qt事件循环（阻塞直到程序退出）
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
