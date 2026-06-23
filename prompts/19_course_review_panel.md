# 课程设计评审团（体验式再审）提示词 | Course-Design Review Panel (Experiential Re-Review) Prompt

> 设立设计评审团，**再审一遍全部 9 个课程包**，看每个课程设计是否符合"夏令营=体验 + 每方面粗糙了解"的要求（不是每方面深学）。参考 `example_course_course_work/` 的课程设计结构，但**难度调到体验式、不深**；评审语言**平实、不官话**。执行 agent 自由设计 ultracode 动态 workflow 跑评审团。
> A design review panel re-reviews all 9 course-packs against an *experiential* bar (rough hands-on breadth, not deep mastery). Reference `example_course_course_work/` structure but tune depth down; plain-language review (no bureaucratic tone). Agent freely designs the ultracode dynamic workflow.

---

## 一、任务核心 | Mission Core

**一句话**：拉一个评审团，把 9 个课程设计挨个细评一遍——**符不符合"夏令营体验式、每方面粗略了解、不深学"的要求**。参考 `example_course_course_work/` 的课程设计套路（结构 DNA 借鉴），但难度别那么高；评审写得**平实点，别官话**。改课程就走子模块工作流。

**用户原话定调**：
- "设立评审团再评审一遍课程" → 9 个课程包再审一次
- "不要写的太官话" → 评审/课程都**平实**，别学术腔/官腔
- "多多参考 `example_course_course_work` 文件夹下的课程设计" → 借它的结构/方法论
- "不用这么难，夏令营以体验和每一个方面的粗糙了解为主（而不是每个方面都要深入的学习到东西）" → **体验式 bar，不是深度 mastery**；每个方面"摸过、能说个大概"就够，别每样都深挖
- "设立设计评审团，细致评判每一个课程和课程设计，看看是否符合要求" → 每个课程细评 + 判是否达标
- "自由使用工具/skills/plugin，也让执行 agent 自由使用，自由设计 ultracode 动态 workflow" → 全权 + Workflow 自由编排评审团

> 🔗 **范围**：9 个课程包（`project-01..09-*/` 子模块：README/curriculum/hardware/software/assignments）+ 网站 `content/projects.ts` 一致性（次要）。**只评审+改课程内容/教法，不动网站视觉/动效/路由**（那些有别的 prompt 管）。

---

## 二、评审标准（体验式 bar，不是深度）| Review Bar

**这不是 ESE5160 研究生课，是高中夏令营。bar 是"体验 + 粗略了解"，不是"深学每一样"。** 评审团按下面判，**别用学术 100 分制官话**，用平实的"达标/要改/不达标 + 说人话的发现"：

1. **体验度（最重点）**——每个方面（硬件/软件/系统/调试/展示）学生有没有**真上手摸过**？是"做过一遍有感觉"，不是"纸上懂理论"。课程是否给了动手的脚手架（模板代码、分步引导、能跑的示例），让零基础能跟下来？
2. **难度适切**——有没有**过深**？（如 ZYNQ/FPGA、多语言栈 Unity+C#+OpenCV+Python、寄存器级、完整 PCB 制造——对夏令营太重）。过深的要**简化到体验档**：用开发板+模块代替全 PCB、用 API 层代替寄存器、跟教程跑通代替从零设计。
3. **粗糙广度 vs 深度**——每个方面**浅尝辄止**即可，别在一个点上深挖到大学大二。能说"这是什么、为什么这么选、我跑通了"就够，不要求精通。
4. **语言平实**——课程文案/作业**说人话**，别学术腔/官腔/堆术语。有日常类比最好（参考 example 的"Why This Matters + 类比"）。发现官话连篇的，标出来改。
5. **结构（借鉴 example，但简化）**——参考 `example_course_course_work/ABSTRACTED_DESIGN_METHODOLOGY.md` 的好 DNA：作业 pipeline（上一个是下一个的输入）、Learning Outcomes/Why This Matters/Comprehension Check/任务⭐难度/Rubric 模板、"对话式理解"（能说清为什么 > 做得多完美）。**但作业量/深度按体验档裁**，别照搬 ESE5160 的 12+ 份研究生作业量。
6. **约束合规**——硬件 <¥500/套、10-20 天、双语（中为主英辅助）、基于真实开源/视频、MVP 可在夏令营完成、笨鸟先飞（讲 why 不止 how）。

> **判级（平实）**：✅ 达标（体验式 bar 过）/ ⚠️ 要改（指出哪儿过深/官话/缺体验 + 怎么改）/ ❌ 不达标（明显跑偏，如纯理论无动手、或深到大学课）。不用打 100 分。

---

## 三、参照物 | References

- **`example_course_course_work/ABSTRACTED_DESIGN_METHODOLOGY.md`**——课程设计方法论（5 阶段、渐进脚手架、三层知识深度、ESE5160→高中生适配策略§6、"对话式理解"§6.3）。**借鉴结构，深度再往下调到"体验档"**。
- **`example_course_course_work/ASSIGNMENT_DESIGN_STANDARD.md`**——作业设计标准 + 评审清单（结构/深度/链条/适配）。**参考清单思路，但 bar 换成体验式、语言平实**。
- **`example_course_course_work/REVIEW_REPORT.md`**——旧评审（2026-06-16，100 分制，P07=97…P01/02/04/05=86）。**作参考但用新 experiential bar 重判**；注意旧评 86-97 偏高（用的是深度 bar），新 bar 下过深的反而要降分。
- **`example_course_course_work/group/`、`personal/`**——ESE5160 原作业样例（看结构/写法，**不学深度**）。
- **重要变化**：Project 02 自旧评审后**已改为 STM32L433 WiFi 温湿度网络时钟**（原 ESP32 air-quality，见 prompt 17 已执行），须按新内容重审。

---

## 四、评审团设计（agent 自由设计 ultracode workflow）| Panel Design

**执行 agent 自由设计 ultracode 动态 workflow（用 Workflow 工具）跑评审团。** 下面是建议形状，agent 可改：

- **多法官并行**（每位一个视角，评全部 9 个课程）：
  - **J1 体验法官**：每个方面真上手了吗？脚手架够吗？零基础跟得下来吗？（最重）
  - **J2 难度法官**：哪儿过深了？该简化到体验档的列出来
  - **J3 语言法官**：哪儿官话/学术腔？日常类比够不够？标出来改
  - **J4 结构法官**：pipeline/作业模板/Comprehension Check 借 example 了吗？作业量是否裁到体验档？
  - **J5 约束法官**：<¥500/10-20 天/双语/开源/MVP/笨鸟先飞 合规吗？
- **每课程产出**：✅/⚠️/❌ 判级 + 平实发现 + 具体改法（哪份文件、哪段、怎么改）
- **综合**：每课程总判（达标/要改/不达标）+ 跨课程共性问题
- **失败课程修+复审**（可选轻循环）：⚠️/❌ 的课程 → agent 按评审改（简化/去官话/补体验）→ 复审 → 达标为止（最多 3 轮）

> workflow 形状（agent 自由定）：可按"5 法官 × 9 课程 = 45 评"并行 → 综合；或按课程分 9 路每路 5 法官。agent 用 Workflow 工具编排，**自由设计**。

---

## 五、评审对象 | What's Reviewed

每个课程包（子模块）：
- `README.md`（项目概述/技术栈/开源出处/难度时长）
- `curriculum/`（overview/prerequisites/day-XX 教案/assignments/grading-rubric）
- `hardware/`（BOM/接线/装配/排错）
- `software/`（src/ 真实代码/config/tests）
- `assignments/`（周报/最终展示/评分量规）
- 网站 `content/projects.ts` 对应条目（标题/技能/硬件/时间线/链接 与课程包一致否——次要核对）

**9 个课程**：01 binocular-thermal-imager / 02 env-monitor(STM32L433 时钟，新) / 03 4mode-keyboard / 04 pocket-oscilloscope / 05 desktop-pet / 06 weather-cube / 07 bipedal-robot / 08 electronbot / 09 desk-satellite。

---

## 六、改课程 + 子模块工作流 | Fixes & Submodule Workflow

评审出要改的（过深/官话/缺体验/约束违例）→ agent 改课程包：
- **子模块内**改 → `cd project-NN-* && git add -A && git commit -m "review: simplify to experiential bar / de-jargon / add hands-on" && git push origin main`
- **父仓库** bump 指针 → `git add project-NN-* && git commit -m "chore: bump project-NN submodule (review fixes)"`
- `content/projects.ts` 若与改后课程不一致，同步（仅该条目）
- **不破坏已有正确内容**——只改评审指出的过深/官话/缺体验处，别推倒重来
- 改完复审（J1-J5 重评该课程）→ 达标为止（最多 3 轮）

---

## 七、约束 | Constraints

- **bar 是体验式**：每方面粗略了解、上手摸过、能说个大概为什么；**不深学**、不每样精通
- **平实不官话**：评审输出 + 课程文案都说人话
- **借 example 结构、不学深度**：pipeline/作业模板/Comprehension Check/类比借鉴；作业量裁到体验档
- **保持**：双语；<¥500；10-20 天；开源基础；MVP 可完成；笨鸟先飞
- **不动**：网站视觉/动效/路由/其它 section（只评审+改课程内容）
- **不破坏**：已有正确内容只改评审指出处
- **产物一律 `verify/course-review/`**；最终评审报告也放一份到 `example_course_course_work/REVIEW_REPORT_V2.md`（接旧报告）

---

## 八、验证 | Verification

- 评审报告：每课程 ✅/⚠️/❌ + 平实发现 + 改法 → `verify/course-review/review.md`
- 改后课程抽样核对：抽 2-3 个改过的课程，读改后 README/curriculum/assignments，确认过深已简化、官话已改、体验补上
- 复审：改后 J1-J5 重评达标
- `gstack-design-review`（可选）：对改后课程文案做"设计师之眼"审（平实度/可读性）
- 跨课程共性问题 + 改进优先级

---

## 九、工具 / 技能 / MCP / ultracode 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**、**自由设计 ultracode 动态 workflow（Workflow 工具）**，**无需逐项请示**：

### 🤖 ultracode 动态 workflow（评审团编排）
- **Workflow 工具**：自由设计评审团 workflow——5 法官 × 9 课程并行评 → 综合 → 失败课程改 + 复审循环。agent 自定形状/轮数/并发
- **Agent fan-out**：Explore（读 9 课程包 + example 文件夹）、评审法官（每位一视角）、frontend-dev/backend-dev（改课程包）、QA（复审 + 一致性）

### 📚 参考 / 研究
- **Read**：`example_course_course_work/` 全部（方法论/标准/旧报告/作业样例）+ 9 课程包
- **deep-research** / **WebSearch**：若需，查体验式硬件教学/夏令营课程设计的平实范式

### 🎨 审查
- **gstack-design-consultation** / **gstack-design-review**：课程结构 + 平实度审查
- **code-review** / **gstack-review**：改后课程 diff 自审

### 🛠 验证
- **MCP `node_repl`**：批量读课程文件、统计作业量/CC题数/约束合规、生成评审表
- **Bash `git`**：子模块 commit+push、父仓库 bump
- **verify** / **run**：本地起站核对 `content/projects.ts` 与课程一致

### 📸 归档（`verify/course-review/`）
- `review.md`（9 课程评审 + 跨课程共性 + 改进优先级）、`per-course/<slug>.md`（每课程细评）、`fixes.md`（改了什么）、`SUMMARY.md`；最终报告副本 → `example_course_course_work/REVIEW_REPORT_V2.md`

> **核心原则**：体验式 bar（不深）；平实不官话；借 example 结构不学深度；评审团 ultracode 自由编排；改课程走子模块；不破坏已有正确内容。

---

## 十、执行阶段 | Execution Phases

### Phase 0：读参考 + 读 9 课程
1. Read `example_course_course_work/`（方法论/标准/旧报告/作业样例）
2. Read 9 课程包（README/curriculum/hardware/software/assignments）+ `content/projects.ts`
3. 产出"体验式 bar 评审清单"（基于本提示词 §2，平实版）
**验收**：参考 + 课程已读、评审清单产出

### Phase 1：评审团并行评审（ultracode workflow）
- Workflow 工具跑 5 法官 × 9 课程并行评 → 每课程 ✅/⚠️/❌ + 平实发现 + 改法
- 综合：跨课程共性问题 + 改进优先级
**验收**：`review.md` + 每课程细评产出

### Phase 2：改失败课程 + 复审
- ⚠️/❌ 课程按评审改（简化过深/去官话/补体验/约束修正）→ 子模块 commit+push + 父仓库 bump
- 复审改后课程 → 达标为止（最多 3 轮）
**验收**：改后课程复审达标

### Phase 3：QA & 汇报
- 抽样核对改后课程 + `content/projects.ts` 一致 + `gstack-design-review`
- `verify/course-review/SUMMARY.md` + `example_course_course_work/REVIEW_REPORT_V2.md`
- 9 课程最终判级表 + 共性问题 + 已改/待改清单 + 已知遗留

---

## 十一、质量红线 | Quality Gates

1. ❌ 评审用深度 bar（把"过深"当优点）——应体验式 bar
2. ❌ 评审/课程官话连篇（学术腔、堆术语、100 分制官话）
3. ❌ 课程仍过深（ZYNQ/多语言栈/寄存器级/全 PCB 未简化到体验档）
4. ❌ 课程缺动手体验（纯理论、无脚手架、零基础跟不下来）
5. ❌ 改课程破坏了已有正确内容 / 推倒重来
6. ❌ 约束违例未修（>¥500 / 不在 10-20 天 / 非双语 / 非开源基础）
7. ❌ 子模块未 commit+push / 父仓库未 bump
8. ❌ 动了网站视觉/动效/路由（超出课程内容范围）
9. ❌ 没出真机... 不适用；改为：没出最终评审报告（`review.md` + `REVIEW_REPORT_V2.md`）

---

## 十二、执行指令 | Execution Order

1. Read `example_course_course_work/` + 9 课程包 + `content/projects.ts`
2. 产出"体验式 bar 评审清单"（平实版）
3. **自由设计 ultracode workflow**（Workflow 工具）跑评审团：5 法官 × 9 课程并行 → 综合
4. 按 Phase 0→3 执行；失败课程改 + 复审（最多 3 轮）
5. 改课程走子模块工作流（commit+push + bump）
6. 交付 `verify/course-review/SUMMARY.md` + `example_course_course_work/REVIEW_REPORT_V2.md`

> **Agent 完全授权声明**：可自主调用"九、工具/技能/MCP/ultracode 自主授权"中全部技能、MCP、插件、子 Agent 与 Workflow 工具，**自由设计 ultracode 动态 workflow**，无需逐一请示。第一优先级：**体验式 bar（不深）+ 平实不官话 + 评审团细评 9 课程 + 改失败课程到达标**；借 example 结构不学深度；改课程走子模块；不破坏已有正确内容。

---

*核心理念：夏令营=体验+粗糙了解，不是深学；评审团用 ultracode 自由编排；借 example_course_course_work 的结构 DNA、深度调到体验档；平实说人话；改课程走子模块。*
