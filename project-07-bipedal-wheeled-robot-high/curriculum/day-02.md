# Day 02: 电机原理与 BLDC 控制 | Motor Basics & BLDC Control

## 今日目标 | Today's Goals

- 了解常见电机类型及其区别 | Understand common motor types and their differences
- 理解 BLDC（无刷直流电机）的工作原理 | Understand BLDC motor working principles
- 学习编码器的作用与读取方法 | Learn encoder function and reading methods
- 成功驱动 BLDC 电机旋转 | Successfully drive a BLDC motor to spin
- 实现基本的 PWM 速度控制 | Implement basic PWM speed control

---

## 上午 (3h) | Morning Session

### 1. 电机类型对比 | Motor Types Comparison (1h)

**为什么要学电机原理？** 机器人要动，就需要电机。不同电机有不同的特点，选错了电机，机器人就动不了或者动不好。了解原理，才能正确选型和使用。

**Why learn motor principles?** Robots need motors to move. Different motors have different characteristics. Choosing the wrong motor means your robot won't move well. Understanding principles enables correct selection and usage.

**四大电机类型 | Four Major Motor Types:**

```
电机分类:
├── DC 电机 (有刷直流电机)      ← 玩具车里那种
│   ├── 优点: 便宜、控制简单（给电就转）
│   ├── 缺点: 碳刷磨损、寿命短、噪音大
│   └── 控制: 电压大小 → 速度
│
├── 步进电机 (Stepper Motor)    ← 3D 打印机里那种
│   ├── 优点: 精确定位（一步一步转）
│   ├── 缺点: 速度慢、力矩小
│   └── 控制: 脉冲数 → 角度
│
├── 舵机 (Servo Motor)          ← 遥控小车转向
│   ├── 优点: 精确角度控制（0°-180°）
│   ├── 缺点: 角度范围有限
│   └── 控制: PWM 脉宽 → 角度
│
└── BLDC 电机 (无刷直流电机)     ← 无人机、我们的机器人 ←
    ├── 优点: 寿命长、效率高、力矩大、响应快
    ├── 缺点: 需要专用驱动器、控制复杂
    └── 控制: 三相 PWM → 速度和方向
```

| 对比项 | DC 有刷 | 步进 | 舵机 | BLDC 无刷 |
|--------|---------|------|------|-----------|
| 价格 | 低 (5-20元) | 中 (10-50元) | 中 (10-50元) | 中高 (30-100元) |
| 速度 | 快 | 慢 | 中 | 快 |
| 精度 | 低 | 高（开环） | 高（闭环） | 高（需编码器） |
| 寿命 | 短（碳刷磨损） | 长 | 中 | 长（无碳刷） |
| 控制难度 | 最简单 | 中等 | 简单 | 较难 |
| 典型应用 | 玩具 | 3D打印机 | 遥控模型 | 无人机、机器人 |

> **为什么我们的轮足机器人选 BLDC 电机？** 因为自平衡机器人需要: (1) 快速响应 — 倒下时必须立刻纠正; (2) 精确速度控制 — PID 算法需要精确控制轮子转速; (3) 足够力矩 — 机器人有一定重量。BLDC 电机完美满足这三个需求。

> **Why BLDC for our robot?** Self-balancing robots need: (1) fast response — must correct immediately when tilting; (2) precise speed control — PID needs accurate wheel speed; (3) sufficient torque — the robot has weight. BLDC motors perfectly meet all three requirements.

---

### 2. BLDC 电机工作原理 | BLDC Motor Working Principle (1h)

**BLDC = Brushless DC = 无刷直流电机。** "无刷"的意思是: 没有碳刷（机械换向器），改用电子电路来切换电流方向。

**BLDC = Brushless DC.** "Brushless" means: no carbon brushes (mechanical commutator), using electronic circuits to switch current direction instead.

**BLDC 电机内部结构 | BLDC Motor Internal Structure:**

```
BLDC 电机截面图 (从轴向看):
BLDC motor cross-section (axial view):

           A 相线圈
              ┌───┐
     N ↑      │ A │      S ↓
    ┌────┐    └───┘    ┌────┐
    │    │   ┌───┐     │    │
    │ N  │←  │ R │  →  │ S  │     R = 永磁转子 (旋转部分)
    │    │   └───┘     │    │     N/S = 永磁体磁极
    └────┘             └────┘
     S ↓      ┌───┐      N ↑
              │ C │
              └───┘
           C 相线圈

实际上更常见的是:
- 定子 (stator): 3 组线圈 (A, B, C)，固定不动
- 转子 (rotor): 永磁体 (N/S 极)，旋转

Inside a BLDC motor:
- Stator (fixed): 3 sets of coils (A, B, C)
- Rotor (rotating): Permanent magnets (N/S poles)
```

**三相换向原理 | Three-Phase Commutation Principle:**

```
为什么需要换向? (Why commutation?)

电机的本质: 电磁铁吸引/排斥永磁体
Motor essence: electromagnets attract/repel permanent magnets

要让转子持续旋转, 必须在正确的时间切换电流方向
To keep the rotor spinning, we must switch current direction at the right time

六步换向 (Six-step commutation):
六步换向序列 (Six-step commutation sequence):

Step 1: A+ B-  →  转子转到 0°
Step 2: A+ C-  →  转子转到 60°
Step 3: B+ C-  →  转子转到 120°
Step 4: B+ A-  →  转子转到 180°
Step 5: C+ A-  →  转子转到 240°
Step 6: C+ B-  →  转子转到 300°
→ 回到 Step 1, 持续旋转

A+ = A相通电正方向
A- = A相通电反方向
(未列出的相不通电)

A+ = Phase A energized positive
A- = Phase A energized negative
(Unlisted phases are off)
```

> **笨鸟先飞: 什么是"换向"？** 想象你在骑马。要让马一直往前跑，你需要在正确的时机换脚（踩马镫）。电机的换向也一样 -- 在正确的时机切换电流方向，让转子一直转下去。有刷电机用碳刷（机械方式）做这件事，BLDC 用电子电路做，所以更精确、更耐用。

> **Beginner note: What is "commutation"?** Imagine riding a horse. To keep galloping, you must switch your footing at the right moment. Motor commutation is the same — switch current direction at the right timing to keep the rotor spinning. Brushed motors use carbon brushes (mechanical), BLDC uses electronic circuits, so it's more precise and durable.

**FOC (磁场定向控制) 简介 | FOC (Field-Oriented Control) Introduction:**

FOC 是比六步换向更高级的控制方式。它的核心思想是: 让定子产生的磁场始终与转子磁场保持 90° 角，这样力矩最大、效率最高。

FOC is a more advanced control method than six-step commutation. Its core idea: keep the stator magnetic field always at 90 degrees to the rotor field, maximizing torque and efficiency.

```
FOC 控制流程:
FOC control flow:

编码器/霍尔传感器 → 读转子位置 → Clarke 变换 → Park 变换 → PI 控制 → 逆 Park → 逆 Clarke → SVPWM → 三相 PWM 输出
读取转子角度 (θ)     三相→两相       旋转坐标     电流控制

别被吓到! 我们用现成的驱动库, 不需要手写这些数学变换。
Don't panic! We use existing driver libraries, no need to hand-write these math transforms.
```

> **我们的方案: StackForce 电机驱动板已经内置了 FOC 算法。** 我们只需要告诉它"转到多快"，驱动板会自动处理所有换向和 FOC 计算。这大大降低了我们的开发难度。

> **Our approach: The StackForce motor driver board has built-in FOC algorithms.** We just tell it "how fast to spin," and the driver handles all commutation and FOC calculations automatically.

---

### 3. 编码器基础 | Encoder Basics (1h)

**为什么需要编码器？** BLDC 电机本身不知道转了多少圈、转了多快。编码器就像电机的"速度计"，告诉控制板当前的位置和速度。没有编码器，就无法做精确的速度控制。

**Why do we need an encoder?** The BLDC motor itself doesn't know how much it has rotated or how fast. The encoder is like a "speedometer" for the motor, telling the controller the current position and speed. Without an encoder, precise speed control is impossible.

```
增量式编码器原理 (Incremental Encoder Principle):

编码器码盘 (一个带孔的圆盘):
Encoder disc (a disc with slots):

        ╱ ○ ╲
      ╱       ╲       ○ = 透光孔 (slot)
     │  ○   ○  │      黑色 = 不透光 (solid)
     │         │
      ╲  ○   ╱
        ╲   ╱
         ○

光电传感器在码盘两侧:
- 发射端: LED 发光
- 接收端: 光敏元件检测

码盘旋转时:
- 对准孔 → 光透过 → 输出高电平 (1)
- 对准实心 → 光被挡 → 输出低电平 (0)

一圈有多少个孔 = 编码器分辨率
例如: 11 线编码器 = 一圈产生 11 个脉冲
StackForce 使用的编码器通常是 11 线或 14 线
```

**编码器输出信号 | Encoder Output Signals:**

```
编码器有两路输出 (A 相和 B 相), 相差 90°:

A 相: ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐
      │ │ │ │ │ │ │ │ │ │
      ┘ └─┘ └─┘ └─┘ └─┘ └─

B 相:  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐
       │ │ │ │ │ │ │ │ │ │
      ─┘ └─┘ └─┘ └─┘ └─┘ └

B 相比 A 相晚 1/4 周期 (90°)

通过判断哪个信号先变, 可以知道旋转方向:
- A 先变 → 正转 (clockwise)
- B 先变 → 反转 (counter-clockwise)

正转计数: 00→10→11→01→00 (每个周期 +4)
反转计数: 00→01→11→10→00 (每个周期 -4)
```

> **关键数字: 11 线编码器, 4 倍频 = 每转 44 个计数。** 如果电机转速是 100 RPM, 那么每秒产生 100/60 * 44 = 73.3 个脉冲。这个精度对自平衡机器人来说足够了。

> **Key number: 11-line encoder, 4x quadrature = 44 counts per revolution.** At 100 RPM, that's 100/60 * 44 = 73.3 pulses per second. Sufficient precision for a self-balancing robot.

---

## 下午 (4h) | Afternoon Session

### 4. StackForce 电机驱动板认识与接线 | StackForce Motor Driver Board & Wiring (1h)

**StackForce 驱动板概述 | StackForce Driver Board Overview:**

```
StackForce 电机驱动板:
┌──────────────────────────────────────────┐
│                                          │
│  [ESP32 模组]     [电机驱动芯片]          │
│                                          │
│  ┌────┐          ┌──────────┐            │
│  │ESP │───SPI───→│  Motor   │            │
│  │32  │          │  Driver  │──→ 电机A   │
│  │    │───PWM───→│  (MOSFET │──→ 电机B   │
│  │    │          │   Bridge)│            │
│  └────┘          └──────────┘            │
│      │                                   │
│      ├── GPIO ←── 编码器A (2个电机各2线)  │
│      │                                   │
│  [MPU6050] ←── I2C                       │
│  [电源管理] ←── 电池 7.4V-12.6V          │
│                                          │
│  接口:                                    │
│  ├── 电机接口 x2 (A相, B相, C相)          │
│  ├── 编码器接口 x2 (ENA, ENB + VCC, GND) │
│  ├── IMU 接口 (SDA, SCL)                 │
│  ├── USB-C (供电 + 烧录)                 │
│  └── 电池接口 (XT30 或类似)              │
└──────────────────────────────────────────┘
```

**接线图 | Wiring Diagram:**

```
ESP32 驱动板 ←→ BLDC 电机接线:

电机有 3 根动力线 (A/B/C 相) + 4 根编码器线:

驱动板          电机
──────        ──────
MA  ──────────  A相 (通常黄色)
MB  ──────────  B相 (通常蓝色)
MC  ──────────  C相 (通常绿色)

编码器接线:
EA  ──────────  编码器 A (通常白色或橙色)
EB  ──────────  编码器 B (通常蓝色或白色)
5V  ──────────  编码器 VCC (红色)
GND ──────────  编码器 GND (黑色)

⚠️ 注意: 不同厂家的电机线颜色可能不同!
    接线前务必查看电机规格书或用万用表确认。
    动力线 A/B/C 接错 → 电机转向反转或抖动
    编码器线接错 → 无法读取速度

Warning: Wire colors vary by manufacturer!
Check the motor datasheet or use a multimeter before wiring.
Wrong power phase wiring → motor spins backward or jitters
Wrong encoder wiring → cannot read speed
```

**电源要求 | Power Requirements:**

```
电源接线:
电池 (7.4V-12.6V 锂电池) → 驱动板电源输入
                ↓
驱动板内部:
├── 降压到 5V → 编码器供电
├── 降压到 3.3V → ESP32 供电
└── 直接驱动电机 (电机电压 = 电池电压)

⚠️ 重要:
- 不要用 USB 供电来驱动电机! USB 只能提供 500mA,
  电机启动电流可能达到 1-2A, 会导致电压骤降重启
- 调试时先不加电池, 只用 USB 测试编码器读取
- 确认接线无误后再接电池驱动电机

Warning:
- Don't power motors from USB alone! USB provides only ~500mA,
  motor startup current can reach 1-2A, causing brownout reset
- Debug encoder reading first with USB only, no battery
- Only connect battery after verifying wiring
```

---

### 5. 编写电机测试代码 | Write Motor Test Code (1.5h)

**步骤 1: 创建 PlatformIO 项目 | Step 1: Create PlatformIO Project**

创建新项目 `motor-test`，配置 `platformio.ini`:

```ini
; platformio.ini - 电机测试项目配置
; Motor test project configuration

[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200

; 引入 StackForce 电机驱动库 (或使用 SimpleFOC 等开源库)
lib_deps =
    ; 根据实际使用的库添加依赖
    ; Add actual library dependency based on driver used
```

**步骤 2: 编码器读取测试 | Step 2: Encoder Reading Test**

先只测试编码器，不驱动电机（安全第一）:

```cpp
/**
 * 编码器读取测试 - 不驱动电机，只读取编码器数据
 * Encoder reading test - read encoder data only, don't drive motor
 *
 * 笨鸟先飞:
 * - 为什么先读编码器? 因为编码器只需要 5V 供电和两根信号线,
 *   不涉及大电流, 非常安全。先确认编码器正常, 再驱动电机。
 *
 * Why read encoder first? Encoder only needs 5V and two signal wires,
 * no high current involved, very safe. Verify encoder first, then drive motor.
 */

#include <Arduino.h>

// 编码器引脚定义 (根据实际接线修改)
// Encoder pin definitions (modify based on actual wiring)
#define ENCODER_A_PIN  36   // 编码器 A 相 → GPIO36 (VP)
#define ENCODER_B_PIN  39   // 编码器 B 相 → GPIO39 (VN)

// 全局变量: 编码器计数
// Global variable: encoder count
volatile int encoderCount = 0;
int lastEncoderCount = 0;

// 上一次的编码器状态
// Previous encoder state
uint8_t lastEncoderState = 0;

// 速度计算相关变量
// Speed calculation variables
unsigned long lastTime = 0;
float currentSpeed = 0;  // RPM (转/分钟)

// 编码器参数
// Encoder parameters
const int PULSES_PER_REV = 44;  // 11线编码器 × 4倍频 = 44 脉冲/圈
                                 // 11-line encoder × 4x = 44 pulses/rev

void setup() {
  Serial.begin(115200);

  // 设置编码器引脚为输入模式
  // Set encoder pins as input
  pinMode(ENCODER_A_PIN, INPUT);
  pinMode(ENCODER_B_PIN, INPUT);

  // 读取初始状态
  // Read initial state
  lastEncoderState = (digitalRead(ENCODER_A_PIN) << 1) | digitalRead(ENCODER_B_PIN);

  lastTime = millis();

  Serial.println("编码器测试启动 | Encoder test started");
  Serial.println("请用手转动电机轴... | Turn the motor shaft by hand...");
  Serial.println("Count\tSpeed(RPM)\tDirection");
}

void loop() {
  // 读取当前编码器状态 (2位: A=高位, B=低位)
  // Read current encoder state (2 bits: A=high, B=low)
  uint8_t currentState = (digitalRead(ENCODER_A_PIN) << 1) | digitalRead(ENCODER_B_PIN);

  // 状态变化时更新计数
  // Update count on state change
  if (currentState != lastEncoderState) {
    // 根据状态变化方向决定加减
    // Determine increment/decrement based on state transition direction
    // 正转: 00→10→11→01→00
    // 反转: 00→01→11→10→00
    switch (lastEncoderState) {
      case 0: // 00
        if (currentState == 2) encoderCount++;      // 00→10 正转
        else if (currentState == 1) encoderCount--;  // 00→01 反转
        break;
      case 1: // 01
        if (currentState == 0) encoderCount++;       // 01→00
        else if (currentState == 3) encoderCount--;  // 01→11
        break;
      case 2: // 10
        if (currentState == 3) encoderCount++;       // 10→11
        else if (currentState == 0) encoderCount--;  // 10→00
        break;
      case 3: // 11
        if (currentState == 1) encoderCount++;       // 11→01
        else if (currentState == 2) encoderCount--;  // 11→10
        break;
    }
    lastEncoderState = currentState;
  }

  // 每 100ms 计算一次速度
  // Calculate speed every 100ms
  unsigned long now = millis();
  if (now - lastTime >= 100) {
    float dt = (now - lastTime) / 1000.0;  // 秒
    int deltaCount = encoderCount - lastEncoderCount;

    // 速度 (RPM) = (脉冲变化量 / 每圈脉冲数) / 时间(分钟)
    // Speed (RPM) = (pulse change / pulses per rev) / time (minutes)
    currentSpeed = (deltaCount / (float)PULSES_PER_REV) / (dt / 60.0);
    String direction = (deltaCount > 0) ? "CW" : (deltaCount < 0) ? "CCW" : "--";

    Serial.print(encoderCount);
    Serial.print("\t");
    Serial.print(currentSpeed, 1);
    Serial.print("\t\t");
    Serial.println(direction);

    lastEncoderCount = encoderCount;
    lastTime = now;
  }
}
```

> **动手测试: 用手转动电机轴**，观察串口输出。编码器计数应该随手转动变化: 正转增加，反转减少。速度值应该在转动时非零，停下时接近零。

> **Hands-on test: Turn the motor shaft by hand** and observe serial output. Encoder count should change with rotation: increase CW, decrease CCW. Speed should be non-zero when spinning, near zero when stopped.

---

### 6. 电机驱动与速度控制 | Motor Drive & Speed Control (1.5h)

**使用 PWM 驱动电机 | Driving Motor with PWM:**

```cpp
/**
 * 电机驱动测试 - 使用 PWM 控制电机速度
 * Motor drive test - Control motor speed with PWM
 *
 * 笨鸟先飞:
 * - 在实际 StackForce 项目中, 电机驱动由专用库处理 (如 SimpleFOC)
 * - 这里先用简化的 PWM 方式理解电机控制的基本概念
 * - 后续课程会切换到 FOC 控制
 *
 * In the actual StackForce project, motor driving is handled by a dedicated
 * library (like SimpleFOC). Here we use simplified PWM to understand basics.
 * Later lessons will switch to FOC control.
 */

#include <Arduino.h>

// 电机驱动引脚 (根据 StackForce 驱动板实际引脚修改)
// Motor driver pins (modify based on actual StackForce board)
#define MOTOR_PWM_PIN   25   // PWM 控制引脚
#define MOTOR_DIR_PIN   26   // 方向控制引脚
#define MOTOR_ENABLE_PIN 27  // 使能引脚

// 编码器引脚
#define ENCODER_A_PIN  36
#define ENCODER_B_PIN  39

// 编码器变量
volatile long encoderCount = 0;

// PWM 参数
const int PWM_FREQ = 20000;     // 20kHz PWM 频率 (人耳听不到)
const int PWM_CHANNEL = 0;
const int PWM_RESOLUTION = 8;   // 8-bit: 0-255
const int PWM_MAX = 255;

// 速度 PID 参数 (简化版, 先用比例控制)
// Speed PID parameters (simplified, proportional only for now)
float Kp = 0.5;        // 比例系数
float targetSpeed = 0; // 目标速度 (RPM)

// 速度测量
unsigned long lastSpeedTime = 0;
long lastSpeedCount = 0;
float measuredSpeed = 0;

void setup() {
  Serial.begin(115200);

  // 配置 PWM
  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RESOLUTION);
  ledcAttachPin(MOTOR_PWM_PIN, PWM_CHANNEL);

  // 配置方向和使能引脚
  pinMode(MOTOR_DIR_PIN, OUTPUT);
  pinMode(MOTOR_ENABLE_PIN, OUTPUT);

  // 禁用电机 (安全)
  digitalWrite(MOTOR_ENABLE_PIN, LOW);
  digitalWrite(MOTOR_DIR_PIN, LOW);
  ledcWrite(PWM_CHANNEL, 0);

  // 编码器输入
  pinMode(ENCODER_A_PIN, INPUT);
  pinMode(ENCODER_B_PIN, INPUT);

  lastSpeedTime = millis();

  Serial.println("电机驱动测试 | Motor Drive Test");
  Serial.println("命令: + = 加速, - = 减速, r = 反转, s = 停止, 0 = 关闭");
  Serial.println("Commands: + = speed up, - = slow down, r = reverse, s = stop, 0 = off");
}

void loop() {
  // 串口命令处理
  if (Serial.available()) {
    char cmd = Serial.read();
    switch (cmd) {
      case '+':
        targetSpeed += 10;  // 每次增加 10 RPM
        Serial.print("目标速度: "); Serial.print(targetSpeed); Serial.println(" RPM");
        break;
      case '-':
        targetSpeed -= 10;
        Serial.print("目标速度: "); Serial.print(targetSpeed); Serial.println(" RPM");
        break;
      case 'r':
        targetSpeed = -targetSpeed;  // 反转
        Serial.print("反转! 目标速度: "); Serial.print(targetSpeed); Serial.println(" RPM");
        break;
      case 's':
        targetSpeed = 0;  // 停止
        Serial.println("停止!");
        break;
      case '0':
        targetSpeed = 0;
        digitalWrite(MOTOR_ENABLE_PIN, LOW);
        Serial.println("电机关闭!");
        break;
      case '1':
        digitalWrite(MOTOR_ENABLE_PIN, HIGH);
        Serial.println("电机使能!");
        break;
    }
  }

  // 计算速度 (每 50ms)
  unsigned long now = millis();
  if (now - lastSpeedTime >= 50) {
    float dt = (now - lastSpeedTime) / 1000.0;
    long deltaCount = encoderCount - lastSpeedCount;
    measuredSpeed = (deltaCount / 44.0) / (dt / 60.0);  // RPM

    // 简单比例控制
    // Simple proportional control
    float error = targetSpeed - measuredSpeed;
    float output = Kp * error;

    // 限制输出范围
    output = constrain(output, -PWM_MAX, PWM_MAX);

    // 设置方向和 PWM
    if (output > 0) {
      digitalWrite(MOTOR_DIR_PIN, HIGH);
      ledcWrite(PWM_CHANNEL, (int)output);
    } else {
      digitalWrite(MOTOR_DIR_PIN, LOW);
      ledcWrite(PWM_CHANNEL, (int)(-output));
    }

    // 打印状态
    Serial.print("目标: "); Serial.print(targetSpeed, 0);
    Serial.print(" RPM | 实际: "); Serial.print(measuredSpeed, 1);
    Serial.print(" RPM | 输出: "); Serial.println((int)abs(output));

    lastSpeedCount = encoderCount;
    lastSpeedTime = now;
  }
}
```

> **安全提醒: 第一次驱动电机时请注意!**
> 1. 先用手固定住电机（防止突然高速旋转打伤手指）
> 2. 从低速开始（先发送 `1` 使能，再按 `+` 慢慢加速）
> 3. 如果电机发出异常声音（尖叫或抖动），立即按 `0` 关闭
> 4. 确保电机悬空，轮子不要接触桌面

> **Safety warning: When driving the motor for the first time!**
> 1. Hold the motor firmly (prevent sudden high-speed spinning)
> 2. Start from low speed (send `1` to enable, then `+` to gradually increase)
> 3. If the motor makes unusual sounds (squealing or jittering), press `0` immediately
> 4. Keep the motor suspended, wheels off the table

---

**使用 SimpleFOC 库驱动 BLDC (进阶) | Using SimpleFOC Library (Advanced):**

StackForce 项目可能使用 SimpleFOC 或自定义驱动库。以下是 SimpleFOC 的基本用法:

```cpp
/**
 * SimpleFOC BLDC 电机控制示例
 * SimpleFOC BLDC motor control example
 *
 * 笨鸟先飞:
 * - SimpleFOC 是一个开源的 BLDC 电机控制库, 支持 FOC 算法
 * - 它封装了复杂的数学变换, 让我们专注于控制逻辑
 * - 在 platformio.ini 中添加: lib_deps = askuravilo/SimpleFOC@^2.2
 *
 * SimpleFOC is an open-source BLDC motor control library supporting FOC.
 * It wraps complex math transforms so we focus on control logic.
 * Add to platformio.ini: lib_deps = askuravilo/SimpleFOC@^2.2
 */

#include <SimpleFOC.h>

// 电机参数
BLDCMotor motor = BLDCMotor(7);  // 7 对极 (根据你的电机修改)
                                  // 7 pole pairs (modify for your motor)

// 驱动器参数 (根据实际驱动芯片修改引脚)
BLDCDriver3PWM driver = BLDCDriver3PWM(25, 26, 27);

// 编码器
Encoder encoder = Encoder(36, 39, 500);  // A_pin, B_pin, 脉冲/圈

void doA() { encoder.handleA(); }
void doB() { encoder.handleB(); }

void setup() {
  Serial.begin(115200);

  // 初始化编码器
  encoder.quadrature = Quadrature::ON;
  encoder.init();
  encoder.enableInterrupts(doA, doB);

  // 初始化驱动器
  driver.voltage_power_supply = 12;  // 电池电压 12V
  driver.init();

  // 连接编码器到电机
  motor.linkSensor(&encoder);

  // 设置电机参数
  motor.controller = MotionControlType::velocity;  // 速度控制模式
  motor.PID_velocity.P = 0.2;    // 比例增益
  motor.PID_velocity.I = 20;     // 积分增益
  motor.PID_velocity.D = 0;      // 微分增益
  motor.voltage_limit = 6;       // 电压限制 (安全!)

  // 连接驱动器并初始化电机
  motor.linkDriver(&driver);
  motor.init();

  // 初始化 FOC
  motor.initFOC();

  Serial.println("Motor ready! | 电机就绪!");
  Serial.println("发送速度命令 (RPM), 例如: 30");
}

void loop() {
  // FOC 循环 (必须高频调用)
  motor.loopFOC();
  motor.move();

  // 串口接收目标速度
  if (Serial.available()) {
    float target = Serial.parseFloat();
    motor.target = target;
    Serial.print("目标速度: "); Serial.print(target); Serial.println(" RPM");
  }
}
```

---

## 常见问题与排查 | Common Issues & Troubleshooting

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 电机不转 | 使能未打开、PWM=0 | 检查 enable 引脚、确认 PWM 输出 > 0 |
| 电机抖动不转 | A/B/C 相接线错误、换向序列错误 | 调换任意两根动力线试试 |
| 电机尖叫 | PWM 频率在可听范围内 | 提高 PWM 频率到 20kHz 以上 |
| 编码器计数不变 | 接线错误、编码器损坏 | 用万用表检查信号线电压变化 |
| 编码器只往一个方向计数 | B 相未接或损坏 | 检查 B 相接线 |
| 电机方向错误 | A/B 相交换或 DIR 引脚反了 | 调换编码器 A/B 线或修改代码中的方向 |
| 电机过热 | 电流过大、堵转 | 降低电压限制，检查负载 |
| 速度不稳定 | PID 参数不对、编码器噪声 | 调整 PID 参数，加滤波电容 |

---

## 今日作业 | Today's Task

1. **必做 | Required:** 完成编码器读取测试，手动转动电机轴能看到正确的计数和速度
   Complete encoder reading test; manual rotation shows correct count and speed.

2. **必做 | Required:** 完成电机驱动测试，能通过串口命令控制电机正转/反转/停止
   Complete motor drive test; control motor CW/CCW/stop via serial commands.

3. **必做 | Required:** 在笔记本上画出 BLDC 电机三相换向的六步序列图
   Draw the BLDC six-step commutation sequence diagram in your notebook.

4. **选做 | Optional:** 尝试使用 SimpleFOC 库驱动电机 (需要 FOC 校准)
   Try driving the motor with SimpleFOC library (requires FOC calibration).

5. **思考 | Reflection:** 为什么自平衡机器人用 BLDC 电机而不是普通 DC 电机？如果编码器坏了，机器人还能保持平衡吗？
   Why BLDC instead of regular DC motors for self-balancing? If the encoder breaks, can the robot still balance?

---

## 今日检查点 | Checkpoint

- [ ] 你能说出至少 3 种电机类型及其特点吗？
  Can you name at least 3 motor types and their characteristics?
- [ ] 你能解释 BLDC 电机为什么需要"换向"吗？
  Can you explain why BLDC motors need "commutation"?
- [ ] 编码器测试通过: 手动转动电机轴，串口显示正确的计数和方向？
  Encoder test passed: manual shaft rotation shows correct count and direction?
- [ ] 电机驱动测试通过: 能通过串口命令控制电机速度和方向？
  Motor drive test passed: can control speed and direction via serial commands?
- [ ] 你理解 PWM 频率为什么要设到 20kHz 吗？
  Do you understand why PWM frequency should be set to 20kHz?
- [ ] 你知道电机首次调试时的安全注意事项吗？
  Do you know the safety precautions for first-time motor debugging?

---

## 参考资源 | References

- [StackForce 轮足机器人 Gitee 仓库](https://gitee.com/StackForce/bipedal_wheeled_robot)
- [B站: 手把手教做轮足机器人](https://www.bilibili.com/video/BV1kz421B73V)
- [SimpleFOC 官方文档](https://docs.simplefoc.com/)
- [SimpleFOC GitHub](https://github.com/simplefoc/Arduino-FOC)
- [BLDC 电机原理 (B站)](https://search.bilibili.com/all?keyword=BLDC%20%E7%94%B5%E6%9C%BA%20%E5%8E%9F%E7%90%86)
- [编码器原理详解](https://www.youtube.com/results?search_query=rotary+encoder+working+principle)
- [FOC 算法入门](https://www.youtube.com/results?search_query=field+oriented+control+beginner)

---

*最后更新: 2026-05-27*
