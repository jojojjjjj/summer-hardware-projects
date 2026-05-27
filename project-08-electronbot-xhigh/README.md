# 项目08：ElectronBot 高级桌面宠物 | Project 08: ElectronBot Advanced Desktop Pet

> ⭐⭐⭐⭐⭐ **高级项目** — 适合有嵌入式开发经验、愿意挑战高难度硬件+软件全栈集成的学员
>
> ⭐⭐⭐⭐⭐ **Advanced** — For experienced students ready to tackle a demanding full-stack integration of custom hardware and software
>
> 本项目是 Project 05（桌宠机器人）的**平行高级轨道**，难度远超 Track A/B。如果你已经掌握了 ESP32/STM32 基础开发、PCB焊接、并且想挑战一个真正精致的桌面机器人，ElectronBot 将是你最好的选择。
>
> This project is a **parallel advanced track** to Project 05 (Desktop Pet Robot), significantly harder than Track A/B. If you have mastered ESP32/STM32 basics, PCB soldering, and want to build a truly refined desktop robot, ElectronBot is your best choice.

---

## 项目简介 | Project Overview

ElectronBot 是稚晖君（peng-zhihui）设计的一款迷你桌面机器人，灵感来源于电影《机器人总动员》（WALL-E）中的伊娃（EVE）。它拥有圆形 LCD 脸部屏幕、6自由度舵机系统、手势传感器、摄像头和 IMU，通过 USB 高速连接到 PC，配合 Unity 桌面软件与 OpenCV/OpenPose 实现人体姿态跟随、表情交互、手势识别等功能。项目完全开源，包含硬件设计、固件代码和上位机软件。

ElectronBot is a mini desktop robot designed by peng-zhihui (also known as 稚晖君), inspired by EVE from the movie WALL-E. It features a circular LCD face, a 6-DOF servo system, a gesture sensor, a camera, and an IMU. Connected to a PC via USB High-Speed, it works with Unity desktop software and OpenCV/OpenPose for body-pose tracking, facial expressions, gesture recognition, and more. The project is fully open-source, including hardware design, firmware, and host software.

**作者**: peng-zhihui（稚晖君）| **开源协议**: GPL-3.0

| 项目 | 链接 |
|------|------|
| GitHub 仓库 | https://github.com/peng-zhihui/ElectronBot |
| B站演示视频 | https://www.bilibili.com/video/BV1ka411b76m |
| Fusion 360 CAD | https://a360.co/3t6CUMS |

---

## 最终效果 | Final Result

完成本项目后，你将拥有：
- 一个精致的桌面机器人，拥有圆形 LCD "脸部"，可显示丰富表情动画
- 6自由度运动系统：双臂各2自由度（滚动+俯仰）+ 颈部旋转 + 腰部旋转
- 人体姿态跟随：通过 PC 摄像头 + OpenPose 实时跟随你的动作
- 手势交互：内置手势传感器，支持挥手、点击等手势识别
- 自定义表情与动画：通过 Unity 上位机软件编辑和播放表情
- 真正的全栈项目经验：从 PCB 设计、STM32 固件、USB 通信到 Unity/C# 上位机

After completing this project, you will have:
- A refined desktop robot with a circular LCD "face" displaying rich expression animations
- A 6-DOF motion system: 2 DOF per arm (roll + pitch) + neck rotation + waist rotation
- Body-pose tracking: real-time motion following via PC camera + OpenPose
- Gesture interaction: built-in gesture sensor supporting wave, tap, and other gesture recognition
- Custom expressions and animations: edit and play expressions via Unity desktop software
- True full-stack project experience: from PCB design and STM32 firmware to USB communication and Unity/C# host application

---

## 核心技术 | Core Technologies

| 技术 | 用途 | 说明 |
|------|------|------|
| STM32F405RGT6 | 主控 MCU | ARM Cortex-M4 @ 168MHz, 1MB Flash, 192KB RAM |
| USB3300 | USB 高速 PHY | USB 2.0 High-Speed (480Mbps), 与 PC 高带宽数据交互 |
| GC9A01 (SPI LCD) | 圆形显示屏 | 1.28寸 240x240 圆形 TFT, 用于表情与动画 |
| STM32F042 (x6) | 舵机驱动 | 每个关节一个独立 MCU, I2C 总线 + PID 闭环控制 |
| PAW3660 / 手势传感器 | 手势检测 | 近距离手势交互（挥手、点击等） |
| MPU6050 | 惯性测量 | 6轴 IMU, 姿态检测与运动反馈 |
| USB 摄像头 | 视觉输入 | 配合 PC 端 OpenCV/OpenPose 进行姿态检测 |
| Unity + C# | 上位机软件 | 桌面应用, 负责表情编辑、动画播放、视觉处理 |
| OpenCV + OpenPose | 计算机视觉 | 实时人体姿态估计, 驱动机器人跟随人体动作 |
| 3D打印 | 机体外壳 | HP 尼龙推荐, 精密配合要求高 |

---

## 硬件清单 | Hardware List

> 详细物料清单请参考 [`hardware/BOM.md`](hardware/BOM.md)
>
> For the complete BOM, see [`hardware/BOM.md`](hardware/BOM.md)

### 主控与核心元件 | Main Controller & Core Components

| 部件 | 规格 | 价格(参考) | 说明 |
|------|------|-----------|------|
| 主控 MCU | STM32F405RGT6 | ~30元 | LQFP64 封装, Cortex-M4 |
| USB PHY | USB3300 | ~12元 | USB 2.0 HS, QFN 封装 |
| 圆形 LCD | GC9A01, 1.28寸, 240x240 | ~18元 | SPI 接口圆形 TFT |
| 舵机驱动 MCU | STM32F042F4P6 x6 | ~30元 | 每个关节独立控制, TSSOP20 |
| 手势传感器 | PAW3660 或等效 | ~8元 | 手势检测 |
| IMU | MPU6050 | ~6元 | 6轴陀螺仪+加速度计 |
| USB 摄像头 | 免驱动 USB 摄像头 | ~20元 | PC 端视觉输入 |
| 电位器 | 3904 单圈电位器 x6 | ~12元 | 舵机角度反馈 |

### 舵机与结构件 | Servos & Structural Parts

| 部件 | 规格 | 价格(参考) | 说明 |
|------|------|-----------|------|
| 舵机电机 | 370 空心杯电机 x6 | ~60元 | 配减速齿轮箱 |
| 减速齿轮 | 定制齿轮组 x6 | ~30元 | 舵机减速机构 |
| 机壳 3D 打印 | HP 尼龙 / SLA 树脂 | ~100元 | 精密打印, 配合公差要求高 |

### PCB 与电子元件 | PCB & Electronic Components

| 部件 | 规格 | 价格(参考) | 说明 |
|------|------|-----------|------|
| 主控 PCB | 4层板, 0.8mm | ~50元 | 嘉立创打样 |
| 舵机 PCB | 6块小板 | ~30元 | 每个关节一块 |
| LDO / DC-DC | 3.3V / 5V 稳压 | ~10元 | 电源管理 |
| 被动元件 | 电容/电阻/电感等 | ~15元 | 各类 SMD 元件 |
| 连接器 | FPC / 排针 | ~8元 | 板间连接 |

### 工具清单 | Tools Required

| 工具 | 用途 | 说明 |
|------|------|------|
| 电烙铁 + 焊锡丝 | 焊接元件 | 推荐 T12 焊台或以上 |
| 热风枪 + 锡浆 | QFN/芯片焊接 | 回流焊, **必备**（本项目有大量 QFN 封装） |
| 万用表 | 电路检测 | 排查短路/断路 |
| 示波器（可选） | 信号调试 | USB/串口信号分析 |
| ST-Link V2 | 固件烧录 | STM32 SWD 调试接口 |
| 游标卡尺 | 尺寸测量 | 3D打印件精度验证 |
| 镊子 | 元件夹取 | 防静电细尖镊子 |
| 螺丝刀套装 | 整机组装 | 精密螺丝刀 |

**总成本约400-500元**（不含电烙铁、热风枪等可复用工具）。3D打印费用是最大单项成本。

**Total cost approx. 400-500 CNY** (excluding reusable tools like soldering iron and hot air gun). 3D printing is the largest single cost item.

---

## 软件环境 | Software Environment

| 软件 | 版本 | 用途 |
|------|------|------|
| Keil MDK-ARM | v5.37+ | STM32 固件开发（主控 + 舵机驱动） |
| STM32CubeMX | latest | STM32 外设配置与代码生成 |
| Unity Hub | 2021.3 LTS | 上位机桌面应用开发 |
| Visual Studio | 2019/2022 | C++ DLL 编译（UnityBridge） |
| Python | 3.8+ | 辅助脚本、OpenPose 部署 |
| OpenCV | 4.x | 计算机视觉处理 |
| Git | latest | 版本控制与代码克隆 |
| ST-Link Utility | latest | STM32 固件烧录工具 |
| Fusion 360 | 免费版 | CAD 模型查看与修改（可选） |
| Cura / PrusaSlicer | latest | 3D打印切片（如自行打印） |

---

## 快速开始 | Quick Start

### Step 1: 克隆项目 | Clone the Project

```bash
# 克隆 ElectronBot 主仓库
git clone https://github.com/peng-zhihui/ElectronBot.git
cd ElectronBot

# 查看项目结构
ls
```

### Step 2: 准备硬件 | Prepare Hardware

1. **PCB 打板**: 将 `hardware/` 目录中的 Gerber 文件提交到嘉立创打样
   - 主控板 4 层板, 板厚 0.8mm
   - 舵机驱动板 6 块小板
2. **采购元器件**: 按照 `hardware/BOM.md` 清单购买所有元件
3. **3D 打印**: 使用 Fusion 360 CAD 模型进行 3D 打印
   - 推荐材料: HP 尼龙（最佳配合精度）
   - 备选: SLA 树脂（注意收缩率补偿）
4. **焊接与组装**: 详细步骤见 `hardware/assembly-guide.md`

### Step 3: 搭建固件开发环境 | Setup Firmware Environment

```bash
# 安装 Keil MDK-ARM（需要注册免费的 MDK-Lite 许可证）
# 下载地址: https://www.keil.com/download/product/

# 安装 STM32CubeMX
# 下载地址: https://www.st.com/zh/development-tools/stm32cubemx.html

# 安装 ST-Link 驱动
# 下载地址: https://www.st.com/zh/development-tools/stsw-link009.html
```

### Step 4: 编译与烧录固件 | Build & Flash Firmware

```bash
# 打开 Keil 工程
# 1. 固件工程位于 software/ElectronBot-Firmware/
# 2. 舵机驱动工程位于 software/ElectronBot-Servo/

# 编译主控固件
# 在 Keil 中打开工程, 点击 Build (F7)

# 通过 ST-Link 烧录
# 1. 连接 ST-Link 到主控板 SWD 接口
# 2. 在 Keil 中点击 Download (F8)
# 3. 分别烧录 6 个舵机驱动板
```

### Step 5: 安装上位机软件 | Install Desktop Software

```bash
# 安装 Unity Hub 并添加 Unity 2021.3 LTS
# 下载地址: https://unity.com/download

# 打开 Unity 工程
# 工程位于 software/Electron-Studio/

# 编译 C++ DLL Bridge
# 使用 Visual Studio 打开 software/ElectronBotSDK-UnityBridge/
# 编译为 Release x64, 输出 DLL 到 Unity 工程 Plugins 目录

# 安装 Python 依赖（OpenPose 等）
pip install opencv-python numpy
```

### Step 6: 连接与测试 | Connect & Test

1. 通过 USB 线将 ElectronBot 连接到 PC
2. 确认设备管理器中出现 USB High-Speed 设备
3. 启动 Electron-Studio Unity 应用
4. 测试表情显示、舵机运动、手势传感器
5. （可选）连接 USB 摄像头, 测试姿态跟随功能

---

## 课程安排 | Course Schedule

### 第一阶段：STM32开发环境与硬件组装（Day 1-4）
Phase 1: STM32 Development Environment & Hardware Assembly

| 天数 | 主题 | 核心知识点 |
|------|------|-----------|
| Day 1 | STM32F4 平台入门与环境搭建 | Keil MDK 安装、STM32CubeMX 配置、ST-Link 烧录、GPIO 点灯、串口调试 |
| Day 2 | 硬件原理图阅读与 PCB 设计理解 | 多层板设计基础、USB 高速信号布线规则、电源分配网络、BOM 核对 |
| Day 3 | 焊接实践（QFN/USB PHY） | 热风枪回流焊、QFN 封装焊接、USB3300 贴装、主控板焊接与测试 |
| Day 4 | 舵机驱动板焊接与整机组装 | STM32F042 小板焊接 x6、3D打印件装配、齿轮箱组装、线束连接 |

### 第二阶段：固件开发与舵机控制（Day 5-8）
Phase 2: Firmware Development & Servo Control

| 天数 | 主题 | 核心知识点 |
|------|------|-----------|
| Day 5 | STM32 固件框架与 USB 通信 | HAL 库工程结构、USB HS Device 配置、自定义 USB 类开发、PC 通信协议 |
| Day 6 | I2C 舵机驱动与 PID 闭环控制 | I2C 主从通信、PID 控制器原理与调参、电位器反馈读取、6路舵机协同 |
| Day 7 | GC9A01 圆形 LCD 驱动与表情系统 | SPI 高速 DMA 驱动、圆形屏幕坐标系、帧缓冲管理、表情数据格式与播放 |
| Day 8 | 传感器集成（手势/IMU） | 手势传感器驱动、MPU6050 DMP 数据读取、传感器融合、姿态解算基础 |

### 第三阶段：Unity上位机与系统集成（Day 9-12）
Phase 3: Unity Desktop App & System Integration

| 天数 | 主题 | 核心知识点 |
|------|------|-----------|
| Day 9 | Unity 基础与 C# 上位机开发 | Unity 界面布局、C# DLL 互操作（P/Invoke）、USB 数据收发、表情编辑器 |
| Day 10 | OpenCV/OpenPose 计算机视觉 | USB 摄像头采集、OpenPose 姿态估计、骨骼数据解析、坐标映射到舵机角度 |
| Day 11 | 系统集成与联调 | 上位机↔固件通信联调、运动平滑处理、表情同步、延迟优化、Bug 排查 |
| Day 12 | 项目展示与总结 | 功能演示、技术复盘、性能优化分享、拓展方向讨论、Demo 网站搭建 |

---

## 评分标准 | Grading Rubric

| 维度 | 权重 | 说明 |
|------|------|------|
| 技术实现 | 40% | 硬件焊接质量、固件功能完整度、舵机控制精度、USB 通信稳定性、视觉跟随效果 |
| 文档质量 | 15% | README、代码注释、硬件接线记录、调试日志、故障排除文档 |
| 演示展示 | 15% | Final Demo 清晰度、功能演示完整性、表达能力、Q&A 应对 |
| Demo 网站 | 15% | 项目展示网站的可访问性、内容完整性、视觉呈现 |
| 进度汇报 | 10% | 每日 Check-in 质量、问题分析深度、解决方案记录 |
| 创新拓展 | 5% | 自定义表情、额外交互模式、个性化外壳、算法优化 |

---

## 项目结构 | Project Structure

```
project-08-electronbot/
├── README.md                               # 项目说明文档（本文件）
├── hardware/                                # 硬件设计文件
│   ├── BOM.md                              # 物料清单（完整元件列表与采购链接）
│   ├── assembly-guide.md                   # 组装图文指南
│   ├── schematic/                           # 原理图（PDF）
│   ├── pcb/                                 # PCB Gerber 文件
│   ├── cad/                                 # Fusion 360 CAD 模型
│   └── troubleshooting.md                  # 硬件故障排除指南
├── software/                                # 软件相关
│   ├── firmware/                            # STM32 固件工程
│   │   ├── main-controller/                # 主控 STM32F405 固件（Keil 工程）
│   │   └── servo-driver/                   # 舵机 STM32F042 固件（Keil 工程）
│   ├── desktop-app/                         # Unity 上位机软件
│   │   ├── Electron-Studio/                # Unity 工程目录
│   │   └── SDK-Bridge/                     # C++ DLL Bridge 工程
│   ├── opencv-pose/                         # OpenPose 视觉处理模块
│   ├── tests/                              # 单元测试与集成测试
│   └── SETUP_GUIDE.md                      # 软件环境搭建指南
├── curriculum/                              # 课程文档
│   ├── overview.md                          # 课程总览
│   ├── prerequisites.md                     # 前置知识清单
│   ├── assignments.md                       # 作业说明
│   ├── grading-rubric.md                    # 详细评分标准
│   └── day-01.md ~ day-12.md               # 每日课程教案
├── assignments/                             # 作业与考核
│   ├── day-01-checkin.md                    # Day 1 进度汇报
│   ├── week-1-checkin.md                    # 第一周进度汇总
│   ├── week-2-checkin.md                    # 第二周进度汇总
│   ├── final-presentation.md                # 最终展示要求
│   └── rubric.md                            # 详细评分表
├── resources/                               # 补充资源
│   ├── reference-links.md                   # 参考资料汇总
│   └── faq.md                               # 常见问题合集
└── docs/                                    # 补充文档
    ├── api-reference.md                     # API 参考（USB 通信协议）
    ├── servo-tuning.md                      # 舵机 PID 调参指南
    └── expression-format.md                 # 表情数据格式说明
```

---

## 学习资源 | Learning Resources

### B站视频教程 | Bilibili Video Tutorials

| 视频 | UP主 | 推荐理由 |
|------|------|----------|
| [ElectronBot 演示视频](https://www.bilibili.com/video/BV1ka411b76m) | 稚晖君 | 项目作者官方演示, 了解最终效果 |
| [STM32 入门教程（HAL库）](https://www.bilibili.com/video/BV1th411z7is/) | 正点原子 | STM32 零基础系统学习 |
| [STM32 USB 开发教程](https://search.bilibili.com/all?keyword=STM32+USB+开发) | 各路UP主 | USB 外设开发专题 |
| [Keil MDK 使用教程](https://search.bilibili.com/all?keyword=Keil+MDK+教程) | 各路UP主 | IDE 环境与调试技巧 |
| [Unity 入门教程](https://www.bilibili.com/video/BV1gQ4y1e7SS/) | M_Studio | Unity 零基础入门首选 |
| [OpenCV Python 入门](https://www.bilibili.com/video/BV1o3411m DuG/) | 各路UP主 | 计算机视觉基础 |
| [PID 控制器原理与调参](https://search.bilibili.com/all?keyword=PID+控制+教程) | 各路UP主 | 闭环控制理论与实践 |
| [PCB 多层板设计教程](https://search.bilibili.com/all?keyword=4层板+PCB+设计) | 各路UP主 | 多层板布线与高速信号 |
| [QFN 封装焊接教程](https://search.bilibili.com/all?keyword=QFN+焊接+热风枪) | 各路UP主 | 芯片级焊接技巧 |

### 官方文档与开源仓库 | Official Docs & Open Source

| 资源 | 说明 |
|------|------|
| [ElectronBot GitHub](https://github.com/peng-zhihui/ElectronBot) | 项目源码、固件、CAD、文档 |
| [Fusion 360 CAD 模型](https://a360.co/3t6CUMS) | 在线查看/下载完整 CAD 设计 |
| [STM32F405 数据手册](https://www.st.com/zh/microcontrollers-microprocessors/stm32f405rg.html) | 主控 MCU 完整技术文档 |
| [STM32CubeMX](https://www.st.com/zh/development-tools/stm32cubemx.html) | STM32 外设配置工具 |
| [Keil MDK](https://www.keil.com/download/product/) | ARM Cortex-M 开发 IDE |
| [Unity 下载](https://unity.com/download) | Unity 引擎与 Hub |
| [OpenPose GitHub](https://github.com/CMU-Perceptual-Computing-Lab/openpose) | CMU 开源人体姿态估计 |
| [OpenCV 官方文档](https://docs.opencv.org/) | 计算机视觉库文档 |
| [USB 2.0 规范](https://www.usb.org/document-library/usb-20-specification) | USB 协议参考（进阶阅读） |
| [MPU6050 数据手册](https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/) | IMU 传感器技术文档 |

### 工具与辅助学习 | Tools & Supplementary Learning

| 资源 | 说明 |
|------|------|
| [嘉立创下单平台](https://www.jlc.com/) | PCB 打板与 SMT 贴片服务 |
| [STM32 HAL 库文档](https://www.st.com/zh/development-tools/stm32cubemx.html) | HAL 驱动 API 参考 |
| [C语言教程（菜鸟教程）](https://www.runoob.com/cprogramming/c-tutorial.html) | C 语言基础速查 |
| [C# 入门教程](https://docs.microsoft.com/zh-cn/dotnet/csharp/) | C# 语言基础（Unity 脚本用） |
| [Git 入门教程](https://www.runoob.com/git/git-tutorial.html) | Git 版本控制基础 |
| [3D 打印指南](https://www.bilibili.com/video/BV1r44y1S7QG/) | FDM/SLA 打印入门 |
| [PID 调参工具](https://github.com/pms67/PID-Tuning) | PID 参数整定参考 |

---

## 常见问题 | FAQ

**Q: 这个项目难度很高，我没有 STM32 经验，能做吗？**
A: ElectronBot 是所有项目中难度最高的，明确要求有嵌入式 C 语言和 STM32 基础。如果你完全没有 STM32 经验，建议先完成 Project 05 的 Track A 或至少学习正点原子的 STM32 入门教程。本项目的 QFN 焊接、USB HS 开发、PID 闭环控制、Unity 上位机每一项都是独立的挑战。

This project is very difficult. Can I do it without STM32 experience?
ElectronBot is the hardest project in the entire curriculum. It explicitly requires embedded C and STM32 basics. If you have zero STM32 experience, we strongly recommend completing Project 05 Track A first, or at least studying the ZhengDian Atom STM32 beginner tutorials. QFN soldering, USB HS development, PID closed-loop control, and the Unity desktop app are each standalone challenges.

**Q: QFN 封装的焊接太难了，有什么替代方案？**
A: 如果手工焊接有困难，可以选择：1) 使用嘉立创 SMT 贴片服务，将 QFN 芯片（STM32F405、USB3300）交给工厂贴装，自己只焊接其余元件；2) 购买已经焊接好的核心板模块。注意 STM32F042 舵机驱动板的 TSSOP20 封装相对容易手工焊接。

QFN soldering is too hard. Any alternatives?
If hand soldering is difficult: 1) Use JLCPCB SMT service to have the QFN chips (STM32F405, USB3300) factory-assembled, then solder the remaining components yourself; 2) Purchase pre-soldered core board modules. Note that the STM32F042 servo driver boards in TSSOP20 packages are relatively easy to hand solder.

**Q: 3D打印精度要求高吗？FDM打印机可以吗？**
A: ElectronBot 的外壳零件之间有精密的配合关系，尤其是舵机和齿轮箱部分。FDM 打印机可以使用但需要仔细调参和后处理（打磨、扩孔）。推荐使用 SLA 树脂打印或 HP 尼龙 SLS 打印以获得最佳配合精度。如果学校/机构有 SLA 打印机，优先使用。

Does 3D printing require high precision? Can I use FDM?
ElectronBot's shell parts have precision mating requirements, especially around the servos and gearbox. FDM printers can work but require careful tuning and post-processing (sanding, reaming). SLA resin printing or HP nylon SLS printing is recommended for the best fit. If your school has an SLA printer, use it.

**Q: 必须用 OpenPose 做姿态跟随吗？有没有更轻量的方案？**
A: OpenPose 是原项目的方案，但确实比较重（需要较好的 GPU）。轻量替代方案包括：1) MediaPipe（Google, 支持 CPU 推理）；2) TensorFlow Lite PoseNet（轻量级）；3) 仅使用手势传感器做基础交互，跳过视觉跟随。Day 10 会提供多个方案供选择。

Is OpenPose mandatory for pose tracking? Any lighter alternatives?
OpenPose is the original project's solution but is heavy (requires a decent GPU). Lighter alternatives include: 1) MediaPipe (Google, supports CPU inference); 2) TensorFlow Lite PoseNet (lightweight); 3) Skip visual tracking entirely and use only the gesture sensor for basic interaction. Day 10 provides multiple options.

**Q: USB High-Speed 通信部分很难理解，怎么学？**
A: USB HS 是本项目的一个核心技术难点。建议：1) 先学习 USB 2.0 协议基础（端点、描述符、传输类型）；2) 阅读 STM32 USB Device Library 文档和官方例程；3) 从 USB FS（全速）开始实验，再升级到 HS。项目代码中已有完整的 USB 通信框架，重点在于理解而非从零编写。

USB High-Speed communication is hard to understand. How should I learn?
USB HS is a core technical challenge. Suggestions: 1) Study USB 2.0 protocol basics (endpoints, descriptors, transfer types); 2) Read STM32 USB Device Library docs and official examples; 3) Experiment with USB FS (Full-Speed) first, then upgrade to HS. The project code already includes a complete USB communication framework -- the focus is on understanding, not writing from scratch.

**Q: 成本可以降低吗？400-500 元有些贵。**
A: 最大的成本项是 3D 打印（约100元）。省钱方案：1) 多人共享一次 3D 打印订单分摊运费；2) 使用学校/实验室的 3D 打印机；3) PCB 选择嘉立创 5 元打样活动。如果不做视觉跟随功能，可以省去 USB 摄像头（20元）。核心元件的成本很难进一步压缩，因为每个关节都需要独立的 STM32F042 + 电位器 + 电机。

Can the cost be reduced? 400-500 CNY is a bit expensive.
The biggest cost item is 3D printing (~100 CNY). Money-saving options: 1) Share a 3D printing order with others to split shipping; 2) Use school/lab 3D printers; 3) Use JLCPCB's 5-CNY prototyping deals for PCBs. If you skip visual tracking, you can save on the USB camera (20 CNY). Core component costs are hard to reduce further since each joint needs its own STM32F042 + potentiometer + motor.

---

## 许可证 | License

本项目基于 [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) 开源协议，遵循原 ElectronBot 项目的许可。

This project is licensed under [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html), following the original ElectronBot project's license.

---

*最后更新：2026-05-27 | Last Updated: 2026-05-27*
