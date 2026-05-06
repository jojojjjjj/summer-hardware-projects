# 接线指南 | Wiring Guide

本文档详细说明如何连接树莓派与各种外设。

> This document details how to connect the Raspberry Pi with various peripherals.

---

## 概述 | Overview

小智同学智能音箱的硬件连接非常简单，主要使用 USB 和 3.5mm 接口，无需焊接。

> The Xiao Zhi smart speaker hardware connection is very simple, mainly using USB and 3.5mm interfaces, no soldering required.

---

## 接口位置图 | Interface Location

```
树莓派 4B 接口布局：

┌─────────────────────────────────┐
│                                 │
│  [USB3]  [USB2]  [USB-C]        │
│                                 │
│  [以太网]  [USB1]  [USB0]        │
│                                 │
│         [GPIO]                  │
│                                 │
│     [HDMI0] [HDMI1]             │
│                                 │
│        [3.5mm] [CSI]            │
│                                 │
│      [MicroSD] [DSI]            │
│                                 │
└─────────────────────────────────┘
```

---

## 连接步骤 | Connection Steps

### 1. 关闭树莓派 | Shutdown Raspberry Pi

在连接任何硬件前，先关闭树莓派：

```bash
sudo shutdown now
```

**重要：** 热插拔可能损坏硬件！

---

### 2. 连接麦克风 | Connect Microphone

**位置：** 任意 USB 接口（推荐 USB0 或 USB1）

**步骤：**
1. 将 USB 麦克风插入黑色 USB 接口
2. 确保插入牢固
3. 麦克风线不要遮挡其他接口

**验证：**
```bash
# 启动后检查
lsusb
# 应该能看到麦克风设备

# 检查音频设备
arecord -l
# 应该能看到录音设备
```

---

### 3. 连接喇叭 | Connect Speaker

**位置：** 3.5mm 音频接口（板载）

**步骤：**
1. 将 3.5mm 音频线插入 3.5mm 接口
2. 另一端连接到喇叭
3. 确保连接牢固

**验证：**
```bash
# 测试播放
speaker-test -t wav -c 2
# 应该能听到测试音

# 播放系统音效
aplay /usr/share/sounds/alsa/Front_Center.wav
```

---

### 4. 连接电源 | Connect Power

**位置：** USB-C 电源接口

**步骤：**
1. 使用 5V 3A USB-C 电源
2. 最后连接电源（红色 LED 亮起）
3. 等待树莓派启动

**电源指示：**
- 红色 LED 常亮：电源正常
- 红色 LED 闪烁：电源不足
- 绿色 LED 闪烁：SD 卡访问

---

## 完整连接图 | Complete Connection Diagram

```
                    [USB 麦克风]
                         │
                         │ USB 线
                         ↓
┌─────────────────────────────────┐
│                                 │
│  [USB3]  [USB2]  [USB-C]        │
│                                 │
│  [以太网]  [USB1]  [USB0] ◄─────┘
│                                 │
│         [GPIO]                  │
│                                 │
│     [HDMI0] [HDMI1]             │
│                                 ││
│        [3.5mm] ◄────────────────┘
│                                 │
│      [MicroSD] [DSI]            │
│                                 │
└─────────────────────────────────┘
         │
         │ USB-C 电源线
         ↓
    [电源适配器]
         │
         ↓
      [电源插座]
```

---

## 音频配置 | Audio Configuration

### 设置默认输出设备

```bash
# 方法 1: 使用 raspi-config
sudo raspi-config
# 选择: System Options → Audio → Force 3.5mm jack

# 方法 2: 使用 amixer
amixer cset numid=3 1
# 1 = 3.5mm jack
# 2 = HDMI
```

### 调整音量

```bash
# 设置音量 (0-100)
amixer set Master 80%

# 静音/取消静音
amixer set Master toggle
```

### 测试音频

```bash
# 测试播放
speaker-test -t wav -c 2

# 测试录音
arecord -d 5 -f cd test.wav
aplay test.wav
```

---

## 可选连接 | Optional Connections

### LED 指示灯 | Status LED

**GPIO 引脚：** GPIO 17（输出）

**连接：**
- LED 正极 → GPIO 17（通过 220Ω 电阻）
- LED 负极 → GND

**代码：**
```python
import RPi.GPIO as GPIO

GPIO.setup(17, GPIO.OUT)
GPIO.output(17, GPIO.HIGH)  # 点亮
```

### 按钮 | Button

**GPIO 引脚：** GPIO 27（输入）

**连接：**
- 按钮一端 → GPIO 27
- 按钮另一端 → GND

**代码：**
```python
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)
if GPIO.input(27) == GPIO.LOW:
    print("按钮被按下")
```

---

## 故障排除 | Troubleshooting

### 问题 1：麦克风无声

**检查：**
```bash
# 查看音频设备
arecord -l

# 如果没有设备，尝试：
sudo apt install alsa-utils
arecord -l
```

**解决：**
- 检查 USB 连接
- 尝试其他 USB 接口
- 测试麦克风是否工作

### 问题 2：喇叭无声

**检查：**
```bash
# 检查音量
amixer get Master

# 设置音量
amixer set Master 80%

# 检查输出设备
sudo raspi-config
```

**解决：**
- 检查 3.5mm 连接
- 确认音频输出设置为 3.5mm
- 测试喇叭是否工作

### 问题 3：电源问题

**检查：**
- 红色 LED 是否亮起
- 是否使用 3A 电源
- USB 设备是否过多

**解决：**
- 使用官方电源
- 减少外设数量
- 检查电源线质量

---

## 安全注意事项 | Safety Notes

1. **不要热插拔** - 连接/断开硬件前先关机
2. **使用合适电源** - 必须使用 5V 3A 电源
3. **防静电** - 触摸组件前先放电
4. **避免短路** - 确保接线正确

---

*最后更新：2026-05-06*
