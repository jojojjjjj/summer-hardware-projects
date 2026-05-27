# 作业说明 | Assignments Overview

## 作业总览 | Assignment Summary

本项目共设 12 项正式作业，分属三个阶段，贯穿 12 天课程全程。另有每日课后任务作为补充。

This project includes 12 formal assignments across three phases, spanning the full 12-day course. Daily after-class tasks serve as supplementary exercises.

| 阶段 Phase | 编号 | 作业 Assignment | 截止日期 Deadline | 对应评分维度 |
|------------|------|----------------|------------------|-------------|
| Phase 1 | HW1 | STM32开发环境搭建验证 STM32 Dev Setup Verification | Day 1 | 技术实现 |
| Phase 1 | HW2 | 原理图阅读练习 Schematic Reading Exercise | Day 2 | 文档质量 |
| Phase 1 | HW3 | 焊接质量考核 Soldering Quality Assessment | Day 3 | 硬件工程 |
| Phase 1 | HW4 | 硬件集成测试 Hardware Integration Test | Day 4 | 硬件工程 |
| Phase 2 | HW5 | USB CDC通信测试 USB CDC Communication Test | Day 5 | 技术实现 |
| Phase 2 | HW6 | 舵机标定报告 Servo Calibration Report | Day 6 | 技术实现 |
| Phase 2 | HW7 | 表情动画设计 Expression Animation Design | Day 7 | 技术实现 / 创新拓展 |
| Phase 2 | HW8 | 传感器融合迷你项目 Sensor Fusion Mini-Project | Day 8 | 技术实现 |
| Phase 3 | HW9 | Unity应用原型 Unity App Prototype | Day 9 | 软件集成 |
| Phase 3 | HW10 | CV功能实现 CV Feature Implementation | Day 10 | 软件集成 |
| Phase 3 | HW11 | AI功能集成演示 AI Integration Demo | Day 11 | 软件集成 |
| Phase 3 | HW12 | 最终展示准备 Final Presentation Preparation | Day 12 | 演示展示 |

---

## Phase 1：STM32环境搭建与硬件组装（Day 1-4）

### HW1：STM32开发环境搭建验证 | STM32 Dev Setup Verification

- **目标 Objective**：验证STM32CubeIDE开发环境搭建成功，能够创建工程、编译、烧录并运行基础GPIO程序
- **交付物 Deliverables**：
  1. STM32CubeIDE中成功编译的截图（含编译输出信息）
  2. 通过ST-Link烧录成功的截图
  3. 运行Blink程序的开发板照片/视频（LED以1Hz频率闪烁）
  4. 简要文字说明（100-200字）：ARM Cortex-M4与之前用过的MCU（如ESP32）的主要区别
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | 编译成功 Successful Build | 30分 | 截图显示0 errors, 0 warnings |
  | 烧录成功 Successful Flash | 25分 | ST-Link烧录日志显示成功 |
  | 程序运行 Program Running | 30分 | LED闪烁视频/照片 |
  | 文字说明 Written Summary | 15分 | 对比ARM和ESP32架构差异的理解 |
- **截止日期 Due**：Day 1 课程结束时

---

### HW2：原理图阅读练习 | Schematic Reading Exercise

- **目标 Objective**：能够阅读和理解ElectronBot主板的电路原理图，识别关键元器件及其连接关系
- **交付物 Deliverables**：
  1. 填写完成的原理图分析工作表（包含以下内容）：
     - 标注STM32F4芯片的电源引脚连接（VDD、VSS去耦电容）
     - 标注GC9A01屏幕的SPI接口连接（MOSI、SCK、CS、DC、RST）
     - 标注USB接口的D+、D-连接和上拉电阻配置
     - 标注I2C总线上拉电阻和舵机控制器连接
     - 标注MPU6050和APDS-9960的I2C地址和引脚分配
  2. 绘制系统框图（手绘或电子版），展示STM32与各外设模块的连接关系
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | 电源电路识别 Power Circuit | 20分 | 正确标注电源和去耦电容 |
  | SPI接口标注 SPI Interface | 20分 | 正确识别GC9A01的SPI连接 |
  | USB接口标注 USB Interface | 20分 | 正确识别USB D+/D-和上拉配置 |
  | I2C总线标注 I2C Bus | 20分 | 正确识别I2C设备和地址 |
  | 系统框图 System Block Diagram | 20分 | 清晰展示整体架构 |
- **截止日期 Due**：Day 2 课程结束时

---

### HW3：焊接质量考核 | Soldering Quality Assessment

- **目标 Objective**：完成PCB焊接（含贴片IC和QFN封装），达到功能可用的焊接质量
- **交付物 Deliverables**：
  1. 焊接完成的PCB实物（主板 + 舵机驱动板）
  2. 放大镜/显微镜下的焊点照片（至少包含：一个0603电阻焊点、一个QFN芯片焊点、一个排针焊点）
  3. 焊接质量自检表（填写焊点数量、发现的问题、修复措施）
  4. 万用表连通性测试记录（关键网络连通性检查结果）
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | 贴片元件焊接 SMD Soldering | 25分 | 0603/0402元件焊点光滑、无虚焊、无桥连 |
  | QFN封装焊接 QFN Soldering | 25分 | QFN芯片底部焊盘焊接良好，散热焊盘正确 |
  | 排针/连接器焊接 Header Soldering | 15分 | 排针焊点饱满、无歪斜 |
  | 焊点照片 Solder Joint Photos | 15分 | 提供清晰的放大照片 |
  | 连通性测试 Continuity Test | 20分 | 所有关键网络连通性正确 |
- **截止日期 Due**：Day 3 课程结束时

---

### HW4：硬件集成测试 | Hardware Integration Test

- **目标 Objective**：完成整机组装，通过首次上电测试，验证舵机标定和基础动作
- **交付物 Deliverables**：
  1. 组装完成的ElectronBot实物（外壳 + 舵机 + PCB + 屏幕）
  2. 舵机标定数据表（各舵机中位PWM值、运动范围、零点偏移）
  3. 上电测试报告（电压测试点读数、各模块上电状态、发现的问题）
  4. 基础动作验证视频（至少演示：头部左右转动、手臂上下摆动）
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | 机械组装完整性 Assembly Completeness | 25分 | 所有结构件安装到位，螺丝紧固 |
  | 舵机标定 Servo Calibration | 25分 | 标定数据完整准确，中位和范围记录清晰 |
  | 上电测试 Power-On Test | 25分 | 各电压测试点正常，无短路或异常 |
  | 基础动作验证 Basic Motion Test | 25分 | 能完成至少两个基础动作 |
- **截止日期 Due**：Day 4 课程结束时

---

## Phase 2：固件开发与外设驱动（Day 5-8）

### HW5：USB CDC通信测试 | USB CDC Communication Test

- **目标 Objective**：实现STM32的USB CDC设备功能，能够通过USB虚拟串口与PC双向通信
- **交付物 Deliverables**：
  1. USB CDC固件代码（Keil/CubeIDE工程）
  2. 通信测试截图：PC端串口终端发送数据，STM32回显/响应
  3. 通信测试记录表（测试数据包大小、传输速率、丢包率）
  4. 简要协议设计文档：自定义的USB通信数据帧格式
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | USB设备枚举 USB Enumeration | 25分 | PC正确识别USB CDC设备，COM口号正常 |
  | 数据收发 Data TX/RX | 30分 | 能可靠发送和接收数据，回显正确 |
  | 通信速率 Communication Speed | 20分 | 测量实际传输速率并记录 |
  | 协议设计 Protocol Design | 25分 | 数据帧格式设计合理，有校验机制 |
- **截止日期 Due**：Day 5 课程结束时

---

### HW6：舵机标定报告 | Servo Calibration Report

- **目标 Objective**：实现6自由度舵机的PID闭环控制，完成精确标定，能执行预定义动作序列
- **交付物 Deliverables**：
  1. PID控制代码（含6路舵机的独立PID控制器）
  2. 舵机标定报告（包含）：
     - 各舵机PID参数（Kp、Ki、Kd）和调整过程记录
     - 阶跃响应曲线截图（目标角度vs实际角度）
     - 稳态误差测量数据
     - 运动学正解验证数据（末端执行器位置计算 vs 实际位置）
  3. 预定义动作演示视频（至少包含：挥手、点头、摇头三个动作）
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | PID控制实现 PID Implementation | 25分 | 6路舵机均有独立PID控制 |
  | 参数调优记录 Tuning Records | 20分 | PID参数调整过程有详细记录 |
  | 控制精度 Control Accuracy | 25分 | 稳态误差 < 3度，响应时间 < 200ms |
  | 运动学验证 Kinematics Verification | 15分 | 正运动学计算与实际位置对比 |
  | 动作演示 Motion Demo | 15分 | 三个预定义动作流畅自然 |
- **截止日期 Due**：Day 6 课程结束时

---

### HW7：表情动画设计 | Expression Animation Design

- **目标 Objective**：设计并实现表情状态机和帧动画播放系统，在GC9A01圆形屏幕上渲染流畅的表情动画
- **交付物 Deliverables**：
  1. 表情状态机代码（有限状态机实现）
  2. 帧动画播放引擎代码（帧缓冲管理、定时器驱动播放）
  3. 至少设计5种表情（必须包含：开心、悲伤、惊讶、生气、中性），每种表情至少8帧
  4. 表情过渡效果演示视频（展示状态切换时的平滑过渡）
  5. 设计文档：表情状态转换图 + 帧动画资源清单
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | 状态机设计 State Machine Design | 20分 | 状态定义合理，转换逻辑清晰 |
  | 动画引擎 Animation Engine | 25分 | 帧缓冲管理高效，播放流畅（>= 12FPS） |
  | 表情设计 Expression Design | 25分 | 5种以上表情，每种至少8帧，视觉表现力好 |
  | 过渡效果 Transition Effects | 15分 | 表情切换平滑自然 |
  | 设计文档 Design Documentation | 15分 | 状态转换图和资源清单完整 |
- **截止日期 Due**：Day 7 课程结束时

---

### HW8：传感器融合迷你项目 | Sensor Fusion Mini-Project

- **目标 Objective**：集成APDS-9960手势传感器和MPU6050 IMU，实现传感器数据融合和交互响应
- **交付物 Deliverables**：
  1. 传感器驱动代码（I2C通信、数据解析）
  2. 传感器融合应用代码，实现以下功能之一（或更多）：
     - 手势控制：挥手触发机器人挥手回应
     - 姿态响应：机器人倾斜时自动调整平衡
     - 触发交互：手势控制表情切换（如向左挥 = 开心，向右挥 = 悲伤）
  3. 传感器数据记录（至少包含：手势检测准确率、IMU姿态角输出样本数据）
  4. 功能演示视频
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | 传感器驱动 Sensor Drivers | 25分 | I2C通信正确，数据读取稳定 |
  | 数据融合 Data Fusion | 25分 | 多传感器数据合理融合，响应逻辑正确 |
  | 交互功能 Interactive Feature | 25分 | 至少实现一种传感器驱动的交互功能 |
  | 数据记录 Data Logging | 15分 | 传感器数据记录完整且有分析 |
  | 代码质量 Code Quality | 10分 | 代码结构清晰，注释充分 |
- **截止日期 Due**：Day 8 课程结束时

---

## Phase 3：Unity桌面软件与系统集成（Day 9-12）

### HW9：Unity应用原型 | Unity App Prototype

- **目标 Objective**：开发Unity桌面应用原型，通过USB CDC与ElectronBot通信，实现基本的远程控制功能
- **交付物 Deliverables**：
  1. Unity项目工程文件
  2. 可运行的Unity应用（.exe），包含：
     - USB CDC串口连接界面（端口选择、连接/断开按钮）
     - 舵机控制滑块面板（6个舵机独立控制）
     - 表情选择面板（选择发送不同表情到机器人）
     - 实时状态显示区（通信状态、舵机角度反馈）
  3. USB通信协议文档（PC端发送命令格式、机器人返回数据格式）
  4. 应用运行截图和功能演示视频
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | USB通信 USB Communication | 30分 | 能正确连接/disconnect，数据收发可靠 |
  | 舵机控制面板 Servo Control Panel | 25分 | 6个滑块能独立控制对应舵机 |
  | 表情控制面板 Expression Control | 20分 | 能选择和发送表情命令 |
  | 界面设计 UI Design | 15分 | 界面布局合理，操作直观 |
  | 协议文档 Protocol Document | 10分 | 通信协议文档清晰完整 |
- **截止日期 Due**：Day 9 课程结束时

---

### HW10：CV功能实现 | CV Feature Implementation

- **目标 Objective**：使用OpenCV实现计算机视觉功能，包括人脸检测和OpenPose姿态估计，让机器人模仿人类动作
- **交付物 Deliverables**：
  1. CV功能代码（C# / Python，集成到Unity或独立运行）
  2. 功能实现（至少包含以下两项）：
     - 人脸检测：检测人脸位置，机器人头部跟随人脸移动
     - 姿态估计：通过OpenPose检测人体关键点，映射到舵机角度实现动作模仿
     - 表情识别：根据人脸表情触发机器人对应表情
  3. CV效果截图（标注检测框/关键点的摄像头画面截图）
  4. 性能测试报告（检测帧率、延迟、准确率）
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | 人脸检测 Face Detection | 30分 | 检测准确，能实时跟踪 |
  | 姿态估计 Pose Estimation | 30分 | OpenPose集成正确，关键点映射合理 |
  | 动作模仿 Motion Imitation | 20分 | 机器人能跟随人体动作 |
  | 性能优化 Performance | 10分 | 帧率 >= 10FPS，延迟可接受 |
  | 测试报告 Test Report | 10分 | 性能数据完整有分析 |
- **截止日期 Due**：Day 10 课程结束时

---

### HW11：AI功能集成演示 | AI Integration Demo

- **目标 Objective**：集成LLM API实现AI对话功能，结合语音识别/合成实现语音交互
- **交付物 Deliverables**：
  1. AI集成代码（LLM API调用、对话系统）
  2. 语音交互功能（STT语音识别 + TTS语音合成，至少实现其一）
  3. 对话系统设计文档（对话流程、Prompt设计、角色设定）
  4. AI交互演示视频（展示语音/文字对话过程，机器人做出相应表情和动作回应）
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | LLM API集成 LLM API Integration | 30分 | API调用正确，对话逻辑合理 |
  | 语音交互 Voice Interaction | 25分 | STT/TTS至少实现一项且运行正常 |
  | 多模态响应 Multi-modal Response | 20分 | 机器人能根据对话内容做出表情+动作回应 |
  | 对话系统设计 Dialogue System Design | 15分 | Prompt设计有创意，角色设定完整 |
  | 演示质量 Demo Quality | 10分 | 演示视频完整，展示效果好 |
- **截止日期 Due**：Day 11 课程结束时

---

### HW12：最终展示准备 | Final Presentation Preparation

- **目标 Objective**：完成系统最终整合，准备项目展示材料，进行演示排练
- **交付物 Deliverables**：
  1. 完整项目README.md（项目介绍、技术架构、编译烧录指南、功能说明、团队分工）
  2. 项目展示PPT/Keynote（8-10页）
  3. 展示排练记录（至少一次完整排练的笔记）
  4. 最终Demo功能检查清单（所有功能模块的状态：通过/未通过/部分通过）
- **评价标准 Evaluation Criteria**：
  | 项目 Item | 分值 Score | 说明 Description |
  |----------|-----------|-----------------|
  | 系统整合 System Integration | 30分 | 所有功能模块联调成功，端到端运行流畅 |
  | README质量 README Quality | 25分 | 文档完整、清晰、专业 |
  | 展示材料 Presentation Materials | 25分 | PPT设计专业，内容组织清晰 |
  | 功能检查清单 Function Checklist | 20分 | 各模块状态如实记录 |
- **截止日期 Due**：Day 12 上午（展示前）

---

## 每日课后任务 | Daily After-Class Tasks

除上述正式作业外，每天课程结束后会布置以下补充任务：

In addition to the formal assignments above, the following supplementary tasks are assigned after each day's class:

### Day 1 课后 | After Day 1
- **任务 Task**：阅读STM32F4 Reference Manual第1-2章（简介和架构），记录3个最感兴趣的芯片特性
- **预计时间 Estimated Time**：30-45分钟

### Day 2 课后 | After Day 2
- **任务 Task**：阅读ElectronBot主板BOM（物料清单），在原理图上标注所有IC的型号和功能
- **预计时间 Estimated Time**：30-45分钟

### Day 3 课后 | After Day 3
- **任务 Task**：观看QFN焊接教学视频（推荐EEVblog），记录3个焊接技巧要点
- **预计时间 Estimated Time**：30分钟

### Day 4 课后 | After Day 4
- **任务 Task**：编写舵机测试程序，实现一个简单的正弦波运动轨迹
- **预计时间 Estimated Time**：45-60分钟

### Day 5 课后 | After Day 5
- **任务 Task**：优化USB CDC通信协议，增加CRC校验和错误重传机制
- **预计时间 Estimated Time**：45-60分钟

### Day 6 课后 | After Day 6
- **任务 Task**：研究逆运动学（Inverse Kinematics），思考如何通过目标坐标反算舵机角度
- **预计时间 Estimated Time**：45-60分钟

### Day 7 课后 | After Day 7
- **任务 Task**：设计1-2个自定义表情并制作帧动画资源
- **预计时间 Estimated Time**：45-60分钟

### Day 8 课后 | After Day 8
- **任务 Task**：安装Unity Hub和Unity编辑器（2021.3 LTS或更新版本）
- **预计时间 Estimated Time**：30-45分钟

### Day 9 课后 | After Day 9
- **任务 Task**：为Unity应用添加一个额外的控制功能（如动作序列录制/回放）
- **预计时间 Estimated Time**：60分钟

### Day 10 课后 | After Day 10
- **任务 Task**：优化CV功能的响应速度，尝试降低延迟
- **预计时间 Estimated Time**：45-60分钟

### Day 11 课后 | After Day 11
- **任务 Task**：进行一次完整的展示排练（计时，确保在8分钟内）
- **预计时间 Estimated Time**：45-60分钟

---

## 提交方式 | Submission Method

- **代码部分 Code**：提交到Git仓库，确保commit message规范（参考格式：`feat: add USB CDC communication`）
- **硬件部分 Hardware**：焊接质量由老师和助教在课前检查
- **文档部分 Documentation**：提交到assignments/目录下对应的文件
- **视频/截图 Videos/Screenshots**：上传到课程共享文件夹或嵌入README

---

## 学术诚信 | Academic Integrity

- **鼓励 Encouraged**：参考STM32 HAL库官方示例、ElectronBot开源项目、同学间讨论技术问题
- **允许 Allowed**：使用AI辅助工具帮助理解概念和调试代码，但需在报告中注明
- **允许 Allowed**：参考开源项目的驱动代码（如GC9A01驱动、OpenCV示例），但必须理解并添加自己的注释
- **要求 Required**：提交的代码必须是自己理解和修改过的，不能直接复制整个项目
- **禁止 Prohibited**：让他人代写代码或代焊PCB

*最后更新：2026-05-27*
