"""
手势互动装置 - 主程序
Gesture Interactive Installation - Main Entry Point

这是一个实时手势识别和控制系统的主入口点。
This is the main entry point for a real-time gesture recognition and control system.
"""

import cv2
import sys
import argparse
from pathlib import Path

# 添加项目根目录到Python路径
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from camera import Camera
from hand_tracker import HandTracker
from gesture_recognizer import GestureRecognizer
from visualizer import Visualizer
from utils import load_config


class GestureApp:
    """手势控制应用主类 | Gesture Control Application Main Class"""

    def __init__(self, config_path=None):
        """
        初始化应用
        Initialize the application
        """
        # 加载配置
        self.config = load_config(config_path)

        # 初始化组件
        self.camera = Camera(self.config['camera'])
        self.tracker = HandTracker(self.config['mediapipe'])
        self.recognizer = GestureRecognizer(self.config['gestures'])
        self.visualizer = Visualizer(self.config['display'])

        # 运行标志
        self.running = False

    def run(self):
        """运行主循环 | Run the main loop"""
        self.running = True

        print("手势互动装置已启动 | Gesture Interactive Installation Started")
        print("按 'q' 退出 | Press 'q' to quit")
        print("按 's' 切换显示模式 | Press 's' to toggle display mode")

        while self.running:
            # 获取帧
            ret, frame = self.camera.read()
            if not ret:
                print("无法获取帧 | Cannot capture frame")
                break

            # 处理帧
            processed_frame = self.process_frame(frame)

            # 显示
            self.visualizer.show(processed_frame)

            # 处理按键
            if self.visualizer.wait_key(1) == ord('q'):
                self.running = False
            elif self.visualizer.wait_key(1) == ord('s'):
                self.visualizer.toggle_mode()

        self.cleanup()

    def process_frame(self, frame):
        """
        处理单帧图像
        Process a single frame
        """
        # 追踪手部
        hand_results = self.tracker.track(frame)

        # 识别手势
        gestures = []
        if hand_results.multi_hand_landmarks:
            for hand_landmarks in hand_results.multi_hand_landmarks:
                gesture = self.recognizer.recognize(hand_landmarks)
                gestures.append(gesture)

        # 可视化
        display_frame = self.visualizer.draw(frame, hand_results, gestures)

        return display_frame

    def cleanup(self):
        """清理资源 | Cleanup resources"""
        self.camera.release()
        self.visualizer.cleanup()
        print("应用已退出 | Application exited")


def main():
    """主函数 | Main function"""
    parser = argparse.ArgumentParser(description='手势互动装置 | Gesture Interactive Installation')
    parser.add_argument('--config', type=str, help='配置文件路径 | Configuration file path')
    parser.add_argument('--camera', type=int, default=0, help='摄像头ID | Camera device ID')

    args = parser.parse_args()

    try:
        app = GestureApp(config_path=args.config)
        app.run()
    except KeyboardInterrupt:
        print("\n程序被用户中断 | Program interrupted by user")
    except Exception as e:
        print(f"错误 | Error: {e}")
        raise


if __name__ == "__main__":
    main()
