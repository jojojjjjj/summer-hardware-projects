"""
手部追踪模块 | Hand Tracking Module

基于MediaPipe的手部关键点检测。
Hand landmark detection based on MediaPipe.
"""

import mediapipe as mp
import numpy as np


class HandTracker:
    """手部追踪类 | Hand Tracking Class"""

    def __init__(self, config):
        """初始化MediaPipe手部检测 | Initialize MediaPipe hand detection"""
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=config.get('max_num_hands', 2),
            min_detection_confidence=config.get('min_detection_confidence', 0.7),
            min_tracking_confidence=config.get('min_tracking_confidence', 0.5),
            model_complexity=config.get('model_complexity', 1)
        )

    def track(self, frame):
        """
        追踪手部关键点
        Track hand landmarks
        """
        # 转换为RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) if 'cv2' in globals() else frame

        # 处理
        results = self.hands.process(rgb_frame)

        return results

    def close(self):
        """关闭追踪器 | Close tracker"""
        self.hands.close()
