# Day 7: 手部关键点分析 | Hand Landmark Analysis

> **今日目标:** 深入理解21个手部关键点，学习坐标系统和几何计算
>
> **Today's Goal:** Deeply understand 21 hand landmarks, learn coordinate systems and geometric calculations

---

## 学习目标 | Learning Objectives

完成今天的学习后，你将能够:
- ✅ 说出每个关键点的名称和位置
- ✅ 计算关键点之间的距离
- ✅ 计算手指的弯曲程度
- ✅ 检测手的状态（张开/握拳）

---

## 为什么学这个？| Why Learn This?

### 关键点是手势的"原子"
> 所有的手势（握拳、张开、比V）都可以分解为关键点的相对位置关系。

### 几何计算是算法核心
> 手势识别本质上是在计算关键点之间的距离、角度、面积等几何特征。

---

## 任务一: 关键点坐标分析 | Task 1: Landmark Coordinate Analysis (40分钟)

```python
import cv2
import mediapipe as mp
import numpy as np

def analyze_landmarks():
    """
    分析手部关键点坐标
    Analyze hand landmark coordinates
    """
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1)
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame = cv2.flip(frame, 1)
        h, w, c = frame.shape
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)
        
        if results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]
            
            # 获取关键点
            wrist = hand_landmarks.landmark[0]
            thumb_tip = hand_landmarks.landmark[4]
            index_tip = hand_landmarks.landmark[8]
            middle_tip = hand_landmarks.landmark[12]
            ring_tip = hand_landmarks.landmark[16]
            pinky_tip = hand_landmarks.landmark[20]
            
            # 计算指尖像素坐标
            thumb_px = (int(thumb_tip.x * w), int(thumb_tip.y * h))
            index_px = (int(index_tip.x * w), int(index_tip.y * h))
            
            # 计算拇指和食指的距离
            distance = np.sqrt((thumb_tip.x - index_tip.x)**2 + 
                             (thumb_tip.y - index_tip.y)**2)
            
            # 绘制指尖
            for tip in [thumb_tip, index_tip, middle_tip, ring_tip, pinky_tip]:
                cx, cy = int(tip.x * w), int(tip.y * h)
                cv2.circle(frame, (cx, cy), 8, (0, 255, 0), -1)
            
            # 绘制拇指-食指连线
            cv2.line(frame, thumb_px, index_px, (255, 0, 0), 2)
            
            # 显示距离
            cv2.putText(frame, f"Distance: {distance:.3f}", (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        cv2.imshow('Landmark Analysis', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    analyze_landmarks()
```

---

## 任务二: 手指状态检测 | Task 2: Finger State Detection (40分钟)

```python
import cv2
import mediapipe as mp

def detect_finger_states():
    """
    检测每根手指的状态（伸直/弯曲）
    Detect state of each finger (extended/curved)
    """
    mp_hands = mp.solutions.hands
    mp_draw = mp.solutions.drawing_utils
    hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1)
    cap = cv2.VideoCapture(0)
    
    def is_finger_extended(landmarks, finger_tip_idx, finger_pip_idx):
        """判断手指是否伸直"""
        tip = landmarks[finger_tip_idx]
        pip = landmarks[finger_pip_idx]
        # 如果指尖的y坐标小于PIP关节的y坐标（且在屏幕上方），则伸直
        return tip.y < pip.y
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame = cv2.flip(frame, 1)
        h, w, c = frame.shape
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)
        
        if results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]
            lm = hand_landmarks.landmark
            
            # 检测每根手指状态
            thumb_extended = lm[4].x < lm[3].x  # 拇指特殊处理
            index_extended = lm[8].y < lm[6].y
            middle_extended = lm[12].y < lm[10].y
            ring_extended = lm[16].y < lm[14].y
            pinky_extended = lm[20].y < lm[18].y
            
            finger_states = [thumb_extended, index_extended, 
                           middle_extended, ring_extended, pinky_extended]
            finger_names = ["Thumb", "Index", "Middle", "Ring", "Pinky"]
            
            # 显示状态
            for i, (name, state) in enumerate(zip(finger_names, finger_states)):
                status = "✓" if state else "✗"
                color = (0, 255, 0) if state else (0, 0, 255)
                cv2.putText(frame, f"{name}: {status}", (10, 30 + i*30),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
            
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
        
        cv2.imshow('Finger States', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    detect_finger_states()
```

---

## 任务三: 手势分类器基础 | Task 3: Basic Gesture Classifier (30分钟)

```python
import cv2
import mediapipe as mp

def basic_gesture_classifier():
    """
    基础手势分类器
    Basic gesture classifier
    """
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1)
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)
        
        gesture = "Unknown"
        
        if results.multi_hand_landmarks:
            lm = results.multi_hand_landmarks[0].landmark
            
            # 简单的手势逻辑
            if all(lm[i].y < lm[i-2].y for i in [8, 12, 16, 20]):
                gesture = "Open Hand"
            elif all(lm[i].y > lm[i-2].y for i in [8, 12, 16, 20]):
                gesture = "Fist"
            elif lm[8].y < lm[6].y and lm[12].y < lm[10].y and lm[16].y > lm[14].y:
                gesture = "Victory"
        
        cv2.putText(frame, f"Gesture: {gesture}", (10, 50),
                   cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow('Gesture Classifier', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    basic_gesture_classifier()
```

---

## 今日作业

### 基础作业（必做）
1. ✅ 创建一个显示所有关键点坐标的程序
2. ✅ 计算手掌的面积（使用轮廓）
3. ✅ 实现手指状态检测

### 进阶作业（选做）
1. 创建一个手势"进度条"——手指伸直的数量

---

## 明日预告

**Day 8: 手势识别算法**
- 设计完整的手势识别算法
- 实现握拳、张开、比V等手势

---

**恭喜完成Day 7！** 你已经理解了手势识别的核心原理。明天将构建完整的识别系统！
