# Day 10: OpenCV计算机视觉与姿态模仿 | OpenCV Computer Vision & Pose Mimicry

---

## 今日目标 | Today's Objectives

- 掌握OpenCV图像处理基础操作 | Master OpenCV basic image processing operations
- 实现摄像头实时采集与人脸检测 | Implement real-time camera capture and face detection
- 理解人体姿态估计原理与关键点检测 | Understand pose estimation principles and keypoint detection
- 实现关键点到舵机角度的映射算法 | Implement keypoint-to-servo-angle mapping algorithm

## 产出 | Deliverables

- OpenCV摄像头采集与图像处理管线 | OpenCV camera capture and image processing pipeline
- 人脸检测与姿态估计演示 | Face detection and pose estimation demo
- 实时姿态模仿系统（人体动作→机器人动作）| Real-time pose mimicry system (human motion -> robot motion)

---

## 时间安排 | Schedule

| 时间 Time | 内容 Content | 类型 Type |
|-----------|-------------|-----------|
| 09:00 - 09:45 | OpenCV基础与图像处理 OpenCV Basics & Image Processing | 讲解 Lecture |
| 09:45 - 10:30 | 摄像头采集与颜色空间 Camera Capture & Color Spaces | 实践 Practice |
| 10:30 - 10:45 | 休息 Break | — |
| 10:45 - 11:30 | 人脸检测 Face Detection | 实践 Practice |
| 11:30 - 12:00 | 图像处理管线总结 Image Pipeline Summary | 讨论 Discussion |
| 12:00 - 13:30 | 午休 Lunch Break | — |
| 13:30 - 14:15 | 姿态估计原理 Pose Estimation Theory | 讲解 Lecture |
| 14:15 - 15:00 | MediaPipe/OpenPose集成 MediaPipe/OpenPose Integration | 实践 Practice |
| 15:00 - 15:15 | 休息 Break | — |
| 15:15 - 16:00 | 关键点到舵机角度映射 Keypoint-to-Angle Mapping | 实践 Practice |
| 16:00 - 16:30 | 实时姿态模仿系统 Real-time Pose Mimicry | 实践 Practice |
| 16:30 - 17:00 | 总结与答疑 Summary & Q&A | 讨论 Discussion |

---

## 上午 | Morning Session

### 任务一：OpenCV基础与图像处理 | Task 1: OpenCV Basics & Image Processing

#### 为什么要学这个 | Why Learn This

OpenCV是计算机视觉领域最广泛使用的开源库。ElectronBot的视觉感知能力（人脸追踪、手势识别）都依赖图像处理管线。

OpenCV is the most widely used open-source library in computer vision. ElectronBot's visual perception capabilities (face tracking, gesture recognition) all depend on image processing pipelines.

#### 步骤 | Steps

1. 安装OpenCV Python包 | Install OpenCV Python package
2. 学习图像的NumPy数组表示 | Learn image representation as NumPy arrays
3. 掌握基本图像操作：读取、显示、裁剪、缩放 | Master basic operations: read, show, crop, resize
4. 实现灰度转换和直方图分析 | Implement grayscale conversion and histogram analysis

#### 代码示例 | Code Example

```python
# opencv_basics.py - OpenCV基础操作 | OpenCV basic operations
import cv2
import numpy as np
import time

# ===== 图像读取与显示 | Image Read & Display =====

def explore_image_basics():
    """探索图像基础属性 | Explore basic image properties"""

    # 创建测试图像 | Create test image
    img = np.zeros((480, 640, 3), dtype=np.uint8)

    # 在图像上绘制图形 | Draw shapes on image
    cv2.rectangle(img, (50, 50), (200, 200), (0, 255, 0), 2)      # 绿色矩形 Green rectangle
    cv2.circle(img, (400, 150), 80, (255, 0, 0), -1)               # 蓝色实心圆 Blue filled circle
    cv2.putText(img, "ElectronBot CV", (150, 400),
                cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 3)

    # 图像属性 | Image properties
    print(f"图像形状 Image shape: {img.shape}")       # (480, 640, 3)
    print(f"图像大小 Image size: {img.size}")           # 921600 bytes
    print(f"数据类型 Data type: {img.dtype}")           # uint8

    # 灰度转换 | Grayscale conversion
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    print(f"灰度图形状 Gray shape: {gray.shape}")       # (480, 640)

    # 高斯模糊 | Gaussian blur
    blurred = cv2.GaussianBlur(gray, (15, 15), 0)

    # 边缘检测 | Edge detection (Canny)
    edges = cv2.Canny(gray, 50, 150)

    # 显示结果 | Show results
    cv2.imshow("Original", img)
    cv2.imshow("Grayscale", gray)
    cv2.imshow("Blurred", blurred)
    cv2.imshow("Edges", edges)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


# ===== 图像处理管线 | Image Processing Pipeline =====

class ImageProcessor:
    """图像处理管线 | Image processing pipeline"""

    def __init__(self, width=640, height=480):
        self.width = width
        self.height = height

    def preprocess(self, frame):
        """预处理帧 | Preprocess frame"""
        # 缩放到统一尺寸 | Resize to uniform dimensions
        frame = cv2.resize(frame, (self.width, self.height))

        # 翻转（镜像效果）| Flip (mirror effect)
        frame = cv2.flip(frame, 1)

        # 降噪 | Noise reduction
        frame = cv2.GaussianBlur(frame, (3, 3), 0)

        return frame

    def extract_features(self, frame):
        """提取特征 | Extract features"""
        # 转HSV颜色空间 | Convert to HSV color space
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

        # 检测肤色区域 | Detect skin color region
        lower_skin = np.array([0, 40, 60])
        upper_skin = np.array([25, 170, 255])
        skin_mask = cv2.inRange(hsv, lower_skin, upper_skin)

        # 形态学操作 | Morphological operations
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
        skin_mask = cv2.morphologyEx(skin_mask, cv2.MORPH_CLOSE, kernel)
        skin_mask = cv2.morphologyEx(skin_mask, cv2.MORPH_OPEN, kernel)

        return hsv, skin_mask

    def compute_histogram(self, frame):
        """计算直方图 | Compute histogram"""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])

        # 归一化 | Normalize
        hist = cv2.normalize(hist, hist).flatten()
        return hist


# 运行基础演示 | Run basic demo
if __name__ == "__main__":
    print("=" * 50)
    print("OpenCV基础演示 | OpenCV Basics Demo")
    print("=" * 50)
    explore_image_basics()
```

#### 预期结果 | Expected Result

- 能够创建、显示和保存图像 | Can create, display, and save images
- 理解BGR vs RGB颜色空间的区别 | Understand BGR vs RGB color space difference
- 掌握灰度转换和模糊降噪操作 | Master grayscale conversion and blur denoising

#### 常见问题 | Common Issues

| 问题 Issue | 原因 Cause | 解决 Solution |
|------------|-----------|--------------|
| imshow窗口不显示 | waitKey未调用 | 添加cv2.waitKey(0) |
| 图像颜色偏蓝/红 | BGR vs RGB混淆 | OpenCV用BGR，PIL用RGB |
| 矩阵索引越界 | 坐标顺序(x,y) vs (row,col) | OpenCV: frame[y, x] |

---

### 任务二：摄像头采集与颜色空间 | Task 2: Camera Capture & Color Spaces

#### 为什么要学这个 | Why Learn This

实时摄像头采集是所有视觉应用的基础。理解颜色空间转换是实现肤色检测、物体追踪的前提。

Real-time camera capture is the foundation of all vision applications. Understanding color space conversion is the prerequisite for skin detection and object tracking.

#### 步骤 | Steps

1. 打开默认摄像头并采集帧 | Open default camera and capture frames
2. 实现帧率计算和性能监控 | Implement FPS calculation and performance monitoring
3. 掌握BGR/HSV/Gray颜色空间转换 | Master BGR/HSV/Gray color space conversion
4. 实现基于颜色的物体检测 | Implement color-based object detection

#### 代码示例 | Code Example

```python
# camera_capture.py - 摄像头采集与颜色空间 | Camera capture & color spaces
import cv2
import numpy as np
import time


class CameraManager:
    """摄像头管理器 | Camera manager"""

    def __init__(self, camera_id=0, fps_target=30):
        self.camera_id = camera_id
        self.fps_target = fps_target
        self.cap = None
        self.frame_count = 0
        self.fps = 0.0
        self.last_time = time.time()

    def open(self):
        """打开摄像头 | Open camera"""
        self.cap = cv2.VideoCapture(self.camera_id)

        if not self.cap.isOpened():
            raise RuntimeError(
                f"无法打开摄像头 Cannot open camera {self.camera_id}")

        # 设置分辨率 | Set resolution
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        # 设置帧率 | Set FPS
        self.cap.set(cv2.CAP_PROP_FPS, self.fps_target)

        print(f"摄像头已打开 Camera opened: {self.camera_id}")
        print(f"分辨率 Resolution: "
              f"{int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))}x"
              f"{int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))}")

    def read_frame(self):
        """读取一帧 | Read one frame"""
        if self.cap is None:
            return None

        ret, frame = self.cap.read()
        if not ret:
            return None

        self.frame_count += 1

        # 计算FPS | Calculate FPS
        current_time = time.time()
        elapsed = current_time - self.last_time
        if elapsed >= 1.0:
            self.fps = self.frame_count / elapsed
            self.frame_count = 0
            self.last_time = current_time

        return frame

    def draw_info(self, frame):
        """在帧上绘制信息 | Draw info on frame"""
        cv2.putText(frame, f"FPS: {self.fps:.1f}",
                    (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                    0.8, (0, 255, 0), 2)
        return frame

    def release(self):
        """释放摄像头 | Release camera"""
        if self.cap is not None:
            self.cap.release()
            print("摄像头已释放 Camera released")


# ===== 颜色空间演示 | Color Space Demo =====

def demo_color_spaces():
    """颜色空间转换演示 | Color space conversion demo"""
    cam = CameraManager()
    cam.open()

    print("按以下键切换模式 | Press keys to switch modes:")
    print("  1 - 原始 BGR  Original")
    print("  2 - 灰度 Grayscale")
    print("  3 - HSV颜色空间 HSV")
    print("  4 - 肤色检测 Skin detection")
    print("  q - 退出 Quit")

    mode = 1

    while True:
        frame = cam.read_frame()
        if frame is None:
            break

        # 镜像翻转 | Mirror flip
        frame = cv2.flip(frame, 1)

        if mode == 1:
            display = frame.copy()
            cv2.putText(display, "Mode: BGR Original",
                        (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                        0.6, (255, 255, 255), 2)

        elif mode == 2:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            display = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
            cv2.putText(display, "Mode: Grayscale",
                        (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                        0.6, (255, 255, 255), 2)

        elif mode == 3:
            hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            h, s, v = cv2.split(hsv)
            display = np.vstack([
                np.hstack([frame,
                           cv2.cvtColor(h, cv2.COLOR_GRAY2BGR)]),
                np.hstack([cv2.cvtColor(s, cv2.COLOR_GRAY2BGR),
                           cv2.cvtColor(v, cv2.COLOR_GRAY2BGR)])
            ])
            cv2.putText(display, "Mode: HSV (BGR|H|S|V)",
                        (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                        0.6, (255, 255, 255), 2)

        elif mode == 4:
            hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            lower_skin = np.array([0, 40, 60])
            upper_skin = np.array([25, 170, 255])
            mask = cv2.inRange(hsv, lower_skin, upper_skin)

            # 形态学优化 | Morphological refinement
            kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
            mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
            mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

            result = cv2.bitwise_and(frame, frame, mask=mask)
            display = np.hstack([frame, result])
            cv2.putText(display, "Mode: Skin Detection (Original|Result)",
                        (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                        0.6, (255, 255, 255), 2)

        display = cam.draw_info(display)
        cv2.imshow("ElectronBot CV - Color Spaces", display)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('1'):
            mode = 1
        elif key == ord('2'):
            mode = 2
        elif key == ord('3'):
            mode = 3
        elif key == ord('4'):
            mode = 4

    cam.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    demo_color_spaces()
```

#### 预期结果 | Expected Result

- 摄像头实时画面显示在窗口中 | Live camera feed displays in window
- FPS计数器正确显示帧率 | FPS counter shows correct frame rate
- 肤色检测能大致分离手部区域 | Skin detection roughly isolates hand region

---

### 任务三：人脸检测 | Task 3: Face Detection

#### 为什么要学这个 | Why Learn This

人脸检测是ElectronBot"注视"用户的基础功能。通过Haar级联分类器，可以实现高效的实时人脸定位，为后续交互提供输入。

Face detection is the foundation for ElectronBot to "look at" the user. Using Haar cascade classifiers enables efficient real-time face localization for subsequent interaction.

#### 步骤 | Steps

1. 加载Haar级联分类器模型 | Load Haar cascade classifier model
2. 实现人脸检测与定位 | Implement face detection and localization
3. 计算人脸中心位置用于追踪 | Calculate face center for tracking
4. 将人脸位置映射到机器人头部舵机角度 | Map face position to robot head servo angle

#### 代码示例 | Code Example

```python
# face_detection.py - 人脸检测与追踪 | Face detection & tracking
import cv2
import numpy as np
import time


class FaceDetector:
    """人脸检测器 | Face detector"""

    def __init__(self):
        # 加载Haar级联分类器 | Load Haar cascade classifier
        cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        self.face_cascade = cv2.CascadeClassifier(cascade_path)

        # 加载眼睛分类器（可选验证）| Load eye cascade (optional validation)
        eye_path = cv2.data.haarcascades + 'haarcascade_eye.xml'
        self.eye_cascade = cv2.CascadeClassifier(eye_path)

        # 追踪参数 | Tracking parameters
        self.face_center = None
        self.smooth_center = None
        self.smooth_factor = 0.3  # 平滑因子 | Smoothing factor

        if self.face_cascade.empty():
            raise RuntimeError("无法加载人脸分类器 Cannot load face cascade")

    def detect(self, frame):
        """检测人脸 | Detect faces"""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.equalizeHist(gray)  # 直方图均衡化 | Histogram equalization

        # 多尺度检测 | Multi-scale detection
        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,    # 图像缩放比例 Image scale factor
            minNeighbors=5,     # 最小邻居数 Minimum neighbors
            minSize=(60, 60),   # 最小人脸尺寸 Minimum face size
            maxSize=(300, 300)  # 最大人脸尺寸 Maximum face size
        )

        if len(faces) > 0:
            # 取最大的人脸 | Take the largest face
            areas = [w * h for (x, y, w, h) in faces]
            idx = np.argmax(areas)
            x, y, w, h = faces[idx]

            # 计算中心点 | Calculate center
            cx = x + w // 2
            cy = y + h // 2
            self.face_center = (cx, cy)

            # 平滑追踪 | Smooth tracking
            if self.smooth_center is None:
                self.smooth_center = (float(cx), float(cy))
            else:
                sx, sy = self.smooth_center
                self.smooth_center = (
                    sx + self.smooth_factor * (cx - sx),
                    sy + self.smooth_factor * (cy - sy)
                )

            return {
                'rect': (x, y, w, h),
                'center': (cx, cy),
                'smooth_center': self.smooth_center,
                'area': w * h,
                'detected': True
            }

        return {'detected': False}

    def draw_detection(self, frame, result):
        """绘制检测结果 | Draw detection results"""
        if not result['detected']:
            cv2.putText(frame, "No face detected",
                        (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                        0.7, (0, 0, 255), 2)
            return frame

        x, y, w, h = result['rect']

        # 绘制人脸框 | Draw face rectangle
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # 绘制中心点 | Draw center point
        cx, cy = result['center']
        cv2.circle(frame, (cx, cy), 5, (0, 0, 255), -1)

        # 绘制平滑追踪点 | Draw smooth tracking point
        sx, sy = result['smooth_center']
        cv2.circle(frame, (int(sx), int(sy)), 8, (255, 0, 0), 2)

        # 显示信息 | Show info
        cv2.putText(frame,
                    f"Face: ({cx}, {cy}) Area: {result['area']}",
                    (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                    0.6, (0, 255, 0), 2)

        return frame


# ===== 人脸追踪到舵机角度映射 | Face Tracking to Servo Angle Mapping =====

class FaceToServoMapper:
    """人脸位置到舵机角度的映射器 | Face position to servo angle mapper"""

    def __init__(self, image_width=640, image_height=480,
                 pan_range=(-90, 90), tilt_range=(-45, 45)):
        self.image_width = image_width
        self.image_height = image_height
        self.pan_range = pan_range    # 水平旋转范围 Pan range
        self.tilt_range = tilt_range  # 垂直旋转范围 Tilt range

    def map_to_angles(self, face_center):
        """
        将人脸中心像素坐标映射为舵机角度
        Map face center pixel coordinates to servo angles

        参数 Args:
            face_center: (x, y) 像素坐标 pixel coordinates

        返回 Returns:
            (pan_angle, tilt_angle) 度 degrees
        """
        if face_center is None:
            return 0.0, 0.0

        fx, fy = face_center

        # 归一化到[-1, 1] | Normalize to [-1, 1]
        nx = (fx - self.image_width / 2) / (self.image_width / 2)
        ny = (fy - self.image_height / 2) / (self.image_height / 2)

        # 映射到舵机角度范围 | Map to servo angle range
        pan_angle = nx * self.pan_range[1]    # 水平 Horizontal
        tilt_angle = -ny * self.tilt_range[1]  # 垂直（取反因为y轴向下）Vertical (negated because y-axis points down)

        return pan_angle, tilt_angle


# ===== 完整演示 | Full Demo =====

def demo_face_tracking():
    """人脸追踪演示 | Face tracking demo"""
    cap = cv2.VideoCapture(0)
    detector = FaceDetector()
    mapper = FaceToServoMapper()

    print("人脸追踪演示 | Face Tracking Demo")
    print("按q退出 Press q to quit")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        result = detector.detect(frame)
        frame = detector.draw_detection(frame, result)

        if result['detected']:
            pan, tilt = mapper.map_to_angles(result['smooth_center'])
            cv2.putText(frame,
                        f"Servo -> Pan: {pan:.1f} deg, Tilt: {tilt:.1f} deg",
                        (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                        0.6, (255, 200, 0), 2)

        cv2.imshow("ElectronBot Face Tracking", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    demo_face_tracking()
```

#### 预期结果 | Expected Result

- 绿色框正确标记人脸位置 | Green box correctly marks face position
- 蓝色圆点平滑追踪人脸中心 | Blue dot smoothly tracks face center
- 舵机角度数值随人脸移动合理变化 | Servo angle values change reasonably with face movement

#### 常见问题 | Common Issues

| 问题 Issue | 原因 Cause | 解决 Solution |
|------------|-----------|--------------|
| 检测不到人脸 | 光线太暗或角度太大 | 增加光线，正面面对摄像头 |
| 检测框闪烁 | minNeighbors太低 | 增大minNeighbors到5-7 |
| 舵机角度跳变 | 未做平滑处理 | 使用指数移动平均(EMA)平滑 |

---

## 下午 | Afternoon Session

### 任务四：姿态估计原理 | Task 4: Pose Estimation Theory

#### 为什么要学这个 | Why Learn This

姿态估计是实现"机器人模仿人动作"的核心技术。通过检测人体的骨骼关键点，可以将人体姿态转化为机器人可执行的角度命令。

Pose estimation is the core technology for "robot mimicking human movements." By detecting body skeleton keypoints, human poses can be converted into executable robot angle commands.

#### 步骤 | Steps

1. 了解2D/3D姿态估计的区别 | Understand 2D vs 3D pose estimation
2. 学习骨骼关键点模型（17个COCO关键点）| Learn skeleton keypoint model (17 COCO keypoints)
3. 安装MediaPipe Pose库 | Install MediaPipe Pose library
4. 实现基础姿态检测 | Implement basic pose detection

#### 代码示例 | Code Example

```python
# pose_estimation.py - 姿态估计 | Pose estimation
import cv2
import mediapipe as mp
import numpy as np
import time


class PoseEstimator:
    """人体姿态估计器 | Human pose estimator using MediaPipe"""

    def __init__(self,
                 static_image_mode=False,
                 model_complexity=1,
                 min_detection_confidence=0.5,
                 min_tracking_confidence=0.5):
        self.mp_pose = mp.solutions.pose
        self.mp_draw = mp.solutions.drawing_utils
        self.mp_styles = mp.solutions.drawing_styles

        self.pose = self.mp_pose.Pose(
            static_image_mode=static_image_mode,
            model_complexity=model_complexity,
            smooth_landmarks=True,
            enable_segmentation=False,
            min_detection_confidence=min_detection_confidence,
            min_tracking_confidence=min_tracking_confidence
        )

        # MediaPipe关键点索引 | MediaPipe landmark indices
        self.LANDMARKS = {
            'nose': 0,
            'left_shoulder': 11,
            'right_shoulder': 12,
            'left_elbow': 13,
            'right_elbow': 14,
            'left_wrist': 15,
            'right_wrist': 16,
            'left_hip': 23,
            'right_hip': 24,
            'left_knee': 25,
            'right_knee': 26,
            'left_ankle': 27,
            'right_ankle': 28,
        }

    def estimate(self, frame):
        """
        估计人体姿态 | Estimate human pose

        返回 Returns:
            dict: 关键点字典，每个包含 'x', 'y', 'z', 'visibility'
            Keypoint dict with 'x', 'y', 'z', 'visibility'
        """
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(rgb)

        if not results.pose_landmarks:
            return None

        # 提取关键点 | Extract keypoints
        h, w, _ = frame.shape
        keypoints = {}

        for name, idx in self.LANDMARKS.items():
            lm = results.pose_landmarks.landmark[idx]
            keypoints[name] = {
                'x': lm.x * w,           # 像素x Pixel x
                'y': lm.y * h,           # 像素y Pixel y
                'z': lm.z,               # 深度 Depth
                'visibility': lm.visibility,  # 可见度 Visibility
                'nx': lm.x,              # 归一化x Normalized x
                'ny': lm.y               # 归一化y Normalized y
            }

        return {
            'keypoints': keypoints,
            'landmarks': results.pose_landmarks
        }

    def draw_pose(self, frame, result):
        """绘制姿态骨骼 | Draw pose skeleton"""
        if result is None or 'landmarks' not in result:
            return frame

        self.mp_draw.draw_landmarks(
            frame,
            result['landmarks'],
            self.mp_pose.POSE_CONNECTIONS,
            landmark_drawing_spec=self.mp_styles.get_default_pose_landmarks_style()
        )

        return frame

    def release(self):
        """释放资源 | Release resources"""
        self.pose.close()


# ===== 角度计算工具 | Angle Calculation Utilities =====

class AngleCalculator:
    """从关键点计算关节角度 | Calculate joint angles from keypoints"""

    @staticmethod
    def calculate_angle(a, b, c):
        """
        计算三点形成的角度 | Calculate angle formed by three points

            a
           /
          / angle
         b--------c

        参数 Args:
            a, b, c: (x, y) 三个关键点 three keypoints (b is the vertex)

        返回 Returns:
            float: 角度（度）angle in degrees
        """
        a = np.array(a)
        b = np.array(b)
        c = np.array(c)

        ba = a - b
        bc = c - b

        # 余弦定理 | Cosine formula
        cosine = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-6)
        cosine = np.clip(cosine, -1.0, 1.0)

        angle = np.degrees(np.arccos(cosine))
        return angle

    def extract_arm_angles(self, keypoints):
        """
        提取手臂关节角度 | Extract arm joint angles

        返回 Returns:
            dict: 包含左右肩/肘角度的字典
            Dict containing left/right shoulder and elbow angles
        """
        angles = {}

        # 右臂 Right arm: shoulder -> elbow -> wrist
        rs = (keypoints['right_shoulder']['x'], keypoints['right_shoulder']['y'])
        re = (keypoints['right_elbow']['x'], keypoints['right_elbow']['y'])
        rw = (keypoints['right_wrist']['x'], keypoints['right_wrist']['y'])
        rh = (keypoints['right_hip']['x'], keypoints['right_hip']['y'])

        angles['right_elbow'] = self.calculate_angle(rs, re, rw)
        angles['right_shoulder'] = self.calculate_angle(rh, rs, re)

        # 左臂 Left arm: shoulder -> elbow -> wrist
        ls = (keypoints['left_shoulder']['x'], keypoints['left_shoulder']['y'])
        le = (keypoints['left_elbow']['x'], keypoints['left_elbow']['y'])
        lw = (keypoints['left_wrist']['x'], keypoints['left_wrist']['y'])
        lh = (keypoints['left_hip']['x'], keypoints['left_hip']['y'])

        angles['left_elbow'] = self.calculate_angle(ls, le, lw)
        angles['left_shoulder'] = self.calculate_angle(lh, ls, le)

        return angles


# ===== 关键点到舵机角度映射 | Keypoint to Servo Angle Mapping =====

class PoseToServoMapper:
    """
    人体姿态关键点到机器人舵机角度的映射
    Maps human pose keypoints to robot servo angles
    """

    def __init__(self):
        self.angle_calc = AngleCalculator()
        # 角度平滑缓冲 | Angle smoothing buffer
        self.smooth_angles = {}
        self.smooth_alpha = 0.4

    def map_pose(self, keypoints):
        """
        将人体姿态映射为6个舵机角度
        Map human pose to 6 servo angles

        返回 Returns:
            dict: {
                'base': float,      # 底座旋转 Base rotation
                'shoulder': float,  # 肩关节 Shoulder
                'elbow': float,     # 肘关节 Elbow
                'wrist': float,     # 腕关节 Wrist
                'gripper': float,   # 夹爪 Gripper
                'head': float       # 头部 Head
            }
        """
        body_angles = self.angle_calc.extract_arm_angles(keypoints)

        # 1. 底座旋转: 基于双肩中点偏移 | Base rotation: based on shoulder midpoint offset
        ls = keypoints['left_shoulder']
        rs = keypoints['right_shoulder']
        shoulder_mid_x = (ls['nx'] + rs['nx']) / 2
        base_angle = (shoulder_mid_x - 0.5) * 120  # 映射到[-60, 60]度
        base_angle = np.clip(base_angle, -90, 90)

        # 2. 肩膀角度: 右肩角度 | Shoulder angle: right shoulder
        shoulder_angle = body_angles['right_shoulder']
        # 映射[0, 180] -> [0, 180]（直接使用）| Map directly
        shoulder_angle = np.clip(shoulder_angle, 0, 180)

        # 3. 肘部角度: 右肘角度 | Elbow angle: right elbow
        elbow_angle = body_angles['right_elbow']
        # 映射[0, 180] -> [0, 135]（机器人肘部范围较小）| Map to robot elbow range
        elbow_angle = np.clip(elbow_angle * 0.75, 0, 135)

        # 4. 腕部角度: 基于手腕相对肘部的方向 | Wrist angle: based on wrist direction relative to elbow
        re = keypoints['right_elbow']
        rw = keypoints['right_wrist']
        wrist_dx = rw['nx'] - re['nx']
        wrist_dy = rw['ny'] - re['ny']
        wrist_angle = np.degrees(np.arctan2(wrist_dy, wrist_dx))
        wrist_angle = np.clip(wrist_angle, -90, 90)

        # 5. 夹爪: 基于双手距离 | Gripper: based on hand distance
        lw = keypoints['left_wrist']
        rw2 = keypoints['right_wrist']
        hand_dist = np.sqrt(
            (lw['nx'] - rw2['nx'])**2 + (lw['ny'] - rw2['ny'])**2)
        gripper_angle = np.clip(hand_dist * 300, 0, 90)

        # 6. 头部: 基于鼻子偏移 | Head: based on nose offset
        nose = keypoints['nose']
        head_angle = (nose['nx'] - 0.5) * 120
        head_angle = np.clip(head_angle, -90, 90)

        servo_angles = {
            'base': base_angle,
            'shoulder': shoulder_angle,
            'elbow': elbow_angle,
            'wrist': wrist_angle,
            'gripper': gripper_angle,
            'head': head_angle
        }

        # 平滑处理 | Smoothing
        for key, value in servo_angles.items():
            if key in self.smooth_angles:
                servo_angles[key] = (
                    self.smooth_angles[key] * (1 - self.smooth_alpha) +
                    value * self.smooth_alpha
                )
            self.smooth_angles[key] = servo_angles[key]

        return servo_angles


# ===== 完整实时姿态模仿 | Full Real-time Pose Mimicry =====

def demo_pose_mimicry():
    """实时姿态模仿演示 | Real-time pose mimicry demo"""
    cap = cv2.VideoCapture(0)
    estimator = PoseEstimator()
    mapper = PoseToServoMapper()

    print("=" * 50)
    print("ElectronBot 实时姿态模仿 | Real-time Pose Mimicry")
    print("站在摄像头前做出动作，机器人将模仿你的姿态！")
    print("Stand in front of camera, robot will mimic your pose!")
    print("按q退出 Press q to quit")
    print("=" * 50)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        result = estimator.estimate(frame)

        if result is not None:
            frame = estimator.draw_pose(frame, result)

            # 映射到舵机角度 | Map to servo angles
            servo_cmd = mapper.map_pose(result['keypoints'])

            # 显示舵机角度 | Display servo angles
            y_offset = 30
            for name, angle in servo_cmd.items():
                text = f"{name}: {angle:.1f} deg"
                cv2.putText(frame, text,
                            (10, y_offset),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5, (0, 255, 255), 2)
                y_offset += 25

            # 绘制角度条 | Draw angle bars
            bar_x = frame.shape[1] - 200
            for i, (name, angle) in enumerate(servo_cmd.items()):
                normalized = (angle + 90) / 180  # 归一化到[0,1]
                bar_width = int(normalized * 150)
                cv2.rectangle(frame,
                              (bar_x, 20 + i * 25),
                              (bar_x + bar_width, 40 + i * 25),
                              (0, 200, 0), -1)
                cv2.rectangle(frame,
                              (bar_x, 20 + i * 25),
                              (bar_x + 150, 40 + i * 25),
                              (255, 255, 255), 1)
        else:
            cv2.putText(frame, "No pose detected",
                        (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                        0.7, (0, 0, 255), 2)

        cv2.imshow("ElectronBot Pose Mimicry", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    estimator.release()


if __name__ == "__main__":
    demo_pose_mimicry()
```

#### 预期结果 | Expected Result

- 人体骨骼线条正确叠加在视频画面上 | Body skeleton lines correctly overlay on video
- 6个舵机角度数值随人体动作实时变化 | 6 servo angle values change in real-time with body movement
- 角度平滑无抖动 | Angles are smooth without jitter

#### 常见问题 | Common Issues

| 问题 Issue | 原因 Cause | 解决 Solution |
|------------|-----------|--------------|
| MediaPipe安装失败 | Python版本不兼容 | 使用Python 3.8-3.11 |
| 检测不稳定 | 背景复杂或身体被遮挡 | 保持简单背景，全身入镜 |
| 角度映射不合理 | 关键点置信度低 | 过滤visibility < 0.5的点 |
| 性能低于10FPS | model_complexity太高 | 设置model_complexity=0 |

---

## 今日作业 | Today's Homework

### 必做题 | Required

1. **OpenCV图像处理管线**：实现完整的读图-预处理-特征提取-显示流程，包含至少3种图像处理操作 | Implement complete read-preprocess-extract-display pipeline with at least 3 operations
2. **人脸检测追踪器**：基于FaceDetector实现稳定的人脸追踪，并输出头部舵机角度 | Implement stable face tracking with head servo angle output
3. **姿态到角度映射**：实现PoseToServoMapper，用自己身体的动作测试角度输出合理性 | Implement PoseToServoMapper and test with your own body movements

### 挑战题 | Challenge

1. **手势识别**：在姿态估计基础上，检测特定手势（挥手、握拳、比V），触发机器人不同响应 | Detect specific gestures (wave, fist, V-sign) to trigger different robot responses
2. **多帧平滑滤波**：实现卡尔曼滤波（Kalman Filter）替代简单EMA平滑，提升角度稳定性 | Implement Kalman Filter to replace EMA smoothing for better angle stability

### 思考题 | Reflection

1. 为什么姿态估计使用归一化坐标(0-1)而不是像素坐标？这对机器人控制有什么好处？| Why does pose estimation use normalized coordinates? What benefit does this have for robot control?
2. 如果要让ElectronBot模仿全身动作（包括腿部），需要额外检测哪些关键点？| If ElectronBot should mimic full-body motion including legs, what additional keypoints are needed?

---

## 明日预告 | Tomorrow's Preview

明天进入AI时代！我们将集成大语言模型（LLM）让ElectronBot能够与你对话，实现语音识别（STT）和语音合成（TTS），并构建自定义行为树让机器人拥有自己的"性格"和情感系统！

Tomorrow we enter the AI era! We'll integrate Large Language Models (LLM) so ElectronBot can converse with you, implement speech recognition (STT) and text-to-speech (TTS), and build custom behavior trees giving the robot its own "personality" and emotion system!

---

## 参考资源 | References

- [OpenCV官方文档](https://docs.opencv.org/4.x/)
- [OpenCV Python教程](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- [MediaPipe Pose文档](https://google.github.io/mediapipe/solutions/pose.html)
- [Haar级联分类器原理](https://docs.opencv.org/4.x/db/d28/tutorial_cascade_classifier.html)
- [COCO关键点格式说明](https://cocodataset.org/#keypoints-2020)

---

*最后更新：2026-05-27*
