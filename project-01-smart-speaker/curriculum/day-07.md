# Day 7: 语音对话 MVP | Voice Conversation MVP

## 学习目标 | Learning Objectives

- 将 STT、LLM、TTS 三个模块串联
- 实现完整的语音对话循环
- 掌握模块化编程思想
- 完成 MVP（最小可行产品）

> Connect STT, LLM, and TTS modules; implement complete voice conversation loop; master modular programming; complete MVP (Minimum Viable Product).

## 前置准备检查 | Prerequisites Check

- [ ] Day 4-6 的模块都能独立工作
- [ ] API Key 已配置
- [ ] 硬件连接正常

---

## 为什么学这个 | Why Learn This

**真实世界应用：** 今天你将完成智能音箱的核心功能。这是整个项目的关键里程碑，将之前学习的所有技术整合成一个完整的应用。

> **Real-world application:** Today you will complete the core functionality of the smart speaker. This is a key milestone in the project, integrating all previously learned technologies into a complete application.

---

## 任务一：创建主程序 | Task 1: Create Main Program

### 步骤 1：创建主程序

创建文件 `src/main.py`：

```python
"""
小智同学 - 智能音箱主程序
整合 STT → LLM → TTS 完整对话循环
"""
import sys
import time
from stt import SpeechToText
from chat import ChatBot
from tts import TextToSpeech
from audio_recorder import record_audio

class SmartSpeaker:
    """智能音箱主类"""

    def __init__(self, config):
        """
        初始化智能音箱

        Args:
            config: 配置字典
        """
        self.config = config

        # 初始化各模块
        print("正在初始化小智同学...")

        # STT 模块
        print("加载语音识别模块...")
        self.stt = SpeechToText(
            model_size=config.get('stt.model', 'tiny'),
            language=config.get('stt.language', 'zh')
        )

        # Chat 模块
        print("加载对话模块...")
        self.chat = ChatBot(
            api_key=config.get('api.api_key'),
            base_url=self._get_api_url(),
            model=config.get('api.model', 'deepseek-chat'),
            temperature=config.get('api.temperature', 0.7)
        )

        # TTS 模块
        print("加载语音合成模块...")
        self.tts = TextToSpeech(
            voice=config.get('tts.voice', 'zh-CN-XiaoxiaoNeural'),
            rate=config.get('tts.rate', '+0%'),
            volume=config.get('tts.volume', '+0%')
        )

        print("✓ 小智同学初始化完成\n")

    def _get_api_url(self):
        """获取 API URL"""
        provider = self.config.get('api.provider', 'deepseek')
        if provider == 'openai':
            return 'https://api.openai.com'
        else:
            return 'https://api.deepseek.com'

    def listen(self, duration=5):
        """
        听取用户语音

        Args:
            duration: 录音时长（秒）

        Returns:
            识别的文字
        """
        print(f"正在录音（{duration}秒）...")
        print("请说话...")

        # 录音
        temp_file = "temp_input.wav"
        record_audio(temp_file, duration=duration,
                    sample_rate=self.config.get('audio.sample_rate', 16000))

        # 识别
        text = self.stt.transcribe(temp_file)

        return text

    def think(self, text):
        """
        思考并生成回复

        Args:
            text: 用户输入

        Returns:
            AI 回复
        """
        print(f"用户: {text}")

        response = self.chat.chat(text, keep_history=True)

        if response:
            print(f"小智: {response}")
        else:
            response = "抱歉，我遇到了一些问题"
            print(f"小智: {response}")

        return response

    def speak(self, text):
        """
        朗读回复

        Args:
            text: 要朗读的文字
        """
        self.tts.speak(text)

    def run_once(self):
        """运行一次对话循环"""
        try:
            # 听
            user_text = self.listen()

            if not user_text:
                print("未能识别到语音")
                return

            # 检查退出命令
            if user_text.lower() in ['退出', '再见', '拜拜', 'exit']:
                print("\n再见！")
                return False

            # 想
            ai_response = self.think(user_text)

            # 说
            self.speak(ai_response)

            print()  # 空行
            return True

        except Exception as e:
            print(f"出错: {e}")
            return True

    def run(self):
        """运行主循环"""
        print("=" * 50)
        print("小智同学已启动")
        print("说话即可对话，说'退出'结束")
        print("=" * 50)
        print()

        # 欢迎语
        welcome = "你好，我是小智同学，很高兴为你服务"
        print(f"小智: {welcome}")
        self.tts.speak(welcome)
        print()

        # 主循环
        while True:
            continue_running = self.run_once()
            if not continue_running:
                break

            # 短暂暂停
            time.sleep(0.5)

def load_config(config_path='config.yaml'):
    """加载配置"""
    import yaml

    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    except:
        print(f"警告: 配置文件加载失败，使用默认配置")
        return {}

def main():
    """主函数"""
    # 加载配置
    config = load_config()

    # 检查 API Key
    api_key = config.get('api.api_key')
    if not api_key or api_key == 'your-api-key-here':
        print("错误: 请先在 config.yaml 中设置有效的 API Key")
        return

    # 创建并运行智能音箱
    speaker = SmartSpeaker(config)
    speaker.run()

if __name__ == "__main__":
    main()
```

### 步骤 2：创建配置文件

```bash
# 复制模板
cp software/config.template.yaml software/config.yaml

# 编辑配置
nano software/config.yaml
```

填入你的 API Key。

### 步骤 3：测试 MVP

```bash
# 确保所有文件都在正确位置
cd ~/smart-speaker

# 运行主程序
python src/main.py
```

### 预期结果 | Expected Result

- 程序成功启动
- 可以进行语音对话
- 说"退出"可以正常结束

### 常见问题 | Common Issues

**Q: 模块导入错误？**
A: 确保所有模块文件（stt.py, chat.py, tts.py, audio_recorder.py）都在 src 目录。

**Q: 没有声音？**
A: 检查喇叭连接和系统音量设置。

---

## 任务二：优化用户体验 | Task 2: Optimize User Experience

### 步骤 1：添加状态指示

更新 `src/main.py`，添加更好的状态提示：

```python
# 在 SmartSpeaker 类中添加
def show_status(self, status):
    """显示状态"""
    status_icons = {
        "listening": "🎤",
        "thinking": "🤔",
        "speaking": "🔊",
        "error": "❌"
    }
    icon = status_icons.get(status, "•")
    print(f"\r{icon} ", end="", flush=True)
```

### 步骤 2：添加快捷命令

添加特殊命令支持：

```python
def process_command(self, text):
    """处理特殊命令"""
    commands = {
        "清空": self.clear_history,
        "重置": self.reset_chat,
        "帮助": self.show_help,
    }

    for cmd, func in commands.items():
        if cmd in text:
            func()
            return True

    return False
```

---

## 任务三：测试和调试 | Task 3: Testing and Debugging

### 步骤 1：创建测试脚本

创建文件 `src/test_mvp.py`：

```python
"""
MVP 功能测试
"""
import yaml

def test_config_loading():
    """测试配置加载"""
    print("=== 配置加载测试 ===")

    try:
        with open('config.yaml', 'r') as f:
            config = yaml.safe_load(f)

        required_keys = [
            'api.api_key',
            'stt.model',
            'tts.voice'
        ]

        for key in required_keys:
            keys = key.split('.')
            value = config
            for k in keys:
                value = value.get(k)
                if value is None:
                    print(f"✗ 缺少配置: {key}")
                    return False

        print("✓ 配置完整")
        return True

    except Exception as e:
        print(f"✗ 配置加载失败: {e}")
        return False

def test_module_imports():
    """测试模块导入"""
    print("\n=== 模块导入测试 ===")

    modules = [
        'stt',
        'chat',
        'tts',
        'audio_recorder',
        'main'
    ]

    for module in modules:
        try:
            __import__(module)
            print(f"✓ {module}")
        except ImportError as e:
            print(f"✗ {module}: {e}")
            return False

    return True

def test_audio_devices():
    """测试音频设备"""
    print("\n=== 音频设备测试 ===")

    import sounddevice as sd

    devices = sd.query_devices()

    input_device = None
    output_device = None

    for i, device in enumerate(devices):
        if device['max_input_channels'] > 0:
            input_device = i
        if device['max_output_channels'] > 0:
            output_device = i

    if input_device is not None:
        print(f"✓ 找到输入设备: {devices[input_device]['name']}")
    else:
        print("✗ 未找到输入设备")

    if output_device is not None:
        print(f"✓ 找到输出设备: {devices[output_device]['name']}")
    else:
        print("✗ 未找到输出设备")

    return input_device is not None and output_device is not None

if __name__ == "__main__":
    print("MVP 系统测试\n")

    results = [
        test_config_loading(),
        test_module_imports(),
        test_audio_devices()
    ]

    print("\n" + "=" * 50)
    if all(results):
        print("✓ 所有测试通过，可以运行 MVP")
    else:
        print("✗ 部分测试失败，请先解决问题")
```

---

## 今日作业 | Today's Assignment

1. **完成 MVP**（必须）
   - 成功运行主程序
   - 完成至少 5 轮对话
   - 录制演示视频

2. **测试报告**（必须）
   - 测试不同类型的问题
   - 记录响应时间和准确率
   - 列出遇到的问题和解决方案

3. **优化任务**（可选）
   - 添加更多状态提示
   - 优化响应速度
   - 添加错误处理

---

## 明日预告 | Preview of Tomorrow

明天我们将优化和调试系统，解决各种边缘情况，提升稳定性和用户体验。

> Tomorrow we will optimize and debug the system, resolve edge cases, and improve stability and user experience.

---

## 参考资源 | References

- **Python 模块化编程**：https://docs.python.org/3/tutorial/modules.html
- **异常处理最佳实践**：https://docs.python.org/3/tutorial/errors.html

---

*预计完成时间：6-8 小时*
*Estimated completion time: 6-8 hours*
