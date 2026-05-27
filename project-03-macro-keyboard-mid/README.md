# 宏键盘 "键界" | Macro Keyboard "KeyVerse"

## 项目简介 | Project Overview

"键界"是一款从零设计的模块化客制化宏键盘（Macro Keyboard），集成了旋钮（Rotary Encoder）、OLED 显示屏和 RGB 灯效。学生将在 12 天的课程中，从电子学基础出发，亲手完成原理图绘制、PCB 设计、固件开发、焊接组装全流程，最终获得一台属于自己的可编程宏键盘。

"KeyVerse" is a modular custom macro keyboard designed from scratch, featuring a rotary encoder, an OLED display, and RGB lighting effects. Over 12 days, students will progress from electronics fundamentals through schematic design, PCB layout, firmware development, and soldering — ultimately producing a fully functional programmable macro keyboard.

本项目涵盖键盘矩阵扫描（Matrix Scanning）、I2C/SPI 通信协议、USB HID 人机接口协议等核心技术，并引入热插拔轴座（Hot-swap Sockets）和 QMK 开源固件作为拓展方向。课程以实践驱动，每天 6–8 小时，让高中生在动手做中学。

This project covers key matrix scanning, I2C/SPI communication, and USB HID protocol. Extended topics include hot-swap sockets and QMK open-source firmware. The course is practice-driven at 6–8 hours per day, enabling high school students to learn by doing.

---

## 最终效果 | Final Result

完成本项目后，你将拥有一台：

Upon completing this project, you will have:

- **16 键可编程宏键盘** — 4x4 矩阵布局，每个按键可通过 VIA 软件自定义功能
- **旋转旋钮** — 可调节音量、滚动页面、缩放画面或自定义操作
- **0.96 寸 OLED 屏幕** — 显示当前层号、WPM 统计、自定义动画或 LOGO
- **RGB 背光** — 16 颗 WS2812B 灯珠，支持多种灯效模式
- **热插拔轴座** — 无需焊接即可更换机械轴体
- **3D 打印外壳** — 个性化外观设计
- **完整的 PCB 设计文件** — 可自行修改和复刻

---

## 核心技术 | Core Technologies

| 技术 Technology | 用途 Purpose | 说明 Description |
|---|---|---|
| 键盘矩阵扫描 Key Matrix Scanning | 检测 16 个按键状态 | 4x4 矩阵 + 二极管防鬼键 |
| I2C 通信 | 驱动 OLED 屏幕 | SCL + SDA 两线制，地址 0x3C |
| SPI 通信 | 高速外设通信基础 | 理解主从架构与片选机制 |
| USB HID 协议 | 向电脑发送按键数据 | 8 字节标准键盘报告 |
| QMK 固件 | 开源键盘固件框架 | 支持矩阵扫描、RGB、OLED、编码器 |
| WS2812B 可寻址 LED | RGB 灯效控制 | 单线级联协议 |
| 旋转编码器 EC11 | 旋钮输入检测 | 正交解码 + 按键功能 |
| 嘉立创 EDA | PCB 设计 | 原理图绘制 + PCB 布局布线 |
| 热插拔轴座 | 免焊换轴 | Kailh 热插拔底座 |

---

## 硬件清单 | Hardware List

| 部件 Component | 规格 Specification | 价格 Price (CNY) | 购买建议 Source |
|---|---|---|---|
| STM32F103C8T6 最小系统板 | ARM Cortex-M3, 72MHz | 8 | 淘宝/拼多多 |
| 机械轴体 Gateron | 佳达隆 G Pro 3.0 | 2 x 16 = 32 | 淘宝客制化键盘店 |
| 热插拔轴座 | Kailh 热插拔底座 | 0.4 x 16 = 6.4 | 淘宝 |
| OLED 显示屏 | SSD1306 0.96 寸 128x64 I2C | 8 | 淘宝/嘉立创商城 |
| RGB 灯珠 | WS2812B 5050 | 0.2 x 16 = 3.2 | 淘宝/嘉立创商城 |
| 旋转编码器 | EC11 带按键 | 2 | 淘宝/嘉立创商城 |
| 二极管 | 1N4148 | 0.05 x 16 = 0.8 | 淘宝/嘉立创商城 |
| USB 接口 | Type-C 母座 16P | 1 | 淘宝/嘉立创商城 |
| PCB 打样 | 嘉立创 5 片 | 5 | 嘉立创 jlc.com |
| 键帽 | PBT 热升华 16 键套装 | 30 | 淘宝 |
| 杜邦线 + 面包板 | 830 孔面包板 + 杜邦线 | 20 | 淘宝 |
| 3D 打印外壳 | PLA 材质 FDM | 30 | 淘宝 3D 打印服务 |
| **总计 Total** | | **~146.4** | |

> 预算控制在 500 元以内，实际约 150 元。Budget well under 500 CNY at approximately 150 CNY.

---

## 软件环境 | Software Environment

### 固件层（运行在 STM32 上 | Firmware on STM32）
- **QMK 固件** — 开源键盘固件框架，C 语言编写
- **QMK MSYS** — Windows 下的 QMK 编译环境
- **QMK Toolbox** — 固件刷写工具
- **VIA / Vial** — 运行时可视化改键工具

### 工具层（运行在 PC 上 | Tools on PC）
- **Python 3.10+** — 测试脚本、编译辅助工具
- **嘉立创 EDA** — PCB 设计（在线版 lcEDA）
- **STM32CubeMX** — STM32 引脚配置（可选）
- **Git** — 版本控制

---

## 快速开始 | Quick Start

```bash
# 1. 克隆项目 | Clone the project
git clone <repo-url>
cd project-03-macro-keyboard

# 2. 安装 Python 依赖 | Install Python dependencies
cd software
pip install -r requirements.txt

# 3. 运行基础测试 | Run basic tests
python -m pytest tests/ -v

# 4. 按照 Day 1 课程开始学习 | Start with Day 1
# 打开 curriculum/day-01.md
```

---

## 课程安排 | Course Schedule

### 第一阶段：电子基础与工具入门（Day 1–4）| Phase 1: Electronics Fundamentals

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|---|---|---|
| Day 01 | 项目启动与电子学基础 | 电路基础、面包板实验、LED 点亮 |
| Day 02 | 键盘矩阵扫描原理 | 矩阵拓扑、二极管防鬼键、扫描代码 |
| Day 03 | I2C 通信与 OLED 屏幕 | I2C 协议、SSD1306 驱动、屏幕显示 |
| Day 04 | RGB 灯珠与 WS2812B | 单线协议、级联控制、灯效编程 |

### 第二阶段：PCB 设计与固件开发（Day 5–8）| Phase 2: PCB Design & Firmware

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|---|---|---|
| Day 05 | EDA 工具入门 | 嘉立创 EDA 安装、元件库、基础绘制 |
| Day 06 | 键盘原理图绘制 | 完整 4x4 矩阵原理图 + 外设连接 |
| Day 07 | PCB 布局与打样 | 布局布线、DRC 检查、Gerber 导出 |
| Day 08 | QMK 固件基础 | QMK 架构、keyboard.json、keymap.c |

### 第三阶段：集成调试与展示（Day 9–12）| Phase 3: Integration & Demo

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|---|---|---|
| Day 09 | USB HID 协议与固件编译 | HID 报告描述符、编译与刷写 |
| Day 10 | 焊接与组装 | 元件焊接、热插拔轴座、外壳组装 |
| Day 11 | 系统集成与调试 | 全功能联调、问题排查、灯效优化 |
| Day 12 | 项目展示与总结 | 成果演示、Demo 网站部署、技术分享、复盘总结 |

---

## 评分标准 | Grading Rubric

| 维度 Dimension | 权重 Weight | 说明 Description |
|---|---|---|
| 技术实现 Technical Implementation | 40 分 | 功能完整度、代码质量、PCB 设计合理性 |
| 文档质量 Documentation | 20 分 | README、注释、原理图标注、接线图 |
| 演示展示 Final Demo | 20 分 | 现场演示清晰度、功能展示完整性 |
| Demo 网站 Project Demo Website | 15 分 | 在线项目展示网站（可访问性、内容完整性、视觉呈现） |
| 进度汇报 Check-in Reports | 10 分 | 每周汇报的质量与及时性 |
| 团队协作 Collaboration | 10 分 | Git 提交记录、分工合理性、互助精神 |
| **总分 Total** | **115 分** | |

---

## 项目结构 | Project Structure

```
project-03-macro-keyboard/
├── README.md                          # 本文件 | This file
├── resources/
│   └── search-results.md              # 资源搜索结果 | Resource search results
├── curriculum/                        # 课程文档 | Curriculum
│   ├── overview.md                    # 课程概述 | Course overview
│   ├── prerequisites.md               # 前置知识 | Prerequisites
│   ├── assignments.md                 # 作业说明 | Assignments
│   ├── grading-rubric.md              # 评分细则 | Grading details
│   ├── day-01.md ~ day-12.md          # 每日课程 | Daily lessons
├── hardware/                          # 硬件文档 | Hardware docs
│   ├── BOM.md                         # 物料清单 | Bill of Materials
│   ├── wiring-guide.md               # 接线指南 | Wiring guide
│   ├── assembly-steps.md             # 组装步骤 | Assembly steps
│   └── troubleshooting.md            # 故障排查 | Troubleshooting
├── software/                          # 软件代码 | Software
│   ├── requirements.txt              # Python 依赖 | Python deps
│   ├── config.template.yaml          # 配置模板 | Config template
│   ├── src/                          # 源代码 | Source code
│   │   ├── main.py                   # 主程序 | Main entry
│   │   ├── keymatrix.py              # 矩阵扫描 | Matrix scanning
│   │   ├── oled_display.py           # OLED 驱动 | OLED driver
│   │   ├── rgb_led.py                # RGB 控制 | RGB control
│   │   ├── encoder.py                # 旋钮解码 | Encoder decode
│   │   ├── usb_hid.py                # USB HID | HID protocol
│   │   └── utils.py                  # 工具函数 | Utilities
│   └── tests/                        # 测试代码 | Tests
│       └── test_basic.py             # 基础测试 | Basic tests
└── assignments/                       # 作业模板 | Assignment templates
    ├── week-1-checkin.md             # 第一周汇报 | Week 1 check-in
    ├── week-2-checkin.md             # 第二周汇报 | Week 2 check-in
    ├── final-presentation.md         # 最终展示 | Final presentation
    └── rubric.md                     # 评分量表 | Rubric
```

---

## 学习资源 | Learning Resources

### B 站视频（精选推荐）| Bilibili Videos (Curated)

#### PCB 设计 | PCB Design

1. **[苏达] 有手就行！从 PCB 开始打造专属终极键盘（系列完结，共十集）**
   - UP 主：苏达酱 | 播放量：2.4 万
   - 链接：https://www.bilibili.com/video/BV1mB4y1F7oj/
   - 推荐理由：**最完整的键盘制作系列教程**，从 PCB 设计到整体组装，全程手把手教学
   - Recommended: Complete 10-part series from PCB design to final assembly.

2. **[不专业教学] 零基础绘制机械键盘 PCB | 客制化键盘 | 键盘原理图 PCB 绘制**
   - UP 主：浚达良 | 播放量：2.2 万 | 时长：59:38
   - 链接：https://www.bilibili.com/video/BV1vz4y127qL/
   - 推荐理由：从零基础完整讲解键盘原理图和 PCB 绘制，非常适合入门
   - Recommended: Zero-to-PCB tutorial, ideal for beginners.

3. **[大佬勿入] 机械键盘 RGB 贴片灯珠焊接重点讲解及全过程**
   - UP 主：YK-Yan 客制化 | 播放量：3.1 万 | 时长：36:15
   - 链接：https://www.bilibili.com/video/BV1rh411U7wK/
   - 推荐理由：**与本项目 RGB 灯效高度相关**，详细讲解贴片灯珠焊接过程
   - Recommended: Detailed WS2812B soldering walkthrough, directly relevant to this project.

#### QMK 固件 | QMK Firmware

4. **[QMK 教程] 从配置编译环境到实现 RGB 矩阵灯效、OLED 屏幕动画、旋钮编码器、VIA 改键、ARM 移植的详细大教学**
   - UP 主：HiryKun | 播放量：2.1 万 | 时长：01:03:27
   - 链接：https://www.bilibili.com/video/BV1pt4y1a7dG/
   - 推荐理由：**本项目最核心的参考视频**！覆盖 RGB、OLED、编码器、VIA、ARM 移植全部技术点
   - Recommended: **The single most important reference** — covers every feature needed.

5. **[QMK 教程] Vial 的支持与配置，让你的键盘方便改键/改编码器/改灯效**
   - UP 主：HiryKun | 播放量：2.8 万 | 时长：23:37
   - 链接：https://www.bilibili.com/video/BV1ft4y1t7vx/
   - 推荐理由：讲解 Vial 配置工具的使用，支持编码器和灯效自定义
   - Recommended: Vial configuration tool tutorial.

6. **[QMK] 带有旋钮（编码器）的 QMK 键盘 VIA 自定义固件写法以及进阶**
   - UP 主：forkingDog | 播放量：4898 | 时长：23:18
   - 链接：https://www.bilibili.com/video/BV17m4y1o7of/
   - 推荐理由：**专门讲解旋钮编码器在 QMK 中的实现**，直接适用于本项目的旋钮功能
   - Recommended: Rotary encoder implementation in QMK, directly applicable.

7. **QMK 固件编写（完整教程）**
   - UP 主：codeDuck | 播放量：6104 | 时长：01:38:59
   - 链接：https://www.bilibili.com/video/BV1jF411c7AB/
   - 推荐理由：近 100 分钟的 QMK 固件编写完整教程
   - Recommended: Comprehensive 100-minute QMK firmware tutorial.

8. **入门客制化键盘 — 基础刷写编译 QMK 固件常用工具介绍**
   - UP 主：浚达良 | 播放量：1.1 万 | 时长：07:03
   - 链接：https://www.bilibili.com/video/BV1JS4y1D79D/
   - 推荐理由：介绍 QMK MSYS、QMK Toolbox 等基础工具
   - Recommended: QMK toolchain overview (QMK MSYS, QMK Toolbox).

### 推荐 UP 主 | Recommended Bilibili Creators

| UP 主 Creator | 擅长领域 Specialty | 主页 Homepage |
|---|---|---|
| HiryKun | QMK 固件深度教程 | https://space.bilibili.com/50496994 |
| 浚达良 | 键盘 PCB + QMK 编译系列 | https://space.bilibili.com/617817373 |
| 苏达酱 | PCB 到组装完整系列 | https://space.bilibili.com/7555349 |
| 丈二先生呀 | 零基础客制化键盘 DIY | https://space.bilibili.com/96142236 |
| codeDuck | QMK 固件编写与无线键盘 | https://space.bilibili.com/1755131967 |

### GitHub 开源项目 | Open-Source Projects

| 项目 Project | Stars | 说明 Description |
|---|---|---|
| [QMK Firmware](https://github.com/qmk/qmk_firmware) | 18k+ | 最流行的开源键盘固件 |
| [Sofle Keyboard](https://github.com/josefadamcik/SofleKeyboard) | 2.5k+ | 带 OLED 和旋钮的分体键盘 |
| [KMK Firmware](https://github.com/KMKfw/kmk_firmware) | 1.5k+ | CircuitPython 键盘固件 |
| [Discipline](https://github.com/coseyfannitutti/discipline) | 2k+ | 直插元件键盘 PCB 入门参考 |

### 官方文档 | Official Documentation

- QMK 官网：https://qmk.fm/
- QMK 文档：https://docs.qmk.fm/
- QMK 在线配置器：https://config.qmk.fm/
- Vial 下载：https://vial.rocks/
- 嘉立创 EDA：https://lceda.cn/
- 嘉立创开源硬件平台：https://oshwhub.com/

### 推荐书籍 | Recommended Books

- 《圈圈教你玩USB》— 中文 USB 入门经典，讲解 HID 协议
- QMK 源码：https://github.com/qmk/qmk_firmware — 最好的固件学习材料

---

## 常见问题 | FAQ

**Q: 我完全没有电子学基础，能参加这个项目吗？**
A: 可以。Day 1 从最基础的电路知识开始，每天循序渐进。只要认真跟着课程走，零基础也能完成。
Yes. Day 1 starts from the very basics. Follow along step by step and you will succeed.

**Q: 焊接很难吗？需要提前练习吗？**
A: 焊接有一定难度，Day 10 会专门讲解焊接技巧。建议课余时间用废旧电路板练习。
Soldering has a learning curve. Day 10 covers techniques; practice on scrap boards beforehand if possible.

**Q: 如果 PCB 设计有错误怎么办？**
A: PCB 打样只需要 5 元（嘉立创），出错可以重新打样。建议反复检查 DRC 再送样。
PCB prototyping costs only 5 CNY. Re-run DRC before ordering; reprint if needed.

**Q: QMK 固件难学吗？**
A: QMK 有完善的文档和社区。本课程会从基础配置开始，逐步添加 RGB、OLED、编码器功能。
QMK has excellent documentation and community support. We build up features incrementally.

**Q: 项目完成后还能继续拓展吗？**
A: 当然。你可以增加更多按键、更换更强的主控、添加蓝牙无线功能、或尝试 FreeRTOS 多任务调度。
Absolutely. Add more keys, upgrade the MCU, add Bluetooth, or explore FreeRTOS multitasking.

**Q: 可以用其他主控替代 STM32F103 吗？**
A: 可以。ATmega32U4（内置 USB）和 RP2040（Raspberry Pi Pico）都是很好的替代方案。
Yes. ATmega32U4 (built-in USB) and RP2040 (Raspberry Pi Pico) are excellent alternatives.

---

## 许可证 | License

本项目文档采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。
This project documentation is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

软件代码部分采用 [MIT License](https://opensource.org/licenses/MIT)。
Software code is licensed under [MIT License](https://opensource.org/licenses/MIT).

---

*最后更新 | Last updated: 2026-05-26*
