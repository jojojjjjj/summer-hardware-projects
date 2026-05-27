# Day 05: USB设备开发与环形屏幕驱动 | USB Device Development & Round Screen Driver

> **今日目标:**
> - 理解STM32 USB HS（高速USB）原理与USB3300 PHY芯片驱动
> - 掌握USB CDC类设备的开发方法，实现与PC的虚拟串口通信
> - 学习SPI总线协议，驱动GC9A01圆形LCD显示屏
> - 掌握圆形坐标系的像素绘制、图片显示与文字渲染
>
> **产出:** ElectronBot通过USB CDC与PC建立虚拟串口通信，GC9A01圆形屏幕成功显示彩色图案和文字

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间回顾 | 回顾Day 4组装成果，检查舵机响应与硬件连接 |
| 09:15 - 10:30 | 知识讲解 | USB协议栈原理、USB描述符、CDC类设备、SPI总线协议 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | USB CDC设备初始化、PC端驱动安装与通信测试 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | GC9A01 SPI驱动开发、像素绘制、圆形坐标系概念 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 图片显示、文字渲染、屏幕与USB通信联调 |
| 16:30 - 17:00 | 总结分享 | 今日成果展示——屏幕上显示第一张图案 |

---

## 上午: USB CDC设备开发 | Morning: USB CDC Device Development

### 为什么要学这个? | Why Learn This?

USB（Universal Serial Bus）是ElectronBot与PC通信的核心通道。所有的表情数据、舵机控制指令、传感器数据都通过USB传输。USB CDC（Communications Device Class）类让ElectronBot在PC上枚举为一个虚拟串口，不需要写专门的PC端USB驱动程序，简化了开发。理解USB协议栈是嵌入式进阶开发者的必备技能。

USB is the core communication channel between ElectronBot and the PC. All expression data, servo commands, and sensor data travel via USB. The USB CDC class makes ElectronBot enumerate as a virtual serial port on the PC, eliminating the need for custom USB drivers and simplifying development. Understanding the USB protocol stack is an essential skill for advanced embedded developers.

### 任务5.1: USB HS原理与USB3300驱动 (40分钟)

STM32F4系列芯片内置了USB OTG HS（High Speed）控制器，但HS模式需要外部PHY（Physical Layer）芯片。ElectronBot使用USB3300 ULPI PHY芯片实现480Mbps高速USB通信。

The STM32F4 has a built-in USB OTG HS controller, but HS mode requires an external PHY chip. ElectronBot uses the USB3300 ULPI PHY for 480Mbps high-speed USB communication.

**USB通信架构:**
```
PC (Host) ←─── USB Cable ───→ USB3300 (PHY) ←── ULPI ──→ STM32F4 (USB OTG HS)
                                         ↑
                                    USB3300 是物理层芯片，
                                    负责将数字信号转换为USB差分信号
```

**USB描述符核心概念:**

| 描述符类型 | 作用 | 说明 |
|-----------|------|------|
| Device Descriptor | 设备身份 | 厂商ID(VID)、产品ID(PID)、USB版本 |
| Configuration Descriptor | 配置描述 | 设备支持的配置（通常1个） |
| Interface Descriptor | 接口描述 | CDC类定义了2个接口：通信+数据 |
| Endpoint Descriptor | 端点描述 | 数据传输通道（IN=设备→主机，OUT=主机→设备） |

> **端点(Endpoint)是什么？** 可以理解为USB通信的"管道"。USB CDC设备通常需要3个端点：1个控制端点(EP0)用于设备枚举，1个批量IN端点用于发送数据到PC，1个批量OUT端点用于接收PC数据。另外还需要1个中断IN端点用于发送串口状态信息。

```c
/* usb_descriptors.c — USB CDC设备描述符 (简化版) */
/* usb_descriptors.c — USB CDC Device Descriptors (simplified) */

#include "usbd_core.h"
#include "usbd_desc.h"

// 设备描述符 | Device Descriptor
__ALIGN_BEGIN uint8_t USBD_DeviceDesc[USB_LEN_DEV_DESC] __ALIGN_END = {
    0x12,                       /* bLength: 描述符长度 | Descriptor size */
    USB_DESC_TYPE_DEVICE,       /* bDescriptorType: 设备描述符 | Device descriptor */
    0x00,                       /* bcdUSB: USB 2.0 (低字节) */
    0x02,                       /* bcdUSB: USB 2.0 (高字节) */
    0x02,                       /* bDeviceClass: CDC类 | CDC class */
    0x00,                       /* bDeviceSubClass */
    0x00,                       /* bDeviceProtocol */
    USB_MAX_EP0_SIZE,           /* bMaxPacketSize: EP0最大包大小 (64字节) */
    LOBYTE(USBD_VID),           /* idVendor: 厂商ID (低字节) */
    HIBYTE(USBD_VID),           /* idVendor: 厂商ID (高字节) */
    LOBYTE(USBD_PID),           /* idProduct: 产品ID (低字节) */
    HIBYTE(USBD_PID),           /* idProduct: 产品ID (高字节) */
    0x00,                       /* bcdDevice: 设备版本 */
    0x02,
    USBD_IDX_MFC_STR,           /* iManufacturer: 厂商字符串索引 */
    USBD_IDX_PRODUCT_STR,       /* iProduct: 产品字符串索引 */
    USBD_IDX_SERIAL_STR,        /* iSerialNumber: 序列号索引 */
    USBD_MAX_NUM_CONFIGURATION  /* bNumConfigurations: 配置数量 */
};

// 字符串描述符 — PC端显示的设备名称 | String descriptor — device name shown on PC
__ALIGN_BEGIN uint8_t USBD_StrDesc[USBD_MAX_STR_DESC_SIZ] __ALIGN_END;
```

**预期结果:**
- 理解USB通信的分层架构（设备→配置→接口→端点）
- 理解USB3300 PHY芯片在HS模式中的作用
- 理解CDC类为什么需要2个接口（通信+数据）

**常见问题:**
- **USB设备不被PC识别**：检查USB3300的ULPI引脚连接是否正确（12根数据线+时钟+控制信号），焊接短路或虚焊是最常见的原因
- **设备管理器中显示"未知设备"**：VID/PID未正确配置，或描述符格式有误

### 任务5.2: USB CDC类设备开发 (50分钟)

使用STM32 USB Device Library开发CDC类设备。在STM32CubeIDE中通过CubeMX配置USB_OTG_HS为Device模式，并选择CDC类。

Use the STM32 USB Device Library to develop a CDC class device. Configure USB_OTG_HS in Device mode via CubeMX in STM32CubeIDE and select the CDC class.

**CubeMX配置步骤:**
```
1. 打开 .ioc 文件
2. Connectivity → USB_OTG_HS → Mode: Device_Only
3. Middleware → USB_DEVICE → Class For FS IP: Communication Device Class
4. 时钟配置: 确保USB时钟为48MHz (HS模式需要)
5. 生成代码 (Generate Code)
```

```c
/* usb_cdc_if.c — USB CDC通信接口实现 */
/* usb_cdc_if.c — USB CDC Communication Interface */

#include "usb_device.h"
#include "usbd_core.h"
#include "usbd_cdc.h"

// 接收缓冲区 | Receive buffer
#define APP_RX_DATA_SIZE  256
static uint8_t UserRxBuffer[APP_RX_DATA_SIZE];
static uint8_t UserTxBuffer[APP_RX_DATA_SIZE];

// CDC接收回调 — PC发送数据时触发 | CDC receive callback — triggered when PC sends data
static int8_t CDC_Receive_HS(uint8_t *Buf, uint32_t *Len)
{
    // 处理从PC接收到的数据 | Process data received from PC
    uint32_t len = *Len;

    // 示例：回显收到的数据 (Echo) | Example: echo received data
    CDC_Transmit_HS(Buf, len);

    // 准备接收下一包数据 | Ready for next reception
    USBD_CDC_SetRxBuffer(&hUsbDeviceHS, &Buf[0]);
    USBD_CDC_ReceivePacket(&hUsbDeviceHS);

    return USBD_OK;
}

// 发送数据到PC | Send data to PC
uint8_t CDC_SendData(uint8_t *data, uint32_t len)
{
    uint8_t result = USBD_OK;

    // 等待上一次发送完成 | Wait for previous transfer to complete
    uint32_t timeout = 1000;
    while (hUsbDeviceHS.dev_state != USBD_STATE_CONFIGURED && timeout--) {
        HAL_Delay(1);
    }

    // 复制数据到发送缓冲区 | Copy data to TX buffer
    if (len > APP_RX_DATA_SIZE) len = APP_RX_DATA_SIZE;
    memcpy(UserTxBuffer, data, len);

    result = CDC_Transmit_HS(UserTxBuffer, len);
    return result;
}

// USB CDC初始化 | USB CDC Initialization
void USB_CDC_Init(void)
{
    // USB设备初始化由MX_USB_DEVICE_Init()自动完成
    // USB device init is done automatically by MX_USB_DEVICE_Init()
    // 这里注册自定义回调 | Register custom callbacks here
}
```

**环形缓冲区(Ring Buffer)设计:**

当USB高速接收数据时，数据处理速度可能跟不上接收速度，需要环形缓冲区暂存数据。

When receiving high-speed USB data, processing may lag behind reception, requiring a ring buffer for temporary storage.

```c
/* ring_buffer.h — 环形缓冲区 */
/* ring_buffer.h — Ring Buffer */

#define RING_BUF_SIZE  1024

typedef struct {
    uint8_t  buffer[RING_BUF_SIZE];
    volatile uint16_t head;   // 写指针 | Write pointer
    volatile uint16_t tail;   // 读指针 | Read pointer
} RingBuffer_t;

// 写入一个字节 | Write one byte
static inline void RingBuf_Write(RingBuffer_t *rb, uint8_t data)
{
    rb->buffer[rb->head] = data;
    rb->head = (rb->head + 1) % RING_BUF_SIZE;
}

// 读取一个字节 | Read one byte
static inline uint8_t RingBuf_Read(RingBuffer_t *rb)
{
    uint8_t data = rb->buffer[rb->tail];
    rb->tail = (rb->tail + 1) % RING_BUF_SIZE;
    return data;
}

// 缓冲区是否为空 | Is buffer empty?
static inline uint8_t RingBuf_IsEmpty(RingBuffer_t *rb)
{
    return (rb->head == rb->tail);
}

// 缓冲区可用数据量 | Available data count
static inline uint16_t RingBuf_Available(RingBuffer_t *rb)
{
    return (rb->head - rb->tail + RING_BUF_SIZE) % RING_BUF_SIZE;
}
```

**PC端驱动安装:**

ElectronBot使用USB CDC类，在Windows 10/11上通常免驱。插入USB后，设备管理器中会出现在"端口(COM和LPT)"下，显示为"USB串行设备(COMx)"。

ElectronBot uses the USB CDC class, which is driver-free on Windows 10/11. After plugging in USB, it appears under "Ports (COM & LPT)" in Device Manager as "USB Serial Device (COMx)".

**验证通信的步骤:**
1. 用USB线连接ElectronBot与PC
2. 打开设备管理器，确认出现COM端口
3. 使用PuTTY或Tera Term打开该COM端口（波特率任意，CDC忽略波特率）
4. 发送任意字符，应收到回显

**预期结果:**
- ElectronBot通过USB连接PC后被识别为虚拟串口
- 使用串口工具发送数据能收到回显
- 理解环形缓冲区在高速数据传输中的作用

**常见问题:**
- **PC提示"USB设备无法识别"**：检查USB3300的24MHz晶振是否起振，ULPI数据线D0-D7是否有短路
- **COM端口出现但无法打开**：检查CDC初始化中`USBD_CDC_ReceivePacket`是否被正确调用
- **数据丢失或乱序**：接收回调中没有及时调用`USBD_CDC_ReceivePacket`准备下一次接收

---

## 下午: GC9A01圆形LCD驱动 | Afternoon: GC9A01 Round LCD Driver

### 为什么要学这个? | Why Learn This?

ElectronBot最具辨识度的特征就是它"眼睛"——一块1.28英寸的圆形LCD屏幕。这块屏幕使用GC9A01控制器，通过SPI接口驱动。圆形屏幕带来一个独特的挑战：我们不能使用传统的矩形坐标系，需要理解极坐标和圆形裁剪。屏幕是ElectronBot的"脸面"，是表情动画系统的硬件基础。

ElectronBot's most distinctive feature is its "eyes" -- a 1.28-inch round LCD screen. This screen uses the GC9A01 controller, driven via the SPI interface. The round screen presents a unique challenge: we can't use a traditional rectangular coordinate system and need to understand polar coordinates and circular clipping. The screen is ElectronBot's "face" and the hardware foundation of the expression animation system.

### 任务5.3: GC9A01 SPI驱动初始化 (40分钟)

GC9A01是一颗240x240像素的圆形LCD控制器芯片，使用SPI接口通信。ElectronBot使用STM32的SPI外设（建议SPI1或SPI2）连接。

The GC9A01 is a 240x240 pixel round LCD controller using SPI communication. ElectronBot connects it via the STM32 SPI peripheral (recommended SPI1 or SPI2).

**硬件连接:**
```
GC9A01 引脚    →    STM32F4 引脚    →    功能说明
────────────────────────────────────────────────────
VCC             →    3.3V            →    电源
GND             →    GND             →    地
SCL (SCK)       →    PA5 (SPI1_SCK) →    SPI时钟
SDA (MOSI)      →    PA7 (SPI1_MOSI)→    SPI数据
RES (Reset)     →    PA4             →    硬件复位
DC (Data/Cmd)   →    PA3             →    数据/命令选择
CS (Chip Select)→    PA2             →    片选（低有效）
BL (Backlight)  →    PA1             →    背光控制
```

```c
/* gc9a01.h — GC9A01圆形LCD驱动 */
/* gc9a01.h — GC9A01 Round LCD Driver */

#ifndef GC9A01_H
#define GC9A01_H

#include "stm32f4xx_hal.h"
#include <stdint.h>

// 屏幕尺寸 | Screen dimensions
#define GC9A01_WIDTH     240
#define GC9A01_HEIGHT    240
#define GC9A01_CENTER_X  120
#define GC9A01_CENTER_Y  120
#define GC9A01_RADIUS    120

// 引脚定义 | Pin definitions
#define GC9A01_CS_GPIO_PORT   GPIOA
#define GC9A01_CS_GPIO_PIN    GPIO_PIN_2
#define GC9A01_DC_GPIO_PORT   GPIOA
#define GC9A01_DC_GPIO_PIN    GPIO_PIN_3
#define GC9A01_RES_GPIO_PORT  GPIOA
#define GC9A01_RES_GPIO_PIN   GPIO_PIN_4
#define GC9A01_BL_GPIO_PORT   GPIOA
#define GC9A01_BL_GPIO_PIN    GPIO_PIN_1

// 引脚操作宏 | Pin operation macros
#define GC9A01_CS_LOW()   HAL_GPIO_WritePin(GC9A01_CS_GPIO_PORT,  GC9A01_CS_GPIO_PIN,  GPIO_PIN_RESET)
#define GC9A01_CS_HIGH()  HAL_GPIO_WritePin(GC9A01_CS_GPIO_PORT,  GC9A01_CS_GPIO_PIN,  GPIO_PIN_SET)
#define GC9A01_DC_LOW()   HAL_GPIO_WritePin(GC9A01_DC_GPIO_PORT,  GC9A01_DC_GPIO_PIN,  GPIO_PIN_RESET) // Command
#define GC9A01_DC_HIGH()  HAL_GPIO_WritePin(GC9A01_DC_GPIO_PORT,  GC9A01_DC_GPIO_PIN,  GPIO_PIN_SET)   // Data
#define GC9A01_RES_LOW()  HAL_GPIO_WritePin(GC9A01_RES_GPIO_PORT, GC9A01_RES_GPIO_PIN, GPIO_PIN_RESET)
#define GC9A01_RES_HIGH() HAL_GPIO_WritePin(GC9A01_RES_GPIO_PORT, GC9A01_RES_GPIO_PIN, GPIO_PIN_SET)
#define GC9A01_BL_ON()    HAL_GPIO_WritePin(GC9A01_BL_GPIO_PORT,  GC9A01_BL_GPIO_PIN,  GPIO_PIN_SET)
#define GC9A01_BL_OFF()   HAL_GPIO_WritePin(GC9A01_BL_GPIO_PORT,  GC9A01_BL_GPIO_PIN,  GPIO_PIN_RESET)

// 颜色定义 (RGB565格式) | Color definitions (RGB565 format)
#define COLOR_BLACK     0x0000
#define COLOR_WHITE     0xFFFF
#define COLOR_RED       0xF800
#define COLOR_GREEN     0x07E0
#define COLOR_BLUE      0x001F
#define COLOR_YELLOW    0xFFE0
#define COLOR_CYAN      0x07FF
#define COLOR_MAGENTA   0xF81F
#define COLOR_ORANGE    0xFD20

// 函数声明 | Function declarations
void GC9A01_Init(void);
void GC9A01_SetWindow(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2);
void GC9A01_FillColor(uint32_t color);
void GC9A01_DrawPixel(uint16_t x, uint16_t y, uint16_t color);
void GC9A01_FillArea(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t color);

#endif // GC9A01_H
```

```c
/* gc9a01.c — GC9A01驱动实现 */
/* gc9a01.c — GC9A01 Driver Implementation */

#include "gc9a01.h"

extern SPI_HandleTypeDef hspi1;  // CubeMX生成的SPI句柄 | CubeMX-generated SPI handle

// SPI发送单字节 | Send single byte via SPI
static void GC9A01_SPI_Send(uint8_t data)
{
    GC9A01_CS_LOW();
    HAL_SPI_Transmit(&hspi1, &data, 1, HAL_MAX_DELAY);
    GC9A01_CS_HIGH();
}

// 发送命令 | Send command
static void GC9A01_WriteCmd(uint8_t cmd)
{
    GC9A01_DC_LOW();    // DC=0: 命令模式 | DC=0: Command mode
    GC9A01_SPI_Send(cmd);
}

// 发送数据 | Send data
static void GC9A01_WriteData(uint8_t data)
{
    GC9A01_DC_HIGH();   // DC=1: 数据模式 | DC=1: Data mode
    GC9A01_SPI_Send(data);
}

// GC9A01初始化序列 | GC9A01 Initialization Sequence
void GC9A01_Init(void)
{
    // 1. 硬件复位 | Hardware reset
    GC9A01_RES_HIGH();
    HAL_Delay(10);
    GC9A01_RES_LOW();
    HAL_Delay(50);
    GC9A01_RES_HIGH();
    HAL_Delay(100);

    // 2. 软件初始化命令序列 | Software init command sequence
    // 这些命令来自GC9A01数据手册的推荐初始化序列
    // These commands come from the GC9A01 datasheet recommended init sequence

    GC9A01_WriteCmd(0xEF);
    GC9A01_WriteData(0x00);

    GC9A01_WriteCmd(0xEB);
    GC9A01_WriteData(0x14);

    GC9A01_WriteCmd(0xFE);
    GC9A01_WriteCmd(0xEF);

    GC9A01_WriteCmd(0xEB);
    GC9A01_WriteData(0x14);

    GC9A01_WriteCmd(0x84);
    GC9A01_WriteData(0x40);

    GC9A01_WriteCmd(0x85);
    GC9A01_WriteData(0xFF);

    GC9A01_WriteCmd(0x86);
    GC9A01_WriteData(0xFF);

    GC9A01_WriteCmd(0x87);
    GC9A01_WriteData(0xFF);

    GC9A01_WriteCmd(0x88);
    GC9A01_WriteData(0x0A);

    GC9A01_WriteCmd(0x89);
    GC9A01_WriteData(0x21);

    GC9A01_WriteCmd(0x8A);
    GC9A01_WriteData(0x00);

    GC9A01_WriteCmd(0x8B);
    GC9A01_WriteData(0x80);

    GC9A01_WriteCmd(0x8C);
    GC9A01_WriteData(0x01);

    GC9A01_WriteCmd(0x8D);
    GC9A01_WriteData(0x01);

    GC9A01_WriteCmd(0x8E);
    GC9A01_WriteData(0xFF);

    GC9A01_WriteCmd(0x8F);
    GC9A01_WriteData(0xFF);

    // Memory Data Access Control (MADCTL)
    GC9A01_WriteCmd(0x36);
    GC9A01_WriteData(0x48);  // RGB顺序与行列方向 | RGB order and row/column direction

    // Pixel Format: 16-bit/pixel (RGB565)
    GC9A01_WriteCmd(0x3A);
    GC9A01_WriteData(0x05);  // 05 = 16-bit RGB565

    // 显示开 | Display ON
    GC9A01_WriteCmd(0x29);
    HAL_Delay(50);

    // 开启背光 | Turn on backlight
    GC9A01_BL_ON();
}

// 设置显示窗口 | Set display window
void GC9A01_SetWindow(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2)
{
    GC9A01_WriteCmd(0x2A);  // Column Address Set
    GC9A01_WriteData(x1 >> 8);
    GC9A01_WriteData(x1 & 0xFF);
    GC9A01_WriteData(x2 >> 8);
    GC9A01_WriteData(x2 & 0xFF);

    GC9A01_WriteCmd(0x2B);  // Row Address Set
    GC9A01_WriteData(y1 >> 8);
    GC9A01_WriteData(y1 & 0xFF);
    GC9A01_WriteData(y2 >> 8);
    GC9A01_WriteData(y2 & 0xFF);

    GC9A01_WriteCmd(0x2C);  // Memory Write
}

// 全屏填充颜色 | Fill entire screen with color
void GC9A01_FillColor(uint32_t color)
{
    uint16_t rgb565 = (uint16_t)color;
    uint8_t hi = rgb565 >> 8;
    uint8_t lo = rgb565 & 0xFF;

    GC9A01_SetWindow(0, 0, GC9A01_WIDTH - 1, GC9A01_HEIGHT - 1);

    GC9A01_DC_HIGH();  // 数据模式 | Data mode
    GC9A01_CS_LOW();

    // 240x240 = 57600 像素，每个像素2字节
    // 240x240 = 57600 pixels, 2 bytes each
    for (uint32_t i = 0; i < GC9A01_WIDTH * GC9A01_HEIGHT; i++) {
        HAL_SPI_Transmit(&hspi1, &hi, 1, HAL_MAX_DELAY);
        HAL_SPI_Transmit(&hspi1, &lo, 1, HAL_MAX_DELAY);
    }

    GC9A01_CS_HIGH();
}
```

> **RGB565格式说明:** GC9A01使用16位色（RGB565），其中红色5位、绿色6位、蓝色5位。从24位RGB888转换公式：`RGB565 = ((R & 0xF8) << 8) | ((G & 0xFC) << 3) | (B >> 3)`

**预期结果:**
- GC9A01屏幕成功初始化，背光亮起
- 屏幕填充指定颜色（如纯红、纯蓝）
- 理解SPI DC引脚区分命令和数据的原理

**常见问题:**
- **屏幕白屏不显示**：检查SPI时钟极性/相位配置（GC9A01使用SPI Mode 0：CPOL=0, CPHA=0）
- **颜色不对（红蓝反转）**：MADCTL寄存器(0x36)的RGB位配置错误，尝试修改为0x00或0x08
- **画面偏移或撕裂**：初始化序列不完整，检查是否遗漏了GC9A01的特殊解锁命令(0xFE/0xEF)

### 任务5.4: 圆形坐标系与像素绘制 (40分钟)

圆形屏幕的绘制需要考虑圆形裁剪。虽然GC9A01的显存是240x240的方形区域，但只有以中心为圆心、120像素为半径的圆形区域是可见的。

Drawing on a round screen requires circular clipping. Although the GC9A01's framebuffer is a 240x240 square, only the circular area centered at (120,120) with a 120-pixel radius is visible.

```c
/* gc9a01_draw.c — 绘图函数实现 */
/* gc9a01_draw.c — Drawing Functions Implementation */

#include "gc9a01.h"
#include <math.h>

// 判断像素是否在圆形显示区域内 | Check if pixel is within circular display area
static inline int isInCircle(int16_t x, int16_t y)
{
    int32_t dx = x - GC9A01_CENTER_X;
    int32_t dy = y - GC9A01_CENTER_Y;
    return (dx * dx + dy * dy) <= (GC9A01_RADIUS * GC9A01_RADIUS);
}

// 绘制单个像素 | Draw single pixel
void GC9A01_DrawPixel(uint16_t x, uint16_t y, uint16_t color)
{
    if (x >= GC9A01_WIDTH || y >= GC9A01_HEIGHT) return;
    if (!isInCircle(x, y)) return;  // 圆外像素不绘制 | Skip pixels outside circle

    GC9A01_SetWindow(x, y, x, y);
    uint8_t hi = color >> 8;
    uint8_t lo = color & 0xFF;

    GC9A01_DC_HIGH();
    GC9A01_CS_LOW();
    HAL_SPI_Transmit(&hspi1, &hi, 1, HAL_MAX_DELAY);
    HAL_SPI_Transmit(&hspi1, &lo, 1, HAL_MAX_DELAY);
    GC9A01_CS_HIGH();
}

// 绘制圆形（Bresenham算法，不需要浮点运算）
// Draw circle using Bresenham's algorithm (no floating-point needed)
void GC9A01_DrawCircle(uint16_t cx, uint16_t cy, uint16_t r, uint16_t color)
{
    int x = 0;
    int y = r;
    int d = 3 - 2 * r;

    while (x <= y) {
        // 8对称点绘制 | Draw 8 symmetric points
        GC9A01_DrawPixel(cx + x, cy + y, color);
        GC9A01_DrawPixel(cx - x, cy + y, color);
        GC9A01_DrawPixel(cx + x, cy - y, color);
        GC9A01_DrawPixel(cx - x, cy - y, color);
        GC9A01_DrawPixel(cx + y, cy + x, color);
        GC9A01_DrawPixel(cx - y, cy + x, color);
        GC9A01_DrawPixel(cx + y, cy - x, color);
        GC9A01_DrawPixel(cx - y, cy - x, color);

        if (d < 0) {
            d += 4 * x + 6;
        } else {
            d += 4 * (x - y) + 10;
            y--;
        }
        x++;
    }
}

// 填充圆形 | Fill circle
void GC9A01_FillCircle(uint16_t cx, uint16_t cy, uint16_t r, uint16_t color)
{
    for (int16_t y = -r; y <= r; y++) {
        for (int16_t x = -r; x <= r; x++) {
            if (x * x + y * y <= r * r) {
                GC9A01_DrawPixel(cx + x, cy + y, color);
            }
        }
    }
}

// 绘制直线（Bresenham算法）| Draw line (Bresenham's algorithm)
void GC9A01_DrawLine(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t color)
{
    int dx = abs((int)x2 - (int)x1);
    int dy = abs((int)y2 - (int)y1);
    int sx = (x1 < x2) ? 1 : -1;
    int sy = (y1 < y2) ? 1 : -1;
    int err = dx - dy;

    while (1) {
        GC9A01_DrawPixel(x1, y1, color);
        if (x1 == x2 && y1 == y2) break;
        int e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x1 += sx; }
        if (e2 < dx)  { err += dx; y1 += sy; }
    }
}
```

**圆形坐标系概念图:**
```
        圆形屏幕坐标系 | Round Screen Coordinate System

              (0,0)
                ┌─────────────┐
                │   不可见区域  │ ← 方形显存，四角不可见
                │  ┌───────┐  │    Square FB, corners invisible
                │  │  ╭───╮ │  │
                │  │  │ ● │ │  │ ← (120,120) 中心点 | Center
                │  │  ╰───╯ │  │
                │  └───────┘  │
                │   半径=120px │
                └─────────────┘
                            (239,239)

极坐标转换 | Polar coordinate conversion:
  x = cx + r * cos(angle)
  y = cy + r * sin(angle)
```

**预期结果:**
- 在圆形屏幕上绘制不同大小和颜色的圆形
- 绘制直线和填充圆形
- 理解圆形屏幕的裁剪原理

**常见问题:**
- **绘制速度很慢**：逐像素SPI发送效率太低，后面会用SPI DMA批量传输优化
- **四角出现多余像素**：`isInCircle`的判断条件有误，确认使用`<=`而非`<`

### 任务5.5: 图片显示与文字渲染 (40分钟)

为了在圆形屏幕上显示完整的图像，我们需要使用SPI DMA批量传输数据，并掌握基本的文字渲染方法。

To display complete images on the round screen, we need SPI DMA bulk transfer and basic text rendering.

```c
/* gc9a01_image.c — 图片与文字显示 */
/* gc9a01_image.c — Image & Text Display */

#include "gc9a01.h"

// 使用DMA批量填充区域（高速传输）| Fill area using DMA bulk transfer (high-speed)
void GC9A01_FillArea_DMA(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t color)
{
    GC9A01_SetWindow(x1, y1, x2, y2);

    uint32_t total_pixels = (uint32_t)(x2 - x1 + 1) * (y2 - y1 + 1);
    uint8_t hi = color >> 8;
    uint8_t lo = color & 0xFF;

    GC9A01_DC_HIGH();
    GC9A01_CS_LOW();

    // 构建发送缓冲区（交替高低字节）| Build TX buffer (alternating hi/lo bytes)
    // 对于纯色填充，可以重复发送相同的两字节
    for (uint32_t i = 0; i < total_pixels; i++) {
        HAL_SPI_Transmit_DMA(&hspi1, &hi, 1);
        HAL_SPI_Transmit_DMA(&hspi1, &lo, 1);
    }

    GC9A01_CS_HIGH();
}

// 显示RGB565图片数据 | Display RGB565 image data
void GC9A01_DrawImage(uint16_t x, uint16_t y, uint16_t w, uint16_t h,
                       const uint16_t *image_data)
{
    GC9A01_SetWindow(x, y, x + w - 1, y + h - 1);

    GC9A01_DC_HIGH();
    GC9A01_CS_LOW();

    // 将16位像素数据转为字节数组发送
    // Convert 16-bit pixel data to byte array for transmission
    uint32_t total = (uint32_t)w * h * 2;
    HAL_SPI_Transmit(&hspi1, (uint8_t *)image_data, total, HAL_MAX_DELAY);

    GC9A01_CS_HIGH();
}

// ---- 简易5x7点阵字体 ----
// ---- Simple 5x7 dot-matrix font ----
// 每个字符用5个字节表示，每个字节的低7位对应7行像素
// Each character is represented by 5 bytes, lower 7 bits of each byte = 7 pixel rows

static const uint8_t font5x7[][5] = {
    {0x00, 0x00, 0x00, 0x00, 0x00},  // ' ' (空格)
    {0x00, 0x00, 0x5F, 0x00, 0x00},  // '!'
    {0x00, 0x07, 0x00, 0x07, 0x00},  // '"'
    // ... 完整字库省略，使用工具生成 | Full font table omitted, use tool to generate
    {0x7E, 0x11, 0x11, 0x11, 0x7E},  // 'A' (0x41)
    {0x7F, 0x49, 0x49, 0x49, 0x36},  // 'B'
    {0x3E, 0x41, 0x41, 0x41, 0x22},  // 'C'
    // ...
    {0x1C, 0x22, 0x41, 0x41, 0x7F},  // 'a' (approximation)
    // ...
};

// 绘制单个字符 | Draw single character
void GC9A01_DrawChar(uint16_t x, uint16_t y, char ch, uint16_t fg, uint16_t bg)
{
    if (ch < 0x20 || ch > 0x7E) ch = ' ';  // 范围检查 | Range check

    const uint8_t *glyph = font5x7[ch - 0x20];

    for (uint8_t col = 0; col < 5; col++) {
        uint8_t line = glyph[col];
        for (uint8_t row = 0; row < 7; row++) {
            if (line & (1 << row)) {
                GC9A01_DrawPixel(x + col, y + row, fg);
            } else if (bg != fg) {
                GC9A01_DrawPixel(x + col, y + row, bg);
            }
        }
    }
}

// 绘制字符串 | Draw string
void GC9A01_DrawString(uint16_t x, uint16_t y, const char *str,
                        uint16_t fg, uint16_t bg)
{
    while (*str) {
        GC9A01_DrawChar(x, y, *str, fg, bg);
        x += 6;  // 5像素宽 + 1像素间距 | 5px wide + 1px spacing
        if (x + 5 >= GC9A01_WIDTH) break;  // 防止越界 | Prevent overflow
        str++;
    }
}
```

**测试程序——在屏幕上显示"Hello ElectronBot":**
```c
/* main.c — Day 5 综合测试 */
/* main.c — Day 5 Integration Test */

int main(void)
{
    HAL_Init();
    SystemClock_Config();

    // 初始化GPIO和SPI | Initialize GPIO and SPI
    MX_GPIO_Init();
    MX_SPI1_Init();
    MX_USB_DEVICE_Init();  // USB CDC初始化 | USB CDC init

    // 初始化GC9A01屏幕 | Init GC9A01 screen
    GC9A01_Init();
    HAL_Delay(100);

    // 测试1: 全屏填充颜色 | Test 1: Fill screen with color
    GC9A01_FillColor(COLOR_BLACK);   // 清屏 | Clear screen
    HAL_Delay(500);
    GC9A01_FillColor(COLOR_CYAN);    // 青色背景 | Cyan background
    HAL_Delay(500);

    // 测试2: 绘制圆形图案 | Test 2: Draw circle patterns
    GC9A01_FillColor(COLOR_BLACK);
    GC9A01_DrawCircle(120, 120, 100, COLOR_GREEN);   // 外圈 | Outer ring
    GC9A01_DrawCircle(120, 120, 80, COLOR_CYAN);     // 中圈 | Middle ring
    GC9A01_DrawCircle(120, 120, 60, COLOR_YELLOW);   // 内圈 | Inner ring
    GC9A01_FillCircle(120, 120, 30, COLOR_RED);      // 实心圆 | Filled circle
    HAL_Delay(1000);

    // 测试3: 显示文字 | Test 3: Display text
    GC9A01_FillColor(COLOR_BLACK);
    GC9A01_DrawString(30, 100, "Hello", COLOR_WHITE, COLOR_BLACK);
    GC9A01_DrawString(30, 115, "ElectronBot", COLOR_CYAN, COLOR_BLACK);

    // 测试4: USB CDC通信测试 | Test 4: USB CDC communication test
    uint8_t welcome_msg[] = "ElectronBot USB CDC Ready!\r\n";
    CDC_SendData(welcome_msg, strlen((char *)welcome_msg));

    while (1) {
        HAL_Delay(1000);
    }
}
```

**预期结果:**
- 屏幕显示"Hello ElectronBot"文字
- 屏幕上出现同心圆和实心圆图案
- USB虚拟串口发送欢迎消息到PC
- 理解RGB565图片数据的显示流程

**常见问题:**
- **文字显示不完整**：字库数据不正确或字符索引计算有误
- **SPI DMA传输画面撕裂**：需要等待DMA传输完成后再更新下一帧，使用`HAL_SPI_GetState`检查
- **图片颜色偏色**：确认图片数据的字节序是否匹配（大端/小端）

---

## 今日作业 | Homework

### 必做题
1. 完成USB CDC设备初始化，ElectronBot被PC识别为虚拟串口，能进行数据回显
2. 完成GC9A01屏幕初始化，成功在全屏显示指定颜色
3. 在屏幕上绘制至少3个不同大小和颜色的圆形
4. 在屏幕上显示一段英文文字（如你的名字）

### 挑战题
1. **SPI DMA优化**: 使用HAL_SPI_Transmit_DMA替换逐像素发送，测量刷新速度提升（目标：全屏刷新<50ms）
2. **动态图案**: 绘制一个从中心向外扩展的圆形波纹动画（同心圆依次扩展）
3. **USB双向通信**: 通过USB从PC发送颜色代码到ElectronBot，实时改变屏幕背景颜色

### 思考题
1. USB HS模式为什么需要外部PHY芯片（USB3300）？而FS模式不需要？两者在速率上的区别是什么？
2. GC9A01的显存是240x240的方形，但显示区域是圆形。如果不做圆形裁剪会发生什么？屏幕四角会显示什么？
3. 为什么SPI通信比I2C更适合驱动显示屏？在带宽、引脚数量、协议复杂度方面比较两者。

---

## 明日预告 | Tomorrow's Preview

明天我们将进入舵机控制系统！你将学习I2C主机通信协议，理解舵机通信的命令帧格式，掌握6个舵机的地址管理与通信时序。下午将深入PID控制原理，亲手在ElectronBot上实现闭环舵机控制，并学习6自由度运动学基础——让机器人动起来！

Tomorrow we dive into the servo control system! You will learn the I2C master communication protocol, understand the servo command frame format, and master the addressing and timing for 6 servos. In the afternoon, we'll deep-dive into PID control principles, implement closed-loop servo control on ElectronBot, and learn 6-DOF kinematics basics -- making the robot move!

---

## 参考资源 | References

- [STM32 USB Device Library 用户手册](https://www.st.com/resource/en/user_manual/um1046-stm32-usb-device-library.pdf)
- [USB CDC 类规范 (USB-IF)](https://www.usb.org/document-library/class-definitions-communication-devices-12)
- [GC9A01 数据手册 (LCD 控制器)](https://www.buydisplay.com/download/ic/GC9A01A.pdf)
- [STM32 HAL SPI 驱动指南](https://www.st.com/resource/en/user_manual/um1884-description-of-stm32f4-hal-and-lloydrivers.pdf)
- [RGB565 颜色格式说明](https://en.wikipedia.org/wiki/High_color)
- [Bresenham 画圆算法](https://en.wikipedia.org/wiki/Midpoint_circle_algorithm)
- [STM32 USB CDC 调试教程 (B站)](https://search.bilibili.com/all?keyword=STM32%20USB%20CDC%20%E8%B0%83%E8%AF%95)

*最后更新：2026-05-27*
