# Day 08: 传感器集成与手势识别 | Sensor Integration & Gesture Recognition

> **今日目标:**
> - 掌握MPU6050 IMU的I2C驱动开发
> - 实现加速度计+陀螺仪数据读取与姿态解算
> - 驱动APDS-9960手势传感器实现手势检测
> - 构建传感器事件系统，触发机器人行为
>
> **产出:** IMU姿态数据正确读取，手势传感器能识别上下左右挥手，传感器事件触发表情变化

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间回顾 | Day 7作业回顾，表情动画系统问题讨论 |
| 09:15 - 10:30 | 知识讲解 | I2C多设备总线、MPU6050寄存器、IMU姿态解算原理 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | MPU6050驱动编写、数据读取与校准 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 互补滤波器实现、APDS-9960手势检测 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 传感器融合、事件触发系统集成 |
| 16:30 - 17:00 | 总结分享 | 传感器调试经验分享、Phase 2回顾 |

---

## 上午: MPU6050 IMU驱动与姿态解算 | Morning: MPU6050 IMU Driver

### 为什么要学这个? | Why Learn This?

ElectronBot 需要知道自己的身体姿态——是否倾斜、是否被拿起、头部朝向哪个方向。MPU6050 芯片内部集成了3轴加速度计和3轴陀螺仪，是机器人姿态感知的核心传感器。掌握 IMU 驱动开发是机器人工程的基本功。

ElectronBot needs to know its own body orientation — whether it's tilted, picked up, or which direction its head faces. The MPU6050 combines a 3-axis accelerometer and 3-axis gyroscope, making it the core sensor for pose awareness. IMU driver development is a fundamental robotics skill.

### 任务8.1: I2C多设备总线管理 (30分钟)

ElectronBot 的 I2C 总线上挂载了多个设备：
- 5个舵机驱动板（地址 0x01–0x05）
- MPU6050（地址 0x68 或 0x69）
- APDS-9960（地址 0x39）

```c
// I2C多设备总线初始化
#define MPU6050_ADDR         0x68
#define APDS9960_ADDR        0x39
#define SERVO_BASE_ADDR      0x01

HAL_StatusTypeDef i2c_scan(I2C_HandleTypeDef *hi2c)
{
    HAL_StatusTypeDef res;
    uint8_t found = 0;

    for (uint8_t addr = 1; addr < 127; addr++) {
        res = HAL_I2C_IsDeviceReady(hi2c, (addr << 1), 3, 50);
        if (res == HAL_OK) {
            printf("I2C device found at 0x%02X\r\n", addr);
            found++;
        }
    }
    printf("Total I2C devices: %d\r\n", found);
    return HAL_OK;
}
```

**预期结果:** 串口输出7个I2C设备地址（5个舵机+MPU6050+APDS-9960）

### 任务8.2: MPU6050驱动编写 (45分钟)

```c
// MPU6050寄存器定义
#define MPU6050_REG_SMPLRT_DIV   0x19
#define MPU6050_REG_CONFIG       0x1A
#define MPU6050_REG_GYRO_CONFIG  0x1B
#define MPU6050_REG_ACCEL_CONFIG 0x1C
#define MPU6050_REG_PWR_MGMT_1   0x6B
#define MPU6050_REG_ACCEL_XOUT_H 0x3B
#define MPU6050_REG_GYRO_XOUT_H  0x43
#define MPU6050_REG_WHO_AM_I     0x75

typedef struct {
    int16_t accel_x, accel_y, accel_z;  // 加速度原始值
    int16_t gyro_x, gyro_y, gyro_z;     // 陀螺仪原始值
    float accel_x_g, accel_y_g, accel_z_g;  // 转换为g
    float gyro_x_dps, gyro_y_dps, gyro_z_dps; // 转换为度/秒
    float roll, pitch;  // 姿态角（度）
} IMU_Data_t;

HAL_StatusTypeDef mpu6050_init(I2C_HandleTypeDef *hi2c)
{
    uint8_t data;

    // 1. 唤醒MPU6050（退出睡眠模式）
    data = 0x00;
    HAL_I2C_Write(hi2c, MPU6050_ADDR, MPU6050_REG_PWR_MGMT_1, &data, 1);
    HAL_Delay(100);

    // 2. 设置采样率分频器（采样率 = 1kHz / (1 + SMPLRT_DIV)）
    data = 0x07;  // 125Hz
    HAL_I2C_Write(hi2c, MPU6050_ADDR, MPU6050_REG_SMPLRT_DIV, &data, 1);

    // 3. 配置低通滤波器
    data = 0x06;  // ~5Hz 滤波带宽
    HAL_I2C_Write(hi2c, MPU6050_ADDR, MPU6050_REG_CONFIG, &data, 1);

    // 4. 配置陀螺仪量程 ±250°/s
    data = 0x00;
    HAL_I2C_Write(hi2c, MPU6050_ADDR, MPU6050_REG_GYRO_CONFIG, &data, 1);

    // 5. 配置加速度计量程 ±2g
    data = 0x00;
    HAL_I2C_Write(hi2c, MPU6050_ADDR, MPU6050_REG_ACCEL_CONFIG, &data, 1);

    return HAL_OK;
}

HAL_StatusTypeDef mpu6050_read_all(I2C_HandleTypeDef *hi2c, IMU_Data_t *imu)
{
    uint8_t buf[14];

    // 连续读取14字节（加速度+温度+陀螺仪）
    HAL_I2C_Read(hi2c, MPU6050_ADDR, MPU6050_REG_ACCEL_XOUT_H, buf, 14);

    // 解析加速度数据
    imu->accel_x = (buf[0] << 8) | buf[1];
    imu->accel_y = (buf[2] << 8) | buf[3];
    imu->accel_z = (buf[4] << 8) | buf[5];

    // 解析陀螺仪数据
    imu->gyro_x = (buf[8] << 8) | buf[9];
    imu->gyro_y = (buf[10] << 8) | buf[11];
    imu->gyro_z = (buf[12] << 8) | buf[13];

    // 转换为物理单位
    // ±2g 量程: 灵敏度 = 16384 LSB/g
    imu->accel_x_g = imu->accel_x / 16384.0f;
    imu->accel_y_g = imu->accel_y / 16384.0f;
    imu->accel_z_g = imu->accel_z / 16384.0f;

    // ±250°/s 量程: 灵敏度 = 131 LSB/(°/s)
    imu->gyro_x_dps = imu->gyro_x / 131.0f;
    imu->gyro_y_dps = imu->gyro_y / 131.0f;
    imu->gyro_z_dps = imu->gyro_z / 131.0f;

    return HAL_OK;
}
```

**常见问题:**
- **WHO_AM_I 读不到 0x68**: 检查I2C接线（SDA/SCL是否接反）、上拉电阻是否存在
- **数据全为0或全为-1**: MPU6050未正确唤醒，确认PWR_MGMT_1写入0x00
- **加速度值跳变大**: 增大低通滤波器配置值（CONFIG寄存器）

### 任务8.3: MPU6050校准 (20分钟)

```c
// 校准程序：静止放置机器人，记录零偏
typedef struct {
    float gyro_offset_x, gyro_offset_y, gyro_offset_z;
} IMU_Calib_t;

void mpu6050_calibrate(I2C_HandleTypeDef *hi2c, IMU_Calib_t *calib, int samples)
{
    IMU_Data_t imu;
    float sum_gx = 0, sum_gy = 0, sum_gz = 0;

    printf("Calibrating IMU... Keep robot still!\r\n");
    HAL_Delay(2000);

    for (int i = 0; i < samples; i++) {
        mpu6050_read_all(hi2c, &imu);
        sum_gx += imu.gyro_x_dps;
        sum_gy += imu.gyro_y_dps;
        sum_gz += imu.gyro_z_dps;
        HAL_Delay(10);
    }

    calib->gyro_offset_x = sum_gx / samples;
    calib->gyro_offset_y = sum_gy / samples;
    calib->gyro_offset_z = sum_gz / samples;

    printf("Calibration done. Offsets: %.2f, %.2f, %.2f\r\n",
           calib->gyro_offset_x, calib->gyro_offset_y, calib->gyro_offset_z);
}
```

---

## 下午: 互补滤波与手势识别 | Afternoon: Complementary Filter & Gesture Detection

### 为什么要学互补滤波? | Why Complementary Filtering?

单独用加速度计算姿态角，在运动时会有很大噪声；单独用陀螺仪积分，误差会随时间累积（漂移）。互补滤波巧妙地结合两者优点——加速度计提供长期参考，陀螺仪提供短期精度。

Using only the accelerometer for orientation is noisy during motion; using only the gyroscope leads to drift over time. Complementary filtering combines the best of both — the accelerometer provides a long-term reference while the gyroscope gives short-term precision.

### 任务8.4: 互补滤波器实现 (30分钟)

```c
// 互补滤波器
#define COMP_FILTER_ALPHA  0.98f  // 陀螺仪权重（0.95-0.99）

typedef struct {
    float roll, pitch;
    uint32_t last_tick;
    uint8_t initialized;
} Attitude_t;

void attitude_update(IMU_Data_t *imu, IMU_Calib_t *calib, Attitude_t *att)
{
    float dt;
    uint32_t now = HAL_GetTick();

    if (!att->initialized) {
        // 首次初始化：用加速度计计算初始角度
        att->roll = atan2f(imu->accel_y_g, imu->accel_z_g) * 180.0f / M_PI;
        att->pitch = atan2f(-imu->accel_x_g,
                            sqrtf(imu->accel_y_g * imu->accel_y_g +
                                  imu->accel_z_g * imu->accel_z_g)) * 180.0f / M_PI;
        att->initialized = 1;
        att->last_tick = now;
        return;
    }

    dt = (now - att->last_tick) / 1000.0f;
    att->last_tick = now;

    // 去除陀螺仪零偏
    float gx = imu->gyro_x_dps - calib->gyro_offset_x;
    float gy = imu->gyro_y_dps - calib->gyro_offset_y;
    float gz = imu->gyro_z_dps - calib->gyro_offset_z;

    // 从加速度计计算角度
    float accel_roll = atan2f(imu->accel_y_g, imu->accel_z_g) * 180.0f / M_PI;
    float accel_pitch = atan2f(-imu->accel_x_g,
                               sqrtf(imu->accel_y_g * imu->accel_y_g +
                                     imu->accel_z_g * imu->accel_z_g)) * 180.0f / M_PI;

    // 互补滤波：融合陀螺仪积分和加速度计测量
    att->roll = COMP_FILTER_ALPHA * (att->roll + gx * dt) +
                (1.0f - COMP_FILTER_ALPHA) * accel_roll;
    att->pitch = COMP_FILTER_ALPHA * (att->pitch + gy * dt) +
                 (1.0f - COMP_FILTER_ALPHA) * accel_pitch;
}
```

**预期结果:** 串口输出稳定的 roll/pitch 角度，倾斜机器人时角度平滑变化

### 任务8.5: APDS-9960手势传感器驱动 (40分钟)

```c
// APDS-9960手势检测
#define APDS9960_REG_ENABLE     0x80
#define APDS9960_REG_GCONF4     0xAB
#define APDS9960_REG_GSTATUS    0xAF
#define APDS9960_REG_GFIFO_U    0xFC
#define APDS9960_REG_GFIFO_D    0xFD
#define APDS9960_REG_GFIFO_L    0xFE
#define APDS9960_REG_GFIFO_R    0xFF

typedef enum {
    GESTURE_NONE = 0,
    GESTURE_UP,
    GESTURE_DOWN,
    GESTURE_LEFT,
    GESTURE_RIGHT,
    GESTURE_NEAR,
    GESTURE_FAR
} Gesture_t;

HAL_StatusTypeDef apds9960_init(I2C_HandleTypeDef *hi2c)
{
    uint8_t data;

    // 启用手势检测引擎
    data = 0x4F;  // GEN=1, GDRAIN=1, Pon=1, WEN=1
    HAL_I2C_Write(hi2c, APDS9960_ADDR, APDS9960_REG_ENABLE, &data, 1);

    // 配置手势参数
    data = 0x00;  // GFIFO threshold=4, 手势模式
    HAL_I2C_Write(hi2c, APDS9960_ADDR, APDS9960_REG_GCONF4, &data, 1);

    return HAL_OK;
}

Gesture_t apds9960_read_gesture(I2C_HandleTypeDef *hi2c)
{
    uint8_t u, d, l, r;
    HAL_I2C_Read(hi2c, APDS9960_ADDR, APDS9960_REG_GFIFO_U, &u, 1);
    HAL_I2C_Read(hi2c, APDS9960_ADDR, APDS9960_REG_GFIFO_D, &d, 1);
    HAL_I2C_Read(hi2c, APDS9960_ADDR, APDS9960_REG_GFIFO_L, &l, 1);
    HAL_I2C_Read(hi2c, APDS9960_ADDR, APDS9960_REG_GFIFO_R, &r, 1);

    // 简化手势判断逻辑
    int ud_diff = u - d;
    int lr_diff = l - r;

    if (abs(ud_diff) > abs(lr_diff)) {
        if (ud_diff > 20) return GESTURE_UP;
        if (ud_diff < -20) return GESTURE_DOWN;
    } else {
        if (lr_diff > 20) return GESTURE_LEFT;
        if (lr_diff < -20) return GESTURE_RIGHT;
    }

    if (u > 100 && d > 100 && l > 100 && r > 100) return GESTURE_NEAR;
    if (u < 10 && d < 10 && l < 10 && r < 10) return GESTURE_FAR;

    return GESTURE_NONE;
}
```

### 任务8.6: 传感器事件系统集成 (30分钟)

```c
// 传感器事件系统
typedef enum {
    EVENT_NONE = 0,
    EVENT_TAPPED,       // 被轻拍
    EVENT_PICKED_UP,    // 被拿起
    EVENT_PUT_DOWN,     // 被放下
    EVENT_TILT_LEFT,    // 左倾
    EVENT_TILT_RIGHT,   // 右倾
    EVENT_WAVE_UP,      // 手势：上挥
    EVENT_WAVE_DOWN,    // 手势：下挥
    EVENT_WAVE_LEFT,    // 手势：左挥
    EVENT_WAVE_RIGHT,   // 手势：右挥
} SensorEvent_t;

SensorEvent_t detect_event(IMU_Data_t *imu, Attitude_t *att, Gesture_t gesture)
{
    // 检测拿起/放下（加速度突变）
    static float last_accel_mag = 1.0f;
    float accel_mag = sqrtf(imu->accel_x_g * imu->accel_x_g +
                            imu->accel_y_g * imu->accel_y_g +
                            imu->accel_z_g * imu->accel_z_g);

    if (accel_mag > 2.0f && last_accel_mag < 1.5f) {
        last_accel_mag = accel_mag;
        return EVENT_TAPPED;
    }
    if (accel_mag < 0.3f) {
        last_accel_mag = accel_mag;
        return EVENT_PICKED_UP;
    }
    if (accel_mag > 0.8f && accel_mag < 1.2f && last_accel_mag < 0.3f) {
        last_accel_mag = accel_mag;
        return EVENT_PUT_DOWN;
    }
    last_accel_mag = accel_mag;

    // 检测倾斜
    if (att->roll > 30.0f) return EVENT_TILT_RIGHT;
    if (att->roll < -30.0f) return EVENT_TILT_LEFT;

    // 手势事件
    switch (gesture) {
        case GESTURE_UP:    return EVENT_WAVE_UP;
        case GESTURE_DOWN:  return EVENT_WAVE_DOWN;
        case GESTURE_LEFT:  return EVENT_WAVE_LEFT;
        case GESTURE_RIGHT: return EVENT_WAVE_RIGHT;
        default: break;
    }

    return EVENT_NONE;
}
```

**预期结果:** 机器人能响应倾斜、拍打、手势等动作，触发对应的表情变化

**常见问题:**
- **MPU6050数据异常跳变**: 检查I2C总线是否有上拉电阻（4.7kΩ），信号线是否有干扰
- **互补滤波输出延迟大**: 减小COMP_FILTER_ALPHA值（0.95），让加速度计权重增大
- **手势识别误触发**: 增大手势判断阈值（从20改到40），或加入去抖动逻辑
- **I2C总线冲突**: 确保不同设备使用不同地址，必要时在读取间加HAL_Delay

---

## 今日作业 | Homework

### 必做题
1. 完成MPU6050驱动，串口输出校准后的加速度和陀螺仪数据
2. 实现互补滤波器，输出稳定的roll/pitch角度
3. 完成APDS-9960手势检测，能识别至少上下左右4个方向

### 挑战题
1. 实现卡尔曼滤波器替代互补滤波，对比两种方法的精度
2. 利用IMU数据实现"敲头"检测（加速度Z轴突变+持续时间短）
3. 将传感器事件系统与Day 7的表情引擎联动，实现：倾斜→困惑表情，拍打→生气表情，挥手→开心表情

### 思考题
1. 为什么互补滤波中陀螺仪的权重设为0.98？这个值太大或太小会怎样？
2. MPU6050的加速度计能测量重力方向，陀螺仪不能。但为什么不能只用加速度计算姿态？
3. 如果要在I2C总线上再加一个传感器（如磁力计），需要注意什么？地址冲突怎么解决？

---

## 明日预告 | Tomorrow's Preview

Phase 3 开始！明天我们将进入Unity桌面软件开发。你将学习Unity编辑器的基本操作、C#脚本编写，以及如何通过ElectronBot SDK的四层架构实现PC与机器人的USB通信桥接。

Phase 3 begins! Tomorrow we enter Unity desktop software development. You'll learn Unity editor basics, C# scripting, and how to bridge PC-robot USB communication through ElectronBot SDK's 4-layer architecture.

---

## 参考资源 | References

- [MPU6050 数据手册](https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/)
- [MPU6050 寄存器映射](https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Register-Map1.pdf)
- [APDS-9960 数据手册](https://docs.broadcom.com/doc/AV02-4191EN)
- [互补滤波原理详解](https://d1wqtxts1xzle7.cloudfront.net/)
- [STM32 HAL I2C 使用指南](https://www.st.com/resource/en/user_manual/um1884-description-of-stm32f4-hal-and-lld-drivers-stmicroelectronics.pdf)
- [IMU姿态解算入门（B站搜索）](https://search.bilibili.com/all?keyword=MPU6050%20%E5%A7%BF%E6%80%81%E8%A7%A3%E7%AE%97)

*最后更新：2026-05-27*
