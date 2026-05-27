# 详细评分标准 | Detailed Grading Rubric

## 评分维度 | Grading Dimensions

本项目采用六维度评分体系，总分100分，各维度权重如下：

This project uses a six-dimension grading system with a total of 100 points. The weight of each dimension is as follows:

| 维度 Dimension | 权重 Weight | 说明 Description |
|---------------|-------------|-----------------|
| 技术实现 Technical Implementation | 35% | 固件质量、舵机控制精度、USB通信、显示渲染 |
| 硬件工程 Hardware Engineering | 20% | 焊接质量、PCB组装、机械精度、3D打印外观 |
| 软件集成 Software Integration | 15% | Unity应用功能、CV功能、SDK集成 |
| 文档质量 Documentation | 10% | README、代码注释、硬件制作日志 |
| 演示展示 Demo Presentation | 10% | 实物演示、技术讲解、Q&A |
| 创新拓展 Innovation | 10% | 自定义行为、新表情、创意功能 |

---

## 1. 技术实现 (35%) | Technical Implementation

### 等级评分 | Grade Scoring

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 所有固件模块功能完整且稳定运行；舵机控制精准（PID闭环误差 < 2度），动作流畅自然；USB CDC通信可靠，数据传输无丢包；GC9A01屏幕渲染流畅（帧率 >= 15FPS），表情动画系统完善；代码结构清晰，模块化设计合理，无明显bug |
| B - 良好 Good | 75-89 | 大部分固件模块功能正常；舵机控制基本准确（PID误差 < 5度），偶有抖动；USB通信基本稳定，偶尔有短暂延迟；屏幕显示正常，动画系统工作但偶有卡顿；代码结构较好，有少量不影响体验的小问题 |
| C - 合格 Passing | 60-74 | 核心固件功能可运行但不够稳定；舵机控制精度一般（PID误差 < 10度），有明显抖动；USB通信可用但不稳定；屏幕能显示基本内容，动画系统功能不完整；代码能编译运行，但存在已知问题 |
| D - 待改进 Needs Improvement | < 60 | 固件核心功能未完成或无法正常工作；舵机无法准确控制或PID控制未实现；USB通信无法建立；屏幕驱动未完成或无法正常显示 |

### 细项评分 | Sub-item Scoring

| 细项 Sub-item | 占比(技术实现内) Weight | 说明 Description |
|--------------|------------------------|-----------------|
| 固件质量 Firmware Quality | 25% | STM32 HAL库使用规范，代码模块化程度，FreeRTOS任务管理（如使用） |
| 舵机控制精度 Servo Control Accuracy | 25% | PID闭环控制效果，6自由度运动学计算正确性，动作流畅度 |
| USB通信 USB Communication | 20% | USB CDC设备实现质量，数据传输可靠性和实时性，协议设计合理性 |
| 显示渲染 Display Rendering | 20% | GC9A01 SPI驱动效率，帧缓冲管理，帧动画系统质量，表情渲染效果 |
| 传感器集成 Sensor Integration | 10% | I2C总线通信，APDS-9960手势识别，MPU6050 IMU数据读取 |

---

## 2. 硬件工程 (20%) | Hardware Engineering

### 等级评分 | Grade Scoring

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 焊接质量优秀，所有焊点光滑饱满，无虚焊、无桥连，QFN封装焊接完美；PCB组装整洁规范，元器件方向一致；机械结构组装精密，舵机安装准确，运动无卡滞；3D打印外壳表面光洁，配合紧密，整体美观 |
| B - 良好 Good | 75-89 | 焊接质量良好，大部分焊点合格，有少量但不影响功能的微小瑕疵；PCB组装基本规范；机械结构组装正确，运动基本顺畅；3D打印外壳整体完好，个别配合面有轻微间隙 |
| C - 合格 Passing | 60-74 | 焊接质量一般，有可辨认的虚焊或桥连但已修复；PCB组装基本完成；机械结构能运动但有轻微摩擦或不顺畅；外壳有打印瑕疵但可用 |
| D - 待改进 Needs Improvement | < 60 | 焊接质量差，存在多处虚焊、短路或元器件损坏；PCB组装不完整；机械结构无法正常运动或组装错误 |

### 细项评分 | Sub-item Scoring

| 细项 Sub-item | 占比(硬件工程内) Weight | 说明 Description |
|--------------|------------------------|-----------------|
| 贴片焊接质量 SMD Soldering | 30% | 0603/0402被动元件、QFN封装IC的焊接质量，焊点检查结果 |
| PCB组装规范 PCB Assembly | 20% | 元器件方向、位置正确性，组装整洁度，丝印识别能力 |
| 机械精度 Mechanical Precision | 25% | 舵机安装角度准确，连杆连接顺畅，6自由度运动无卡滞 |
| 3D打印外观 3D Print Finish | 15% | 外壳打印质量，表面处理，配合精度，整体美观度 |
| 结构可靠性 Structural Reliability | 10% | 整机组装牢固度，长时间运行无松动，线缆管理 |

---

## 3. 软件集成 (15%) | Software Integration

### 等级评分 | Grade Scoring

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | Unity桌面应用功能完整、界面美观；USB通信桥接稳定可靠；OpenCV计算机视觉功能正常（人脸检测 + OpenPose姿态估计）；AI对话集成流畅（LLM API调用 + TTS/STT语音交互）；SDK集成规范，代码结构清晰 |
| B - 良好 Good | 75-89 | Unity应用基本功能完整，界面可用；USB通信基本正常；CV功能实现了核心部分（人脸检测或姿态估计之一）；AI对话功能可运行但体验一般；SDK集成基本完成 |
| C - 合格 Passing | 60-74 | Unity应用仅实现基础控制功能；USB通信存在不稳定问题；CV功能仅有基础框架或仅实现了人脸检测；AI对话功能为简单集成；SDK集成了但功能不完整 |
| D - 待改进 Needs Improvement | < 60 | Unity应用未完成或无法运行；USB通信未建立；CV功能未实现；无AI集成 |

### 细项评分 | Sub-item Scoring

| 细项 Sub-item | 占比(软件集成内) Weight | 说明 Description |
|--------------|------------------------|-----------------|
| Unity应用功能 Unity App Functionality | 30% | 界面设计、控制面板功能、表情编辑器（如实现） |
| USB通信桥接 USB Bridge | 20% | Unity与STM32的USB CDC通信可靠性和数据协议 |
| 计算机视觉 CV Features | 25% | OpenCV人脸检测、OpenPose姿态估计、动作模仿功能 |
| AI集成 AI Integration | 15% | LLM API调用、对话系统、语音识别/合成 |
| SDK集成 SDK Integration | 10% | ElectronBot SDK架构理解，API使用规范性 |

---

## 4. 文档质量 (10%) | Documentation

### 等级评分 | Grade Scoring

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | README完整详尽，包含项目架构图、编译烧录指南、功能说明；代码注释充分，关键函数和算法有详细说明；硬件制作日志完整（焊接过程照片、调试记录、问题排查）；Git提交记录规范，commit message清晰有意义 |
| B - 良好 Good | 75-89 | README完整，涵盖主要信息；关键代码有注释；有基本的硬件制作记录；Git提交记录较规范 |
| C - 合格 Passing | 60-74 | README存在但内容不完整；代码注释较少；硬件记录简略；Git提交记录不够规范 |
| D - 待改进 Needs Improvement | < 60 | 几乎没有文档；代码无注释；无硬件记录；Git记录混乱或缺失 |

### 细项评分 | Sub-item Scoring

| 细项 Sub-item | 占比(文档内) Weight | 说明 Description |
|--------------|---------------------|-----------------|
| README完整性 README Completeness | 30% | 项目介绍、技术架构、编译烧录说明、功能截图是否完整 |
| 代码注释 Code Comments | 25% | 关键函数（PID控制、USB通信、动画系统）是否有清晰注释 |
| 硬件制作日志 Hardware Build Log | 25% | 焊接过程照片、调试记录、舵机标定记录、问题排查过程 |
| Git提交规范 Git Commit Standards | 20% | commit message规范性，提交频率，分支管理 |

---

## 5. 演示展示 (10%) | Demo Presentation

### 等级评分 | Grade Scoring

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 实物演示流畅精彩，所有功能正常展示（舵机运动、表情动画、视觉识别、AI对话）；技术讲解深入清晰，能准确解释STM32 HAL库、USB协议栈、PID控制、运动学等核心概念；Q&A对答如流，体现对项目的深入理解 |
| B - 良好 Good | 75-89 | 实物演示基本顺畅，大部分功能可正常展示；技术讲解清晰，能解释主要技术点；能回答大部分问题 |
| C - 合格 Passing | 60-74 | 演示有卡顿或部分功能异常；技术讲解不够深入；对部分技术问题回答不够准确 |
| D - 待改进 Needs Improvement | < 60 | 无法完成实物演示或机器人完全不能工作；技术讲解不清；无法回答基本技术问题 |

### 细项评分 | Sub-item Scoring

| 细项 Sub-item | 占比(演示内) Weight | 说明 Description |
|--------------|---------------------|-----------------|
| 实物演示 Live Demo | 35% | ElectronBot实物运行效果，功能展示完整性 |
| 技术讲解 Technical Explanation | 30% | 对STM32、USB、PID、运动学、CV等技术的理解深度 |
| Q&A应答 Q&A Response | 20% | 回答技术提问的准确性和深度 |
| 演示组织 Presentation Organization | 15% | 演示流程安排、时间控制、表达清晰度 |

---

## 6. 创新拓展 (10%) | Innovation

### 等级评分 | Grade Scoring

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 实现了2个以上创新功能且质量高，如：自定义行为系统、全新设计的表情集、额外的CV功能、创意交互方式等；创新功能与项目整体融合自然 |
| B - 良好 Good | 75-89 | 实现了1个创新功能且完成度较高；或对现有功能进行了有意义的个性化定制 |
| C - 合格 Passing | 60-74 | 有个性化定制内容（如自定义表情、修改外壳颜色等），但创新深度有限 |
| D - 待改进 Needs Improvement | < 60 | 没有任何个性化内容或创新拓展 |

### 加分项参考 | Bonus Item Reference

| 创新功能 Innovation | 加分 Bonus | 说明 Description |
|--------------------|-----------|-----------------|
| 自定义行为树 Custom Behavior Tree | +2~3 | 设计全新的行为决策系统，机器人能根据环境自动切换状态 |
| 扩展表情集 Extended Expression Set | +1~2 | 设计5个以上新表情，包含过渡动画 |
| 语音唤醒交互 Voice Wake Interaction | +1~2 | 实现语音唤醒词检测和本地语音命令识别 |
| 多机协同 Multi-Robot Coordination | +2~3 | 两台以上ElectronBot协同动作或交互 |
| 自定义Unity插件 Custom Unity Plugin | +1~2 | 开发额外的Unity控制面板或可视化编辑器 |
| 舞蹈编排系统 Dance Choreography System | +1~2 | 设计可编程的动作序列编排和回放系统 |
| 外壳创意设计 Creative Shell Design | +1 | 自行设计或大幅修改3D打印外壳 |

> 注：加分由教师酌情评定，需要在最终展示时演示。创新拓展部分总分不超过100分。
> Note: Bonus points are at the instructor's discretion and require demonstration during the final presentation. Total score is capped at 100.

---

## 总分计算 | Total Score Calculation

```
总分 Total Score = 技术实现 Technical Implementation      x 0.35
                + 硬件工程 Hardware Engineering            x 0.20
                + 软件集成 Software Integration            x 0.15
                + 文档质量 Documentation                   x 0.10
                + 演示展示 Demo Presentation               x 0.10
                + 创新拓展 Innovation                      x 0.10
```

---

## 等级对应 | Grade Mapping

| 总分 Total Score | 等级 Grade | 说明 Description |
|----------------|-----------|-----------------|
| 90-100 | A (优秀 Excellent) | 全面超出预期，固件和软件质量出色，硬件工程精细，创新突出 |
| 85-89 | A- (优秀- Excellent-) | 多数维度表现优秀，个别维度良好 |
| 80-84 | B+ (良好+ Good Plus) | 多数维度表现良好，部分维度优秀 |
| 75-79 | B (良好 Good) | 整体良好，核心功能完整，软硬件均可用 |
| 70-74 | B- (良好- Good Minus) | 基本良好，个别维度有待提升 |
| 65-69 | C+ (合格+ Passing Plus) | 达到基本要求，部分功能有改进空间 |
| 60-64 | C (合格 Passing) | 达到最低要求，多个维度有明显不足 |
| < 60 | D (待改进 Needs Improvement) | 未达到课程基本要求 |

---

## 特别说明 | Special Notes

> **独立完成项目的学员**：如无搭档独立完成，"创新拓展"维度额外考量自主学习能力：（1）独立查阅STM32 Reference Manual和Datasheet的能力；（2）面对复杂硬件问题时坚持调试的能力；（3）跨学科知识整合（嵌入式+Unity+CV+AI）的能力。
>
> **For students working independently**: If completing the project without a partner, the "Innovation" dimension additionally evaluates self-directed learning: (1) ability to independently read STM32 Reference Manuals and Datasheets; (2) persistence in debugging complex hardware issues; (3) cross-disciplinary integration skills (embedded + Unity + CV + AI).

*最后更新：2026-05-27*
