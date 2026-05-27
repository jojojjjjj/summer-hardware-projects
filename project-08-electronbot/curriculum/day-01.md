# Day 01: STM32CubeIDE环境搭建与项目架构认知 | STM32CubeIDE Setup & Project Architecture

> **今日目标:**
> - 了解ElectronBot项目的整体架构和STM32F405芯片特性
> - 掌握ARM Cortex-M4处理器的基本架构概念
> - 安装STM32CubeIDE开发环境并导入ElectronBot固件工程
> - 学习STM32 HAL库基础，完成GPIO控制与UART串口调试
> - 理解ElectronBot固件的代码组织结构
>
> **产出:** STM32CubeIDE环境搭建完成，固件成功编译，串口输出Hello World

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 项目介绍、学员互相认识、ElectronBot实物演示 |
| 09:15 - 10:30 | 知识讲解 | STM32F405芯片介绍、ARM Cortex-M4架构、项目架构概览 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 安装STM32CubeIDE、导入ElectronBot固件工程 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | HAL库GPIO操作、UART串口输出、修改并编译固件 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 认识固件目录结构、阅读关键源文件、添加自定义日志 |
| 16:30 - 17:00 | 总结分享 | 环境搭建经验分享、常见问题总结 |

---

## 上午: STM32F405与开发环境 | Morning: STM32F405 & Dev Environment

### 为什么要学这个? | Why Learn This?

ElectronBot的"大脑"是一颗STM32F405RGT6微控制器——它基于ARM Cortex-M4内核，主频168MHz，内置192KB SRAM和1MB Flash。与之前学过的ESP32不同，STM32是工业界使用最广泛的MCU之一，从无人机到医疗设备无处不在。掌握STM32开发是进入专业嵌入式领域的敲门砖。

The ElectronBot's "brain" is an STM32F405RGT6 microcontroller -- based on the ARM Cortex-M4 core running at 168MHz with 192KB SRAM and 1MB Flash. Unlike the ESP32 you may have used before, STM32 is one of the most widely used MCUs in industry, found everywhere from drones to medical devices. Mastering STM32 development is your gateway to professional embedded systems.

STM32CubeIDE是ST官方推出的一站式集成开发环境，它把Eclipse IDE、GCC交叉编译器和STM32CubeMX配置工具整合在一起，让你无需手动搭建工具链就能开始开发。

STM32CubeIDE is ST's official all-in-one IDE, integrating Eclipse IDE, GCC cross-compiler, and STM32CubeMX configuration tool -- letting you start developing without manually setting up a toolchain.

### 认识STM32F405 | Meet the STM32F405

```
STM32F405RGT6 芯片特性:
├── ARM Cortex-M4F 内核 @ 168MHz
│   └── 单精度浮点运算单元 (FPU)
│   └── DSP指令集 (饱和运算、MAC乘累加)
├── 1MB Flash (程序存储)
├── 192KB SRAM (运行内存)
│   ├── 112KB 主SRAM
│   ├── 16KB SRAM1
│   └── 64KB CCM SRAM (Core Coupled Memory)
├── 时钟系统
│   ├── 外部主HSE: 8MHz (通过PLL倍频到168MHz)
│   ├── 外部低速LSE: 32.768kHz (RTC)
│   └── 内部HSI: 16MHz (备用)
├── 通信接口
│   ├── 3 × SPI (最高42MHz)
│   ├── 3 × I2C (标准/快速模式)
│   ├── 4 × USART + 2 × UART
│   ├── USB 2.0 OTG FS (全速12Mbps)
│   ├── USB 2.0 OTG HS (高速480Mbps, 需外部PHY)
│   └── 2 × CAN
├── 模拟外设
│   ├── 3 × 12-bit ADC (最多24通道)
│   └── 2 × 12-bit DAC
├── 定时器
│   ├── 2 × 高级控制定时器
│   ├── 10 × 通用定时器
│   └── 2 × 基本定时器
└── 封装: LQFP64 (64引脚, 10×10mm)
```

**关键参数记忆口诀:**
- "M四一六八" -- Cortex-M4内核, 168MHz主频
- "一兆闪存一九二内存" -- 1MB Flash, 192KB SRAM
- "三SPI三I2C六串口" -- 3路SPI, 3路I2C, 6路USART/UART
- "全速高速双USB" -- USB FS + USB HS (外部PHY)

### ElectronBot系统架构总览

```
ElectronBot 系统框图:

┌──────────────────────────────────────────────────────┐
│                  ElectronBot 系统架构                  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────────────────────────────────────────┐     │
│  │         主控板 (Main Controller Board)        │     │
│  │  ┌─────────────────────────────────────┐    │     │
│  │  │  STM32F405RGT6                      │    │     │
│  │  │  ARM Cortex-M4F @ 168MHz           │    │     │
│  │  │  1MB Flash + 192KB SRAM            │    │     │
│  │  └──────────┬──────────────────────────┘    │     │
│  │             │                                │     │
│  │  ┌──────────┴──────────┐                     │     │
│  │  │  USB HS + USB3300   │  USB高速通信         │     │
│  │  │  (ULPI接口)         │  与PC端Unity通信     │     │
│  │  └─────────────────────┘                     │     │
│  │                                              │     │
│  │  ┌──────────┐  ┌──────────┐                   │     │
│  │  │ GC9A01   │  │ 舵机控制  │                   │     │
│  │  │ 1.28"圆形│  │ I2C总线   │                   │     │
│  │  │ 240×240  │  │ 6个舵机   │                   │     │
│  │  │ SPI接口  │  │ 独立驱动板│                   │     │
│  │  └──────────┘  └──────────┘                   │     │
│  └─────────────────────────────────────────────┘     │
│                                                      │
│  ┌─────────────────────────────────────────────┐     │
│  │         PC端 (Desktop Application)            │     │
│  │  Unity C# 应用 ──USB──> ElectronBot固件       │     │
│  │  ├── OpenCV 人脸检测 / 姿态估计               │     │
│  │  ├── LLM API 对话系统                        │     │
│  │  └── 语音识别 + 语音合成                      │     │
│  └─────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────┘
```

### 任务1.1: 安装STM32CubeIDE (30分钟)

**步骤:**

1. **下载STM32CubeIDE**
   - 访问 https://www.st.com/en/development-tools/stm32cubeide.html
   - 需要注册ST官网账号（免费注册）
   - 下载Windows版本（约800MB）
   - 如果官网下载慢，可以在B站搜索"STM32CubeIDE下载"寻找国内镜像

2. **安装STM32CubeIDE**
   - 双击安装包，按照向导安装
   - 安装路径建议保持默认（`C:\ST\STM32CubeIDE_1.x.x\`）
   - 安装过程中勾选"安装ST-LINK驱动"
   - 安装完成后重启电脑（确保驱动生效）

3. **验证安装**
   - 启动STM32CubeIDE
   - 选择一个Workspace路径（建议：`C:\Users\你的用户名\STM32CubeIDE\workspace_electronbot`）
   - 等待IDE完全启动，确认左侧有"C/C++ Projects"面板

**预期结果:**
- STM32CubeIDE成功启动，可以看到主界面
- 菜单栏有"STM32"相关选项
- 底部有"Console"和"Terminal"视图

**常见问题:**
- **安装时卡在"Downloading firmware"**: 检查网络连接，或取消该步骤在安装后手动配置
- **启动报错"Java VM not found"**: 重新安装，确保安装路径不含中文字符
- **Windows Defender警告**: STM32CubeIDE是合法软件，选择"仍要运行"即可
- **Workspace路径含中文**: 必须使用纯英文路径，否则编译可能出错

### 任务1.2: 导入ElectronBot固件工程 (30分钟)

**步骤:**

1. **获取ElectronBot固件源码**
   ```powershell
   # 在PowerShell中执行
   cd C:\Users\你的用户名\STM32CubeIDE
   git clone https://github.com/peng-zhihui/ElectronBot.git
   ```
   > 如果GitHub下载慢，可以使用Gitee镜像或直接下载ZIP包解压

2. **导入工程到STM32CubeIDE**
   - 打开STM32CubeIDE
   - 菜单: `File` -> `Import...`
   - 选择 `General` -> `Existing Projects into Workspace`
   - 点击 `Browse...` 选择ElectronBot固件目录中的 `ElectronBot-FW` 子目录
   - 勾选出现的工程，点击 `Finish`

3. **工程结构解析**
   ```
   ElectronBot-FW/
   ├── Core/
   │   ├── Inc/                  # 头文件目录
   │   │   ├── main.h            # 主程序头文件，GPIO和引脚定义
   │   │   ├── stm32f4xx_hal_conf.h  # HAL库配置
   │   │   └── stm32f4xx_it.h   # 中断处理头文件
   │   └── Src/                  # 源文件目录
   │       ├── main.c            # 主程序入口
   │       ├── stm32f4xx_hal_msp.c  # HAL底层初始化（时钟、引脚）
   │       ├── stm32f4xx_it.c   # 中断服务函数
   │       ├── system_stm32f4xx.c  # 系统时钟配置
   │       ├── gpio.c           # GPIO初始化
   │       ├── usart.c          # UART初始化
   │       ├── spi.c            # SPI初始化
   │       ├── usb_host.c       # USB主机配置
   │       └── usb_otg.c        # USB OTG配置
   ├── Drivers/
   │   ├── CMSIS/               # ARM CMSIS库（内核支持）
   │   └── STM32F4xx_HAL_Driver/  # ST HAL库（硬件抽象层）
   ├── Middlewares/
   │   └── ST/                  # USB协议栈等中间件
   ├── USB_DEVICE/              # USB设备应用层代码
   ├── .ioc文件                 # STM32CubeMX配置文件（可视化配置）
   └── ElectronBot-FW.ioc       # 可用CubeMX打开查看完整配置
   ```

4. **尝试编译**
   - 右键项目 -> `Build Project`（或按 `Ctrl+B`）
   - 首次编译需要1-3分钟
   - Console中看到 `Build Finished. 0 errors, 0 warnings` 表示成功

**代码解读 -- main.c结构:**

```c
/* main.c -- ElectronBot固件主程序骨架 */

#include "main.h"
#include "usb_device.h"       // USB设备头文件
#include "usbd_core.h"        // USB设备核心
#include "usbd_desc.h"        // USB描述符

/* HAL库初始化和系统配置 */
void SystemClock_Config(void);    // 时钟树配置（168MHz）
static void MX_GPIO_Init(void);   // GPIO初始化
static void MX_SPI2_Init(void);   // SPI2初始化（GC9A01屏幕）
static void MX_USART1_UART_Init(void); // UART1初始化（调试串口）
static void MX_I2C1_Init(void);   // I2C1初始化（舵机控制）
static void MX_USB_OTG_HS_HCD_Init(void); // USB HS初始化

int main(void)
{
    /* HAL库初始化 */
    HAL_Init();

    /* 配置系统时钟 */
    SystemClock_Config();

    /* 初始化所有外设 */
    MX_GPIO_Init();
    MX_SPI2_Init();
    MX_USART1_UART_Init();
    MX_I2C1_Init();
    MX_USB_OTG_HS_HCD_Init();

    /* 启动USB设备 */
    MX_USB_DEVICE_Init();

    /* 主循环 */
    while (1)
    {
        // ElectronBot主循环逻辑
        // 1. 接收USB数据（来自PC端Unity应用）
        // 2. 解析控制命令
        // 3. 更新舵机位置
        // 4. 刷新屏幕表情
        // 5. 读取传感器数据回传PC
    }
}
```

**预期结果:**
- 固件工程成功导入STM32CubeIDE
- 编译无错误（可能有少量警告，暂不影响）
- 理解工程目录中各文件的作用

**常见问题:**
- **编译报错"cannot find source file"**: 检查是否正确导入了整个工程目录，不要只导入子目录
- **"Toolchain not found"**: STM32CubeIDE自带ARM GCC工具链，如果报此错请重新安装
- **很多Warning**: 原版开源项目的Warning可以暂时忽略，不影响功能

---

## 下午: HAL库基础与串口调试 | Afternoon: HAL Library Basics & UART Debug

### 为什么要学HAL库? | Why Learn HAL?

STM32的HAL（Hardware Abstraction Layer）库是ST官方提供的硬件抽象层。它把寄存器级别的操作封装成易用的C函数，让你不需要背诵每个寄存器的地址就能操控芯片。虽然性能不如直接操作寄存器，但对于大多数应用来说已经足够，而且代码可读性和可移植性大大提高。

The STM32 HAL (Hardware Abstraction Layer) library is ST's official hardware abstraction layer. It wraps register-level operations into easy-to-use C functions, so you don't need to memorize register addresses. While less performant than direct register access, it's sufficient for most applications and offers much better readability and portability.

### 任务1.3: GPIO操作——点亮LED (30分钟)

**步骤:**

1. **理解GPIO**
   GPIO（General Purpose Input/Output）是MCU最基本的接口。每个GPIO引脚可以配置为：
   - 输入模式：读取外部信号（按键、传感器）
   - 输出模式：控制外部设备（LED、继电器）
   - 复用模式：由外设控制（SPI、I2C、UART的引脚）
   - 模拟模式：ADC/DAC输入输出

2. **编写LED闪烁代码**
   在 `main.c` 的 `while(1)` 循环前添加以下代码：

   ```c
   /* ===== LED闪烁测试 ===== */

   /* GPIO操作三步曲:
    * 1. HAL_GPIO_WritePin()   -- 设置高低电平
    * 2. HAL_GPIO_TogglePin()  -- 翻转电平
    * 3. HAL_GPIO_ReadPin()    -- 读取电平
    */

   /* 方法1: 使用WritePin */
   HAL_GPIO_WritePin(GPIOA, GPIO_PIN_6, GPIO_PIN_SET);    // LED亮 (PA6)
   HAL_Delay(500);                                         // 延时500ms
   HAL_GPIO_WritePin(GPIOA, GPIO_PIN_6, GPIO_PIN_RESET);  // LED灭
   HAL_Delay(500);

   /* 方法2: 使用TogglePin (更简洁) */
   HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_6);  // 翻转PA6电平
   HAL_Delay(500);
   ```

3. **在主循环中加入LED闪烁**
   ```c
   /* 在while(1)中加入LED心跳 */
   while (1)
   {
       HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_6);  // 翻转LED
       HAL_Delay(200);                          // 200ms间隔
   }
   ```

**GPIO关键概念:**

| 概念 | 说明 | 示例 |
|------|------|------|
| `GPIOx` | GPIO端口组 (A, B, C, D...) | `GPIOA`, `GPIOB` |
| `GPIO_PIN_x` | 具体引脚编号 | `GPIO_PIN_6` = PA6 |
| `GPIO_PIN_SET` | 高电平 (3.3V) | LED亮 |
| `GPIO_PIN_RESET` | 低电平 (0V) | LED灭 |
| `HAL_Delay(ms)` | 毫秒级阻塞延时 | `HAL_Delay(500)` = 500ms |

**预期结果:**
- 代码编译无错误
- 烧录后（如果有硬件），LED以设定频率闪烁
- 理解GPIO输出控制的基本原理

**常见问题:**
- **LED不亮**: 确认GPIO引脚号和LED连接是否匹配（查看原理图），可能需要上拉或下拉
- **编译报错"GPIO_PIN_6 undeclared"**: 确认已 `#include "main.h"`，其中包含了GPIO定义
- **HAL_Delay不准**: HAL_Delay依赖SysTick定时器，如果SysTick被其他中断占用会不精确

### 任务1.4: UART串口输出Hello World (40分钟)

**为什么要学UART?**
UART（Universal Asynchronous Receiver/Transmitter）是最基本的串口通信方式。在嵌入式开发中，串口是最常用的调试手段——你可以通过串口在电脑上看到MCU的运行状态、变量值、错误信息。没有串口调试，嵌入式开发就像蒙着眼睛走路。

UART is the most basic serial communication method. In embedded development, serial is the primary debugging tool -- you can see MCU status, variable values, and error messages on your PC. Without serial debugging, embedded development is like walking blindfolded.

**步骤:**

1. **实现printf重定向到UART**
   在 `main.c` 中添加以下代码（放在 `/* USER CODE BEGIN 0 */` 和 `/* USER CODE END 0 */` 之间）：

   ```c
   /* USER CODE BEGIN 0 */
   #include <stdio.h>

   /* printf重定向到UART1 -- 让printf输出到串口 */
   #ifdef __GNUC__
   /* GCC编译器（STM32CubeIDE使用GCC） */
   int __io_putchar(int ch)
   {
       HAL_UART_Transmit(&huart1, (uint8_t *)&ch, 1, HAL_MAX_DELAY);
       return ch;
   }
   #else
   /* ARM编译器 */
   int fputc(int ch, FILE *f)
   {
       HAL_UART_Transmit(&huart1, (uint8_t *)&ch, 1, HAL_MAX_DELAY);
       return ch;
   }
   #endif
   /* USER CODE END 0 */
   ```

2. **在main函数中输出Hello World**
   ```c
   /* 在外设初始化之后、主循环之前添加 */
   printf("\r\n========================================\r\n");
   printf("  ElectronBot Firmware v1.0\r\n");
   printf("  MCU: STM32F405RGT6 @ 168MHz\r\n");
   printf("  HAL Driver Version: 0x%02X\r\n", HAL_GetHalVersion());
   printf("  SystemCoreClock: %lu Hz\r\n", SystemCoreClock);
   printf("  Hello World from ElectronBot!\r\n");
   printf("========================================\r\n\r\n");
   ```

3. **在主循环中添加周期性输出**
   ```c
   uint32_t tick_count = 0;

   while (1)
   {
       /* LED心跳 */
       HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_6);

       /* 每5秒打印一次系统状态 */
       if (tick_count % 25 == 0)  // 200ms * 25 = 5秒
       {
           printf("[%lu] System running, tick=%lu\r\n",
                  HAL_GetTick() / 1000, tick_count);
       }

       HAL_Delay(200);
       tick_count++;
   }
   ```

4. **查看串口输出**
   - 连接USB转TTL串口模块到UART1引脚（PA9=TX, PA10=RX）
   - 打开串口终端（STM32CubeIDE内置Terminal / PuTTY / Tera Term）
   - 波特率设置为 `115200`，8数据位，1停止位，无校验
   - 按复位按钮，观察输出

**HAL_UART关键函数:**

| 函数 | 功能 | 是否阻塞 |
|------|------|----------|
| `HAL_UART_Transmit()` | 发送数据（阻塞式） | 是，等待发送完成 |
| `HAL_UART_Receive()` | 接收数据（阻塞式） | 是，等待接收完成 |
| `HAL_UART_Transmit_IT()` | 发送数据（中断式） | 否，后台发送 |
| `HAL_UART_Receive_IT()` | 接收数据（中断式） | 否，后台接收 |
| `HAL_UART_Transmit_DMA()` | 发送数据（DMA式） | 否，DMA搬运 |

**预期结果:**
- 串口终端显示"Hello World from ElectronBot!"
- 每隔5秒打印一次系统运行状态
- LED同步闪烁

**常见问题:**
- **串口无输出**: 检查TX/RX是否接反（MCU的TX连USB转TTL的RX），波特率是否匹配
- **乱码**: 波特率不匹配。确认双方都设为115200
- **编译报错"huart1 undeclared"**: `huart1` 是CubeMX生成的全局变量，确认UART1已在CubeMX中配置
- **只输出第一个字符**: 检查 `__io_putchar` 是否正确实现，确认GCC宏已定义

### 任务1.5: 认识ElectronBot固件结构 (30分钟)

**ElectronBot固件的核心模块:**

```
ElectronBot固件模块划分:

┌─────────────────────────────────────────┐
│              main.c 主循环               │
│  while(1): USB接收 -> 解析 -> 执行       │
└─────────────┬───────────────────────────┘
              │
   ┌──────────┼──────────┬──────────────┐
   ▼          ▼          ▼              ▼
┌──────┐ ┌──────┐ ┌──────────┐ ┌──────────┐
│ USB  │ │ SPI  │ │  I2C     │ │ UART     │
│通信层│ │屏幕层│ │ 舵机控制 │ │ 调试输出 │
│      │ │      │ │          │ │          │
│USB HS│ │GC9A01│ │6个舵机   │ │printf    │
│CDC/  │ │240x240│ │PID控制   │ │日志      │
│自定义│ │圆形屏│ │运动学    │ │          │
└──────┘ └──────┘ └──────────┘ └──────────┘

数据流:
PC端Unity应用
    │
    ▼ (USB HS 高速传输)
STM32F405 接收命令帧
    │
    ├──> 解析表情数据 ──> SPI发送到GC9A01屏幕
    ├──> 解析关节角度 ──> I2C发送到各舵机驱动板
    └──> 回传传感器数据 ──> USB发送到PC端
```

**关键源文件导读:**

| 文件 | 功能 | 你需要关注的重点 |
|------|------|-----------------|
| `main.c` | 主循环和初始化 | 外设初始化顺序、主循环逻辑 |
| `gpio.c` | GPIO配置 | 哪些引脚分配给了什么功能 |
| `spi.c` | SPI配置 | SPI2时钟速率、GC9A01通信参数 |
| `usart.c` | UART配置 | 调试串口波特率和引脚 |
| `usb_otg.c` | USB HS配置 | USB3300 ULPI接口配置 |
| `stm32f4xx_hal_msp.c` | MSP回调 | 时钟使能、引脚复用配置 |

**阅读练习:**
1. 打开 `.ioc` 文件（如果有的话），这是STM32CubeMX的可视化配置
2. 在 `main.c` 中找到 `SystemClock_Config()` 函数，理解168MHz时钟是如何配置的
3. 在 `gpio.c` 中找到GC9A01屏幕的CS、DC、RESET引脚分别是哪些GPIO

---

## 今日作业 | Homework

### 必做题
1. 完成STM32CubeIDE安装，确保ElectronBot固件工程能编译通过（0 errors）
2. 实现printf重定向到UART，串口输出"Hello World from ElectronBot!"
3. 添加LED闪烁代码，理解HAL_GPIO_TogglePin的使用
4. 画出ElectronBot固件的模块框图（手画即可），标注各模块使用的外设接口

### 挑战题
1. 修改串口输出，每秒打印一次SysTick计数值（提示：使用 `HAL_GetTick()`）
2. 阅读 `SystemClock_Config()` 函数，画出STM32F405从8MHz HSE到168MHz SYSCLK的时钟路径
3. 尝试使用中断方式接收UART数据（`HAL_UART_Receive_IT`），收到字符后原样回发

### 思考题
1. STM32的HAL库和直接操作寄存器相比，各有什么优缺点？什么场景下需要直接操作寄存器？
2. ElectronBot使用USB HS而不是USB FS与PC通信，为什么？高速USB在全速USB基础上增加了什么？
3. 192KB SRAM对于ElectronBot的运行是否够用？主要哪些功能会占用SRAM（帧缓冲？USB缓冲？栈空间？）

---

## 明日预告 | Tomorrow's Preview

明天我们将深入ElectronBot的硬件世界——阅读STM32F405数据手册和ElectronBot原理图，分析时钟树、电源管理和USB HS PHY电路。下午将学习PCB设计要点，为Day 3的焊接实战做准备。你需要开始"像硬件工程师一样思考"。

Tomorrow we dive into ElectronBot's hardware -- reading the STM32F405 datasheet and ElectronBot schematics, analyzing the clock tree, power management, and USB HS PHY circuit. In the afternoon we cover PCB design essentials to prepare for Day 3's soldering session. You need to start "thinking like a hardware engineer."

---

## 参考资源 | References

- [STM32CubeIDE 官方下载页面](https://www.st.com/en/development-tools/stm32cubeide.html)
- [STM32F405 数据手册](https://www.st.com/resource/en/datasheet/stm32f405vg.pdf)
- [STM32F4 HAL库用户手册](https://www.st.com/resource/en/user_manual/um1725-description-of-stm32f4-hal-and-lowlayer-drivers-stmicroelectronics.pdf)
- [STM32CubeMX 入门教程（B站搜索）](https://search.bilibili.com/all?keyword=STM32CubeMX%20%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B)
- [ElectronBot 开源仓库（稚晖君）](https://github.com/peng-zhihui/ElectronBot)
- [ARM Cortex-M4 技术参考手册](https://developer.arm.com/documentation/ddi0439/latest/)
- [STM32 HAL库printf重定向教程](https://search.bilibili.com/all?keyword=STM32%20printf%E9%87%8D%E5%AE%9A%E5%90%91)

*最后更新：2026-05-27*
