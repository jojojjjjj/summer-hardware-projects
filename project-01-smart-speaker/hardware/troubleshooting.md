# 硬件故障排除 | Hardware Troubleshooting

本文档帮助诊断和解决硬件相关问题。

> This document helps diagnose and resolve hardware-related issues.

---

## 诊断流程 | Diagnostic Process

### 第 1 步：基础检查

```bash
# 1. 检查树莓派是否启动
# 查看红色 LED（电源）和绿色 LED（SD 卡活动）

# 2. 检查系统日志
dmesg | tail -50

# 3. 检查 USB 设备
lsusb

# 4. 检查音频设备
aplay -l
arecord -l
```

---

## 常见问题 | Common Issues

### 问题 1：树莓派无法启动

#### 症状
- 红色 LED 不亮
- 绿色 LED 不闪烁
- 显示器无信号

#### 可能原因 | Possible Causes
1. 电源问题
2. SD 卡问题
3. 显示器连接问题

#### 解决方法 | Solutions

**检查电源：**
```bash
# 确认使用 5V 3A 电源
# 检查红色 LED 是否亮起
# 如果红色 LED 闪烁，电源不足

# 解决：
# 1. 更换电源
# 2. 减少外设数量
# 3. 检查电源线质量
```

**检查 SD 卡：**
```bash
# 在电脑上检查 SD 卡
# 尝试重新烧录系统

# 如果 SD 卡损坏：
# 1. 使用新的 SD 卡
# 2. 使用可靠的烧录软件
```

**检查显示器：**
```bash
# 确认 HDMI 线连接牢固
# 尝试另一个 HDMI 接口
# 检查显示器输入设置

# 如果仍无显示：
# 1. 使用 SSH 远程连接
# 2. 使用串口控制台
```

---

### 问题 2：麦克风无法工作

#### 症状
- 无法录制音频
- 录音文件为空或有杂音
- 系统无法识别麦克风

#### 诊断 | Diagnose

```bash
# 1. 检查 USB 设备
lsusb
# 应该能看到麦克风设备

# 2. 检查录音设备
arecord -l
# 应该能看到录音设备

# 3. 测试录音
arecord -d 5 -f cd test.wav
aplay test.wav

# 4. 检查默认输入设备
cat ~/.asoundrc
```

#### 解决方法 | Solutions

**如果设备未识别：**
```bash
# 1. 尝试其他 USB 接口
# 2. 检查 USB 麦克风是否在其他设备上工作
# 3. 尝试其他麦克风

# 如果 USB 设备被识别但不可用：
sudo modprobe snd-usb-audio
```

**如果录音有杂音：**
```bash
# 1. 调整麦克风增益
alsamixer

# 2. 尝试不同采样率
arecord -f S16_LE -r 16000 -c 1 test.wav

# 3. 使用更好的麦克风
```

**如果录音音量太小：**
```bash
# 使用 alsamixer 调整增益
alsamixer

# 选择录音设备 (F6)
# 调整增益 (上下键)
```

---

### 问题 3：喇叭没有声音

#### 症状
- 播放音频无声音
- 音量太小
- 音质差

#### 诊断 | Diagnose

```bash
# 1. 检查播放设备
aplay -l

# 2. 检查音量
amixer get Master

# 3. 测试播放
speaker-test -t wav -c 2

# 4. 检查音频输出设置
sudo raspi-config
# System Options → Audio
```

#### 解决方法 | Solutions

**如果完全无声：**
```bash
# 1. 设置音频输出到 3.5mm
sudo raspi-config
# System Options → Audio → Force 3.5mm jack

# 2. 调整音量
amixer set Master 80%

# 3. 取消静音
amixer set Master unmute

# 4. 测试喇叭（在其他设备上）
```

**如果音量太小：**
```bash
# 1. 增加系统音量
amixer set Master 100%

# 2. 增加 PCM 音量
amixer set PCM 100%

# 3. 使用更强大的喇叭
```

**如果音质差：**
```bash
# 1. 调整采样率
# 使用 44100Hz 而不是 48000Hz

# 2. 检查喇叭质量
# 尝试另一个喇叭

# 3. 检查音频线
# 更换音频线
```

---

### 问题 4：系统不稳定

#### 症状
- 频繁死机
- 随机重启
- 程序崩溃

#### 诊断 | Diagnose

```bash
# 1. 检查温度
vcgencmd measure_temp
# 应该低于 70°C

# 2. 检查内存使用
free -h

# 3. 检查 CPU 使用
top

# 4. 查看系统日志
dmesg | tail -100
journalctl -n 100
```

#### 解决方法 | Solutions

**如果过热：**
```bash
# 1. 安装散热片
# 2. 安装风扇
# 3. 改善通风
# 4. 降低 CPU 频率
sudo raspi-config
# Performance Options → GPU Memory
```

**如果内存不足：**
```bash
# 1. 减少运行程序
# 2. 增加交换空间
sudo dphys-swapfile swapoff
sudo nano /etc/dphys-swapfile
# CONF_SWAPSIZE=1024
sudo dphys-swapfile setup
sudo dphys-swapfile swapon

# 3. 升级到更大内存的树莓派
```

**如果程序崩溃：**
```bash
# 1. 检查错误日志
python your_program.py 2>&1 | tee error.log

# 2. 增加错误处理
# try-except 块

# 3. 检查依赖版本
pip list
```

---

### 问题 5：网络问题

#### 症状
- 无法连接 Wi-Fi
- API 调用失败
- 下载速度慢

#### 解决方法 | Solutions

```bash
# 1. 检查网络连接
ping -c 4 8.8.8.8

# 2. 检查 DNS
nslookup google.com

# 3. 配置 Wi-Fi
sudo raspi-config
# Network Options → Wi-Fi

# 4. 使用国内镜像
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package-name
```

---

## 硬件测试脚本 | Hardware Test Script

创建 `test_hardware.sh`：

```bash
#!/bin/bash

echo "=== 硬件诊断脚本 ==="

echo -e "\n1. 检查 USB 设备："
lsusb

echo -e "\n2. 检查音频设备："
echo "播放设备："
aplay -l
echo "录音设备："
arecord -l

echo -e "\n3. 检查温度："
vcgencmd measure_temp

echo -e "\n4. 检查内存："
free -h

echo -e "\n5. 检查磁盘："
df -h

echo -e "\n6. 检查网络："
ping -c 2 8.8.8.8

echo -e "\n=== 诊断完成 ==="
```

使用方法：
```bash
chmod +x test_hardware.sh
./test_hardware.sh
```

---

## 获取帮助 | Getting Help

如果以上方法都无法解决问题：

1. **查看官方文档：**
   - 树莓派官方论坛
   - 树莓派官方文档

2. **搜索错误信息：**
   - Google 搜索错误日志
   - GitHub Issues

3. **寻求帮助：**
   - 课程论坛
   - 技术支持

---

*最后更新：2026-05-06*
