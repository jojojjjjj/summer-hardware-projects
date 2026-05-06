"""
工具函数模块 | Utility Functions Module

包含配置加载、日志等辅助功能 | Contains config loading, logging, and other utilities
"""
import yaml
import os
import logging
from pathlib import Path
from datetime import datetime


def load_config(config_path="config.yaml"):
    """
    加载配置文件 | Load configuration file

    Args:
        config_path: 配置文件路径 | Config file path

    Returns:
        配置字典 | Configuration dict
    """
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = yaml.safe_load(f)
        return config
    except FileNotFoundError:
        print(f"配置文件不存在 | Config file not found: {config_path}")
        return None
    except Exception as e:
        print(f"配置加载失败 | Config load failed: {e}")
        return None


def save_config(config, config_path):
    """
    保存配置文件 | Save configuration file

    Args:
        config: 配置字典 | Configuration dict
        config_path: 保存路径 | Save path
    """
    try:
        os.makedirs(os.path.dirname(config_path), exist_ok=True)
        with open(config_path, 'w', encoding='utf-8') as f:
            yaml.dump(config, f, allow_unicode=True)
        return True
    except Exception as e:
        print(f"配置保存失败 | Config save failed: {e}")
        return False


def setup_logger(name="xiaozhi", log_dir="logs", level=logging.INFO):
    """
    设置日志 | Setup logger

    Args:
        name: 日志名称 | Logger name
        log_dir: 日志目录 | Log directory
        level: 日志级别 | Log level
    """
    os.makedirs(log_dir, exist_ok=True)

    log_file = os.path.join(
        log_dir,
        f"{name}_{datetime.now().strftime('%Y%m%d')}.log"
    )

    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    # 文件处理器 | File handler
    file_handler = logging.FileHandler(log_file, encoding='utf-8')
    file_handler.setLevel(logging.DEBUG)

    # 控制台处理器 | Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(level)

    # 格式化 | Formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger


def ensure_dir(directory):
    """确保目录存在 | Ensure directory exists"""
    Path(directory).mkdir(parents=True, exist_ok=True)


def get_project_root():
    """获取项目根目录 | Get project root directory"""
    return Path(__file__).parent.parent


def format_duration(seconds):
    """格式化时长 | Format duration"""
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{minutes}:{secs:02d}"
