# Day 01: 项目启动与电子学基础 | Project Kickoff & Electronics Fundamentals

> **今日目标 Today's Goals:**
> - 了解项目全貌，明确学习目标和最终成果
> - 掌握基本电路理论：电压、电流、电阻、欧姆定律
> - 学会使用面包板搭建简单电路
> - 完成第一个实验：用 STM32 点亮 LED
>
> **产出 Deliverable:** 面包板上的 LED 闪烁电路 + 实验报告截图

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 课程介绍、分组、环境检查 |
| 09:15–10:30 | 讲解 | 项目概述 + 电子学基础理论 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | 面包板基础 + LED 点亮实验 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | STM32 GPIO 控制 LED |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | 按键检测实验 |
| 16:30–17:00 | 总结 | 日终回顾 + 明日预告 |

---

## 上午：电子学基础理论 | Morning: Electronics Fundamentals

### 为什么要学这个? | Why Learn This?

电子学是所有硬件项目的基础。无论是手机、电脑还是智能手表，底层都是由电阻、电容、晶体管等基本元件构成的电路。理解基本电路理论，就像学会字母之于阅读——没有这些基础，后续的键盘矩阵、I2C 通信、USB 协议都无法真正理解。

Electronics is the foundation of all hardware projects. Understanding basic circuit theory is like learning the alphabet before reading — without it, you cannot truly grasp keyboard matrices, I2C communication, or USB protocol.

在日常生活中，你每天都在使用这些原理：手机充电器将 220V 转换为 5V（变压器 + 整流电路），键盘按键是一个开关（通断检测），LED 灯需要限流电阻保护（欧姆定律应用）。

---

### 任务 1.1: 项目概述与团队组建 (30 分钟)

**步骤 Steps:**

1. **观看项目演示视频** — 了解最终产品是什么样的
2. **通读 README.md** — 了解项目结构和技术栈
3. **分组** — 每 2-3 人一组，选出组长
4. **环境检查** — 确认电脑上已安装 VS Code、Python、Git

**预期结果 Expected:**
- 每组确定队名和分工
- 所有电脑软件环境检查通过
- 每人对项目有整体认识

---

### 任务 1.2: 电路基础理论 (45 分钟)

**核心知识点 Key Concepts:**

#### 1. 电压 (Voltage, V)
- 类比：水压 —— 推动电子流动的"压力"
- 单位：伏特 (V)
- 常见电压：USB 5V，锂电池 3.7V，纽扣电池 3V

#### 2. 电流 (Current, I)
- 类比：水流 —— 单位时间内流过导体的电子数量
- 单位：安培 (A)，常用毫安 (mA)
- 1A = 1000mA

#### 3. 电阻 (Resistance, R)
- 类比：水管粗细 —— 阻碍电流流动的能力
- 单位：欧姆 (ohm)，常用千欧 (kohm)

#### 4. 欧姆定律 (Ohm's Law)
```
V = I x R
电压 = 电流 x 电阻
```

**实例计算 Example:**
- LED 工作电压 2V，工作电流 20mA，电源 5V
- 需要的限流电阻 = (5V - 2V) / 0.02A = 150 ohm
- 实际选用 220 ohm（标准阻值，偏安全）

#### 5. 串联与并联 (Series & Parallel)
- 串联：电阻相加，R_total = R1 + R2
- 并联：1/R_total = 1/R1 + 1/R2

#### 6. 数字信号 (Digital Signal)
- HIGH（高电平）= 3.3V 或 5V = 逻辑 1
- LOW（低电平）= 0V = 逻辑 0
- 这就是计算机的 0 和 1 的物理本质！

**课堂练习 Classroom Exercise:**
1. 一个 100 ohm 的电阻接在 5V 电源上，流过的电流是多少？（答案：50mA）
2. 两个 1kohm 电阻并联，总电阻是多少？（答案：500 ohm）
3. LED 额定 3.3V / 15mA，用 5V 供电，需要多大电阻？（答案：约 113 ohm，选 120 ohm）

---

## 下午：面包板实验 | Afternoon: Breadboard Lab

### 为什么要学面包板? | Why Learn This?

面包板（Breadboard）是电子工程师最重要的实验工具之一。它让你无需焊接就能快速搭建和修改电路。在正式设计 PCB 之前，所有电路都应该先在面包板上验证。我们的宏键盘项目，在 Day 1-4 阶段的所有实验都在面包板上完成。

A breadboard lets you prototype circuits without soldering. All circuits should be validated on a breadboard before PCB design. Our macro keyboard project uses breadboards for all Day 1-4 experiments.

---

### 任务 1.3: 面包板 LED 点亮实验 (75 分钟)

**所需材料 Materials:**
- 面包板 x 1
- LED（红色）x 1
- 220 ohm 电阻 x 1
- 杜邦线 x 2
- STM32F103C8T6 最小系统板 x 1

**面包板结构 Breadboard Layout:**
```
      电源轨           元件区
    +   -    a  b  c  d  e   f  g  h  i  j
    |   |    |  |  |  |  |   |  |  |  |  |
 ===|===|====|==|==|==|==|===|==|==|==|==|===  (上半部分)
    |   |    |  |  |  |  |   |  |  |  |  |
 ---|---|----|--|--|--|--|---|--|--|--|--|---  (中间隔离)
    |   |    |  |  |  |  |   |  |  |  |  |
 ===|===|====|==|==|==|==|===|==|==|==|==|===  (下半部分)
    |   |    |  |  |  |  |   |  |  |  |  |
```
- 每列的 a-e 和 f-j 内部连通
- 上下两半通过中间隔离条分开
- 电源轨（+/-）纵向贯通

**步骤 Steps:**

1. **连接电源**：将 STM32 的 3.3V 和 GND 分别连接到面包板的电源轨
2. **放置电阻**：将 220 ohm 电阻一端插入电源轨的 + 行，另一端插入元件区
3. **放置 LED**：LED 长脚（正极/阳极）接电阻一端，短脚（负极/阴极）接 GND
4. **检查电路**：确认连接正确后再通电
5. **通电测试**：USB 连接 STM32，LED 应该亮起

**电路图 Circuit Diagram:**
```
STM32 3.3V ──── 220 ohm ──── LED(+  ) ──── LED(-) ──── GND
                 限流电阻      长脚(阳极)      短脚(阴极)
```

**预期结果 Expected Result:**
- LED 亮起表示电路正确
- LED 不亮：检查极性是否反了，检查接触是否良好

**常见问题 Common Issues:**

| 问题 Problem | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| LED 不亮 | 极性接反 | 长脚接正极，短脚接负极 |
| LED 不亮 | 面包板接触不良 | 重新插紧杜邦线 |
| LED 很暗 | 电阻太大 | 检查电阻值，换用较小电阻 |
| LED 烧了 | 没接限流电阻 | 一定先接电阻再通电！ |

---

### 任务 1.4: STM32 GPIO 控制 LED 闪烁 (75 分钟)

**为什么要学 GPIO? | Why Learn GPIO?**

GPIO（通用输入输出）是微控制器与外部世界交互的最基本方式。我们的宏键盘中，矩阵扫描就是通过 GPIO 的输入输出切换来实现的。

GPIO (General Purpose Input/Output) is the most basic way for a microcontroller to interact with the physical world. Keyboard matrix scanning is implemented by switching GPIO pins between input and output modes.

**步骤 Steps:**

1. **安装 STM32 开发环境**（若使用 Arduino 框架）
2. **新建工程**，编写 LED 闪烁代码：

```c
// LED 闪烁程序 | LED Blink Program
// 将 LED 连接到 STM32 的 PC13 引脚
// Connect LED to STM32 pin PC13

#include "stm32f1xx_hal.h"

int main(void) {
    HAL_Init();                    // 初始化 HAL 库
    SystemClock_Config();          // 配置系统时钟

    // 启用 GPIOC 时钟
    __HAL_RCC_GPIOC_CLK_ENABLE();

    // 配置 PC13 为推挽输出
    GPIO_InitTypeDef GPIO_InitStruct = {0};
    GPIO_InitStruct.Pin = GPIO_PIN_13;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;   // 推挽输出模式
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
    HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);

    while (1) {
        HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);  // 翻转引脚电平
        HAL_Delay(500);                            // 延时 500ms
    }
}
```

3. **编译并烧录**到 STM32
4. **观察 LED 以 1Hz 频率闪烁**

**预期结果 Expected Result:**
- LED 每 500ms 切换一次亮灭状态
- 闪烁频率约为 1Hz（每秒 1 次）

**常见问题 Common Issues:**

| 问题 Problem | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 编译失败 | 开发环境未正确安装 | 检查工具链安装路径 |
| 烧录失败 | USB 连接问题 | 换 USB 线或 USB 口 |
| LED 不闪 | GPIO 引脚配置错误 | 确认引脚号与硬件连接一致 |

---

### 任务 1.5: 按键检测实验 (选做)

**步骤 Steps:**

1. 将按键开关连接到 PA0 引脚
2. 配置 PA0 为输入模式（带上拉电阻）
3. 编写代码：按下按键时点亮 LED，松开时熄灭

```c
// 按键检测代码片段 | Key Detection Code Snippet
// 配置 PA0 为输入模式（内部上拉）
GPIO_InitStruct.Pin = GPIO_PIN_0;
GPIO_InitStruct.Mode = GPIO_MODE_INPUT;       // 输入模式
GPIO_InitStruct.Pull = GPIO_PULLUP;           // 内部上拉电阻
HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

while (1) {
    // 读取 PA0 引脚状态，按下为 LOW（接地）
    if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_0) == GPIO_PIN_RESET) {
        HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_RESET); // 点亮
    } else {
        HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_SET);   // 熄灭
    }
}
```

---

## 今日作业 | Homework

1. **完成实验报告**：拍照记录面包板电路，截图记录代码和运行结果
2. **回答思考题**：
   - 如果把 LED 的极性反过来接，会发生什么？
   - 为什么 LED 需要串联电阻？如果不接会怎样？
   - 如果要同时点亮 4 个 LED，电路应该怎么改？
3. **预习 Day 2**：搜索"键盘矩阵扫描原理"，尝试理解为什么不用 16 根线连接 16 个按键

---

## 明日预告 | Tomorrow's Preview

明天我们将学习**键盘矩阵扫描**的原理——这是所有键盘的核心技术。你将理解为什么 4x4 的键盘只需要 8 根线（而不是 16 根），以及"鬼键"是什么、二极管如何防止它。

Tomorrow we learn **keyboard matrix scanning** — the core technology behind all keyboards. You'll understand why a 4x4 keyboard needs only 8 wires (not 16), what "ghosting" is, and how diodes prevent it.

---

## 参考资源 | References

- QMK 官方文档 — 矩阵扫描：https://docs.qmk.fm/how_matrix_works
- B 站搜索 "STM32 GPIO 入门教程"
- B 站搜索 "面包板使用教程 入门"
- [不专业教学] 零基础绘制机械键盘 PCB（浚达良）：https://www.bilibili.com/video/BV1vz4y127qL/

---

*最后更新 | Last updated: 2026-05-26*
