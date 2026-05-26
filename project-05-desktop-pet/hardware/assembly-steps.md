# 组装步骤 | Assembly Steps

## 概述 | Overview

本文档指导你完成桌宠硬件拓展模块的组装。整个过程约需20-30分钟，不需要焊接。

This document guides you through assembling the desktop pet hardware extension module. The process takes about 20-30 minutes and requires no soldering.

---

## 所需工具 | Tools Required

| 工具 | 用途 | 是否必需 |
|------|------|----------|
| USB数据线 | 连接Arduino和电脑 | 必需 |
| 电脑 | 编程和测试 | 必需 |
| 小螺丝刀 | 固定模块（如有需要） | 可选 |
| 剪刀 | 剪裁杜邦线标签 | 可选 |

---

## 组装步骤 | Assembly Steps

### 第一步：检查零件清单 (5分钟)

打开零件包装，对照BOM清单逐一检查：

- [ ] Arduino Nano x 1
- [ ] 按键传感器模块 x 1
- [ ] DHT11温湿度传感器模块 x 1
- [ ] 面包板 400孔 x 1
- [ ] 杜邦线 公对母 x 6根以上
- [ ] USB数据线 x 1

如有缺失，请在开始组装前联系老师补发。

### 第二步：将Arduino插入面包板 (2分钟)

1. 找到面包板中间的凹槽
2. 将Arduino Nano的引脚对准面包板两侧的孔
3. 轻轻按下，直到Arduino稳固地卡在面包板上
4. 确认Arduino两侧的引脚都插入了面包板的孔中

**注意：** Arduino Nano的Mini-USB/Type-C接口朝向面包板的短边（方便连接USB线）。

```
面包板俯视图：
┌─────────────────────────┐
│ + + + + + + + + + + + + │
│ - - - - - - - - - - - - │
│                         │
│  █████████████████████  │ <- Arduino Nano 在这里
│  █████████████████████  │
│                         │
│ - - - - - - - - - - - - │
│ + + + + + + + + + + + + │
└─────────────────────────┘
        USB口朝这边 ->
```

### 第三步：连接电源线 (3分钟)

1. 取2根杜邦线（建议：红色和黑色）
2. 红色线：Arduino 5V -> 面包板 "+" 电源轨
3. 黑色线：Arduino GND -> 面包板 "-" 地线轨

**验证：** 连接USB线到电脑，Arduino上的电源LED应亮起（通常为绿色或蓝色）。

### 第四步：连接按键模块 (5分钟)

1. 将按键模块放置在面包板上（选择一个方便的位置）
2. 连接杜邦线：
   - 按键 VCC（+）-> 面包板 "+" 电源轨（或直接接Arduino 5V）
   - 按键 GND（-）-> 面包板 "-" 电源轨（或直接接Arduino GND）
   - 按键 OUT（信号）-> Arduino D2 引脚

3. 按下按键，测试是否有反应（此时还没有程序，稍后测试）

### 第五步：连接DHT11温湿度传感器 (5分钟)

1. 将DHT11模块放置在面包板上
2. 连接杜邦线：
   - DHT11 VCC（+）-> 面包板 "+" 电源轨
   - DHT11 GND（-）-> 面包板 "-" 电源轨
   - DHT11 DATA（数据）-> Arduino D3 引脚

**注意：** DHT11模块通常有3个引脚（VCC、GND、DATA），部分模块有4个引脚（VCC、DATA、NC、GND），NC引脚不需要连接。

### 第六步：检查和测试 (5分钟)

1. **目视检查**：
   - 所有杜邦线连接牢固
   - 没有松动或脱落的线
   - 正负极没有接反

2. **USB连接测试**：
   - 将USB线连接到电脑
   - 打开设备管理器（Windows），确认出现了新的COM端口
   - Arduino电源LED亮起

3. **串口测试**：
   ```python
   import serial
   import serial.tools.list_ports

   # 列出所有串口
   ports = serial.tools.list_ports.comports()
   for port in ports:
       print(f"{port.device}: {port.description}")

   # 如果看到 "USB-SERIAL CH340" 或类似描述，说明连接成功
   ```

---

## 组装完成 | Assembly Complete

组装完成后，你的硬件配置应该是：

```
┌─────────────────────────────────────┐
│                                     │
│   [按键模块]        [DHT11模块]      │
│     ↓                  ↓           │
│     D2                 D3          │
│                                     │
│      ┌──────────────────┐          │
│      │   Arduino Nano   │          │
│      │                  │          │
│      └────────┬─────────┘          │
│               │ USB线               │
│               ↓                     │
│           [电脑USB口]                │
│                                     │
└─────────────────────────────────────┘
```

接下来可以进入 [troubleshooting.md](troubleshooting.md) 排查可能的问题，或开始编程测试硬件。

*最后更新：2026-05-26*
