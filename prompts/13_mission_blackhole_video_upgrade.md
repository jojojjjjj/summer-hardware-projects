# 「从代码到硬件」使命段升级提示词 V9 | Mission-Section Black-Hole & Video Upgrade Prompt V9

> 本文件**只升级 `MissionSection.vue` 这一个 section**（`<section id="mission">`，h2「从代码到硬件」，使命·MISSION）：把静态黑洞背景换成**动态黑洞**、把右侧视频占位换成**真实视频**、替换内部文案为指定诗+专业英文翻译。**其它一切锁死。评审团 >8.8 才汇报。**
> Upgrade ONLY `MissionSection.vue`: static black hole → dynamic, fill the video placeholder, replace the copy with a provided poem + professional EN translation. Everything else FROZEN. Jury >8.8 before reporting.

---

## 一、任务核心 | Mission Core

**一句话**：只改 `components/MissionSection.vue`——① 静态黑洞图 → **动态黑洞**；② 右侧「未来视频占位」`src=""` → **真实视频**（自己的或参考稿里下载分析的）；③ 文案换成用户给的诗 + **专业级英文翻译**。评审团 >8.8 才汇报。

**用户原话定调**：
- "要限制死只升级这个界面" → **只改 `MissionSection.vue`**，其它锁死
- "把静态换成动态的黑洞" → 背景 `blackhole-code.jpg` 静态图 → 动态黑洞（视频/程序化动画）
- "把这个未来视频占位也换成当前我自己的视频，或者 `prompts\网页效果提示词` 下的视频（下载后用视觉 MCP 分析，把合适的弄上去）" → 右侧 `src=""` 占位 → 自己的视频 或 参考稿视频（下载+vision 分析择优）
- "修改内部文字" + "专业级别的英文翻译" → 替换 `missionCn`/`missionEn`
- "还是都要设立评审团" → **5 评审团 >8.8 循环**

> 🔗 **范围**：本轮**只动 `MissionSection.vue`**（+ 其专用子组件/composable + `public/media/` 媒体入库）。前半段、`JackServices`、`Projects`、`CtaSection` 等所有其它 section **锁死零变更**。

---

## 二、🔒 锁死范围（最高红线）| FROZEN Scope

**以下一律不得修改（零变更）：**

| 锁死对象 | 文件 |
|---|---|
| 除 Mission 外的所有 section | `AppNavbar.vue`、`HeroSection.vue`、`HeroArtifact.vue`、`ConstellationPoster.vue`、`jack/*`（全部）、`ClockVideoBand.vue`、`ProjectsSection.vue`、`ProjectCard.vue`、`CtaSection.vue`、`AppFooter.vue`、所有 `SectionBridge` 实例 |
| 全局基底 | `assets/css/main.css` 既有 token/类、`tailwind.config.ts` 既有配色（可新增仅供 `MissionSection` 的局部类/变量，不得影响其它） |
| `pages/index.vue` | 不改 section 顺序/桥接（`MissionSection` 位置不动） |

**唯一允许编辑**：`components/MissionSection.vue`（+ 新建仅供它用的子组件/composable）+ `public/media/` 媒体入库（新增文件，不改其它 section）。

> Agent 须 `git diff` 核对：除 `MissionSection.vue`（+ 新子组件 + `public/media/` 新文件）外，**无任何其它文件变更**。

---

## 三、现状（Agent 必读，已核对）| Current State

`MissionSection.vue` 现状：
- **背景**：`<MediaSlot mode="static" poster="/media/blackhole-code.jpg" overlay-class="...from-background/80 via-background/65 to-background/90" />` —— **静态黑洞图**（代码涌入奇点），压暗作底
- **左栏**：eyebrow「使命 · MISSION」+ h2「从代码到硬件」(`WordsPullUp`) + `JackAnimatedText` 逐字滚动揭示 `missionCn` + 小字 `missionEn`
  - 现 `missionCn`：『每一件伟大的硬件，都始于一行代码。最好的学习，是亲手把想法变成现实——从焊盘上的第一滴锡，到屏幕上亮起的第一行字。』
  - 现 `missionEn`：『Every great piece of hardware begins with a line of code. The best learning is making ideas real with your own hands — from the first bead of solder on the pad to the first line lighting up the screen.』
- **右栏**（桌面）：`<MediaSlot mode="bg-autoplay" poster="/media/gears-flow.webp" src="" />` —— **视频占位**（空 src，显 gears 海报，标「未来视频占位 · future video slot」，TODO「drop flowing-gears video at /media/gears-flow.mp4」）

> 注：用户称本 section 为「从硬件到代码」，实际 h2 是「从代码到硬件」。**保留现有 h2「从代码到硬件」**（用户未要求改标题，只改正文+媒体）；如新诗与标题明显冲突，agent 可在 `MissionSection` 内微调标题措辞，但不改 section 定位。

---

## 四、动态黑洞 | Dynamic Black Hole

把背景 `mode="static" poster="/media/blackhole-code.jpg"` 换成**动态黑洞**。`gstack-design-shotgun` 出方案对比：

| 方案 | 说明 | 推荐 |
|---|---|---|
| **A. 黑洞视频背景** ⭐ | 用用户自己的黑洞视频 `D:\教书\艺术设计图片\视频\黑洞代码去水印.mkv` → 转 mp4 → `/media/blackhole-code.mp4`，`MediaSlot mode="bg-autoplay" :src`，压暗 overlay 保文字可读；海报 `blackhole-code.jpg` | **首选**（真实素材、省事、动态） |
| B. 程序化动态黑洞 | Canvas/`ShaderMaterial` 画旋转吸积盘 + 引力透镜（纯代码，无视频） | 备选（更"动态"/可交互，但工程量大） |
| C. 混合 | 黑洞视频底 + 程序化光晕/粒子叠加 | 可选增强 |

- **mkv→mp4 转码**：`ffmpeg -i 黑洞代码去水印.mkv -c:v libx264 -crf 23 -preset medium -c:a aac -vf scale=-2:1080 /media/blackhole-code.mp4`（≤10Mbps）；**禁止 .mkv 上线**
- **降级**：reduced-motion / 移动端 / 视频加载失败 → 静态海报 `blackhole-code.jpg`（`MediaSlot` 已处理）
- **压暗**：overlay 渐变保左栏文字可读（黑洞视频不能抢戏）
- **懒加载**：`MediaSlot` IO 进视口才 play，离开 pause

---

## 五、视频占位填充 | Fill the Video Placeholder

右栏 `src=""` 占位 → 填真实视频。**候选 + vision 分析择优**：

### 5.1 候选视频

**用户自己的视频**（`D:\教书\艺术设计图片\视频\`，无授权问题，优先考虑）：
- `机械齿轮塔视频生成.mkv` → `/media/gears-tower.mp4`（**最贴**——占位本就是"flowing-gears"，齿轮=硬件）
- `代码河-超分.mkv` → `/media/code-river.mp4`（代码河=软件，呼应"从代码到硬件"）
- `钟表运动去水印.mp4` → `/media/clock-motion.mp4`
- `彩虹月亮运动-超分.mkv` → `/media/rainbow-moon.mp4`

**参考稿视频**（`prompts/网页效果提示词/` 里的 URL，下载后 vision 分析；⚠️ 非 用户资产，授权同 prompt 10——用现在，正式上线前换自有/授权视频）：
- Aetheris：`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4`、`.../hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4`（宇宙航行——主题契合黑洞/代码）
- Prisma：`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4`、`.../hf_20260406_133058_0504132a-0cf3-4250-a370-8ea3b05c95d4.mp4`
- Mainframe：`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4`（⚠️ Hero 已用，避免重复）
- Neo Museum：`https://res.cloudinary.com/dsdxaxkiz/video/upload/v1779624998/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4`

### 5.2 择优流程（必须用 vision MCP）

1. 下载候选视频（自己的 mkv 先转 mp4；参考稿 curl 下载）到临时目录
2. **抽帧**（ffmpeg 每 1s 一帧，或取 3–5 个代表帧）
3. **MCP `vision` (`describe_image`)** 分析每段视频：内容、色调、动态、是否契合"从代码到硬件/黑洞/使命"主题、是否与暗色冷靛蓝站风和谐
4. 选**最契合主题 + 最和谐**的 1 段；优先用户自有视频（无授权风险）
5. 入库到 `/media/`（如 `/media/mission-right.mp4`），填 `MissionSection` 右栏 `:src`
6. 记决策到 `verify/mission/decisions.md`（候选分析、择优理由、授权状态）

- **降级**：reduced-motion/移动端 → 海报（`gears-flow.webp` 或该视频抽帧海报）
- **懒加载**：IO 进视口才 play；桌面才放视频（右栏本就 `hidden lg:block`）

---

## 六、文案替换 | Copy Replacement

### 6.1 中文（替换 `missionCn`，保留诗的行结构）

```
伟大的硬件，萌芽于第一行代码；
真正的成长，始于亲手把想象焊进现实。
锡尖跃动，是电路板上最初的脉搏；
字符点亮，是屏幕深处第一次呼吸。
——从这里，从此刻，从你的双手开始。
```

- **保留分行**：4 句（两句一对）+ 破折号收束句。不要压成一段
- 渲染：可继续用 `JackAnimatedText` 逐字滚动揭示，但**按行**排版（每句一行或两句一组）；破折号收束句单独一行、可略弱字号/缩进
- 保留 `eyebrow`「使命 · MISSION」与 h2「从代码到硬件」

### 6.2 英文（替换 `missionEn`，专业级翻译）

参考译稿（agent 须打磨到**专业/诗意**级，保持对仗与节奏、技术词准确：solder=焊、solder tip=锡尖、pulse=脉搏、breath=呼吸）：

```
Great hardware sprouts from a single line of code;
true growth begins when you solder imagination into reality.
The dancing solder tip — the first pulse along the circuit board;
a character alight — the first breath from deep within the screen.
—From here, from this moment, from your own two hands, it begins.
```

- agent 可在此基础上润色（词采、节奏、对仗），但**不得偏离原意**、不得丢句
- 与中文**逐句对应**；排版同中文分行
- 评审团 J3 文案法官会查翻译专业度

---

## 七、和谐性 + 技术约束 | Harmony & Constraints

1. **配色**：黑洞视频/右栏视频压暗 overlay 归冷调，与站暗色冷靛蓝一体；无暖色主体
2. **层次**：动态黑洞（底，氛围）→ 文案（中，主角，可读）→ 右栏视频（辅，呼应"代码→硬件"）
3. **不喧宾**：文案是主角，视频是氛围；overlay 保文字可读
4. **只改 `MissionSection`**：其它锁死
5. **mkv→mp4 转码**（禁止 .mkv）；视频懒加载 + poster + reduced-motion/移动端降级
6. **无新重依赖**（`gsap`/`three` 已装；黑洞程序化方案用 Canvas/ShaderMaterial 零依赖）
7. **无 infinite 动画**（视频 loop 不算 infinite CSS 动画；程序化黑洞可常驻渲染但视口外停）
8. **保持**：`npm run build` 通过；`app.baseURL`；路由；双语；`prefers-reduced-motion`；移动端降级；三断点无横向溢出
9. **性能**：两段视频（背景+右栏）懒加载、视口外停；桌面 fps ≥55；移动端 → 海报
10. **视觉验证产物一律 `verify/mission/`**

---

## 八、评审团打分循环 | Jury Loop

### 8.1 视觉检测（browser-harness + MCP vision）

- 桌面 1440：① idle（动态黑洞在动）② 滚动逐字揭示文案 ③ 右栏视频播放 ④ 文案可读性（overlay 够不够）
- 768 / 375：右栏隐藏/海报、背景视频降级、文案可读
- reduced-motion：静态海报 + 文案可见
- 性能：桌面 fps ≥55（两视频不卡）
- 截图存 `verify/mission/captures/`

### 8.2 评审团（5 位独立 agent 并行，Workflow 或 fan-out；用户已 opt-in）

| 评审 | 视角 | 权重 |
|---|---|---|
| J1 **和谐法官** | 动态黑洞+右栏视频+文案+站风 是否一体；overlay/配色/层次 | **1.5×** |
| J2 **电影感法官** | 动态黑洞是否惊艳/高级、整体电影感、非 AI 味 | 1.0× |
| J3 **文案法官** | 中文诗分行渲染 + **英文翻译专业度/诗意/对仗/技术词准确**；中英对应 | 1.0× |
| J4 **技术/性能法官** | fps≥55、SSG、mkv 转码、视频懒加载、reduced-motion/移动端降级、无 infinite、无横向溢出 | 1.0× |
| J5 **克制/锁定法官** | 只改了 `MissionSection`（git diff 核对其它零变更）、不杂乱、不喧宾 | 1.0× |

各评审基于**真实截图**（MCP `vision`/`gstack-design-review`）打分，输出 `{score, justify, deductions, pass}`。

### 8.3 门槛

- **总分 > 8.8** **且** **J1 和谐 ≥8.8** **且** **J3 文案 ≥8.5**（硬门槛）
- 未达标迭代修复，最多 5 轮；`jury-round-{n}.md` 记每轮
- **未达 >8.8 不向用户汇报**（5 轮耗尽才报最优+剩余）

---

## 九、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**，**无需逐项请示**：

### 🤖 子 Agent / 编排
- **Workflow 工具**：评审团并行打分循环（用户已 opt-in）——首选
- **Agent fan-out**：Explore（读 MissionSection + 参考稿视频 URL）、frontend-dev（一个转码入库、一个下参考视频+vision 分析、一个做动态黑洞+填视频、一个换文案、一个 QA）

### 🎨 设计 / 决策
- **gstack-design-shotgun**：动态黑洞方案（视频 vs 程序化 vs 混合）、右栏视频择优
- **gstack-design-consultation** / **gstack-design-review**：和谐与设计师审查
- **frontend-skill** / **code-yeongyu-oh-my-opencode-frontend-ui-ux**：视频/Canvas/文案排版实现

### 🔍 视觉检测 / 评审
- **browser-harness**：8.1 截图、fps
- **MCP `vision`**（`describe_image`）：**分析候选视频抽帧**择优 + 评审团打分（子 agent 须直调 `mcp__vision__describe_image`）
- **gstack-design-review**：J1/J2 辅助

### 🛠 视频处理 / 验证
- **Bash `ffmpeg`**：mkv→mp4、视频压缩、抽帧、PNG→webp、下载参考视频（`curl`）
- **MCP `node_repl`**：批量抽帧、`@ffmpeg/ffmpeg` wasm 备选、验视频编码
- **verify** / **run**：本地起站真浏览器验证
- **code-review** / **gstack-review**：自审 diff（**重点核对只改了 MissionSection**）

### 📸 归档（`verify/mission/`）
- `captures/`、`jury-round-{n}.md`、`decisions.md`（视频择优+授权状态）、`media-inventory.md`、`SUMMARY.md`

> **核心原则**：只改 MissionSection；动态黑洞+真视频+新文案；mkv 转码；评审团看真实截图；未达 8.8 不汇报。

---

## 十、执行阶段 | Execution Phases

### Phase 0：基线 + 媒体准备 | Baseline & Media
1. `Read MissionSection.vue` + 参考稿视频 URL + 本提示词
2. `cd website && npm run dev`；browser-harness 截当前 → `verify/mission/before/`
3. 转码 `黑洞代码去水印.mkv` → `/media/blackhole-code.mp4`；下载+抽帧候选视频（自有+参考），vision 分析择优 → `/media/mission-right.mp4`
**验收**：媒体入库、择优决策记录

### Phase 1：动态黑洞 + 视频填充 | Dynamic BH & Video
- 背景 `mode="static"` → 动态黑洞（A 视频首选 / design-shotgun 定）
- 右栏 `src=""` → 择优视频 `:src`
- 两视频懒加载 + poster + 降级
**验收**：动态黑洞在动、右栏视频播放、降级正常；截图存档

### Phase 2：文案替换 | Copy
- `missionCn` → 指定诗（分行）；`missionEn` → 专业翻译（对应分行）
- 渲染排版（逐字揭示保留、分行、破折号收束）
**验收**：中英文案正确分行显示、逐字揭示流畅；截图存档

### Phase 3：和谐与性能 | Harmony & Perf
- overlay 压暗保可读；配色归冷调；fps ≥55；SSG 通过；三断点无溢出；reduced-motion/移动端降级
**验收**：和谐与性能达标

### Phase 4：评审团打分循环 | Jury Loop
- §8 跑视觉检测 + 5 评审打分 + 迭代，每轮 `jury-round-{n}.md`
**验收**：总分 >8.8 且 J1 ≥8.8 且 J3 ≥8.5；或 5 轮耗尽取最优

### Phase 5：汇报 | Report
- 达标后（或 5 轮耗尽）向用户汇报
- `verify/mission/SUMMARY.md`：改了什么、动态黑洞方案、右栏视频择优+授权、文案与翻译、最终总分与各评审分、已知遗留

---

## 十一、质量红线 | Quality Gates

1. ❌ **改动 `MissionSection.vue` 以外的任何文件**（除新子组件 + `public/media/` 新文件）——**本轮最高红线**
2. ❌ 背景仍是静态黑洞图（未动态化）
3. ❌ 右栏仍是 `src=""` 占位（未填真视频）
4. ❌ 文案未换 / 英文翻译非专业级 / 中英不对应 / 丢句
5. ❌ .mkv 直接上线（未转 mp4）
6. ❌ 视频未用 vision MCP 分析就随意塞
7. ❌ 文案被视频/黑洞抢戏不可读（overlay 不足）
8. ❌ `npm run build` 失败 / SSG 破 / 375px 横向溢出 / 桌面 fps <55
9. ❌ reduced-motion/移动端 降级失效
10. ❌ **总分 ≤8.8 或和谐 <8.8 或文案 <8.5 就向用户汇报**（除非 5 轮耗尽并说明）
11. ❌ 评审团未看真实截图就打分

---

## 十二、执行指令 | Execution Order

将本文件粘贴到 Claude Code / Codex，Agent 将：

1. `Read MissionSection.vue` + 参考稿视频 URL + 本提示词
2. 转码黑洞视频；下载+vision 分析候选视频择优
3. **fan-out** 动态黑洞 + 填视频 + 换文案 + QA（并发）
4. 按 Phase 0→5 执行；Phase 4 用 **Workflow/Agent fan-out** 跑 5 评审打分循环
5. 评审基于 browser-harness 截图 + MCP `vision` 打分
6. **git diff 核对只改了 `MissionSection.vue`（+新子组件+`public/media/`）**
7. **达标（>8.8 且 J1 ≥8.8 且 J3 ≥8.5）后再向用户汇报**；5 轮耗尽则报最优 + 剩余
8. 交付 `verify/mission/SUMMARY.md`

> **Agent 完全授权声明**：执行期间可自主调用"九、工具/技能/MCP 自主授权"中**全部**技能、MCP、插件、子 Agent 与 Workflow 编排，无需逐一请示。本轮第一优先级：**只改 MissionSection、动态黑洞+真视频+新文案**；第二：评审团看真实截图、未达 8.8 不汇报；mkv 必须转码。

---

*本提示词自包含、可重复执行。只升级 `MissionSection.vue`（从代码到硬件）：静态黑洞→动态、视频占位→真视频、文案→指定诗+专业英译。*
*核心理念：锁死只改 MissionSection；动态黑洞靠视频/程序化；视频择优靠 vision MCP；文案中英专业对应；评审团 >8.8。*
