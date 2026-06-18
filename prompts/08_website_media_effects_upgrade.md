# 网站媒体素材与特效整合升级提示词 V4 | Website Media & Effects Integration Prompt V4

> 本文件指导 AI Agent 把**新收集的视觉素材（图片 + 视频）**与**精选交互特效**，**选择性地**融合进当前 `website/`，让界面更炫酷。
> Selectively integrate newly-collected art/video assets + cherry-picked interaction effects into the existing site. **Not a global rebuild** — surgical, high-impact placement only.
>
> 🔗 **与 07 的关系**：07（架构 / 流转 / 3D 签名视觉）是骨架层；本提示词 V4 是**媒体 + 特效层**，叠加在 07 之上。若 07 尚未执行，Agent 须把媒体槽位规划进 07 重构后的段落里（见 §4），不要各自为政。Hero 区若 07 的 3D 与本轮的鼠标擦洗视频冲突，用 `design-shotgun` 选型或让二者分层共存（视频作氛围底、3D 作主体）。

---

## 一、任务核心 | Mission Core

**一句话**：把用户找到的 8 个艺术设计素材（7 图 + 1 视频）和 2 份参考特效稿里的**精选效果**，**有选择地**融进现有网站，做出几个"炫酷瞬间"，而不是把全站换成新设计。

**两条铁律**（用户明确要求）：

1. **不要全局应用**——只挑几个高影响力位置下刀，其余段落保持 07/现有质感。
2. **直接融合 vs 图片占位**：
   - 适合当静态背景/元素的图片 → **直接融合**进界面；
   - 更适合做成视频的素材 → **现在用图片占位**，搭好视频组件与替换槽，用户做完视频后一键替换。

---

## 二、素材清单与入库 | Asset Inventory & Ingestion

### 2.1 源目录

素材在仓库外：`D:\教书\艺术设计图片\`（中文路径）。**必须先复制进** `website/public/media/`（Nuxt 静态资源，SSG 直接服务），并改成 ASCII 文件名（URL 安全）。

### 2.2 入库映射表（建议名 → web 路径 → 用途 → 融合方式）

| 源文件 | 入库路径 | 内容 | 建议用途 | 融合方式 | 备注 |
|---|---|---|---|---|---|
| 黑洞文字.jpg (101KB) | `/media/blackhole-code.jpg` | 黑洞 + 代码流涌入（暗靛蓝 + 暖橙视界 + 白代码） | 叙事/CTA 桥接段背景，或 Hero 氛围底 | **直接融合** | 小图，质量好；"代码→黑洞"=从代码到硬件的隐喻 |
| 立体线路.jpg (231KB) | `/media/circuit-3d.jpg` | 3D 电路板，电蓝/红霓虹走线 | Projects 段背景，或硬件主题段 | **直接融合** | 最贴硬件主题；暗化 + overlay 后放文字 |
| 代码河.jpg (121KB) | `/media/code-river.jpg` | 暗方块 + 绿色数据流（matrix 感） | 软件代码主题段背景 | **图片占位→视频** | 绿色稍偏离冷靛蓝调；适合作"代码河"视频占位 |
| 彩虹河月亮.jpg (307KB) | `/media/rainbow-moon.jpg` | 宇宙门 + 彩虹光束 + 山脉 | 氛围/CTA 段背景（克制） | **图片占位→视频** | 彩虹需压暗/降饱和以配冷调；适合作氛围视频占位 |
| 流淌齿轮.png (7.3MB) | `/media/gears-flow.webp` | 半透明齿轮组，冷靛蓝 + 金属 | 机械/硬件段背景（竖图） | **图片占位→视频** | "流淌"=想动；竖图适合高段；**须转 webp + 压缩** |
| 横幅钟表.png (6.2MB) | `/media/clock-banner.webp` | 黑白雕刻风钟表机芯，横幅 | 横幅/分隔元素 + 视频海报 | **直接融合（作海报/横幅）** | **须转 webp + 压缩**；与下方视频配套 |
| 钟表运动.mp4 (8.4MB) | `/media/clock-motion.mp4` | 钟表机芯运动视频 | LearningPath/时间线段背景视频 | **直接融合（唯一真视频）** | 钟=时间=12-15 天日程；见 §5.2 |
| 蓝白手艺术图.png (7.7MB) | `/media/hand-art.webp` | 手 + 鸟 + 几何拼贴，冷靛蓝 | Value/理念段点缀元素 | **直接融合（点缀）** | "手"=动手造物；**须转 webp + 压缩** |

> 入库时：大 PNG（6–8MB）**必须**转 webp 并压缩（目标 < 500KB），可用 `sharp` / 在线工具 / nuxt image（若装）。JPG 小图可直接用。视频保持 mp4，懒加载。

### 2.3 处理指令（Agent 执行）

1. 创建 `website/public/media/`
2. 按上表把 8 个文件复制并改名进 `website/public/media/`
3. 大 PNG 转 webp 压缩；记录前后体积到 `verify/after-v4/asset-optimization.md`
4. 在 `website/content/` 或组件常量里登记素材清单（路径 + 用途 + 是否占位），方便后续替换

---

## 三、参考特效稿 | Reference Effect Specs

两份参考稿在 `prompts/网页效果提示词/`（**React + framer-motion**，须移植到 **Nuxt/Vue/GSAP**，不要照搬 React 代码）：

| 文件 | 核心可移植效果 | 本轮是否采用 |
|---|---|---|
| `hero page 小人.txt`（Mainframe） | **① 鼠标擦洗视频**：背景 `<video>` 不自动播放，随**水平鼠标移动**前后擦洗（`delta → video.currentTime`，`onSeeked` 队列防 seek 洪水）；② 模糊引语标签；③ 打字机文字；④ 胶囊按钮 hover 反色 | **① 头号采用**（建占位槽，见 §5.1）；③ 采用（§5.5）；②④ 可选 |
| `landing page opt.txt`（Prisma） | **⑤ 背景视频 + SVG 噪点 overlay + 渐变 overlay**；⑥ `WordsPullUp` 标题（逐词上拉 stagger）；⑦ **滚动逐字透明度揭示**（每字 opacity 0.2→1 随滚动）；⑧ 视频卡（卡片背景视频） | ⑤采用（§5.2，配钟表视频）；⑥采用（§5.3，择段标题）；⑦采用（§5.4，择一段叙事）；⑧采用（§5.6，一张特色项目卡） |

> **移植要点**：framer-motion 的 `useInView`/`useScroll` → 现有 `useInView` composable 或 GSAP `ScrollTrigger`；React hooks → Vue composables；`motion.span` → GSAP timeline 或 CSS。复用现有 `useReducedMotion`/`useGlobalMouse`。

---

## 四、选择性融合方案（建议落位，Agent 可调整）| Selective Placement

> 原则：**少而精**。全站只做 5–6 个"炫酷瞬间"，其余段落不动。Agent 可用 `design-shotgun` 验证落位。

| # | 位置 | 素材 / 效果 | 融合方式 |
|---|---|---|---|
| 1 | **Hero 区** | **鼠标擦洗视频**（§5.1）作氛围底 / 签名互动 + 07 的 3D 主体分层共存；占位海报用 `blackhole-code.jpg` 或 `circuit-3d.jpg` | 图片占位→视频（建好 `useMouseScrubVideo` 组件，待用户放视频） |
| 2 | **Projects 段背景** | `circuit-3d.jpg` 暗化作底 + overlay | 直接融合 |
| 3 | **LearningPath / 时间线段** | `clock-motion.mp4` 背景视频（§5.2：autoplay loop muted + 噪点 + 渐变）；海报 `clock-banner.webp` | 直接融合（唯一真视频） |
| 4 | **叙事/CTA 桥接段** | `blackhole-code.jpg` 背景 + **滚动逐字透明度揭示**（§5.4）一段使命/理念文案 | 直接融合 + 效果 |
| 5 | **段标题（择 2–3 处）** | `WordsPullUp`（§5.3）替换统一 fade-up | 效果移植 |
| 6 | **特色项目卡（1 张）** | 视频卡（§5.6），背景用占位图/未来视频 | 图片占位→视频 |
| 7 | **机械/硬件段 或 Value 段** | `gears-flow.webp`（占位→视频）或 `hand-art.webp`（点缀） | 图片占位→视频 / 直接融合 |
| 8 | **Hero 副标 / 某段标语** | 打字机（§5.5） | 效果移植 |

**未落位的素材**（`code-river.jpg`、`rainbow-moon.jpg`）作为媒体库备用，Agent 视构图需要择用，但**不要为了用而用**——偏离冷调的（绿色代码河、彩虹）须压暗/降饱和或克制使用。

---

## 五、特效移植规格 | Effect Port Specs

### 5.1 ⭐ 鼠标擦洗视频（Mouse-scrub Video）— 头号特效

**来源**：`hero page 小人.txt`。**用途**：Hero 或签名段的背景视频，随水平鼠标移动前后擦洗，产生"鼠标拨动时间"的惊艳感。

**实现**（Vue + GSAP，不用 framer-motion）：

1. 新建 `composables/useMouseScrubVideo.ts`：
   - 接收 `<video>` ref 与 `{ sensitivity = 0.8 }`
   - `window` `mousemove`：`delta = currentX - prevX`；`targetTime += (delta / innerWidth) * sensitivity * duration`；clamp `[0, duration]`
   - 用 `video.currentTime = targetTime` 寻址；`onSeeked` 里若 `targetTime` 又变了则继续寻，防 seek 洪水
   - `prefers-reduced-motion` / 触摸设备 → 不绑定，退化为静态海报或短 autoplay loop
   - 视口外（`IntersectionObserver`）→ 不寻址、不监听
2. 新建组件 `components/MouseScrubVideo.vue`：
   - `<video muted playsInline preload="auto" :poster="poster">`，**不 autoplay**
   - 当前无视频 src 时：只显示 `poster`（占位），并在组件上留 `<!-- TODO: drop scrub video at /media/xxx.mp4 -->` 与一个 prop `src`（空则用海报）
   - 桌面才启用擦洗；移动端显示海报
3. **占位约定**：现在 `src=""` + `poster=/media/blackhole-code.jpg`（或 circuit-3d）。用户做完"小人"视频放进 `/media/`，改 `src` 即生效——组件已就绪。

**降级**：reduced-motion / 移动端 / 无视频 → 海报静态图。**性能**：`preload="auto"` 较重，仅在 Hero 视口内启用；离开视口暂停。

### 5.2 背景视频 + 噪点 + 渐变（Prisma 式）

**用途**：LearningPath/时间线段，用 `clock-motion.mp4`。

- `<video autoplay loop muted playsInline :poster="/media/clock-banner.webp">` `object-cover` 满铺
- 上叠 `.noise-overlay`（复用现有 `main.css` 的 SVG fractal noise，`opacity-[0.5] mix-blend-overlay pointer-events-none`）
- 再叠 `bg-gradient-to-b from-black/40 via-transparent to-black/70` 保文字可读
- **懒加载**：`IntersectionObserver` 进入视口才 `play()`，离开 `pause()`；`preload="none"` 初始
- **降级**：reduced-motion / 移动端低端 → 只显海报 `clock-banner.webp`，不播放

### 5.3 WordsPullUp 标题

**用途**：择 2–3 处段标题，替换统一 `fade-up`。

- 文案按空格拆词，每词 `motion`（→ GSAP）`y: 24 → 0` + `opacity: 0 → 1`，stagger `0.08s`，`useInView` once 触发，缓动 `[0.16,1,0.3,1]`
- 封装为 `components/WordsPullUp.vue`（props: `text`, `as` 标签, `className`）
- **不要全站用**——只挑重点标题，避免又变成"统一公式"（违反 07 去 AI 味）

### 5.4 滚动逐字透明度揭示（Scroll-linked char opacity）

**用途**：**仅一段**叙事/使命文案（如"笨鸟先飞"理念段），配 `blackhole-code.jpg` 背景。

- 文案逐字包 `<span>`，GSAP `ScrollTrigger` 驱动每字 `opacity: 0.2 → 1`，按 `index/total` 错峰（range `[charProgress - 0.1, charProgress + 0.05]`），触发 `['start 0.8', 'end 0.2']`
- 封装 `components/ScrollRevealText.vue`（props: `text`）
- **只用一次**——多用会腻、会抢戏

### 5.5 打字机文字

**用途**：Hero 副标或某段标语。

- `composables/useTypewriter.ts`：`{ speed = 38ms, startDelay = 600ms }`，逐字 reveal，返回 `{ displayed, done }`
- 打字中显闪烁光标（`blink 1s step-end`），`done` 后消失
- reduced-motion → 直接显全文，不逐字

### 5.6 视频卡（Video Card）

**用途**：Projects 区 1 张特色项目卡，背景视频。

- 卡片 `<video autoplay loop muted playsInline :poster="占位图">` `object-cover`
- 当前用占位图（如 `circuit-3d.jpg` 或项目色生成图），留 `src` 槽待用户放该项目的演示视频
- hover 时视频可加速/揭开（克制）；reduced-motion → 海报

---

## 六、"直接融合 vs 图片占位"替换约定 | Placeholder Convention

让用户事后能**一键替换**占位图为视频，不返工：

1. **统一组件**：所有"未来视频"槽位用 `components/MediaSlot.vue`（或复用 5.1/5.6 组件），props：`poster`（现在必填）、`src`（视频，现在可空）、`mode`（`'bg-autoplay' | 'mouse-scrub' | 'static'`）、`fallback`（reduced-motion/移动端用图）
2. **`src` 空 → 显海报**：组件在 `src` 为空时纯显 `poster`，不报错、不空帧
3. **TODO 标记**：每个占位槽在模板里留注释 `<!-- MEDIA-PLACEHOLDER: drop video at /media/<name>.mp4, set :src -->`，并登记到 `verify/after-v4/media-placeholders.md`（位置、当前海报、建议视频内容、组件路径）
4. **海报即占位图**：占位图用同主题的现有图片（见 §4 表），视觉上先成立

---

## 七、视频 / 媒体性能与降级 | Performance & Fallback

- **SSG 不破**：视频/图片在 `public/`，`nuxt generate` 直接服务；`<ClientOnly>` 包裹需客户端逻辑的组件（mouse-scrub）
- **懒加载**：所有背景视频 `IntersectionObserver` 进视口才加载/播放，`preload="none"`；mouse-scrub 视频 `preload="auto"` 但仅视口内启用
- **海报优先**：每个 `<video>` 必带 `poster`，首屏不空、LCP 不崩
- **`prefers-reduced-motion`**：所有视频→海报静态，打字机→全文，逐字揭示→直接可见，擦洗→不绑定
- **移动端**：背景视频低端机→海报；mouse-scrub 是桌面交互，移动端→海报或短 autoplay loop
- **体积**：大 PNG 须 webp 压缩（§2.2）；视频 8.4MB 可接受但懒加载；后续用户视频建议给出码率/分辨率建议（1080p、≤10Mbps、H.264）
- **375/768/1440 三断点无横向溢出**；视频 `object-cover` 不破布局

---

## 八、技术约束 | Technical Constraints

- **移植而非照搬**：参考稿是 React + framer-motion；本站是 Nuxt/Vue/GSAP。framer-motion → GSAP/CSS，React hooks → composables，复用现有 `useInView`/`useReducedMotion`/`useGlobalMouse`
- **不引入 framer-motion / React**；如需更稳的 in-view/scroll 可装 `@vueuse/core`（07 已预授权）
- **可新建**：`useMouseScrubVideo.ts`、`useTypewriter.ts`、`MouseScrubVideo.vue`、`WordsPullUp.vue`、`ScrollRevealText.vue`、`MediaSlot.vue`
- **保持**：`npm run build` 通过；`app.baseURL`；`content/projects.ts` 数据；路由；双语；`prefers-reduced-motion`；移动端降级
- **视觉验证产物一律 `verify/`**（`verify/before-v4/`、`verify/after-v4/`）——不用 `website-audit/`
- **不全局应用**：只做 §4 的 5–6 个瞬间，其余段落保持 07/现有质感

---

## 九、工具 / 技能 / MCP 自主授权 | Full Autonomy

执行本提示词的 Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由使用各种 skills 与 MCP**，**无需逐项请示**：

### 🤖 子 Agent fan-out（Agent 工具，单条消息并发）
- **Explore**：排查现有组件/资源（"ScrollTrigger 用法、public/ 结构、useInView 签名"）
- **frontend-dev**：并行实现互不重叠的特效（一个做 mouse-scrub，一个做 WordsPullUp/逐字揭示，一个做视频卡+媒体入库，一个做 QA）
- **Plan**：先出落位与组件拆分方案
- 独立子任务**单条消息并发**派发，加速

### 🎨 设计 / 决策
- **gstack-design-shotgun**：Hero 落位（3D vs 擦洗视频 vs 共存）、段标题选哪几处做多方案对比
- **gstack-design-consultation** / **gstack-design-review**：方向校准与"设计师之眼"审查
- **frontend-skill** / **code-yeongyu-oh-my-opencode-frontend-ui-ux**：高质量实现指导
- **gstack-design-html**：先做局部 HTML 原型再并入 Vue

### 🔍 浏览器 / 研究 / 资产审查
- **browser-harness**（Edge 9222，见全局 CLAUDE.md）：看线上站、截前后对比、实测 mouse-scrub 帧率
- **gstack-browse** / **gstack-scrape**：参考站手法抓取
- **deep-research**：视频背景最佳实践 / 性能降级模式
- **MCP `vision`**（`describe_image`）：审查入库素材是否适配落位、压暗后文字可读性
- **MCP `node_repl`**：跑 `sharp` 压图脚本、验证 seek 逻辑

### ✅ 质量验证
- **verify** / **run**：本地起站真浏览器验证（必用）
- **gstack-qa** / **gstack-qa-only**：交互回归（视频播放、擦洗、移动端降级、reduced-motion）
- **code-review** / **gstack-review**：自审 diff
- **Workflow 工具**：如需大规模并行编排（多段同时改造）可用，但须用户已开启多 agent 编排

### 📸 归档（一律 `verify/`）
- 改动前 → `verify/before-v4/`；改动后 → `verify/after-v4/`
- `verify/after-v4/media-placeholders.md`（占位槽清单，供用户替换视频）
- `verify/after-v4/asset-optimization.md`（压图前后体积）
- `verify/after-v4/SUMMARY.md`

> **核心原则**：每个媒体/特效落位必须有 `verify/` 前后截图；效果不确定优先浏览器实测而非猜。

---

## 十、执行阶段 | Execution Phases

### Phase 0：基线 + 入库 | Baseline & Ingest
1. `cd website && npm run dev`；browser-harness 三断点截当前站 → `verify/before-v4/`
2. 读 `prompts/网页效果提示词/*.txt` 两份参考稿 + 本提示词
3. 按 §2 把 8 个素材复制进 `website/public/media/`，大 PNG 转 webp 压缩，记 `asset-optimization.md`
4. 确认 `npm run build` 通过
**验收**：素材入库 + 压图 + build 通过

### Phase 1：媒体槽位组件 | Media Slot Components
- 建 `MediaSlot.vue`、`MouseScrubVideo.vue`（+ `useMouseScrubVideo`）、`WordsPullUp.vue`、`ScrollRevealText.vue`、`useTypewriter.ts`
- 全部带 reduced-motion / 移动端降级 + `src` 空显海报
**验收**：组件单测可用（本地起站看占位海报显示、reduced-motion 降级）；截图存档

### Phase 2：直接融合落位 | Direct Fusion
- Projects 段背景 `circuit-3d.jpg`；LearningPath 段 `clock-motion.mp4`（§5.2）；叙事桥接段 `blackhole-code.jpg`
- 段标题 `WordsPullUp`（择 2–3）；叙事段 `ScrollRevealText`（择 1）；打字机标语
**验收**：§4 直接融合项全部生效；视频懒加载 + 降级 OK；截图存档

### Phase 3：占位槽位 | Placeholder Slots
- Hero mouse-scrub 槽（海报占位）、特色项目视频卡（海报占位）、gears/hand 段占位
- 登记 `media-placeholders.md`
**验收**：占位海报视觉成立；`src` 空不报错；TODO 标记清晰；截图存档

### Phase 4：性能与降级总检 | Perf & Fallback Sweep
- Lighthouse 看 LCP/视频影响；三断点 + reduced-motion 实测
- 压图体积复核
**验收**：视频不阻塞首屏；reduced-motion/移动端全降级；三断点无溢出

### Phase 5：QA & Sign-off
1. `npm run build` 通过
2. 三断点截图 → `verify/after-v4/`
3. `gstack-design-review` 报告 → `verify/after-v4/design-review.md`
4. `gstack-qa` 交互回归
5. `verify/after-v4/SUMMARY.md` + `media-placeholders.md`（交付用户替换视频用）

---

## 十一、质量红线 | Quality Gates

1. ❌ `npm run build` 失败
2. ❌ 任一页面 375px 横向溢出
3. ❌ 视频无海报 / 首屏因视频空白
4. ❌ 背景视频未懒加载（视口外仍在播放/加载）
5. ❌ `prefers-reduced-motion` 下视频仍自动播放 / 擦洗仍绑定 / 打字机仍逐字
6. ❌ 移动端未对重视频降级（背景视频在低端机强制播放）
7. ❌ 大 PNG 未压缩直接上线（>1MB 的背景图）
8. ❌ 鼠标擦洗视频组件未留 `src` 替换槽 / 无 TODO 标记
9. ❌ 把效果全局套用（违反"不要全局应用"）
10. ❌ 与 07 冲突未解决（Hero 3D 与擦洗视频打架且未分层/未决策）
11. ❌ 设计审查（design-review）评为"差"

---

## 十二、执行指令 | Execution Order

将本文件粘贴到 Claude Code / Codex，Agent 将：

1. 读 `prompts/网页效果提示词/*.txt` + 本提示词 + （如未读）07
2. **自主 fan-out** Explore / frontend-dev 子 Agent 并发处理入库与各特效
3. 按 Phase 0→5 执行，每 Phase 输出简报（改了什么、截图路径、是否进下一阶段）
4. 设计决策点用 `gstack-design-shotgun` / `gstack-design-consultation`
5. 用 MCP `vision` 审查素材适配，用 `node_repl` 跑压图/seek 验证
6. 交付 `verify/after-v4/SUMMARY.md` + `media-placeholders.md`（用户据此替换视频）

> **Agent 完全授权声明**：执行期间可自主调用"九、工具/技能/MCP 自主授权"中**全部**技能、MCP、插件与子 Agent，无需逐一请示。遇与现有文案/路由/07 架构冲突时，优先保留业务与 07 骨架，调整媒体/特效实现。效果不确定优先浏览器实测。

---

*本提示词自包含、可重复执行。与 07（架构/3D/流转）叠加：07 定骨架，V4 注入媒体与特效。*
*用户事后会把部分占位图替换为自制视频——所有占位槽必须可一键替换。*
