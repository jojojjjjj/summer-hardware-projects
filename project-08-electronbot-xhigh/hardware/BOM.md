# ElectronBot Advanced Desktop Pet - Bill of Materials (BOM)
# ElectronBot 高级桌面机器人 - 物料清单

---

## System Architecture / 系统架构

```
                        ┌──────────────────────────────────────────────┐
                        │           ElectronBot System                 │
                        │            ElectronBot 系统                  │
                        └──────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                           HEAD BOARD / 主控板                               │
  │  ┌──────────────┐   SPI1+DMA   ┌───────────────┐                          │
  │  │  STM32F405   │─────────────▶│   GC9A01      │  1.28" Circular LCD      │
  │  │  RGT6 (MCU)  │              │   240x240 LCD │  圆形显示屏               │
  │  │  主控芯片    │              └───────────────┘                          │
  │  └──────┬───┬───┘                                                         │
  │         │   │                   ┌───────────────┐                          │
  │  I2C    │   └─── USB HS ──────▶│   USB3300     │──▶ USB-C (PC Host)      │
  │  Master │       (ULPI)         │   USB HS PHY  │    USB-C 连接电脑        │
  │         │                       └───────────────┘                          │
  │         │                                                                   │
  │         │        ┌───────────────┐                                          │
  │         └───────▶│  SD Card Slot │  程序存储 / 动画数据                    │
  │                   └───────────────┘                                          │
  └─────────────────────────────────────────────────────────────────────────────┘
          │ I2C Bus (FFC cable / 柔性排线)
          ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                        SENSOR BOARD / 传感器板                              │
  │  ┌──────────────┐  ┌───────────────┐  ┌───────────────┐                   │
  │  │  APDS-9960   │  │   MPU6050     │  │ USB Camera    │                   │
  │  │  手势传感器  │  │  六轴 IMU     │  │ USB 摄像头    │                   │
  │  └──────────────┘  └───────────────┘  └───────────────┘                   │
  │  ┌──────────────┐                                                          │
  │  │  CH334R      │  1-to-4 USB HUB (camera + USB HS passthrough)           │
  │  │  USB HUB     │  一分四 USB 集线器                                       │
  │  └──────────────┘                                                          │
  │                                                                             │
  │  I2C Servo Bus Out ─┬──▶ Servo #1 (0x01) 左臂上舵机                       │
  │  舵机 I2C 总线      ├──▶ Servo #2 (0x02) 左臂下舵机                       │
  │                     ├──▶ Servo #3 (0x03) 右臂上舵机                       │
  │                     ├──▶ Servo #4 (0x04) 右臂下舵机                       │
  │                     └──▶ Servo #5 (0x05) 颈部舵机                         │
  └─────────────────────────────────────────────────────────────────────────────┘
          │ I2C Daisy Chain
          ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    SERVO DRIVE BOARD x5 / 舵机驱动板 x5                     │
  │  ┌──────────────┐   ┌───────────────┐   ┌───────────────┐                 │
  │  │ STM32F042P6  │──▶│   FM116B      │──▶│  DC Motor     │                 │
  │  │ I2C Slave    │   │  电机驱动     │   │  直流电机     │                 │
  │  └──────┬───────┘   └───────────────┘   └───────────────┘                 │
  │         │                                                                   │
  │         └─── Potentiometer feedback / 电位器角度反馈                        │
  └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Head Board Components / 主控板元件

| # | Component / 元件 | Specification / 规格 | Qty | Unit Price / 单价 | Subtotal / 小计 | Notes / 备注 |
|---|---|---|---|---|---|---|
| 1 | STM32F405RGT6 | ARM Cortex-M4, 168MHz, 1MB Flash, 192KB RAM, LQFP64 | 1 | 25元 | 25元 | Main MCU / 主控芯片 |
| 2 | GC9A01 Round LCD | 1.28", 240x240, SPI interface | 1 | 25元 | 25元 | Face display / 表情显示 |
| 3 | USB3300 | USB 2.0 HS ULPI PHY, QFN-24 | 1 | 15元 | 15元 | High-speed USB / 高速USB |
| 4 | MicroSD card slot | Push-push type, 8-pin | 1 | 3元 | 3元 | Data storage / 数据存储 |
| 5 | Crystal oscillator / 晶振 | 8MHz + 12MHz (for USB) | 2 | 1元 | 2元 | System + USB clock |
| 6 | Passives / 被动元件 | Capacitors, resistors, inductors | 1 set | 8元 | 8元 | Decoupling, filtering / 去耦滤波 |

**Head Board Subtotal / 主控板小计: 78元**

---

## 2. Sensor Board Components / 传感器板元件

| # | Component / 元件 | Specification / 规格 | Qty | Unit Price / 单价 | Subtotal / 小计 | Notes / 备注 |
|---|---|---|---|---|---|---|
| 7 | APDS-9960 | Gesture/RGB/proximity sensor, I2C | 1 | 8元 | 8元 | Gesture control / 手势控制 |
| 8 | CH334R | USB 2.0 HUB, 1-to-4 | 1 | 10元 | 10元 | USB expansion / USB扩展 |
| 9 | MPU6050 | 6-axis IMU (3-axis gyro + accel), I2C | 1 | 8元 | 8元 | Pose sensing / 姿态感知 |
| 10 | USB camera module | OV9734 or similar, USB interface | 1 | 15元 | 15元 | Vision input / 视觉输入 |
| 11 | Camera connector | FPC/FPC socket, matched to camera | 1 | - | - | On camera module |
| 12 | I2C servo connectors | 5-pin JST or similar, x5 | 5 | 1元 | 5元 | Servo bus output / 舵机总线输出 |

**Sensor Board Subtotal / 传感器板小计: 46元**

---

## 3. Servo Drive Board Components (x5 sets) / 舵机驱动板元件 (5套)

| # | Component / 元件 | Specification / 规格 | Qty (per board) | Qty (total) | Unit Price / 单价 | Subtotal / 小计 | Notes / 备注 |
|---|---|---|---|---|---|---|---|
| 13 | STM32F042P6 | ARM Cortex-M0, 48MHz, TSSOP-20 | 1 | 5 | 8元 | 40元 | I2C slave MCU / I2C从控 |
| 14 | FM116B | H-bridge motor driver, SOT-23-6 | 1 | 5 | 2元 | 10元 | Motor drive / 电机驱动 |
| 15 | Potentiometer / 电位器 | 10k linear, 3-pin, for angle feedback | 1 | 5 | 1元 | 5元 | Angle feedback / 角度反馈 |

**Servo Drive Board Subtotal / 舵机驱动板小计: 55元**

---

## 4. Mechanical & Power Components / 机械与电源元件

| # | Component / 元件 | Specification / 规格 | Qty | Unit Price / 单价 | Subtotal / 小计 | Notes / 备注 |
|---|---|---|---|---|---|---|
| 16 | Standard servos / 标准舵机 | SG90 or compatible, modified with custom board | 5 | 15元 | 75元 | Arms + neck / 手臂和颈部 |
| 17 | Bearings 6x10x3mm / 轴承 6x10x3 | MR106-2RS miniature bearing | 4 | 2元 | 8元 | Arm joints / 手臂关节 |
| 18 | Bearing 25x32x4mm / 轴承 25x32x4 | Thin-section bearing for neck/waist | 1 | 7元 | 7元 | Neck rotation / 颈部旋转 |
| 19 | 3D printed body / 3D打印外壳 | Nylon (SLS) or SLA resin, full set | 1 set | 80-100元 | 90元 | Shell + internal structure |
| 20 | Watch glass crystal / 手表玻璃 | 31.5mm diameter, flat, AR coated | 1 | 5元 | 5元 | Face cover / 面部保护盖 |
| 21 | FFC cables / 柔性排线 | 0.5mm pitch, various lengths | 4 | 2元 | 8元 | Inter-board connection |
| 22 | Screws & standoffs / 螺丝铜柱 | M2/M2.5/M3 assortment kit | 1 set | 5元 | 5元 | Mechanical fastening |
| 23 | USB-C connector / USB-C 连接器 | USB 2.0, 16-pin, SMD | 1 | 2元 | 2元 | Power + data / 供电与数据 |
| 24 | DC-DC converter / DC-DC 转换 | 5V to 3.3V, 2A, buck converter | 1 | 3元 | 3元 | Power regulation / 电源稳压 |
| 25 | Miscellaneous / 杂项 | Heat-shrink tubing, wire, adhesive | 1 set | 5元 | 5元 | Assembly consumables |

**Mechanical & Power Subtotal / 机械与电源小计: 208元**

---

## 5. Cost Summary / 成本汇总

| Category / 类别 | Cost / 费用 |
|---|---|
| Head Board / 主控板 | 78元 |
| Sensor Board / 传感器板 | 46元 |
| Servo Drive Boards x5 / 舵机驱动板 x5 | 55元 |
| Servos / 舵机 | 75元 |
| Mechanical & Power / 机械与电源 | 133元 |
| **Total / 总计** | **~387元** |
| **With 15% contingency / 含15%余量** | **~450元** |

> Estimated total range / 预估总范围: **400-500元**

---

## 6. Purchase Channels / 采购渠道

| Channel / 渠道 | Best For / 适用项目 | URL |
|---|---|---|
| 嘉立创 (JLC) / 立创商城 | STM32, passives, PCB fabrication | https://www.jlc.com |
| 淘宝 (Taobao) | Servos, LCD, bearings, 3D printing | https://www.taobao.com |
| AliExpress / 速卖通 | Sensors (APDS-9960, MPU6050), modules | https://www.aliexpress.com |
| 嘉立创 PCB / JLC PCB | Custom PCB fabrication (head, sensor, servo boards) | https://www.jlcpcb.com |
| 得捷 (DigiKey) / Mouser | USB3300, precision components (if unavailable domestically) | https://www.digikey.com |

---

## 7. Critical Notes / 重要注意事项

> **Warning / 警告:** The STM32F405RGT6 comes in LQFP64 package. The USB3300 is QFN-24.
> Both require fine-pitch soldering. Practice on scrap boards first.
> STM32F405RGT6 为 LQFP64 封装，USB3300 为 QFN-24 封装，均需精细焊接技巧。
> 请先在废板上练习。

> **Note / 注意:** The GC9A01 round LCD uses SPI interface. Ensure 3.3V logic levels.
> Do NOT connect to 5V. The display will be permanently damaged.
> GC9A01 圆形 LCD 使用 SPI 接口，逻辑电平为 3.3V。
> 切勿连接 5V，否则显示屏将永久损坏。

> **Important / 重要:** Each servo drive board must have a unique I2C address (0x01-0x05).
> Addresses are set via solder jumpers or internal pull-ups during assembly.
> Verify addresses with an I2C scanner before installation.
> 每块舵机驱动板必须设置唯一的 I2C 地址（0x01-0x05）。
> 地址通过焊锡跳线或内部上拉在组装时设定。
> 安装前请使用 I2C 扫描器验证地址。

> **Mechanical / 机械:** 3D printed parts must be printed with tight tolerances (0.1mm).
> SLA resin is recommended for face housing. Nylon SLS is recommended for arm joints.
> 3D打印件公差须控制在0.1mm以内。
> 面部外壳推荐 SLA 树脂，手臂关节推荐尼龙 SLS。

---

## 8. Tools Checklist / 工具清单

| # | Tool / 工具 | Required / 必需 | Notes / 备注 |
|---|---|---|---|
| 1 | Soldering iron (temperature-controlled) / 恒温电烙铁 | Yes | With fine tip for QFN / 需细尖头焊QFN |
| 2 | Solder paste + hot air station / 焊锡膏 + 热风枪 | Yes | For QFN/SMD reflow / QFN/SMD回流焊 |
| 3 | Multimeter / 万用表 | Yes | Continuity & voltage testing |
| 4 | Oscilloscope (optional) / 示波器（可选） | Recommended | Debug SPI/I2C signals / 调试SPI/I2C信号 |
| 5 | ST-Link V2 programmer / ST-Link V2 下载器 | Yes | STM32 programming / STM32烧录 |
| 6 | USB-C cable (data capable) / USB-C 数据线 | Yes | Must support data, not charge-only |
| 7 | Precision screwdriver set / 精密螺丝刀套装 | Yes | M2/M2.5/M3 hex bits |
| 8 | Tweezers (ESD-safe) / 防静电镊子 | Yes | SMD component handling |
| 9 | Flux pen / 助焊剂笔 | Yes | Essential for QFN soldering |
| 10 | Magnifier or loupe / 放大镜 | Recommended | Inspect solder joints / 检查焊点 |
| 11 | I2C scanner tool / I2C 扫描工具 | Yes | Verify servo board addresses / 验证舵机地址 |
| 12 | 3D printer or printing service / 3D打印机或打印服务 | Yes | Or use JLC 3D printing service |

---

*最后更新：2026-05-27*
