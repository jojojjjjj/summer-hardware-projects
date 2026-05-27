# 接线指南 | Wiring Guide

## 概述 | Overview

本文档提供宏键盘 "键界" 的完整接线指南，包括面包板原型接线（Day 1-4）和 PCB 最终接线参考。

This document provides the complete wiring guide for the KeyVerse macro keyboard, including breadboard prototyping (Day 1-4) and final PCB wiring reference.

---

## 一、STM32F103C8T6 引脚分配 | Pin Assignment

```
                  STM32F103C8T6
                 +--------------+
         NRST ---| 1          48|--- VDD (3.3V)
          PC13 ---| 2          47|--- VSS (GND)
          PC14 ---| 3          46|--- BOOT0
          PC15 ---| 4          45|--- PB7  ← I2C1_SDA (OLED)
          PD0  ---| 5          44|--- PB6  ← I2C1_SCL (OLED)
          PD1  ---| 6          43|--- PB5  ← ENC_SW (旋钮按键)
          VSSA ---| 7          42|--- PB4
          VDDA ---| 8          41|--- PB3
          PA0  ---| 9  [ROW0]  40|--- PB1  ← ENC_B (旋钮 B 相)
          PA1  ---| 10 [ROW1]  39|--- PB0  ← ENC_A (旋钮 A 相)
          PA2  ---| 11 [ROW2]  38|--- PA15
          PA3  ---| 12 [ROW3]  37|--- PA14 ← SWCLK (调试)
          PA4  ---| 13 [COL0]  36|--- PA13 ← SWDIO (调试)
          PA5  ---| 14 [COL1]  35|--- PA12 ← USB_DP
          PA6  ---| 15 [COL2]  34|--- PA11 ← USB_DM
          PA7  ---| 16 [COL3]  33|--- PA10
          PB10 ---| 17         32|--- PA9
          VSS  ---| 18         31|--- PA8  → WS2812B DIN
          VDD  ---| 19         30|--- VSS
          PB11 ---| 20         29|--- VDD
          PB12 ---| 21         28|--- PB15
          PB13 ---| 22         27|--- PB14
          PB14 ---| 23         26|--- PB13
          PB15 ---| 24         25|--- PB12
                 +--------------+
```

---

## 二、详细接线表 | Detailed Wiring Table

### 矩阵扫描接口 | Matrix Scanning Interface

| STM32 引脚 | 功能 Function | 连接到 Connection | 说明 Notes |
|---|---|---|---|
| PA0 | ROW0 (Output) | 矩阵第 0 行所有按键一端 | 推挽输出 |
| PA1 | ROW1 (Output) | 矩阵第 1 行所有按键一端 | 推挽输出 |
| PA2 | ROW2 (Output) | 矩阵第 2 行所有按键一端 | 推挽输出 |
| PA3 | ROW3 (Output) | 矩阵第 3 行所有按键一端 | 推挽输出 |
| PA4 | COL0 (Input) | 矩阵第 0 列所有按键另一端 | 内部上拉 |
| PA5 | COL1 (Input) | 矩阵第 1 列所有按键另一端 | 内部上拉 |
| PA6 | COL2 (Input) | 矩阵第 2 列所有按键另一端 | 内部上拉 |
| PA7 | COL3 (Input) | 矩阵第 3 列所有按键另一端 | 内部上拉 |

### 矩阵内部连接 | Matrix Internal Wiring

```
每个按键连接方式（以 K00 为例）：

PA0 (ROW0) ──── [>|] ──── KEY(K00) ──── PA4 (COL0)
               1N4148     热插拔轴座
             (阳极→阴极)

所有 16 个按键的连接方式相同：
- 行线连接到二极管阳极
- 二极管阴极连接到按键一端
- 按键另一端连接到列线
```

### OLED 接口 | OLED Interface (I2C)

| STM32 引脚 | 功能 Function | OLED 引脚 | 说明 Notes |
|---|---|---|---|
| PB6 | I2C1_SCL | SCL | 需要 4.7k 外部上拉到 3.3V（部分模块已内置）|
| PB7 | I2C1_SDA | SDA | 需要 4.7k 外部上拉到 3.3V（部分模块已内置）|
| 3.3V | 电源 | VCC | 3.3V 供电 |
| GND | 地 | GND | 公共地 |

> **注意**：SSD1306 OLED 模块的 I2C 地址通常为 0x3C，部分为 0x3D。
> Note: SSD1306 I2C address is typically 0x3C, some modules use 0x3D.

### WS2812B RGB LED 接口 | RGB LED Interface

| STM32 引脚 | 功能 Function | WS2812B 引脚 | 说明 Notes |
|---|---|---|---|
| PA8 | GPIO Output | DIN | 串联 330 ohm 保护电阻 |
| 5V (USB) | 电源 | VCC | 5V 供电（注意电流需求）|
| GND | 地 | GND | 公共地 |

**级联顺序 Cascading Order:**
```
PA8 ──[330R]──> LED0 DIN>DOUT ──> LED1 DIN>DOUT ──> ... ──> LED15 DIN>DOUT
                                                        |
                                                   并联 100uF 电容
                                                   (VCC 和 GND 之间)
```

> **重要**：WS2812B 数据电平为 5V 逻辑。STM32 的 3.3V GPIO 在大多数情况下可以驱动（因为实际的逻辑高阈值约为 0.7 x VDD = 3.5V，3.3V 接近边界），但不保证在所有芯片上都可靠。如果遇到问题，使用 74HCT125 或 SN74LVC1T45 电平转换。
> WS2812B uses 5V logic. STM32's 3.3V GPIO works in most cases but isn't guaranteed.

### 旋钮编码器接口 | Rotary Encoder Interface (EC11)

| STM32 引脚 | 功能 Function | EC11 引脚 | 说明 Notes |
|---|---|---|---|
| PB0 | GPIO Input | A (CLK) | 内部上拉 |
| PB1 | GPIO Input | B (DT) | 内部上拉 |
| PB5 | GPIO Input | SW (Push Button) | 内部上拉 |
| 3.3V | 电源 | VCC (可选) | 部分 EC11 不需要 |
| GND | 地 | GND | 公共地 |

### USB 接口 | USB Interface

| STM32 引脚 | 功能 Function | Type-C 引脚 | 说明 Notes |
|---|---|---|---|
| PA11 | USB_DM | D- | 串联 22 ohm 电阻 |
| PA12 | USB_DP | D+ | 串联 22 ohm 电阻 |
| 5V (VBUS) | 电源 | VBUS | USB 5V 供电 |
| GND | 地 | GND | 公共地 |

### 调试接口 | Debug Interface (SWD)

| STM32 引脚 | 功能 Function | 说明 Notes |
|---|---|---|
| PA13 | SWDIO | 数据线 |
| PA14 | SWCLK | 时钟线 |
| GND | GND | 地 |
| 3.3V | VCC | 电源（可选） |

### 电源系统 | Power System

```
USB Type-C (5V)
    │
    ├── 直供 WS2812B (5V)
    │
    └── AMS1117-3.3 (LDO)
            │
            ├── 3.3V → STM32 VDD
            ├── 3.3V → OLED VCC
            ├── 3.3V → I2C 上拉
            └── 3.3V → 编码器上拉
```

---

## 三、面包板接线图 | Breadboard Wiring Diagram

### Day 1-4 面包板布局

```
面包板 (830 孔)
┌─────────────────────────────────────────────────────┐
│ +  -                                                │
│ |  |     ← 电源轨                                    │
│ |  |                                                │
│ ════════════════════════════════════════════════════ │
│                                                      │
│  [STM32F103C8T6 最小系统板]                           │
│  左侧：PA0-PA7 → 杜邦线连接到矩阵区域                  │
│  右侧：PB0,PB1,PB5 → 杜邦线连接到编码器                │
│        PB6,PB7 → 杜邦线连接到 OLED                     │
│        PA8 → 杜邦线连接到 WS2812B                     │
│                                                      │
│ ──────────────────────────────────────────────────── │
│                                                      │
│  矩阵区域 (4x4)：                                     │
│  ROW0 ──[>|]──[SW]── COL0   [>|]──[SW]── COL1  ...  │
│  ROW1 ──[>|]──[SW]── COL0   [>|]──[SW]── COL1  ...  │
│  ROW2 ──[>|]──[SW]── COL0   [>|]──[SW]── COL1  ...  │
│  ROW3 ──[>|]──[SW]── COL0   [>|]──[SW]── COL1  ...  │
│                                                      │
│  OLED 模块：VCC→3.3V  GND→GND  SCL→PB6  SDA→PB7    │
│  WS2812B：VCC→5V  GND→GND  DIN→PA8 (via 330R)       │
│  EC11：A→PB0  B→PB1  SW→PB5  GND→GND               │
└─────────────────────────────────────────────────────┘
```

---

## 四、PCB 接线参考 | PCB Wiring Reference

PCB 上的接线由嘉立创 EDA 自动生成，但以下关键走线需要特别注意：

### 关键走线注意事项 Critical Routing Notes

| 信号 Signal | 注意事项 Notes |
|---|---|
| USB D+/D- | 差分对，等长等距，线宽 0.25mm，远离其他信号 |
| I2C (SCL/SDA) | 线宽 0.25mm，靠近放置，上拉电阻靠近主控 |
| WS2812B DIN | 线宽 0.25mm，串联电阻靠近 STM32 端 |
| 矩阵行列 | 线宽 0.25mm，走线尽量短 |
| VCC (5V) | 线宽 >= 0.5mm，走粗线 |
| GND | 铺铜（Ground Pour），确保低阻抗回路 |
| 晶振 | 走线短且对称，远离数字信号线 |

---

*最后更新 | Last updated: 2026-05-26*
