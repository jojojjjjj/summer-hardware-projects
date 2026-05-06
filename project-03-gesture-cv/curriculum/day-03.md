# Day 3: 摄像头实时采集 | Real-time Camera Capture

> **今日目标:** 学习从摄像头获取实时视频流，理解视频处理流程
>
> **Today's Goal:** Learn to capture real-time video streams from camera, understand video processing pipeline

---

## 学习目标 | Learning Objectives

完成今天的学习后，你将能够:
- ✅ 打开摄像头并获取实时视频流
- ✅ 理解帧率（FPS）的概念和重要性
- ✅ 逐帧处理视频数据
- ✅ 实现基础的实时图像处理（灰度化、模糊）
- ✅ 正确释放摄像头资源

> After completing today's lesson, you will be able to:
> - ✅ Open camera and capture real-time video streams
> - ✅ Understand the concept of Frame Rate (FPS)
> - ✅ Process video frame by frame
> - ✅ Implement basic real-time image processing (grayscale, blur)
> - ✅ Properly release camera resources

---

## 前置准备检查 | Prerequisites Check

- [ ] 已完成Day 1-2的学习
- [ ] 摄像头工作正常
- [ ] 理解图像的像素表示

---

## 为什么学这个？| Why Learn This?

### 视频是图像的时间序列
> 视频本质上是快速连续播放的图像序列（通常每秒30帧）。理解视频处理是构建实时交互系统的基础。

### 帧率决定流畅度
> 帧率（Frames Per Second, FPS）是衡量视频流畅度的指标。电影用24fps，游戏用60fps，VR需要90fps以上。

### 实时性是交互的关键
> 手势识别系统必须在用户做出手势后的几百毫秒内响应，否则体验会很差。这要求高效的实时处理。

---

## 任务一: 视频基础 | Task 1: Video Basics (20分钟)

### 3.1 视频的技术原理（10分钟）

**视频 = 图像序列 + 时间维度**

```
时间轴:
t=0s   t=0.033s  t=0.067s  t=0.1s
 |       |        |        |
Frame1 → Frame2 → Frame3 → Frame4 ...
```

**关键概念:**
- **FPS (Frames Per Second):** 每秒帧数
  - 24 fps: 电影标准
  - 30 fps: 普通视频
  - 60 fps: 高帧率游戏
  - 120+ fps: VR/AR应用

- **分辨率:** 每帧的像素尺寸
  - 640x480: 标清（SD）
  - 1280x720: 高清（HD）
  - 1920x1080: 全高清（Full HD）
  - 3840x2160: 4K超高清

- **码率 (Bitrate):** 每秒数据量
  - 影响视频质量和文件大小

### 3.2 视频处理的流程（10分钟）

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ 摄像头采集   │ → │ 图像处理     │ → │ 显示/保存    │
│ Capture      │    │ Processing   │    │ Display/Save │
└──────────────┘    └──────────────┘    └──────────────┘
       ↑                    ↓
       └──── 循环获取下一帧 ────┘
```

---

## 任务二: 实时视频采集 | Task 2: Real-time Video Capture (40分钟)

### 3.3 基础视频捕捉（15分钟）

创建 `video_capture.py`:

```python
import cv2
import time

def basic_video_capture():
    """
    基础视频捕捉
    Basic video capture
    """
    # 打开摄像头
    cap = cv2.VideoCapture(0)
    
    # 设置分辨率
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    
    if not cap.isOpened():
        print("无法打开摄像头 | Cannot open camera")
        return
    
    print("摄像头已启动 | Camera started")
    print("按 'q' 退出 | Press 'q' to quit")
    print("按 's' 截图 | Press 's' to snapshot")
    
    # 计算FPS
    prev_time = 0
    fps = 0
    
    while True:
        # 获取当前时间
        current_time = time.time()
        
        # 读取一帧
        ret, frame = cap.read()
        
        if not ret:
            print("无法获取画面 | Cannot capture frame")
            break
        
        # 计算FPS
        if current_time - prev_time > 0:
            fps = 1 / (current_time - prev_time)
        prev_time = current_time
        
        # 在画面上显示FPS
        cv2.putText(frame, f"FPS: {fps:.2f}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # 显示画面
        cv2.imshow('Video Capture', frame)
        
        # 键盘控制
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('s'):
            # 保存截图
            filename = f"snapshot_{int(current_time)}.jpg"
            cv2.imwrite(filename, frame)
            print(f"截图已保存 | Snapshot saved: {filename}")
    
    # 释放资源
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    basic_video_capture()
```

### 3.4 多种实时处理效果（15分钟）

```python
import cv2

def real_time_effects():
    """
    实时图像处理效果
    Real-time image processing effects
    """
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        return
    
    print("按 '1' 原图 | Original")
    print("按 '2' 灰度 | Grayscale")
    print("按 '3' 模糊 | Blur")
    print("按 '4' 边缘检测 | Edge Detection")
    print("按 'q' 退出 | Quit")
    
    mode = 1  # 默认模式
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 根据模式应用不同效果
        if mode == 1:
            processed = frame
            mode_name = "Original"
        elif mode == 2:
            processed = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            processed = cv2.cvtColor(processed, cv2.COLOR_GRAY2BGR)
            mode_name = "Grayscale"
        elif mode == 3:
            processed = cv2.GaussianBlur(frame, (15, 15), 0)
            mode_name = "Gaussian Blur"
        elif mode == 4:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            edges = cv2.Canny(gray, 100, 200)
            processed = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
            mode_name = "Edge Detection"
        else:
            processed = frame
            mode_name = "Original"
        
        # 显示模式名称
        cv2.putText(processed, f"Mode: {mode_name}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        cv2.imshow('Real-time Effects', processed)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key in [ord('1'), ord('2'), ord('3'), ord('4')]:
            mode = int(chr(key))
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    real_time_effects()
```

### 3.5 视频录制（10分钟）

```python
import cv2

def record_video():
    """
    录制视频
    Record video
    """
    cap = cv2.VideoCapture(0)
    
    # 设置视频编码和输出
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640, 480))
    
    print("按 'r' 开始录制 | Press 'r' to start recording")
    print("按 's' 停止录制 | Press 's' to stop recording")
    print("按 'q' 退出 | Press 'q' to quit")
    
    recording = False
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 显示录制状态
        if recording:
            cv2.circle(frame, (30, 30), 10, (0, 0, 255), -1)  # 红点表示录制中
            out.write(frame)  # 写入视频文件
        
        cv2.imshow('Video Recorder', frame)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('r') and not recording:
            recording = True
            print("开始录制 | Recording started...")
        elif key == ord('s') and recording:
            recording = False
            print("停止录制 | Recording stopped")
    
    cap.release()
    out.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    record_video()
```

---

## 任务三: 性能优化 | Task 3: Performance Optimization (20分钟)

### 3.6 FPS优化技巧

```python
import cv2
import time

def optimized_capture():
    """
    优化的视频捕捉
    Optimized video capture
    """
    cap = cv2.VideoCapture(0)
    
    # 降低分辨率以提高性能
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 320)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)
    
    # 处理每一帧（使用轻量级操作）
    frame_count = 0
    start_time = time.time()
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 简单的处理（避免复杂计算）
        frame_count += 1
        
        # 每秒更新一次FPS显示
        if frame_count % 30 == 0:
            elapsed = time.time() - start_time
            fps = frame_count / elapsed
            print(f"当前FPS | Current FPS: {fps:.2f}")
        
        cv2.imshow('Optimized Capture', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    optimized_capture()
```

---

## 今日作业 | Today's Assignment

### 基础作业（必做）
1. ✅ 实现一个实时摄像头程序，能显示FPS
2. ✅ 添加至少3种实时图像效果（灰度、翻转、颜色转换）
3. ✅ 实现截图保存功能

### 进阶作业（选做）
1. 创建一个"拍照计时器"（3秒倒计时后拍照）
2. 实现视频分段录制（每按一次r录一段）

### 挑战作业
1. 创建一个简单的"视频滤镜"应用，包含:
   - 至少5种滤镜效果
   - 滤镜切换有平滑过渡
   - 可以录制带滤镜的视频

---

## 明日预告 | Tomorrow's Preview

**Day 4: 图像滤波与边缘检测**
- 深入学习图像滤波原理
- 实现各种边缘检测算法
- 为后续的特征提取做准备

---

## 常见问题 | FAQ

### Q1: FPS很低怎么办？
**A:** 尝试降低分辨率或减少图像处理操作:
```python
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 320)  # 降低分辨率
```

### Q2: 摄像头有延迟？
**A:** 检查USB带宽，关闭其他占用摄像头的程序

---

**恭喜完成Day 3！** 你已经掌握了实时视频处理的基础。明天我们将探索图像的"骨架"——边缘！

> **Congratulations on completing Day 3!** You've mastered real-time video processing. Tomorrow we'll explore the "skeleton" of images—edges!
