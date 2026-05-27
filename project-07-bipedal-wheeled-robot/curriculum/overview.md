# 课程大纲总览 | Curriculum Overview

## 课程定位 | Course Positioning

本课程是面向高中生的**机器人控制系统入门实践课程**。学员将在 12 天内从零开始构建一台两轮自平衡轮足机器人，该机器人能够自主站立、通过手机遥控运动，并支持轮足混合运动模式。课程融合了嵌入式系统、电机驱动、传感器融合、控制算法、3D 建模等多个工程领域，是一个综合性极强的跨学科项目。

> This is an **introductory robotics control systems practicum course** for high school students. In 12 days, students will build a two-wheeled self-balancing bipedal robot from scratch that can stand autonomously, be remotely controlled via smartphone, and support hybrid wheeled-legged motion modes. The course integrates multiple engineering disciplines including embedded systems, motor driving, sensor fusion, control algorithms, and 3D modeling -- an intensely comprehensive interdisciplinary project.

---

## 学习目标 | Learning Objectives

### 知识目标 Knowledge Goals

- 理解 ESP32 微控制器的双核架构和 C++ 编程模型
- 掌握 I2C 总线通信协议和 SPI 通信的基本原理
- 理解无刷直流电机（BLDC）的工作原理和磁场定向控制（FOC）方法
- 掌握惯性测量单元（IMU）的工作原理和姿态解算方法
- 理解倒立摆物理模型和 PID 控制算法原理
- 理解串级控制系统的设计思想和参数整定方法

### 技能目标 Skill Goals

- 能够使用 PlatformIO + VSCode 编写、编译、烧录 ESP32 程序
- 能够驱动 BLDC 电机并实现精确的速度和力矩控制
- 能够读取 MPU6050 传感器数据并进行姿态角计算
- 能够设计并调试串级 PID 控制器（直立环 + 速度环 + 转向环）
- 能够实现蓝牙/WiFi 遥控通信功能
- 能够使用 Fusion 360 设计简单的 3D 打印零件

### 素养目标 Quality Goals

- 培养系统工程思维：从物理建模到控制实现的全链条理解
- 培养调试能力：通过串口监视器和数据可视化定位控制问题
- 培养团队协作：分工合作完成硬件组装和软件开发
- 培养文档习惯：记录调参过程、问题分析和解决方案
- 培养表达能力：最终展示和技术分享中清晰阐述控制原理

---

## 每日课程速览 | Daily Course At-a-Glance

| 天数 | 主题 | 上午 (3h) | 下午 (4h) |
|------|------|----------|----------|
| Day 1 | ESP32 入门 | 项目介绍 + 硬件认知 | PlatformIO 配置 + Blink 程序 |
| Day 2 | BLDC 电机控制 | 无刷电机原理 + FOC 基础 | 电机驱动实战 + 编码器读取 |
| Day 3 | IMU 姿态感知 | MPU6050 原理 + I2C 通信 | 姿态解算 + 互补滤波 |
| Day 4 | 倒立摆建模 | 倒立摆物理模型 + 受力分析 | 传递函数 + 控制理论入门 |
| Day 5 | PID 直立控制 | PID 原理 + 参数整定方法 | 直立环调试实战 |
| Day 6 | 串级 PID 控制 | 速度环设计 + 转向环设计 | 三环联调 + 参数优化 |
| Day 7 | 遥控通信 | 蓝牙 Serial 通信 | WiFi 遥控 + 手机端测试 |
| Day 8 | 整车集成 | 全功能代码整合 | 稳定性测试 + 抗干扰优化 |
| Day 9 | 轮足运动 | 轮足混合模式原理 | 步态规划入门 + 模式切换 |
| Day 10 | 3D 建模打印 | Fusion 360 入门 | 零件设计 + 3D 打印实践 |
| Day 11 | 系统集成美化 | 整机组装 + 线缆管理 | 外观优化 + 最终调参 |
| Day 12 | 项目展示 | 演示准备 + Demo 网站完善 | 成果展示与复盘 |

---

## 考核方式 | Assessment

| 考核项 | 占比 | 截止日期 |
|--------|------|---------|
| 第一周进度汇报 Week 1 Check-in | 15% | Day 6 |
| 第二周进度汇报 Week 2 Check-in | 15% | Day 11 |
| 最终演示 Final Demo | 17% | Day 12 |
| 技术实现 Technical Implementation | 35% | Day 12 |
| 文档质量 Documentation | 10% | Day 12 |
| Demo 网站 Project Website | 13% | Day 12 |
| 团队协作 Collaboration | 10% | 全过程 |

> 注：独立完成项目的学员，"团队协作"分数将转换为"自主学习"分数，考察独立解决问题和自主查阅资料的能力。
> Note: For students working independently, the "Collaboration" score is converted to "Self-directed Learning," evaluating independent problem-solving and self-directed research skills.

---

## 课程特色 | Course Highlights

- **真实控制工程**：不是简单的玩具项目，而是真实的倒立摆控制系统，涉及大学水平的控制理论
- **软硬件结合**：从 3D 打印结构件到 PID 参数整定，完整体验机器人系统开发全流程
- **开源社区对接**：基于 StackForce 开源项目，学员可以持续跟进社区更新和二次开发
- **竞赛基础**：掌握的平衡控制技术是各类机器人竞赛（如 RoboMaster、智能车竞赛）的基础

> - **Real Control Engineering**: Not a simple toy project but a genuine inverted pendulum control system involving college-level control theory
> - **Hardware-Software Integration**: From 3D-printed structural parts to PID parameter tuning, experience the full robot system development lifecycle
> - **Open Source Community**: Based on the StackForce open-source project, students can follow community updates and continue development
> - **Competition Foundation**: The balance control techniques mastered here are foundational for robotics competitions (e.g., RoboMaster, Smart Car Competition)
