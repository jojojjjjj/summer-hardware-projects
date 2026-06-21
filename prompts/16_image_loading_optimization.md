# 图片加载优化（着重报名图）提示词 | Image Loading Optimization (Signup-Focused) Prompt

> 优化全站图片加载，**着重优化点击「立即报名」后弹出的那张报名图**（当前加载太慢）。只改图片资源 + 渲染属性 + 预加载，不动设计/布局。
> Optimize image loading site-wide, focused on the signup image that appears after clicking「立即报名」(currently slow). Only image assets + render attrs + preload; no design/layout changes.

---

## 一、任务核心 | Mission Core

**一句话**：让「立即报名」弹窗里的报名图**点击后近瞬时显示**（预加载 + webp + 防 CLS），并顺手优化全站图片加载；不动视觉/布局。

**用户原话定调**：
- "优化图片的加载，着重优化点击立即报名之后那张图片的加载，当前加载的太慢了" → 报名图是重点，全站图片也要优化

> 🔗 **范围**：只改图片资源（`public/media/`）+ 图片渲染属性（`<img>`/`<picture>` 加 `width/height`/`loading`/`fetchpriority`/`srcset`）+ 预加载（`nuxt.config.ts` head 或组件内 prefetch）+ `SignupModal.vue`。**不动设计/布局/动效/文案/路由。**

---

## 二、现状（Agent 必读，已核对）| Current State

**报名图（重点）**：
- `components/SignupModal.vue` L14-19：`<img src="/media/signup-link.png" class="...md:w-[1344px]..." />`
- `SignupModal` 仅在 `open=true`（点「立即报名」）时挂载 → **图片在点击瞬间才发起 fetch**（冷缓存）→ 慢
- `/media/signup-link.png` = **109KB PNG**（1344px 宽）→ PNG 低效，转 webp 可降至 ~40-60KB
- **无 `width`/`height`** → 加载时布局抖动（CLS）
- **无预加载** → 首次点击必等网络

**其它图片（全站）**：
- `public/media/` 较大图：`rainbow-moon.jpg`(307KB)、`circuit-3d.jpg`(231KB)、`code-river.jpg`(121KB)、`blackhole-code.jpg`(100KB)、`thermal-cover.jpg`(70KB) 等——JPG/PNG 未压 webp
- 多处 `<img>` 缺 `width`/`height`（CLS）、缺 `loading="lazy"`（非首屏图未懒加载）、缺 `srcset`（移动端仍下桌面大图）
- **侧注（非本轮范围，仅提示）**：`public/media/` 有多个大视频（`code-river.mp4` 12.5MB、`blackhole-code.mp4` 10MB、`rainbow-moon.mp4` 10MB、`clock-motion.mp4` 9.7MB、`gears-tower.mp4` 7.3MB、`hero-scrub.mp4` 4.6MB）——这些视频会抢带宽、间接拖慢图片。本轮只做图片；视频压缩若需，单独提示用户。

---

## 三、报名图优化规格（重点）| Signup Image Spec

### 3.1 转码 + 压缩
- `/media/signup-link.png` → `/media/signup-link.webp`（目标 < 60KB，1344px 宽保清晰）。用 `cwebp`/`sharp`/`node_repl`+`sharp`。
- 保留 png 作 `<picture>` 的 `<source>` fallback（旧浏览器），或直接换 webp（现代浏览器全覆盖）。

### 3.2 预加载（核心——让点击时近瞬时）
三选一或组合（推荐组合 1+2）：
1. **`<link rel="preload" as="image" href="/media/signup-link.webp">`** 加到 `nuxt.config.ts` 的 `app.head.link`（全站预加载，小文件可接受）。或用 `imagesrcset`/`imagesizes` 配合。
2. **CTA 悬停/可见即 prefetch**：`CtaSection.vue` 当按钮 `mouseenter`/`focus` 或 section 进视口时，`new Image().src = '/media/signup-link.webp'` 预热（用户点之前已缓存）。
3. **隐藏 `<img>` 挂载**：`CtaSection` 进视口时渲染一个 `hidden` `<img src=...>`（浏览器自动缓存），点击时秒显。
- 配合 `fetchpriority="high"`（preload 或 img）。

### 3.3 防 CLS + 加载态
- `SignupModal` 的 `<img>` 加 `width`/`height`（或 `aspect-ratio`，按报名图实际比例）→ 加载中不抖。
- **加载态**：图片未 `onload` 前显骨架/模糊占位（`bg-bg-elevated` + pulse 或 blur-up），避免弹窗空白。
- `decoding="async"`。

### 3.4 响应式（可选）
- 生成小尺寸变体（如 672px）供移动端 `srcset`（移动端不必下 1344px）。

---

## 四、全站图片优化（次要）| Site-Wide Image Spec

- **转 webp**：`rainbow-moon.jpg` / `circuit-3d.jpg` / `code-river.jpg` / `blackhole-code.jpg` / `thermal-cover.jpg` 等 → webp（目标体积降 40-70%）。`<picture>` + `<source type="image/webp">` + `<img src=原jpg fallback>`，或直接换 webp。
- **懒加载**：非首屏 `<img>` 加 `loading="lazy"`（首屏图如 hero/cover 用 `loading="eager"` + `fetchpriority="high"`）。
- **防 CLS**：所有 `<img>` 补 `width`/`height`（或 `aspect-ratio`）。
- **响应式 `srcset`**：大图（cover、section bg）生成 2-3 档尺寸，`srcset` + `sizes`，移动端下小图。
- **不换图、不改裁切、不动视觉**——只换格式/加属性/加尺寸变体。

---

## 五、技术约束 | Technical Constraints

- **只改**：`public/media/` 图片资源（转码/加变体）+ 各组件 `<img>`/`<picture>` 属性 + `nuxt.config.ts` head（preload）+ `SignupModal.vue`/`CtaSection.vue`（预加载逻辑）。**不动设计/布局/动效/文案/路由/数据。**
- **图片视觉不变**：转 webp 不损明显画质（SSIM ≥ 0.95 / 肉眼无差）；不改裁切/比例。
- **无新重依赖**（`sharp` 若需可通过 `node_repl` 一次性用，或 `cwebp` CLI；不进 npm 依赖）。
- **保持**：`npm run build` 通过；SSG；`app.baseURL`；`prefers-reduced-motion`（骨架 pulse 在 reduced-motion 下关）。
- **视觉验证产物一律 `verify/img-loading/`**

---

## 六、视觉检测 + 性能审查 | Visual QA & Perf Review

### 6.1 报名图（重点）性能检测
- browser-harness **节流网络**（Slow 3G / Fast 3G）测「点击立即报名 → 图片显示」耗时，before/after → `verify/img-loading/signup-loadtime.md`
- 清缓存首次点击：目标 < 300ms（Fast 3G）/ 近瞬时（正常网络 + 预加载命中）
- 重复点击（缓存命中）：瞬时
- 截图：点击后 0ms / 200ms / 500ms 状态（确认骨架 → 图显）

### 6.2 全站图片
- Lighthouse（mobile + desktop）`Largest Contentful Paint` / `Cumulative Layout Shift` / `Total image weight` before/after
- 截图各页确认图片视觉无变化（仅格式/属性变）
- `verify/img-loading/captures/`

### 6.3 审查
- `gstack-design-review`：确认图片视觉无回退（webp 画质、布局未抖）→ `verify/img-loading/design-review.md`
- **可选** 多 agent 评审团（用户未强制；以 Lighthouse 指标 + design-review 为准）

---

## 七、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**，**无需逐项请示**：

- **Agent fan-out**：Explore（清点全站 `<img>` + 图片资源）、frontend-dev（报名图优化、全站图优化，互不重叠）、QA（性能 before/after + 视觉无回退）
- **browser-harness**：节流测报名图加载耗时、Lighthouse、截图
- **Bash `cwebp`/`sharp`/`node_repl`**：PNG/JPG → webp、生成响应式尺寸变体、压图
- **MCP `vision`**：确认 webp 画质无回退、布局未抖（子 agent 直调 `mcp__vision__describe_image`）
- **gstack-design-review** / **code-review**：视觉审查 + diff 自审
- **verify** / **run**：本地起站验证

### 📸 归档（`verify/img-loading/`）
- `signup-loadtime.md`（报名图节流耗时 before/after）、`lighthouse-before/after`、`captures/`、`design-review.md`、`SUMMARY.md`

---

## 八、执行阶段 | Execution Phases

### Phase 0：盘点 + 基线
1. `Read SignupModal.vue` / `CtaSection.vue`；Explore 清点全站 `<img>` + `public/media/` 图片资源
2. browser-harness 节流测报名图耗时 + Lighthouse → `verify/img-loading/before/`
**验收**：图片清单 + 基线性能

### Phase 1：报名图优化（重点）
- `signup-link.png` → webp；预加载（preload + CTA hover/可见 prefetch）；`width/height` + 加载态骨架
**验收**：节流下点击显示耗时显著下降、缓存命中瞬时；截图存档

### Phase 2：全站图片优化
- 大 JPG/PNG → webp；`loading`/`width`/`height`/`srcset` 补齐
**验收**：Lighthouse 图片总重下降、CLS 降低、视觉无回退

### Phase 3：QA & 汇报
- `gstack-design-review` + 节流复测 + Lighthouse before/after
- `verify/img-loading/SUMMARY.md`：报名图耗时 before/after、全站图片减重、LCP/CLS 变化、已知遗留

---

## 九、质量红线 | Quality Gates

1. ❌ 报名图点击后仍慢（节流 Fast 3G 首次显示 > 800ms 或未预加载）
2. ❌ 报名图加载时弹窗空白无骨架（CLS / 空白感知）
3. ❌ webp 画质肉眼回退（模糊/色阶断层）
4. ❌ 任一图片因加 `width/height` 比例错导致变形
5. ❌ 改了设计/布局/动效/文案/路由（只应换格式+加属性+预加载）
6. ❌ `npm run build` 失败 / SSG 破
7. ❌ 首屏图被误加 `loading="lazy"`（拖慢 LCP）

---

## 十、执行指令 | Execution Order

1. `Read SignupModal.vue` / `CtaSection.vue`；Explore 清点全站图片
2. **fan-out** 报名图优化 + 全站图优化 + QA（并发）
3. 按 Phase 0→3 执行
4. browser-harness 节流测报名图耗时 + Lighthouse before/after + 截图
5. `gstack-design-review` 确认视觉无回退
6. 交付 `verify/img-loading/SUMMARY.md`

> **Agent 完全授权声明**：可自主调用"七、工具/技能/MCP 自主授权"中全部技能、MCP、插件与子 Agent，无需逐一请示。第一优先级：**报名图点击近瞬时（预加载+webp+骨架）**；第二：全站图片减重、防 CLS、视觉无回退。

---

*核心理念：报名图靠"预加载 + webp + 防 CLS + 骨架"做到近瞬时；全站图靠 webp + lazy + srcset + width/height 减重防抖；视觉分毫不变。*
