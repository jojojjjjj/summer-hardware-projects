# 详细评分标准 | Detailed Grading Rubric

## 评分维度 | Grading Dimensions

### 1. 技术实现 (35%) | Technical Implementation

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 机器人能稳定平衡站立（60秒以上不倒），遥控响应灵敏，三环PID参数整定合理，代码结构清晰，有拓展功能（轮足混合运动、自定义运动模式等），无明显 bug |
| B - 良好 Good | 75-89 | 机器人能稳定站立（30秒以上），遥控功能正常，PID控制基本合理，代码结构较好，偶有小问题但已修复 |
| C - 合格 Passing | 60-74 | 机器人能短暂站立（10秒以上），基本控制功能可用，存在已知问题但已记录在文档中 |
| D - 待改进 Needs Improvement | < 60 | 核心平衡功能未完成或机器人完全无法工作 |

**技术实现细项评分 | Technical Implementation Sub-scores:**

| 细项 Sub-item | 占比(技术实现内) | 说明 Description |
|--------------|----------------|-----------------|
| 平衡稳定性 Balance Stability | 30% | 机器人站立时长和稳定性，抗扰动能力 |
| PID 控制质量 PID Quality | 25% | 参数整定是否合理，控制响应速度和精度 |
| 电机驱动 Motor Driving | 15% | FOC 控制效果，电机运行是否平滑、无异响 |
| 遥控功能 Remote Control | 15% | 蓝牙/WiFi 遥控是否灵敏可靠 |
| 代码质量 Code Quality | 15% | 代码结构、注释、模块化程度 |

---

### 2. 文档质量 (10%) | Documentation

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | README 完整详尽，代码有清晰注释，接线图/原理图规范美观，有完整的 PID 调参日志和调试记录，包含系统框图和理论分析 |
| B - 良好 Good | 75-89 | README 完整，代码有基本注释，接线图清晰，有调参记录 |
| C - 合格 Passing | 60-74 | README 存在但内容不完整，代码注释较少，缺少调试记录 |
| D - 待改进 Needs Improvement | < 60 | 几乎没有文档或文档严重缺失 |

**文档质量细项 | Documentation Sub-scores:**

| 细项 Sub-item | 占比(文档内) | 说明 Description |
|--------------|-------------|-----------------|
| README 完整性 README Completeness | 30% | 项目介绍、使用说明、技术架构是否完整 |
| 代码注释 Code Comments | 25% | 关键函数和算法是否有清晰注释 |
| 图表质量 Diagrams & Figures | 25% | 接线图、系统框图、原理图是否规范 |
| 调试日志 Debug Log | 20% | PID 调参记录、问题排查过程是否详细 |

---

### 3. 演示展示 (17%) | Presentation

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 演示流畅精彩，机器人实物运行完美，技术讲解深入清晰（能讲清 PID 原理、FOC 控制等），Q&A 对答如流，时间控制精准 |
| B - 良好 Good | 75-89 | 演示基本顺畅，实物能正常工作，技术讲解清晰，能回答大部分问题 |
| C - 合格 Passing | 60-74 | 演示有卡顿，实物部分功能异常，讲解不够清晰 |
| D - 待改进 Needs Improvement | < 60 | 无法完成演示或实物完全不能工作 |

**演示展示细项 | Presentation Sub-scores:**

| 细项 Sub-item | 占比(演示内) | 说明 Description |
|--------------|-------------|-----------------|
| 演示流畅度 Delivery Fluency | 30% | 演示是否流畅，是否超时或时间过短 |
| 实物展示 Live Demo | 30% | 机器人实物运行效果，功能展示完整性 |
| 技术讲解 Technical Explanation | 25% | 对 PID、FOC、IMU 等技术的理解深度 |
| Q&A 应答 Q&A Response | 15% | 回答提问的准确性和深度 |

---

### 4. 进度汇报 (15%) | Check-ins

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 两次汇报均按时提交，内容详实，问题分析深入（含参数调整记录），反思有深度，计划清晰可行 |
| B - 良好 Good | 75-89 | 两次汇报按时提交，内容完整，有基本的分析和反思 |
| C - 合格 Passing | 60-74 | 仅提交一次或两次都较为简略敷衍 |
| D - 待改进 Needs Improvement | < 60 | 未提交或内容严重不足 |

**进度汇报细项 | Check-in Sub-scores:**

| 细项 Sub-item | 占比(汇报内) | 说明 Description |
|--------------|-------------|-----------------|
| 及时性 Timeliness | 20% | 是否按时提交 |
| 内容完整性 Content Completeness | 30% | 功能列表、截图/视频是否完整 |
| 问题分析 Problem Analysis | 30% | 遇到的问题是否有深入分析和解决方案 |
| 反思与计划 Reflection & Planning | 20% | 个人反思深度和后续计划可行性 |

---

### 5. Demo 网站 (13%) | Project Website

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | 网站内容完整（项目介绍、功能展示视频/GIF、技术架构图、控制算法说明、制作心得），视觉设计美观专业，已成功部署可在线访问 |
| B - 良好 Good | 75-89 | 内容基本完整，已部署可访问，视觉设计整洁 |
| C - 合格 Passing | 60-74 | 内容不完整或未成功部署，仅有本地文件 |
| D - 待改进 Needs Improvement | < 60 | 无 Demo 网站 |

**Demo 网站细项 | Website Sub-scores:**

| 细项 Sub-item | 占比(网站内) | 说明 Description |
|--------------|-------------|-----------------|
| 内容完整性 Content Completeness | 35% | 介绍、展示、技术说明、心得等是否齐全 |
| 视觉设计 Visual Design | 25% | 页面美观度、排版、配色、响应式设计 |
| 技术深度 Technical Depth | 25% | 控制算法、系统架构等技术内容的深度 |
| 部署与访问 Deployment | 15% | 是否成功部署到公网可访问 |

---

### 6. 团队协作 (10%) | Collaboration

| 等级 Grade | 分数 Score | 标准 Criteria |
|-----------|-----------|--------------|
| A - 优秀 Excellent | 90-100 | Git 提交记录规律且有意义，分工明确合理（如一人主攻硬件/一人主攻软件），互帮互助，积极沟通，代码 Review 有质量 |
| B - 良好 Good | 75-89 | Git 有提交记录，分工基本合理，有基本协作 |
| C - 合格 Passing | 60-74 | Git 提交较少或不规律，分工不够合理 |
| D - 待改进 Needs Improvement | < 60 | 无 Git 记录，分工混乱，缺乏协作 |

> 注：独立完成项目的学员，"团队协作" 10% 转换为 "自主学习能力" 评分，考察：（1）独立查阅资料解决问题的能力；（2）遇到困难时的自我调节和坚持；（3）时间管理和任务规划能力。
> Note: For students working independently, the "Collaboration" 10% is converted to "Self-directed Learning," evaluating: (1) ability to independently research and solve problems; (2) self-regulation and persistence when facing difficulties; (3) time management and task planning skills.

---

## 总分计算 | Total Score Calculation

```
总分 Total Score = 技术实现 Technical x 0.35
                + 文档质量 Documentation x 0.10
                + 演示展示 Presentation x 0.17
                + 进度汇报 Check-ins x 0.15
                + Demo 网站 Website x 0.13
                + 团队协作 Collaboration x 0.10
```

---

## 等级对应 | Grade Mapping

| 总分 Total Score | 等级 Grade | 说明 Description |
|----------------|-----------|-----------------|
| 90-100 | A (优秀 Excellent) | 全面超出预期，技术实现出色，文档和展示一流 |
| 80-89 | B+ (良好+ Good Plus) | 多数维度表现良好，部分维度优秀 |
| 75-79 | B (良好 Good) | 整体良好，核心功能完整 |
| 70-74 | B- (良好- Good Minus) | 基本良好，个别维度有待提升 |
| 60-69 | C (合格 Passing) | 达到基本要求，有改进空间 |
| < 60 | D (待改进 Needs Improvement) | 未达到课程基本要求 |

---

## 特别加分项 | Bonus Points

以下情况可获得最多 +5 分的额外加分（不超过总分 100 分上限）：

The following achievements can earn up to +5 bonus points (total capped at 100):

| 加分项 | 分值 | 说明 |
|--------|------|------|
| 独特的轮足步态创新 | +1~2 | 实现有创意的混合运动模式 |
| 出色的参数自适应 | +1~2 | PID 参数能根据状态自动调整 |
| 完善的故障保护 | +1 | 倾倒检测、低压保护、电机堵转保护 |
| 开源贡献 | +1~2 | 向 StackForce 项目提交有价值的 PR |
| 精美的外壳设计 | +1 | 3D 打印外壳设计美观且功能完善 |

> Note: All bonus points are at the instructor's discretion and require demonstration during the final presentation.
