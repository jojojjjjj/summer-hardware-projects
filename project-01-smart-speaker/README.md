# 智能音箱 "小智同学" | Smart Speaker "Xiao Zhi"

## 项目简介 | Project Overview

"小智同学"是一个基于 Raspberry Pi 的智能语音助手项目。通过本课程，你将学习如何构建一个能够听懂语音、理解语义并作出语音回应的智能音箱。

> "Xiao Zhi" is a smart voice assistant project based on Raspberry Pi. Through this course, you will learn how to build a smart speaker that can listen to voice, understand semantics, and respond with speech.

## 最终效果 | Final Result

完成本项目后，你将拥有一个能够：
- 通过唤醒词激活（如"小智同学"）
- 听懂你的语音问题并转换为文字
- 调用大语言模型进行智能对话
- 用自然语音回答你的问题

After completing this project, you will have a device that can:
- Activate via wake word (e.g., "小智同学")
- Understand your voice questions and convert them to text
- Call large language models for intelligent conversation
- Answer your questions with natural speech

## 核心技术 | Core Technologies

| 技术 | 用途 | 说明 |
|------|------|------|
| **Whisper** | 语音转文字 (ASR) | OpenAI 开源的多语言语音识别模型 |
| **Edge TTS** | 文字转语音 (TTS) | 微软提供的免费文字转语音服务 |
| **LLM API** | 对话理解 | 使用 DeepSeek/OpenAI API 进行对话 |
| **Raspberry Pi** | 硬件平台 | 低成本单板计算机 |

## 硬件清单 | Hardware List

| 部件 | 规格 | 价格 | 购买建议 |
|------|------|------|----------|
| Raspberry Pi 4 | 4GB RAM | ¥280 | 淘宝搜索"树莓派4B 4GB" |
| USB 麦克风 | 标准USB接口 | ¥30 | 任意带降噪的USB麦克风 |
| 小喇叭 | 3.5mm接口 3W | ¥15 | 搜索"3W 3.5mm喇叭" |
| MicroSD 卡 | 32GB Class10 | ¥20 | 推荐闪迪或三星 |
| 电源适配器 | 5V 3A USB-C | ¥25 | 必须是3A电流 |
| 外壳 | 可选 | ¥0-30 | 可用纸盒DIY |

**总预算：约 ¥370**

## 软件环境 | Software Environment

- **操作系统：** Raspberry Pi OS (64-bit)
- **Python：** 3.9+
- **核心库：** openai-whisper, edge-tts, pyaudio

## 快速开始 | Quick Start

```bash
# 1. 克隆项目代码
git clone https://github.com/your-repo/smart-speaker.git
cd smart-speaker

# 2. 安装依赖
pip install -r software/requirements.txt

# 3. 配置 API Key
cp software/config.template.yaml software/config.yaml
# 编辑 config.yaml，填入你的 API Key

# 4. 运行主程序
python software/src/main.py
```

## 课程安排 | Course Schedule

本项目为期 **12 天**，分为三个阶段：

### 阶段一：基础准备（Day 1-3）
- Day 1: 项目介绍 + 环境搭建
- Day 2: Python 温故知新
- Day 3: 音频基础

### 阶段二：核心功能（Day 4-7）
- Day 4: 语音转文字（Whisper）
- Day 5: 文字转语音（Edge TTS）
- Day 6: LLM API 调用
- Day 7: 语音对话 MVP

### 阶段三：优化完善（Day 8-12）
- Day 8: 优化与调试
- Day 9: 唤醒词检测
- Day 10: 硬件组装
- Day 11: 功能扩展
- Day 12: 项目优化 + 演示准备

## 评分标准 | Grading Rubric

| 维度 | 权重 | 说明 |
|------|------|------|
| 技术实现 | 40% | 功能完整度、代码质量 |
| 文档质量 | 20% | README、注释、图表 |
| 演示展示 | 20% | Final Demo 清晰度与深度 |
| 进度汇报 | 10% | 每周 Check-in 质量 |
| 团队协作 | 10% | Git 提交记录、分工合理性 |

详细评分标准见 [assignments/rubric.md](assignments/rubric.md)

## 项目结构 | Project Structure

```
project-01-smart-speaker/
├── curriculum/          # 课程大纲与每日任务
│   ├── overview.md      # 课程总纲
│   ├── prerequisites.md # 前置知识
│   ├── day-01.md        # 每日课程
│   └── ...
├── hardware/            # 硬件相关
│   ├── BOM.md           # 物料清单
│   ├── wiring-guide.md  # 接线指南
│   └── ...
├── software/            # 软件代码
│   ├── src/             # 源代码
│   │   ├── main.py      # 主程序
│   │   ├── stt.py       # 语音转文字
│   │   ├── tts.py       # 文字转语音
│   │   ├── chat.py      # LLM 对话
│   │   ├── audio.py     # 音频工具
│   │   └── utils.py     # 工具函数
│   ├── tests/           # 测试
│   └── requirements.txt # Python 依赖
└── assignments/         # 作业与评分
    ├── week-1-checkin.md
    ├── week-2-checkin.md
    └── final-presentation.md
```

## 学习资源 | Learning Resources

- [Raspberry Pi 官方文档](https://www.raspberrypi.com/documentation/)
- [Whisper GitHub](https://github.com/openai/whisper)
- [Edge TTS 文档](https://github.com/rany2/edge-tts)
- [Python 官方教程](https://docs.python.org/zh-cn/3/tutorial/)

## 常见问题 | FAQ

**Q: 我需要编程基础吗？**
A: 本项目假设你有基础 Python 知识（变量、函数、列表）。如果没有，请先完成 curriculum/prerequisites.md 中列出的预备内容。

**Q: 树莓派 5 可以用吗？**
A: 可以，本项目代码兼容树莓派 4 和 5。

**Q: 可以用其他硬件吗？**
A: 原则上可以，但本项目教程专门针对 Raspberry Pi 4 优化。

## 许可证 | License

本项目采用 MIT 许可证。详见 LICENSE 文件。

---

*最后更新：2026-05-06*
*Last Updated: 2026-05-06*
