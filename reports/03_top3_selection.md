# Top 3 项目最终选择 | Top 3 Project Final Selection
<!-- 注：价格信息已注释隐藏（查价不准确，仅作参考不严谨）/ Note: price info commented out (inaccurate, not rigorous as reference) -->

**选择日期 | Date:** 2026-05-05
**选择标准 | Criteria:** 覆盖 ≥2 个方向、难度梯度合理、改编路径清晰、成本 <!-- < ¥500 -->

---

## 选出的 3 个项目 | Selected Projects

### 🥇 Project 01: 智能音箱 — "小智同学" | Smart Speaker — "Xiao Zhi"

| 维度 | 说明 |
|------|------|
| **方向** | 智能音箱 / 语音助手 |
| **难度梯度** | ★★☆☆☆（最易，适合入门） |
| **预计周期** | 12-15 天 |
| **硬件成本** | <!-- ¥350-400 --> |
| **核心技术** | Python, Whisper (ASR), Edge TTS, LLM API, Raspberry Pi |
| **开源基础** | Whisper (OpenAI), Edge TTS, wake_word_detection_smart_rpi, Gradio Voice Assistant |
| **改编路径** | Phase 1: 文字对话 → Phase 2: 语音输入(STT) → Phase 3: 语音输出(TTS) → Phase 4: 唤醒词 |

**选择理由 | Why this project:**
- 完整的 AI 应用链路，涵盖现代 AI 开发的核心技能（ASR、LLM、TTS）
- Python 全栈，与高中生编程入门完美衔接
- 最终效果直观（说话→AI回答→语音播放），展示性强
- 成本可控，核心硬件仅需 RPi + 麦克风 + 喇叭

---

### 🥈 Project 02: 环境感知监测站 — "空气管家" | Environmental Monitor — "Air Butler"

| 维度 | 说明 |
|------|------|
| **方向** | 环境感知 IoT |
| **难度梯度** | ★★★☆☆（中等） |
| **预计周期** | 12-15 天 |
| **硬件成本** | <!-- ¥250-350 --> |
| **核心技术** | ESP32, ESPHome/MicroPython, MQTT, BME680, PM传感器, Grafana |
| **开源基础** | ESPHome, Klimerko, BME680-Python, Smogly |
| **改编路径** | Phase 1: 单传感器读取 → Phase 2: 多传感器整合 → Phase 3: 数据上传(MQTT) → Phase 4: 可视化仪表盘 |

**选择理由 | Why this project:**
- IoT 入门的经典项目，覆盖嵌入式开发全链路
- ESP32 成本极低（<!-- ¥35 -->），整套硬件 <!-- ¥300 以内 -->
- 社会意义强（空气质量、环境健康），容易引发学员兴趣
- 前半程可使用 ESPHome 低门槛入门，后半程用 MicroPython 深化编程

---

### 🥉 Project 03: 手势互动装置 — "魔法手势" | Gesture Interactive Installation — "Magic Gesture"

| 维度 | 说明 |
|------|------|
| **方向** | 视觉 / CV |
| **难度梯度** | ★★★★☆（较高，作为进阶项目） |
| **预计周期** | 14-18 天 |
| **硬件成本** | <!-- ¥300-500 --> |
| **核心技术** | Python, MediaPipe, OpenCV, 摄像头, 实时交互 |
| **开源基础** | Google MediaPipe, OpenCV, ESP32-CAM |
| **改编路径** | Phase 1: 摄像头采集+显示 → Phase 2: 手部关键点检测 → Phase 3: 手势识别+交互 → Phase 4: 创意扩展(手势控制游戏/音乐/灯光) |

**选择理由 | Why this project:**
- CV/AI 入门的最佳项目，MediaPipe API 极其友好
- 视觉效果震撼，最终展示极具吸引力
- 可用笔记本电脑摄像头运行，降低硬件门槛
- 扩展性强：手势控制、姿态互动、面部滤镜等方向丰富

---

## 难度梯度设计 | Difficulty Gradient

```
Project 01 (智能音箱)  ★★☆☆☆  ← 入门，建立信心
    ↓
Project 02 (环境监测站) ★★★☆☆  ← 进阶，学习嵌入式+IoT
    ↓
Project 03 (手势互动)  ★★★★☆  ← 挑战，CV+实时交互
```

三个项目覆盖 3 个不同方向（语音AI / IoT / 计算机视觉），知识点互补，难度递增。

---

## 知识点覆盖矩阵 | Knowledge Coverage Matrix

| 知识点 | Project 01 智能音箱 | Project 02 环境监测 | Project 03 手势互动 |
|--------|:---:|:---:|:---:|
| Python 编程 | ✅ | ✅ | ✅ |
| Linux 基础 | ✅ | ✅ | ✅ |
| 硬件接线 | ✅ | ✅ | ✅ |
| AI/ML 概念 | ✅ | - | ✅ |
| 语音处理 | ✅ | - | - |
| IoT 协议 | - | ✅ | - |
| 传感器原理 | - | ✅ | - |
| 数据可视化 | - | ✅ | ✅ |
| 计算机视觉 | - | - | ✅ |
| 实时系统 | ✅ | ✅ | ✅ |
| API 调用 | ✅ | ✅ | - |
| Git 版本控制 | ✅ | ✅ | ✅ |

---

## 下一步 | Next Steps

进入 Phase 3（详细项目构建），为每个项目生成：
1. 完整的课程大纲（每日任务）
2. 代码脚手架
3. 硬件 BOM 和接线指南
4. 作业和评分标准
