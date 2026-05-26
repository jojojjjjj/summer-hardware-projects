# Day 04: RGB 灯珠与 WS2812B | RGB LEDs & WS2812B

> **今日目标 Today's Goals:**
> - 理解 WS2812B 可寻址 RGB LED 的单线通信协议
> - 掌握 GRB 数据格式和时序要求
> - 在面包板上连接 16 颗 WS2812B 并实现灯效
> - 完成第一阶段全部知识回顾，提交 Week 1 进度汇报
>
> **产出 Deliverable:** 面包板上的 RGB 灯效演示视频 + Week 1 进度汇报

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 回顾 Day 3 I2C + OLED，答疑 |
| 09:15–10:30 | 讲解 | WS2812B 协议原理 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | 面包板连接 WS2812B 灯带 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 编写灯效代码（彩虹、呼吸） |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | 阶段一知识回顾 + 串口控制灯效 |
| 16:30–17:00 | 总结 | Week 1 总结 + 明日预告 |

---

## 上午：WS2812B 协议原理 | Morning: WS2812B Protocol

### 为什么要学这个? | Why Learn This?

WS2812B 是目前最流行的可寻址 RGB LED。每个灯珠内部集成了控制芯片，可以通过一根数据线级联控制数十甚至数百颗 LED，每颗可以独立设置颜色（24 位 RGB = 1677 万色）。你见过的 LED 矩阵屏、RGB 键盘背光、霓虹灯特效，很多都基于 WS2812B。

WS2812B is the most popular addressable RGB LED. Each LED has a built-in controller, cascading via a single data line. You can independently set 16.7 million colors per LED. LED matrix displays, RGB keyboard backlighting, and neon effects are often based on WS2812B.

在我们的宏键盘中，16 颗 WS2812B 分别对应 16 个按键，可以实现按下发光、层切换变色、波浪灯效等功能。

---

### 任务 4.1: WS2812B 协议详解 (75 分钟)

**核心概念 Core Concepts:**

#### 1. WS2812B 内部结构

```
+-------------------+
| WS2812B 内部      |
|                   |
| DIN ──> 控制芯片 ──> LED (R+G+B)
|                   |
| VDD ──> 电源      ──> GND
|                   |
| DOUT ─> 级联输出  ──> 下一个 WS2812B 的 DIN
+-------------------+
```

- **DIN**：数据输入（来自 MCU 或上一颗 LED 的 DOUT）
- **DOUT**：数据输出（连接到下一颗 LED 的 DIN）
- **VDD**：电源（5V，也支持 3.3V 但亮度可能不足）
- **GND**：地

#### 2. 数据格式 Data Format

每颗 LED 需要 **24 位数据**，格式为 **GRB**（非 RGB！）：

```
一颗 LED 的 24 位数据：
[GGGGGGGG][RRRRRRRR][BBBBBBBB]
 G7...G0    R7...R0    B7...B0

- 绿色 (Green): 8 位，0x00-0xFF
- 红色 (Red):   8 位，0x00-0xFF
- 蓝色 (Blue):  8 位，0x00-0xFF

示例：纯红色 = 0x00, 0xFF, 0x00（G=0, R=255, B=0）
示例：纯白色 = 0xFF, 0xFF, 0xFF
示例：紫色   = 0x00, 0x80, 0xFF（G=0, R=128, B=255）
```

> **注意**：数据顺序是 GRB 而不是 RGB，这是初学者最常见的错误！
> **Warning**: Data order is GRB, not RGB — the most common beginner mistake!

#### 3. 时序要求 Timing Requirements

WS2812B 使用非常严格的时序来区分 0 和 1：

```
数据 "1" 的波形：
     +---------+
     |  T1H    |
     | (高电平  |
     |  0.8us) |
     +---------+
              +--+
              |T1L|
              |低 |
              |0.4|

数据 "0" 的波形：
     +--+
     |  |
     |T0H|
     |0.4|
     +--+
              +---------+
              |   T0L   |
              | (低电平  |
              |  0.85us)|
              +---------+
```

| 参数 Parameter | 典型值 Typical | 容差 Tolerance |
|---|---|---|
| T0H（0 码高电平）| 0.4 us | +-150ns |
| T0L（0 码低电平）| 0.85 us | +-150ns |
| T1H（1 码高电平）| 0.8 us | +-150ns |
| T1L（1 码低电平）| 0.45 us | +-150ns |
| Reset（复位）| >50 us | |

> **关键**：时序要求非常严格（纳秒级），通常需要精确的延时或 DMA + PWM 方案来实现。
> **Key**: Extremely tight timing (nanosecond precision). Usually requires DMA+PWM or bit-banging with cycle-counted delays.

#### 4. 级联方式 Cascading

```
MCU --> [LED0 DIN>DOUT] --> [LED1 DIN>DOUT] --> ... --> [LED15 DIN>DOUT]

数据发送顺序：
先发 LED15 的数据，再发 LED14 的数据，...，最后发 LED0 的数据
（最后发送的数据被第一颗 LED 接收并锁存）

实际实现：
发送 16 x 24 = 384 位数据 + >50us 的 Reset 信号
```

#### 5. 电源考虑 Power Considerations

```
每颗 WS2812B 最大功耗：约 60mA（全白全亮）
16 颗最大总电流：16 x 60mA = 960mA ≈ 1A
USB 供电能力：通常 500mA（USB 2.0）

解决方案：
1. 限制最大亮度（推荐，代码中限制亮度到 50%）
2. 使用外部 5V 电源
3. 分批点亮（高级方案）
```

---

### 任务 4.2: 面包板连接 WS2812B (75 分钟)

**接线方案 Wiring Plan:**

| WS2812B 引脚 | STM32 引脚 | 说明 |
|---|---|---|
| DIN | PA8 | 数据输入（或使用 TIM1 PWM 输出） |
| VCC | 5V（USB 直供） | 电源 |
| GND | GND | 地 |

> **重要**：WS2812B 数据输入电平为 5V 逻辑。STM32 的 3.3V GPIO 可能无法可靠驱动。
> 解决方案：串联一个 330 ohm 电阻保护数据线，或使用电平转换芯片。
> **Important**: WS2812B expects 5V logic. STM32's 3.3V GPIO may not reliably drive it.
> Solution: Use a 330 ohm series resistor for protection, or a level shifter.

**步骤 Steps:**

1. **放置 WS2812B 灯带**：将 16 颗 WS2812B 按顺序排列（或使用预制灯带裁切）
2. **连接电源**：VCC 连 5V，GND 连地
3. **连接数据线**：DIN 连接到 PA8
4. **添加保护电阻**：数据线串联 330 ohm 电阻
5. **添加滤波电容**：在 VCC 和 GND 之间并联一个 100uF 电容（保护 LED）

**常见问题 Common Issues:**

| 问题 Problem | 原因 Cause | 解决方法 Solution |
|---|---|---|
| LED 不亮 | 数据线接错引脚 | 确认 DIN 连接正确 |
| 颜色不对 | GRB 顺序搞反 | 检查数据格式是否为 GRB |
| 闪烁不稳定 | 时序不精确 | 使用 DMA+PWM 方案 |
| 后面的 LED 不亮 | 供电不足 | 添加外部 5V 供电 |

---

## 下午：灯效编程 | Afternoon: LED Effect Programming

### 任务 4.3: 编写 RGB 灯效代码 (90 分钟)

**基础驱动代码 Basic Driver:**

```c
// WS2812B 驱动代码 | WS2812B Driver Code
// 使用 PWM + DMA 方案实现精确时序
// Uses PWM + DMA for precise timing

#include "rgb_led.h"
#include "stm32f1xx_hal.h"

#define LED_COUNT 16        // LED 数量
#define PWM_BUFFER_SIZE (LED_COUNT * 24 + 50)  // 数据位 + Reset

// PWM 占空比定义（基于定时器 ARR 值）
// Timer period = 90 (72MHz / 800kHz ≈ 90)
#define PWM_HI  60          // 高电平占空比 ≈ 0.8us
#define PWM_LO  29          // 低电平占空比 ≈ 0.4us

// LED 颜色缓冲区 | LED color buffer (GRB format)
typedef struct {
    uint8_t g;
    uint8_t r;
    uint8_t b;
} rgb_color_t;

static rgb_color_t led_colors[LED_COUNT];

// DMA PWM 缓冲区
static uint16_t pwm_buffer[PWM_BUFFER_SIZE];

/**
 * 设置指定 LED 的颜色
 * Set color of specified LED
 * @param index: LED 编号 (0-15)
 * @param r: 红色 (0-255)
 * @param g: 绿色 (0-255)
 * @param b: 蓝色 (0-255)
 */
void rgb_set_color(uint8_t index, uint8_t r, uint8_t g, uint8_t b) {
    if (index >= LED_COUNT) return;
    led_colors[index].r = r;
    led_colors[index].g = g;
    led_colors[index].b = b;
}

/**
 * 设置所有 LED 为同一颜色
 * Set all LEDs to same color
 */
void rgb_set_all(uint8_t r, uint8_t g, uint8_t b) {
    for (int i = 0; i < LED_COUNT; i++) {
        rgb_set_color(i, r, g, b);
    }
}

/**
 * 将颜色数据编码为 PWM 波形
 * Encode color data into PWM waveform
 */
void rgb_encode_pwm(void) {
    int idx = 0;
    for (int i = 0; i < LED_COUNT; i++) {
        // GRB 顺序 | GRB order
        uint8_t colors[3] = {
            led_colors[i].g,
            led_colors[i].r,
            led_colors[i].b
        };
        for (int c = 0; c < 3; c++) {
            for (int bit = 7; bit >= 0; bit--) {
                pwm_buffer[idx++] = (colors[c] & (1 << bit)) ? PWM_HI : PWM_LO;
            }
        }
    }
    // 添加 Reset 信号（低电平 >50us）
    for (int i = 0; i < 50; i++) {
        pwm_buffer[idx++] = 0;
    }
}

/**
 * 发送数据到 LED（通过 DMA + PWM）
 * Send data to LEDs via DMA + PWM
 */
void rgb_update(void) {
    rgb_encode_pwm();
    // 启动 DMA 传输（具体实现取决于 HAL 库配置）
    HAL_TIM_PWM_Start_DMA(&htim1, TIM_CHANNEL_1, (uint32_t*)pwm_buffer, PWM_BUFFER_SIZE);
}
```

**灯效函数 LED Effect Functions:**

```c
// 灯效示例代码 | LED Effect Examples

#include "rgb_led.h"
#include <math.h>

/**
 * 彩虹灯效 | Rainbow effect
 * @param offset: 彩虹偏移量（用于动画）
 */
void rgb_rainbow(uint8_t offset) {
    for (int i = 0; i < LED_COUNT; i++) {
        // HSV 转 RGB 的简化版本
        uint8_t hue = (i * 256 / LED_COUNT + offset) & 0xFF;
        uint8_t r, g, b;

        // 简单的 HSV 到 RGB 转换
        if (hue < 85) {
            r = hue * 3;
            g = 255 - hue * 3;
            b = 0;
        } else if (hue < 170) {
            hue -= 85;
            r = 255 - hue * 3;
            g = 0;
            b = hue * 3;
        } else {
            hue -= 170;
            r = 0;
            g = hue * 3;
            b = 255 - hue * 3;
        }
        rgb_set_color(i, r, g, b);
    }
    rgb_update();
}

/**
 * 呼吸灯效 | Breathing effect
 * @param phase: 当前相位 (0-255)
 */
void rgb_breathing(uint8_t phase) {
    // 使用正弦函数模拟呼吸节奏
    float brightness = (sinf(phase * 6.28f / 256.0f) + 1.0f) / 2.0f;
    uint8_t val = (uint8_t)(brightness * 255);
    rgb_set_all(val, 0, val / 2);  // 紫色呼吸灯
    rgb_update();
}

/**
 * 逐键点亮效果 | Sequential key light effect
 * @param last_key: 最近按下的键编号
 */
void rgb_key_press_effect(uint8_t key_index) {
    // 所有 LED 暗淡背景色
    for (int i = 0; i < LED_COUNT; i++) {
        rgb_set_color(i, 5, 5, 5);
    }
    // 被按下的键亮起白色
    rgb_set_color(key_index, 255, 255, 255);
    rgb_update();
}
```

---

### 任务 4.4: 串口控制灯效 (选做)

通过串口发送命令切换灯效模式：

```c
// 串口控制灯效 | Serial control of LED effects
// 发送 "1" = 彩虹模式
// 发送 "2" = 呼吸模式
// 发送 "3" = 纯白模式
// 发送 "4" = 关闭

while (1) {
    if (serial_available()) {
        char cmd = serial_read();
        switch (cmd) {
            case '1': effect_mode = RAINBOW; break;
            case '2': effect_mode = BREATHING; break;
            case '3': rgb_set_all(50, 50, 50); rgb_update(); break;
            case '4': rgb_set_all(0, 0, 0); rgb_update(); break;
        }
    }

    // 根据模式更新灯效
    switch (effect_mode) {
        case RAINBOW:    rgb_rainbow(frame_counter++); break;
        case BREATHING:  rgb_breathing(frame_counter++); break;
    }
    HAL_Delay(20);  // 50fps
}
```

---

## 今日作业 | Homework

### 1. 完成实验报告
- WS2812B 面包板电路照片
- 灯效演示视频（至少 2 种灯效）
- 代码文件提交

### 2. 回答思考题
- 为什么 WS2812B 使用 GRB 顺序而不是 RGB？
- 如果要控制 100 颗 WS2812B，数据传输需要多长时间？（提示：800kHz 数据速率）
- WS2812B 的数据线为什么要串联 330 ohm 电阻？

### 3. 提交 Week 1 进度汇报
详见 [week-1-checkin.md](../assignments/week-1-checkin.md)

内容要求：
- 本周学习总结（500 字以上）
- 遇到的问题与解决方案（至少 2 个）
- 关键代码片段展示
- 下周计划
- 自我评分（1-10 分）

---

## 明日预告 | Tomorrow's Preview

明天我们将进入**第二阶段**：PCB 设计。你将学习使用**嘉立创 EDA** 这款国产免费工具，绘制第一个电路原理图。到 Day 7，你设计的 PCB 将被送去打样！

Tomorrow we enter **Phase 2**: PCB design. You'll learn **JLCEDA** (a free Chinese EDA tool) and draw your first schematic. By Day 7, your PCB will be sent for fabrication!

---

## 参考资源 | References

- [大佬勿入] 机械键盘 RGB 贴片灯珠焊接（YK-Yan）：https://www.bilibili.com/video/BV1rh411U7wK/
- [QMK 教程] RGB 矩阵灯效（HiryKun）：https://www.bilibili.com/video/BV1pt4y1a7dG/
- B 站搜索 "WS2812B STM32 驱动教程"
- WS2812B 数据手册（搜索 "WS2812B datasheet PDF"）

---

*最后更新 | Last updated: 2026-05-26*
