# 主控提示词 | Master Control Prompt

> 本文件是 Claude Code Teams 模式的入口指令。
> This file is the entry point for the Claude Code Teams Mode workflow.

---

## 任务概述 | Mission Brief

为高中生暑期硬件实践课程生成 **3 个完整的、可落地的**项目课程包。每个项目基于真实开源社区项目改编，包含每日任务、代码框架、硬件清单和评分标准。

---

## 工作流程 | Workflow

### Phase 1: Research（调研阶段）
- 两个调研员 Agent 并行工作
- 调研员A：桌宠机器人、智能音箱方向
- 调研员B：环境感知 IoT、视觉/CV 方向
- 每人至少找到 8 个真实开源项目
- 输出：`reports/01_research_raw.md`

### Phase 2: Evaluation（评估阶段）
- 可行性分析师对候选项目打分
- 硬件专家验证硬件选型与成本
- 综合评分选出前 3 个项目
- 输出：`reports/02_feasibility_report.md` + `reports/03_top3_selection.md`

### Phase 3: Build（构建阶段）
- 课程设计师生成每日课程大纲
- 技术架构师生成代码脚手架
- 硬件专家生成物料清单和接线图说明
- 质量审核员验收全部输出
- 输出：`project-01-[name]/` ~ `project-03-[name]/` 完整文件夹

---

## 约束条件 | Constraints

| 约束 | 说明 |
|------|------|
| 单套硬件成本 | <!-- < ¥500 --> |
| 项目周期 | 10–20 天全日制 |
| 学员水平 | 高中生，零基础/薄弱基础 |
| 文档语言 | 中英双语 |
| 开源基础 | 必须基于真实开源项目 |
| 可复现性 | 标准暑期时间内可完成 MVP |

---

## 执行指令

将本文件内容粘贴到 Claude Code 中，系统将自动：
1. 创建 Team（8 个 Agent 角色）
2. 按三阶段顺序执行
3. 汇总输出到 reports/ 和 project-*/ 目录
