"""
语音转文字模块 | Speech-to-Text Module

使用 OpenAI Whisper 进行语音识别 | Uses OpenAI Whisper for speech recognition
"""
import whisper
import os
import torch


class SpeechToText:
    """语音识别器 | Speech recognizer"""

    def __init__(self, model_size="tiny", language="zh"):
        """
        初始化识别器 | Initialize recognizer

        Args:
            model_size: 模型大小 (tiny/base/small/medium/large)
                       Model size: tiny is fastest, large is most accurate
            language: 语言代码 (zh=中文, en=英文)
                     Language code (zh=Chinese, en=English)
        """
        self.model_size = model_size
        self.language = language
        self.model = None
        self.warmed_up = False

    def load_model(self):
        """加载 Whisper 模型 | Load Whisper model"""
        if self.model is not None:
            return True

        try:
            print(f"正在加载 Whisper {self.model_size} 模型 | Loading Whisper {self.model_size} model...")
            device = "cuda" if torch.cuda.is_available() else "cpu"
            print(f"使用设备 | Using device: {device}")

            self.model = whisper.load_model(self.model_size, device=device)
            print(f"✓ 模型加载成功 | Model loaded successfully")
            return True

        except Exception as e:
            print(f"✗ 模型加载失败 | Model load failed: {e}")
            return False

    def transcribe(self, audio_path):
        """
        转录音频文件 | Transcribe audio file

        Args:
            audio_path: 音频文件路径 | Audio file path

        Returns:
            识别的文字内容 | Recognized text content
        """
        if not self.model:
            if not self.load_model():
                return None

        try:
            if not os.path.exists(audio_path):
                print(f"错误：音频文件不存在 | Error: Audio file not found: {audio_path}")
                return None

            print(f"正在识别 | Recognizing: {audio_path}")

            result = self.model.transcribe(
                audio_path,
                language=self.language,
                fp16=False  # 树莓派不支持 FP16 | Pi doesn't support FP16
            )

            text = result["text"].strip()
            print(f"识别结果 | Result: {text}")
            return text

        except Exception as e:
            print(f"识别出错 | Recognition error: {e}")
            return None

    def transcribe_with_timestamp(self, audio_path):
        """
        转录音频并返回时间戳 | Transcribe with timestamps

        Args:
            audio_path: 音频文件路径 | Audio file path

        Returns:
            包含文字和时间戳的字典 | Dict with text and timestamps
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
            print(f"识别出错 | Recognition error: {e}")
            return None


def transcribe_audio(audio_path, model_size="tiny", language="zh"):
    """
    便捷的语音识别函数 | Convenient speech recognition function

    Args:
        audio_path: 音频文件路径 | Audio file path
        model_size: 模型大小 | Model size
        language: 语言代码 | Language code

    Returns:
        识别的文字 | Recognized text
    """
    stt = SpeechToText(model_size, language)
    return stt.transcribe(audio_path)
