# Day 03: I2C 通信与 OLED 屏幕 | I2C Communication & OLED Display

> **今日目标 Today's Goals:**
> - 理解 I2C 通信协议的工作原理（主从架构、地址寻址、时序）
> - 掌握 SSD1306 OLED 驱动芯片的基本使用
> - 在面包板上连接 OLED 屏幕并显示文字
> - 理解 I2C 与 SPI 的区别和应用场景
>
> **产出 Deliverable:** OLED 屏幕显示自定义文字 + I2C 通信波形截图

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 回顾 Day 2 矩阵扫描，答疑 |
| 09:15–10:30 | 讲解 | I2C 协议原理 + SSD1306 驱动 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | OLED 连接 + 基础显示 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 图形绘制 + 中文显示 |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 讲解+实验 | SPI 通信简介 + SPI vs I2C 对比 |
| 16:30–17:00 | 总结 | 日终回顾 + 明日预告 |

---

## 上午：I2C 协议与 OLED 驱动 | Morning: I2C Protocol & OLED Driver

### 为什么要学这个? | Why Learn This?

I2C（Inter-Integrated Circuit）是最常用的芯片间通信协议之一。你手机里的陀螺仪、气压计、触摸屏控制器，几乎都通过 I2C 与主处理器通信。在我们的宏键盘项目中，OLED 屏幕通过 I2C 连接 STM32，仅需 2 根线（SCL 时钟线 + SDA 数据线）即可传输所有数据。

I2C is one of the most common inter-chip communication protocols. In our macro keyboard, the OLED connects to STM32 via I2C with just 2 wires (SCL + SDA). Sensors in your phone (gyroscope, barometer, touchscreen) also use I2C.

理解 I2C 不仅是本项目的需要，更是进入嵌入式开发世界的"通行证"。

---

### 任务 3.1: I2C 协议原理 (75 分钟)

**核心概念 Core Concepts:**

#### 1. I2C 总线拓扑 I2C Bus Topology

```
        VCC (上拉电阻)
         |
         +---[4.7k]---+---[4.7k]---+
         |             |             |
         |   SCL       |   SDA       |
         |   |         |   |         |
    +----+---+----+----+---+----+----+
    |    |        |    |        |    |
  MASTER  |    SLAVE1  |    SLAVE2  |
  (STM32) |   (OLED)   |   (Sensor) |
          |            |
      SCL线         SDA线
```

- **主设备 (Master)**：发起通信，控制时钟线 SCL
- **从设备 (Slave)**：响应主设备的请求
- **上拉电阻**：SCL 和 SDA 各需一个上拉电阻（通常 4.7k ohm）
- **多从设备**：同一条总线上可以连接多个从设备，通过地址区分

#### 2. 从设备地址 Slave Address

每个 I2C 从设备有唯一的 7 位地址：
- SSD1306 OLED 的地址通常是 **0x3C** 或 **0x3D**
- 地址由芯片厂商定义，查阅数据手册可知

```
7 位地址示例：0x3C = 0b00111100
加上读写位后变为 8 位：
- 写操作：0x3C << 1 | 0 = 0x78
- 读操作：0x3C << 1 | 1 = 0x79
```

#### 3. I2C 通信时序 I2C Timing

```
起始条件 (START):  SCL 为高时，SDA 从高变低
地址发送:          7位地址 + 1位读写标志
应答 (ACK):        从设备拉低 SDA 表示确认
数据传输:          8位数据 + 1位应答，逐字节传输
停止条件 (STOP):   SCL 为高时，SDA 从低变高
```

```
时序图示例：
SCL:  ‾‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾‾
SDA:  ‾\___/‾‾\___/‾‾\___/‾‾\___/‾‾‾‾
       S  地址   ACK  数据   ACK  P
```

#### 4. I2C vs SPI 对比

| 特性 Feature | I2C | SPI |
|---|---|---|
| 线数 Wires | 2（SCL + SDA） | 4（SCLK + MOSI + MISO + CS） |
| 速率 Speed | 100kHz / 400kHz | 可达数 MHz |
| 寻址 Addressing | 支持多从设备（地址寻址） | 每个从设备需要独立 CS 线 |
| 全双工 Duplex | 半双工 | 全双工 |
| 复杂度 Complexity | 协议较复杂 | 简单直接 |
| 典型应用 Application | 传感器、OLED、EEPROM | TFT 屏、SD 卡、高速通信 |

**本项目选择 I2C**：OLED 屏幕数据量不大（128x64 = 1024 字节），I2C 速率足够，且只需 2 根线，节省 GPIO。

---

### 任务 3.2: SSD1306 OLED 驱动 (30 分钟)

**SSD1306 芯片简介 SSD1306 Overview:**

| 参数 Parameter | 值 Value |
|---|---|
| 分辨率 Resolution | 128 x 64 像素 |
| 颜色 Color | 单色（白色或蓝色） |
| 接口 Interface | I2C 或 SPI |
| 电压 Voltage | 3.3V |
| 帧缓冲 Frame Buffer | 内置 128x64 bit (1024 字节) |

**驱动层次 Driver Layers:**
```
应用层:  显示 "Hello" 文字
         ↓
图形库:  将文字转换为像素点阵
         ↓
驱动层:  将像素数据通过 I2C 发送给 SSD1306
         ↓
硬件层:  I2C 总线 → SSD1306 芯片 → OLED 面板
```

---

## 下午：OLED 实验 | Afternoon: OLED Lab

### 任务 3.3: 连接并驱动 OLED 屏幕 (90 分钟)

**接线方案 Wiring Plan:**

| OLED 引脚 | STM32 引脚 | 说明 |
|---|---|---|
| VCC | 3.3V | 电源正极 |
| GND | GND | 电源地 |
| SCL | PB6 | I2C 时钟线 |
| SDA | PB7 | I2C 数据线 |

> 注意：STM32F103 有多个 I2C 接口，这里使用 I2C1 (PB6=SCL, PB7=SDA)。
> Note: STM32F103 has multiple I2C interfaces. We use I2C1 (PB6=SCL, PB7=SDA).

**代码实现 Code:**

```c
// OLED 显示基础代码 | OLED Display Basic Code
// 使用 SSD1306 驱动，I2C 接口
// Uses SSD1306 driver with I2C interface

#include "oled_display.h"
#include "i2c.h"
#include <string.h>

// SSD1306 I2C 地址 | SSD1306 I2C address
#define OLED_I2C_ADDR  0x3C

// OLED 缓冲区 | OLED frame buffer (128x64 pixels / 8 = 1024 bytes)
static uint8_t oled_buffer[1024];

/**
 * 向 SSD1306 发送命令
 * Send command to SSD1306
 */
void oled_send_command(uint8_t cmd) {
    uint8_t data[2] = {0x00, cmd};  // 0x00 = 命令模式
    i2c_write(OLED_I2C_ADDR, data, 2);
}

/**
 * 向 SSD1306 发送数据
 * Send data to SSD1306
 */
void oled_send_data(uint8_t* data, uint16_t len) {
    // 每次发送前加上 0x40（数据模式标志）
    uint8_t buf[129];
    buf[0] = 0x40;  // 数据模式
    for (uint16_t i = 0; i < len && i < 128; i++) {
        buf[i + 1] = data[i];
    }
    i2c_write(OLED_I2C_ADDR, buf, len + 1);
}

/**
 * 初始化 OLED 显示屏
 * Initialize OLED display
 */
void oled_init(void) {
    // 发送初始化命令序列 | Send initialization command sequence
    oled_send_command(0xAE);  // 关闭显示 | Display OFF
    oled_send_command(0xD5);  // 设置时钟分频 | Set clock divider
    oled_send_command(0x80);
    oled_send_command(0xA8);  // 设置多路复用率 | Set multiplex ratio
    oled_send_command(0x3F);  // 1/64 duty
    oled_send_command(0xD3);  // 设置显示偏移 | Set display offset
    oled_send_command(0x00);
    oled_send_command(0x40);  // 设置起始行 | Set start line = 0
    oled_send_command(0x8D);  // 电荷泵设置 | Charge pump setting
    oled_send_command(0x14);  // 启用电荷泵 | Enable charge pump
    oled_send_command(0x20);  // 寻址模式 | Memory addressing mode
    oled_send_command(0x02);  // 页寻址模式 | Page addressing mode
    oled_send_command(0xA1);  // 段重映射 | Segment re-map (左右翻转)
    oled_send_command(0xC8);  // COM 扫描方向 | COM scan direction (上下翻转)
    oled_send_command(0xDA);  // COM 引脚配置 | COM pins config
    oled_send_command(0x12);
    oled_send_command(0x81);  // 设置对比度 | Set contrast
    oled_send_command(0xCF);  // 对比度值 = 0xCF
    oled_send_command(0xD9);  // 预充电周期 | Pre-charge period
    oled_send_command(0xF1);
    oled_send_command(0xDB);  // VCOMH 取消选择电平 | VCOMH deselect level
    oled_send_command(0x40);
    oled_send_command(0xA4);  // 全局显示开启 | Entire display ON
    oled_send_command(0xA6);  // 正常显示（非反色）| Normal display
    oled_send_command(0xAF);  // 开启显示 | Display ON

    // 清屏 | Clear screen
    oled_clear();
    oled_update();
}

/**
 * 清除缓冲区 | Clear buffer
 */
void oled_clear(void) {
    memset(oled_buffer, 0, sizeof(oled_buffer));
}

/**
 * 设置单个像素 | Set a pixel
 * x: 0-127, y: 0-63
 */
void oled_set_pixel(uint8_t x, uint8_t y, bool on) {
    if (x >= 128 || y >= 64) return;
    uint16_t byte_idx = x + (y / 8) * 128;
    uint8_t bit_idx = y % 8;
    if (on) {
        oled_buffer[byte_idx] |= (1 << bit_idx);
    } else {
        oled_buffer[byte_idx] &= ~(1 << bit_idx);
    }
}

/**
 * 将缓冲区数据刷新到屏幕
 * Flush buffer to display
 */
void oled_update(void) {
    oled_send_command(0x21);  // 设置列地址范围 | Set column address range
    oled_send_command(0x00);  // 起始列 = 0
    oled_send_command(0x7F);  // 结束列 = 127
    oled_send_command(0x22);  // 设置页地址范围 | Set page address range
    oled_send_command(0x00);  // 起始页 = 0
    oled_send_command(0x07);  // 结束页 = 7

    // 发送整个帧缓冲区 | Send entire frame buffer
    oled_send_data(oled_buffer, sizeof(oled_buffer));
}
```

**主程序调用 Main Program Usage:**

```c
// main.c - OLED 显示示例
#include "oled_display.h"
#include "i2c.h"

int main(void) {
    HAL_Init();
    SystemClock_Config();
    i2c_init();       // 初始化 I2C 外设
    oled_init();      // 初始化 OLED

    // 在屏幕上方显示标题
    oled_draw_string(0, 0, "KeyVerse", FONT_16);
    // 在屏幕中间显示信息
    oled_draw_string(0, 24, "Macro Keyboard", FONT_12);
    oled_draw_string(0, 40, "Layer: 0", FONT_12);

    // 刷新到屏幕
    oled_update();

    while (1) {
        // 主循环中可以更新显示内容
    }
}
```

**预期结果 Expected Result:**
- OLED 屏幕点亮，显示 "KeyVerse" 标题
- 屏幕显示 "Macro Keyboard" 和 "Layer: 0"
- 文字清晰可读，位置正确

**常见问题 Common Issues:**

| 问题 Problem | 原因 Cause | 解决方法 Solution |
|---|---|---|
| 屏幕不亮 | 接线错误或 I2C 地址不对 | 检查接线，尝试地址 0x3D |
| 显示乱码 | 初始化命令序列错误 | 对照 SSD1306 数据手册检查 |
| 显示闪烁 | 刷新频率太高或 I2C 速率不稳 | 降低刷新频率至 30fps 以下 |
| I2C 无响应 | 上拉电阻缺失 | 检查是否需要外接 4.7k 上拉 |

---

### 任务 3.4: 绘制图形与动画 (选做)

**绘制简单图形 Draw Simple Graphics:**

```c
// 画矩形 | Draw rectangle
void oled_draw_rect(uint8_t x, uint8_t y, uint8_t w, uint8_t h) {
    for (uint8_t i = x; i < x + w; i++) {
        oled_set_pixel(i, y, true);         // 上边
        oled_set_pixel(i, y + h - 1, true); // 下边
    }
    for (uint8_t j = y; j < y + h; j++) {
        oled_set_pixel(x, j, true);         // 左边
        oled_set_pixel(x + w - 1, j, true); // 右边
    }
}

// 简单动画：矩形左右移动 | Simple animation: bouncing rectangle
void oled_animation_demo(void) {
    static int8_t pos_x = 0;
    static int8_t dir = 1;

    oled_clear();
    oled_draw_rect(pos_x, 20, 20, 20);
    oled_update();

    pos_x += dir;
    if (pos_x >= 108 || pos_x <= 0) dir = -dir; // 碰到边界反弹
}
```

---

## 今日作业 | Homework

1. **完成实验报告**：OLED 显示照片 + 代码 + I2C 时序分析
2. **回答思考题**：
   - I2C 总线上连接了地址分别为 0x3C 和 0x68 的两个设备，主设备如何分别与它们通信？
   - 如果 I2C 总线缺少上拉电阻，会发生什么现象？
   - I2C 和 SPI 各适合什么场景？能否用 I2C 驱动 TFT 彩屏？
3. **预习 Day 4**：搜索"WS2812B 协议原理"，了解单线级联 LED 的工作方式

---

## 明日预告 | Tomorrow's Preview

明天我们将学习 **WS2812B 可寻址 RGB LED** 的控制方法。你将理解如何通过一根数据线精确控制每颗 LED 的颜色，并实现彩虹灯效、呼吸灯等动画效果。

Tomorrow we learn **WS2812B addressable RGB LED** control. You'll understand how a single data line can precisely set each LED's color, and create rainbow and breathing light effects.

---

## 参考资源 | References

- SSD1306 数据手册（搜索 "SSD1306 datasheet PDF"）
- QMK OLED 驱动文档：https://docs.qmk.fm/feature_oled_driver
- B 站搜索 "I2C 通信协议 详解 教程"
- B 站搜索 "STM32 OLED SSD1306 I2C 教程"

---

*最后更新 | Last updated: 2026-05-26*
