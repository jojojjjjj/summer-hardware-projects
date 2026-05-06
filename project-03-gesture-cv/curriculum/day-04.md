# Day 4: 图像滤波与边缘检测 | Image Filtering and Edge Detection

> **今日目标:** 学习图像滤波、边缘检测，为特征提取打基础
>
> **Today's Goal:** Learn image filtering and edge detection, foundation for feature extraction

---

## 学习目标 | Learning Objectives

完成今天的学习后，你将能够:
- ✅ 理解图像滤波的原理和应用
- ✅ 应用高斯模糊、中值滤波等滤波器
- ✅ 实现Canny边缘检测
- ✅ 理解边缘在计算机视觉中的重要性

> After completing today's lesson, you will be able to:
> - ✅ Understand the principles and applications of image filtering
> - ✅ Apply Gaussian blur, median filter, etc.
> - ✅ Implement Canny edge detection
> - ✅ Understand the importance of edges in computer vision

---

## 为什么学这个？| Why Learn This?

### 滤波是图像预处理的核心
> 滤波可以去除噪声、平滑图像、增强特征。就像给照片"磨皮"一样，是所有高级CV算法的预处理步骤。

### 边缘是图像的"骨架"
> 边缘包含了图像的主要信息。人类识别物体主要靠边缘轮廓，计算机也一样。

### 手势识别的基础
> 手指的轮廓、手掌的边缘都是通过边缘检测提取的。

---

## 任务一: 图像滤波 | Task 1: Image Filtering (40分钟)

### 4.1 滤波原理（10分钟）

**什么是滤波？**
- 滤波 = 对图像的每个像素及其邻域应用数学运算
- 卷积核（Kernel） = 定义运算规则的矩阵

**常见滤波类型:**
- **平滑滤波:** 去除噪声、模糊图像
- **锐化滤波:** 增强边缘
- **边缘检测:** 找出图像边界

### 4.2 实现各种滤波器（30分钟）

```python
import cv2
import numpy as np

def filtering_demo():
    """
    图像滤波演示
    Image filtering demonstration
    """
    # 读取图像并添加噪声
    img = cv2.imread('test_image.jpg')
    if img is None:
        # 创建测试图像
        img = np.zeros((300, 300, 3), dtype=np.uint8)
        cv2.rectangle(img, (50, 50), (250, 250), (255, 255, 255), -1)
    
    # 添加噪声
    noise = np.random.normal(0, 25, img.shape).astype(np.uint8)
    noisy_img = cv2.add(img, noise)
    
    # 1. 高斯模糊 (Gaussian Blur)
    gaussian = cv2.GaussianBlur(noisy_img, (5, 5), 0)
    
    # 2. 中值滤波 (Median Filter) - 对椒盐噪声效果好
    median = cv2.medianBlur(noisy_img, 5)
    
    # 3. 双边滤波 (Bilateral Filter) - 保边去噪
    bilateral = cv2.bilateralFilter(noisy_img, 9, 75, 75)
    
    # 4. 均值模糊 (Average Blur)
    average = cv2.blur(noisy_img, (5, 5))
    
    # 显示结果
    cv2.imshow('Original', img)
    cv2.imshow('Noisy', noisy_img)
    cv2.imshow('Gaussian Blur', gaussian)
    cv2.imshow('Median Filter', median)
    cv2.imshow('Bilateral Filter', bilateral)
    
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    filtering_demo()
```

---

## 任务二: 边缘检测 | Task 2: Edge Detection (40分钟)

### 4.3 边缘检测原理（10分钟）

**什么是边缘？**
- 边缘 = 图像中亮度剧烈变化的位置
- 梯度 = 亮度变化的速率

**边缘检测步骤:**
1. 去噪（高斯滤波）
2. 计算梯度（Sobel算子）
3. 非极大值抑制
4. 双阈值检测

### 4.4 Canny边缘检测（30分钟）

```python
import cv2

def edge_detection_demo():
    """
    边缘检测演示
    Edge detection demonstration
    """
    cap = cv2.VideoCapture(0)
    
    print("Canny边缘检测参数调整")
    print("按 '+' / '-' 调整阈值1")
    print("按 '[' / ']' 调整阈值2")
    print("按 's' 切换显示模式")
    print("按 'q' 退出")
    
    threshold1 = 100
    threshold2 = 200
    show_mode = 0  # 0: 边缘, 1: 原图, 2: 并排
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 应用高斯模糊（预处理）
        blurred = cv2.GaussianBlur(frame, (5, 5), 0)
        
        # 转换为灰度图
        gray = cv2.cvtColor(blurred, cv2.COLOR_BGR2GRAY)
        
        # Canny边缘检测
        edges = cv2.Canny(gray, threshold1, threshold2)
        
        # 转换回BGR以便显示
        edges_bgr = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
        
        # 根据模式显示
        if show_mode == 0:
            display = edges_bgr
            mode_text = "Edges Only"
        elif show_mode == 1:
            display = frame
            mode_text = "Original"
        else:
            # 并排显示
            display = np.hstack((frame, edges_bgr))
            mode_text = "Side by Side"
        
        # 显示参数
        info_text = f"Threshold1: {threshold1}, Threshold2: {threshold2}"
        cv2.putText(display, info_text, (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
        cv2.putText(display, f"Mode: {mode_text}", (10, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
        
        cv2.imshow('Edge Detection', display)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('+') or key == ord('='):
            threshold1 = min(255, threshold1 + 10)
        elif key == ord('-') or key == ord('_'):
            threshold1 = max(0, threshold1 - 10)
        elif key == ord(']') or key == ord('}'):
            threshold2 = min(255, threshold2 + 10)
        elif key == ord('[') or key == ord('{'):
            threshold2 = max(0, threshold2 - 10)
        elif key == ord('s'):
            show_mode = (show_mode + 1) % 3
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    edge_detection_demo()
```

---

## 任务三: 实时轮廓检测 | Task 3: Real-time Contour Detection (30分钟)

```python
import cv2
import numpy as np

def contour_detection():
    """
    轮廓检测
    Contour detection
    """
    cap = cv2.VideoCapture(0)
    
    print("实时轮廓检测")
    print("按 'c' 切换轮廓颜色")
    print("按 'f' 填充/不填充轮廓")
    print("按 'q' 退出")
    
    contour_color_idx = 0
    fill_contours = False
    colors = [(0, 255, 0), (255, 0, 0), (0, 0, 255), (0, 255, 255)]
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 预处理
        blurred = cv2.GaussianBlur(frame, (5, 5), 0)
        gray = cv2.cvtColor(blurred, cv2.COLOR_BGR2GRAY)
        
        # 边缘检测
        edges = cv2.Canny(gray, 50, 150)
        
        # 查找轮廓
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # 绘制轮廓
        result = frame.copy()
        contour_color = colors[contour_color_idx]
        
        for contour in contours:
            # 过滤小轮廓
            area = cv2.contourArea(contour)
            if area > 500:
                if fill_contours:
                    cv2.drawContours(result, [contour], -1, contour_color, -1)
                else:
                    cv2.drawContours(result, [contour], -1, contour_color, 2)
                
                # 显示轮廓面积
                M = cv2.moments(contour)
                if M["m00"] != 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])
                    cv2.putText(result, f"{int(area)}", (cx, cy),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        # 显示信息
        cv2.putText(result, f"Contours: {len(contours)}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        cv2.imshow('Contour Detection', result)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('c'):
            contour_color_idx = (contour_color_idx + 1) % len(colors)
        elif key == ord('f'):
            fill_contours = not fill_contours
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    contour_detection()
```

---

## 今日作业 | Today's Assignment

### 基础作业（必做）
1. ✅ 实现高斯模糊和中值滤波
2. ✅ 调节Canny边缘检测的参数，观察效果
3. ✅ 检测并绘制图像中的所有轮廓

### 进阶作业（选做）
1. 创建一个"边缘检测画板"——只显示手部边缘
2. 实现轮廓的形状分类（圆形、方形等）

### 挑战作业
1. 使用轮廓检测实现简单的物体计数器

---

## 明日预告 | Tomorrow's Preview

**Day 5: 颜色空间与对象追踪**
- 学习HSV颜色空间
- 实现颜色对象追踪
- 制作第一个交互Demo

---

**恭喜完成Day 4！** 你已经掌握了图像特征提取的基础。明天我们将添加色彩！

> **Congratulations on completing Day 4!** You've mastered feature extraction basics. Tomorrow we'll add color!
