"""
虚拟画板演示 | Virtual Canvas Demo

使用手指在空中绘画的演示程序。
Demo program for air drawing with finger tracking.
"""

import cv2
import mediapipe as mp
import numpy as np
import datetime


class VirtualCanvas:
    """虚拟画板 | Virtual Canvas"""

    def __init__(self, width=1280, height=720):
        self.canvas = np.zeros((height, width, 3), dtype=np.uint8)
        self.drawing = False
        self.prev_point = None
        self.color = (0, 255, 0)
        self.brush_size = 5

    def draw(self, point):
        """绘制 | Draw"""
        if self.drawing and self.prev_point is not None:
            cv2.line(self.canvas, self.prev_point, point, self.color, self.brush_size)
        self.prev_point = point

    def clear(self):
        """清除 | Clear"""
        self.canvas.fill(0)
        self.prev_point = None


def main():
    """主函数 | Main function"""
    canvas = VirtualCanvas()
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)

    cap = cv2.VideoCapture(0)

    print("虚拟画板演示 | Virtual Canvas Demo")
    print("食指伸直: 绘画 | Index finger: Draw")
    print("握拳: 切换颜色 | Fist: Change color")
    print("张开手掌: 清除 | Open palm: Clear")
    print("按 'q' 退出 | Press 'q' to quit")

    colors = [(0, 255, 0), (255, 0, 0), (0, 0, 255), (255, 255, 0)]
    color_idx = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        h, w = frame.shape[:2]
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks:
            lm = results.multi_hand_landmarks[0].landmark

            # 获取食指指尖
            index_tip = (int(lm[8].x * w), int(lm[8].y * h))

            # 检测绘画手势（只有食指伸直）
            drawing_gesture = (lm[8].y < lm[6].y and
                              lm[12].y > lm[10].y and
                              lm[16].y > lm[14].y and
                              lm[20].y > lm[18].y)

            if drawing_gesture:
                canvas.drawing = True
                canvas.draw(index_tip)
            else:
                canvas.drawing = False
                canvas.prev_point = None

            # 检测颜色切换（握拳）
            if all(lm[i].y > lm[i-2].y for i in [8, 12, 16, 20]):
                color_idx = (color_idx + 1) % len(colors)
                canvas.color = colors[color_idx]
                time.sleep(0.3)  # 防抖

            # 检测清除（张开手掌）
            if all(lm[i].y < lm[i-2].y for i in [8, 12, 16, 20]):
                canvas.clear()
                time.sleep(0.3)

        # 合并显示
        display = cv2.addWeighted(frame, 0.5, canvas.canvas, 0.5, 0)

        # 显示当前颜色
        cv2.circle(display, (30, 30), 15, canvas.color, -1)
        cv2.putText(display, "Canvas", (50, 35),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

        cv2.imshow('Virtual Canvas', display)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
