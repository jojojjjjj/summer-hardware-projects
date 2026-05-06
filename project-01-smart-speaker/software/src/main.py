"""
小智同学 - 智能音箱主程序 | Xiao Zhi Smart Speaker Main Program

整合 STT → LLM → TTS 完整对话循环
Integrates STT → LLM → TTS complete conversation loop
"""
import sys
import time
import yaml
from pathlib import Path

# 添加项目根目录到路径
ROOT_DIR = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT_DIR / "src"))

from stt import SpeechToText
from chat import ChatBot
from tts import TextToSpeech
from audio_recorder import record_audio


class SmartSpeaker:
    """智能音箱主类 | Smart Speaker Main Class"""

    def __init__(self, config_path="config.yaml"):
        """
        初始化智能音箱 | Initialize smart speaker

        Args:
            config_path: 配置文件路径
        """
        self.config = self._load_config(config_path)
        self._validate_config()

        # 初始化各模块 | Initialize modules
        print("正在初始化小智同学... | Initializing Xiao Zhi...")
        self._init_modules()
        print("✓ 小智同学初始化完成 | Xiao Zhi initialized\n")

    def _load_config(self, config_path):
        """加载配置文件 | Load configuration"""
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            print(f"配置文件不存在: {config_path}")
            print("使用默认配置 | Using default configuration")
            return self._get_default_config()
        except Exception as e:
            print(f"配置加载失败 | Config load failed: {e}")
            return self._get_default_config()

    def _get_default_config(self):
        """获取默认配置 | Get default configuration"""
        return {
            'api': {
                'provider': 'deepseek',
                'api_key': '',
                'model': 'deepseek-chat',
                'temperature': 0.7
            },
            'stt': {
                'model': 'tiny',
                'language': 'zh'
            },
            'tts': {
                'voice': 'zh-CN-XiaoxiaoNeural',
                'rate': '+0%',
                'volume': '+0%'
            },
            'audio': {
                'sample_rate': 16000,
                'channels': 1,
                'recording_duration': 5
            }
        }

    def _validate_config(self):
        """验证配置 | Validate configuration"""
        api_key = self.config.get('api', {}).get('api_key', '')

        if not api_key or api_key == 'your-api-key-here':
            print("\n⚠️  警告：未配置 API Key | Warning: API Key not configured")
            print("请在 config.yaml 中填入你的 API Key")
            print("Please enter your API Key in config.yaml")
            print("\n获取 API Key | Get API Key:")
            print("  DeepSeek: https://platform.deepseek.com/")
            print("  OpenAI: https://platform.openai.com/")
            sys.exit(1)

    def _init_modules(self):
        """初始化模块 | Initialize modules"""
        # STT 模块 | Speech-to-Text module
        print("加载语音识别模块 | Loading STT module...")
        self.stt = SpeechToText(
            model_size=self.config.get('stt', {}).get('model', 'tiny'),
            language=self.config.get('stt', {}).get('language', 'zh')
        )

        # Chat 模块 | Chat module
        print("加载对话模块 | Loading chat module...")
        provider = self.config.get('api', {}).get('provider', 'deepseek')
        base_url = 'https://api.deepseek.com' if provider == 'deepseek' else 'https://api.openai.com'

        self.chat = ChatBot(
            api_key=self.config.get('api', {}).get('api_key'),
            base_url=base_url,
            model=self.config.get('api', {}).get('model', 'deepseek-chat'),
            temperature=self.config.get('api', {}).get('temperature', 0.7)
        )

        # TTS 模块 | Text-to-Speech module
        print("加载语音合成模块 | Loading TTS module...")
        self.tts = TextToSpeech(
            voice=self.config.get('tts', {}).get('voice', 'zh-CN-XiaoxiaoNeural'),
            rate=self.config.get('tts', {}).get('rate', '+0%'),
            volume=self.config.get('tts', {}).get('volume', '+0%')
        )

    def listen(self, duration=None):
        """
        听取用户语音 | Listen to user speech

        Args:
            duration: 录音时长（秒）
        """
        if duration is None:
            duration = self.config.get('audio', {}).get('recording_duration', 5)

        print(f"正在录音（{duration}秒）... | Recording ({duration}s)...")
        print("请说话... | Please speak...")

        temp_file = "temp_input.wav"
        record_audio(
            temp_file,
            duration=duration,
            sample_rate=self.config.get('audio', {}).get('sample_rate', 16000)
        )

        text = self.stt.transcribe(temp_file)
        return text

    def think(self, text):
        """
        思考并生成回复 | Think and generate response

        Args:
            text: 用户输入 | User input
        """
        print(f"用户 | User: {text}")

        response = self.chat.chat(text, keep_history=True)

        if response:
            print(f"小智 | Xiao Zhi: {response}")
        else:
            response = "抱歉，我遇到了一些问题 | Sorry, I encountered a problem"
            print(f"小智 | Xiao Zhi: {response}")

        return response

    def speak(self, text):
        """
        朗读回复 | Speak response

        Args:
            text: 要朗读的文字 | Text to speak
        """
        self.tts.speak(text)

    def run_once(self):
        """运行一次对话循环 | Run one conversation loop"""
        try:
            # 听 | Listen
            user_text = self.listen()

            if not user_text:
                print("未能识别到语音 | Could not recognize speech")
                return True

            # 检查退出命令 | Check exit commands
            exit_commands = ['退出', '再见', '拜拜', 'exit', 'quit']
            if any(cmd in user_text.lower() for cmd in exit_commands):
                print("\n再见！| Goodbye!")
                return False

            # 想 | Think
            ai_response = self.think(user_text)

            # 说 | Speak
            self.speak(ai_response)

            print()  # 空行 | Blank line
            return True

        except KeyboardInterrupt:
            print("\n\n程序中断 | Program interrupted")
            return False
        except Exception as e:
            print(f"出错 | Error: {e}")
            return True

    def run(self):
        """运行主循环 | Run main loop"""
        print("=" * 60)
        print("小智同学已启动 | Xiao Zhi started")
        print("说话即可对话，说'退出'结束 | Speak to chat, say 'exit' to quit")
        print("=" * 60)
        print()

        # 欢迎语 | Welcome message
        welcome = "你好，我是小智同学，很高兴为你服务 | Hello, I'm Xiao Zhi, happy to help"
        print(f"小智 | Xiao Zhi: {welcome}")
        self.tts.speak(welcome)
        print()

        # 主循环 | Main loop
        try:
            while True:
                continue_running = self.run_once()
                if not continue_running:
                    break
                time.sleep(0.5)
        except KeyboardInterrupt:
            print("\n\n再见！| Goodbye!")


def main():
    """主函数 | Main function"""
    import argparse

    parser = argparse.ArgumentParser(description="小智同学智能音箱 | Xiao Zhi Smart Speaker")
    parser.add_argument(
        '--config',
        default='config.yaml',
        help='配置文件路径 | Configuration file path (default: config.yaml)'
    )

    args = parser.parse_args()

    # 检查配置文件 | Check configuration file
    config_path = Path(args.config)
    if not config_path.exists():
        print(f"配置文件不存在 | Config file not found: {config_path}")
        print("请复制 config.template.yaml 为 config.yaml 并配置 | Please copy config.template.yaml to config.yaml and configure")
        sys.exit(1)

    # 创建并运行智能音箱 | Create and run smart speaker
    speaker = SmartSpeaker(config_path=str(config_path))
    speaker.run()


if __name__ == "__main__":
    main()
