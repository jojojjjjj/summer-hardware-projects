# -*- coding: utf-8 -*-
"""
宏键盘 "键界" 主程序
Macro Keyboard "KeyVerse" Main Entry Point

本模块是 PC 端工具的入口，提供以下功能：
1. 加载配置文件
2. 运行基础测试
3. 监控 QMK 控制台输出（调试用）

This module is the entry point for the PC-side tools:
1. Load configuration
2. Run basic tests
3. Monitor QMK console output (for debugging)

最后更新 | Last updated: 2026-05-26
"""

import sys
import argparse
from pathlib import Path

# 导入项目模块
from keymatrix import KeyMatrix
from oled_display import OLEDDisplay
from rgb_led import RGBLed
from encoder import Encoder
from usb_hid import USBHIDDevice
from utils import load_config, setup_logging


def parse_args():
    """解析命令行参数 | Parse command-line arguments"""
    parser = argparse.ArgumentParser(
        description="宏键盘 KeyVerse 工具 | Macro Keyboard KeyVerse Tools"
    )
    parser.add_argument(
        "--config", "-c",
        type=str,
        default="config.yaml",
        help="配置文件路径 | Config file path (default: config.yaml)"
    )
    parser.add_argument(
        "--action", "-a",
        choices=["test", "monitor", "info"],
        default="test",
        help="执行的动作 | Action to perform: test/monitor/info"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="详细输出 | Verbose output"
    )
    return parser.parse_args()


def show_keyboard_info(config: dict):
    """
    显示键盘硬件信息
    Display keyboard hardware information

    参数 Args:
        config: 配置字典 | Configuration dictionary
    """
    kb = config.get("keyboard", {})
    print(f"=== {kb.get('name', 'Unknown')} ===")
    print(f"布局 Layout: {kb.get('layout', 'N/A')}")
    print(f"矩阵 Matrix: {kb.get('rows', 0)}x{kb.get('cols', 0)}")
    print(f"总按键数 Total keys: {kb.get('total_keys', 0)}")
    print()

    # 矩阵信息
    matrix_cfg = config.get("matrix", {})
    print(f"[矩阵扫描 Matrix]")
    print(f"  行引脚 Row pins: {matrix_cfg.get('row_pins', [])}")
    print(f"  列引脚 Col pins: {matrix_cfg.get('col_pins', [])}")
    print(f"  消抖时间 Debounce: {matrix_cfg.get('debounce_ms', 5)}ms")
    print(f"  扫描频率 Scan rate: {matrix_cfg.get('scan_rate_hz', 1000)}Hz")
    print()

    # OLED 信息
    oled_cfg = config.get("oled", {})
    if oled_cfg.get("enabled", False):
        print(f"[OLED 显示 Display]")
        print(f"  型号 Type: {oled_cfg.get('type', 'N/A')}")
        print(f"  分辨率 Resolution: {oled_cfg.get('resolution', 'N/A')}")
        print(f"  接口 Interface: {oled_cfg.get('interface', 'N/A')}")
        print(f"  地址 Address: {oled_cfg.get('address', 'N/A')}")
        print()

    # RGB 信息
    rgb_cfg = config.get("rgb", {})
    if rgb_cfg.get("enabled", False):
        print(f"[RGB 灯效 Lighting]")
        print(f"  型号 Type: {rgb_cfg.get('type', 'N/A')}")
        print(f"  数量 Count: {rgb_cfg.get('count', 0)}")
        print(f"  最大亮度 Max brightness: {rgb_cfg.get('max_brightness', 255)}")
        print(f"  默认模式 Default mode: {rgb_cfg.get('default_mode', 'N/A')}")
        print()

    # 旋钮信息
    enc_cfg = config.get("encoder", {})
    if enc_cfg.get("enabled", False):
        print(f"[旋钮编码器 Encoder]")
        print(f"  A 相 Pin A: {enc_cfg.get('a_pin', 'N/A')}")
        print(f"  B 相 Pin B: {enc_cfg.get('b_pin', 'N/A')}")
        print(f"  按键 Switch: {enc_cfg.get('switch_pin', 'N/A')}")
        print()


def run_basic_test(config: dict):
    """
    运行基础功能测试
    Run basic functional tests

    参数 Args:
        config: 配置字典 | Configuration dictionary
    """
    print("=== 运行基础测试 | Running Basic Tests ===")
    print()

    # 1. 测试矩阵配置
    matrix = KeyMatrix(config)
    print(f"[PASS] 矩阵初始化 | Matrix init: {matrix.rows}x{matrix.cols}")

    # 2. 测试 OLED 配置
    oled = OLEDDisplay(config)
    print(f"[PASS] OLED 初始化 | OLED init: {oled.width}x{oled.height}")

    # 3. 测试 RGB 配置
    rgb = RGBLed(config)
    print(f"[PASS] RGB 初始化 | RGB init: {rgb.num_leds} LEDs")

    # 4. 测试编码器配置
    encoder = Encoder(config)
    print(f"[PASS] 编码器初始化 | Encoder init")

    # 5. 测试键位映射
    keymap = config.get("keymap", {}).get("layers", [])
    print(f"[PASS] 键位映射 | Keymap: {len(keymap)} layers loaded")

    print()
    print("所有测试通过！| All tests passed!")


def main():
    """主函数 | Main function"""
    args = parse_args()

    # 设置日志
    logger = setup_logging(verbose=args.verbose)

    # 加载配置
    config_path = Path(args.config)
    if not config_path.exists():
        # 尝试加载模板
        template_path = Path("config.template.yaml")
        if template_path.exists():
            logger.warning(f"配置文件 {config_path} 不存在，使用模板文件")
            config_path = template_path
        else:
            logger.error(f"找不到配置文件: {config_path}")
            print(f"错误 | Error: 找不到配置文件 {config_path}")
            print("请复制 config.template.yaml 为 config.yaml 并修改配置")
            sys.exit(1)

    config = load_config(config_path)
    logger.info(f"已加载配置文件: {config_path}")

    # 根据 action 执行对应操作
    if args.action == "info":
        show_keyboard_info(config)
    elif args.action == "test":
        run_basic_test(config)
    elif args.action == "monitor":
        print("监控模式 | Monitor mode")
        print("注意：此功能需要连接实际键盘硬件")
        print("请使用 QMK 控制台: qmk console")
        # 实际串口监控功能需要 pyserial
        try:
            from serial import Serial
            port = config.get("test", {}).get("serial_port", "COM3")
            baud = config.get("test", {}).get("baud_rate", 115200)
            print(f"尝试连接串口 {port} @ {baud}...")
            with Serial(port, baud, timeout=1) as ser:
                print("已连接！按 Ctrl+C 退出")
                while True:
                    line = ser.readline().decode("utf-8", errors="ignore").strip()
                    if line:
                        print(f"[QMK] {line}")
        except ImportError:
            print("错误：需要安装 pyserial | Error: pyserial required")
            print("运行: pip install pyserial")
        except Exception as e:
            print(f"串口连接失败 | Serial connection failed: {e}")


if __name__ == "__main__":
    main()
