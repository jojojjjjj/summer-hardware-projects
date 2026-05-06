# Day 3: 音频基础 | Audio Fundamentals

## 学习目标 | Learning Objectives

- 理解数字音频的基本概念（采样、量化、编码）
- 掌握 PyAudio 库的基本使用方法
- 实现音频录制和播放功能
- 理解不同音频格式的特点和用途

> Understand basic concepts of digital audio (sampling, quantization, encoding); master basic usage of PyAudio library; implement audio recording and playback; understand characteristics and uses of different audio formats.

## 前置准备检查 | Prerequisites Check

- [ ] 已连接 USB 麦克风和喇叭
- [ ] 虚拟环境已激活
- [ ] 已完成 Day 2 的所有任务

---

## 为什么学这个 | Why Learn This

**真实世界应用：** 音频处理是语音助手的核心技术。无论是 Siri、Alexa 还是小爱同学，第一步都是将你的声音转换为数字信号。理解音频原理能帮助你优化语音识别的准确率和响应速度。

> **Real-world application:** Audio processing is the core technology of voice assistants. Whether it's Siri, Alexa, or Xiao Ai, the first step is converting your voice into digital signals. Understanding audio principles helps you optimize speech recognition accuracy and response speed.

---

## 任务一：理解数字音频 | Task 1: Understand Digital Audio

### 关键概念 | Key Concepts

**1. 声音的数字化**

声音是连续的模拟信号，计算机需要将其转换为数字信号：

```
模拟声音 → 采样 → 量化 → 编码 → 数字音频
```

**2. 采样率 (Sample Rate)**

每秒采集的样本数量，单位 Hz（赫兹）：

- **8000 Hz**: 电话音质，足够语音
- **16000 Hz**: 语音识别推荐（本项目使用）
- **44100 Hz**: CD 音质
- **48000 Hz**: 专业音频

**3. 位深度 (Bit Depth)**

每个样本的精度：

- **8-bit**: 256 个级别（音质差）
- **16-bit**: 65536 个级别（CD 标准）
- **24-bit**: 1670 万个级别（专业）

**4. 声道 (Channels)**

- **Mono (单声道)**: 1 个声道，节省空间
- **Stereo (立体声)**: 2 个声道，更好的听感

### 实践：查看音频信息

创建文件 `src/audio_info.py`：

```python
"""
音频信息查询
"""
import sounddevice as sd

def print_audio_info():
    """打印音频设备信息"""
    print("=== 音频设备信息 ===\n")

    # 列出所有音频设备
    devices = sd.query_devices()

    print("可用音频设备:")
    for i, device in enumerate(devices):
        print(f"\n设备 {i}:")
        print(f"  名称: {device['name']}")
        print(f"  输入通道: {device['max_input_channels']}")
        print(f"  输出通道: {device['max_output_channels']}")
        print(f"  默认采样率: {device['default_samplerate']}")

    # 获取默认设备
    print(f"\n默认输入设备: {sd.default.device[0]}")
    print(f"默认输出设备: {sd.default.device[1]}")

if __name__ == "__main__":
    print_audio_info()
```

运行：
```bash
python src/audio_info.py
```

### 预期结果 | Expected Result

- 看到系统中所有音频设备列表
- 找到你的 USB 麦克风（应该有输入通道）
- 找到你的喇叭（应该有输出通道）

### 常见问题 | Common Issues

**Q: 看不到麦克风？**
A: 检查麦克风是否插紧，尝试重新插拔。

**Q: 设备显示为 0 个通道？**
A: 可能是驱动问题，尝试重启树莓派。

---

## 任务二：录制音频 | Task 2: Record Audio

### 步骤 1：基础录音程序

创建文件 `src/audio_recorder.py`：

```python
"""
音频录制模块
实现音频录制功能
"""
import pyaudio
import wave
import time

class AudioRecorder:
    """音频录制器"""

    def __init__(self, config=None):
        """
        初始化录制器

        Args:
            config: 配置字典，包含采样率、声道等参数
        """
        # 默认配置
        self.config = config or {
            "sample_rate": 16000,      # 采样率
            "channels": 1,             # 单声道
            "chunk_size": 1024,        # 缓冲区大小
            "format": pyaudio.paInt16, # 16-bit PCM
            "input_device": None       # 默认输入设备
        }

        self.audio = pyaudio.PyAudio()
        self.stream = None
        self.is_recording = False

    def list_devices(self):
        """列出所有可用设备"""
        print("=== 可用音频设备 ===")
        for i in range(self.audio.get_device_count()):
            info = self.audio.get_device_info_by_index(i)
            print(f"设备 {i}: {info['name']}")
            print(f"  输入通道: {info['max_input_channels']}")
            print(f"  输出通道: {info['max_output_channels']}")
            print()

    def start_recording(self, duration=5):
        """
        开始录音

        Args:
            duration: 录音时长（秒）
        """
        try:
            # 打开音频流
            self.stream = self.audio.open(
                format=self.config["format"],
                channels=self.config["channels"],
                rate=self.config["sample_rate"],
                input=True,
                input_device_index=self.config["input_device"],
                frames_per_buffer=self.config["chunk_size"]
            )

            self.is_recording = True
            print(f"开始录音 {duration} 秒...")

            frames = []
            start_time = time.time()

            # 录音循环
            while self.is_recording and (time.time() - start_time) < duration:
                data = self.stream.read(self.config["chunk_size"])
                frames.append(data)

                # 显示进度
                elapsed = time.time() - start_time
                remaining = duration - elapsed
                print(f"\r剩余时间: {remaining:.1f} 秒", end="")

            print("\n录音完成！")
            return frames

        except Exception as e:
            print(f"\n录音出错: {e}")
            return None

    def stop_recording(self):
        """停止录音"""
        self.is_recording = False
        if self.stream:
            self.stream.stop_stream()
            self.stream.close()

    def save_recording(self, frames, filename):
        """
        保存录音为 WAV 文件

        Args:
            frames: 音频帧数据
            filename: 保存文件名
        """
        try:
            with wave.open(filename, 'wb') as wf:
                wf.setnchannels(self.config["channels"])
                wf.setsampwidth(self.audio.get_sample_size(self.config["format"]))
                wf.setframerate(self.config["sample_rate"])
                wf.writeframes(b''.join(frames))

            print(f"音频已保存到: {filename}")
            return True

        except Exception as e:
            print(f"保存失败: {e}")
            return False

    def cleanup(self):
        """清理资源"""
        self.stop_recording()
        self.audio.terminate()

# 便捷函数
def record_audio(filename, duration=5, sample_rate=16000):
    """
    便捷录音函数

    Args:
        filename: 保存文件名
        duration: 录音时长（秒）
        sample_rate: 采样率
    """
    recorder = AudioRecorder({"sample_rate": sample_rate})

    try:
        frames = recorder.start_recording(duration)
        if frames:
            recorder.save_recording(frames, filename)
    finally:
        recorder.cleanup()
```

### 步骤 2：测试录音

创建文件 `src/test_recorder.py`：

```python
"""
测试音频录制
"""
from audio_recorder import record_audio
import os

def test_basic_recording():
    """测试基础录音"""
    print("=== 音频录制测试 ===\n")

    # 确保输出目录存在
    os.makedirs("recordings", exist_ok=True)

    print("请准备说话...")
    print("录音内容建议：'你好，我是小智同学'\n")

    # 录制 5 秒音频
    filename = "recordings/test_01.wav"
    record_audio(filename, duration=5, sample_rate=16000)

    # 检查文件是否创建
    if os.path.exists(filename):
        size = os.path.getsize(filename)
        print(f"\n✓ 文件创建成功，大小: {size} 字节")
        print(f"文件路径: {filename}")
    else:
        print("\n× 文件创建失败")

if __name__ == "__main__":
    test_basic_recording()
```

运行测试：
```bash
python src/test_recorder.py
```

### 预期结果 | Expected Result

- 成功录音 5 秒
- 生成 `recordings/test_01.wav` 文件
- 文件大小约为 160KB（16000 Hz × 16-bit × 1 channel × 5s ÷ 8）

### 常见问题 | Common Issues

**Q: 录音没有声音？**
A: 检查麦克风是否被设置为默认输入设备。

**Q: 录音有杂音？**
A: 尝试调整麦克风位置，或使用降噪功能。

---

## 任务三：播放音频 | Task 3: Play Audio

### 步骤 1：音频播放器

创建文件 `src/audio_player.py`：

```python
"""
音频播放模块
"""
import pyaudio
import wave
import time

class AudioPlayer:
    """音频播放器"""

    def __init__(self):
        """初始化播放器"""
        self.audio = pyaudio.PyAudio()
        self.stream = None
        self.is_playing = False

    def play_wave(self, filename):
        """
        播放 WAV 文件

        Args:
            filename: WAV 文件路径
        """
        try:
            # 打开 WAV 文件
            with wave.open(filename, 'rb') as wf:
                # 获取音频参数
                frames = wf.getnframes()
                rate = wf.getframerate()
                channels = wf.getnchannels()
                width = wf.getsampwidth()

                # 计算时长
                duration = frames / rate
                print(f"播放音频: {filename}")
                print(f"采样率: {rate} Hz, 声道: {channels}, 时长: {duration:.1f} 秒")

                # 打开音频流
                self.stream = self.audio.open(
                    format=self.audio.get_format_from_width(width),
                    channels=channels,
                    rate=rate,
                    output=True
                )

                self.is_playing = True

                # 读取并播放数据
                chunk_size = 1024
                start_time = time.time()

                while self.is_playing:
                    data = wf.readframes(chunk_size)
                    if not data:
                        break

                    self.stream.write(data)

                    # 显示进度
                    elapsed = time.time() - start_time
                    progress = min(elapsed / duration, 1.0) * 100
                    print(f"\r进度: {progress:.1f}%", end="")

                print("\n播放完成！")

        except FileNotFoundError:
            print(f"错误: 文件不存在: {filename}")

        except Exception as e:
            print(f"播放出错: {e}")

        finally:
            self.stop()

    def stop(self):
        """停止播放"""
        self.is_playing = False
        if self.stream:
            self.stream.stop_stream()
            self.stream.close()

    def cleanup(self):
        """清理资源"""
        self.stop()
        self.audio.terminate()

# 便捷函数
def play_audio(filename):
    """
    便捷播放函数

    Args:
        filename: 音频文件路径
    """
    player = AudioPlayer()

    try:
        player.play_wave(filename)
    finally:
        player.cleanup()
```

### 步骤 2：测试播放

创建文件 `src/test_player.py`：

```python
"""
测试音频播放
"""
from audio_player import play_audio
import os

def test_playback():
    """测试音频播放"""
    print("=== 音频播放测试 ===\n")

    filename = "recordings/test_01.wav"

    if not os.path.exists(filename):
        print(f"错误: 文件不存在: {filename}")
        print("请先运行 test_recorder.py 录制音频")
        return

    print("准备播放录音...\n")
    play_audio(filename)

if __name__ == "__main__":
    test_playback()
```

运行测试：
```bash
python src/test_player.py
```

### 预期结果 | Expected Result

- 成功播放之前录制的音频
- 能听到清晰的录音内容
- 显示播放进度

### 常见问题 | Common Issues

**Q: 播放没有声音？**
A: 检查喇叭是否连接到 3.5mm 接口，并使用 `sudo raspi-config` 确认音频输出设置。

**Q: 音量太小？**
A: 使用 `alsamixer` 命令调整系统音量：
```bash
sudo apt install alsa-utils
alsamixer
```

---

## 任务四：音频格式转换 | Task 4: Audio Format Conversion

### 步骤 1：格式信息查看

创建文件 `src/audio_converter.py`：

```python
"""
音频格式信息
"""
import wave
import os

def get_audio_info(filename):
    """
    获取音频文件信息

    Args:
        filename: 音频文件路径

    Returns:
        音频信息字典
    """
    try:
        with wave.open(filename, 'rb') as wf:
            info = {
                "channels": wf.getnchannels(),
                "sample_width": wf.getsampwidth(),
                "frame_rate": wf.getframerate(),
                "n_frames": wf.getnframes(),
                "duration": wf.getnframes() / wf.getframerate(),
                "file_size": os.path.getsize(filename)
            }

            return info

    except Exception as e:
        print(f"读取文件出错: {e}")
        return None

def print_audio_info(filename):
    """打印音频文件信息"""
    info = get_audio_info(filename)

    if info:
        print(f"\n=== 音频文件信息 ===")
        print(f"文件名: {filename}")
        print(f"声道数: {info['channels']}")
        print(f"位深度: {info['sample_width'] * 8} bit")
        print(f"采样率: {info['frame_rate']} Hz")
        print(f"总帧数: {info['n_frames']}")
        print(f"时长: {info['duration']:.2f} 秒")
        print(f"文件大小: {info['file_size']} 字节")

        # 计算比特率
        bitrate = (info['sample_width'] * 8 * info['channels'] *
                   info['frame_rate'])
        print(f"比特率: {bitrate} bps ({bitrate/1000:.1f} kbps)")

if __name__ == "__main__":
    # 测试
    filename = "recordings/test_01.wav"
    if os.path.exists(filename):
        print_audio_info(filename)
    else:
        print(f"文件不存在: {filename}")
```

### 预期结果 | Expected Result

- 显示音频文件的详细信息
- 理解不同参数对音质和文件大小的影响

---

## 今日作业 | Today's Assignment

1. **完成所有练习**（必须）
   - 录制一段 10 秒的音频
   - 播放并验证录音质量
   - 查看音频文件信息

2. **对比实验**（必须）
   - 用不同采样率录制音频（8000, 16000, 44100 Hz）
   - 对比文件大小和音质差异
   - 记录你的观察

3. **挑战任务**（可选）
   - 实现一个"复读机"功能
   - 录音后自动播放
   - 添加音量控制功能

---

## 明日预告 | Preview of Tomorrow

明天我们将学习语音识别！你将使用 OpenAI 的 Whisper 模型将录制的语音转换为文字，这是让机器"听懂"你说话的第一步。

> Tomorrow we learn speech recognition! You will use OpenAI's Whisper model to convert recorded speech to text, the first step in making machines "understand" what you say.

---

## 参考资源 | References

- **PyAudio 文档**：https://people.csail.mit.edu/hubert/pyaudio/
- **数字音频基础**：https://www.izotope.com/en/learn/digital-audio-basics.html
- **Python wave 模块**：https://docs.python.org/3/library/wave.html

---

*预计完成时间：5-7 小时*
*Estimated completion time: 5-7 hours*
