# Day 06: 串级PID与速度控制 | Cascaded PID & Velocity Control

## 今日目标 | Today's Goals

- 理解为什么单环 PID 不够用 | Understand why single-loop PID is not enough
- 掌握串级控制结构（外环速度环 → 内环平衡环）| Master cascaded control (outer velocity → inner balance)
- 理解并实现转向控制（偏航控制/差速转向）| Understand and implement turning (yaw/differential steering)
- 在机器人上实现完整的三环串级控制 | Implement complete 3-loop cascaded control on robot
- 通过串口命令控制前进/后退/转弯 | Control forward/backward/turn via serial commands

---

## 上午 (3h) | Morning Session

### 1. 为什么单环 PID 不够？| Why Single-Loop PID is Not Enough (45min)

#### 昨天的成果与局限 | Yesterday's Achievement and Limitations

昨天我们实现了单环 PID，机器人能站稳了。但你会发现三个问题：

Yesterday we implemented single-loop PID, and the robot can stand. But you'll notice three problems:

```
问题 1: 机器人会慢慢漂移
Problem 1: Robot drifts slowly

  ┌──────┐     ┌──────┐     ┌──────┐     ┌──────┐
  │ 站稳  │ ──→ │ 稍倾斜 │ ──→ │ 走几步 │ ──→ │ 越走越远
  │ Stands │     │ Slight │     │ Steps  │     │ Runs away
  │ still  │     │ lean   │     │        │     │
  └──────┘     └──────┘     └──────┘     └──────┘
```

```
问题 2: 推一下会走很远才停下
Problem 2: Pushes cause long travel before stopping

     推！           ─────────────────→ 走很远才停
     Push!    ────────────────────────→ Travels far before stopping
```

```
问题 3: 不能遥控，不能转弯
Problem 3: No remote control, no turning

  只能原地站着 ── 无聊！
  Can only stand in place — boring!
```

#### 根本原因分析 | Root Cause Analysis

```
单环 PID 只关心角度 | Single-loop PID only cares about angle

  输入: 倾斜角 → 输出: 电机PWM
  Input: tilt angle → Output: motor PWM

  它不知道:
    - 机器人移动了多远（位置）
    - 机器人移动了多快（速度）
    - 机器人朝哪个方向（偏航）

  It doesn't know:
    - How far the robot moved (position)
    - How fast the robot is moving (velocity)
    - Which direction the robot is facing (yaw)
```

> **笨鸟先飞原则 | Smart Bird Principle**: 这就像骑自行车——你不仅要保持平衡（角度），还要控制速度（不能太快或太慢）、方向（不能跑偏）。一个控制器同时做三件事？太难了。解决方法是**分层控制**——每个控制器只做一件事。

> It's like riding a bicycle — you need to maintain balance (angle), control speed, and control direction. One controller doing all three? Too hard. The solution is **hierarchical control** — each controller does only one thing.

---

### 2. 串级控制结构 | Cascaded Control Structure (1h)

#### 串级控制的核心思想 | Core Idea of Cascaded Control

```
串级 = 嵌套的控制器 | Cascaded = Nested controllers

外环（速度环）决定"想要什么角度"
  外环输出 → 内环的目标值
The outer loop (velocity) decides "what angle do we want"
  Outer loop output → inner loop's target

内环（平衡环）执行"达到那个角度"
  内环输出 → 电机
The inner loop (balance) executes "reach that angle"
  Inner loop output → motors
```

#### 完整控制框图 | Complete Control Block Diagram

```
                    串级 PID 控制系统框图
                    Cascaded PID Control System Block Diagram

┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  目标速度 ──→(+)──→┌──────────┐   目标角度   ┌──────────┐       │
│  Target    │  - │   │ 速度环PID │──→(+)──→ │ 平衡环PID │──→ 电机 │
│  velocity  │    └───│ Velocity  │    │     │  Balance  │    Motors│
│             │        │ Loop      │    │     │  Loop     │         │
│             │        └──────────┘    │     └──────────┘         │
│             │              │         │          │                │
│             │              │         │          │                │
│             │        ┌─────┴────┐   │    ┌─────┴────┐          │
│             └────────│ 编码器    │   │    │   IMU    │          │
│            反馈速度    │ Encoder   │   │    │  传感器   │          │
│          Feedback vel │ 速度测量  │   │    │  角度测量  │          │
│                      └──────────┘   │    └──────────┘          │
│                                     │                           │
│  转向命令 ──→┌──────────┐            │                           │
│  Turn cmd ──→│  转向控制  │────────────┤ (叠加到电机输出)          │
│              │  Turn PID │            │ (add to motor output)    │
│              └──────────┘            │                           │
│                    │                 │                           │
│              ┌─────┴────┐           │                           │
│              │  偏航速率  │           │                           │
│              │ Yaw rate  │           │                           │
│              └──────────┘           │                           │
└──────────────────────────────────────────────────────────────────┘

数据流向 | Data flow:
  编码器 → 速度 → 速度环PID → 目标角度修正 → 平衡环PID → 电机输出
  Encoder → Speed → Velocity PID → Target angle correction → Balance PID → Motor output
```

#### 各环路的作用与频率 | Role and Frequency of Each Loop

| 环路 | 输入 | 输出 | 频率 | 作用 |
|------|------|------|------|------|
| 速度环（外环）| 目标速度 - 实际速度 | 角度修正值 | 50Hz | 控制前进/后退 |
| 平衡环（内环）| 目标角度 - 实际角度 | 电机PWM | 200Hz | 保持直立 |
| 转向环 | 目标偏航率 - 实际偏航率 | 左右差速 | 100Hz | 控制转弯 |

| Loop | Input | Output | Freq | Role |
|------|-------|--------|------|------|
| Velocity (outer) | Target speed - actual speed | Angle correction | 50Hz | Forward/backward |
| Balance (inner) | Target angle - actual angle | Motor PWM | 200Hz | Keep upright |
| Turn | Target yaw rate - actual yaw rate | Differential speed | 100Hz | Turning |

> **关键原则 | Key Principle**: **内环比外环快**。平衡环 200Hz（5ms 周期）因为直接控制稳定性。速度环 50Hz（20ms 周期）因为速度变化不那么紧急。如果外环比内环快，系统会不稳定。

> **The inner loop must be faster than the outer loop.** Balance at 200Hz because it directly controls stability. Velocity at 50Hz because speed changes are less urgent. If the outer loop is faster than inner, the system becomes unstable.

#### 速度环如何控制运动 | How Velocity Loop Controls Motion

```
速度环输出 → 修改平衡环的目标角度

速度环输出 = +2° → 平衡环目标 = 0° + 2° = 2° → 机器人前倾 → 向前走
Velocity output = +2° → Balance target = 0° + 2° = 2° → Robot leans forward → walks forward

速度环输出 = -2° → 平衡环目标 = 0° - 2° = -2° → 机器人后倾 → 向后走
Velocity output = -2° → Balance target = 0° - 2° = -2° → Robot leans backward → walks backward

速度环输出 = 0° → 平衡环目标 = 0° → 机器人保持竖直 → 不动
Velocity output = 0° → Balance target = 0° → Robot stays upright → stays still

这就是为什么速度环能控制运动：它通过"故意让机器人倾斜一点"来实现移动
This is how velocity loop controls motion: it "intentionally tilts the robot slightly" to achieve movement
```

---

### 3. 编码器速度测量与转向控制 | Encoder Speed & Turning Control (1h15min)

#### 编码器速度计算 | Encoder Speed Calculation

```cpp
// EncoderSpeed.h — 编码器速度测量
// EncoderSpeed.h — Encoder speed measurement

#pragma once
#include <Arduino.h>

class EncoderSpeed {
private:
    int pin_a;
    volatile int32_t count;     // 脉冲计数（中断中更新）| Pulse count (updated in ISR)
    int32_t last_count;         // 上次计数 | Last count
    unsigned long last_time;    // 上次时间戳 | Last timestamp
    float speed;                // 当前速度（脉冲/秒）| Current speed (pulses/sec)
    float gear_ratio;           // 减速比 | Gear ratio
    int pulses_per_rev;         // 每转脉冲数 | Pulses per revolution

public:
    EncoderSpeed(int pin, float gear_r = 1.0, int ppr = 11)
        : pin_a(pin), count(0), last_count(0),
          last_time(0), speed(0),
          gear_ratio(gear_r), pulses_per_rev(ppr) {}

    void init() {
        pinMode(pin_a, INPUT_PULLUP);
        count = 0;
        last_count = 0;
        last_time = micros();
    }

    // 在中断中调用 — 每个脉冲+1 | Call in ISR — +1 per pulse
    void onPulse() {
        count++;
    }

    // 定期调用（如每 20ms）计算速度 | Call periodically (e.g. every 20ms)
    float update() {
        unsigned long now = micros();
        float dt = (now - last_time) / 1000000.0f;

        if (dt < 0.001f) return speed;  // 太短不更新 | Too short, skip

        int32_t delta = count - last_count;
        speed = delta / dt;  // 脉冲/秒 | Pulses/sec

        last_count = count;
        last_time = now;
        return speed;
    }

    float getSpeed() const { return speed; }

    // 转换为 RPM | Convert to RPM
    float getRPM() const {
        return speed / (pulses_per_rev * gear_ratio) * 60.0f;
    }

    void reset() {
        count = 0;
        last_count = 0;
        speed = 0;
    }
};
```

#### 差速转向原理 | Differential Steering

两轮机器人转弯靠**左右轮速度不同**：

A two-wheeled robot turns by having **different speeds on left and right wheels**:

```
直行 | Straight:        左转 | Left turn:        右转 | Right turn:
  左轮=右轮             左轮<右轮              左轮>右轮
  Left=Right            Left<Right             Left>Right

   ┌─┐  ┌─┐            ┌─┐   ┌─┐            ┌─┐   ┌─┐
   │L│  │R│            │L│   │R│            │L│   │R│
   └─┘  └─┘            └─┘   └─┘            └─┘   └─┘
   ←──→                 ←──────→             ←──────→
   同速                 左慢右快              左快右慢
   Same speed           Left slow             Left fast
                       Right fast            Right slow

电机输出公式 | Motor output formula:
  left_motor  = balance_output - turn_output
  right_motor = balance_output + turn_output

turn_output > 0 → 右轮快 → 左转 | right faster → turn left
turn_output < 0 → 左轮快 → 右转 | left faster → turn right
```

#### 偏航角速度测量 | Yaw Rate Measurement

```cpp
// 获取偏航角速度（度/秒）| Get yaw rate (degrees/sec)
float getYawRate() {
    // MPU6050 的 Z 轴陀螺仪 | MPU6050 Z-axis gyroscope
    float gz = imu.getGyroZ();  // 度/秒 | degrees/sec
    return gz;
    // 注意：根据安装方向可能需要取负号
    // Note: may need to negate based on mounting orientation
}
```

---

## 下午 (4h) | Afternoon Session

### 4. 实现速度环 PID | Implementing Velocity Loop PID (1.5h)

#### 完整串级 PID 代码 | Complete Cascaded PID Code

```cpp
// main.cpp — 完整串级 PID 控制系统
// main.cpp — Complete cascaded PID control system

#include <Arduino.h>
#include "MPU6050.h"
#include "MotorController.h"
#include "PIDController.h"
#include "EncoderSpeed.h"

// ========== 全局对象 | Global Objects ==========
MPU6050 imu;
MotorController motors;

// 三个 PID 控制器 | Three PID controllers
PIDController balance_pid;   // 平衡环（内环）| Balance loop (inner)
PIDController velocity_pid;  // 速度环（外环）| Velocity loop (outer)
PIDController turn_pid;      // 转向环 | Turn loop

// 编码器 | Encoders
EncoderSpeed left_encoder(35);
EncoderSpeed right_encoder(36);

// ========== 控制参数 | Control Parameters ==========
struct ControlParams {
    // 平衡环参数 | Balance loop parameters
    float balance_kp = 30.0;
    float balance_ki = 0.3;
    float balance_kd = 0.8;

    // 速度环参数 | Velocity loop parameters
    float velocity_kp = 0.5;
    float velocity_ki = 0.01;
    float velocity_kd = 0.0;

    // 转向环参数 | Turn loop parameters
    float turn_kp = 5.0;
    float turn_ki = 0.0;
    float turn_kd = 0.3;

    // 目标值 | Targets
    float target_speed = 0.0;     // 目标速度 | Target speed
    float target_yaw_rate = 0.0;  // 目标偏航率 | Target yaw rate
    float base_angle = 0.0;       // 机械中位角 | Mechanical center angle
};

ControlParams params;

// ========== 滤波与输出 | Filter & Output ==========
float filtered_angle = 0.0;
float filtered_speed = 0.0;
float filtered_yaw_rate = 0.0;
float balance_output = 0.0;
float turn_output = 0.0;

// ========== 控制频率 | Control Frequencies ==========
unsigned long last_balance = 0;
unsigned long last_velocity = 0;
unsigned long last_turn = 0;

#define BALANCE_DT   5000   // 5ms = 200Hz（内环最快）
#define VELOCITY_DT  20000  // 20ms = 50Hz（外环较慢）
#define TURN_DT      10000  // 10ms = 100Hz

// ========== 辅助函数 | Helper Functions ==========
float lpf(float prev, float curr, float alpha) {
    return alpha * curr + (1.0 - alpha) * prev;
}

void IRAM_ATTR leftISR()  { left_encoder.onPulse(); }
void IRAM_ATTR rightISR() { right_encoder.onPulse(); }

// ========== 初始化 | Setup ==========
void setup() {
    Serial.begin(115200);
    Wire.begin();

    // 初始化硬件 | Initialize hardware
    imu.init();
    motors.init();
    left_encoder.init();
    right_encoder.init();

    attachInterrupt(digitalPinToInterrupt(35), leftISR, RISING);
    attachInterrupt(digitalPinToInterrupt(36), rightISR, RISING);

    // 配置平衡环（内环）| Configure balance loop (inner)
    balance_pid.setTunings(params.balance_kp, params.balance_ki, params.balance_kd);
    balance_pid.setTarget(params.base_angle);
    balance_pid.setLimits(255.0, 100.0);
    balance_pid.setDerivativeFilter(0.7);

    // 配置速度环（外环）| Configure velocity loop (outer)
    velocity_pid.setTunings(params.velocity_kp, params.velocity_ki, params.velocity_kd);
    velocity_pid.setTarget(params.target_speed);
    velocity_pid.setLimits(15.0, 50.0);  // 输出限制 ±15° 角度修正
                                              // Output limited to ±15° angle correction

    // 配置转向环 | Configure turn loop
    turn_pid.setTunings(params.turn_kp, params.turn_ki, params.turn_kd);
    turn_pid.setTarget(params.target_yaw_rate);
    turn_pid.setLimits(100.0, 50.0);
    turn_pid.setDerivativeFilter(0.7);

    Serial.println("=== Cascaded PID Started | 串级 PID 已启动 ===");
    Serial.println("Structure: Velocity(outer) -> Balance(inner) + Turn");
    Serial.println("Commands: BP/BD/VP/VI/TP/TD S<speed> Y<yaw> R ?");
}

// ========== 主循环 | Main Loop ==========
void loop() {
    unsigned long now = micros();

    // ============================================
    // 1. 平衡环 — 最高频率 200Hz（内环）
    //    Balance loop — highest frequency 200Hz (inner)
    // ============================================
    if (now - last_balance >= BALANCE_DT) {
        last_balance = now;

        float raw_angle = imu.getAngle();
        filtered_angle = lpf(filtered_angle, raw_angle, 0.9);

        balance_output = balance_pid.compute(filtered_angle);
    }

    // ============================================
    // 2. 速度环 — 50Hz（外环）
    //    Velocity loop — 50Hz (outer)
    // ============================================
    if (now - last_velocity >= VELOCITY_DT) {
        last_velocity = now;

        // 更新编码器速度 | Update encoder speed
        left_encoder.update();
        right_encoder.update();

        float left_speed = left_encoder.getSpeed();
        float right_speed = right_encoder.getSpeed();
        float avg_speed = (left_speed + right_speed) / 2.0f;

        // 低通滤波速度 | Low-pass filter speed
        filtered_speed = lpf(filtered_speed, avg_speed, 0.7);

        // 速度环 PID | Velocity loop PID
        float vel_output = velocity_pid.compute(filtered_speed);

        // 关键！速度环输出 → 修改平衡环的目标角度
        // Key! Velocity output → modifies balance loop target angle
        float new_target = params.base_angle + vel_output;
        balance_pid.setTarget(new_target);
    }

    // ============================================
    // 3. 转向环 — 100Hz
    //    Turn loop — 100Hz
    // ============================================
    if (now - last_turn >= TURN_DT) {
        last_turn = now;

        float raw_yaw = imu.getGyroZ();
        filtered_yaw_rate = lpf(filtered_yaw_rate, raw_yaw, 0.8);

        turn_output = turn_pid.compute(filtered_yaw_rate);
    }

    // ============================================
    // 4. 统一电机输出 | Unified motor output
    // ============================================
    float left_motor  = balance_output - turn_output;
    float right_motor = balance_output + turn_output;
    motors.setSpeed(left_motor, right_motor);

    // ============================================
    // 5. 串口调参 | Serial tuning
    // ============================================
    handleSerialTuning();

    // ============================================
    // 6. 调试输出 | Debug output
    // ============================================
    static unsigned long last_print = 0;
    if (millis() - last_print > 100) {
        Serial.print("Angle:"); Serial.print(filtered_angle, 2);
        Serial.print(", Speed:"); Serial.print(filtered_speed, 1);
        Serial.print(", BalOut:"); Serial.print(balance_output, 1);
        Serial.print(", TurnOut:"); Serial.println(turn_output, 1);
        last_print = millis();
    }
}
```

#### 串口调参扩展 | Extended Serial Tuning Commands

```cpp
// handleSerialTuning() — 串级 PID 调参
// handleSerialTuning() — Cascaded PID tuning

void handleSerialTuning() {
    if (!Serial.available()) return;

    String cmd = Serial.readStringUntil('\n');
    cmd.trim();

    // 平衡环参数 | Balance loop parameters
    if (cmd.startsWith("BP")) {
        float kp = balance_pid.getKp();
        float kd = balance_pid.getKd();
        balance_pid.setTunings(cmd.substring(2).toFloat(), balance_pid.getKi(), kd);
        Serial.print("Balance Kp = "); Serial.println(cmd.substring(2).toFloat());
    }
    else if (cmd.startsWith("BD")) {
        balance_pid.setTunings(balance_pid.getKp(), balance_pid.getKi(),
                               cmd.substring(2).toFloat());
        Serial.print("Balance Kd = "); Serial.println(cmd.substring(2).toFloat());
    }
    // 速度环参数 | Velocity loop parameters
    else if (cmd.startsWith("VP")) {
        velocity_pid.setTunings(cmd.substring(2).toFloat(),
                                velocity_pid.getKi(), velocity_pid.getKd());
        Serial.print("Velocity Kp = "); Serial.println(cmd.substring(2).toFloat());
    }
    else if (cmd.startsWith("VI")) {
        velocity_pid.setTunings(velocity_pid.getKp(),
                                cmd.substring(2).toFloat(), velocity_pid.getKd());
        Serial.print("Velocity Ki = "); Serial.println(cmd.substring(2).toFloat());
    }
    // 转向环参数 | Turn loop parameters
    else if (cmd.startsWith("TP")) {
        turn_pid.setTunings(cmd.substring(2).toFloat(),
                            turn_pid.getKi(), turn_pid.getKd());
        Serial.print("Turn Kp = "); Serial.println(cmd.substring(2).toFloat());
    }
    else if (cmd.startsWith("TD")) {
        turn_pid.setTunings(turn_pid.getKp(), turn_pid.getKi(),
                            cmd.substring(2).toFloat());
        Serial.print("Turn Kd = "); Serial.println(cmd.substring(2).toFloat());
    }
    // 目标速度 | Target speed
    else if (cmd.startsWith("S")) {
        params.target_speed = cmd.substring(1).toFloat();
        velocity_pid.setTarget(params.target_speed);
        Serial.print("Target speed = "); Serial.println(params.target_speed);
    }
    // 目标偏航率 | Target yaw rate
    else if (cmd.startsWith("Y")) {
        params.target_yaw_rate = cmd.substring(1).toFloat();
        turn_pid.setTarget(params.target_yaw_rate);
        Serial.print("Target yaw = "); Serial.println(params.target_yaw_rate);
    }
    // 重置所有 | Reset all
    else if (cmd == "R") {
        balance_pid.reset();
        velocity_pid.reset();
        turn_pid.reset();
        Serial.println("All PID reset | 所有 PID 已重置");
    }
    // 帮助 | Help
    else if (cmd == "?") {
        Serial.println("=== Cascaded PID Tuning Commands ===");
        Serial.println("BP<val> Balance Kp | BD<val> Balance Kd");
        Serial.println("VP<val> Velocity Kp | VI<val> Velocity Ki");
        Serial.println("TP<val> Turn Kp     | TD<val> Turn Kd");
        Serial.println("S<val>  Target speed | Y<val> Target yaw");
        Serial.println("R       Reset all PID | ? Help");
    }
}
```

---

### 5. 速度环调参与转向测试 | Velocity Loop Tuning & Turn Testing (1.5h)

#### 速度环调参指南 | Velocity Loop Tuning Guide

```
前提：平衡环已经调好（昨天的成果）
Prerequisite: balance loop already tuned (yesterday's work)

步骤 1: 设置速度环初始参数 | Step 1: Set initial velocity parameters
  velocity_kp = 0.3, velocity_ki = 0.0, velocity_kd = 0.0

步骤 2: 目标速度 = 0（原地不动）| Step 2: Target speed = 0
  → 观察漂移是否减少 | Observe if drift decreases

步骤 3: 轻推机器人 | Step 3: Gently push the robot
  → 它应该更快回到原位（比只有平衡环时）
  → Should return to position faster (than balance loop alone)

步骤 4: 通过串口 S5 发速度命令 | Step 4: Send speed via serial S5
  → 机器人应向前移动 | Robot should move forward
  → 发 S-5 → 向后移动 | S-5 → backward
  → 发 S0 → 停止 | S0 → stop

步骤 5: 增大 velocity_kp 直到响应满意
  Step 5: Increase velocity_kp until response is satisfactory
  → 太大 → 机器人前后摇晃（两个环在打架）
  → Too large → robot rocks (two loops fighting)

步骤 6: 如果需要，加入微小的 velocity_ki
  Step 6: If needed, add small velocity_ki
  → 消除稳态速度误差 | Eliminate steady-state speed error
```

> **笨鸟先飞原则 | Smart Bird Principle**: 速度环的输出限制（`setLimits(15.0, ...)`）非常重要。如果允许太大的角度修正，机器人会猛地前倾或后倾然后倒下。±15° 是安全的起步值。

> The velocity loop's output limit is very important. If too large an angle correction is allowed, the robot will suddenly lean and fall. ±15° is a safe starting value.

#### 转向测试 | Turn Testing

```
测试步骤 | Test steps:

1. 确保机器人能平衡（不加转向）| Ensure balance works (no turning)

2. 通过串口发送转向命令 | Send turn commands via serial
   Y3    → 目标偏航率 3°/s（慢慢右转）| Target yaw 3°/s (slow right turn)
   Y-3   → 目标偏航率 -3°/s（慢慢左转）| Target yaw -3°/s (slow left turn)
   Y0    → 停止转向 | Stop turning
   Y10   → 快速右转 | Fast right turn

3. 组合测试 | Combined test
   S5 + Y2 → 边走边转（弧线运动）| Walk and turn (arc motion)
   S0 + Y0 → 原地停止 | Stop in place
```

#### 偏航角估算 | Yaw Angle Estimation

```cpp
// 偏航角估算（积分角速度）| Yaw angle estimation (integrate angular velocity)
float yaw_angle = 0.0;
unsigned long last_yaw_time = 0;

float updateYawAngle() {
    unsigned long now = micros();
    float dt = (now - last_yaw_time) / 1000000.0f;
    if (dt > 0.1f) { dt = 0; last_yaw_time = now; }  // 异常保护

    float yaw_rate = imu.getGyroZ();
    yaw_angle += yaw_rate * dt;  // 积分 | Integration

    last_yaw_time = now;
    return yaw_angle;
}

// 注意：陀螺仪积分会随时间漂移！短时间使用没问题
// Note: gyroscope integration drifts over time! OK for short-term use
```

---

### 6. 完整系统测试 | Complete System Testing (1h)

#### 测试流程 | Testing Procedure

```
阶段 1: 验证平衡环（不加新功能）
Phase 1: Verify balance loop (no new features)
  → 机器人能像昨天一样站稳？
  → Robot stands like yesterday?

阶段 2: 加入速度环（target_speed = 0）
Phase 2: Add velocity loop (target_speed = 0)
  → 漂移是否减少？| Is drift reduced?
  → 推一下，恢复是否更快？| Push and release — faster recovery?

阶段 3: 速度命令测试
Phase 3: Speed command test
  → S3: 机器人应向前走 | Robot should go forward
  → S-3: 机器人应向后走 | Robot should go backward
  → S0: 机器人应停下 | Robot should stop
  → S8: 更快的速度 | Faster speed

阶段 4: 加入转向环
Phase 4: Add turn loop
  → Y3: 机器人应右转 | Robot should turn right
  → Y-3: 机器人应左转 | Robot should turn left
  → Y0: 机器人应直行 | Robot should go straight

阶段 5: 组合测试
Phase 5: Combined test
  → S5 + Y2: 边走边转 | Walk and turn
  → S-3 + Y-3: 边后退边左转 | Backward and left turn
```

#### 常见问题排查 | Common Issues Troubleshooting

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| 机器人不停往前走 | 速度环方向反了 | 取反速度环输出，或取反编码器计数 |
| 机器人原地画圈 | 转向环一直输出 | 检查偏航角速度零偏，校准陀螺仪 |
| 前后摇晃加剧 | 速度环太强 | 减小 velocity_kp |
| 推一下就跑很远 | 速度环太弱 | 增大 velocity_kp |
| 转弯时倒下 | 转向太急/转向环输出太大 | 减小 turn_kp；增大 turn limit |
| 速度环和平衡环"打架" | 速度环太强 | 减小 velocity_kp，确保内环快于外环 |
| 编码器速度跳变 | 编码器脉冲太少/噪声 | 增大低通滤波系数 alpha |

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Robot keeps moving forward | Velocity loop reversed | Negate velocity output or encoder count |
| Robot circles in place | Turn loop always outputs | Check yaw rate bias, calibrate gyro |
| Increased rocking | Velocity loop too strong | Reduce velocity_kp |
| Runs far when pushed | Velocity loop too weak | Increase velocity_kp |
| Falls during turn | Turn too aggressive | Reduce turn_kp; increase turn limit |
| Loops fighting each other | Velocity loop too strong | Reduce velocity_kp, ensure inner > outer freq |
| Encoder speed jumps | Too few pulses / noise | Increase LPF alpha |

#### 三环 PID 参数记录表 | Three-Loop PID Parameter Log

| 测试 | Balance Kp/Ki/Kd | Velocity Kp/Ki/Kd | Turn Kp/Kd | 现象 | Observation |
|------|-------------------|--------------------|------------|------|-------------|
| 1 | 30/0.3/0.8 | — | — | 仅平衡，有漂移 | Balance only, drifts |
| 2 | 30/0.3/0.8 | 0.3/0/0 | — | 漂移减少 | Less drift |
| 3 | 30/0.3/0.8 | 0.5/0.01/0 | — | 稳定 | Stable |
| 4 | 30/0.3/0.8 | 0.5/0.01/0 | 5/0.3 | 可转弯 | Can turn |
| 5 | | | | | |
| 6 | | | | | |

---

## 今日作业 | Today's Task

1. **必做 | Required:** 实现速度环 PID，让机器人能在被推后恢复原位
   Implement velocity loop PID, make robot return to position after being pushed

2. **必做 | Required:** 实现转向控制，通过串口命令 Y<val> 控制转弯
   Implement turn control, control turning via serial Y<val> command

3. **必做 | Required:** 测试组合控制：S5 + Y2（边走边转），记录效果
   Test combined control: S5 + Y2 (walk and turn), record results

4. **必做 | Required:** 记录所有 PID 参数（平衡环 + 速度环 + 转向环）到表格中
   Record all PID parameters (balance + velocity + turn) in the table

5. **选做 | Optional:** 画一个你机器人的控制框图（手画拍照也可以）
   Draw a control block diagram for your robot (hand-drawn photo is fine)

6. **思考 | Reflection:**
   - 为什么内环（平衡环）必须比外环（速度环）快？
   - 如果速度环的输出限幅设太大（比如 ±45°），会发生什么？
   - 为什么转向通常不需要 I 项？

   - Why must the inner loop (balance) be faster than the outer (velocity)?
   - What happens if velocity loop output limit is too large (e.g. ±45°)?
   - Why does turning usually not need the I term?

---

## 今日检查点 | Checkpoint

- [ ] 能解释为什么需要串级控制
  Can explain why cascaded control is needed
- [ ] 理解外环（速度）和内环（平衡）的关系
  Understand relationship between outer (velocity) and inner (balance) loops
- [ ] 编码器速度测量代码已集成，能读到速度值
  Encoder speed measurement integrated, can read speed values
- [ ] 速度环 PID 实现并运行，漂移减少
  Velocity loop PID implemented and running, drift reduced
- [ ] 转向控制实现并运行，能通过串口转弯
  Turn control implemented, can turn via serial commands
- [ ] 能通过 S/Y 命令控制前进/后退/转弯
  Can control forward/backward/turn via S/Y commands
- [ ] 三环 PID 参数已记录到表格
  Three-loop PID parameters recorded in table

---

## 参考资源 | References

- [StackForce 轮足机器人 Gitee 仓库](https://gitee.com/StackForce/bipedal_wheeled_robot)
- [串级控制系统 — 维基百科](https://en.wikipedia.org/wiki/Cascaded_control)
- [Brian Douglas — Cascaded Control (YouTube)](https://www.youtube.com/watch?v=4fC7nfONjdM)
- [倒立摆串级 PID 控制](https://www.bilibili.com/video/BV1Y54y1V7Bp)

---

*最后更新: 2026-05-27*
