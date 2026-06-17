# Summer Hardware Projects | 暑期硬件实践课程

面向高中生的暑期硬件实践课程资源库 — 9 个从入门到进阶的开源硬件项目，涵盖 IoT、机器人、FPGA、AI、信号处理等多个方向。

> A summer hardware practicum resource library for high school students — 9 open-source projects from beginner to advanced, covering IoT, robotics, FPGA, AI, signal processing, and more.

---

## 项目总览 | Project Overview

| # | 项目 | 方向 | 难度 | 周期 | 成本 | 核心平台 |
|---|------|------|------|------|------|----------|
| 06 | [天气魔方](project-06-weather-cube-easy/) | IoT 入门 | ★☆☆☆☆ | 12 天 | ~¥45 | ESP8266 + OLED |
| 02 | [空气管家](project-02-env-monitor-mid/) | IoT | ★★☆☆☆ | 12 天 | ~¥250 | ESP32 + MQTT + Grafana |
| 09 | [桌面卫星](project-09-desk-satellite-high/) | IoT 进阶 | ★★★☆☆ | 12 天 | ~¥200 | ESP32-C3 + TFT + 太阳能 |
| 05 | [桌宠机器人](project-05-desktop-pet-mid/) | 嵌入式 AI | ★★★☆☆ | 12 天 | ~¥120-400 | ESP32-S3 + LVGL + LLM |
| 01 | [双目热成像](project-01-binocular-thermal-imager/) | 传感器融合 | ★★★☆☆ | 15 天 | ~¥180 | STM32 + MLX90640 + Android |
| 03 | [幻想键盘](project-03-4mode-keyboard/) | 嵌入式全栈 | ★★★★☆ | 20 天 | ~¥1028 | ESP32-S3 x3 + FOC + 12 PCBs |
| 07 | [轮行者](project-07-bipedal-wheeled-robot-high/) | 机器人 | ★★★★☆ | 12 天 | ~¥300 | ESP32 + BLDC + FOC + PID |
| 04 | [TinyAWG](project-04-pocket-oscilloscope-high/) | FPGA/信号处理 | ★★★★☆ | 12 天 | ~¥220 | ZYNQ7010 + 14-bit DAC |
| 08 | [ElectronBot](project-08-electronbot-xhigh/) | 全栈机器人 | ★★★★★ | 12 天 | ~¥450 | STM32F4 + USB HS + Unity + OpenPose |

> 表格按难度从低到高排列。每个项目均基于真实开源项目改编，包含完整课程大纲、代码框架、硬件清单和评分标准。

---

## 项目简介 | Project Details

### 06 — 天气魔方 Weather Cube | ★☆☆☆☆ 入门

ESP8266 + 0.96 寸 OLED，从零构建桌面迷你气象时钟。通过网络 API 获取实时天气、NTP 时间同步、WiFi 配网，仅需 4 根线即可完成核心接线。**总成本约 ¥45，是所有项目中门槛最低的。**

### 02 — 空气管家 Air Butler | ★★☆☆☆ 基础

ESP32 + BME680 温湿度气压传感器 + PMS5003 PM2.5 传感器，构建完整 IoT 环境监测站。数据通过 MQTT 上传，在 Grafana 仪表盘实时可视化。覆盖数据采集→传输→存储→可视化全链路。

### 09 — 桌面卫星 Desk Satellite | ★★★☆☆ 进阶 IoT

ESP32-C3 + ST7735 彩色 TFT + SHT31-D 高精度温湿度传感器，搭配锂电池、Type-C 充电和太阳能板供电。手工铜线 + 黄铜管弯制独特卫星造型外壳，兼顾工程技术与动手创意。

### 05 — 桌宠机器人 Desktop Pet | ★★★☆☆ 嵌入式 AI

提供两条平行轨道：**Track A**（ESP-SparkBot，ESP-IDF 从焊接开始构建桌面 AI 机器人，支持 LLM 语音对话、人脸识别、蓝牙音箱，约 ¥120）和 **Track B**（AICat，Arduino + Qwen 3.5 Omni 多模态云端大模型，四足行走 + 表情系统，约 ¥350）。

### 01 — 双目热成像 ThermalEyes | ★★★☆☆ 传感器融合

STM32F411 + MLX90640 热成像传感器 + 可见光摄像头，通过 USB 连接手机，利用 OpenCV 实时融合可见光与热成像画面。需要同时开发 STM32 固件（C）和 Android APP（Java + OpenCV NDK）。

### 03 — 幻想键盘 FantasyKB | ★★★★☆ 嵌入式全栈

4 模无线机械键盘，集成 FOC 无刷电机旋钮屏、语音交互、USB Hub、磁吸扩展。涉及 3 颗 ESP32-S3、12 块 PCB（含 4 块四层板）、ESP-IDF FreeRTOS 多任务开发。本项目复杂度最高、周期最长（20 天），但采用模块化设计，完成核心功能即可获得合格成绩。

### 07 — 轮行者 WheelWalker | ★★★★☆ 机器人

基于 StackForce 平台的两轮自平衡轮足机器人。ESP32 + BLDC 电机 + SimpleFOC 磁场定向控制 + MPU6050 姿态感知 + 串级 PID 平衡算法。蓝牙/WiFi 手机遥控。从倒立摆建模到参数整定的完整控制工程实践。

### 04 — TinyAWG 口袋信号发生器 | ★★★★☆ FPGA/信号处理

Xilinx ZYNQ7010（ARM Cortex-A9 + FPGA）+ 14 位高速 DAC（AD9744），构建 200MSa/s 采样率、35MHz 带宽的专业级任意波形发生器。学习 FPGA 数字设计（Verilog）、DDS 直接数字合成、嵌入式 C 编程和 LVGL 触摸屏 GUI。

### 08 — ElectronBot | ★★★★★ 全栈挑战

稚晖君（peng-zhihui）设计的迷你桌面机器人。STM32F405 + USB 2.0 High-Speed + 6 自由度舵机（每个关节独立 STM32F042 + PID 闭环）+ GC9A01 圆形 LCD 表情 + Unity 上位机 + OpenPose 人体姿态跟随。涉及 QFN 焊接、USB HS 协议、多层 PCB 设计、Unity/C# 开发，是所有项目中难度最高的。

---

## 技术方向覆盖 | Tech Domain Coverage

| 技能 | 01 热成像 | 02 空气管家 | 03 键盘 | 04 TinyAWG | 05 桌宠 | 06 天气魔方 | 07 轮行者 | 08 ElectronBot | 09 卫星 |
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| C/C++ 编程 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Python | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | — |
| 嵌入式开发 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| PCB 设计 | ✅ | — | ✅ | ✅ | ✅ | — | — | ✅ | — |
| FPGA/Verilog | — | — | — | ✅ | — | — | — | — | — |
| 无线通信 | — | ✅ | ✅ | — | ✅ | ✅ | ✅ | — | ✅ |
| IoT 协议 | — | ✅ | — | — | — | — | — | — | — |
| 电机控制 | — | — | ✅ | — | ✅ | — | ✅ | ✅ | — |
| AI/ML | — | — | — | — | ✅ | — | — | ✅ | — |
| 计算机视觉 | ✅ | — | — | — | ✅ | — | — | ✅ | — |
| 移动端开发 | ✅ | — | — | — | — | — | — | — | — |
| USB 协议 | ✅ | — | ✅ | — | ✅ | — | — | ✅ | — |
| Git 版本控制 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 仓库结构 | Repository Structure

```
summer-hardware-projects/
├── prompts/                      # Claude Code Teams 提示词（项目生成指令）
├── reports/                      # 调研报告与可行性分析
│
├── project-01-binocular-thermal-imager/   # 双目热成像
├── project-02-env-monitor-mid/            # 环境监测站
├── project-03-4mode-keyboard/             # 4模机械键盘
├── project-04-pocket-oscilloscope-high/   # 口袋信号发生器
├── project-05-desktop-pet-mid/            # 桌宠机器人（双轨道）
├── project-06-weather-cube-easy/          # 天气魔方
├── project-07-bipedal-wheeled-robot-high/ # 轮足机器人
├── project-08-electronbot-xhigh/          # ElectronBot 高级桌面宠物
└── project-09-desk-satellite-high/        # 桌面卫星气象站
```

> 🔗 **9 个 `project-NN-*` 目录均为 git submodule**，各自指向独立公开仓库（`https://github.com/jojojjjjj/<folder>`，分支 `main`）。完整克隆：
> `git clone --recurse-submodules https://github.com/jojojjjjj/summer-hardware-projects.git`
> 已克隆的仓库补全子模块：`git submodule update --init --recursive`

每个项目文件夹包含统一结构：

```
project-XX-name/
├── README.md              # 项目完整说明
├── curriculum/            # 课程大纲 + 每日任务（day-01 ~ day-XX）
├── hardware/              # 物料清单 BOM、接线指南、组装步骤
├── software/              # 代码框架、配置模板、依赖说明
└── assignments/           # 作业模板、评分标准、周报格式
```

---

## 设计原则 | Design Principles

**超细粒度引导** — 每个概念都有"为什么学"的解释，每个步骤都有预期结果验证，每天都有明确的可交付成果。

**大学课程标准** — 包含正式的项目提案、每周进度汇报、最终展示、Git 工作流和技术文档撰写。

**真实可复现** — 所有项目基于社区验证的开源项目改编，确保有真实的社区资源和论坛支持。

---

## 快速开始 | Quick Start

1. 根据学员基础选择合适难度的项目（推荐从 Project 06 天气魔方入门）
2. 进入对应项目目录，阅读 `README.md`
3. 按 `curriculum/day-01.md` 开始第一天课程
4. 每天结束时完成当日作业，记录进度

---

## 核心参数 | Core Parameters

| 参数 | 说明 |
|------|------|
| 目标学员 | 高中生（理工科兴趣方向） |
| 项目周期 | 10–20 天全日制 |
| 投入强度 | 每天 6–8 小时 |
| 技术起点 | 零基础 / 薄弱基础 |
| 文档语言 | 中英双语 |

---

## 评分体系 | Grading

每个项目统一采用多维度评分：

| 维度 | 权重 | 说明 |
|------|------|------|
| 技术实现 | 35-40% | 功能完整度、代码质量 |
| 文档质量 | 9-20% | README、注释、图表 |
| 演示展示 | 15-20% | Final Demo 清晰度与深度 |
| Demo 网站 | 13-15% | 项目展示网站 |
| 进度汇报 | 10-17% | 每周 Check-in 质量 |
| 团队协作 | 9-10% | Git 提交记录、分工合理性 |

---

## 许可证 | License

各项目遵循其对应开源项目的原始许可证，课程文档采用 CC BY-NC-SA 4.0。

---

*Generated with Claude Code Teams Mode | Bilingual (Chinese / English)*
