# 落地评审修复 + 关掉 3 个残留 提示词 | Land Review Fixes + Close 3 Residuals Prompt
<!-- 注：价格信息已注释隐藏（查价不准确，仅作参考不严谨）/ Note: price info commented out (inaccurate, not rigorous as reference) -->

> 上轮评审团（prompt 19）已让 9/9 课程达体验式 bar，但有两件事没收尾：① **落地**（父仓库 2 commits 未 push + 网站未部署，projects.ts 改动没上线）；② **3 个诚实残留**（P08 软件是 Python 模拟桩—违背"上手体验"bar；P03 改了 24 文件 day-XX 未逐篇连贯复核；P04 无本地 .v 脚手架只指向 TinyAWG）。本轮：先落地，再关残留，再复核。
> Last round's review got 9/9 to the experiential bar. Two things left: (1) LAND (push parent's 2 unpushed commits + deploy site so projects.ts goes live); (2) CLOSE 3 residuals (P08 software is a Python mock stub — undermines hands-on bar; P03 24 changed files not coherence-re-read; P04 no local .v scaffolding, points to TinyAWG). This round: land first, close residuals, re-verify.

---

## 一、任务核心 | Mission Core

**一句话**：把上轮评审修复**落地到线上**（push + 部署），再**关掉 3 个残留**（P08 真软件替代模拟桩、P03 day-XX 连贯复核、P04 本地 .v 脚手架），最后**复核这 3 课**仍达体验式 bar。

**上轮交接要点（现状）**：
- 9/9 课程达体验式 bar，3 个原 ❌（P03/P04/P08）全升 ✅
- 评审产物：`verify/course-review/`（review.md + per-course/×9 + verdicts_data.json + fixes.md + SUMMARY.md + checklist.md）+ `example_course_course_work/REVIEW_REPORT_V2.md`
- 9 课程包子模块已 commit+push；`projects.ts` + `CLAUDE.md` 已同步到课程包真值（6 条目 + 5 单元格）
- **父仓库 2 commits 未 push**：`fb86eb0`（评审）+ `9bb345d`（P04 bump）
- **网站未部署**：build 已过、`.output/public` 是新的，但没拷进 `docs/`
- **3 个诚实残留**（低优先，但 P08 违背 bar）：
  - P08 ElectronBot：software 是 **Python 模拟桩**（非真实可跑）；Unity/OpenPose 已标 stretch，Python 主线 60 处、HAL prereq 13 vs 寄存器 1
  - P03 4mode-keyboard：改了 **24 个文件**，逐日 day-XX 连贯性**未逐篇 full re-read**（主线 README/overview 已验）
  - P04 pocket-oscilloscope：iCE40/Verilog 主线（Yosys/nextpnr 66 处，ZYNQ 0），但**无本地 .v 脚手架**，指向开源 TinyAWG

> 🔗 **范围**：落地（push + docs/ 部署）+ P03/P04/P08 三个子模块的残留修复 + 复核。**不动其它 6 课程、不动网站视觉/动效/路由**。

---

## 二、第一步：落地当前工作 | Land Current Work

1. **核对 git 状态**：`git log origin/master..HEAD` 确认 `fb86eb0` + `9bb345d` 未 push；子模块是否都已 push
2. **push 父仓库**：`git push origin master`（让评审修复 + projects.ts 同步落到远程）
3. **部署网站**（让 projects.ts 改动上线）：
   - `cd website && npm run build`（确认 build 过；上轮已过，复核）
   - 把 `website/.output/public` 内容拷进仓库根 `docs/`（**保留 `.nojekyll`**）
   - `git add docs/ && git commit -m "build: regenerate static export (course review projects.ts sync)" && git push`
   - 核对 `https://jojojjjjj.github.io/summer-hardware-projects/` 上线（项目详情页/projects.ts 改动已生效）
4. 若 push/部署权限或冲突问题 → 记 `verify/land/` 并按 CLAUDE.md 处理；不要强推

> 落地后，即使后续残留不修，上轮评审成果也已上线。这是收尾的最低底线。

---

## 三、第二步：关掉 3 个残留 | Close 3 Residuals

### 3.1 P08 ElectronBot — 真软件替代模拟桩（优先，违背 bar）

**问题**：software 是 **Python 模拟桩**，学生没法真上手——违背体验式 bar 的"动手体验"核心。

**修法**（按 ElectronBot 实际架构 + 体验档）：
- ElectronBot = STM32F411 + Unity + OpenCV 机器人（peng-zhihui 原项目）。体验档已把 Unity/OpenPose 标 stretch
- 提供一个**真实可跑的主线子集**（非桩）：
  - **STM32 固件**（C/HAL）：基础 servo 头部转动 + LCD 表情显示 + USB CDC 串口指令控制（能编译、能烧录、能跑）——这是学生能真上手的最小可玩集
  - **PC 控制**：Python 串口脚本发指令控制头部/表情（替代 Unity 的简化版，真实可跑，非 mock）
  - Unity/OpenCV（人脸跟踪/表情识别）保持 stretch，给清晰"想深入怎么扩展"的指引
- `software/src/` 用**真实代码**（可编译烧录的固件 + 可跑的 Python 控制），删/标 mock 桩；`README`/`curriculum` 对应更新（教学生烧录+跑通这个子集）
- **不破坏**已修的 stretch 标记；保持 <!-- <¥500 -->、双语、开源基础（指向 peng-zhihui/ElectronBot）

### 3.2 P03 4mode-keyboard — day-XX 连贯性逐篇复核

**问题**：改了 24 个文件，逐日 day-XX 连贯性没逐篇 full re-read，可能有矛盾/断链。

**修法**：
- 逐篇 re-read `curriculum/day-01.md`…`day-12.md`（24 改动文件含 day-XX）
- 查：pipeline 连续性（上一天输出 = 下一天输入）、术语/参数一致、FOC/音频/语音"可选进阶"标记一致、主线成本 <!-- ~¥414 --> 不破、无互相矛盾或断链
- 修发现的矛盾/断链；记 `verify/course-review/p03-coherence.md`（逐篇核对结果 + 修正）
- **不破坏**已修内容，只补连贯

### 3.3 P04 pocket-oscilloscope — 本地 .v Verilog 脚手架

**问题**：iCE40/Verilog 是主线（Yosys/nextpnr 66 处），但仓库**无本地 .v 脚手架**，只指向开源 TinyAWG——学生上手缺落脚点。

**修法**（二选一，优先 A）：
- **A. 本地最小 .v 脚手架**：在 `software/` 加一个基础可综合的 Verilog 例程（如 LED 闪烁/分频/简单 PWM），配 Yosys+nextpnr-iCE40 构建步骤（能 `yosys`+`nextpnr`+`icepack` 生成 .bit 烧到 iCE40），让学生真上手 Verilog 工具链
- **B. 清晰 fetch+build 指引**：若 A 太重，给 TinyAWG 的 step-by-step 拉取+构建+烧录指南（具体命令、预期产出、验证方法），让零基础能跟下来跑通
- `README`/`curriculum` 对应更新；不破坏 iCE40 主线/ZYNQ 0 的已修状态

> 三个残留都走**子模块工作流**（子模块内 commit+push + 父仓库 bump）。不破坏上轮已修的正确内容。

---

## 四、第三步：复核 P03/P04/P08 仍达体验式 bar | Re-verify

- 用上轮评审团的 **J1 体验度**（最重点）+ J2 难度 + J5 约束，重评这 3 课：
  - P08：软件是真上手（固件可烧+Python 可跑），不是桩 → J1 过
  - P03：24 文件连贯性复核过，无矛盾/断链 → J4 结构过
  - P04：本地 .v 脚手架或清晰指引，学生能上手 Verilog → J1 过
- 产出 `verify/course-review/residuals-reverify.md`：3 课复核判级（✅/⚠️/❌）+ 证据
- 若仍有 ⚠️/❌ → 再修 + 复审（最多 2 轮）

---

## 五、第四步：落地残留修复 | Land Residual Fixes

- P03/P04/P08 子模块 commit+push + 父仓库 bump 指针（3 个 bump commits）
- `projects.ts` 若因 P08 软件方向微调需同步 → 改对应条目（仅 08）
- 若 `projects.ts` 变了 → 重新 `npm run build` + 拷 `docs/` + commit + push（再次部署）
- 若 `projects.ts` 没变 → 残留修复在子模块内，网站无需重新部署（课程包不影响网站）

---

## 六、约束 | Constraints

- **体验式 bar**：真上手、粗糙了解、不深学（延续 prompt 19）；P08 软件必须真可跑（非桩）
- **平实不官话**：改后课程文案说人话
- **不破坏**：上轮已修的正确内容只增补/修正，不推倒重来
- **保持**：双语；<!-- <¥500 -->；10-20 天；开源基础；MVP 可完成；笨鸟先飞
- **子模块工作流**：子模块内 commit+push + 父仓库 bump
- **不动**：其它 6 课程、网站视觉/动效/路由
- **产物一律 `verify/land/` + `verify/course-review/`**

---

## 七、工具 / 技能 / MCP / ultracode 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**、**自由设计 ultracode 动态 workflow**，**无需逐项请示**：

### 🤖 子 Agent / 编排
- **Agent fan-out**：Explore（核对 git 状态 + 读 P03/P04/P08 现状）、backend-dev（P08 真固件+Python 控制、P04 .v 脚手架）、tech-writer（P03 连贯复核+修）、QA（复核 + 部署验证）
- **Workflow 工具**（可选 ultracode）：3 课残留修复 + 复审可并行编排

### 📚 参考
- **Read**：`verify/course-review/`（上轮评审）+ `example_course_course_work/REVIEW_REPORT_V2.md` + P03/P04/P08 课程包 + peng-zhihui/ElectronBot（P08 真架构）
- **deep-research** / **WebSearch**：ElectronBot 固件架构、iCE40/Yosys 最小例程、TinyAWG 构建步骤

### 🛠 落地 / 验证
- **Bash `git`**：push 父仓库、子模块 commit+push、bump、`docs/` 部署
- **Bash `npm run build`**：网站构建
- **MCP `node_repl`**：批量读 day-XX 核连贯、统计 P08 软件 mock vs real、生成复核表
- **browser-harness**：核对线上 `jojojjjjj.github.io` 部署生效
- **verify** / **run**：本地起站

### 🎨 审查
- **gstack-design-review** / **code-review**：改后课程 + diff 自审

### 📸 归档（`verify/land/` + `verify/course-review/`）
- `land.md`（push + 部署记录）、`p03-coherence.md`、`residuals-reverify.md`、`SUMMARY.md`

> **核心原则**：先落地（上轮成果上线）；P08 真软件非桩（体验 bar 核心）；P03 连贯复核；P04 .v 脚手架；不破坏已修；子模块工作流。

---

## 八、执行阶段 | Execution Phases

### Phase 0：核对状态 + 落地
1. `git log origin/master..HEAD` 核对未 push commits（fb86eb0+9bb345d）；子模块 push 状态
2. `git push origin master`；`npm run build` → 拷 `docs/`（保 `.nojekyll`）→ commit → push
3. browser-harness 核对线上部署生效
**验收**：上轮评审修复 + projects.ts 上线

### Phase 1：关 P08 残留（优先）
- P08 software：Python 桩 → 真实可跑固件（C/HAL servo+LCD+USB CDC）+ Python 串口控制；Unity/OpenCV 保持 stretch
- README/curriculum 更新（烧录+跑通子集）；子模块 commit+push
**验收**：P08 软件真可跑（非桩），J1 体验度过

### Phase 2：关 P03 + P04 残留
- P03：逐篇 re-read day-01..12，修矛盾/断链；记 `p03-coherence.md`
- P04：本地最小 .v 脚手架（Yosys+nextpnr 可构建）或清晰 TinyAWG fetch+build 指引
- 子模块 commit+push
**验收**：P03 连贯过、P04 .v 上手点过

### Phase 3：复核 + 落地残留
- J1/J2/J4/J5 重评 P03/P04/P08 → `residuals-reverify.md`（全 ✅ 或再修最多 2 轮）
- 父仓库 bump 3 子模块指针；projects.ts 若变（P08）→ 重新 build+部署
**验收**：3 课复核达标 + 残留修复落地

### Phase 4：汇报
- `verify/land/SUMMARY.md` + `verify/course-review/residuals-reverify.md`
- 落地状态（push/部署）、3 残留修法、复核判级、已知遗留

---

## 九、质量红线 | Quality Gates

1. ❌ 上轮评审修复未上线（父仓库未 push 或 docs/ 未部署）——**最低底线**
2. ❌ P08 软件仍是 Python 模拟桩（违背体验式 hands-on bar）
3. ❌ P03 day-XX 仍有矛盾/断链未修
4. ❌ P04 既无本地 .v 脚手架、也无清晰 fetch+build 指引
5. ❌ 改课程破坏了上轮已修的正确内容
6. ❌ 约束违例（<!-- >¥500 --> / 不在 10-20 天 / 非双语 / 非开源基础）
7. ❌ 子模块未 commit+push / 父仓库未 bump
8. ❌ 动了其它 6 课程 / 网站视觉/动效/路由
9. ❌ `npm run build` 失败 / 部署后线上未生效

---

## 十、执行指令 | Execution Order

1. 核对 git 状态；`git push origin master`；`npm run build` → 拷 `docs/` → commit → push；核对线上
2. **fan-out** P08 真软件 + P03 连贯复核 + P04 .v 脚手架（并发，互不重叠子模块）
3. 按 Phase 0→4 执行
4. 复核 P03/P04/P08 体验式 bar（J1 真上手非桩）
5. 子模块 commit+push + 父仓库 bump；projects.ts 若变重新部署
6. 交付 `verify/land/SUMMARY.md` + `verify/course-review/residuals-reverify.md`

> **Agent 完全授权声明**：可自主调用"七、工具/技能/MCP/ultracode 自主授权"中全部技能、MCP、插件、子 Agent 与 Workflow 工具，**自由设计 ultracode 动态 workflow**，无需逐一请示。第一优先级：**先落地（上轮成果上线）**；第二：**P08 真软件非桩**（体验 bar 核心）；P03 连贯、P04 .v 脚手架；不破坏已修；子模块工作流。

---

*核心理念：先让上轮评审成果上线；再关 3 个残留（P08 真软件是 bar 核心、P03 连贯、P04 脚手架）；复核 + 落地；不破坏已修；子模块工作流。*
