# 第一周检查点 | Week 1 Check-in

## 概述 | Overview

第一周检查点用于评估学员在前 6 天的学习成果。学员需要展示三个独立模块（STT、TTS、LLM）的正常工作。

> Week 1 check-in evaluates learning outcomes from the first 6 days. Students must demonstrate three independent modules (STT, TTS, LLM) working properly.

---

## 检查时间 | Check-in Time

**Day 6 下午 | Day 6 Afternoon**

---

## 检查内容 | Check-in Content

### 1. 环境搭建 (20%) | Environment Setup

**要求 | Requirements:**
- [ ] 树莓派系统正确安装
- [ ] Python 环境配置完成
- [ ] 所有依赖包安装成功
- [ ] 虚拟环境正常工作

**验证方法 | Verification:**
```bash
# 运行环境检查
python software/tests/test_basic.py
# 应该显示所有测试通过
```

**提交材料 | Submission:**
- 环境配置截图
- `test_basic.py` 运行结果
- `setup_notes.md` 配置笔记

---

### 2. 音频模块 (25%) | Audio Module

**要求 | Requirements:**
- [ ] 能够录制音频
- [ ] 能够播放音频
- [ ] 理解音频参数（采样率、声道）

**验证方法 | Verification:**
```bash
# 录制测试
python -c "from audio_recorder import record_audio; record_audio('test.wav', 3)"

# 播放测试
python -c "from audio_player import play_audio; play_audio('test.wav')"
```

**提交材料 | Submission:**
- 录制和播放的演示视频
- 音频文件示例
- 参数对比实验报告

---

### 3. 语音识别模块 (25%) | STT Module

**要求 | Requirements:**
- [ ] Whisper 模型成功加载
- [ ] 能够识别中文语音
- [ ] 识别准确率可接受

**验证方法 | Verification:**
```bash
# 测试语音识别
python -c "from stt import SpeechToText; stt = SpeechToText(); print(stt.transcribe('test.wav'))"
```

**提交材料 | Submission:**
- 语音识别演示
- 准确率测试报告
- 遇到的问题和解决方案

---

### 4. 语音合成模块 (20%) | TTS Module

**要求 | Requirements:**
- [ ] Edge TTS 正常工作
- [ ] 能够合成中文语音
- [ ] 语音质量可接受

**验证方法 | Verification:**
```bash
# 测试语音合成
python -c "from tts import TextToSpeech; tts = TextToSpeech(); tts.speak('你好，世界')"
```

**提交材料 | Submission:**
- 语音合成演示
- 不同语音参数测试结果

---

### 5. LLM 对话模块 (10%) | LLM Chat Module

**要求 | Requirements:**
- [ ] API Key 配置正确
- [ ] 能够调用 LLM API
- [ ] 对话功能正常

**验证方法 | Verification:**
```bash
# 测试对话
python -c "from chat import ChatBot; bot = ChatBot('your-api-key'); print(bot.chat('你好'))"
```

**提交材料 | Submission:**
- API 调用演示
- 对话示例

---

## 检查流程 | Check-in Process

### 自查阶段 (30分钟) | Self-check (30 min)

学员自行检查所有功能：
1. 运行测试脚本
2. 准备演示材料
3. 填写自查表

### 演示阶段 (15分钟/人) | Demo (15 min/person)

学员向助教演示：
1. 环境配置（2分钟）
2. 录音播放（3分钟）
3. 语音识别（3分钟）
4. 语音合成（3分钟）
5. API 对话（2分钟）
6. 问题交流（2分钟）

### 评估阶段 (5分钟) | Evaluation (5 min)

助教评估并给出反馈：
- 功能完整性
- 代码质量
- 文档质量
- 问题理解

---

## 评分标准 | Grading Criteria

| 项目 | 分数 | 标准 |
|------|------|------|
| 功能完整 | 40分 | 所有功能正常工作 |
| 代码质量 | 25分 | 代码规范、注释清晰 |
| 文档质量 | 20分 | 文档完整、易于理解 |
| 问题解决 | 15分 | 正确解决遇到的问题 |

---

## 常见问题 | Common Issues

### Q1: Whisper 下载很慢怎么办？

**A:** 使用国内镜像或预下载模型：
```bash
# 设置镜像
export HF_ENDPOINT=https://hf-mirror.com
```

### Q2: API 调用失败怎么办？

**A:** 检查：
1. API Key 是否正确
2. 网络连接是否正常
3. API 余额是否充足

### Q3: 音频设备检测不到怎么办？

**A:** 尝试：
1. 重新插拔 USB 设备
2. 使用 `lsusb` 检查
3. 重启树莓派

---

## 通过标准 | Pass Criteria

- [ ] 所有模块能独立运行
- [ ] 代码有适当注释
- [ ] 文档完整清晰
- [ ] 能解释遇到的问题和解决方案

**总分 ≥ 60 分为通过**

---

## 下周预告 | Next Week Preview

第二周将进行：
- Day 7: 完整 MVP 实现
- Day 8: 优化与调试
- Day 9: 唤醒词检测
- Day 10: 硬件组装
- Day 11: 功能扩展
- Day 12: 最终演示

---

*最后更新：2026-05-06*
