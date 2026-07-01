# 调研汇总报告 | Consolidated Research Report
<!-- 注：价格信息已注释隐藏（查价不准确，仅作参考不严谨）/ Note: price info commented out (inaccurate, not rigorous as reference) -->

> 本报告由调研员A和调研员B的结果合并而成，共收录 20 个候选项目。
> This report consolidates findings from Researchers A and B, with 20 candidate projects total.

---

## 一、桌宠机器人 & 智能音箱方向（调研员A）| Desktop Pet & Smart Speaker (Researcher A)

| # | 项目名称 | 链接 | 核心技术 | 难度 | 成本(¥) | 改编度 |
|---|---------|------|---------|------|---------|--------|
| A1 | Whisper ASR (tiny/base) | [hf-audio/whisper-large-v3](https://hf.co/spaces/hf-audio/whisper-large-v3) | Transformer ASR | 2/5 | <!-- ¥0-50 --> | 5/5 |
| A2 | Edge TTS | [innoai/Edge-TTS](https://hf.co/spaces/innoai/Edge-TTS-Text-to-Speech) | Edge TTS引擎 | 1/5 | <!-- ¥0 --> | 5/5 |
| A3 | SpeechT5 TTS | [Transformers TTS](https://hf.co/docs/transformers/tasks/text-to-speech) | SpeechT5架构 | 3/5 | <!-- ¥0-50 --> | 4/5 |
| A4 | CSM 1B TTS | [sesame/csm-1b](https://hf.co/sesame/csm-1b) | 现代TTS模型 | 3/5 | <!-- ¥0-50 --> | 4/5 |
| A5 | Wake Word RPi | [sharjeel103/wake_word_detection](https://hf.co/sharjeel103/wake_word_detection_smart_rpi) | 唤醒词检测 | 2/5 | <!-- ¥0-100 --> | 5/5 |
| A6 | Qwen2.5 Omni 7B | [Qwen/Qwen2.5-Omni-7B](https://hf.co/spaces/Qwen/Qwen2.5-Omni-7B-Demo) | 多模态对话 | 4/5 | <!-- ¥200-500 --> | 3/5 |
| A7 | Chatbot Voice Assistant | [Muhammad-Hassaan](https://hf.co/spaces/Muhammad-Hassaan/Chatbot_Voice_Assistant) | Gradio+语音 | 2/5 | <!-- ¥100-300 --> | 5/5 |
| A8 | SERL 机器人RL | [serl-robot.github.io](https://serl-robot.github.io/) | 强化学习 | 5/5 | <!-- ¥500-1000 --> | 2/5 |

---

## 二、环境感知 IoT & 视觉/CV 方向（调研员B）| IoT & CV (Researcher B)

| # | 项目名称 | 链接 | 核心技术 | 难度 | 成本(¥) | 改编度 |
|---|---------|------|---------|------|---------|--------|
| B1 | Klimerko 空气质量监测 | [koconde/Klimerko](https://github.com/koconde/Klimerko) | C++, ESP32, PM传感器 | 3/5 | <!-- ¥200-350 --> | 5/5 |
| B2 | Smogly PM2.5传感器 | [mschietec/smogly](https://github.com/mschietec/smogly) | C++, ESP32 | 3/5 | <!-- ¥180-300 --> | 4/5 |
| B3 | ESPHome 室内空气监测 | [esphome/esphome-airquality](https://github.com/esphome/esphome-airquality) | ESPHome YAML | 2/5 | <!-- ¥250-400 --> | 5/5 |
| B4 | BME680 Python | [pimoroni/bme680-python](https://github.com/pimoroni/bme680-python) | Python, RPi | 2/5 | <!-- ¥300-450 --> | 4/5 |
| B5 | 智能垃圾桶IoT | GitHub topics | C++, MQTT, ESP32 | 3/5 | <!-- ¥150-250 --> | 4/5 |
| B6 | IoT 气象站 | GitHub topics | C++, Arduino | 2/5 | <!-- ¥100-200 --> | 5/5 |
| B7 | ESP32-CAM 录像+Telegram | [jordansissel](https://github.com/jordansissel/esp32-cam-video-recorder-telegram) | C++, ESP32-CAM | 3/5 | <!-- ¥80-150 --> | 4/5 |
| B8 | ESP32-CAM MJPEG 推流 | [yoursunny/esp32-cam-mjpeg](https://github.com/yoursunny/esp32-cam-mjpeg) | C++, MJPEG | 3/5 | <!-- ¥80-150 --> | 5/5 |
| B9 | MediaPipe 手势识别 | [google/mediapipe](https://github.com/google/mediapipe) | Python, MediaPipe | 4/5 | <!-- ¥300-500 --> | 5/5 |
| B10 | OpenCV 运动检测 | GitHub topics/opencv | Python, OpenCV | 3/5 | <!-- ¥300-500 --> | 5/5 |
| B11 | 全身手势键盘 | GitHub topics/mediapipe | Python, MediaPipe | 4/5 | <!-- ¥300-500 --> | 4/5 |
| B12 | ESP32-CAM 运动检测+通知 | [techbase123/pycameresp](https://github.com/techbase123/pycameresp) | Python, ESP32-CAM | 3/5 | <!-- ¥150-300 --> | 5/5 |

---

*详细报告见 | Detailed reports:*
- *reports/01a_research_desktop_speaker.md*
- *reports/01b_research_iot_cv.md*
