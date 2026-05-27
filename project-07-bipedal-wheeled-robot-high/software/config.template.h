/**
 * ============================================================================
 * 轮足机器人配置模板 | Bipedal Wheeled Robot Configuration Template
 * ============================================================================
 *
 * 使用说明 | Usage Instructions:
 *   1. 复制此文件并重命名为 config.h | Copy this file and rename to config.h
 *   2. 根据你的硬件修改下面的参数 | Modify parameters below for your hardware
 *   3. config.h 不会被 Git 追踪（已在 .gitignore 中）| config.h won't be tracked by Git
 *
 * 警告 | WARNING:
 *   - 错误的引脚配置可能损坏硬件 | Incorrect pin config may damage hardware
 *   - 首次使用请先断开电机电源测试 | Test with motor power disconnected first
 *   - PID 参数需要根据实际机器人调试 | PID params need tuning for your robot
 *
 * ============================================================================
 */

#ifndef CONFIG_TEMPLATE_H
#define CONFIG_TEMPLATE_H

// ============================================================================
// WiFi 无线网络配置 | WiFi Configuration
// ============================================================================
// 用于通过手机/电脑远程控制机器人 | For remote control via phone/computer

// WiFi 热点名称 | WiFi access point name (SSID)
#define WIFI_SSID              "BipedalBot_AP"

// WiFi 密码（至少8位）| WiFi password (minimum 8 characters)
#define WIFI_PASSWORD          "12345678"

// 本地端口，用于接收控制指令 | Local port for receiving control commands
#define WIFI_CONTROL_PORT      8888

// 调试 Web 服务器端口 | Debug web server port
#define WIFI_DEBUG_PORT        80

// ============================================================================
// Bluetooth 蓝牙配置 | Bluetooth Configuration
// ============================================================================
// 用于手机蓝牙遥控 | For phone Bluetooth remote control

// 蓝牙设备名称 | Bluetooth device name
#define BT_DEVICE_NAME         "BipedalBot"

// ============================================================================
// Motor 电机引脚配置 | Motor Pin Configuration
// ============================================================================
// 根据你的接线修改引脚号 | Modify pin numbers according to your wiring
//
// ESP32 GPIO 引脚说明 | ESP32 GPIO pin notes:
//   - GPIO 34, 35, 36, 39 仅输入（不能做 PWM 输出）
//     GPIO 34, 35, 36, 39 are input-only (cannot do PWM output)
//   - GPIO 6, 7, 8, 9, 10, 11 连接内部 Flash（不要使用）
//     GPIO 6-11 connected to internal Flash (do not use)

// --- 左电机引脚 | Left Motor Pins ---
// PWM 脉宽调制引脚，控制电机转速 | PWM pin for motor speed control
#define MOTOR_LEFT_PWM_PIN     25

// 方向控制引脚 | Direction control pin
#define MOTOR_LEFT_DIR_PIN     26

// 编码器 A 相引脚 | Encoder phase A pin
#define MOTOR_LEFT_ENCODER_A   32

// 编码器 B 相引脚 | Encoder phase B pin
#define MOTOR_LEFT_ENCODER_B   33

// --- 右电机引脚 | Right Motor Pins ---
#define MOTOR_RIGHT_PWM_PIN    27
#define MOTOR_RIGHT_DIR_PIN    14
#define MOTOR_RIGHT_ENCODER_A  4
#define MOTOR_RIGHT_ENCODER_B  16

// --- 电机通用参数 | Motor General Parameters ---

// PWM 频率（Hz），频率越高电机声音越小但可能影响性能
// PWM frequency (Hz), higher = quieter but may affect performance
#define MOTOR_PWM_FREQ         20000

// PWM 分辨率（位数）| PWM resolution (bits)
#define MOTOR_PWM_RESOLUTION   8

// 编码器每转脉冲数（PPR = Pulses Per Revolution）
// Encoder pulses per revolution (check your encoder datasheet)
#define ENCODER_PPR            1320

// 电机最大 PWM 值 | Maximum PWM value for motors
#define MOTOR_MAX_PWM          255

// 电机死区补偿值（低于此值电机不转）| Motor dead-zone compensation
#define MOTOR_DEAD_ZONE        30

// ============================================================================
// IMU 惯性测量单元引脚配置 | IMU Pin Configuration
// ============================================================================
// MPU6050 使用 I2C 通信 | MPU6050 uses I2C communication

// I2C 数据线引脚 | I2C data pin
#define IMU_SDA_PIN            21

// I2C 时钟线引脚 | I2C clock pin
#define IMU_SCL_PIN            22

// MPU6050 I2C 地址（AD0 接低电平=0x68，接高电平=0x69）
// MPU6050 I2C address (AD0 low=0x68, AD0 high=0x69)
#define MPU6050_ADDRESS        0x68

// 加速度计量程 | Accelerometer full-scale range
// 0 = ±2g, 1 = ±4g, 2 = ±8g, 3 = ±16g
#define ACCEL_RANGE            2

// 陀螺仪量程 | Gyroscope full-scale range
// 0 = ±250°/s, 1 = ±500°/s, 2 = ±1000°/s, 3 = ±2000°/s
#define GYRO_RANGE             1

// ============================================================================
// PID 参数配置 | PID Parameter Configuration
// ============================================================================
// 这些参数需要根据你的机器人实际表现来调试
// These parameters need tuning based on your robot's actual behavior
//
// 调试技巧 | Tuning tips:
//   1. 先调 Kp，从小值开始慢慢增大直到机器人开始振荡
//      Start with Kp, increase slowly until robot oscillates
//   2. 加入 Kd 抑制振荡 | Add Kd to dampen oscillations
//   3. 最后加 Ki 消除稳态误差 | Finally add Ki to eliminate steady-state error
//   4. 每次只调一个参数 | Only adjust one parameter at a time

// --- 直立环 PID（内环）| Upright PID (inner loop) ---
// 控制机器人前后平衡，这是最关键的 PID 环
// Controls front-back balance, the most critical PID loop
#define BALANCE_KP             35.0f
#define BALANCE_KI             0.0f
#define BALANCE_KD             0.5f

// 直立环输出限幅 | Upright loop output clamp (PWM units)
#define BALANCE_OUTPUT_MAX     200.0f

// --- 速度环 PID（外环）| Velocity PID (outer loop) ---
// 控制机器人前进/后退速度 | Controls forward/backward speed
#define VELOCITY_KP            0.8f
#define VELOCITY_KI            0.01f
#define VELOCITY_KD            0.0f

// 速度环输出限幅（角度叠加值，单位：度）| Velocity loop output clamp (degrees)
#define VELOCITY_OUTPUT_MAX    10.0f

// --- 转向环 PID | Yaw/Turn PID ---
// 控制机器人转向 | Controls robot turning
#define YAW_KP                 1.5f
#define YAW_KI                 0.0f
#define YAW_KD                 0.05f

// 转向环输出限幅 | Yaw loop output clamp (PWM units)
#define YAW_OUTPUT_MAX         80.0f

// ============================================================================
// 机械参数 | Mechanical Parameters
// ============================================================================
// 这些参数影响速度计算和平衡控制 | These affect speed calculation and balance

// 车轮直径（毫米）| Wheel diameter (mm)
#define WHEEL_DIAMETER_MM      65.0f

// 轮距（两轮中心距离，毫米）| Wheel track (distance between wheels, mm)
#define WHEEL_TRACK_MM         130.0f

// 机器人总质量（千克）| Total robot mass (kg)
#define ROBOT_MASS_KG          0.8f

// 重心高度（从轮轴到重心，毫米）| Center of gravity height (mm from wheel axis)
#define COG_HEIGHT_MM          80.0f

// ============================================================================
// 安全限制参数 | Safety Limit Parameters
// ============================================================================
// 保护机器人和使用者的安全参数 | Safety parameters to protect robot and user

// 最大允许倾斜角度（度），超过则停止电机
// Maximum allowed tilt angle (degrees), motors stop beyond this
#define MAX_TILT_ANGLE         45.0f

// 最大允许速度（编码器脉冲/秒）| Maximum allowed speed (encoder pulses/sec)
#define MAX_WHEEL_SPEED        3000.0f

// 最大允许电机电流（如支持电流检测）| Max motor current (if current sensing supported)
#define MAX_MOTOR_CURRENT_MA   2000.0f

// 低电压保护阈值（伏特）| Low voltage protection threshold (volts)
#define LOW_BATTERY_VOLTAGE    6.0f

// 超时保护：无遥控指令超过此时间则停止（毫秒）
// Timeout: stop if no remote command received (ms)
#define REMOTE_TIMEOUT_MS      500

// ============================================================================
// 电池监测配置 | Battery Monitoring Configuration
// ============================================================================

// 电池电压检测 ADC 引脚 | Battery voltage ADC pin
#define BATTERY_ADC_PIN        35

// 电压分压比（R1/(R1+R2)），用于将 ADC 值还原为实际电压
// Voltage divider ratio (R1/(R1+R2)), to convert ADC value to actual voltage
// 例如：R1=10kΩ, R2=10kΩ → ratio = 10000/(10000+10000) = 0.5
// Example: R1=10k, R2=10k -> ratio = 0.5
#define VOLTAGE_DIVIDER_RATIO  0.5f

// ADC 参考电压（ESP32 通常为 3.3V）| ADC reference voltage
#define ADC_REFERENCE_VOLTAGE  3.3f

// ADC 分辨率（ESP32 默认 12 位 = 4096）| ADC resolution
#define ADC_RESOLUTION         4096.0f

// ============================================================================
// 滤波器参数 | Filter Parameters
// ============================================================================

// 互补滤波器系数（0~1，越大越信任陀螺仪）
// Complementary filter coefficient (0~1, higher = trust gyroscope more)
// 典型值 0.96~0.98 | Typical value 0.96~0.98
#define COMPLEMENTARY_ALPHA    0.97f

// 低通滤波器系数（用于速度滤波）
// Low-pass filter coefficient (for velocity filtering)
#define VELOCITY_LPF_ALPHA     0.8f

// ============================================================================
// 控制循环参数 | Control Loop Parameters
// ============================================================================

// 主控制循环周期（毫秒）| Main control loop period (ms)
// 10ms = 100Hz，适合大多数平衡机器人 | 10ms = 100Hz, suitable for most balancing robots
#define CONTROL_LOOP_PERIOD_MS 10

// 速度环更新频率（每隔几次控制循环更新一次速度环）
// Velocity loop update rate (update every N control cycles)
#define VELOCITY_LOOP_DIVIDER  5

// 串口调试输出频率（每隔几次控制循环输出一次）
// Serial debug output rate (output every N control cycles)
#define DEBUG_PRINT_DIVIDER    50

// ============================================================================
// 串口配置 | Serial Configuration
// ============================================================================

// 调试串口波特率 | Debug serial baud rate
#define SERIAL_BAUD_RATE       115200

// 是否启用串口调试输出（设为 0 可节省 CPU 时间）
// Enable serial debug output (set to 0 to save CPU time)
#define ENABLE_SERIAL_DEBUG    1

#endif // CONFIG_TEMPLATE_H
