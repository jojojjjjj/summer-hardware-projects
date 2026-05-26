# Day 02: 键盘矩阵扫描原理 | Keyboard Matrix Scanning

> **今日目标 Today's Goals:**
> - 理解键盘矩阵扫描的核心原理
> - 掌握二极管防鬼键（Anti-ghosting）技术
> - 在面包板上搭建 4x4 矩阵电路
> - 编写并运行矩阵扫描代码，检测按键按下
>
> **产出 Deliverable:** 面包板上的 4x4 矩阵 + 可检测按键的扫描代码

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 回顾 Day 1，解答作业疑问 |
| 09:15–10:30 | 讲解 | 矩阵扫描原理 + 鬼键问题 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | 面包板搭建 4x4 矩阵 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 编写矩阵扫描代码 |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | 添加二极管 + 消抖处理 |
| 16:30–17:00 | 总结 | 日终回顾 + 明日预告 |

---

## 上午：矩阵扫描理论 | Morning: Matrix Scanning Theory

### 为什么要学这个? | Why Learn This?

矩阵扫描是所有键盘——从你的电脑键盘到手机触屏——的核心检测技术。直接连接 16 个按键需要 16 根 GPIO 线，但使用 4x4 矩阵只需要 8 根线（4 行 + 4 列），节省了一半的 IO 资源。这种"用时间换空间"的思想在嵌入式系统中非常常见。

Matrix scanning is the core detection technology behind all keyboards. Connecting 16 keys directly needs 16 GPIO pins, but a 4x4 matrix needs only 8 pins (4 rows + 4 columns). This "trade time for space" approach is fundamental in embedded systems.

---

### 任务 2.1: 矩阵扫描原理讲解 (75 分钟)

**核心概念 Core Concepts:**

#### 1. 直接连接 vs 矩阵连接

**直接连接 Direct Connection:**
```
16 个按键 = 需要 16 个 GPIO 引脚
每个按键独立连接一根线到 MCU
问题：MCU 引脚不够用！
```

**矩阵连接 Matrix Connection:**
```
16 个按键 = 只需 8 个 GPIO 引脚
排列成 4 行 x 4 列的矩阵
每行共享一根 Row 线，每列共享一根 Column 线
```

#### 2. 矩阵拓扑 Matrix Topology

```
        COL0    COL1    COL2    COL3
         |       |       |       |
ROW0 ----[K00]---[K01]---[K02]---[K03]----
         |       |       |       |
ROW1 ----[K10]---[K11]---[K12]---[K13]----
         |       |       |       |
ROW2 ----[K20]---[K21]---[K22]---[K23]----
         |       |       |       |
ROW3 ----[K30]---[K31]---[K32]---[K33]----
```

- 行线（ROW）配置为**输出**
- 列线（COL）配置为**输入**（内部上拉）

#### 3. 扫描过程 Scanning Process

```
步骤 1: ROW0 输出 LOW，ROW1-3 输出 HIGH
步骤 2: 读取 COL0-COL3 的状态
        - 如果 COL0 读到 LOW → K00 被按下
        - 如果 COL1 读到 LOW → K01 被按下
        - 如果全部读到 HIGH → 这行没有按键按下
步骤 3: ROW1 输出 LOW，其余输出 HIGH
步骤 4: 重复读取...
步骤 5-8: 对 ROW2、ROW3 重复以上过程
回到步骤 1，循环扫描
```

**伪代码 Pseudocode:**
```c
for (int row = 0; row < 4; row++) {
    // 1. 将当前行拉低，其余行拉高
    set_row_low(row);

    // 2. 读取每一列的状态
    for (int col = 0; col < 4; col++) {
        if (read_col(col) == LOW) {
            key_pressed[row][col] = true;  // 该键被按下
        } else {
            key_pressed[row][col] = false; // 该键未按下
        }
    }

    // 3. 恢复当前行为高电平
    set_row_high(row);
}
```

#### 4. 鬼键问题 (Ghosting)

**什么是鬼键?**
当同时按下三个按键形成 L 形时，第四个"假"按键也会被误检测为按下。

```
同时按下 K00, K02, K20（形成 L 形）
→ 系统误认为 K22 也被按下（鬼键！）

原因：电流通过已按下的按键形成回路
```

#### 5. 二极管防鬼键 (Anti-ghosting with Diodes)

**解决方案**：每个按键串联一个二极管，只允许电流单向流动。

```
ROW ----[>|]---- KEY ---- COL
        二极管    按键
      (阳极→阴极)

二极管方向：阳极接 ROW 侧，阴极接 KEY 侧
这样电流只能从 ROW 流向 COL，不能反向
```

**为什么能防鬼键?**
二极管阻断了反向电流路径，使得鬼键回路无法形成。

---

### 任务 2.2: 面包板搭建 4x4 矩阵 (75 分钟)

**所需材料 Materials:**
- 按键开关 x 16（可用跳线代替做模拟测试）
- 1N4148 二极管 x 16
- STM32 最小系统板
- 面包板 + 杜邦线

**接线方案 Wiring Plan:**

| GPIO 引脚 | 连接到 Connection |
|---|---|
| PA0 | ROW0 |
| PA1 | ROW1 |
| PA2 | ROW2 |
| PA3 | ROW3 |
| PA4 | COL0 |
| PA5 | COL1 |
| PA6 | COL2 |
| PA7 | COL3 |

**步骤 Steps:**

1. **放置按键**：将 16 个按键按 4x4 排列在面包板上
2. **连接行线**：每一行的按键一端用导线连接到一起，再连接到对应的 ROW GPIO
3. **连接二极管**：每个按键的 ROW 侧串联一个 1N4148 二极管（阳极朝 ROW）
4. **连接列线**：每一列的按键另一端连接到一起，再连接到对应的 COL GPIO
5. **检查电路**：用万用表通断模式检查每个按键是否正确连接

**面包板布局建议 Breadboard Layout:**
```
         COL0   COL1   COL2   COL3
          |      |      |      |
ROW0 ---[>|-SW][>|-SW][>|-SW][>|-SW]---
          |      |      |      |
ROW1 ---[>|-SW][>|-SW][>|-SW][>|-SW]---
          |      |      |      |
ROW2 ---[>|-SW][>|-SW][>|-SW][>|-SW]---
          |      |      |      |
ROW3 ---[>|-SW][>|-SW][>|-SW][>|-SW]---
```

**预期结果 Expected Result:**
- 16 个按键正确排列并连接
- 万用表验证每个按键在按下时导通
- 每个二极管方向一致

**常见问题 Common Issues:**

| 问题 Problem | 原因 Cause | 解决方法 Solution |
|---|---|---|
| 按键检测不到 | 面包板接触不良 | 重新插紧元件 |
| 所有按键同时触发 | 行线或列线短路 | 用万用表检查短路 |
| 部分按键不响应 | 二极管方向接反 | 检查阳极/阴极方向 |

---

## 下午：扫描代码实现 | Afternoon: Scanning Code Implementation

### 任务 2.3: 编写矩阵扫描代码 (90 分钟)

**代码实现 Code Implementation:**

```c
// 矩阵扫描核心代码 | Matrix Scanning Core Code
// 文件: keymatrix.c

#include "keymatrix.h"
#include "stm32f1xx_hal.h"

// 矩阵尺寸 | Matrix dimensions
#define MATRIX_ROWS 4
#define MATRIX_COLS 4

// GPIO 引脚定义 | GPIO pin definitions
// 行引脚 (输出) | Row pins (output)
const uint16_t row_pins[MATRIX_ROWS] = {
    GPIO_PIN_0, GPIO_PIN_1, GPIO_PIN_2, GPIO_PIN_3
};
GPIO_TypeDef* row_ports[MATRIX_ROWS] = {
    GPIOA, GPIOA, GPIOA, GPIOA
};

// 列引脚 (输入) | Column pins (input)
const uint16_t col_pins[MATRIX_COLS] = {
    GPIO_PIN_4, GPIO_PIN_5, GPIO_PIN_6, GPIO_PIN_7
};
GPIO_TypeDef* col_ports[MATRIX_COLS] = {
    GPIOA, GPIOA, GPIOA, GPIOA
};

// 按键状态矩阵 | Key state matrix
// true = 按下, false = 未按下
bool key_state[MATRIX_ROWS][MATRIX_COLS] = {false};

// 消抖计数器 | Debounce counters
uint8_t debounce_count[MATRIX_ROWS][MATRIX_COLS] = {0};
#define DEBOUNCE_THRESHOLD 5  // 消抖阈值（扫描次数）

/**
 * 初始化矩阵 GPIO 引脚
 * Initialize matrix GPIO pins
 */
void matrix_init(void) {
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    // 启用 GPIOA 时钟
    __HAL_RCC_GPIOA_CLK_ENABLE();

    // 配置行引脚为推挽输出，初始高电平
    for (int i = 0; i < MATRIX_ROWS; i++) {
        GPIO_InitStruct.Pin = row_pins[i];
        GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
        GPIO_InitStruct.Pull = GPIO_NOPULL;
        GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
        HAL_GPIO_Init(row_ports[i], &GPIO_InitStruct);
        HAL_GPIO_WritePin(row_ports[i], row_pins[i], GPIO_PIN_SET); // 初始高电平
    }

    // 配置列引脚为输入，内部上拉
    for (int i = 0; i < MATRIX_COLS; i++) {
        GPIO_InitStruct.Pin = col_pins[i];
        GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
        GPIO_InitStruct.Pull = GPIO_PULLUP;
        HAL_GPIO_Init(col_ports[i], &GPIO_InitStruct);
    }
}

/**
 * 扫描整个矩阵，更新 key_state 数组
 * Scan entire matrix and update key_state array
 * 包含消抖处理 | Includes debouncing
 */
void matrix_scan(void) {
    for (int row = 0; row < MATRIX_ROWS; row++) {
        // 1. 将当前行拉低 | Pull current row LOW
        HAL_GPIO_WritePin(row_ports[row], row_pins[row], GPIO_PIN_RESET);

        // 2. 短暂延时，等待信号稳定
        for (volatile int d = 0; d < 10; d++);

        // 3. 读取每一列 | Read each column
        for (int col = 0; col < MATRIX_COLS; col++) {
            bool pressed = (HAL_GPIO_ReadPin(col_ports[col], col_pins[col])
                            == GPIO_PIN_RESET);

            // 4. 消抖处理 | Debounce handling
            if (pressed) {
                if (debounce_count[row][col] < DEBOUNCE_THRESHOLD) {
                    debounce_count[row][col]++;
                } else {
                    key_state[row][col] = true;  // 确认按下
                }
            } else {
                debounce_count[row][col] = 0;
                key_state[row][col] = false;      // 确认释放
            }
        }

        // 5. 恢复当前行为高电平 | Restore current row HIGH
        HAL_GPIO_WritePin(row_ports[row], row_pins[row], GPIO_PIN_SET);
    }
}

/**
 * 检查指定按键是否被按下
 * Check if a specific key is pressed
 */
bool matrix_key_pressed(uint8_t row, uint8_t col) {
    if (row < MATRIX_ROWS && col < MATRIX_COLS) {
        return key_state[row][col];
    }
    return false;
}
```

**预期结果 Expected Result:**
- 串口监视器显示按下按键的行/列坐标
- 例如按下左上角按键，显示 "Key pressed: Row 0, Col 0"
- 同时按下多个按键，每个都能正确识别

---

### 任务 2.4: 消抖处理详解 (30 分钟)

**为什么要消抖? | Why Debounce?**

机械按键在按下和松开的瞬间，触点会快速弹跳（bounce），产生多次通断。这个过程持续约 5-20ms。如果不消抖，一次按键可能被检测为多次按下。

Mechanical keys bounce on press and release, producing rapid on/off transitions lasting 5-20ms. Without debouncing, one press may register as multiple.

**消抖方案 Debounce Methods:**

| 方案 Method | 优点 Pros | 缺点 Cons |
|---|---|---|
| **延时消抖** | 简单易懂 | 阻塞 CPU，降低扫描速率 |
| **计数器消抖** | 非阻塞，效果好 | 需要更多内存 |
| **状态机消抖** | 最精确 | 实现较复杂 |

本项目采用**计数器消抖**方案（已在上面的 matrix_scan 中实现）。

---

## 今日作业 | Homework

1. **完成实验报告**：面包板矩阵电路照片 + 扫描代码截图 + 串口输出截图
2. **回答思考题**：
   - 如果矩阵是 5x5（25 个按键），需要多少根 GPIO 线？
   - 为什么二极管要按特定方向安装？如果方向全部反转会怎样？
   - 消抖时间设置为 5ms 和 20ms 各有什么优缺点？
3. **预习 Day 3**：搜索"I2C 通信协议 原理"，了解 SCL 和 SDA 的作用

---

## 明日预告 | Tomorrow's Preview

明天我们将学习 **I2C 通信协议**，并驱动一块 0.96 寸 OLED 显示屏。你将理解两根线（SCL + SDA）是如何让主控和屏幕之间传递信息的，以及如何在屏幕上显示文字和简单图形。

Tomorrow we learn **I2C communication** and drive a 0.96-inch OLED display. You'll understand how just two wires (SCL + SDA) enable data transfer between the MCU and the screen.

---

## 参考资源 | References

- QMK 矩阵扫描文档：https://docs.qmk.fm/how_matrix_works
- QMK 源码 matrix.c：https://github.com/qmk/qmk_firmware
- B 站搜索 "机械键盘 矩阵扫描原理 教程"
- [QMK 教程] HiryKun 完整教学：https://www.bilibili.com/video/BV1pt4y1a7dG/

---

*最后更新 | Last updated: 2026-05-26*
