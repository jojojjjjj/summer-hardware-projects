# 网站架构、流转与 3D 升级提示词 V3 | Website Architecture, Flow & 3D Upgrade Prompt V3

> 本文件指导 AI Agent 对 `website/` 进行**架构级 + 流转级 + 3D 签名视觉升级**——这是继 05（视觉层）、06（交互层）之后的第三轮，**专门针对"整体架构与整体框架"**，并以 **3D（Three.js / WebGL）作为惊艳感的主要来源**。
> This is the third upgrade round (after 05 visual, 06 interactive), focused on **overall architecture & framework**, **page-flow transitions**, and a **3D signature hero visual (Three.js/WebGL primary)** as the main wow factor.
>
> ⚠️ 本提示词**有意解除** 05/06 中"不改变信息架构 / 不新建组件 / 禁用 WebGL"的限制。本次允许、并要求重构页面骨架与段落构成，并以 3D 为主实现签名视觉。

---

## 一、为什么还要再升一次 | Why Another Round

06（V2 交互升级）已经把单段动效、毛玻璃、光晕、全局鼠标做到了位，但**用户依然觉得"AI 味重、平庸、没有惊艳感"**。根因不在质感，而在**骨架**：

| # | 问题（已实地核对线上站 `https://jojojjjjj.github.io/summer-hardware-projects/`） | 为什么是"AI 味"根源 |
|---|---|---|
| 1 | **骨架是通用 SaaS 模板**：`Navbar → Hero → Divider → Value → Divider → Projects → Divider → LearningPath → Divider → CTA → Footer`，4 个完全一样的 `ScrollDivider` 等距切开每一段 | 节拍均匀、可预测，像模型批量生成的"段落填空"。任何玻璃/光晕打磨都救不回这套骨头 |
| 2 | **没有"签名视觉 / Hero 物体"**：Hero 右栏只是两个数字 `9` 和 `12–15`，没有任何让人停下看的"东西" | 顶级站（Stripe 的渐变网格、Linear 的产品 UI、Vercel 的部署图、Apple 的旋转设备）Hero 里都有一个**物件**；这里只有文字+数字 |
| 3 | **没有页面流转**：`app.vue` 是裸 `<NuxtPage />`，`/` ↔ `/projects` ↔ `/projects/[slug]` 之间是硬切 | 用户明确要"页面转换 / 流转动效"。当前 0 实现 |
| 4 | **段落标题公式重复**：`eyebrow + 居中标题 + grid` 在 Value / Projects / LearningPath / CTA / 详情页反复出现 5+ 次 | 同一个 header 模板套满全站 = 最强的"AI 批量生成"信号 |
| 5 | **详情页是居中模板 + 假图**：项目"图片"是项目英文名以 5% 透明度铺底，是占位符 | 占位图读起来廉价；详情页同样套用 `eyebrow+居中标题` 公式 |
| 6 | **段落高度均匀、全居中、无满幅、无重叠** | 缺乏编辑式节奏、空间张力与深度层次 |

> 质感层（设计令牌、毛玻璃、光晕、字体、配色）**已经达标，本轮不要推倒重来**——只做精修。本轮的 90% 精力放在**架构、流转、签名视觉、段落节奏**。

---

## 二、本次授权范围（与 05/06 的区别）| What's Authorized Now

| 05/06 的限制 | 本次调整 |
|---|---|
| ❌ 不改变信息架构 | ✅ **路由结构保持**（`/`、`/projects`、`/projects/[slug]` 不变），但**段落顺序、构成、高度、对齐方式可大改** |
| ❌ 不新建组件 | ✅ **可新建组件与 composable**（如 `HeroArtifact.vue`、`PageTransitionOverlay.vue`、`SectionBridge.vue`、`useViewTransition.ts`） |
| ❌ 不新增依赖 | ✅ **可新增** `@vueuse/core`、`three`、`@tresjs/core`（3D 签名视觉所需，已预授权）；其他依赖须改动前说明理由 |
| ❌ 纯 CSS+GSAP，禁 WebGL | ✅ **3D 为主**：签名视觉与关键惊艳时刻**首选 Three.js / WebGL**（推荐 `three` + `@tresjs/core` 声明式封装，或裸 `three`）；须 `<ClientOnly>` 懒挂载 + 视口外停渲染 + `prefers-reduced-motion` 降级为静态 poster + 移动端降级。CSS/SVG/GSAP 仍用于非签名层与降级兜底（见 §4.2） |

**必须保持不变的硬约束**（继承自 CLAUDE.md，违反即失败）：

- `npm run build`（`nuxt generate`）通过；所有页面保持可静态生成（无服务端运行时）
- `app.baseURL` 生产 `/summer-hardware-projects`、开发 `/` 不变
- `content/projects.ts` 数据结构不变（可在组件层用现有 `colorHex` 等字段渲染更丰富视觉，但不改数据）
- 路由 `/`、`/projects`、`/projects/[slug]` 不增不减
- 双语（中文为主，英文辅助）；中文文案不大改，可微调个别措辞去"AI 腔"
- `prefers-reduced-motion` 适配；移动端 `backdrop-filter` 降级（`@supports`）
- 375 / 768 / 1440 三断点无横向溢出
- **所有视觉验证产物（截图、脚本、报告）一律写入 `verify/`（仓库根，已 gitignore）**——不要再用 05/06 里的 `website-audit/`（已废弃，CLAUDE.md 明令禁止重建）

---

## 三、设计参考与自主研究 | Design References & Autonomous Research

### 3.1 必须研究（用浏览器实际访问 + 截图归档到 `verify/research/`）

Agent **必须**使用浏览器工具访问以下站点，**重点提取"构图法则"而非只是 CSS 参数**：

| 参考站 | 提取重点（本轮聚焦构图） |
|---|---|
| **https://uk.pinterest.com/** | **Hero 构图层次**、不对称栅格、卡片差异化 hover、毛玻璃导航 blur 值、背景微粒/噪点、**masonry 节奏**、大图与小图的尺度反差。Pinterest 的"瀑布流节奏"可直接启发 Projects 区的卡片编排 |
| **https://linear.app/** | Hero 动态排版（文字随滚动位移/缩放）、鼠标跟随光斑、**极简但不空洞的留白**、产品 UI 作为"签名视觉" |
| **https://stripe.com/** | Hero **倾斜 3D 物件**、玻璃质感、光的方向感、滚动驱动的色彩/形态变化 |
| **https://vercel.com/** | Hero 渐变网格背景、**满幅视觉**、scroll-driven 叙事、按键细腻反馈 |
| **https://rauno.me/** | 极致极简、鼠标全局影响、光标附近元素微妙响应、空间感 |
| **https://www.apple.com/**（产品页） | 滚动钉固（pinned）叙事、**段落高度大幅变化**（一段占 3 屏，一段只占半屏）、满幅大图与留白交替 |
| **https://www.dark.design/** 或 **https://www.awwwards.com/site-of-the-day/** | 任选 1–2 个当日获奖站，提取"非模板"构图手法 |

**3D 专项参考**（本轮签名视觉以 3D 为主，必看）：

| 参考站 | 提取重点 |
|---|---|
| **https://threejs.org/examples/** | 官方示例库——按 `webgl_interactive` / `particles` / `lines` / `geometry` 筛选，找"轻量但惊艳"的可迁移效果，注意 fps 与几何复杂度 |
| **https://www.brunosimon.com/** | 3D 站点标杆——交互节奏、相机运动、氛围光，但**注意反例**：过重，本项目要做克制版 |
| **https://www.apple.com/airpods-pro/** 等产品页 | Apple 用 3D/滚动钉固讲产品的方式——克制、与文案节奏咬合、移动端优雅降级 |
| **https://globe.gl/** 或 **https://universe.gl/** | 3D 节点/星图类交互参考（启发"9 项目星座"方向） |
| **https://www.awwwards.com/websites/3d/** | 3D 类获奖站集合，提取"3D 但不晕、不卡、不抢内容"的手法 |

> 3D 参考**只学手法与节奏**（相机运动、光照、交互反馈、降级策略），**不照搬场景**——本项目是硬件课程展示，3D 要服务"9 个硬件项目"的叙事。

### 3.2 研究产出（`verify/research/composition-study.md`）

每个参考站产出：

1. **截图**：Hero 区 + 1 个交互组件（≥1440px）
2. **构图笔记**（本轮重点，非 CSS 参数）：
   - 栅格分割比例、对齐方式（左/右/中/混排）
   - 段落高度节奏（是否忽大忽小、有无满幅、有无钉固）
   - 尺度反差（最大标题 vs 正文的倍数）
   - 深度层次（前景/中景/背景如何分层）
   - "签名视觉"是什么物件、如何承载品牌
3. **可迁移点**：哪些构图手法能直接用在本项目，哪些需适配

> 核心原则：**Pinterest 用来找"节奏与反差"，Linear/Stripe/Apple 用来找"签名视觉与流转"**。不要照搬配色——本站配色已定型。

---

## 四、架构升级规格 | Architecture Upgrade Spec

### 4.1 打破模板节奏（最高优先）

**现状**：4 个一样的 `ScrollDivider` 等距切 5 段，每段 `max-w-* mx-auto text-center`。

**升级**：

1. **段落高度刻意不均**：至少出现一处"影院级超长段"（≥2.5 屏，承载签名视觉或滚动叙事）与一处"紧凑带"（≤0.5 屏，一句话+一个数字），形成呼吸
2. **替换 4 个等距分隔线**为**差异化的段落桥接**（见 4.4），不再用同一个 `ScrollDivider` 复制 4 次
3. **打破居中标题公式**：段落 header 至少 3 种不同处理，禁止连续两段用同一种——例如：
   - 左对齐编辑式标题 + 行内段号 `01 / 05`
   - 超大段号数字作背景层 + 小标题叠加
   - 无 eyebrow、直接大标题
   - 标题与正文并排（标题占 4 列，正文占 8 列）
4. **不对称栅格**：≥3 段使用 7:5 / 5:7 / 8:4 / 4:4:4 错列，禁止全站居中
5. **至少一处满幅 / 出血**：让某段视觉冲破 `max-w` 容器贴到屏幕边缘（如 Projects 区的某张特色卡、或 CTA 区的背景光）
6. **至少一处重叠/层叠**：相邻元素 z 轴重叠（如签名视觉压在标题之上、卡片溢出段落边界），制造空间张力

### 4.2 Hero 签名视觉（"Hero 物体"）— 3D 为主

**现状**：Hero 右栏只有 `9` 和 `12–15` 两个数字。无"物件"。

**升级**：用一个**真正的 3D 签名视觉**替换/增强右栏，作为本轮"惊艳感"的主要来源。**首选 Three.js / WebGL**（Vue 侧用 `@tresjs/core` 声明式封装，或裸 `three`）。从以下方向**自主选一**（或组合），用 `design-shotgun` / `design-consultation` 多方案对比后定稿：

| 方向 | 说明 | 技术建议 |
|---|---|---|
| **9 项目 3D 星座 / 电路空间** ⭐推荐 | 9 个项目作为 3D 空间中悬浮的发光节点（各自 `colorHex`），由电路走线连接成一张可旋转的"立体星图"。鼠标拖拽/视差旋转、hover 节点高亮+弹出信息、滚动驱动相机推进。把"9 个项目"从数字变成**可探索的 3D 地图** | Three.js/TresJS：`Points`/`InstancedMesh` 节点 + `Line`/`TubeGeometry` 走线 + 受限 `OrbitControls` + 滚动驱动相机 `lerp` |
| **3D 等距工作台 / PCB** | 等距视角的桌面工作台：PCB、芯片、元器件、工具以 3D 几何分层摆放，鼠标视差旋转，入场逐件落入，hover 元件高亮 | Three.js/TresJS：基础几何体组合 + `Environment`/HDRI 光照 + 鼠标驱动 `camera.position` |
| **3D 卡片堆 + 相机穿梭** | 精选项目以 3D 卡片悬浮于空间，滚动时相机穿梭其间，点击卡片流转到详情（与 §4.3 共享元素衔接） | Three.js/TresJS + GSAP ScrollTrigger 驱动相机路径；卡片用 `PlaneGeometry` + 纹理 |
| **GLSL 着色器氛围场** | 自定义 GLSL 着色器做的流体/能量场/粒子背景，随鼠标与滚动响应，作 Hero 氛围底（克制，不抢标题）；可叠加在上述任一之上 | Three.js `ShaderMaterial` / `@tresjs/post-processing` |

**约束与降级（3D 必须满足，否则不通过）：**

- **`<ClientOnly>` 懒挂载**：3D 画布仅在客户端渲染，`nuxt generate` 预渲染不受影响（画布不参与 SSG HTML）
- **视口外停渲染**：`IntersectionObserver` 监听，Hero 滚出视口后 `renderer.setAnimationLoop(null)` / 暂停 RAF，省电省性能
- **`prefers-reduced-motion`**：降级为一张**静态 poster 图**（3D 场景预渲染截图或 CSS/SVG 等价图），不跑循环
- **移动端降级**：3D 在低端机/移动端重——移动端要么降级为静态 poster，要么换轻量 CSS/SVG 版本（用 `@supports`/性能探测判断，不要仅按屏宽）
- **性能预算**：首屏 LCP 不因 3D 劣化；3D 资源懒加载（不阻塞首屏文字）；目标桌面 60fps，移动端可接受降级为静态
- **首屏不空白**：3D 画布挂载前，Hero 文字与基础背景必须已可见（修复现有"GSAP `opacity:0` on mount → 首屏空白 ~3s"，见 §6）。3D 是增强层，不是首屏内容的依赖项
- 保留并精修现有视差/磁场/count-up；右栏"两个裸数字"让位给 3D 签名视觉（数字可融入 3D 场景，如节点计数）
- 3D 方案定稿后，在 `verify/after-v3/decisions.md` 写明：选型理由、依赖、性能实测（fps/帧时间）、降级策略

### 4.3 页面流转动效（本轮第二大重点）

**现状**：`app.vue` 裸 `<NuxtPage />`，路由间硬切。0 流转。

**升级**：建立统一的**页面流转系统**，覆盖 `/` ↔ `/projects` ↔ `/projects/[slug]`。

**首选方案：View Transitions API + 共享元素变形**（原生、轻量、完美适配 SSG）：

1. 新建 `website/plugins/view-transitions.ts`：拦截 `<NuxtLink>` 路由切换，包一层 `document.startViewTransition()`（降级：不支持的浏览器直接跳转）
2. **共享元素变形**：项目卡 ↔ 详情页 Hero 用相同的 `view-transition-name`（如 `project-card-{slug}` / `project-hero-{slug}`），点击时卡片**变形**飞入详情 Hero——这是"流转"的最大惊艳点（Apple/Linear 级）
3. **页面级过渡**：无共享元素时用统一的 clip-path / wipe / 淡入位移过渡，方向感与"前进/后退"一致
4. 在 `nuxt.config.ts` / `app.vue` 配置 `NuxtPage` 的 `pageTransition`（与 View Transitions 协同，避免双重动画）
5. `prefers-reduced-motion`：直接瞬切，无过渡
6. 过渡期间锁定滚动、隐藏 navbar 抖动

**备选/补充**：可加一个 `PageTransitionOverlay.vue`（全屏遮罩 wipe）作为加载态/转场兜底，但**不要**让遮罩盖过共享元素变形的精彩。

**验收**：点击项目卡 → 卡片平滑变形为详情 Hero；返回 → 反向变形回卡片位。三断点都流畅。

### 4.4 滚动编排与段落桥接

**现状**：等距 `ScrollDivider`，段落间无叙事。

**升级**：

- **段落桥接**替换等距分隔线：相邻段之间用差异化的过渡——一处"满幅色域切换"（深→更深，带 1px 冷光）、一处"重叠层"（下段向上覆盖上段底边）、一处"视差桥"（背景层以不同速度衔接）
- **全局滚动进度**：一个优雅的进度指示（不是单调进度条——可做左侧竖向段标 `01–05` 随滚动高亮，或顶部 1px 渐变线）
- **钉固/scrub 慎用**：全站**最多 2 处** pinned scrub 段（如 Projects 区 pin + 卡片堆叠轮播），过多会晕
- **入场节奏差异化**：禁止全站统一 `fade-up`；不同段用不同入场（左滑、缩放、逐字、遮罩揭示），但同屏不超 2 种
- 保留现有 `SmoothScroll`，确保与 View Transitions / pin 不冲突

### 4.5 毛玻璃 / 光晕精修（polish，非重点）

现有 `.glass-card` 三层玻璃 + 色散边已不错。仅做精修，**不重建**：

- 强化"光从上方注入"的方向感（顶部内高光更明显、底部收暗）
- 卡片 hover 的 spotlight 增加**极弱的折射色散**（边缘随光标位置泛一点项目色）
- 光晕仍是"事件"：默认不发光，hover/入视口才亮；同屏 ≤2 个发光元素
- **禁止**任何 `infinite` 呼吸/pulse（loading 除外）——继承 06 红线

### 4.6 详情页重构

**现状**：居中模板 + 假图（项目名 5% 透明度）+ `eyebrow+居中标题` 每段重复。

**升级**：

- **替换假图**为真实视觉：用 `colorHex` + CSS/SVG 渲染该项目的"标志图形"（如热成像仪的色温条、键盘的键阵、机器人的关节示意、FPGA 的逻辑门），或一张风格化的等距物件图。**禁止占位文字假图**
- **编辑式分栏**：左栏 sticky 段落导航 + 阅读进度轨，右栏内容滚动（桌面）；移动端折叠为可点章节
- 段落 header 不再全部居中：技能/硬件/日程用不同 header 处理（见 4.1）
- **prev/next 做成连续画廊**：横向滑动预览相邻项目，配合 4.3 的共享元素流转，让浏览详情页像"翻一本作品集"

---

## 五、去 AI 味——结构级清单 | Structural De-AI Checklist

逐项必须通过（这是本轮的核心验收）：

### 架构层
- [ ] 不存在 4 个一样的等距分隔线（段落桥接已差异化）
- [ ] 段落高度出现 >2x 的差异（有影院级长段 + 紧凑带）
- [ ] 至少 1 处满幅/出血视觉
- [ ] 至少 1 处 z 轴重叠/层叠
- [ ] 连续两段不使用同一种 header 公式
- [ ] ≥3 段不对称栅格
- [ ] Hero 存在 **3D 签名视觉**（不只是文字+数字），桌面 ~60fps
- [ ] 详情页无占位假图

### 流转层
- [ ] 页面间有过渡（非硬切）
- [ ] 项目卡 → 详情页有共享元素变形
- [ ] `prefers-reduced-motion` 下流转降级为瞬切
- [ ] 流转不破坏 SSG / 预渲染

### 节奏层
- [ ] 入场动效不全场统一 `fade-up`（≥3 种，同屏 ≤2 种）
- [ ] 全站 pinned scrub 段 ≤2
- [ ] 全局滚动进度指示存在且优雅

### 质感层（继承 06，仅确认未回退）
- [ ] `text-gradient` 使用 ≤2 处
- [ ] 无 `infinite` 呼吸/pulse（loading 除外）
- [ ] 标题字重无 800（hero ≤700，其余 ≤600）
- [ ] 同屏发光元素 ≤2
- [ ] 暖色作为强调 ≤3 处，冷蓝紫为主

### 文案层
- [ ] 无"极致/赋能/一站式/全方位/开启旅程"等空泛词
- [ ] CTA 具体而非空泛（"查看项目"优于"立即探索"）

---

## 六、技术注意事项 | Technical Notes

- **修复首屏空白**：现有 HeroSection 在 `onMounted` 用 `gsap.set(..., {opacity:0})` 再入场，SSG 首次绘制会空白 ~3s、LCP 差。改为：初始态用 CSS 设为可见基线（或 `opacity:1`），GSAP 仅做"从可见态之上的微位移入场"，JS 失败时内容仍可见。**全站所有入场动效都遵循此原则**——可见性不依赖 JS。
- **View Transitions 与 SmoothScroll**：转场期间暂停 smooth-scroll 的 scroll 钩子，避免抖动。
- **共享元素 `view-transition-name`**：同一时刻 DOM 里同名只能出现一次；列表页多张卡用 `project-card-{slug}` 唯一名，详情页 Hero 用 `project-hero-{slug}`，并在转场瞬间对齐。
- **性能预算**：Lighthouse 首屏 LCP 不应因签名视觉劣化；WebGL（若用）须 `IntersectionObserver` 懒启、视口外停渲染。
- **不引入外部图片**：签名视觉以 3D（Three.js/TresJS）为主、CSS/SVG 为降级兜底；可用现有 `public/` 静态素材。3D 场景用程序化几何 + 项目 `colorHex`，不依赖外部模型文件（如确需 GLTF，须懒加载并计入性能预算）。
- **3D 与 SSG**：所有 Three.js/TresJS 画布包在 `<ClientOnly>` 里，`nuxt generate` 不会执行它——预渲染 HTML 只含文字与降级 poster，SSG 不受影响。确认 `nuxt.config.ts` 不需要为 3D 改预渲染配置。
- **3D 与 View Transitions**：3D 画布是 `<canvas>`，不参与 `view-transition-name` 共享元素变形（DOM 元素才参与）。详情页流转的共享元素用 DOM 卡片↔DOM Hero；3D 仅在 Hero 区存在。确保转场期间 3D RAF 不抖动（转场开始时可选暂停渲染）。
- **TresJS vs 裸 three**：推荐 `@tresjs/core`（声明式、Vue 响应式、与 Nuxt 兼容好）；若需精细控制或 TresJS 不支持的特性，用裸 `three`。二者可混用。安装后确认 `npm run build` 仍通过（TresJS 有 Nuxt 模块，按其文档注册）。

---

## 七、工具与技能自主授权 | Autonomous Tool & Skill Authorization

执行本提示词的 Agent **被完全授权且被强烈鼓励**自主使用以下工具与技能，**无需逐项请示用户**。根据实际需要灵活组合，而非机械全跑。

### 🔍 浏览器 / 设计研究
- **browser-harness**（本机已装，经 Edge 9222 端口；连法见全局 CLAUDE.md）：访问 Pinterest / Linear / Stripe / Vercel / Apple 等参考站，截图 + 提取构图法则
- **gstack-browse** / **gstack-scrape**：无头浏览器抓取参考站构图与关键 CSS
- **deep-research**：对"顶级暗色产品官网构图手法"做多源研究

### 🎨 设计决策与多方案
- **gstack-design-consultation**：不确定某构图/签名视觉是否符合顶级标准时启动
- **gstack-design-shotgun**：对 Hero 签名视觉 / 段落桥接生成多方案对比，选出最优
- **gstack-design-review**：改动后做"设计师之眼"审查（间距/层级/对齐/AI slop）
- **gstack-design-html**：先做局部 HTML/CSS 原型验证，再并入 Vue 组件

### ✍️ 工程实现
- **frontend-skill** / **code-yeongyu-oh-my-opencode-frontend-ui-ux**：高质量 CSS / 组件 / 交互动效实现指导
- **gstack-spec**：把模糊的构图意图转成精确可执行规格

### ✅ 质量验证
- **verify**：跑本地站点，真实浏览器验证改动是否生效（必用）
- **run**：启动 `npm run dev` / `preview` 查看效果
- **gstack-qa** / **gstack-qa-only**：交互回归（导航、卡片跳转、移动端菜单、tilt、magnetic、View Transitions、共享元素变形）
- **code-review** / **gstack-review**：交付前自审 diff
- **gstack-design-review**：最终视觉审查出报告

### 🤖 子 Agent 协作（Agent 工具）
- **Explore**：并行排查现有实现（"当前 ScrollDivider / 平滑滚动 / 路由钩子在哪"）
- **frontend-dev** / **Plan**：并行处理互不重叠的改动（一个做 Hero 签名视觉，一个做 View Transitions 流转，一个做段落桥接，一个做 QA）
- 多个独立子任务可在**单条消息里并发**派发

### 📸 截图归档（一律 `verify/`）
- 改动前 → `verify/before-v3/`（三断点：`/`、`/projects`、`/projects/[slug]`）
- 设计参考 → `verify/research/`
- 改动后 → `verify/after-v3/`
- 决策与遗留 → `verify/after-v3/decisions.md`、`verify/after-v3/SUMMARY.md`

> **核心原则**：每改一个架构/流转层，必须有 `verify/` 前后截图佐证；设计效果不确定时，优先浏览器截图对比而非猜测。

---

## 八、执行阶段 | Execution Phases

### Phase 0：研究与基线 | Research & Baseline
1. `cd website && npm run dev`
2. browser-harness 三断点截当前站 → `verify/before-v3/`
3. 访问 §3.1 全部参考站，产出 `verify/research/composition-study.md`（构图笔记 + 截图）
4. 确认 `npm run build` 当前可通过
**验收**：基线截图 + 构图研究产出 + build 通过

### Phase 1：流转系统先行 | Flow System First
（先做流转，因为它影响全局骨架与共享元素命名）
- 新建 `plugins/view-transitions.ts` + 配置 `NuxtPage` `pageTransition`
- 实现项目卡 → 详情 Hero 共享元素变形（`view-transition-name`）
- `prefers-reduced-motion` 降级
**验收**：点击卡片平滑变形到详情页；返回反向；三断点流畅；截图存档

### Phase 2：Hero 3D 签名视觉 | Hero 3D Signature Visual
- 安装 `three` + `@tresjs/core`（或裸 `three`），确认 `npm run build` 通过
- 用 `design-shotgun` 出 2–3 个 3D 方案（§4.2 四个方向），对比定稿
- 实现 3D 签名视觉：`<ClientOnly>` 懒挂载、`IntersectionObserver` 视口外停渲染、reduced-motion 静态 poster、移动端降级
- 修复首屏空白（§6）；保留并精修视差/磁场/count-up
- 性能实测（桌面 fps / 帧时间 / LCP）记入 `verify/after-v3/decisions.md`
**验收**：Hero 有让人停下盯的 3D"物件"；桌面 ~60fps；首屏不空白；reduced-motion 与移动端降级均生效；截图存档

### Phase 3：架构与节奏重构 | Architecture & Rhythm
- 重构 `pages/index.vue` 段落构成：差异化高度、不对称栅格、满幅、重叠
- 替换 4 个等距分隔线为段落桥接（4.4）
- 打破居中标题公式（≥3 种 header）
- 详情页重构（4.6）：去假图、编辑式分栏、画廊式 prev/next
**验收**：§5 架构层 + 节奏层清单全 ✅；截图存档

### Phase 4：质感精修 | Polish
- 毛玻璃/光晕精修（4.5）
- 入场动效差异化、全局滚动进度
**验收**：§5 质感层清单不回退；截图存档

### Phase 5：去 AI 味总检 | De-AI Sweep
- 逐项过 §5 全部清单，每项修正后截图确认
- 文案去 AI 腔

### Phase 6：验收与回归 | QA & Sign-off
1. `npm run build` 通过
2. 三断点截图 → `verify/after-v3/`
3. `gstack-design-review` 出报告 → `verify/after-v3/design-review.md`
4. `gstack-qa` 跑交互回归（含 View Transitions / 共享元素 / 移动端）
5. `verify/after-v3/SUMMARY.md`：改了哪些文件、前后差异、签名视觉与流转的具体效果、已知遗留

---

## 九、质量红线 | Quality Gates

以下任一不达标视为**未完成**，必须返工：

1. ❌ `npm run build` 失败
2. ❌ 任一页面 375px 出现横向滚动条
3. ❌ `prefers-reduced-motion` 下仍有动画/流转残留
4. ❌ Hero 首屏空白（JS 失败时内容不可见）
5. ❌ 仍存在 4 个一样的等距分隔线
6. ❌ 无页面流转（路由间硬切）
7. ❌ 无项目卡 → 详情的共享元素变形
8. ❌ Hero 无 3D 签名视觉（仍是裸文字+数字）
9. ❌ 详情页仍有占位假图
10. ❌ 连续两段使用同一种 header 公式
11. ❌ 全站 `infinite` 动画 >0（loading 除外）／同屏发光 >2
12. ❌ `text-gradient` 使用 >2 处
13. ❌ 3D 无 `prefers-reduced-motion` 静态降级，或移动端无降级
14. ❌ 3D 画布未 `<ClientOnly>` 懒挂载 / 未视口外停渲染（SSG 或性能不达标）
15. ❌ 设计审查（design-review）评为"差"

---

## 十、执行指令 | Execution Order

将本文件粘贴到 Claude Code / Codex，Agent 将：

1. **自主**用 browser-harness / gstack-browse 访问 §3.1 参考站，产出 `verify/research/composition-study.md`
2. 按 Phase 0→6 顺序执行（Phase 1 流转先行）
3. 每个 Phase 结束输出简报（改了什么、截图路径、是否进入下一阶段）
4. 遇设计决策点用 `gstack-design-consultation` / `gstack-design-shotgun` 辅助
5. 可随时用 Agent 工具并发派子任务（Explore / frontend-dev / Plan）
6. 全部完成后产出 `verify/after-v3/SUMMARY.md` 并向用户汇报

> **Agent 完全授权声明**：执行期间，Agent 有权自主调用"七、工具与技能自主授权"中列出的**全部**技能、插件与子 Agent，无需逐一请示。遇到与现有文案/路由冲突时，优先保留业务逻辑，调整视觉/架构实现方式。设计效果不确定时，优先浏览器截图对比而非猜测。

---

*本提示词自包含、可重复执行。可在任意 Phase 重新进入、从中断点继续。*
*继承 05（视觉）/ 06（交互）的质感成果，本轮专攻架构 / 流转 / 3D 签名视觉 / 节奏。*
