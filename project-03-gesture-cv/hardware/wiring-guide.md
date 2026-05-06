# 接线指南 | Wiring Guide

> **手势互动装置项目** - 硬件连接说明
>
> **Gesture Interactive Installation Project** - Hardware Connection Guide

---

## 树莓派基础设置 | Raspberry Pi Basic Setup

### 1. 系统安装

1. 下载 Raspberry Pi Imager: https://www.raspberrypi.com/software/
2. 下载 Raspberry Pi OS (64-bit)
3. 使用Imager将系统写入SD卡
4. 首次启动完成初始设置

### 2. 启用摄像头

```bash
# 打开配置
sudo raspi-config

# 选择: Interface Options -> Legacy Camera
# 或: Interface Options -> Camera (新版)
```

### 3. 测试摄像头

```bash
# 测试命令
libcamera-hello

# 或使用Python测试
python3 -c "import cv2; cap=cv2.VideoCapture(0); print('Camera OK' if cap.isOpened() else 'Camera Failed')"
```

---

## LED灯带接线 | LED Strip Wiring

### WS2812B接线图

```
树莓派                    WS2812B灯带
--------                  ---------------
GPIO18 (PWM)  -------->  Data In (DI)
GND           -------->  GND
5V            -------->  VCC
```

### 接线步骤

1. **Data线连接** - GPIO18到灯带DI
2. **GND连接** - 任意GND引脚到灯带GND
3. **电源连接** - 5V引脚到灯带VCC

### 注意事项

- 使用限流电阻（可选，330Ω）
- 确保电源充足（每米LED约需1.8A）
- 首尾LED方向要一致

---

## 舵机接线 | Servo Wiring

### SG90舵机接线图

```
树莓派                    SG90舵机
--------                  ---------------
GPIO17 (PWM)  -------->  橙色/黄色信号线
GND           -------->  棕色/黑色GND
5V或3.3V      -------->  红色电源线
```

### 多舵机接线（使用驱动板）

使用PCA9685驱动板可控制多达16个舵机。

---

## 完整接线图 | Complete Wiring Diagram

```
                    树莓派 5
                +---------------+
                |               |
USB摄像头  ----> | USB 3.0       |
                |               |
                |  GPIOheader   |----> LED灯带
                |  (40pin)      |      |
                |               |----> 舵机
HDMI显示器 ----> | HDMI 0        |
                |               |
电源适配器 ----> | USB-C Power   |
                +---------------+
```

---

## Python硬件控制代码 | Hardware Control Code

### LED控制

```python
import board
import neopixel

# 初始化LED灯带
pixel_pin = board.D18
num_pixels = 30
pixels = neopixel.NeoPixel(pixel_pin, num_pixels, brightness=0.5)

# 设置颜色
pixels.fill((255, 0, 0))  # 红色
pixels.show()
```

### 舵机控制

```python
from gpiozero import Servo
from time import sleep

# 初始化舵机
servo = Servo(17)

# 移动舵机
servo.min()
sleep(1)
servo.mid()
sleep(1)
servo.max()
```

---

## 故障排查 | Troubleshooting

详见 [`troubleshooting.md`](troubleshooting.md)

---

**接线完成后，查看 [`assembly-steps.md`](assembly-steps.md) 了解组装步骤！**
