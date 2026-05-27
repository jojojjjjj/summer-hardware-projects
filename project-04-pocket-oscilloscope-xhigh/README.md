# 口袋示波器 "波形大师" | Pocket Oscilloscope "WaveMaster"

## 项目简介 | Project Overview

你是否好奇工程师们是如何"看到"电信号的？示波器就是电子世界的"眼睛"——它能把肉眼看不见的电压变化，变成屏幕上跳动的波形图。在这个项目中，你将从零开始，亲手打造一台真正能用的口袋级数字示波器！

Have you ever wondered how engineers "see" electrical signals? An oscilloscope is the "eye" of the electronics world -- it transforms invisible voltage changes into dancing waveforms on a screen. In this project, you will build a real, functional pocket-sized digital oscilloscope from scratch!

本项目采用 STM32F103C8T6 微控制器作为核心，配合运算放大器信号调理电路、高速 ADC 采样、OLED/TFT 波形显示，构建一个带宽约 200kHz、采样率达 1Msps 的迷你示波器。你将学习模拟电路设计、嵌入式 C 编程、信号处理原理，并在最后拓展添加 DDS 信号发生器功能，实现信号的自收自发。

This project uses the STM32F103C8T6 microcontroller as the core, combined with op-amp signal conditioning circuits, high-speed ADC sampling, and OLED/TFT waveform display, to build a mini oscilloscope with approximately 200kHz bandwidth and 1Msps sampling rate. You will learn analog circuit design, embedded C programming, and signal processing principles, and optionally extend the project with a DDS signal generator for self-testing capabilities.

## 最终效果 | Final Result

完成本项目后，你将拥有一台：

Upon completing this project, you will own a device that can:

- **实时显示波形** | Real-time waveform display on a 1.8" TFT screen
- **测量信号频率** | Measure signal frequency automatically
- **自动触发稳定波形** | Auto-trigger to stabilize waveforms
- **切换时基和电压量程** | Switch timebase and voltage ranges
- **生成测试信号** | Generate test signals (bonus: AD9833 DDS signal generator)
- **口袋大小，随身携带** | Pocket-sized and portable

预期参数 | Expected Specifications：

| 参数 | 指标 |
|------|------|
| 带宽 Bandwidth | ~200kHz |
| 采样率 Sampling Rate | 1Msps (STM32 内置 ADC) |
| 通道数 Channels | 1 |
| 输入电压范围 Input Range | 0~3.3V (可扩展 0~30V 衰减网络) |
| 显示 Display | 1.8" ST7789 TFT (160x128) 或 0.96" SSD1306 OLED |
| 触发方式 Trigger | 上升沿/下降沿/自动 |
| 时基范围 Timebase | 1us/div ~ 100ms/div |
| 供电 Power | USB 5V |

## 核心技术 | Core Technologies

| 技术 Technology | 用途 Purpose | 说明 Description |
|----------------|-------------|-----------------|
| STM32F103C8T6 | 主控制器 | ARM Cortex-M3, 72MHz, 内置 12-bit ADC |
| 运算放大器 Op-Amp | 信号调理 | LM358/MCP6002, 电压跟随/放大/偏置 |
| ADC + DMA | 高速采样 | 定时器触发 + DMA 自动搬运，不占用 CPU |
| SPI/TFT 显示 | 波形渲染 | ST7789 1.8" TFT, SPI 高速通信 |
| 边沿触发 Edge Trigger | 波形稳定 | 软件实现上升沿/下降沿检测 |
| AD9833 DDS | 信号发生器 | SPI 控制, 输出正弦/三角/方波 |
| 嘉立创 EDA | PCB 设计 | 免费 PCB 设计工具，5 元打板 |
| 3D 打印 | 外壳制作 | FDM 打印定制外壳 |

## 硬件清单 | Hardware List

| 部件 Component | 规格 Specification | 数量 | 参考价格 Price | 购买建议 Source |
|---------------|-------------------|------|--------------|----------------|
| STM32F103C8T6 最小系统板 | 蓝pill板, 72MHz | 1 | 8 元 | 淘宝搜索"蓝pill STM32" |
| ST7789 TFT 显示屏 | 1.8寸 IPS, 160x128, SPI | 1 | 25 元 | 淘宝搜索"ST7789 1.8寸 TFT" |
| LM358 运放 | 双运放, DIP-8 | 2 | 2 元 | 淘宝/嘉立创商城 |
| MCP6002 运放(备选) | 轨到轨, DIP-8 | 2 | 3 元 | 淘宝/嘉立创商城 |
| AD9833 DDS 模块 | 信号发生器模块 | 1 | 15 元 | 淘宝搜索"AD9833 模块" |
| 电阻套件 | 1/4W, 10R~1M 各值 | 1 套 | 5 元 | 淘宝 |
| 电容套件 | 瓷片/电解, 10pF~100uF | 1 套 | 5 元 | 淘宝 |
| 面包板 | 830 孔 | 1 | 8 元 | 淘宝 |
| 杜邦线 | 公对公/公对母 各20根 | 1 套 | 5 元 | 淘宝 |
| USB 数据线 | Micro-USB / Type-C | 1 | 5 元 | 淘宝 |
| ST-Link V2 | 下载调试器 | 1 | 10 元 | 淘宝搜索"ST-Link V2" |
| 电源模块 | AMS1117-3.3V 稳压模块 | 1 | 5 元 | 淘宝 |
| BNC 接口(可选) | 母座, PCB 焊接型 | 1 | 3 元 | 淘宝 |
| PCB 打板 | 嘉立创 5片/5元 | 1 | 5 元 | jlcpcb.com |
| 3D 打印外壳 | PLA 材质 | 1 | 30 元 | 学校 3D 打印机 / 淘宝代打 |
| **合计 Total** | | | **约 140 元** | **远低于 500 元预算** |

> 注：如学校实验室已有万用表、烙铁等工具则无需购买。部分模块可申请样品或使用实验室库存。
> Note: If your school lab already has multimeters, soldering irons, etc., no need to purchase. Some modules can be sampled or sourced from lab inventory.

## 软件环境 | Software Environment

| 工具 Tool | 版本 Version | 用途 Purpose | 获取方式 |
|-----------|-------------|-------------|---------|
| STM32CubeMX | 最新版 | GPIO/ADC/DMA/SPI 配置 | st.com 免费下载 |
| Keil MDK / STM32CubeIDE | 最新版 | C 代码编写与编译 | st.com 免费下载 |
| ST-Link Utility | 最新版 | 固件烧录 | st.com 免费下载 |
| 串口调试助手 | 任意 | 调试输出查看 | 淘宝/免费下载 |
| Python 3.8+ | 3.8~3.12 | PC 端数据分析工具(可选) | python.org |
| 嘉立创 EDA | 最新版 | PCB 设计(第10天) | lceda.cn 免费 |

## 快速开始 | Quick Start

### 硬件准备 Hardware Setup

1. 准备 STM32F103C8T6 蓝pill板、ST7789 TFT 显示屏、面包板、杜邦线
2. 按照 `hardware/wiring-guide.md` 接线
3. 连接 ST-Link V2 下载调试器

### 软件准备 Software Setup

1. 安装 STM32CubeMX，新建工程，选择 STM32F103C8Tx
2. 按照 `software/config.template.yaml` 配置 ADC/DMA/SPI
3. 编译并烧录 `software/src/main.c`

### 第一次运行 First Run

1. 连接信号源（可用手机耳机输出正弦波测试）
2. 上电，TFT 屏幕应显示波形
3. 调节时基和电压量程，观察波形变化

## 课程安排 | Course Schedule

12天全日制课程，分为三个阶段：

12-day full-time course, divided into three phases:

### 第一阶段 Phase 1：模拟电路与 ADC 基础 | Analog Circuit & ADC Fundamentals (Day 1-4)

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|----------|----------|---------------------|
| Day 1 | 项目启动与示波器原理 | 示波器工作原理、STM32 开发环境搭建 |
| Day 2 | 运放电路与信号调理 | 同相/反相放大器、电压跟随器、偏置电路 |
| Day 3 | ADC 采样原理与 DMA | 12-bit ADC 配置、DMA 数据搬运、采样率计算 |
| Day 4 | STM32 ADC 配置与数据采集 | CubeMX 配置 ADC+DMA+TIM，串口输出波形数据 |

### 第二阶段 Phase 2：波形处理与显示 | Waveform Processing & Display (Day 5-8)

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|----------|----------|---------------------|
| Day 5 | 波形触发逻辑设计 | 边沿检测、触发电平、触发模式 |
| Day 6 | OLED/TFT 波形显示 | SPI 驱动 TFT、波形绘制、网格叠加 |
| Day 7 | 时基与采样率控制 | 定时器配置、时基档位切换、采样深度 |
| Day 8 | 频率测量与自动量程 | 周期法测频、FFT 频谱、自动量程调整 |

### 第三阶段 Phase 3：功能拓展与展示 | Extension & Presentation (Day 9-12)

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|----------|----------|---------------------|
| Day 9 | 信号发生器 DDS | AD9833 SPI 驱动、正弦/方波/三角波生成 |
| Day 10 | PCB 设计与焊接 | 嘉立创 EDA 原理图与 PCB 布局、打板焊接 |
| Day 11 | 外壳设计与系统集成 | 3D 建模、外壳打印、整机装配与调试 |
| Day 12 | 项目展示与总结 | 成果演示、Demo 网站部署、技术分享、项目复盘 |

详细每日课程内容请查看 `curriculum/day-01.md` 至 `curriculum/day-12.md`。

For detailed daily course content, see `curriculum/day-01.md` through `curriculum/day-12.md`.

## 评分标准 | Grading Rubric

| 维度 Dimension | 权重 Weight | 说明 Description |
|----------------|-----------|-----------------|
| 技术实现 Technical Implementation | 35% | 功能完整度、波形显示质量、触发稳定性 |
| 文档质量 Documentation | 9% | README、注释、接线图、原理说明 |
| 演示展示 Presentation | 17% | 最终展示的清晰度、深度与表达能力 |
| 进度汇报 Check-ins | 17% | 每周进度报告的质量与及时性 |
| 团队协作 Collaboration | 9% | Git 记录、分工合理性、互助精神 |
| Demo 网站 Project Demo Website | 13% | 项目展示网站的内容完整性、视觉呈现、技术深度 |

## 项目结构 | Project Structure

```
project-04-pocket-oscilloscope/
├── README.md                          # 本文件，项目总览
├── curriculum/                        # 课程文档
│   ├── overview.md                    # 课程大纲总览
│   ├── prerequisites.md               # 前置知识与准备
│   ├── assignments.md                 # 作业说明
│   ├── grading-rubric.md              # 详细评分标准
│   └── day-01.md ~ day-12.md          # 每日课程内容
├── hardware/                          # 硬件相关
│   ├── BOM.md                         # 物料清单
│   ├── wiring-guide.md                # 接线指南
│   ├── assembly-steps.md              # 组装步骤
│   └── troubleshooting.md             # 硬件故障排除
├── software/                          # 软件代码
│   ├── requirements.txt               # Python 依赖 (PC 工具)
│   ├── config.template.yaml           # 配置模板
│   ├── src/                           # 源代码
│   │   ├── main.py                    # 主程序入口
│   │   ├── adc_sampler.py             # ADC 采样模块
│   │   ├── waveform.py                # 波形数据处理
│   │   ├── trigger.py                 # 触发逻辑
│   │   ├── display.py                 # 显示渲染
│   │   ├── signal_gen.py              # 信号发生器
│   │   └── utils.py                   # 工具函数
│   └── tests/
│       └── test_basic.py              # 基础测试
├── assignments/                       # 作业与评分
│   ├── week-1-checkin.md              # 第一周进度报告
│   ├── week-2-checkin.md              # 第二周进度报告
│   ├── final-presentation.md          # 最终展示要求
│   └── rubric.md                      # 详细评分表
└── resources/
    └── search-results.md              # 资源搜索结果
```

## 学习资源 | Learning Resources

### 推荐 B 站视频 | Recommended Bilibili Videos

**DIY 制作教程 (必看) | DIY Build Tutorials (Must Watch):**

1. **【开源】STM32 简易示波器基本设计原理讲解** - AxinDIY
   - https://www.bilibili.com/video/BV15i4y1U78x/
   - 开源 STM32 示波器项目，讲解基本设计原理，本项目的核心参考

2. **使用江科大 STM32 套件手搓示波器（双 ADC 交替触发+DMA）** - ChaosLogic_
   - https://www.bilibili.com/video/BV1XH4y1G7TK/
   - 讲解双 ADC 快速交替触发 + DMA，达到硬件最快采集率，代码已开源

3. **(开源) 基于 STM32F103 的多功能仪器（示波器+信号发生+万用表）** - 点灯子曰
   - https://www.bilibili.com/video/BV1oPn2zZExh/
   - 与本项目高度契合，含信号发生器拓展功能，开源

4. **(开源) 电路讲解 | 基于 STM32F103 的多功能仪器** - 点灯子曰
   - https://www.bilibili.com/video/BV1NtW9zTEoK/
   - 上条视频的电路详解版，适合深入学习电路设计

5. **嘉立创训练营 -- 简易示波器制作（喂饭级教学）** - 星星是自由的方向
   - https://www.bilibili.com/video/BV1jD421j7u6/
   - 1.7 万播放，嘉立创 PCB 打板 + 焊接 + 调试全流程，适合零基础

**原理与使用教程 | Theory & Usage Tutorials:**

6. **只会一键 Auto？如何用示波器的触发捕捉波形** - Expert 电子实验室
   - https://www.bilibili.com/video/BV1HRVRz3EyK/
   - 4.0 万播放，触发原理详解，波形捕捉核心知识

7. **ADC+DMA+TIM 实现简易示波器 (STM32CubeMX)** - 祖传模块
   - https://www.bilibili.com/video/BV1GC4y1T7BN/
   - CubeMX 配置 ADC+DMA+定时器触发采样，技术点高度相关

8. **示波管原理演示视频** - 尤里卡学院
   - https://www.bilibili.com/video/BV174411h7bn/
   - 2.6 万播放，原理动画演示，适合理解示波器工作原理

### GitHub 开源项目 | Open Source Projects

| 项目 Project | Stars | 说明 Description |
|-------------|-------|-----------------|
| [DIY-Oscilloscope-base-STM32F103C8T6](https://github.com/VanAn-nd/DIY-Oscilloscope-base-STM32F103C8T6) | 20 | 基于蓝pill板的 DIY 示波器，本项目主要参考 |
| [DLO-138](https://github.com/ardyesp/DLO-138) | 400 | DSO-138 开源固件替代，完整原理图和固件 |
| [DSO138](https://github.com/essboyer/DSO138) | 74 | DSO138 原版固件源码 |
| [open-oscilloscope-stm32f3](https://github.com/elmot/open-oscilloscope-stm32f3) | 40 | STM32F3 Discovery 板示波器 |
| [Esp32_oscilloscope](https://github.com/BojanJurca/Esp32_oscilloscope) | 1022 | ESP32 Web 示波器方案 |

### 参考书籍与文档 | Reference Books & Docs

- STM32F103 参考手册 (RM0008) -- ST 官网下载
- 《运算放大器权威指南》(Op Amps for Everyone) -- TI 免费文档
- DSO-138 原理图与用户手册 -- JYE Tech 官网
- 嘉立创 EDA 教程 -- lceda.cn 帮助文档

## 常见问题 | FAQ

**Q: 没有任何电子基础可以做这个项目吗？**
A: 可以！本课程从最基础的电路知识开始教起，Day 1 会讲解所有必要的前置知识。但建议提前阅读 `curriculum/prerequisites.md` 做好准备。

**Q: 我需要会编程吗？**
A: 不需要编程基础。课程会从 C 语言基础开始，重点在于理解嵌入式编程的思路而非语法。项目模板代码已准备好，你只需要修改参数和添加功能。

**Q: 硬件买错了怎么办？**
A: 查看 `hardware/troubleshooting.md` 中的常见硬件问题。最重要的是确认 STM32 型号和显示屏接口是否匹配。建议在淘宝购买时对比 BOM 清单。

**Q: 示波器能测多高的频率？**
A: 使用 STM32 内置 ADC，理论带宽约 200kHz，可以测量音频范围内的信号 (20Hz~20kHz)。这足以测量 Arduino PWM、传感器输出、音频信号等常见信号。

**Q: 信号发生器功能是必须的吗？**
A: 不是。信号发生器 (AD9833 DDS) 是第三阶段的拓展功能，核心项目 (示波器) 不依赖它完成。但它能让你自己产生测试信号，非常有趣！

**Q: 可以用 Arduino 代替 STM32 吗？**
A: 不建议。Arduino (ATmega328P) 的 ADC 采样率最高约 10ksps，远低于 STM32 的 1Msps。STM32F103 蓝pill板价格仅 8 元，性价比远超 Arduino。

## 许可证 | License

本项目课程文档采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议发布。

软件代码基于 [MIT License](https://opensource.org/licenses/MIT) 发布。

This project course materials are released under CC BY-NC-SA 4.0. Software code is released under MIT License.

---

*最后更新：2026-05-26*
*Last updated: 2026-05-26*
