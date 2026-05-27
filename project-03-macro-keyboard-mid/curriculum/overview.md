# 课程概述 | Course Overview

## 项目名称 | Project Name
**宏键盘 "键界"** | Macro Keyboard "KeyVerse"

## 项目目标 | Project Goals

通过 12 天的集中学习，学生将完成一台功能完整的模块化客制化宏键盘，掌握以下核心能力：

Over 12 intensive days, students will build a fully functional modular custom macro keyboard, gaining these core competencies:

1. **电子电路基础** — 理解电压、电流、电阻，能独立在面包板上搭建电路
2. **键盘矩阵扫描** — 掌握行/列扫描原理与二极管防鬼键技术
3. **通信协议** — 理解 I2C、SPI、USB HID 三种主流通信协议
4. **PCB 设计** — 使用嘉立创 EDA 完成原理图绘制与 PCB 布局
5. **固件开发** — 基于 QMK 固件框架实现键盘功能
6. **焊接与组装** — 掌握通孔焊接与贴片焊接基础技能
7. **系统集成** — 将硬件与软件整合为可工作的完整产品

---

## 课程结构 | Course Structure

```
阶段一 (Day 1-4)          阶段二 (Day 5-8)          阶段三 (Day 9-12)
电子基础与工具入门         PCB设计与固件开发          集成调试与展示
┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│ Day 1: 电子学 │          │ Day 5: EDA  │          │ Day 9: HID  │
│ Day 2: 矩阵   │  ──>    │ Day 6: 原理图│  ──>    │ Day 10:焊接 │
│ Day 3: I2C    │          │ Day 7: PCB  │          │ Day 11:调试 │
│ Day 4: RGB    │          │ Day 8: QMK  │          │ Day 12:展示 │
└─────────────┘          └─────────────┘          └─────────────┘
     面包板原型               设计固件                 完整产品
```

---

## 每日时间安排 | Daily Schedule

| 时间 Time | 活动 Activity | 时长 Duration |
|---|---|---|
| 09:00–09:15 | 晨会：回顾与计划 Morning Standup | 15 min |
| 09:15–10:30 | 知识讲解 Knowledge Lecture | 75 min |
| 10:30–10:45 | 休息 Break | 15 min |
| 10:45–12:00 | 动手实验 Hands-on Lab | 75 min |
| 12:00–13:30 | 午餐与休息 Lunch & Rest | 90 min |
| 13:30–15:00 | 项目实践 Project Work | 90 min |
| 15:00–15:15 | 休息 Break | 15 min |
| 15:15–16:30 | 项目实践（续）Project Work (cont.) | 75 min |
| 16:30–17:00 | 日终总结 Daily Wrap-up | 30 min |

> 每天约 6.5 小时有效学习时间。Approximately 6.5 hours of productive learning per day.

---

## 学习成果 | Learning Outcomes

### 知识维度 Knowledge

| 知识点 Topic | 对应课程 Day(s) | 评估方式 Assessment |
|---|---|---|
| 基本电路理论 | Day 1 | 面包板实验 |
| 矩阵扫描原理 | Day 2 | 扫描代码实现 |
| I2C 协议 | Day 3 | OLED 显示实验 |
| WS2812B 协议 | Day 4 | RGB 灯效编程 |
| PCB 设计流程 | Day 5-7 | 原理图 + PCB 文件 |
| QMK 固件架构 | Day 8-9 | 编译成功的固件 |
| USB HID 协议 | Day 9 | 键盘识别与测试 |
| 焊接技术 | Day 10 | 焊接质量检查 |

### 技能维度 Skills

- 使用万用表测量电压、电流、通断
- 在面包板上搭建和调试电路
- 使用逻辑分析仪或示波器观察信号
- 使用嘉立创 EDA 绘制原理图和 PCB
- 编写和编译 QMK 固件
- 通孔焊接和基础贴片焊接
- 系统级调试和问题定位

### 素养维度 Competencies

- 工程思维：从需求到产品的完整流程
- 文档能力：撰写技术文档和项目报告
- 团队协作：分工合作与版本管理
- 问题解决：面对故障的系统化排查能力

---

## 教学资源 | Teaching Resources

### 硬件工具 | Hardware Tools（教室配备 Classroom Equipment）
- 万用表（每组 1 个）
- 烙铁 + 焊台（每组 1 套）
- 面包板 + 杜邦线（每组 1 套）
- 逻辑分析仪（共用 2-3 台）

### 软件工具 | Software Tools
- 嘉立创 EDA（在线版，无需安装）
- QMK MSYS（Windows 编译环境）
- QMK Toolbox（固件刷写）
- VS Code + PlatformIO（代码编辑）
- Git（版本控制）

### 在线资源 | Online Resources
- QMK 官方文档：https://docs.qmk.fm/
- 嘉立创 EDA：https://lceda.cn/
- 嘉立创开源硬件平台：https://oshwhub.com/
- B 站教学视频（详见 README.md 学习资源部分）

---

## 评估体系 | Assessment System

| 评估项 Assessment Item | 满分 Points | 截止时间 Deadline |
|---|---|---|
| 技术实现 Technical Implementation | 40 分 | Day 12 |
| 文档质量 Documentation Quality | 20 分 | Day 12 |
| 演示展示 Final Presentation | 20 分 | Day 12 |
| Demo 网站 Project Demo Website | 15 分 | Day 12 |
| 进度汇报 Check-in Reports | 10 分 | Day 4 / Day 8 |
| 团队协作 & 学习态度 Collaboration & Attitude | 10 分 | Day 12 |
| **总分 Total** | **115 分** | |

---

## 先修要求 | Prerequisites

详见 [prerequisites.md](prerequisites.md)

---

*最后更新 | Last updated: 2026-05-26*
