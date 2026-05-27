# 最终展示要求 | Final Presentation Requirements

## 概述 | Overview

最终展示是 ElectronBot 进阶桌宠机器人项目的重要环节，学员将向老师和同学展示团队构建的桌宠机器人，包括表情显示、舵机控制、计算机视觉、AI 对话等技术实现。

> The final presentation is a critical component of the ElectronBot Advanced Desktop Pet project, where students present their team-built desktop pet robot to teachers and classmates, including expression display, servo control, computer vision, AI dialogue, and other technical implementations.

---

## 展示时间 | Presentation Time

**Day 12 下午 | Day 12 Afternoon**
- 每队 10 分钟（含演示和问答）
- 10 minutes per team (demo + Q&A included)

---

## 展示结构 | Presentation Structure

### 1. 项目概述 (1 分钟) | Project Overview (1 min)

**内容要求：**
- 团队介绍和成员分工
- 项目名称和定位（桌宠机器人）
- 核心功能概述（6-DOF 控制、表情、视觉、AI 对话）
- 技术栈概述（STM32F4 + Unity + OpenCV + LLM API）

**PPT 页数：** 1-2 页

> Team introduction and individual contributions; project positioning; core features (6-DOF control, expressions, vision, AI dialogue); tech stack (STM32F4 + Unity + OpenCV + LLM API).

---

### 2. 技术架构讲解 (3 分钟) | Technical Architecture (3 min)

**内容要求：**
- 系统架构框图（硬件 + 软件）
- 硬件组成说明：
  - STM32F4 主控（ARM Cortex-M4）
  - PCA9685 舵机驱动（I2C）
  - GC9A01 圆形 SPI 显示屏
  - APDS-9960 手势传感器
  - MPU6050 六轴 IMU
  - USB Type-C 通信接口
- 软件架构说明：
  - 固件层：HAL 驱动 + USB CDC + 显示 + 舵机 + 传感器
  - 桌面层：Unity 应用 + USB 桥接
  - 视觉层：OpenCV + MediaPipe
  - AI 层：LLM API 对话系统
- 数据流图（传感器 -> STM32 -> USB -> PC -> 指令 -> STM32 -> 执行）

**PPT 页数：** 2-3 页

> System architecture diagram; hardware components; software architecture; data flow (sensor -> STM32 -> USB -> PC -> command -> STM32 -> actuation).

---

### 3. 关键技术深入 (2 分钟) | Key Technical Deep Dive (2 min)

**选择 2-3 个技术点进行深入讲解 | Choose 2-3 technical points to explain in depth:**

1. **PID 舵机控制**
   - PID 数学模型和调参过程
   - 闭环控制框图
   - 实际效果对比（调参前后）

2. **表情状态机**
   - 状态机设计（idle -> enter -> loop -> exit -> idle）
   - 帧动画实现原理
   - 表情过渡动画

3. **USB 通信协议**
   - 数据包格式设计
   - 校验和机制
   - 线程安全实现

4. **计算机视觉**
   - OpenCV 人脸检测
   - MediaPipe 姿态估计
   - 动作模仿功能

**PPT 页数：** 2 页

> Deep dive into PID servo control, expression state machine, USB protocol, or computer vision with diagrams and before/after comparisons.

---

### 4. 实物演示 (3 分钟) | Live Demo (3 min)

**必演功能（按顺序）| Required demos (in order):**

1. **上电自检** (30 秒)
   - 机器人上电后屏幕显示启动动画
   - 舵机回到零位

2. **表情展示** (30 秒)
   - 展示至少 4 种不同表情
   - 表情切换过渡自然

3. **舵机控制** (1 分钟)
   - 头部偏航/俯仰运动
   - 双臂同时运动
   - 躯干运动
   - 平滑运动演示

4. **传感器反应** (30 秒)
   - 手势触发反应（挥手 -> 挥手回应）
   - 摸头 -> 开心表情

5. **视觉功能** (30 秒)
   - 人脸检测 -> 机器人转头跟随
   - （可选）姿态模仿

> Power-on self-test; expression display (4+ expressions); servo control (head, arms, body, smooth motion); sensor reactions (gesture, touch); vision (face tracking, optional pose imitation).

**选演功能（加分项）| Optional bonus features:**
- AI 对话功能（语音交互）
- 摄像头姿态模仿
- 自定义行为系统
- 手机/PC 端控制界面

**演示注意事项 | Demo Notes:**
- 提前确保 USB 连接稳定
- 准备备用 STM32 固件（Plan B）
- 确保摄像头画面可见
- 准备演示视频（以防硬件故障）

---

### 5. 挑战与收获 (1 分钟) | Challenges & Learnings (1 min)

**内容要求：**
- 列出 2-3 个主要技术挑战
- 每个挑战的解决方案
- 从中获得的工程经验

**示例挑战 | Example Challenges:**
1. **QFN 焊接困难** -- 使用助焊剂和热风枪
2. **USB CDC 枚举不稳定** -- 修改 USB 描述符和中断优先级
3. **PID 调参困难** -- 采用分步调参法（先 P 再 D 最后 I）
4. **GC9A01 刷新率不够** -- 优化 SPI 传输和帧缓冲策略
5. **OpenPose 延迟过高** -- 使用 MediaPipe 替代，降低分辨率

**PPT 页数：** 1 页

> List 2-3 key technical challenges with solutions and engineering lessons learned.

---

## Demo 功能清单 | Demo Feature Checklist

### 核心功能（必须展示）| Core Features (Must Demo)

- [ ] 上电自检 + 启动动画
- [ ] 至少 4 种表情切换
- [ ] 6 路舵机控制演示
- [ ] 平滑运动（缓动函数）
- [ ] USB 通信正常
- [ ] 手势传感器反应

### 进阶功能（尽可能展示）| Advanced Features (Try to Demo)

- [ ] 人脸检测与跟踪
- [ ] 姿态估计模仿
- [ ] AI 对话交互
- [ ] 自定义行为系统
- [ ] Unity 桌面应用控制

### 系统稳定性 | System Stability

- [ ] 连续运行 3 分钟以上无故障
- [ ] 紧急停止功能可用
- [ ] 无明显内存泄漏

---

## Q&A 准备指南 | Q&A Preparation Guide

### 技术问题 | Technical Questions

**1. 为什么选择 STM32F4 而不是 ESP32 或 Arduino？**
> STM32F4 (Cortex-M4) 提供 FPU 和 DSP 指令，适合实时控制计算；内置 USB Device 控制器，支持 USB CDC；性能远超 Arduino；比 ESP32 更适合实时性要求高的场景。

STM32F4 provides FPU and DSP instructions for real-time control; built-in USB Device controller supports CDC; much more capable than Arduino; better real-time performance than ESP32.

**2. PID 控制器中三个参数分别起什么作用？**
> P（比例）：输出与误差成正比，决定响应速度
> I（积分）：累积历史误差，消除稳态误差
> D（微分）：预测误差变化趋势，抑制超调和振荡

P: output proportional to error, determines response speed; I: accumulates historical error, eliminates steady-state error; D: predicts error trend, suppresses overshoot and oscillation.

**3. USB CDC 和 UART 有什么区别？**
> USB CDC 是虚拟串口，实际通过 USB 协议传输，速率更高（12Mbps vs 115200bps），有CRC 校验，即插即用。UART 是硬件串口，需要电平转换。

USB CDC is a virtual serial port using USB protocol: higher speed (12Mbps vs 115200bps), CRC verification, plug-and-play. UART is hardware serial requiring level conversion.

**4. GC9A01 圆形屏幕驱动需要注意什么？**
> 屏幕分辨率 240x240，但实际显示区域为圆形；需要处理矩形帧缓冲到圆形显示的裁剪；SPI 速率影响刷新率；初始化序列必须完整。

Screen resolution is 240x240 but display area is circular; need to handle rectangular frame buffer to circular display clipping; SPI speed affects refresh rate; initialization sequence must be complete.

**5. MediaPipe 和 OpenPose 有什么区别？**
> MediaPipe 是 Google 的轻量级框架，CPU 即可运行，适合实时应用。OpenPose 基于 Caffe/CMU，精度更高但需要 GPU。本项目选择 MediaPipe 是为了在普通 PC 上实时运行。

MediaPipe is Google's lightweight framework running on CPU, suitable for real-time use. OpenPose (CMU) has higher accuracy but requires GPU. We chose MediaPipe for real-time performance on standard PCs.

### 项目问题 | Project Questions

**6. 最大的技术挑战是什么？**
> （学员根据实际经历回答 | Answer based on actual experience）

**7. 如果重新开始，会做什么不同？**
> （学员根据实际经历回答 | Answer based on actual experience）

**8. 未来可以如何扩展这个项目？**
> 建议：加入语音交互、增加更多传感器、改进运动学算法、添加更多表情、实现自主导航等。

Suggestions: add voice interaction, more sensors, improved kinematics, more expressions, autonomous navigation, etc.

---

## PPT 要求 | PPT Requirements

### 整体要求 | General Requirements

- **总页数：** 8-12 页
- **风格：** 简洁、专业、图文并茂
- **语言：** 中英双语

### 必含页面 | Required Pages

1. **封面页** (1 页)
   - 项目名称（中英文）
   - 团队成员姓名
   - 日期

2. **项目概述** (1-2 页)
   - 项目简介
   - 核心功能列表
   - 技术栈

3. **系统架构** (2 页)
   - 硬件架构图
   - 软件架构图
   - 数据流程图

4. **关键技术** (2 页)
   - 选 2-3 个技术点深入讲解
   - 包含原理图/公式/对比

5. **挑战与解决** (1 页)
   - 遇到的问题
   - 解决方案

6. **演示页面** (1 页)
   - 功能清单
   - 演示流程

7. **总结与展望** (1 页)
   - 学习收获
   - 未来改进方向

---

## 演示准备清单 | Demo Preparation Checklist

### 硬件准备 | Hardware

- [ ] STM32 固件最终版本已烧录
- [ ] USB 线缆连接稳定
- [ ] 摄像头已连接并测试
- [ ] 舵机运动范围正常
- [ ] 电池/供电充足（或使用 USB 供电）
- [ ] 准备备用固件（Plan B）

### 软件准备 | Software

- [ ] PC 端 Python 程序可正常运行
- [ ] Unity 控制程序可正常启动（如有）
- [ ] OpenCV 摄像头画面正常
- [ ] AI API 连接可用（如有）
- [ ] 所有参数锁定（不再修改）

### 材料准备 | Materials

- [ ] PPT 制作完成
- [ ] 演示脚本准备
- [ ] 架构图和技术图准备
- [ ] 演示视频录制（Plan B）

### 排练 | Rehearsal

- [ ] 完整排练至少 2 次
- [ ] 时间控制在 10 分钟以内
- [ ] 准备常见问题答案
- [ ] 确认演示流程无卡点

---

## 评分标准 | Grading Criteria

| 项目 | 分数 | 标准 |
|------|------|------|
| **实物演示效果** | 30 分 | 表情丰富、舵机流畅、传感器响应、视觉功能 |
| **技术讲解深度** | 20 分 | 原理清晰、架构完整、有数学/框图支撑 |
| **PPT 质量** | 15 分 | 美观专业、内容完整、图文并茂 |
| **沟通表达** | 15 分 | 清晰流畅、逻辑连贯、互动良好 |
| **问答环节** | 10 分 | 回答准确、思路清晰 |
| **代码与文档** | 10 分 | 代码规范、注释清晰、Git 历史完整 |

---

## 成功标准 | Success Criteria

### 基础成功 (60-70 分)

- [ ] 完成机器人实物演示
- [ ] 表情显示功能正常
- [ ] 舵机控制功能可用
- [ ] USB 通信正常
- [ ] 讲解清晰有条理

### 优秀展示 (80-90 分)

- [ ] 演示流畅无故障
- [ ] 技术讲解深入
- [ ] 传感器功能演示
- [ ] 视觉功能可用
- [ ] PPT 制作精美

### 卓越表现 (90+ 分)

- [ ] AI 对话功能可用
- [ ] 姿态模仿功能
- [ ] Unity 桌面控制应用
- [ ] 有创新的附加功能
- [ ] 对技术有深刻理解和独到见解

---

## 展示技巧 | Presentation Tips

### 讲解技巧 | Speaking Tips

1. **开场有力**：用一个有趣的 Demo 瞬间（如机器人打招呼）开场，吸引注意力
   > **Strong opening**: Start with a fun demo moment (like the robot waving hello) to grab attention.

2. **讲故事**：把技术讲解融入一个故事线（"我们想让机器人能..."）
   > **Tell a story**: Weave technical explanations into a narrative ("We wanted the robot to...").

3. **先 Demo 后原理**：先展示效果，再解释原理，更直观
   > **Demo first, theory second**: Show the effect first, then explain the principle.

4. **准备过渡语**：每个部分之间有自然的过渡
   > **Prepare transitions**: Have natural transitions between sections.

5. **时间控制**：严格控制在 10 分钟以内，留 1-2 分钟余量
   > **Time management**: Stay strictly within 10 minutes, leave 1-2 minutes buffer.

### 演示技巧 | Demo Tips

1. **预演所有操作**：每个 Demo 步骤都提前演练
   > **Rehearse every step**: Practice each demo step beforehand.

2. **准备 Plan B**：如果硬件出问题，播放演示视频
   > **Have a Plan B**: Play a demo video if hardware fails.

3. **摄像头可见**：确保观众能看到机器人屏幕和动作
   > **Camera visibility**: Ensure the audience can see the robot's screen and movements.

4. **节奏控制**：不要在一个功能上停留太久
   > **Pacing**: Don't spend too long on any single feature.

5. **失败不慌**：如果某个功能失败，简要说明原因后继续
   > **Stay calm on failure**: If a feature fails, briefly explain why and move on.

---

## 最终提交清单 | Final Submission Checklist

### 代码 | Code

- [ ] 所有固件代码提交到 Git
- [ ] 所有 PC 端 Python 代码提交
- [ ] 代码有适当的中英文注释
- [ ] 包含 PID 参数配置
- [ ] 包含 README.md

### 文档 | Documentation

- [ ] 项目 README 完善
- [ ] 系统架构图
- [ ] 接线图
- [ ] PID 调参记录
- [ ] 舵机标定数据
- [ ] 表情资源清单

### 演示 | Demo

- [ ] 演示视频录制
- [ ] PPT 文件提交
- [ ] 演示脚本

---

*祝演示成功！Good luck with your presentation!*
*最后更新：2026-05-27*
