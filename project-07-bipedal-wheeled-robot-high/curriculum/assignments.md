# 作业说明 | Assignments Overview

## 作业总览 | Assignment Summary

本项目共设 4 项正式作业，贯穿 12 天课程全程：

| 编号 | 作业 Assignment | 截止日期 Deadline | 权重 Weight |
|------|----------------|------------------|-------------|
| HW1 | 第一周进度汇报 Week 1 Check-in | Day 6 | 15% |
| HW2 | 第二周进度汇报 Week 2 Check-in | Day 11 | 15% |
| HW3 | 最终演示 Final Demo | Day 12 | 17% |
| HW4 | 项目文档 + Demo 网站 Documentation + Demo Website | Day 12 | 23% (10%+13%) |
| -- | 技术实现 Technical Implementation | Day 12 | 35% |
| -- | 团队协作 Collaboration | 全过程 Ongoing | 10% |

---

## 每日课后任务 | Daily After-Class Tasks

### Day 1：ESP32 入门
- **任务**：完成 PlatformIO 环境配置，成功编译并烧录 Blink 程序
- **提交**：截图 VSCode 中 PlatformIO 成功编译的输出信息
- **预计时间**：1-2 小时

> - **Task**: Complete PlatformIO environment setup, successfully compile and flash the Blink program
> - **Submission**: Screenshot of successful PlatformIO compilation output in VSCode
> - **Estimated time**: 1-2 hours

### Day 2：BLDC 电机控制
- **任务**：驱动一个 BLDC 电机转动，通过串口输出编码器读数
- **提交**：串口监视器中编码器数据的截图
- **预计时间**：1-2 小时

> - **Task**: Drive one BLDC motor to rotate, output encoder readings via serial
> - **Submission**: Screenshot of encoder data in the serial monitor
> - **Estimated time**: 1-2 hours

### Day 3：IMU 姿态感知
- **任务**：读取 MPU6050 原始数据，计算并输出俯仰角（pitch）和横滚角（roll）
- **提交**：串口输出姿态角数据截图，手拿模块倾斜时数据应随之变化
- **预计时间**：1-2 小时

> - **Task**: Read MPU6050 raw data, calculate and output pitch and roll angles
> - **Submission**: Screenshot of attitude angle serial output; data should change when tilting the module by hand
> - **Estimated time**: 1-2 hours

### Day 4：倒立摆建模
- **任务**：完成倒立摆系统建模练习，写出系统的传递函数框图
- **提交**：手写或电子版的受力分析图和传递函数
- **预计时间**：1-1.5 小时

> - **Task**: Complete the inverted pendulum modeling exercise, draw the system transfer function block diagram
> - **Submission**: Handwritten or digital force analysis diagram and transfer function
> - **Estimated time**: 1-1.5 hours

### Day 5：PID 直立控制
- **任务**：实现直立环 PID 控制，机器人能够短暂站立（至少 3 秒）
- **提交**：机器人站立的短视频（10 秒以上）
- **预计时间**：2-3 小时

> - **Task**: Implement balance-loop PID control; the robot should be able to stand briefly (at least 3 seconds)
> - **Submission**: Short video of the robot standing (10+ seconds)
> - **Estimated time**: 2-3 hours

### Day 6：串级 PID 控制
- **任务**：完成三环串级控制，机器人能稳定站立 30 秒以上
- **提交**：机器人稳定站立的视频 + PID 参数记录表
- **预计时间**：2-3 小时

> - **Task**: Complete three-loop cascade control; the robot should stand stably for 30+ seconds
> - **Submission**: Video of stable standing + PID parameter log table
> - **Estimated time**: 2-3 hours

---

## HW1：第一周进度汇报 (Day 6) | Week 1 Check-in

### 要求 Requirements
- 800-1200 字（中文或英文）
- 包含以下内容：
  1. 已完成的功能列表（配截图/照片/视频）
  2. 遇到的主要困难和解决方法（尤其是硬件调试和 PID 参数问题）
  3. 第二周的计划（控制优化、遥控功能、外壳制作）
  4. 个人反思：学到了什么，哪里可以做得更好

> - 800-1200 words (Chinese or English)
> - Must include:
>   1. List of completed features (with screenshots/photos/videos)
>   2. Major difficulties encountered and solutions (especially hardware debugging and PID parameter issues)
>   3. Plan for the second week (control optimization, remote control, shell construction)
>   4. Personal reflection: what was learned, what could be improved

### 提交方式 Submission
- 提交到 assignments/week-1-checkin.md
- 截止时间：Day 6 课程结束时

---

## HW2：第二周进度汇报 (Day 11) | Week 2 Check-in

### 要求 Requirements
- 800-1200 字（中文或英文）
- 包含以下内容：
  1. 第二周完成的功能列表（遥控、轮足模式、外壳等）
  2. 遇到的 bug 和调试过程（附参数调整记录）
  3. 最终演示的准备情况
  4. 对整个项目的总结反思（技术收获、团队配合、个人成长）

> - 800-1200 words (Chinese or English)
> - Must include:
>   1. List of features completed in the second week (remote control, hybrid mode, shell, etc.)
>   2. Bugs encountered and debugging process (with parameter tuning records)
>   3. Final demo preparation status
>   4. Overall project summary and reflection (technical gains, teamwork, personal growth)

### 提交方式 Submission
- 提交到 assignments/week-2-checkin.md
- 截止时间：Day 11 课程结束时

---

## HW3：最终演示 (Day 12) | Final Demo

### 要求 Requirements
- 5-8 分钟口头演示 + 3 分钟 Q&A
- 必须包含：
  1. 项目背景和目标（1 分钟）-- 为什么做轮足机器人，有什么应用前景
  2. 技术架构概述（1 分钟）-- 硬件框图 + 软件架构图
  3. 实物展示 + 功能演示（2-3 分钟）-- 平衡站立、遥控运动、轮足模式
  4. 关键技术点讲解（1-2 分钟）-- 选一个技术点深入讲解（PID/FOC/IMU）
  5. 遇到的问题与解决方案（1 分钟）

> - 5-8 minute oral presentation + 3 minute Q&A
> - Must include:
>   1. Project background and goals (1 min) -- why build a bipedal wheeled robot, application prospects
>   2. Technical architecture overview (1 min) -- hardware block diagram + software architecture
>   3. Physical demonstration + feature showcase (2-3 min) -- balance standing, remote control, hybrid mode
>   4. Key technical deep-dive (1-2 min) -- choose one topic to explain in depth (PID/FOC/IMU)
>   5. Problems encountered and solutions (1 min)

### 评分标准 Presentation Grading
- 演示清晰度 Clarity (40%)
- 功能完整度 Feature completeness (30%)
- Q&A 应对能力 Q&A response (20%)
- 时间控制 Time management (10%)

---

## HW4：项目文档 + Demo 网站 (Day 12) | Documentation + Demo Website

### 文档要求 Documentation Requirements
- README.md 完整、清晰，包含项目介绍、技术架构、使用说明
- 代码有适当注释，关键函数和算法有详细说明
- 接线图/原理图清晰规范
- PID 参数调试记录完整
- 包含调试指南和常见问题解决方法

> - README.md must be complete and clear, including project introduction, technical architecture, and usage instructions
> - Code should have appropriate comments; key functions and algorithms should be well documented
> - Wiring diagrams and schematics should be clear and standardized
> - PID parameter tuning log should be complete
> - Include a debugging guide and common troubleshooting solutions

### Demo 网站要求 Demo Website Requirements
- 项目介绍页（背景、目标、团队）
- 功能展示（图片/视频/GIF：平衡、运动、轮足模式）
- 技术架构说明（硬件框图、软件流程、控制算法）
- 制作过程和心得（时间线、里程碑、关键决策）
- 部署到 GitHub Pages / Vercel / Cloudflare Pages

> - Project introduction page (background, goals, team)
> - Feature showcase (images/videos/GIFs: balancing, movement, hybrid mode)
> - Technical architecture explanation (hardware block diagram, software flow, control algorithms)
> - Build process and reflections (timeline, milestones, key decisions)
> - Deploy to GitHub Pages / Vercel / Cloudflare Pages
