"""
手势识别模块 | Gesture Recognition Module

实现手势识别算法。
Implements gesture recognition algorithms.
"""

import numpy as np
from collections import deque


class GestureRecognizer:
    """手势识别器 | Gesture Recognizer"""

    def __init__(self, config):
        """初始化识别器 | Initialize recognizer"""
        self.smoothing_window = config.get('smoothing_window', 5)
        self.gesture_history = deque(maxlen=self.smoothing_window)
        self.thresholds = config.get('thresholds', {})

    def recognize(self, hand_landmarks):
        """
        识别手势
        Recognize gesture
        """
        if not hand_landmarks:
            return "No hand"

        lm = hand_landmarks.landmark

        # 获取手指状态
        fingers = self._get_finger_states(lm)

        # 分类手势
        gesture = self._classify_gesture(fingers, lm)

        # 平滑处理
        self.gesture_history.append(gesture)
        return self._get_smoothed_gesture()

    def _get_finger_states(self, lm):
        """获取每根手指的状态（伸直/弯曲）| Get finger states"""
        return {
            'thumb': self._is_thumb_extended(lm),
            'index': self._is_finger_extended(lm, 8, 6),
            'middle': self._is_finger_extended(lm, 12, 10),
            'ring': self._is_finger_extended(lm, 16, 14),
            'pinky': self._is_finger_extended(lm, 20, 18)
        }

    def _is_finger_extended(self, lm, tip_idx, pip_idx):
        """判断手指是否伸直 | Check if finger is extended"""
        return lm[tip_idx].y < lm[pip_idx].y

    def _is_thumb_extended(self, lm):
        """判断拇指是否伸直 | Check if thumb is extended"""
        return lm[4].x < lm[3].x if lm[4].x < 0.5 else lm[4].x > lm[3].x

    def _classify_gesture(self, fingers, lm):
        """根据手指状态分类手势 | Classify gesture based on finger states"""
        count = sum(fingers.values())

        if count == 0:
            return "Fist"
        elif count == 5:
            return "Open Hand"
        elif fingers['index'] and fingers['middle'] and not fingers['ring']:
            return "Victory"
        elif fingers['thumb'] and fingers['index']:
            return "OK"
        elif fingers['index'] and not any([fingers['middle'], fingers['ring'], fingers['pinky']]):
            return "Pointing"

        return f"Extended: {count}"

    def _get_smoothed_gesture(self):
        """获取平滑后的手势 | Get smoothed gesture"""
        if not self.gesture_history:
            return "Unknown"

        # 投票机制
        counts = {}
        for g in self.gesture_history:
            counts[g] = counts.get(g, 0) + 1

        return max(counts, key=counts.get)
