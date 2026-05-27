# 轮足机器人 "轮行者" | Bipedal Wheeled Robot "WheelWalker"

> 面向高中生的暑期机器人实践项目 | A Summer Robotics Practicum Project for High School Students

---

## 🚀 开源项目 | Open Source Projects

> ⭐ **必看视频**：[StackForce 轮足机器人制作教程 bilibili](https://www.bilibili.com/video/BV1kz421B73V)

| 项目 Project | 说明 Description |
|-------------|-----------------|
| [StackForce bipedal_wheeled_robot (Gitee)](https://gitee.com/StackForce/bipedal_wheeled_robot) | 本项目原始仓库，含完整源码和 3D 打印文件 |
| [StackForce 平台 (Gitee)](https://gitee.com/StackForce) | 配套开源项目集合 |
| [SimpleFOC (GitHub)](https://github.com/simplefoc/Arduino-FOC) | 开源 FOC 电机控制库，支持多种驱动器 |
| [MPU6050_light (GitHub)](https://github.com/rreignier/MPU6050_light) | 轻量级 MPU6050 Arduino 库 |

---

## 项目概述 | Project Overview

本项目基于开源 StackForce 轮足机器人平台，带领学员从零开始构建一台**两轮自平衡轮足机器人**。学员将使用 ESP32 微控制器驱动无刷直流（BLDC）电机，通过 MPU6050 惯性测量单元感知姿态，运用 PID 控制算法实现机器人的自主平衡与运动控制。项目采用 PlatformIO 开发环境和 C++ 编程语言，涵盖嵌入式系统、电机驱动、传感器融合、控制算法等核心技术领域。

> Based on the open-source StackForce bipedal wheeled robot platform, this project guides students to build a **two-wheeled self-balancing robot** from scratch. Students will use an ESP32 microcontroller to drive BLDC motors, sense posture via the MPU6050 IMU, and implement PID control algorithms for autonomous balance and motion control. The project uses the PlatformIO development environment and C++ programming language, covering core technologies including embedded systems, motor driving, sensor fusion, and control algorithms.

在整个 12 天的课程中，学员将深入理解倒立摆物理模型、磁场定向控制（FOC）原理、串级 PID 控制策略，以及蓝牙/WiFi 遥控通信机制。从硬件组装到软件调试，从理论建模到参数整定，学员将体验一个完整机器人系统的开发全流程。StackForce 轻量级机器人开发平台为学员提供了友好的开发框架，降低了入门门槛的同时保留了足够的深度和可扩展性。

> Throughout the 12-day course, students will gain a deep understanding of the inverted pendulum physical model, Field Oriented Control (FOC) principles, cascaded PID control strategies, and Bluetooth/WiFi remote control communication mechanisms. From hardware assembly to software debugging, from theoretical modeling to parameter tuning, students will experience the full development lifecycle of a complete robotic system. The StackForce lightweight robot development platform provides a student-friendly framework that lowers the barrier to entry while retaining sufficient depth and extensibility.

这是一个极具挑战性又充满成就感的项目——当你亲手调通的机器人第一次稳稳站立起来的那一刻，所有的努力都值得了。

> This is a highly challenging yet immensely rewarding project -- the moment your robot stands steadily on its own for the first time after your tuning, all the effort becomes worthwhile.

---

## 最终效果 | Final Result

完成本项目后，你将拥有一台：

Upon completing this project, you will own a robot that can:

- 自主平衡站立的两轮机器人，无需任何支撑
- 通过手机蓝牙或 WiFi 遥控前进、后退、转弯
- 串级 PID 控制实现直立环、速度环、转向环三环联合调节
- 轮足混合运动模式，兼具轮式速度和足式灵活性
- 完整的 3D 打印外壳与结构件
- 可扩展的机器人开发平台，支持二次开发
- Stand upright autonomously on two wheels without any external support
- Be remotely controlled via smartphone Bluetooth or WiFi to move forward, backward, and turn
- Achieve three-loop joint regulation with cascaded PID for balance, speed, and steering
- Operate in hybrid wheeled-legged motion mode, combining wheel speed with leg agility
- Feature a complete 3D-printed shell and structural frame
- Serve as an extensible robot development platform supporting further customization

## 核心技术 | Core Technologies

| 技术 Technology | 用途 Purpose | 说明 Description |
|----------------|-------------|-----------------|
| ESP32 | 主控制器 | 双核 240MHz, WiFi+BT 内置, 520KB SRAM |
| BLDC Motor + FOC | 驱动 | 无刷电机矢量控制, 精确力矩输出 |
| MPU6050 | 姿态感知 | 6轴 IMU, 3轴加速度计 + 3轴陀螺仪 |
| PID 控制器 | 平衡算法 | 串级 PID: 直立环 + 速度环 + 转向环 |
| PlatformIO | 开发环境 | 跨平台嵌入式开发工具, 基于 VSCode |
| 3D 打印 | 结构件 | PLA 材质定制外壳和机械结构件 |
| StackForce 平台 | 开发框架 | 轻量级机器人开发平台, 模块化设计 |
| Bluetooth / WiFi | 遥控通信 | ESP32 内置无线模块, 手机遥控 |

## 硬件清单 | Hardware List

| 部件 Component | 规格 Specification | 数量 | 参考价格 Price | 购买建议 Source |
|---------------|-------------------|------|--------------|----------------|
| ESP32 开发板 | ESP32-WROOM-32, 4MB Flash | 1 | 25 元 | 淘宝搜索 "ESP32 开发板" |
| BLDC 电机 | 2808 规格, 带编码器, 额定电压 12V | 2 | 60 元/个 | 淘宝搜索 "2808 无刷电机 编码器" |
| 电机驱动板 | Dual BLDC 5A 驱动板 | 1 | 45 元 | StackForce 官方推荐 |
| MPU6050 模块 | 6轴 IMU, I2C 接口 | 1 | 8 元 | 淘宝搜索 "MPU6050 模块" |
| 锂电池 | 3S 11.1V 1500mAh, 带 BMS 保护板 | 1 | 35 元 | 淘宝搜索 "3S 锂电池 1500mAh" |
| 3D 打印结构件 | PLA 材质, 含车身+腿+轮子支架 | 1套 | 50 元 | 自行打印 / 淘宝代打 |
| 螺丝螺母 | M2/M3 规格若干, 含尼龙柱 | 若干 | 5 元 | 淘宝 |
| 杜邦线 | 母对母 20cm | 20 根 | 8 元 | 淘宝 |
| 电源开关 | 拨动开关, 额定 3A 以上 | 1 | 2 元 | 淘宝 |
| USB 数据线 | Micro-USB 或 Type-C | 1 | 5 元 | 淘宝 |
| **合计 Total** | | | **约 300 元** | **远低于 500 元预算** |

> 注：BLDC 电机和驱动板是本项目最贵的部件，建议购买 StackForce 推荐的配套套件，兼容性更有保障。如有 3D 打印机可自行打印结构件以进一步降低成本。
> Note: BLDC motors and the driver board are the most expensive components. We recommend purchasing the StackForce-recommended配套 kit for better compatibility. If you have access to a 3D printer, you can further reduce costs by printing the structural parts yourself.

## 软件环境 | Software Environment

| 工具 Tool | 版本 Version | 用途 Purpose |
|-----------|-------------|-------------|
| VSCode | 最新版 Latest | 代码编辑器 |
| PlatformIO | 最新版 Latest | 嵌入式开发环境（VSCode 插件） |
| Python | 3.8+ | PlatformIO 依赖 |
| Git | 最新版 Latest | 版本管理 |
| CH340/CP2102 驱动 | 最新版 Latest | USB 串口驱动 |
| 串口调试助手 | 任意 | 调试输出查看（如 PuTTY、SSCOM） |
| 蓝牙串口 APP | 任意 | 手机遥控测试（如蓝牙串口助手） |

## 快速开始 | Quick Start

### 硬件准备 Hardware Setup

1. 按 BOM 清单采购所有零件
2. 3D 打印结构件（或淘宝代打），参考 `hardware/BOM.md` 中的 STL 文件
3. 按照 `hardware/wiring-guide.md` 接线（注意电源极性和电机相序）
4. 完成机械组装，参考 `hardware/assembly-steps.md`

### 软件准备 Software Setup

1. 安装 VSCode + PlatformIO 插件
2. 克隆本项目代码到本地
3. 在 PlatformIO 中打开 `software/` 目录
4. 复制 `software/config.template.h` 为 `software/src/config.h`，根据实际硬件修改配置
5. 连接 ESP32 开发板，选择正确的串口端口
6. 点击 PlatformIO 的 Upload 按钮编译并烧录

### 第一次运行 First Run

1. 确认接线无误后，打开电源开关
2. ESP32 启动后，通过串口监视器查看输出（波特率 115200）
3. 观察 MPU6050 数据是否正常读取
4. 将机器人轻放在地面上，观察平衡效果
5. 根据实际情况调整 PID 参数，直至稳定站立
6. 使用手机蓝牙连接 ESP32，发送控制指令测试运动功能

## 课程安排 | Course Schedule

12天全日制课程，分三个阶段：

12-day full-time course, divided into three phases:

### 第一阶段 Phase 1：嵌入式基础与硬件认知 | Embedded Basics & Hardware (Day 1-4)

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|----------|----------|---------------------|
| Day 1 | 项目启动与 ESP32 入门 | ESP32 架构、PlatformIO 配置、第一个 Blink 程序、GPIO 控制 |
| Day 2 | 电机原理与 BLDC 控制 | 无刷电机原理、FOC 驱动基础、PWM 信号控制、编码器读取 |
| Day 3 | IMU 传感器与姿态解算 | MPU6050 原理、I2C 通信、加速度计与陀螺仪数据融合、姿态角计算 |
| Day 4 | 运动学与建模 | 倒立摆物理模型、系统传递函数、控制理论入门、系统分析 |

### 第二阶段 Phase 2：控制算法与核心功能 | Control Algorithms & Core Features (Day 5-8)

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|----------|----------|---------------------|
| Day 5 | PID 控制基础 | PID 原理、比例/积分/微分环节、直立环调试、参数整定方法 |
| Day 6 | 串级 PID 与速度控制 | 速度环 + 转向环设计、三环串级控制架构、完整闭环系统 |
| Day 7 | 遥控与通信 | 蓝牙/WiFi 遥控实现、串口通信协议设计、手机端控制 |
| Day 8 | 整车集成调试 | 全功能整合、参数联调、稳定性测试、抗干扰优化 |

### 第三阶段 Phase 3：功能拓展与项目展示 | Extensions & Presentation (Day 9-12)

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|----------|----------|---------------------|
| Day 9 | 轮足运动模式 | 轮式 + 足式混合运动、步态规划入门、运动模式切换 |
| Day 10 | 3D 建模与结构件 | Fusion 360 入门、零件设计优化、3D 打印实践 |
| Day 11 | 系统集成与美化 | 整机组装完善、线缆管理、外观优化、最终调参 |
| Day 12 | 项目展示与总结 | 成果演示、Demo 网站部署、技术分享、项目复盘 |

详细每日课程内容请查看 `curriculum/day-01.md` 至 `curriculum/day-12.md`。

> For detailed daily course content, see `curriculum/day-01.md` through `curriculum/day-12.md`.

## 评分标准 | Grading Rubric

| 维度 Dimension | 权重 Weight | 说明 Description |
|----------------|-----------|-----------------|
| 技术实现 Technical Implementation | 35% | 平衡稳定性、控制精度、代码质量、功能完整度 |
| 文档质量 Documentation | 10% | README、注释、接线图、原理说明、调试日志 |
| 演示展示 Presentation | 17% | 最终展示的清晰度、深度与表达能力 |
| 进度汇报 Check-ins | 15% | 每周进度报告的质量与及时性 |
| Demo 网站 Project Demo Website | 13% | 项目展示网站内容完整性、视觉呈现、技术深度 |
| 团队协作 Collaboration | 10% | Git 记录、分工合理性、互助精神 |

> 注：独立完成项目的学员，"团队协作"分数将转换为"自主学习"分数，考察独立解决问题的能力。
> Note: For students working independently, the "Collaboration" score is converted to "Self-directed Learning," evaluating independent problem-solving ability.

## 项目结构 | Project Structure

```
project-07-bipedal-wheeled-robot/
├── README.md                              # 本文件，项目总览
├── curriculum/                            # 课程文档
│   ├── overview.md                        # 课程大纲总览
│   ├── prerequisites.md                   # 前置知识与准备
│   ├── assignments.md                     # 作业说明
│   ├── grading-rubric.md                  # 详细评分标准
│   └── day-01.md ~ day-12.md              # 每日课程内容
├── hardware/                              # 硬件相关
│   ├── BOM.md                             # 物料清单（含 3D 打印文件）
│   ├── wiring-guide.md                    # 接线指南
│   ├── assembly-steps.md                  # 组装步骤
│   └── troubleshooting.md                 # 硬件故障排除
├── software/                              # 软件代码
│   ├── platformio.ini                     # PlatformIO 项目配置
│   ├── config.template.h                  # 配置模板（PID参数、WiFi等）
│   ├── src/
│   │   ├── main.cpp                       # 主程序入口
│   │   ├── balance_controller.cpp/h       # 平衡控制器（PID）
│   │   ├── motor_driver.cpp/h             # BLDC 电机驱动（FOC）
│   │   ├── imu_sensor.cpp/h               # MPU6050 IMU 传感器驱动
│   │   ├── remote_control.cpp/h           # 蓝牙/WiFi 遥控
│   │   └── config.h                       # 用户配置（从模板复制）
│   └── lib/                               # 第三方库
│       ├── SimpleFOC/                     # FOC 电机控制库
│       └── MPU6050/                       # MPU6050 驱动库
├── assignments/                           # 作业与评分
│   ├── week-1-checkin.md                  # 第一周进度报告
│   ├── week-2-checkin.md                  # 第二周进度报告
│   ├── final-presentation.md              # 最终展示要求
│   └── rubric.md                          # 详细评分表
└── resources/                             # 资源文件
    ├── 3d-models/                         # 3D 打印 STL 文件
    └── search-results.md                  # 资源搜索结果
```

## 学习资源 | Learning Resources

### 推荐 B 站视频 | Recommended Bilibili Videos

**StackForce 轮足机器人系列 (必看) | StackForce Robot Series (Must Watch):**

1. **StackForce 手把手教做轮足机器人** - StackForce 官方
   - 搜索 "StackForce 轮足机器人" 获取完整教程系列
   - 从硬件组装到软件调试的全流程讲解

2. **PID 控制算法详解** - 各UP主
   - 搜索 "PID控制算法 讲解" 了解经典控制理论
   - 推荐看含实例演示的视频

3. **MPU6050 姿态解算教程**
   - 搜索 "MPU6050 姿态解算 互补滤波"
   - 了解加速度计与陀螺仪数据融合方法

4. **FOC 无刷电机控制入门**
   - 搜索 "FOC 无刷电机控制" 了解磁场定向控制原理
   - 推荐结合 SimpleFOC 项目学习

**原理与知识教程 | Theory & Knowledge Tutorials:**

5. **倒立摆控制系统**
   - 搜索 "倒立摆 PID 控制" 了解物理建模与控制方法

6. **ESP32 开发入门**
   - 搜索 "ESP32 PlatformIO 入门" 快速上手开发环境

### 参考文档 | Reference Docs

- [StackForce 开发平台文档](http://stackforce.cc/#/) -- 官方开发平台使用指南
- [ESP32 Arduino Core 文档](https://docs.espressif.com/projects/arduino-esp32/) -- ESP32 Arduino 框架 API
- [MPU6050 数据手册](https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/) -- IMU 寄存器与电气规格
- [SimpleFOC 文档](https://docs.simplefoc.com/) -- FOC 电机控制库使用手册
- [PlatformIO 文档](https://docs.platformio.org/) -- 开发环境配置与使用
- [PID 控制算法教程](https://www.youtube.com/results?search_query=PID+control+explained) -- PID 原理视频合集

## 常见问题 | FAQ

**Q: 没有任何嵌入式编程基础可以做这个项目吗？**
A: 课程 Day 1 从 PlatformIO 安装和 Blink 程序开始，逐步引入所有必要知识。但由于本项目涉及控制算法和较多硬件调试，建议提前了解 C/C++ 基本语法（变量、函数、类）和基础物理知识（力学、运动学）。

> I have no embedded programming background. Can I still do this project?
> Day 1 starts from PlatformIO installation and the Blink program, gradually introducing all necessary knowledge. However, since this project involves control algorithms and significant hardware debugging, we recommend learning basic C/C++ syntax (variables, functions, classes) and fundamental physics (mechanics, kinematics) beforehand.

**Q: BLDC 电机和 FOC 控制难不难？**
A: FOC 是本项目最核心的技术之一。课程将 FOC 拆解为多个步骤讲解，从 PWM 基础到磁场定向控制逐步深入。StackForce 平台和 SimpleFOC 库已经封装了底层驱动，学员重点理解原理并学会调用接口即可。

> Are BLDC motors and FOC control difficult?
> FOC is one of the core technologies in this project. The course breaks FOC into multiple steps, progressing from PWM basics to field-oriented control. The StackForce platform and SimpleFOC library have already encapsulated the low-level drivers, so students focus on understanding principles and learning to use the interfaces.

**Q: PID 参数怎么调？机器人一直倒怎么办？**
A: PID 参数整定是本项目的关键挑战。课程 Day 5 会专门讲解参数整定方法（Ziegler-Nichols 法、试凑法），并提供初始参考参数。调试时建议先用串口监视器观察传感器数据和电机输出，逐步微调参数。大多数同学经过 1-2 天调试即可让机器人稳定站立。

> How do I tune PID parameters? What if the robot keeps falling?
> PID parameter tuning is the key challenge of this project. Day 5 covers tuning methods (Ziegler-Nichols, trial-and-error) and provides initial reference parameters. When debugging, use the serial monitor to observe sensor data and motor output, then fine-tune gradually. Most students can get their robot standing stably after 1-2 days of tuning.

**Q: 3D 打印件没有打印机怎么办？**
A: 课程提供完整的 STL 文件，可以通过以下方式获取打印件：（1）学校或图书馆的 3D 打印机；（2）淘宝搜索 "3D 打印代工"，上传 STL 文件即可代打（约 50 元）；（3）创客空间或社区实验室通常提供免费或低价打印服务。

> What if I don't have a 3D printer?
> The course provides complete STL files. You can obtain printed parts through: (1) school or library 3D printers; (2) search "3D printing service" on Taobao and upload STL files (~50 CNY); (3) makerspaces or community labs often provide free or low-cost printing services.

**Q: 机器人电池能用多久？**
A: 3S 11.1V 1500mAh 锂电池在正常平衡状态下可以续航约 30-45 分钟。如果频繁遥控运动，续航会缩短。建议准备一块备用电池，或选择更大容量的电池（如 2200mAh）以延长测试时间。

> How long does the battery last?
> A 3S 11.1V 1500mAh lithium battery provides about 30-45 minutes of runtime under normal balance conditions. Frequent remote-controlled movement will reduce this. We recommend having a spare battery or choosing a higher-capacity battery (e.g., 2200mAh) for extended testing sessions.

**Q: ESP32 和 STM32 应该选哪个？**
A: 本项目推荐 ESP32，因为它内置 WiFi 和蓝牙，方便实现遥控功能，且社区资源丰富。STM32 性能更强但需要额外添加无线模块。StackForce 平台两者都支持，但教程以 ESP32 为主线。

> Should I choose ESP32 or STM32?
> ESP32 is recommended for this project because it has built-in WiFi and Bluetooth for remote control, plus a rich community ecosystem. STM32 offers better performance but requires additional wireless modules. The StackForce platform supports both, but the tutorials use ESP32 as the primary platform.

## 许可证 | License

本项目课程文档采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议发布。

软件代码基于原项目 [Apache License 2.0](https://gitee.com/StackForce/bipedal_wheeled_robot) 发布。

> This project course materials are released under CC BY-NC-SA 4.0.
> Software code is released under the original project's Apache License 2.0.

---

*最后更新：2026-05-27*
*Last updated: 2026-05-27*
