# Day 05: EDA 工具入门（嘉立创 EDA） | EDA Tool Introduction (JLCEDA)

> **今日目标 Today's Goals:**
> - 了解 PCB 设计的完整流程（原理图 -> PCB -> Gerber -> 打样）
> - 注册并熟悉嘉立创 EDA 的界面和操作
> - 学会绘制基本电路原理图（电阻、LED、STM32）
> - 了解元件库、封装（Footprint）的概念
>
> **产出 Deliverable:** 嘉立创 EDA 中完成的练习原理图

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 第二阶段介绍，PCB 设计的意义 |
| 09:15–10:30 | 讲解 | PCB 设计流程 + EDA 工具对比 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | 嘉立创 EDA 注册与界面熟悉 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 绘制练习电路原理图 |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | 元件搜索与封装认识 |
| 16:30–17:00 | 总结 | 日终回顾 + 明日预告 |

---

## 上午：PCB 设计流程与 EDA 工具 | Morning: PCB Design Flow & EDA Tools

### 为什么要学这个? | Why Learn This?

面包板上的电路是"临时"的——线会松动，接触不稳定，无法携带。PCB（印刷电路板）将电路永久固化在一块板子上，不仅可靠，还美观紧凑。你使用的每一台电子设备——手机、电脑、游戏机——内部都有一块或多块 PCB。

A breadboard circuit is temporary — wires come loose, contacts are unreliable, and it can't be carried around. A PCB (Printed Circuit Board) permanently etches the circuit onto a board — reliable, compact, and professional. Every electronic device you use contains one or more PCBs.

设计 PCB 是从"原型"走向"产品"的关键一步。嘉立创 EDA 是国产免费工具，与嘉立创打样服务直接集成，是中国硬件开发者的首选。

---

### 任务 5.1: PCB 设计完整流程 (75 分钟)

**完整流程 Complete Workflow:**

```
1. 需求分析           2. 原理图设计           3. PCB 布局
   (需要哪些元件?)        (电路连接关系)          (元件位置安排)
       |                     |                     |
       v                     v                     v
6. 焊接组装    <------  5. 打样制造    <------  4. PCB 布线
   (实际焊接)            (嘉立创下单)          (走线规则检查)
       |
       v
7. 测试调试 -> 成品!
```

**各阶段详解:**

#### 阶段 1: 原理图设计 (Schematic Design)
- 在 EDA 工具中放置元件符号
- 用导线连接元件引脚
- 标注元件值（电阻值、电容值等）
- 添加电源和地符号
- 进行电气规则检查（ERC）

#### 阶段 2: PCB 布局 (PCB Layout)
- 从原理图导入网表（Netlist）
- 将元件从"飞线"状态排列到 PCB 板上
- 考虑信号完整性、电源完整性、散热等因素
- 确定板子尺寸和安装孔位置

#### 阶段 3: PCB 布线 (PCB Routing)
- 用铜导线连接各元件的焊盘
- 遵循布线规则（线宽、间距、过孔等）
- 电源线要粗（建议 >= 0.5mm），信号线可以细（0.25mm）
- 进行设计规则检查（DRC）

#### 阶段 4: 生成制造文件 (Generate Manufacturing Files)
- 导出 Gerber 文件（各层的光绘文件）
- 导出钻孔文件（Drill File）
- 导出 BOM（物料清单）
- 导出坐标文件（用于贴片机）

#### 阶段 5: 打样制造 (PCB Fabrication)
- 上传 Gerber 到嘉立创（jlc.com）
- 选择参数（板厚 1.6mm，铜厚 1oz，阻焊绿色）
- 下单付款（5 片/5 元，约 3-5 天到货）

---

### 任务 5.2: 嘉立创 EDA 界面熟悉 (75 分钟)

**步骤 Steps:**

1. **注册账号**：访问 https://lceda.cn/ 注册嘉立创账号
2. **新建项目**：选择"新建工程" -> "嘉立创 EDA 专业版"
3. **认识界面**：

```
+------------------------------------------------------------------+
|  文件  编辑  视图  放置  工具  帮助     [保存] [撤销] [重做]      |
+------------------------------------------------------------------+
|        |                                         |   属性面板    |
|  元件  |                                         |   ----------  |
|  库    |           原理图编辑区                   |   元件属性    |
|        |          (白色画布区域)                   |   引脚定义    |
|  搜索  |                                         |   网络名称    |
|  ----  |                                         |              |
|  电阻  |                                         |              |
|  电容  |                                         |              |
|  MCU   |                                         |              |
|        |                                         |              |
+------------------------------------------------------------------+
|  状态栏: 当前坐标 | 缩放比例 | 网格大小                         |
+------------------------------------------------------------------+
```

4. **基本操作练习**：
   - 放置元件：从左侧库中搜索并拖放
   - 连线：使用导线工具（快捷键 W）连接引脚
   - 放置电源/地符号
   - 修改元件属性（双击元件）
   - 移动、旋转、镜像元件
   - 撤销/重做（Ctrl+Z / Ctrl+Y）

**常用快捷键 Essential Shortcuts:**

| 快捷键 Shortcut | 功能 Function |
|---|---|
| W | 放置导线 (Wire) |
| N | 放置网络标签 (Net Label) |
| P | 放置元件 (Place Component) |
| G | 放置地符号 (Ground) |
| V | 放置电源符号 (Power) |
| R | 旋转元件 (Rotate) |
| Ctrl+Z | 撤销 (Undo) |
| Ctrl+S | 保存 (Save) |

---

## 下午：练习原理图绘制 | Afternoon: Schematic Drawing Practice

### 任务 5.3: 绘制 LED 闪烁电路 (90 分钟)

**练习电路 Practice Circuit:**

在嘉立创 EDA 中绘制以下原理图：

```
          VCC (3.3V)
            |
           [R1 220R]
            |
           [LED]
            |
           GND
```

**步骤 Steps:**

1. **搜索元件**：
   - 搜索 "STM32F103C8T6"，选择 LQFP48 封装
   - 搜索 "220R" 电阻，选择 0805 封装
   - 搜索 "LED"，选择 0805 封装
   - 搜索 "USB Type-C"，选择 16P 母座

2. **放置元件**：将元件拖放到画布上

3. **连线**：
   - 用导线连接 STM32 的 PC13 引脚到电阻 R1
   - 连接 R1 到 LED 正极
   - 连接 LED 负极到 GND

4. **添加电源符号**：
   - 在 VCC 线上放置 3.3V 电源符号
   - 在接地线上放置 GND 符号

5. **标注元件**：
   - R1: 220 ohm, 0805 封装
   - D1: LED 红色, 0805 封装

6. **运行 ERC**：检查是否有连接错误

**预期结果 Expected Result:**
- 原理图无 ERC 错误
- 元件标号（Designator）正确
- 所有引脚都已正确连接

**常见问题 Common Issues:**

| 问题 Problem | 原因 Cause | 解决方法 Solution |
|---|---|---|
| 找不到元件 | 搜索关键词不对 | 尝试英文关键词或型号 |
| 连线断开 | 未连到引脚端点 | 放大检查连接点 |
| ERC 报错 | 有未连接的引脚 | 添加 NC 标记或连接 |
| 元件方向不对 | 旋转操作 | 按 R 键旋转 |

---

### 任务 5.4: 认识封装 (Footprint) (选做)

**什么是封装? What is a Footprint?**

封装（Footprint）是元件在 PCB 上的物理形状，包括焊盘位置、尺寸、间距等信息。同一个电阻值可以有不同的封装：

```
直插 (DIP/THT):        贴片 0805:         贴片 0402:
  +---+                  +---+               +-+
  |   |                  |   |               | |
--+   --                --   --             -- --
  |   |                  +---+               +-+
  +---+
适合面包板              适合自动化生产       更小，手机常用
```

**常见封装尺寸 Common Package Sizes:**

| 封装 Package | 尺寸 (mm) | 适用 Application |
|---|---|---|
| 0402 | 1.0 x 0.5 | 手机、可穿戴设备 |
| 0603 | 1.6 x 0.8 | 小型电路板 |
| 0805 | 2.0 x 1.25 | 通用贴片（本项目推荐） |
| 1206 | 3.2 x 1.6 | 大尺寸，容易焊接 |
| DIP/直插 | 引脚间距 2.54mm | 面包板、手工焊接 |

**本项目推荐**：电阻和电容使用 **0805** 封装（大小适中，容易焊接）。

---

## 今日作业 | Homework

1. **完成练习原理图**：在嘉立创 EDA 中完成 LED 闪烁电路的原理图，截图提交
2. **回答思考题**：
   - 原理图和 PCB 的区别是什么？为什么不能跳过原理图直接画 PCB？
   - 0805 封装的 "0805" 数字代表什么含义？
   - 为什么 PCB 上的铜线不能像面包板上的杜邦线那样随意弯曲？
3. **预习 Day 6**：回顾 Day 2 的矩阵扫描电路，思考如何在原理图中表达 4x4 矩阵

---

## 明日预告 | Tomorrow's Preview

明天是关键一天：你将绘制**完整的 4x4 键盘原理图**，包括矩阵扫描电路、STM32 主控、OLED 接口、RGB LED 接口和旋钮编码器接口。这份原理图将直接用于 Day 7 的 PCB 布局。

Tomorrow is critical: you'll draw the **complete 4x4 keyboard schematic**, including matrix, STM32, OLED, RGB, and encoder interfaces. This schematic goes directly to PCB layout on Day 7.

---

## 参考资源 | References

- 嘉立创 EDA 官方教程：https://lceda.cn/
- 嘉立创开源硬件平台：https://oshwhub.com/
- B 站搜索 "嘉立创 EDA 入门教程"
- [不专业教学] 零基础绘制机械键盘 PCB（浚达良）：https://www.bilibili.com/video/BV1vz4y127qL/

---

*最后更新 | Last updated: 2026-05-26*
