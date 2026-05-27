/**
 * ============================================================================
 * 轮足机器人主程序 | Bipedal Wheeled Robot Main Program
 * ============================================================================
 *
 * 程序结构 | Program structure:
 *   1. setup()  - 初始化所有硬件模块 | Initialize all hardware modules
 *   2. loop()   - 主循环，运行状态机 | Main loop, runs state machine
 *   3. controlLoop() - 10ms 定时控制循环（核心算法在这里）
 *                      10ms timed control loop (core algorithm lives here)
 *
 * 状态机 | State machine:
 *   IDLE          → 空闲，等待启动指令 | Idle, waiting for start command
 *   BALANCING     → 自平衡模式 | Self-balancing mode
 *   REMOTE_CONTROL → 遥控模式 | Remote control mode
 *   FALLING       → 检测到倾倒，紧急停止 | Detected falling, emergency stop
 *
 * 作者/Author: StackForce Summer Hardware Project
 * 日期/Date: 2025
 * ============================================================================
 */

// ============================================================================
// 头文件包含 | Header includes
// ============================================================================
// 如果已创建 config.h 则使用它，否则使用模板默认值
// Use config.h if created, otherwise use template defaults
#if __has_include("config.h")
    #include "config.h"
#else
    #include "config.template.h"
#endif

#include "motor_control.h"
#include "imu.h"
#include "balance.h"
#include "utils.h"

// ============================================================================
// 全局对象 | Global objects
// ============================================================================
MotorControl      motors;       // 电机控制器 | Motor controller
IMU               imu;          // 惯性测量单元 | IMU sensor
BalanceController balance;      // 平衡控制器 | Balance controller

// ============================================================================
// 状态机定义 | State machine definitions
// ============================================================================
enum RobotState {
    STATE_IDLE           = 0,   // 空闲待机 | Idle standby
    STATE_BALANCING      = 1,   // 自平衡中 | Self-balancing
    STATE_REMOTE_CONTROL = 2,   // 遥控模式 | Remote control mode
    STATE_FALLING        = 3    // 倾倒保护 | Falling protection
};

// 当前状态 | Current state
volatile RobotState currentState = STATE_IDLE;

// ============================================================================
// 全局变量 | Global variables
// ============================================================================
// 控制循环计时 | Control loop timing
volatile bool controlLoopFlag = false;   // 控制循环触发标志 | Control loop trigger flag
uint32_t      lastLoopTime    = 0;       // 上次循环时间 | Last loop time
uint32_t      loopCounter     = 0;       // 循环计数器 | Loop counter

// 遥控指令 | Remote control commands
float remoteVelocity  = 0.0f;    // 遥控目标速度 | Remote target velocity
float remoteYawRate   = 0.0f;    // 遥控目标转向 | Remote target yaw rate
uint32_t lastRemoteTime = 0;     // 上次收到遥控指令的时间 | Last remote command time

// 安全相关 | Safety related
float currentBatteryVoltage = 0.0f;  // 当前电池电压 | Current battery voltage

// 速度环更新计数器 | Velocity loop update counter
uint8_t velocityLoopCount = 0;

// ============================================================================
// 前向声明（这些函数在后面定义）| Forward declarations (defined below)
// ============================================================================
void controlLoop();                    // 核心控制循环 | Core control loop
void transitionToState(RobotState newState);  // 状态切换 | State transition
void processSerialCommands();          // 串口命令处理 | Serial command processing

// ============================================================================
// setup() - 初始化函数（上电后执行一次）
//          Initialization function (runs once after power-on)
// ============================================================================
void setup() {
    // 步骤 1：初始化串口用于调试输出 | Step 1: Initialize serial for debug output
    Serial.begin(SERIAL_BAUD_RATE);
    delay(500);  // 等待串口稳定 | Wait for serial to stabilize
    Serial.println("\n========================================");
    Serial.println("  轮足机器人启动 | Bipedal Bot Starting");
    Serial.println("========================================");

    // 步骤 2：初始化 IMU 惯性测量单元 | Step 2: Initialize IMU
    Serial.println("[初始化/Init] IMU 传感器...");
    if (!imu.init(IMU_SDA_PIN, IMU_SCL_PIN, MPU6050_ADDRESS)) {
        Serial.println("[错误/ERROR] IMU 初始化失败！请检查接线");
        Serial.println("[错误/ERROR] IMU init failed! Check wiring");
        // IMU 是平衡的核心传感器，失败则停在此处
        // IMU is core sensor for balancing, halt if failed
        while (1) {
            delay(1000);
            Serial.println("[错误/ERROR] 请重启并检查 IMU 接线 | Check IMU wiring and restart");
        }
    }

    // 步骤 3：校准 IMU（机器人必须水平放置！）| Step 3: Calibrate IMU
    // 注意：校准时机器人必须放在水平桌面上，不能移动！
    // Note: Robot must be on a flat surface and still during calibration!
    Serial.println("[校准/Cal] 请确保机器人水平放置...");
    Serial.println("[校准/Cal] Ensure robot is on a flat surface...");
    delay(2000);  // 给用户 2 秒放好机器人 | Give user 2 seconds to position robot
    imu.calibrate(500);  // 采样 500 次进行校准 | Calibrate with 500 samples

    // 步骤 4：初始化电机 | Step 4: Initialize motors
    Serial.println("[初始化/Init] 电机...");
    MotorPins leftPins  = {MOTOR_LEFT_PWM_PIN,  MOTOR_LEFT_DIR_PIN,
                           MOTOR_LEFT_ENCODER_A, MOTOR_LEFT_ENCODER_B};
    MotorPins rightPins = {MOTOR_RIGHT_PWM_PIN,  MOTOR_RIGHT_DIR_PIN,
                           MOTOR_RIGHT_ENCODER_A, MOTOR_RIGHT_ENCODER_B};
    motors.init(leftPins, rightPins, MOTOR_PWM_FREQ, MOTOR_PWM_RESOLUTION);

    // 步骤 5：初始化平衡控制器 | Step 5: Initialize balance controller
    Serial.println("[初始化/Init] 平衡控制器...");
    balance.init();

    // 步骤 6：初始化电池监测 | Step 6: Initialize battery monitoring
    Serial.println("[初始化/Init] 电池监测...");
    batteryInit(BATTERY_ADC_PIN, VOLTAGE_DIVIDER_RATIO,
                ADC_REFERENCE_VOLTAGE, ADC_RESOLUTION);

    // 步骤 7：初始化蓝牙（可选）| Step 7: Initialize Bluetooth (optional)
    // 如果需要手机遥控，取消下面的注释 | Uncomment below for phone remote control
    /*
    SerialBT.begin(BT_DEVICE_NAME);
    Serial.println("[蓝牙/BT] 已启动 | Started");
    */

    // 步骤 8：首次读取 IMU 以获得初始角度 | Step 8: First IMU read for initial angle
    imu.update(CONTROL_LOOP_PERIOD_MS / 1000.0f);

    // 初始化完成 | Initialization complete
    Serial.println("========================================");
    Serial.println("  初始化完成！| Init complete!");
    Serial.println("  发送 'S' 开始平衡 | Send 'S' to start balancing");
    Serial.println("========================================");

    // 记录启动时间 | Record start time
    lastLoopTime    = millis();
    lastRemoteTime  = millis();
}

// ============================================================================
// loop() - 主循环（持续运行）
//          Main loop (runs continuously)
// ============================================================================
void loop() {
    // 获取当前时间 | Get current time
    uint32_t currentTime = millis();
    uint32_t dt = currentTime - lastLoopTime;

    // 检查是否到达控制周期 | Check if control period has elapsed
    if (dt >= CONTROL_LOOP_PERIOD_MS) {
        lastLoopTime = currentTime;

        // 执行控制循环 | Execute control loop
        controlLoop();

        loopCounter++;
    }

    // 非阻塞式任务（不需要严格定时）| Non-blocking tasks (no strict timing needed)

    // 串口命令处理 | Serial command processing
    processSerialCommands();

    // 蓝牙命令处理（如果已启用）| Bluetooth command processing (if enabled)
    // processBluetoothCommands();

    // 定期电池检查（每 1 秒）| Periodic battery check (every 1 second)
    if (loopCounter % (1000 / CONTROL_LOOP_PERIOD_MS) == 0) {
        currentBatteryVoltage = batteryReadVoltage();
        if (batteryIsLow()) {
            Serial.println("[警告/WARN] 电池电压过低！请充电！");
            Serial.printf("[警告/WARN] Battery low: %.2fV\n", currentBatteryVoltage);
            // 电池欠压时切换到空闲状态 | Switch to idle when battery is low
            if (currentState != STATE_IDLE) {
                transitionToState(STATE_IDLE);
            }
        }
    }
}

// ============================================================================
// controlLoop() - 核心控制循环（10ms 周期）
//                 Core control loop (10ms period)
// ============================================================================
/**
 * 这是整个机器人最关键的函数，每 10ms 执行一次
 * This is the most critical function, executed every 10ms
 *
 * 执行顺序很重要！| Execution order matters!
 *   1. 读取传感器 → 2. 状态机 → 3. PID 计算 → 4. 驱动电机
 *   1. Read sensors → 2. State machine → 3. PID compute → 4. Drive motors
 */
void controlLoop() {
    // 计算时间步长（秒）| Calculate time step (seconds)
    float dtSec = CONTROL_LOOP_PERIOD_MS / 1000.0f;

    // ---------------------------------------------------------------
    // 第 1 步：读取和更新传感器数据 | Step 1: Read and update sensor data
    // ---------------------------------------------------------------
    imu.update(dtSec);  // 更新 IMU 角度和角速度 | Update IMU angle and angular velocity
    motors.updateEncoders(CONTROL_LOOP_PERIOD_MS);  // 更新编码器速度 | Update encoder speed

    // 获取传感器数据 | Get sensor data
    float angle    = imu.getAngle();      // 倾斜角度（度）| Tilt angle (degrees)
    float gyroY    = imu.getGyroY();      // Y 轴角速度（度/秒）| Y-axis angular velocity
    float gyroZ    = imu.getGyroZ();      // Z 轴角速度（转向）| Z-axis angular velocity (yaw)
    float avgSpeed = motors.getAverageSpeed();  // 平均轮速 | Average wheel speed

    // ---------------------------------------------------------------
    // 第 2 步：状态机处理 | Step 2: State machine processing
    // ---------------------------------------------------------------
    switch (currentState) {
        case STATE_IDLE:
            // 空闲状态：电机停止，等待指令 | Idle: motors stopped, waiting for command
            motors.stopAll();
            break;

        case STATE_BALANCING:
        case STATE_REMOTE_CONTROL: {
            // 检查是否倾倒 | Check if fallen over
            if (fabs(angle) > MAX_TILT_ANGLE) {
                // 倾斜角度过大，切换到倾倒保护状态
                // Tilt angle too large, switch to falling protection state
                transitionToState(STATE_FALLING);
                break;
            }

            // 检查遥控超时 | Check remote control timeout
            if (currentState == STATE_REMOTE_CONTROL) {
                if (millis() - lastRemoteTime > REMOTE_TIMEOUT_MS) {
                    // 超时未收到遥控指令，切换到自平衡
                    // No remote command for too long, switch to self-balancing
                    remoteVelocity = 0.0f;
                    remoteYawRate  = 0.0f;
                    transitionToState(STATE_BALANCING);
                }
            }

            // ---------------------------------------------------------------
            // 第 3 步：PID 计算 | Step 3: PID computation
            // ---------------------------------------------------------------

            // 设置目标速度和转向 | Set target velocity and yaw rate
            balance.setTarget(remoteVelocity, remoteYawRate);

            // 速度环每 VELOCITY_LOOP_DIVIDER 次循环更新一次
            // Velocity loop updates every VELOCITY_LOOP_DIVIDER cycles
            // 这样速度环比直立环慢，符合级联控制的设计原则
            // This makes velocity loop slower than upright loop,
            // following cascade control design principles
            velocityLoopCount++;

            // 执行级联 PID 计算 | Execute cascade PID computation
            balance.compute(angle, gyroY, avgSpeed, gyroZ);

            // ---------------------------------------------------------------
            // 第 4 步：驱动电机 | Step 4: Drive motors
            // ---------------------------------------------------------------
            motors.setSpeed(balance.getLeftPWM(), balance.getRightPWM());

            break;
        }

        case STATE_FALLING:
            // 倾倒保护：立即停止电机 | Falling protection: stop motors immediately
            motors.stopAll();
            balance.resetAll();  // 重置 PID 状态 | Reset PID states

            // 如果角度恢复到正常范围，可以重新开始平衡
            // If angle returns to normal range, can restart balancing
            if (fabs(angle) < 10.0f) {
                transitionToState(STATE_BALANCING);
                Serial.println("[状态/State] 角度恢复，重新开始平衡");
                Serial.println("[状态/State] Angle recovered, resuming balance");
            }
            break;
    }

    // ---------------------------------------------------------------
    // 第 5 步：调试输出（可选）| Step 5: Debug output (optional)
    // ---------------------------------------------------------------
#if ENABLE_SERIAL_DEBUG
    if (loopCounter % DEBUG_PRINT_DIVIDER == 0) {
        printDebugInfo(angle, gyroY,
                       motors.getSpeed(MOTOR_LEFT), motors.getSpeed(MOTOR_RIGHT),
                       balance.getLeftPWM(), balance.getRightPWM(),
                       currentBatteryVoltage);
    }
#endif
}

// ============================================================================
// 状态切换函数 | State transition function
// ============================================================================
void transitionToState(RobotState newState) {
    // 打印状态变化 | Print state change
    const char* stateNames[] = {
        "空闲/IDLE",           // STATE_IDLE
        "平衡/BALANCING",      // STATE_BALANCING
        "遥控/REMOTE",         // STATE_REMOTE_CONTROL
        "倾倒/FALLING"         // STATE_FALLING
    };

    Serial.printf("[状态/State] %s → %s\n",
                  stateNames[currentState], stateNames[newState]);

    // 离开当前状态的清理工作 | Cleanup when leaving current state
    switch (currentState) {
        case STATE_BALANCING:
        case STATE_REMOTE_CONTROL:
            motors.stopAll();
            break;
        default:
            break;
    }

    // 进入新状态的初始化工作 | Initialization when entering new state
    switch (newState) {
        case STATE_BALANCING:
            balance.resetAll();
            remoteVelocity = 0.0f;
            remoteYawRate  = 0.0f;
            break;
        case STATE_REMOTE_CONTROL:
            balance.resetAll();
            lastRemoteTime = millis();
            break;
        case STATE_FALLING:
            motors.stopAll();
            balance.resetAll();
            break;
        case STATE_IDLE:
            motors.stopAll();
            break;
    }

    currentState = newState;
}

// ============================================================================
// 串口命令处理 | Serial command processing
// ============================================================================
/**
 * 通过串口发送以下字符来控制机器人 | Send these characters via serial to control:
 *   'S' - 开始平衡 | Start balancing
 *   'X' - 停止（回到空闲）| Stop (return to idle)
 *   'W' - 前进 | Forward
 *   'A' - 左转 | Turn left
 *   'D' - 右转 | Turn right
 *   'F' - 后退 | Backward
 *   'Q' - 停止移动 | Stop moving
 *   'P' - 打印 PID 参数 | Print PID parameters
 *   'C' - 重新校准 IMU | Recalibrate IMU
 */
void processSerialCommands() {
    while (Serial.available()) {
        char cmd = Serial.read();

        switch (cmd) {
            case 'S':  // 开始平衡 | Start balancing
            case 's':
                transitionToState(STATE_BALANCING);
                break;

            case 'X':  // 停止 | Stop
            case 'x':
                transitionToState(STATE_IDLE);
                break;

            case 'W':  // 前进 | Forward
            case 'w':
                remoteVelocity = 500.0f;  // 设置前进目标速度 | Set forward target speed
                transitionToState(STATE_REMOTE_CONTROL);
                lastRemoteTime = millis();
                break;

            case 'F':  // 后退 | Backward
            case 'f':
                remoteVelocity = -500.0f;
                transitionToState(STATE_REMOTE_CONTROL);
                lastRemoteTime = millis();
                break;

            case 'A':  // 左转 | Turn left
            case 'a':
                remoteYawRate = -90.0f;
                transitionToState(STATE_REMOTE_CONTROL);
                lastRemoteTime = millis();
                break;

            case 'D':  // 右转 | Turn right
            case 'd':
                remoteYawRate = 90.0f;
                transitionToState(STATE_REMOTE_CONTROL);
                lastRemoteTime = millis();
                break;

            case 'Q':  // 停止移动 | Stop moving
            case 'q':
                remoteVelocity = 0.0f;
                remoteYawRate  = 0.0f;
                break;

            case 'P':  // 打印 PID 参数 | Print PID parameters
            case 'p':
                Serial.println("=== PID 参数/Parameters ===");
                Serial.printf("直立环/Upright:  Kp=%.1f Ki=%.3f Kd=%.2f\n",
                              balance.getUprightPID().getKp(),
                              balance.getUprightPID().getKi(),
                              balance.getUprightPID().getKd());
                Serial.printf("速度环/Velocity: Kp=%.2f Ki=%.3f Kd=%.2f\n",
                              balance.getVelocityPID().getKp(),
                              balance.getVelocityPID().getKi(),
                              balance.getVelocityPID().getKd());
                Serial.printf("转向环/Yaw:      Kp=%.2f Ki=%.3f Kd=%.3f\n",
                              balance.getYawPID().getKp(),
                              balance.getYawPID().getKi(),
                              balance.getYawPID().getKd());
                break;

            case 'C':  // 重新校准 IMU | Recalibrate IMU
            case 'c':
                transitionToState(STATE_IDLE);
                Serial.println("[校准/Cal] 请保持机器人静止...");
                Serial.println("[校准/Cal] Keep robot still...");
                delay(2000);
                imu.calibrate(500);
                Serial.println("[校准/Cal] 完成 | Done");
                break;

            default:
                // 忽略未知命令 | Ignore unknown commands
                break;
        }
    }
}
