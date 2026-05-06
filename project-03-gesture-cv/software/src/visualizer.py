"""
可视化模块 | Visualization Module

提供手部关键点和手势的可视化功能。
Provides visualization for hand landmarks and gestures.
"""

import cv2
import mediapipe as mp


class Visualizer:
    """可视化类 | Visualizer Class"""

    def __init__(self, config):
        """初始化可视化器 | Initialize visualizer"""
        self.show_landmarks = config.get('show_landmarks', True)
        self.show_connections = config.get('show_connections', True)
        self.show_fps = config.get('show_fps', True)
        self.mirror = config.get('mirror', True)

        self.mp_hands = mp.solutions.hands
        self.mp_draw = mp.solutions.drawing_utils
        self.display_mode = 0  # 0: 正常, 1: 仅关键点, 2: 仅手势

    def draw(self, frame, hand_results, gestures):
        """绘制可视化内容 | Draw visualizations"""
        if self.mirror:
            frame = cv2.flip(frame, 1)

        # 绘制手部关键点
        if hand_results.multi_hand_landmarks and self.show_landmarks:
            for hand_landmarks in hand_results.multi_hand_landmarks:
                if self.show_connections:
                    self.mp_draw.draw_landmarks(
                        frame, hand_landmarks,
                        self.mp_hands.HAND_CONNECTIONS
                    )
                else:
                    self.mp_draw.draw_landmarks(
                        frame, hand_landmarks
                    )

        # 绘制手势标签
        for i, gesture in enumerate(gestures):
            cv2.putText(frame, gesture, (50 + i * 200, 50),
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        return frame

    def show(self, frame):
        """显示帧 | Show frame"""
        cv2.imshow('Gesture Control', frame)

    def wait_key(self, delay):
        """等待按键 | Wait for key press"""
        return cv2.waitKey(delay) & 0xFF

    def toggle_mode(self):
        """切换显示模式 | Toggle display mode"""
        self.display_mode = (self.display_mode + 1) % 3

    def cleanup(self):
        """清理窗口 | Cleanup windows"""
        cv2.destroyAllWindows()
