# Day 01: 项目启动与 ESP32 入门 | Project Kickoff & ESP32 Basics

## 今日目标 | Today's Goals

- 了解轮足机器人项目的全貌与最终效果 | Understand the full scope and final result of the bipedal wheeled robot project
- 认识 ESP32 硬件及其核心特性 | Learn the ESP32 hardware and its core features
- 搭建 VSCode + PlatformIO 开发环境 | Set up the VSCode + PlatformIO development environment
- 成功编译并烧录第一个程序（Blink）| Successfully compile and flash the first program (Blink)

---

## 上午 (3h) | Morning Session

### 1. 项目介绍与最终成品展示 | Project Introduction & Final Demo (1h)

**为什么要先看成品？** 因为当你知道自己要做什么，学习才有方向感。就像旅游前先看目的地照片，途中每一步都有意义。

**Why show the final product first?** Because knowing your destination gives direction to your learning. Just like seeing travel photos before a trip, every step along the way gains purpose.

**展示内容 | What to show:**

- StackForce 轮足机器人实机演示：两轮自平衡站立、前后移动、转向
- B 站课程视频：https://www.bilibili.com/video/BV1kz421B73V
- Gitee 仓库：https://gitee.com/StackForce/bipedal_wheeled_robot

**项目技术栈 | Project Tech Stack:**

```
轮足机器人技术栈:
├── 大脑: ESP32 (双核处理器, WiFi/蓝牙)
├── 肌肉: 2x BLDC 无刷电机 (轮毂电机)
├── 内耳: MPU6050 (加速度计 + 陀螺仪)
├── 神经: PID 控制算法
├── 骨架: 3D 打印结构件
├── 开发工具: VSCode + PlatformIO
└── 语言: C++ (Arduino 框架)
```

**课程路线图 | Course Roadmap:**

```
Day 1  → 环境搭建、ESP32 入门 blink
Day 2  → 电机原理、BLDC 控制与编码器
Day 3  → IMU 传感器、姿态解算
Day 4  → 运动学建模、物理仿真
Day 5  → PID 控制器原理与实现
Day 6  → 机械组装与接线
Day 7  → 姿态平衡联调
Day 8  → 运动控制（前进/后退/转向）
Day 9  → 参数调优与稳定性
Day 10 → 蓝牙遥控与最终展示
```

**讨论 | Discussion:**
- 你觉得这个机器人最难的部分是什么？| What do you think is the hardest part?
- 你最期待学会什么技能？| What skill are you most excited to learn?

---

### 2. ESP32 硬件认知 | ESP32 Hardware Overview (1h)

**为什么要学 ESP32？** ESP32 是目前 IoT（物联网）领域最流行的微控制器之一。它便宜（约 15-30 元）、功能强大（双核 WiFi 蓝牙）、社区活跃。学会 ESP32，你就掌握了嵌入式开发的入门钥匙。

**Why learn ESP32?** ESP32 is one of the most popular microcontrollers in IoT. It's cheap (~2-4 USD), powerful (dual-core with WiFi/BT), and has an active community. Mastering ESP32 gives you the key to embedded development.

**ESP32 芯片架构 | ESP32 Chip Architecture:**

```
ESP32 内部结构:
┌─────────────────────────────────────────────┐
│               ESP32 芯片                      │
│                                               │
│  ┌──────────┐  ┌──────────┐                  │
│  │ CPU Core0│  │ CPU Core1│  双核 240MHz     │
│  └──────────┘  └──────────┘                  │
│                                               │
│  ┌─────────┐  ┌────────┐  ┌──────────────┐  │
│  │ 520KB   │  │ 4MB    │  │ WiFi + BLE   │  │
│  │ SRAM    │  │ Flash  │  │ 2.4GHz       │  │
│  └─────────┘  └────────┘  └──────────────┘  │
│                                               │
│  GPIO (34个可编程引脚)                         │
│  ├── ADC (模数转换, 18通道)                    │
│  ├── DAC (数模转换, 2通道)                     │
│  ├── PWM (脉宽调制, 16通道)                    │
│  ├── I2C (2组总线)                             │
│  ├── SPI (4组总线)                             │
│  ├── UART (3组串口)                            │
│  └── 触摸传感器 (10个)                         │
│                                               │
│  工作电压: 3.3V (GPIO 输出)                    │
│  输入电压: 5V (USB/电源)                       │
└─────────────────────────────────────────────┘
```

**关键概念解释 | Key Concept Explanation:**

| 概念 | 解释 | 类比 |
|------|------|------|
| GPIO | General Purpose Input/Output，通用输入输出引脚 | 手指，可以触摸（输入）或按压（输出） |
| ADC | Analog-to-Digital Converter，把模拟信号变成数字 | 把温度计的水银柱读成数字 |
| PWM | Pulse Width Modulation，通过快速开关控制功率 | 快速开关水龙头来控制水量 |
| I2C | 一种只用 2 根线连接多个设备的通信协议 | 一个老师（主机）点名多个学生（从机）回答问题 |
| UART | 串口通信，TX/RX 两根线一对一通信 | 两个人打电话 |
| SPI | 高速通信协议，需要 4 根线 | 四车道高速公路 |

**ESP32 开发板实物观察 | ESP32 Dev Board Physical Observation:**

```
ESP32 开发板正面:
┌─────────────────────────────────────┐
│  [USB-C]                             │
│                                      │
│  ┌────────────────────────────┐      │
│  │     ESP32-WROOM-32 模块    │      │
│  │     (金属屏蔽罩下面是芯片)   │      │
│  └────────────────────────────┘      │
│                                      │
│  [BOOT] [EN/RST]                     │
│                                      │
│  GPIO 引脚排针 (左右各 19 个)         │
│  GND 3V3 EN VP VN 34 35 32 33 25 26 │
│  27  14  12  13  9  10  11  TX RX    │
└─────────────────────────────────────┘

重要引脚说明:
- VIN: 5V 电源输入 (USB 供电时可用)
- 3V3: 3.3V 稳压输出 (给传感器供电用)
- GND: 地线 (公共参考点)
- GPIO2: 板载 LED (低电平点亮)
- GPIO0: 启动模式选择 (拉低进入下载模式)
- TX/RX: 串口通信 (烧录和调试用)
- SDA/SCL: I2C 总线 (默认 GPIO21/GPIO22)
```

> **注意: ESP32 的工作电压是 3.3V！** GPIO 引脚输出高电平是 3.3V，不是 5V。如果直接接 5V 信号到 GPIO 输入引脚，可能会烧毁芯片。这是初学者最容易犯的错误之一。

> **Warning: ESP32 operates at 3.3V!** GPIO pins output 3.3V HIGH, not 5V. Connecting 5V signals directly to GPIO input pins may damage the chip. This is one of the most common beginner mistakes.

---

### 3. 安装 VSCode + PlatformIO 开发环境 | Install VSCode + PlatformIO (1h)

**为什么用 PlatformIO 而不是 Arduino IDE？** PlatformIO 是专业级嵌入式开发工具，自动管理库依赖、支持多平台、集成调试功能。Arduino IDE 适合快速原型，但大型项目（像我们的轮足机器人）用 PlatformIO 更高效。

**Why PlatformIO instead of Arduino IDE?** PlatformIO is a professional embedded development tool that auto-manages library dependencies, supports multiple platforms, and integrates debugging. Arduino IDE is good for quick prototyping, but larger projects (like our robot) benefit from PlatformIO.

**安装步骤 | Installation Steps:**

**步骤 1: 安装 VSCode**

1. 访问 https://code.visualstudio.com/
2. 下载 Windows 版本并安装
3. 安装时勾选:
   - 添加到 PATH (Add to PATH)
   - 添加"通过 Code 打开"到右键菜单

**步骤 2: 安装 PlatformIO 插件**

1. 打开 VSCode
2. 点击左侧扩展图标 (Ctrl+Shift+X)
3. 搜索 "PlatformIO"
4. 安装 **PlatformIO IDE** (官方插件，图标是一个外星人头像)
5. 等待安装完成（第一次安装会下载工具链，需要 5-10 分钟）
6. 安装完成后 VSCode 左侧会出现 PlatformIO 图标（外星人头像），底部状态栏会出现 PlatformIO 工具栏

> **为什么等待时间长？** PlatformIO 需要下载 ESP32 的编译器、烧录工具和框架文件（约 500MB-1GB），这取决于网络速度。这是"一劳永逸"的安装。

> **Why does it take so long?** PlatformIO downloads the ESP32 compiler, flash tools, and framework files (~500MB-1GB). This is a one-time installation.

**步骤 3: 验证安装**

安装完成后，VSCode 底部状态栏应该有以下按钮:
- ✓ (勾号): 编译 Build
- → (箭头): 烧录 Upload
- 🔌 (插头): 串口监视器 Serial Monitor
- 🧹 (扫把): 清理 Clean

**常见安装问题 | Common Installation Issues:**

| 问题 | 解决方案 |
|------|----------|
| PlatformIO 图标不出现 | 重启 VSCode；检查是否安装了冲突的插件（如 Arduino 插件） |
| 下载速度太慢 | PlatformIO 默认从 GitHub 下载，国内可设置镜像：在 VSCode 设置中搜索 `platformio.platforms` |
| Python 报错 | PlatformIO 需要独立 Python 环境，通常自动安装。如果失败，手动安装 Python 3.8+ |
| 杀毒软件拦截 | 将 PlatformIO 目录添加到杀毒软件白名单 |
| PowerShell 执行策略 | 以管理员身份运行: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |

---

## 下午 (4h) | Afternoon Session

### 4. 创建第一个 PlatformIO 项目 | Create Your First PlatformIO Project (1h)

**步骤 1: 新建项目**

1. 点击 VSCode 底部状态栏的 PlatformIO 图标（外星人头像）
2. 点击 "PIO Home" → "Open"
3. 点击 "New Project"
4. 填写项目信息:
   - **Name**: `my-first-esp32`（项目名，用英文和小写）
   - **Board**: 搜索 `ESP32 Dev Module`，选择之
   - **Framework**: 选择 `Arduino`
   - **Location**: 使用默认路径即可
5. 点击 "Finish"，等待项目创建完成

> **为什么选 Arduino 框架？** PlatformIO 支持多种框架（Arduino、ESP-IDF 等）。Arduino 框架入门最简单，而且 StackForce 项目代码也基于 Arduino 框架。

> **Why Arduino framework?** PlatformIO supports multiple frameworks. Arduino is the easiest to learn, and the StackForce project code is also based on the Arduino framework.

**步骤 2: 了解项目结构 | Understand Project Structure**

```
my-first-esp32/
├── .pio/                    # PlatformIO 自动生成的文件（不要手动修改）
│   └── build/               # 编译输出
├── .vscode/                 # VSCode 配置文件
├── lib/                     # 自己的库文件（暂时为空）
├── src/                     # 源代码目录（我们写代码的地方）
│   └── main.cpp             # 主程序文件
├── test/                    # 测试代码（暂时为空）
├── .gitignore               # Git 忽略规则
└── platformio.ini           # 项目配置文件（非常重要！）
```

**platformio.ini 配置文件解析 | platformio.ini Configuration Explained:**

```ini
; PlatformIO 项目配置文件
; PlatformIO Project Configuration File

[env:esp32dev]
platform = espressif32       ; 平台: ESP32 系列
board = esp32dev             ; 开发板: ESP32 Dev Module
framework = arduino          ; 框架: Arduino

; 串口监视器波特率（后续我们会改）
monitor_speed = 115200       ; Serial monitor baud rate
```

> **为什么 platformio.ini 很重要？** 它定义了用什么芯片、什么框架、什么开发板。就像一份"菜单"，PlatformIO 根据这份菜单来准备编译工具。如果配置错误，代码就无法编译。

> **Why is platformio.ini important?** It defines the chip, framework, and board. PlatformIO uses this "menu" to prepare the right compilation tools. Wrong configuration = failed compilation.

---

### 5. 编写并烧录 Blink 程序 | Write & Flash the Blink Program (1.5h)

**为什么 Blink 是第一个程序？** Blink（让 LED 闪烁）是硬件开发的 "Hello World"。它能验证: 你的开发环境正常、代码能编译、烧录能成功、芯片在运行。如果 Blink 能跑，说明整个链路是通的。

**Why Blink as the first program?** Blink (LED flashing) is the "Hello World" of hardware development. It verifies: your dev environment works, code compiles, flashing succeeds, and the chip is running. If Blink works, the entire chain is good.

打开 `src/main.cpp`，替换为以下代码:

```cpp
/**
 * Blink - 你的第一个 ESP32 程序
 * Blink - Your first ESP32 program
 *
 * 功能: 让 ESP32 开发板上的 LED 闪烁
 * Function: Blink the onboard LED on ESP32 dev board
 *
 * 笨鸟先飞:
 * - LED = Light Emitting Diode（发光二极管），通电就亮
 * - GPIO = General Purpose I/O，可以输出高/低电平
 * - 高电平(HIGH) = 3.3V，低电平(LOW) = 0V
 * - ESP32 开发板的板载 LED 通常连接到 GPIO2
 */

// Arduino 框架的两个核心函数:

void setup() {
  // setup() 只运行一次：初始化设置
  // setup() runs only once: initialization
  // 就像早上起床后的准备工作（穿衣、刷牙）

  Serial.begin(115200);     // 初始化串口通信，波特率 115200
                            // Initialize serial communication at 115200 baud

  pinMode(LED_BUILTIN, OUTPUT);  // 把 LED 引脚设置为输出模式
                                  // Set LED pin as output mode
                                  // LED_BUILTIN 在 ESP32 上 = GPIO2

  Serial.println("Blink 程序启动！ | Blink program started!");
}

void loop() {
  // loop() 不断循环：主程序逻辑
  // loop() runs repeatedly: main program logic
  // 就像心脏不停地跳动

  digitalWrite(LED_BUILTIN, HIGH);  // 输出高电平 → LED 熄灭
                                     // Output HIGH → LED off
                                     // (注意: ESP32 的 LED 是低电平点亮!)
  Serial.println("LED OFF");
  delay(1000);                       // 等待 1000 毫秒 = 1 秒
                                      // Wait 1000ms = 1 second

  digitalWrite(LED_BUILTIN, LOW);    // 输出低电平 → LED 点亮
                                      // Output LOW → LED on
  Serial.println("LED ON");
  delay(1000);                       // 再等 1 秒
                                      // Wait another 1 second
}
```

**编译与烧录步骤 | Build & Flash Steps:**

1. 用 USB 数据线连接 ESP32 开发板到电脑
2. 确保使用的是**数据线**而不是充电线（充电线无法传数据！）
3. 在 VSCode 底部状态栏点击:
   - **✓ (勾号)**: 编译代码
   - **→ (箭头)**: 编译并烧录到 ESP32
4. 第一次编译会比较慢（需要编译整个 Arduino 核心），后续会快很多
5. 烧录成功后，ESP32 会自动重启并开始运行程序

**查看串口输出 | View Serial Output:**

1. 点击 VSCode 底部的 **🔌 (插头)** 图标打开串口监视器
2. 你应该能看到 "Blink 程序启动！" 和 "LED ON" / "LED OFF" 交替输出
3. 同时 ESP32 开发板上的 LED 应该在闪烁

> **什么是串口（Serial）？** 串口是单片机和电脑通信最简单的方式。就像两个人通过电话聊天，ESP32 通过 USB 线向电脑发送文字信息。`Serial.begin(115200)` 表示通信速度是 115200 比特/秒。

> **What is Serial?** Serial is the simplest way for a microcontroller to communicate with a computer. Like a phone call, the ESP32 sends text through USB. `Serial.begin(115200)` means 115200 bits per second.

**常见烧录问题 | Common Flashing Issues:**

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 找不到串口 | USB 线是充电线，或驱动未安装 | 换数据线；安装 CP210x 或 CH340 驱动 |
| 烧录超时 | ESP32 没进入下载模式 | 按住 BOOT 键，点击 → 烧录，出现 "Connecting..." 后松开 |
| 编译报错 | 代码有语法错误 | 检查拼写、大小写、分号 |
| LED 不亮 | 引脚号不对 | 确认 `LED_BUILTIN` 或尝试 `pinMode(2, OUTPUT)` |
| 串口乱码 | 波特率不匹配 | 确保 `monitor_speed = 115200` 和 `Serial.begin(115200)` 一致 |

---

### 6. 实验：修改闪烁模式 | Experiment: Modify Blink Patterns (1.5h)

**任务 1: SOS 信号 (摩尔斯电码)** | Task 1: SOS Signal (Morse Code)

```cpp
/**
 * SOS 信号 - 摩尔斯电码
 * SOS Signal - Morse Code
 *
 * S = ... (三短)
 * O = --- (三长)
 *
 * 笨鸟先飞:
 * - SOS 是国际通用求救信号
 * - 通过 LED 的闪烁长短来表示不同字母
 */

#define LED_PIN 2   // ESP32 板载 LED 引脚
                    // ESP32 onboard LED pin

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
  Serial.println("SOS 信号程序启动 | SOS signal program started");
}

// 封装一个闪烁函数，避免重复代码
// Wrap a blink function to avoid repeating code
void blink(int duration) {
  digitalWrite(LED_PIN, LOW);   // 亮 (LOW = on for ESP32 LED)
  delay(duration);
  digitalWrite(LED_PIN, HIGH);  // 灭
  delay(duration);
}

void loop() {
  // S: 三短 (三短促闪烁)
  // S: three short blinks
  for (int i = 0; i < 3; i++) {
    blink(200);   // 短闪 200ms | short blink 200ms
  }
  delay(300);     // 字母间隔 | letter gap

  // O: 三长 (三长闪烁)
  // O: three long blinks
  for (int i = 0; i < 3; i++) {
    blink(600);   // 长闪 600ms | long blink 600ms
  }
  delay(300);     // 字母间隔 | letter gap

  // S: 三短
  for (int i = 0; i < 3; i++) {
    blink(200);
  }

  delay(1000);    // 单词间隔 | word gap (longer pause)
  Serial.println("SOS sent!");
}
```

**任务 2: 呼吸灯效果 (PWM)** | Task 2: Breathing LED Effect (PWM)

```cpp
/**
 * 呼吸灯 - 使用 PWM 控制 LED 亮度
 * Breathing LED - Using PWM to control LED brightness
 *
 * 笨鸟先飞:
 * - PWM = Pulse Width Modulation (脉宽调制)
 * - 原理: 快速地开关 LED，通过调节"开"的时间比例来控制亮度
 * - 类比: 快速开关灯泡，如果开90%关10%，看起来就是90%亮度
 * - ESP32 的 LED PWM 有 16 位精度 (0-65535)
 *
 * PWM = Pulse Width Modulation
 * Principle: Rapidly toggle LED, control brightness by adjusting
 *            the ratio of "on" time. Like rapidly toggling a light
 *            bulb - 90% on + 10% off looks like 90% brightness.
 */

#define LED_PIN 2

// PWM 参数设置
// PWM parameter settings
const int pwmFreq = 5000;      // PWM 频率 5kHz
const int pwmChannel = 0;      // PWM 通道 0 (ESP32 有 16 个通道)
const int pwmResolution = 8;   // 8 位分辨率 (0-255)

void setup() {
  // 配置 PWM 通道
  // Configure PWM channel
  ledcSetup(pwmChannel, pwmFreq, pwmResolution);

  // 将 PWM 通道绑定到 LED 引脚
  // Attach PWM channel to LED pin
  ledcAttachPin(LED_PIN, pwmChannel);

  Serial.begin(115200);
  Serial.println("呼吸灯程序启动 | Breathing LED started");
}

void loop() {
  // 渐亮: 从 0 到 255
  // Fade in: from 0 to 255
  for (int brightness = 0; brightness <= 255; brightness++) {
    ledcWrite(pwmChannel, brightness);
    delay(10);   // 每 10ms 增加一级亮度
                  // Increase brightness every 10ms
  }

  // 渐暗: 从 255 到 0
  // Fade out: from 255 to 0
  for (int brightness = 255; brightness >= 0; brightness--) {
    ledcWrite(pwmChannel, brightness);
    delay(10);
  }
}
```

> **为什么 PWM 能控制亮度？** 人眼的反应速度有限（大约 60Hz 以上就分辨不出闪烁）。PWM 以 5kHz（5000 次/秒）的频率快速开关 LED，眼睛看到的是平均亮度。占空比（duty cycle）= 高电平时间/周期。50% 占空比 = 一半亮度。

> **Why can PWM control brightness?** Human eyes can't distinguish flickering above ~60Hz. PWM toggles the LED at 5kHz (5000 times/sec), so eyes see the average brightness. Duty cycle = HIGH time / period. 50% duty = half brightness.

**任务 3: 心跳效果** | Task 3: Heartbeat Effect

```cpp
/**
 * 心跳效果 - 模拟心脏跳动
 * Heartbeat effect - Simulating heartbeat
 */

#define LED_PIN 2
#define PWM_CHANNEL 0

void setup() {
  ledcSetup(PWM_CHANNEL, 5000, 8);
  ledcAttachPin(LED_PIN, PWM_CHANNEL);
  Serial.begin(115200);
}

void heartbeatPulse() {
  // 第一次跳动 (较强)
  // First beat (stronger)
  for (int i = 0; i <= 200; i += 10) {
    ledcWrite(PWM_CHANNEL, i);
    delay(5);
  }
  for (int i = 200; i >= 50; i -= 10) {
    ledcWrite(PWM_CHANNEL, i);
    delay(5);
  }

  // 短暂停顿
  // Brief pause
  delay(100);

  // 第二次跳动 (较弱)
  // Second beat (weaker)
  for (int i = 50; i <= 150; i += 10) {
    ledcWrite(PWM_CHANNEL, i);
    delay(5);
  }
  for (int i = 150; i >= 0; i -= 10) {
    ledcWrite(PWM_CHANNEL, i);
    delay(5);
  }

  // 心跳间隔
  // Heartbeat interval
  delay(600);
}

void loop() {
  heartbeatPulse();
}
```

**任务 4 (挑战): 用按钮控制 LED** | Task 4 (Challenge): Button-Controlled LED

```cpp
/**
 * 按钮控制 LED - 学习 GPIO 输入
 * Button-controlled LED - Learning GPIO input
 *
 * 笨鸟先飞:
 * - 之前我们只用 GPIO 做输出（控制 LED）
 * - 现在学习用 GPIO 做输入（读取按钮状态）
 * - 按钮按下 = 引脚接地 = LOW
 * - 按钮松开 = 引脚被上拉电阻拉到高电平 = HIGH
 *
 * 接线:
 * 按钮一端 → GPIO0
 * 按钮另一端 → GND
 * (使用内部上拉电阻，不需要外部电阻)
 */

#define LED_PIN 2
#define BUTTON_PIN 0   // BOOT 按钮在大多数 ESP32 开发板上连接 GPIO0

// 变量: 记录 LED 状态
// Variable: track LED state
bool ledState = false;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);  // 输入模式 + 内部上拉电阻
                                       // Input mode + internal pull-up resistor

  Serial.begin(115200);
  Serial.println("按钮控制 LED 启动 | Button LED control started");
}

void loop() {
  // 读取按钮状态
  // Read button state
  // INPUT_PULLUP 模式: 松开=HIGH, 按下=LOW
  if (digitalRead(BUTTON_PIN) == LOW) {
    delay(50);  // 消抖: 等待 50ms 再确认
                 // Debounce: wait 50ms then confirm

    if (digitalRead(BUTTON_PIN) == LOW) {
      ledState = !ledState;  // 切换 LED 状态
                              // Toggle LED state

      digitalWrite(LED_PIN, ledState ? LOW : HIGH);

      Serial.print("LED 状态: ");
      Serial.println(ledState ? "ON" : "OFF");

      // 等待按钮松开，防止重复触发
      // Wait for button release to prevent repeat triggers
      while (digitalRead(BUTTON_PIN) == LOW) {
        delay(10);
      }
    }
  }
}
```

> **什么是消抖（debounce）？** 按钮按下时，金属触点会在几毫秒内弹跳多次，产生多次"按下-松开"信号。如果不消抖，按一次按钮可能被识别为按了好几次。加 50ms 延时再确认，就是最简单的消抖方法。

> **What is debounce?** When a button is pressed, the metal contacts bounce for a few milliseconds, producing multiple press-release signals. Without debouncing, one press might register as several. Adding a 50ms delay to re-confirm is the simplest debouncing method.

---

## 今日作业 | Today's Task

1. **必做 | Required:** 确保 Blink 程序编译、烧录成功，LED 能正常闪烁
   Ensure the Blink program compiles, flashes, and the LED blinks correctly.

2. **必做 | Required:** 完成至少一个闪烁模式实验（SOS、呼吸灯、心跳）
   Complete at least one blink pattern experiment (SOS, breathing LED, or heartbeat).

3. **必做 | Required:** 在笔记本上画出 ESP32 开发板的引脚图，标注: VIN、3V3、GND、GPIO2（LED）、GPIO21（SDA）、GPIO22（SCL）、TX、RX
   Draw the ESP32 dev board pinout diagram in your notebook, labeling: VIN, 3V3, GND, GPIO2 (LED), GPIO21 (SDA), GPIO22 (SCL), TX, RX.

4. **选做 | Optional:** 完成按钮控制 LED 的实验，理解 GPIO 输入和消抖
   Complete the button-controlled LED experiment, understanding GPIO input and debouncing.

5. **思考 | Reflection:** ESP32 的 `setup()` 和 `loop()` 分别对应什么？如果想在程序运行中改变 LED 闪烁速度，应该把变量定义在哪里？（提示: 全局变量 vs 局部变量）
   What do `setup()` and `loop()` correspond to? If you want to change the LED blink speed during runtime, where should the variable be defined? (Hint: global vs local variables)

---

## 今日检查点 | Checkpoint

上电后回答以下问题 | Answer these questions after powering on:

- [ ] PlatformIO 插件安装成功，底部状态栏可以看到 PIO 按钮？
  PlatformIO plugin installed successfully, PIO buttons visible in bottom status bar?
- [ ] 能创建新的 PlatformIO 项目，项目结构正确？
  Can create a new PlatformIO project with correct structure?
- [ ] Blink 程序编译成功（点击 ✓ 后无错误）？
  Blink program compiles successfully (no errors after clicking ✓)?
- [ ] Blink 程序烧录成功，LED 在闪烁？
  Blink program flashes successfully, LED is blinking?
- [ ] 串口监视器能看到 "LED ON" / "LED OFF" 输出？
  Serial monitor shows "LED ON" / "LED OFF" output?
- [ ] 你知道 ESP32 的工作电压是 3.3V 而不是 5V 吗？
  Do you know ESP32 operates at 3.3V, not 5V?
- [ ] 你能解释 `setup()` 和 `loop()` 的区别吗？
  Can you explain the difference between `setup()` and `loop()`?
- [ ] 你能解释什么是 PWM 吗？
  Can you explain what PWM is?

---

## 参考资源 | References

- [StackForce 轮足机器人 Gitee 仓库](https://gitee.com/StackForce/bipedal_wheeled_robot)
- [StackForce 官网](http://stackforce.cc/#/)
- [B站手把手教做轮足机器人](https://www.bilibili.com/video/BV1kz421B73V)
- [PlatformIO 官方文档](https://docs.platformio.org/)
- [ESP32 Arduino Core 文档](https://docs.espressif.com/projects/arduino-esp32/)
- [ESP32 入门教程 (B站)](https://search.bilibili.com/all?keyword=ESP32%20PlatformIO%20%E5%85%A5%E9%97%A8)

---

*最后更新: 2026-05-27*
