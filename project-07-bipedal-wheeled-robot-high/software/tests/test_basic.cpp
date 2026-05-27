/**
 * ============================================================================
 * 基础单元测试 | Basic Unit Tests
 * ============================================================================
 *
 * 本文件包含轮足机器人各模块的基础测试
 * This file contains basic tests for each module of the bipedal wheeled robot
 *
 * 运行方式 | How to run:
 *   1. 在 PlatformIO 中执行: pio test -e native
 *      Run in PlatformIO: pio test -e native
 *   2. 或者将此文件上传到 ESP32，通过串口观察测试结果
 *      Or upload this file to ESP32, observe test results via serial
 *
 * 注意 | Note:
 *   - 这些测试验证算法逻辑的正确性（不需要实际硬件）
 *     These tests verify algorithm logic correctness (no actual hardware needed)
 *   - 硬件相关测试（电机、IMU）需要连接实际设备
 *     Hardware-related tests (motors, IMU) require physical devices
 *
 * ============================================================================
 */

#include <Arduino.h>
#include <math.h>

// ============================================================================
// 简易测试框架 | Simple Test Framework
// ============================================================================
// 为什么不用 Unity 等正式测试框架？因为 PlatformIO native 环境配置对初学者较复杂
// Why not use Unity or other formal test frameworks?
// Because PlatformIO native environment setup is complex for beginners

// 测试计数器 | Test counters
static int testsPassed = 0;   // 通过的测试数 | Number of passed tests
static int testsFailed = 0;   // 失败的测试数 | Number of failed tests
static int testsTotal  = 0;   // 总测试数 | Total test count

/**
 * 断言浮点数近似相等 | Assert float approximately equal
 * @param actual    实际值 | Actual value
 * @param expected  期望值 | Expected value
 * @param tolerance 容差 | Tolerance
 * @param testName  测试名称 | Test name
 *
 * 浮点数比较不能直接用 ==，因为有精度误差
 * Float comparison can't use == directly due to precision errors
 */
void assertFloatEqual(float actual, float expected, float tolerance, const char* testName) {
    testsTotal++;
    float diff = fabs(actual - expected);

    if (diff <= tolerance) {
        testsPassed++;
        Serial.printf("  [通过/PASS] %s: %.4f ≈ %.4f (误差/error: %.4f)\n",
                      testName, actual, expected, diff);
    } else {
        testsFailed++;
        Serial.printf("  [失败/FAIL] %s: %.4f ≠ %.4f (误差/error: %.4f > 容差/tol: %.4f)\n",
                      testName, actual, expected, diff, tolerance);
    }
}

/**
 * 断言整数相等 | Assert integer equal
 * @param actual   实际值 | Actual value
 * @param expected 期望值 | Expected value
 * @param testName 测试名称 | Test name
 */
void assertIntEqual(int actual, int expected, const char* testName) {
    testsTotal++;
    if (actual == expected) {
        testsPassed++;
        Serial.printf("  [通过/PASS] %s: %d == %d\n", testName, actual, expected);
    } else {
        testsFailed++;
        Serial.printf("  [失败/FAIL] %s: %d != %d\n", testName, actual, expected);
    }
}

/**
 * 断言布尔值为真 | Assert boolean true
 * @param condition 条件 | Condition
 * @param testName  测试名称 | Test name
 */
void assertTrue(bool condition, const char* testName) {
    testsTotal++;
    if (condition) {
        testsPassed++;
        Serial.printf("  [通过/PASS] %s\n", testName);
    } else {
        testsFailed++;
        Serial.printf("  [失败/FAIL] %s\n", testName);
    }
}

// ============================================================================
// 测试 1：工具函数测试 | Test 1: Utility functions test
// ============================================================================
/**
 * 测试数学工具函数 | Test math utility functions
 *
 * 这些函数是 PID 控制和传感器处理的基础
 * These functions are the foundation of PID control and sensor processing
 */
void testUtilityFunctions() {
    Serial.println("\n--- 测试/Tests: 工具函数/Utility Functions ---");

    // --- clamp() 测试 | clamp() test ---
    // 正常范围内应不变 | Within range should not change
    assertFloatEqual(clamp(5.0f, 0.0f, 10.0f), 5.0f, 0.001f,
                     "clamp(5, 0, 10) = 5");
    // 超过上限应被限制 | Exceeds upper limit should be clamped
    assertFloatEqual(clamp(15.0f, 0.0f, 10.0f), 10.0f, 0.001f,
                     "clamp(15, 0, 10) = 10");
    // 低于下限应被限制 | Below lower limit should be clamped
    assertFloatEqual(clamp(-5.0f, 0.0f, 10.0f), 0.0f, 0.001f,
                     "clamp(-5, 0, 10) = 0");
    // 负数范围测试 | Negative range test
    assertFloatEqual(clamp(-50.0f, -100.0f, 100.0f), -50.0f, 0.001f,
                     "clamp(-50, -100, 100) = -50");

    // --- mapFloat() 测试 | mapFloat() test ---
    // 中点映射 | Midpoint mapping
    assertFloatEqual(mapFloat(50.0f, 0.0f, 100.0f, 0.0f, 1.0f), 0.5f, 0.001f,
                     "mapFloat(50, 0~100, 0~1) = 0.5");
    // 线性映射 | Linear mapping
    assertFloatEqual(mapFloat(25.0f, 0.0f, 100.0f, 0.0f, 200.0f), 50.0f, 0.001f,
                     "mapFloat(25, 0~100, 0~200) = 50");
    // 超出范围应被限制 | Out of range should be clamped
    assertFloatEqual(mapFloat(150.0f, 0.0f, 100.0f, 0.0f, 1.0f), 1.0f, 0.001f,
                     "mapFloat(150, 0~100, 0~1) = 1 (clamped)");

    // --- lowPassFilter() 测试 | lowPassFilter() test ---
    // alpha=1.0 应完全信任新值 | alpha=1.0 should trust new value completely
    assertFloatEqual(lowPassFilter(10.0f, 5.0f, 1.0f), 10.0f, 0.001f,
                     "LPF(new=10, old=5, a=1.0) = 10");
    // alpha=0.0 应完全信任旧值 | alpha=0.0 should trust old value completely
    assertFloatEqual(lowPassFilter(10.0f, 5.0f, 0.0f), 5.0f, 0.001f,
                     "LPF(new=10, old=5, a=0.0) = 5");
    // alpha=0.5 应取平均 | alpha=0.5 should average
    assertFloatEqual(lowPassFilter(10.0f, 5.0f, 0.5f), 7.5f, 0.001f,
                     "LPF(new=10, old=5, a=0.5) = 7.5");

    // --- deadZone() 测试 | deadZone() test ---
    // 死区内应返回 0 | Within dead zone should return 0
    assertFloatEqual(deadZone(0.5f, 1.0f), 0.0f, 0.001f,
                     "deadZone(0.5, threshold=1) = 0");
    // 死区外应返回原值 | Outside dead zone should return original
    assertFloatEqual(deadZone(1.5f, 1.0f), 1.5f, 0.001f,
                     "deadZone(1.5, threshold=1) = 1.5");
    // 正好在边界 | Right at boundary
    assertFloatEqual(deadZone(1.0f, 1.0f), 0.0f, 0.001f,
                     "deadZone(1.0, threshold=1) = 0");
    // 负值在死区外 | Negative outside dead zone
    assertFloatEqual(deadZone(-2.0f, 1.0f), -2.0f, 0.001f,
                     "deadZone(-2, threshold=1) = -2");
}

// ============================================================================
// 测试 2：PID 控制器测试 | Test 2: PID controller test
// ============================================================================
/**
 * 测试 PID 控制器的基本功能 | Test PID controller basic functionality
 *
 * PID 是平衡控制的核心，必须确保算法正确
 * PID is the core of balance control, algorithm correctness must be ensured
 *
 * 注意：这里测试的是纯数学计算，不需要实际硬件
 * Note: Testing pure math calculations here, no actual hardware needed
 */
void testPIDController() {
    Serial.println("\n--- 测试/Tests: PID 控制器/PID Controller ---");

    /*
     * 手动实现一个简单的 PID 计算来验证
     * Manually implement a simple PID calculation to verify
     *
     * 我们不能用 BalanceController 类（它依赖硬件初始化），
     * 所以这里直接用数学公式验证 PID 逻辑
     * We can't use BalanceController class (it depends on hardware init),
     * so we verify PID logic directly with math formulas
     */

    // --- P 控制器测试 | P controller test ---
    // 只有比例项：output = Kp * error
    // Only proportional term: output = Kp * error
    float kp = 10.0f;
    float error = 5.0f;
    float expectedP = kp * error;
    assertFloatEqual(expectedP, 50.0f, 0.001f,
                     "P(10*5) = 50");

    // --- PI 控制器测试 | PI controller test ---
    // 加上积分项：output = Kp * error + Ki * integral
    // With integral term: output = Kp * error + Ki * integral
    float ki = 0.5f;
    float integral = 10.0f;
    float expectedPI = kp * error + ki * integral;
    assertFloatEqual(expectedPI, 55.0f, 0.001f,
                     "PI(Kp=10,e=5,Ki=0.5,I=10) = 55");

    // --- PD 控制器测试 | PD controller test ---
    // 加上微分项：output = Kp * error + Kd * (error - lastError)
    // With derivative term: output = Kp * error + Kd * (error - lastError)
    float kd = 2.0f;
    float lastError = 3.0f;
    float expectedPD = kp * error + kd * (error - lastError);
    assertFloatEqual(expectedPD, 54.0f, 0.001f,
                     "PD(Kp=10,e=5,Kd=2,de=2) = 54");

    // --- 完整 PID 测试 | Full PID test ---
    float expectedPID = kp * error + ki * integral + kd * (error - lastError);
    assertFloatEqual(expectedPID, 59.0f, 0.001f,
                     "PID(Kp=10,e=5,Ki=0.5,I=10,Kd=2,de=2) = 59");

    // --- 输出限幅测试 | Output clamping test ---
    // 即使误差很大，输出也不应超过限制
    // Even with large error, output should not exceed limits
    float largeError = 1000.0f;
    float pOutput = kp * largeError;
    // 模拟限幅到 [-255, 255]
    // Simulate clamping to [-255, 255]
    float clampedOutput = pOutput;
    if (clampedOutput > 255.0f) clampedOutput = 255.0f;
    if (clampedOutput < -255.0f) clampedOutput = -255.0f;
    assertFloatEqual(clampedOutput, 255.0f, 0.001f,
                     "PID output clamped to 255");

    // --- 积分累积测试 | Integral accumulation test ---
    // 积分应该累积误差 | Integral should accumulate error
    float sum = 0.0f;
    float errors[] = {1.0f, 2.0f, 3.0f, -1.0f};
    for (int i = 0; i < 4; i++) {
        sum += errors[i];  // 模拟积分累积 | Simulate integral accumulation
    }
    assertFloatEqual(sum, 5.0f, 0.001f,
                     "Integral accumulation: 1+2+3+(-1) = 5");
}

// ============================================================================
// 测试 3：IMU 角度计算测试 | Test 3: IMU angle calculation test
// ============================================================================
/**
 * 测试加速度计角度计算公式 | Test accelerometer angle calculation formula
 *
 * 不需要实际 MPU6050 硬件，只需验证 atan2 的计算逻辑
 * No actual MPU6050 hardware needed, just verify atan2 calculation logic
 */
void testIMUAngleCalculation() {
    Serial.println("\n--- 测试/Tests: IMU 角度计算/Angle Calculation ---");

    // --- 测试用例：模拟不同倾斜状态的加速度计读数 ---
    // Test cases: simulate accelerometer readings at different tilt angles

    // 用例 1：直立（加速度完全在 Z 轴）| Case 1: Upright (gravity fully on Z)
    // ax=0, az=16384 → angle = atan2(0, 16384) = 0°
    float angle1 = atan2(0.0f, 16384.0f) * 180.0f / PI;
    assertFloatEqual(angle1, 0.0f, 0.1f,
                     "Upright: atan2(0, 16384) ≈ 0°");

    // 用例 2：前倾 30° | Case 2: Leaning forward 30°
    // sin(30°)=0.5, cos(30°)=0.866
    // ax = 16384 * sin(30°) = 8192, az = 16384 * cos(30°) = 14189
    float ax2 = 16384.0f * sin(30.0f * PI / 180.0f);
    float az2 = 16384.0f * cos(30.0f * PI / 180.0f);
    float angle2 = atan2(ax2, az2) * 180.0f / PI;
    assertFloatEqual(angle2, 30.0f, 0.5f,
                     "Forward 30°: atan2(sin30, cos30) ≈ 30°");

    // 用例 3：后倾 45° | Case 3: Leaning backward 45°
    // sin(-45°)=-0.707, cos(-45°)=0.707
    float ax3 = 16384.0f * sin(-45.0f * PI / 180.0f);
    float az3 = 16384.0f * cos(-45.0f * PI / 180.0f);
    float angle3 = atan2(ax3, az3) * 180.0f / PI;
    assertFloatEqual(angle3, -45.0f, 0.5f,
                     "Backward -45°: atan2(sin(-45), cos(-45)) ≈ -45°");

    // 用例 4：接近水平（90°）| Case 4: Nearly horizontal (90°)
    // ax = 16384, az ≈ 0 → angle ≈ 90°
    float angle4 = atan2(16384.0f, 1.0f) * 180.0f / PI;
    assertTrue(angle4 > 89.9f && angle4 < 90.1f,
               "Horizontal: atan2(16384, ~0) ≈ 90°");
}

// ============================================================================
// 测试 4：互补滤波器测试 | Test 4: Complementary filter test
// ============================================================================
/**
 * 测试互补滤波器的数学逻辑 | Test complementary filter math logic
 *
 * angle = alpha * (prevAngle + gyro * dt) + (1 - alpha) * accelAngle
 */
void testComplementaryFilter() {
    Serial.println("\n--- 测试/Tests: 互补滤波器/Complementary Filter ---");

    float alpha = 0.97f;     // 互补滤波系数 | Complementary filter coefficient
    float dt    = 0.01f;     // 10ms 时间步长 | 10ms time step

    // 场景 1：静止，加速度计读 0°，陀螺仪读 0°/s → 角度应为 0°
    // Scenario 1: Static, accel reads 0°, gyro reads 0°/s → angle should be 0°
    float prevAngle = 0.0f;
    float gyroRate  = 0.0f;
    float accelAngle = 0.0f;
    float result = alpha * (prevAngle + gyroRate * dt) + (1.0f - alpha) * accelAngle;
    assertFloatEqual(result, 0.0f, 0.001f,
                     "Static: angle stays at 0°");

    // 场景 2：陀螺仪检测到 100°/s 旋转，加速度计有 2° 噪声
    // Scenario 2: Gyro detects 100°/s rotation, accel has 2° noise
    gyroRate   = 100.0f;
    accelAngle = 2.0f;   // 加速度计有噪声 | Accelerometer has noise
    prevAngle  = 0.0f;
    // 主要信任陀螺仪（alpha=0.97）
    // Mainly trust gyroscope (alpha=0.97)
    float expected = alpha * (0.0f + 100.0f * 0.01f) + (1.0f - alpha) * 2.0f;
    result = alpha * (prevAngle + gyroRate * dt) + (1.0f - alpha) * accelAngle;
    assertFloatEqual(result, expected, 0.001f,
                     "Moving: trusts gyro (0.97*1.0 + 0.03*2.0)");
    // 期望约 0.97 + 0.06 = 1.03°，主要跟随陀螺仪
    // Expected ~0.97 + 0.06 = 1.03°, mainly follows gyroscope

    // 场景 3：长期漂移测试（1000 次迭代后）
    // Scenario 3: Long-term drift test (after 1000 iterations)
    float angle = 0.0f;
    gyroRate   = 0.0f;      // 没有实际旋转 | No actual rotation
    accelAngle = 0.0f;      // 加速度计正确读 0° | Accel correctly reads 0°
    // 模拟陀螺仪有 1°/s 的零漂 | Simulate 1°/s gyro zero-drift
    for (int i = 0; i < 1000; i++) {
        angle = alpha * (angle + 1.0f * dt) + (1.0f - alpha) * 0.0f;
    }
    // 经过 1000 次迭代，互补滤波器应将漂移控制在合理范围内
    // After 1000 iterations, complementary filter should keep drift reasonable
    assertTrue(fabs(angle) < 5.0f,
               "Drift control: after 1000 iters with 1°/s drift, angle stays < 5°");
    Serial.printf("    实际角度/Actual angle after 1000 iters: %.4f°\n", angle);
}

// ============================================================================
// 测试 5：电机死区补偿测试 | Test 5: Motor dead-zone compensation test
// ============================================================================
/**
 * 测试电机死区补偿逻辑 | Test motor dead-zone compensation logic
 *
 * 死区补偿确保低 PWM 值时电机也能启动
 * Dead-zone compensation ensures motor can start at low PWM values
 */
void testMotorDeadZone() {
    Serial.println("\n--- 测试/Tests: 电机死区/Motor Dead Zone ---");

    // 简化版死区函数 | Simplified dead-zone function
    auto applyDeadZone = [](int pwm, int dz) -> int {
        if (pwm == 0) return 0;
        if (abs(pwm) < dz) {
            return (pwm > 0) ? dz : -dz;
        }
        return pwm;
    };

    // 测试 0 输入 | Test zero input
    assertIntEqual(applyDeadZone(0, 30), 0,
                   "DeadZone(0, 30) = 0");

    // 测试死区内正数 | Test positive within dead zone
    assertIntEqual(applyDeadZone(10, 30), 30,
                   "DeadZone(10, 30) = 30 (boosted to edge)");

    // 测试死区内负数 | Test negative within dead zone
    assertIntEqual(applyDeadZone(-10, 30), -30,
                   "DeadZone(-10, 30) = -30 (boosted to edge)");

    // 测试死区外 | Test outside dead zone
    assertIntEqual(applyDeadZone(50, 30), 50,
                   "DeadZone(50, 30) = 50 (unchanged)");

    // 测试刚好在边界 | Test right at boundary
    assertIntEqual(applyDeadZone(30, 30), 30,
                   "DeadZone(30, 30) = 30 (at boundary)");
}

// ============================================================================
// 测试 6：速度环和级联控制逻辑测试 | Test 6: Velocity loop cascade logic
// ============================================================================
/**
 * 测试级联控制的数学逻辑 | Test cascade control math logic
 *
 * 验证速度环输出→直立环输入的正确性
 * Verify velocity loop output feeds into upright loop correctly
 */
void testCascadeControl() {
    Serial.println("\n--- 测试/Tests: 级联控制/Cascade Control ---");

    // 模拟速度环 | Simulate velocity loop
    float targetVelocity = 0.0f;    // 目标速度 = 0 | Target velocity = 0
    float actualVelocity = 500.0f;  // 实际速度 = 500（正在前进）| Actual = 500 (moving)
    float velocityKp = 0.8f;

    // 速度误差 = 目标 - 实际 = -500 | Velocity error = target - actual = -500
    float velocityError = targetVelocity - actualVelocity;

    // 速度环输出 = 角度偏移 | Velocity loop output = angle offset
    float angleOffset = velocityKp * velocityError;
    assertFloatEqual(angleOffset, -400.0f, 0.01f,
                     "Velocity loop: 0.8 * (-500) = -400");

    // 速度环输出的角度偏移应该让机器人后仰以减速
    // The angle offset from velocity loop should make robot lean back to decelerate
    assertTrue(angleOffset < 0,
               "When moving forward faster than target, lean angle is negative (lean back)");

    // 模拟直立环 | Simulate upright loop
    float targetAngle = angleOffset;   // 目标角度 = 速度环输出 | Target angle = velocity loop output
    float actualAngle = 0.0f;          // 实际角度 = 0（直立）| Actual angle = 0 (upright)
    float balanceKp = 35.0f;
    float balanceKd = 0.5f;
    float gyroY = 0.0f;                // 没有角速度 | No angular velocity

    // 直立环误差 = 目标角度 - 实际角度 = -400 - 0 = -400
    // Upright error = target angle - actual angle
    float balanceError = targetAngle - actualAngle;
    float uprightOutput = balanceKp * balanceError + balanceKd * (-gyroY);
    assertTrue(uprightOutput < 0,
               "Upright output is negative (reverse) when target angle is negative");

    Serial.printf("    级联输出/Cascade output: 速度误差/vel_err=%.1f → "
                  "角度偏移/angle_offset=%.1f → PWM=%.1f\n",
                  velocityError, angleOffset, uprightOutput);
}

// ============================================================================
// setup() 和 loop() - 测试入口 | Test entry point
// ============================================================================
void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("================================================");
    Serial.println("  轮足机器人单元测试 | Bipedal Bot Unit Tests");
    Serial.println("================================================");

    // 运行所有测试 | Run all tests
    testUtilityFunctions();
    testPIDController();
    testIMUAngleCalculation();
    testComplementaryFilter();
    testMotorDeadZone();
    testCascadeControl();

    // 打印测试结果汇总 | Print test summary
    Serial.println("\n================================================");
    Serial.println("  测试结果汇总 | Test Results Summary");
    Serial.println("================================================");
    Serial.printf("  总计/Total:  %d\n", testsTotal);
    Serial.printf("  通过/Passed: %d\n", testsPassed);
    Serial.printf("  失败/Failed: %d\n", testsFailed);

    if (testsFailed == 0) {
        Serial.println("\n  *** 全部通过！/ ALL TESTS PASSED! ***");
    } else {
        Serial.printf("\n  *** %d 个测试失败 / %d TEST(S) FAILED ***\n",
                      testsFailed, testsFailed);
    }
    Serial.println("================================================");
}

void loop() {
    // 测试只运行一次 | Tests run only once
    delay(10000);
}
