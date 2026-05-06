# Day 5: 文字转语音 (TTS) | Text-to-Speech (TTS)

## 学习目标 | Learning Objectives

- 理解文字转语音 (TTS) 的基本原理
- 掌握 Edge TTS 的使用方法
- 实现高质量中文语音合成
- 调整语音参数（语速、音调、音量）

> Understand the basic principles of Text-to-Speech (TTS); master the use of Edge TTS; implement high-quality Chinese speech synthesis; adjust voice parameters (speed, pitch, volume).

## 前置准备检查 | Prerequisites Check

- [ ] 已完成 Day 4 语音识别练习
- [ ] 虚拟环境已激活
- [ ] 树莓派已连接扬声器

---

## 为什么学这个 | Why Learn This

**真实世界应用：** TTS 技术让机器能够"说话"。从 GPS 导航、屏幕阅读器到智能音箱，TTS 无处不在。Edge TTS 是微软提供的免费服务，音质接近真人语音。

> **Real-world application:** TTS technology enables machines to "speak". From GPS navigation and screen readers to smart speakers, TTS is everywhere. Edge TTS is a free service from Microsoft with near-human voice quality.

---

## 任务一：安装 Edge TTS | Task 1: Install Edge TTS

### 步骤 1：安装 Edge TTS

```bash
# 确保虚拟环境已激活
source ~/smart-speaker/venv/bin/activate

# 安装 Edge TTS
pip install edge-tts

# 验证安装
python -c "import edge_tts; print('Edge TTS 安装成功')"
```

### 步骤 2：了解可用语音

Edge TTS 提供多种语音：

```bash
# 列出所有中文语音
edge-tts --list-voices | grep zh
```

常用中文语音：
- `zh-CN-XiaoxiaoNeural` - 女声，年轻（推荐）
- `zh-CN-YunxiNeural` - 男声，年轻
- `zh-CN-YunyangNeural` - 男声，成熟
- `zh-CN-XiaoyiNeural` - 女声，温暖

### 预期结果 | Expected Result

- Edge TTS 成功安装
- 能够列出可用语音列表
- 理解语音命名规则

### 常见问题 | Common Issues

**Q: 列表命令不工作？**
A: 直接在 Python 中使用 edge_tts 模块，不依赖命令行。

---

## 任务二：基础语音合成 | Task 2: Basic Text-to-Speech

### 步骤 1：创建 TTS 模块

创建文件 `src/tts.py`：

```python
"""
文字转语音模块 (Text-to-Speech)
使用 Edge TTS 进行语音合成
"""
import edge_tts
import asyncio
import os
import pygame
from io import BytesIO

class TextToSpeech:
    """文字转语音器"""

    def __init__(self, voice="zh-CN-XiaoxiaoNeural", rate="+0%", volume="+0%"):
        """
        初始化 TTS

        Args:
            voice: 语音名称
            rate: 语速调整 (如 "+10%", "-20%")
            volume: 音量调整 (如 "+10%", "-20%")
        """
        self.voice = voice
        self.rate = rate
        self.volume = volume
        self.communicate = None

        # 初始化音频播放器
        pygame.mixer.init(frequency=16000, size=-16, channels=1, buffer=512)

    async def _synthesize(self, text, output_file=None):
        """
        异步合成语音

        Args:
            text: 要转换的文字
            output_file: 输出文件路径（可选）

        Returns:
            音频数据或文件路径
        """
        try:
            # 创建语音合成对象
            communicate = edge_tts.Communicate(
                text,
                self.voice,
                rate=self.rate,
                volume=self.volume
            )

            if output_file:
                # 保存到文件
                await communicate.save(output_file)
                return output_file
            else:
                # 返回音频数据
                audio_data = b""
                async for chunk in communicate.stream():
                    if chunk["type"] == "audio":
                        audio_data += chunk["data"]
                return audio_data

        except Exception as e:
            print(f"语音合成出错: {e}")
            return None

    def speak(self, text, output_file=None):
        """
        合成并播放语音

        Args:
            text: 要说的文字
            output_file: 可选的保存路径
        """
        try:
            # 合成语音
            print(f"正在合成: {text}")

            if output_file:
                # 保存到文件并播放
                asyncio.run(self._synthesize(text, output_file))

                # 使用 pygame 播放
                pygame.mixer.music.load(output_file)
                pygame.mixer.music.play()

                # 等待播放完成
                while pygame.mixer.music.get_busy():
                    pygame.time.Clock().tick(10)
            else:
                # 直接播放内存中的音频
                audio_data = asyncio.run(self._synthesize(text))

                if audio_data:
                    # 从内存播放
                    sound = pygame.mixer.Sound(BytesIO(audio_data))
                    sound.play()

                    # 等待播放完成
                    while pygame.mixer.get_busy():
                        pygame.time.Clock().tick(10)

            print("✓ 播放完成")

        except Exception as e:
            print(f"播放出错: {e}")

    def save_to_file(self, text, filename):
        """
        保存语音到文件

        Args:
            text: 要转换的文字
            filename: 保存路径
        """
        print(f"正在合成语音...")
        result = asyncio.run(self._synthesize(text, filename))

        if result and os.path.exists(filename):
            size = os.path.getsize(filename)
            print(f"✓ 语音已保存: {filename} ({size} 字节)")
            return True
        else:
            print("✗ 保存失败")
            return False

    def set_voice(self, voice_name):
        """设置语音"""
        self.voice = voice_name

    def set_rate(self, rate):
        """设置语速"""
        self.rate = rate

    def set_volume(self, volume):
        """设置音量"""
        self.volume = volume

# 便捷函数
def speak(text, voice="zh-CN-XiaoxiaoNeural"):
    """
    便捷的语音函数

    Args:
        text: 要说的文字
        voice: 语音名称
    """
    tts = TextToSpeech(voice=voice)
    tts.speak(text)

def save_speech(text, filename, voice="zh-CN-XiaoxiaoNeural"):
    """
    便捷的保存函数

    Args:
        text: 要转换的文字
        filename: 保存路径
        voice: 语音名称
    """
    tts = TextToSpeech(voice=voice)
    return tts.save_to_file(text, filename)
```

### 步骤 2：安装 pygame（用于音频播放）

```bash
pip install pygame
```

### 步骤 3：测试基础 TTS

创建文件 `src/test_tts.py`：

```python
"""
测试文字转语音
"""
from tts import TextToSpeech, speak, save_speech
import os

def test_basic_speak():
    """测试基础语音播放"""
    print("=== 基础语音测试 ===\n")

    # 测试 1: 使用便捷函数
    print("测试 1: 便捷函数")
    speak("你好，我是小智同学")
    print()

    # 测试 2: 使用类实例
    print("测试 2: 类实例")
    tts = TextToSpeech()
    tts.speak("今天天气真不错")
    print()

def test_different_voices():
    """测试不同语音"""
    print("=== 不同语音测试 ===\n")

    voices = [
        ("zh-CN-XiaoxiaoNeural", "女声 - 晓晓"),
        ("zh-CN-YunxiNeural", "男声 - 云希"),
    ]

    for voice, description in voices:
        print(f"测试: {description}")
        tts = TextToSpeech(voice=voice)
        tts.speak(f"我是{description}")
        print()

def test_parameters():
    """测试参数调整"""
    print("=== 参数调整测试 ===\n")

    tts = TextToSpeech()

    # 测试不同语速
    print("测试 1: 不同语速")
    tts.set_rate("-20%")
    tts.speak("这是慢速说话")

    tts.set_rate("+20%")
    tts.speak("这是快速说话")

    tts.set_rate("+0%")  # 恢复正常
    print()

def test_save_to_file():
    """测试保存到文件"""
    print("=== 保存到文件测试 ===\n")

    # 确保目录存在
    os.makedirs("tts_output", exist_ok=True)

    # 保存语音
    filename = "tts_output/test_hello.mp3"
    text = "你好，这是一个测试语音文件"

    if save_speech(text, filename):
        print(f"✓ 文件已创建: {filename}")
        print(f"  文件大小: {os.path.getsize(filename)} 字节")
    else:
        print("✗ 文件创建失败")

def test_multiple_sentences():
    """测试多句子朗读"""
    print("=== 多句子测试 ===\n")

    sentences = [
        "欢迎使用小智同学",
        "我可以听懂你的语音",
        "并回答你的问题"
    ]

    tts = TextToSpeech()

    for sentence in sentences:
        print(f"正在播放: {sentence}")
        tts.speak(sentence)
        print()

if __name__ == "__main__":
    # 运行所有测试
    test_basic_speak()

    print("\n按回车继续...")
    input()

    test_different_voices()

    print("\n按回车继续...")
    input()

    test_parameters()

    print("\n按回车继续...")
    input()

    test_save_to_file()
```

运行测试：
```bash
python src/test_tts.py
```

### 预期结果 | Expected Result

- 成功播放合成的中文语音
- 不同语音参数能够正常工作
- 文件保存功能正常

### 常见问题 | Common Issues

**Q: 播放没有声音？**
A: 检查系统音量设置，确保 pygame 正确初始化。

**Q: 语音合成很慢？**
A: Edge TTS 需要网络连接，首次调用可能较慢。

---

## 任务三：语音参数优化 | Task 3: Voice Parameter Optimization

### 步骤 1：创建参数测试脚本

创建文件 `src/test_tts_parameters.py`：

```python
"""
TTS 参数优化测试
"""
from tts import TextToSpeech

def test_speed_optimization():
    """测试语速优化"""
    print("=== 语速优化测试 ===\n")

    tts = TextToSpeech()
    test_text = "今天天气非常好，适合出去游玩"

    speeds = ["-30%", "-20%", "-10%", "+0%", "+10%", "+20%", "+30%"]

    for speed in speeds:
        print(f"\n语速: {speed}")
        tts.set_rate(speed)
        tts.speak(test_text)

def test_volume_optimization():
    """测试音量优化"""
    print("=== 音量优化测试 ===\n")

    tts = TextToSpeech()
    test_text = "这是音量测试"

    volumes = ["-20%", "+0%", "+20%"]

    for volume in volumes:
        print(f"\n音量: {volume}")
        tts.set_volume(volume)
        tts.speak(test_text)

def find_best_parameters():
    """寻找最佳参数"""
    print("=== 寻找最佳参数 ===\n")

    # 推荐配置
    configs = [
        {
            "name": "默认配置",
            "voice": "zh-CN-XiaoxiaoNeural",
            "rate": "+0%",
            "volume": "+0%"
        },
        {
            "name": "清晰配置",
            "voice": "zh-CN-XiaoxiaoNeural",
            "rate": "-10%",
            "volume": "+10%"
        },
        {
            "name": "快速配置",
            "voice": "zh-CN-XiaoxiaoNeural",
            "rate": "+20%",
            "volume": "+0%"
        },
        {
            "name": "男声配置",
            "voice": "zh-CN-YunxiNeural",
            "rate": "+0%",
            "volume": "+0%"
        }
    ]

    test_text = "小智同学很高兴为你服务"

    for config in configs:
        print(f"\n测试配置: {config['name']}")
        print(f"  语音: {config['voice']}")
        print(f"  语速: {config['rate']}")
        print(f"  音量: {config['volume']}")

        tts = TextToSpeech(
            voice=config['voice'],
            rate=config['rate'],
            volume=config['volume']
        )
        tts.speak(test_text)

        # 询问评分
        rating = input("  评分 (1-5, 或跳过): ").strip()
        if rating:
            print(f"  评分: {rating}/5")

if __name__ == "__main__":
    print("TTS 参数优化测试\n")

    print("选择测试类型:")
    print("1. 语速测试")
    print("2. 音量测试")
    print("3. 寻找最佳配置")

    choice = input("\n请选择 (1/2/3): ").strip()

    if choice == "1":
        test_speed_optimization()
    elif choice == "2":
        test_volume_optimization()
    elif choice == "3":
        find_best_parameters()
    else:
        print("无效选择")
```

### 预期结果 | Expected Result

- 理解不同参数对语音效果的影响
- 找到最适合的参数配置

---

## 今日作业 | Today's Assignment

1. **完成所有练习**（必须）
   - 测试至少 3 种不同语音
   - 测试不同语速和音量组合

2. **参数调优**（必须）
   - 找到你认为最佳的语音配置
   - 记录配置参数

3. **创意任务**（可选）
   - 用 TTS 创作一个简短的故事
   - 添加适当的语速和音量变化

---

## 明日预告 | Preview of Tomorrow

明天我们将学习如何调用大语言模型 API！这将让"小智同学"拥有真正的"智能"，能够理解和回答你的问题。

> Tomorrow we learn how to call Large Language Model APIs! This will give "Xiao Zhi" real "intelligence", enabling it to understand and answer your questions.

---

## 参考资源 | References

- **Edge TTS GitHub**：https://github.com/rany2/edge-tts
- **Pygame 文档**：https://www.pygame.org/docs/
- **Microsoft 语音服务**：https://speech.microsoft.com/

---

*预计完成时间：4-6 小时*
*Estimated completion time: 4-6 hours*
