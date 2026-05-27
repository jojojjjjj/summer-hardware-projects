/**
 * ============================================================================
 * 工具函数模块头文件 | Utility Functions Module Header
 * ============================================================================
 * 提供通用的数学工具、滤波器和辅助函数
 * Provides common math utilities, filters, and helper functions
 *
 * 为什么需要这些工具函数？| Why these utility functions?
 *   - Arduino 的 map() 和 constrain() 只支持整数，我们经常需要浮点版本
 *     Arduino's map() and constrain() only support integers, we need float versions
 *   - 滤波器是信号处理的基础，机器人的传感器数据都需要滤波
 *     Filters are signal processing basics, all sensor data needs filtering
 *   - 电池监测确保机器人不会因欠压而失控
 *     Battery monitoring ensures robot won't lose control due to undervoltage
 * ============================================================================
 */

#ifndef UTILS_H
#define UTILS_H

#include <Arduino.h>

// ============================================================================
// 数学工具函数 | Math Utility Functions
// ============================================================================

/**
 * 数值限幅 | Clamp value to range
 * @param value  输入值 | Input value
 * @param minVal 最小值 | Minimum value
 * @param maxVal 最大值 | Maximum value
 * @return       限制在 [minVal, maxVal] 范围内的值
 *               Value clamped to [minVal, maxVal]
 *
 * 为什么不直接用 constrain()？因为它只支持整数类型
 * Why not use constrain()? Because it only supports integer types
 */
inline float clamp(float value, float minVal, float maxVal) {
    if (value < minVal) return minVal;
    if (value > maxVal) return maxVal;
    return value;
}

/**
 * 浮点数线性映射 | Float linear mapping
 * @param value   输入值 | Input value
 * @param inMin   输入范围最小值 | Input range minimum
 * @param inMax   输入范围最大值 | Input range maximum
 * @param outMin  输出范围最小值 | Output range minimum
 * @param outMax  输出范围最大值 | Output range maximum
 * @return        映射后的值 | Mapped value
 *
 * 类似 Arduino 的 map() 但支持浮点数 | Like Arduino map() but for floats
 * 公式：out = (value - inMin) × (outMax - outMin) / (inMax - inMin) + outMin
 */
float mapFloat(float value, float inMin, float inMax, float outMin, float outMax);

/**
 * 低通滤波器 | Low-pass filter
 * @param newVal  新采样值 | New sample value
 * @param oldVal  上次滤波输出 | Previous filter output
 * @param alpha   滤波系数（0~1），越大越信任新数据（响应快但噪声多）
 *                Filter coefficient (0~1), higher = trust new data more
 * @return        滤波后的值 | Filtered value
 *
 * 原理：output = α × new + (1 - α) × old
 * Principle: output = alpha * new + (1 - alpha) * old
 * α 接近 1 → 快速响应但噪声多 | alpha near 1 → fast but noisy
 * α 接近 0 → 平滑但延迟大 | alpha near 0 → smooth but delayed
 */
float lowPassFilter(float newVal, float oldVal, float alpha);

/**
 * 死区滤波器 | Dead-zone filter
 * @param value     输入值 | Input value
 * @param threshold 死区阈值 | Dead-zone threshold
 * @return          死区外的值，死区内返回 0
 *                  Value outside dead-zone, 0 within dead-zone
 *
 * 用于消除摇杆中心漂移或传感器零点噪声
 * Used to eliminate joystick center drift or sensor zero-point noise
 */
float deadZone(float value, float threshold);

// ============================================================================
// 电池监测函数 | Battery Monitoring Functions
// ============================================================================

/**
 * 初始化电池监测 | Initialize battery monitoring
 * @param adcPin            ADC 引脚 | ADC pin
 * @param dividerRatio      分压比 | Voltage divider ratio
 * @param adcRefVoltage     ADC 参考电压 | ADC reference voltage
 * @param adcResolution     ADC 分辨率 | ADC resolution
 *
 * 配置 ADC 并读取初始电压 | Configure ADC and read initial voltage
 */
void batteryInit(uint8_t adcPin, float dividerRatio,
                 float adcRefVoltage, float adcResolution);

/**
 * 读取电池电压 | Read battery voltage
 * @return 当前电压（伏特）| Current voltage (volts)
 *
 * 通过 ADC 读取分压后的电压，再根据分压比还原实际电压
 * Read divided voltage via ADC, then restore actual voltage using divider ratio
 */
float batteryReadVoltage();

/**
 * 检查电池是否欠压 | Check if battery is undervoltage
 * @return true=电压过低 | true=voltage too low
 *
 * 欠压保护很重要！锂电池过放电会永久损坏
 * Undervoltage protection is important! Over-discharging LiPo batteries
 * causes permanent damage
 */
bool batteryIsLow();

/**
 * 获取电池百分比（估算）| Get battery percentage (estimated)
 * @return 0~100 的百分比值 | Percentage value 0~100
 *
 * 基于电压的粗略估算，不同电池类型放电曲线不同
 * Rough estimate based on voltage, varies by battery chemistry
 */
float batteryGetPercentage();

// ============================================================================
// 调试输出函数 | Debug Output Functions
// ============================================================================

/**
 * 打印完整调试信息 | Print full debug information
 * @param angle       当前角度 | Current angle
 * @param gyroY       Y 轴角速度 | Y-axis angular velocity
 * @param leftSpeed   左轮速度 | Left wheel speed
 * @param rightSpeed  右轮速度 | Right wheel speed
 * @param leftPWM     左轮 PWM | Left wheel PWM
 * @param rightPWM    右轮 PWM | Right wheel PWM
 * @param voltage     电池电压 | Battery voltage
 *
 * 通过串口输出所有关键变量，用于调试和分析
 * Outputs all key variables via serial for debugging and analysis
 */
void printDebugInfo(float angle, float gyroY,
                    float leftSpeed, float rightSpeed,
                    int leftPWM, int rightPWM,
                    float voltage);

/**
 * 打印简单调试信息（更少的输出）| Print minimal debug info (less output)
 * @param angle  角度 | Angle
 * @param pwm    基础 PWM | Base PWM
 */
void printDebugMinimal(float angle, int pwm);

#endif // UTILS_H
