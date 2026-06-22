# Safari（Mac + iPhone）专属适配提示词 | Safari (Mac + iPhone) Adaptation Prompt

> 专门修 **Safari**（Mac 桌面 Safari + iPhone Safari）上的排版打架问题——元素互相重叠/错位/溢出，阅读体验差。**用 Playwright WebKit 当 Safari 代理诊断**（browser-harness 只能驱动 Edge），Safari 专属修复，**不破坏 Chrome/Edge/Firefox**（前后截图必须一致）。不动设计/内容/路由。
> Fix Safari (Mac + iPhone) layout-fighting issues. Use Playwright WebKit as Safari proxy (browser-harness is Edge-only). Safari-scoped fixes; don't break Chrome/Edge/Firefox (pixel-identical before/after). No redesign/content/route changes.

---

## 一、任务核心 | Mission Core

**一句话**：Mac Safari + iPhone Safari 是本站最重要的两个场景，当前在 Safari 上**排版互相打架**（元素重叠/错位/溢出、阅读体验差）。用 Playwright WebKit 诊断真实问题，做 Safari 专属修复，**不破坏 Chrome/Edge/Firefox**，不动设计。

**用户原话定调**：
- "针对 mac 和手机端的适配，这是这个网页最重要的两个应用场景" → Mac Safari + iPhone Safari 是重点
- "针对 safari，现在在 safari 上会有严重的问题，排版之间会相互打架，导致阅读体验很差" → Safari 排版打架=元素重叠/错位/溢出

> 🔗 **范围**：只改 CSS（`main.css` / 组件 `<style>` / `tailwind.config.ts`）+ `nuxt.config.ts` 的 viewport meta + 必要的 Safari 专属 JS feature-detect。**不动设计/布局结构/内容/路由/数据。Chrome/Edge/Firefox 前后像素一致。**

---

## 二、现状（Agent 必读，已核对）| Current State

**Safari 已知元凶（已 grep 确认位置）：**

| 元凶 | 位置 | Safari 问题 |
|---|---|---|
| **`body { overflow-x: clip }`** | `main.css:77`（注释说为保 sticky 才用 clip 不用 hidden） | **Safari <16 不支持 `overflow: clip`** → body 横向不裁切 → 宽元素（marquee/横滚/视差层）横向溢出 → **排版打架的首要嫌疑** |
| 大量 `backdrop-filter` | `main.css`(glass-card/navbar/apple-blur 多处)、`HeroArtifact`、`HeroDock` | Safari 的 backdrop-filter 与 overflow/transform 叠加会**创建意外层叠上下文**、裁切/遮挡子元素、重绘抖动 |
| `mask-composite: exclude` + `-webkit-mask-composite: xor` | `main.css:149-152`（glass-card::after 色散边）、`HeroDock:158-160` | Safari mask-composite 渲染不稳→渐变边**盖住卡片内容**或消失 |
| `min-h-screen`（100vh） | `HeroSection:2`、`JackAbout:2`、`layouts/default.vue:2`、`pages/projects/index.vue:2` | **iPhone Safari 100vh 经典 bug**：地址栏致 100vh 偏高→Hero 过高、内容被推/与下段重叠 |
| viewport meta 缺 `viewport-fit=cover` | `nuxt.config.ts:20`（`width=device-width, initial-scale=1, maximum-scale=5`） | iPhone 刘海/底部条 `env(safe-area-inset-*)` 不生效→内容被刘海遮挡 |
| `position: sticky` + 祖先 transform | jack 组件 sticky-stack（视差/tilt/magnetic transform 祖先） | **transform 祖先会破坏 sticky**→sticky 元素不钉、滚动错位/重叠（"打架"） |
| `mix-blend-mode: overlay`（noise） | `main.css` noise-overlay | Safari 与 backdrop-filter 叠加层叠异常 |
| flex `gap` / `clamp()` / `text-wrap: balance` | 全站 | 旧 Safari（<14.1 无 flex gap、<15.4 无 text-wrap balance）布局塌/换行不同 |

**工具关键约束**：`browser-harness` 只能驱动 **Edge**（本机无 Chrome/Safari CDP）。**Safari 诊断须用 Playwright WebKit**（`npx playwright install webkit`，已装 playwright 于 `website/node_modules`）。Playwright WebKit ≠ 真实 Safari（WebKit 分支，接近但不完全一致，如字体渲染/viewport-fit），**最终须用户在真机 Mac/iPhone Safari 复核**。

---

## 三、诊断（Agent 必做）| Diagnose

### 3.1 Playwright WebKit 截图诊断
写一个 `verify/safari/safari-capture.mjs`（Playwright，resolve 自 `website/node_modules`）：
- **Mac Safari 代理**：`webkit` launch，1440×900（+ 1280×800），截 `/`、`/projects`、`/projects/<slug>` 全页 + 逐 section
- **iPhone Safari 代理**：`webkit` + `devices['iPhone 13']`（390×844）/`iPhone SE`（375×667）device emulation，截同上
- 存 `verify/safari/captures/webkit-{mac,iphone}-*.png`
- 若 `webkit` 未装：`cd website && npx playwright install webkit`

### 3.2 找"打架"点
- **MCP `vision`**（`describe_image`）逐 section 分析：哪些元素重叠/错位/溢出/被裁切/被遮挡
- 对照 Edge（browser-harness）同 section 截图，找 **WebKit 与 Edge 的差异** = Safari 问题点
- 重点查：横向溢出滚动条、Hero/section 高度异常、sticky 不钉、卡片内容被遮、刘海遮挡、文字换行不同
- 产出 `verify/safari/audit.md`：每 section 问题 + 对应元凶 + 截图引用

---

## 四、Safari 专属修复规格 | Safari-Scoped Fixes

**原则**：优先 Safari 专属/scoped 修复（`-webkit-` 前缀、`@supports`、`@media` Safari-targeting、`env()`），**尽量不动共享 CSS 值**；必须动共享值时，用 `@supports`/层叠保证 Chrome 不受影响。逐项按诊断结果修：

### 4.1 `overflow-x: clip` → Safari 兜底（首要）
```css
body { overflow-x: clip; }  /* 现状 */
/* Safari <16 不支持 clip → 加兜底，保横向裁切不破坏 sticky */
@supports not (overflow: clip) {
  body { overflow-x: hidden; }  /* 旧 Safari 兜底（hidden 可能影响 sticky，但旧 Safari sticky 本就弱） */
}
```
或：把横向裁切移到非 sticky 祖先的包裹层、用 `overflow-x: hidden` 在 `html` + `clip` 在 `body` 组合——agent 按诊断选**既裁切又不破坏 sticky** 的方案，验证 WebKit 上横向溢出消失 + sticky 仍工作。

### 4.2 移动视口高度（iPhone 100vh bug）
- Hero/JackAbout 的 `min-h-screen`（100vh）→ iPhone Safari 地址栏致过高。改用 `100dvh`（动态视口）+ `100vh` 兜底：
```css
@supports (height: 100dvh) {
  .min-h-screen, [class*="min-h-screen"] { min-height: 100dvh; }  /* 或新增 .min-h-dvh */
}
```
- 或 tailwind 加 `min-h-dvh` 工具类，Hero/JackAbout 用 `min-h-screen min-h-dvh`（dvh 覆盖 vh，旧浏览器退回 vh）。验证 iPhone WebKit Hero 不再过高/重叠下段。

### 4.3 viewport-fit=cover + safe-area（iPhone 刘海）
- `nuxt.config.ts` viewport meta 加 `viewport-fit=cover`：
```
content: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover'
```
- 导航/CTA/底部在 iPhone 加 `env(safe-area-inset-*)` padding（`max-md:` / `@media(max-width:767px)` scoped，不碰桌面）。
- 验证 iPhone WebKit 刘海不遮内容。

### 4.4 backdrop-filter 层叠/裁切
- 若诊断发现 backdrop-filter 卡片**裁切/遮挡子元素**：检查父级 `overflow`/`transform`/`contain`，避免 backdrop-filter 与 will-change/transform 祖先叠加；必要时给 glass-card 加 `isolation: isolate` 或 `contain: paint` 稳层叠。
- iOS backdrop-filter **性能**：多个重 blur 在 iPhone 可能抖动→移动端降级 blur 半径或 `@media(max-width:767px)` 减层数（不碰桌面视觉）。

### 4.5 mask-composite 色散边
- 若 `glass-card::after` / `HeroDock` 渐变边在 WebKit **盖住内容或消失**：用 `@supports (-webkit-mask-composite: xor)` 限定、或 Safari 下简化为单色 `border` 兜底：
```css
@supports not (mask-composite: exclude) {
  .glass-card::after { display: none; }  /* 或改 border */
}
```

### 4.6 sticky + transform 祖先
- 若 sticky 元素不钉：找其 transform 祖先（视差/tilt/magnetic），把该 transform 移到不影响 sticky 的层级、或用 `contain`/重组包裹层，使 sticky 祖先链无 transform。**不改桌面视觉**，只调结构层。

### 4.7 旧 Safari 兼容（flex gap / text-wrap / clamp）
- flex `gap`：旧 Safari <14.1 无 → 若诊断到塌陷，加 `@supports not (gap: 1px) { ... margin 兜底 }`（仅当真有旧 Safari 用户；现代 Safari 多数支持，按诊断决定是否做）。
- `text-wrap: balance`：`@supports (text-wrap: balance)` 已隐式兜底（不支持则忽略，无破坏）——一般无需改。
- `clamp()`：现代 Safari 支持；若旧版字号塌，加 `@supports` 兜底固定值（按诊断）。

> **所有修复不得改桌面 Chrome 视觉**——用 `@supports`/scoped media/`-webkit-` 前缀隔离；改前先确认对 Chrome 无影响，改后 Chrome 截图 diff 验证。

---

## 五、锁死 + 不破其它浏览器 | Lock & No-Regression

- **不动**：设计/布局结构/内容/文案/路由/数据/全局 token 既有值。只加 Safari 专属修复。
- **Chrome/Edge/Firefox 前后像素一致**（硬红线）：browser-harness（Edge）截 1440/1280/768/375 before/after，**diff 必须无可见差异**。`git diff` 审查：共享 CSS 值改动须有 `@supports`/scoped 隔离，不影响非 Safari。
- **Safari 修复不得引入新设计**——只修 breakage，不改外观。
- **保持**：`npm run build` 通过；SSG；`app.baseURL`；双语；`prefers-reduced-motion`。

---

## 六、技术约束 | Technical Constraints

- **只改**：`main.css` / 组件 `<style>` / `tailwind.config.ts`（加 Safari 工具类）+ `nuxt.config.ts` viewport meta + 必要 Safari feature-detect JS。**不动 .vue 模板结构/内容/路由/数据。**
- **Safari-scoped 优先**：`-webkit-` 前缀、`@supports`、`@media` Safari-targeting、`env()`；共享值改动须 `@supports`/层叠隔离。
- **无新重依赖**（Playwright webkit 已可通过 `npx playwright install webkit` 装，不算 npm 依赖）。
- **视觉验证产物一律 `verify/safari/`**

---

## 七、视觉检测 + 审查 | Visual QA & Review

### 7.1 Safari（Playwright WebKit）before/after
- Mac 1440×900 + 1280×800：全页 + 逐 section before/after → `verify/safari/captures/`
- iPhone 390×844 + 375×667：同上
- **MCP `vision`** 对比：after 上"打架"问题（重叠/错位/溢出/遮挡）消除
- **真机复核标记**：`verify/safari/real-device-checklist.md`——列出须用户在真机 Mac/iPhone Safari 复核的点（WebKit 与真实 Safari 差异：字体渲染、viewport-fit、-webkit-overflow-scrolling 等）

### 7.2 其它浏览器不回退（硬红线）
- browser-harness（Edge）截 1440/1280/768/375 before/after → **像素级一致**
- `git diff` 审查共享 CSS 改动有 Safari 隔离

### 7.3 审查
- `gstack-design-review`：Safari（WebKit 截图）上排版正常、与 Chrome 视觉一致（除 Safari 专属兜底）→ `verify/safari/design-review.md`
- **可选** 多 agent 评审团（用户未强制；以 WebKit 截图正常 + Chrome 不回退为准）

---

## 八、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**，**无需逐项请示**：

### 🤖 子 Agent / 编排
- **Agent fan-out**：Explore（grep Safari 元凶 + 读 main.css/组件 `<style>`）、frontend-dev（按 section 修 Safari，互不重叠）、QA（WebKit 诊断 + Chrome 不回退验证）
- **Plan**：先出诊断清单 + 元凶→修复映射

### 🔍 Safari 诊断 / 验证
- **Playwright WebKit**：`verify/safari/safari-capture.mjs`，Mac + iPhone device emulation 截图；`npx playwright install webkit` 装引擎
- **browser-harness**（Edge）：Chrome 基线前后对比（不回退验证）
- **MCP `vision`**（`describe_image`）：分析 WebKit 截图的"打架"点 + before/after 对比（子 agent 直调 `mcp__vision__describe_image`）
- **gstack-design-review**：Safari 排版审查

### 🛠 验证
- **MCP `node_repl`**：跑 Playwright 脚本、批量截图 diff（WebKit vs Edge、before/after）
- **verify** / **run**：本地起站
- **code-review** / **gstack-review**：diff 自审（**重点核对 Chrome 不回退 + 只加 Safari 修复**）

### 📸 归档（`verify/safari/`）
- `audit.md`（WebKit 问题清单 + 元凶）、`safari-capture.mjs`、`captures/`（WebKit Mac/iPhone + Edge baseline before/after）、`real-device-checklist.md`、`design-review.md`、`SUMMARY.md`

> **核心原则**：Playwright WebKit 诊断 Safari；Safari-scoped 修复；Chrome/Edge 像素不回退；不动设计；真机复核清单。

---

## 九、执行阶段 | Execution Phases

### Phase 0：诊断 + 基线
1. `Read main.css` + grep Safari 元凶（`overflow.*clip`/`backdrop-filter`/`mask-composite`/`min-h-screen`/`sticky`）+ 读组件 `<style>`
2. 写 `safari-capture.mjs`，`npx playwright install webkit`，截 WebKit Mac+iPhone 全页+逐 section + Edge 基线 → `verify/safari/before/`
3. MCP `vision` 找"打架"点，产出 `audit.md`（问题→元凶映射）
**验收**：WebKit 诊断清单 + 基线截图

### Phase 1：逐项 Safari 修复
- 按 §4 修：overflow-clip 兜底、100dvh、viewport-fit=cover+safe-area、backdrop-filter 层叠、mask-composite 兜底、sticky 祖先、旧 Safari flex gap（按诊断）
- 每修一项：WebKit 截图确认问题消 + Edge 截图确认不回退
**验收**：WebKit "打架"问题消除；截图存档

### Phase 2：全场景验证
- WebKit Mac 1440/1280 + iPhone 390/375 全页 after；Edge 同尺寸 before/after diff 像素一致
- `gstack-design-review` 出报告
**验收**：Safari（WebKit）排版正常 + Chrome 不回退（硬红线过）

### Phase 3：QA & 汇报
- `real-device-checklist.md`（真机复核点）
- `verify/safari/SUMMARY.md`：Safari 问题清单、修复项、WebKit before/after、Chrome 不回退证据、真机待复核项、已知遗留

---

## 十、质量红线 | Quality Gates

1. ❌ **Chrome/Edge 任一断点前后有可见变化**（Safari 修复泄漏到非 Safari）——**最高红线**
2. ❌ 共享 CSS 值改动无 `@supports`/scoped 隔离（影响 Chrome）
3. ❌ WebKit 上"排版打架"问题仍在（重叠/错位/溢出/遮挡未消）
4. ❌ iPhone WebKit 仍有 100vh 致 Hero 过高/刘海遮挡
5. ❌ 改了设计/布局结构/内容/路由/数据
6. ❌ `npm run build` 失败 / SSG 破
7. ❌ sticky 在 WebKit 上被修坏（不钉/错位）
8. ❌ 未提供真机复核清单（WebKit ≠ 真实 Safari，须标注待真机复核项）

---

## 十一、执行指令 | Execution Order

1. `Read main.css` + grep Safari 元凶；读组件 `<style>`
2. `npx playwright install webkit`；写 `safari-capture.mjs`；截 WebKit Mac+iPhone + Edge 基线
3. MCP `vision` 诊断"打架"点 → `audit.md`
4. **fan-out** 按 section 修 Safari + QA（并发，互不重叠）
5. 按 Phase 0→3 执行
6. WebKit before/after + Edge diff 像素一致 + `gstack-design-review`
7. 交付 `verify/safari/SUMMARY.md` + `real-device-checklist.md`

> **Agent 完全授权声明**：可自主调用"八、工具/技能/MCP 自主授权"中全部技能、MCP、插件与子 Agent，无需逐一请示。第一优先级：**Safari 排版打架修好（WebKit 验证）+ Chrome/Edge 像素不回退**；第二：iPhone 100vh/刘海/safe-area；不动设计；出真机复核清单。

---

*核心理念：Playwright WebKit 当 Safari 代理诊断；Safari-scoped 修复（@supports/-webkit-/env/dvh）；Chrome 不回退（硬红线）；不动设计；真机复核收尾。首要元凶：body `overflow-x: clip` 在 Safari<16 不裁切。*
