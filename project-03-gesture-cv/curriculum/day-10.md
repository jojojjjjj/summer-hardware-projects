# Day 10: 手势控制——虚拟画板 | Gesture Control: Virtual Canvas

> **今日目标:** 实现手指在空中绘画的功能
>
> **Today's Goal:** Implement air drawing with finger tracking

---

## 学习目标

完成今天的学习后，你将能够:
- ✅ 实现手指轨迹追踪和绘制
- ✅ 创建虚拟画布状态管理
- ✅ 添加绘画控制手势（切换颜色、清除画布）
- ✅ 保存艺术作品

---

## 核心代码：虚拟画板

```python
import cv2
import mediapipe as mp
import numpy as np
import datetime

class VirtualCanvas:
    """虚拟画板类"""
    
    def __init__(self, width=1280, height=720):
        self.width = width
        self.height = height
        self.canvas = np.zeros((height, width, 3), dtype=np.uint8)
        self.drawing = False
        self.brush_color = (0, 255, 0)
        self.brush_size = 5
        self.prev_point = None
        
        # 颜色调色板
        self.colors = [
            (0, 255, 0),    # 绿色
            (255, 0, 0),    # 蓝色
            (0, 0, 255),    # 红色
            (255, 255, 0),  # 青色
            (255, 0, 255),  # 洋红
            (0, 255, 255),  # 黄色
            (255, 255, 255) # 白色
        ]
        self.color_idx = 0
    
    def start_drawing(self):
        """开始绘画"""
        self.drawing = True
    
    def stop_drawing(self):
        """停止绘画"""
        self.drawing = False
        self.prev_point = None
    
    def draw(self, point):
        """在画布上绘制"""
        if self.drawing and self.prev_point is not None:
            cv2.line(self.canvas, self.prev_point, point,
                    self.brush_color, self.brush_size)
        self.prev_point = point
    
    def clear(self):
        """清除画布"""
        self.canvas = np.zeros((self.height, self.width, 3), dtype=np.uint8)
        self.prev_point = None
    
    def change_color(self):
        """切换画笔颜色"""
        self.color_idx = (self.color_idx + 1) % len(self.colors)
        self.brush_color = self.colors[self.color_idx]
        return self.brush_color
    
    def change_brush_size(self, delta):
        """改变画笔大小"""
        self.brush_size = max(1, min(50, self.brush_size + delta))
    
    def save(self):
        """保存画布"""
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"artwork_{timestamp}.png"
        cv2.imwrite(filename, self.canvas)
        return filename
    
    def get_overlay(self, frame, alpha=0.5):
        """将画布叠加到视频帧上"""
        return cv2.addWeighted(frame, 1 - alpha, self.canvas, alpha, 0)


def detect_drawing_gesture(landmarks):
    """
    检测绘画手势（只有食指伸直）
    Detect drawing gesture (only index finger extended)
    """
    lm = landmarks
    return (
        lm[8].y < lm[6].y and     # 食指伸直
        lm[12].y > lm[10].y and   # 中指弯曲
        lm[16].y > lm[14].y and   # 无名指弯曲
        lm[20].y > lm[18].y       # 小指弯曲
    )


def detect_fist_gesture(landmarks):
    """检测握拳手势"""
    lm = landmarks
    return (
        lm[8].y > lm[6].y and
        lm[12].y > lm[10].y and
        lm[16].y > lm[14].y and
        lm[20].y > lm[18].y
    )


def detect_open_palm_gesture(landmarks):
    """检测张开手掌手势（清除画布）"""
    lm = landmarks
    return (
        lm[8].y < lm[6].y and
        lm[12].y < lm[10].y and
        lm[16].y < lm[14].y and
        lm[20].y < lm[18].y
    )


def main():
    """主程序"""
    # 初始化
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(
        max_num_hands=1,
        min_detection_confidence=0.7,
        min_tracking_confidence=0.5
    )
    
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    h, w = frame.shape[:2]
    
    canvas = VirtualCanvas(w, h)
    
    # 手势状态跟踪
    was_fist = False
    was_open_palm = False
    gesture_debounce = 0.5  # 防抖时间（秒）
    last_gesture_time = 0
    
    print("虚拟画板 | Virtual Canvas")
    print("食指伸直: 绘画 | Index finger: Draw")
    print("握拳: 切换颜色 | Fist: Change color")
    print("张开手掌: 清除画布 | Open palm: Clear canvas")
    print("按 's' 保存 | Press 's' to save")
    print("按 '+' / '-' 调整画笔大小 | Adjust brush size")
    print("按 'q' 退出 | Press 'q' to quit")
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)
        
        current_time = datetime.datetime.now().timestamp()
        
        if results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]
            lm = hand_landmarks.landmark
            
            # 获取食指指尖位置
            index_tip = (int(lm[8].x * w), int(lm[8].y * h))
            
            # 检测握拳（切换颜色）
            if detect_fist_gesture(lm):
                if not was_fist and (current_time - last_gesture_time) > gesture_debounce:
                    new_color = canvas.change_color()
                    print(f"颜色切换 | Color changed to RGB{new_color}")
                    last_gesture_time = current_time
                was_fist = True
            else:
                was_fist = False
            
            # 检测张开手掌（清除画布）
            if detect_open_palm_gesture(lm):
                if not was_open_palm and (current_time - last_gesture_time) > gesture_debounce:
                    canvas.clear()
                    print("画布已清除 | Canvas cleared")
                    last_gesture_time = current_time
                was_open_palm = True
            else:
                was_open_palm = False
            
            # 检测绘画手势
            if detect_drawing_gesture(lm):
                canvas.start_drawing()
                canvas.draw(index_tip)
            else:
                canvas.stop_drawing()
            
            # 绘制食指指尖追踪点
            cv2.circle(frame, index_tip, 8, canvas.brush_color, -1)
        
        # 合并画布和视频帧
        display = canvas.get_overlay(frame, alpha=0.7)
        
        # 绘制UI
        # 当前颜色指示器
        cv2.circle(display, (30, 30), 20, canvas.brush_color, -1)
        cv2.circle(display, (30, 30), 20, (255, 255, 255), 2)
        
        # 画笔大小
        cv2.putText(display, f"Brush: {canvas.brush_size}", (60, 35),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
        
        # 操作提示
        cv2.putText(display, "Point: Draw | Fist: Color | Palm: Clear", (10, h - 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200, 200, 200), 1)
        cv2.putText(display, "S: Save | Q: Quit", (10, h - 10),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1)
        
        cv2.imshow('Virtual Canvas', display)
        
        # 键盘控制
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('s'):
            filename = canvas.save()
            print(f"画布已保存 | Canvas saved: {filename}")
            # 显示保存提示
            cv2.putText(display, "Saved!", (w//2 - 50, h//2),
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            cv2.imshow('Virtual Canvas', display)
            cv2.waitKey(1000)
        elif key == ord('+') or key == ord('='):
            canvas.change_brush_size(2)
            print(f"画笔大小: {canvas.brush_size}")
        elif key == ord('-') or key == ord('_'):
            canvas.change_brush_size(-2)
            print(f"画笔大小: {canvas.brush_size}")
    
    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
```

---

## 今日作业

### 基础作业（必做）
1. ✅ 实现虚拟画板
2. ✅ 添加颜色切换功能
3. ✅ 实现保存画布功能

### 进阶作业（选做）
1. 添加橡皮擦功能
2. 实现撤销/重做功能

### 挑战作业
1. 创建多图层支持

---

## 明日预告

**Day 11: 姿态检测与扩展**

---

**恭喜完成Day 10！** 你已经创建了一个创意绘画工具！
