/**
 * ============================================================================
 * 平衡控制模块头文件 | Balance Control Module Header
 * ============================================================================
 * 包含通用 PID 控制器和三环平衡控制器
 * Contains generic PID controller and 3-loop balance controller
 *
 * 控制架构 | Control architecture:
 *
 *   目标速度 ─→ [速度环PI] ─→ 目标角度 ─→ [直立环PD] ─→ PWM输出
 *   target_vel → [velocity PI] → target_angle → [upright PD] → PWM output
 *                                                    ↑
 *   目标转向 ─→ [转向环PID] ─────────────────────→ 左右差速
 *   target_yaw → [yaw PID] ─────────────────────→ left-right differential
 *
 * 三环级联结构说明 | Three-loop cascade structure explanation:
 *   外环（速度环）输出作为内环（直立环）的输入
 *   Outer loop (velocity) output feeds into inner loop (upright) input
 *   这保证了机器人在保持平衡的同时还能响应速度指令
 *   This ensures the robot maintains balance while responding to speed commands
 * ============================================================================
 */

#ifndef BALANCE_H
#define BALANCE_H

#include <Arduino.h>

// ============================================================================
// 通用 PID 控制器类 | Generic PID Controller Class
// ============================================================================
/**
 * PID 控制器原理 | PID controller principle:
 *
 *   output = Kp × error + Ki × Σerror + Kd × (error - lastError)
 *            └─ 比例(P)─┘  └── 积分(I)──┘  └──── 微分(D)─────┘
 *
 *   P（比例）：误差越大，纠正力越大。像弹簧。
 *   P (Proportional): larger error → stronger correction. Like a spring.
 *
 *   I（积分）：累积历史误差，消除稳态偏差。像恒力推手。
 *   I (Integral): accumulates past error, eliminates steady-state offset.
 *
 *   D（微分）：预测误差变化趋势，提前刹车。像阻尼器。
 *   D (Derivative): predicts error trend, brakes early. Like a damper.
 */
class PIDController {
public:
    /**
     * 构造函数 | Constructor
     * @param kp   比例增益 | Proportional gain
     * @param ki   积分增益 | Integral gain
     * @param kd   微分增益 | Derivative gain
     * @param minOut  输出最小值 | Minimum output
     * @param maxOut  输出最大值 | Maximum output
     */
    PIDController(float kp = 0.0f, float ki = 0.0f, float kd = 0.0f,
                  float minOut = -255.0f, float maxOut = 255.0f);

    /**
     * 计算 PID 输出 | Compute PID output
     * @param error  当前误差 = 目标值 - 测量值 | Current error = setpoint - measurement
     * @return       控制输出 | Control output
     *
     * 每次控制循环调用一次 | Call once per control cycle
     */
    float compute(float error);

    /**
     * 计算 PID 输出（带微分项替代）| Compute PID with external derivative
     * @param error       当前误差 | Current error
     * @param derivative  微分项替代值（例如直接使用陀螺仪数据代替误差微分）
     *                    Derivative replacement (e.g., use gyro directly instead of error derivative)
     * @return            控制输出 | Control output
     *
     * 当测量值噪声较大时，直接用角速度作为 D 项比计算误差微分更稳定
     * When measurement is noisy, using angular velocity as D term is more stable
     * than computing the derivative of the error
     */
    float compute(float error, float derivative);

    /**
     * 设置 PID 参数 | Set PID tuning parameters
     */
    void setTunings(float kp, float ki, float kd);

    /**
     * 设置输出限幅 | Set output clamp limits
     */
    void setOutputLimits(float minOut, float maxOut);

    /**
     * 重置积分项和上次误差 | Reset integral and last error
     *
     * 在状态切换时调用，避免积分项残留导致启动抖动
     * Call when switching states to avoid residual integral causing startup jitter
     */
    void reset();

    // 获取当前参数 | Get current parameters
    float getKp() const { return kp; }
    float getKi() const { return ki; }
    float getKd() const { return kd; }
    float getIntegral() const { return integral; }
    float getOutput() const { return lastOutput; }

private:
    // PID 增益 | PID gains
    float kp, ki, kd;

    // 内部状态 | Internal state
    float integral;       // 积分累积值 | Integral accumulator
    float lastError;      // 上次误差 | Previous error
    float lastOutput;     // 上次输出 | Previous output

    // 输出限幅 | Output limits
    float outputMin, outputMax;

    // 积分限幅（防止积分饱和）| Integral limit (prevent integral windup)
    float integralLimit;

    // 是否已初始化（首次调用特殊处理）| Initialized flag
    bool firstRun;
};

// ============================================================================
// 平衡控制器类 | Balance Controller Class
// ============================================================================
/**
 * 三环级联平衡控制器 | Three-loop cascade balance controller
 *
 * 典型调用流程 | Typical call flow:
 *   1. setTarget(targetVelocity, targetYawRate)
 *   2. compute(angle, gyroY, avgSpeed, yawRate)
 *   3. getLeftPWM() / getRightPWM()
 */
class BalanceController {
public:
    /**
     * 初始化平衡控制器 | Initialize balance controller
     * 加载默认 PID 参数 | Load default PID parameters
     */
    void init();

    /**
     * 计算平衡控制输出 | Compute balance control output
     * @param angle          当前倾斜角度（度）| Current tilt angle (degrees)
     * @param gyroY          Y 轴角速度（度/秒）| Y-axis angular velocity (deg/sec)
     * @param avgSpeed       平均轮速（脉冲/秒）| Average wheel speed (pulses/sec)
     * @param yawRate        Z 轴角速度（度/秒）| Z-axis angular velocity (deg/sec)
     *
     * 此函数执行完整的级联 PID 计算 | This executes full cascade PID computation
     */
    void compute(float angle, float gyroY, float avgSpeed, float yawRate);

    /**
     * 设置目标速度和转向 | Set target velocity and yaw rate
     * @param velocity  目标前进速度（脉冲/秒）| Target forward speed (pulses/sec)
     * @param yawRate   目标转向速率（度/秒）| Target yaw rate (deg/sec)
     *
     * 通常由遥控器调用 | Usually called by remote control
     */
    void setTarget(float velocity, float yawRate);

    /**
     * 设置直立环 PID 参数 | Set upright loop PID parameters
     */
    void setUprightTunings(float kp, float ki, float kd);

    /**
     * 设置速度环 PID 参数 | Set velocity loop PID parameters
     */
    void setVelocityTunings(float kp, float ki, float kd);

    /**
     * 设置转向环 PID 参数 | Set yaw loop PID parameters
     */
    void setYawTunings(float kp, float ki, float kd);

    /**
     * 获取左电机 PWM 输出 | Get left motor PWM output
     */
    int getLeftPWM() const { return leftPWM; }

    /**
     * 获取右电机 PWM 输出 | Get right motor PWM output
     */
    int getRightPWM() const { return rightPWM; }

    /**
     * 获取当前机械角（直立环的目标角度）| Get current mechanical angle
     */
    float getTargetAngle() const { return targetAngle; }

    /**
     * 重置所有 PID 控制器 | Reset all PID controllers
     */
    void resetAll();

    /**
     * 获取直立环 PID（用于调试）| Get upright PID (for debugging)
     */
    PIDController& getUprightPID() { return uprightPID; }

    /**
     * 获取速度环 PID（用于调试）| Get velocity PID (for debugging)
     */
    PIDController& getVelocityPID() { return velocityPID; }

    /**
     * 获取转向环 PID（用于调试）| Get yaw PID (for debugging)
     */
    PIDController& getYawPID() { return yawPID; }

private:
    // 三个 PID 控制器 | Three PID controllers
    PIDController uprightPID;    // 直立环（内环）| Upright loop (inner)
    PIDController velocityPID;   // 速度环（外环）| Velocity loop (outer)
    PIDController yawPID;        // 转向环 | Yaw loop

    // 目标值 | Setpoints
    float targetVelocity;   // 目标速度 | Target velocity
    float targetYawRate;    // 目标转向速率 | Target yaw rate
    float targetAngle;      // 速度环输出的目标角度 | Target angle from velocity loop

    // 最终输出 | Final outputs
    int leftPWM;            // 左电机 PWM | Left motor PWM
    int rightPWM;           // 右电机 PWM | Right motor PWM
};

#endif // BALANCE_H
