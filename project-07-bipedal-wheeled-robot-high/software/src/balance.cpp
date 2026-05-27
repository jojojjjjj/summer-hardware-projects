/**
 * ============================================================================
 * 平衡控制模块实现 | Balance Control Module Implementation
 * ============================================================================
 * 三环级联 PID 控制器的完整实现
 * Full implementation of three-loop cascade PID controller
 * ============================================================================
 */

#include "balance.h"
#include "utils.h"

// 配置头文件（包含 PID 参数和安全限制）| Config header (PID params and safety limits)
#if __has_include("config.h")
    #include "config.h"
#else
    #include "config.template.h"
#endif

// ============================================================================
// PIDController 构造函数 | PIDController Constructor
// ============================================================================
PIDController::PIDController(float kp, float ki, float kd,
                               float minOut, float maxOut)
    : kp(kp), ki(ki), kd(kd),
      integral(0.0f), lastError(0.0f), lastOutput(0.0f),
      outputMin(minOut), outputMax(maxOut),
      integralLimit(maxOut * 0.5f),  // 积分限幅为输出限幅的一半
      firstRun(true)                   // 首次运行标记 | First run flag
{
}

// ============================================================================
// PID 计算（标准模式）| PID compute (standard mode)
// ============================================================================
float PIDController::compute(float error) {
    // P 项：比例控制 | P term: proportional control
    float pTerm = kp * error;

    // I 项：积分控制 | I term: integral control
    // 累加误差 | Accumulate error
    integral += error;

    // 积分限幅（防止 windup）| Integral clamping (prevent windup)
    // 当积分项过大时限制它，否则系统可能失控
    // Clamp integral when too large, otherwise system may go out of control
    integral = clamp(integral, -integralLimit, integralLimit);

    float iTerm = ki * integral;

    // D 项：微分控制 | D term: derivative control
    float dTerm = 0.0f;
    if (!firstRun) {
        // 误差的变化率 | Rate of change of error
        dTerm = kd * (error - lastError);
    }

    // 保存本次误差供下次使用 | Save error for next iteration
    lastError = error;
    firstRun  = false;

    // 总输出 = P + I + D | Total output = P + I + D
    float output = pTerm + iTerm + dTerm;

    // 输出限幅 | Output clamping
    output = clamp(output, outputMin, outputMax);

    lastOutput = output;
    return output;
}

// ============================================================================
// PID 计算（带外部微分项）| PID compute (with external derivative)
// ============================================================================
float PIDController::compute(float error, float derivative) {
    // P 项和 I 项与标准模式相同 | P and I terms same as standard mode
    float pTerm = kp * error;

    integral += error;
    integral = clamp(integral, -integralLimit, integralLimit);
    float iTerm = ki * integral;

    // D 项使用外部提供的微分值 | D term uses externally provided derivative value
    // 在平衡机器人中，直接用陀螺仪角速度比计算误差微分更稳定
    // In balancing robot, using gyro angular velocity directly is more stable
    // than computing error derivative (less noisy)
    float dTerm = kd * derivative;

    lastError = error;
    firstRun  = false;

    float output = pTerm + iTerm + dTerm;
    output = clamp(output, outputMin, outputMax);

    lastOutput = output;
    return output;
}

// ============================================================================
// 设置 PID 参数 | Set PID tunings
// ============================================================================
void PIDController::setTunings(float kp, float ki, float kd) {
    // 防止负数增益 | Prevent negative gains
    this->kp = (kp >= 0) ? kp : 0;
    this->ki = (ki >= 0) ? ki : 0;
    this->kd = (kd >= 0) ? kd : 0;
}

// ============================================================================
// 设置输出限幅 | Set output limits
// ============================================================================
void PIDController::setOutputLimits(float minOut, float maxOut) {
    outputMin = minOut;
    outputMax = maxOut;
    // 积分限幅也随之更新 | Integral limit updates accordingly
    integralLimit = maxOut * 0.5f;
}

// ============================================================================
// 重置 PID 状态 | Reset PID state
// ============================================================================
void PIDController::reset() {
    integral   = 0.0f;
    lastError  = 0.0f;
    lastOutput = 0.0f;
    firstRun   = true;
}

// ============================================================================
// BalanceController 初始化 | BalanceController init
// ============================================================================
void BalanceController::init() {
    // 初始化直立环 PID | Initialize upright PID
    // 这是内环，响应速度最快 | This is the inner loop, fastest response
    // 参数从 config.h 中读取 | Parameters read from config.h
    uprightPID = PIDController(
        BALANCE_KP,        // 比例增益 | Proportional gain
        BALANCE_KI,        // 积分增益 | Integral gain
        BALANCE_KD,        // 微分增益 | Derivative gain
        -BALANCE_OUTPUT_MAX,  // 最小输出 | Min output
        BALANCE_OUTPUT_MAX    // 最大输出 | Max output
    );

    // 初始化速度环 PID | Initialize velocity PID
    // 外环，输出是角度偏移量 | Outer loop, output is angle offset
    velocityPID = PIDController(
        VELOCITY_KP,       // 比例增益 | Proportional gain
        VELOCITY_KI,       // 积分增益 | Integral gain
        VELOCITY_KD,       // 微分增益 | Derivative gain
        -VELOCITY_OUTPUT_MAX,  // 最小输出（角度）| Min output (angle)
        VELOCITY_OUTPUT_MAX    // 最大输出（角度）| Max output (angle)
    );

    // 初始化转向环 PID | Initialize yaw PID
    yawPID = PIDController(
        YAW_KP,            // 比例增益 | Proportional gain
        YAW_KI,            // 积分增益 | Integral gain
        YAW_KD,            // 微分增益 | Derivative gain
        -YAW_OUTPUT_MAX,   // 最小输出 | Min output
        YAW_OUTPUT_MAX     // 最大输出 | Max output
    );

    // 初始化目标值 | Initialize setpoints
    targetVelocity = 0.0f;
    targetYawRate  = 0.0f;
    targetAngle    = 0.0f;
    leftPWM        = 0;
    rightPWM       = 0;

    Serial.println("[平衡/Balance] 三环 PID 控制器初始化完成");
    Serial.println("[平衡/Balance] Three-loop PID controller initialized");
    Serial.printf("  直立环/Upright:  Kp=%.1f, Ki=%.3f, Kd=%.2f\n",
                  BALANCE_KP, BALANCE_KI, BALANCE_KD);
    Serial.printf("  速度环/Velocity: Kp=%.2f, Ki=%.3f, Kd=%.2f\n",
                  VELOCITY_KP, VELOCITY_KI, VELOCITY_KD);
    Serial.printf("  转向环/Yaw:      Kp=%.2f, Ki=%.3f, Kd=%.3f\n",
                  YAW_KP, YAW_KI, YAW_KD);
}

// ============================================================================
// 计算平衡控制输出 | Compute balance control output
// ============================================================================
void BalanceController::compute(float angle, float gyroY,
                                 float avgSpeed, float yawRate) {
    /*
     * 级联控制流程 | Cascade control flow:
     *
     * 第一步：速度环（外环）| Step 1: Velocity loop (outer)
     *   输入：目标速度 - 实际速度 → 误差
     *   Input: target_vel - actual_vel → error
     *   输出：角度补偿值（让机器人前倾或后仰来加速/减速）
     *   Output: angle compensation (lean forward/back to accelerate/decelerate)
     *
     * 第二步：直立环（内环）| Step 2: Upright loop (inner)
     *   输入：目标角度 - 实际角度 → 误差，加上陀螺仪角速度作为 D 项
     *   Input: target_angle - actual_angle → error, plus gyro as D term
     *   输出：基础 PWM 值（前后方向）
     *   Output: base PWM value (forward/backward)
     *
     * 第三步：转向环 | Step 3: Yaw loop
     *   输入：目标转向速率 - 实际转向速率 → 误差
     *   Input: target_yaw_rate - actual_yaw_rate → error
     *   输出：转向差速 PWM 值 | Output: turning differential PWM
     *
     * 最终输出 = 直立环输出 ± 转向差速
     * Final output = upright output ± yaw differential
     */

    // --- 第一步：速度环 | Step 1: Velocity loop ---
    float velocityError = targetVelocity - avgSpeed;
    // 速度环输出 = 角度偏移 | Velocity loop output = angle offset
    float angleOffset = velocityPID.compute(velocityError);

    // 目标角度 = 机械零位 + 速度环角度补偿
    // Target angle = mechanical zero + velocity loop angle compensation
    // 正的角度偏移让机器人前倾 → 向前加速
    // Positive angle offset makes robot lean forward → accelerate forward
    targetAngle = angleOffset;

    // --- 第二步：直立环 | Step 2: Upright loop ---
    float uprightError = targetAngle - angle;
    // 使用陀螺仪角速度作为 D 项（比误差微分更稳定）
    // Use gyro angular velocity as D term (more stable than error derivative)
    // 注意：陀螺仪方向取反，因为角速度和角度误差方向相反
    // Note: gyro is negated because angular velocity direction is opposite to angle error
    float basePWM = uprightPID.compute(uprightError, -gyroY);

    // --- 第三步：转向环 | Step 3: Yaw loop ---
    float yawError = targetYawRate - yawRate;
    float yawPWM   = yawPID.compute(yawError);

    // --- 最终输出：叠加转向差速 | Final output: add yaw differential ---
    // 左轮 = 基础 - 转向（左转时左轮减速）
    // Left wheel = base - yaw (left wheel slows down when turning left)
    leftPWM  = (int)(basePWM - yawPWM);
    rightPWM = (int)(basePWM + yawPWM);

    // 全局 PWM 限幅 | Global PWM clamping
    leftPWM  = (int)clamp((float)leftPWM,  -MOTOR_MAX_PWM, MOTOR_MAX_PWM);
    rightPWM = (int)clamp((float)rightPWM, -MOTOR_MAX_PWM, MOTOR_MAX_PWM);
}

// ============================================================================
// 设置目标速度和转向 | Set target velocity and yaw rate
// ============================================================================
void BalanceController::setTarget(float velocity, float yawRate) {
    targetVelocity = velocity;
    targetYawRate  = yawRate;
}

// ============================================================================
// 设置直立环参数 | Set upright loop tunings
// ============================================================================
void BalanceController::setUprightTunings(float kp, float ki, float kd) {
    uprightPID.setTunings(kp, ki, kd);
    Serial.printf("[平衡/Balance] 直立环参数更新/Upright tunings: Kp=%.1f Ki=%.3f Kd=%.2f\n",
                  kp, ki, kd);
}

// ============================================================================
// 设置速度环参数 | Set velocity loop tunings
// ============================================================================
void BalanceController::setVelocityTunings(float kp, float ki, float kd) {
    velocityPID.setTunings(kp, ki, kd);
    Serial.printf("[平衡/Balance] 速度环参数更新/Velocity tunings: Kp=%.2f Ki=%.3f Kd=%.2f\n",
                  kp, ki, kd);
}

// ============================================================================
// 设置转向环参数 | Set yaw loop tunings
// ============================================================================
void BalanceController::setYawTunings(float kp, float ki, float kd) {
    yawPID.setTunings(kp, ki, kd);
    Serial.printf("[平衡/Balance] 转向环参数更新/Yaw tunings: Kp=%.2f Ki=%.3f Kd=%.3f\n",
                  kp, ki, kd);
}

// ============================================================================
// 重置所有控制器 | Reset all controllers
// ============================================================================
void BalanceController::resetAll() {
    uprightPID.reset();
    velocityPID.reset();
    yawPID.reset();
    targetAngle    = 0.0f;
    leftPWM        = 0;
    rightPWM       = 0;
}
