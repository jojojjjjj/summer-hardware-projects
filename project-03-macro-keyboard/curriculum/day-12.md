# Day 12: 项目展示与总结 | Project Demo & Reflection

> **今日目标 Today's Goals:**
> - 完成最终项目展示（Final Presentation + Demo）
> - 互相学习，了解其他同学的设计思路和创意
> - 回顾 12 天学习历程，总结收获与不足
> - 为后续拓展方向提供建议
>
> **产出 Deliverable:** 完整的项目展示 + 项目文档提交

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:30 | 晨会 | 最终检查，展示准备 |
| 09:30–10:30 | 展示 | 第 1-3 组展示 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 展示 | 第 4-6 组展示 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 展示 | 第 7-9 组展示 |
| 15:00–15:15 | 休息 | — |
| 15:15–16:00 | 总结 | 课程回顾 + 未来方向讨论 |
| 16:00–17:00 | 颁奖 | 评分公布 + 颁奖 + 合影 |

---

## 上午 & 下午：项目展示 | All Day: Project Presentation

### 为什么要学展示? | Why Learn This?

在工程领域，"会做"和"会说"同样重要。一个优秀的工程师不仅能设计出好产品，还能清晰地向他人解释自己的设计思路和技术决策。项目展示是锻炼技术表达能力的最佳场景——你需要在有限的时间内，让非专业人士理解你的工作。

In engineering, "being able to build" and "being able to explain" are equally important. A great engineer not only designs good products but also clearly communicates design rationale and technical decisions. The final presentation is the best setting to practice technical communication.

此外，观看其他同学的展示也是宝贵的学习机会。你可能会发现别人用了不同的解决方案，或者有你没想到的创意功能。

---

### 任务 12.1: 最终展示 (每人/每组 10-15 分钟)

**展示大纲 Presentation Outline:**

```
1. 开场 (1 分钟)
   - 自我介绍
   - 项目名称和口号

2. 项目概述 (2 分钟)
   - 做了什么？（宏键盘的功能描述）
   - 为什么做？（选题动机）
   - 技术栈概述

3. 技术讲解 (5 分钟)
   - 硬件设计：PCB 设计思路、元件选型理由
   - 固件开发：QMK 配置、键位设计、灯效逻辑
   - 遇到的挑战和解决方案（重点！）

4. 实物演示 (3 分钟)
   - 按键功能演示
   - 旋钮功能演示（音量/灯效控制）
   - OLED 层号/动画显示
   - RGB 灯效切换
   - VIA 改键演示（如果有）

5. 总结与反思 (2 分钟)
   - 学到了什么
   - 有什么不足
   - 如果重新来过，会怎么做
   - 未来拓展方向

6. 问答环节 (5 分钟)
```

**展示技巧 Presentation Tips:**

| 技巧 Tip | 说明 Explanation |
|---|---|
| 先演示再讲解 | 观众对实物比对 PPT 更感兴趣 |
| 讲"为什么"比"怎么做"更重要 | 体现你的思考深度 |
| 准备好应对故障 | 如果演示时出 bug，冷静排查或切换到截图/视频备份 |
| 控制语速 | 紧张时容易说话太快，有意识地放慢 |
| 与观众互动 | 适时提问或邀请同学上台体验 |

---

### 任务 12.2: 互评与学习 (展示期间)

每位同学在观看其他组展示时，填写互评表：

**互评表 Peer Review Form:**

| 评分项 Criteria | 1-10 分 | 说明 Notes |
|---|---|---|
| 功能完整度 | | 所有功能是否正常工作 |
| 技术深度 | | 对原理的讲解是否深入 |
| 创意与设计 | | 是否有独特的功能或设计 |
| 展示表达 | | 讲解是否清晰有条理 |
| 文档质量 | | README 和代码注释 |

---

### 任务 12.3: 创建项目展示网站 (30-60 分钟)

**为什么要学这个？ | Why Learn This?**

在工程行业，一个好的项目不仅要有扎实的技术实现，还需要有清晰的在线展示。工程师通过个人网站或项目主页来展示自己的作品，这是求职和技术交流的重要方式。通过创建项目展示网站，你将学会如何将技术文档转化为面向公众的可视化展示。

In engineering, a great project needs not only solid technical implementation but also a clear online presence. Engineers use personal websites or project pages to showcase their work — a critical skill for career and technical communication. By creating a demo website, you will learn to transform technical documentation into a public-facing visual showcase.

**任务步骤 Task Steps:**

1. **整理项目文档** (10 分钟)
   - 收集所有项目资料：照片、视频、代码片段、BOM清单、接线图
   - 撰写项目介绍文字（中英文各一段）
   - 准备 12 天学习心得

2. **创建网站** (20 分钟)
   - 最简方案：在仓库中创建 `docs/` 文件夹，编写 `index.html`
   - 推荐使用 Markdown + 静态网站生成器（VitePress / Hugo）
   - 确保包含所有必要内容模块（见下方清单）

3. **部署上线** (10 分钟)
   - 推荐 GitHub Pages：Settings → Pages → Source: `docs/` folder
   - 等待部署完成（通常 1-2 分钟）
   - 访问 URL 确认网站可正常打开

4. **提交 URL** (5 分钟)
   - 将网站 URL 提交给老师
   - URL 格式：`https://你的用户名.github.io/project-name/`

**网站内容清单 Website Content Checklist:**

- [ ] 项目介绍（名称、目标、核心功能）
- [ ] 硬件展示（BOM清单、实物照片/渲染图、接线图）
- [ ] 软件架构（系统框图、模块说明、关键代码片段）
- [ ] 演示视频或 GIF（展示键盘实际运行效果）
- [ ] 12 天学习心得与总结
- [ ] B站参考视频链接列表

---

## 课程回顾 | Course Review

### 12 天学习路径回顾 12-Day Journey

```
Day 1:  电路基础 ──── 点亮第一颗 LED
Day 2:  矩阵扫描 ──── 理解键盘如何检测按键
Day 3:  I2C 通信 ──── 驱动 OLED 屏幕
Day 4:  RGB 灯珠 ──── 控制 WS2812B
        ──────── 第一阶段完成：面包板原型工作 ────────
Day 5:  EDA 工具 ──── 学会使用嘉立创 EDA
Day 6:  原理图   ──── 绘制完整键盘电路图
Day 7:  PCB 布局 ──── 设计电路板并送去打样
Day 8:  QMK 固件 ──── 编写键盘固件
        ──────── 第二阶段完成：PCB 设计 + 固件编译 ────────
Day 9:  USB HID  ──── 固件刷写，键盘被识别
Day 10: 焊接组装 ──── 将元件焊接到 PCB
Day 11: 集成调试 ──── 全功能联调与优化
Day 12: 项目展示 ──── 成果演示、Demo 网站部署与总结
        ──────── 第三阶段完成：完整产品 ────────
```

### 核心知识图谱 Knowledge Map

```
              ┌── 电路基础（欧姆定律）
              ├── GPIO 输入/输出
  电子基础 ───┤
              ├── 面包板实验
              └── 焊接技术

              ┌── 矩阵扫描（行/列扫描）
              ├── 二极管防鬼键
  键盘原理 ───┤
              ├── 消抖处理
              └── 多层键位映射

              ┌── I2C（OLED 通信）
  通信协议 ───┤── SPI（了解）
              └── USB HID（键码上报）

              ┌── 原理图绘制
  PCB 设计 ───┤── PCB 布局布线
              ├── DRC / Gerber
              └── 嘉立创打样

              ┌── QMK 架构
  固件开发 ───┤── keymap.c / config.h
              ├── RGB 灯效
              └── OLED 显示 + 编码器
```

---

## 未来拓展方向 | Future Directions

| 方向 Direction | 难度 Difficulty | 说明 Description |
|---|---|---|
| **VIA 运行时改键** | 低 | 已在 Day 9 介绍，可以深入使用 |
| **自定义 OLED 动画** | 中 | 制作像素动画、显示系统信息 |
| **更多层和宏** | 中 | 定义复杂的工作流快捷键 |
| **蓝牙无线** | 高 | 更换 nRF52840 主控，使用 ZMK 固件 |
| **分体键盘** | 高 | 设计左右两半，I2C 或串口通信 |
| **RTOS 多任务** | 高 | 使用 FreeRTOS 调度扫描、显示、灯效 |
| **PCB 艺术** | 中 | 定制阻焊颜色、丝印图案、异形板 |
| **社区开源** | 低 | 将项目开源到 GitHub，获得反馈 |

---

## 项目文档提交清单 | Submission Checklist

| 文档 Document | 状态 Status |
|---|---|
| README.md（含项目说明、接线图、使用方法） | [ ] |
| 原理图文件（嘉立创 EDA 导出） | [ ] |
| PCB 文件（含 Gerber） | [ ] |
| QMK 固件源码（keyboard.json + keymap.c + config.h + rules.mk） | [ ] |
| Day 1-12 实验报告 | [ ] |
| Week 1 & Week 2 进度汇报 | [ ] |
| 最终展示 PPT | [ ] |
| 功能演示视频（2-3 分钟） | [ ] |
| 项目展示网站 URL | [ ] |
| Git 仓库（包含完整提交历史） | [ ] |

---

## 颁奖环节 | Awards

| 奖项 Award | 标准 Criteria |
|---|---|
| **最佳技术奖** | 技术实现最完整、代码质量最高 |
| **最佳创意奖** | 设计最有创意、功能最独特 |
| **最佳展示奖** | 展示最清晰、表达最精彩 |
| **最佳协作奖** | 团队协作最好、互助最多 |
| **最佳进步奖** | 从零基础到完成作品，进步最大 |

---

## 结语 | Closing

12 天前，你可能还不知道什么是矩阵扫描、什么是 I2C。现在，你已经设计了自己的 PCB，编写了 QMK 固件，焊接了自己的键盘——这是实实在在的工程成果。

Twelve days ago, you may not have known what matrix scanning or I2C was. Now you've designed your own PCB, written QMK firmware, and soldered your own keyboard — this is a real engineering achievement.

这 12 天学到的不仅是技术，更重要的是**解决问题的方法**：面对未知的领域，如何拆解问题、查找资料、动手实验、迭代改进。这种方法论将伴随你一生。

What you've learned isn't just technology — it's the **methodology of problem-solving**: facing the unknown, breaking down problems, researching, experimenting, and iterating. This methodology will stay with you for life.

欢迎来到硬件工程的世界。你的旅程才刚刚开始。

Welcome to the world of hardware engineering. Your journey has just begun.

---

## 参考资源 | References

- [定制双旋钮单手游戏键盘 QMK RGB 热插拔 3D 打印](https://www.bilibili.com/video/BV17T4y1J7Lh/) — 成品展示参考
- [2KEY] 全铝双键宏键盘 QMK + VIA：https://www.bilibili.com/video/BV1qT411G7bf/
- QMK 社区：https://qmk.fm/
- 嘉立创开源硬件平台：https://oshwhub.com/

---

*最后更新 | Last updated: 2026-05-26*
