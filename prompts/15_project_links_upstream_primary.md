# 项目链接：开源原项目为主、我的改编版为辅 升级提示词 | Project Links: Upstream-Primary Upgrade Prompt

> 把 9 个项目的链接从"指向我的 GitHub"改为"**原项目开源链接为主、我的改编版 GitHub 为辅（下方小链接）**"。只改链接数据 + 详情页链接区 + 重新部署，其它不动。
> Point the 9 projects' links to the ORIGINAL open-source repos as primary, with the user's adapted GitHub (`jojojjjjj/<folder>`) as a small secondary link below. Only links data + detail-page link section + redeploy.

---

## 一、任务核心 | Mission Core

**一句话**：让每个项目详情页的链接以**原项目开源链接**为主（突出展示），**用户自己的改编版 GitHub**（`jojojjjjj/<folder>`）作下方小链接；当前线上站开源链接没被展示，要修好并重新部署。

**用户原话定调**：
- "把这九个项目的链接别指向我创建的 GitHub 链接，直接指向原本项目的开源链接" → 主链接 = 原项目开源仓库
- "以开源链接为主，我的可以放在下方小窗口上" → 我的改编版 = 下方小链接（次要）
- "不然开源链接没有被展示还是有点奇怪" → 线上站当前没展示开源链接（docs/ 陈旧），要修

> 🔗 **范围**：只改 `content/projects.ts`（链接数据）+ `pages/projects/[slug].vue`（"开源参考"链接区）+ 重新生成部署 `docs/`。**不动其它 section / 视觉 / 动效 / 路由 / 数据其它字段。**

---

## 二、现状（Agent 必读，已核对）| Current State

- **`content/projects.ts`** 的 `ProjectLinks` 类型：`{ github?, bilibili?, oshwhub?, gitee?, other?: {label,url}[] }`。**没有"用户改编版仓库"字段**。
- 工作树里 `links.github` **已是上游原项目**（非 `jojojjjjj`）：
  | # | slug | `links.github`（上游原项目） | 用户改编版（`.gitmodules`，需新增） |
  |---|---|---|---|
  | 01 | binocular-thermal-imager | `github.com/RAK1002/STM32_Thermal_Imager` | `github.com/jojojjjjj/project-01-binocular-thermal-imager` |
  | 02 | env-monitor | `github.com/AnshulFursule/ESP32-IoT-Air-Quality-Monitoring-System` | `github.com/jojojjjjj/project-02-env-monitor-mid` |
  | 03 | 4mode-keyboard | `github.com/JiaBao-Hong/4mod-keyboard` | `github.com/jojojjjjj/project-03-4mode-keyboard` |
  | 04 | pocket-signal-generator | `github.com/RoboLinkB/FPGA_Signal_Generator` | `github.com/jojojjjjj/project-04-pocket-oscilloscope-high` |
  | 05 | desktop-pet | `github.com/luca-marchiori/ESP32-ChatGPT` | `github.com/jojojjjjj/project-05-desktop-pet-mid` |
  | 06 | weather-cube | `github.com/G6EJD/ESP32-8266-Air-Quality-Monitoring` | `github.com/jojojjjjj/project-06-weather-cube-easy` |
  | 07 | bipedal-wheeled-robot | `github.com/JiaBao-Hong/Bipedal-Wheeled-Robot` | `github.com/jojojjjjj/project-07-bipedal-wheeled-robot-high` |
  | 08 | electronbot | `github.com/peng-zhihui/ElectronBot`（+bilibili） | `github.com/jojojjjjj/project-08-electronbot-xhigh` |
  | 09 | desk-satellite | `other: [原作者 YouTube, 原作者网站 huyvector.org]` | `github.com/jojojjjjj/project-09-desk-satellite-high` |
- **详情页 `pages/projects/[slug].vue`** 有"开源参考"区，渲染 `links.github` / `.bilibili` / `.oshwhub` / `.other`（一组等大按钮）。
- **线上 `docs/` 可能陈旧**（git status 显示 `content/projects.ts` 有未提交改动）→ 线上站可能仍显 `jojojjjjj/` 旧链接、或没显原项目链接。需重新构建部署。

---

## 三、改动规格 | Spec

### 3.1 数据（`content/projects.ts`）

1. **`ProjectLinks` 增字段**：`adaptedRepo?: string`（用户改编版 GitHub URL）。
2. **9 个项目各填 `adaptedRepo`** = 上表"用户改编版"列的 `https://github.com/jojojjjjj/<folder>`（源自 `.gitmodules`，agent 逐一核对）。
3. **核对 `links.github` / `links.other` 确为原项目开源来源**：工作树已是上游，agent 须**逐个核实**每个上游链接指向真正的原项目（可查各 `project-NN-*/README.md` 里引用的开源出处）。若发现某个 `github` 误指 `jojojjjjj/` 或非原项目，改正为原项目开源链接。09 号无 github、用 `other`（原作者 YouTube/网站）作原项目来源，保留并补 `adaptedRepo`。
4. 不动其它字段（标题/技能/硬件/时间线等）。

### 3.2 详情页（`pages/projects/[slug].vue` "开源参考"区）

重构链接区层级（**开源原项目为主，我的改编版为辅**）：

- **主链接（突出）**：原项目开源链接（`links.github` 或 `links.other[0]`），标签 **"开源原项目 · Original project"**，大按钮/主样式（如 `cta-btn` 或同等强调），icon（GitHub/外部链接）。
- **次链接（小，下方）**：`adaptedRepo`（用户改编版），标签 **"我的改编版 · My adaptation"**，**小号、弱化样式**（如 `text-text-tertiary` 小字 + 下划线/小 chip，置于主链接下方"小窗口"位）。明确这是基于原项目的改编课程包。
- **其余支撑链接**：bilibili / oshwhub / 其它 other 保持等大或次要按钮。
- 无 `adaptedRepo` 时优雅降级（不渲染次链接）。
- 移动端：主/次链接垂直堆叠、触控 ≥44px。

### 3.3 重新构建部署

- `cd website && npm run build`（`nuxt generate`）
- 把 `website/.output/public` 内容复制到仓库根 `docs/`（覆盖陈旧部署；`.nojekyll` 保留）
- **核对线上 `https://jojojjjjj.github.io/summer-hardware-projects/`** 各详情页：主链接=原项目开源、下方小链接=我的改编版

---

## 四、技术约束 | Technical Constraints

- **只改** `content/projects.ts`（链接字段）+ `pages/projects/[slug].vue`（链接区）+ `docs/`（重新部署）。读 `.gitmodules` / 各 `project-NN-*/README.md` 仅作核对来源，不改 submodule。
- **不动**：其它 section、视觉、动效、路由、`projects.ts` 其它字段、tailwind/全局 token。
- **保持**：`npm run build` 通过；SSG；`app.baseURL`；双语（链接标签中英）；`prefers-reduced-motion`。
- **数据完整**：9 项目 `adaptedRepo` 全填、上游链接全核实。
- **视觉验证产物一律 `verify/project-links/`**

---

## 五、视觉检测 + 审查 | Visual QA & Review

- browser-harness 截**线上** + 本地各详情页（9 个 slug）的"开源参考"区 → `verify/project-links/captures/`
- 核对：主链接=原项目开源（标签/URL 对）、次链接=我的改编版（小、下方）、其余链接在
- 移动端 375：主/次链接堆叠、触控 ≥44px
- `gstack-design-review` 审链接区层级是否清晰（主次分明）→ `verify/project-links/design-review.md`
- **链接 URL 抽检**：随机点 3 个主链接确认跳转到原项目开源仓库、3 个次链接确认跳转 `jojojjjjj/<folder>`

---

## 六、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**，**无需逐项请示**：

- **Agent fan-out**：Explore（读 .gitmodules + 9 个 README 核对上游链接）、frontend-dev（改数据 + 详情页）、QA（9 详情页链接核对 + 线上验证）
- **browser-harness**：线上 + 本地详情页截图、链接点击抽检
- **MCP `vision`**：审链接区主次层级（子 agent 直调 `mcp__vision__describe_image`）
- **gstack-design-review** / **code-review**：链接区审查 + diff 自审
- **verify** / **run**：本地起站验证

### 📸 归档（`verify/project-links/`）
- `captures/`（9 详情页链接区 before/after）、`upstream-verification.md`（9 项目上游链接核对表）、`design-review.md`、`SUMMARY.md`

---

## 七、执行阶段 | Execution Phases

### Phase 0：核对 + 基线
1. `Read content/projects.ts` + `.gitmodules` + 各 `project-NN-*/README.md`（核对上游原项目链接）
2. browser-harness 截线上 9 详情页链接区 → `verify/project-links/before/`
**验收**：上游链接核对表产出 + 基线截图

### Phase 1：数据 + 详情页
- `ProjectLinks` 加 `adaptedRepo`；9 项目填值（.gitmodules）；核实/修正上游 `github`/`other`
- `[slug].vue` 链接区重构：原项目主、改编版次（小）
**验收**：本地 9 详情页链接区主次正确；截图存档

### Phase 2：构建部署
- `npm run build` → 复制到 `docs/`
- 线上核验 9 详情页
**验收**：线上站主=开源原项目、次=我的改编版

### Phase 3：QA & 汇报
- `gstack-design-review` + 链接抽检 + 移动端
- `verify/project-links/SUMMARY.md`：改了什么、9 项目上游核对表、线上验证、已知遗留

---

## 八、质量红线 | Quality Gates

1. ❌ 任一详情页主链接不是原项目开源仓库（仍指 `jojojjjjj/` 或错）
2. ❌ 任一项目缺 `adaptedRepo`（我的改编版次链接缺失）
3. ❌ 次链接（改编版）比主链接（原项目）更突出（主次颠倒）
4. ❌ `docs/` 未重新部署（线上仍是旧链接）
5. ❌ 改了链接区以外的 section / 视觉 / 数据其它字段
6. ❌ `npm run build` 失败 / SSG 破 / 移动端触控 <44px

---

## 九、执行指令 | Execution Order

1. `Read content/projects.ts` + `.gitmodules` + 9 README 核对上游链接
2. **fan-out** 数据 + 详情页 + QA
3. 按 Phase 0→3 执行
4. browser-harness 线上+本地 9 详情页截图核对 + 链接抽检
5. `npm run build` → 部署 `docs/`
6. 交付 `verify/project-links/SUMMARY.md`

> **Agent 完全授权声明**：可自主调用"六、工具/技能/MCP 自主授权"中全部技能、MCP、插件与子 Agent，无需逐一请示。第一优先级：**原项目开源链接为主、我的改编版为辅、线上部署到位**。

---

*核心理念：开源原项目为主、改编版为辅；数据加 `adaptedRepo`、详情页主次分层、重新部署 docs/。*
