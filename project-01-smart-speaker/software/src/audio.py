"""
音频录制和播放模块 | Audio Recording and Playback Module

使用 PyAudio 进行音频处理 | Uses PyAudio for audio processing
"""
import pyaudio
import wave
import time
import os


class AudioRecorder:
    """音频录制器 | Audio recorder"""

    def __init__(self, config=None):
        """
        初始化录制器 | Initialize recorder

        Args:
            config: 配置字典 | Configuration dict
        """
        self.config = config or {
            "sample_rate": 16000,
            "channels": 1,
            "chunk_size": 1024,
            "format": pyaudio.paInt16,
            "input_device": None
        }

        self.audio = pyaudio.PyAudio()
        self.stream = None
        self.is_recording = False

    def list_devices(self):
        """列出所有可用设备 | List all available devices"""
        print("=== 可用音频设备 | Available audio devices ===")
        for i in range(self.audio.get_device_count()):
            info = self.audio.get_device_info_by_index(i)
            print(f"设备 {i} | Device {i}: {info['name']}")
            print(f"  输入通道 | Input channels: {info['max_input_channels']}")
            print(f"  输出通道 | Output channels: {info['max_output_channels']}")
            print()

    def start_recording(self, duration=5):
        """
        开始录音 | Start recording

        Args:
            duration: 录音时长（秒）| Recording duration (seconds)
        """
        try:
            self.stream = self.audio.open(
                format=self.config["format"],
                channels=self.config["channels"],
                rate=self.config["sample_rate"],
                input=True,
                input_device_index=self.config["input_device"],
                frames_per_buffer=self.config["chunk_size"]
            )

            self.is_recording = True
            print(f"开始录音 {duration} 秒 | Recording for {duration}s...")

            frames = []
            start_time = time.time()

            while self.is_recording and (time.time() - start_time) < duration:
                data = self.stream.read(self.config["chunk_size"])
                frames.append(data)

                elapsed = time.time() - start_time
                remaining = duration - elapsed
                print(f"\r剩余时间 | Remaining: {remaining:.1f}s", end="")

            print("\n录音完成！| Recording complete!")
            return frames

        except Exception as e:
            print(f"\n录音出错 | Recording error: {e}")
            return None

    def stop_recording(self):
        """停止录音 | Stop recording"""
        self.is_recording = False
        if self.stream:
            self.stream.stop_stream()
            self.stream.close()

    def save_recording(self, frames, filename):
        """
        保存录音为 WAV 文件 | Save recording as WAV file

        Args:
            frames: 音频帧数据 | Audio frame data
            filename: 保存文件名 | Save filename
        """
        try:
            with wave.open(filename, 'wb') as wf:
                wf.setnchannels(self.config["channels"])
                wf.setsampwidth(self.audio.get_sample_size(self.config["format"]))
                wf.setframerate(self.config["sample_rate"])
                wf.writeframes(b''.join(frames))

            print(f"音频已保存 | Audio saved: {filename}")
            return True

        except Exception as e:
            print(f"保存失败 | Save failed: {e}")
            return False

    def cleanup(self):
        """清理资源 | Cleanup resources"""
        self.stop_recording()
        self.audio.terminate()


def record_audio(filename, duration=5, sample_rate=16000):
    """
    便捷录音函数 | Convenient recording function

    Args:
        filename: 保存文件名 | Save filename
        duration: 录音时长（秒）| Recording duration (seconds)
        sample_rate: 采样率 | Sample rate
    """
    recorder = AudioRecorder({"sample_rate": sample_rate})

    try:
        frames = recorder.start_recording(duration)
        if frames:
            recorder.save_recording(frames, filename)
    finally:
        recorder.cleanup()


class AudioPlayer:
    """音频播放器 | Audio player"""

    def __init__(self):
        """初始化播放器 | Initialize player"""
        self.audio = pyaudio.PyAudio()
        self.stream = None
        self.is_playing = False

    def play_wave(self, filename):
        """
        播放 WAV 文件 | Play WAV file

        Args:
            filename: WAV 文件路径 | WAV file path
        """
        try:
            with wave.open(filename, 'rb') as wf:
                frames = wf.getnframes()
                rate = wf.getframerate()
                channels = wf.getnchannels()
                width = wf.getsampwidth()

                duration = frames / rate
                print(f"播放音频 | Playing: {filename}")
                print(f"采样率 | Sample rate: {rate}Hz, 时长 | Duration: {duration:.1f}s")

                self.stream = self.audio.open(
                    format=self.audio.get_format_from_width(width),
                    channels=channels,
                    rate=rate,
                    output=True
                )

                self.is_playing = True
                chunk_size = 1024
                start_time = time.time()

                while self.is_playing:
                    data = wf.readframes(chunk_size)
                    if not data:
                        break

                    self.stream.write(data)

                    elapsed = time.time() - start_time
                    progress = min(elapsed / duration, 1.0) * 100
                    print(f"\r进度 | Progress: {progress:.1f}%", end="")

                print("\n播放完成！| Playback complete!")

        except Exception as e:
            print(f"播放出错 | Playback error: {e}")
        finally:
            self.stop()

    def stop(self):
        """停止播放 | Stop playback"""
        self.is_playing = False
        if self.stream:
            self.stream.stop_stream()
            self.stream.close()

    def cleanup(self):
        """清理资源 | Cleanup resources"""
        self.stop()
        self.audio.terminate()


def play_audio(filename):
    """便捷播放函数 | Convenient playback function"""
    player = AudioPlayer()
    try:
        player.play_wave(filename)
    finally:
        player.cleanup()
