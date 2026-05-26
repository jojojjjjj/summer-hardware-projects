# 作业说明 | Assignments Overview

## 作业体系 | Assignment System

本课程的作业分为三类：每日实验、每周汇报、最终展示。

Assignments fall into three categories: daily labs, weekly check-ins, and final presentation.

---

## 一、每日实验 | Daily Labs

每天课程结束前，需要完成当天的实验任务并提交。

Each day's lab must be completed and submitted before end of day.

| 天数 Day | 实验内容 Lab Content | 提交方式 Submission |
|---|---|---|
| Day 1 | 面包板电路 + LED 点亮 | 拍照 + 代码截图 |
| Day 2 | 4x4 矩阵扫描代码 | 代码文件 + 串口输出截图 |
| Day 3 | OLED 显示文字和图案 | 拍照 + 代码文件 |
| Day 4 | RGB 灯效动画 | 拍照/视频 + 代码文件 |
| Day 5 | 嘉立创 EDA 练习电路 | 截图 + EDA 文件 |
| Day 6 | 完整键盘原理图 | EDA 文件导出 |
| Day 7 | PCB 布局文件 | Gerber 文件 + DRC 报告 |
| Day 8 | QMK 基础固件编译 | 编译日志截图 |
| Day 9 | USB HID 键盘固件 | 编译固件 + 测试截图 |
| Day 10 | 焊接完成的 PCB | 拍照（正面 + 反面） |
| Day 11 | 系统联调通过 | 功能演示视频 |
| Day 12 | 最终展示 | PPT + 演示 |

---

## 二、每周进度汇报 | Weekly Check-in Reports

### Week 1 汇报（Day 4 结束前提交）

详见 [week-1-checkin.md](../assignments/week-1-checkin.md)

内容要求：
1. **本周学习总结**（500 字以上）：学到了什么，有哪些收获
2. **遇到的问题与解决方案**：至少记录 2 个问题及解决过程
3. **关键代码片段**：展示本周最满意的代码
4. **下周计划**：准备如何推进 PCB 设计和固件开发
5. **自我评分**（1-10 分）：对本周学习效果的自我评价

### Week 2 汇报（Day 8 结束前提交）

详见 [week-2-checkin.md](../assignments/week-2-checkin.md)

内容要求：
1. **第二周学习总结**（500 字以上）
2. **PCB 设计总结**：原理图和 PCB 布局的设计思路
3. **QMK 固件学习心得**：对固件架构的理解
4. **遇到的挑战与突破**
5. **最终展示计划**：准备展示哪些功能

---

## 三、最终展示 | Final Presentation

详见 [final-presentation.md](../assignments/final-presentation.md)

### 展示要求 Presentation Requirements

- **时间**：每人/每组 10-15 分钟展示 + 5 分钟问答
- **形式**：PPT + 实物演示
- **评分维度**：
  - 项目完成度（功能是否齐全）
  - 技术深度（对原理的理解程度）
  - 表达能力（展示是否清晰有条理）
  - 回答问题（对提问的回应质量）

### 展示大纲 Presentation Outline

1. **开场**（1 分钟）：项目名称、团队介绍
2. **项目概述**（2 分钟）：做了什么、为什么做
3. **技术讲解**（5 分钟）：核心原理、设计决策
4. **实物演示**（3 分钟）：按键、旋钮、OLED、RGB 功能展示
5. **总结与反思**（2 分钟）：学到了什么、有何不足、未来改进方向
6. **问答**（5 分钟）：回答老师和同学的提问

---

## 四、提交规范 | Submission Guidelines

### 文件命名规范
```
Day01_实验报告_学号_姓名.md
Week1_进度汇报_学号_姓名.md
Final_展示PPT_学号_姓名.pptx
```

### Git 提交规范
```
feat: 添加 Day 2 矩阵扫描代码
fix: 修复 OLED 初始化失败的问题
docs: 完成 Week 1 进度汇报
```

### 提交方式
- 代码文件：通过 Git 仓库提交（GitHub / Gitee）
- 文档文件：提交到仓库的 assignments/ 目录下
- 拍照/视频：上传到指定网盘链接

---

*最后更新 | Last updated: 2026-05-26*
