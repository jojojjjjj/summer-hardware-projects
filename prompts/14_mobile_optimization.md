# 手机端专属适配提示词 V10 | Mobile-Only Optimization Prompt V10

> 本文件**只优化手机端（<768px，即 `md:` 断点以下）**的显示与体验。**桌面端 / ≥768px（含 16:9 横屏、平板）一律锁死零变更。** 用 `max-md:`/`max-sm:` 变体 + `@media (max-width:767px)` 做手机专属改动，保证桌面分毫不动。
> Optimize ONLY the phone (<768px) experience. Everything ≥768px (desktop / 16:9 / tablet) is FROZEN — pixel-identical before/after. Use `max-md:` variants + scoped media queries so desktop is untouched.

---

## 一、任务核心 | Mission Core

**一句话**：当前桌面端已满意、不动；手机端"马马虎虎"要**专门优化**。只改 `<768px`（手机）的布局/排版/间距/触控/可读性/性能，**≥768px 桌面/横屏/平板锁死**，前后截图必须像素级一致。

**用户原话定调**：
- "现在的主界面效果我已经非常满意了" → **桌面端不动**
- "针对手机来进行专门的优化，当前手机端显示效果马马虎虎" → **手机端专属适配**
- "不要动电脑端或者这个类似 16:9 的比例的任何内容了" → **≥768px / 横屏 16:9 锁死零变更**

> 🔗 **范围**：本轮**只优化 <768px**（手机，含 base + 大屏手机/phablet）。`md:`(768)+ 及所有横屏桌面分支**锁死**。不新建 section、不改桌面布局、不动全局 token。

---

## 二、🔒 锁死范围（最高红线，违反即失败）| FROZEN Scope

**以下一律不得变更（前后像素级一致）：**

| 锁死对象 | 说明 |
|---|---|
| **≥768px 渲染** | 桌面（1440/1280/1024）、平板（768×1024 竖 / 1024×768 横）——前后截图必须一致 |
| **`sm:`/`md:`/`lg:`/`xl:`/`2xl:` Tailwind 类** | **不得修改任何 `sm:` 及以上的响应式类**（它们会级联到 ≥768 桌面） |
| **桌面专属分支** | `hidden md:*` / `hidden lg:*` / `md:block` / `md:grid` 等桌面布局块——不动 |
| **桌面 JS 分支** | `matchMedia('(pointer: fine)')`、`min-width: 768`、`capable()`（桌面 3D）、鼠标 tilt/magnetic/scrub 处理器——**桌面行为不变**（可新增手机专属 JS，不得改桌面分支） |
| **全局基底** | `assets/css/main.css` 既有 token/类、`tailwind.config.ts` 既有配色/断点——不动（可新增仅供手机用的 scoped 类） |
| **3D / 视频的桌面表现** | `HeroArtifact` 桌面 3D、`MediaSlot` 桌面视频——桌面表现不变 |

**验证锁死（必做）**：
1. `git diff` 核对：**没有任何 `sm:`/`md:`/`lg:`/`xl:`/`2xl:` 类被改**、没有桌面分支被改
2. 前后截图 diff：1440×900、1280×800、1024×768（横）、768×1024（竖）四处**像素级一致**（仅允许抗锯齿级 negligible 差异）

---

## 三、✏️ 优化范围与安全改法 | EDIT Scope & Safe Methods

**只优化 <768px（手机）**。**安全改法（保证不级联到 ≥768）**：

| 方法 | 说明 | 安全性 |
|---|---|---|
| **`max-md:` / `max-sm:` 变体** ⭐首选 | Tailwind 3.4 支持；仅 <768 / <640 生效，不碰 ≥768 | ✅ 最安全 |
| **`@media (max-width: 767px)` scoped CSS** | 在组件 `<style>` 或 `main.css` 新增 scoped 块，仅 <768 | ✅ 安全 |
| **改 `md:hidden` 手机块** | 手机专属分支，只在 <768 渲染——可重构 | ✅ 安全 |
| **改 base 类（仅当存在 `md:`+ 覆盖时）** | mobile-first：base=全宽度，`md:`+ 在 ≥768 覆盖；仅当该属性有 `md:`+ 覆盖时，改 base 才只影响 <768 | ⚠️ 逐条核实 |
| **新增手机专属 JS** | `matchMedia('(max-width: 767px)')` / 触摸 / safe-area——新增分支，不改桌面分支 | ✅ 安全 |

**禁止**：改 `sm:`/`md:`/`lg:`/`xl:` 类（级联到桌面）、删桌面分支、改桌面 JS 行为。

> 原则：**能用 `max-md:` 就用 `max-md:`**；拿不准就 `@media (max-width:767px)` scoped；改 base 前先 grep 确认该属性在同类元素有 `md:`+ 覆盖。

---

## 四、手机端现状（Agent 必读，已核对）| Current Mobile State

- **Tailwind 3.4.19** → 支持 `max-md:`/`max-sm:` 变体（放心用）
- **导航**：`AppNavbar` 已有移动菜单（hamburger、`md:hidden`、`min-h-[44px]` 触控、动画）——**不要重建**，审计后微调即可
- **3D 星座**：`HeroArtifact.capable()` 已在触屏+窄屏返回 false → 手机显 `ConstellationPoster`（海报），不跑 WebGL ✓
- **视频**：`MediaSlot` 的 `bg-autoplay`/`mouse-scrub` 已在 `pointer: coarse` / reduced-motion → 海报 ✓；`useMouseScrubVideo` 触屏不绑定 ✓
- **所以手机端"马马虎虎"主要在**：布局拥挤、排版（中文 clamp 字号/字距）、间距、触控目标、可读性（对比/行宽）、横向溢出、各 section 手机分支的精细度、性能（图片/字体/JS）、safe-area（刘海/底部条）

> 手机端 3D/重视频已自动降级，本轮重点是**布局/排版/触控/可读性/性能的精修**，不是重做降级。

---

## 五、手机端审计清单（Agent 必做）| Mobile Audit Checklist

用 browser-harness / `verify/scripts/screenshot-audit.mjs` 在 **375×812（iPhone）、390×844、360×800（Android）** 截全页 + 逐 section，逐项排查：

| 维度 | 排查点 |
|---|---|
| **横向溢出** | 任一 section 在 375 出现水平滚动条 / 元素溢出（最高优先，红线） |
| **排版** | `clamp()` 标题在 375 是否过大/过小；中文 letter-spacing/line-height；正文 ≥14px；行宽 ≤30 中文字 |
| **间距** | section `py-*` 在手机是否过密/过空；元素间距是否拥挤 |
| **触控目标** | 所有可点元素（按钮/卡/步骥/筛选/菜单项）≥44×44px；间距防误触 |
| **可读性** | 文字与背景对比（视频/图压暗够不够）；`text-text-tertiary` 小字在手机是否太淡 |
| **各 section 手机分支** | Hero / JackMarquee / JackAbout / ClockVideoBand / JackServices(课程阶段) / ProjectsSection / MissionSection / CtaSection / AppFooter——逐个审手机渲染 |
| **导航** | hamburger 菜单展开/收起、链接触控、CTA |
| **媒体** | 手机海报是否清晰/合适；图片是否 webp/懒加载；视频是否真降级为海报（不耗流量） |
| **性能** | 首屏 LCP、图片/字体加载、JS 执行（3D 已关，但其它 JS）；滚动是否顺滑 |
| **safe-area** | iOS 刘海/底部 home indicator（`env(safe-area-inset-*)`）；横屏（若涉及） |
| **reduced-motion** | 手机 reduced-motion 下动画降级 |

产出 `verify/mobile/audit.md`：每 section 问题清单 + 截图引用。

---

## 六、优化规格 | Optimization Spec

逐 section 优化（**仅 <768，用 `max-md:`/scoped media**）。重点方向（agent 按审计结果定优先级）：

### 6.1 排版（typography）
- 标题 `clamp()` 在 375 过大则加 `max-md:` 收敛（如 `max-md:text-[2rem]`），**不碰 `md:`+ 的 clamp**
- 中文正文 `max-md:leading-[1.7]`、`max-md:tracking-[-0.003em]`（手机中文需更松行高、更小字距负值）
- 小字 `max-md:text-[13px]` 保可读（≥13px）
- `eyebrow` 手机字号 `max-md:text-[10px]`

### 6.2 间距与布局
- section `max-md:py-20`（收敛过密/过空），**不动 `md:py-*`**
- 网格手机单列：已有 `grid-cols-1 md:...` 多数 OK；检查是否有手机仍挤双列
- Hero 手机：标题/副标/CTA/星座海报的垂直节奏；星座容器 `max-md:h-[300px]` 等
- JackServices 手机分支（`md:hidden`）：5 阶段在手机的紧凑度、可读性、触控
- ProjectsSection 手机：横向滚动 shelf / 筛选器的触控与间距
- MissionSection 手机：右栏已 `hidden lg:block`（手机只见文案+黑洞海报）——文案可读性、海报压暗

### 6.3 触控（touch）
- 所有按钮/卡片/步骥/筛选项 `max-md:min-h-[44px] max-md:min-w-[44px]`
- 防误触：相邻可点元素 `max-md` 间距 ≥8px
- tilt/magnetic 已触屏关闭 ✓；确认 hover-only 信息在触屏有等价（如 tooltip 改 tap 或常显）

### 6.4 可读性
- 视频/图背景在手机的 overlay 压暗（`max-md:` 加深 from-background/... 保文字可读）
- `text-text-tertiary` 小字手机可适当 `max-md:text-text-secondary` 提亮

### 6.5 横向溢出修复
- 任何 375 横向溢出元素：`max-md:overflow-x-hidden` / 调 `max-md` 宽度 / `max-md:max-w-full`
- marquee/横滚：`max-md` 控速度/不溢出

### 6.6 导航手机
- 审计 hamburger 菜单（已存在）：展开动画、链接触控、CTA、关闭手势；微调 `max-md:` 间距/字号，**不重建**

### 6.7 性能
- 图片 webp + `loading="lazy"` + 正确 `width/height`（防 CLS）
- 手机海报用合适尺寸（不要桌面 4K 图压手机）
- 确认视频在手机真为海报（不加载 mp4）；3D 真关闭
- 字体 `font-display: swap`（已基本有）；preload 关键字体
- 滚动顺滑：`passive` 监听、避免手机布局抖动

### 6.8 safe-area
- iOS：`max-md` 下导航/CTA/底部加 `env(safe-area-inset-bottom/top)` padding
- `viewport` meta 已 `viewport-fit=cover`？确认（`nuxt.config.ts` 的 viewport）

### 6.9 reduced-motion
- 手机 reduced-motion 下入场动画瞬切、视频海报、3D 关闭（多数已 ✓，查漏）

> **一律一次性入场 / 交互响应；无 infinite 动画**（继承）。中文文案不变（仅排版）。**不新增 section、不改桌面。**

---

## 七、技术约束 | Technical Constraints

- **只改 <768**：用 `max-md:`/`max-sm:` + `@media (max-width:767px)` scoped + `md:hidden` 手机块；**不碰 `sm:`/`md:`/`lg:`/`xl:` 类**（级联桌面）
- **桌面零变更**：`git diff` 无 `sm:`+ 类改动、无桌面分支改动；前后桌面截图像素一致
- **不新建 section / 不改路由 / 不改数据**；不改全局 token
- **无新重依赖**（Tailwind 3.4 `max-*` 已支持）
- **保持**：`npm run build` 通过；`app.baseURL`；SSG；双语；`prefers-reduced-motion`；**桌面三断点（1440/1280/1024）+ 768 无变化**
- **视觉验证产物一律 `verify/mobile/`**

---

## 八、视觉检测 + 审查 | Visual QA & Review

### 8.1 手机端检测（browser-harness + MCP vision）

- **375×812**（iPhone）：全页 + 逐 section，before/after
- **390×844** / **360×800**（大屏手机 / Android）：关键 section
- 查：横向溢出、排版、间距、触控、可读性、媒体降级、safe-area、reduced-motion
- 性能：手机 LCP / 滚动顺滑度（browser-harness performance 或 Lighthouse mobile）
- 截图存 `verify/mobile/captures/`

### 8.2 桌面端锁死验证（硬红线）

- **前后截图 diff**：1440×900、1280×800、1024×768（横）、768×1024（竖）——**必须像素级一致**
- **`git diff` 审查**：无 `sm:`/`md:`/`lg:`/`xl:`/`2xl:` 类被改、无桌面分支被改
- 任一桌面截图有可见差异 = **失败**

### 8.3 设计审查

- `gstack-design-review`：对手机端（375）做"设计师之眼"审查（间距/层级/对齐/可读性/触控）→ `verify/mobile/design-review.md`
- **可选** 多 agent 评审团（用户未强制 >8.8 本轮；以 design-review 评为"可接受+"为准）
- 对比 before/after 手机截图，确认"马马虎虎 → 满意"

---

## 九、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**，**无需逐项请示**：

### 🤖 子 Agent / 编排
- **Agent fan-out**：Explore（审计各 section 手机现状）、frontend-dev（按 section 并行优化手机端，互不重叠）、QA（桌面锁死验证 + 手机验证）
- **Plan**：先出审计清单 + 优先级 + 安全改法策略

### 🎨 设计 / 决策
- **gstack-design-shotgun**：手机端疑难 section（如 Hero/JackServices/Projects）多方案对比
- **gstack-design-consultation** / **gstack-design-review**：手机端设计师审查
- **frontend-skill** / **code-yeongyu-oh-my-opencode-frontend-ui-ux**：移动端实现指导

### 🔍 视觉检测
- **browser-harness**：375/390/360 手机截全页+逐 section、桌面 1440/1280/1024/768 前后对比、手机 Lighthouse
- **`verify/scripts/screenshot-audit.mjs`**：已有 375/768/1440 截图脚本，直接用
- **MCP `vision`**（`describe_image`）：审查手机端可读性/布局/触控（子 agent 直调）
- **gstack-design-review**：手机设计审查

### 🛠 验证
- **MCP `node_repl`**：批量截图 diff（桌面前后像素对比）、grep `git diff` 确认无 `md:`+ 改动
- **verify** / **run**：本地起站真浏览器验证（mobile + desktop）
- **code-review** / **gstack-review**：自审 diff（**重点核对桌面零变更**）

### 📸 归档（`verify/mobile/`）
- `audit.md`（手机问题清单）、`captures/`（before/after 375/390/360 + 桌面 diff）、`design-review.md`、`SUMMARY.md`

> **核心原则**：桌面零变更（像素 diff + git diff 双证）；手机用 `max-md:`/scoped media 优化；横向溢出红线；触控 ≥44px；中文可读。

---

## 十、执行阶段 | Execution Phases

### Phase 0：审计 + 基线 | Audit & Baseline
1. `Read` 关键组件（HeroSection/HeroArtifact/JackMarquee/JackAbout/ClockVideoBand/JackServices/ProjectsSection/MissionSection/CtaSection/AppNavbar/AppFooter）+ 本提示词
2. `cd website && npm run dev`；browser-harness 截 375/390/360 全页+逐 section → `verify/mobile/before/`
3. **桌面基线**：截 1440/1280/1024/768 → `verify/mobile/desktop-before/`（锁死对照）
4. 产出 `audit.md`（每 section 手机问题 + 优先级）
**验收**：审计清单 + 基线截图（含桌面对照）

### Phase 1：逐 section 手机优化 | Per-Section Mobile Opt
- 按 `max-md:`/scoped media 逐 section 优化（§6）
- 每改完一个 section：375 截图 before/after 对比
**验收**：各 section 手机端改善；截图存档

### Phase 2：全局手机项 | Global Mobile
- 排版/触控/可读性/横向溢出/safe-area/performance 全局扫尾
**验收**：375 无横向溢出、触控 ≥44px、正文 ≥14px、可读

### Phase 3：桌面锁死验证 | Desktop Lock Verification
- `git diff` 审查：无 `sm:`+ 类改动、无桌面分支改动
- 前后桌面截图 diff：1440/1280/1024/768 **像素级一致**
**验收**：桌面零变更（硬红线过）

### Phase 4：手机设计审查 + QA | Mobile Review & QA
- `gstack-design-review` 出手机端报告 → `verify/mobile/design-review.md`
- 交互回归（移动菜单、项目卡 tap、步骥 toggle、筛选、滚动）
- 三断点（375/390/360）无溢出、reduced-motion 降级
**验收**：手机 design-review "可接受+"、交互正常

### Phase 5：汇报 | Report
- `verify/mobile/SUMMARY.md`：改了哪些文件（仅手机 scoped）、前后手机差异、**桌面零变更证据**（git diff + 截图 diff）、已知遗留

---

## 十一、质量红线 | Quality Gates

1. ❌ **桌面端有任何可见变化**（1440/1280/1024/768 截图 diff 不一致，或 `git diff` 改了 `sm:`/`md:`/`lg:`/`xl:` 类 / 桌面分支）——**本轮最高红线**
2. ❌ 改了 `sm:`/`md:`/`lg:`/`xl:`/`2xl:` 响应式类（级联桌面）
3. ❌ 375 / 360 出现横向滚动条
4. ❌ 可点元素触控目标 <44×44px
5. ❌ 正文文字 <14px（或小字 <13px）不可读
6. ❌ 中文排版在手机拥挤/溢出/字号失衡
7. ❌ 手机端视频未降级为海报（仍加载 mp4）/ 3D 未关
8. ❌ `npm run build` 失败 / SSG 破
9. ❌ reduced-motion / safe-area 缺失导致手机体验问题
10. ❌ 改了路由/数据/全局 token / 新建 section

---

## 十二、执行指令 | Execution Order

将本文件粘贴到 Claude Code / Codex，Agent 将：

1. `Read` 各 section 组件 + 本提示词；确认 Tailwind 3.4 `max-md:` 可用
2. **fan-out** 审计 + 按 section 并行手机优化 + QA（并发，互不重叠文件）
3. 按 Phase 0→5 执行
4. 手机端：browser-harness 375/390/360 截图 + MCP `vision` 审查 + `gstack-design-review`
5. **桌面端：`git diff` 核对无 `sm:`+ 改动 + 前后截图像素 diff 一致**（硬红线）
6. 交付 `verify/mobile/SUMMARY.md`（含桌面零变更证据）

> **Agent 完全授权声明**：执行期间可自主调用"九、工具/技能/MCP 自主授权"中**全部**技能、MCP、插件与子 Agent，无需逐一请示。本轮第一优先级：**桌面零变更（像素 diff + git diff 双证）**；第二：手机端从"马马虎虎"到"满意"；只改 <768，用 `max-md:`/scoped media；横向溢出红线、触控 ≥44px。

---

*本提示词自包含、可重复执行。只优化手机端（<768px），桌面/≥768/16:9 锁死零变更。*
*核心理念：桌面分毫不动（`max-md:` + scoped media 保证）；手机端布局/排版/触控/可读性/性能精修；横向溢出红线；触控 ≥44px；中文可读。*
