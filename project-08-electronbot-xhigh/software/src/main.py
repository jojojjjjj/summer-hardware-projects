"""
ElectronBot 进阶桌宠机器人 PC 端主程序
ElectronBot Advanced Desktop Pet PC Main Program

功能：
1. 加载 YAML 配置文件
2. 初始化 USB 桥接通信
3. 启动表情动画引擎
4. 启动舵机控制器
5. 运行主事件循环
6. 支持多种运行模式（交互、演示、校准）

Features:
1. Load YAML configuration file
2. Initialize USB bridge communication
3. Start expression animation engine
4. Start servo controller
5. Run main event loop
6. Support multiple run modes (interactive, demo, calibration)
"""

import sys
import os
import time
import argparse
import signal
import logging

# 添加当前目录到路径 | Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from usb_bridge import USBBridge
from servo_controller import ServoController
from expression_engine import ExpressionEngine
from utils import load_config, setup_logging


def parse_args():
    """
    解析命令行参数
    Parse command-line arguments

    Returns:
        argparse.Namespace: 解析后的参数
    """
    parser = argparse.ArgumentParser(
        description='ElectronBot 进阶桌宠机器人 | ElectronBot Advanced Desktop Pet'
    )
    parser.add_argument(
        '-m', '--mode',
        choices=['interactive', 'demo', 'calibration'],
        default='interactive',
        help='运行模式 | Run mode: interactive, demo, calibration'
    )
    parser.add_argument(
        '-c', '--config',
        default=None,
        help='配置文件路径 | Config file path (default: auto-detect)'
    )
    parser.add_argument(
        '-v', '--verbose',
        action='store_true',
        help='启用详细日志 | Enable verbose logging'
    )
    return parser.parse_args()


def run_interactive_mode(bridge, servo_ctrl, expression_engine, config, logger):
    """
    交互模式：监听用户输入和传感器事件
    Interactive mode: listen for user input and sensor events

    Args:
        bridge: USBBridge 实例
        servo_ctrl: ServoController 实例
        expression_engine: ExpressionEngine 实例
        config: 配置字典
        logger: Logger 实例
    """
    logger.info("进入交互模式 | Entering interactive mode")
    print("=" * 50)
    print("ElectronBot 交互控制台 | Interactive Console")
    print("=" * 50)
    print("命令列表 | Commands:")
    print("  expr <name>  - 播放表情 | Play expression")
    print("  servo <id> <angle> - 设置舵机角度 | Set servo angle")
    print("  demo - 播放演示序列 | Play demo sequence")
    print("  stop - 紧急停止 | Emergency stop")
    print("  quit - 退出程序 | Quit")
    print("=" * 50)

    expression_engine.play_expression("happy")

    try:
        while True:
            try:
                cmd = input("electronbot> ").strip()
            except EOFError:
                break

            if not cmd:
                continue

            parts = cmd.split()
            action = parts[0].lower()

            if action == 'quit' or action == 'exit':
                break
            elif action == 'expr' and len(parts) >= 2:
                name = parts[1]
                expression_engine.play_expression(name)
                logger.info(f"播放表情 | Playing expression: {name}")
            elif action == 'servo' and len(parts) >= 3:
                try:
                    servo_id = int(parts[1])
                    angle = float(parts[2])
                    servo_ctrl.set_angle(servo_id, angle)
                    logger.info(f"设置舵机 | Set servo {servo_id} to {angle} deg")
                except ValueError:
                    print("错误：参数格式不正确 | Error: Invalid parameter format")
            elif action == 'demo':
                run_demo_sequence(servo_ctrl, expression_engine, logger)
            elif action == 'stop':
                servo_ctrl.emergency_stop()
                expression_engine.play_expression("surprised")
                logger.warning("紧急停止 | Emergency stop")
            else:
                print(f"未知命令 | Unknown command: {cmd}")

    except KeyboardInterrupt:
        pass
    finally:
        logger.info("退出交互模式 | Exiting interactive mode")


def run_demo_sequence(servo_ctrl, expression_engine, logger):
    """
    演示序列：展示机器人的各项功能
    Demo sequence: showcase the robot's features

    Args:
        servo_ctrl: ServoController 实例
        expression_engine: ExpressionEngine 实例
        logger: Logger 实例
    """
    logger.info("开始演示序列 | Starting demo sequence")

    # 打招呼 | Greeting
    expression_engine.play_expression("happy")
    servo_ctrl.set_angle(4, 10)  # 身体微倾 | Body slight tilt
    time.sleep(0.5)
    servo_ctrl.set_angle(4, 0)

    # 左右看 | Look around
    expression_engine.play_expression("idle")
    for angle in [-30, 30, -15, 15, 0]:
        servo_ctrl.set_angle(0, angle)  # head_yaw
        time.sleep(0.3)

    # 挥手 | Wave
    expression_engine.play_expression("love")
    for i in range(3):
        servo_ctrl.set_angle(2, 60)  # 左臂抬起 | Left arm up
        time.sleep(0.2)
        servo_ctrl.set_angle(2, 30)
        time.sleep(0.2)
    servo_ctrl.set_angle(2, 0)

    # 回到初始位置 | Return to initial position
    expression_engine.play_expression("idle")
    servo_ctrl.set_all([0, 0, 0, 0, 0, 0])

    logger.info("演示序列完成 | Demo sequence complete")


def run_demo_mode(bridge, servo_ctrl, expression_engine, config, logger):
    """
    演示模式：自动播放预设的演示动作序列
    Demo mode: automatically play preset demo action sequences

    Args:
        bridge: USBBridge 实例
        servo_ctrl: ServoController 实例
        expression_engine: ExpressionEngine 实例
        config: 配置字典
        logger: Logger 实例
    """
    logger.info("进入演示模式 | Entering demo mode")
    print("演示模式启动，按 Ctrl+C 退出 | Demo mode started, Ctrl+C to exit")

    try:
        while True:
            run_demo_sequence(servo_ctrl, expression_engine, logger)
            time.sleep(3)  # 演示间隔 | Demo interval
    except KeyboardInterrupt:
        pass
    finally:
        logger.info("退出演示模式 | Exiting demo mode")


def run_calibration_mode(bridge, servo_ctrl, config, logger):
    """
    校准模式：逐一测试每个舵机的角度范围
    Calibration mode: test angle range for each servo individually

    Args:
        bridge: USBBridge 实例
        servo_ctrl: ServoController 实例
        config: 配置字典
        logger: Logger 实例
    """
    logger.info("进入校准模式 | Entering calibration mode")
    print("=" * 50)
    print("舵机校准工具 | Servo Calibration Tool")
    print("=" * 50)

    servo_configs = config.get('servos', [])

    for servo_cfg in servo_configs:
        servo_id = servo_cfg['id']
        name = servo_cfg['name']
        min_angle = servo_cfg['min_angle']
        max_angle = servo_cfg['max_angle']

        print(f"\n--- 舵机 {servo_id}: {name} ---")
        print(f"角度范围 | Angle range: [{min_angle}, {max_angle}]")
        print("按 Enter 开始校准，输入 skip 跳过 | Press Enter to start, type skip to skip")

        cmd = input("> ").strip()
        if cmd.lower() == 'skip':
            continue

        # 移动到最小角度 | Move to min angle
        print(f"移动到最小角度 {min_angle}...")
        servo_ctrl.set_angle(servo_id, min_angle)
        time.sleep(1)
        actual_min = input(f"实际最小角度 (默认 {min_angle}) | Actual min angle: ").strip()
        if actual_min:
            servo_cfg['min_angle'] = int(actual_min)

        # 移动到最大角度 | Move to max angle
        print(f"移动到最大角度 {max_angle}...")
        servo_ctrl.set_angle(servo_id, max_angle)
        time.sleep(1)
        actual_max = input(f"实际最大角度 (默认 {max_angle}) | Actual max angle: ").strip()
        if actual_max:
            servo_cfg['max_angle'] = int(actual_max)

        # 回到零位 | Return to zero
        servo_ctrl.set_angle(servo_id, 0)
        time.sleep(0.5)

        # 偏移校准 | Offset calibration
        offset = input(f"偏移值 (默认 {servo_cfg['offset']}) | Offset value: ").strip()
        if offset:
            servo_cfg['offset'] = int(offset)

        print(f"舵机 {servo_id} 校准完成 | Servo {servo_id} calibrated")

    # 保存校准结果 | Save calibration results
    print("\n校准结果 | Calibration Results:")
    for servo_cfg in servo_configs:
        print(f"  Servo {servo_cfg['id']} ({servo_cfg['name']}): "
              f"range=[{servo_cfg['min_angle']}, {servo_cfg['max_angle']}], "
              f"offset={servo_cfg['offset']}")
    print("\n请将校准结果更新到 config.yaml | Update config.yaml with calibration results")

    logger.info("校准完成 | Calibration complete")


def main():
    """主程序入口 | Main program entry point"""
    args = parse_args()

    # 加载配置 | Load configuration
    config = load_config(args.config)

    # 设置日志 | Setup logging
    if args.verbose:
        config.setdefault('logging', {})['level'] = 'DEBUG'
    logger = setup_logging(config.get('logging', {}))

    logger.info("=" * 50)
    logger.info("ElectronBot 进阶桌宠机器人 | ElectronBot Advanced Desktop Pet")
    logger.info("=" * 50)
    logger.info(f"运行模式 | Mode: {args.mode}")

    # 初始化 USB 桥接 | Initialize USB bridge
    usb_cfg = config.get('usb', {})
    bridge = USBBridge(
        port=usb_cfg.get('port', 'COM3'),
        baudrate=usb_cfg.get('baudrate', 115200),
        timeout=usb_cfg.get('timeout', 2),
    )

    # 连接 STM32 | Connect to STM32
    logger.info(f"连接 USB 设备 | Connecting USB device: {usb_cfg.get('port', 'COM3')}")
    if not bridge.connect():
        logger.warning("USB 设备未连接，将以离线模式运行")
        logger.warning("USB device not connected, running in offline mode")

    # 初始化舵机控制器 | Initialize servo controller
    servo_ctrl = ServoController(bridge, config.get('servos', []))

    # 初始化表情引擎 | Initialize expression engine
    expr_cfg = config.get('expressions', {})
    expression_engine = ExpressionEngine(
        bridge=bridge,
        asset_path=expr_cfg.get('path', 'assets/expressions/'),
        default_expression=expr_cfg.get('default_expression', 'idle'),
    )

    # 注册信号处理（Ctrl+C 优雅退出） | Register signal handler for graceful exit
    def signal_handler(sig, frame):
        logger.info("接收到退出信号 | Received exit signal")
        servo_ctrl.emergency_stop()
        bridge.disconnect()
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    try:
        # 根据模式运行 | Run based on mode
        if args.mode == 'interactive':
            run_interactive_mode(bridge, servo_ctrl, expression_engine, config, logger)
        elif args.mode == 'demo':
            run_demo_mode(bridge, servo_ctrl, expression_engine, config, logger)
        elif args.mode == 'calibration':
            run_calibration_mode(bridge, servo_ctrl, config, logger)
    except Exception as e:
        logger.error(f"运行时错误 | Runtime error: {e}")
        raise
    finally:
        # 清理资源 | Cleanup resources
        logger.info("清理资源 | Cleaning up resources")
        servo_ctrl.emergency_stop()
        expression_engine.stop()
        bridge.disconnect()
        logger.info("程序已退出 | Program exited")


if __name__ == '__main__':
    main()
