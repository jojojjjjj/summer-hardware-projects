# 组装步骤 | Assembly Steps

> **手势互动装置项目** - 硬件组装指南
>
> **Gesture Interactive Installation Project** - Hardware Assembly Guide

---

## 基础组装（树莓派）| Basic Assembly (Raspberry Pi)

### 步骤1: 安装系统 (15分钟)

1. 下载Raspberry Pi Imager
2. 准备32GB+ Micro SD卡
3. 写入Raspberry Pi OS
4. 首次启动并更新系统

### 步骤2: 连接基础设备 (10分钟)

1. 插入SD卡
2. 连接HDMI显示器
3. 连接USB键盘鼠标
4. 插入USB摄像头
5. 连接电源启动

### 步骤3: 安装项目依赖 (20分钟)

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Python依赖
sudo apt install -y python3-opencv python3-numpy

# 安装MediaPipe
pip3 install mediapipe

# 克隆项目
git clone <your-repo>
cd project-03-gesture-cv
```

---

## LED灯带组装 | LED Strip Assembly

### 步骤1: 准备材料

- WS2812B灯带 1米
- 杜邦线3根（母对母）
- 面包板（可选）

### 步骤2: 连接线路

1. 红线: 5V引脚 → VCC
2. 黑线: GND引脚 → GND  
3. 绿线: GPIO18 → DI

### 步骤3: 测试LED

```python
# 测试代码
import board
import neopixel
pixels = neopixel.NeoPixel(board.D18, 30)
pixels.fill((255, 0, 0))
pixels.show()
```

---

## 舵机组装 | Servo Assembly

### 步骤1: 安装舵机臂

1. 将舵机臂对准舵机轴
2. 轻轻推入到位
3. 用螺丝固定

### 步骤2: 连接线路

1. 橙线 → GPIO17
2. 棕线 → GND
3. 红线 → 5V

### 步骤3: 测试舵机

```python
from gpiozero import Servo
servo = Servo(17)
servo.mid()
```

---

## 外壳安装 | Case Installation (可选)

### 选项1: 3D打印外壳

1. 下载树莓派外壳STL文件
2. 使用3D打印机打印
3. 组装外壳

### 选项2: 购买成品外壳

1. 亚克力外壳
2. 官方树莓派外壳
3. 散热一体式外壳

---

## 最终测试 | Final Testing

### 测试清单

- [ ] 摄像头工作正常
- [ ] LED灯带可控制
- [ ] 舵机可控制
- [ ] 手势识别运行正常
- [ ] 散热良好

### 运行完整测试

```bash
cd software/src
python3 main.py
```

---

**组装完成！** 准备开始你的项目吧！

> **Assembly Complete!** Ready to start your project!
