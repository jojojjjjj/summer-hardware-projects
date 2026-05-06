# Day 8: 手势识别算法 | Gesture Recognition Algorithms

> **今日目标:** 设计并实现完整的手势识别算法
>
> **Today's Goal:** Design and implement complete gesture recognition algorithms

---

## 学习目标 | Learning Objectives

完成今天的学习后，你将能够:
- ✅ 设计手势状态机
- ✅ 实现5种基础手势识别（握拳、张开、比V、OK、竖大拇指）
- ✅ 理解手势识别的鲁棒性问题
- ✅ 添加手势平滑处理

> After completing today's lesson, you will be able to:
> - ✅ Design gesture state machines
> - ✅ Implement 5 basic gesture recognitions
> - ✅ Understand gesture recognition robustness issues
> - ✅ Add gesture smoothing

---

## 为什么学这个？| Why Learn This?

### 算法设计 > API调用
> 真正的工程师不只是调用API，而是理解背后的原理。今天你将设计自己的手势识别算法。

### 鲁棒性是关键
> 手势识别需要在不同光照、角度、距离下都稳定工作。

---

## 任务一: 完整手势识别器 | Task 1: Complete Gesture Recognizer (60分钟)

```python
import cv2
import mediapipe as mp
import numpy as np
from collections import deque

class GestureRecognizer:
    """
    手势识别器
    Gesture Recognizer
    """
    
    def __init__(self, smoothing_window=5):
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.7,
            min_tracking_confidence=0.5
        )
        # 用于平滑手势结果
        self.gesture_history = deque(maxlen=smoothing_window)
    
    def recognize(self, hand_landmarks):
        """
        识别手势
        Recognize gesture
        """
        if not hand_landmarks:
            return "No hand detected"
        
        lm = hand_landmarks.landmark
        
        # 计算手指状态
        fingers_state = {
            'thumb': self.is_thumb_extended(lm),
            'index': self.is_finger_extended(lm, 8, 6),
            'middle': self.is_finger_extended(lm, 12, 10),
            'ring': self.is_finger_extended(lm, 16, 14),
            'pinky': self.is_finger_extended(lm, 20, 18)
        }
        
        extended_count = sum(fingers_state.values())
        
        # 手势识别逻辑
        gesture = self.classify_gesture(fingers_state, extended_count, lm)
        
        # 平滑处理
        self.gesture_history.append(gesture)
        smoothed_gesture = self.get_smoothed_gesture()
        
        return smoothed_gesture
    
    def classify_gesture(self, fingers, count, lm):
        """根据手指状态分类手势"""
        thumb, index, middle, ring, pinky = fingers.values()
        
        # 握拳 - 所有手指弯曲
        if count == 0:
            return "Fist"
        
        # 张开 - 所有手指伸直
        elif count == 5:
            return "Open Hand"
        
        # 比V - 只有食指和中指伸直
        elif index and middle and not ring and not pinky:
            # 进一步验证：检查食指和中指是否分开
            distance = np.sqrt((lm[8].x - lm[12].x)**2 + (lm[8].y - lm[12].y)**2)
            if distance > 0.05:  # 阈值
                return "Victory"
        
        # OK手势 - 拇指和食指形成圆圈
        elif thumb and index:
            thumb_index_dist = np.sqrt((lm[4].x - lm[8].x)**2 + (lm[4].y - lm[8].y)**2)
            if thumb_index_dist < 0.05:
                return "OK"
        
        # 竖大拇指 - 只有拇指伸直
        elif thumb and not any([index, middle, ring, pinky]):
            return "Thumbs Up"
        
        # 指向 - 只有食指伸直
        elif index and not any([thumb, middle, ring, pinky]):
            return "Pointing"
        
        # 三 - 食指、中指、无名指伸直
        elif index and middle and ring and not pinky:
            return "Three"
        
        # 其他情况返回伸直手指数量
        else:
            return f"Extended: {count}"
    
    def is_finger_extended(self, lm, tip_idx, pip_idx):
        """判断手指是否伸直"""
        # 比较指尖和PIP关节的Y坐标
        # 注意：这是简化版本，实际需要考虑手的旋转
        return lm[tip_idx].y < lm[pip_idx].y
    
    def is_thumb_extended(self, lm):
        """判断拇指是否伸直"""
        # 拇指需要特殊处理，因为它主要在X轴上移动
        # 检查拇指是否远离手掌
        thumb_tip = lm[4]
        thumb_ip = lm[3]
        
        # 简化判断：如果拇指尖离开拇指IP关节足够远
        distance = np.sqrt((thumb_tip.x - thumb_ip.x)**2 + 
                          (thumb_tip.y - thumb_ip.y)**2)
        return distance > 0.05
    
    def get_smoothed_gesture(self):
        """获取平滑后的手势（投票机制）"""
        if not self.gesture_history:
            return "Unknown"
        
        # 返回出现次数最多的手势
        gesture_counts = {}
        for gesture in self.gesture_history:
            gesture_counts[gesture] = gesture_counts.get(gesture, 0) + 1
        
        return max(gesture_counts, key=gesture_counts.get)


def main():
    """主程序"""
    recognizer = GestureRecognizer()
    cap = cv2.VideoCapture(0)
    
    print("手势识别系统 | Gesture Recognition System")
    print("支持的手势 | Supported gestures:")
    print("  - Fist (握拳)")
    print("  - Open Hand (张开)")
    print("  - Victory (比V)")
    print("  - OK (OK手势)")
    print("  - Thumbs Up (竖大拇指)")
    print("  - Pointing (指向)")
    print("按 'q' 退出 | Press 'q' to quit")
    
    # 统计每种手势的出现次数
    gesture_stats = {}
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 翻转图像（镜像效果）
        frame = cv2.flip(frame, 1)
        h, w = frame.shape[:2]
        
        # 转换为RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # 处理图像
        results = recognizer.hands.process(rgb_frame)
        
        if results.multi_hand_landmarks:
            for idx, hand_landmarks in enumerate(results.multi_hand_landmarks):
                # 识别手势
                gesture = recognizer.recognize(hand_landmarks)
                
                # 更新统计
                gesture_stats[gesture] = gesture_stats.get(gesture, 0) + 1
                
                # 绘制手部关键点
                mp.solutions.drawing_utils.draw_landmarks(
                    frame,
                    hand_landmarks,
                    recognizer.mp_hands.HAND_CONNECTIONS,
                    mp.solutions.drawing_styles.get_default_hand_landmarks_style(),
                    mp.solutions.drawing_styles.get_default_hand_connections_style()
                )
                
                # 获取手掌中心位置
                palm_center = hand_landmarks.landmark[9]
                cx, cy = int(palm_center.x * w), int(palm_center.y * h)
                
                # 显示手势名称（在手掌中心）
                cv2.putText(frame, gesture, (cx - 50, cy - 20),
                           cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                
                # 显示置信度（基于历史）
                if len(recognizer.gesture_history) > 0:
                    confidence = recognizer.gesture_history.count(gesture) / len(recognizer.gesture_history)
                    cv2.putText(frame, f"Conf: {confidence:.2f}", (cx - 50, cy + 20),
                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        # 显示手部数量
        hand_count = len(results.multi_hand_landmarks) if results.multi_hand_landmarks else 0
        cv2.putText(frame, f"Hands: {hand_count}", (10, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # 显示统计信息
        y_offset = 60
        for gesture, count in sorted(gesture_stats.items(), key=lambda x: -x[1])[:3]:
            cv2.putText(frame, f"{gesture}: {count}", (10, y_offset),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
            y_offset += 20
        
        cv2.imshow('Gesture Recognition', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    # 打印最终统计
    print("\n手势统计 | Gesture Statistics:")
    for gesture, count in sorted(gesture_stats.items(), key=lambda x: -x[1]):
        print(f"  {gesture}: {count}")
    
    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
```

---

## 任务二: 手势鲁棒性测试 | Task 2: Gesture Robustness Testing (30分钟)

测试不同条件下的手势识别:
1. 不同光照条件
2. 不同距离（远近）
3. 不同角度（旋转手部）
4. 部分遮挡

记录哪些手势在哪些条件下表现良好或不佳。

---

## 今日作业 | Today's Assignment

### 基础作业（必做）
1. ✅ 实现上述手势识别器
2. ✅ 测试所有6种手势的识别准确率
3. ✅ 记录哪些手势容易混淆

### 进阶作业（选做）
1. 添加手势置信度阈值（低于阈值显示"Uncertain"）
2. 实现手势切换的延迟处理（避免频繁切换）

### 挑战作业
1. 添加自定义手势（如"爱心"、"数字6"）

---

## 明日预告 | Tomorrow's Preview

**Day 9: 手势控制——音量调节器**
- 将手势识别映射到系统控制
- 学习pycaw库控制Windows音量
- 实现平滑的手势控制体验

**预告:** 明天你将用第一个实用功能！

---

## 常见问题 | FAQ

### Q1: 手势识别不稳定怎么办？
**A:** 使用平滑处理（已在代码中实现）和调整置信度阈值

### Q2: 如何添加新手势？
**A:** 在`classify_gesture`函数中添加新的逻辑分支

---

**恭喜完成Day 8！** 你已经构建了完整的手势识别算法。明天将进入实际应用阶段！

> **Congratulations on completing Day 8!** You've built a complete gesture recognition algorithm. Tomorrow we'll enter the application phase!
