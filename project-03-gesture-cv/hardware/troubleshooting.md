# 故障排查 | Troubleshooting

> **手势互动装置项目** - 常见问题解决方案
>
> **Gesture Interactive Installation Project** - Common Issues and Solutions

---

## 摄像头问题 | Camera Issues

### 问题: 摄像头无法打开

**症状:** `Cannot open camera` 错误

**解决方案:**
```bash
# 检查摄像头连接
lsusb

# 测试摄像头
libcamera-hello

# 或使用v4l2
v4l2-ctl --list-devices
```

### 问题: 画面卡顿

**解决方案:**
- 降低分辨率: 640x480
- 减少处理复杂度
- 关闭其他占用带宽的USB设备

---

## MediaPipe问题 | MediaPipe Issues

### 问题: MediaPipe安装失败

**解决方案:**
```bash
# 使用国内镜像
pip install mediapipe -i https://pypi.tuna.tsinghua.edu.cn/simple

# 或使用conda
conda install -c conda-forge mediapipe
```

### 问题: 手部检测不准确

**解决方案:**
- 提高光线条件
- 调整`min_detection_confidence`参数
- 确保手部完整在画面中

---

## LED灯带问题 | LED Strip Issues

### 问题: LED不亮

**检查:**
1. 电源连接是否正确
2. GPIO18是否启用
3. 数据线方向是否正确

**解决方案:**
```bash
# 测试GPIO
python3 -c "import board; print(board.D18)"
```

### 问题: LED颜色不对

**解决方案:**
- 检查RGB顺序 (可能是GRB)
- 调整代码中的颜色顺序

---

## 舵机问题 | Servo Issues

### 问题: 舵机抖动

**解决方案:**
- 检查电源是否充足
- 添加电容滤波
- 使用外部电源

### 问题: 舵机不转动

**检查:**
1. GPIO是否正确
2. PWM是否启用
3. 信号线连接

---

## 性能问题 | Performance Issues

### 问题: FPS过低

**优化方案:**
```python
# 降低分辨率
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# 减少处理频率
if frame_count % 2 == 0:
    process_frame()
```

### 问题: 内存占用高

**解决方案:**
- 及时释放资源
- 使用生成器而非列表
- 限制历史记录长度

---

## 树莓派问题 | Raspberry Pi Issues

### 问题: 系统启动慢

**解决方案:**
```bash
# 禁用不必要的服务
sudo systemctl disable bluetooth
sudo systemctl disable wpa_supplicant
```

### 问题: 过热

**解决方案:**
- 添加散热片/风扇
- 降低CPU频率
- 检查环境温度

---

## 获取帮助 | Getting Help

1. 查看项目Issues
2. 搜索MediaPipe文档
3. 询问课程助教
4. Stack Overflow搜索

---

**仍未解决？** 记录错误信息并寻求帮助！

> **Still stuck?** Document your error and seek help!
