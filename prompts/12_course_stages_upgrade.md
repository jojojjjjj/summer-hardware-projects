# 课程阶段升级提示词 V8 | Course-Stages Section Upgrade Prompt V8

> 本文件**只升级"课程阶段"这一个 section**（`components/jack/JackServices.vue`，`<h2>课程阶段</h2>`，5 阶段时间线），让它和"课程阶段之前"的 Jack 暗色流风格搭配，并引入新参考特效 + 新媒体素材。**课程阶段之前的部分一律锁死不动。**
> Upgrade ONLY the "课程阶段" (Course Stages) section to match the dark Jack-flow style of the sections before it. Everything before it is FROZEN.

---

## 一、任务核心 | Mission Core

**一句话**：把"课程阶段"（`JackServices.vue`）从当前的**白色**简单时间线，升级为和前半段（Hero/JackMarquee/JackAbout/ClockVideoBand 暗色冷靛蓝流）**风格一致**的高级 section，移植新参考特效（Neo Museum 章节列表 + 沙化过渡、Aetheris 模糊入场/视频交叉淡入）、接入新视频/图片素材——**只动这一个 section**。

**用户原话定调**：
- "现在这个部分和当前的风格不够搭配" → 当前 `JackServices` 是白色 section，前半段是暗色，**违和**，要改搭
- "一定要明确只修改'课程阶段'这个部分" → **只改 `JackServices.vue`**
- "参考尤其是前半部分，也就是这个'课程阶段'之前的部分的风格" → 风格对齐 Hero/JackMarquee/JackAbout/ClockVideoBand
- "课程阶段之前的部分就不要再做任何修改了，一定要在提示词上锁死" → **前半段锁死**
- "引入图片和视频是全局的内容，不局限于'课程阶段'部分" → 新媒体作为**全局媒体库**入库（`public/media/`），本section 主要使用；不向前半段塞媒体
- "还是可以自由使用各种插件等等" → 自由用 skills/MCP/fan-out

---

## 二、🔒 锁死范围（最重要，违反即失败）| FROZEN Scope

**以下文件/section 一律不得修改（不改动效、不换媒体、不动布局、不改 props、不加样式）：**

| 锁死对象 | 文件 |
|---|---|
| 导航 | `components/AppNavbar.vue` |
| Hero | `components/HeroSection.vue`、`components/HeroArtifact.vue`、`components/ConstellationPoster.vue` |
| Jack 前半段 | `components/jack/JackMarquee.vue`、`components/jack/JackAbout.vue`、`components/jack/JackAnimatedText.vue`、`components/jack/JackFadeIn.vue`、`components/jack/JackMagnet.vue` 等所有 `jack/*` **除 `JackServices.vue` 外** |
| 前置视频带 | `components/ClockVideoBand.vue` |
| 课程阶段**之前**的 SectionBridge | `pages/index.vue` 里 `JackServices` **之前**的所有 `<SectionBridge .../>` 实例 |
| 课程阶段**之后**的 section | `components/ProjectsSection.vue`、`components/ProjectCard.vue`、`components/MissionSection.vue`、`components/CtaSection.vue`、`components/AppFooter.vue` 及其后 SectionBridge——**本轮不动**（保持原样） |
| 全局基底 | `assets/css/main.css` 的现有 token/类、`tailwind.config.ts` 的现有配色——**不得改动既有定义**（可新增仅供 `JackServices` 用的局部类/变量，不得影响其它 section） |

**唯一允许的"非 JackServices"改动**：`pages/index.vue` 里 `JackServices` **紧邻其后**的那一条 `<SectionBridge variant="color-shift" from="#ffffff" to="#0b0d12" />`——若新 `JackServices` 改为暗色导致该桥接的 `from="#ffffff"` 失真，**允许最小化调整这一条桥接的 `from`/`to` 颜色**以保过渡连贯（仅此一处，不许动其它）。若新方案保持白色或过渡不受影响，则**这条也不动**。

> Agent 须先 `Read pages/index.vue` 确认 section 顺序，识别 `JackServices` 前后的边界，**凡在 `JackServices` 之前的组件文件，一个字节都不许改**。

---

## 三、✏️ 编辑范围 | EDIT Scope

**只编辑：**
- `components/jack/JackServices.vue`（主战场——重做"课程阶段"）
- **可新建**：`JackServices` 专用的子组件 / composable（如 `components/jack/CourseStageVisual.vue`、`composables/useSandTransition.ts`、`composables/useFadingVideo.ts`），**仅供 `JackServices` 内部使用**
- 上述那条紧邻桥接的**最小颜色微调**（如需）

**必须保留的内容**（5 阶段教学信息，不可丢）：
- 5 个阶段：Day 1-3 项目调研与选型 / Day 4-6 硬件搭建与调试 / Day 7-9 软件开发与集成 / Day 10-12 系统优化与完善 / Day 13-15 文档撰写与展示
- 每阶段：`days`、`title`(中)、`titleEn`、`description`(中)、`descriptionEn`、`color`、`icon`、`bullets`
- 中英双语（继承现有 `stages` 数据）

---

## 四、风格匹配 mandate | Style Match

**目标风格 = 课程阶段之前的 Jack 暗色流**。Agent 须先 `Read` 以下文件提取风格语言，再让新 `JackServices` 与之同频：
- `components/jack/JackMarquee.vue`、`components/jack/JackAbout.vue`（直接前驱，风格最近）
- `components/HeroSection.vue`、`components/jack/JackAnimatedText.vue`（暗色/giant gradient h1/char-reveal）
- `assets/css/main.css`（`glass-card`/`glow-soft`/`eyebrow`/冷调 token）

**风格要点（核对）**：
- **暗色冷靛蓝底**：`bg-background #0b0d12` / `bg-bg-secondary #11141b`（当前 `JackServices` 是 `bg-white` → **要改暗**以搭配前半段）
- 冷靛蓝/紫/蓝强调（`#6366f1`/`#8b5cf6`/`#3b82f6`/`#9aa3d4`/`#a5aceb`）；**禁止暖色主体**（CTA 按钮除外，本 section 不一定有 CTA）
- `glass-card` + `glow-soft`/`glow-on-hover`（事件光，`--glow-cool` token）
- 巨型 `font-mono` 数字水印（如 `clamp(9rem,20vw,16rem)` opacity 0.10）作背景层
- `font-mono` 段号（`01 / 05`）+ 细发线
- 不对称栅格 / 巨型 gradient h1（JackAnimatedText 逐字）——和 JackAbout/JackMarquee 同族
- 一次性入场（`expo.out` / `power3.out`，stagger，IntersectionObserver），`prefers-reduced-motion` 降级
- **无 infinite 动画**；无满屏暖光

> 关键：**把当前白色 `JackServices` 改成暗色冷靛蓝**，与前半段连成一体；不再是突兀的白色翻转。`gstack-design-shotgun` 验证"改暗后是否真比白色更搭"。

---

## 五、新参考特效（移植 React → Vue/GSAP，不照搬）| New Effects

三份新参考稿在 `prompts/网页效果提示词/`（**React + framer-motion**，须移植到 **Nuxt/Vue/GSAP**）。可迁移特效：

| 来源 | 特效 | 用于课程阶段 | 移植要点 |
|---|---|---|---|
| **Neo_Museum.txt** | **章节列表 + `SandTransitionImage`**（SVG 滤镜沙化/溶解图像过渡：feTurbulence+feDisplacementMap+feOffset+feGaussianBlur+feColorMatrix，900ms rAF） | ⭐**主重构思路**：5 章节=5 阶段，列表项 active 态 + 切换时阶段视觉做沙化溶解 | 把 5 阶段做成"章节列表 + 过渡视觉"：点选/滚动激活某阶段 → 其视觉（图片/视频）以沙化溶解登场。**Neo 是浅色单色，必须改成暗色冷靛蓝**，只学手法不抄色 |
| **Aetheris_Voyage.txt** | **`FadingVideo`**（rAF 驱动视频交叉淡入，loop 边界 0.55s 前开始 fade out，无 CSS transition） | 课程阶段背景/阶段视觉的循环视频交叉淡入 | 移植 rAF 交叉淡入；复用现有 `MediaSlot`/`useReducedMotion`，reduced-motion→海报 |
| **Aetheris_Voyage.txt** | **`BlurText`**（逐词 blur-in：filter blur 10px→0 + opacity 0→1 + y 50→0，stagger，IntersectionObserver） | "课程阶段"标题或阶段标题 | 封装 `composables/useBlurText.ts` 或用 GSAP timeline；reduced-motion→直接显 |
| **Aetheris_Voyage.txt** | **liquid-glass 边框**（`backdrop-filter: blur` + mask 渐变描边） | 阶段卡玻璃质感（与 site `glass-card` 同族） | 可作 `glass-card` 的局部增强，不替换全局 `glass-card` |
| **Prisma_Creative_Studio.txt** | WordsPullUp / 滚动逐字透明度 | 阶段描述（可选） | 站内已有 `WordsPullUp.vue`/`ScrollRevealText`，复用 |

> **移植而非照搬**：framer-motion `useInView`/`useScroll` → 现有 `useInView`/GSAP `ScrollTrigger`；React hooks → Vue composables；`motion.span` → GSAP/CSS。复用 `useReducedMotion`/`useInView`。

---

## 六、新媒体入库（全局媒体库）| New Media Ingestion

### 6.1 源（仓库外，中文路径）

**图片**（`D:\教书\艺术设计图片\`，高清 PNG 版）：
- `黑洞文字.png`、`流淌齿轮..png`（注意文件名双点）、`立体线路.png`（高清版，已有旧 jpg/webp 在 `public/media/`）

**视频**（`D:\教书\艺术设计图片\视频\`）：
- `钟表运动去水印.mp4`（可直接用，替换旧 `clock-motion.mp4`）
- `机械齿轮塔视频生成.mkv`、`代码河-超分.mkv`、`黑洞代码去水印.mkv`、`彩虹月亮运动-超分.mkv`（**.mkv 浏览器不能播，须转码**）

### 6.2 入库处理

1. 复制进 `website/public/media/`，改 ASCII 名：
   - `黑洞文字.png` → `/media/blackhole-code-hd.webp`（压 webp）
   - `流淌齿轮..png` → `/media/gears-tower-hd.webp`
   - `立体线路.png` → `/media/circuit-3d-hd.webp`
   - `钟表运动去水印.mp4` → `/media/clock-motion.mp4`（覆盖旧版）
   - `机械齿轮塔视频生成.mkv` → `/media/gears-tower.mp4`（**mkv→mp4 H.264**）
   - `代码河-超分.mkv` → `/media/code-river.mp4`（**转码**）
   - `黑洞代码去水印.mkv` → `/media/blackhole-code.mp4`（**转码**）
   - `彩虹月亮运动-超分.mkv` → `/media/rainbow-moon.mp4`（**转码**）
2. **mkv→mp4 转码**：用 `ffmpeg`（Bash，`-c:v libx264 -crf 23 -preset medium -c:a aac`，缩到 1080p ≤10Mbps）。若环境无 ffmpeg，用 `node_repl` + `@ffmpeg/ffmpeg` wasm，或记到 `verify/course-stages/video-convert.md` 让用户转。**禁止直接塞 .mkv**（浏览器不播）
3. 大 PNG 压 webp（目标 < 500KB）；视频懒加载 + poster + reduced-motion/移动端降级
4. 登记到 `verify/course-stages/media-inventory.md`（源、入库路径、体积、用途、是否占位）

### 6.3 媒体→阶段映射（建议，agent 可调）

| 阶段 | 建议媒体 | 理由 |
|---|---|---|
| Day 1-3 项目调研与选型 | `blackhole-code` 视频/图 | 代码→黑洞=调研/探索 |
| Day 4-6 硬件搭建与调试 | `gears-tower` 视频 / `circuit-3d-hd` 图 | 齿轮/电路=硬件搭建 |
| Day 7-9 软件开发与集成 | `code-river` 视频 | 代码河=软件开发 |
| Day 10-12 系统优化与完善 | `gears-tower` / `circuit-3d-hd` | 打磨 |
| Day 13-15 文档撰写与展示 | `rainbow-moon` 视频 | 成果展示/氛围 |
| section 背景/时间主线 | `clock-motion` 视频 | **钟=时间=12-15 天日程**，最贴"课程阶段"主题 |

> 媒体是**全局资源**（入 `public/media/` 供全站未来用），本轮主要在 `JackServices` 用；**不向前半段塞**（前半段锁死）。

---

## 七、课程阶段升级规格 | Upgrade Spec

**现状**：白色 `bg-white`、`<h2>课程阶段</h2>` 巨字、5 阶段竖向脊柱时间线、白底卡、JackFadeIn 入场。

**升级方向**（`gstack-design-shotgun` 出 2–3 方案定档）：

1. **改暗**：`bg-white` → 暗色冷靛蓝（`bg-bg-secondary` 或带 `clock-motion` 视频背景 + 压暗 overlay），与前半段连成一体
2. **章节列表 + 沙化过渡视觉**（Neo Museum 思路，暗色化）：5 阶段做成可激活的"章节列表"（左/右），激活阶段配一个**视觉区**（该阶段的视频/图，用 `SandTransitionImage` 沙化溶解切换）；阶段切换可滚动驱动或点选
3. **巨型标题**：`BlurText`（Aetheris）做"课程阶段"标题入场，或 JackAnimatedText 逐字（和 JackAbout 同族）
4. **玻璃阶段卡**：`glass-card` + `glow-soft`（事件光）+ `--glow-cool` 每阶段色 token；巨型 `font-mono` 阶段号水印作背景层
5. **钟表视频背景**（可选）：`clock-motion.mp4` 作 section 氛围底（`FadingVideo` 或 `MediaSlot bg-autoplay`，压暗 + 噪点 overlay），呼应"时间/日程"
6. **保留**：5 阶段全部双语内容、阶段色、icon、bullets；hover/可交互；移动端可读布局
7. **一次性入场**（`expo.out`/`power3.out`，stagger，IntersectionObserver）；reduced-motion→静态可见；**无 infinite 动画**

**移动端**：章节列表折叠为可点章节 + 单视觉区；沙化过渡降级为简单淡入（移动端 SVG 滤镜可能重）；视频→海报。

---

## 八、和谐性 | Harmony

1. **配色**：暗色冷靛蓝 + 阶段色（indigo/blue/violet）+ `glass-card`/`glow-soft`，和 JackMarquee/JackAbout/Hero 同族
2. **不再是白色突兀翻转**：与前半段暗色流连续
3. **过渡连贯**：若改暗，紧邻后置 SectionBridge（color-shift）的 `from` 最小化调整，保 Services→Projects 过渡不崩
4. **媒体压暗归冷调**：视频/图背景加 overlay，不抢阶段文字
5. **不喧宾**：5 阶段教学内容是主角，特效/媒体是氛围
6. **与前半段节奏一致**：段号/留白/giant h1/glass 同族，不出现"前半段一套、课程阶段另一套"

---

## 九、技术约束 | Technical Constraints

- **只改 `JackServices.vue`**（+ 其专用新子组件/composable + 紧邻桥接最小颜色微调）；**前半段及其它 section 锁死**
- **移植不照搬**：参考稿是 React+framer-motion；移植到 Vue/GSAP，复用 `useInView`/`useReducedMotion`/`WordsPullUp`/`MediaSlot`
- **mkv→mp4 转码**（禁止 .mkv 上线）；大 PNG 压 webp；视频懒加载 + poster + 降级
- **无新重依赖**（`three`/`gsap` 已装；ffmpeg 是命令行工具非 npm 依赖）；沙化用原生 SVG filter（零依赖）
- **无 infinite 动画**；一次性入场/hover 触发
- **保持**：`npm run build` 通过；`app.baseURL`；路由；双语；`prefers-reduced-motion`；移动端降级；三断点（375/768/1440）无横向溢出
- **全局 token 不改**：不动 `main.css`/`tailwind.config.ts` 既有定义（可加局部类/变量仅供 `JackServices`）
- **视觉验证产物一律 `verify/course-stages/`**

---

## 十、视觉检测 + 设计审查 | Visual QA & Review

### 10.1 视觉检测（browser-harness + MCP vision）

- 桌面 1440：① 课程阶段 idle ② 激活各阶段（查沙化过渡/视觉切换）③ hover 阶段卡 ④ 滚动入场
- 768 / 375：移动端布局（章节折叠/视觉降级/视频→海报）
- reduced-motion：静态可见
- **与前半段衔接**：截图 Hero→JackMarquee→JackAbout→ClockVideoBand→**课程阶段** 的连续滚动，确认暗色流连贯、无白色突兀
- 性能：实测桌面 fps ≥55（沙化滤镜 + 视频不卡）
- 截图存 `verify/course-stages/captures/`

### 10.2 设计审查

- `gstack-design-review`：对课程阶段做"设计师之眼"审查（间距/层级/对齐/与前半段搭配/AI slop）→ `verify/course-stages/design-review.md`
- **可选** `gstack-design-shotgun`：多方案对比定档
- **可选** 多 agent 评审团（如需更强验证，用户未强制 >8.8 本轮；以 design-review 评为"可接受+"为准）
- **硬核对**：前半段未被改动（git diff 确认锁死文件零变更）

---

## 十一、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**，**无需逐项请示**：

### 🤖 子 Agent / 编排
- **Agent fan-out**：Explore（读前半段风格 + 现有 JackServices）、frontend-dev（一个转码入库媒体、一个做沙化过渡组件、一个重做 JackServices 布局、一个 QA）
- **Plan**：先出锁死边界确认 + 风格提取 + 升级方案

### 🎨 设计 / 决策
- **gstack-design-shotgun**：暗色化方案、章节列表 vs 时间线、媒体落位多方案
- **gstack-design-consultation** / **gstack-design-review**：风格搭配校准 + 设计师审查
- **frontend-skill** / **code-yeongyu-oh-my-opencode-frontend-ui-ux**：Vue/GSAP/SVG 滤镜实现

### 🔍 视觉检测 / 评审
- **browser-harness**：10.1 截图（含前半段→课程阶段连续滚动）、fps
- **MCP `vision`**（`describe_image`）：审查搭配度、沙化过渡效果（子 agent 直调）
- **gstack-design-review**：设计审查

### 🛠 媒体转码 / 验证
- **Bash `ffmpeg`**：mkv→mp4 转码、视频压缩、PNG→webp
- **MCP `node_repl`**：验 SVG 沙化滤镜参数、`@ffmpeg/ffmpeg` wasm 备选、解析媒体体积
- **verify** / **run**：本地起站真浏览器验证
- **code-review** / **gstack-review**：自审 diff（**重点核对锁死文件零变更**）

### 📸 归档（`verify/course-stages/`）
- `captures/`、`design-review.md`、`media-inventory.md`、`video-convert.md`、`decisions.md`、`SUMMARY.md`

> **核心原则**：前半段锁死零变更；只改课程阶段；风格对齐暗色 Jack 流；mkv 转码；无 infinite 动画。

---

## 十二、执行阶段 | Execution Phases

### Phase 0：边界确认 + 风格提取 + 基线 | Boundary & Baseline
1. `Read pages/index.vue` 确认 section 顺序，列出 `JackServices` 前后边界
2. `Read` 前半段（JackMarquee/JackAbout/Hero/ClockVideoBand/main.css）提取风格语言
3. `Read JackServices.vue` + 3 份新参考稿
4. `cd website && npm run dev`；browser-harness 截当前课程阶段 + 前半段连续 → `verify/course-stages/before/`
**验收**：边界与风格清单产出 + 基线截图

### Phase 1：新媒体入库 | Media Ingest
- 复制 + 转码（mkv→mp4）+ 压图（PNG→webp）进 `public/media/`
- 登记到 `media-inventory.md`
**验收**：媒体入库可播、无 .mkv 残留

### Phase 2：特效组件 | Effect Components
- 建 `useSandTransition.ts`（SVG 沙化溶解）、`useFadingVideo.ts`（rAF 交叉淡入）、`useBlurText.ts`（逐词 blur-in）或复用现有
- 全部 reduced-motion 降级
**验收**：组件本地可用；截图存档

### Phase 3：重做 JackServices | Rebuild
- 改暗 + 章节列表 + 沙化过渡视觉 + 巨型标题（BlurText）+ glass 阶段卡 + 钟表视频氛围底（可选）
- 保留 5 阶段双语内容；移动端降级
- `gstack-design-shotgun` 定档
**验收**：课程阶段暗色化、与前半段搭配、特效生效、内容完整；截图存档

### Phase 4：衔接与性能 | Transition & Perf
- 紧邻后置 SectionBridge 最小颜色微调（如需）
- fps ≥55、SSG 通过、三断点无溢出、reduced-motion/移动端降级
**验收**：过渡连贯 + 性能达标

### Phase 5：QA & 汇报 | QA & Report
- `gstack-design-review` 出报告
- **git diff 核对锁死文件零变更**
- 三断点截图 → `verify/course-stages/after/`
- `verify/course-stages/SUMMARY.md`：改了什么、风格如何对齐、特效/媒体落位、媒体清单、已知遗留

---

## 十三、质量红线 | Quality Gates

1. ❌ **改动任何"课程阶段之前"的文件**（Navbar/Hero/JackMarquee/JackAbout/ClockVideoBand/前置 SectionBridge/全局 token）——**本轮最高红线**
2. ❌ 改动课程阶段**之后**的 section（Projects/Mission/CTA/Footer）——除非是允许的那一条紧邻桥接最小颜色微调
3. ❌ 5 阶段教学内容（中英双语/days/bullets/icon/color）丢失或被改
4. ❌ .mkv 直接上线（未转 mp4）
5. ❌ 课程阶段仍与前半段违和（白色突兀 / 风格不一致）——`gstack-design-review` 评为"差"
6. ❌ infinite 动画 / 暖色主体 / 375px 横向溢出
7. ❌ `npm run build` 失败 / SSG 破
8. ❌ reduced-motion/移动端 降级失效（沙化/视频在低端机卡死）
9. ❌ 桌面 fps <55

---

## 十四、执行指令 | Execution Order

将本文件粘贴到 Claude Code / Codex，Agent 将：

1. `Read pages/index.vue` 确认 `JackServices` 边界；`Read` 前半段提取风格
2. **fan-out** 媒体转码入库 + 特效组件 + 重做 JackServices + QA（并发）
3. 按 Phase 0→5 执行
4. browser-harness 截图 + MCP `vision` 验搭配；`gstack-design-review` 出报告
5. **git diff 核对前半段锁死文件零变更**
6. 交付 `verify/course-stages/SUMMARY.md`

> **Agent 完全授权声明**：执行期间可自主调用"十一、工具/技能/MCP 自主授权"中**全部**技能、MCP、插件与子 Agent，无需逐一请示。本轮第一优先级：**只改课程阶段、前半段锁死零变更、风格对齐暗色 Jack 流**；第二：新参考特效 + 新媒体接入；mkv 必须转码；无 infinite 动画。

---

*本提示词自包含、可重复执行。只升级"课程阶段"(JackServices.vue)，前半段锁死，风格对齐暗色冷靛蓝 Jack 流，移植 Neo Museum 沙化章节 + Aetheris 模糊/视频交叉淡入，接入新视频/图片。*
*核心理念：锁死前半段；课程阶段暗色化对齐；特效靠 SVG/GSAP（非 React）；mkv 转码；媒体全局入库。*
