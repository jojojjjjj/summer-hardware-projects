# 第三阶段：详细项目构建指令 | Phase 3: Detailed Project Build Instructions

> 本文件指导课程设计师、技术架构师和硬件专家协作生成完整的项目课程包。
> This file guides the team in generating complete project curriculum packages.

---

## 项目文件夹结构 | Project Folder Structure

每个项目必须包含以下结构：

```
project-XX-[name]/
├── README.md                    # 项目总览（中英双语）
├── curriculum/
│   ├── overview.md              # 课程总纲
│   ├── prerequisites.md         # 前置知识清单
│   ├── day-01.md ~ day-15.md    # 每日课程
│   ├── assignments.md           # 作业汇总
│   └── grading-rubric.md        # 评分标准
├── hardware/
│   ├── BOM.md                   # 物料清单（含价格和购买链接）
│   ├── wiring-guide.md          # 接线指南
│   ├── assembly-steps.md        # 组装步骤
│   └── troubleshooting.md       # 硬件问题排查
├── software/
│   ├── requirements.txt         # Python 依赖
│   ├── config.template.yaml     # 配置文件模板
│   ├── src/
│   │   ├── main.py              # 主程序入口
│   │   ├── sensors.py           # 传感器模块（如适用）
│   │   ├── display.py           # 显示模块（如适用）
│   │   └── utils.py             # 工具函数
│   └── tests/
│       └── test_basic.py        # 基础测试
└── assignments/
    ├── week-1-checkin.md        # 第一周检查点
    ├── week-2-checkin.md        # 第二周检查点
    ├── final-presentation.md    # 最终展示要求
    └── rubric.md                # 评分细则
```

---

## 每日课程模板 | Daily Lesson Template

每天的 markdown 文件必须包含：

```markdown
# Day XX: [今日主题] | [Today's Topic]

## 学习目标 | Learning Objectives
- 目标 1
- 目标 2

## 前置准备 | Prerequisites
- [ ] 已完成的昨日任务确认
- [ ] 需要的器材/工具

## 为什么学这个？| Why This Matters
<!-- 笨鸟先飞原则：解释今天内容的实际意义 -->
2-3 句话解释今天学的技能在真实世界中的应用

## 今日任务 | Today's Tasks

### Task 1: [任务名称] (预计 XX 分钟)
**目标：**
**步骤：**
1. ...
2. ...

**预期结果：**
**常见问题：**

### Task 2: ...

## 今日作业 | Homework
- 作业描述
- 提交要求

## 明日预告 | Tomorrow's Preview
简述明天将学什么

## 参考资源 | References
- 链接 1
- 链接 2
```

---

## README.md 模板 | README Template

```markdown
# [项目名称] | [English Name]

## 项目简介 | Project Brief
（2-3 段话介绍项目是什么、做什么、为什么有趣）

## 最终效果 | Final Result
（描述完成后的效果）

## 核心技术 | Key Technologies
- 技术 1
- 技术 2

## 硬件清单 | Hardware List
（链接到 hardware/BOM.md）

## 软件环境 | Software Environment
- Python 3.x
- 依赖库列表

## 快速开始 | Quick Start
1. 步骤 1
2. 步骤 2

## 课程安排 | Curriculum
（链接到 curriculum/ 目录）

## 评分标准 | Grading
（链接到 assignments/rubric.md）
```

---

## 质量检查清单 | Quality Checklist

### 课程设计师交付检查：
- [ ] 每日课程文件覆盖 10-15 天
- [ ] 每个任务都有"为什么"解释
- [ ] 前置知识清单完整且有链接
- [ ] 作业可评估且与当天内容对齐
- [ ] 中英双语

### 技术架构师交付检查：
- [ ] 代码脚手架可运行（至少不报错）
- [ ] 依赖版本明确
- [ ] 关键接口有文档
- [ ] 配置文件有注释说明

### 硬件专家交付检查：
- [ ] BOM 总价 <!-- < ¥500 -->
- [ ] 每个组件有替代方案
- [ ] 接线说明清晰
- [ ] 包含常见问题排查

---

## 协作流程

1. **课程设计师** 先行，确定每天要教什么
2. **技术架构师** 根据课程内容生成对应代码
3. **硬件专家** 根据课程和技术需求生成硬件文档
4. **质量审核员** 最后统一审核
