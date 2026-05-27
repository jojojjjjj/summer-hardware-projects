# Day 06: I2C舵机控制与PID闭环 | I2C Servo Control & PID Closed-Loop

> **今日目标:**
> - 掌握STM32 I2C主机通信编程，理解I2C协议的起始/停止/应答机制
> - 理解舵机通信协议的命令帧格式，实现6个舵机的地址管理与批量控制
> - 掌握PID控制原理（P/I/D各参数的物理含义），在舵机上实现闭环控制
> - 理解6自由度运动学基础概念，能计算简单的正运动学
>
> **产出:** 通过I2C总线控制6个舵机精确转动到指定角度，PID闭环使舵机到达目标位置并稳定保持

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间回顾 | 回顾Day 5 USB CDC与GC9A01驱动成果，解答疑问 |
| 09:15 - 10:30 | 知识讲解 | I2C协议原理、舵机通信协议、命令帧格式 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | I2C主机初始化、舵机单轴控制、多轴地址管理 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | PID控制原理、舵机PID调参、闭环位置控制 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 6自由度运动学、正运动学计算、协调运动 |
| 16:30 - 17:00 | 总结分享 | 舵机动作演示——让ElectronBot做第一个姿势 |

---

## 上午: I2C舵机控制 | Morning: I2C Servo Control

### 为什么要学这个? | Why Learn This?

ElectronBot拥有6个自由度（2个手臂各有3个关节），每个关节由一个舵机驱动。这些舵机不是普通的PWM舵机，而是带有闭环控制的智能总线舵机，通过I2C总线与STM32主控通信。理解I2C协议和舵机通信协议是让ElectronBot"动起来"的关键第一步。

ElectronBot has 6 degrees of freedom (3 joints per arm), each driven by a servo. These are not ordinary PWM servos but smart bus servos with closed-loop control, communicating with the STM32 MCU via I2C. Understanding the I2C protocol and servo communication protocol is the critical first step to making ElectronBot "move."

### 任务6.1: I2C主机通信原理与初始化 (40分钟)

I2C（Inter-Integrated Circuit）是一种两线制串行通信协议，只需要SCL（时钟线）和SDA（数据线）两根线就能连接多个设备。STM32F4作为I2C主机，向地址不同的6个舵机发送控制命令。

I2C (Inter-Integrated Circuit) is a two-wire serial protocol requiring only SCL (clock) and SDA (data) to connect multiple devices. The STM32F4 acts as I2C master, sending commands to 6 servos with different addresses.

**I2C协议时序:**
```
I2C通信时序 | I2C Communication Timing:

主机发起 START    地址(7bit)+R/W    从机应答 ACK    数据(8bit)    应答    主机发起 STOP
    ↓                  ↓               ↓              ↓            ↓          ↓
S ────┤ Address + W ├─── ACK ────┤ Data byte ├─── ACK ────┤ P
      │ (0x01~0x06) │            │ (命令/参数) │           │
                                                    └── 可重复多次

S = START条件（SCL高时SDA下降沿）| S = START (SDA falling edge while SCL high)
P = STOP条件（SCL高时SDA上升沿） | P = STOP (SDA rising edge while SCL high)
ACK = 接收方拉低SDA表示确认      | ACK = Receiver pulls SDA low to acknowledge
```

**I2C关键参数:**

| 参数 | 说明 |
|------|------|
| 标准模式 | 100kHz |
| 快速模式 | 400kHz（ElectronBot使用） |
| 7位地址 | 支持128个设备（0x00-0x7F） |
| 应答机制 | 每字节后接收方发送ACK/NACK |

```c
/* i2c_servo.h — I2C舵机控制头文件 */
/* i2c_servo.h — I2C Servo Control Header */

#ifndef I2C_SERVO_H
#define I2C_SERVO_H

#include "stm32f4xx_hal.h"
#include <stdint.h>

// 舵机I2C地址分配 | Servo I2C Address Assignment
// 左臂（3个关节）| Left arm (3 joints)
#define SERVO_LEFT_SHOULDER     0x01    // 左肩 | Left shoulder
#define SERVO_LEFT_ELBOW        0x02    // 左肘 | Left elbow
#define SERVO_LEFT_WRIST        0x03    // 左腕 | Left wrist

// 右臂（3个关节）| Right arm (3 joints)
#define SERVO_RIGHT_SHOULDER    0x04    // 右肩 | Right shoulder
#define SERVO_RIGHT_ELBOW       0x05    // 右肘 | Right elbow
#define SERVO_RIGHT_WRIST       0x06    // 右腕 | Right wrist

// 广播地址（所有舵机同时响应）| Broadcast address (all servos respond)
#define SERVO_BROADCAST         0x00

// 舵机命令码 | Servo Command Codes
#define SERVO_CMD_MOVE          0x01    // 移动到指定角度 | Move to angle
#define SERVO_CMD_SET_SPEED     0x02    // 设置运动速度 | Set speed
#define SERVO_CMD_GET_POS       0x03    // 读取当前位置 | Read current position
#define SERVO_CMD_SET_PID       0x04    // 设置PID参数 | Set PID parameters
#define SERVO_CMD_ENABLE        0x05    // 使能/失能舵机 | Enable/disable servo
#define SERVO_CMD_RESET         0x06    // 舵机复位 | Reset servo

// 舵机角度范围 | Servo angle range
#define SERVO_ANGLE_MIN         (-90)
#define SERVO_ANGLE_MAX         (90)
#define SERVO_ANGLE_CENTER      (0)

// 舵机数据结构 | Servo data structure
typedef struct {
    uint8_t  address;       // I2C地址 | I2C address
    int16_t  current_pos;   // 当前角度(0.1度单位) | Current angle (0.1 degree units)
    int16_t  target_pos;    // 目标角度 | Target angle
    uint16_t speed;         // 运动速度 | Movement speed
    uint8_t  enabled;       // 使能状态 | Enable status
    uint8_t  pid_kp;        // PID参数(P) | PID parameter (P)
    uint8_t  pid_ki;        // PID参数(I) | PID parameter (I)
    uint8_t  pid_kd;        // PID参数(D) | PID parameter (D)
} Servo_t;

// 函数声明 | Function declarations
HAL_StatusTypeDef Servo_Init(void);
HAL_StatusTypeDef Servo_MoveTo(uint8_t addr, int16_t angle);
HAL_StatusTypeDef Servo_SetSpeed(uint8_t addr, uint16_t speed);
HAL_StatusTypeDef Servo_GetPosition(uint8_t addr, int16_t *angle);
HAL_StatusTypeDef Servo_BroadcastMove(int16_t angles[6]);
uint8_t Servo_Ping(uint8_t addr);

#endif // I2C_SERVO_H
```

```c
/* i2c_servo.c — I2C舵机控制实现 */
/* i2c_servo.c — I2C Servo Control Implementation */

#include "i2c_servo.h"

extern I2C_HandleTypeDef hi2c1;  // CubeMX生成的I2C句柄 | CubeMX-generated I2C handle

// I2C初始化（舵机总线）| I2C init (servo bus)
HAL_StatusTypeDef Servo_Init(void)
{
    // CubeMX已配置I2C1: Fast Mode (400kHz), 7-bit addressing
    // CubeMX has configured I2C1: Fast Mode (400kHz), 7-bit addressing

    // 扫描总线上所有舵机 | Scan all servos on bus
    uint8_t found = 0;
    for (uint8_t addr = 1; addr <= 6; addr++) {
        if (Servo_Ping(addr) == 1) {
            found++;
        }
    }

    // 至少找到4个舵机才继续 | At least 4 servos must be found
    if (found < 4) {
        return HAL_ERROR;
    }

    return HAL_OK;
}

// 探测舵机是否存在 | Ping servo to check presence
uint8_t Servo_Ping(uint8_t addr)
{
    // 发送I2C地址，等待ACK | Send I2C address, wait for ACK
    HAL_StatusTypeDef status = HAL_I2C_IsDeviceReady(&hi2c1,
                                    (uint16_t)(addr << 1), 3, 100);
    return (status == HAL_OK) ? 1 : 0;
}

// 发送命令帧到舵机 | Send command frame to servo
// 命令帧格式: [命令码(1B)] [参数长度(1B)] [参数(NB)] [校验和(1B)]
// Command frame: [CMD(1B)] [PARAM_LEN(1B)] [PARAMS(NB)] [CHECKSUM(1B)]
static HAL_StatusTypeDef Servo_SendCmd(uint8_t addr, uint8_t cmd,
                                         const uint8_t *params, uint8_t param_len)
{
    uint8_t frame[16];
    uint8_t idx = 0;

    frame[idx++] = cmd;
    frame[idx++] = param_len;

    for (uint8_t i = 0; i < param_len; i++) {
        frame[idx++] = params[i];
    }

    // 校验和 = 所有字节异或 | Checksum = XOR of all bytes
    uint8_t checksum = 0;
    for (uint8_t i = 0; i < idx; i++) {
        checksum ^= frame[i];
    }
    frame[idx++] = checksum;

    // I2C发送: 地址左移1位（HAL库要求）| I2C send: address left-shifted by 1 (HAL library requirement)
    return HAL_I2C_Master_Transmit(&hi2c1, (uint16_t)(addr << 1),
                                    frame, idx, 100);
}

// 控制舵机移动到指定角度 | Move servo to specified angle
HAL_StatusTypeDef Servo_MoveTo(uint8_t addr, int16_t angle)
{
    // 角度范围限制 | Clamp angle range
    if (angle < SERVO_ANGLE_MIN) angle = SERVO_ANGLE_MIN;
    if (angle > SERVO_ANGLE_MAX) angle = SERVO_ANGLE_MAX;

    uint8_t params[2];
    params[0] = (angle >> 8) & 0xFF;   // 高字节 | High byte
    params[1] = angle & 0xFF;          // 低字节 | Low byte

    return Servo_SendCmd(addr, SERVO_CMD_MOVE, params, 2);
}

// 设置运动速度 | Set movement speed
HAL_StatusTypeDef Servo_SetSpeed(uint8_t addr, uint16_t speed)
{
    uint8_t params[2];
    params[0] = (speed >> 8) & 0xFF;
    params[1] = speed & 0xFF;

    return Servo_SendCmd(addr, SERVO_CMD_SET_SPEED, params, 2);
}

// 读取舵机当前角度 | Read servo current angle
HAL_StatusTypeDef Servo_GetPosition(uint8_t addr, int16_t *angle)
{
    uint8_t tx_buf[2] = {SERVO_CMD_GET_POS, 0x00};
    uint8_t rx_buf[2];

    // 发送读取命令 | Send read command
    HAL_StatusTypeDef status = HAL_I2C_Master_Transmit(&hi2c1,
                                    (uint16_t)(addr << 1), tx_buf, 1, 100);
    if (status != HAL_OK) return status;

    // 接收角度数据（2字节）| Receive angle data (2 bytes)
    status = HAL_I2C_Master_Receive(&hi2c1,
                                    (uint16_t)(addr << 1), rx_buf, 2, 100);
    if (status != HAL_OK) return status;

    *angle = (int16_t)((rx_buf[0] << 8) | rx_buf[1]);
    return HAL_OK;
}

// 广播控制：同时控制6个舵机 | Broadcast: control all 6 servos simultaneously
HAL_StatusTypeDef Servo_BroadcastMove(int16_t angles[6])
{
    // 广播帧格式: [CMD_MOVE] [12] [angle0_H,L] [angle1_H,L] ... [angle5_H,L] [checksum]
    // Broadcast frame: [CMD_MOVE] [12] [angle0_H,L] ... [angle5_H,L] [checksum]
    uint8_t frame[16];
    uint8_t idx = 0;

    frame[idx++] = SERVO_CMD_MOVE;
    frame[idx++] = 12;  // 6个角度 x 2字节 | 6 angles x 2 bytes

    for (uint8_t i = 0; i < 6; i++) {
        frame[idx++] = (angles[i] >> 8) & 0xFF;
        frame[idx++] = angles[i] & 0xFF;
    }

    // 校验和 | Checksum
    uint8_t checksum = 0;
    for (uint8_t i = 0; i < idx; i++) {
        checksum ^= frame[i];
    }
    frame[idx++] = checksum;

    // 发送到广播地址 | Send to broadcast address
    return HAL_I2C_Master_Transmit(&hi2c1, (uint16_t)(SERVO_BROADCAST << 1),
                                    frame, idx, 100);
}
```

**舵机命令帧格式详解:**
```
命令帧结构 | Command Frame Structure:

┌──────┬──────┬───────────┬──────────┐
│ CMD  │ LEN  │ PARAMS... │ CHECKSUM │
│ 1B   │ 1B   │ N bytes   │ 1B       │
└──────┴──────┴───────────┴──────────┘

CMD     = 命令码 (0x01~0x06)
LEN     = 参数字节数
PARAMS  = 参数数据
CHECKSUM= 所有前面字节的异或值 (XOR)

示例: 舵机1移动到45度 | Example: Servo 1 move to 45 degrees
  CMD=0x01  LEN=0x02  PARAMS=0x00,0x2D  CHECKSUM=0x01^0x02^0x00^0x2D=0x2E
  完整帧: [0x01] [0x02] [0x00] [0x2D] [0x2E]

为什么用异或校验？| Why XOR checksum?
  - 计算简单，MCU开销小
  - 能检测奇数个位的错误
  - 适合短帧通信（我们的帧不超过16字节）
```

**预期结果:**
- I2C总线扫描检测到6个舵机
- 单个舵机能响应移动命令，转动到指定角度
- 理解命令帧格式的每个字段含义

**常见问题:**
- **I2C总线扫描不到舵机**：检查I2C引脚配置（PB6=SCL, PB7=SDA），确认上拉电阻存在（4.7k到VCC）
- **舵机不响应命令**：校验和计算错误是最常见原因，用逻辑分析仪抓取I2C数据验证
- **只有部分舵机能控制**：该舵机的I2C地址与配置不符，需要逐个确认

### 任务6.2: 6个舵机的协调控制 (30分钟)

ElectronBot的6个舵机需要协调运动才能做出有意义的动作。我们创建一个舵机管理模块，统一管理所有舵机的状态。

ElectronBot's 6 servos need coordinated movement for meaningful actions. We create a servo manager module to centrally manage all servo states.

```c
/* servo_manager.h — 舵机管理模块 */
/* servo_manager.h — Servo Manager Module */

#ifndef SERVO_MANAGER_H
#define SERVO_MANAGER_H

#include "i2c_servo.h"

// 舵机索引枚举 | Servo index enumeration
typedef enum {
    SERVO_IDX_LEFT_SHOULDER = 0,
    SERVO_IDX_LEFT_ELBOW,
    SERVO_IDX_LEFT_WRIST,
    SERVO_IDX_RIGHT_SHOULDER,
    SERVO_IDX_RIGHT_ELBOW,
    SERVO_IDX_RIGHT_WRIST,
    SERVO_IDX_COUNT       // = 6
} ServoIndex_t;

// 姿态数据（6个关节角度）| Pose data (6 joint angles)
typedef struct {
    int16_t angles[SERVO_IDX_COUNT];  // 角度数组，单位：度 | Angle array in degrees
    uint16_t duration_ms;              // 过渡时间 | Transition duration
} Pose_t;

// 预定义姿态 | Predefined poses
static const Pose_t POSE_NEUTRAL = {
    .angles = {0, 0, 0, 0, 0, 0},     // 所有关节归零 | All joints at zero
    .duration_ms = 500
};

static const Pose_t POSE_WAVE_LEFT = {
    .angles = {-45, -60, 0, 0, 0, 0}, // 左臂举起挥动 | Left arm raised waving
    .duration_ms = 300
};

static const Pose_t POSE_ARMS_UP = {
    .angles = {-60, -90, 0, 60, 90, 0}, // 双臂举起 | Both arms up
    .duration_ms = 500
};

static const Pose_t POSE_ARMS_DOWN = {
    .angles = {30, 60, 0, -30, -60, 0}, // 双臂放下 | Both arms down
    .duration_ms = 500
};

// 地址映射表 | Address mapping table
static const uint8_t servo_addresses[SERVO_IDX_COUNT] = {
    SERVO_LEFT_SHOULDER,   // 0x01
    SERVO_LEFT_ELBOW,      // 0x02
    SERVO_LEFT_WRIST,      // 0x03
    SERVO_RIGHT_SHOULDER,  // 0x04
    SERVO_RIGHT_ELBOW,     // 0x05
    SERVO_RIGHT_WRIST      // 0x06
};

void ServoMgr_Init(void);
void ServoMgr_SetPose(const Pose_t *pose);
void ServoMgr_Interpolate(const Pose_t *from, const Pose_t *to,
                           uint16_t duration_ms, uint16_t step_ms);
void ServoMgr_Update(void);

#endif // SERVO_MANAGER_H
```

```c
/* servo_manager.c — 舵机管理实现 */
/* servo_manager.c — Servo Manager Implementation */

#include "servo_manager.h"
#include <string.h>

static Servo_t servos[SERVO_IDX_COUNT];

void ServoMgr_Init(void)
{
    // 初始化每个舵机 | Initialize each servo
    for (uint8_t i = 0; i < SERVO_IDX_COUNT; i++) {
        servos[i].address = servo_addresses[i];
        servos[i].current_pos = 0;
        servos[i].target_pos = 0;
        servos[i].speed = 100;
        servos[i].enabled = 0;
    }

    // 使能所有舵机 | Enable all servos
    for (uint8_t i = 0; i < SERVO_IDX_COUNT; i++) {
        uint8_t param = 0x01;
        Servo_SendCmd(servos[i].address, SERVO_CMD_ENABLE, &param, 1);
        servos[i].enabled = 1;
        HAL_Delay(10);  // 舵机间留间隔 | Interval between servos
    }
}

// 设置目标姿态 | Set target pose
void ServoMgr_SetPose(const Pose_t *pose)
{
    for (uint8_t i = 0; i < SERVO_IDX_COUNT; i++) {
        servos[i].target_pos = pose->angles[i];
        Servo_MoveTo(servos[i].address, pose->angles[i]);
    }
}

// 插值运动：从姿态A平滑过渡到姿态B
// Interpolated motion: smooth transition from pose A to pose B
void ServoMgr_Interpolate(const Pose_t *from, const Pose_t *to,
                           uint16_t duration_ms, uint16_t step_ms)
{
    uint16_t steps = duration_ms / step_ms;

    for (uint16_t s = 0; s <= steps; s++) {
        float t = (float)s / (float)steps;

        // 线性插值（可替换为缓动函数）| Linear interpolation (replaceable with easing)
        int16_t interp_angles[SERVO_IDX_COUNT];
        for (uint8_t i = 0; i < SERVO_IDX_COUNT; i++) {
            interp_angles[i] = from->angles[i] +
                (int16_t)(t * (to->angles[i] - from->angles[i]));
        }

        // 广播发送所有角度 | Broadcast all angles
        Servo_BroadcastMove(interp_angles);

        HAL_Delay(step_ms);
    }
}
```

**预期结果:**
- 6个舵机能同时响应广播命令
- 能执行预定义姿态（归零、举手、放下）
- 插值运动平滑，没有突变

**常见问题:**
- **广播命令部分舵机不响应**：广播时序需要舵机同步处理，某些舵机响应慢会丢失，加大帧间隔
- **舵机运动不平滑**：插值步长太大，减小`step_ms`（建议10-20ms）
- **舵机抖动**：到达目标位置后在目标值附近振荡，需要PID调参（下午内容）

---

## 下午: PID闭环控制与运动学 | Afternoon: PID Closed-Loop Control & Kinematics

### 为什么要学这个? | Why Learn This?

开环控制舵机（只发角度命令，不检查实际位置）存在误差累积问题。齿轮间隙、负载变化、电压波动都会导致舵机实际角度与命令不一致。PID闭环控制通过持续读取实际位置并修正，实现精确的位置控制。运动学则是将"手臂末端要到达的位置"翻译成"6个关节各转多少度"的数学工具。

Open-loop servo control (sending angle commands without checking actual position) suffers from error accumulation. Gear backlash, load changes, and voltage fluctuation cause discrepancies between actual and commanded angles. PID closed-loop control achieves precise positioning by continuously reading actual position and correcting. Kinematics translates "where the arm tip should be" into "how much each of the 6 joints should rotate."

### 任务6.3: PID控制原理与实现 (50分钟)

PID（Proportional-Integral-Derivative）控制器是工业中应用最广泛的反馈控制器。它通过三个分量计算控制输出，使系统从当前状态趋向目标状态。

The PID (Proportional-Integral-Derivative) controller is the most widely used feedback controller in industry. It computes the control output through three components, driving the system from its current state toward the target.

```
PID控制框图 | PID Control Block Diagram:

目标角度 ──→ (+)误差 ──→ ┌─────┐
(setpoint)    ↑ -      │ PID  │──→ 电机PWM ──→ 舵机
              │        │控制器│               │
              │        └─────┘               │
              │                               │
              └────── 编码器反馈 ──────────────┘
                     (实际角度)
```

**PID三个分量的物理含义:**

| 分量 | 公式 | 物理含义 | 类比 |
|------|------|----------|------|
| P (比例) | Kp * e(t) | 误差越大，纠正力度越大 | 弹簧拉力：偏离越远，拉力越大 |
| I (积分) | Ki * integral(e) | 累积的误差，消除稳态偏差 | 持续的推力：慢慢把偏移推回去 |
| D (微分) | Kd * de/dt | 误差变化速度，提前制动 | 阻尼器：速度越快，阻力越大 |

```c
/* pid_controller.h — 通用PID控制器 */
/* pid_controller.h — General-Purpose PID Controller */

#ifndef PID_CONTROLLER_H
#define PID_CONTROLLER_H

#include <stdint.h>

typedef struct {
    // PID增益 | PID gains
    float kp;
    float ki;
    float kd;

    // 状态变量 | State variables
    float target;          // 目标值 | Target
    float integral;        // 积分累积 | Integral accumulation
    float prev_error;      // 上次误差 | Previous error
    float prev_derivative; // 上次微分值（滤波用）| Previous derivative (for filtering)

    // 限幅 | Limits
    float output_max;      // 输出上限 | Output upper limit
    float output_min;      // 输出下限 | Output lower limit
    float integral_max;    // 积分限幅(anti-windup) | Integral limit (anti-windup)

    // 时间参数 | Time parameter
    float dt;              // 采样周期(秒) | Sample period (seconds)
} PID_t;

void  PID_Init(PID_t *pid, float kp, float ki, float kd, float dt);
void  PID_SetTarget(PID_t *pid, float target);
float PID_Compute(PID_t *pid, float current);
void  PID_Reset(PID_t *pid);
void  PID_SetLimits(PID_t *pid, float out_min, float out_max, float int_max);

#endif // PID_CONTROLLER_H
```

```c
/* pid_controller.c — PID控制器实现 */
/* pid_controller.c — PID Controller Implementation */

#include "pid_controller.h"
#include <math.h>

void PID_Init(PID_t *pid, float kp, float ki, float kd, float dt)
{
    pid->kp = kp;
    pid->ki = ki;
    pid->kd = kd;
    pid->dt = dt;

    pid->target = 0.0f;
    pid->integral = 0.0f;
    pid->prev_error = 0.0f;
    pid->prev_derivative = 0.0f;

    pid->output_max = 1000.0f;
    pid->output_min = -1000.0f;
    pid->integral_max = 500.0f;
}

void PID_SetTarget(PID_t *pid, float target)
{
    pid->target = target;
}

float PID_Compute(PID_t *pid, float current)
{
    // 1. 计算误差 | Calculate error
    float error = pid->target - current;

    // 2. P分量：比例控制 | P term: proportional control
    float p_term = pid->kp * error;

    // 3. I分量：积分控制（带anti-windup限幅）
    // I term: integral control (with anti-windup clamping)
    pid->integral += error * pid->dt;

    // 积分限幅 | Clamp integral
    if (pid->integral > pid->integral_max)
        pid->integral = pid->integral_max;
    if (pid->integral < -pid->integral_max)
        pid->integral = -pid->integral_max;

    float i_term = pid->ki * pid->integral;

    // 4. D分量：微分控制（带低通滤波减少噪声）
    // D term: derivative control (with LPF to reduce noise)
    float derivative = (error - pid->prev_error) / pid->dt;

    // 简单低通滤波: alpha=0.7 | Simple LPF: alpha=0.7
    float alpha = 0.7f;
    float filtered_d = alpha * derivative + (1.0f - alpha) * pid->prev_derivative;
    pid->prev_derivative = filtered_d;

    float d_term = pid->kd * filtered_d;

    // 5. 总输出 | Total output
    float output = p_term + i_term + d_term;

    // 6. 输出限幅 | Clamp output
    if (output > pid->output_max) output = pid->output_max;
    if (output < pid->output_min) output = pid->output_min;

    // 7. 保存误差 | Save error
    pid->prev_error = error;

    return output;
}

void PID_Reset(PID_t *pid)
{
    pid->integral = 0.0f;
    pid->prev_error = 0.0f;
    pid->prev_derivative = 0.0f;
}

void PID_SetLimits(PID_t *pid, float out_min, float out_max, float int_max)
{
    pid->output_min = out_min;
    pid->output_max = out_max;
    pid->integral_max = int_max;
}
```

### 任务6.4: 舵机PID调参实践 (40分钟)

调参顺序遵循黄金法则：先P，后D，最后I。我们使用ElectronBot的一个手臂关节进行调参实验。

Tuning follows the golden rule: P first, then D, lastly I. We use one arm joint of ElectronBot for the tuning experiment.

**调参步骤:**
```
第一步: 只用P → 找到让关节振荡的Kp值
  Step 1: P only → find Kp that makes the joint oscillate

第二步: 加入D → 减小振荡，让关节稳定到达目标
  Step 2: Add D → reduce oscillation, stabilize at target

第三步: 加入I → 消除微小稳态误差（仅在PD稳定后）
  Step 3: Add I → eliminate small steady-state error (only after PD is stable)
```

```c
/* servo_pid_test.c — 舵机PID调参测试 */
/* servo_pid_test.c — Servo PID Tuning Test */

#include "servo_manager.h"
#include "pid_controller.h"
#include "usb_cdc_if.h"  // 用于串口调参 | For serial tuning

// 为每个舵机创建PID控制器 | Create PID controller for each servo
static PID_t servo_pids[SERVO_IDX_COUNT];

void ServoPID_Init(void)
{
    for (uint8_t i = 0; i < SERVO_IDX_COUNT; i++) {
        // 初始参数（保守值）| Initial params (conservative values)
        PID_Init(&servo_pids[i], 5.0f, 0.1f, 2.0f, 0.01f);  // dt=10ms
        PID_SetTarget(&servo_pids[i], 0.0f);                  // 目标: 0度
        PID_SetLimits(&servo_pids[i], -500.0f, 500.0f, 200.0f);
    }
}

// PID控制循环（在定时器中断中以100Hz调用）
// PID control loop (called from timer interrupt at 100Hz)
void ServoPID_Update(void)
{
    for (uint8_t i = 0; i < SERVO_IDX_COUNT; i++) {
        // 1. 读取舵机当前位置 | Read servo current position
        int16_t current_angle;
        if (Servo_GetPosition(servo_addresses[i], &current_angle) != HAL_OK) {
            continue;  // 读取失败，跳过 | Read failed, skip
        }

        // 2. PID计算 | PID computation
        float output = PID_Compute(&servo_pids[i], (float)current_angle);

        // 3. 将PID输出转换为舵机速度命令 | Convert PID output to servo speed command
        int16_t speed = (int16_t)output;
        Servo_SetSpeed(servo_addresses[i], abs(speed));

        // 根据输出方向决定正转/反转 | Direction based on output sign
        int16_t target = (speed >= 0) ?
            servos[i].target_pos + 1 : servos[i].target_pos - 1;
        // 简化处理：直接用PID输出驱动位置 | Simplified: drive position with PID output
    }
}

// 通过USB CDC进行参数调节 | Tune parameters via USB CDC
void ServoPID_TuneViaUSB(void)
{
    // 从USB接收调参命令 | Receive tuning commands from USB
    // 格式: "P<value>" 设置Kp, "I<value>" 设置Ki, "D<value>" 设置Kd
    // Format: "P<value>" set Kp, "I<value>" set Ki, "D<value>" set Kd

    uint8_t buf[64];
    uint32_t len = 0;  // 假设从环形缓冲区获取数据 | Assume data from ring buffer

    if (len > 0) {
        float value;
        if (buf[0] == 'P') {
            value = atof((char *)&buf[1]);
            for (uint8_t i = 0; i < SERVO_IDX_COUNT; i++) {
                servo_pids[i].kp = value;
            }
        }
        // ... I, D 类似处理 | I, D handled similarly
    }
}
```

**调参记录表:**
```
请填写以下表格 | Please fill in the table:

| 序号 | Kp | Ki | Kd | 观察到的现象 | Observation | 稳定时间 |
|------|----|----|----|-------------|-------------|---------|
| 1    | 5  | 0  | 0  |             |             |         |
| 2    | 10 | 0  | 0  |             |             |         |
| 3    | 10 | 0  | 2  |             |             |         |
| 4    | 10 | 0  | 5  |             |             |         |
| 5    | 10 | 0.1| 5  |             |             |         |
| 6    |    |    |    |             |             |         |
```

**预期结果:**
- 理解PID三个参数各自的作用和调节方法
- 能通过串口命令实时调节PID参数
- 舵机能快速、稳定地到达目标位置（超调<5%，稳定时间<0.5s）

**常见问题:**
- **Kp增大后舵机剧烈振荡**：Kp过大导致系统不稳定，减小Kp后加入Kd
- **加入Kd后舵机抖动**：微分对位置噪声敏感，增大微分低通滤波系数
- **加I后启动时猛冲**：积分饱和（integral windup），减小Ki或integral_max

### 任务6.5: 6自由度运动学基础 (40分钟)

运动学（Kinematics）研究的是关节角度与末端执行器位置之间的映射关系。正运动学（Forward Kinematics）根据关节角度计算末端位置。

Kinematics studies the mapping between joint angles and end-effector position. Forward Kinematics computes the end-effector position from joint angles.

```
ElectronBot 左臂简化模型 | ElectronBot Left Arm Simplified Model:

           关节1(肩)Joint1(Shoulder)
              ●─────────── 连杆1(L1=40mm)
             ╱
            ╱ θ1
           ╱
          ●─── 关节2(肘)Joint2(Elbow)
           ╲
            ╲ θ2
             ╲
              ●─── 关节3(腕)Joint3(Wrist)
               ╲
                ╲ θ3
                 ●─── 末端(手)End-effector(Hand)

正运动学公式 | Forward Kinematics Formula:
  关节1末端 | Joint1 end:
    x1 = L1 * cos(θ1)
    y1 = L1 * sin(θ1)

  关节2末端 | Joint2 end:
    x2 = x1 + L2 * cos(θ1 + θ2)
    y2 = y1 + L2 * sin(θ1 + θ2)

  关节3末端（末端执行器）| Joint3 end (end-effector):
    x3 = x2 + L3 * cos(θ1 + θ2 + θ3)
    y3 = y2 + L3 * sin(θ1 + θ2 + θ3)
```

```c
/* kinematics.h — 6自由度运动学 */
/* kinematics.h — 6-DOF Kinematics */

#ifndef KINEMATICS_H
#define KINEMATICS_H

#include <stdint.h>

// 连杆长度定义（毫米）| Link length definitions (mm)
#define LINK_L1  40.0f   // 肩到肘 | Shoulder to elbow
#define LINK_L2  35.0f   // 肘到腕 | Elbow to wrist
#define LINK_L3  25.0f   // 腕到末端 | Wrist to end-effector

// 2D坐标点 | 2D coordinate point
typedef struct {
    float x;
    float y;
} Point2D_t;

// 手臂关节角度 | Arm joint angles
typedef struct {
    float shoulder;  // 肩关节角度(rad) | Shoulder angle (rad)
    float elbow;     // 肘关节角度(rad) | Elbow angle (rad)
    float wrist;     // 腕关节角度(rad) | Wrist angle (rad)
} JointAngles_t;

// 正运动学：从关节角度计算末端位置
// Forward kinematics: compute end-effector position from joint angles
Point2D_t FK_Compute(const JointAngles_t *joints);

// 计算中间关节位置（用于可视化）
// Compute intermediate joint positions (for visualization)
void FK_GetAllPositions(const JointAngles_t *joints,
                         Point2D_t positions[4]);

#endif // KINEMATICS_H
```

```c
/* kinematics.c — 正运动学实现 */
/* kinematics.c — Forward Kinematics Implementation */

#include "kinematics.h"
#include <math.h>

Point2D_t FK_Compute(const JointAngles_t *joints)
{
    Point2D_t end;
    float cum_angle = 0.0f;  // 累积角度 | Cumulative angle

    // 第1段：肩到肘 | Segment 1: shoulder to elbow
    cum_angle = joints->shoulder;
    float x = LINK_L1 * cosf(cum_angle);
    float y = LINK_L1 * sinf(cum_angle);

    // 第2段：肘到腕 | Segment 2: elbow to wrist
    cum_angle += joints->elbow;
    x += LINK_L2 * cosf(cum_angle);
    y += LINK_L2 * sinf(cum_angle);

    // 第3段：腕到末端 | Segment 3: wrist to end-effector
    cum_angle += joints->wrist;
    x += LINK_L3 * cosf(cum_angle);
    y += LINK_L3 * sinf(cum_angle);

    end.x = x;
    end.y = y;
    return end;
}

void FK_GetAllPositions(const JointAngles_t *joints,
                         Point2D_t positions[4])
{
    float cum_angle = 0.0f;

    // 原点 | Origin
    positions[0].x = 0.0f;
    positions[0].y = 0.0f;

    // 肘 | Elbow
    cum_angle = joints->shoulder;
    positions[1].x = LINK_L1 * cosf(cum_angle);
    positions[1].y = LINK_L1 * sinf(cum_angle);

    // 腕 | Wrist
    cum_angle += joints->elbow;
    positions[2].x = positions[1].x + LINK_L2 * cosf(cum_angle);
    positions[2].y = positions[1].y + LINK_L2 * sinf(cum_angle);

    // 末端 | End-effector
    cum_angle += joints->wrist;
    positions[3].x = positions[2].x + LINK_L3 * cosf(cum_angle);
    positions[3].y = positions[2].y + LINK_L3 * sinf(cum_angle);
}
```

> **DH参数（Denavit-Hartenberg）简介:** DH参数是机器人学中描述连杆关系的标准方法。对于ElectronBot这样的简单2D平面手臂，我们使用简化的平面DH参数。每个关节只需要两个参数：连杆长度a和关节角度theta。完整3D DH参数还包含连杆扭转角alpha和连杆偏距d。

**预期结果:**
- 给定关节角度，能计算出手臂末端的位置
- 理解累积角度的概念（每个关节角度相对于前一个连杆）
- 能在纸上画出给定角度下的手臂姿态

**常见问题:**
- **计算位置与实际不符**：确认角度单位是弧度（rad）而不是度（degree），转换公式：rad = deg * PI / 180
- **末端位置超出物理范围**：关节角度超出机械限位，需要加入工作空间检测

---

## 今日作业 | Homework

### 必做题
1. 完成I2C初始化，成功扫描到至少4个舵机，在串口打印各舵机地址
2. 通过I2C控制单个舵机转动到指定角度（0度、45度、-45度），读取并验证位置
3. 实现广播控制，6个舵机同时执行预定义姿态
4. 实现PID控制器代码，在一个舵机上完成P+D调参

### 挑战题
1. **平滑运动轨迹**: 使用三次缓动函数(ease-in-out)替换线性插值，使舵机运动更自然
2. **正运动学可视化**: 在GC9A01屏幕上实时绘制手臂的连杆姿态（简化的2D棍图）
3. **姿态录制与回放**: 通过串口手动控制各关节角度，录制一系列姿态，然后自动回放

### 思考题
1. I2C总线上的6个舵机共享同一条SCL和SDA线，主机如何区分它们？如果两个设备有相同的I2C地址会怎样？
2. 为什么PID调参顺序必须是P -> D -> I？如果一开始就同时调三个参数会面临什么困难？
3. 正运动学和逆运动学的区别是什么？为什么逆运动学更难计算？（提示：解的存在性和唯一性）

---

## 明日预告 | Tomorrow's Preview

明天我们将开发表情动画系统！你将学习表情动画的原理（enter/loop/exit三段式），使用SD卡文件系统存储表情帧数据，在GC9A01屏幕上播放流畅的表情动画。下午将设计表情状态机，实现表情切换逻辑和表情+动作的协同控制。这是ElectronBot"有灵魂"的关键一天！

Tomorrow we develop the expression animation system! You will learn expression animation principles (enter/loop/exit segments), use the SD card file system for storing expression frame data, and play smooth animations on the GC9A01 screen. In the afternoon, we'll design expression state machines with switching logic and expression+motion coordination. This is the day ElectronBot gets its "soul!"

---

## 参考资源 | References

- [STM32 HAL I2C 驱动指南](https://www.st.com/resource/en/user_manual/um1884-description-of-stm32f4-hal-and-lloydrivers.pdf)
- [I2C 协议规范 (NXP)](https://www.nxp.com/docs/en/user-guide/UM10204.pdf)
- [PID 控制器 — 维基百科](https://en.wikipedia.org/wiki/PID_controller)
- [Brian Douglas — PID 控制视频教程 (YouTube)](https://www.youtube.com/playlist?list=PLUMWjy5jgHK1NC52DXXmriCc06LgxPFD)
- [机器人学导论 — Craig](https://www.pearson.com/en-us/subject-catalog/p/introduction-to-robotics-mechanics-and-control/P200000003360)
- [DH参数详解 — Wikipedia](https://en.wikipedia.org/wiki/Denavit%E2%80%93Hartenberg_parameters)

*最后更新：2026-05-27*
