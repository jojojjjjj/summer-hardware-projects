/**
 * ============================================================================
 * IMU 惯性测量单元模块头文件 | IMU Inertial Measurement Unit Module Header
 * ============================================================================
 * 基于 MPU6050 六轴传感器，提供机器人姿态角度估计
 * Based on MPU6050 6-axis sensor, provides robot attitude angle estimation
 *
 * 核心算法：互补滤波器 | Core algorithm: Complementary filter
 *   融合加速度计（低频准确）和陀螺仪（高频准确）的数据
 *   Fuses accelerometer (accurate at low freq) and gyroscope (accurate at high freq)
 *
 * 数据流 | Data flow:
 *   MPU6050 → 原始数据 → 校准 → 互补滤波 → 倾斜角度
 *   MPU6050 → raw data → calibration → complementary filter → tilt angle
 * ============================================================================
 */

#ifndef IMU_H
#define IMU_H

#include <Arduino.h>
#include <Wire.h>

// ============================================================================
// IMU 原始数据结构体 | IMU Raw Data Struct
// ============================================================================
struct IMURawData {
    int16_t ax;    // X 轴加速度 | X-axis acceleration (raw ADC value)
    int16_t ay;    // Y 轴加速度 | Y-axis acceleration
    int16_t az;    // Z 轴加速度 | Z-axis acceleration
    int16_t gx;    // X 轴角速度 | X-axis angular velocity (raw ADC value)
    int16_t gy;    // Y 轴角速度 | Y-axis angular velocity
    int16_t gz;    // Z 轴角速度 | Z-axis angular velocity
};

// ============================================================================
// IMU 校准数据结构体 | IMU Calibration Data Struct
// ============================================================================
struct IMUCalibration {
    int16_t axOffset;   // X 轴加速度零偏 | X-axis accel zero offset
    int16_t ayOffset;   // Y 轴加速度零偏 | Y-axis accel zero offset
    int16_t azOffset;   // Z 轴加速度零偏 | Z-axis accel zero offset
    int16_t gxOffset;   // X 轴陀螺仪零偏 | X-axis gyro zero offset
    int16_t gyOffset;   // Y 轴陀螺仪零偏 | Y-axis gyro zero offset
    int16_t gzOffset;   // Z 轴陀螺仪零偏 | Z-axis gyro zero offset
};

// ============================================================================
// IMU 类 | IMU Class
// ============================================================================
class IMU {
public:
    /**
     * 初始化 MPU6050 | Initialize MPU6050
     * @param sdaPin  I2C 数据线引脚 | I2C data pin
     * @param sclPin  I2C 时钟线引脚 | I2C clock pin
     * @param addr    MPU6050 I2C 地址 | I2C address (usually 0x68)
     * @return true=成功 | true=success
     *
     * 配置量程和滤波器 | Configures range and filter settings
     */
    bool init(uint8_t sdaPin, uint8_t sclPin, uint8_t addr = 0x68);

    /**
     * 读取原始传感器数据 | Read raw sensor data
     * @param data  输出：原始数据 | Output: raw data
     * @return true=读取成功 | true=read success
     *
     * 从 MPU6050 的 14 字节数据寄存器一次性读取全部数据
     * Reads all 14 bytes from MPU6050 data registers in one burst
     */
    bool readRaw(IMURawData& data);

    /**
     * 获取滤波后的倾斜角度 | Get filtered tilt angle
     * @return 机器人前后倾斜角度（度），正值=前倾
     *         Robot tilt angle (degrees), positive=forward lean
     *
     * 使用互补滤波器融合加速度计和陀螺仪数据
     * Uses complementary filter to fuse accelerometer and gyroscope data
     *
     * 必须定期调用以保持角度更新（建议 10ms 一次）
     * Must be called periodically to keep angle updated (every 10ms recommended)
     */
    float getAngle();

    /**
     * 获取 Y 轴角速度（前后倾旋转速率）
     * Get Y-axis angular velocity (front-back tilt rate)
     * @return 角速度（度/秒）| Angular velocity (degrees/sec)
     *
     * 用于直立环的微分项（D 项）
     * Used for the derivative term (D term) of the upright PID
     */
    float getGyroY() const;

    /**
     * 获取 Z 轴角速度（偏航旋转速率）
     * Get Z-axis angular velocity (yaw rotation rate)
     * @return 角速度（度/秒）| Angular velocity (degrees/sec)
     *
     * 用于转向控制 | Used for steering control
     */
    float getGyroZ() const;

    /**
     * 校准传感器（零偏校准）| Calibrate sensor (zero-offset calibration)
     * @param samples  采样次数，越多越准确 | Sample count, more = more accurate
     *
     * 请将机器人放在水平面上进行校准！
     * Place robot on a flat surface before calibrating!
     *
     * 校准过程约需 samples * 2 毫秒
     * Calibration takes approximately samples * 2 ms
     */
    void calibrate(uint16_t samples = 500);

    /**
     * 更新滤波器（在控制循环中调用）| Update filter (call in control loop)
     * @param dtSec  时间步长（秒）| Time step (seconds)
     *
     * 此函数读取传感器数据并更新内部角度估计
     * This reads sensor data and updates internal angle estimate
     */
    void update(float dtSec);

    /**
     * 检查 IMU 是否已初始化 | Check if IMU is initialized
     */
    bool isInitialized() const { return initialized; }

    /**
     * 获取上次更新时的原始数据 | Get raw data from last update
     */
    const IMURawData& getLatestRaw() const { return rawData; }

private:
    // MPU6050 I2C 地址 | I2C address
    uint8_t address;

    // 是否已初始化 | Whether initialized
    bool initialized;

    // 原始数据缓存 | Raw data cache
    IMURawData rawData;

    // 校准偏移量 | Calibration offsets
    IMUCalibration calib;

    // 滤波后的角度（度）| Filtered angle (degrees)
    float filteredAngle;

    // Y 轴角速度（度/秒）| Y-axis angular velocity (deg/sec)
    float gyroYdps;

    // Z 轴角速度（度/秒）| Z-axis angular velocity (deg/sec)
    float gyroZdps;

    // 互补滤波器系数 | Complementary filter coefficient
    float compAlpha;

    /**
     * 从加速度计数据计算倾斜角度 | Calculate tilt angle from accelerometer
     * @return 倾斜角度（度）| Tilt angle (degrees)
     *
     * 使用 atan2 计算重力方向与垂直方向的夹角
     * Uses atan2 to calculate angle between gravity and vertical
     */
    float accelToAngle(int16_t ax, int16_t ay, int16_t az);

    /**
     * 将陀螺仪原始值转换为度/秒 | Convert raw gyro to deg/sec
     * @param raw      原始 ADC 值 | Raw ADC value
     * @param range    量程设置 (0=±250, 1=±500, 2=±1000, 3=±2000)
     * @return 度/秒 | Degrees per second
     *
     * 灵敏度 = 131 / (2^range) LSB/(°/s)
     * Sensitivity = 131 / (2^range) LSB/(deg/s)
     */
    float rawGyroToDPS(int16_t raw, uint8_t range);

    /**
     * 写入 MPU6050 寄存器 | Write to MPU6050 register
     */
    void writeRegister(uint8_t reg, uint8_t value);

    /**
     * 从 MPU6050 读取多个字节 | Read multiple bytes from MPU6050
     */
    void readRegisters(uint8_t reg, uint8_t* buffer, uint8_t length);
};

#endif // IMU_H
