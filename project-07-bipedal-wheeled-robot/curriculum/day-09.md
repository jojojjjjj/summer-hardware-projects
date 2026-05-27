# Day 09: 轮足运动模式 | Wheeled-Legged Motion Modes

## 今日目标 | Today's Goals
- 理解轮足机器人的三种运动模式：纯轮式、纯足式、混合模式
- Understand the three motion modes of a bipedal wheeled robot: pure wheel, pure leg, and hybrid
- 掌握舵机控制腿关节的基本原理与 PWM 信号配置
- Master the basics of servo-controlled leg joints and PWM signal configuration
- 实现模式切换逻辑与遥控器模式选择功能
- Implement mode-switching logic and remote mode selection

---

## 上午 (3h) | Morning Session

### 1. 运动模式原理 (1.5h) | Motion Mode Theory

#### 纯轮式模式（平衡车模式）| Pure Wheel Mode (Segway Mode)

纯轮式模式下，机器人像两轮平衡车一样工作。两个 BLDC 电机驱动轮子前进、后退和转向，IMU 提供姿态反馈，PID 控制器保持直立平衡。

In pure wheel mode, the robot functions like a two-wheeled Segway. Two BLDC motors drive the wheels forward, backward, and for steering. The IMU provides attitude feedback, and the PID controller maintains upright balance.

```
纯轮式模式控制框图 | Pure Wheel Mode Control Block Diagram

        ┌──────────┐     ┌─────────┐     ┌──────────┐     ┌────────┐
IMU ──► │ 姿态解算  │ ──► │ PID控制器 │ ──► │ 电机驱动  │ ──► │  轮子   │
        │ Attitude │     │   PID   │     │  Motor   │     │ Wheels │
        └──────────┘     └─────────┘     └──────────┘     └────────┘
                              ▲                                │
                              │          ┌───────────┐         │
                              └───────── │  编码器反馈 │ ◄───────┘
                                         │  Encoder  │
                                         └───────────┘
```

**平衡控制核心代码 | Balance Control Core Code:**

```cpp
#include <MPU6050.h>
#include <PID_v1.h>

// PID 参数 | PID Parameters
double setpoint = 0.0;       // 目标角度 | Target angle
double input, output;
double Kp = 25.0, Ki = 0.5, Kd = 0.8;
PID balancePID(&input, &output, &setpoint, Kp, Ki, Kd, DIRECT);

// IMU 姿态变量 | IMU attitude variables
float angle = 0.0;           // 当前倾斜角 | Current tilt angle
float gyro_x = 0.0;          // 角速度 | Angular velocity

void setup() {
    Serial.begin(115200);
    Wire.begin();
    mpu.initialize();

    // 验证 IMU 连接 | Verify IMU connection
    if (!mpu.testConnection()) {
        Serial.println("MPU6050 连接失败 | MPU6050 connection failed!");
        while (1);
    }

    balancePID.SetMode(AUTOMATIC);
    balancePID.SetOutputLimits(-255, 255);
    Serial.println("纯轮模式就绪 | Pure wheel mode ready");
}

void loop() {
    // 读取 IMU 数据 | Read IMU data
    readIMU();

    // PID 计算平衡输出 | PID balance calculation
    input = angle;
    balancePID.Compute();

    // 输出到电机 | Output to motors
    driveMotors(output);

    delay(10);  // 100Hz 控制循环 | 100Hz control loop
}
```

#### 纯足式模式（步行概念）| Pure Leg Mode (Walking Concept)

纯足式模式下，舵机控制腿部关节执行步行动作。每个腿有两个主要关节：髋关节和膝关节。通过预设关节角度序列模拟步态周期。

In pure leg mode, servos control leg joints to execute walking motions. Each leg has two primary joints: hip and knee. A gait cycle is simulated through preset joint angle sequences.

```
步态周期示意图 | Gait Cycle Diagram

阶段 Phase:    ①        ②        ③        ④
             ┌─┐      ┌─┐      ┌─┐      ┌─┐
             │O│      │/│      │O│      │\│
            /│ │      │ │     /│ │      │ │
             │ │      │ │      │ │      │ │
            /  /      /  /      \  \      \  \
           /  /      /  /        \  \      \  \

  左腿 Left:  支撑 Support  抬腿 Lift  支撑 Support  落地 Strike
  右腿 Right: 抬腿 Lift    支撑 Support 落地 Strike  支撑 Support
```

**舵机控制核心代码 | Servo Control Core Code:**

```cpp
#include <ESP32Servo.h>

// 腿部舵机定义 | Leg servo definitions
// 左腿 | Left leg
Servo hipLeft;
Servo kneeLeft;
// 右腿 | Right leg
Servo hipRight;
Servo kneeRight;

// 舵机引脚 | Servo pins
#define HIP_LEFT_PIN    25
#define KNEE_LEFT_PIN   26
#define HIP_RIGHT_PIN   27
#define KNEE_RIGHT_PIN  14

// 步态关键角度 | Gait key angles (degrees)
// 角度定义: 90° = 直立, <90° = 前倾, >90° = 后倾
struct GaitPose {
    int hipL, kneeL, hipR, kneeR;
};

// 步态序列 | Gait sequence
GaitPose gaitSequence[] = {
    {90, 90, 90, 90},   // 站立 Stand
    {70, 70, 90, 90},   // 左腿抬起 Left leg lift
    {70, 110, 90, 90},  // 左腿前伸 Left leg extend
    {90, 90, 90, 90},   // 双腿站立 Both legs stand
    {90, 90, 70, 70},   // 右腿抬起 Right leg lift
    {90, 90, 70, 110},  // 右腿前伸 Right leg extend
    {90, 90, 90, 90},   // 回到站立 Return to stand
};

const int GAIT_STEPS = sizeof(gaitSequence) / sizeof(gaitSequence[0]);
const int STEP_DELAY = 300;  // 每步间隔(ms) | Step interval (ms)

void setupLegServos() {
    hipLeft.attach(HIP_LEFT_PIN, 500, 2500);
    kneeLeft.attach(KNEE_LEFT_PIN, 500, 2500);
    hipRight.attach(HIP_RIGHT_PIN, 500, 2500);
    kneeRight.attach(KNEE_RIGHT_PIN, 500, 2500);

    // 初始化到站立位 | Initialize to standing position
    setPose(gaitSequence[0]);
    Serial.println("腿部舵机初始化完成 | Leg servos initialized");
}

void setPose(GaitPose pose) {
    hipLeft.write(pose.hipL);
    kneeLeft.write(pose.kneeL);
    hipRight.write(pose.hipR);
    kneeRight.write(pose.kneeR);
}

void executeGaitCycle(int cycles = 1) {
    for (int c = 0; c < cycles; c++) {
        for (int i = 0; i < GAIT_STEPS; i++) {
            setPose(gaitSequence[i]);
            delay(STEP_DELAY);
        }
    }
}
```

#### 混合模式 | Hybrid Mode

混合模式结合轮式和足式的优点：轮子负责快速移动，腿部负责跨越障碍和不平整地形。这是 StackForce 轮足机器人的核心创新。

Hybrid mode combines the strengths of wheeled and legged locomotion: wheels provide fast movement, while legs handle obstacle traversal and uneven terrain. This is the core innovation of the StackForce bipedal wheeled robot.

```
混合模式决策逻辑 | Hybrid Mode Decision Logic

                ┌─────────────────┐
                │   检测地形/指令   │
                │ Detect terrain   │
                └────────┬────────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
         平坦地面    小障碍物    大障碍物
         Flat       Small obs   Large obs
              │          │          │
              ▼          ▼          ▼
         纯轮模式    混合模式    纯足模式
         Wheel      Hybrid      Leg
         快速巡航    轮驱动+    步行跨越
         Fast cruise 腿辅助     Walk over
```

**模式切换数据结构 | Mode Switch Data Structure:**

```cpp
// 运动模式枚举 | Motion mode enumeration
enum MotionMode {
    MODE_WHEEL,       // 纯轮式 | Pure wheel (Segway)
    MODE_LEG,         // 纯足式 | Pure leg (Walking)
    MODE_HYBRID,      // 混合模式 | Hybrid (Wheel + Leg)
    MODE_TRANSITION   // 过渡中 | Transitioning
};

// 当前模式 | Current mode
MotionMode currentMode = MODE_WHEEL;
MotionMode targetMode = MODE_WHEEL;

// 模式切换安全检查 | Mode switch safety check
bool canSwitchMode(MotionMode from, MotionMode to) {
    // 从纯轮切到纯足：先减速停车
    // From wheel to leg: must slow down first
    if (from == MODE_WHEEL && to == MODE_LEG) {
        return (abs(currentSpeed) < 0.1);  // 速度必须接近零
    }
    // 从纯足切到纯轮：腿必须收回站立位
    // From leg to wheel: legs must return to standing position
    if (from == MODE_LEG && to == MODE_WHEEL) {
        return isLegsStanding();
    }
    // 其他切换始终允许 | Other transitions always allowed
    return true;
}
```

---

### 2. 舵机 PWM 控制深入 (1.5h) | Servo PWM Control Deep Dive

#### ESP32 PWM 与舵机信号 | ESP32 PWM and Servo Signals

ESP32 的 LEDC 外设可以生成舵机所需的 50Hz PWM 信号。脉冲宽度范围 500-2500us 对应舵机 0-180 度。

The ESP32's LEDC peripheral can generate the 50Hz PWM signal required by servos. A pulse width range of 500-2500us corresponds to 0-180 degrees of servo rotation.

```
舵机 PWM 信号时序 | Servo PWM Signal Timing

          ┌───┐                               ┌───┐
          │   │                               │   │
    ──────┘   └───────────────────────────────┘   └──────
          │←─→│
      500-2500us (脉宽 pulse width)
          │←───────────────────────────────────→│
                    20ms 周期 (50Hz period)

    500us  → 0°    (最小角度 | min angle)
    1500us → 90°   (中位 | center)
    2500us → 180°  (最大角度 | max angle)
```

**ESP32Servo 多路舵机控制 | ESP32Servo Multi-Channel Control:**

```cpp
#include <ESP32Servo.h>

#define NUM_SERVOS 4  // 4个腿部舵机 | 4 leg servos

struct ServoConfig {
    const char* name;
    int pin;
    int minPulse;    // 最小脉宽(us) | Min pulse width
    int maxPulse;    // 最大脉宽(us) | Max pulse width
    int centerAngle; // 中位角度 | Center angle
    Servo servo;
};

ServoConfig servos[NUM_SERVOS] = {
    {"左髋 Left Hip",     HIP_LEFT_PIN,   500, 2500, 90},
    {"左膝 Left Knee",    KNEE_LEFT_PIN,  500, 2500, 90},
    {"右髋 Right Hip",    HIP_RIGHT_PIN,  500, 2500, 90},
    {"右膝 Right Knee",   KNEE_RIGHT_PIN, 500, 2500, 90},
};

void initAllServos() {
    for (int i = 0; i < NUM_SERVOS; i++) {
        servos[i].servo.attach(servos[i].pin, servos[i].minPulse, servos[i].maxPulse);
        servos[i].servo.write(servos[i].centerAngle);
        Serial.printf("舵机 %s 已初始化在引脚 %d\n",
                      servos[i].name, servos[i].pin);
        Serial.printf("Servo %s initialized on pin %d\n",
                      servos[i].name, servos[i].pin);
        delay(100);  // 避免上电冲击 | Avoid power surge
    }
}

// 平滑移动舵机 | Smoothly move servo
void smoothMove(ServoConfig &sc, int targetAngle, int stepDelay = 15) {
    int current = sc.servo.read();
    int step = (targetAngle > current) ? 1 : -1;

    while (current != targetAngle) {
        current += step;
        sc.servo.write(current);
        delay(stepDelay);
    }
}

// 舵机测试函数 | Servo test function
void testServoRange(int index) {
    if (index < 0 || index >= NUM_SERVOS) return;

    Serial.printf("测试舵机: %s\n", servos[index].name);
    Serial.printf("Testing servo: %s\n", servos[index].name);

    smoothMove(servos[index], 0);     // → 0°
    delay(500);
    smoothMove(servos[index], 90);    // → 90°
    delay(500);
    smoothMove(servos[index], 180);   // → 180°
    delay(500);
    smoothMove(servos[index], 90);    // → 回中 Return to center
}
```

#### 舵机电源与注意事项 | Servo Power and Precautions

```
舵机电源设计要点 | Servo Power Design Notes

  ⚠️ 重要警告 | Important Warning:
  ─────────────────────────────────
  舵机不能直接从 ESP32 的 3.3V/5V 引脚供电！
  DO NOT power servos directly from ESP32 3.3V/5V pins!

  原因 Reason:
  - SG90 舵机堵转电流可达 500mA+ | SG90 stall current can reach 500mA+
  - ESP32 最大输出约 40mA | ESP32 max output ~40mA
  - 直接连接可能导致 ESP32 损坏 | Direct connection may damage ESP32

  正确做法 Correct approach:
  ┌──────────────────────────────────────────┐
  │  锂电池 (7.4V)                            │
  │  Li-ion battery (7.4V)                    │
  │     │                                     │
  │     ├──► 降压模块 (BEC 5V/6V 3A) ──► 舵机 │
  │     │    Step-down (BEC 5V/6V 3A)  Servos │
  │     │                                     │
  │     └──► ESP32 (通过 VIN)                  │
  │          ESP32 (via VIN)                   │
  │                                           │
  │  ⚠️ 舵机 GND 与 ESP32 GND 必须共地！       │
  │  ⚠️ Servo GND must share with ESP32 GND!  │
  └──────────────────────────────────────────┘
```

---

## 下午 (4h) | Afternoon Session

### 2. 模式切换实现 (2h) | Mode Switching Implementation

#### 完整模式切换状态机 | Complete Mode Switching State Machine

```cpp
#include <ESP32Servo.h>
#include <Wire.h>
#include <MPU6050.h>

// ========== 模式定义 | Mode Definitions ==========
enum MotionMode {
    MODE_WHEEL,
    MODE_LEG,
    MODE_HYBRID,
    MODE_TRANSITION
};

// ========== 全局状态 | Global State ==========
MotionMode currentMode = MODE_WHEEL;
float currentSpeed = 0.0;
bool motorsEnabled = true;

// ========== 模式切换函数 | Mode Switch Functions ==========

// 切换到纯轮模式 | Switch to pure wheel mode
void switchToWheelMode() {
    Serial.println("切换到纯轮模式 | Switching to wheel mode...");

    // 第1步：收回腿部到站立位 | Step 1: Retract legs to standing
    retractLegs();
    delay(500);

    // 第2步：启用平衡 PID | Step 2: Enable balance PID
    enableBalancePID();

    // 第3步：更新模式 | Step 3: Update mode
    currentMode = MODE_WHEEL;
    Serial.println("纯轮模式激活 | Wheel mode active");
}

// 切换到纯足模式 | Switch to pure leg mode
void switchToLegMode() {
    Serial.println("切换到纯足模式 | Switching to leg mode...");

    // 第1步：停止轮子 | Step 1: Stop wheels
    stopWheels();

    // 第2步：等待速度为零 | Step 2: Wait for zero speed
    int timeout = 1000;
    while (abs(currentSpeed) > 0.05 && timeout > 0) {
        delay(10);
        timeout -= 10;
    }

    // 第3步：禁用平衡 PID | Step 3: Disable balance PID
    disableBalancePID();

    // 第4步：腿部进入站立位 | Step 4: Legs to standing position
    standUp();

    // 第5步：更新模式 | Step 5: Update mode
    currentMode = MODE_LEG;
    Serial.println("纯足模式激活 | Leg mode active");
}

// 切换到混合模式 | Switch to hybrid mode
void switchToHybridMode() {
    Serial.println("切换到混合模式 | Switching to hybrid mode...");

    // 从当前模式平滑过渡 | Smooth transition from current mode
    if (currentMode == MODE_WHEEL) {
        // 保持轮子运转，展开腿部准备辅助
        // Keep wheels running, deploy legs for assistance
        deployLegs();
    } else if (currentMode == MODE_LEG) {
        // 从步行切换：先收回站立，再启动轮子
        // From walking: retract to standing, then start wheels
        retractLegs();
        delay(300);
        enableBalancePID();
    }

    currentMode = MODE_HYBRID;
    Serial.println("混合模式激活 | Hybrid mode active");
}

// ========== 辅助函数 | Helper Functions ==========

void retractLegs() {
    // 平滑收回所有腿部舵机 | Smoothly retract all leg servos
    for (int i = 0; i < NUM_SERVOS; i++) {
        smoothMove(servos[i], servos[i].centerAngle, 10);
    }
}

void deployLegs() {
    // 展开腿部到行走准备位 | Deploy legs to walking ready position
    smoothMove(servos[0], 80, 10);  // 左髋 Left hip
    smoothMove(servos[1], 85, 10);  // 左膝 Left knee
    smoothMove(servos[2], 100, 10); // 右髋 Right hip
    smoothMove(servos[3], 95, 10);  // 右膝 Right knee
}

void standUp() {
    // 依次展开关节（避免同时发力过大）
    // Extend joints sequentially (avoid simultaneous high current)
    for (int angle = 45; angle <= 90; angle += 2) {
        for (int i = 0; i < NUM_SERVOS; i++) {
            servos[i].servo.write(angle);
        }
        delay(20);
    }
}

void stopWheels() {
    // 逐渐减速停车 | Gradually decelerate to stop
    for (int speed = (int)currentSpeed; speed != 0; speed += (speed > 0 ? -1 : 1)) {
        setMotorSpeed(speed);
        delay(10);
    }
    currentSpeed = 0;
}

bool isLegsStanding() {
    // 检查所有舵机是否在中位(±5°) | Check all servos at center (±5°)
    for (int i = 0; i < NUM_SERVOS; i++) {
        if (abs(servos[i].servo.read() - servos[i].centerAngle) > 5) {
            return false;
        }
    }
    return true;
}
```

---

### 3. 遥控模式选择 (2h) | Remote Mode Selection

#### 蓝牙遥控器模式切换 | Bluetooth Remote Mode Switching

使用手机蓝牙串口或 PS4 手柄切换运动模式。

Use a phone Bluetooth serial app or PS4 controller to switch motion modes.

```cpp
#include <BluetoothSerial.h>

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error 蓝牙未启用！请检查板卡设置 | Bluetooth not enabled! Check board settings.
#endif

BluetoothSerial SerialBT;

// 遥控命令定义 | Remote command definitions
#define CMD_WHEEL   'W'   // 切换纯轮模式 | Switch to wheel mode
#define CMD_LEG     'L'   // 切换纯足模式 | Switch to leg mode
#define CMD_HYBRID  'H'   // 切换混合模式 | Switch to hybrid mode
#define CMD_STATUS  'S'   // 查询状态 | Query status
#define CMD_FORWARD 'F'   // 前进 | Forward
#define CMD_BACK    'B'   // 后退 | Backward
#define CMD_LEFT    'A'   // 左转 | Left turn
#define CMD_RIGHT   'D'   // 右转 | Right turn
#define CMD_STOP    'X'   // 停止 | Stop

// 速度参数 | Speed parameters
float moveSpeed = 0.0;
float turnRate = 0.0;

void setupBluetooth() {
    SerialBT.begin("BipedalBot");  // 蓝牙设备名 | Bluetooth device name
    Serial.println("蓝牙已启动，设备名: BipedalBot");
    Serial.println("Bluetooth started, device name: BipedalBot");
    Serial.println("可用命令 | Available commands:");
    Serial.println("  W - 纯轮模式 Wheel mode");
    Serial.println("  L - 纯足模式 Leg mode");
    Serial.println("  H - 混合模式 Hybrid mode");
    Serial.println("  F/B/A/D/X - 运动 Movement");
    Serial.println("  S - 状态查询 Status query");
}

void handleRemoteCommand(char cmd) {
    switch (cmd) {
        case CMD_WHEEL:
            switchToWheelMode();
            break;

        case CMD_LEG:
            switchToLegMode();
            break;

        case CMD_HYBRID:
            switchToHybridMode();
            break;

        case CMD_FORWARD:
            if (currentMode == MODE_WHEEL || currentMode == MODE_HYBRID) {
                moveSpeed = 1.0;
                Serial.println("前进 | Forward");
            } else if (currentMode == MODE_LEG) {
                executeGaitCycle(1);
                Serial.println("迈步 | Step forward");
            }
            break;

        case CMD_BACK:
            moveSpeed = -1.0;
            Serial.println("后退 | Backward");
            break;

        case CMD_LEFT:
            turnRate = -0.5;
            Serial.println("左转 | Turn left");
            break;

        case CMD_RIGHT:
            turnRate = 0.5;
            Serial.println("右转 | Turn right");
            break;

        case CMD_STOP:
            moveSpeed = 0.0;
            turnRate = 0.0;
            stopWheels();
            Serial.println("停止 | Stop");
            break;

        case CMD_STATUS:
            sendStatus();
            break;
    }
}

void sendStatus() {
    // 发送当前状态到蓝牙 | Send current status via Bluetooth
    SerialBT.println("===== 状态报告 | Status Report =====");
    SerialBT.printf("模式 Mode: ");
    switch (currentMode) {
        case MODE_WHEEL:  SerialBT.println("纯轮 Wheel"); break;
        case MODE_LEG:    SerialBT.println("纯足 Leg"); break;
        case MODE_HYBRID: SerialBT.println("混合 Hybrid"); break;
        default:          SerialBT.println("过渡中 Transitioning"); break;
    }
    SerialBT.printf("速度 Speed: %.2f\n", moveSpeed);
    SerialBT.printf("转向 Turn: %.2f\n", turnRate);
    SerialBT.printf("倾角 Tilt: %.1f°\n", angle);
    SerialBT.printf("电池 Battery: %.1fV\n", readBatteryVoltage());
    SerialBT.println("===================================");
}

float readBatteryVoltage() {
    // 读取电池电压 (通过分压电阻) | Read battery voltage (via voltage divider)
    int raw = analogRead(34);  // 假设分压接在 GPIO34 | Assume divider on GPIO34
    // 分压比 1:2, 满量程 3.3V → 12bit ADC
    // Divider ratio 1:2, full scale 3.3V → 12bit ADC
    return (raw / 4095.0) * 3.3 * 2.0;
}

// ========== 主循环 | Main Loop ==========

void setup() {
    Serial.begin(115200);
    Wire.begin();

    initAllServos();       // 初始化舵机 | Init servos
    setupBluetooth();      // 初始化蓝牙 | Init Bluetooth
    setupIMU();            // 初始化 IMU | Init IMU (from previous day)
    setupMotors();         // 初始化电机 | Init motors (from previous day)

    // 默认启动纯轮模式 | Default to wheel mode on startup
    switchToWheelMode();
    Serial.println("系统就绪！| System ready!");
}

void loop() {
    // 处理蓝牙命令 | Process Bluetooth commands
    if (SerialBT.available()) {
        char cmd = SerialBT.read();
        handleRemoteCommand(cmd);
    }

    // 串口调试命令 | Serial debug commands
    if (Serial.available()) {
        char cmd = Serial.read();
        handleRemoteCommand(cmd);
    }

    // 根据当前模式执行控制 | Execute control based on current mode
    switch (currentMode) {
        case MODE_WHEEL:
            updateBalance();      // 平衡控制 | Balance control
            break;
        case MODE_LEG:
            // 步行由遥控触发 | Walking triggered by remote
            break;
        case MODE_HYBRID:
            updateBalance();      // 保持平衡 | Maintain balance
            updateLegAssist();    // 腿部辅助 | Leg assistance
            break;
        default:
            break;
    }

    delay(10);  // 100Hz 主循环 | 100Hz main loop
}

void updateLegAssist() {
    // 混合模式下，根据倾斜角度辅助平衡
    // In hybrid mode, assist balance based on tilt angle
    if (abs(angle) > 10.0) {
        // 大倾角时腿部辅助调整重心
        // Large tilt: legs assist center of gravity adjustment
        int hipAdjust = map(angle, -30, 30, 70, 110);
        hipLeft.write(hipAdjust);
        hipRight.write(180 - hipAdjust);  // 镜像 | Mirror
    }
}
```

#### 手机端遥控说明 | Phone Remote Instructions

```
推荐蓝牙串口 APP | Recommended Bluetooth Serial Apps:
─────────────────────────────────────────
Android: Serial Bluetooth Terminal
iOS:     BLE Terminal

连接步骤 | Connection Steps:
1. 打开蓝牙，搜索 "BipedalBot" | Open Bluetooth, search "BipedalBot"
2. 配对连接 | Pair and connect
3. 在 APP 终端中输入命令 | Enter commands in app terminal

快捷用法 | Quick Usage:
  输入 W → 切换纯轮模式
  输入 L → 切换纯足模式
  输入 H → 切换混合模式
  输入 F → 前进
  输入 S → 查看状态
```

---

## 今日作业 | Today's Task

1. **舵机测试 | Servo Testing**
   - 将 4 个舵机连接到 ESP32，验证每个舵机都能在 0-180° 范围内正常转动
   - Connect 4 servos to ESP32 and verify each moves correctly through 0-180°
   - 使用 `testServoRange()` 函数逐个测试，记录每个舵机的实际角度范围
   - Test each servo with `testServoRange()`, record the actual angle range of each servo

2. **步态调试 | Gait Tuning**
   - 调整 `gaitSequence` 中的角度值，使步行动作更自然流畅
   - Adjust angle values in `gaitSequence` to make walking motion more natural and smooth
   - 记录修改前后的角度值，拍摄对比视频
   - Record angle values before and after changes, take comparison videos

3. **模式切换实验 | Mode Switching Experiment**
   - 通过蓝牙串口分别切换三种模式，观察切换过程是否平稳
   - Switch between three modes via Bluetooth serial, observe if transitions are smooth
   - 记录任何异常行为（抖动、失衡、舵机抖振）
   - Document any abnormal behavior (jitter, loss of balance, servo jitter)

4. **参数记录表 | Parameter Log**
   - 整理以下参数到你的工程笔记中：
   - Organize the following parameters into your engineering notebook:

   ```
   参数记录表 | Parameter Log Sheet
   ┌────────────────────┬────────┬────────┐
   │ 参数 Parameter     │ 默认值  │ 调优值  │
   │                    │ Default │ Tuned  │
   ├────────────────────┼────────┼────────┤
   │ 平衡 Kp            │ 25.0   │        │
   │ 平衡 Ki            │ 0.5    │        │
   │ 平衡 Kd            │ 0.8    │        │
   │ 步态间隔(ms)       │ 300    │        │
   │ 舵机平滑延迟(ms)   │ 15     │        │
   │ 左髋范围           │ 0-180  │        │
   │ 左膝范围           │ 0-180  │        │
   │ 右髋范围           │ 0-180  │        │
   │ 右膝范围           │ 0-180  │        │
   └────────────────────┴────────┴────────┘
   ```

---

## 今日检查点 | Checkpoint

- [ ] 能说出三种运动模式的区别和应用场景 | Can explain differences and use cases of three motion modes
- [ ] 4 个舵机全部连接并能正常转动 | All 4 servos connected and rotating normally
- [ ] 纯轮模式平衡控制正常运行 | Pure wheel mode balance control functioning
- [ ] 步态序列能让腿部执行基本步行动作 | Gait sequence produces basic walking motion
- [ ] 蓝牙遥控能切换三种运动模式 | Bluetooth remote can switch between three motion modes
- [ ] 模式切换过程不会导致机器人倾倒 | Mode transitions don't cause robot to tip over
- [ ] 完成参数记录表 | Parameter log sheet completed
- [ ] 代码已上传到个人 Git 仓库 | Code pushed to personal Git repository

---

### 常见问题排查 | Troubleshooting

| 问题 Problem | 可能原因 Possible Cause | 解决方案 Solution |
|---|---|---|
| 舵机不动 Servo doesn't move | 电源不足 Insufficient power | 使用独立 5V BEC 供电 Use separate 5V BEC |
| 舵机抖振 Servo jitter | PWM 信号不稳定 Unstable PWM | 增加平滑延迟，检查接线 Increase smooth delay, check wiring |
| 模式切换后失衡 Loss of balance after switch | 腿部位置影响重心 Leg position shifts center of gravity | 优化收回动作，增加过渡延时 Optimize retract motion, add transition delay |
| 蓝牙连接失败 Bluetooth fails to connect | 未配对或距离太远 Not paired or too far | 重新配对，距离 < 10m Re-pair, distance < 10m |
| 步行时前倾/后倾 Tilting during walking | 步态角度不均衡 Uneven gait angles | 微调各关节角度 Finetune each joint angle |
| 电机与舵机冲突 Motor-servo conflict | 模式未正确切换 Mode not correctly switched | 添加状态检查日志 Add state check logging |
