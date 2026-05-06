# Day 4: 语音转文字 (ASR) | Speech-to-Text (ASR)

## 学习目标 | Learning Objectives

- 理解自动语音识别 (ASR) 的基本原理
- 掌握 OpenAI Whisper 模型的使用方法
- 实现中文语音识别功能
- 理解不同模型规模和准确率的关系

> Understand the basic principles of Automatic Speech Recognition (ASR); master the use of OpenAI Whisper model; implement Chinese speech recognition; understand the relationship between different model sizes and accuracy.

## 前置准备检查 | Prerequisites Check

- [ ] 已完成 Day 3 音频录制练习
- [ ] 有至少一段测试音频文件
- [ ] 树莓派有足够磁盘空间（至少 2GB）

---

## 为什么学这个 | Why Learn This

**真实世界应用：** 语音识别是所有语音助手的核心技术。当你对 Siri 说"设置闹钟"时，首先要做的就是将语音转换为文字。Whisper 是目前最准确的开源语音识别模型之一，支持多种语言。

> **Real-world application:** Speech recognition is the core technology of all voice assistants. When you say "set an alarm" to Siri, the first step is converting speech to text. Whisper is currently one of the most accurate open-source speech recognition models, supporting multiple languages.

---

## 任务一：安装 Whisper | Task 1: Install Whisper

### 步骤 1：系统依赖安装

Whisper 需要 ffmpeg 来处理音频文件：

```bash
# 安装 ffmpeg
sudo apt update
sudo apt install ffmpeg -y

# 验证安装
ffmpeg -version
```

### 步骤 2：安装 Whisper

```bash
# 确保虚拟环境已激活
source ~/smart-speaker/venv/bin/activate

# 安装 Whisper
pip install openai-whisper

# 验证安装
python -c "import whisper; print(f'Whisper 版本: {whisper.__version__}')"
```

### 步骤 3：了解 Whisper 模型

Whisper 有多种模型规模：

| 模型 | 参数量 | 内存需求 | 速度 | 准确率 | 适用场景 |
|------|--------|----------|------|--------|----------|
| **tiny** | 39M | ~1GB | 最快 | 较低 | 树莓派、实时应用 |
| **base** | 74M | ~1GB | 快 | 中等 | 平衡选择 |
| **small** | 244M | ~2GB | 中等 | 较高 | 一般应用 |
| **medium** | 769M | ~5GB | 慢 | 高 | 高准确率需求 |
| **large** | 1550M | ~10GB | 很慢 | 最高 | 服务器使用 |

**本项目推荐：** 树莓派 4 使用 `tiny` 或 `base` 模型

### 预期结果 | Expected Result

- ffmpeg 成功安装
- Whisper 成功安装并导入
- 理解不同模型的权衡

### 常见问题 | Common Issues

**Q: 安装时间很长？**
A: Whisper 需要下载 PyTorch，首次安装可能需要 10-20 分钟。

**Q: 内存不足？**
A: 确保使用 `tiny` 模型，它只需要约 1GB 内存。

---

## 任务二：基础语音识别 | Task 2: Basic Speech Recognition

### 步骤 1：创建 Whisper 封装模块

创建文件 `src/stt.py`：

```python
"""
语音转文字模块 (Speech-to-Text)
使用 OpenAI Whisper 进行语音识别
"""
import whisper
import os
import torch

class SpeechToText:
    """语音识别器"""

    def __init__(self, model_size="tiny", language="zh"):
        """
        初始化识别器

        Args:
            model_size: 模型大小 (tiny/base/small/medium/large)
            language: 语言代码 (zh=中文, en=英文)
        """
        self.model_size = model_size
        self.language = language
        self.model = None

    def load_model(self):
        """加载 Whisper 模型"""
        try:
            print(f"正在加载 Whisper {self.model_size} 模型...")
            # 检查是否有 GPU（树莓派通常没有）
            device = "cuda" if torch.cuda.is_available() else "cpu"
            print(f"使用设备: {device}")

            # 加载模型
            self.model = whisper.load_model(self.model_size, device=device)
            print(f"✓ 模型加载成功")

            return True

        except Exception as e:
            print(f"✗ 模型加载失败: {e}")
            return False

    def transcribe(self, audio_path):
        """
        转录音频文件

        Args:
            audio_path: 音频文件路径

        Returns:
            识别的文字内容
        """
        if not self.model:
            if not self.load_model():
                return None

        try:
            # 检查文件是否存在
            if not os.path.exists(audio_path):
                print(f"错误: 音频文件不存在: {audio_path}")
                return None

            print(f"正在识别: {audio_path}")

            # 转录音频
            result = self.model.transcribe(
                audio_path,
                language=self.language,
                fp16=False  # 树莓派不支持 FP16
            )

            text = result["text"].strip()
            print(f"识别结果: {text}")

            return text

        except Exception as e:
            print(f"识别出错: {e}")
            return None

    def transcribe_with_timestamp(self, audio_path):
        """
        转录音频并返回时间戳

        Args:
            audio_path: 音频文件路径

        Returns:
            包含文字和时间戳的字典
        """
        if not self.model:
            if not self.load_model():
                return None

        try:
            result = self.model.transcribe(
                audio_path,
                language=self.language,
                fp16=False
            )

            return {
                "text": result["text"].strip(),
                "segments": result["segments"],
                "language": result["language"]
            }

        except Exception as e:
            print(f"识别出错: {e}")
            return None

# 便捷函数
def transcribe_audio(audio_path, model_size="tiny", language="zh"):
    """
    便捷的语音识别函数

    Args:
        audio_path: 音频文件路径
        model_size: 模型大小
        language: 语言代码

    Returns:
        识别的文字
    """
    stt = SpeechToText(model_size, language)
    return stt.transcribe(audio_path)
```

### 步骤 2：测试语音识别

创建文件 `src/test_stt.py`：

```python
"""
测试语音识别
"""
from stt import SpeechToText, transcribe_audio
import os

def test_basic_transcription():
    """测试基础语音识别"""
    print("=== 语音识别测试 ===\n")

    # 检查测试音频文件
    audio_file = "recordings/test_01.wav"

    if not os.path.exists(audio_file):
        print(f"错误: 找不到测试音频文件: {audio_file}")
        print("请先运行 Day 3 的录音程序")
        return

    # 方法 1：使用便捷函数
    print("方法 1: 使用便捷函数")
    text = transcribe_audio(audio_file, model_size="tiny", language="zh")
    print(f"结果: {text}\n")

    # 方法 2：使用类实例
    print("方法 2: 使用类实例")
    stt = SpeechToText(model_size="tiny", language="zh")

    if stt.load_model():
        result = stt.transcribe(audio_file)
        if result:
            print(f"识别成功: {result}")

        # 测试带时间戳的识别
        print("\n带时间戳的识别:")
        detailed = stt.transcribe_with_timestamp(audio_file)
        if detailed:
            print(f"完整文本: {detailed['text']}")
            print(f"检测语言: {detailed['language']}")
            print("\n分段详情:")
            for i, segment in enumerate(detailed['segments']):
                start = segment['start']
                end = segment['end']
                text = segment['text']
                print(f"  [{start:.1f}s - {end:.1f}s]: {text}")

def test_accuracy():
    """测试识别准确率"""
    print("\n\n=== 准确率测试 ===\n")

    # 准备测试音频（需要手动录制）
    test_phrases = [
        "recordings/test_hello.wav",      # 内容: "你好"
        "recordings/test_weather.wav",    # 内容: "今天天气怎么样"
        "recordings/test_music.wav",      # 内容: "播放音乐"
    ]

    stt = SpeechToText(model_size="tiny", language="zh")

    if not stt.load_model():
        return

    for audio_file in test_phrases:
        if os.path.exists(audio_file):
            print(f"\n测试文件: {audio_file}")
            result = stt.transcribe(audio_file)
            print(f"识别结果: {result}")
        else:
            print(f"\n跳过: {audio_file} (不存在)")

if __name__ == "__main__":
    test_basic_transcription()
    # test_accuracy()  # 可选：需要准备特定测试音频
```

运行测试：
```bash
python src/test_stt.py
```

### 预期结果 | Expected Result

- Whisper 模型首次下载需要几分钟
- 识别出音频中的中文内容
- 显示识别的文字和置信度

### 常见问题 | Common Issues

**Q: 模型下载很慢？**
A: 首次运行需要下载模型，可以使用国内镜像加速。

**Q: 识别结果不准确？**
A: 尝试：
1. 使用更大的模型（base/small）
2. 确保录音环境安静
3. 说话清晰，不要太快

---

## 任务三：实时语音识别 | Task 3: Real-time Speech Recognition

### 步骤 1：创建实时识别器

创建文件 `src/realtime_stt.py`：

```python
"""
实时语音识别
"""
from stt import SpeechToText
from audio_recorder import AudioRecorder
import os
import time

class RealtimeSTT:
    """实时语音识别"""

    def __init__(self, model_size="tiny", language="zh"):
        """初始化"""
        self.stt = SpeechToText(model_size, language)
        self.recorder = AudioRecorder()
        self.temp_file = "temp_recording.wav"

    def listen_and_recognize(self, duration=5):
        """
        听取并识别语音

        Args:
            duration: 录音时长（秒）

        Returns:
            识别的文字
        """
        print(f"\n请说话（{duration}秒）...")

        # 录音
        frames = self.recorder.start_recording(duration)

        if not frames:
            return None

        # 保存临时文件
        self.recorder.save_recording(frames, self.temp_file)

        # 识别
        text = self.stt.transcribe(self.temp_file)

        # 清理临时文件
        if os.path.exists(self.temp_file):
            os.remove(self.temp_file)

        return text

    def continuous_listen(self, max_cycles=3):
        """
        连续监听模式

        Args:
            max_cycles: 最大循环次数
        """
        print("=== 连续监听模式 ===")
        print("按 Ctrl+C 退出\n")

        try:
            cycle = 0
            while cycle < max_cycles:
                cycle += 1
                print(f"\n--- 第 {cycle} 轮 ---")

                text = self.listen_and_recognize()

                if text:
                    print(f"你说: {text}")
                else:
                    print("未能识别到语音")

        except KeyboardInterrupt:
            print("\n\n监听已停止")

# 便捷函数
def listen_once(duration=5):
    """
    便捷的监听函数

    Args:
        duration: 监听时长（秒）

    Returns:
        识别的文字
    """
    realtime = RealtimeSTT(model_size="tiny", language="zh")
    return realtime.listen_and_recognize(duration)
```

### 步骤 2：测试实时识别

创建文件 `src/test_realtime_stt.py`：

```python
"""
测试实时语音识别
"""
from realtime_stt import listen_once, RealtimeSTT

def test_single_listen():
    """测试单次监听"""
    print("=== 单次监听测试 ===")
    print("请准备说话...\n")

    result = listen_once(duration=5)

    if result:
        print(f"\n识别成功: {result}")
    else:
        print("\n识别失败")

def test_continuous_listen():
    """测试连续监听"""
    print("=== 连续监听测试 ===")
    print("将会进行 3 轮监听\n")

    realtime = RealtimeSTT(model_size="tiny", language="zh")
    realtime.continuous_listen(max_cycles=3)

if __name__ == "__main__":
    # 选择测试模式
    print("选择测试模式:")
    print("1. 单次监听")
    print("2. 连续监听")

    choice = input("\n请选择 (1/2): ").strip()

    if choice == "1":
        test_single_listen()
    elif choice == "2":
        test_continuous_listen()
    else:
        print("无效选择")
```

运行测试：
```bash
python src/test_realtime_stt.py
```

### 预期结果 | Expected Result

- 能够实时录音并识别
- 连续监听模式工作正常
- 识别结果基本准确

### 常见问题 | Common Issues

**Q: 识别延迟很高？**
A: Whisper 本身不是实时模型，延迟是正常的。优化方法：
1. 使用更小的模型（tiny）
2. 减少录音时长
3. 使用专门的唤醒词检测

---

## 今日作业 | Today's Assignment

1. **完成所有练习**（必须）
   - 成功识别至少 5 段不同的语音
   - 记录识别准确率

2. **准确率测试**（必须）
   - 准备 10 个测试短语
   - 测试 Whisper 的识别准确率
   - 填写测试报告

3. **对比实验**（可选）
   - 对比 tiny 和 base 模型的准确率
   - 对比不同说话速度的识别效果

---

## 明日预告 | Preview of Tomorrow

明天我们将学习文字转语音（TTS）！你将让计算机"说话"，实现从文字到自然语音的转换。

> Tomorrow we learn Text-to-Speech (TTS)! You will make the computer "speak", converting text to natural speech.

---

## 参考资源 | References

- **Whisper GitHub**：https://github.com/openai/whisper
- **Whisper 论文**：https://arxiv.org/abs/2212.04356
- **PyTorch 树莓派安装**：https://pytorch.org/get-started/locally/

---

*预计完成时间：5-7 小时*
*Estimated completion time: 5-7 hours*
