/**
 * ============================================================================
 * 电机控制模块头文件 | Motor Control Module Header
 * ============================================================================
 * 负责双轮电机的 PWM 驱动和编码器速度读取
 * Responsible for dual-wheel motor PWM driving and encoder speed reading
 *
 * 硬件说明 | Hardware notes:
 *   - 本框架使用简单的 PWM + 方向引脚控制（适用于带驱动的直流电机/BLDC）
 *     This framework uses simple PWM + direction pin control
 *   - 如需 FOC 矢量控制，参见 initFOC() 方法
 *     For FOC control, see initFOC() method
 * ============================================================================
 */

#ifndef MOTOR_CONTROL_H
#define MOTOR_CONTROL_H

#include <Arduino.h>

// ============================================================================
// 电机编号枚举 | Motor ID Enum
// ============================================================================
enum MotorID {
    MOTOR_LEFT  = 0,    // 左电机 | Left motor
    MOTOR_RIGHT = 1,    // 右电机 | Right motor
    MOTOR_COUNT = 2     // 电机总数 | Total motor count
};

// ============================================================================
// 电机引脚配置结构体 | Motor Pin Configuration Struct
// ============================================================================
struct MotorPins {
    uint8_t pwmPin;       // PWM 脉宽调制引脚 | PWM pin
    uint8_t dirPin;       // 方向控制引脚 | Direction pin
    uint8_t encoderA;     // 编码器 A 相引脚 | Encoder phase A pin
    uint8_t encoderB;     // 编码器 B 相引脚 | Encoder phase B pin
};

// ============================================================================
// MotorControl 电机控制类 | Motor Control Class
// ============================================================================
class MotorControl {
public:
    /**
     * 初始化电机和编码器 | Initialize motors and encoders
     * @param leftPins   左电机引脚配置 | Left motor pin config
     * @param rightPins  右电机引脚配置 | Right motor pin config
     * @param pwmFreq    PWM 频率（Hz）| PWM frequency (Hz)
     * @param pwmRes     PWM 分辨率（位）| PWM resolution (bits)
     *
     * 注意：此函数在 setup() 中调用一次 | Call once in setup()
     */
    void init(const MotorPins& leftPins, const MotorPins& rightPins,
              uint32_t pwmFreq = 20000, uint8_t pwmRes = 8);

    /**
     * 初始化 FOC 控制（需要 SimpleFOC 库）| Initialize FOC control (requires SimpleFOC)
     *
     * 如果你使用 SimpleFOC 兼容的无刷电机驱动器，调用此函数替代简单 PWM
     * If using a SimpleFOC-compatible BLDC driver, call this instead of simple PWM
     */
    void initFOC();

    /**
     * 设置电机速度 | Set motor speed
     * @param leftSpeed   左电机速度（-255 ~ +255，正值前进）
     *                    Left motor speed (-255 to +255, positive = forward)
     * @param rightSpeed  右电机速度（-255 ~ +255，正值前进）
     *                    Right motor speed (-255 to +255, positive = forward)
     */
    void setSpeed(int leftSpeed, int rightSpeed);

    /**
     * 设置单个电机速度 | Set single motor speed
     * @param id     电机编号 | Motor ID (MOTOR_LEFT or MOTOR_RIGHT)
     * @param speed  速度值（-255 ~ +255）| Speed value (-255 to +255)
     */
    void setSingleMotor(MotorID id, int speed);

    /**
     * 停止所有电机（紧急停止）| Stop all motors (emergency stop)
     */
    void stopAll();

    /**
     * 读取编码器速度 | Read encoder velocity
     * @param id  电机编号 | Motor ID
     * @return    编码器脉冲数/秒 | Encoder pulses per second
     *
     * 速度在每次调用 updateEncoders() 时更新
     * Velocity is updated each time updateEncoders() is called
     */
    float getSpeed(MotorID id) const;

    /**
     * 读取编码器累计位置 | Read cumulative encoder position
     * @param id  电机编号 | Motor ID
     * @return    累计脉冲数 | Cumulative pulse count
     */
    int32_t getPosition(MotorID id) const;

    /**
     * 更新编码器读数（在控制循环中定期调用）
     * Update encoder readings (call periodically in control loop)
     * @param dtMs  距上次调用的时间间隔（毫秒）| Time since last call (ms)
     *
     * 此函数计算当前速度 | This function calculates current velocity
     */
    void updateEncoders(uint32_t dtMs);

    /**
     * 重置编码器位置归零 | Reset encoder position to zero
     * @param id  电机编号，-1 表示全部重置 | Motor ID, -1 for all
     */
    void resetEncoders(int id = -1);

    /**
     * 获取平均速度（两轮速度的平均值，用于速度环）
     * Get average velocity (mean of both wheels, used by velocity loop)
     */
    float getAverageSpeed() const;

private:
    // 两个电机的引脚配置 | Pin configs for both motors
    MotorPins pins[MOTOR_COUNT];

    // PWM 通道号（ESP32 LEDC 通道）| PWM channel numbers (ESP32 LEDC channels)
    uint8_t pwmChannels[MOTOR_COUNT];

    // 编码器计数 | Encoder counts
    int32_t encoderCount[MOTOR_COUNT];
    int32_t lastEncoderCount[MOTOR_COUNT];

    // 计算得到的速度（脉冲/秒）| Calculated velocity (pulses/sec)
    float currentSpeed[MOTOR_COUNT];

    // 当前 PWM 占空比 | Current PWM duty cycle
    int currentPWM[MOTOR_COUNT];

    // 是否已初始化 | Whether initialized
    bool initialized;

    // 是否使用 FOC 模式 | Whether using FOC mode
    bool focMode;

    /**
     * 应用死区补偿 | Apply dead-zone compensation
     * 低 PWM 值时电机无法启动，此函数补偿这个区域
     * Motors can't start at low PWM, this compensates for that region
     */
    int applyDeadZone(int pwm, int deadZone);

    /**
     * 读取编码器原始计数 | Read raw encoder count from hardware
     * 使用 ESP32 的 PCNT 外设直接读取 | Uses ESP32 PCNT peripheral
     */
    int32_t readEncoderRaw(MotorID id);
};

#endif // MOTOR_CONTROL_H
