# ElectronBot Wiring Guide / ElectronBot 接线指南

---

## Overview / 概述

This document describes all electrical connections in the ElectronBot.
本文档描述 ElectronBot 的所有电气连接。

**Key principles / 关键原则:**
- All logic levels are 3.3V. Do NOT apply 5V to any signal pin.
  所有逻辑电平均为 3.3V。请勿向任何信号引脚施加 5V。
- I2C buses require external pull-up resistors (4.7k to 3.3V).
  I2C 总线需要外部上拉电阻（4.7k 上拉至 3.3V）。
- Use twisted pairs for USB signals (D+/D-).
  USB 信号（D+/D-）请使用双绞线。

---

## 1. I2C Bus: Servo Control / I2C 总线：舵机控制

The STM32F405 acts as I2C master, controlling 5 servo driver boards as slaves.
STM32F405 作为 I2C 主机，控制 5 块舵机驱动板作为从机。

### Bus Topology / 总线拓扑

```
                         I2C Bus (SDA / SCL) — 100kHz default, 400kHz fast mode
                         I2C 总线 (SDA / SCL) — 默认100kHz，快速模式400kHz

  STM32F405 ──────────┬──── Servo #1 (0x01) Left Upper Arm / 左上臂
  (Master / 主机)     ├──── Servo #2 (0x02) Left Lower Arm / 左下臂
  I2C1: PB7(SDA)      ├──── Servo #3 (0x03) Right Upper Arm / 右上臂
       PB6(SCL)       ├──── Servo #4 (0x04) Right Lower Arm / 右下臂
                      └──── Servo #5 (0x05) Neck Rotation / 颈部旋转

  Broadcast address / 广播地址: 0x00 (all servos respond / 所有舵机响应)
```

### I2C Protocol / I2C 协议

| Register Address / 寄存器地址 | Function / 功能 | Data / 数据 |
|---|---|---|
| 0x01 | Target angle / 目标角度 | int16 (0.01 degrees / 度) |
| 0x02 | Current angle / 当前角度 | int16 (read-only / 只读) |
| 0x03 | PID Kp | uint16 (x100) |
| 0x04 | PID Ki | uint16 (x100) |
| 0x05 | PID Kd | uint16 (x100) |
| 0x06 | Status / 状态 | bitmask (bit0: moving, bit1: error) |
| 0x10 | I2C address set / 地址设置 | Write-only, takes effect on reset |

### Daisy Chain Wiring / 菊花链接线

```
  Sensor Board ──── [4-pin connector] ──── Servo #1 ──── Servo #2
  传感器板        GND, SDA, SCL, 5V       舵机1          舵机 #2
                                                │
                                                ├─── Servo #3
                                                │    舵机 #3
                                                │
                                                ├─── Servo #4
                                                │    舵机 #4
                                                │
                                                └─── Servo #5
                                                     舵机 #5

  Wire gauge / 线径: 26 AWG minimum for signal, 22 AWG for power
  信号线最小 26 AWG，电源线最小 22 AWG
```

---

## 2. SPI: GC9A01 Display / SPI：GC9A01 显示屏

The GC9A01 round LCD connects via SPI1 with DMA for high-speed screen updates.
GC9A01 圆形 LCD 通过 SPI1 连接，使用 DMA 进行高速屏幕刷新。

```
  STM32F405 (SPI1 Master)            GC9A01 (SPI Slave)
  ┌──────────────────┐               ┌──────────────────┐
  │  PA5  (SPI1_SCK) │──────────────▶│  CLK             │
  │  PA6 (SPI1_MISO) │◀──────────────│  MISO (optional) │
  │  PA7 (SPI1_MOSI) │──────────────▶│  SDA (DIN)       │
  │  PB0  (GPIO out) │──────────────▶│  DC (RS)         │
  │  PB1  (GPIO out) │──────────────▶│  CS              │
  │  PB11 (GPIO out) │──────────────▶│  RST             │
  └──────────────────┘               └──────────────────┘
                                       │
                                       ▼
                                    LED backlight
                                    背光 (+3.3V via resistor)

  SPI Settings / SPI 配置:
    Mode: 0 (CPOL=0, CPHA=0)
    Speed: up to 40MHz (STM32F405 SPI1 max)
    Data: 16-bit color (RGB565), MSB first
    DMA: SPI1_TX on DMA2 Stream 3 Channel 3
```

### Display Power / 显示屏电源

```
  3.3V ──── [10 ohm resistor] ──── GC9A01 VCC (3.3V logic)
  3.3V ──── [10 ohm resistor] ──── GC9A01 LED (backlight, via MOSFET for PWM dim)
  GND  ────────────────────────── GC9A01 GND

  Backlight current / 背光电流: ~40mA typical
  Total display current / 显示屏总电流: ~60mA at 3.3V
```

---

## 3. USB High-Speed: STM32F405 to PC / USB 高速：STM32F405 到电脑

The STM32F405 uses the USB3300 ULPI PHY for USB 2.0 High-Speed (480Mbps) connection.
STM32F405 通过 USB3300 ULPI PHY 实现 USB 2.0 高速（480Mbps）连接。

```
  STM32F405                            USB3300                  USB-C
  ┌──────────────┐                    ┌──────────────┐         ┌──────────┐
  │  PA3 (ULPI)  │──┐                 │              │         │          │
  │  ...         │  │  12-pin ULPI   │  ULPI IF     │         │          │
  │  ULPI bus    │──┘  Data[7:0]     │              │── D+ ──▶│  D+      │
  │  (8 data +   │    + CTL[1:0]     │  USB FS/HS   │── D- ──▶│  D-      │
  │   4 control) │    + CLK/NXT/DIR  │  Transceiver │         │  VBUS ───│── 5V
  │              │    + STP          │              │         │  GND ────│── GND
  │  PA4 (ULPI)  │──┐                │              │         │  CC1/2   │
  │  ...         │  │                └──────────────┘         └──────────┘
  └──────────────┘  │                      │
                    │                      │ 24MHz crystal
                    │                      │ (USB3300 local clock)
                    └──────────────────────┘

  ULPI Signal Map / ULPI 信号映射:
  ┌──────────────────┬──────────────────┬───────────────────────────┐
  │ STM32F405 Pin    │ ULPI Signal      │ Function / 功能           │
  ├──────────────────┼──────────────────┼───────────────────────────┤
  │ PA3              │ ULPI_D0          │ Data bit 0                │
  │ PA5 *            │ ULPI_CLK         │ 60MHz clock from PHY     │
  │ PB0              │ ULPI_D1          │ Data bit 1                │
  │ PB1              │ ULPI_D2          │ Data bit 2                │
  │ PB10             │ ULPI_D3          │ Data bit 3                │
  │ PB11             │ ULPI_D4          │ Data bit 4                │
  │ PB12             │ ULPI_D5          │ Data bit 5                │
  │ PB13             │ ULPI_D6          │ Data bit 6                │
  │ PC0              │ ULPI_STP         │ Stop (host -> PHY)        │
  │ PA4              │ ULPI_NXT         │ Next (PHY -> host)        │
  │ PA6 *            │ ULPI_DIR         │ Direction (PHY -> host)   │
  │ PC2              │ ULPI_D7          │ Data bit 7                │
  └──────────────────┴──────────────────┴───────────────────────────┘

  * Note: PA5 and PA6 are shared with SPI1. When using USB HS with ULPI,
    SPI1 must be remapped or SPI must use a different SPI peripheral.
    注意：PA5 和 PA6 与 SPI1 共用。使用 ULPI 时，SPI 需重新映射。
    In this design, SPI1 is used with alternate pin mapping or SPI3 is used instead.
    本设计中使用 SPI3 或 SPI1 的替代引脚映射。
```

---

## 4. Sensor I2C Bus / 传感器 I2C 总线

MPU6050 and APDS-9960 share a second I2C bus on the head/sensor board.
MPU6050 和 APDS-9960 共享头板/传感器板上的第二条 I2C 总线。

```
  STM32F405 (I2C2 Master)             Sensor Board / 传感器板
  ┌──────────────────┐                ┌──────────────────┐
  │  PB10 (I2C2_SCL) │──────────────▶│  SCL ──┬── MPU6050 (0x68)
  │  PB11 (I2C2_SDA) │──────────────▶│  SDA ──┤          │
  └──────────────────┘                │        └── APDS-9960 (0x39)
                                      │
                                      │  4.7k pull-ups to 3.3V on SDA/SCL
                                      │  SDA/SCL 上拉 4.7k 至 3.3V
                                      └──────────────────┘

  I2C2 Settings / I2C2 配置:
    Speed: 400kHz (fast mode / 快速模式)
    MPU6050 address / 地址: 0x68 (AD0=0) or 0x69 (AD0=1)
    APDS-9960 address / 地址: 0x39 (fixed / 固定)
```

> **Note / 注意:** PB10/PB11 may conflict with ULPI signals for USB HS.
> The actual design may use I2C1 for sensors and I2C2 for servos,
> or use software I2C (bit-banging) on alternate GPIO pins.
> PB10/PB11 可能与 USB HS 的 ULPI 信号冲突。
> 实际设计中可能使用 I2C1 连接传感器、I2C2 连接舵机，
> 或在备用 GPIO 引脚上使用软件 I2C。

---

## 5. Complete Pin Mapping / 完整引脚映射

### STM32F405RGT6 (LQFP-64) Pin Assignments / 引脚分配

```
  Pin  Port   Function          Direction   Notes / 备注
  ──── ────── ────────────────── ─────────── ───────────────────────────
  1    VBAT   VBAT              Power       Backup battery / 备用电池
  2    PC13   GPIO              Out         Status LED / 状态指示灯
  3    PC14   OSC32_IN          -           32kHz crystal (optional)
  4    PC15   OSC32_OUT         -           32kHz crystal (optional)
  5    PH0    OSC_IN            -           8MHz main crystal / 主晶振
  6    PH1    OSC_OUT           -           8MHz main crystal / 主晶振
  7    NRST   RESET             In          System reset / 系统复位
  8    PC0    ULPI_STP          Out         USB HS stop / USB HS 停止
  9    PC1    GPIO              Out         Display backlight PWM / 背光PWM
  10   PC2    ULPI_D7           Bidir       USB HS data 7
  11   PC3    -                 -           (Reserved / 保留)
  12   PA0    GPIO              In          User button / 用户按钮
  13   PA1    GPIO              Out         Servo power enable / 舵机电源使能
  14   PA2    GPIO              Out         Motor enable (FM116B) / 电机使能
  15   PA3    ULPI_D0           Bidir       USB HS data 0
  16   PA4    ULPI_NXT          In          USB HS next
  17   PA5    SPI1_SCK          Out         *Remapped or use SPI3
  18   PA6    SPI1_MISO         In          *Remapped or use SPI3
  19   PA7    SPI1_MOSI         Out         Display data / 显示数据
  20   PB0    ULPI_D1           Bidir       USB HS data 1
  21   PB1    ULPI_D2           Bidir       USB HS data 2
  22   PB2    GPIO              Out         Display DC (RS) / 显示数据/命令
  23   PB3    SPI3_SCK *        Out         Alt SPI clock / 备用SPI时钟
  24   PB4    SPI3_MISO *       In          Alt SPI MISO
  25   PB5    SPI3_MOSI *       Out         Alt SPI data / 备用SPI数据
  26   PB6    I2C1_SCL          Out         Servo bus SCL / 舵机总线SCL
  27   PB7    I2C1_SDA          Bidir       Servo bus SDA / 舵机总线SDA
  28   BOOT0  BOOT0             In          Boot mode select / 启动模式选择
  29   PB8    -                 -           (Reserved / 保留)
  30   PB9    -                 -           (Reserved / 保留)
  31   VSS    GND               Power       Ground / 地
  32   VDD    3.3V              Power       Power / 电源
  33   PB10   I2C2_SCL *        Out         Sensor bus SCL / 传感器总线SCL
  34   PB11   I2C2_SDA *        Bidir       Sensor bus SDA / 传感器总线SDA
  35   PB12   ULPI_D3           Bidir       USB HS data 3
  36   PB13   ULPI_D4           Bidir       USB HS data 4
  37   PB14   ULPI_D5           Bidir       USB HS data 5
  38   PB15   ULPI_D6           Bidir       USB HS data 6
  39   PC4    GPIO              Out         Display RST / 显示复位
  40   PC5    GPIO              Out         Display CS / 显示片选
  41   PA8    GPIO              Out         Servo I2C pull-up enable
  42   PA9    GPIO              Out         Touch sensor (optional)
  43   PA10   GPIO              In          Touch sensor (optional)
  44   PA11   USB_DM *          Bidir       USB FS (debug), not used for HS
  45   PA12   USB_DP *          Bidir       USB FS (debug), not used for HS
  46   PA13   SWDIO             In/Out      Debug / 调试接口
  47   VSS    GND               Power       Ground / 地
  48   VDD    3.3V              Power       Power / 电源
  49   PA14   SWCLK             In          Debug / 调试接口
  50   PA15   GPIO              Out         SD card CS / SD卡片选
  51   PC6    GPIO              Out         SD card detect / SD卡检测
  52   PC7    GPIO              Out         APDS-9960 INT / 手势传感器中断
  53   PC8    -                 -           (Reserved / 保留)
  54   PC9    GPIO              Out         MPU6050 INT / IMU中断
  55   PA8    -                 -           (Alternate mapping / 备用映射)
  56   PA9    -                 -           (Alternate mapping / 备用映射)
  57   PA10   -                 -           (Alternate mapping / 备用映射)
  58   PA11   -                 -           (See USB_FS above)
  59   PA12   -                 -           (See USB_FS above)
  60   PA13   -                 -           (See SWDIO above)
  61   VSS    GND               Power       Ground / 地
  62   VDD    3.3V              Power       Power / 电源
  63   PA14   -                 -           (See SWCLK above)
  64   PA15   -                 -           (See SD CS above)

  * Pins marked with asterisk may be remapped depending on final design.
    标有星号的引脚可能根据最终设计重新映射。
```

---

## 6. Power Distribution / 电源分配

```
  USB-C (5V, 500mA guaranteed, up to 2A with negotiation)
  ┌─────────────────────────────────────────────────────────────────────┐
  │                                                                     │
  │   5V ────┬──── [Polyfuse 2A] ──── Servo Power Bus (5V direct)     │
  │          │                           舵机电源总线 (5V直连)          │
  │          │                           (Switched via PA1 MOSFET)      │
  │          │                                                            │
  │          ├──── [DC-DC Buck 5V->3.3V, 2A] ──── 3.3V Rail            │
  │          │                              3.3V 电源轨                  │
  │          │                                ├── STM32F405 (~100mA)    │
  │          │                                ├── USB3300 (~50mA)       │
  │          │                                ├── GC9A01 LCD (~60mA)    │
  │          │                                ├── MPU6050 (~4mA)        │
  │          │                                ├── APDS-9960 (~1mA)      │
  │          │                                ├── STM32F042 x5 (~50mA)  │
  │          │                                └── Pull-ups, misc (~10mA)│
  │          │                                                           │
  │          └──── USB HUB CH334R (5V) ── USB Camera (~200mA)          │
  │                                        USB 摄像头                    │
  │                                                                     │
  │   GND ────────────── Common ground plane / 公共地平面 ──────────── │
  └─────────────────────────────────────────────────────────────────────┘

  Current Budget / 电流预算:
  ┌─────────────────────────┬────────────┬──────────────────────────────┐
  │ Rail / 电源轨           │ Current    │ Notes / 备注                 │
  ├─────────────────────────┼────────────┼──────────────────────────────┤
  │ 3.3V logic              │ ~275mA     │ MCU + sensors + display      │
  │ 5V servo (per servo)    │ ~300mA max │ Stall current ~500mA         │
  │ 5V servo (all 5 peak)   │ ~1.5A peak │ Use polyfuse protection      │
  │ 5V USB camera           │ ~200mA     │ Via USB HUB                  │
  │ Total 5V from USB-C     │ ~2A peak   │ USB-C must support 2A        │
  └─────────────────────────┴────────────┴──────────────────────────────┘

  WARNING: Servo stall current can cause voltage drops. Use separate
  decoupling capacitors (100uF + 100nF) on the servo power bus.
  警告：舵机堵转电流可能导致电压跌落。请在舵机电源总线上使用
  独立的去耦电容（100uF + 100nF）。
```

---

## 7. Cable Routing / 线缆走线

### Head to Sensor Board / 主控板到传感器板

```
  ┌─────────────────────┐      FFC (20-pin, 0.5mm pitch)      ┌─────────────────────┐
  │                     │◀══════════════════════════════════════▶│                     │
  │    HEAD BOARD       │      Flexible Flat Cable / 柔性排线   │   SENSOR BOARD      │
  │    主控板            │                                       │   传感器板            │
  │                     │  Pin 1: 3.3V                          │                     │
  │                     │  Pin 2: GND                           │                     │
  │                     │  Pin 3: I2C1_SDA (servo bus)          │                     │
  │                     │  Pin 4: I2C1_SCL (servo bus)          │                     │
  │                     │  Pin 5: I2C2_SDA (sensor bus)         │                     │
  │                     │  Pin 6: I2C2_SCL (sensor bus)         │                     │
  │                     │  Pin 7: APDS_INT                      │                     │
  │                     │  Pin 8: MPU_INT                       │                     │
  │                     │  Pin 9: 5V (servo power)              │                     │
  │                     │  Pin 10: SERVO_EN                     │                     │
  │                     │  Pin 11-20: Reserved / 保留           │                     │
  └─────────────────────┘                                       └─────────────────────┘
```

### Servo Daisy Chain Cable Routing / 舵机菊花链走线

```
  ┌──────────────┐
  │ SENSOR BOARD │
  │   传感器板    │
  └──────┬───────┘
         │ 4-pin cable (GND, SDA, SCL, 5V)
         │ 4芯线缆
         ▼
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  Servo #1    │────▶│  Servo #2    │────▶│  Servo #3    │
  │  左上臂       │     │  左下臂       │     │  右上臂       │
  │  (0x01)      │     │  (0x02)      │     │  (0x03)      │
  └──────────────┘     └──────────────┘     └──────┬───────┘
                                                   │
                                           ┌───────┴────────┐
                                           │                 │
                                           ▼                 ▼
                                    ┌──────────────┐  ┌──────────────┐
                                    │  Servo #4    │  │  Servo #5    │
                                    │  右下臂       │  │  颈部         │
                                    │  (0x04)      │  │  (0x05)      │
                                    └──────────────┘  └──────────────┘

  Cable length / 线缆长度:
    Sensor → Servo #1:  80mm
    Servo #1 → #2:      60mm
    Sensor → Servo #3:  80mm
    Servo #3 → #4:      60mm
    Servo #3 → #5:      70mm (neck, different branch)

  IMPORTANT: Keep I2C wires as short as possible. Total bus length
  should not exceed 500mm at 400kHz. Add 100nF decoupling caps at
  each servo board's power input.
  重要：I2C线缆尽量短。400kHz下总线总长度不应超过500mm。
  每个舵机板电源输入处加100nF去耦电容。
```

---

## 8. Servo Drive Board Pinout / 舵机驱动板引脚

### STM32F042P6 (TSSOP-20) on Servo Board

```
  ┌──────────────────────────────────┐
  │          STM32F042P6             │
  │                                  │
  │  Pin 1  (PA0) ─── Potentiometer ADC input / 电位器ADC输入    │
  │  Pin 4  (PA5) ─── Motor PWM A (FM116B INA) / 电机PWM A     │
  │  Pin 5  (PA6) ─── Motor PWM B (FM116B INB) / 电机PWM B     │
  │  Pin 6  (PA7) ─── Motor enable (FM116B EN) / 电机使能       │
  │  Pin 8  (PB1) ─── Address select bit 0 / 地址选择位0        │
  │  Pin 9  (PB2) ─── Address select bit 1 / 地址选择位1        │
  │  Pin 10 (PB3) ─── Address select bit 2 / 地址选择位2        │
  │  Pin 11 (PA9) ─── I2C SDA (from bus) / I2C数据              │
  │  Pin 12 (PA10) ── I2C SCL (from bus) / I2C时钟              │
  │  Pin 16 (PA14) ── SWCLK (programming) / 调试时钟            │
  │  Pin 17 (PA13) ── SWDIO (programming) / 调试数据            │
  │                                  │
  │  Address truth table / 地址真值表:                           │
  │  ┌──────┬──────┬──────┬──────────────────┐                 │
  │  │ BIT2 │ BIT1 │ BIT0 │ Address / 地址    │                 │
  │  ├──────┼──────┼──────┼──────────────────┤                 │
  │  │  0   │  0   │  1   │ 0x01 (Left Up)   │                 │
  │  │  0   │  1   │  0   │ 0x02 (Left Down) │                 │
  │  │  0   │  1   │  1   │ 0x03 (Right Up)  │                 │
  │  │  1   │  0   │  0   │  0x04 (Right Down)│                │
  │  │  1   │  0   │  1   │ 0x05 (Neck)      │                 │
  │  └──────┴──────┴──────┴──────────────────┘                 │
  │  Pull LOW = 1, Pull HIGH (to 3.3V) = 0                     │
  └──────────────────────────────────┘
```

---

*最后更新：2026-05-27*
