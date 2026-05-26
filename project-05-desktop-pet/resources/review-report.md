# 桌宠项目复查报告
复查日期：2026-05-26

## 总体评价

桌宠"萌桌面"项目整体质量较高，文件结构完整，课程设计系统性强，中英双语覆盖良好，B站视频资源丰富。主要问题集中在：评分标准在多个文件中权重不一致、部分代码存在缩进/导入错误、以及少数格式细节需要统一。以下是逐项检查结果。

---

## 检查结果

### 1. 文件完整性

全部必需文件均已存在：

- [x] README.md
- [x] resources/search-results.md
- [x] curriculum/overview.md
- [x] curriculum/prerequisites.md
- [x] curriculum/assignments.md
- [x] curriculum/grading-rubric.md
- [x] curriculum/day-01.md ~ day-12.md（共12个文件全部存在）
- [x] hardware/BOM.md
- [x] hardware/wiring-guide.md
- [x] hardware/assembly-steps.md
- [x] hardware/troubleshooting.md
- [x] software/requirements.txt
- [x] software/config.template.yaml
- [x] software/src/main.py
- [x] software/src/pet.py
- [x] software/src/animation.py
- [x] software/src/state_machine.py
- [x] software/src/interaction.py
- [x] software/src/dialog.py
- [x] software/src/utils.py
- [x] software/tests/test_basic.py
- [x] assignments/week-1-checkin.md
- [x] assignments/week-2-checkin.md
- [x] assignments/final-presentation.md
- [x] assignments/rubric.md

**结论：文件完整性通过，无缺失文件。**

---

### 2. 内容质量

#### README.md 检查
- [x] 有B站视频链接（8个视频，含链接、UP主、时长、推荐理由）
- [x] BOM总预算：基础版0元，拓展版约43元，远低于500元预算
- [x] 中英双语：标题、正文、表格均有英文对照

#### 每日课程（day-XX.md）检查
- [x] 每一天都有"为什么要学这个? | Why Learn This?"部分
- [x] 每一天都有时间安排表（Schedule）
- [x] 每一天都有"今日作业 | Homework"部分（含必做题、挑战题、思考题）

#### BOM.md 检查
- [x] 价格合理（Arduino Nano ~15元，DHT11 ~8元等）
- [x] 有购买建议（淘宝/拼多多搜索关键词）
- [x] 有替代方案说明
- [x] 有购买渠道对比

#### 代码文件中文注释检查
- [x] main.py -- 有中文docstring和行内注释
- [x] pet.py -- 有中文docstring和行内注释
- [x] animation.py -- 有中文docstring和行内注释
- [x] state_machine.py -- 有中文docstring和行内注释
- [x] interaction.py -- 有中文docstring和行内注释
- [x] dialog.py -- 有中文docstring和行内注释
- [x] utils.py -- 有中文docstring和行内注释
- [x] test_basic.py -- 有中文docstring

#### Demo网站要求检查
- [x] final-presentation.md -- 第99-130行有完整的Demo网站要求（部署平台、内容清单、技术建议、评分标准）
- [x] assignments/rubric.md -- 第82-95行"三、Demo网站（15%）"有详细评分表
- [x] day-12.md -- 第205-228行"任务一：创建项目展示网站"有详细步骤和内容检查清单
- [x] README.md -- 第128行提及"Demo网站部署"，第137行评分标准中有"Demo网站 15%"

**结论：内容质量通过，Demo网站要求在四个文件中均有一致体现。**

---

### 3. 一致性

#### 3.1 课程天数一致性
- [x] overview.md：明确说明"为期12天"
- [x] README.md：课程安排表列出Day 1-12
- [x] day-01.md ~ day-12.md：共12个文件全部存在
- [x] assignments.md：说明"12天的学习过程"

**结论：课程天数一致，均为12天。**

#### 3.2 评分标准一致性 [存在问题]

**问题1：三套评分权重不一致**

存在三份评分标准文件，权重各不相同：

| 维度 | curriculum/grading-rubric.md | README.md | assignments/rubric.md | assignments/assignments.md |
|------|-----|-----|-----|-----|
| 技术实现 | 40% | 40% | 40% | -- |
| 文档质量 | 20% | 15% | 15% | -- |
| 演示展示 | 20% | 15% | 15% | -- |
| Demo网站 | 无 | 15% | 15% | -- |
| 进度汇报 | 10% | 10% | 10% | -- |
| 创新拓展 | 10% | 10% | 10% | -- |
| 每日作业 | -- | -- | -- | 30% |
| 周进度汇报 | -- | -- | -- | 15% |
| 最终展示 | -- | -- | -- | 40% |
| 课堂参与 | -- | -- | -- | 15% |

- curriculum/grading-rubric.md 和 README.md 权重不同（文档质量20% vs 15%，演示展示20% vs 15%）
- assignments/assignments.md 使用完全不同的分类体系（每日作业30%、最终展示40%等），与rubric体系完全脱节
- README.md 和 assignments/rubric.md 权重一致（为正确版本）

#### 3.3 硬件清单与接线指南一致性
- [x] BOM.md列出的部件（Arduino Nano、按键模块、DHT11、面包板、杜邦线、USB线）与wiring-guide.md中的接线说明完全一致
- [x] 按键模块接D2引脚，DHT11接D3引脚，与assembly-steps.md中的描述一致
- [x] 电源连接（5V、GND）描述一致

**结论：硬件清单一致性通过。**

#### 3.4 课程技术点与代码模块对应关系 [存在问题]

**问题2：Day 8课程内容缺少对应代码模块**

Day 8（音效与特效系统）课程文件中描述了以下模块：
- `sound_manager.py` / `SoundEffectManager` -- 课程中有完整代码示例
- `particle_system.py` / `ParticleSystem` -- 课程中有完整代码示例

但实际代码中：
- 音效功能直接内嵌在 `pet.py` 的 `setup_sound()` 方法中（第226-252行），没有独立的 sound_manager.py 文件
- 粒子功能在 `pet.py` 中有简化版实现（`emit_particles()` 方法，第303-316行），没有独立的 particle_system.py 文件
- 也没有独立的 `physics.py` 文件（物理系统在 `interaction.py` 中）

**这不一定是错误**（模块整合是Day 11的教学内容），但课程第8天的代码示例与实际代码架构存在差异，可能让对照学习的学生产生困惑。

---

### 4. B站视频链接

#### README.md
- [x] 包含8个B站视频链接，格式为表格（视频名、UP主、时长、推荐理由）
- 链接格式正确，均以 `https://www.bilibili.com/video/` 开头

#### search-results.md
- [x] 包含完整的视频列表：综合教程10个、Python桌宠教程8个、Electron/Web 2个、AI桌宠专题4个、桌面精灵/其他6个
- 共计约30个B站视频，每个均包含链接、播放量、时长、发布日期、简介
- 信息非常详尽，有分类和排序

#### day-XX.md
- [x] day-01.md 参考资源：有2个B站链接（PyQt5入门搜索页、Python桌宠教程）
- [x] day-02.md 参考资源：有2个B站链接（五分钟桌宠、Shimeji教程）
- [x] day-03.md 参考资源：有1个B站链接（VPET动画制作）
- [x] day-04.md 参考资源：有1个B站链接（Python桌宠脚本）
- [x] day-05.md 参考资源：有1个B站链接（游戏AI状态机搜索页）
- [x] day-06.md 参考资源：有2个B站链接（模拟人生需求系统搜索页、行为树vs状态机搜索页）
- [x] day-07.md 参考资源：无B站链接（仅有Qt/QSS官方文档和Pixabay）
- [x] day-08.md 参考资源：无B站链接（仅有PyQt5文档、Pixabay、Freesound等）
- [x] day-09.md 参考资源：有1个B站链接（Shimeji教程）
- [x] day-10.md 参考资源：有2个B站链接（AI桌宠教程、5分钟AI桌宠助手）
- [x] day-11.md 参考资源：有1个B站链接（Python打包exe搜索页）
- [x] day-12.md 参考资源：无B站链接

**建议：day-07、day-08、day-12 的参考资源部分可以补充相关B站视频链接，与search-results.md中的资源对应起来。**

---

### 5. 格式

#### 文件末尾日期标注
- [x] README.md -- `*最后更新：2026-05-26*`（带星号斜体）
- [x] curriculum/overview.md -- `*最后更新：2026-05-26*`
- [x] curriculum/prerequisites.md -- `*最后更新：2026-05-26*`
- [x] curriculum/assignments.md -- `*最后更新：2026-05-26*`
- [x] curriculum/grading-rubric.md -- `*最后更新：2026-05-26*`
- [x] curriculum/day-01.md ~ day-11.md -- 均有 `*最后更新：2026-05-26*`
- [x] curriculum/day-12.md -- 有 `*最后更新：2026-05-26*`（注意：无星号斜体格式，是纯文本）
- [x] hardware/BOM.md -- `*最后更新：2026-05-26*`
- [x] hardware/wiring-guide.md -- `*最后更新：2026-05-26*`
- [x] hardware/assembly-steps.md -- `*最后更新：2026-05-26*`
- [x] hardware/troubleshooting.md -- `*最后更新：2026-05-26*`
- [x] assignments/week-1-checkin.md -- `*最后更新：2026-05-26*`
- [x] assignments/week-2-checkin.md -- `*最后更新：2026-05-26*`
- [x] assignments/final-presentation.md -- `*最后更新：2026-05-26*`
- [x] assignments/rubric.md -- `*最后更新：2026-05-26*`
- [ ] resources/search-results.md -- **缺失日期标注**（有搜索日期"2026-05-26"在第2行，但没有"最后更新"脚注）

#### 中英双语检查
- [x] README.md -- 全文中英双语
- [x] curriculum/ 全部文件 -- 标题和主要段落均有英文对照
- [x] hardware/ 全部文件 -- 中英双语
- [x] assignments/ 全部文件 -- 中英双语
- [x] software/requirements.txt -- 有中文注释
- [x] software/config.template.yaml -- 中英双语注释
- [x] software/src/ 全部代码 -- docstring中英双语

#### 表格格式检查
- [x] 所有文件中的Markdown表格格式正确（表头、分隔线、内容对齐）
- [x] BOM表格列数一致
- [x] 课程安排表格格式统一

**结论：格式基本通过，有1处缺失日期标注，1处日期格式不统一（Day 12无星号斜体）。**

---

## 需要修复的问题

### 问题1（高优先级）：评分标准权重不一致
- **文件**：`curriculum/grading-rubric.md`
- **问题**：权重分配（文档20%、演示20%、无Demo网站）与 `README.md` 和 `assignments/rubric.md`（文档15%、演示15%、Demo网站15%）不一致
- **影响**：学生可能收到互相矛盾的评分标准信息

### 问题2（高优先级）：assignments.md 评分体系与 rubric 脱节
- **文件**：`curriculum/assignments.md` 第44-52行
- **问题**：该文件使用独立的评分分类（每日作业30%、周汇报15%、最终展示40%、课堂参与15%），与其他文件的六维评分体系（技术实现/文档/演示/Demo网站/汇报/创新）完全不同
- **影响**：学生不清楚最终成绩是如何计算的

### 问题3（中优先级）：day-04.md 代码缩进错误
- **文件**：`curriculum/day-04.md` 第287-294行
- **问题**：`move_to` 方法中，`max_x`/`max_y` 计算和 `self.move()` 调用的缩进不正确，混用了4空格和8空格缩进，会导致 `IndentationError`
- **具体行**：
```python
    def move_to(self, x, y):
        """移动宠物到指定位置，防止走出屏幕"""
        screen = QApplication.desktop().screenGeometry()

        # 计算边界限制
            max_x = screen.width() - self.width()  # <-- 多缩进了一级
            max_y = screen.height() - self.height()

            # 限制在屏幕范围内
            x = max(0, min(x, max_x))
            y = max(0, min(y, max_y))

            self.move(x, y)

        def get_position(self):  # <-- 这个方法也被错误地嵌套在move_to里面了
```

### 问题4（低优先级）：interaction.py 未使用的导入
- **文件**：`software/src/interaction.py` 第9行
- **问题**：导入了 `import math`，但文件中未使用 `math` 模块（物理计算使用的是 `**0.5` 而非 `math.sqrt()`）
- **影响**：不影响运行，但代码质量检查可能会被扣分

### 问题5（低优先级）：dialog.py 中 ChatDialog 的 QApplication 导入缺失
- **文件**：`software/src/dialog.py`
- **问题**：`ChatDialog` 类在 `pet.py` 的 `contextMenuEvent` 中通过 `from dialog import ChatDialog` 使用（参考 day-10.md 的代码示例），但 `pet.py` 的实际代码中并没有集成 AI 聊天功能到右键菜单，`dialog.py` 中的 `AIDialogManager` 和 `ChatDialog` 类是"死代码"（已定义但未被任何地方调用）
- **影响**：功能模块已编写但未集成，学生可能困惑为什么写了代码但右键菜单中没有"聊天"选项

### 问题6（低优先级）：search-results.md 缺少"最后更新"脚注
- **文件**：`resources/search-results.md`
- **问题**：文件第2行有"搜索日期：2026-05-26"，但缺少统一格式的末尾脚注 `*最后更新：2026-05-26*`

### 问题7（低优先级）：day-12.md 日期标注格式不统一
- **文件**：`curriculum/day-12.md` 第263行
- **问题**：日期标注为 `*最后更新：2026-05-26*`，无Markdown斜体格式（其他文件使用 `*最后更新：2026-05-26*` 包裹）
- **实际检查**：经核实 day-12.md 确实有 `*最后更新：2026-05-26*`，格式与其他文件一致。此条撤回，无问题。

### 问题8（中优先级）：课程代码示例与实际代码架构差异
- **文件**：`curriculum/day-08.md`
- **问题**：课程中描述了独立的 `sound_manager.py`（SoundEffectManager类）和 `particle_system.py`（ParticleSystem类），但实际代码中这些功能被简化并内嵌在 `pet.py` 中。课程描述与实际代码的文件组织不一致。
- **影响**：如果学生参考课程文档寻找对应源码文件，会找不到

---

## 修复建议

### 建议1：统一评分标准

选择 `README.md` 和 `assignments/rubric.md` 中的权重作为标准版本（因为两者一致且包含Demo网站维度），然后修改 `curriculum/grading-rubric.md` 的权重使其一致：

| 维度 | 统一权重 |
|------|----------|
| 技术实现 | 40% |
| 文档质量 | 15% |
| 演示展示 | 15% |
| Demo网站 | 15% |
| 进度汇报 | 10% |
| 创新拓展 | 10% |

同时修改 `curriculum/assignments.md` 的评分权重部分，在六维体系下重新解释"每日作业"如何计入成绩（例如：每日作业计入"技术实现"维度），或删除该文件中的独立权重表，改为引用 `grading-rubric.md`。

### 建议2：修复 day-04.md 代码缩进

将第287-300行的代码修正为：
```python
    def move_to(self, x, y):
        """移动宠物到指定位置，防止走出屏幕"""
        screen = QApplication.desktop().screenGeometry()

        # 计算边界限制
        max_x = screen.width() - self.width()
        max_y = screen.height() - self.height()

        # 限制在屏幕范围内
        x = max(0, min(x, max_x))
        y = max(0, min(y, max_y))

        self.move(x, y)

    def get_position(self):
        """获取宠物当前位置"""
        pos = self.pos()
        return pos.x(), pos.y()
```

### 建议3：清理 interaction.py 中未使用的导入

删除 `software/src/interaction.py` 第9行的 `import math`。

### 建议4：在 pet.py 中集成 AI 对话功能

在 `pet.py` 的右键菜单中添加"和我聊天"选项，参照 day-10.md 中的代码示例，将 `AIDialogManager` 和 `ChatDialog` 集成到主程序中（当配置文件中 `ai.enabled` 为 True 时显示该菜单项）。

### 建议5：补充缺失的日期标注

在 `resources/search-results.md` 末尾添加：
```
*最后更新：2026-05-26*
```

### 建议6：补充 day-07、day-08、day-12 的B站参考视频

参照 search-results.md 中的资源，为这三天的参考资源部分补充相关B站视频链接，例如：
- day-07（气泡对话框）：可参考 Python桌宠教程中的对话系统相关视频
- day-08（音效与特效）：可参考 Pixabay音效使用教程
- day-12（项目展示）：可参考 AI桌宠相关展示视频

---

## 总结

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 文件完整性 | 通过 | 25个必需文件全部存在 |
| 内容质量 | 通过 | 课程结构完整，代码有中文注释，BOM预算合理 |
| 一致性 | 有瑕疵 | 评分权重在3个文件中不一致，课程代码示例与实际代码架构有差异 |
| B站视频链接 | 通过 | README和search-results.md视频资源丰富，3天课程可补充 |
| 格式 | 基本通过 | 1处缺失日期标注，其余格式统一 |

**需要修复的问题共8个，其中高优先级2个（评分标准不一致）、中优先级2个（代码缩进错误、课程与代码架构差异）、低优先级4个。**
