# Day 9: 唤醒词检测 | Wake Word Detection

## 学习目标 | Learning Objectives

- 理解唤醒词检测的原理
- 掌握使用 Picovoice 唤醒词引擎
- 实现实时唤醒词监听
- 集成唤醒词到主程序

> Understand wake word detection principles; master using Picovoice wake word engine; implement real-time wake word listening; integrate wake word into main program.

## 前置准备检查 | Prerequisites Check

- [ ] MVP 稳定运行
- [ ] 麦克风工作正常
- [ ] 已完成 Day 8 的优化

---

## 为什么学这个 | Why Learn This

**真实世界应用：** 唤醒词让智能音箱能够全天候待机，只在听到特定词时才激活。这是 Siri、Alexa、小爱同学等所有语音助手的核心功能。

> **Real-world application:** Wake words allow smart speakers to standby 24/7, only activating when hearing specific words. This is a core feature of all voice assistants like Siri, Alexa, and Xiao Ai.

---

## 任务一：安装唤醒词引擎 | Task 1: Install Wake Word Engine

### 步骤 1：安装 pvporcupine

Porcupine 是 Picovoice 提供的唤醒词引擎：

```bash
# 安装 pvporcupine
pip install pvporcupine

# 验证安装
python -c "import pvporcupine; print('Porcupine 安装成功')"
```

### 步骤 2：获取 Access Key

1. 访问：https://picovoice.ai/
2. 注册免费账号
3. 获取 Access Key（免费版支持自定义唤醒词）

### 步骤 3：测试唤醒词

创建文件 `src/test_wake_word.py`：

```python
"""
测试唤醒词检测
"""
import pvporcupine
from recorder import AudioRecorder

def test_wake_word():
    """测试唤醒词"""
    print("=== 唤醒词测试 ===\n")

    # 输入 Access Key
    access_key = input("请输入 Picovoice Access Key: ").strip()

    if not access_key:
        print("需要 Access Key 才能继续")
        print("访问 https://picovoice.ai/ 获取免费 Key")
        return

    try:
        # 初始化 Porcupine
        print("正在初始化唤醒词引擎...")

        porcupine = pvporcupine.create(
            access_key=access_key,
            keyword_paths=["porcupine_params.pv"],  # 使用默认唤醒词
            sensitivities=[0.5]
        )

        print(f"✓ 初始化成功")
        print(f"采样率: {porcupine.sample_rate}")
        print(f"帧长度: {porcupine.frame_length}")

        # 测试监听
        print("\n开始监听唤醒词...")
        print("请说 'porcupine' 或 'ok google' 等默认唤醒词")
        print("按 Ctrl+C 退出\n")

        recorder = AudioRecorder({
            "sample_rate": porcupine.sample_rate,
            "channels": 1,
            "chunk_size": porcupine.frame_length
        })

        import struct

        try:
            stream = recorder.audio.open(
                format=recorder.config["format"],
                channels=1,
                rate=porcupine.sample_rate,
                input=True,
                frames_per_buffer=porcupine.frame_length
            )

            while True:
                # 读取音频帧
                data = stream.read(porcupine.frame_length)
                pcm = struct.unpack_from("h" * porcupine.frame_length, data)

                # 检测唤醒词
                keyword_index = porcupine.process(pcm)

                if keyword_index >= 0:
                    print("✓ 检测到唤醒词！")
                    break

        except KeyboardInterrupt:
            print("\n停止监听")

        finally:
            stream.stop_stream()
            stream.close()
            porcupine.release()

    except Exception as e:
        print(f"错误: {e}")

if __name__ == "__main__":
    test_wake_word()
```

---

## 任务二：创建唤醒词模块 | Task 2: Create Wake Word Module

### 步骤 1：创建 WakeWordDetector 类

创建文件 `src/wake_word.py`：

```python
"""
唤醒词检测模块
"""
import pvporcupine
import struct
import threading
from audio_recorder import AudioRecorder

class WakeWordDetector:
    """唤醒词检测器"""

    def __init__(self, access_key, callback, sensitivity=0.5):
        """
        初始化检测器

        Args:
            access_key: Picovoice Access Key
            callback: 检测到唤醒词时的回调函数
            sensitivity: 灵敏度 (0-1)
        """
        self.access_key = access_key
        self.callback = callback
        self.sensitivity = sensitivity
        self.porcupine = None
        self.is_running = False
        self.thread = None

    def initialize(self):
        """初始化 Porcupine"""
        try:
            self.porcupine = pvporcupine.create(
                access_key=self.access_key,
                keywords=["porcupine", "ok google"],  # 使用内置唤醒词
                sensitivities=[self.sensitivity] * 2
            )
            print("✓ 唤醒词引擎初始化成功")
            return True

        except Exception as e:
            print(f"✗ 唤醒词引擎初始化失败: {e}")
            return False

    def start(self):
        """开始监听"""
        if not self.porcupine:
            if not self.initialize():
                return False

        self.is_running = True
        self.thread = threading.Thread(target=self._listen_loop)
        self.thread.daemon = True
        self.thread.start()

        print("唤醒词监听已启动")
        return True

    def stop(self):
        """停止监听"""
        self.is_running = False

        if self.thread:
            self.thread.join(timeout=2)

        if self.porcupine:
            self.porcupine.release()

    def _listen_loop(self):
        """监听循环"""
        try:
            recorder = AudioRecorder({
                "sample_rate": self.porcupine.sample_rate,
                "channels": 1,
                "chunk_size": self.porcupine.frame_length
            })

            stream = recorder.audio.open(
                format=recorder.config["format"],
                channels=1,
                rate=self.porcupine.sample_rate,
                input=True,
                frames_per_buffer=self.porcupine.frame_length
            )

            print("正在监听唤醒词...")

            while self.is_running:
                # 读取音频帧
                data = stream.read(self.porcupine.frame_length)
                pcm = struct.unpack_from("h" * self.porcupine.frame_length, data)

                # 检测唤醒词
                keyword_index = self.porcupine.process(pcm)

                if keyword_index >= 0:
                    print(f"✓ 检测到唤醒词！")
                    # 调用回调函数
                    if self.callback:
                        self.callback(keyword_index)

        except Exception as e:
            print(f"监听出错: {e}")

        finally:
            if 'stream' in locals():
                stream.stop_stream()
                stream.close()

# 使用示例
if __name__ == "__main__":
    def on_wake_word(keyword_index):
        """唤醒词回调"""
        print(f"唤醒！检测到关键词: {keyword_index}")

    detector = WakeWordDetector(
        access_key="your-access-key",
        callback=on_wake_word
    )

    detector.start()
```

---

## 任务三：集成到主程序 | Task 3: Integrate into Main Program

### 更新 main.py

```python
from wake_word import WakeWordDetector

class SmartSpeaker:
    def __init__(self, config):
        # ... 原有代码 ...

        # 初始化唤醒词检测
        wake_word_key = config.get('wake_word.access_key')
        if wake_word_key and wake_word_key != 'your-access-key':
            self.wake_word_detector = WakeWordDetector(
                access_key=wake_word_key,
                callback=self.on_wake_word,
                sensitivity=config.get('wake_word.sensitivity', 0.5)
            )
            self.wake_word_enabled = True
        else:
            self.wake_word_enabled = False
            print("唤醒词功能未启用（需要 Access Key）")

    def on_wake_word(self, keyword_index):
        """检测到唤醒词时的回调"""
        print("唤醒词已检测到！")
        self.speak("我在")

        # 开始对话
        self.run_once()

    def run_with_wake_word(self):
        """带唤醒词的主循环"""
        if self.wake_word_enabled:
            # 启动唤醒词监听
            self.wake_word_detector.start()

            print("等待唤醒词...")
            print("说 'porcupine' 或 'ok google' 唤醒我")

            # 保持运行
            try:
                while True:
                    import time
                    time.sleep(1)
            except KeyboardInterrupt:
                print("\n停止")
                self.wake_word_detector.stop()

        else:
            print("唤醒词未启用，使用普通模式")
            self.run()
```

---

## 任务四：替代方案（无 Access Key）| Task 4: Alternative (No Access Key)

### 使用简单能量检测

如果没有 Picovoice Key，可以用简单方法：

创建文件 `src/simple_wake_word.py`：

```python
"""
简单唤醒词检测（基于能量）
"""
import numpy as np
from audio_recorder import AudioRecorder

class SimpleWakeDetector:
    """简单唤醒检测器"""

    def __init__(self, callback, threshold=5000):
        """
        初始化

        Args:
            callback: 检测到声音时的回调
            threshold: 音量阈值
        """
        self.callback = callback
        self.threshold = threshold
        self.is_running = False

    def start(self):
        """开始监听"""
        self.is_running = True
        print("简单监听已启动（检测到声音后触发）")

        recorder = AudioRecorder()
        stream = recorder.audio.open(
            format=recorder.config["format"],
            channels=1,
            rate=16000,
            input=True,
            frames_per_buffer=1024
        )

        try:
            while self.is_running:
                data = stream.read(1024)
                # 计算音量
                audio_data = np.frombuffer(data, dtype=np.int16)
                volume = np.abs(audio_data).mean()

                if volume > self.threshold:
                    print(f"检测到声音！音量: {volume}")
                    if self.callback:
                        self.callback()

        except KeyboardInterrupt:
            print("\n停止监听")

        finally:
            stream.stop_stream()
            stream.close()

    def stop(self):
        """停止监听"""
        self.is_running = False
```

---

## 今日作业 | Today's Assignment

1. **完成唤醒词功能**（必须）
   - 安装 Porcupine
   - 测试唤醒词检测
   - 集成到主程序

2. **测试和调优**（必须）
   - 测试不同灵敏度
   - 测试不同距离
   - 记录最佳配置

3. **替代方案**（可选）
   - 如果没有 Access Key，实现简单能量检测
   - 对比两种方案的效果

---

## 明日预告 | Preview of Tomorrow

明天我们将进行硬件组装！把所有组件连接起来，制作一个完整的智能音箱硬件。

> Tomorrow we will do hardware assembly! Connect all components and create a complete smart speaker hardware.

---

## 参考资源 | References

- **Picovoice 文档**：https://picovoice.ai/docs/
- **Porcupine GitHub**：https://github.com/Picovoice/porcupine

---

*预计完成时间：4-6 小时*
*Estimated completion time: 4-6 hours*
