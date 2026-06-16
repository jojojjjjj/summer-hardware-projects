# 评审报告 | Review Report

> 基于 ASSIGNMENT_DESIGN_STANDARD.md 第六章的评审标准，对全部 9 个项目的 assignments.md 进行审核。
> 审核时间：2026-06-16

---

## 汇总表格 | Summary

| 项目 | 难度 | 作业数 | CC题数 | 结构完整性/30 | 知识深度/30 | 作业链/20 | 适配度/20 | 总分/100 | 等级 |
|------|------|--------|--------|-------------|-----------|----------|----------|---------|------|
| project-06-weather-cube | Easy | 3 | 0 | 28 | 22 | 18 | 19 | 87 | A |
| project-02-env-monitor | Mid | 5 | 0 | 26 | 24 | 18 | 18 | 86 | A |
| project-05-desktop-pet | Mid | 5 | 0 | 26 | 24 | 18 | 18 | 86 | A |
| project-01-thermal-imager | High | 6 | 0 | 26 | 24 | 18 | 18 | 86 | A |
| project-04-oscilloscope | High | 6 | 0 | 26 | 24 | 18 | 18 | 86 | A |
| project-07-bipedal-robot | High | 6 | 30 | 30 | 28 | 19 | 20 | 97 | A+ |
| project-09-desk-satellite | High | 5 | 19 | 28 | 26 | 18 | 19 | 91 | A |
| project-08-electronbot | XHigh | 7 | 27 | 28 | 27 | 18 | 19 | 92 | A |
| project-03-4mode-keyboard | 20d | 8 | 27 | 26 | 26 | 18 | 19 | 89 | A |

---

## 分项目评审 | Detailed Reviews

### project-06-weather-cube-easy (Easy) — 87/100

**各维度得分**：结构28 | 深度22 | 链条18 | 适配度19

**优点**：
- 3份正式作业 + 1份Check-in，符合Easy难度标准
- 每份作业有完整的Learning Outcomes、Why This Matters、Prerequisites、Task List(⭐标注)、Comprehension Check(含参考答案)、Submission Requirements、Rubric
- Pipeline依赖链清晰（HW1→HW2→HW3）
- 每日课后任务设计得当（20-30min）
- 知识深度分布标注清晰（Layer1:50%, Layer2:40%, Layer3:10%）

**扣分项**：
- -2 结构：Comprehension Check使用"Q1/Q2"编号而非标准格式，但内容完整
- -8 深度：Easy项目的CC问题偏少（部分作业仅2-3个），且类型分布不够多元（类比迁移题偏少）
- -2 链条：Phase Review未单独列出
- -1 适配度：部分任务步骤可以更细致

### project-02-env-monitor-mid (Mid) — 86/100

**各维度得分**：结构26 | 深度24 | 链条18 | 适配度18

**优点**：
- 5份正式作业 + 2份Check-in，符合Mid难度标准
- Pipeline依赖链清晰
- 19个理解验证问题，覆盖设计权衡、原理追问、故障分析、类比迁移四类
- 每份作业有Why This Matters含日常类比

**扣分项**：
- -4 结构：Comprehension Check问题未标注Q1/Q2编号，参考答案格式不统一；缺少⭐难度标注
- -6 深度：虽然问题数量够，但CC问题的格式和编号不够标准化（与P07对比明显）
- -2 链条：作业权重分配说明不够直观
- -2 适配度：部分Layer 3任务缺少步骤分解

### project-05-desktop-pet-mid (Mid) — 86/100

**各维度得分**：结构26 | 深度24 | 链条18 | 适配度18

**优点**：
- 5份正式作业 + 2份Check-in + 12天课后任务
- Pipeline依赖链清晰
- 19个CC问题，类型分布合理
- 每份作业有日常类比

**扣分项**：
- 与P02类似的格式问题：缺少标准化的Q编号和⭐标注
- -6 深度：CC问题格式需要统一化
- -2 适配度：ESP-IDF 开发对高中生来说门槛较高，需要更多脚手架

### project-01-binocular-thermal-imager (High) — 86/100

**各维度得分**：结构26 | 深度24 | 链条18 | 适配度18

**优点**：
- 6份正式作业 + 2份Check-in + 1份Phase Review，符合High难度标准
- 15天课程适配更长的学习周期
- Pipeline依赖链非常详细

**扣分项**：
- -4 结构：CC问题格式不统一，缺少⭐标注
- -6 深度：15天课程但作业仍为6份，每日课后任务可以更丰富
- -2 链条：Phase Review与Check-in的区分不够清晰
- -2 适配度：Android APP开发对高中生门槛极高，需要更多引导

### project-04-pocket-oscilloscope-high (High) — 86/100

**各维度得分**：结构26 | 深度24 | 链条18 | 适配度18

**优点**：
- 6份正式作业 + 30个CC问题
- Pipeline依赖链清晰
- 涵盖ZYNQ/FPGA/DDS/ARM/LVGL五大领域

**扣分项**：
- -4 结构：CC格式不统一，缺少⭐标注
- -6 深度：ZYNQ SoC对高中生来说是最难的技术栈，CC问题虽然多但部分Layer 3内容过深
- -2 链条：Phase Review描述可以更具体
- -2 适配度：FPGA开发流程对高中生的脚手架不够充分

### project-07-bipedal-wheeled-robot-high (High) — 97/100 ⭐

**各维度得分**：结构30 | 深度28 | 链条19 | 适配度20

**优点**：
- 6份正式作业 + 2份Check-in + 1份Phase Review
- **30个CC问题**，每个都有Q编号和参考答案，类型分布完美（40%设计权衡/30%原理追问/20%故障分析/10%类比迁移）
- 每个任务有⭐难度标注
- Pipeline依赖链详细且逻辑严密
- **日常类比质量极高**（IMU=前庭系统、PID=扫帚平衡、串级控制=小脑+大脑）
- 每份作业的CC问题涵盖了本项目的核心技术权衡（FOC vs 六步换相、互补滤波 vs 卡尔曼、PID vs LQR、蓝牙 vs WiFi）
- Check-in和Phase Review都有明确的评分标准

**扣分项**：
- -2 深度：个别CC问题的参考答案偏长，可以更精炼
- -1 链条：HW1的权重（10%）可能偏低

**评价**：本项目的作业设计质量最高，是所有项目的标杆。CC问题的设计精准地击中了控制系统的核心权衡，日常类比生动准确，参考答案详实。

### project-09-desk-satellite-high (High) — 91/100

**各维度得分**：结构28 | 深度26 | 链条18 | 适配度19

**优点**：
- 5份正式作业 + 19个CC问题，都有Q编号和参考答案
- 每个任务有⭐难度标注
- Pipeline依赖链清晰
- CC问题覆盖SPI vs I2C、LDO vs DC-DC、NTP vs HTTP等核心权衡
- 日常类比质量好（SPI=高速公路、I2C=乡间小路）

**扣分项**：
- -2 结构：5份作业对High难度略少（标准5-7份），可以考虑将HW4电源+外壳拆分为两份
- -4 深度：CC问题数量19个少于P07的30个；部分作业的CC问题只有3-4个
- -2 链条：铜线外壳制作与电路设计的衔接可以更明确
- -1 适配度：焊接步骤可以更详细

### project-08-electronbot-xhigh (XHigh) — 92/100

**各维度得分**：结构28 | 深度27 | 链条18 | 适配度19

**优点**：
- 7份正式作业 + 27个CC问题，符合XHigh标准
- 技术栈最全面（STM32+Unity+OpenCV+AI），作业覆盖三大领域
- Pipeline依赖链清晰
- CC问题涵盖USB CDC vs UART、DLL桥接、OpenCV Haar、LLM云端vs本地等关键权衡
- Phase Review的"跨领域系统集成复盘"设计得当

**扣分项**：
- -2 结构：HW7的Submission Requirements缺失
- -3 深度：XHigh要求Layer3占40%，但部分作业的Layer3任务描述偏粗
- -2 链条：固件→Unity→AI的三段式跳跃对高中生来说跨度大，中间缺少过渡脚手架
- -1 适配度：Unity+C#+OpenCV+Python四语言栈对高中生挑战极大，需要更多预备资源链接

### project-03-4mode-keyboard (20天) — 89/100

**各维度得分**：结构26 | 深度26 | 链条18 | 适配度19

**优点**：
- 8份正式作业 + 3份Check-in + 27个CC问题，符合20天课程标准
- 20天每日课后任务设计完整
- 覆盖电子基础→通信协议→无线→音频→PCB→FOC→固件→集成全链路
- CC问题涵盖SPI vs I2C设备分配、4层vs2层PCB、软件vs硬件消抖等核心权衡
- 电源架构分析（DC-DC→LDO两级方案）是亮点

**扣分项**：
- -4 结构：部分作业缺少Prerequisites和Submission Requirements
- -4 深度：8份作业中部分作业的CC问题只有3个，偏少
- -2 链条：HW4（音频+USB）和HW5（FOC+LVGL）之间的过渡不够平滑
- -1 适配度：嘉立创EDA的PCB设计步骤可以更详细

---

## 共性问题清单 | Cross-cutting Issues

### 1. CC问题格式不统一（影响6个项目）
- P01/P02/P04/P05的CC问题未使用标准化"Q1/Q2"编号
- P07/P08/P09/P03已标准化
- **建议**：统一所有项目的CC问题编号格式

### 2. ⭐难度标注缺失（影响4个项目）
- P01/P02/P04/P05的Task List未使用⭐标注
- P06/P07/P08/P09/P03已标注
- **建议**：为所有项目的Task List添加⭐难度标注

### 3. 参考答案格式不一致
- P07/P08/P09/P03使用"> **参考答案**"块引用格式
- 其他项目格式各异
- **建议**：统一使用块引用格式

### 4. 高难度项目需要更多脚手架
- P04(ZYNQ)、P08(多语言栈)的技术门槛对高中生极高
- **建议**：在这些项目的Prerequisites中添加更详细的学习资源链接和预备知识清单

### 5. Phase Review的定位需要明确
- 部分项目的Phase Review与Check-in Report区分不够
- **建议**：统一Phase Review为"技术决策复盘"（向后看），Check-in为"进度汇报"（向当前看）

---

## 改进优先级 | Improvement Priority

1. **高优先级**：统一P01/P02/P04/P05的CC问题编号和⭐标注格式
2. **中优先级**：为P04/P08添加更多技术栈入门资源链接
3. **低优先级**：统一所有项目的Phase Review模板

---

*审核完成于 2026-06-16*
*Review completed 2026-06-16*
