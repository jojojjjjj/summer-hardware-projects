"""
文字转语音模块 | Text-to-Speech Module

使用 Edge TTS 进行语音合成 | Uses Edge TTS for speech synthesis
"""
import edge_tts
import asyncio
import os
import pygame
from io import BytesIO


class TextToSpeech:
    """文字转语音器 | Text-to-Speech synthesizer"""

    def __init__(self, voice="zh-CN-XiaoxiaoNeural", rate="+0%", volume="+0%"):
        """
        初始化 TTS | Initialize TTS

        Args:
            voice: 语音名称 | Voice name
            rate: 语速调整 | Speed adjustment (+10%, -20%, etc.)
            volume: 音量调整 | Volume adjustment (+10%, -20%, etc.)
        """
        self.voice = voice
        self.rate = rate
        self.volume = volume
        pygame.mixer.init(frequency=16000, size=-16, channels=1, buffer=512)

    async def _synthesize(self, text, output_file=None):
        """
        异步合成语音 | Async speech synthesis

        Args:
            text: 要转换的文字 | Text to convert
            output_file: 输出文件路径（可选）| Output file path (optional)
        """
        try:
            communicate = edge_tts.Communicate(
                text,
                self.voice,
                rate=self.rate,
                volume=self.volume
            )

            if output_file:
                await communicate.save(output_file)
                return output_file
            else:
                audio_data = b""
                async for chunk in communicate.stream():
                    if chunk["type"] == "audio":
                        audio_data += chunk["data"]
                return audio_data

        except Exception as e:
            print(f"语音合成出错 | Synthesis error: {e}")
            return None

    def speak(self, text, output_file=None):
        """
        合成并播放语音 | Synthesize and play speech

        Args:
            text: 要说的文字 | Text to speak
            output_file: 可选的保存路径 | Optional save path
        """
        try:
            print(f"正在合成 | Synthesizing: {text}")

            if output_file:
                asyncio.run(self._synthesize(text, output_file))
                pygame.mixer.music.load(output_file)
                pygame.mixer.music.play()
                while pygame.mixer.music.get_busy():
                    pygame.time.Clock().tick(10)
            else:
                audio_data = asyncio.run(self._synthesize(text))
                if audio_data:
                    sound = pygame.mixer.Sound(BytesIO(audio_data))
                    sound.play()
                    while pygame.mixer.get_busy():
                        pygame.time.Clock().tick(10)

            print("✓ 播放完成 | Playback complete")

        except Exception as e:
            print(f"播放出错 | Playback error: {e}")

    def save_to_file(self, text, filename):
        """
        保存语音到文件 | Save speech to file

        Args:
            text: 要转换的文字 | Text to convert
            filename: 保存路径 | Save path
        """
        print(f"正在合成语音 | Synthesizing speech...")
        result = asyncio.run(self._synthesize(text, filename))

        if result and os.path.exists(filename):
            size = os.path.getsize(filename)
            print(f"✓ 语音已保存 | Speech saved: {filename} ({size} bytes)")
            return True
        else:
            print("✗ 保存失败 | Save failed")
            return False


def speak(text, voice="zh-CN-XiaoxiaoNeural"):
    """便捷的语音函数 | Convenient speech function"""
    tts = TextToSpeech(voice=voice)
    tts.speak(text)
