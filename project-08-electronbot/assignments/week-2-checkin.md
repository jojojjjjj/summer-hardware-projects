# 第二周检查点 | Week 2 Check-in

## 概述 | Overview

第二周检查点用于评估学员在 Day 5-8（第二阶段）的学习成果，重点检查固件开发完成度、USB CDC 通信、GC9A01 屏幕驱动、舵机 PID 控制、表情动画系统，以及传感器集成。

> Week 2 check-in evaluates learning outcomes from Day 5-8 (Phase 2), focusing on firmware development completion, USB CDC communication, GC9A01 display driver, servo PID control, expression animation system, and sensor integration.

---

## 检查时间 | Check-in Time

**Day 8 下午 | Day 8 Afternoon**

---

## 学生/团队信息 | Student / Team Information

| 字段 | 内容 |
|------|------|
| **团队名称 / Team Name** | |
| **成员姓名 / Members** | |
| **项目仓库链接 / Repo URL** | |
| **检查日期 / Check-in Date** | |
| **第一周得分 / Week 1 Score** | |

---

## 进度检查清单 | Progress Checklist (Day 5-8)

### Day 5: 固件基础开发 | Firmware Fundamentals

- [ ] 理解 STM32 HAL 库核心概念（句柄、回调、中断）
- [ ] 完成 USB CDC 设备枚举（PC 识别为虚拟串口）
- [ ] 实现 USB CDC 数据收发（PC <-> STM32 双向通信）
- [ ] 驱动 GC9A01 圆形 SPI 显示屏（初始化序列 + 清屏 + 填充颜色）
- [ ] 实现帧缓冲管理（全屏或局部刷新）
- [ ] 在屏幕上显示简单的图形（圆形、矩形、文字）

> Understand STM32 HAL library core concepts; complete USB CDC device enumeration; implement USB CDC data send/receive; drive GC9A01 round SPI display; implement frame buffer management; display simple graphics on screen.

**验证方法 | Verification:**
```bash
# 在 PC 端打开串口终端
# Open serial terminal on PC
# 发送测试数据，确认 STM32 接收并回显
# Send test data, confirm STM32 receives and echoes back

# GC9A01 屏幕应显示彩色图案
# GC9A01 screen should display colored patterns
```

**提交材料 | Submission:**
- USB CDC 通信截图（PC 端串口助手收发数据）
- GC9A01 屏幕显示照片（彩色图案）

---

### Day 6: 舵机控制系统 | Servo Control System

- [ ] 实现 I2C 主机通信，扫描并识别 PCA9685（地址 0x40）
- [ ] 通过 PCA9685 控制单个舵机转动到指定角度
- [ ] 实现 6 路舵机同时控制
- [ ] 理解 PID 控制器数学原理（P/I/D 各项作用）
- [ ] 实现基础 PID 闭环控制（位置环）
- [ ] 记录 PID 调参过程和结果
- [ ] 实现正向运动学计算（关节角 -> 末端位置）

> Implement I2C master communication with PCA9685; control single servo to target angle; implement 6-channel simultaneous control; understand PID math; implement basic PID closed-loop control; record PID tuning process; implement forward kinematics.

**PID 调参记录表 | PID Tuning Record:**

| 舵机 | Kp | Ki | Kd | 响应特性 | 稳态误差 |
|------|----|----|----|---------|---------|
| head_yaw | | | | 过阻尼/欠阻尼/临界 | |
| head_pitch | | | | | |
| left_arm | | | | | |
| right_arm | | | | | |
| body_yaw | | | | | |
| body_pitch | | | | | |

**提交材料 | Submission:**
- I2C 扫描结果截图
- 舵机控制演示视频
- PID 调参记录表

---

### Day 7: 表情动画系统 | Expression Animation System

- [ ] 理解帧动画原理（帧率、关键帧、插值）
- [ ] 制作/准备表情图片资源（至少 4 种表情）
- [ ] 设计表情状态机（idle -> enter -> loop -> exit -> idle）
- [ ] 实现动画播放引擎（帧序列播放、循环控制）
- [ ] 实现表情切换过渡（淡入淡出或直接切换）
- [ ] 在 GC9A01 屏幕上成功播放至少 2 种表情动画
- [ ] 通过 USB 命令切换表情

> Understand frame animation principles; prepare expression image assets (at least 4); design expression state machine; implement animation playback engine; implement expression transitions; play at least 2 expressions on GC9A01; switch expressions via USB commands.

**表情资源清单 | Expression Asset Checklist:**

| 表情名称 | 帧数 | 帧率 (fps) | 是否完成 |
|---------|------|-----------|---------|
| idle | | | |
| happy | | | |
| sad | | | |
| angry | | | |
| surprised | | | |
| love | | | |

**提交材料 | Submission:**
- 表情动画播放视频
- 状态机设计图（手绘或工具绘制）
- 表情资源文件

---

### Day 8: 传感器集成 | Sensor Integration

- [ ] 驱动 APDS-9960 手势传感器（I2C 地址 0x39）
- [ ] 实现手势识别（上/下/左/右/远/近）
- [ ] 驱动 MPU6050 六轴 IMU（I2C 地址 0x68）
- [ ] 读取三轴加速度计和三轴陀螺仪原始数据
- [ ] 实现姿态角计算（互补滤波或卡尔曼滤波）
- [ ] 集成 USB 摄像头（可选，PC 端 OpenCV）
- [ ] 传感器数据可通过 USB 上报给 PC

> Drive APDS-9960 gesture sensor; implement gesture recognition; drive MPU6050 IMU; read accelerometer and gyroscope data; compute attitude angles; integrate USB camera (optional, PC-side OpenCV); sensor data reported to PC via USB.

**传感器数据验证 | Sensor Data Verification:**

| 传感器 | 寄存器地址 | 读取值示例 | 单位 | 是否正常 |
|--------|-----------|-----------|------|---------|
| APDS-9960 (手势) | 0x39 | 上/下/左/右 | - | |
| MPU6050 (Accel X) | 0x3B-0x3C | | g | |
| MPU6050 (Accel Y) | 0x3D-0x3E | | g | |
| MPU6050 (Accel Z) | | ~1.0 | g | |
| MPU6050 (Gyro X) | | | deg/s | |

**提交材料 | Submission:**
- 手势识别演示视频
- MPU6050 数据串口输出截图
- 传感器集成测试报告

---

## 技术问题 | Technical Questions

请回答以下问题（中英文均可）：
> Answer the following questions (in Chinese or English):

### Q1: PID 控制 | PID Control
**问题：** 请解释 PID 控制器中比例（P）、积分（I）、微分（D）各项的物理含义，以及调参的一般步骤。在你的舵机控制中，哪个参数对响应速度影响最大？

> Explain the physical meaning of P, I, D terms in a PID controller and the general tuning procedure. In your servo control, which parameter has the greatest impact on response speed?

**回答：**

---

### Q2: 运动学 | Kinematics
**问题：** 正向运动学（Forward Kinematics）和逆向运动学（Inverse Kinematics）有什么区别？在本项目中，我们使用正向运动学的目的是什么？

> What is the difference between Forward Kinematics and Inverse Kinematics? In this project, what is the purpose of using forward kinematics?

**回答：**

---

### Q3: 帧动画 | Frame Animation
**问题：** 在嵌入式系统中实现帧动画时，帧率（FPS）受哪些因素限制？如何在不降低帧率的情况下减少内存占用？

> When implementing frame animation on an embedded system, what factors limit the frame rate (FPS)? How can you reduce memory usage without lowering the frame rate?

**回答：**

---

### Q4: I2C 多设备 | I2C Multi-Device
**问题：** ElectronBot 使用 I2C 总线连接了多个设备（PCA9685、APDS-9960、MPU6050）。如果两个设备具有相同的 I2C 地址，该如何解决？I2C 总线上挂载设备数量有没有上限？

> ElectronBot connects multiple devices via I2C (PCA9685, APDS-9960, MPU6050). How do you resolve address conflicts if two devices share the same I2C address? Is there a limit to the number of devices on an I2C bus?

**回答：**

---

## 代码审查要求 | Code Review Requirements

请准备以下代码模块供审查 | Prepare the following modules for code review:

### 代码规范检查 | Code Standards Check

- [ ] 代码有适当的中文/英文注释
- [ ] 函数有清晰的文档说明（参数、返回值）
- [ ] 使用了合理的错误处理（HAL 返回值检查）
- [ ] 没有硬编码的魔术数字（使用宏定义或枚举）
- [ ] 中断处理函数简短高效
- [ ] 全局变量有 volatile 修饰（如在中断中使用）

### 模块检查 | Module Check

| 模块 | 文件名 | 行数 | 是否完成 | 备注 |
|------|--------|------|---------|------|
| USB CDC | usb_cdc.c/h | | | |
| GC9A01 显示 | gc9a01.c/h | | | |
| I2C 舵机控制 | servo_ctrl.c/h | | | |
| PID 控制器 | pid.c/h | | | |
| 表情引擎 | expression.c/h | | | |
| 传感器驱动 | apds9960.c/h | | | |
| 传感器驱动 | mpu6050.c/h | | | |

---

## 性能指标报告 | Performance Metrics

请测量并报告以下性能指标 | Measure and report the following performance metrics:

| 指标 | 目标值 | 实测值 | 是否达标 |
|------|--------|--------|---------|
| **USB CDC 通信延迟** | < 10ms | | |
| USB CDC Communication Latency | | | |
| **显示屏刷新帧率** | >= 15 fps | | |
| Display Refresh Rate | | | |
| **舵机响应延迟** | < 50ms | | |
| Servo Response Latency | | | |
| **PID 控制周期** | >= 100Hz (10ms) | | |
| PID Control Loop Rate | | | |
| **姿态角更新率** | >= 50Hz | | |
| Attitude Angle Update Rate | | | |
| **表情切换时间** | < 200ms | | |
| Expression Switch Time | | | |
| **MCU CPU 占用率** | < 70% | | |
| MCU CPU Usage | | | |

---

## 关键功能确认 | Key Functionality Confirmation

### USB 通信 | USB Communication

- [ ] PC 能识别 STM32 USB CDC 设备
- [ ] 双向数据传输正常
- [ ] 数据包校验和验证通过
- [ ] PING-PONG 心跳测试通过

> PC recognizes STM32 USB CDC device; bidirectional data transfer works; packet checksum validation passes; PING-PONG heartbeat test passes.

### 显示系统 | Display System

- [ ] GC9A01 屏幕正确初始化
- [ ] 能显示彩色图形
- [ ] 帧缓冲工作正常
- [ ] 至少 2 种表情动画可播放

> GC9A01 correctly initialized; colored graphics display; frame buffer works; at least 2 expression animations playable.

### 舵机系统 | Servo System

- [ ] 6 个舵机全部可控
- [ ] PID 控制器工作正常
- [ ] 角度精度 +/-2 度以内
- [ ] 平滑运动实现

> All 6 servos controllable; PID controller works; angle accuracy within +/-2 degrees; smooth motion implemented.

### 传感器系统 | Sensor System

- [ ] APDS-9960 手势识别可用
- [ ] MPU6050 数据读取正常
- [ ] 传感器数据通过 USB 上报
- [ ] 手势可触发表情/动作反应

> APDS-9960 gesture recognition works; MPU6050 data reads correctly; sensor data reported via USB; gestures trigger expression/motion reactions.

---

## 遇到的问题 | Issues Encountered

| 序号 | 问题描述 | 解决方案 | 状态 |
|------|---------|---------|------|
| 1 | | | 未解决/已解决 |
| 2 | | | 未解决/已解决 |
| 3 | | | 未解决/已解决 |
| 4 | | | 未解决/已解决 |
| 5 | | | 未解决/已解决 |

---

## 自我评估 | Self-Assessment

请对以下维度进行 1-5 分评分（1=需要大量帮助, 5=完全独立完成）：

> Rate each dimension 1-5 (1=need significant help, 5=completed independently).

| 维度 | 评分 (1-5) | 备注 |
|------|-----------|------|
| **USB CDC 开发** | | |
| USB CDC Development | | |
| **SPI 显示驱动** | | |
| SPI Display Driver | | |
| **I2C 舵机控制** | | |
| I2C Servo Control | | |
| **PID 控制理解** | | |
| PID Control Understanding | | |
| **表情动画系统** | | |
| Expression Animation System | | |
| **传感器集成** | | |
| Sensor Integration | | |
| **代码质量与注释** | | |
| Code Quality & Comments | | |
| **调试能力** | | |
| Debugging Skills | | |

---

## 检查流程 | Check-in Process

### 准备阶段 (1 小时) | Preparation (1 hour)

1. **功能自检**：运行所有模块测试程序
2. **材料整理**：准备演示材料和代码
3. **演示排练**：预演演示流程

### 演示阶段 (20 分钟/人) | Demo (20 min/person)

1. **USB CDC 通信演示** (3 分钟)
2. **GC9A01 屏幕显示演示** (3 分钟)
3. **舵机控制演示** (4 分钟)
4. **表情动画演示** (4 分钟)
5. **传感器集成演示** (4 分钟)
6. **问答交流** (2 分钟)

### 评估阶段 (5 分钟) | Evaluation (5 min)

---

## 评分标准 | Grading Criteria

| 维度 | 权重 | 标准 |
|------|------|------|
| **USB CDC 通信** | 20% | 双向通信正常，数据包格式正确 |
| **GC9A01 显示** | 15% | 屏幕驱动正常，可显示图形和动画 |
| **舵机控制 + PID** | 25% | 6 路舵机可控，PID 调参有记录 |
| **表情动画系统** | 20% | 状态机设计合理，动画播放流畅 |
| **传感器集成** | 10% | 至少一种传感器数据读取正常 |
| **代码与文档** | 10% | 代码规范，注释清晰，Git 提交完整 |

---

## 通过标准 | Pass Criteria

### 基础要求（必须）| Basic Requirements (Required)

- [ ] USB CDC 通信双向正常
- [ ] GC9A01 屏幕能显示内容
- [ ] 至少 4 个舵机可控
- [ ] 至少 2 种表情动画可播放
- [ ] PID 有调参记录
- [ ] 代码有适当注释

### 优秀标准（可选）| Excellence Standards (Optional)

- [ ] 6 路舵机全部 PID 闭环控制
- [ ] 5 种以上表情动画
- [ ] 手势传感器触发反应
- [ ] 运动学计算功能完整
- [ ] 表情切换过渡动画

**总分 >= 70 分为通过，>= 90 分为优秀**

---

## 常见问题 | Common Issues

### Q1: USB CDC 枚举失败？
**A:** 检查：
1. USB 描述符配置是否正确（VID/PID/端点）
2. USB 中断优先级是否正确
3. USB 时钟配置（48MHz）
4. 驱动安装（Windows 可能需要 .inf 文件）

### Q2: GC9A01 屏幕白屏/花屏？
**A:** 检查：
1. SPI 时钟频率（建议先用低速 1MHz 调试）
2. 初始化序列是否完整
3. 像素格式设置（RGB565 vs RGB888）
4. 接线（MOSI/SCLK/CS/DC/RESET）

### Q3: PID 调参一直振荡？
**A:** 建议：
1. 先只用 P 参数，从小到大
2. D 参数用于抑制振荡
3. I 参数最后加，用于消除稳态误差
4. 确认反馈方向正确（正反馈 vs 负反馈）

### Q4: MPU6050 数据漂移严重？
**A:** 建议：
1. 上电时进行零偏校准（保持静止）
2. 使用互补滤波融合加速度计和陀螺仪
3. 控制循环频率足够高（>= 100Hz）

---

## 下周预告 | Next Week Preview

第三周将进行：
- Day 9: Unity 基础 + ElectronBot SDK 架构
- Day 10: OpenCV 计算机视觉 + OpenPose 姿态估计
- Day 11: LLM API 集成 + 语音交互 + 自定义行为系统
- Day 12: 系统整合 + 项目展示 + 技术复盘

---

*最后更新：2026-05-27*
