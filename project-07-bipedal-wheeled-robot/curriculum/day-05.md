# Day 05: PID 控制基础 | PID Control Fundamentals

## 今日目标 | Today's Goals

- 理解反馈控制的基本原理（开环 vs 闭环）| Understand feedback control fundamentals (open-loop vs closed-loop)
- 掌握 P、I、D 三个分量的物理直觉与数学公式 | Grasp the physical intuition and math behind P, I, D components
- 掌握 PID 公式 u(t) = Kp*e(t) + Ki*integral(e(t))dt + Kd*de(t)/dt | Master the PID formula
- 在机器人上实现单环 PID 直立平衡控制 | Implement single-loop PID upright balance on the robot
- 掌握调参顺序：先 P → 再 D → 最后 I | Master the tuning order: P first, then D, then I

---

## 上午 (3h) | Morning Session

### 1. 什么是控制系统？| What is a Control System? (45min)

#### 为什么需要控制系统？| Why Do We Need Control?

你有没有想过，为什么骑自行车的人不会倒？因为大脑在不断观察身体倾斜的角度，然后调整手把和重心。这就是**反馈控制**——观察当前状态，与目标比较，做出修正。

Have you ever wondered why a cyclist doesn't fall over? It's because the brain constantly observes the body's tilt angle and adjusts the handlebars and center of gravity. This is **feedback control** — observe the current state, compare with the target, and make corrections.

我们的两轮机器人也一样。它需要一个"大脑"来不断读取倾斜角度，然后决定电机该怎么转。

Our two-wheeled robot is the same. It needs a "brain" that constantly reads the tilt angle and decides how the motors should turn.

#### 开环控制 vs 闭环控制 | Open-Loop vs Closed-Loop Control

**开环控制（Open-Loop）** — 就像闭着眼倒水：

**Open-loop control** is like pouring water with your eyes closed:

```
输入命令 → 电机 → 结果
  30%    → 电机转 → ???

没有人告诉控制器"结果对不对"
Nobody tells the controller "is the result correct?"
```

**闭环控制（Closed-Loop）** — 就像睁着眼倒水，看着杯子的水位：

**Closed-loop control** is like pouring water with your eyes open, watching the water level:

```
设定目标 ──→ 控制器 ──→ 电机 ──→ 机器人状态
   ↑                                        │
   └────── 传感器反馈（IMU读取角度）──────────┘

传感器不断告诉控制器"现在的状态"，控制器据此修正
The sensor constantly tells the controller the current state,
and the controller corrects accordingly
```

> **笨鸟先飞原则 | Smart Bird Principle**: 我们的本能是"告诉电机转多快就行了"。但现实中电机不精确、地面不平、电池电压会变。没有反馈，机器人一定会倒。闭环控制是让机器人"看得见"自己的状态。

> Our instinct is "just tell the motor how fast to spin." But in reality, motors are imprecise, the ground is uneven, and battery voltage changes. Without feedback, the robot WILL fall over. Closed-loop control lets the robot "see" its own state.

#### 误差的概念 | The Concept of Error

**误差 = 目标值 - 当前值**

**Error = Target - Current**

对于我们的平衡机器人：
- 目标角度 = 0°（竖直站立）
- 当前角度 = IMU 读取的倾斜角
- 误差 e(t) = 0° - 当前角度

For our balancing robot:
- Target angle = 0° (standing upright)
- Current angle = tilt angle read from IMU
- Error e(t) = 0° - current angle

```cpp
// 计算误差 | Calculate error
float target_angle = 0.0;   // 目标：竖直 | Target: upright
float current_angle = 0.0;  // 当前角度（来自IMU）| Current angle (from IMU)
float error = target_angle - current_angle;  // 误差 | Error
```

---

### 2. PID 控制器完整公式 | Complete PID Controller Formula (45min)

#### PID 的三个分量 | The Three Components of PID

PID 控制器是工业中应用最广泛的反馈控制器。它由三个部分组成：

PID controller is the most widely used feedback controller in industry. It consists of three parts:

```
PID 控制器输出 | PID Controller Output:

u(t) = Kp * e(t) + Ki * integral(e(t)dt) + Kd * de(t)/dt

       ^^^^^^^^    ^^^^^^^^^^^^^^^^^^^^    ^^^^^^^^^^^^^
         P项             I项                   D项
       当前误差       误差的历史累积          误差的变化趋势
     "偏了多少"      "偏了多久"             "正在以多快速度偏"
     "how much"    "how long"             "how fast"
```

**生活类比 | Real-Life Analogy — 开车保持车道:**

```
你开车时做的三件事 | Three things you do while driving:

P (比例 | Proportional):
  车偏离车道中心越远 → 你方向盘打越大
  The further from lane center, the more you steer
  "看现在偏离多少"

I (积分 | Integral):
  车一直偏左一点点 → 你慢慢积累修正，最终消除偏移
  Car drifts slightly left continuously → you gradually correct
  "看过去一直偏了多少"

D (微分 | Derivative):
  车正在快速偏离 → 你提前加大转向力度
  Car drifting rapidly → you steer harder early
  "看偏离的速度有多快"
```

#### P = Proportional（比例控制）| P = Proportional Control

P 控制的想法非常简单：**误差越大，纠正力度越大**。

The P controller's idea is very simple: **the larger the error, the larger the correction**.

```
输出 u(t) = Kp * e(t)

Kp = 比例增益（一个系数，决定"反应有多强烈"）
Kp = Proportional gain (a coefficient that determines "how strong the reaction is")

当 Kp = 30 时:
  e(t) = 1°   →  输出 = 30
  e(t) = 2°   →  输出 = 60
  e(t) = -1°  →  输出 = -30
```

> **P 控制器的问题 | P Controller's Problem — 振荡!**
>
> P 控制器会来回摆动，永远停不下来。因为它只看"现在"，不看"趋势"。它不知道机器人正在以多快的速度倾斜，所以它总是"反应慢一拍"。
>
> The P controller oscillates back and forth, never settling. It only looks at "now", not at "trends". It doesn't know how fast the robot is tilting, so it always "reacts one beat late."

#### D = Derivative（微分控制）| D = Derivative Control

微分就是**变化率**。如果误差在快速增大，说明事情正在恶化，我们需要提前刹车。

Derivative is the **rate of change**. If the error is increasing rapidly, things are getting worse, and we need to brake early.

```
输出 u(t) = Kd * de(t)/dt = Kd * (当前误差 - 上次误差) / dt

类比 | Analogy:
  开车时，你不仅看与前车的距离（P），还看距离在以多快的速度缩短（D）
  When driving, you don't just look at distance to car ahead (P),
  but also how fast that distance is shrinking (D)

P + D 的效果 | Effect of P + D:
  只有 P:  ~~~~ 永远振荡 ~~~~    Only P: oscillates forever
  P + D:   ~~ 振幅越来越小 → 稳定！  P + D: amplitude shrinks → stable!
```

> **为什么先讲 D 再讲 I？| Why D before I?** 因为对于平衡机器人，D 比 I 重要得多。P+D 就已经能站起来。I 是锦上添花。如果一上来三个全调，你会疯掉的。

> Because for a balancing robot, D is far more important than I. P+D alone can already stand up. I is the icing on the cake. If you try to tune all three at once, you'll go crazy.

#### I = Integral（积分控制）| I = Integral Control

积分就是**误差的累积**。即使误差很小，时间久了累积起来也会很大。

Integral is the **accumulation of error**. Even if the error is small, it builds up over time.

```
输出 u(t) = Ki * integral(e(t)dt)

为什么需要 I？| Why do we need I?
  - P+D 让机器人基本稳定后，它可能始终偏一点点
  - 原因：重心不完全对称、地面微倾、电机死区
  - I 控制器累积这些小误差，慢慢补偿掉

当 Ki = 0.5 时:
  误差一直保持 0.1° → 每秒累积 0.1 → 10秒后积分=1.0 → 输出=0.5
  这个 0.5 的额外输出刚好补偿了那个微小偏移
```

> **积分饱和警告 | Integral Windup Warning**: 如果机器人启动时倒在地上，误差一直很大，积分值会疯狂累加。等机器人站起来后，巨大的积分值会让它猛冲出去。解决方法：**限制积分值范围**（anti-windup）。

> If the robot is lying on the ground at startup, the error stays large and the integral accumulates wildly. When the robot stands up, the huge integral value causes a lurch. Solution: **limit the integral range** (anti-windup).

---

### 3. 完整 PID 控制器类 | Complete PID Controller Class (1.5h)

#### PID 控制器 C++ 实现 | PID Controller C++ Implementation

```cpp
/**
 * PIDController.h — 通用 PID 控制器
 * PIDController.h — General-purpose PID Controller
 *
 * u(t) = Kp*e(t) + Ki*integral(e(t)dt) + Kd*de(t)/dt
 *
 * 笨鸟先飞:
 * - 这是一个完整的、可用于实际机器人的 PID 控制器
 * - 包含积分限幅（anti-windup）和微分滤波
 * - 可以直接复制到你的项目中使用
 */

#pragma once
#include <Arduino.h>

class PIDController {
private:
    // ===== PID 增益 | PID Gains =====
    float kp;           // 比例增益 | Proportional gain
    float ki;           // 积分增益 | Integral gain
    float kd;           // 微分增益 | Derivative gain

    // ===== 状态变量 | State Variables =====
    float target;           // 目标值（设定点）| Target (setpoint)
    float integral;         // 积分累积 | Integral accumulation
    float prev_error;       // 上一次误差 | Previous error
    unsigned long prev_time;// 上一次时间戳 | Previous timestamp
    bool first_run;         // 首次运行标志 | First run flag

    // ===== 限幅参数 | Limit Parameters =====
    float output_limit;     // 输出限幅 | Output clamp
    float integral_limit;   // 积分限幅（anti-windup）| Integral clamp (anti-windup)

    // ===== 微分滤波 | Derivative Filtering =====
    float d_filter_alpha;   // 微分低通滤波系数 | Derivative LPF coefficient
    float filtered_d;       // 滤波后的微分值 | Filtered derivative value

public:
    PIDController()
        : kp(0), ki(0), kd(0),
          target(0), integral(0), prev_error(0),
          prev_time(0), first_run(true),
          output_limit(255.0), integral_limit(100.0),
          d_filter_alpha(0.7), filtered_d(0) {}

    // ===== 设置 PID 参数 | Set PID Parameters =====
    void setTunings(float p, float i, float d) {
        kp = p;
        ki = i;
        kd = d;
    }

    // ===== 设置目标值 | Set Target =====
    void setTarget(float t) {
        target = t;
    }

    // ===== 设置限幅 | Set Limits =====
    void setLimits(float out_limit, float int_limit) {
        output_limit = out_limit;
        integral_limit = int_limit;
    }

    // ===== 设置微分滤波系数 | Set Derivative Filter Alpha =====
    // alpha 越小滤波越强（0.0=完全滤波, 1.0=无滤波）
    // Smaller alpha = stronger filter (0.0=full filter, 1.0=no filter)
    void setDerivativeFilter(float alpha) {
        d_filter_alpha = alpha;
    }

    // ===== 核心：计算 PID 输出 | Core: Compute PID Output =====
    float compute(float current) {
        unsigned long now = micros();
        float dt = (now - prev_time) / 1000000.0f;

        // 首次运行或时间异常 | First run or abnormal time
        if (first_run || dt <= 0.0f || dt > 0.1f) {
            prev_error = target - current;
            prev_time = now;
            first_run = false;
            return 0.0f;
        }

        // ===== 计算误差 | Calculate Error =====
        float error = target - current;

        // ===== P 分量：当前误差 | P Term: Current Error =====
        float p_term = kp * error;

        // ===== I 分量：累积误差 | I Term: Accumulated Error =====
        integral += error * dt;
        // 积分限幅（anti-windup）| Clamp integral (anti-windup)
        if (integral > integral_limit) integral = integral_limit;
        if (integral < -integral_limit) integral = -integral_limit;
        float i_term = ki * integral;

        // ===== D 分量：误差变化率 | D Term: Error Rate of Change =====
        float derivative = (error - prev_error) / dt;
        // 对微分做低通滤波（减少噪声影响）| LPF on derivative (reduce noise)
        filtered_d = d_filter_alpha * derivative + (1.0f - d_filter_alpha) * filtered_d;
        float d_term = kd * filtered_d;

        // ===== 总输出 | Total Output =====
        float output = p_term + i_term + d_term;

        // ===== 输出限幅 | Clamp Output =====
        if (output > output_limit) output = output_limit;
        if (output < -output_limit) output = -output_limit;

        // ===== 保存状态 | Save State =====
        prev_error = error;
        prev_time = now;

        return output;
    }

    // ===== 重置控制器 | Reset Controller =====
    void reset() {
        integral = 0;
        prev_error = 0;
        filtered_d = 0;
        first_run = true;
    }

    // ===== 获取当前参数（调试用）| Get Current Params (for debug) =====
    float getKp() const { return kp; }
    float getKi() const { return ki; }
    float getKd() const { return kd; }
    float getError() const { return prev_error; }
    float getIntegral() const { return integral; }
};
```

#### PID 各项的信号流图 | PID Signal Flow Diagram

```
                    PID 控制器内部结构 | PID Controller Internal Structure

设定值(Setpoint) ──→ (+) ──→ e(t) ──┬──────────────┬──────────────────┐
                      ↑ -            │              │                  │
                      │         Kp * e(t)     Ki * integral(e)   Kd * de/dt
                      │              │              │                  │
                      │              │         ┌────┴────┐        ┌───┴───┐
                      │              │         │  积分器  │        │微分器  │
                      │              │         │Integrator│       │Different│
                      │              │         └────┬────┘        └───┬───┘
                      │              │              │                  │
                      │              ├──────────────┼──────────────────┤
                      │              │     u(t) = P + I + D           │
                      │              └──────┬─────────────────────────┘
                      │                     │
                      │                     ▼
                      │               ┌──────────┐
                      │               │  输出限幅  │
                      │               │   Clamp   │
                      │               └────┬─────┘
                      │                    │
                      │                    ▼
                      │              电机/执行器
                      │              Motor/Actuator
                      │                    │
                      │                    ▼
                      │              ┌──────────┐
                      └──────────────│  被控对象  │ ← 传感器反馈
                                     │  Plant   │   Sensor feedback
                                     └──────────┘
```

---

## 下午 (4h) | Afternoon Session

### 4. 第一步：只用 P 控制 | Step 1: P-Only Control (1h)

#### 准备工作与项目结构 | Preparation & Project Structure

```
project-07-bipedal-wheeled-robot/
├── lib/
│   ├── PID/
│   │   └── PIDController.h      ← PID 控制器 | PID Controller
│   ├── IMU/
│   │   └── MPU6050.h            ← IMU 传感器 | IMU Sensor
│   └── Motor/
│       └── MotorController.h    ← 电机控制 | Motor Controller
├── src/
│   └── main.cpp                 ← 主程序 | Main Program
└── platformio.ini
```

#### P 控制器实验代码 | P Controller Experiment Code

```cpp
// main.cpp — 第一步：只用 P 控制
// main.cpp — Step 1: P-only control

#include <Arduino.h>
#include "MPU6050.h"
#include "MotorController.h"
#include "PIDController.h"

// 创建对象 | Create objects
MPU6050 imu;
MotorController motors;
PIDController balance_pid;

// 参数 | Parameters
float target_angle = 0.0;   // 目标角度（竖直）| Target angle (upright)

// 低通滤波器 | Low-pass filter
float lowPassFilter(float prev, float current, float alpha) {
    return alpha * current + (1.0 - alpha) * prev;
}

void setup() {
    Serial.begin(115200);
    Wire.begin();

    // 初始化 IMU | Initialize IMU
    if (!imu.init()) {
        Serial.println("IMU init failed! | IMU 初始化失败!");
        while (1);  // 停在这里 | Stop here
    }
    Serial.println("IMU OK | IMU 初始化成功");

    // 初始化电机 | Initialize motors
    motors.init();

    // 设置 P 参数 —— 先只用 P | Set P parameter — P only first
    balance_pid.setTunings(30.0, 0.0, 0.0);  // Kp=30, Ki=0, Kd=0
    balance_pid.setTarget(target_angle);
    balance_pid.setLimits(255.0, 100.0);

    Serial.println("=== P Controller Started | P 控制器已启动 ===");
    Serial.println("Robot will oscillate - this is normal! | 机器人将振荡——正常现象!");
    Serial.println("Commands: P<val> to change Kp, ? for help");
}

void loop() {
    // 1. 读取并滤波角度 | Read and filter angle
    float raw_angle = imu.getAngle();
    static float filtered_angle = 0.0;
    filtered_angle = lowPassFilter(filtered_angle, raw_angle, 0.9);

    // 2. P 控制计算 | P control computation
    float output = balance_pid.compute(filtered_angle);

    // 3. 驱动电机 | Drive motors
    motors.setSpeed(output, output);  // 左右相同速度 | Same speed both sides

    // 4. 调试输出（串口绘图器格式）| Debug output (serial plotter format)
    static unsigned long last_print = 0;
    if (millis() - last_print > 50) {  // 每50ms = 20Hz | Every 50ms = 20Hz
        Serial.print("Angle:"); Serial.print(filtered_angle, 3);
        Serial.print(", Output:"); Serial.print(output, 2);
        Serial.print(", Target:"); Serial.println(target_angle, 3);
        last_print = millis();
    }

    // 5. 串口调参 | Serial tuning
    if (Serial.available()) {
        String cmd = Serial.readStringUntil('\n');
        cmd.trim();
        if (cmd.startsWith("P")) {
            float val = cmd.substring(1).toFloat();
            balance_pid.setTunings(val, 0, 0);
            Serial.print("Kp = "); Serial.println(val);
        }
        else if (cmd == "R") {
            balance_pid.reset();
            Serial.println("PID Reset | PID 已重置");
        }
        else if (cmd == "?") {
            Serial.println("Commands: P<val> Kp | R reset");
        }
    }
}
```

#### 观察现象 | What You Will Observe

```
只有 P 的控制器 | P-only controller:

现象 1: 机器人来回振荡
Observation 1: Robot oscillates back and forth

  像~~~这样~~~
  Like ~~~this~~~

现象 2: 如果 Kp 太大 → 振荡越来越大 → 倒！
Observation 2: If Kp too large → oscillation grows → falls!

现象 3: 如果 Kp 太小 → 反应太慢 → 慢慢倒
Observation 3: If Kp too small → reacts too slowly → slowly falls

实验 | Experiment — 尝试不同的 Kp 值:
  Kp = 10  → 反应太慢，机器人倒下 | Too slow, falls
  Kp = 30  → 有清晰振荡 | Clear oscillation
  Kp = 80  → 剧烈振荡，可能很快倒 | Violent oscillation
  Kp = 150 → 直接倒（发散）| Falls immediately (diverges)
```

串口绘图器上的 P 控制曲线 | P-only curve on Serial Plotter:
```
    ╱╲   ╱╲   ╱╲   ╱╲
   ╱  ╲ ╱  ╲ ╱  ╲ ╱  ╲     ← 振幅不变或增大
  ╱    ╲    ╲╱    ╲    ╲       Amplitude constant or growing
```

---

### 5. 第二步：加入 D — 从振荡到稳定 | Step 2: Adding D — Oscillation to Stability (1h)

```cpp
// main.cpp — 第二步：P + D 控制
// main.cpp — Step 2: P + D control

#include <Arduino.h>
#include "MPU6050.h"
#include "MotorController.h"
#include "PIDController.h"

MPU6050 imu;
MotorController motors;
PIDController balance_pid;

float target_angle = 0.0;

float lowPassFilter(float prev, float current, float alpha) {
    return alpha * current + (1.0 - alpha) * prev;
}

void setup() {
    Serial.begin(115200);
    Wire.begin();

    imu.init();
    motors.init();

    // P + D 控制 | P + D control
    // Kp 保持之前找到的好值，加入 Kd | Keep good Kp, add Kd
    balance_pid.setTunings(30.0, 0.0, 0.8);  // Kp=30, Ki=0, Kd=0.8
    balance_pid.setTarget(target_angle);
    balance_pid.setLimits(255.0, 100.0);
    balance_pid.setDerivativeFilter(0.7);  // 微分滤波 | Derivative filtering

    Serial.println("=== PD Controller Started | PD 控制器已启动 ===");
    Serial.println("Robot should balance briefly! | 机器人应该能短暂站稳!");
    Serial.println("Commands: P<val> Kp | D<val> Kd | R reset");
}

void loop() {
    // 读取并滤波角度 | Read and filter angle
    float raw_angle = imu.getAngle();
    static float filtered_angle = 0.0;
    filtered_angle = lowPassFilter(filtered_angle, raw_angle, 0.9);

    // PD 控制计算 | PD control computation
    float output = balance_pid.compute(filtered_angle);

    // 驱动电机 | Drive motors
    motors.setSpeed(output, output);

    // 串口绘图器输出 | Serial plotter output
    static unsigned long last_print = 0;
    if (millis() - last_print > 50) {
        Serial.print("Angle:"); Serial.print(filtered_angle, 3);
        Serial.print(", Output:"); Serial.print(output, 2);
        Serial.print(", Target:"); Serial.println(target_angle, 3);
        last_print = millis();
    }

    // 串口调参 | Serial tuning
    if (Serial.available()) {
        String cmd = Serial.readStringUntil('\n');
        cmd.trim();
        float kp_now = balance_pid.getKp();
        float kd_now = balance_pid.getKd();
        if (cmd.startsWith("P")) {
            balance_pid.setTunings(cmd.substring(1).toFloat(), 0, kd_now);
            Serial.print("Kp = "); Serial.println(cmd.substring(1).toFloat());
        }
        else if (cmd.startsWith("D")) {
            balance_pid.setTunings(kp_now, 0, cmd.substring(1).toFloat());
            Serial.print("Kd = "); Serial.println(cmd.substring(1).toFloat());
        }
        else if (cmd == "R") {
            balance_pid.reset();
            Serial.println("PID Reset");
        }
    }
}
```

#### PD 控制曲线对比 | PD vs P Curve Comparison

```
P + D 的曲线 | P + D curve:
    ╱╲
   ╱  ╲  ╱╲
  ╱    ╲╱  ╲                      ← 振幅逐渐减小 → 稳定!
 ╱          ╲───                    Amplitude shrinks → stable!

为什么 D 能减少振荡？| Why does D reduce oscillation?
  - 当机器人向一侧倒 → P 想拉回来
  - 当机器人正在快速回正 → P 减小（因为误差减小了）
  - 但 D 检测到"正在快速变化" → D 主动减速（刹车）
  - 结果：减少了"纠正过头" → 振荡更快衰减
```

#### 调 Kd 的方法 | How to Tune Kd

```
步骤 | Steps:
1. 保持 Kp 不变（之前找到的好值）| Keep Kp unchanged
2. 从 Kd = 0.1 开始 | Start from Kd = 0.1
3. 每次增加 0.1 | Increase by 0.1 each time
4. 观察振荡是否减小 | Observe if oscillation decreases

好的 Kd | Good Kd:
  - 振荡 2-3 次后稳定 | Settles after 2-3 oscillations
  - 机器人能站稳 5 秒以上 | Robot stands for 5+ seconds

Kd 太小 | Kd too small:
  - 仍然振荡很多 | Still oscillates a lot

Kd 太大 | Kd too large:
  - 反应迟钝，像在泥里 | Sluggish, like in mud
  - 电机抖动（D 对噪声敏感）| Motor jitters (D is sensitive to noise)
```

> **D 的噪声问题 | D's Noise Problem**: D 计算的是误差变化率。IMU 数据有噪声时，变化率被放大，导致电机抖动。这就是我们在 PIDController 中加入了微分低通滤波（`setDerivativeFilter(0.7)`）的原因。

> D calculates the rate of change of error. When IMU data has noise, the rate of change gets amplified, causing motor jitter. That's why we added derivative low-pass filtering in the PIDController (`setDerivativeFilter(0.7)`).

---

### 6. 第三步：加入 I — 消除偏移 | Step 3: Adding I — Eliminating Offset (1h)

```cpp
// main.cpp — 第三步：完整 PID 控制
// main.cpp — Step 3: Full PID control

#include <Arduino.h>
#include "MPU6050.h"
#include "MotorController.h"
#include "PIDController.h"

MPU6050 imu;
MotorController motors;
PIDController balance_pid;

float target_angle = 0.0;

float lowPassFilter(float prev, float current, float alpha) {
    return alpha * current + (1.0 - alpha) * prev;
}

void setup() {
    Serial.begin(115200);
    Wire.begin();

    imu.init();
    motors.init();

    // 完整 PID | Full PID
    balance_pid.setTunings(30.0, 0.5, 0.8);  // Kp=30, Ki=0.5, Kd=0.8
    balance_pid.setTarget(target_angle);
    balance_pid.setLimits(255.0, 100.0);
    balance_pid.setDerivativeFilter(0.7);

    Serial.println("=== Full PID Started | 完整 PID 已启动 ===");
    Serial.println("Commands: P<val> I<val> D<val> T<val> R ?");
}

void loop() {
    // 读取并滤波角度 | Read and filter angle
    float raw_angle = imu.getAngle();
    static float filtered_angle = 0.0;
    filtered_angle = lowPassFilter(filtered_angle, raw_angle, 0.9);

    // PID 计算 | PID computation
    float output = balance_pid.compute(filtered_angle);

    // 驱动电机 | Drive motors
    motors.setSpeed(output, output);

    // 调试输出 | Debug output
    static unsigned long last_print = 0;
    if (millis() - last_print > 100) {
        Serial.print("Angle:"); Serial.print(filtered_angle, 3);
        Serial.print(", Output:"); Serial.print(output, 2);
        Serial.print(", Integral:"); Serial.print(balance_pid.getIntegral(), 3);
        Serial.print(", Error:"); Serial.println(balance_pid.getError(), 3);
        last_print = millis();
    }

    // 串口调参 | Serial tuning
    if (Serial.available()) {
        String cmd = Serial.readStringUntil('\n');
        cmd.trim();
        float kp = balance_pid.getKp();
        float ki = balance_pid.getKi();
        float kd = balance_pid.getKd();

        if (cmd.startsWith("P")) {
            balance_pid.setTunings(cmd.substring(1).toFloat(), ki, kd);
            Serial.print("Kp = "); Serial.println(cmd.substring(1).toFloat());
        }
        else if (cmd.startsWith("I")) {
            balance_pid.setTunings(kp, cmd.substring(1).toFloat(), kd);
            Serial.print("Ki = "); Serial.println(cmd.substring(1).toFloat());
        }
        else if (cmd.startsWith("D")) {
            balance_pid.setTunings(kp, ki, cmd.substring(1).toFloat());
            Serial.print("Kd = "); Serial.println(cmd.substring(1).toFloat());
        }
        else if (cmd.startsWith("T")) {
            target_angle = cmd.substring(1).toFloat();
            balance_pid.setTarget(target_angle);
            Serial.print("Target = "); Serial.println(target_angle);
        }
        else if (cmd == "R") {
            balance_pid.reset();
            Serial.println("PID Reset");
        }
        else if (cmd == "?") {
            Serial.println("=== PID Tuning Commands ===");
            Serial.println("  P<val>  Set Kp | I<val>  Set Ki | D<val>  Set Kd");
            Serial.println("  T<val>  Set target angle | R  Reset PID");
            Serial.println("  ?  Show this help");
        }
    }
}
```

#### 什么时候加 I？| When to Add I?

```
调参顺序（黄金法则！）| Tuning order (golden rule!):

步骤 1: 只用 P → 找到让机器人清晰振荡的 Kp
         Step 1: P only → find Kp that makes robot clearly oscillate

步骤 2: 加 D → 减小振荡，让机器人能站稳
         Step 2: Add D → reduce oscillation, make robot stand

步骤 3: 加 I → 消除微小偏移（仅当 PD 稳定但有偏移时）
         Step 3: Add I → eliminate small offset (only when PD stable but offset)

Ki 通常很小！| Ki is usually very small!
  平衡机器人 Ki 典型值：0.01 ~ 2.0
  Typical Ki for balancing robot: 0.01 ~ 2.0

Ki 太大的危害 | Dangers of too much Ki:
  - 积分饱和 → 启动时猛冲
  - 超调增大 → 反而更不稳定
  - 响应变慢 → "拖泥带水"
```

> **笨鸟先飞原则 | Smart Bird Principle**: 很多初学者觉得"I 让控制更精确"，所以一开始就设很大。这是错的。I 太大会导致积分饱和、超调、甚至让已经稳定的系统不稳定。**Ki 应该最后调，从非常小的值开始**。

> Many beginners think "I makes control more precise" and set Ki large from the start. This is wrong. Too much I causes windup, overshoot, and can destabilize. **Ki should be tuned last, starting from a very small value.**

---

### 7. 调参流程与常见问题 | Tuning Flowchart & Common Issues (1h)

#### 调参流程图 | Tuning Flowchart

```
开始 | Start
  │
  ▼
设 Ki=0, Kd=0
从 Kp=10 开始
  │
  ▼
┌──────────────┐
│ 机器人能振荡？│ ← 不振荡 → 增大 Kp ──┐
│  Oscillating? │                       │
└──────┬───────┘                       │
  是   │                                │
       ▼                                │
振荡越来越小？─── 否 ──→ 减小 Kp ───────┘
  Decreasing?
  │      │
  是     否（发散）
  │      ↓
  │   减小 Kp，重试
  ▼
加入 Kd = 0.3
  │
  ▼
┌──────────────┐
│ 振荡衰减了？  │ ← 否 → 增大 Kd ──┐
│  Settling?   │                     │
└──────┬───────┘                     │
  是   │                              │
       ▼                              │
能站稳 3 秒以上？─── 否 ─────────────┘
  Stands 3s+?
  │
  是
  ▼
是否微微偏移？─── 否 ──→ 完成！（PD 够用）
  Slight offset?
  │
  是
  ▼
加入 Ki = 0.1
  │
  ▼
偏移消除了？─── 否 → 增大 Ki
  Offset gone?
  │
  是
  ▼
稳定了？─── 否 → Ki 太大，减小 Ki
  Stable?
  │
  是
  ▼
✓ 调参完成！| Tuning complete!
```

#### 调参记录表 | Tuning Log Table

请务必填写！调参是工程实验，不是猜谜。

**Be sure to fill in!** Tuning is engineering experimentation, not guessing.

| 序号 | Kp | Ki | Kd | 现象 | Observation | 稳定时间 |
|------|----|----|----|------|-------------|---------|
| 1 | 10 | 0 | 0 | 振荡慢，慢慢倒 | Slow oscillation, slowly falls | 0s |
| 2 | 30 | 0 | 0 | 振荡明显 | Clear oscillation | 0s |
| 3 | 30 | 0 | 0.3 | 振荡减小 | Reduced oscillation | 1s |
| 4 | 30 | 0 | 0.8 | 基本稳定 | Mostly stable | 3s |
| 5 | 30 | 0.3 | 0.8 | 稳定且居中 | Stable and centered | 5s+ |
| 6 | | | | | | |
| 7 | | | | | | |
| 8 | | | | | | |

#### 常见问题与解决方案 | Common Issues & Solutions

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| P 控制下不振荡，直接倒 | Kp 太小或方向反了 | 增大 Kp；检查电机方向 |
| P 控制振荡越来越大 | Kp 太大 | 减小 Kp |
| 加 D 后电机剧烈抖动 | D 对 IMU 噪声敏感 | 减小 Kd；增大微分滤波；对角度做更强低通滤波 |
| PD 稳定但始终偏一个方向 | 重心偏移或地面倾斜 | 加 I 补偿；或调整 target_angle |
| 加 I 后启动时猛冲 | 积分饱和 | 减小 Ki；减小 integral_limit |
| 参数调好了但过一会儿又不行了 | 电池电压下降 | PID 参数应有一定裕度；使用稳压模块 |
| 机器人能站稳但一直慢慢漂移 | 单环 PID 的固有局限 | 明天学速度环解决！ |

| Issue | Cause | Solution |
|-------|-------|----------|
| No oscillation under P, just falls | Kp too small or direction reversed | Increase Kp; check motor direction |
| Oscillation grows under P | Kp too large | Decrease Kp |
| Motor jitters violently after adding D | D is noise-sensitive | Reduce Kd; increase derivative filter; stronger angle LPF |
| PD stable but always leans one way | CoG offset or tilted ground | Add I; or adjust target_angle |
| Startup lurch after adding I | Integral windup | Reduce Ki; reduce integral_limit |
| Works then stops working | Battery voltage dropping | PID should have margin; use voltage regulator |
| Stands but drifts slowly | Inherent limitation of single-loop PID | Tomorrow we solve this with velocity loop! |

---

## 今日作业 | Today's Task

1. **必做 | Required:** 实现 P 控制器，找到让机器人振荡的 Kp 值（记录在表格中）
   Implement P controller, find the Kp value that makes the robot oscillate (record in table)

2. **必做 | Required:** 加入 D，找到让机器人能站稳 3 秒以上的 Kd 值（记录在表格中）
   Add D, find the Kd value that makes the robot stand for 3+ seconds (record in table)

3. **必做 | Required:** 加入 I，观察是否能消除微小偏移（记录在表格中）
   Add I, observe if it can eliminate small offsets (record in table)

4. **必做 | Required:** 填写调参记录表，至少 5 组数据
   Fill in the tuning log table with at least 5 data points

5. **选做 | Optional:** 用串口绘图器截图角度曲线（P only vs PD vs PID）
   Take screenshots of angle curves from Serial Plotter (P only vs PD vs PID)

6. **思考 | Reflection:**
   - 为什么调参顺序必须是 P → D → I？如果一开始就三个全调会怎样？
   - D 项为什么对噪声特别敏感？（提示：微分的数学本质）
   - 如果 IMU 有 10ms 延迟，对控制效果有什么影响？

   - Why must tuning order be P → D → I? What happens if you tune all three at once?
   - Why is the D term especially sensitive to noise? (Hint: mathematical nature of derivative)
   - What if the IMU has 10ms latency — how does that affect control?

---

## 今日检查点 | Checkpoint

- [ ] 能解释开环控制和闭环控制的区别
  Can explain the difference between open-loop and closed-loop control
- [ ] 能写出 PID 公式并解释 P、I、D 各自的作用
  Can write the PID formula and explain the role of P, I, D
- [ ] P 控制器代码已编译上传成功，观察到了振荡现象
  P controller code compiled and uploaded, observed oscillation
- [ ] PD 控制器让机器人能站稳 3 秒以上
  PD controller makes the robot stand for 3+ seconds
- [ ] 完成调参记录表（至少 5 组）
  Completed tuning log table (at least 5 entries)
- [ ] 理解调参顺序：先 P → 再 D → 最后 I
  Understand tuning order: P first → then D → lastly I
- [ ] 能解释积分饱和（integral windup）是什么以及如何防止
  Can explain what integral windup is and how to prevent it

---

## 参考资源 | References

- [StackForce 轮足机器人 Gitee 仓库](https://gitee.com/StackForce/bipedal_wheeled_robot)
- [B站手把手教做轮足机器人](https://www.bilibili.com/video/BV1kz421B73V)
- [PID 控制器 — 维基百科](https://en.wikipedia.org/wiki/PID_controller)
- [Brian Douglas — PID 控制器视频教程 (YouTube)](https://www.youtube.com/playlist?list=PLUMWjy5jgHK1NC52DXXmriCc06LgxPFD)
- [Arduino PID Library](https://github.com/br3ttb/Arduino-PID-Library)

---

*最后更新: 2026-05-27*
