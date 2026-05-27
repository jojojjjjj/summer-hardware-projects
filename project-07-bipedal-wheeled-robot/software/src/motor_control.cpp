/**
 * ============================================================================
 * 电机控制模块实现 | Motor Control Module Implementation
 * ============================================================================
 */

#include "motor_control.h"

// 配置头文件（包含电机参数和引脚定义）| Config header (motor params and pin definitions)
#if __has_include("config.h")
    #include "config.h"
#else
    #include "config.template.h"
#endif

// ============================================================================
// 初始化：配置引脚和编码器 | Init: configure pins and encoders
// ============================================================================
void MotorControl::init(const MotorPins& leftPins, const MotorPins& rightPins,
                         uint32_t pwmFreq, uint8_t pwmRes) {

    // 保存引脚配置 | Save pin configurations
    pins[MOTOR_LEFT]  = leftPins;
    pins[MOTOR_RIGHT] = rightPins;

    // ESP32 LEDC PWM 通道分配 | ESP32 LEDC PWM channel assignment
    // 左电机用通道 0，右电机用通道 1 | Left motor uses ch0, right uses ch1
    pwmChannels[MOTOR_LEFT]  = 0;
    pwmChannels[MOTOR_RIGHT] = 1;

    // 为每个电机配置引脚 | Configure pins for each motor
    for (int i = 0; i < MOTOR_COUNT; i++) {
        // 设置方向引脚为输出 | Set direction pin as output
        pinMode(pins[i].dirPin, OUTPUT);

        // 设置编码器引脚为输入上拉（编码器通常为开漏输出）
        // Set encoder pins as input with pullup (encoders are often open-drain)
        pinMode(pins[i].encoderA, INPUT_PULLUP);
        pinMode(pins[i].encoderB, INPUT_PULLUP);

        // 配置 LEDC PWM 通道 | Configure LEDC PWM channel
        // ledcSetup(通道, 频率, 分辨率) | ledcSetup(channel, freq, resolution)
        ledcSetup(pwmChannels[i], pwmFreq, pwmRes);

        // 将 PWM 通道绑定到物理引脚 | Attach PWM channel to physical pin
        ledcAttachPin(pins[i].pwmPin, pwmChannels[i]);

        // 初始状态：停止 | Initial state: stopped
        currentPWM[i]     = 0;
        encoderCount[i]   = 0;
        lastEncoderCount[i] = 0;
        currentSpeed[i]   = 0.0f;
    }

    initialized = true;
    focMode     = false;

    Serial.println("[电机/Motor] 初始化完成 | Init complete");
    Serial.printf("  PWM频率/Freq: %d Hz, 分辨率/Res: %d bits\n", pwmFreq, pwmRes);
}

// ============================================================================
// FOC 模式初始化（使用 SimpleFOC）| FOC mode init (using SimpleFOC)
// ============================================================================
void MotorControl::initFOC() {
    /*
     * FOC 矢量控制模式 | FOC vector control mode
     *
     * 如果你的电机驱动器支持 FOC（如 SimpleFOC 驱动板），
     * 在这里初始化 BLDCMotor 和 BLDCDriver3PWM 对象。
     *
     * If your motor driver supports FOC (e.g., SimpleFOC driver board),
     * initialize BLDCMotor and BLDCDriver3PWM objects here.
     *
     * 示例代码 | Example code:
     *
     *   BLDCMotor motor = BLDCMotor(7);              // 极对数 | pole pairs
     *   BLDCDriver3PWM driver = BLDCDriver3PWM(25, 26, 27); // PWM 引脚
     *   driver.init();
     *   motor.linkDriver(&driver);
     *   motor.init();
     *   motor.initFOC();
     *
     * 当前版本使用简单 PWM 控制，学生可自行扩展为 FOC
     * Current version uses simple PWM control, students can extend to FOC
     */

    focMode = true;
    Serial.println("[电机/Motor] FOC 模式预留（需 SimpleFOC 扩展）");
    Serial.println("[电机/Motor] FOC mode reserved (requires SimpleFOC extension)");
}

// ============================================================================
// 设置双电机速度 | Set both motor speeds
// ============================================================================
void MotorControl::setSpeed(int leftSpeed, int rightSpeed) {
    if (!initialized) return;

    // 右电机方向反转（因为安装方向相反）
    // Right motor direction inverted (because mounting is opposite)
    setSingleMotor(MOTOR_LEFT, leftSpeed);
    setSingleMotor(MOTOR_RIGHT, -rightSpeed);
}

// ============================================================================
// 设置单个电机速度 | Set single motor speed
// ============================================================================
void MotorControl::setSingleMotor(MotorID id, int speed) {
    if (!initialized || id >= MOTOR_COUNT) return;

    // 限制 PWM 范围 | Clamp PWM range
    speed = constrain(speed, -255, 255);

    // 应用死区补偿 | Apply dead-zone compensation
    speed = applyDeadZone(speed, MOTOR_DEAD_ZONE);

    // 根据速度方向设置方向引脚 | Set direction pin based on speed sign
    if (speed >= 0) {
        // 正转：方向引脚高电平 | Forward: direction pin HIGH
        digitalWrite(pins[id].dirPin, HIGH);
    } else {
        // 反转：方向引脚低电平 | Backward: direction pin LOW
        digitalWrite(pins[id].dirPin, LOW);
        speed = -speed;  // 取绝对值作为 PWM 占空比 | Use absolute value for PWM duty
    }

    // 写入 PWM 占空比 | Write PWM duty cycle
    ledcWrite(pwmChannels[id], speed);
    currentPWM[id] = speed;
}

// ============================================================================
// 紧急停止所有电机 | Emergency stop all motors
// ============================================================================
void MotorControl::stopAll() {
    for (int i = 0; i < MOTOR_COUNT; i++) {
        ledcWrite(pwmChannels[i], 0);
        currentPWM[i] = 0;
    }
}

// ============================================================================
// 读取编码器速度 | Read encoder velocity
// ============================================================================
float MotorControl::getSpeed(MotorID id) const {
    if (id >= MOTOR_COUNT) return 0.0f;
    return currentSpeed[id];
}

// ============================================================================
// 读取编码器累计位置 | Read cumulative encoder position
// ============================================================================
int32_t MotorControl::getPosition(MotorID id) const {
    if (id >= MOTOR_COUNT) return 0;
    return encoderCount[id];
}

// ============================================================================
// 更新编码器读数（计算速度）| Update encoder readings (calculate velocity)
// ============================================================================
void MotorControl::updateEncoders(uint32_t dtMs) {
    // 防止除以零 | Prevent division by zero
    if (dtMs == 0) return;

    for (int i = 0; i < MOTOR_COUNT; i++) {
        // 保存上一次的计数 | Save previous count
        lastEncoderCount[i] = encoderCount[i];

        // 读取当前计数 | Read current count
        encoderCount[i] = readEncoderRaw(static_cast<MotorID>(i));

        // 计算速度：脉冲变化量 / 时间（转换为脉冲/秒）
        // Calculate velocity: pulse delta / time (convert to pulses/sec)
        int32_t delta = encoderCount[i] - lastEncoderCount[i];
        currentSpeed[i] = (float)delta * 1000.0f / (float)dtMs;
    }
}

// ============================================================================
// 重置编码器 | Reset encoders
// ============================================================================
void MotorControl::resetEncoders(int id) {
    if (id < 0) {
        // 重置所有编码器 | Reset all encoders
        for (int i = 0; i < MOTOR_COUNT; i++) {
            encoderCount[i]     = 0;
            lastEncoderCount[i] = 0;
            currentSpeed[i]     = 0.0f;
        }
    } else if (id < MOTOR_COUNT) {
        encoderCount[id]     = 0;
        lastEncoderCount[id] = 0;
        currentSpeed[id]     = 0.0f;
    }
}

// ============================================================================
// 获取平均速度 | Get average speed
// ============================================================================
float MotorControl::getAverageSpeed() const {
    return (currentSpeed[MOTOR_LEFT] + currentSpeed[MOTOR_RIGHT]) / 2.0f;
}

// ============================================================================
// 死区补偿 | Dead-zone compensation
// ============================================================================
int MotorControl::applyDeadZone(int pwm, int deadZone) {
    if (pwm == 0) return 0;  // 零直接返回 | Return zero directly

    // 如果绝对值在死区内，补偿到死区边界
    // If absolute value is within dead zone, boost to dead zone edge
    if (abs(pwm) < deadZone) {
        return (pwm > 0) ? deadZone : -deadZone;
    }
    return pwm;
}

// ============================================================================
// 读取编码器原始计数值 | Read raw encoder count
// ============================================================================
int32_t MotorControl::readEncoderRaw(MotorID id) {
    /*
     * 编码器读取实现 | Encoder reading implementation
     *
     * 这里使用简单的 GPIO 中断计数方式。
     * 实际项目中建议使用 ESP32Encoder 库利用 PCNT 硬件外设。
     *
     * This uses simple GPIO interrupt counting.
     * For real projects, use ESP32Encoder library with PCNT hardware peripheral.
     *
     * 如果使用 ESP32Encoder 库，替换为：
     * If using ESP32Encoder library, replace with:
     *   return encoder[id].getCount();
     */

    // 占位实现：返回当前累计值 | Placeholder: return current cumulative value
    // 学生需要根据使用的编码器库来实现此函数
    // Students need to implement this based on their encoder library
    return encoderCount[id];
}
