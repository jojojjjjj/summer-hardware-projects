# Day 02: 硬件原理图阅读与PCB认知 | Schematic Reading & PCB Fundamentals

> **今日目标:**
> - 学会阅读STM32F405数据手册的关键章节
> - 掌握STM32时钟树配置原理（从8MHz到168MHz的完整路径）
> - 理解ElectronBot的电源管理架构（USB供电、3.3V/1.2V/2.5V轨）
> - 掌握USB HS PHY（USB3300）的工作原理和ULPI接口
> - 完整阅读ElectronBot原理图（主控板+舵机驱动板+屏幕板）
> - 了解PCB设计要点和3D打印文件准备
>
> **产出:** 画出ElectronBot系统架构框图，标注所有芯片型号、通信接口和电源轨

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 回顾Day 1作业、串口Hello World演示 |
| 09:15 - 10:30 | 知识讲解 | STM32F405数据手册、时钟树、电源管理 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 时钟树计算练习、USB3300 ULPI接口分析 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | ElectronBot原理图逐页阅读、板间连接分析 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | PCB设计要点讲解、3D打印文件检查与准备 |
| 16:30 - 17:00 | 总结分享 | 原理图知识竞答、架构图互评 |

---

## 上午: STM32F405数据手册与核心电路 | Morning: Datasheet & Core Circuits

### 为什么要学这个? | Why Learn This?

数据手册（Datasheet）是芯片的"说明书"，包含芯片的所有电气参数、引脚定义、外设特性和使用限制。学会阅读数据手册是硬件工程师的基本功——你不需要从头读到尾，但必须知道去哪一页找你需要的信息。

A datasheet is a chip's "instruction manual", containing all electrical parameters, pin definitions, peripheral characteristics, and usage limitations. Learning to read datasheets is fundamental for hardware engineers -- you don't read cover to cover, but you must know which page has what you need.

ElectronBot的电路设计比之前的SparkBot更加复杂——它涉及USB高速PHY、多路电源轨和分布式舵机控制。理解这些电路原理是明天成功焊接的基础。

ElectronBot's circuit design is more complex than SparkBot -- involving USB HS PHY, multiple power rails, and distributed servo control. Understanding these circuits is the foundation for successful soldering tomorrow.

### 任务2.1: STM32F405数据手册关键章节 (30分钟)

**数据手册阅读策略:**

```
STM32F405 数据手册 (约200页):
你不需要全部读完，重点看以下章节:

必读章节:
├── 第1章: 简介 (2页) -- 芯片特性总览
├── 第2章: 引脚定义 (10页) -- 每个引脚的功能和复用
├── 第3章: 存储器映射 (5页) -- Flash和SRAM分布
└── 第4章: 电气特性 (15页) -- 供电电压、电流、时序

选读章节:
├── 第5章: 封装机械尺寸 (3页) -- 焊接时参考
└── 附录: 器件命名规则 (1页) -- STM32F405RGT6含义

注: 功能描述详见 Reference Manual (RM0090, 约1500页)
    那才是真正的"使用说明书"
```

**引脚命名解读:**

```
STM32F405RGT6 命名规则:
STM32 F 4 05 R G T 6
  │    │ │  │ │ │ │ └── 温度范围: 6=-40~85°C (工业级)
  │    │ │  │ │ │ └──── 封装: T=LQFP
  │    │ │  │ │ └────── Flash容量: G=1MB
  │    │ │  │ └──────── 引脚数: R=64引脚
  │    │ │  └────────── 子系列: 05=基础款
  │    │ └───────────── 内核: 4=Cortex-M4F
  │    └────────────── 产品线: F=通用MCU
  └─────────────────── 品牌 STM32
```

**ElectronBot使用的LQFP64引脚分配概览:**

| 引脚组 | 数量 | 主要功能 |
|--------|------|----------|
| 电源VDD/VSS | 8对 | 3.3V数字供电 |
| VDDA/VSSA | 1对 | 3.3V模拟供电 |
| VBAT | 1 | RTC备用电源 |
| BOOT0 | 1 | 启动模式选择 |
| NRST | 1 | 复位引脚 |
| OSC_IN/OUT | 2 | 8MHz外部晶振 |
| OSC32_IN/OUT | 2 | 32.768kHz RTC晶振 |
| PA0-PA15 | 16 | GPIO/复用（USB、SPI、UART等） |
| PB0-PB15 | 16 | GPIO/复用（I2C、ULPI等） |
| PC0-PC13 | 14 | GPIO/复用（ULPI数据线等） |

### 任务2.2: 时钟树配置详解 (30分钟)

**STM32F405时钟树——从8MHz到168MHz的旅程:**

```
STM32F405 时钟树 (简化版):

            外部晶振 HSE
            8MHz
               │
               ▼
         ┌───────────┐
         │   PLL     │
         │  锁相环    │
         │           │
         │  PLLM = 8 │  8MHz / 8 = 1MHz (PLL输入)
         │  PLLN = 336│  1MHz × 336 = 336MHz (VCO输出)
         │  PLLP = 2 │  336MHz / 2 = 168MHz (SYSCLK)
         │  PLLQ = 7 │  336MHz / 7 = 48MHz (USB时钟)
         │           │
         └─────┬─────┘
               │
     ┌─────────┼──────────┐
     ▼         ▼          ▼
  SYSCLK    USB时钟    PLL48CLK
  168MHz    48MHz      48MHz
     │                   │
     ▼                   ▼
  AHB分频              USB OTG FS
  /1 = 168MHz          USB OTG HS
     │
     ├──> APB1分频 /4 = 42MHz
     │    (I2C, UART2-5, SPI2/3, TIM2-7,12-14)
     │    I2C需要特殊处理: 42MHz × 2 = 84MHz输入
     │
     └──> APB2分频 /2 = 84MHz
          (ADC, UART1, SPI1, TIM1,8-11)
          USB HS ULPI时钟也源自此

关键时钟频率:
  SYSCLK  = 168 MHz  (系统主频)
  HCLK    = 168 MHz  (AHB总线)
  APB1    = 42  MHz  (低速外设总线)
  APB2    = 84  MHz  (高速外设总线)
  USB FS  = 48  MHz  (USB全速时钟)
```

**时钟配置C代码解析（来自SystemClock_Config）:**

```c
void SystemClock_Config(void)
{
    RCC_OscInitTypeDef RCC_OscInitStruct = {0};
    RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

    /* 配置PLL时钟源和参数 */
    RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;  // 使用外部晶振
    RCC_OscInitStruct.HSEState = RCC_HSE_ON;                    // 开启HSE
    RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;                // 开启PLL
    RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;        // PLL源=HSE
    RCC_OscInitStruct.PLL.PLLM = 8;    // HSE/8  = 1MHz (VCO输入)
    RCC_OscInitStruct.PLL.PLLN = 336;  // ×336   = 336MHz (VCO输出)
    RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV2;  // /2 = 168MHz (SYSCLK)
    RCC_OscInitStruct.PLL.PLLQ = 7;    // /7     = 48MHz (USB时钟)
    HAL_RCC_OscConfig(&RCC_OscInitStruct);

    /* 配置总线分频 */
    RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK |
                                  RCC_CLOCKTYPE_SYSCLK |
                                  RCC_CLOCKTYPE_PCLK1 |
                                  RCC_CLOCKTYPE_PCLK2;
    RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;  // SYSCLK = PLL
    RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;    // HCLK = 168MHz
    RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV4;     // APB1 = 42MHz
    RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;     // APB2 = 84MHz
    HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_5);

    /* 注意: FLASH_LATENCY_5 是必须的!
     * 168MHz下Flash需要5个等待周期
     * 否则CPU读Flash会出错 */
}
```

**练习: 计算PLL参数**
给定HSE=8MHz，要得到SYSCLK=168MHz和USB=48MHz，验证PLLM=8, PLLN=336, PLLP=2, PLLQ=7的正确性：
- VCO输入 = HSE/PLLM = 8/8 = 1MHz (要求1~2MHz)
- VCO输出 = VCO输入 × PLLN = 1 × 336 = 336MHz (要求192~432MHz)
- SYSCLK = VCO输出/PLLP = 336/2 = 168MHz
- USB时钟 = VCO输出/PLLQ = 336/7 = 48MHz

### 任务2.3: 电源管理与USB HS PHY (30分钟)

**ElectronBot电源树:**

```
ElectronBot 电源架构:

USB 5V (VBUS)
    │
    ├──> LDO 3.3V ──────────> STM32F405 VDD (3.3V)
    │   (AMS1117-3.3 或       ├── GPIO供电
    │    RT9013)               ├── SPI外设 (GC9A01)
    │                         ├── I2C上拉
    │                         └── UART电平
    │
    ├──> LDO 1.2V ──────────> STM32F405 VDDA (1.2V, 内部核压)
    │   (如果需要)
    │
    ├──> LDO 2.5V ──────────> USB3300 VDDIO (2.5V, I/O供电)
    │
    ├──> USB3300 VDD ────────> USB3300 核心 (3.3V)
    │
    ├──> 舵机供电 (5V直供, 不经过LDO!)
    │   └── 6 × 舵机 (大电流路径, 独立供电)
    │
    └──> GC9A01背光 (3.3V或5V, 取决于背光LED配置)

电源设计要点:
1. 数字地和模拟地要单点连接 (避免噪声耦合)
2. USB3300需要独立的2.5V/3.3V供电 (对噪声敏感)
3. 舵机供电必须与MCU供电隔离 (电机产生的纹波)
4. 每个IC的VDD旁要有0.1uF去耦电容 (至少)
```

**USB HS PHY——USB3300工作原理:**

```
USB3300: USB 2.0 高速PHY芯片
┌────────────────────────────────────┐
│           USB3300                   │
│                                    │
│  ULPI接口 (12根信号线)              │
│  ┌──────────────┐                  │
│  │ DATA[7:0]    │  双向数据总线     │
│  │ DIR, STP, NXT│  控制信号        │
│  │ CLK (60MHz)  │  PHY输出时钟     │
│  └──────┬───────┘                  │
│         │                          │
│  USB差分信号                        │
│  ┌──────┴───────┐                  │
│  │ DP (D+)      │  USB连接器       │
│  │ DM (D-)      │                  │
│  └──────────────┘                  │
│                                    │
│  供电: VDD=3.3V, VDDIO=1.8~3.3V   │
│  封装: QFN-32 (5×5mm)              │
└────────────────────────────────────┘

ULPI接口说明:
- ULPI = UTMI+ Low Pin Interface
- 60MHz时钟由PHY(USB3300)输出给MCU
- 8位双向数据总线，分时复用
- STM32F405的USB OTG HS可通过ULPI连接外部PHY
- 这样才能实现480Mbps高速USB传输
- ElectronBot用高速USB传输屏幕帧数据和舵机控制数据

为什么需要外部PHY?
- STM32F405内置的USB PHY只支持全速(12Mbps)
- 要达到高速(480Mbps)必须用外部PHY芯片(USB3300)
- 高速模式才能满足实时传输屏幕图像的带宽需求
```

**ULPI引脚分配（STM32F405 LQFP64）:**

| ULPI信号 | STM32引脚 | 说明 |
|----------|-----------|------|
| ULPI_DATA0 | PA3 | 双向数据位0 |
| ULPI_DATA1 | PB0 | 双向数据位1 |
| ULPI_DATA2 | PB1 | 双向数据位2 |
| ULPI_DATA3 | PB10 | 双向数据位3 |
| ULPI_DATA4 | PB11 | 双向数据位4 |
| ULPI_DATA5 | PB12 | 双向数据位5 |
| ULPI_DATA6 | PB13 | 双向数据位6 |
| ULPI_DATA7 | PB5 | 双向数据位7 |
| ULPI_DIR | PC2 | 方向信号 |
| ULPI_STP | PC0 | 停止信号 |
| ULPI_NXT | PC3 | 下一个信号 |
| ULPI_CLK | PA5 | 60MHz时钟 |

---

## 下午: ElectronBot原理图分析 | Afternoon: Schematic Analysis

### 任务2.4: 主控板原理图分析 (40分钟)

**ElectronBot主控板核心电路模块:**

```
ElectronBot 主控板原理图结构:

第1页: 电源与复位
┌──────────────────────────────────────────┐
│  USB Type-C 接口                          │
│  ├── VBUS (5V) ──> LDO ──> 3.3V          │
│  ├── D+ / D- ──> USB3300 ──> ULPI        │
│  │                    └──> USB连接器       │
│  └── GND                                │
│                                          │
│  复位电路: NRST ──[10kΩ上拉]── VDD       │
│  启动配置: BOOT0 ──[10kΩ下拉]── GND      │
│  (BOOT0=0: 从Flash启动)                  │
│  (BOOT0=1: 从System Memory启动, 用于DFU)  │
└──────────────────────────────────────────┘

第2页: STM32F405主控 + 晶振
┌──────────────────────────────────────────┐
│  STM32F405RGT6 (LQFP64)                  │
│  ├── 8MHz HSE晶振 (负载电容20pF×2)       │
│  ├── 32.768kHz LSE晶振 (RTC)             │
│  ├── 100nF去耦电容 × 8 (每个VDD/VSS对)   │
│  └── 10μF钽电容 × 1 (全局滤波)           │
│                                          │
│  调试接口:                                │
│  ├── SWDIO ──> 4pin排针 (SWD调试口)      │
│  ├── SWCLK ──>                           │
│  ├── GND ──>                             │
│  └── 3.3V ──>                            │
└──────────────────────────────────────────┘

第3页: USB3300高速PHY
┌──────────────────────────────────────────┐
│  USB3300 (QFN-32)                         │
│  ├── ULPI[7:0] <──> STM32F405            │
│  ├── USB DP/DM ──> USB Type-C连接器      │
│  ├── 24MHz晶振 (PHY参考时钟)             │
│  ├── VDD = 3.3V                          │
│  ├── VDDIO = 2.5V (独立LDO供电)          │
│  └── 去耦电容: 100nF×6 + 10μF×2         │
│                                          │
│  注意: USB3300对电源纹波非常敏感!          │
│  去耦电容必须尽量靠近引脚放置              │
└──────────────────────────────────────────┘

第4页: SPI屏幕接口 + I2C舵机接口
┌──────────────────────────────────────────┐
│  GC9A01圆形屏幕 (SPI2接口)               │
│  ├── SPI2_SCK  ── PB13                   │
│  ├── SPI2_MOSI ── PB15                   │
│  ├── LCD_CS    ── PB12 (GPIO片选)        │
│  ├── LCD_DC    ── PA10 (数据/命令)       │
│  ├── LCD_RST   ── PA8  (复位)            │
│  └── LCD_BLK   ── PA6  (背光PWM)        │
│                                          │
│  I2C1总线 (舵机控制)                      │
│  ├── I2C1_SCL ── PB8 (时钟)              │
│  ├── I2C1_SDA ── PB9 (数据)              │
│  ├── 4.7kΩ上拉电阻 × 2 (到3.3V)         │
│  └── 总线连接6个舵机驱动板                │
│                                          │
│  UART1 (调试串口)                         │
│  ├── USART1_TX ── PA9                    │
│  └── USART1_RX ── PA10                   │
└──────────────────────────────────────────┘
```

**原理图阅读练习:**
1. 在原理图上找到8MHz晶振的两个负载电容，确认它们的容值
2. 追踪GC9A01屏幕的SPI信号路径，从STM32到FPC连接器
3. 数一数USB3300周围有多少个去耦电容
4. 找到BOOT0引脚，确认它是上拉还是下拉（决定启动模式）

### 任务2.5: 舵机驱动板与屏幕板原理图 (30分钟)

**舵机驱动板（每块控制1个舵机）:**

```
舵机驱动板 (Servo Driver Board):
┌──────────────────────────────────┐
│                                  │
│  ┌────────────────────────┐      │
│  │  STM32F042P6           │      │
│  │  ARM Cortex-M0 @ 48MHz │      │
│  │  TSSOP-20封装          │      │
│  │                        │      │
│  │  功能:                 │      │
│  │  - I2C从机 (接收命令)  │      │
│  │  - ADC读取电位器       │      │
│  │  - PWM驱动舵机        │      │
│  │  - PID闭环控制        │      │
│  └────────────────────────┘      │
│                                  │
│  ┌──────┐      ┌──────────┐      │
│  │ 电位器│ ADC  │ 舵机PWM  │      │
│  │ (反馈)│──────│ TIM1_CH1 │      │
│  └──────┘      └──────────┘      │
│                                  │
│  I2C地址配置:                    │
│  通过板上的电阻或跳线设置         │
│  舵机0: 0x40                    │
│  舵机1: 0x41                    │
│  舵机2: 0x42                    │
│  舵机3: 0x43                    │
│  舵机4: 0x44                    │
│  舵机5: 0x45                    │
└──────────────────────────────────┘

为什么每个舵机用独立的MCU控制?
1. PID闭环需要高频率采样(1kHz+), 6个舵机共享MCU太吃力
2. 分布式架构降低主控负担
3. 舵机驱动板可以独立工作, 不依赖主控
4. 电位器反馈提供位置闭环, 精度远超开环PWM
```

**GC9A01屏幕板:**

```
GC9A01 1.28" 圆形屏幕模块:
┌──────────────────────────────────┐
│  ┌────────────────────┐          │
│  │    ○ ○ ○ ○ ○       │          │
│  │  ○             ○   │          │
│  │ ○   240×240    ○   │          │
│  │  ○  圆形TFT   ○    │          │
│  │    ○ ○ ○ ○ ○       │          │
│  └────────┬───────────┘          │
│           │ FPC排线连接器         │
│  接口: SPI (4线)                  │
│  ├── SCLK (时钟)                 │
│  ├── MOSI (数据)                 │
│  ├── CS   (片选)                 │
│  ├── DC   (数据/命令)            │
│  ├── RST  (复位)                 │
│  ├── BLK  (背光)                 │
│  ├── VCC  (3.3V)                 │
│  └── GND                         │
│                                  │
│  显示参数:                        │
│  - 分辨率: 240×240               │
│  - 色深: 16-bit RGB565           │
│  - 帧缓冲: 240×240×2 = 115.2KB  │
│  - SPI时钟: 最高20MHz            │
│  - 刷新率: ~30fps @ 20MHz SPI    │
└──────────────────────────────────┘
```

### 任务2.6: 板间连接与通信总线 (20分钟)

**ElectronBot板间连接总图:**

```
ElectronBot 完整连接图:

                    ┌─────────────────┐
                    │   PC端 Unity     │
                    │   (USB Host)     │
                    └────────┬────────┘
                             │ USB 2.0 HS
                             │ (480Mbps)
                    ┌────────┴────────┐
                    │  USB3300 PHY     │
                    │  (ULPI接口)      │
                    └────────┬────────┘
                             │ ULPI 12线
                    ┌────────┴────────┐
                    │ STM32F405RGT6    │
                    │ (主控)           │
                    └──┬────┬────┬────┘
                       │    │    │
              SPI2     │    │I2C1│    UART1
               │       │    │    │       │
    ┌──────────┴──┐   │    │    │   ┌───┴────┐
    │ GC9A01      │   │    │    │   │USB-TTL │
    │ 1.28"圆形屏 │   │    │    │   │调试模块│
    │ 240×240     │   │    │    │   └────────┘
    └─────────────┘   │    │    │
                      │    │    │
              I2C总线(共享)    │
               │    │    │    │
    ┌──────┬───┴─┬──┴─┬──┴─┬──┴─┬──────┐
    │舵机0 │舵机1│舵机2│舵机3│舵机4│ 舵机5│
    │0x40  │0x41 │0x42│0x43│0x44│ 0x45 │
    │(头左)│(头右)│(左臂)│(右臂)│(底座)│(尾巴)│
    └──┬───┘└─┬──┘└─┬──┘└─┬──┘└─┬──┘└──┬───┘
       │      │      │      │      │      │
    ┌──┴──────┴──────┴──────┴──────┴──────┴──┐
    │          机械结构 (3D打印件)             │
    │   头部、手臂、底座、外壳                 │
    └────────────────────────────────────────┘
```

**各通信总线对比:**

| 总线 | 用途 | 速度 | 连接方式 | 线数 |
|------|------|------|----------|------|
| USB HS | PC与MCU通信 | 480Mbps | Type-C | 4 (DP/DM/VBUS/GND) |
| ULPI | MCU与USB PHY | 60MHz×8bit | PCB走线 | 12 |
| SPI2 | GC9A01屏幕 | 最高42MHz | FPC排线 | 8 |
| I2C1 | 6个舵机驱动板 | 400kHz(Fast) | 排线/PCB | 2 (SDA/SCL) |
| UART1 | 调试串口 | 115200bps | 杜邦线 | 2 (TX/RX) |

---

## 下午后半: PCB设计要点与3D打印准备 | PCB Design & 3D Print Prep

### 任务2.7: PCB设计要点 (30分钟)

**ElectronBot PCB设计的关键考量:**

```
PCB设计要点 (ElectronBot特有):

1. USB HS高速信号走线
   ├── USB DP/DM差分对必须等长 (误差<5mil)
   ├── 差分阻抗控制: 90Ω ±10%
   ├── 走线尽量短, 远离数字噪声源
   └── ULPI信号走线也要尽量短且等长

2. 电源完整性
   ├── 每个IC旁边放置0.1μF去耦电容
   ├── USB3300需要多个去耦电容(0.1μF + 1μF + 10μF)
   ├── 舵机供电与MCU供电走线分开
   └── 电源地平面完整, 不要被信号线割断

3. 板间连接
   ├── FPC连接器焊盘需要加大(方便手工焊接)
   ├── I2C总线上拉电阻放在主控板端
   └── 舵机驱动板通过排针或FPC连接

4. 尺寸约束
   ├── 主控板需要嵌入3D打印外壳内
   ├── 舵机驱动板安装在关节附近(体积要小)
   └── GC9A01屏幕板厚度需控制在2mm以内
```

**PCB层数与叠层:**

```
ElectronBot主控板建议: 4层板

层1 (Top):    元件 + 信号走线
层2 (GND):    完整地平面 (参考层)
层3 (Power):  电源平面 (3.3V / 5V分割)
层4 (Bottom): 信号走线 + 少量元件

为什么用4层板?
- USB HS信号需要完整参考平面
- 4层板的地平面提供低阻抗回流路径
- 电源平面降低电源阻抗, 减少纹波
- 2层板做USB HS非常困难, 信号完整性无法保证

舵机驱动板: 2层板即可
- 没有高速信号
- 成本更低
```

### 任务2.8: 3D打印文件准备 (20分钟)

**ElectronBot的3D打印零件清单:**

```
ElectronBot 3D打印零件 (约15-20个):

头部组件:
├── 头部外壳 (上/下两半)
├── 眼睛框架 (固定GC9A01屏幕)
└── 颈部连接件

手臂组件:
├── 左/右上臂外壳
├── 左/右前臂外壳
├── 手掌 (可选)
└── 肩关节连接件

躯干组件:
├── 身体外壳 (前/后两半)
├── 底座
└── 内部支架 (固定PCB)

紧固件:
├── 舵机安装座 × 6
├── 轴承座
└── 线缆通道

打印建议:
├── 材料: PLA (易打印, 精度好)
├── 层高: 0.15-0.2mm
├── 填充: 20-30%
├── 支撑: 部分零件需要
└── 打印时间: 总计约30-50小时
```

**检查STL文件:**
1. 确认所有STL文件完整（用切片软件打开检查）
2. 检查零件尺寸是否合理（用切片软件的测量工具）
3. 确认零件之间能正确配合（如外壳的螺丝孔对齐）
4. 开始打印耗时较长的零件（如外壳），短零件可以后续再打

---

## 今日作业 | Homework

### 必做题
1. 画出ElectronBot完整的系统架构框图，标注:
   - 所有芯片型号（STM32F405, USB3300, STM32F042×6, GC9A01）
   - 所有通信接口（USB HS, ULPI, SPI2, I2C1, UART1）
   - 所有电源轨（5V, 3.3V, 2.5V, 1.2V）
2. 手动计算STM32F405时钟树，验证从8MHz HSE得到168MHz SYSCLK和48MHz USB时钟
3. 在原理图上标注出至少8个关键测试点的位置和预期电压

### 挑战题
1. 阅读USB3300数据手册的ULPI时序图，解释DIR/STP/NXT信号的含义
2. 计算GC9A01在240×240分辨率、RGB565色深下，以30fps刷新需要多少SPI带宽
3. 研究STM32F042P6的数据手册，列出它和STM32F405的主要区别（内核、主频、Flash、外设）

### 思考题
1. 为什么ElectronBot选择分布式舵机控制（每个舵机一个MCU），而不是集中式控制（一个MCU输出6路PWM）？各有什么优缺点？
2. USB高速模式（480Mbps）和全速模式（12Mbps）在实际使用中有什么区别？ElectronBot真的需要480Mbps吗？
3. GC9A01屏幕的帧缓冲需要115KB，而STM32F405只有192KB SRAM。帧缓冲放在哪里？如果全放SRAM会有什么问题？

---

## 明日预告 | Tomorrow's Preview

明天是焊接实战日！你将亲手焊接ElectronBot的PCB——包括STM32F405主控（LQFP64）、USB3300高速PHY（QFN-32）、以及舵机驱动板上的STM32F042（TSSOP-20）。这是整个项目最具挑战性的一天，贴片IC和QFN封装的焊接需要耐心和技巧。做好准备！

Tomorrow is soldering day! You will hand-solder ElectronBot's PCBs -- including the STM32F405 main controller (LQFP64), USB3300 HS PHY (QFN-32), and STM32F042 on the servo driver boards (TSSOP-20). This is the most challenging day of the project -- SMD IC and QFN soldering requires patience and skill. Be prepared!

---

## 参考资源 | References

- [STM32F405 数据手册](https://www.st.com/resource/en/datasheet/stm32f405vg.pdf)
- [STM32F4 参考手册 RM0090](https://www.st.com/resource/en/reference_manual/rm0090-stm32f405415-stm32f407417-stm32f427437-and-stm32f429439-advanced-armbased-32bit-mcus-stmicroelectronics.pdf)
- [USB3300 数据手册](https://www.microchip.com/en-us/product/USB3300)
- [STM32F042 数据手册](https://www.st.com/resource/en/datasheet/stm32f042p6.pdf)
- [GC9A01 数据手册](https://www.buydisplay.com/download/ic/GC9A01A.pdf)
- [ElectronBot 开源仓库](https://github.com/peng-zhihui/ElectronBot)
- [高速PCB设计指南（B站搜索）](https://search.bilibili.com/all?keyword=%E9%AB%98%E9%80%9FPCB%E8%AE%BE%E8%AE%A1)
- [USB 2.0规范简介](https://www.usb.org/document-library/usb-20-specification)

*最后更新：2026-05-27*
