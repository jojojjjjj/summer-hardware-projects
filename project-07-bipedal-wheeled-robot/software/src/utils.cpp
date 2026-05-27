/**
 * ============================================================================
 * 工具函数模块实现 | Utility Functions Module Implementation
 * ============================================================================
 */

#include "utils.h"

// 配置头文件（包含电池监测参数）| Config header (battery monitoring params)
#if __has_include("config.h")
    #include "config.h"
#else
    #include "config.template.h"
#endif

// ============================================================================
// 电池监测模块的全局变量 | Battery monitoring global variables
// ============================================================================
namespace {
    // 电池 ADC 配置 | Battery ADC configuration
    uint8_t batAdcPin        = 35;         // 默认 ADC 引脚 | Default ADC pin
    float   batDividerRatio  = 0.5f;       // 默认分压比 | Default divider ratio
    float   batAdcRefVoltage = 3.3f;       // 默认参考电压 | Default reference voltage
    float   batAdcResolution = 4096.0f;    // 默认分辨率 | Default resolution
    float   batVoltage       = 0.0f;       // 缓存的电压值 | Cached voltage value

    // 调试输出计数器 | Debug output counter
    uint32_t debugCounter = 0;
}

// ============================================================================
// 浮点数线性映射 | Float linear mapping
// ============================================================================
float mapFloat(float value, float inMin, float inMax, float outMin, float outMax) {
    // 防止除以零 | Prevent division by zero
    if (inMax == inMin) return outMin;

    // 线性插值公式 | Linear interpolation formula
    // 先归一化到 [0, 1]，再映射到输出范围
    // Normalize to [0, 1] first, then map to output range
    float ratio = (value - inMin) / (inMax - inMin);

    // 限制比例在 [0, 1] 范围内 | Clamp ratio to [0, 1]
    ratio = clamp(ratio, 0.0f, 1.0f);

    return outMin + ratio * (outMax - outMin);
}

// ============================================================================
// 低通滤波器 | Low-pass filter
// ============================================================================
float lowPassFilter(float newVal, float oldVal, float alpha) {
    /*
     * 低通滤波器的工作原理 | How low-pass filter works:
     *
     * 想象你在看一个跳动的指针（传感器噪声），
     * 你用手指按住指针让它变平稳（滤波效果）
     * Imagine watching a bouncing needle (sensor noise),
     * you press on it with your finger to steady it (filtering effect)
     *
     * output = α × 新值 + (1 - α) × 旧值
     *
     * α = 1.0 → 完全信任新值（无滤波）| Trust new value completely (no filtering)
     * α = 0.0 → 完全信任旧值（不更新）| Trust old value completely (never updates)
     *
     * cutoff frequency ≈ α × sampleRate / (2π)
     * 截止频率 ≈ α × 采样率 / (2π)
     */
    alpha = clamp(alpha, 0.0f, 1.0f);  // 确保 alpha 在有效范围内
    return alpha * newVal + (1.0f - alpha) * oldVal;
}

// ============================================================================
// 死区滤波器 | Dead-zone filter
// ============================================================================
float deadZone(float value, float threshold) {
    /*
     * 死区滤波器的作用 | Purpose of dead-zone filter:
     *
     * 许多传感器在零点附近有噪声（如摇杆不完全回到中心、
     * 陀螺仪静止时仍有小幅波动）。死区滤波器将零点附近的值强制归零。
     * Many sensors have noise near zero (joystick doesn't fully center,
     * gyroscope still fluctuates at rest). Dead-zone forces near-zero values to zero.
     *
     *   输入/Output
     *    ↑    /          |
     *    |   /           |
     *    |--|----阈值/threshold
     *    |  |            |
     * ---+--+------------→ 输入/Input
     *    0  阈值
     */
    if (fabs(value) < threshold) {
        return 0.0f;
    }
    return value;
}

// ============================================================================
// 电池监测初始化 | Battery monitoring init
// ============================================================================
void batteryInit(uint8_t adcPin, float dividerRatio,
                 float adcRefVoltage, float adcResolution) {
    batAdcPin        = adcPin;
    batDividerRatio  = dividerRatio;
    batAdcRefVoltage = adcRefVoltage;
    batAdcResolution = adcResolution;

    // 配置 ADC 引脚为输入 | Configure ADC pin as input
    pinMode(batAdcPin, INPUT);

    // ESP32 ADC 衰减设置 | ESP32 ADC attenuation setting
    // ADC_ATTEN_DB_11 = 0dB衰减，可测量 0~3.3V（实际约 0~3.6V）
    // ADC_ATTEN_DB_11 = 0dB attenuation, measures 0~3.3V (actually ~0~3.6V)
    analogSetPinAttenuation(batAdcPin, ADC_11db);

    // 首次读取 | Initial reading
    batVoltage = batteryReadVoltage();

    Serial.println("[电池/Battery] 监测初始化完成 | Monitor initialized");
    Serial.printf("  当前电压/Voltage: %.2fV\n", batVoltage);
}

// ============================================================================
// 读取电池电压 | Read battery voltage
// ============================================================================
float batteryReadVoltage() {
    /*
     * 电压计算原理 | Voltage calculation principle:
     *
     * 电池 ──[R1]──┬──[R2]── GND
     *               │
     *              ADC 引脚
     *
     * ADC 读数 = Vbat × R2/(R1+R2) × (ADC_RESOLUTION / Vref)
     * Vbat = ADC读数 × Vref / ADC_RESOLUTION / dividerRatio
     *
     * 为了减少噪声，多次采样取平均 | Average multiple samples to reduce noise
     */

    // 32 次过采样取平均（降低噪声）| 32x oversampling (reduce noise)
    uint32_t adcSum = 0;
    const uint8_t samples = 32;
    for (uint8_t i = 0; i < samples; i++) {
        adcSum += analogRead(batAdcPin);
    }
    float adcValue = (float)adcSum / (float)samples;

    // 将 ADC 值转换为实际电压 | Convert ADC value to actual voltage
    // Vadc = ADC × Vref / Resolution | Vadc = ADC × Vref / Resolution
    float adcVoltage = adcValue * batAdcRefVoltage / batAdcResolution;

    // 根据分压比还原电池电压 | Restore battery voltage using divider ratio
    // Vbat = Vadc / dividerRatio | Vbat = Vadc / dividerRatio
    batVoltage = adcVoltage / batDividerRatio;

    return batVoltage;
}

// ============================================================================
// 检查电池是否欠压 | Check battery undervoltage
// ============================================================================
bool batteryIsLow() {
    return batVoltage < LOW_BATTERY_VOLTAGE && batVoltage > 0.5f;
    // batVoltage > 0.5f 防止 ADC 未初始化时误报
    // batVoltage > 0.5f prevents false alarm when ADC not initialized
}

// ============================================================================
// 获取电池百分比（粗略估算）| Get battery percentage (rough estimate)
// ============================================================================
float batteryGetPercentage() {
    /*
     * 均衡假设：使用 2S 锂电池（7.4V 标称，满电 8.4V，截止 6.0V）
     * Balanced assumption: 2S LiPo (7.4V nominal, 8.4V full, 6.0V cutoff)
     *
     * 线性映射：8.4V=100%, 6.0V=0%
     * Linear mapping: 8.4V=100%, 6.0V=0%
     *
     * 注意：实际锂电池放电曲线是非线性的，这只是粗略估计
     * Note: actual LiPo discharge curve is nonlinear, this is a rough estimate
     */
    float percentage = mapFloat(batVoltage, LOW_BATTERY_VOLTAGE, 8.4f, 0.0f, 100.0f);
    return clamp(percentage, 0.0f, 100.0f);
}

// ============================================================================
// 打印完整调试信息 | Print full debug info
// ============================================================================
void printDebugInfo(float angle, float gyroY,
                    float leftSpeed, float rightSpeed,
                    int leftPWM, int rightPWM,
                    float voltage) {
    debugCounter++;

    // 格式化输出，方便串口绘图器或数据分析
    // Formatted output for serial plotter or data analysis
    Serial.printf("[调试/DBG #%lu] 角度/Angle:%.2f° 陀螺/Gyro:%.1f°/s "
                  "速度/Spd:L%.0f R%.0f "
                  "PWM:L%d R%d "
                  "电池/Bat:%.2fV(%.0f%%)\n",
                  debugCounter,
                  angle, gyroY,
                  leftSpeed, rightSpeed,
                  leftPWM, rightPWM,
                  voltage, batteryGetPercentage());
}

// ============================================================================
// 打印简单调试信息 | Print minimal debug info
// ============================================================================
void printDebugMinimal(float angle, int pwm) {
    Serial.printf("角度/A:%.1f PWM:%d\n", angle, pwm);
}
