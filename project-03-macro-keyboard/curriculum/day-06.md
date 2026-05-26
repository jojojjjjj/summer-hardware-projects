# Day 06: 键盘原理图绘制 | Keyboard Schematic Design

> **今日目标 Today's Goals:**
> - 绘制完整的 4x4 键盘矩阵原理图
> - 包含 STM32 主控、OLED 接口、WS2812B 接口、EC11 旋钮
> - 正确标注所有元件值和引脚分配
> - 通过 ERC 检查
>
> **产出 Deliverable:** 完整的键盘原理图文件（嘉立创 EDA）

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 回顾 Day 5 EDA 操作 |
| 09:15–10:30 | 讲解 | 键盘原理图设计要点 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | 绘制主控与矩阵部分 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 绘制外设接口部分 |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | ERC 检查与修正 |
| 16:30–17:00 | 总结 | 日终回顾 + 明日预告 |

---

## 上午：主控与矩阵原理图 | Morning: MCU & Matrix Schematic

### 为什么要学这个? | Why Learn This?

原理图是整个硬件设计的"蓝图"。它描述了每个元件之间的电气连接关系，但不关心物理位置。一个好的原理图应该让别人（包括未来的你）一眼就能看懂电路的工作原理。在工程界，原理图的质量直接决定了后续 PCB 设计和调试的效率。

A schematic is the "blueprint" of hardware design. It describes electrical connections without physical placement. A good schematic lets anyone understand the circuit at a glance. In engineering, schematic quality directly determines PCB design and debugging efficiency.

---

### 任务 6.1: 规划引脚分配 (30 分钟)

**STM32F103C8T6 引脚分配表 Pin Assignment:**

在开始画图之前，先规划好每个 GPIO 引脚的用途：

| 引脚 Pin | 功能 Function | 模式 Mode | 说明 Notes |
|---|---|---|---|
| PA0 | ROW0 | 输出 Output | 矩阵第 0 行 |
| PA1 | ROW1 | 输出 Output | 矩阵第 1 行 |
| PA2 | ROW2 | 输出 Output | 矩阵第 2 行 |
| PA3 | ROW3 | 输出 Output | 矩阵第 3 行 |
| PA4 | COL0 | 输入 Input | 矩阵第 0 列（上拉） |
| PA5 | COL1 | 输入 Input | 矩阵第 1 列（上拉） |
| PA6 | COL2 | 输入 Input | 矩阵第 2 列（上拉） |
| PA7 | COL3 | 输入 Input | 矩阵第 3 列（上拉） |
| PA8 | WS2812B_DIN | 输出 Output | RGB LED 数据线 |
| PB0 | ENC_A | 输入 Input | 旋钮 A 相 |
| PB1 | ENC_B | 输入 Input | 旋钮 B 相 |
| PB5 | ENC_SW | 输入 Input | 旋钮按键 |
| PB6 | I2C1_SCL | AF Open-Drain | OLED 时钟线 |
| PB7 | I2C1_SDA | AF Open-Drain | OLED 数据线 |
| PA11 | USB_DM | AF | USB D- |
| PA12 | USB_DP | AF | USB D+ |
| PA13 | SWDIO | AF | 调试接口 |
| PA14 | SWCLK | AF | 调试接口 |
| PC13 | LED | 输出 Output | 板载指示 LED |

> **提示**：PA11/PA12 是 STM32F103 的 USB 引脚，必须用于 USB 连接。SWDIO/SWCLK 用于调试和烧录。
> Note: PA11/PA12 are USB pins. SWDIO/SWCLK are for debugging and flashing.

---

### 任务 6.2: 绘制原理图——主控与矩阵 (90 分钟)

**原理图结构 Schematic Structure:**

建议将原理图分为几个功能模块，用方框标注：

```
+-------------------+     +-------------------+
|   USB 接口         |     |   晶振电路        |
|   (Type-C 母座)    |     |   (8MHz HSE)     |
+-------------------+     +-------------------+
         |                          |
         v                          v
+-----------------------------------------------+
|            STM32F103C8T6                      |
|                                                |
|   PA0-PA3 → ROW0-ROW3 (矩阵行)               |
|   PA4-PA7 ← COL0-COL3 (矩阵列)               |
|   PA8    → WS2812B DIN                       |
|   PB0-PB1 ← ENC_A / ENC_B (旋钮)             |
|   PB5    ← ENC_SW (旋钮按键)                  |
|   PB6    → I2C1_SCL (OLED)                    |
|   PB7    ↔ I2C1_SDA (OLED)                    |
|   PA11   ↔ USB D-                             |
|   PA12   ↔ USB D+                             |
+-----------------------------------------------+
         |                          |
         v                          v
+-------------------+     +-------------------+
|  4x4 键盘矩阵     |     |   OLED 接口       |
|  (16键+16二极管)  |     |   (SSD1306)       |
+-------------------+     +-------------------+
```

**绘制步骤 Drawing Steps:**

1. **放置 STM32F103C8T6**：从库中搜索并放置
2. **添加晶振电路**：
   - 8MHz 晶振连接到 OSC_IN 和 OSC_OUT
   - 两个 20pF 负载电容
3. **添加复位电路**：
   - NRST 引脚通过 10k 电阻上拉到 VCC
   - 并联一个 100nF 电容到 GND
   - 可选：添加复位按钮
4. **添加 USB 接口**：
   - Type-C 母座的 D+/D- 连接到 PA12/PA11
   - D+ 串联 22 ohm 电阻
   - USB 供电到 5V，通过 LDO 降压到 3.3V
5. **绘制矩阵电路**：
   - 4 个行引脚输出到矩阵
   - 4 个列引脚输入
   - 每个按键位置串联一个 1N4148 二极管

**预期结果 Expected Result:**
- 主控部分原理图完成
- 矩阵部分原理图完成
- 所有网络标签（Net Label）正确

---

## 下午：外设接口与检查 | Afternoon: Peripheral Interfaces & Review

### 任务 6.3: 绘制外设接口 (90 分钟)

#### OLED 接口
```
STM32         OLED (SSD1306)
PB6 (SCL) ---> SCL
PB7 (SDA) <--> SDA
3.3V  -------> VCC
GND   -------> GND

注意：I2C 总线需要 4.7k 上拉电阻（部分 OLED 模块已内置）
```

#### WS2812B 接口
```
STM32         WS2812B 灯带
PA8  ---[330R]---> DIN
5V   ------------> VCC
GND  ------------> GND

注意：串联 330R 保护电阻，VCC 并联 100uF 电容
```

#### 旋钮编码器接口
```
STM32         EC11 编码器
PB0  <---------- A (CLK)
PB1  <---------- B (DT)
PB5  <---------- SW (按键)
3.3V ----------> VCC (可选)
GND  ----------> GND

注意：A、B 相和按键需要上拉电阻（可使用 STM32 内部上拉）
```

#### 电源部分
```
USB Type-C 5V ---> AMS1117-3.3 (LDO) ---> 3.3V
                输入滤波电容 10uF         输出滤波电容 10uF
                + 旁路电容 100nF          + 旁路电容 100nF
```

**预期结果 Expected Result:**
- 所有外设接口原理图完成
- 电源电路正确
- 无 ERC 错误

---

### 任务 6.4: ERC 检查与修正 (30 分钟)

**ERC (Electrical Rules Check) 常见错误:**

| 错误类型 Error Type | 原因 Cause | 修正方法 Fix |
|---|---|---|
| 未连接引脚 Unconnected Pin | 忘记连线或添加 NC 标记 | 连线或标记为 No Connect |
| 电源冲突 Power Conflict | 同一网络有不同电压 | 检查电源标注 |
| 输出短路 Output Short | 两个输出连到同一网络 | 检查连接 |
| 缺少电源 Missing Power | MCU 没有 VCC/GND | 添加电源连接 |

**步骤 Steps:**
1. 运行 ERC 检查
2. 逐一查看每个错误/警告
3. 修正所有错误（红色标记）
4. 评估所有警告（黄色标记），确认可接受的忽略
5. 再次运行 ERC 确保全部通过

---

## 今日作业 | Homework

1. **提交原理图文件**：导出为嘉立创 EDA 格式文件，截图提交
2. **检查清单**：
   - [ ] STM32 所有电源引脚都已连接
   - [ ] 晶振电路完整（8MHz + 20pF 电容）
   - [ ] USB D+/D- 正确连接
   - [ ] 矩阵 16 个按键 + 16 个二极管
   - [ ] OLED 4 线连接
   - [ ] WS2812B 数据线 + 330R 电阻
   - [ ] 旋钮 3 线连接
   - [ ] ERC 无错误
3. **预习 Day 7**：搜索 "PCB 布局布线 规则 教程"

---

## 明日预告 | Tomorrow's Preview

明天你将把原理图转化为 **PCB 布局**，安排每个元件在电路板上的位置，并完成铜导线的布线。你还将学习 DRC（设计规则检查）和 Gerber 文件导出，为嘉立创打样做准备。

Tomorrow you'll convert the schematic into **PCB layout**, place every component on the board, and route copper traces. You'll also learn DRC and Gerber export for JLCPCB fabrication.

---

## 参考资源 | References

- [苏达] 从 PCB 开始打造专属终极键盘：https://www.bilibili.com/video/BV1mB4y1F7oj/
- [零基础] 客制化键盘 PCB 主控原理图（丈二先生呀）：https://www.bilibili.com/video/BV18Y411W7sq/
- 嘉立创 EDA 官方文档：https://lceda.cn/
- Sofle Keyboard 开源 PCB：https://github.com/josefadamcik/SofleKeyboard

---

*最后更新 | Last updated: 2026-05-26*
