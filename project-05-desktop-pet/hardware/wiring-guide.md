# 接线指南 | Wiring Guide

## 硬件概述 | Hardware Overview

本项目的硬件部分是可选的拓展功能。通过Arduino传感器，用户可以与桌宠进行实体互动（如按键喂食、温湿度影响宠物行为）。

Hardware is an optional extension. Through Arduino sensors, users can interact physically with the pet (e.g., button feeding, temperature/humidity affecting pet behavior).

---

## 接线原理图 | Wiring Diagram

### Arduino Nano 引脚定义 | Arduino Nano Pinout

```
                    ┌─────────────┐
              D1/TX │1          30│ VIN
              D0/RX │2          29│ GND
              RESET │3          28│ RST
              GND   │4          27│ 5V
              D2    │5          26│ A7
              D3    │6          25│ A6
              D4    │7          24│ A5/SCL
              D5    │8          23│ A4/SDA
              D6    │9          22│ A3
              D7    │10         21│ A2
              D8    │11         20│ A1
              D9    │12         19│ A0
              D10   │13         18│ AREF
              D11   │14         17│ 3.3V
              D12   │15         16│ D13
                    └─────────────┘
```

### 连接方案一：按键传感器 | Option 1: Button Sensor

```
按键模块              Arduino Nano
┌──────┐             ┌──────────┐
│  VCC │─────────────│  5V      │
│  GND │─────────────│  GND     │
│  OUT │─────────────│  D2      │
└──────┘             └──────────┘
```

| 按键模块引脚 | Arduino引脚 | 颜色建议 | 说明 |
|-------------|------------|----------|------|
| VCC | 5V | 红色 | 电源正极 |
| GND | GND | 黑色 | 电源地 |
| OUT | D2 | 黄色 | 信号输出 |

### 连接方案二：温湿度传感器 DHT11 | Option 2: DHT11 Sensor

```
DHT11模块             Arduino Nano
┌──────┐             ┌──────────┐
│  VCC │─────────────│  5V      │
│  GND │─────────────│  GND     │
│  DATA│─────────────│  D3      │
└──────┘             └──────────┘
```

| DHT11模块引脚 | Arduino引脚 | 颜色建议 | 说明 |
|--------------|------------|----------|------|
| VCC (+) | 5V | 红色 | 电源正极 |
| GND (-) | GND | 黑色 | 电源地 |
| DATA (OUT) | D3 | 绿色 | 数据信号线 |

**注意：** DHT11模块通常自带上拉电阻，无需额外添加。

### 完整接线图 | Complete Wiring Diagram

```
                         Arduino Nano
                        ┌──────────┐
   USB数据线 ───────────│ USB      │
   连接电脑              │          │
                        │  5V  ────┤──────┬──────── VCC (按键)
                        │  GND ────┤──────┼──────── GND (按键)
                        │  D2  ────┤──────┘──────── OUT (按键)
                        │          │
                        │  5V  ────┤──────┬──────── VCC (DHT11)
                        │  GND ────┤──────┼──────── GND (DHT11)
                        │  D3  ────┤──────┘──────── DATA (DHT11)
                        │          │
                        └──────────┘

   面包板布局：
   ┌─────────────────────────────────┐
   │ + + + + + + + + + + + + + + + + │ 电源轨（红线）
   │ - - - - - - - - - - - - - - - - │ 地线轨（蓝线）
   │                                 │
   │    [按键模块]    [DHT11模块]    │ 元件区
   │                                 │
   └─────────────────────────────────┘
```

---

## 杜邦线连接步骤 | Wiring Steps

### 步骤1：准备工作
1. 将Arduino Nano插入面包板（跨骑在中间凹槽两侧）
2. 用杜邦线将面包板的电源轨连接到Arduino的5V和GND

### 步骤2：连接按键模块
1. 取3根公对母杜邦线
2. 按键模块 VCC -> Arduino 5V（红色线）
3. 按键模块 GND -> Arduino GND（黑色线）
4. 按键模块 OUT -> Arduino D2（黄色线）

### 步骤3：连接DHT11模块
1. 取3根公对母杜邦线
2. DHT11 VCC -> Arduino 5V（红色线）
3. DHT11 GND -> Arduino GND（黑色线）
4. DHT11 DATA -> Arduino D3（绿色线）

### 步骤4：连接USB线
1. 将USB数据线连接Arduino Nano和电脑
2. Arduino上的电源LED应亮起

---

## 接线注意事项 | Wiring Notes

1. **断电操作**：接线前确保USB线未连接电脑
2. **正负极不要接反**：VCC(5V)接红线，GND接黑线，接反可能烧毁传感器
3. **杜邦线要插紧**：松动的连接会导致信号不稳定
4. **使用面包板电源轨**：多个传感器共用电源时，通过面包板的电源轨分配，而不是在Arduino引脚上并联
5. **USB线要支持数据传输**：有些USB线只能充电不能传数据，如果串口连不上请更换数据线

*最后更新：2026-05-26*
