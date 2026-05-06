"""
手势音量控制演示 | Gesture Volume Control Demo

使用手势控制电脑音量的演示程序。
Demo program for controlling computer volume with gestures.
"""

import cv2
import mediapipe as mp
import numpy as np
import time

try:
    from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
    from ctypes import cast, POINTER
    from comtypes import CLSCTX_ALL
    HAS_PYCAW = True
except ImportError:
    HAS_PYCAW = False
    print("警告: pycaw未安装，音量控制将被模拟 | Warning: pycaw not installed")


class VolumeController:
    """音量控制器 | Volume Controller"""

    def __init__(self):
        if HAS_PYCAW:
            devices = AudioUtilities.GetSpeakers()
            interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
            self.volume = cast(interface, POINTER(IAudioEndpointVolume))
        else:
            self.volume = None
            self.current = 50

    def set_volume(self, level):
        """设置音量 (0-100) | Set volume (0-100)"""
        level = max(0, min(100, level))
        if HAS_PYCAW:
            # 系统音量范围通常为-65.25到0.0 dB
            min_vol, max_vol, _ = self.volume.GetVolumeRange()
            system_level = min_vol + (level / 100) * (max_vol - min_vol)
            self.volume.SetMasterVolumeLevel(system_level, None)
        else:
            self.current = level


def main():
    """主函数 | Main function"""
    controller = VolumeController()
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)

    cap = cv2.VideoCapture(0)

    print("音量控制演示 | Volume Control Demo")
    print("握拳激活，上下移动控制音量 | Fist to activate, move up/down to control")
    print("按 'q' 退出 | Press 'q' to quit")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        # 绘制音量条
        cv2.rectangle(frame, (50, 100), (350, 130), (100, 100, 100), 2)

        if results.multi_hand_landmarks:
            lm = results.multi_hand_landmarks[0].landmark

            # 检测握拳
            if all(lm[i].y > lm[i-2].y for i in [8, 12, 16, 20]):
                # 根据手掌Y位置计算音量
                volume = int((1 - lm[9].y) * 100)
                volume = max(0, min(100, volume))
                controller.set_volume(volume)

                # 绘制音量条
                cv2.rectangle(frame, (50, 100), (50 + volume * 3, 130), (0, 255, 0), -1)
                cv2.putText(frame, "Volume Control Active", (50, 80),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

        cv2.imshow('Volume Control', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
