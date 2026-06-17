# 网站交互式视觉升级提示词 V2 | Website Interactive Visual Upgrade Prompt V2

> 本文件指导 AI Agent 对 `website/` 目录进行**深度交互式升级**——去除 AI 味、升级毛玻璃与光晕质感、引入 Pinterest 级别的 Hero 交互体验。
> This prompt guides a deep interactive upgrade of the `website/` directory: de-AI polish, premium glassmorphism & glow, and Pinterest-grade hero interactivity.

---

## 一、任务核心 | Mission Core

**一句话**：把当前网站从"AI 模板演示"升级为"顶级产品官网"——让人第一眼以为是一个融资了的产品，而不是一个暑假作业展示页。

### 升级三支柱

| 支柱 | 核心问题 | 升级方向 |
|------|---------|---------|
| **去 AI 味** | 满屏暖色 radial 光晕、过度对称居中、glow-pulse 呼吸、到处渐变文字、千篇一律的 eyebrow+hero+CTA 三件套、hover 效果统一而机械 | 克制用光、不对称构图、去除呼吸式 glow、渐变文字限 1–2 处、交互反馈差异化（每张卡有性格）、留白节奏变化 |
| **交互体验** | 当前仅有 tilt + magnetic + spotlight 三件套，所有卡片交互完全相同；Hero 区纯静态展示；滚动体验平铺直叙 | Hero 区引入视差滚动 + 动态排版；项目卡差异化交互；滚动叙事节奏（scroll-driven storytelling）；鼠标全局影响背景微粒/光斑 |
| **玻璃/光晕** | 单层 `blur(20px)` 毛玻璃偏轻、光晕色饱和偏高、缺少物理质感（折射/色散/边缘高光） | 双层玻璃 + 边缘折射高光 + 物理色散感；光晕改为局部、有方向性、交互驱动；添加微粒光斑（非粒子系统，纯 CSS） |

---

## 二、设计参考与自主研究 | Design References & Autonomous Research

### 必须研究的设计参考

Agent **必须**使用浏览器工具（browse / playwright / playwright-interactive）访问以下站点，提取真实的视觉参数并截图归档：

| 参考站 | 提取重点 |
|--------|---------|
| **https://uk.pinterest.com/** | Hero 区的视觉层次、鼠标跟随光效、卡片 hover 的差异化反馈、毛玻璃导航栏的 blur 参数、背景微粒/噪点纹理的运用 |
| **https://about.meta.com/** | 冷灰底 + 方向性体积光、大留白、细线分隔、蓝紫冷光点缀的克制 |
| **https://linear.app/** | Hero 区的动态排版（文字随滚动位移/缩放）、鼠标跟随光斑、极简但不空洞的留白 |
| **https://vercel.com/** | Hero 区的渐变网格背景、按键交互的细腻反馈、scroll-driven 叙事 |
| **https://stripe.com/** | Hero 区的倾斜 3D 卡片/图形、玻璃质感、光的方向感、交互驱动的色彩变化 |
| **https://rauno.me/** | 极致极简、鼠标全局影响、光标附近元素微妙响应、空间感 |

### 研究产出要求

访问每个参考站后，Agent 需产出一份 `website-audit/design-references.md`，包含：

1. **截图**：每个站点的 Hero 区、1–2 个交互组件（至少 1440px 宽度）
2. **参数提取表**：CSS 变量级参数（blur 值、saturate、颜色 hex、opacity、border-radius、font-size、font-weight、letter-spacing）
3. **交互模式笔记**：鼠标跟随类型、hover 效果差异化方式、scroll-driven 动效描述
4. **可迁移点**：哪些效果可以直接迁移到本项目、哪些需要适配

---

## 三、交互升级规格 | Interactive Upgrade Spec

### 3.1 Hero 区：视差滚动 + 动态排版

**现状**：静态 7:5 栅格 + GSAP 入场动画 + 简单 parallax 背景

**升级目标**：

| 特效 | 实现方式 | 参考来源 |
|------|---------|---------|
| 标题文字随滚动向上位移并渐隐 | GSAP ScrollTrigger 控制 `y` 和 `opacity`，速度比页面慢 0.3x | Linear.app Hero |
| 右侧 specs 数字在滚动中做 3D 透视旋转 | `rotateX` + `perspective`，从 0° 到 -15° | Stripe 3D card |
| 背景网格线随滚动产生视差偏移 | 两层网格以不同速度位移，产生深度感 | Vercel 渐变网格 |
| 鼠标位置影响背景光斑位置 | 全局 mousemove 监听，光斑 `translate` 跟随鼠标，带 lerp 缓动 | Rauno.me / Pinterest |
| CTA 按钮增加涟漪点击反馈 | 点击时从点击位置扩展的 `scale(0→1)` + `opacity(1→0)` 白色圆形 | Material ripple 但更克制 |

**代码策略**：在 `HeroSection.vue` 的 `<script>` 中添加 ScrollTrigger 驱动的视差时间线；在 `app.vue` 或新 composable `useGlobalMouse.ts` 中添加全局鼠标位置追踪。

### 3.2 项目卡：差异化交互

**现状**：所有卡片统一使用 `TiltCard` + `useSpotlight`，交互完全一致

**升级目标**：每张卡根据其项目类型拥有微妙的交互差异

| 差异维度 | 实现方式 |
|---------|---------|
| **hover 光晕颜色** | 每张卡已有 `colorHex`，让 spotlight 跟随光自动使用该颜色（当前已实现，确认生效） |
| **hover 卡片浮起方向** | 不再统一 tilt，而是根据鼠标进入方向偏移（从左进入→右倾，从下进入→上倾） |
| **hover 内容位移** | 卡片内部文字/图标在 hover 时做细微 `translateY(-2px)` 上浮，而非仅整体 tilt |
| **hover 持续时间差异** | 难度高的项目 hover 效果更"重"（tilt 角度稍大、阴影更深），入门项目更"轻" |

**代码策略**：在 `ProjectCard.vue` 中根据 `project.difficulty` 动态计算 tilt 参数和 hover shadow 深度；修改 `TiltCard.vue` 支持方向感知的 tilt。

### 3.3 滚动叙事节奏

**现状**：各 section 等间距排列，滚动体验平铺直叙

**升级目标**：

- **ValueSection**：每个 feature 卡片的入场时间线错开，形成"讲故事"的节奏（而非同时全部 fade-in）
- **LearningPath**：滚动进度条改为渐变色（从 indigo 到 violet），节点点击后展开详情（可折叠）
- **全局 scroll snap**：在 Hero → Projects 之间添加一个可选的 scroll-snap 断点，让 Projects 区从下方"弹入"视口
- **视口过渡**：section 之间添加 1–2px 的冷光分隔线，随滚动从中心向两侧展开（`scaleX(0→1)`）

**代码策略**：使用 GSAP ScrollTrigger 的 `pin` 和 `snap` 功能；分隔线用 CSS `transform-origin: center` + GSAP `scaleX` 动画。

### 3.4 全局鼠标影响

**现状**：仅 `TiltCard` 和 magnetic CTA 响应鼠标

**升级目标**：

| 效果 | 作用范围 | 实现方式 |
|------|---------|---------|
| 背景光斑跟随鼠标 | Hero 区 + CTA 区 | 一个绝对定位的 `radial-gradient` 圆，通过 CSS 变量 `--mx`/`--my` 跟随鼠标，带 `lerp` 缓动 |
| 鼠标附近的文字轻微位移 | Hero 标题文字 | 每个文字元素根据与鼠标的距离做微弱 `translate`，距离越近偏移越大（max 3px），形成"磁场"感 |
| 光标附近元素亮度微升 | 项目卡区域 | 通过 CSS `:hover` 的 `brightness(1.02)` + 邻近卡片的 `brightness(0.98)` 形成对比 |

**代码策略**：新建 `composables/useGlobalMouse.ts`，提供 `x`/`y` reactive 值和 lerp 更新逻辑；在需要的组件中 import 并绑定。

---

## 四、毛玻璃与光晕升级 | Glassmorphism & Glow Upgrade

### 4.1 双层玻璃系统

**现状**：`.glass-card` 单层 `backdrop-filter: blur(20px) saturate(180%)`

**升级为三层**：

```css
.glass-card {
  /* 外层：透背景 */
  backdrop-filter: blur(40px) saturate(140%);
  -webkit-backdrop-filter: blur(40px) saturate(140%);
  background: rgba(11, 13, 18, 0.55);

  /* 内高光描边：模拟玻璃折射 */
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),  /* 顶部高光线 */
    inset 0 -1px 0 rgba(0, 0, 0, 0.1),          /* 底部暗线 */
    0 2px 8px rgba(0, 0, 0, 0.18),               /* 基础投影 */
    0 8px 32px rgba(0, 0, 0, 0.22);              /* 深层投影 */
}

.glass-card__inner {
  /* 内层：透卡内内容 */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

**物理色散感**：在卡片的边缘高光中，添加极微弱的彩色色散：

```css
.glass-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid transparent;
  background: linear-gradient(135deg, rgba(99,102,241,0.08), transparent 40%, rgba(139,92,246,0.05)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### 4.2 光晕系统

**核心规则**：光晕是**事件**，不是**背景**。

| 事件 | 光晕类型 | 参数 |
|------|---------|------|
| 卡片 hover | 跟随鼠标的局部径向光 | `radial-gradient(circle 200px at var(--mx) var(--my), rgba(R,G,B,0.12), transparent 70%)` |
| 元素进入视口 | 一次性柔光绽放 | 从 `opacity: 0, scale(0.8)` 到 `opacity: 1, scale(1)`，持续 0.8s，然后消失 |
| 按钮 hover | 方向性光晕 | 从按钮中心向 hover 方向偏移的椭圆形光 |
| 全局鼠标 | 背景大光斑 | 直径 400–600px 的大柔光，opacity 0.06–0.10，颜色跟随当前 section 主题色 |

**禁止**：
- ❌ 任何 `infinite` 循环的 glow/pulse/breathe 动画
- ❌ 默认状态（无 hover/无交互）下的可见光晕
- ❌ 暖色与冷色光晕同时出现在同一视口
- ❌ 同屏超过 2 个同时发光的元素

### 4.3 微粒光斑（纯 CSS）

**目标**：在 Hero 和 CTA 区背景添加极其微弱的、非交互的光斑，增加"空间感"而不增加"AI 味"。

```css
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.06;
  pointer-events: none;
  /* 不做任何动画——纯静态装饰 */
}
```

放置 2–3 个不同大小（200px、400px、600px）的 orb，颜色为冷蓝紫，固定在特定位置，**不做任何运动**。

---

## 五、去 AI 味检查清单 | De-AI Checklist

逐项检查并修正。每一项必须通过，否则视为未完成：

### 视觉层面

- [ ] 全站 `text-gradient` / `bg-clip-text` 使用次数 ≤ 2（Hero 主标题 + 1 处强调数字）
- [ ] 无任何 `infinite` 呼吸/pulse/float 动画（loading/skeleton 除外）
- [ ] Hero 之外无满屏 `radial-gradient` 背景（局部装饰 orb 除外）
- [ ] 至少 3 个 section 采用非对称栅格（7:5、5:7、8:4 等）
- [ ] 标题字重无 800（hero 可保留 700，其余 ≤ 600）
- [ ] `eyebrow` 小标签不在每个 section 重复出现（全站 ≤ 3 处）
- [ ] 暖色 `#ff9a76` / `#ff6b6b` 作为强调色出现频次 ≤ 3 处，冷蓝紫占比 > 70%
- [ ] 卡片圆角统一且克制：`1.25rem`–`1.75rem`，不超过 `2rem`
- [ ] 无"彩虹渐变"：任何渐变最多 2 个色标，不出现 3+ 色渐变

### 交互层面

- [ ] 不同类型的项目卡有差异化 hover 反馈（而非统一 tilt）
- [ ] Hero 区响应滚动（视差/动态排版），而非纯静态
- [ ] 至少 1 处鼠标全局影响效果（背景光斑/文字位移）
- [ ] 无"机械重复"的交互模式——同样的 hover 效果不在连续 3+ 个元素上使用
- [ ] 移动端所有交互有降级方案（触摸设备关闭 tilt/spotlight/magnetic）

### 文案层面

- [ ] 无"AI 生成感"文案：去掉"极致""赋能""一站式""全方位"等空洞词
- [ ] 标题使用具体数字和事实，而非形容词堆叠
- [ ] CTA 文案具体而非空泛（"查看项目"优于"立即探索"，"报名参加"优于"开启旅程"）

---

## 六、技术约束 | Technical Constraints

### 允许

- 新建 composable 文件（`useGlobalMouse.ts`、`useScrollProgress.ts` 等）
- 新建最多 1 个组件文件（如 `ScrollDivider.vue`，若被多处复用）
- 安装 `@vueuse/core`（若需更稳的 composables 基础）
- 修改现有所有 `.vue` / `.ts` / `.css` 文件

### 禁止

- ❌ 新增 npm 依赖超过 1 个（`@vueuse/core` 除外）
- ❌ 修改路由结构或 `content/projects.ts` 数据
- ❌ 删除任何现有组件文件
- ❌ 使用 Three.js / Canvas / WebGL（纯 CSS + GSAP 实现）
- ❌ 引入任何 AI 生成图像或外部图片资源（使用现有素材 + CSS 绘制）
- ❌ 中文文案内容做大幅修改（微调个别词汇可以）

### 必须保持

- `npm run build`（`nuxt generate`）通过
- `prefers-reduced-motion` 适配
- 移动端 `backdrop-filter` 降级方案（`@supports` 判断）
- 所有页面在 375px / 768px / 1440px 三断点无横向溢出

---

## 七、工具与技能使用授权 | Tool & Skill Authorization

执行本提示词的 Agent **被完全授权且被强烈鼓励**自主使用以下工具与技能，**无需逐项请示用户**：

### 🔍 浏览器 / 设计研究

- **browse / gstack-browse / playwright / playwright-interactive**：启动浏览器访问设计参考站（Pinterest、Meta、Linear、Vercel、Stripe、rauno.me），截图并提取 CSS 参数
- **scrape / gstack-scrape**：抓取参考站的关键 CSS 代码片段（毛玻璃参数、光晕实现、hover 效果）
- **screenshot**：在关键断点截取改动前后全页对比图

### 🎨 设计审查

- **design-review / gstack-design-review**：对改动后的页面做"设计师之眼"审查
- **design-consultation / gstack-design-consultation**：当不确定某个视觉效果是否符合顶级标准时，启动设计咨询

### ✅ 质量验证

- **qa / gstack-qa**：跑交互回归测试（导航、项目卡跳转、移动端菜单、tilt、magnetic、scroll snap）
- **design-shotgun / gstack-design-shotgun**：对关键区域生成多方案对比，选出最优
- **playwright-interactive**：实时在浏览器中调整参数，边看边改

### 🤖 Agent 协作

- **multi_agent / spawn_agent**：可启动子 Agent 并行处理独立任务（如：一个 Agent 改 Hero 区，另一个改项目卡，第三个做 QA）
- **explorer**：快速查询代码库中某个效果的现有实现（如"当前 spotlight 的 CSS 在哪"）

### 📸 截图归档

- 所有改动前截图存入 `website-audit/before-v2/`
- 所有改动后截图存入 `website-audit/after-v2/`
- 设计参考截图存入 `website-audit/design-references/`

---

## 八、执行阶段 | Execution Phases

### Phase 0：研究与基准 | Research & Baseline

1. 启动本地 dev server（`cd website && npm run dev`）
2. 用浏览器访问当前站点，三断点截图存入 `website-audit/before-v2/`
3. 用 browse 技能访问所有设计参考站（Pinterest、Meta、Linear、Vercel、Stripe、rauno.me），提取参数并产出 `website-audit/design-references.md`
4. 确认现有代码可 `npm run build` 通过

**验收**：截图归档完成，参考参数表产出，build 通过。

### Phase 1：设计令牌升级 | Design Token Upgrade

修改文件：`main.css`、`tailwind.config.ts`

- 底色确认冷调（`#0b0d12` 主 / `#13151c` 次）
- 重写 `.glass-card`：三层玻璃 + 边缘色散高光
- 重写 `.shadow-glow*`：默认透明，hover/active 才显
- 添加 `.ambient-orb` 工具类
- 添加 `.scroll-divider` 分隔线类
- 删除任何残留的 `infinite` 动画声明
- 确认 `font-weight` 体系：hero 700，其余 ≤ 600

**验收**：`main.css` 改动后 build 通过；首页视觉未崩坏（截图对比）。

### Phase 2：Hero 区交互升级 | Hero Interactive Upgrade

修改文件：`HeroSection.vue`、新建 `composables/useGlobalMouse.ts`

- 添加 ScrollTrigger 视差：标题随滚动上移渐隐，specs 数字 3D 透视旋转
- 添加全局鼠标光斑：背景大柔光跟随鼠标
- 添加标题文字"磁场"效果：鼠标附近文字微弱位移
- CTA 按钮涟漪点击反馈
- 背景添加 2–3 个静态 `ambient-orb`（纯 CSS，无动画）

**验收**：Hero 区滚动时有视差叙事感；鼠标移动时背景光斑平滑跟随；截图存档。

### Phase 3：项目卡差异化 | Card Differentiation

修改文件：`ProjectCard.vue`、`TiltCard.vue`

- 修改 TiltCard 支持方向感知 tilt（从鼠标进入方向倾倒）
- 项目卡根据 difficulty 动态调整 tilt 角度、shadow 深度、hover 过渡时间
- 卡片内内容（文字/图标）在 hover 时做微弱上浮
- 确认 spotlight 跟随光颜色与卡片 `colorHex` 一致

**验收**：不同项目卡 hover 感受有差异；截图存档。

### Phase 4：滚动叙事与过渡 | Scroll Storytelling

修改文件：`ValueSection.vue`、`LearningPath.vue`、`CtaSection.vue`、`TestimonialsSection.vue`

- ValueSection：feature 卡片入场时间线错开（讲故事节奏）
- LearningPath：进度条改为 indigo→violet 渐变；节点可点击展开
- Testimonials：引用卡改左对齐，移除居中；添加淡入切换微动效
- CTASection：背景光斑跟随滚动方向偏移
- section 间添加 `scroll-divider` 分隔线（从中心展开动画）

**验收**：滚动体验有叙事节奏感；截图存档。

### Phase 5：去 AI 味精修 | De-AI Polish

逐项执行"五、去 AI 味检查清单"中的所有检查项，每项修正后截图确认。

重点：
- 降 font-weight
- 减 text-gradient 使用
- 调 eyebrow 出现频次
- 减暖色占比
- 确认差异化交互

**验收**：检查清单全部 ✅。

### Phase 6：验收与回归 | QA & Sign-off

1. `npm run build` 通过
2. 三断点截图存入 `website-audit/after-v2/`
3. 用 `design-review` 技能生成审查报告 → `website-audit/after-v2/design-review.md`
4. 用 `qa` 技能跑交互回归
5. 产出 `website-audit/after-v2/SUMMARY.md`，包含：
   - 改了哪些文件
   - 前后差异
   - 设计参考提取的关键参数
   - 交互升级具体效果描述
   - 已知遗留问题

---

## 九、质量红线 | Quality Gates

以下任一不达标则视为**未完成**，必须返工：

1. ❌ `npm run build` 失败
2. ❌ 任一页面在 375px 断点出现横向滚动条
3. ❌ `prefers-reduced-motion` 下仍有动画残留
4. ❌ 全站 `infinite` 动画数 > 0（loading/骨架屏除外）
5. ❌ 同屏发光元素 > 2
6. ❌ `text-gradient` 使用次数 > 2
7. ❌ 设计审查报告（design-review）评分为"差"
8. ❌ Hero 区无任何交互响应（纯静态 = 不通过）
9. ❌ 所有项目卡 hover 效果完全一致（无差异化 = 不通过）

---

## 十、执行指令 | Execution Order

将本文件内容粘贴到 Codex / Claude Code 中，Agent 将：

1. **自主**使用 browse/playwright 访问设计参考站，提取参数并产出 `design-references.md`
2. 按 Phase 0→6 顺序执行
3. 每个 Phase 结束输出简报（改了什么、截图路径、是否进入下一阶段）
4. 遇到设计决策点时，可用 `design-consultation` 或 `design-shotgun` 技能辅助决策
5. 可随时启动子 Agent（spawn_agent）并行处理独立任务
6. 全部完成后产出 `website-audit/after-v2/SUMMARY.md` 并向用户汇报

> **Agent 完全授权声明**：在执行本提示词期间，Agent 有权自主调用"七、工具与技能使用授权"中列出的**全部**技能、插件与子 Agent，无需逐一请示。遇到与现有文案/路由冲突时，优先保留现有业务逻辑，调整视觉实现方式。当设计效果不确定时，优先使用浏览器截图对比而非猜测。

---

*本提示词设计为自包含、可重复执行。Agent 可在任意 Phase 重新进入，从中断点继续。*
