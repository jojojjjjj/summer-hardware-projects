# 详细评分标准与评分表 | Detailed Rubric & Score Sheet

## 评分维度 | Grading Dimensions

本项目采用六维度评分体系，总分100分。

This project uses a six-dimension grading system with a total of 100 points.

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

### 等级评分标准 | Grade-Level Criteria

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 所有固件模块功能完整且稳定运行；舵机控制精准（PID闭环误差 < 2度），动作流畅自然；USB CDC通信可靠，数据传输无丢包；GC9A01屏幕渲染流畅（帧率 >= 15FPS），表情动画系统完善；代码结构清晰，模块化设计合理，无明显bug |
| B - 良好 Good | 75-89 | 大部分固件模块功能正常；舵机控制基本准确（PID误差 < 5度），偶有抖动；USB通信基本稳定，偶尔有短暂延迟；屏幕显示正常，动画系统工作但偶有卡顿；代码结构较好，有少量不影响体验的小问题 |
| C - 合格 Passing | 60-74 | 核心固件功能可运行但不够稳定；舵机控制精度一般（PID误差 < 10度），有明显抖动；USB通信可用但不稳定；屏幕能显示基本内容，动画系统功能不完整；代码能编译运行，但存在已知问题 |
| D - 待改进 Needs Improvement | < 60 | 固件核心功能未完成或无法正常工作；舵机无法准确控制或PID控制未实现；USB通信无法建立；屏幕驱动未完成或无法正常显示 |

### 细项评分标准 | Sub-item Scoring Criteria

| 细项 Sub-item | 占比 Weight | 优秀(A) Excellent | 良好(B) Good | 合格(C) Passing | 待改进(D) Needs Improvement |
|--------------|------------|-------------------|-------------|----------------|---------------------------|
| 固件质量 Firmware Quality | 25% | HAL库使用规范，模块化设计优秀，FreeRTOS任务管理合理（如使用） | HAL库使用正确，代码结构清晰 | HAL库基本使用正确，代码可运行 | HAL库使用有误，代码结构混乱 |
| 舵机控制精度 Servo Control | 25% | PID误差 < 2度，运动学计算准确，动作流畅 | PID误差 < 5度，偶有抖动 | PID误差 < 10度，有明显抖动 | PID未实现或误差 > 10度 |
| USB通信 USB Comm | 20% | USB CDC枚举正常，数据传输可靠无丢包，协议设计合理 | USB CDC可用，偶有延迟 | USB CDC可建立但不够稳定 | USB CDC无法工作 |
| 显示渲染 Display Rendering | 20% | 帧率 >= 15FPS，帧缓冲管理高效，表情渲染流畅 | 帧率 >= 10FPS，显示基本流畅 | 能显示内容但卡顿明显 | 屏幕驱动未完成 |
| 传感器集成 Sensor Integration | 10% | I2C稳定，手势和IMU数据准确 | I2C基本稳定，传感器数据可用 | 传感器部分工作 | 传感器无法工作 |

### 交付物评分对照 | Deliverable-to-Score Mapping

| 交付物 Deliverable | 关联作业 | 评分占比(技术实现内) | 评分要点 Scoring Focus |
|-------------------|---------|--------------------|-----------------------|
| USB CDC固件代码 | HW5 | 20% | 枚举成功、数据收发可靠、协议设计合理 |
| PID控制代码 | HW6 | 25% | 6路PID实现、参数调优记录、控制精度 |
| 表情动画系统代码 | HW7 | 20% | 状态机设计、帧动画引擎、渲染效率 |
| 传感器融合代码 | HW8 | 10% | 驱动稳定性、数据融合逻辑、交互功能 |
| 固件整体质量 | 综合 | 25% | 代码结构、模块化程度、注释质量 |

---

## 2. 硬件工程 (20%) | Hardware Engineering

### 等级评分标准 | Grade-Level Criteria

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 焊接质量优秀，所有焊点光滑饱满，无虚焊、无桥连，QFN封装焊接完美；PCB组装整洁规范，元器件方向一致；机械结构组装精密，舵机安装准确，运动无卡滞；3D打印外壳表面光洁，配合紧密，整体美观 |
| B - 良好 Good | 75-89 | 焊接质量良好，大部分焊点合格，有少量但不影响功能的微小瑕疵；PCB组装基本规范；机械结构组装正确，运动基本顺畅；3D打印外壳整体完好，个别配合面有轻微间隙 |
| C - 合格 Passing | 60-74 | 焊接质量一般，有可辨认的虚焊或桥连但已修复；PCB组装基本完成；机械结构能运动但有轻微摩擦或不顺畅；外壳有打印瑕疵但可用 |
| D - 待改进 Needs Improvement | < 60 | 焊接质量差，存在多处虚焊、短路或元器件损坏；PCB组装不完整；机械结构无法正常运动或组装错误 |

### 交付物评分对照 | Deliverable-to-Score Mapping

| 交付物 Deliverable | 关联作业 | 评分占比(硬件工程内) | 评分要点 Scoring Focus |
|-------------------|---------|--------------------|-----------------------|
| PCB焊点照片 + 自检表 | HW3 | 30% | 贴片焊接质量、QFN焊接质量、排针焊接 |
| PCB实物 + 连通性测试 | HW3 | 20% | 组装规范、连通性正确性 |
| 整机组装实物 | HW4 | 25% | 机械精度、舵机安装、运动顺畅度 |
| 3D打印外壳 | HW4 | 15% | 表面质量、配合精度、美观度 |
| 结构可靠性(长期观察) | 综合 | 10% | 整机牢固度、线缆管理 |

---

## 3. 软件集成 (15%) | Software Integration

### 等级评分标准 | Grade-Level Criteria

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | Unity桌面应用功能完整、界面美观；USB通信桥接稳定可靠；OpenCV计算机视觉功能正常（人脸检测 + OpenPose姿态估计）；AI对话集成流畅（LLM API调用 + TTS/STT语音交互）；SDK集成规范，代码结构清晰 |
| B - 良好 Good | 75-89 | Unity应用基本功能完整，界面可用；USB通信基本正常；CV功能实现了核心部分（人脸检测或姿态估计之一）；AI对话功能可运行但体验一般；SDK集成基本完成 |
| C - 合格 Passing | 60-74 | Unity应用仅实现基础控制功能；USB通信存在不稳定问题；CV功能仅有基础框架或仅实现了人脸检测；AI对话功能为简单集成；SDK集成了但功能不完整 |
| D - 待改进 Needs Improvement | < 60 | Unity应用未完成或无法运行；USB通信未建立；CV功能未实现；无AI集成 |

### 交付物评分对照 | Deliverable-to-Score Mapping

| 交付物 Deliverable | 关联作业 | 评分占比(软件集成内) | 评分要点 Scoring Focus |
|-------------------|---------|--------------------|-----------------------|
| Unity项目工程 | HW9 | 30% | USB连接功能、舵机控制面板、表情控制、界面设计 |
| CV功能代码 | HW10 | 25% | 人脸检测、姿态估计、动作模仿效果 |
| AI集成代码 | HW11 | 15% | LLM API调用、对话逻辑、语音交互 |
| USB通信协议文档 | HW9 | 15% | 协议设计合理性、文档清晰度 |
| SDK集成质量 | 综合 | 15% | ElectronBot SDK架构理解、API使用规范 |

---

## 4. 文档质量 (10%) | Documentation

### 等级评分标准 | Grade-Level Criteria

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | README完整详尽（项目架构图、编译烧录指南、功能说明齐全）；代码注释充分，关键函数和算法有详细说明；硬件制作日志完整（焊接过程照片、调试记录、问题排查）；Git提交记录规范 |
| B - 良好 Good | 75-89 | README完整；关键代码有注释；有基本的硬件制作记录；Git提交记录较规范 |
| C - 合格 Passing | 60-74 | README存在但内容不完整；代码注释较少；硬件记录简略；Git提交不够规范 |
| D - 待改进 Needs Improvement | < 60 | 几乎没有文档；代码无注释；无硬件记录；Git记录混乱 |

### 交付物评分对照 | Deliverable-to-Score Mapping

| 交付物 Deliverable | 关联作业 | 评分占比(文档内) | 评分要点 Scoring Focus |
|-------------------|---------|-----------------|-----------------------|
| 最终README.md | HW12 | 30% | 完整性、架构图、使用说明、截图 |
| 代码注释（全项目） | 综合 | 25% | 关键函数注释、算法说明 |
| 硬件制作日志 | HW3, HW4 | 25% | 焊接过程、调试记录、问题排查 |
| Git提交记录 | 全过程 | 20% | commit message规范、提交频率 |

---

## 5. 演示展示 (10%) | Demo Presentation

### 等级评分标准 | Grade-Level Criteria

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 实物演示流畅精彩，所有功能正常展示；技术讲解深入清晰，能准确解释核心概念；Q&A对答如流，体现对项目的深入理解 |
| B - 良好 Good | 75-89 | 实物演示基本顺畅，大部分功能可正常展示；技术讲解清晰；能回答大部分问题 |
| C - 合格 Passing | 60-74 | 演示有卡顿或部分功能异常；技术讲解不够深入；对部分技术问题回答不够准确 |
| D - 待改进 Needs Improvement | < 60 | 无法完成实物演示；技术讲解不清；无法回答基本技术问题 |

### 交付物评分对照 | Deliverable-to-Score Mapping

| 交付物 Deliverable | 关联作业 | 评分占比(演示内) | 评分要点 Scoring Focus |
|-------------------|---------|-----------------|-----------------------|
| 实物演示 (5-8分钟) | HW12 | 35% | 功能展示完整性、运行流畅度 |
| 技术讲解 | HW12 | 30% | STM32/USB/PID/CV/AI等技术理解深度 |
| Q&A应答 (3分钟) | HW12 | 20% | 回答准确性、理解深度 |
| 展示PPT/组织 | HW12 | 15% | PPT设计、时间控制、表达清晰度 |

---

## 6. 创新拓展 (10%) | Innovation

### 等级评分标准 | Grade-Level Criteria

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 2个以上创新功能且质量高；创新功能与项目整体融合自然 |
| B - 良好 Good | 75-89 | 1个创新功能且完成度较高；或有意义的个性化定制 |
| C - 合格 Passing | 60-74 | 有个性化定制内容，但创新深度有限 |
| D - 待改进 Needs Improvement | < 60 | 没有任何个性化内容或创新拓展 |

### 加分项参考 | Bonus Reference

| 创新功能 Innovation | 加分 Bonus | 说明 Description |
|--------------------|-----------|-----------------|
| 自定义行为树 Custom Behavior Tree | +2~3 | 全新行为决策系统，机器人根据环境自动切换状态 |
| 扩展表情集 Extended Expression Set | +1~2 | 5个以上新表情含过渡动画 |
| 语音唤醒交互 Voice Wake Interaction | +1~2 | 语音唤醒词检测和本地命令识别 |
| 多机协同 Multi-Robot Coordination | +2~3 | 两台以上ElectronBot协同动作 |
| 自定义Unity插件 Custom Unity Plugin | +1~2 | 额外Unity控制面板或编辑器 |
| 舞蹈编排系统 Dance Choreography | +1~2 | 可编程动作序列编排和回放 |
| 外壳创意设计 Creative Shell Design | +1 | 自行设计或大幅修改3D打印外壳 |

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

## 等级对应 | Grade Mapping

| 总分 Total Score | 等级 Grade | 说明 Description |
|----------------|-----------|-----------------|
| 90-100 | A (优秀 Excellent) | 全面超出预期 |
| 85-89 | A- (优秀- Excellent-) | 多数维度优秀 |
| 80-84 | B+ (良好+ Good Plus) | 部分维度优秀 |
| 75-79 | B (良好 Good) | 核心功能完整 |
| 70-74 | B- (良好- Good Minus) | 个别维度待提升 |
| 65-69 | C+ (合格+ Passing Plus) | 有改进空间 |
| 60-64 | C (合格 Passing) | 达到最低要求 |
| < 60 | D (待改进 Needs Improvement) | 未达基本要求 |

---

## 评分表模板 | Score Sheet Template

### 学员信息 | Student Information

| 字段 Field | 内容 Content |
|-----------|-------------|
| 学员姓名 Student Name | |
| 学号 Student ID | |
| 团队成员 Team Members | |
| 评分日期 Grading Date | |
| 评分人 Grader | |

---

### 维度一：技术实现 (35%) | Technical Implementation

| 细项 Sub-item | 满分 Max | 得分 Score | 备注 Notes |
|--------------|---------|-----------|-----------|
| 固件质量 Firmware Quality | 25 | | HAL库使用、代码模块化、FreeRTOS管理 |
| 舵机控制精度 Servo Control Accuracy | 25 | | PID误差、运动学计算、动作流畅度 |
| USB通信 USB Communication | 20 | | CDC枚举、数据传输可靠性、协议设计 |
| 显示渲染 Display Rendering | 20 | | GC9A01驱动、帧率、表情动画效果 |
| 传感器集成 Sensor Integration | 10 | | I2C稳定性、手势/IMU功能 |
| **小计 Subtotal** | **100** | | |

**技术实现得分 Technical Score** = 小计 x 0.35 = _______

---

### 维度二：硬件工程 (20%) | Hardware Engineering

| 细项 Sub-item | 满分 Max | 得分 Score | 备注 Notes |
|--------------|---------|-----------|-----------|
| 贴片焊接质量 SMD Soldering | 30 | | 0603/0402元件、QFN封装焊点 |
| PCB组装规范 PCB Assembly | 20 | | 元器件方向、整洁度 |
| 机械精度 Mechanical Precision | 25 | | 舵机安装、运动顺畅度 |
| 3D打印外观 3D Print Finish | 15 | | 表面质量、配合精度 |
| 结构可靠性 Structural Reliability | 10 | | 紧固度、线缆管理 |
| **小计 Subtotal** | **100** | | |

**硬件工程得分 Hardware Score** = 小计 x 0.20 = _______

---

### 维度三：软件集成 (15%) | Software Integration

| 细项 Sub-item | 满分 Max | 得分 Score | 备注 Notes |
|--------------|---------|-----------|-----------|
| Unity应用功能 Unity App | 30 | | 界面设计、控制面板、表情编辑器 |
| USB通信桥接 USB Bridge | 20 | | Unity-STM32 USB通信可靠性 |
| 计算机视觉 CV Features | 25 | | 人脸检测、姿态估计、动作模仿 |
| AI集成 AI Integration | 15 | | LLM API、对话系统、语音交互 |
| SDK集成 SDK Integration | 10 | | ElectronBot SDK使用规范 |
| **小计 Subtotal** | **100** | | |

**软件集成得分 Software Score** = 小计 x 0.15 = _______

---

### 维度四：文档质量 (10%) | Documentation

| 细项 Sub-item | 满分 Max | 得分 Score | 备注 Notes |
|--------------|---------|-----------|-----------|
| README完整性 README Completeness | 30 | | 项目介绍、架构图、使用说明 |
| 代码注释 Code Comments | 25 | | 关键函数注释、算法说明 |
| 硬件制作日志 Hardware Build Log | 25 | | 焊接过程、调试记录、问题排查 |
| Git提交规范 Git Standards | 20 | | commit message、提交频率 |
| **小计 Subtotal** | **100** | | |

**文档质量得分 Documentation Score** = 小计 x 0.10 = _______

---

### 维度五：演示展示 (10%) | Demo Presentation

| 细项 Sub-item | 满分 Max | 得分 Score | 备注 Notes |
|--------------|---------|-----------|-----------|
| 实物演示 Live Demo | 35 | | 功能展示完整性、运行效果 |
| 技术讲解 Technical Explanation | 30 | | STM32/USB/PID/CV/AI理解深度 |
| Q&A应答 Q&A Response | 20 | | 回答准确性和深度 |
| 演示组织 Presentation Organization | 15 | | 流程安排、时间控制、表达清晰 |
| **小计 Subtotal** | **100** | | |

**演示展示得分 Presentation Score** = 小计 x 0.10 = _______

---

### 维度六：创新拓展 (10%) | Innovation

| 细项 Sub-item | 满分 Max | 得分 Score | 备注 Notes |
|--------------|---------|-----------|-----------|
| 创新功能数量 Innovation Count | 30 | | 实现了几个创新功能 |
| 创新功能质量 Innovation Quality | 40 | | 功能完成度、效果、稳定性 |
| 与项目融合度 Integration Level | 20 | | 创新功能是否自然融入项目 |
| 创意说明 Creativity Statement | 10 | | 能否清晰解释创新思路 |
| **小计 Subtotal** | **100** | | |

**创新拓展得分 Innovation Score** = 小计 x 0.10 = _______

---

### 总分汇总 | Final Score Summary

| 维度 Dimension | 权重 Weight | 小计(百分制) Subtotal | 加权得分 Weighted Score |
|---------------|-------------|---------------------|------------------------|
| 技术实现 Technical Implementation | 35% | /100 | |
| 硬件工程 Hardware Engineering | 20% | /100 | |
| 软件集成 Software Integration | 15% | /100 | |
| 文档质量 Documentation | 10% | /100 | |
| 演示展示 Demo Presentation | 10% | /100 | |
| 创新拓展 Innovation | 10% | /100 | |
| **总分 Total** | **100%** | | **/100** |

**最终等级 Final Grade**: _______

---

### 评语 | Comments

**优点 Strengths**:



**改进建议 Areas for Improvement**:



**教师签名 Instructor Signature**: _______________ **日期 Date**: _______________

---

### 特别说明 | Special Notes

> **独立完成项目的学员**：如无搭档独立完成，"创新拓展"维度额外考量自主学习能力：（1）独立查阅STM32 Reference Manual和Datasheet的能力；（2）面对复杂硬件问题时坚持调试的能力；（3）跨学科知识整合（嵌入式+Unity+CV+AI）的能力。
>
> **For students working independently**: If completing the project without a partner, the "Innovation" dimension additionally evaluates self-directed learning: (1) ability to independently read STM32 Reference Manuals and Datasheets; (2) persistence in debugging complex hardware issues; (3) cross-disciplinary integration skills (embedded + Unity + CV + AI).

*最后更新：2026-05-27*
