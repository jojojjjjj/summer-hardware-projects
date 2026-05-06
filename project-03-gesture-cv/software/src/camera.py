"""
摄像头管理模块 | Camera Management Module

提供摄像头初始化、帧获取和资源管理功能。
Provides camera initialization, frame capture, and resource management.
"""

import cv2


class Camera:
    """摄像头管理类 | Camera Management Class"""

    def __init__(self, config):
        """
        初始化摄像头
        Initialize camera
        """
        self.device_id = config.get('device_id', 0)
        self.width = config.get('width', 1280)
        self.height = config.get('height', 720)
        self.fps = config.get('fps', 30)

        self.cap = cv2.VideoCapture(self.device_id)

        if not self.cap.isOpened():
            raise RuntimeError(f"无法打开摄像头 {self.device_id} | Cannot open camera {self.device_id}")

        # 设置分辨率
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.width)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.height)
        self.cap.set(cv2.CAP_PROP_FPS, self.fps)

    def read(self):
        """读取一帧 | Read one frame"""
        ret, frame = self.cap.read()
        return ret, frame

    def release(self):
        """释放摄像头 | Release camera"""
        if self.cap.isOpened():
            self.cap.release()
