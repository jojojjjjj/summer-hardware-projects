# 网站视觉升级提示词 | Website Visual Upgrade Prompt

> 本文件用于指导 Codex / Claude Code 对 `website/` 目录进行视觉层升级。
> 目标：去除"AI 味"，向 Meta（Facebook / Reality Labs / Instagram）的视觉语言靠拢，升级毛玻璃与光晕质感。
> This prompt guides a visual-layer upgrade of the `website/` directory to remove the "AI-generated look" and align with Meta's design language, with refined glassmorphism and glow effects.

---

## 一、任务概述 | Mission Brief

对现有 Nuxt 3 + Tailwind + GSAP 网站进行**视觉与质感升级**，不改变信息架构与路由，不重写业务逻辑。

### 升级目标

| 维度 | 当前问题 | 升级方向 |
|------|---------|---------|
| **AI 味** | 满屏暖色 radial 光晕、过度对称居中、glow-pulse 呼吸、到处渐变文字、千篇一律的 eyebrow+hero+CTA 模板 | 克制用光、不对称构图、去除呼吸式 glow-pulse、渐变文字只在 1–2 处出现 |
| **毛玻璃** | `backdrop-filter: blur(20px)` 偏轻，saturate 偏高，缺少层次 | 多层 blur 叠加、边缘高光描边、内容层与背景层分离、Meta 式半透卡片 |
| **光晕** | 单一暖色 radial，铺满全屏，廉价感 | 局部、跟随交互、有方向性的光；光晕作为"事件"而非"背景" |
| **整体气质** | Apple x Mimo 暖色科技感 | Meta 式：冷灰底 + 蓝紫冷光点缀 + 克制暖色，更"产品"而非"演示" |

### 不改动的部分

- 路由结构（`/`、`/projects`、`/projects/[slug]`）
- `content/projects.ts` 数据
- GSAP 动画骨架（保留 timeline、parallax、tilt、magnetic 的实现，仅调参数）
- 文案内容（中文文案保持不变）
- 构建配置（`nuxt.config.ts`、`package.json` 依赖不新增，除非必要）

---

## 二、设计语言参考 | Design Language Reference

### 参考对象：Meta 视觉语言

研究并内化以下 Meta 系产品的视觉特征（可用浏览器 / browse 工具实际访问参考）：

- **Meta.com / about.meta.com**：冷灰渐变底（`#0b0d12` → `#13151c`）、大留白、细线分隔、蓝色冷光点缀
- **Instagram (web)**：毛玻璃导航栏、内容卡片浮起感、低饱和度
- **Reality Labs / Quest 页面**：深空蓝黑底、有方向性的体积光、粒子感光晕
- **Threads**：极简、近乎纯黑、单一强调色、字号克制

### 提炼的核心视觉规则

1. **底色**：从纯暖黑 `#0a0a0b` 迁移到**冷调深空灰** `#0b0d12`（主）/ `#13151c`（次），保留极少暖色作为强调
2. **光晕**：默认状态**不发光**；仅在 hover / 进入视口 / 交互时出现局部光；光晕颜色以**冷蓝紫** `rgba(99,102,241,*)` 与**暖珊瑚** `rgba(255,107,107,*)` 二选一，不混用
3. **毛玻璃**：采用**双层玻璃**——外层 `blur(40px) saturate(140%)` 透背景，内层内容区 `blur(12px)` 透卡内；边缘加 `1px` 内高光 `inset 0 1px 0 rgba(255,255,255,0.06)`
4. **字体**：降低 `Plus Jakarta Sans` 的存在感，正文偏重 `DM Sans`；标题字重从 800 降到 **600–700**，避免过粗的"AI 标题感"
5. **渐变文字**：全站**最多 2 处**使用（Hero 主标题 + 某一处强调数字），其余改回实色
6. **动效**：移除所有 `infinite` 呼吸 / pulse 类动画（`glow-pulse`、`float`、`pulse-soft`），改为一次性入场 + 交互响应
7. **noise**：全局 noise 透明度从 `0.018` 降到 `0.01`，且只在卡片局部保留，移除 `body::before` 全局噪点
8. **对称性**：Hero 之外的所有 section 打破居中对称，采用**左对齐 + 不对称栅格**（如 7:5、5:7）

---

## 三、技术约束 | Technical Constraints

- **不新增** npm 依赖；如确需，仅允许 `@vueuse/core`（用于更稳的 in-view / scroll），并在改动前说明理由
- 所有改动基于现有文件，**不新建组件**，除非新增的视觉原语（如 `GlassPanel`、`Spotlight`）被多处复用
- 保留 `prefers-reduced-motion` 适配
- 移动端：毛玻璃在 `backdrop-filter` 性能差的设备降级为半透明实色（用 `@supports` 判断）
- 修改后必须能 `npm run build`（`nuxt generate`）通过

---

## 四、工具与技能使用授权 | Tool & Skill Authorization

执行本提示词的 Agent **被授权且被鼓励**自主使用以下工具与技能，无需逐项请示：

### 浏览器 / 视觉验证
- 使用 `browse` / `playwright` / `playwright-interactive` 技能启动无头浏览器，对 `npm run dev` 起的本地站点逐页截图，做**改动前后对比**
- 使用 `screenshot` 技能在关键断点（移动端 375px、平板 768px、桌面 1440px）截取全页对比图
- 使用 `design-review` / `gstack-design-review` 技能对改动后的页面做"设计师之眼"审查，列出间距、层级、对齐问题

### 设计参考
- 使用 `browse` 访问 `about.meta.com`、`instagram.com`、`reality.meta.com` 抓取真实视觉特征（配色、毛玻璃参数、字号、间距）
- 使用 `design-consultation` 技能快速对齐设计方向

### 工程执行
- 使用 `frontend-skill` / `frontend-ui-ux` 技能指导高质量 CSS / 组件实现
- 使用 `gstack-qa` / `qa` 技能做回归 QA，确保升级未破坏交互
- 使用 `design-html` 技能生成局部视觉原型后再合并进 Vue 组件

### 协作
- 可使用 `explorer` 子 Agent 并行排查多个组件的现有实现
- 可使用 `worker` 子 Agent 并行改动**互不重叠**的文件（如一个改 `main.css`，一个改组件层）
- 使用 `requesting-code-review` / `review` 技能在交付前做自审

> Agent 应根据实际需要灵活组合上述技能，而非机械执行全部。核心原则：**每改一个视觉层，必须有前后截图佐证**。

---

## 五、分阶段执行计划 | Execution Phases

### Phase 0：基线记录 | Baseline Capture

1. 在 `website/` 运行 `npm run dev`
2. 用 browse/playwright 对首页、`/projects`、`/projects/[任一slug]` 在 1440 / 768 / 375 三个断点截图
3. 存入 `website-audit/before-upgrade/`（目录不存在则创建）
4. 记录当前 Lighthouse / 视觉问题清单到 `website-audit/before-upgrade/issues.md`

### Phase 1：设计令牌重构 | Design Token Refactor

目标文件：`website/assets/css/main.css`、`website/tailwind.config.ts`

- 调整 `:root` CSS 变量：底色改冷调，新增冷蓝紫强调色 `--cool-indigo`、`--cool-blue`，暖色保留但降饱和
- `body::before` 全局噪点移除（或 opacity 降至 `0.006`）
- 重写 `.glass-card`：双层玻璃 + 内高光 + 边缘 1px 描边
- 重写 `.shadow-glow*` 系列：默认透明，定义 `.glow-on-hover`、`.glow-in-view` 工具类（结合 `:hover` 与 `data-inview`）
- 删除 `glow-pulse`、`float`、`pulse-soft` 的 `infinite` 动画声明，保留 keyframes 供一次性使用
- `.text-gradient-warm` 改名 `.text-gradient-accent`，并标注"全站限用 2 处"
- 字号体系：`font-weight` 普遍降一档（hero 800→700，section 800→700）

**验收**：`main.css` 改动后，`npm run build` 通过；首页未崩坏（截图对比）。

### Phase 2：核心组件升级 | Core Components

逐个升级，每个组件改完即截图对比：

| 组件 | 升级要点 |
|------|---------|
| `AppNavbar.vue` | 毛玻璃 blur 提到 40px、saturate 降到 140%；滚动时从透明→玻璃的过渡更柔和；移除 CTA 按钮的 glow-pulse |
| `HeroSection.vue` | 打破对称：主标题左对齐或 7:5 布局；移除满屏 radial，改为单束方向性体积光（从左上斜下）；specs 数字保留渐变但仅此一处；移除 `glow-pulse` |
| `ValueSection.vue` | 卡片改双层玻璃；每张卡 hover 时出现**局部**冷光（而非全屏暖光）；左右交替布局破对称 |
| `ProjectsSection.vue` / `ProjectCard.vue` | 卡片光晕改为 hover-only 且跟随鼠标的 spotlight（参考 `TiltCard` glare 逻辑扩展）；移除默认态发光 |
| `TiltCard.vue` | glare 改为冷光 + 暖光二选一（按 `data-glow` 属性）；强度从 0.15 降到 0.08，更克制 |
| `CtaSection.vue` | 背景光晕改为局部、跟随滚动方向；按钮 magnetic 保留但移除常驻 glow |
| `TestimonialsSection.vue` | 引用块改玻璃浮卡，左对齐，移除呼吸动效 |
| `LearningPath.vue` | 时间轴节点光晕改为进入视口时一次性点亮，不做 infinite |
| `AppFooter.vue` | 顶部 1px 冷光分隔线，移除暖色渐变 |

### Phase 3：光晕系统 | Glow System

在 `main.css` 新增统一的 spotlight / glow 工具层：

- `.spotlight`：一个跟随鼠标的径向光，通过 JS 设置 `--mx`/`--my` 变量（可做成 composable `useSpotlight.ts`）
- `.glow-soft`：静态柔光，仅用于"进入视口"的一次性点亮
- 规则：**同一屏内同时发光元素 ≤ 2 个**；Agent 需自查并调整

### Phase 4：去 AI 味微调 | De-AI Polish

逐项检查并修正：

- [ ] 全站 `text-gradient-warm` 使用次数 ≤ 2
- [ ] 无任何 `infinite` 呼吸/pulse 动画（loading 除外）
- [ ] Hero 之外无满屏 radial-gradient 背景
- [ ] 至少 3 个 section 采用非对称栅格
- [ ] 标题字重无 800（除 Hero 主标题可保留 700）
- [ ] eyebrow 小标签不在每个 section 重复出现（限 3 处以内）
- [ ] 暖色 `#ff9a76` 作为强调色出现频次下降，冷蓝紫提升占比

### Phase 5：验收与回归 | QA & Sign-off

- `npm run build` 通过
- 三断点截图存入 `website-audit/after-upgrade/`
- 用 `design-review` 技能生成审查报告，存入 `website-audit/after-upgrade/design-review.md`
- 用 `qa` 技能跑交互回归（导航、项目卡跳转、移动端菜单、tilt、magnetic）
- 在 `website-audit/after-upgrade/SUMMARY.md` 写明：改了哪些文件、前后差异、已知遗留问题

---

## 六、交付物 | Deliverables

```
website/
├── assets/css/main.css            # 设计令牌重构
├── tailwind.config.ts             # 配色/阴影/动画调整
├── components/*.vue               # 逐个升级
├── composables/useSpotlight.ts    # 新增（如需要）
website-audit/
├── before-upgrade/                # 改动前截图 + issues.md
└── after-upgrade/                 # 改动后截图 + design-review.md + SUMMARY.md
```

---

## 七、质量红线 | Quality Gates

以下任一不达标则视为未完成，需返工：

1. `npm run build` 失败
2. 任一页面在 375px 断点出现横向滚动条
3. `prefers-reduced-motion` 下仍有动画残留
4. 全站 `infinite` 动画数 > 0（loading/骨架屏除外）
5. 同屏发光元素 > 2
6. 设计审查报告（design-review）评分低于"可接受"

---

## 八、执行指令

将本文件内容粘贴到 Codex / Claude Code 中，Agent 将：

1. 读取 `website/` 现有代码确认现状
2. 按 Phase 0→5 顺序执行
3. 每个 Phase 结束输出简报（改了什么、截图路径、是否进入下一阶段）
4. 全部完成后输出 `website-audit/after-upgrade/SUMMARY.md` 并向用户汇报

> Agent 有权在执行中灵活调用本提示词"四、工具与技能使用授权"中列出的全部技能与子 Agent，以高效、高质量地完成升级。遇到与现有文案 / 路由冲突时，优先保留现有业务，调整视觉实现方式。
