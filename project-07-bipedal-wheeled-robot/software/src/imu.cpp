/**
 * ============================================================================
 * IMU 惯性测量单元模块实现 | IMU Module Implementation
 * ============================================================================
 * MPU6050 六轴传感器驱动 + 互补滤波器
 * MPU6050 6-axis sensor driver + complementary filter
 *
 * 互补滤波器原理 | Complementary filter principle:
 *   加速度计：静态准确，动态有噪声（受震动影响大）
 *   Accelerometer: accurate when static, noisy when dynamic (vibration sensitive)
 *
 *   陀螺仪：短期准确，长期漂移（积分误差累积）
 *   Gyroscope: accurate short-term, drifts long-term (integration error accumulates)
 *
 *   互补滤波 = 高通滤波陀螺仪 + 低通滤波加速度计
 *   Complementary filter = high-pass filtered gyro + low-pass filtered accel
 *
 *   angle = α × (angle + gyro × dt) + (1 - α) × accel_angle
 *           └── 高通部分（信任短期）──┘  └─ 低通部分（信任长期）─┘
 *           └─── high-pass (trust short) ──┘  └─ low-pass (trust long) ──┘
 * ============================================================================
 */

#include "imu.h"

// 配置头文件（包含滤波器参数和量程设置）| Config header (filter params and range settings)
#if __has_include("config.h")
    #include "config.h"
#else
    #include "config.template.h"
#endif

// ============================================================================
// MPU6050 寄存器地址定义 | MPU6050 Register Address Definitions
// ============================================================================
#define MPU6050_REG_SMPLRT_DIV   0x19   // 采样率分频器 | Sample rate divider
#define MPU6050_REG_CONFIG       0x1A   // 配置（DLPF）| Config (Digital Low Pass Filter)
#define MPU6050_REG_GYRO_CONFIG  0x1B   // 陀螺仪配置 | Gyroscope config
#define MPU6050_REG_ACCEL_CONFIG 0x1C   // 加速度计配置 | Accelerometer config
#define MPU6050_REG_PWR_MGMT_1   0x6B   // 电源管理1 | Power management 1
#define MPU6050_REG_ACCEL_XOUT_H 0x3B   // 加速度X高位 | Accel X high byte
#define MPU6050_REG_WHO_AM_I     0x75   // 身份识别 | Who am I

// ============================================================================
// 初始化 MPU6050 | Initialize MPU6050
// ============================================================================
bool IMU::init(uint8_t sdaPin, uint8_t sclPin, uint8_t addr) {
    address     = addr;
    initialized = false;

    // 默认校准偏移为零 | Default calibration offset is zero
    calib = {0, 0, 0, 0, 0, 0};

    // 默认角度和角速度 | Default angle and angular velocity
    filteredAngle = 0.0f;
    gyroYdps      = 0.0f;
    gyroZdps      = 0.0f;
    compAlpha     = COMPLEMENTARY_ALPHA;  // 从 config.h 读取 | Read from config.h

    // 初始化 I2C 总线 | Initialize I2C bus
    Wire.begin(sdaPin, sclPin);
    Wire.setClock(400000);  // 400kHz 快速模式 | 400kHz fast mode

    // 延时等待传感器上电稳定 | Wait for sensor power-up stabilization
    delay(100);

    // 检查 MPU6050 身份 | Verify MPU6050 identity
    // WHO_AM_I 寄存器应返回 0x68 | WHO_AM_I register should return 0x68
    Wire.beginTransmission(address);
    Wire.write(MPU6050_REG_WHO_AM_I);
    Wire.endTransmission(false);
    Wire.requestFrom(address, (uint8_t)1);

    if (Wire.available()) {
        uint8_t whoAmI = Wire.read();
        if (whoAmI != 0x68) {
            Serial.printf("[IMU] 错误：WHO_AM_I=0x%02X，期望 0x68\n", whoAmI);
            Serial.printf("[IMU] Error: WHO_AM_I=0x%02X, expected 0x68\n", whoAmI);
            return false;
        }
    } else {
        Serial.println("[IMU] 错误：无响应 | Error: no response");
        return false;
    }

    // 唤醒 MPU6050（清除 SLEEP 位）| Wake up MPU6050 (clear SLEEP bit)
    writeRegister(MPU6050_REG_PWR_MGMT_1, 0x00);
    delay(100);

    // 配置陀螺仪量程 | Configure gyroscope range
    // FS_SEL: 0=±250°/s, 1=±500°/s, 2=±1000°/s, 3=±2000°/s
    writeRegister(MPU6050_REG_GYRO_CONFIG, GYRO_RANGE << 3);
    delay(10);

    // 配置加速度计量程 | Configure accelerometer range
    // AFS_SEL: 0=±2g, 1=±4g, 2=±8g, 3=±16g
    writeRegister(MPU6050_REG_ACCEL_CONFIG, ACCEL_RANGE << 3);
    delay(10);

    // 配置数字低通滤波器 | Configure digital low pass filter
    // DLPF_CFG=3 → 带宽~44Hz，延迟~4.9ms（适合平衡机器人）
    // DLPF_CFG=3 -> bandwidth ~44Hz, latency ~4.9ms (suitable for balancing robot)
    writeRegister(MPU6050_REG_CONFIG, 0x03);
    delay(10);

    // 配置采样率分频器 | Configure sample rate divider
    // 采样率 = 1kHz / (1 + SMPLRT_DIV)
    // SMPLRT_DIV=7 → 125Hz | SMPLRT_DIV=7 -> 125Hz
    writeRegister(MPU6050_REG_SMPLRT_DIV, 0x07);
    delay(10);

    initialized = true;

    Serial.println("[IMU] MPU6050 初始化成功 | Init successful");
    Serial.printf("  地址/Addr: 0x%02X\n", address);
    Serial.printf("  加速度计/Accel range: ±%dg\n", 2 << ACCEL_RANGE);
    Serial.printf("  陀螺仪/Gyro range: ±%d°/s\n", 250 << GYRO_RANGE);

    return true;
}

// ============================================================================
// 读取原始传感器数据 | Read raw sensor data
// ============================================================================
bool IMU::readRaw(IMURawData& data) {
    if (!initialized) return false;

    // 从 0x3B 开始连续读取 14 字节（6 加速度 + 2 温度 + 6 陀螺仪）
    // Read 14 bytes starting from 0x3B (6 accel + 2 temp + 6 gyro)
    uint8_t buffer[14];
    readRegisters(MPU6050_REG_ACCEL_XOUT_H, buffer, 14);

    // 拼接高字节和低字节（大端序）| Combine high and low bytes (big-endian)
    data.ax = (int16_t)((buffer[0] << 8)  | buffer[1]);
    data.ay = (int16_t)((buffer[2] << 8)  | buffer[3]);
    data.az = (int16_t)((buffer[4] << 8)  | buffer[5]);
    // buffer[6], buffer[7] 是温度数据，此处不使用 | Temperature data, not used here
    data.gx = (int16_t)((buffer[8] << 8)  | buffer[9]);
    data.gy = (int16_t)((buffer[10] << 8) | buffer[11]);
    data.gz = (int16_t)((buffer[12] << 8) | buffer[13]);

    return true;
}

// ============================================================================
// 更新滤波器（核心函数）| Update filter (core function)
// ============================================================================
void IMU::update(float dtSec) {
    if (!initialized) return;

    // 步骤 1：读取原始数据 | Step 1: Read raw data
    readRaw(rawData);

    // 步骤 2：减去校准偏移 | Step 2: Subtract calibration offsets
    int16_t ax = rawData.ax - calib.axOffset;
    int16_t ay = rawData.ay - calib.ayOffset;
    int16_t az = rawData.az - calib.azOffset;
    int16_t gx = rawData.gx - calib.gxOffset;
    int16_t gy = rawData.gy - calib.gyOffset;
    int16_t gz = rawData.gz - calib.gzOffset;

    // 步骤 3：从加速度计计算倾斜角度 | Step 3: Calculate tilt from accelerometer
    float accelAngle = accelToAngle(ax, ay, az);

    // 步骤 4：将陀螺仪原始值转换为度/秒 | Step 4: Convert raw gyro to deg/sec
    gyroYdps = rawGyroToDPS(gy, GYRO_RANGE);
    gyroZdps = rawGyroToDPS(gz, GYRO_RANGE);

    // 步骤 5：互补滤波器核心算法 | Step 5: Complementary filter core algorithm
    //
    // angle = α × (上一时刻角度 + 角速度 × 时间) + (1 - α) × 加速度计角度
    // angle = α × (prev_angle + gyro_rate × dt) + (1 - α) × accel_angle
    //
    // α 越大（接近 1）→ 越信任陀螺仪（响应快，但有漂移）
    // α 越小（接近 0）→ 越信任加速度计（无漂移，但噪声大）
    // α larger (near 1) -> trust gyro more (fast response, but drifts)
    // α smaller (near 0) -> trust accel more (no drift, but noisy)
    filteredAngle = compAlpha * (filteredAngle + gyroYdps * dtSec)
                  + (1.0f - compAlpha) * accelAngle;
}

// ============================================================================
// 获取滤波后的角度 | Get filtered angle
// ============================================================================
float IMU::getAngle() {
    return filteredAngle;
}

// ============================================================================
// 获取 Y 轴角速度 | Get Y-axis angular velocity
// ============================================================================
float IMU::getGyroY() const {
    return gyroYdps;
}

// ============================================================================
// 获取 Z 轴角速度 | Get Z-axis angular velocity
// ============================================================================
float IMU::getGyroZ() const {
    return gyroZdps;
}

// ============================================================================
// 校准传感器 | Calibrate sensor
// ============================================================================
void IMU::calibrate(uint16_t samples) {
    if (!initialized) return;

    Serial.println("[IMU] 开始校准，请保持机器人静止...");
    Serial.println("[IMU] Calibrating, keep robot still...");

    // 累加器 | Accumulators
    int32_t axSum = 0, aySum = 0, azSum = 0;
    int32_t gxSum = 0, gySum = 0, gzSum = 0;

    // 丢弃前 100 个样本（等待数据稳定）| Discard first 100 samples
    for (int i = 0; i < 100; i++) {
        IMURawData temp;
        readRaw(temp);
        delay(2);
    }

    // 采集样本并累加 | Collect samples and accumulate
    for (uint16_t i = 0; i < samples; i++) {
        IMURawData temp;
        readRaw(temp);
        axSum += temp.ax;
        aySum += temp.ay;
        azSum += temp.az;
        gxSum += temp.gx;
        gySum += temp.gy;
        gzSum += temp.gz;
        delay(2);
    }

    // 计算平均值作为零偏 | Calculate average as zero offset
    calib.axOffset = axSum / samples;
    calib.ayOffset = aySum / samples;
    calib.gzOffset = gzSum / samples;
    calib.gxOffset = gxSum / samples;
    calib.gyOffset = gySum / samples;

    // Z 轴加速度特殊处理：静止时 Z 轴应读数为 1g (16384 at ±2g range)
    // Z-axis accel special handling: at rest, Z should read 1g (16384 at ±2g range)
    calib.azOffset = azSum / samples - (int16_t)(16384.0f / (1 << ACCEL_RANGE));

    Serial.println("[IMU] 校准完成 | Calibration complete");
    Serial.printf("  Accel偏移: ax=%d, ay=%d, az=%d\n",
                  calib.axOffset, calib.ayOffset, calib.azOffset);
    Serial.printf("  Gyro偏移:  gx=%d, gy=%d, gz=%d\n",
                  calib.gxOffset, calib.gyOffset, calib.gzOffset);
}

// ============================================================================
// 从加速度计计算倾斜角度 | Calculate tilt angle from accelerometer
// ============================================================================
float IMU::accelToAngle(int16_t ax, int16_t ay, int16_t az) {
    /*
     * 使用 atan2 计算倾斜角度 | Calculate tilt angle using atan2
     *
     * 当机器人前后倾斜时，重力在 X 轴和 Z 轴上的分量发生变化
     * When robot tilts forward/backward, gravity distribution on X and Z changes
     *
     * 对于平衡机器人，我们关心的是前后方向（X-Z 平面）的倾斜
     * For balancing robot, we care about front-back tilt (X-Z plane)
     *
     *       前方向 | Forward
     *         ↑
     *         |  /  ← 重力方向 | Gravity direction
     *         | /
     *         |/ θ ← 倾斜角度 | Tilt angle
     *         +--------→ X轴
     *
     * θ = atan2(ax, az) 以弧度为单位，需转换为度
     * θ = atan2(ax, az) in radians, convert to degrees
     */
    return atan2((float)ax, (float)az) * 180.0f / PI;
}

// ============================================================================
// 原始陀螺仪值转度/秒 | Convert raw gyro to degrees/sec
// ============================================================================
float IMU::rawGyroToDPS(int16_t raw, uint8_t range) {
    /*
     * MPU6050 陀螺仪灵敏度表 | MPU6050 gyroscope sensitivity table:
     *   FS_SEL=0 → ±250°/s  → 131 LSB/(°/s)
     *   FS_SEL=1 → ±500°/s  → 65.5 LSB/(°/s)
     *   FS_SEL=2 → ±1000°/s → 32.8 LSB/(°/s)
     *   FS_SEL=3 → ±2000°/s → 16.4 LSB/(°/s)
     *
     * 灵敏度 = 131.0 / (2^range)
     * Sensitivity = 131.0 / (2^range)
     */
    float sensitivity = 131.0f / (float)(1 << range);
    return (float)raw / sensitivity;
}

// ============================================================================
// 写入寄存器 | Write register
// ============================================================================
void IMU::writeRegister(uint8_t reg, uint8_t value) {
    Wire.beginTransmission(address);
    Wire.write(reg);
    Wire.write(value);
    Wire.endTransmission();
}

// ============================================================================
// 读取多个寄存器 | Read multiple registers
// ============================================================================
void IMU::readRegisters(uint8_t reg, uint8_t* buffer, uint8_t length) {
    Wire.beginTransmission(address);
    Wire.write(reg);
    Wire.endTransmission(false);  // 发送重复起始条件 | Send repeated start
    Wire.requestFrom(address, length);

    for (uint8_t i = 0; i < length && Wire.available(); i++) {
        buffer[i] = Wire.read();
    }
}
