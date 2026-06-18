# Hero 机械小人 × 3D 星座融合升级提示词 V5 | Hero Mechanical-Figure × 3D-Constellation Fusion Prompt V5

> 本文件指导 AI Agent 把"会跟着鼠标转头的机械小人"（灵感来自 `prompts/网页效果提示词/hero page 小人.txt`）**融合进当前已有的 3D 光电星座 Hero**，做到**高级 + 视觉和谐**，并以**评审团打分循环**收尾——总分 >8.8/10（且和谐分硬性达标）才向用户汇报。
> Fuse a mouse-following mechanical figure into the existing 3D constellation hero. Harmony is paramount. Ship only after an automated jury panel scores >8.8/10.

---

## 一、任务核心 | Mission Core

**一句话**：在现有 `HeroArtifact.vue` 的 Three.js 星座场景**中央**加入一个**机械小人**，它的**头部随鼠标转动**（像在看着光标），与 9 个项目节点星座**同处一个 3D 空间**、共享光照与配色——融合而非叠加。

**三个硬要求**（用户明确）：

1. **融合，不是叠加**——小人与 3D 星座必须在**同一个渲染空间**里和谐共存（共享相机/光照/深度/配色），不能是"一张视频贴在 3D 上"的廉价合成。
2. **高级 + 不杂乱**——惊艳但不喧宾夺主；小人是星座的"操作者/守护者"，星座仍是 9 个项目的主角。
3. **评审团打分 >8.8/10 才汇报**——完成后做视觉检测 + 多 agent 评审团打分，迭代直到达标（和谐分有硬性门槛），未达标不向用户汇报。

> 🔗 **与 07/08 的关系**：07 建了 3D 星座（`HeroArtifact.vue`），08 建了鼠标擦洗视频基建（`useMouseScrubVideo.ts`，当前 Hero 背景占位用）。本轮 V5 **不重写**这些，而是**扩展 `HeroArtifact.vue` 的同一个 Three.js 场景**，把机械小人也建在里面。

---

## 二、现状（Agent 必读，勿重复造轮子）| Current State

已实地核对当前代码：

| 文件 | 现状 | 本轮是否改 |
|---|---|---|
| `components/HeroArtifact.vue` | Three.js 场景：9 个 `IcosahedronGeometry` 核心节点 + `SphereGeometry` 光晕，按 fibonacci 球面（r=3.1）分布；`LineSegments` 连最近邻成电路走线；整组 `group` 的 `rotation.x/y` **lerp 向鼠标目标**（`targetRot`，`onPointerMove` 里 `vx/vy` 驱动）；滚动驱动相机 dolly；`Raycaster` hover 高亮+tooltip，点击跳转项目；`IntersectionObserver` 视口外停渲染；reduced-motion/touch-mobile/无 WebGL → `ConstellationPoster` 兜底 | **是（主战场）**：在同一 `scene`/`group` 里加机械小人，扩展现有 `onPointerMove` 同时驱动头部转动 |
| `components/HeroSection.vue` | 左 7/12 文案 + 右 5/12 `<HeroArtifact>`；背景是 `MediaSlot` mouse-scrub（poster=`blackhole-code.jpg`，`src=""` 占位）+ 径向光 + 网格 + ambient orbs | 仅微调（如小人加入后右侧容器尺寸/z 层级） |
| `composables/useMouseScrubVideo.ts` | 08 的鼠标擦洗视频（水平鼠标 → `currentTime`） | **本轮可不复用**——见 §3 方向选择 |
| `components/ConstellationPoster.vue` | reduced-motion/无 WebGL 的 SVG 海报 | **是**：扩展为"星座 + 机械小人"静态海报 |

**关键复用点**：`HeroArtifact.vue` 的 `onPointerMove` 已算出 `vx/vy`（鼠标相对中心）并设 `targetRot`。机械小人头部转动应**复用同一指针输入**，加一组 `headTargetYaw/Pitch`（clamp 范围内），在 `loop()` 里 lerp——不要新开监听器。

---

## 三、融合方向（推荐 + 备选，用 design-shotgun 决策）| Fusion Approach

**核心判断**：参考稿 `hero page 小人.txt` 是**鼠标擦洗视频**实现"小人转头"。但把擦洗视频贴到 3D 星座上会**破坏光照/深度一致性**（视频像素 vs 3D 渲染不同源）→ 不和谐。要和谐，小人须与星座**同源同渲染器**。

| 方向 | 说明 | 和谐度 | 推荐 |
|---|---|---|---|
| **A. 程序化 3D 机械小人（同场景）** ⭐ | 在 `HeroArtifact` 的**同一个 `scene`** 里，用 Three.js 基础几何（Box/Cylinder/Sphere/关节）程序化搭一个机械小人，置于星座中央；头部用单独 `Group` 包裹，`rotation.y/x` 由鼠标驱动 lerp（转头）；眼睛用发光节点（复用项目 `colorHex` 或冷靛蓝 `AdditiveBlending`）。9 节点环绕其周围 | **最高**（同渲染器/光照/深度/配色） | **首选** |
| B. 擦洗视频小人（portal 合成） | 用 `useMouseScrubVideo` 放机械小人视频，但通过场景内的一个"屏幕/门户"框架合成（不是裸贴），让视频看起来像星座中央全息屏里的小人 | 中（靠框架补救一致性） | 备选（仅当用户已提供小人视频且 A 不可行） |
| C. 混合 | 程序化 3D 小人身体 + 胸口/面部一块"屏幕平面"用擦洗视频纹理（留 `src` 槽待用户视频） | 中高 | 可选增强 |

**指令**：用 `gstack-design-shotgun` 对 A/B/C 出 2–3 个视觉原型对比，**默认选 A**（和谐度最高、无外部资产依赖、转头最顺滑——真 3D 旋转无视频 seek 抖动）。B/C 仅在用户明确提供了小人视频且 A 效果不足时采用。**评审团和谐分会严厉惩罚"视频裸贴 3D"的合成感。**

---

## 四、机械小人设计规格 | Mechanical Figure Spec

### 4.1 外观（程序化几何，A 方向）

- **风格**：机械/机器人，呼应"硬件"主题——外露关节、连杆、齿轮细节；克制，不写实、不卡通。参考 `流淌齿轮.png`（`/media/gears-flow.webp`）的机械语汇但不照搬。
- **构成**（建议，agent 可调）：头部（圆角 Box 或低多边形 Sphere）、躯干（梯形 Box）、左右肩-臂（Cylinder 连杆 + 关节 Sphere）、可选底座/悬浮环。**简洁优先**——部件 ≤ 12 个，多了会杂乱。
- **尺寸**：整体高约 2.2–2.8 单位（星座节点在 r=3.1 球面），小人居中，节点环绕其头部/肩部高度——**节点与小人不重叠穿模**（agent 实测调整）。
- **材质**：与星座和谐——优先 `MeshStandardMaterial`（低 metalness 0.3–0.6、低 roughness 0.4–0.7）接受场景光，或 `MeshBasicMaterial` 配合手绘渐变以匹配星座的"自发光扁平"质感。**两种都做原型，让评审团选更和谐的。** 加一点 `MeshPhysicalMaterial` 的清漆感可选。
- **配色**：冷靛蓝主体（`#6366f1`/`#8b5cf6` 系）+ 金属铜/铜绿点缀（`accent-copper #c9944a` / `accent-patina #3d8b5e`，已在 `tailwind.config.ts`）+ 暗底 `#0b0d12`。**禁止暖色主体**（保持 07 冷调）。

### 4.2 头部追踪交互（核心）

- 头部单独 `THREE.Group`（含头+眼），在 `loop()` 里：
  - `headTargetYaw = clamp(vx * KY, ±35°)`、`headTargetPitch = clamp(vy * KP, ±15°)`（`vx/vy` 复用 `onPointerMove` 已算的鼠标相对中心值；`KY/KP` 调灵敏度）
  - `head.rotation.y += (headTargetYaw - head.rotation.y) * 0.08`（lerp，比星座组倾斜稍慢，显"活物"感）
- **眼睛/注视**：两枚发光小球（`AdditiveBlending`，冷靛蓝或项目色），随头转；可加"看向光标"的微弱瞳孔位移。这强化"看着鼠标"。
- **idle 微动**：允许**极弱**的一次性"呼吸"/校准动作？**否**——07 禁止 infinite 动画。idle 时头部静止、只随鼠标转。可加一次性入场（小人从下方/散件拼合落入），1.1s 内完成（对齐星座入场时间）。
- **指针离开**：头回正（lerp 到 0），与星座 `onPointerLeave` 一致。

### 4.3 与星座的空间关系

- 小人 `group` 作为星座 `group` 的**子节点或同级**，置中 (0,0,0)。
- 星座 `group` 仍整体随鼠标倾斜（现有逻辑保留）；小人头部在组倾斜之上**叠加局部转头**——两层旋转叠加，小人像在倾斜的星座舱里转头看光标。
- **深度**：小人 z≈0，部分节点可在小人身后/身前形成环绕；相机 dolly 时小人与节点同比例缩放，不穿模。
- **hover/click**：星座节点的 raycast 不受影响；小人本身**不可点**（`raycaster` 只测 `nodeCores`），避免抢节点交互。小人 hover 可有极弱高亮（可选，克制）。

### 4.4 降级与兜底

- **reduced-motion / touch-mobile / 无 WebGL** → `ConstellationPoster.vue` 兜底：**扩展海报**，把机械小人静态画进去（SVG，头正前方），与星座同框。不能只画星座漏了小人。
- **性能**：小人几何简单（≤12 部件），不显著增加 draw call；沿用 `IntersectionObserver` 视口外停渲染；`setPixelRatio(min(dpr,2))` 已在。
- **SSG**：仍在 `<ClientOnly>` 内，预渲染只看海报，不破 `nuxt generate`。

---

## 五、和谐性硬约束 | Harmony Hard Constraints

评审团和谐分将严查以下，任一明显违和即扣分：

1. **同源渲染**：小人与星座在**同一 Three.js 场景/相机/光照**，不另开 canvas、不贴视频（除非走 C 的屏幕纹理且视觉自洽）
2. **光照一致**：小人材质接受与星座同源的环境/方向光；发光部位用同款 `AdditiveBlending` 语气，不出现"小人一个光、星座另一个光"
3. **配色一致**：冷靛蓝 + 铜/铜绿金属 + 暗底；无突兀暖色、无彩虹
4. **尺度/比例**：小人与节点大小、相机距离协调；节点不穿模小人、不被小人遮挡主角
5. **深度层次**：前景小人 / 中景节点 / 背景光晕三层清晰，不糊成一团
6. **动效语气一致**：小人头转 lerp 速率、入场缓动与星座同家族（`power3.out` 系），不突兀
7. **不喧宾夺主**：星座仍是 9 项目主角（可点可跳转）；小人是氛围/守护，不抢视觉焦点超过星座
8. **与 Hero 整体和谐**：小人 + 星座与左侧标题/配色/毛玻璃语言一致；不出现"右侧 3D 一套风格、左侧文案另一套"

---

## 六、技术约束 | Technical Constraints

- **扩展不重写**：在 `HeroArtifact.vue` 现有 `init()`/`loop()` 里加小人；保留所有现有逻辑（节点、走线、hover、click、IO、降级）
- **复用指针输入**：头部转动复用 `onPointerMove` 的 `vx/vy`，不新增 `mousemove` 监听
- **无新重依赖**：用已装的 `three`；不引 GLTF 加载器除非走 C 且资产已就绪（程序化几何优先）
- **无 infinite 动画**（07 红线）；入场一次性
- **保持**：`npm run build` 通过；`app.baseURL`；路由；双语；`prefers-reduced-motion`；移动端降级；三断点无横向溢出
- **视觉验证产物一律 `verify/`**：本轮用 `verify/hero-figure-fusion/`

---

## 七、视觉检测 + 评审团打分循环 | Visual QA & Jury Loop

**这是本轮的收尾硬要求**：实现完成后，必须跑视觉检测 + 评审团打分，迭代到达标才汇报。

### 7.1 视觉检测（捕获真实状态）

用 browser-harness（Edge 9222，见全局 CLAUDE.md）+ MCP `vision` 捕获并分析：

- **桌面 1440**：① 首屏 idle 态 ② 鼠标移到最左（头左转）③ 鼠标移到最右（头右转）④ 鼠标上下（头俯仰）⑤ 滚动 dolly 中途
- **移动 375**：海报兜底态（小人静态画入）
- **reduced-motion**：静态海报态
- **性能**：实测桌面 fps（`requestAnimationFrame` 计时或 Performance API），确认 ≥55fps
- 截图存 `verify/hero-figure-fusion/captures/`

### 7.2 评审团组成（5 位独立评审，多 agent 并行）

用 **Workflow 工具**（用户已通过"评审团打分"要求显式 opt-in 多 agent 编排）或 **Agent fan-out** 并发派出 5 位评审 agent，**每位一个独立视角**，**互不见彼此评分**，各给分 + 具体扣分点 + 修改建议：

| 评审 | 视角 | 权重 |
|---|---|---|
| J1 **和谐法官** | 配色/光照/深度/尺度一致性、小人与星座是否同源同框、是否"视频裸贴"违和 | **1.5×**（用户最重视） |
| J2 **高级感法官** | 是否顶级、非 AI 味、有惊艳瞬间、与 Linear/Stripe/Apple 级 hero 的差距 | 1.0× |
| J3 **交互法官** | 头部追踪顺滑度/响应/范围、hover/click 未被小人破坏、reduced-motion 与移动端兜底 | 1.0× |
| J4 **技术法官** | fps/性能、SSG 未破、视口外停渲染、无 jank、无 infinite 动画、无横向溢出 | 1.0× |
| J5 **克制法官** | 不杂乱、不喧宾夺主、星座仍是主角、符合 07/08 视觉语言 | 1.0× |

每位评审输入：上述截图 + `HeroArtifact.vue`/相关 diff + 线上 URL；输出结构化：`{ score: 0-10, justify, deductions: [{issue, severity, fix}], pass: bool }`。

### 7.3 计分与门槛

- **总分** = Σ(score × 权重) / Σ 权重（0–10）
- **通过条件**：**总分 > 8.8** **且** **J1 和谐分 ≥ 8.8**（和谐分硬门槛——和谐不达标，总分再高也不过）
- 评审须基于**真实截图**用 MCP `vision`/`gstack-design-review` 分析，不许只看代码猜

### 7.4 迭代循环

```
build → capture(7.1) → jury(7.2) → score(7.3)
  └─ if 未达标: synthesize 评审修改建议 → 实施最高优先级修复 → re-capture → re-jury
  └─ 最多 5 轮；5 轮仍未达标: 选当前最优版本，向用户汇报"最近总分 X，剩 Y 问题"（不静默交付低分）
  └─ 达标: 向用户汇报
```

- 每轮把评审扣分点去重、按 severity 排序，实施 top 3–5 修复
- `verify/hero-figure-fusion/jury-round-{n}.md` 记每轮各评审分 + 修改项
- **未达 >8.8 不向用户汇报**（除非 5 轮耗尽）

---

## 八、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由使用 skills 与 MCP**，**无需逐项请示**：

### 🤖 子 Agent / 多 agent 编排
- **Workflow 工具**：用于评审团并行打分循环（5 评审 + 综合器，用户已 opt-in）——首选
- **Agent fan-out**：派 Explore/frontend-dev 并行（一个搭小人几何、一个调材质光照、一个扩展海报、一个做 QA）
- **Plan**：先出融合与部件拆分方案

### 🎨 设计 / 决策
- **gstack-design-shotgun**：A/B/C 融合方向多方案对比、小人材质（Standard vs Basic）对比
- **gstack-design-consultation** / **gstack-design-review**：和谐度校准与"设计师之眼"审查
- **frontend-skill** / **code-yeongyu-oh-my-opencode-frontend-ui-ux**：Three.js 实现指导

### 🔍 视觉检测 / 评审
- **browser-harness**：捕获 7.1 全部状态截图、实测 fps、鼠标转头各角度
- **MCP `vision`**（`describe_image`）：评审团各法官基于截图打分（必用——评审须看真实渲染）
- **gstack-design-review**：作为 J1/J2 法官的辅助审查

### ✅ 质量验证
- **verify** / **run**：本地起站真浏览器验证
- **gstack-qa** / **code-review**：交互回归 + diff 自审
- **MCP `node_repl`**：验证 Three.js 几何/旋转数学、lerp 参数

### 📸 归档（`verify/hero-figure-fusion/`）
- `captures/`（7.1 截图）、`jury-round-{n}.md`（每轮评审）、`decisions.md`（方向选型理由）、`SUMMARY.md`（最终汇报）

> **核心原则**：评审团必须看真实截图打分；和谐分硬门槛；未达 8.8 不汇报。

---

## 九、执行阶段 | Execution Phases

### Phase 0：基线 + 方向选型 | Baseline & Direction
1. 读 `HeroArtifact.vue`/`HeroSection.vue`/`ConstellationPoster.vue` + 本提示词 + `hero page 小人.txt`
2. `cd website && npm run dev`；browser-harness 截当前 Hero → `verify/hero-figure-fusion/before/`
3. `gstack-design-shotgun` 出 A/B/C 原型对比，定方向（默认 A），记 `decisions.md`
**验收**：方向定稿 + 基线截图

### Phase 1：小人建模 + 头部追踪 | Figure Build & Head-Tracking
- 在 `HeroArtifact.vue` 同场景加程序化机械小人（§4.1）
- 头部 Group + 鼠标驱动 lerp 转头 + 发光眼（§4.2）
- 复用 `onPointerMove` 的 `vx/vy`；扩展 `ConstellationPoster` 含小人
**验收**：本地看小人转头顺滑、与星座同框不穿模；截图存档

### Phase 2：和谐精修 | Harmony Polish
- 调材质/光照/配色/尺度/深度直到 §5 八项和谐约束逐条过
- 一次性入场动画对齐星座时序
**验收**：§5 自查全过；截图存档

### Phase 3：降级与性能 | Fallback & Perf
- reduced-motion/移动端/无 WebGL 海报兜底（含小人）
- 实测 fps ≥55、SSG 通过、三断点无溢出
**验收**：降级与性能达标

### Phase 4：评审团打分循环 | Jury Loop
- 按 §7 跑视觉检测 + 5 评审打分 + 迭代
- 每轮记 `jury-round-{n}.md`
**验收**：总分 >8.8 且和谐分 ≥8.8；或 5 轮耗尽取最优

### Phase 5：汇报 | Report
- 仅在达标后（或 5 轮耗尽）向用户汇报
- 产出 `verify/hero-figure-fusion/SUMMARY.md`：方向选型、最终总分与各评审分、关键修改、已知遗留、替换/扩展建议（如未来想换 C 方向的视频脸）

---

## 十、质量红线 | Quality Gates

1. ❌ `npm run build` 失败 / SSG 破
2. ❌ 小人与星座不同源（另开 canvas / 视频裸贴且未通过门户合成）
3. ❌ 头部不随鼠标转 / 转动卡顿
4. ❌ 现有节点 hover/click 被小人破坏
5. ❌ reduced-motion/移动端海报漏画小人
6. ❌ 桌面 fps <55
7. ❌ 出现 infinite 动画 / 暖色主体 / 彩虹
8. ❌ 375px 横向溢出
9. ❌ **总分 ≤8.8 或和谐分 <8.8 就向用户汇报**（除非 5 轮耗尽并说明）
10. ❌ 评审团未看真实截图就打分
11. ❌ 5 轮迭代未记 `jury-round-*.md`

---

## 十一、执行指令 | Execution Order

将本文件粘贴到 Claude Code / Codex，Agent 将：

1. 读 `HeroArtifact.vue` 等现状 + `hero page 小人.txt` + 本提示词
2. `gstack-design-shotgun` 定融合方向（默认 A 程序化 3D 小人同场景）
3. 按 Phase 0→5 执行；Phase 4 用 **Workflow/Agent fan-out** 跑 5 评审打分循环
4. 每轮评审基于 browser-harness 截图 + MCP `vision` 打分，未达 8.8 迭代修复
5. **达标（>8.8 且和谐 ≥8.8）后再向用户汇报**；5 轮耗尽则报最优 + 剩余问题
6. 交付 `verify/hero-figure-fusion/SUMMARY.md`

> **Agent 完全授权声明**：执行期间可自主调用"八、工具/技能/MCP 自主授权"中**全部**技能、MCP、插件、子 Agent 与 Workflow 编排，无需逐一请示。和谐是第一优先级；评审团须看真实截图；未达 8.8 不汇报。

---

*本提示词自包含、可重复执行。在 07/08 的 Hero 之上做"机械小人 × 3D 星座"融合精修。*
*核心理念：同源同渲染器 = 和谐；评审团 >8.8 = 达标。*
