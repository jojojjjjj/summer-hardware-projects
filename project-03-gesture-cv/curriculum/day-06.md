# Day 6: MediaPipe 入门 | Introduction to MediaPipe

> **今日目标:** 安装并运行MediaPipe手部追踪，理解21点手部模型
>
> **Today's Goal:** Install and run MediaPipe hand tracking, understand 21-point hand model

---

## 学习目标 | Learning Objectives

完成今天的学习后，你将能够:
- ✅ 理解MediaPipe框架的特点和优势
- ✅ 安装和配置MediaPipe
- ✅ 运行手部检测Demo
- ✅ 理解21个手部关键点的含义

> After completing today's lesson, you will be able to:
> - ✅ Understand the features and advantages of MediaPipe
> - ✅ Install and configure MediaPipe
> - ✅ Run hand detection demo
> - ✅ Understand the meaning of 21 hand landmarks

---

## 为什么学这个？| Why Learn This?

### MediaPipe是现代CV的瑞士军刀
> Google开发的MediaPipe支持面部、手部、姿态、物体检测等多种任务，且在CPU上实时运行。

### 手部追踪是手势识别的基础
> 精确的手部关键点检测是实现复杂手势交互的前提。

### 工业级解决方案
> 从YouTube手势控制到Google Lens，MediaPipe已被广泛使用。

---

## 任务一: MediaPipe安装与测试 | Task 1: Installation and Testing (30分钟)

```python
import mediapipe as mp
import cv2

def test_mediapipe():
    """测试MediaPipe是否正常工作"""
    print(f"MediaPipe version: {mp.__version__}")
    
    # 初始化手部检测
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(
        static_image_mode=False,
        max_num_hands=2,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    )
    
    print("MediaPipe Hands initialized successfully!")
    return hands

if __name__ == "__main__":
    test_mediapipe()
```

---

## 任务二: 第一个手部追踪程序 | Task 2: First Hand Tracking Program (60分钟)

```python
import cv2
import mediapipe as mp

def hand_tracking_demo():
    """
    MediaPipe手部追踪演示
    MediaPipe Hand Tracking Demo
    """
    # 初始化MediaPipe
    mp_hands = mp.solutions.hands
    mp_draw = mp.solutions.drawing_utils
    mp_draw_styles = mp.solutions.drawing_styles
    
    # 创建手部检测器
    hands = mp_hands.Hands(
        static_image_mode=False,
        max_num_hands=2,
        min_detection_confidence=0.7,
        min_tracking_confidence=0.5
    )
    
    # 打开摄像头
    cap = cv2.VideoCapture(0)
    
    print("手部追踪已启动 | Hand tracking started")
    print("按 'q' 退出 | Press 'q' to quit")
    print("按 's' 切换显示模式 | Press 's' to toggle display mode")
    
    show_landmarks = True
    show_connections = True
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # 翻转图像（镜像效果）
        frame = cv2.flip(frame, 1)
        
        # 转换为RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # 处理图像
        results = hands.process(rgb_frame)
        
        # 绘制结果
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                if show_landmarks:
                    mp_draw.draw_landmarks(
                        frame,
                        hand_landmarks,
                        mp_hands.HAND_CONNECTIONS,
                        mp_draw_styles.get_default_hand_landmarks_style(),
                        mp_draw_styles.get_default_hand_connections_style()
                    )
        
        # 显示手部数量
        hand_count = len(results.multi_hand_landmarks) if results.multi_hand_landmarks else 0
        cv2.putText(frame, f"Hands detected: {hand_count}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        cv2.imshow('Hand Tracking', frame)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('s'):
            show_landmarks = not show_landmarks
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    hand_tracking_demo()
```

---

## 任务三: 理解21个关键点 | Task 3: Understanding 21 Landmarks (30分钟)

```python
import cv2
import mediapipe as mp

def landmark_visualization():
    """
    详细显示21个手部关键点
    Display 21 hand landmarks in detail
    """
    mp_hands = mp.solutions.hands
    mp_draw = mp.solutions.drawing_utils
    
    hands = mp_hands.Hands(
        static_image_mode=False,
        max_num_hands=1,
        min_detection_confidence=0.7
    )
    
    cap = cv2.VideoCapture(0)
    
    # 关键点名称
    landmark_names = [
        "WRIST",  # 0
        "THUMB_CMC", "THUMB_MCP", "THUMB_IP", "THUMB_TIP",  # 1-4
        "INDEX_MCP", "INDEX_PIP", "INDEX_DIP", "INDEX_TIP",  # 5-8
        "MIDDLE_MCP", "MIDDLE_PIP", "MIDDLE_DIP", "MIDDLE_TIP",  # 9-12
        "RING_MCP", "RING_PIP", "RING_DIP", "RING_TIP",  # 13-16
        "PINKY_MCP", "PINKY_PIP", "PINKY_DIP", "PINKY_TIP"  # 17-20
    ]
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)
        
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                # 绘制每个关键点并标记编号
                for idx, landmark in enumerate(hand_landmarks.landmark):
                    h, w, c = frame.shape
                    cx, cy = int(landmark.x * w), int(landmark.y * h)
                    
                    # 绘制关键点
                    cv2.circle(frame, (cx, cy), 5, (0, 255, 0), -1)
                    
                    # 显示关键点编号
                    cv2.putText(frame, str(idx), (cx+5, cy-5),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255, 255, 255), 1)
                
                # 绘制连接线
                mp_draw.draw_landmarks(
                    frame, hand_landmarks, mp_hands.HAND_CONNECTIONS
                )
        
        cv2.imshow('Landmark Visualization', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    landmark_visualization()
```

---

## 今日作业 | Today's Assignment

### 基础作业（必做）
1. ✅ 成功运行MediaPipe手部追踪
2. ✅ 标记并记忆关键点0（手腕）和各指尖（4, 8, 12, 16, 20）
3. ✅ 打印出每个关键点的坐标

### 进阶作业（选做）
1. 创建一个手部"骨架"可视化（只显示关键点和连接线，不显示原始图像）
2. 计算手掌中心点的位置

### 挑战作业
1. 检测并区分左手和右手

---

## 明日预告 | Tomorrow's Preview

**Day 7: 手部关键点分析**
- 深入分析21个关键点的坐标含义
- 计算手指之间的距离
- 开始构建手势识别的基础

---

**恭喜完成Day 6！** 你已经进入了现代计算机视觉的世界，这是项目的重要转折点！

> **Congratulations on completing Day 6!** You've entered the world of modern CV, a major turning point in the project!
