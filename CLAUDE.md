# 高中生暑期硬件项目库 | High School Summer Hardware Project Repository

## 项目定位 | Project Overview

本仓库是一套专为**高中生**设计的暑期实践课程资源库，每个子文件夹对应一个独立的项目模块。

> This repository is a summer practicum resource library designed for **high school students**, where each subfolder corresponds to an independent project module.

---

## 核心参数 | Core Parameters

| 参数 | 说明 |
|------|------|
| **目标学员** | 高中生（理工科兴趣方向） |
| **项目周期** | 10–20 天（两到三周暑期集中营） |
| **知识难度** | 大学大二水平（Sophomore-level） |
| **技术起点** | 零基础 / 薄弱基础，需详细分步引导 |
| **投入强度** | 全日制，每天 6–8 小时 |
| **硬件方向** | 桌宠机器人、智能音箱、环境感知 IoT、计算机视觉 |
| **文档语言** | 中英双语 |

---

## 设计原则 | Design Principles

### 1. 笨鸟先飞原则（Fine-grained Scaffolding）
学员技术背景薄弱，因此每个项目必须提供：
- 比普通大学课程更细粒度的分支步骤
- 每一步的"为什么"解释，而不只是"怎么做"
- 前置知识清单与学习资源链接
- 常见错误与调试指南

### 2. 大学课程标准（College-level Rigor）
尽管面向高中生，课程应包含：
- 正式的项目提案（Project Proposal）
- 进度汇报（Weekly Check-in Reports）
- 最终展示（Final Demo + Presentation）
- 代码提交规范（Git workflow, PR, commit message）
- 技术文档撰写（README, API docs, wiring diagrams）

### 3. 真实可复现（Reproducible & Open-source Based）
所有项目基于社区已验证的开源项目改编，确保：
- 有真实的社区资源和论坛支持
- 硬件选型成本可控（< ¥500/套）
- 在标准暑期时间内可完成 MVP

---

## 仓库结构 | Repository Structure

```
/
├── CLAUDE.md                     # 本文件：仓库总览与设计说明
├── prompts/                      # Claude Code 运行提示词
│   ├── 00_MASTER_PROMPT.md       # 主控提示词（Teams 模式入口）
│   ├── 01_agent_roles.md         # Agent 角色定义（8个专家 Agent）
│   ├── 02_research_phase.md      # 第一阶段：项目调研指令
│   ├── 03_evaluation_phase.md    # 第二阶段：可行性评估指令
│   └── 04_project_build_phase.md # 第三阶段：详细项目构建指令
│
├── project-01-[name]/            # 项目一（由 Agent 生成后填充）
│   ├── README.md
│   ├── curriculum/               # 课程大纲、每日任务
│   ├── hardware/                 # 选型清单、接线图
│   ├── software/                 # 代码框架
│   └── assignments/              # 作业与评分标准
│
├── project-02-[name]/            # 项目二
├── project-03-[name]/            # 项目三
├── project-04-[name]/            # 项目四
├── project-05-[name]/            # 项目五
├── project-06-[name]/            # 项目六
├── project-07-[name]/            # 项目七
└── project-08-[name]/            # 项目八（进阶难度）
```

---

## 如何使用本仓库 | How to Use

### Step 1：启动 Claude Code Teams 模式
打开 Claude Code，粘贴 `prompts/00_MASTER_PROMPT.md` 的全部内容作为第一条指令。

### Step 2：等待调研与评估
Teams 中的多个 Agent 将自动分工：
- 爬取 B站、GitHub、立创开源平台等渠道的真实开源项目
- 生成可行性评估报告
- 投票选出最适合的前三个项目

### Step 3：生成详细项目文档
被选中的 3 个项目将自动生成完整的课程文档，包含每日任务、代码框架、硬件清单、作业题目等。

### Step 4：迭代完善
根据实际学员情况，使用各阶段专项提示词对项目内容进行调整。

---

## 项目方向分类 | Project Categories

| 类别 | 典型项目 | 核心技术 |
|------|---------|---------|
| 🤖 桌宠/陪伴机器人 | 能对话的桌面小机器人 | Servo、TTS、LLM API、STT |
| 🔊 智能音箱/语音助手 | 本地唤醒词 + LLM 对话 | Raspberry Pi、Whisper、wake word |
| 🌡️ 环境感知 IoT | 室内空气质量监测站 | ESP32、MQTT、InfluxDB、Grafana |
| 👁️ 视觉/CV 项目 | 实时姿态检测互动装置 | OpenCV、MediaPipe、摄像头 |

---

## 评分标准 | Grading Rubric Template

每个项目的评分维度参考大学课程标准：

| 维度 | 权重 | 说明 |
|------|------|------|
| 技术实现 | 40% | 功能完整度、代码质量 |
| 文档质量 | 20% | README、注释、图表 |
| 演示展示 | 20% | Final Demo 清晰度与深度 |
| 进度汇报 | 10% | 每周 Check-in 质量 |
| 团队协作 | 10% | Git 提交记录、分工合理性 |

---

*本仓库由 Claude Code Teams 模式自动生成并持续维护。*
*Generated and maintained by Claude Code Teams Mode.*
