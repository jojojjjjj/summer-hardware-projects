# Hero 机械小人 GLTF 高保真升级提示词 V6 | Hero Figure → High-Fidelity GLTF Model Prompt V6

> 本文件**修正** 09 的关键失误：09 让 agent 用 ≤12 个基础几何程序化搭小人，复杂度被代码几何封顶，和参考稿（`prompts/网页效果提示词/hero page 小人.txt`，电影级视频小人）差距巨大。本轮 V6 **把小人换成真正的高保真 3D 模型（GLTF/GLB）**，加载进现有星座 Three.js 场景，头部用真 3D 旋转追鼠标——保真+和谐+融合全要。
> Replaces 09's primitive figure with a real high-fidelity GLTF model in the same scene. Harmony + jury >8.8/10 still required.

---

## 一、为什么有这一轮 | Why V6

09 的失误（已和用户确认）：把选择框成"擦洗视频（丰富但不和谐）vs 程序化几何（和谐但简单）"的**假二选一**，为和谐选了后者。但参考稿的复杂度是**资产带来的**（预渲染电影级视频），代码几何（Box/Cylinder/Sphere）**结构性地上不了那个保真度**。

**正解（本轮）**：在同一个 Three.js 场景里放一个**真正的高保真 3D 模型（GLTF/GLB）**。这样：
- **保真**：雕刻级模型，复杂度上限由模型资产决定，不再被代码封顶
- **和谐**：同渲染器/光照/深度，比贴视频**更**和谐（视频是 2D 层，和 3D 星座两层皮）
- **转头顺滑**：头部真 3D 骨骼/枢轴旋转追鼠标，比视频 `currentTime` seek 帧步进顺滑

> 🔗 **与 09 的关系**：**取代** 09 §3 Path A 与 §4 的程序化 `buildFigure()`。**保留** 09 的：同场景融合思路、和谐性硬约束（§5）、头部复用 `onPointerMove` `vx/vy`、评审团 >8.8 循环（§7）、降级兜底。本轮只换**小人几何来源**：从"代码几何"→"GLTF 模型"。

---

## 二、任务核心 | Mission Core

**一句话**：移除 `HeroArtifact.vue` 里的 `buildFigure()` 程序化方块小人，改为**异步加载一个高保真机械小人 GLB** 进同一个 Three.js 场景；头部节点追鼠标转头；与星座共享光照/深度/配色；评审团 >8.8 才汇报。

**三个硬要求**：

1. **真高保真**：小人必须是**真实 3D 模型**（GLTF/GLB），不是 Box/Cylinder 拼的玩具。评审团"高级感"分会严查"玩具感"。
2. **融合 + 和谐**：模型在星座**同一场景**，共享相机/光照/深度/配色（同 09 §5）。
3. **评审团 >8.8/10 才汇报**（同 09 §7，和谐分硬门槛 ≥8.8）。

---

## 三、模型资产 sourcing | Model Asset Sourcing

小人的保真度**取决于模型资产质量**——这是本轮成败关键。Agent 须主动 sourcing 候选模型，择优使用。

### 3.1 来源（按优先级，可并发用 Explore 子 agent 调研）

| 来源 | 说明 | 适合度 |
|---|---|---|
| **AI 生成 GLB**（Meshy / Tripo3D / CSM.ai / Luma） | 用 prompt（如"mechanical robot guardian bust, cool indigo metal, copper accents, exposed joints, dark, game-ready, head separable"）或用 `D:\教书\艺术设计图片\流淌齿轮.png` 作图像输入生成 GLB | **首选**——可定制、贴合冷调硬件品牌；接用户"AI 做素材"工作流 |
| **免费模型库**（Sketchfab filter "Downloadable"+CC0/CC-BY / Quaternius robot packs / Poly Pizza / Kenney） | 现成机械/机器人模型，拓扑干净 | 备选——快，但可能偏卡通/通用 |
| 手绘/ZBrush 委托 | 最高保真 | 超出范围，不要求 |

### 3.2 模型筛选标准（必须满足）

- **题材**：机械/机器人，呼应硬件主题；克制不卡通、不写实过头
- **保真**：雕刻级细节，**不能是低多边形玩具**（评审团会查）
- **面数**：≤ 150k 三角面（web 性能预算）；优先干净拓扑
- **头部可分离**：头部是独立 node/mesh，或有 neck 骨骼/枢轴可绕转（转头需要）；最好带骨骼（skinned）便于找头骨
- **PBR 材质**：带 metalness/roughness 贴图，便于接受场景光
- **配色可调和**：本身偏暗/金属，或易于改色到冷靛蓝+铜（见 §5）
- **授权**：**必须可公开/商用**（CC0 / CC-BY / AI 生成明确授权）。CC-BY 须署名（加到页脚 credits）。**禁止**只用"仅供欣赏"的模型
- **格式**：`.glb`（单文件，首选）或 `.gltf`+bin+贴图打包

### 3.3 入库

- 放 `website/public/models/figure.glb`（若 draco 压缩，把 `three/examples/jsm/libs/draco/` 解码器也复制到 `public/draco/`）
- 体积目标：< 5MB（draco 压缩后）；超大则降面数/压贴图
- 记授权/来源到 `verify/hero-figure-fusion-v2/asset-license.md`（模型名、来源 URL、作者、许可、是否署名）

> **多候选择优**：sourcing 2–3 个候选，用 `gstack-design-shotgun` 对比（截预览图），选保真+配色+头部可分离最优者。AI 生成可多试几个 prompt/seed。

---

## 四、GLTF 技术规格 | GLTF Technical Spec

### 4.1 加载

```ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 若 draco 压缩：
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
const draco = new DRACOLoader().setDecoderPath('/draco/')
const loader = new GLTFLoader().setDRACOLoader(draco)
```

- **懒加载**：GLB **不进**初始 bundle；运行时从 `/models/figure.glb` 异步 fetch。`ConstellationPoster` 先显示（SSG 首屏不空），模型 `onLoad` 后小人淡入（复用现有 poster→canvas 过渡）
- **`<ClientOnly>` + `capable()` 守卫**：仅客户端 + 非 reduced-motion + 非触屏窄屏 + 有 WebGL 才加载
- **加载失败优雅降级**：`onError` → 保留海报（含静态小人），不空白、不报错
- 复用现有 `scene`/`camera`/`group`/`lights`/`IntersectionObserver`/RAF 循环——**不另开 renderer/canvas**

### 4.2 头部节点识别 + 转头枢轴

- `onLoad` 后遍历 `gltf.scene`，找头部节点：按名（`/head/i`、`Head`、`Cabeza` 等）或骨架骨骼名；找不到则取颈部上方最顶层 mesh
- **转头枢轴**：头部 mesh 的 origin 若不在颈关节，**包一层 pivot Group**：pivot 位置 = 颈部世界坐标，head 作为子节点并补偿偏移，使 `pivot.rotation.y/x` 绕颈转（不是绕头中心转——绕颈才自然）
- 若模型带骨骼：找 head bone，直接驱动 bone 旋转（更精确）

### 4.3 材质/配色 harmonization（和谐关键）

- 遍历模型 meshes，把材质**调到与星座同源冷调**：主体冷靛蓝/暗蓝灰（`#34384f` 系）、金属铜点缀（`#c9944a`）、暗底 `#0b0d12`。方式二选一（都做原型让评审团选）：
  - **a)** 保留模型 PBR 贴图，仅用场景光（现有 ambient `0x2a3358` + key `0xb8c4ff` + 铜 rim `0xc9944a`）塑形——若模型本身配色就合，此路最自然
  - **b)** 覆盖/调色材质到冷调（`material.color`、`emissive`、`metalness`/`roughness` 微调）——若模型本身偏暖/杂色
- **和谐桥**：胸口核心 + 眼睛用 `AdditiveBlending` 发光（冷靛蓝 `0x6366f1`/`0x8b5cf6`），复用星座节点的发光语气——让模型读作"星座能量场的一部分"
- **禁止**：模型出现暖色主体、彩虹、与星座冲突的第二套光照

### 4.4 尺寸/位置/入场

- 加载后算模型 bounding box，归一化到目标高 ~2.2–2.8 单位、居中、头在上中（对齐现有 `FIG_BASE_Y`/`FIG_SCALE` 量级）
- 星座节点在 r=3.1 球面环绕；**实测不穿模**（节点 vs 模型）
- **一次性入场**：复用现有 `figureGroup` 的 rise+scale-in（power3.out，1.1s，对齐星座时序）；**无 infinite 动画**

### 4.5 头部追踪（核心交互）

- 复用 `onPointerMove` 已算的 `vx/vy`（**不新增监听**），设 `headTargetYaw = clamp(vx*K, ±35°)`、`headTargetPitch = clamp(vy*K, ±15°)`
- `loop()` 里 `headPivot.rotation.y/x` lerp 0.08（比星座组倾斜稍慢，显"活物"感）
- 指针离开 → 头回正 lerp 到 0
- 眼睛/胸口核心随头转，可加极弱瞳孔位移（克制）

### 4.6 射线遮挡

- 模型的实体 mesh 作为 `figureParts` 遮挡器加入现有 raycast（`intersectObjects([...nodeCores, ...figureParts])`），小人本身**不可点**（点中 figure part → 不 hover 任何节点），保留星座节点 hover/click 跳转

---

## 五、和谐性硬约束（保留 09，+保真条款）| Harmony Hard Constraints

评审团和谐分严查：

1. **同源渲染**：模型与星座在**同一 Three.js 场景/相机/光照**，不另开 canvas、不贴视频
2. **光照一致**：模型接受星座同源的环境/方向光；发光部位用同款 `AdditiveBlending` 语气
3. **配色一致**：冷靛蓝 + 铜/铜绿金属 + 暗底；无突兀暖色、无彩虹
4. **尺度/比例**：模型与节点大小、相机距离协调；不穿模、不遮挡节点主角
5. **深度层次**：前景模型 / 中景节点 / 背景光晕三层清晰
6. **动效语气一致**：头转 lerp 速率、入场缓动与星座同家族（`power3.out`）
7. **不喧宾夺主**：星座仍是 9 项目主角（可点可跳转）；模型是氛围/守护
8. **与 Hero 整体和谐**：与左侧标题/配色/毛玻璃语言一致
9. **【新增·保真】真高保真**：模型是雕刻级/电影级 3D 资产，**不是低多边形玩具**；与参考稿的丰富度同量级（评审团"高级感"分会严查玩具感）

---

## 六、降级与兜底 | Fallback

- **reduced-motion / 触屏窄屏 / 无 WebGL** → `ConstellationPoster.vue` 兜底，**必须含静态小人**（渲染一帧模型截图、或 SVG 等价小人，头正前方）——不能只画星座漏了小人
- **GLB 加载失败** → 优雅降级到海报（含小人），不空白、不报错；记 `verify/.../load-fallback.md`
- **移动端**：3D 关闭，海报兜底（同 09）
- **性能**：模型 ≤150k 面、<5MB、draco 压缩；`IntersectionObserver` 视口外停渲染；`setPixelRatio(min(dpr,2))`；桌面 fps ≥55

---

## 七、视觉检测 + 评审团打分循环（保留 09）| Visual QA & Jury Loop

### 7.1 视觉检测（browser-harness + MCP vision）

- 桌面 1440：① idle ② 鼠标最左（头左转）③ 最右（头右转）④ 上下（俯仰）⑤ 滚动 dolly 中途
- 移动 375：海报兜底（含小人）
- reduced-motion：静态海报
- 性能：实测桌面 fps ≥55
- 截图存 `verify/hero-figure-fusion-v2/captures/`

### 7.2 评审团（5 位独立 agent 并行，Workflow 或 fan-out；用户已 opt-in）

| 评审 | 视角 | 权重 |
|---|---|---|
| J1 **和谐法官** | 配色/光照/深度/尺度一致性、模型与星座同源同框 | **1.5×** |
| J2 **高级感/保真法官** | 是否电影级高保真、**非玩具**、非 AI 味、与参考稿同量级 | 1.0× |
| J3 **交互法官** | 头部追踪顺滑/响应/范围、hover/click 未被破坏、降级兜底 | 1.0× |
| J4 **技术法官** | fps/SSG/视口外停渲染/无 jank/模型体积/无横向溢出 | 1.0× |
| J5 **克制法官** | 不杂乱、不喧宾夺主、星座仍是主角、符合 07/08 语言 | 1.0× |

各评审基于**真实截图**（MCP `vision`/`gstack-design-review`）打分，输出 `{score, justify, deductions:[{issue,severity,fix}], pass}`。

### 7.3 门槛

- **总分 > 8.8** **且** **J1 和谐 ≥8.8**（硬门槛）
- 未达标迭代修复（top 3–5 扣分点），最多 5 轮；`jury-round-{n}.md` 记每轮
- **未达 >8.8 不向用户汇报**（5 轮耗尽才报最优+剩余）

---

## 八、技术约束 | Technical Constraints

- **移除** `buildFigure()` 程序化方块代码，换 GLTF 加载；**保留**所有现有集成点（head tracking、入场、遮挡 raycast、lights、IO、降级）
- **GLTFLoader/DRACOLoader** 用 `three/examples/jsm/`（随 three 自带，**不算新 npm 依赖**）
- **无新重依赖**（除已装的 three）；不引 framer-motion/React
- **无 infinite 动画**；入场一次性
- **保持**：`npm run build` 通过；`app.baseURL`；路由；双语；`prefers-reduced-motion`；移动端降级；三断点无横向溢出
- **授权合规**：模型须可公开/商用，CC-BY 须署名
- **视觉验证产物一律 `verify/hero-figure-fusion-v2/`**

---

## 九、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**，**无需逐项请示**：

### 🤖 子 Agent / 编排
- **Workflow 工具**：评审团并行打分循环（用户已 opt-in）——首选
- **Agent fan-out**：Explore（并行调研模型库/授权、读现有集成点）、frontend-dev（一个 sourcing 模型、一个写 GLTF 加载、一个调材质光照、一个扩展海报、一个 QA）
- **Plan**：先出模型选型 + 集成方案

### 🎨 设计 / 决策
- **gstack-design-shotgun**：多候选模型对比、材质方案 a/b 对比
- **gstack-design-consultation** / **gstack-design-review**：和谐度与"设计师之眼"审查
- **frontend-skill** / **code-yeongyu-oh-my-opencode-frontend-ui-ux**：Three.js/GLTF 实现指导

### 🔍 视觉检测 / 评审
- **browser-harness**：7.1 全状态截图、fps、转头各角度
- **MCP `vision`**（`describe_image`）：评审团基于截图打分（必用）
- **gstack-design-review**：J1/J2 辅助审查

### 🛠 资产 / 验证
- **MCP `node_repl`**：跑 `gltf-validator`/解析 GLB 结构（找 head node、面数、贴图）、验旋转数学
- **deep-research**：调研"web 友好的高保真机器人 GLB 来源 + 授权"
- **WebSearch** / **brave-search** MCP：找 Sketchfab/Quaternius 等可下载模型

### ✅ 质量验证
- **verify** / **run**：本地起站真浏览器验证
- **gstack-qa** / **code-review**：交互回归 + diff 自审

### 📸 归档（`verify/hero-figure-fusion-v2/`）
- `captures/`、`jury-round-{n}.md`、`asset-license.md`、`decisions.md`、`SUMMARY.md`

> **核心原则**：模型必须真高保真（非玩具）；评审团看真实截图；和谐分硬门槛；未达 8.8 不汇报。

---

## 十、执行阶段 | Execution Phases

### Phase 0：现状 + 模型 sourcing | Baseline & Sourcing
1. 读 `HeroArtifact.vue`（现有 `buildFigure()` + 集成点）+ 09 + 本提示词 + `hero page 小人.txt`
2. `cd website && npm run dev`；browser-harness 截当前（方块小人）→ `verify/hero-figure-fusion-v2/before/`
3. fan-out Explore 调研模型来源（AI 生成 + 免费库），sourcing 2–3 候选，`gstack-design-shotgun` 择优，记 `asset-license.md` + `decisions.md`
**验收**：高保真模型选定 + 授权合规 + 入库 `public/models/figure.glb`

### Phase 1：GLTF 加载 + 头部追踪 | GLTF Load & Head-Tracking
- 移除 `buildFigure()`，接 GLTFLoader 异步加载
- 头部节点识别 + 颈枢轴 pivot + 鼠标驱动 lerp 转头（§4.2/4.5）
- 保留所有集成点（入场、遮挡 raycast、lights、IO、降级）
**验收**：模型加载入场景、转头顺滑、与星座同框不穿模；加载失败优雅降级

### Phase 2：材质/配色和谐精修 | Harmony Polish
- §4.3 材质 harmonization（a/b 原型对比）；§5 九项逐条过
- 扩展 `ConstellationPoster` 含静态小人
**验收**：§5 全过（含保真条款）；截图存档

### Phase 3：降级与性能 | Fallback & Perf
- reduced-motion/移动端/无 WebGL/加载失败 全降级
- fps ≥55、SSG 通过、模型 <5MB、三断点无溢出
**验收**：降级与性能达标

### Phase 4：评审团打分循环 | Jury Loop
- §7 跑视觉检测 + 5 评审打分 + 迭代，每轮 `jury-round-{n}.md`
**验收**：总分 >8.8 且和谐 ≥8.8；或 5 轮耗尽取最优

### Phase 5：汇报 | Report
- 达标后（或 5 轮耗尽）向用户汇报
- `verify/hero-figure-fusion-v2/SUMMARY.md`：模型来源/授权、最终总分与各评审分、关键修改、已知遗留

---

## 十一、质量红线 | Quality Gates

1. ❌ `npm run build` 失败 / SSG 破
2. ❌ **小人仍是程序化方块/低多边形玩具**（本轮核心红线——未换成高保真模型 = 失败）
3. ❌ 模型与星座不同源（另开 canvas / 贴视频）
4. ❌ 头部不随鼠标转 / 转动卡顿 / 绕错枢轴（绕头中心而非颈）
5. ❌ 现有节点 hover/click 被模型破坏
6. ❌ reduced-motion/移动端/加载失败 海报漏画小人 或 空白
7. ❌ 桌面 fps <55 / 模型 >5MB 未压
8. ❌ 模型授权不可公开商用 / CC-BY 未署名
9. ❌ infinite 动画 / 暖色主体 / 彩虹 / 375px 横向溢出
10. ❌ **总分 ≤8.8 或和谐分 <8.8 就向用户汇报**（除非 5 轮耗尽并说明）
11. ❌ 评审团未看真实截图就打分

---

## 十二、执行指令 | Execution Order

将本文件粘贴到 Claude Code / Codex，Agent 将：

1. 读 `HeroArtifact.vue` 现状 + 09 + 本提示词 + `hero page 小人.txt`
2. **fan-out** sourcing 高保真 GLB（AI 生成首选 + 免费库备选），`gstack-design-shotgun` 择优，确认授权
3. 按 Phase 0→5 执行；Phase 4 用 **Workflow/Agent fan-out** 跑 5 评审打分循环
4. 评审基于 browser-harness 截图 + MCP `vision` 打分，未达 8.8 迭代修复
5. **达标（>8.8 且和谐 ≥8.8）后再向用户汇报**；5 轮耗尽则报最优 + 剩余
6. 交付 `verify/hero-figure-fusion-v2/SUMMARY.md`

> **Agent 完全授权声明**：执行期间可自主调用"九、工具/技能/MCP 自主授权"中**全部**技能、MCP、插件、子 Agent 与 Workflow 编排，无需逐一请示。本轮第一优先级：**小人是真高保真模型而非玩具**；和谐第二；评审团看真实截图；未达 8.8 不汇报。

---

*本提示词自包含、可重复执行。修正 09 的程序化几何失误，改用 GLTF 高保真模型入同一 Three.js 场景。*
*核心理念：保真靠资产（模型）不靠代码几何；同源同渲染器 = 和谐；评审团 >8.8 = 达标。*
