# 第一周检查点 | Week 1 Check-in

## 概述 | Overview

第一周检查点用于评估学员在 Day 1-4（第一阶段）的学习成果，重点检查 STM32 开发环境搭建、PCB 焊接（贴片 IC/QFN 封装）、舵机标定、整机组装以及首次上电测试。

> Week 1 check-in evaluates learning outcomes from Day 1-4 (Phase 1), focusing on STM32 development environment setup, PCB soldering (SMD IC / QFN packages), servo calibration, mechanical assembly, and first power-on testing.

---

## 检查时间 | Check-in Time

**Day 4 下午 | Day 4 Afternoon**

---

## 学生/团队信息 | Student / Team Information

| 字段 | 内容 |
|------|------|
| **团队名称 / Team Name** | |
| **成员姓名 / Members** | |
| **项目仓库链接 / Repo URL** | |
| **检查日期 / Check-in Date** | |

---

## 进度检查清单 | Progress Checklist (Day 1-4)

### Day 1: STM32 环境搭建 | STM32 Environment Setup

- [ ] 了解 ARM Cortex-M4 处理器架构特点（FPU、DSP 指令、中断控制器）
- [ ] 安装 STM32CubeIDE 并创建新工程
- [ ] 理解 STM32 HAL 库工程结构（Src / Inc / Drivers / Middlewares）
- [ ] 完成 GPIO 配置并实现 LED Blink 程序
- [ ] 使用 ST-Link 成功烧录程序到 STM32F4
- [ ] 理解时钟树配置（HSE / HSI / PLL）

> Understand ARM Cortex-M4 architecture features (FPU, DSP instructions, NVIC); install STM32CubeIDE and create a new project; understand HAL library project structure; complete GPIO configuration with LED Blink; flash program via ST-Link; understand clock tree configuration (HSE/HSI/PLL).

**验证方法 | Verification:**
```bash
# 在 STM32CubeIDE 中编译并烧录
# Build and flash in STM32CubeIDE
# ST-Link 连接成功，LED 按预期闪烁
# ST-Link connects successfully, LED blinks as expected
```

---

### Day 2: 硬件原理图阅读 | Schematic Reading & PCB

- [ ] 理解原理图阅读方法（电源、信号、地线标注）
- [ ] 分析 ElectronBot 电路架构（STM32、舵机驱动、USB、SPI 显示、传感器）
- [ ] 识别关键元器件（STM32F4、PCA9685、GC9A01、APDS-9960、MPU6050）
- [ ] 理解 I2C 总线拓扑（主机/从机地址、上拉电阻）
- [ ] 了解 PCB 基础知识（铜层、丝印、阻焊、过孔）
- [ ] 确认 3D 打印外壳文件已准备就绪

> Understand schematic reading methods; analyze ElectronBot circuit architecture; identify key components; understand I2C bus topology; learn PCB basics; confirm 3D-printed shell files are ready.

**提交材料 | Submission:**
- 原理图标注截图（标注各模块区域）
- 元器件清单确认（BOM checklist）

---

### Day 3: PCB 焊接实训 | PCB Soldering Practice

- [ ] 掌握贴片元件（0603/0402 电阻电容）手工焊接技巧
- [ ] 完成 QFN 封装（STM32F4）焊接训练
- [ ] 焊接自定义舵机驱动板（PCA9685 或等效芯片）
- [ ] 焊接 USB Type-C 接口
- [ ] 焊接 SPI 显示屏排针/排母连接器
- [ ] 焊接质量检查（无短路、无虚焊、无锡桥）
- [ ] 万用表通电前检测（对地电阻、电源通路）

> Master SMD soldering techniques for 0603/0402 components; complete QFN package soldering training; solder custom servo driver board; solder USB Type-C connector; solder SPI display connectors; verify soldering quality (no shorts, cold joints, or solder bridges); pre-power multimeter checks.

**焊接质量评分标准 | Soldering Quality Criteria:**

| 等级 | 标准 |
|------|------|
| 优秀 | 焊点光亮圆润，无虚焊短路，QFN 引脚排列整齐 |
| 良好 | 个别焊点需补焊，整体质量可接受 |
| 需改进 | 存在短路或虚焊，需要返工 |

---

### Day 4: 机械组装与首次测试 | Mechanical Assembly & First Test

- [ ] 完成 3D 打印外壳组装
- [ ] 安装 6 个舵机到对应位置（头部 x2、手臂 x2、躯干 x2）
- [ ] 固定 PCB 主板到外壳
- [ ] 连接显示屏排线
- [ ] 连接舵机到驱动板的 I2C 线缆
- [ ] 进行舵机标定（记录每个舵机的零位和角度范围）
- [ ] 首次上电测试（LED 闪烁正常）
- [ ] 通过 USB 连接 PC，确认设备识别

> Complete 3D-printed shell assembly; install 6 servos; mount PCB; connect display ribbon cable; connect servos to driver board via I2C; perform servo calibration (record zero-position and angle range); first power-on test; confirm USB device recognition on PC.

**舵机标定记录表 | Servo Calibration Record:**

| 舵机 ID | 名称 | 最小角度 | 最大角度 | 零位偏移 | 备注 |
|---------|------|---------|---------|---------|------|
| 0 | head_yaw | | | | |
| 1 | head_pitch | | | | |
| 2 | left_arm | | | | |
| 3 | right_arm | | | | |
| 4 | body_yaw | | | | |
| 5 | body_pitch | | | | |

---

## 技术问题 | Technical Questions

请回答以下问题（中英文均可）：
> Answer the following questions (in Chinese or English):

### Q1: STM32 架构 | STM32 Architecture
**问题：** STM32F4 使用的 ARM Cortex-M4 内核与 Cortex-M0/M3 有什么关键区别？为什么选择 Cortex-M4 而不是更简单的 M0？

> What are the key differences between the ARM Cortex-M4 core used in STM32F4 and Cortex-M0/M3? Why choose Cortex-M4 over the simpler M0?

**回答：**

---

### Q2: USB CDC 原理 | USB CDC Principles
**问题：** USB CDC（Communications Device Class）虚拟串口的工作原理是什么？与 UART 串口有什么本质区别？

> How does USB CDC virtual serial port work? What is the fundamental difference from UART serial?

**回答：**

---

### Q3: I2C 总线 | I2C Bus
**问题：** I2C 总线的上拉电阻为什么需要外接？如果没有上拉电阻会发生什么？PCA9685 的 I2C 地址是多少？

> Why do I2C bus pull-up resistors need to be external? What happens without them? What is the I2C address of PCA9685?

**回答：**

---

### Q4: 舵机控制 | Servo Control
**问题：** PWM 控制舵机的标准信号周期和脉宽范围是多少？使用专用驱动芯片（如 PCA9685）相比直接用 MCU PWM 输出有什么优势？

> What are the standard PWM signal period and pulse width range for servo control? What are the advantages of using a dedicated driver chip (like PCA9685) over direct MCU PWM output?

**回答：**

---

## 构建日志 | Build Log

请在每次操作时记录 | Record during each operation:

| 日期 | 操作内容 | 耗时 | 结果 | 问题/备注 |
|------|---------|------|------|----------|
| | | | 成功/失败 | |
| | | | 成功/失败 | |
| | | | 成功/失败 | |
| | | | 成功/失败 | |

---

## 遇到的问题 | Issues Encountered

| 序号 | 问题描述 | 尝试的解决方案 | 当前状态 |
|------|---------|---------------|---------|
| 1 | | | 未解决/已解决 |
| 2 | | | 未解决/已解决 |
| 3 | | | 未解决/已解决 |

> Describe issues encountered, attempted solutions, and current status.

---

## 代码提交要求 | Code Submission Requirements

- [ ] 所有代码已推送到团队 Git 仓库
- [ ] Commit 信息清晰规范（如 `feat: implement GPIO blink for STM32F4`）
- [ ] 至少 4 个有意义的 commit（每天至少 1 个）
- [ ] 仓库包含 README.md 文件

**仓库链接：** _______________________

> All code pushed to team repo; clear commit messages; at least 4 meaningful commits; repo contains README.md.

---

## 自我评估 | Self-Assessment

请对以下维度进行 1-5 分评分（1=需要大量帮助, 5=完全独立完成）：

> Rate each dimension 1-5 (1=need significant help, 5=completed independently).

| 维度 | 评分 (1-5) | 备注 |
|------|-----------|------|
| **STM32 环境搭建** | | |
| STM32 Environment Setup | | |
| **原理图阅读能力** | | |
| Schematic Reading | | |
| **贴片焊接技术** | | |
| SMD Soldering Skills | | |
| **QFN 封装焊接** | | |
| QFN Package Soldering | | |
| **舵机标定** | | |
| Servo Calibration | | |
| **机械组装** | | |
| Mechanical Assembly | | |
| **团队协作** | | |
| Team Collaboration | | |

---

## 检查流程 | Check-in Process

### 自查阶段 (30 分钟) | Self-check (30 min)

学员自行检查所有功能：
1. 检查焊接质量（目视 + 万用表）
2. 上电测试
3. 准备演示材料

### 演示阶段 (15 分钟/人) | Demo (15 min/person)

学员向助教演示：
1. STM32CubeIDE 工程编译与烧录（3 分钟）
2. PCB 焊接质量展示（3 分钟）
3. 整机组装与舵机标定（4 分钟）
4. 技术问题回答（3 分钟）
5. 问题交流（2 分钟）

### 评估阶段 (5 分钟) | Evaluation (5 min)

助教评估并给出反馈。

---

## 评分标准 | Grading Criteria

| 项目 | 分数 | 标准 |
|------|------|------|
| **STM32 环境搭建** | 20 分 | CubeIDE 正常工作，能编译烧录 |
| **原理图理解** | 15 分 | 能识别主要模块和信号路径 |
| **焊接质量** | 25 分 | 无短路虚焊，QFN 焊接合格 |
| **舵机标定** | 20 分 | 标定数据完整，角度范围合理 |
| **组装完成度** | 10 分 | 结构完整，布线整洁 |
| **代码与文档** | 10 分 | Git 提交规范，文档清晰 |

---

## 通过标准 | Pass Criteria

- [ ] STM32CubeIDE 能正常编译和烧录
- [ ] PCB 焊接无短路（万用表验证）
- [ ] 至少 4 个舵机安装并可转动
- [ ] 舵机标定数据已记录
- [ ] USB 连接 PC 后设备可识别
- [ ] 代码有适当注释和 Git 提交记录

**总分 >= 60 分为通过**

---

## 下周预告 | Next Week Preview

第二周将进行：
- Day 5: 固件基础开发（USB CDC + GC9A01 屏幕驱动）
- Day 6: 舵机控制系统（I2C + PID + 运动学）
- Day 7: 表情动画系统（帧动画 + 状态机）
- Day 8: 传感器集成（APDS-9960 + MPU6050 + 摄像头）

---

*最后更新：2026-05-27*
