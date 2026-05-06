# Day 10: 硬件组装 | Hardware Assembly

## 学习目标 | Learning Objectives

- 完成树莓派与外设的物理连接
- 制作或安装外壳
- 进行系统集成测试
- 解决硬件兼容性问题

> Complete physical connection of Raspberry Pi with peripherals; fabricate or install enclosure; perform system integration testing; resolve hardware compatibility issues.

## 前置准备检查 | Prerequisites Check

- [ ] 所有硬件组件齐全
- [ ] 软件功能测试通过
- [ ] 准备好组装工具

---

## 为什么学这个 | Why Learn This

**真实世界应用：** 硬件组装是 IoT 项目的关键环节。好的硬件设计不仅美观，还能影响设备性能和用户体验。

> **Real-world application:** Hardware assembly is a key step in IoT projects. Good hardware design not only looks good but also affects device performance and user experience.

---

## 任务一：硬件连接 | Task 1: Hardware Connection

### 步骤 1：检查硬件清单

确保你有以下组件：

| 组件 | 数量 | 状态 |
|------|------|------|
| Raspberry Pi 4 | 1 | ☐ |
| USB 麦克风 | 1 | ☐ |
| 3.5mm 喇叭 | 1 | ☐ |
| MicroSD 卡（已烧录系统） | 1 | ☐ |
| USB-C 电源线 | 1 | ☐ |
| 外壳（可选） | 1 | ☐ |

### 步骤 2：连接外设

按照以下顺序连接：

1. **关闭树莓派**
   ```bash
   sudo shutdown now
   ```

2. **连接音频设备**
   - 将 USB 麦克风插入任意 USB 接口
   - 将 3.5mm 喇叭插入 3.5mm 音频接口

3. **连接电源**
   - 最后连接 USB-C 电源

4. **启动设备**
   - 等待树莓派启动

### 步骤 3：验证硬件连接

创建文件 `src/verify_hardware.py`：

```python
"""
硬件验证脚本
"""
import sounddevice as sd
import subprocess
import os

def check_microphone():
    """检查麦克风"""
    print("=== 麦克风检查 ===")

    devices = sd.query_devices()
    mic_found = False

    for i, device in enumerate(devices):
        if device['max_input_channels'] > 0:
            print(f"✓ 找到麦克风: {device['name']}")
            mic_found = True

    if not mic_found:
        print("✗ 未找到麦克风")

    return mic_found

def check_speaker():
    """检查扬声器"""
    print("\n=== 扬声器检查 ===")

    # 播放测试音
    print("正在播放测试音...")
    os.system("aplay /usr/share/sounds/alsa/Front_Center.wav")

    response = input("\n是否听到测试音？(y/n): ").strip().lower()

    if response == 'y':
        print("✓ 扬声器工作正常")
        return True
    else:
        print("✗ 扬声器可能有问题")
        return False

def check_audio_routing():
    """检查音频路由"""
    print("\n=== 音频路由检查 ===")

    # 检查默认设备
    print(f"默认输入设备: {sd.default.device[0]}")
    print(f"默认输出设备: {sd.default.device[1]}")

    return True

def run_hardware_check():
    """运行完整硬件检查"""
    print("硬件验证程序")
    print("=" * 50)

    checks = [
        check_microphone,
        check_speaker,
        check_audio_routing
    ]

    results = [check() for check in checks]

    print("\n" + "=" * 50)
    if all(results):
        print("✓ 所有硬件检查通过")
    else:
        print("✗ 部分硬件检查失败")

if __name__ == "__main__":
    run_hardware_check()
```

---

## 任务二：制作外壳 | Task 2: Build Enclosure

### 选项 A：纸盒 DIY（简单）

材料：
- 硬纸盒
- 剪刀/美工刀
- 胶带

步骤：
1. 找一个合适大小的硬纸盒
2. 在侧面开孔（麦克风孔、喇叭孔、USB 接口孔）
3. 将树莓派放入
4. 固定位置

### 选项 B：3D 打印外壳（高级）

如果有 3D 打印机：
1. 下载树莓派外壳模型
   - Thingiverse: https://www.thingiverse.com/search?q=raspberry%20pi%204%20case
2. 打印外壳
3. 组装

### 选项 C：购买现成外壳

最简单的选择：
- 淘宝搜索"树莓派 4 外壳"
- 选择带风扇的版本
- 价格约 20-50 元

---

## 任务三：音频优化 | Task 3: Audio Optimization

### 步骤 1：调整系统音量

```bash
# 安装音量控制工具
sudo apt install alsa-utils -y

# 设置音量（0-100）
amixer set Master 80%

# 测试音量
speaker-test -t wav -c 2
```

### 步骤 2：配置音频输出

```bash
# 打开配置
sudo raspi-config

# 选择：System Options → Audio
# 选择：3.5mm jack
```

### 步骤 3：麦克风增益调整

```bash
# 查看麦克风配置
arecord -l

# 如果需要，调整麦克风增益
# （某些 USB 麦克风支持）
```

---

## 任务四：系统集成测试 | Task 4: System Integration Test

### 步骤 1：创建测试脚本

创建文件 `src/integration_test.py`：

```python
"""
系统集成测试
"""
import os
import time
from stt import SpeechToText
from chat import ChatBot
from tts import TextToSpeech

def test_stt():
    """测试语音识别"""
    print("=== 测试语音识别 ===")
    print("请说话...")

    from audio_recorder import record_audio

    temp_file = "temp_test.wav"
    record_audio(temp_file, duration=3)

    stt = SpeechToText()
    result = stt.transcribe(temp_file)

    if result:
        print(f"✓ 识别成功: {result}")
        return True
    else:
        print("✗ 识别失败")
        return False

def test_tts():
    """测试语音合成"""
    print("\n=== 测试语音合成 ===")

    tts = TextToSpeech()
    tts.speak("硬件测试成功")

    response = input("\n是否听到语音？(y/n): ").strip().lower()

    if response == 'y':
        print("✓ TTS 正常")
        return True
    else:
        print("✗ TTS 可能有问题")
        return False

def test_conversation():
    """测试完整对话"""
    print("\n=== 测试完整对话 ===")

    # 加载配置
    import yaml
    with open('config.yaml', 'r') as f:
        config = yaml.safe_load(f)

    # 创建对话机器人
    chat = ChatBot(api_key=config['api']['api_key'])

    # 测试问题
    test_question = "你好"

    response = chat.chat(test_question)

    if response:
        print(f"✓ 对话成功: {response}")
        return True
    else:
        print("✗ 对话失败")
        return False

def test_full_loop():
    """测试完整循环"""
    print("\n=== 测试完整循环 ===")
    print("准备进行完整对话测试...")

    # 这里会调用主程序的完整对话功能
    from main import SmartSpeaker

    import yaml
    with open('config.yaml', 'r') as f:
        config = yaml.safe_load(f)

    speaker = SmartSpeaker(config)

    print("开始测试...")
    speaker.run_once()

    return True

def run_integration_test():
    """运行集成测试"""
    print("系统集成测试")
    print("=" * 50)
    print()

    tests = [
        ("语音识别", test_stt),
        ("语音合成", test_tts),
        ("AI 对话", test_conversation),
        ("完整循环", test_full_loop)
    ]

    results = {}

    for name, test_func in tests:
        print(f"\n开始测试: {name}")
        try:
            results[name] = test_func()
        except Exception as e:
            print(f"✗ 测试出错: {e}")
            results[name] = False

        time.sleep(1)

    # 打印总结
    print("\n" + "=" * 50)
    print("测试总结")
    print("=" * 50)

    for name, passed in results.items():
        status = "✓ 通过" if passed else "✗ 失败"
        print(f"{name}: {status}")

    all_passed = all(results.values())

    print("\n" + "=" * 50)
    if all_passed:
        print("✓ 所有测试通过！硬件组装完成")
    else:
        print("✗ 部分测试失败，需要调试")

    return all_passed

if __name__ == "__main__":
    run_integration_test()
```

---

## 今日作业 | Today's Assignment

1. **完成硬件组装**（必须）
   - 连接所有外设
   - 制作/安装外壳
   - 拍照记录

2. **集成测试**（必须）
   - 运行完整测试
   - 记录测试结果
   - 修复发现的问题

3. **优化任务**（可选）
   - 优化音质
   - 美化外壳
   - 添加 LED 指示灯

---

## 明日预告 | Preview of Tomorrow

明天我们将添加更多功能！比如天气查询、音乐播放、时间提醒等，让小智同学更加实用。

> Tomorrow we will add more features! Like weather queries, music playback, time reminders, making Xiao Zhi more practical.

---

## 参考资源 | References

- **树莓派硬件文档**：https://www.raspberrypi.com/documentation/computers/hardware.html
- **ALSA 音频配置**：https://www.alsa-project.org/wiki/Main_Page

---

*预计完成时间：5-7 小时*
*Estimated completion time: 5-7 hours*
