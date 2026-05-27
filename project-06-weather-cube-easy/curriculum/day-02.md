# Day 2: I2C 通信与 OLED 显示 | I2C Communication & OLED Display

## 今日目标 | Today's Goals

- 理解 I2C 通信协议的基本原理
- 学会使用 U8g2 库驱动 SSD1306 OLED
- 能在 OLED 上显示文字（含中文）
- 理解 PROGMEM 和位图存储

---

## 上午 (3h) | Morning Session

### 1. I2C 通信协议原理 (1.5h)

**什么是 I2C？**

I2C (Inter-Integrated Circuit) 是一种**两线制**串行通信协议：
- **SCL** (Serial Clock) — 时钟线，控制通信节奏
- **SDA** (Serial Data) — 数据线，传输实际信息

**类比理解**：
- SCL = 交响乐指挥的指挥棒（控制节奏）
- SDA = 乐手们演奏的音符（实际内容）

**I2C 的 4 个关键概念**：
1. **主从架构**：MCU 是"主人"（Master），所有传感器/屏幕是"仆人"（Slave）
2. **地址**：每个 I2C 设备有唯一的地址（如 SSD1306 通常是 0x3C）
3. **上拉电阻**：SCL 和 SDA 需要上拉电阻（通常模块已内置）
4. **速度**：标准模式 100kHz，快速模式 400kHz

**接线**（仅需 4 根线！）：
```
ESP-01S          OLED
VCC (3.3V)  ←→  VCC
GND         ←→  GND
GPIO0 (D3)  ←→  SCL
GPIO2 (D4)  ←→  SDA
```

### 2. SSD1306 驱动芯片 (1.5h)

**SSD1306 是什么**：
- 一款 OLED 显示驱动芯片
- 支持 128×64 像素
- I2C 或 SPI 接口
- 内置显示缓存（GDDRAM）

**像素与坐标**：
```
(0,0) ────────────── (127,0)
  │                    │
  │    128×64 OLED     │
  │                    │
(0,63) ────────────── (127,63)
```

---

## 下午 (4h) | Afternoon Session

### 3. U8g2 库安装与基础使用 (1.5h)

**安装 U8g2**：
1. Arduino IDE → 工具 → 管理库
2. 搜索 "U8g2"
3. 安装 "U8g2 by olikraus"

**初始化 OLED**：

```cpp
#include <U8g2lib.h>

// 软件 I2C: SCL=GPIO0, SDA=GPIO2
U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(
  U8G2_R0,      // 屏幕方向（不旋转）
  0,            // SCL = GPIO0
  2,            // SDA = GPIO2
  U8X8_PIN_NONE // 不使用复位引脚
);

void setup() {
  u8g2.begin();                    // 初始化
  u8g2.enableUTF8Print();          // 启用中文支持
}
```

**显示文字的标准步骤**：

```cpp
void loop() {
  u8g2.clearBuffer();              // 1. 清空缓存
  u8g2.setFont(u8g2_font_ncenB14_tr); // 2. 设置字体
  u8g2.setCursor(0, 20);           // 3. 设置光标位置
  u8g2.print("Hello World!");      // 4. 写入文字
  u8g2.sendBuffer();               // 5. 发送到屏幕
  delay(1000);
}
```

**⚠️ 重要概念：双缓冲机制**
- `clearBuffer()` → 在内存中清空画布
- 所有绘制命令（print、draw等）→ 在内存中绘制
- `sendBuffer()` → 一次性将内存内容发送到屏幕
- 这样做可以避免屏幕闪烁

### 4. 中文显示 (1h)

**显示中文**：

```cpp
u8g2.setFont(u8g2_font_unifont_t_chinese2); // 中文字体
u8g2.setCursor(0, 20);
u8g2.print("你好世界！");  // UTF-8 编码的中文
```

**⚠️ 注意**：
- 中文字体较大（每个字 16×16 像素），128×64 屏幕最多显示 8×4 = 32 个汉字
- Arduino IDE 默认使用 UTF-8 编码，直接写中文即可

### 5. 实战：气象站启动画面 (1.5h)

**任务**：编写一个启动画面，在 OLED 上显示：

```
┌──────────────────┐
│   天气魔方        │
│   Weather Cube   │
│                  │
│   WiFi OK        │
│   192.168.1.xxx  │
└──────────────────┘
```

---

## 今日作业 | Today's Task

1. 完成 OLED 初始化，能显示 "Hello World!"
2. 完成中文显示测试（显示你的名字）
3. 完成气象站启动画面练习
4. 预习：WiFi Station 模式和 HTTP 请求

## 今日检查点 | Checkpoint

- [ ] OLED 屏幕能正常点亮吗？
- [ ] 中英文都能正确显示吗？
- [ ] 你知道 clearBuffer / sendBuffer 的作用吗？
- [ ] 你知道 I2C 的两根线分别叫什么吗？
