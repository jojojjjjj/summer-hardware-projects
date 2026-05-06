# Day 11: 姿态检测与扩展 | Pose Detection and Extensions

> **今日目标:** 了解MediaPipe Pose，探索全身姿态交互
>
> **Today's Goal:** Learn MediaPipe Pose, explore full-body interaction

---

## 学习目标

完成今天的学习后，你将能够:
- ✅ 理解MediaPipe Pose的33个身体关键点
- ✅ 检测基本姿态（站立、举手、蹲下）
- ✅ 创建简单的姿态互动

---

## 核心代码：姿态检测演示

```python
import cv2
import mediapipe as mp

def pose_detection_demo():
    """姿态检测演示"""
    mp_pose = mp.solutions.pose
    mp_draw = mp.solutions.drawing_utils
    
    pose = mp_pose.Pose(
        static_image_mode=False,
        model_complexity=1,
        smooth_landmarks=True,
        enable_segmentation=False,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    )
    
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_frame)
        
        if results.pose_landmarks:
            mp_draw.draw_landmarks(
                frame,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS
            )
        
        cv2.imshow('Pose Detection', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    pose_detection_demo()
```

---

## 今日作业

1. ✅ 运行姿态检测Demo
2. ✅ 检测并显示"举手"姿态

---

## 明日预告

**Day 12: 创意项目深化**

---

**恭喜完成Day 11！** 你已经了解了全身姿态检测的潜力！
