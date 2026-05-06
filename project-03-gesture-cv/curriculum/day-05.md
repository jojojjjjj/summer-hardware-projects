# Day 5: 颜色空间与对象追踪 | Color Spaces and Object Tracking

> **今日目标:** 学习HSV颜色空间，实现基于颜色的对象追踪
>
> **Today's Goal:** Learn HSV color space, implement color-based object tracking

---

## 学习目标 | Learning Objectives

完成今天的学习后，你将能够:
- ✅ 理解RGB和HSV颜色空间的区别
- ✅ 转换图像颜色空间
- ✅ 定义颜色范围进行对象追踪
- ✅ 实现实时颜色追踪系统

> After completing today's lesson, you will be able to:
> - ✅ Understand the difference between RGB and HSV color spaces
> - ✅ Convert image color spaces
> - ✅ Define color ranges for object tracking
> - ✅ Implement real-time color tracking system

---

## 为什么学这个？| Why Learn This?

### HSV比RGB更适合颜色识别
> RGB将亮度和颜色混合在一起，而HSV将它们分离。这使得HSV在光照变化时更稳定。

### 颜色追踪是第一代CV交互
> 在深度学习普及之前，颜色追踪是实现人机交互的主要方法（如Kinect的某些功能）。

### 手势识别的补充方案
> 当手部追踪失败时，颜色追踪（如戴彩色手套）可以作为备用方案。

---

## 任务一: 理解HSV颜色空间 | Task 1: Understanding HSV (20分钟)

### 5.1 HSV是什么？

**HSV** = Hue（色相）+ Saturation（饱和度）+ Value（明度）

- **Hue (0-180):** 颜色类型（红、橙、黄、绿...）
- **Saturation (0-255):** 颜色纯度
- **Value (0-255):** 亮度

### 5.2 颜色范围示例

```python
# 常见颜色的HSV范围
color_ranges = {
    'red': ([0, 100, 100], [10, 255, 255]),
    'green': ([40, 50, 50], [80, 255, 255]),
    'blue': ([100, 100, 100], [130, 255, 255]),
    'yellow': ([20, 100, 100], [40, 255, 255]),
}
```

---

## 任务二: 颜色追踪系统 | Task 2: Color Tracking System (60分钟)

```python
import cv2
import numpy as np

def color_tracker():
    """
    实时颜色追踪
    Real-time color tracking
    """
    cap = cv2.VideoCapture(0)
    
    print("颜色追踪系统 | Color Tracking System")
    print("按 'r' 记录红色范围 | Record red range")
    print("按 'g' 记录绿色范围 | Record green range")
    print("按 'b' 记录蓝色范围 | Record blue range")
    print("按 'q' 退出 | Quit")
    
    # 默认颜色范围（蓝色）
    lower_color = np.array([100, 100, 100])
    upper_color = np.array([130, 255, 255])
    current_color = "Blue"
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 转换为HSV
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        
        # 创建颜色掩码
        mask = cv2.inRange(hsv, lower_color, upper_color)
        
        # 形态学操作（去除噪声）
        kernel = np.ones((5, 5), np.uint8)
        mask = cv2.erode(mask, kernel, iterations=1)
        mask = cv2.dilate(mask, kernel, iterations=1)
        
        # 查找轮廓
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        result = frame.copy()
        
        if contours:
            # 找到最大轮廓
            max_contour = max(contours, key=cv2.contourArea)
            
            if cv2.contourArea(max_contour) > 500:
                # 绘制轮廓
                x, y, w, h = cv2.boundingRect(max_contour)
                cv2.rectangle(result, (x, y), (x+w, y+h), (0, 255, 0), 2)
                
                # 计算中心点
                M = cv2.moments(max_contour)
                if M["m00"] != 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])
                    cv2.circle(result, (cx, cy), 5, (0, 0, 255), -1)
                    cv2.putText(result, f"Center: ({cx}, {cy})", (cx+10, cy),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        # 显示信息
        cv2.putText(result, f"Tracking: {current_color}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # 并排显示原图和掩码
        mask_bgr = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
        display = np.hstack((result, mask_bgr))
        
        cv2.imshow('Color Tracker', display)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('r'):
            lower_color = np.array([0, 100, 100])
            upper_color = np.array([10, 255, 255])
            current_color = "Red"
        elif key == ord('g'):
            lower_color = np.array([40, 50, 50])
            upper_color = np.array([80, 255, 255])
            current_color = "Green"
        elif key == ord('b'):
            lower_color = np.array([100, 100, 100])
            upper_color = np.array([130, 255, 255])
            current_color = "Blue"
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    color_tracker()
```

---

## 任务三: 交互式颜色选择器 | Task 3: Interactive Color Picker (30分钟)

```python
import cv2
import numpy as np

def interactive_color_picker():
    """
    交互式颜色选择器
    点击画面选择要追踪的颜色
    """
    cap = cv2.VideoCapture(0)
    
    # 颜色范围初始值
    lower_color = np.array([0, 0, 0])
    upper_color = np.array([255, 255, 255])
    
    # 鼠标回调函数
    def pick_color(event, x, y, flags, param):
        nonlocal lower_color, upper_color
        
        if event == cv2.EVENT_LBUTTONDOWN:
            # 获取点击位置的HSV值
            frame_hsv = param
            hsv_value = frame_hsv[y, x]
            
            # 设置颜色范围（±20）
            h, s, v = hsv_value
            lower_color = np.array([max(0, h-20), max(0, s-50), max(0, v-50)])
            upper_color = np.array([min(180, h+20), min(255, s+50), min(255, v+50)])
            
            print(f"Selected HSV: {hsv_value}")
            print(f"Range: {lower_color} - {upper_color}")
    
    cv2.namedWindow('Color Picker')
    cv2.setMouseCallback('Color Picker', pick_color)
    
    print("点击画面选择要追踪的颜色 | Click to select color to track")
    print("按 'q' 退出 | Press 'q' to quit")
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        
        # 创建掩码
        mask = cv2.inRange(hsv, lower_color, upper_color)
        
        # 查找并绘制轮廓
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        result = frame.copy()
        
        if contours:
            max_contour = max(contours, key=cv2.contourArea)
            if cv2.contourArea(max_contour) > 100:
                x, y, w, h = cv2.boundingRect(max_contour)
                cv2.rectangle(result, (x, y), (x+w, y+h), (0, 255, 0), 2)
        
        cv2.imshow('Color Picker', result)
        cv2.imshow('Mask', mask)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    interactive_color_picker()
```

---

## 今日作业 | Today's Assignment

### 基础作业（必做）
1. ✅ 实现红色对象的实时追踪
2. ✅ 显示追踪对象的中心坐标
3. ✅ 添加至少3种颜色的快速切换

### 进阶作业（选做）
1. 创建一个"虚拟画板"——用颜色对象在屏幕上绘画
2. 实现多对象同时追踪

### 挑战作业
1. 用颜色追踪实现一个简单的"空中鼠标"（移动光标）

---

## 明日预告 | Tomorrow's Preview

**Day 6: MediaPipe入门**
- 介绍Google的MediaPipe框架
- 运行第一个手部追踪Demo
- 这将是项目的转折点——从传统CV到深度学习

---

**恭喜完成Day 5！** 你已经完成了传统计算机视觉的基础学习。明天将进入现代CV的世界！

> **Congratulations on completing Day 5!** You've completed traditional CV basics. Tomorrow we enter the world of modern CV!
