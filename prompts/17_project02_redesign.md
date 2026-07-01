# 项目二重新设计提示词 | Project 02 Redesign Prompt
<!-- 注：价格信息已注释隐藏（查价不准确，仅作参考不严谨）/ Note: price info commented out (inaccurate, not rigorous as reference) -->

> 重新设计**项目二（env-monitor / 环境感知监测站）**的课程包：以 Bilibili 视频 `BV1tb4y1U7Du` 为准，从项目二文件夹里**筛选提取有用的核心信息**（文件夹太大、大部分没用、核心只有一点点），据此重做课程包并同步网站数据。**只动项目二，其它项目/section 不动。**
> Redesign Project 02's course-pack: use Bilibili video `BV1tb4y1U7Du` as the source of truth, extract the small useful core from the project-02 folder (mostly noise), rebuild the course-pack + sync website data. ONLY Project 02; everything else frozen.

---

## 一、任务核心 | Mission Core

**一句话**：用户给项目二传了一大堆文件（多数没用），核心就一点点；以 Bilibili 视频 `BV1tb4y1U7Du` 为项目真相，**筛选提取文件夹里的核心**，重新设计项目二的课程包（README/课程/硬件/软件/作业）并同步网站 `content/projects.ts` 的 02 条目；清掉噪音。

**用户原话定调**：
- "给项目二又上传了一些文件，但是这里边有一大堆，很多都是没有用的，核心的文件就一点点" → 文件夹大、多数噪音、核心很小
- "我希望你帮我重新设计一下项目二，视频的链接如下：`https://www.bilibili.com/video/BV1tb4y1U7Du/`" → **视频是项目真相/参考**
- "我所有关键信息都已经放在了这个文件夹下了，继续筛选提取一下" → 关键信息在文件夹里，要**筛选提取**
- "这个文件夹当前太大了，肯定是用不完里面所有的信息的，只有一些很小一部分是有用的关键信息" → 只用小部分核心，其余不硬塞
- "外围配置（multi-agent 等）通用" → 沿用标准自主授权/fan-out/skills/MCP

> 🔗 **范围**：只动 `project-02-env-monitor-mid/`（子模块，课程包）+ `website/content/projects.ts` 的 02 条目。**其它 8 个项目、网站其它 section、视觉/动效/路由一律锁死。**

---

## 二、现状（Agent 必读，已核对）| Current State

**`project-02-env-monitor-mid/`（git 子模块，`jojojjjjj/project-02-env-monitor-mid`）结构：**

**A. 现有课程包（legit，待按视频重做内容）：**
- `README.md`、`cover.pdf`
- `curriculum/`：`overview.md`、`prerequisites.md`、`day-01.md`…`day-12.md`、`assignments.md`、`grading-rubric.md`
- `hardware/`：`BOM.md`、`assembly-steps.md`、`troubleshooting.md`、`wiring-guide.md`
- `software/`：`config.template.yaml`、`requirements.txt`、`src/`（`main.py`/`sensors.py`/`mqtt_manager.py`/`wifi_manager.py`/`display.py`/`config.py`/`utils.py`/`server/subscriber.py`）、`tests/test_basic.py`
- `assignments/`：`final-presentation.md`、`rubric.md`、`week-1-checkin.md`、`week-2-checkin.md`
- 现内容方向：**ESP32 + MQTT + InfluxDB + Grafana** 室内环境监测（PM2.5/CO2/温湿度）

**B. 用户新传的 `视频例程共享资源/`（大堆，多数噪音）：**
- 一堆 **STM32 "超简单的开发方法" 系列**/ESP8266 例程 zip（LED 数码管、NBIoT 人体红外、像素鸟、Fi-Relay、Fi-Clock、Ali IoT Car、GPIO/UART/PWM/ADC/I2C、超声波、矩阵键盘、步进/舵机、OpenCV 跟踪…）——基本是**该 Bilibili 教学系列的各期资源**，多数与本项目无关
- `开发工具下载/`：JDK/JRE exe、STM32CubeIDE、串口工具、字模工具等——**噪音**
- `帮助文档/`：STM32CubeIDE/AT 命令/HBuilderX 等 pdf——多数噪音
- **⭐核心线索**：`视频例程共享资源/视频中的例程源码_v0.1.zip`（"视频中的例程源码"）+ `使用说明.txt`——**很可能就是视频里本项目用的源码**，优先解包核对

**网站 `content/projects.ts` 02 条目**（id='02', slug='env-monitor', titleZh='环境感知监测站' / titleEn='EnvSense'）：现 ESP32+MQTT+InfluxDB+Grafana 方向，difficulty 2, 10 天，hardware=[ESP32, PMS5003, SCD40, OLED]，links.github=上游 `AnshulFursule/ESP32-IoT-Air-Quality-Monitoring-System`，`adaptedRepo=jojojjjjj/project-02-env-monitor-mid`。**无 Bilibili 链接**（要加 `bilibili: 'https://www.bilibili.com/video/BV1tb4y1U7Du/'`）。

---

## 三、筛选提取（Agent 必做）| Filter & Extract

### 3.1 视频为准（source of truth）
- 用 **browser-harness** 打开 `https://www.bilibili.com/video/BV1tb4y1U7Du/`，提取：标题、简介、UP 主、封面、分集/章节、关键演示内容 → **搞清项目二到底是什么**（硬件平台、传感器、功能、形态）
- 若可下载视频流（`yt-dlp`/B 站工具），抽 3-5 帧用 **MCP `vision`** 分析演示内容；下载不了就靠页面标题/简介/封面
- 若 B 站访问受限，回退：解包 `视频例程共享资源/视频中的例程源码_v0.1.zip` + `使用说明.txt` 推断项目

### 3.2 文件夹筛选（核心 vs 噪音）
- **解包 `视频中的例程源码_v0.1.zip`**（`node_repl`/Bash unzip）→ 核对是否与视频项目一致 → 这是**核心源码**
- 逐项判断 `视频例程共享资源/` 其它 zip/pdf/exe：与**本项目视频**直接相关 → 留作参考；无关（其它期 STM32/ESP8266 例程、JDK、工具）→ **噪音，清掉**
- 现有课程包（curriculum/hardware/software/assignments）：按视频真相判断——若与视频方向一致 → 精修内容；若冲突（如现 ESP32+MQTT+InfluxDB 与视频 STM32/NBIoT 不符）→ **以视频为准重做**
- 产出 `verify/project02/core-extraction.md`：核心文件清单、噪音清单、项目真相结论、与现课程包的差异

### 3.3 方向冲突处理（confusion protocol）
- 若视频项目与现课程包**方向显著不同**（平台/技术栈换了），**先 STOP**，用 AskUserQuestion 向用户确认："视频显示项目是 X（平台/技术），现课程包是 Y，是否按视频重做？" → 确认后再重做
- 若只是细节差异（同为 ESP32 环境监测，传感器/协议微调）→ 直接以视频为准重做，记入 `decisions.md`

---

## 四、重新设计课程包 | Redesign Course-Pack

按视频真相 + 提取的核心，重做 `project-02-env-monitor-mid/` 内容（**保留目录结构**，更新内容）：

- **`README.md`**：项目概述、硬件平台、功能、技术栈、开源出处（视频 UP 主/原仓库）、Bilibili 视频链接、难度/时长
- **`curriculum/`**：`overview.md`（项目目标/成果）、`prerequisites.md`（前置）、`day-01..day-10`（或 12，按 10-20 天约束）逐日教案（笨鸟先飞：讲 why 不止 how、含调试指南、常见错误）；`assignments.md`/`grading-rubric.md`
- **`hardware/`**：`BOM.md`（<!-- ≤¥500/套 -->，含型号/规格/价格/购买参考）、`wiring-guide.md`、`assembly-steps.md`、`troubleshooting.md`
- **`software/`**：`src/` 真实可跑代码（从视频源码提取/整理，**不是占位**）、`config.template.yaml`、`requirements.txt`、`tests/`
- **`assignments/`**：周报、最终展示、评分量规
- **双语**：中文为主、英文辅助（标题/关键术语/描述）
- **约束**：硬件 <!-- <¥500 -->、10-20 天、高中零基础可完成 MVP、基于真实开源/视频项目
- **清噪**：把 `视频例程共享资源/` 里**确认无关的噪音**从子模块删除（commit 删除）；仅保留核心源码 + 直接相关参考。不确定的留作 `resources/` 并说明

---

## 五、网站数据同步 | Sync Website Data

`website/content/projects.ts` 的 02 条目按重做后的课程包更新（**只改 02 条目，不动其它 8 个**）：
- `titleZh`/`titleEn`/`subtitle`/`subtitleEn`/`description`/`descriptionEn`：与视频项目一致
- `mcu`/`coreTech`/`tags`/`skills`/`hardware`/`timeline`：按视频真相的实际平台/传感器/技术栈/日程
- `difficulty`/`difficultyLabel`/`duration`：按实际（保持 1-5 难度、10-20 天约束）
- `links`：保留 `adaptedRepo`（`jojojjjjj/project-02-env-monitor-mid`）；`github` = **视频/原项目开源仓库**（核实，见 prompt 15 规则）；**加 `bilibili: 'https://www.bilibili.com/video/BV1tb4y1U7Du/'`**
- `cover`：若有新封面图则更新路径
- 不动 `color`/`colorHex`/`icon`/`id`/`slug`/`number`（保持站点一致）

---

## 六、子模块工作流 | Submodule Workflow

`project-02-env-monitor-mid/` 是 git 子模块（自有仓库 `jojojjjjj/project-02-env-monitor-mid`，branch `main`）：
1. **在子模块内**改文件 → `cd project-02-env-monitor-mid && git add -A && git commit -m "feat: redesign project-02 course-pack per video BV1tb4y1U7Du" && git push origin main`
2. **回到父仓库** bump 指针：`cd .. && git add project-02-env-monitor-mid && git commit -m "chore: bump project-02 submodule (redesign)"`
3. 网站不 import 子模块，`content/projects.ts` 改动在父仓库单独 commit
4. 删噪音文件也在子模块内 commit 删除

---

## 七、技术约束 | Technical Constraints

- **只动项目二**：`project-02-env-monitor-mid/`（子模块）+ `content/projects.ts` 的 02 条目。**其它 8 个项目、网站 section、视觉/动效/路由/全局 token 锁死。**
- **视频为准**：课程包内容须与 Bilibili 视频 `BV1tb4y1U7Du` 一致；现课程包若冲突，以视频重做（重大方向冲突先问用户）
- **核心提取**：只用文件夹里小部分有用信息，不硬塞噪音；无关 zip/exe/pdf 从子模块清掉
- **保持**：双语；硬件 <!-- <¥500 -->；10-20 天；高中零基础 MVP 可完成；基于真实开源/视频项目；`npm run build` 通过；SSG；`app.baseURL`
- **真实可跑**：`software/src/` 是视频源码整理出的真实代码，不是占位
- **视觉验证产物一律 `verify/project02/`**

---

## 八、视觉检测 + 审查 | Visual QA & Review

- browser-harness 截本地 `/projects/env-monitor` 详情页 before/after → `verify/project02/captures/`：核对标题/描述/技能/硬件/时间线/链接（含 Bilibili）渲染正确、无错位
- 移动端 375 详情页可读
- `gstack-design-review` 审详情页内容呈现（与重做后课程包一致、层级清晰）→ `verify/project02/design-review.md`
- **可选** 多 agent 评审团（用户未强制 >8.8；以 design-review + 内容与视频一致性为准）
- **内容一致性核对**：详情页内容 vs 视频 vs 课程包 README——三者项目方向/硬件/技术栈一致

---

## 九、工具 / 技能 / MCP 自主授权 | Full Autonomy

Agent **被完全授权**，可**自由 fan-out 子 Agent**、**自由用 skills 与 MCP**，**无需逐项请示**：

### 🤖 子 Agent / 编排
- **Agent fan-out**：Explore（看视频 + 解包 `视频中的例程源码_v0.1.zip` + 清点文件夹核心/噪音）、backend-dev/data-engineer（重做 curriculum/hardware/software 内容）、frontend-dev（同步 `content/projects.ts` + 详情页验证）、QA（内容一致性 + 详情页渲染）
- **Plan**：先出"项目真相结论 + 核心/噪音清单 + 重做方案"

### 🔍 视频 / 资源分析
- **browser-harness**：打开 Bilibili 视频页提取标题/简介/封面；本地详情页截图
- **MCP `vision`**：分析视频抽帧 + 详情页渲染（子 agent 直调 `mcp__vision__describe_image`）
- **Bash `unzip`/`node_repl`**：解包 `视频中的例程源码_v0.1.zip`、核对源码结构、`du` 找大噪音文件
- **deep-research** / **WebSearch**：若需，查视频 UP 主/原项目开源仓库

### 🎨 设计 / 审查
- **gstack-design-consultation** / **gstack-design-review**：课程包结构与详情页审查
- **frontend-skill**：详情页数据同步实现

### ✅ 质量验证
- **verify** / **run**：本地起站看 `/projects/env-monitor` 详情页
- **code-review** / **gstack-review**：diff 自审（**重点核对只动了项目二**）

### 📸 归档（`verify/project02/`）
- `core-extraction.md`（核心/噪音清单 + 项目真相）、`decisions.md`（方向决策）、`captures/`（详情页 before/after）、`design-review.md`、`SUMMARY.md`

> **核心原则**：视频为准；只提取核心、清掉噪音；只动项目二；课程包与网站数据一致；子模块工作流正确。

---

## 十、执行阶段 | Execution Phases

### Phase 0：视频 + 文件夹分析 | Video & Folder Analysis
1. browser-harness 看 Bilibili `BV1tb4y1U7Du` → 项目真相（平台/传感器/功能/技术栈）
2. 解包 `视频中的例程源码_v0.1.zip` + `使用说明.txt` 核对；清点 `视频例程共享资源/` 核心 vs 噪音
3. 对比现课程包（ESP32+MQTT+InfluxDB+Grafana）与视频；方向冲突 → STOP 问用户
4. `Read content/projects.ts` 02 条目；browser-harness 截当前详情页 → `verify/project02/before/`
**验收**：`core-extraction.md`（项目真相 + 核心/噪音清单 + 方向决策）

### Phase 1：重做课程包 | Redesign Course-Pack
- 按视频真相重做 `project-02-env-monitor-mid/`：README/curriculum/hardware/software/assignments
- `software/src/` 用视频源码整理的真实代码
- 清噪音（子模块内 commit 删除无关 zip/exe/pdf）
- 子模块 commit + push
**验收**：课程包内容与视频一致、双语、约束达标、噪音已清

### Phase 2：网站数据同步 | Sync Website
- `content/projects.ts` 02 条目更新（含加 `bilibili` 链接、核实 `github` 上游、保留 `adaptedRepo`）
- 父仓库 bump 子模块指针 + commit `content/projects.ts`
**验收**：本地 `/projects/env-monitor` 详情页渲染正确

### Phase 3：QA & 汇报
- `gstack-design-review` + 详情页 before/after + 内容一致性核对（视频↔课程包↔详情页）
- `npm run build` 通过
- `verify/project02/SUMMARY.md`：项目真相、核心提取清单、重做内容、清噪清单、网站同步、子模块提交、已知遗留

---

## 十一、质量红线 | Quality Gates

1. ❌ 课程包内容与 Bilibili 视频 `BV1tb4y1U7Du` 不一致（方向/硬件/技术栈对不上）
2. ❌ 没筛选、把噪音硬塞进课程包 / 噪音未清
3. ❌ `software/src/` 是占位/与视频无关的旧代码
4. ❌ 改了项目二以外的项目 / 网站 section / 视觉 / 路由
5. ❌ 硬件 BOM <!-- >¥500 --> / 时长不在 10-20 天 / 非双语 / 非真实开源基础
6. ❌ 详情页缺 Bilibili 链接 / `github` 非上游 / `adaptedRepo` 丢失
7. ❌ 子模块未 commit+push / 父仓库未 bump 指针
8. ❌ `npm run build` 失败 / SSG 破
9. ❌ 方向显著冲突未问用户就擅自重做

---

## 十二、执行指令 | Execution Order

1. browser-harness 看 Bilibili 视频 → 项目真相；解包 `视频中的例程源码_v0.1.zip`；清点核心/噪音
2. 方向冲突 → STOP 问用户；否则按视频重做
3. **fan-out** 课程包重做 + 网站同步 + QA（并发）
4. 按 Phase 0→3 执行
5. 子模块 commit+push、父仓库 bump+commit
6. browser-harness 详情页 before/after + `gstack-design-review`
7. 交付 `verify/project02/SUMMARY.md`

> **Agent 完全授权声明**：可自主调用"九、工具/技能/MCP 自主授权"中全部技能、MCP、插件与子 Agent，无需逐一请示。第一优先级：**视频为准、提取核心、清掉噪音、只动项目二、课程包与网站数据一致**。方向冲突先问用户。

---

*核心理念：Bilibili 视频是项目真相；文件夹只取小部分核心、清掉大堆噪音；重做课程包 + 同步网站 02 条目；只动项目二。*
