# Hero 2D 擦洗小人视频 + 3D 星团升级提示词 V7 | Hero 2D-Scrub-Video + 3D-Constellation Prompt V7

> 本文件**直接复用 Mainframe 参考稿里那段"小人"擦洗视频**作为 Hero 的 2D 视频源（自托管，不热链），保留并升级 3D 星团（高级 + 不被截断），**移除 09 的程序化机械小人**。这样用户**不用自己做视频、不用建 3D 模型**——既保"鼠标转头小人"的惊艳效果，又最省工作流。
> Reuse the Mainframe reference's mouse-scrub "little person" video directly (self-hosted) as the hero 2D layer + a premium, un-clipped 3D constellation. Drop the 3D figure. Minimal user workflow.

---

## 一、任务核心 | Mission Core

**一句话**：把 Mainframe 参考稿（`prompts/网页效果提示词/hero page 小人.txt`）里那段擦洗视频**下载自托管**进 `public/media/`，作为 Hero 的 2D 鼠标擦洗视频层（"小人随鼠标转头"效果，复用现有 `useMouseScrubVideo`/`MediaSlot mouse-scrub` 基建）；移除 09 的 3D 程序化小人；保留并升级 3D 星团到"高级 + 不被截断"。

**为什么这样最省工作流**（用户原话："直接用他的那个小人作为视频来源，减少我要做的工作流"）：
- **不用自己做视频**——直接用 Mainframe 那段（自托管）
- **不用建 3D 模型**——"鼠标转头小人"靠 2D 擦洗视频实现（Mainframe 原版机制），不是 3D 几何
- **不用 GLTF**（旧 10 方向废弃）——避免 09 的"玩具小人"问题，也不用 sourcing 模型
- "小人转头"效果 = 鼠标水平移动擦洗视频帧（视频内容本身是转头动画），天然顺滑、零建模

> 🔗 **与 09/旧 10/旧 11 的关系**：**取代** 09 的程序化 3D 小人（移除 `buildFigure()` 及海报 SVG）和旧 10 的 GLTF 方向。**保留** 07 的 3D 星团（升级它）+ 08/09 已建的 `useMouseScrubVideo`/`MouseScrubVideo`/`MediaSlot mode="mouse-scrub"`（直接用，`src` 填自托管视频）。本轮 = Mainframe 视频自托管接入 + 去小人 + 星团升级（高级 + 不截断）。

---

## 二、现状（Agent 必读，已核对）| Current State

| 文件 | 现状 | 本轮处理 |
|---|---|---|
| `HeroSection.vue` | 背景已是 `MediaSlot mode="mouse-scrub" poster="/media/blackhole-code.jpg" src=""`（opacity-30，占位海报，**擦洗基建已就位**，只缺 `src`） | **填 `src` = 自托管 Mainframe 视频**；调透明度/overlay；星团容器/相机防截断 |
| `composables/useMouseScrubVideo.ts` + `MouseScrubVideo.vue` | 08 建的鼠标擦洗逻辑（水平鼠标 → `currentTime`，`onSeeked` 队列，reduced-motion/触屏/视口外降级）——**已可用** | 直接复用，无需改 |
| `HeroArtifact.vue` | 3D 星团 + **09 加的 `buildFigure()` 程序化小人**（figureGroup/headGroup/eyeGroup/figureParts + 小人灯光） | **移除小人全部代码**，星团逻辑全保留并升级 |
| `ConstellationPoster.vue` | SVG 海报含机械小人（`cp-figure` 组 + `cp-body` 渐变） | **移除 `cp-figure` + `cp-body`**，海报回归纯星团 |
| `MediaSlot.vue` | 支持 `mouse-scrub`（委托 `MouseScrubVideo`）+ `bg-autoplay` + `static` | 直接用 `mouse-scrub` 模式 |

**截断根因（已核对）**：星团在 `lg:max-w-[440px] h-[520px]` 盒子里，fibSphere r=3.1 + halo 0.36 + hover 1.5×，canvas 宽高比 0.846 下水平半视场约 ±3.39，节点最远 > 3.39 → **左右节点被裁**，倾斜时更明显。`?probe=1` 已暴露节点屏幕坐标，可直接验证。

**Mainframe 视频源**（参考稿里的 URL）：
`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4`

---

## 三、视频来源与自托管 | Video Source & Self-Hosting

### 3.1 下载自托管（不热链）

- 把上述 Mainframe 视频**下载**到 `website/public/media/hero-scrub.mp4`（用 `curl`/`wget`/`node_repl` fetch；若 URL 失效/被拦，降级到占位海报 + 空 `src` + TODO，记 `verify/hero-2d3d/video-fallback.md`，不阻塞其余工作）
- **不要**在生产页面热链 cloudfront URL（会失效/限流/占别人带宽）——必须自托管
- 体积检查：若 > 10MB，提示用户可压缩（H.264 1080p ≤10Mbps）；本轮先直接用

### 3.2 授权提示（写进交付物，让用户知情）

- 该视频是 Higgsfield 给 "Mainframe" 演示生成的，**非用户资产**。公开站（GitHub Pages）使用有授权风险。
- **本轮直接用它省事**（用户明确要求）；但做成**可一键替换**（`src` 指向 `public/media/hero-scrub.mp4`，换文件即换视频）。
- 在 `verify/hero-2d3d/SUMMARY.md` 与 `media-placeholders.md` 注明：**正式上线前建议换成用户自生成/有授权的视频**（替换路径：`public/media/hero-scrub.mp4`，无需改代码）。

### 3.3 视频内容核验

- Agent 先播放/抽帧核验视频内容：是否确实是"小人/人物转头"或类似可擦洗的动态？
  - 若是 → 用 `mouse-scrub`（"小人随鼠标转头"效果，本方案主目标）
  - 若是纯氛围抽象（不适合擦洗）→ 退化为 `bg-autoplay` 循环背景，并在 `decisions.md` 说明
- 默认按 `mouse-scrub` 实现（用户要"他的小人"）

---

## 四、方案：2D 擦洗小人 + 3D 星团 | 2D Scrub-Figure + 3D Constellation

```
[最底] MediaSlot mouse-scrub 视频（2D，Mainframe 小人，鼠标水平擦洗→转头）
   ↑ 透明叠加（视频压暗 overlay，作氛围+互动底）
[中]  3D 星团 canvas（alpha:true 透明，除节点/走线外透明，视频透过来）
[最上] 文案层（标题/CTA，z-10，overlay 保可读）
```

- **擦洗视频**：鼠标水平移动 → 视频 `currentTime` 前后擦洗 → "小人随鼠标转头"（Mainframe 原版签名交互）
- **3D 星团**：鼠标位置 → 整组倾斜 + hover/click 节点跳转（保留）
- 两个鼠标反应**互不冲突**（一个驱动视频帧、一个驱动 3D 倾斜），叠加成深度交互
- **不杂乱**（用户反复强调）：视频压暗作底，星团是主角，文案可读——评审团 J5 严查
- 性能：砍掉 3D 小人模型 → 星团仅 9 节点 + 走线（极轻）；擦洗视频 `preload="auto"` 但视口内才绑定（`useMouseScrubVideo` 已做 IO）；移动端无 WebGL/触屏 → 海报。**比 09/旧 10 轻得多**

### 4.1 构图（design-shotgun 定）

`gstack-design-shotgun` 出 2–3 个构图，选"最高级 + 不截断 + 不杂乱 + 文案可读"：
- (a) 擦洗视频满幅底（压暗）+ 星团右列浮其上 + 文案左
- (b) 擦洗视频满幅底 + 星团全幅浮其上（节点散布）+ 文案左上 overlay
- (c) 擦洗视频偏右大尺寸（小人主体）+ 星团叠在视频上方/周围 + 文案左

---

## 五、移除 3D 机械小人 | Remove the 3D Figure

**`HeroArtifact.vue`** 删除：
- `buildFigure()` 函数及其全部几何/材质
- `figureGroup`/`headGroup`/`eyeGroup`/`figureParts` 及其在 `init()`/`loop()`/`onPointerMove`/`onPointerLeave`/`onUnmounted` 的所有引用（`headTargetYaw/Pitch` 也删）
- 09 为小人加的灯光（`AmbientLight`/`DirectionalLight`）——星团节点是 `MeshBasicMaterial`（不受光），删灯不影响星团
- raycast 的 `figureParts` 遮挡逻辑改回只测 `nodeCores`

**`ConstellationPoster.vue`** 删除：`<g class="cp-figure">…</g>` 整组 + `<linearGradient id="cp-body">`。海报回归纯星团。

**验收**：Hero 只剩擦洗视频 + 3D 星团 + 文案，无 3D 小人残留；`npm run build` 通过。

> 注意：3D 小人（`buildFigure`）删掉后，"鼠标转头小人"的效果由**2D 擦洗视频**提供，不是 3D 几何。两者不冲突——删 3D 小人是必须的（避免和视频里的小人重复/打架）。

---

## 六、2D 擦洗视频层 | 2D Scrub Video Layer

`HeroSection.vue` 背景改（把现有 `MediaSlot` 的 `src` 填上自托管视频）：

```vue
<MediaSlot
  class="absolute inset-0"
  mode="mouse-scrub"
  poster="/media/blackhole-code.jpg"          <!-- 视频加载前/降级时显的海报 -->
  src="/media/hero-scrub.mp4"                 <!-- 自托管的 Mainframe 小人视频 -->
  overlay-class="bg-gradient-to-b from-background/75 via-background/50 to-background/80"
/>
<!-- 可一键替换：换 public/media/hero-scrub.mp4 即换视频，无需改代码。
     授权提醒：正式上线前建议换成自有/授权视频。 -->
```

- **复用** `useMouseScrubVideo`（水平鼠标 → `currentTime`，`onSeeked` 队列，已实现）——不自写擦洗逻辑
- **降级全由 composable 处理**：reduced-motion / 触屏（`pointer: coarse`）→ 不绑定擦洗、显海报；视口外 → 解绑 mousemove
- **overlay 压暗**：视频要比现在 opacity-30 更"在场"，但星团/文案要可读 → 用 `overlay-class` 渐变压暗（而非低 opacity）。具体参数 `gstack-design-shotgun` 调
- **poster**：视频未加载/降级时显 `blackhole-code.jpg`（或更中性的冷调图）

---

## 七、3D 星团升级（核心：高级 + 不截断）| Constellation Upgrade

### 7.1 不被截断（硬要求，红线）

目标：**375 / 768 / 1440 三断点、中性姿态与最大倾斜（`targetRot` 极值）下，9 节点 + halos + hover 1.5× 全落在 canvas 内，留 ≥8% 边距**。

手段（任选组合，实测达标即可）：
- **拉远相机** z=9 → ~11–12，或**降 FOV** 48°→~42°，或**缩球半径** r=3.1 → ~2.5–2.7
- **放大/调整容器**：`lg:max-w-[440px]` 太窄 → 加宽或改构图（见 4.1）
- **margin 保险**：算最大节点投影 x/y + halo×hover < canvas 半边 ×0.92
- **验证**：`?probe=1`（已存在）**扩展输出 canvas bounds**，`node_repl` 断言每节点在 bounds + ≥8% margin；browser-harness 截图三断点肉眼复核
- **倾斜边界**：`targetRot.y = 0.42 ± 0.35`、`targetRot.x = -0.16 ± 0.25` 极值下不裁切

**红线**：任一断点/角度有节点或 halo 被裁 = 失败。

### 7.2 高级感（premium）

从"9 个小方块 + 细线"升级到"光电星座"级（`gstack-design-shotgun` 定档）：

- **发光升级（首选，透明安全 + 省）**：每节点加**多层 additive 光晕**——`Sprite` 贴径向渐变 canvas 纹理（`AdditiveBlending`、`depthWrite:false`）大柔光 + 现有 halo + 高亮内核；hover 柔光放大、相连走线亮。模拟 bloom 但**不用 EffectComposer**，天然透明（视频透过来）、省性能
- **走线升级**：`LineBasicMaterial` → additive + 提亮 + 一次性入场"通电"（opacity 0→target stagger）+ hover 相连走线高亮
- **节点核心**：保留 icosahedron，叠更亮发光内核（小 sphere，additive，项目 `colorHex`）
- **氛围（可选，勿杂）**：极淡星点背景（200–400 dim point，additive，远）或微弱 fog——`design-shotgun` 决定，**不喧宾**
- **交互保留**：鼠标 tilt 视差 + 滚动 dolly + hover/click 跳转（全保留）
- **【可选·谨慎】真 bloom**：若 additive 不够，可用 `three/examples/jsm/postprocessing/` 的 `EffectComposer`+`UnrealBloomPass`，**必须保持 canvas 透明**（alpha:true、`RenderPass` clearAlpha:0、`OutputPass` 不压黑），否则视频被盖。优先 additive 方案

> 一律**一次性入场 / hover 触发**，**禁止 infinite 动画**（07 红线）。

---

## 八、和谐性 | Harmony

1. **透明叠加**：3D canvas 透明（alpha），擦洗视频从节点空隙透过来——星团像"浮在视频氛围里的光电星座"
2. **配色一致**：星团冷靛蓝 additive + 项目 `colorHex`；视频压暗 overlay 归到冷调
3. **层次清晰**：擦洗视频（底，氛围+小人互动）→ 星团（中，主角，发光）→ 文案（上，可读）
4. **不喧宾不杂乱**：星团是主角（可点跳转），视频是氛围（压暗），文案可读；**3D 小人已删，不和视频小人打架**
5. **overlay 保可读**：文案区渐变压暗

---

## 九、技术约束 | Technical Constraints

- **移除** 3D 小人代码（§5）；**保留**星团全部现有逻辑 + 擦洗视频基建
- **复用** `MediaSlot mouse-scrub` + `useMouseScrubVideo`，不自写
- **视频自托管**于 `public/media/hero-scrub.mp4`，不热链 cloudfront
- **无新重依赖**：发光用 additive sprite（零依赖）；bloom 若用走 `three/examples/jsm/postprocessing/`（随 three 自带）
- **canvas 保持透明**（`alpha:true`、clearColor 透明），视频必须从星团空隙透过来
- **无 infinite 动画**；一次性入场
- **保持**：`npm run build` 通过；`app.baseURL`；路由；双语；`prefers-reduced-motion`；移动端海报降级；三断点无横向溢出
- **视觉验证产物一律 `verify/hero-2d3d/`**

---

## 十、视觉检测 + 评审团打分循环 | Visual QA & Jury Loop

### 10.1 视觉检测（browser-harness + MCP vision）

- 桌面 1440：① idle ② 鼠标最左/最右（**查擦洗小人转头 + 查星团不截断**）③ hover 节点（发光+走线+tooltip）④ 滚动 dolly 中途
- 768 / 375：海报兜底 + 响应式（查截断）；触屏 → 擦洗降级为海报
- reduced-motion：静态海报
- **截断专检**：`?probe=1` 输出节点坐标 + canvas bounds，`node_repl` 断言全节点在 bounds + ≥8% margin
- 性能：实测桌面 fps ≥55
- 截图存 `verify/hero-2d3d/captures/`

### 10.2 评审团（5 位独立 agent 并行，Workflow 或 fan-out；用户已 opt-in）

| 评审 | 视角 | 权重 |
|---|---|---|
| J1 **和谐法官** | 擦洗视频+星团+文案 配色/层次/透明叠加是否一体；3D 小人是否删净 | **1.5×** |
| J2 **高级感法官** | 擦洗小人是否惊艳、星团是否"光电星座"级、整体电影感 | 1.0× |
| J3 **构图/无截断法官** | 三断点+最大倾斜下**有无节点被裁**、构图高级、文案可读、不杂乱 | 1.0× |
| J4 **技术/性能法官** | fps≥55、SSG、擦洗顺滑无 seek 洪水、视频自托管、canvas 透明、移动端降级、无 infinite | 1.0× |
| J5 **克制法官** | 不杂乱、星团主角、视频氛围、无 AI slop | 1.0× |

各评审基于**真实截图**（MCP `vision`/`gstack-design-review`）打分，输出 `{score, justify, deductions, pass}`。

### 10.3 门槛

- **总分 > 8.8** **且** **J1 和谐 ≥8.8** **且** **J3 构图/无截断 ≥8.8**（双硬门槛）
- **硬红线**：任一断点/倾斜有节点被裁 = 直接失败（无论总分）
- 未达标迭代修复，最多 5 轮；`jury-round-{n}.md` 记每轮
- **未达 >8.8 不向用户汇报**（5 轮耗尽才报最优+剩余）

---

## 十一、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**，**无需逐项请示**：

### 🤖 子 Agent / 编排
- **Workflow 工具**：评审团并行打分循环（用户已 opt-in）——首选
- **Agent fan-out**：Explore（读现有星团/擦洗/海报代码）、frontend-dev（一个接视频源、一个移除 3D 小人、一个升级星团发光、一个做截断验证、一个 QA）

### 🎨 设计 / 决策
- **gstack-design-shotgun**：构图 (a/b/c)、发光方案（additive vs bloom）、视频 overlay 参数对比
- **gstack-design-consultation** / **gstack-design-review**：和谐与"设计师之眼"审查
- **frontend-skill** / **code-yeongyu-oh-my-opencode-frontend-ui-ux**：Three.js 实现指导

### 🔍 视觉检测 / 评审
- **browser-harness**：10.1 全状态截图（含擦洗转头各角度）、fps、`?probe=1` 截断验证
- **MCP `vision`**（`describe_image`）：评审团基于截图打分（子 agent 须直调 `mcp__vision__describe_image`，不能用 Read 看图）
- **gstack-design-review**：J1/J2 辅助

### 🛠 视频下载 / 验证
- **MCP `node_repl`**：fetch 下载 Mainframe 视频到 `public/media/hero-scrub.mp4`、抽帧核验内容、跑 `?probe=1` 截断断言、验发光/相机数学
- **Bash `curl`/`wget`**：下载视频（若 node_repl fetch 不便）
- **verify** / **run**：本地起站真浏览器验证
- **gstack-qa** / **code-review**：交互回归 + diff 自审

### 📸 归档（`verify/hero-2d3d/`）
- `captures/`、`jury-round-{n}.md`、`media-placeholders.md`（含授权提醒 + 替换路径）、`decisions.md`、`SUMMARY.md`

> **核心原则**：视频自托管可一键换；3D 小人删净；星团不被截断是硬红线；高级感靠 additive 发光；评审团看真实截图；未达 8.8 不汇报。

---

## 十二、执行阶段 | Execution Phases

### Phase 0：基线 + 视频下载 + 移除 3D 小人 | Baseline & Download & Figure Removal
1. 读 `HeroArtifact.vue`/`HeroSection.vue`/`ConstellationPoster.vue`/`MediaSlot.vue`/`useMouseScrubVideo.ts` + 09 + 本提示词 + `hero page 小人.txt`
2. `cd website && npm run dev`；browser-harness 截当前 → `verify/hero-2d3d/before/`
3. 下载 Mainframe 视频到 `public/media/hero-scrub.mp4`（§3.1）；抽帧核验内容（§3.3）
4. 移除 3D 小人代码（§5）；海报回归纯星团
**验收**：视频自托管可播、3D 小人删净、build 通过

### Phase 1：擦洗视频接入 | Scrub Video Wiring
- `HeroSection` 背景 `MediaSlot` `src` 填自托管视频、调 overlay
- 验证鼠标水平移动→视频擦洗→"小人转头"；reduced-motion/触屏降级
**验收**：擦洗顺滑、降级正常、截图存档

### Phase 2：星团升级（高级 + 不截断）| Constellation Upgrade
- §7.1 调相机/半径/容器防截断；`?probe=1`+`node_repl` 断言全节点在 bounds
- §7.2 additive 发光 + 走线升级 + 入场通电；`design-shotgun` 定构图(§4.1)
**验收**：三断点+最大倾斜无截断（红线过）；星团"光电星座"高级感；截图存档

### Phase 3：降级与性能 | Fallback & Perf
- reduced-motion/移动端/无 WebGL 海报兜底（纯星团海报）；触屏擦洗→海报
- fps ≥55、SSG 通过、canvas 透明（视频透过来）、三断点无溢出
**验收**：降级与性能达标

### Phase 4：评审团打分循环 | Jury Loop
- §10 跑视觉检测 + 5 评审打分 + 迭代，每轮 `jury-round-{n}.md`
**验收**：总分 >8.8 且 J1 ≥8.8 且 J3 ≥8.8 且无截断红线；或 5 轮耗尽取最优

### Phase 5：汇报 | Report
- 达标后（或 5 轮耗尽）向用户汇报
- `verify/hero-2d3d/SUMMARY.md`：改了什么、擦洗小人效果、星团升级、无截断验证、**视频授权提醒 + 替换路径**、最终总分与各评审分、已知遗留

---

## 十三、质量红线 | Quality Gates

1. ❌ `npm run build` 失败 / SSG 破
2. ❌ **任一断点/最大倾斜下有节点或 halo 被裁切**（本轮核心红线）
3. ❌ 3D 机械小人未移除干净（HeroArtifact 残留 `buildFigure` / 海报残留 `cp-figure`）
4. ❌ 视频热链 cloudfront URL（未自托管）
5. ❌ 擦洗不工作 / 鼠标移动视频不动 / seek 洪水卡顿
6. ❌ canvas 不透明盖住视频 / 视频盖住星团
7. ❌ 星团仍是"小方块+细线"无高级感（J2 不达标）
8. ❌ 现有节点 hover/click 被破坏
9. ❌ reduced-motion/移动端/触屏降级失效（擦洗在触屏仍绑定 / 海报漏画星团）
10. ❌ 桌面 fps <55 / infinite 动画 / 375px 横向溢出
11. ❌ **总分 ≤8.8 或和谐分 <8.8 或构图/无截断分 <8.8 就向用户汇报**（除非 5 轮耗尽并说明）
12. ❌ 评审团未看真实截图就打分

---

## 十四、执行指令 | Execution Order

将本文件粘贴到 Claude Code / Codex，Agent 将：

1. 读 `HeroArtifact.vue`/`HeroSection.vue`/`ConstellationPoster.vue`/`MediaSlot.vue`/`useMouseScrubVideo.ts` + 09 + 本提示词 + `hero page 小人.txt`
2. 下载 Mainframe 视频自托管到 `public/media/hero-scrub.mp4`；抽帧核验
3. **fan-out** 接视频源 + 移除 3D 小人 + 升级星团 + 截断验证（并发）
4. 按 Phase 0→5 执行；Phase 4 用 **Workflow/Agent fan-out** 跑 5 评审打分循环
5. 评审基于 browser-harness 截图 + MCP `vision` 打分；`?probe=1`+`node_repl` 验无截断
6. **达标（>8.8 且 J1 ≥8.8 且 J3 ≥8.8 且无截断）后再向用户汇报**；5 轮耗尽则报最优 + 剩余
7. 交付 `verify/hero-2d3d/SUMMARY.md` + `media-placeholders.md`（含视频授权提醒 + 替换路径）

> **Agent 完全授权声明**：执行期间可自主调用"十一、工具/技能/MCP 自主授权"中**全部**技能、MCP、插件、子 Agent 与 Workflow 编排，无需逐一请示。本轮第一优先级：**直接用 Mainframe 擦洗小人视频（自托管）+ 星团不被截断 + 3D 小人删净**；评审团看真实截图；未达 8.8 不汇报。

---

*本提示词自包含、可重复执行。直接复用 Mainframe 擦洗小人视频（自托管）+ 升级 3D 星团，移除 09 的 3D 程序化小人，最省用户工作流。*
*核心理念：2D 擦洗视频（小人转头）+ 轻量 3D 星团（主角）= 效果与性能兼得；视频自托管可一键换；星团不被截断是硬红线。*
