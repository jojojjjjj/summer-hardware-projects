# -*- coding: utf-8 -*-
"""
工具函数模块
Utility Functions Module

提供项目通用的辅助功能：配置加载、日志设置、格式化工具等。

Provides common utility functions: config loading, logging setup, formatting tools.

最后更新 | Last updated: 2026-05-26
"""

import logging
import sys
from pathlib import Path
from typing import Optional

import yaml


def load_config(path: Path) -> dict:
    """
    加载 YAML 配置文件
    Load YAML configuration file

    参数 Args:
        path: 配置文件路径 | Config file path

    返回 Returns:
        dict: 配置字典 | Configuration dictionary

    异常 Raises:
        FileNotFoundError: 配置文件不存在
        yaml.YAMLError: YAML 格式错误
    """
    with open(path, "r", encoding="utf-8") as f:
        config = yaml.safe_load(f)
    return config or {}


def setup_logging(verbose: bool = False) -> logging.Logger:
    """
    设置日志系统
    Setup logging system

    参数 Args:
        verbose: 是否启用详细输出 | Enable verbose output

    返回 Returns:
        logging.Logger: 配置好的日志器
    """
    logger = logging.getLogger("keyverse")
    logger.setLevel(logging.DEBUG if verbose else logging.INFO)

    # 避免重复添加 handler
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(logging.DEBUG if verbose else logging.INFO)

        formatter = logging.Formatter(
            "[%(levelname)s] %(message)s",
            datefmt="%H:%M:%S"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger


def format_hex(value: int, width: int = 2) -> str:
    """
    格式化为十六进制字符串
    Format as hexadecimal string

    参数 Args:
        value: 整数值 | Integer value
        width: 最小位数 | Minimum digits

    返回 Returns:
        str: 格式化的十六进制字符串，如 "0x0A"
    """
    return f"0x{value:0{width}X}"


def format_binary(value: int, width: int = 8) -> str:
    """
    格式化为二进制字符串
    Format as binary string

    参数 Args:
        value: 整数值 | Integer value
        width: 最小位数 | Minimum digits

    返回 Returns:
        str: 格式化的二进制字符串，如 "0b00001010"
    """
    return f"0b{value:0{width}b}"


def pad_to_matrix(flat_list: list, rows: int, cols: int, fill=None) -> list:
    """
    将一维列表转换为二维矩阵
    Convert flat list to 2D matrix

    参数 Args:
        flat_list: 一维列表 | Flat list
        rows: 行数 | Number of rows
        cols: 列数 | Number of columns
        fill: 不足时的填充值 | Fill value for padding

    返回 Returns:
        list: 二维列表 | 2D list
    """
    matrix = []
    for r in range(rows):
        row = []
        for c in range(cols):
            idx = r * cols + c
            if idx < len(flat_list):
                row.append(flat_list[idx])
            else:
                row.append(fill)
        matrix.append(row)
    return matrix


def generate_keymap_table(keymap: list, layer_names: list = None) -> str:
    """
    生成键位映射的 ASCII 表格
    Generate ASCII table of keymap

    参数 Args:
        keymap: 键位映射列表 | Keymap list
        layer_names: 层名称列表 | Layer names

    返回 Returns:
        str: 格式化的键位表
    """
    lines = []
    for layer_idx, layer in enumerate(keymap):
        name = layer_names[layer_idx] if layer_names and layer_idx < len(layer_names) else f"Layer {layer_idx}"
        lines.append(f"\n=== {name} ===")
        keys = layer.get("keys", []) if isinstance(layer, dict) else layer
        for row in keys:
            line = " | ".join(f"{k:>8}" for k in row)
            lines.append(f"| {line} |")
        lines.append("")
    return "\n".join(lines)
