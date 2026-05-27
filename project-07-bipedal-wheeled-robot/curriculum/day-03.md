# Day 03: IMU 传感器与姿态解算 | IMU Sensor & Attitude Estimation

## 今日目标 | Today's Goals

- 理解 IMU（惯性测量单元）的作用与原理 | Understand the IMU's role and principles
- 学习 MPU6050 传感器的内部结构 | Learn the MPU6050 sensor's internal structure
- 掌握 I2C 通信协议基础 | Master I2C communication protocol basics
- 读取 MPU6050 原始数据（加速度 + 角速度）| Read MPU6050 raw data (acceleration + angular velocity)
- 理解并实现互补滤波算法 | Understand and implement the complementary filter
- 了解卡尔曼滤波的基本思想 | Understand the basic idea of Kalman filtering

---

## 上午 (3h) | Morning Session

### 1. IMU 是什么？ | What is an IMU? (1h)

**为什么机器人需要 IMU？** 想象你闭着眼睛单脚站立 -- 你能保持平衡吗？能！因为你耳朵里的"前庭系统"（人体自带的 IMU）感知身体的倾斜，然后大脑（控制器）命令肌肉（电机）纠正姿势。轮足机器人的 MPU6050 就相当于它的"前庭系统"。

**Why does a robot need an IMU?** Imagine standing on one foot with eyes closed -- can you balance? Yes! Because your inner ear's "vestibular system" (the body's built-in IMU) senses body tilt, then the brain (controller) commands muscles (motors) to correct posture. The MPU6050 in our robot is its "vestibular system."

**IMU = Inertial Measurement Unit = 惯性测量单元**

```
IMU 的组成:
┌────────────────────────────────────────────┐
│                  IMU                        │
│                                             │
│  ┌──────────────────────┐                   │
│  │  3轴加速度计          │                   │
│  │  (Accelerometer)     │                   │
│  │  测量: 线性加速度     │                   │
│  │  Ax, Ay, Az          │                   │
│  │  单位: g (重力加速度) │                   │
│  └──────────────────────┘                   │
│                                             │
│  ┌──────────────────────┐                   │
│  │  3轴陀螺仪            │                   │
│  │  (Gyroscope)         │                   │
│  │  测量: 角速度         │                   │
│  │  Gx, Gy, Gz          │                   │
│  │  单位: °/s (度/秒)    │                   │
│  └──────────────────────┘                   │
│                                             │
│  有的 IMU 还有:                              │
│  ┌──────────────────────┐                   │
│  │  3轴磁力计            │  ← MPU6050 没有   │
│  │  (Magnetometer)      │                   │
│  │  测量: 磁场方向(地磁)  │                   │
│  └──────────────────────┘                   │
└────────────────────────────────────────────┘

6 DOF = 6 Degrees of Freedom = 6自由度
  = 3轴加速度 + 3轴角速度

MPU6050 是一个 6 DOF IMU (无磁力计)
```

**两种传感器对比 | Two Sensor Comparison:**

| 特性 | 加速度计 Accelerometer | 陀螺仪 Gyroscope |
|------|----------------------|-------------------|
| 测量什么 | 线性加速度（含重力） | 角速度（旋转快慢） |
| 静态响应 | 好（静止时精确测重力方向） | 差（静止时输出零点漂移） |
| 动态响应 | 差（运动时噪声很大） | 好（快速响应旋转） |
| 长期稳定性 | 好（长期平均指向重力方向） | 差（积分后角度漂移） |
| 短期稳定性 | 差（瞬时值噪声大） | 好（短期精度高） |
| 类比 | 铅垂线（告诉你哪个方向是"下"） | 旋转的陀螺（告诉你转了多快） |

> **关键洞察: 加速度计和陀螺仪各有优缺点，我们需要把它们融合起来!** 这就是今天的核心 -- 姿态解算（传感器融合）。

> **Key insight: Accelerometer and gyroscope each have pros and cons. We need to fuse them!** This is today's core topic -- attitude estimation (sensor fusion).

---

### 2. MPU6050 内部结构与 I2C 通信 | MPU6050 Internals & I2C Communication (1h)

**MPU6050 芯片规格 | MPU6050 Chip Specs:**

```
MPU6050 关键参数:
├── 加速度计范围: ±2g / ±4g / ±8g / ±16g (可配置)
├── 陀螺仪范围: ±250 / ±500 / ±1000 / ±2000 °/s (可配置)
├── ADC 分辨率: 16-bit (加速度和陀螺仪都是)
├── 通信接口: I2C (400kHz 快速模式)
├── 工作电压: 3.3V (模块板通常有稳压器, 支持 5V)
├── 内置 DMP (数字运动处理器): 可在芯片内做姿态解算
└── 价格: 约 5-10 元 (模块板)
```

**I2C 协议速成 | I2C Protocol Crash Course:**

```
为什么用 I2C? 只需要 2 根线就能连接多个设备!
Why I2C? Only 2 wires needed for multiple devices!

I2C 总线拓扑 (Bus Topology):

     VCC (3.3V)
      │
      ├──[上拉电阻 4.7kΩ]── SDA (数据线) ──┬── ESP32 GPIO21
      │                                     ├── MPU6050 SDA
      │                                     └── (其他I2C设备)
      │
      ├──[上拉电阻 4.7kΩ]── SCL (时钟线) ──┬── ESP32 GPIO22
      │                                     ├── MPU6050 SCL
      │                                     └── (其他I2C设备)
      │
     GND

I2C 通信过程:
1. 主机 (ESP32) 发送 START 信号
2. 主机发送从机地址 (MPU6050 = 0x68, 如果 AD0=0; 或 0x69, 如果 AD0=1)
3. 从机应答 (ACK)
4. 主机发送寄存器地址
5. 从机发送数据 (读操作) 或 主机发送数据 (写操作)
6. 主机发送 STOP 信号

类比: I2C 就像课堂问答
- 老师 (ESP32/主机) 点名: "学号 0x68 的同学 (MPU6050)"
- 学生 (MPU6050/从机) 回答: "到!" (ACK)
- 老师说: "请回答第 0x3B 题的内容" (读取寄存器)
- 学生回答: "加速度 X 高位 = 0x0A" (返回数据)
```

**MPU6050 关键寄存器 | MPU6050 Key Registers:**

```
寄存器地址  名称             内容
─────────────────────────────────────────────
0x6B     PWR_MGMT_1      电源管理 (0 = 唤醒)
0x19     SMPLRT_DIV      采样率分频
0x1A     CONFIG          数字低通滤波器 (DLPF)
0x1B     GYRO_CONFIG     陀螺仪量程
0x1C     ACCEL_CONFIG    加速度计量程
0x3B     ACCEL_XOUT_H    加速度 X 高字节
0x3C     ACCEL_XOUT_L    加速度 X 低字节
0x3D     ACCEL_YOUT_H    加速度 Y 高字节
0x3E     ACCEL_YOUT_L    加速度 Y 低字节
0x3F     ACCEL_ZOUT_H    加速度 Z 高字节
0x40     ACCEL_ZOUT_L    加速度 Z 低字节
0x41     TEMP_OUT_H      温度高字节
0x42     TEMP_OUT_L      温度低字节
0x43     GYRO_XOUT_H     陀螺仪 X 高字节
0x44     GYRO_XOUT_L     陀螺仪 X 低字节
0x45     GYRO_YOUT_H     陀螺仪 Y 高字节
0x46     GYRO_YOUT_L     陀螺仪 Y 低字节
0x47     GYRO_ZOUT_H     陀螺仪 Z 高字节
0x48     GYRO_ZOUT_L     陀螺仪 Z 低字节
```

> **每个数据是 16 位（2 字节），高位在前（Big-Endian）。** 读取时先读高字节，再读低字节，拼成一个 int16_t。

> **Each data value is 16-bit (2 bytes), MSB first (Big-Endian).** Read high byte first, then low byte, combine into int16_t.

---

### 3. 坐标系与物理意义 | Coordinate System & Physical Meaning (1h)

**为什么坐标系很重要？** 如果坐标系搞反了，机器人会"感觉"自己向左倾斜，但实际上是向右，结果越纠正越歪。

**Why is the coordinate system important?** If the coordinate system is wrong, the robot "feels" it's tilting left when it's actually tilting right, causing it to worsen the tilt instead of correcting it.

```
MPU6050 坐标系 (右手坐标系):

          Y (前/Forward)
          ↑
          │
          │
          │
          └──────────→ X (右/Right)
         ╱
        ╱
       ↓
      Z (下/Down)

当 MPU6050 水平放置时:
  Ax ≈ 0    (X轴没有重力分量)
  Ay ≈ 0    (Y轴没有重力分量)
  Az ≈ 1g   (Z轴承受全部重力)

当 MPU6050 向前倾斜时 (绕 X 轴旋转, pitch):
  Ax ≈ 0
  Ay ≈ sin(θ) × 1g
  Az ≈ cos(θ) × 1g

当 MPU6050 向右倾斜时 (绕 Y 轴旋转, roll):
  Ax ≈ sin(φ) × 1g
  Ay ≈ 0
  Az ≈ cos(φ) × 1g
```

**从加速度计算倾角 | Calculating Tilt from Accelerometer:**

```
加速度计测量的是重力加速度在各轴的分量。
The accelerometer measures gravity components on each axis.

当机器人前后倾斜角度 θ (pitch) 时:

         重力 g (1g, 方向向下)
          ↓
          │
          │  θ (倾斜角)
          │ ╱
          │╱
    ──────┼──────  MPU6050 传感器
          │
          │ Y轴分量
          ↓
         Ay = g × sin(θ)

    所以: θ = arcsin(Ay / g)

但更精确的做法是同时用 Y 和 Z:
    θ = atan2(Ay, Az)

atan2 比 arcsin 更好的原因:
- arcsin 在 ±90° 附近非常不灵敏
- atan2 在整个 ±180° 范围内线性度好
- atan2 不受重力大小变化的影响

Why atan2 is better than arcsin:
- arcsin is insensitive near ±90 degrees
- atan2 has good linearity across ±180 degrees
- atan2 is unaffected by gravity magnitude changes
```

---

## 下午 (4h) | Afternoon Session

### 4. 接线与读取原始数据 | Wiring & Reading Raw Data (1.5h)

**MPU6050 接线图 | MPU6050 Wiring Diagram:**

```
ESP32 ←→ MPU6050 模块接线:

ESP32          MPU6050 模块
──────         ────────────
3V3    ───→    VCC
GND    ───→    GND
GPIO21 ───→    SDA     (I2C 数据线)
GPIO22 ───→    SCL     (I2C 时钟线)

可选:
GPIOxx ───→    AD0     (地址选择: LOW=0x68, HIGH=0x69)
GPIOxx ←──     INT     (中断输出, 暂时不用)

⚠️ 注意:
- 模块上通常已有上拉电阻, 不需要外接
- 如果使用 5V 供电, 确认模块有 3.3V 稳压器
- SDA/SCL 不要接反! SDA=数据, SCL=时钟
```

**代码: 读取 MPU6050 原始数据 | Code: Reading MPU6050 Raw Data:**

```cpp
/**
 * MPU6050 原始数据读取
 * MPU6050 Raw Data Reading
 *
 * 笨鸟先飞:
 * - 我们用 Adafruit MPU6050 库, 它封装了底层的 I2C 通信
 * - 也可以用 Wire 库直接读写寄存器, 但库更方便
 * - platformio.ini 添加: lib_deps = adafruit/Adafruit MPU6050 @ ^2.2
 *                        lib_deps = adafruit/Adafruit Unified Sensor @ ^1.1
 *                        lib_deps = adafruit/Adafruit BusIO @ ^1.14
 *
 * We use the Adafruit MPU6050 library which wraps I2C communication.
 * platformio.ini: lib_deps = adafruit/Adafruit MPU6050 @ ^2.2
 *                 lib_deps = adafruit/Adafruit Unified Sensor @ ^1.1
 */

#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

// 创建 MPU6050 对象
// Create MPU6050 object
Adafruit_MPU6050 mpu;

void setup() {
  Serial.begin(115200);

  // 初始化 I2C (ESP32 默认 SDA=GPIO21, SCL=GPIO22)
  Wire.begin();

  Serial.println("MPU6050 初始化中... | Initializing MPU6050...");

  // 检测 MPU6050 是否存在
  if (!mpu.begin()) {
    Serial.println("错误: 未检测到 MPU6050!");
    Serial.println("Error: MPU6050 not detected!");
    Serial.println("请检查: 1.接线 2.I2C地址(0x68或0x69) 3.供电");
    while (1) {
      delay(10);  // 停在这里
    }
  }

  Serial.println("MPU6050 找到了! | MPU6050 found!");

  // 配置加速度计量程
  // Configure accelerometer range
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  // 可选: 2_G, 4_G, 8_G, 16_G
  // 对于自平衡机器人, 2G 或 4G 就够了
  // For self-balancing robot, 2G or 4G is sufficient

  // 配置陀螺仪量程
  // Configure gyroscope range
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  // 可选: 250_DEG, 500_DEG, 1000_DEG, 2000_DEG
  // 对于自平衡机器人, 500°/s 通常够用
  // For self-balancing robot, 500 deg/s is usually sufficient

  // 配置带宽 (滤波器)
  // Configure bandwidth (filter)
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  // 低通滤波: 减少高频噪声
  // 可选: 260_HZ, 184_HZ, 94_HZ, 44_HZ, 21_HZ, 10_HZ, 5_HZ
  // 越低噪声越小, 但响应越慢
  // Lower = less noise but slower response

  Serial.println("配置完成! | Configuration complete!");
  Serial.println("Accel X(m/s²)\tY\t\tZ\t\tGyro X(°/s)\tY\t\tZ");
}

void loop() {
  // 读取传感器数据
  // Read sensor data
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // a.acceleration.x/y/z → 加速度 (m/s²)
  // g.gyro.x/y/z         → 角速度 (°/s)
  // temp.temperature      → 温度 (°C)

  // 打印加速度 (单位: m/s², 1g ≈ 9.8 m/s²)
  // Print acceleration (unit: m/s², 1g ≈ 9.8 m/s²)
  Serial.print("A: ");
  Serial.print(a.acceleration.x, 2); Serial.print("\t");
  Serial.print(a.acceleration.y, 2); Serial.print("\t");
  Serial.print(a.acceleration.z, 2); Serial.print("\t");

  // 打印角速度 (单位: °/s)
  // Print angular velocity (unit: °/s)
  Serial.print("G: ");
  Serial.print(g.gyro.x, 2); Serial.print("\t");
  Serial.print(g.gyro.y, 2); Serial.print("\t");
  Serial.println(g.gyro.z, 2);

  delay(50);  // 20Hz 采样率
               // 20Hz sampling rate
}
```

**预期输出 | Expected Output:**

```
MPU6050 水平放置时:
A: 0.12  -0.05  9.78    G: 0.3  -0.1  0.2

解读:
- Ax ≈ 0    → X轴没有明显加速度
- Ay ≈ 0    → Y轴没有明显加速度
- Az ≈ 9.8  → Z轴感受到 1g 重力 = 传感器正面朝上!
- Gx/Gy/Gz ≈ 0 → 没有旋转

倾斜传感器时:
A: 3.50   5.20   7.80    G: 12.5  25.3  1.2

解读:
- Ax 和 Ay 不再为 0 → 重力分量出现在这些轴上
- Gx/Gy 有值 → 正在旋转!
```

> **动手实验:**
> 1. 水平放置 MPU6050，观察 Ax/Ay/Az 的值
> 2. 向前倾斜（绕 X 轴旋转），观察 Ay 和 Az 的变化
> 3. 向右倾斜（绕 Y 轴旋转），观察 Ax 和 Az 的变化
> 4. 快速旋转，观察陀螺仪 Gx/Gy/Gz 的变化

> **Hands-on experiment:**
> 1. Place MPU6050 flat, observe Ax/Ay/Az values
> 2. Tilt forward (rotate around X axis), observe Ay and Az changes
> 3. Tilt right (rotate around Y axis), observe Ax and Az changes
> 4. Quickly rotate, observe gyroscope Gx/Gy/Gz changes

---

### 5. 姿态角计算与互补滤波 | Angle Calculation & Complementary Filter (1.5h)

**两种计算角度的方法 | Two Methods for Calculating Angle:**

```
方法 1: 从加速度计计算角度
Method 1: Calculate angle from accelerometer

θ_acc = atan2(Ay, Az) × (180/π)

优点: 长期稳定 (始终指向真实重力方向)
缺点: 短期噪声大 (运动时加速度不只是重力, 还有振动加速度)

类比: 铅垂线 -- 最终指向正确方向, 但会晃来晃去
Analogy: Plumb line -- eventually points correctly, but swings around


方法 2: 从陀螺仪积分计算角度
Method 2: Integrate gyroscope to get angle

θ_gyro += Gx × dt    (每段时间加上角速度 × 时间)

优点: 短期精确 (不受线性加速度干扰)
缺点: 长期漂移 (积分误差不断累积)

类比: 闭眼走路 -- 一开始方向对, 但越走越歪
Analogy: Walking with eyes closed -- correct at first, but drifts over time


最佳方案: 融合两者!
Best solution: Fuse both!
```

**互补滤波器 | Complementary Filter:**

```
互补滤波的核心公式:
The core formula of complementary filter:

  θ = α × (θ + gyro × dt) + (1 - α) × acc_angle

展开理解:
  θ_new = α × (θ_old + gyroscope_angle_change)
        + (1 - α) × accelerometer_angle

其中:
  α = 0.96 ~ 0.98 (典型值)
  α 越大 → 越信任陀螺仪 (响应快, 但可能漂移)
  α 越小 → 越信任加速度计 (抗漂移, 但噪声大)

直觉理解:
  "大部分时候相信陀螺仪(96%), 但时不时参考加速度计(4%)来纠正漂移"

Intuition:
  "Mostly trust the gyroscope (96%), but periodically reference
   the accelerometer (4%) to correct drift"
```

```cpp
/**
 * 姿态角计算 - 互补滤波器
 * Attitude Estimation - Complementary Filter
 *
 * 笨鸟先飞:
 * - 互补滤波是最简单的传感器融合算法
 * - 只需要一行公式, 效果却非常好
 * - 它之所以叫"互补", 是因为陀螺仪的短期优势和加速度计的长期优势互补
 *
 * The complementary filter is the simplest sensor fusion algorithm.
 * Just one line of formula, yet very effective.
 * It's called "complementary" because gyroscope's short-term strength
 * and accelerometer's long-term strength complement each other.
 */

#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

Adafruit_MPU6050 mpu;

// 互补滤波参数
// Complementary filter parameters
float alpha = 0.96;   // 陀螺仪权重 (0.0 ~ 1.0)
                       // Gyroscope weight

// 角度状态
// Angle state
float pitch = 0;  // 前后倾斜角 (度)
                   // Front-back tilt angle (degrees)
float roll = 0;   // 左右倾斜角 (度)
                   // Left-right tilt angle (degrees)

// 时间记录
unsigned long lastTime = 0;

// 陀螺仪零偏 (校准值)
// Gyroscope bias (calibration values)
float gyroBiasX = 0, gyroBiasY = 0, gyroBiasZ = 0;

// 校准函数
void calibrateGyro() {
  Serial.println("校准陀螺仪... 请保持传感器静止! | Calibrating gyro... Keep still!");

  float sumX = 0, sumY = 0, sumZ = 0;
  int samples = 1000;

  sensors_event_t a, g, temp;

  for (int i = 0; i < samples; i++) {
    mpu.getEvent(&a, &g, &temp);
    sumX += g.gyro.x;
    sumY += g.gyro.y;
    sumZ += g.gyro.z;
    delay(2);
  }

  gyroBiasX = sumX / samples;
  gyroBiasY = sumY / samples;
  gyroBiasZ = sumZ / samples;

  Serial.print("陀螺仪零偏 | Gyro bias: ");
  Serial.print(gyroBiasX, 4); Serial.print(", ");
  Serial.print(gyroBiasY, 4); Serial.print(", ");
  Serial.println(gyroBiasZ, 4);
}

void setup() {
  Serial.begin(115200);
  Wire.begin();

  if (!mpu.begin()) {
    Serial.println("MPU6050 未检测到! | MPU6050 not detected!");
    while (1) delay(10);
  }

  mpu.setAccelerometerRange(MPU6050_RANGE_4_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);

  // 校准陀螺仪
  calibrateGyro();

  lastTime = micros();
  Serial.println("角度计算开始 | Angle calculation started");
  Serial.println("Pitch(°)\tRoll(°)\tAcc_pitch\tAcc_roll\tGyro_rate");
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // 计算时间间隔 (秒)
  // Calculate time interval (seconds)
  unsigned long now = micros();
  float dt = (now - lastTime) / 1000000.0;
  lastTime = now;

  // ============================================
  // 步骤 1: 从加速度计计算角度
  // Step 1: Calculate angle from accelerometer
  // ============================================

  // Pitch (前后倾斜, 绕 X 轴旋转)
  float accPitch = atan2(a.acceleration.y, a.acceleration.z) * RAD_TO_DEG;

  // Roll (左右倾斜, 绕 Y 轴旋转)
  float accRoll = atan2(a.acceleration.x, a.acceleration.z) * RAD_TO_DEG;

  // ============================================
  // 步骤 2: 从陀螺仪获取角速度 (减去零偏)
  // Step 2: Get angular velocity from gyroscope (subtract bias)
  // ============================================

  float gyroX = g.gyro.x - gyroBiasX;  // °/s
  float gyroY = g.gyro.y - gyroBiasY;  // °/s

  // ============================================
  // 步骤 3: 互补滤波融合!
  // Step 3: Complementary filter fusion!
  // ============================================

  // 核心: 一行公式完成传感器融合
  // Core: One line of formula for sensor fusion
  //
  // pitch = α × (旧角度 + 陀螺仪变化量) + (1-α) × 加速度计角度
  // pitch = α × (old_angle + gyro_change) + (1-α) × accel_angle

  pitch = alpha * (pitch + gyroX * dt) + (1 - alpha) * accPitch;
  roll  = alpha * (roll  + gyroY * dt) + (1 - alpha) * accRoll;

  // ============================================
  // 步骤 4: 输出结果
  // Step 4: Output results
  // ============================================

  Serial.print(pitch, 2);   Serial.print("\t");
  Serial.print(roll, 2);    Serial.print("\t");
  Serial.print(accPitch, 2); Serial.print("\t");
  Serial.print(accRoll, 2);  Serial.print("\t");
  Serial.println(gyroX, 2);

  delay(10);  // ~100Hz 采样
               // ~100Hz sampling
}
```

**实验: 验证互补滤波效果 | Experiment: Verify Complementary Filter:**

1. **静止测试:** 传感器放桌上，pitch 和 roll 应该稳定在 0° 附近
2. **倾斜测试:** 向前倾斜 30°，pitch 应该显示 ~30°，而且非常稳定（不像纯加速度计那样抖动）
3. **漂移测试:** 倾斜后回到水平，角度应该回到 ~0°（不像纯陀螺仪那样漂移）
4. **运动测试:** 快速来回晃动，角度应该快速响应且最终稳定

---

### 6. 卡尔曼滤波简介 | Introduction to Kalman Filter (1h)

**为什么还要学卡尔曼滤波？** 互补滤波简单好用，但它是一个"固定比例"的融合。卡尔曼滤波更聪明 -- 它会根据传感器噪声的大小，自动调整信任程度。噪声大时更信任模型预测，信号好时更信任测量值。

**Why learn Kalman filter too?** The complementary filter is simple and effective, but uses a "fixed ratio" fusion. Kalman filter is smarter -- it automatically adjusts trust based on sensor noise levels. More trust in model prediction when noise is high, more trust in measurement when signal is good.

```
卡尔曼滤波核心思想 (Kalman Filter Core Idea):

1. 预测 (Predict):
   用上一时刻的状态预测当前状态
   Predict current state from previous state

   θ_predicted = θ_previous + gyro_rate × dt

2. 更新 (Update):
   用当前测量值修正预测
   Correct prediction with current measurement

   θ_estimated = θ_predicted + K × (acc_angle - θ_predicted)

   K = 卡尔曼增益 (0 ~ 1)
   K 大 → 更信任测量值 (加速度计)
   K 小 → 更信任预测值 (陀螺仪)

3. K 怎么计算?
   K = P / (P + R)

   P = 预测误差的方差 (我们对预测有多不确定)
   R = 测量噪声的方差 (加速度计有多噪)

   如果 P 很大 (预测不确定) → K 大 → 更信任测量
   如果 R 很大 (测量很噪) → K 小 → 更信任预测

完整的卡尔曼滤波方程 (简化, 一维):
Complete Kalman filter equations (simplified, 1D):

预测步骤 (Predict):
  θ̂⁻ = θ̂ + ω × dt           (状态预测)
  P⁻ = P + Q                  (误差协方差预测)

更新步骤 (Update):
  K = P⁻ / (P⁻ + R)          (卡尔曼增益)
  θ̂ = θ̂⁻ + K × (z - θ̂⁻)    (状态更新, z=测量值)
  P = (1 - K) × P⁻           (误差协方差更新)

其中:
  Q = 过程噪声 (陀螺仪的不确定性)
  R = 测量噪声 (加速度计的不确定性)
  P = 估计误差协方差
```

**代码: 简单卡尔曼滤波器实现 | Code: Simple Kalman Filter Implementation:**

```cpp
/**
 * 简单一维卡尔曼滤波器
 * Simple 1D Kalman Filter
 *
 * 笨鸟先飞:
 * - 卡尔曼滤波看起来公式复杂, 但代码其实很短
 * - 关键是理解"预测 + 修正"的思路
 * - 在我们的机器人中, 互补滤波通常就够用了
 * - 卡尔曼滤波在噪声很大或动态变化大时效果更好
 *
 * Kalman filter looks complex in formulas, but the code is short.
 * Key idea: "predict + correct".
 * For our robot, complementary filter is usually sufficient.
 * Kalman filter is better when noise is large or dynamics vary a lot.
 */

class SimpleKalman {
private:
  float angle;      // 估计角度 | estimated angle
  float bias;       // 陀螺仪零偏估计 | gyroscope bias estimate
  float rate;       // 无偏角速度 | unbiased angular rate

  float P[2][2];    // 误差协方差矩阵 | error covariance matrix
  float Q_angle;    // 角度过程噪声 | angle process noise
  float Q_bias;     // 零偏过程噪声 | bias process noise
  float R_measure;  // 测量噪声 | measurement noise

public:
  SimpleKalman() {
    // 初始化参数 (这些值需要根据实际情况调整)
    // Initialize parameters (tune these based on actual conditions)
    Q_angle = 0.001;    // 角度过程噪声 (越小→越信任陀螺仪预测)
    Q_bias = 0.003;     // 零偏过程噪声 (越小→零偏变化越慢)
    R_measure = 0.03;   // 测量噪声 (越大→越不信任加速度计)

    angle = 0;
    bias = 0;

    P[0][0] = 0;
    P[0][1] = 0;
    P[1][0] = 0;
    P[1][1] = 0;
  }

  // 输入: 新的陀螺仪读数(°/s), 新的加速度计角度(°), 时间间隔(s)
  // Input: new gyro reading (°/s), new accel angle (°), time interval (s)
  float update(float newGyro, float newAccAngle, float dt) {
    // ===== 预测步骤 (Predict Step) =====

    // 预测角度: 上一时刻角度 + (陀螺仪读数 - 估计零偏) × dt
    // Predict angle: previous angle + (gyro reading - estimated bias) × dt
    rate = newGyro - bias;
    angle += rate * dt;

    // 更新误差协方差 (预测变得更不确定)
    // Update error covariance (prediction becomes more uncertain)
    P[0][0] += dt * (dt * P[1][1] - P[0][1] - P[1][0] + Q_angle);
    P[0][1] -= dt * P[1][1];
    P[1][0] -= dt * P[1][1];
    P[1][1] += Q_bias * dt;

    // ===== 更新步骤 (Update Step) =====

    // 计算卡尔曼增益
    // Calculate Kalman gain
    float S = P[0][0] + R_measure;  // 总不确定度
    float K[2];
    K[0] = P[0][0] / S;             // 角度增益
    K[1] = P[1][0] / S;             // 零偏增益

    // 计算创新 (测量值 - 预测值)
    // Calculate innovation (measurement - prediction)
    float y = newAccAngle - angle;

    // 修正估计值
    // Correct estimates
    angle += K[0] * y;
    bias += K[1] * y;

    // 更新误差协方差 (修正后更确定)
    // Update error covariance (more certain after correction)
    float P00_temp = P[0][0];
    float P01_temp = P[0][1];

    P[0][0] -= K[0] * P00_temp;
    P[0][1] -= K[0] * P01_temp;
    P[1][0] -= K[1] * P00_temp;
    P[1][1] -= K[1] * P01_temp;

    return angle;
  }

  float getAngle() { return angle; }
};
```

**在主程序中使用卡尔曼滤波 | Using Kalman Filter in Main Program:**

```cpp
// 在之前的互补滤波代码基础上, 替换滤波部分:

SimpleKalman kalmanPitch;
SimpleKalman kalmanRoll;

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  unsigned long now = micros();
  float dt = (now - lastTime) / 1000000.0;
  lastTime = now;

  // 加速度计角度
  float accPitch = atan2(a.acceleration.y, a.acceleration.z) * RAD_TO_DEG;
  float accRoll = atan2(-a.acceleration.x, a.acceleration.z) * RAD_TO_DEG;

  // 陀螺仪角速度 (减去校准零偏)
  float gyroX = (g.gyro.x - gyroBiasX) * RAD_TO_DEG;
  float gyroY = (g.gyro.y - gyroBiasY) * RAD_TO_DEG;

  // 卡尔曼滤波更新
  float kalmanPitchVal = kalmanPitch.update(gyroX, accPitch, dt);
  float kalmanRollVal = kalmanRoll.update(gyroY, accRoll, dt);

  Serial.print("KF_Pitch: "); Serial.print(kalmanPitchVal, 2);
  Serial.print(" KF_Roll: "); Serial.println(kalmanRollVal, 2);

  delay(10);
}
```

**互补滤波 vs 卡尔曼滤波 | Complementary vs Kalman Filter:**

| 对比项 | 互补滤波 | 卡尔曼滤波 |
|--------|----------|------------|
| 代码复杂度 | 极简 (1行) | 中等 (一个类) |
| 计算量 | 极小 | 小 |
| 效果 | 很好 | 略好 |
| 参数调整 | 1个参数 (α) | 3个参数 (Q_angle, Q_bias, R) |
| 适用场景 | 大多数机器人项目 | 需要最优估计的场景 |
| 推荐 | 初学者首选 | 进阶优化用 |

> **我们的建议: 先用互补滤波，让机器人跑起来。** 如果效果不够好，再切换到卡尔曼滤波。"先跑通，再优化"是工程实践的重要原则。

> **Our recommendation: Start with the complementary filter, get the robot running.** If results aren't good enough, then switch to Kalman. "Get it working first, then optimize" is a key engineering principle.

---

## 常见问题与排查 | Common Issues & Troubleshooting

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| "MPU6050 not detected" | 接线错误、地址不对 | 检查 SDA/SCL 接线；运行 I2C Scanner 扫描地址 |
| I2C Scanner 找不到设备 | 上拉电阻缺失、供电不足 | 确认模块有上拉电阻；检查 3.3V 供电 |
| 加速度计读数全为 0 | 传感器未唤醒 | 写入 `0x00` 到寄存器 `0x6B` 唤醒 |
| 角度跳动很大 | 低通滤波带宽太高 | 降低带宽到 21Hz 或 10Hz |
| 角度缓慢漂移 | 陀螺仪零偏未校准 | 上电时保持静止，执行零偏校准 |
| pitch 和 roll 混淆 | 坐标系定义不对 | 确认 MPU6050 安装方向与代码坐标系一致 |
| 互补滤波 alpha 不知怎么调 | 无经验值 | 从 0.96 开始，观察效果；振动大则减小 |
| 卡尔曼滤波效果差 | Q/R 参数不对 | Q_angle=0.001, Q_bias=0.003, R=0.03 作为起点 |

**I2C 地址扫描工具 | I2C Address Scanner Tool:**

```cpp
/**
 * I2C 扫描器 - 找到总线上所有设备的地址
 * I2C Scanner - Find addresses of all devices on the bus
 */

#include <Wire.h>

void setup() {
  Serial.begin(115200);
  Wire.begin();

  Serial.println("I2C Scanner 开始扫描... | I2C Scanner starting...");

  int deviceCount = 0;

  for (byte addr = 1; addr < 127; addr++) {
    Wire.beginTransmission(addr);
    byte error = Wire.endTransmission();

    if (error == 0) {
      Serial.print("找到设备! 地址: 0x");
      if (addr < 16) Serial.print("0");
      Serial.print(addr, HEX);

      if (addr == 0x68 || addr == 0x69) {
        Serial.print(" (可能是 MPU6050)");
      }
      Serial.println();
      deviceCount++;
    }
  }

  Serial.print("扫描完成! 找到 "); Serial.print(deviceCount); Serial.println(" 个设备");
}

void loop() {
  delay(5000);
}
```

---

## 今日作业 | Today's Task

1. **必做 | Required:** 完成 MPU6050 原始数据读取，确认加速度计和陀螺仪数据正常
   Complete MPU6050 raw data reading, confirm accel and gyro data are normal.

2. **必做 | Required:** 实现互补滤波器，倾斜传感器时角度显示正确且稳定
   Implement complementary filter; angle displays correctly and stably when tilting sensor.

3. **必做 | Required:** 对比纯加速度计角度、纯陀螺仪积分角度和互补滤波角度，记录观察结果
   Compare pure accel angle, pure gyro integral angle, and complementary filter angle; record observations.

4. **选做 | Optional:** 实现卡尔曼滤波器，与互补滤波结果对比
   Implement Kalman filter and compare with complementary filter results.

5. **思考 | Reflection:** 如果机器人在运行中发生振动（电机转动引起），这会如何影响加速度计的读数？互补滤波能解决这个问题吗？
   If the robot vibrates during operation (caused by motor spinning), how does this affect accelerometer readings? Can the complementary filter handle this?

---

## 今日检查点 | Checkpoint

- [ ] MPU6050 检测成功 (I2C 通信正常)?
  MPU6050 detected (I2C communication working)?
- [ ] 加速度计原始数据合理? (水平放置 Az ≈ 9.8)
  Accelerometer raw data reasonable? (Az ≈ 9.8 when flat)
- [ ] 陀螺仪原始数据合理? (静止时接近 0, 旋转时有变化)
  Gyroscope raw data reasonable? (near 0 when still, changes when rotating)
- [ ] 从加速度计计算的角度正确? (倾斜 30° 时显示 ~30°)
  Angle from accelerometer correct? (~30° when tilted 30°)
- [ ] 互补滤波后的角度稳定且准确?
  Complementary filtered angle stable and accurate?
- [ ] 你能解释互补滤波公式中 α 的含义吗?
  Can you explain the meaning of α in the complementary filter formula?
- [ ] 你理解为什么需要同时使用加速度计和陀螺仪吗?
  Do you understand why we need both accelerometer and gyroscope?

---

## 参考资源 | References

- [MPU6050 数据手册](https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/)
- [Adafruit MPU6050 库文档](https://github.com/adafruit/Adafruit_MPU6050)
- [互补滤波器详解 (英文)](http://www.pieter-jan.com/node/11)
- [卡尔曼滤波入门 (B站)](https://search.bilibili.com/all?keyword=%E5%8D%A1%E5%B0%94%E6%9B%BC%E6%BB%A4%E6%B3%A2%20%E5%85%A5%E9%97%A8)
- [I2C 协议详解](https://learn.sparkfun.com/tutorials/i2c/all)
- [IMU 姿态解算系列教程](https://zhuanlan.zhihu.com/p/vnd imu)

---

*最后更新: 2026-05-27*
