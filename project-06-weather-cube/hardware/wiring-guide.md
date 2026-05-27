# 接线指南 | Wiring Guide

## 总览 | Overview

ESP-01S 模块仅有 8 个引脚，接线非常简单。本项目核心只需要 **4 根线** 连接 OLED 屏幕。

> The ESP-01S module has only 8 pins, making wiring very simple. The core project requires only **4 wires** to connect the OLED screen.

---

## ESP-01S 引脚图 | ESP-01S Pinout

```
         ┌──────────────┐
  GND ───┤ 1          8 ├─── TX
 GPIO2 ──┤ 2          7 ├─── RX
 GPIO0 ──┤ 3          6 ├─── RST/EN
  VCC ───┤ 4          5 ├─── CH_PD/EN
         └──────────────┘
           (3.3V 供电！)
```

| 引脚 Pin | 功能 Function | 本项目用途 Usage |
|-----------|-------------|-----------------|
| 1. GND | 地 | OLED GND |
| 2. GPIO2 (D4) | 通用 IO | LED 指示灯（状态） |
| 3. GPIO0 (D3) | 通用 IO / 烧录模式 | 重置按钮 |
| 4. VCC | 3.3V 电源输入 | 供电 |
| 5. CH_PD/EN | 使能（需接高电平） | 烧录器已处理 |
| 6. RST | 复位 | 烧录器已处理 |
| 7. RX (GPIO3) | 串口接收 | 烧录/调试 |
| 8. TX (GPIO1) | 串口发送 | 烧录/调试 |

---

## OLED 接线 | OLED Connection

SSD1306 OLED 模块通常有 4 个引脚：

| OLED 引脚 | 连接至 | ESP-01S 引脚 | 线色建议 |
|-----------|-------|-------------|---------|
| VCC | → | VCC (3.3V) | 红色 |
| GND | → | GND | 黑色 |
| SCL | → | GPIO0 (D3) | 黄色 |
| SDA | → | GPIO2 (D4) | 绿色 |

> 注意：SCL 和 SDA 在代码中定义为 `D1` 和 `D2`，这是因为 ESP8266 Arduino Core 中 `D1` = GPIO5, `D2` = GPIO4。但实际上 ESP-01S 的 `D3` = GPIO0, `D4` = GPIO2。请以代码中的 `#define sck D1` 和 `#define sda D2` 对应的实际 GPIO 编号为准。
>
> **更正**：ESP-01S 的引脚映射如下：
> - D1 = GPIO5 → ESP-01S 没有引出 GPIO5！
> - D3 = GPIO0 → ESP-01S 引脚 3
> - D4 = GPIO2 → ESP-01S 引脚 2
>
> **推荐接线方案**：将代码中的 `sck` 改为 `D3` (GPIO0)，`sda` 改为 `D4` (GPIO2)，即：
> - OLED SCL → ESP-01S GPIO0 (引脚3)
> - OLED SDA → ESP-01S GPIO2 (引脚2)
>
> 并修改代码：
> ```cpp
> #define sck 0  // GPIO0 = ESP-01S pin 3
> #define sda 2  // GPIO2 = ESP-01S pin 2
> ```

---

## 供电方式 | Power Supply

ESP-01S 烧录器自带 3.3V 稳压。插入烧录器后通过 Micro-USB 供电即可。

- **不要直接接 5V！** ESP-01S 是 3.3V 器件，5V 会烧毁模块。
- OLED 也从 ESP-01S 的 3.3V 引脚取电（OLED 模块通常支持 3.3V~5V，但 3.3V 即可正常工作）。

---

## 完整接线图 | Complete Wiring Diagram

```
    ┌──────────────────────┐
    │     USB 烧录器       │
    │  ┌───ESP-01S───┐     │
    │  │              │     │
    │  │ GND ──── GND │     │
    │  │ GPIO2 ── SDA │     │
    │  │ GPIO0 ── SCL │     │
    │  │ VCC ──── VCC │     │
    │  └──────────────┘     │
    │         │             │
    │    Micro-USB ─→ 电脑   │
    └──────────────────────┘
              │
      ┌───────┴───────┐
      │    OLED 屏     │
      │  VCC GND SCL SDA │
      └───────────────┘
```

---

## 检查清单 | Wiring Checklist

上电前请确认：
- [ ] ESP-01S 正确插入烧录器（方向不要反）
- [ ] OLED VCC → ESP-01S VCC (3.3V)
- [ ] OLED GND → ESP-01S GND
- [ ] OLED SCL → ESP-01S GPIO0
- [ ] OLED SDA → ESP-01S GPIO2
- [ ] 所有杜邦线插紧不松动
- [ ] 烧录器 USB 连接电脑

---

## 快速测试 | Quick Test

1. 将烧录器插入电脑 USB 口
2. 烧录 Blink 测试程序（修改 LED 引脚为 2）
3. 观察 ESP-01S 上的蓝色 LED 是否闪烁
4. 如果闪烁，硬件正常！如果不闪，检查 `hardware/troubleshooting.md`
