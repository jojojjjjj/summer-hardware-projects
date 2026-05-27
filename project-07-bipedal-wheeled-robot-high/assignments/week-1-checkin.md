# 第一周检查点 | Week 1 Check-in

## 概述 | Overview

第一周检查点用于评估学员在前 6 天的学习成果。学员需要展示开发环境搭建完成、MPU6050 数据读取正常、电机驱动可控、基础 PID 调参理解，以及 3D 打印文件准备就绪。

> Week 1 check-in evaluates learning outcomes from the first 6 days. Students must demonstrate a working development environment, successful MPU6050 data reading, motor drive control, basic PID tuning understanding, and 3D print files ready.

---

## 检查时间 | Check-in Time

**Day 6 下午 | Day 6 Afternoon**

---

## 学生/团队信息 | Student / Team Information

| 字段 | 内容 |
|------|------|
| **团队名称 / Team Name** | |
| **成员姓名 / Members** | |
| **项目仓库链接 / Repo URL** | |
| **检查日期 / Check-in Date** | |

---

## 进度检查清单 | Progress Checklist (Day 1-6)

### Day 1: 项目启动与平台认知 | Project Kickoff & Platform Overview

- [ ] 了解 StackForce 轮足机器人项目整体架构
- [ ] 注册 Gitee 账号并 Clone 项目仓库
- [ ] 安装 PlatformIO IDE（VS Code 插件）
- [ ] 确认 ESP32 开发板连接正常
- [ ] 成功编译并上传第一个 Blink 程序

> Understand the StackForce bipedal wheeled robot architecture; register on Gitee and clone the repo; install PlatformIO IDE; confirm ESP32 board connection; compile and upload a Blink sketch.

**验证方法 | Verification:**
```bash
# 在 PlatformIO 中编译并上传
pio run -t upload
# ESP32 板载 LED 应闪烁
```

---

### Day 2: MPU6050 姿态传感器 | MPU6050 IMU Sensor

- [ ] 理解加速度计和陀螺仪的工作原理
- [ ] 完成 MPU6050 I2C 接线（SDA/SCL/VCC/GND）
- [ ] 使用 I2C Scanner 扫描到 MPU6050（地址 0x68）
- [ ] 成功读取原始加速度和角速度数据
- [ ] 实现互补滤波（Complementary Filter）得到稳定姿态角

> Understand accelerometer and gyroscope principles; complete MPU6050 I2C wiring; detect MPU6050 via I2C Scanner; read raw accel/gyro data; implement Complementary Filter for stable attitude angles.

**验证方法 | Verification:**
```bash
# 运行 MPU6050 测试程序
pio run -t upload -e mpu6050_test
# 串口监视器应输出 roll/pitch 角度值
pio device monitor
```

**提交材料 | Submission:**
- MPU6050 串口输出截图（姿态角数值）
- 互补滤波前后对比数据

---

### Day 3: 电机驱动与控制 | Motor Drive & Control

- [ ] 理解 BLDC 电机（无刷直流电机）基本原理
- [ ] 了解 FOC（磁场定向控制）控制概念
- [ ] 完成电机驱动板与 ESP32 的接线
- [ ] 实现电机正转/反转/调速/停止
- [ ] 测量并记录电机在不同 PWM 占空比下的转速

> Understand BLDC motor basics and FOC control concepts; wire motor driver board to ESP32; implement motor forward/reverse/speed control/stop; measure and record motor speed at different PWM duty cycles.

**验证方法 | Verification:**
```bash
# 运行电机测试程序
pio run -t upload -e motor_test
# 电机应按指令正转、反转、变速
```

**提交材料 | Submission:**
- 电机控制演示视频
- PWM 占空比 vs 转速数据表

---

### Day 4: PID 控制原理 | PID Control Theory

- [ ] 理解比例（P）、积分（I）、微分（D）各项的物理含义
- [ ] 手动调参实践：仅使用 P 控制观察系统响应
- [ ] 加入 D 控制减少振荡
- [ ] 了解 I 控制消除稳态误差的作用
- [ ] 记录不同 PID 参数下的系统响应曲线

> Understand the physical meaning of P, I, D terms; practice manual tuning with P-only control; add D to reduce oscillation; understand I for eliminating steady-state error; record system response under different PID parameters.

**验证方法 | Verification:**
```bash
# 运行 PID 单轴平衡测试
pio run -t upload -e pid_test
# 机器人应能在单轴上短暂保持平衡
```

**提交材料 | Submission:**
- PID 调参记录表（Kp, Ki, Kd 值及对应响应）
- 系统响应曲线截图或绘图

---

### Day 5: 单轴平衡实现 | Single-Axis Balancing

- [ ] 融合 MPU6050 数据与电机控制，实现闭环反馈
- [ ] 完成单轴（前后方向）自平衡
- [ ] 机器人能在无外力干扰下稳定站立 10 秒以上
- [ ] 记录平衡时的姿态角波动范围（目标: +/-3度内）

> Integrate MPU6050 data with motor control for closed-loop feedback; achieve single-axis (front-back) self-balancing; robot stands stably for 10+ seconds without external disturbance; record attitude angle fluctuation range (target: within +/-3 degrees).

**验证方法 | Verification:**
```bash
# 运行单轴平衡程序
pio run -t upload -e balance_single
# 观察机器人自平衡状态
# 串口输出 roll/pitch 数据
```

**提交材料 | Submission:**
- 单轴平衡演示视频（10 秒以上稳定站立）
- 姿态角数据日志

---

### Day 6: 3D 打印准备与周总结 | 3D Print Prep & Week Summary

- [ ] 下载 StackForce 提供的 3D 模型文件（STL 格式）
- [ ] 在切片软件（Cura / PrusaSlicer）中预览并切片
- [ ] 调整打印参数（层高、填充率、支撑设置）
- [ ] 提交 3D 打印文件到打印服务（或开始自行打印）
- [ ] 完成第一周进度报告

> Download StackForce 3D model files (STL); preview and slice in slicer software; adjust print parameters; submit files to 3D print service; complete Week 1 progress report.

**提交材料 | Submission:**
- 切片软件截图（打印预览）
- 预计打印时间和材料用量
- 第一周学习总结（500 字）

---

## 技术问题记录 | Technical Questions Encountered

| 序号 | 问题描述 | 尝试的解决方案 | 当前状态 |
|------|---------|---------------|---------|
| 1 | | | 未解决/已解决 |
| 2 | | | 未解决/已解决 |
| 3 | | | 未解决/已解决 |

> Describe technical issues encountered, attempted solutions, and current status.

---

## 代码提交要求 | Code Submission Requirements

- [ ] 所有代码已推送到团队 Git 仓库
- [ ] Commit 信息清晰规范（如 `feat: implement MPU6050 complementary filter`）
- [ ] 至少 6 个有意义的 commit（每天至少 1 个）
- [ ] 仓库包含 README.md 文件

**仓库链接：** _______________________

**Git 提交记录截图（最近 6 次以上）：**

> All code pushed to team repo; clear commit messages; at least 6 meaningful commits; repo contains README.md.

---

## 自我评估 | Self-Assessment

请对以下维度进行 1-5 分评分（1=需要大量帮助, 5=完全独立完成）：

> Rate each dimension 1-5 (1=need significant help, 5=completed independently).

| 维度 | 评分 (1-5) | 备注 |
|------|-----------|------|
| **开发环境搭建** | | |
| Development Environment Setup | | |
| **MPU6050 传感器使用** | | |
| MPU6050 Sensor Usage | | |
| **电机驱动控制** | | |
| Motor Drive Control | | |
| **PID 控制理解** | | |
| PID Control Understanding | | |
| **单轴平衡实现** | | |
| Single-Axis Balancing | | |
| **代码质量与注释** | | |
| Code Quality & Comments | | |
| **Git 使用规范** | | |
| Git Usage Standards | | |
| **团队协作** | | |
| Team Collaboration | | |

---

## 检查流程 | Check-in Process

### 自查阶段 (30 分钟) | Self-check (30 min)

学员自行检查所有功能：
1. 运行各模块测试程序
2. 准备演示材料
3. 填写自查表

### 演示阶段 (15 分钟/人) | Demo (15 min/person)

学员向助教演示：
1. 开发环境与编译（2 分钟）
2. MPU6050 数据读取（3 分钟）
3. 电机驱动控制（3 分钟）
4. 单轴平衡效果（3 分钟）
5. PID 调参心得（2 分钟）
6. 问题交流（2 分钟）

### 评估阶段 (5 分钟) | Evaluation (5 min)

助教评估并给出反馈：
- 功能完整性
- 代码质量
- 理解深度
- 问题解决能力

---

## 评分标准 | Grading Criteria

| 项目 | 分数 | 标准 |
|------|------|------|
| **环境搭建与编译** | 15 分 | PlatformIO 正常工作，能编译上传 |
| **MPU6050 数据读取** | 20 分 | 能读取姿态角，滤波效果好 |
| **电机驱动控制** | 20 分 | 电机正反转正常，调速平滑 |
| **PID 调参** | 20 分 | 理解 PID 原理，有调参记录 |
| **单轴平衡** | 15 分 | 机器人能自平衡 10 秒以上 |
| **代码与文档** | 10 分 | 代码规范，注释清晰 |

---

## 常见问题 | Common Issues

### Q1: PlatformIO 编译报错找不到 ESP32 开发板？
**A:** 检查：
1. PlatformIO 是否正确安装 ESP32 平台（`pio platform install espressif32`）
2. board 配置是否正确
3. USB 驱动是否安装（CP210x / CH340 驱动）

### Q2: MPU6050 I2C 扫描不到设备？
**A:** 检查：
1. 接线是否正确（SDA -> GPIO 21, SCL -> GPIO 22）
2. VCC 是否接 3.3V（不是 5V）
3. MPU6050 模块上的 AD0 引脚状态（决定地址 0x68 或 0x69）

### Q3: 电机不转或抖动？
**A:** 检查：
1. 电机驱动板供电是否充足（需要独立电源，不能仅靠 ESP32 供电）
2. PWM 频率设置是否正确
3. 电机相序接线是否正确

### Q4: PID 调参机器人一直倒？
**A:** 建议：
1. 先只用 P 参数，从小到大逐步增加
2. 确认电机方向是否正确（角度偏正时电机应向正方向补偿）
3. 确认 MPU6050 安装方向与代码中角度计算一致

---

## 通过标准 | Pass Criteria

- [ ] 开发环境能正常编译和上传
- [ ] MPU6050 能读取稳定的姿态角数据
- [ ] 电机能按指令正转/反转/调速
- [ ] 理解 PID 三个参数的作用
- [ ] 单轴平衡能维持 5 秒以上
- [ ] 代码有适当注释和 Git 提交记录

**总分 >= 60 分为通过**

---

## 下周预告 | Next Week Preview

第二周将进行：
- Day 7: 双轴平衡与遥控集成
- Day 8: 完整系统集成与参数优化
- Day 9: 3D 打印零件验收与组装
- Day 10: 整机组装与布线
- Day 11: 功能测试与调优
- Day 12: 最终演示与展示

---

*最后更新：2026-05-27*
