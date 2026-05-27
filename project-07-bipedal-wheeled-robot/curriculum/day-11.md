# Day 11: 系统集成与美化 | System Integration & Finishing

## 今日目标 | Today's Goals
- 完成 3D 打印零件与电子元件的组装
- Complete assembly of 3D printed parts with electronic components
- 掌握线缆管理和布线技巧，确保系统整洁可靠
- Master cable management and wiring techniques for a clean, reliable system
- 完成最终参数调优和多表面测试
- Complete final parameter tuning and multi-surface testing
- 为项目展示做准备（外观美化、性能记录）
- Prepare for project presentation (aesthetics, performance recording)

---

## 上午 (3h) | Morning Session

### 1. 机械组装 (1.5h) | Mechanical Assembly

#### 组装工具清单 | Assembly Tools Checklist

```
必备工具 | Required Tools:
═══════════════════════════════════════
□ 十字螺丝刀 (PH1, PH2) | Phillips screwdrivers (PH1, PH2)
□ 六角扳手套装 (1.5-5mm) | Hex key set (1.5-5mm)
□ 尖嘴钳 | Needle-nose pliers
□ 剥线钳 | Wire strippers
□ 热缩管 (多种规格) | Heat shrink tubing (various sizes)
□ 扎带 (多种长度) | Zip ties (various lengths)
□ M2/M3 螺丝和螺母套装 | M2/M3 screw and nut set
□ 双面胶/海绵胶 | Double-sided / foam tape
□ 热熔胶枪（备用固定）| Hot glue gun (backup fastening)
□ 万用表 | Multimeter
```

#### 组装顺序 | Assembly Sequence

```
组装顺序（严格按此顺序执行）| Assembly Sequence (Follow Strictly):

阶段1: 底盘 + 电机 | Phase 1: Chassis + Motors
═══════════════════════════════════════
  ┌──────────────────────────────────────────┐
  │ Step 1.1: 检查所有打印件尺寸和配合        │
  │          Verify all printed parts fit     │
  │                                          │
  │ Step 1.2: 安装底部底盘板                  │
  │          Install bottom chassis plate     │
  │                                          │
  │ Step 1.3: 安装电机座到底盘                │
  │          Mount motor brackets to chassis  │
  │          (M3x8 螺丝，不要太紧)            │
  │          (M3x8 screws, don't overtighten) │
  │                                          │
  │ Step 1.4: 安装 BLDC 电机到电机座          │
  │          Mount BLDC motors to brackets    │
  │                                          │
  │ Step 1.5: 安装轮子/轮毂到电机轴           │
  │          Attach wheels/hubs to motor shaft│
  └──────────────────────────────────────────┘

阶段2: 腿部机构 | Phase 2: Leg Mechanism
═══════════════════════════════════════
  ┌──────────────────────────────────────────┐
  │ Step 2.1: 组装舵机支架                    │
  │          Assemble servo brackets          │
  │                                          │
  │ Step 2.2: 将舵机装入支架                  │
  │          Mount servos into brackets        │
  │          (先调到中位 90°再安装)            │
  │          (Center at 90° before mounting)  │
  │                                          │
  │ Step 2.3: 安装髋关节到舵机输出轴          │
  │          Attach hip joints to servo horn  │
  │                                          │
  │ Step 2.4: 安装腿部连杆                    │
  │          Attach leg linkage rods           │
  │                                          │
  │ Step 2.5: 安装膝关节和足部                │
  │          Attach knee joints and feet       │
  │                                          │
  │ Step 2.6: 将腿组件安装到底盘              │
  │          Mount leg assemblies to chassis  │
  └──────────────────────────────────────────┘

阶段3: 电子安装 | Phase 3: Electronics
═══════════════════════════════════════
  ┌──────────────────────────────────────────┐
  │ Step 3.1: 安装 ESP32 到安装座             │
  │          Mount ESP32 to its bracket        │
  │                                          │
  │ Step 3.2: 安装 IMU (MPU6050) 到 IMU 座    │
  │          Mount MPU6050 to IMU bracket      │
  │    ⚠️ IMU 必须紧贴底盘，方向正确！        │
  │    ⚠️ IMU must be flush on chassis,       │
  │       oriented correctly!                 │
  │                                          │
  │ Step 3.3: 安装电机驱动板                  │
  │          Mount motor driver board          │
  │                                          │
  │ Step 3.4: 安装降压模块 (BEC)              │
  │          Mount voltage regulator (BEC)     │
  │                                          │
  │ Step 3.5: 安装电池座和电池                │
  │          Mount battery holder and battery  │
  └──────────────────────────────────────────┘

阶段4: 顶部盖板 | Phase 4: Top Cover
═══════════════════════════════════════
  ┌──────────────────────────────────────────┐
  │ Step 4.1: 整理并固定所有线缆              │
  │          Organize and secure all cables    │
  │                                          │
  │ Step 4.2: 安装顶盖                        │
  │          Install top cover                 │
  │                                          │
  │ Step 4.3: 最后检查所有螺丝紧固            │
  │          Final check all screws tightened │
  └──────────────────────────────────────────┘
```

#### 螺丝规格参考 | Screw Specification Reference

```
螺丝使用指南 | Screw Usage Guide:
═══════════════════════════════════════════

M2x4  → 舵机支架固定 | Servo bracket mounting
M2x6  → MPU6050 安装 | MPU6050 mounting
M2.5x6 → ESP32 安装 | ESP32 mounting
M3x6  → 小型部件固定 | Small component fastening
M3x8  → 电机座固定 | Motor bracket mounting
M3x10 → 底盘板连接 | Chassis plate connection
M3x12 → 腿部关节螺栓 | Leg joint bolts (with nyloc nuts)

⚠️ 注意事项 | Notes:
- 铝件用不锈钢螺丝 | Stainless screws for aluminum parts
- 塑料件可用自攻螺丝（但 3D 打印件建议预先攻丝）
- Self-tapping for plastic (but tap 3D printed holes first)
- 所有关节螺栓用尼龙螺母防松 | Nyloc nuts on all joint bolts
- 不要过度拧紧塑料件（会开裂）| Don't overtighten plastic (will crack)
```

---

### 2. 线缆管理与电气连接 (1.5h) | Cable Management & Electrical Connections

#### 接线图 | Wiring Diagram

```
电气接线总图 | Complete Wiring Diagram:
═══════════════════════════════════════════════════════════════

                    ┌──────────────┐
                    │   锂电池      │
                    │ 7.4V 2S LiPo │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ BEC 5V   │ │电机驱动   │ │ ESP32    │
        │ 降压模块  │ │Motor drv │ │ (via VIN │
        │ (3A)     │ │          │ │  or 5V)  │
        └─────┬────┘ └─────┬────┘ └─────┬────┘
              │            │            │
              ▼            ▼            │
        ┌──────────┐ ┌──────────┐      │
        │ 舵机 x4  │ │BLDC 电机 │      │
        │ Servos   │ │Motor L/R │      │
        └──────────┘ └──────────┘      │
                                       │
              ┌────────────────────────┤
              │            │           │
              ▼            ▼           ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ MPU6050  │ │ 蓝牙模块  │ │ 编码器   │
        │ IMU      │ │ Bluetooth │ │ Encoder  │
        │ (I2C)    │ │ (Serial)  │ │ (GPIO)   │
        └──────────┘ └──────────┘ └──────────┘

ESP32 引脚分配表 | ESP32 Pin Assignment:
═════════════════════════════════════════════════════════════
┌───────────────┬────────┬──────────────────────────────┐
│ 功能 Function │ 引脚 Pin│ 说明 Description              │
├───────────────┼────────┼──────────────────────────────┤
│ SDA (I2C)     │ GPIO21 │ MPU6050 数据线 Data line      │
│ SCL (I2C)     │ GPIO22 │ MPU6050 时钟线 Clock line     │
│ Hip Left      │ GPIO25 │ 左髋舵机 Left hip servo       │
│ Knee Left     │ GPIO26 │ 左膝舵机 Left knee servo      │
│ Hip Right     │ GPIO27 │ 右髋舵机 Right hip servo      │
│ Knee Right    │ GPIO14 │ 右膝舵机 Right knee servo     │
│ Motor PWM L   │ GPIO12 │ 左电机 PWM Left motor PWM     │
│ Motor PWM R   │ GPIO13 │ 右电机 PWM Right motor PWM    │
│ Motor Dir L   │ GPIO32 │ 左电机方向 Left motor dir     │
│ Motor Dir R   │ GPIO33 │ 右电机方向 Right motor dir    │
│ Motor EN      │ GPIO2  │ 电机使能 Motor enable         │
│ Encoder L A   │ GPIO4  │ 左编码器A Left encoder A      │
│ Encoder L B   │ GPIO5  │ 左编码器B Left encoder B      │
│ Encoder R A   │ GPIO16 │ 右编码器A Right encoder A     │
│ Encoder R B   │ GPIO17 │ 右编码器B Right encoder B     │
│ Battery ADC   │ GPIO34 │ 电池电压检测 Battery voltage   │
│ Bluetooth TX  │ GPIO1  │ 蓝牙串口 BT serial TX         │
│ Bluetooth RX  │ GPIO3  │ 蓝牙串口 BT serial RX         │
│ LED Status    │ GPIO2  │ 状态指示灯 Status LED (onboard)│
└───────────────┴────────┴──────────────────────────────┘

⚠️ 注意：GPIO34-39 只能做输入（ADC）| Note: GPIO34-39 input only (ADC)
⚠️ 注意：GPIO6-11 被内部 Flash 占用 | Note: GPIO6-11 used by internal Flash
```

#### 线缆管理技巧 | Cable Management Tips

```
线缆整理要点 | Cable Organization Key Points:

1. 线长控制 | Wire Length Control
   ──────────────────────────────
   - 测量实际距离后再裁线 | Measure actual distance before cutting
   - 预留 1-2cm 余量 | Reserve 1-2cm extra length
   - 过长的线会占用空间、增加电阻 | Excess wire wastes space, adds resistance

2. 线束分组 | Wire Bundle Grouping
   ──────────────────────────────
   按功能分组用扎带固定 | Group by function, secure with zip ties:
   ┌──────────────────┬─────────────────────────┐
   │ 组别 Group        │ 包含 Includes            │
   ├──────────────────┼─────────────────────────┤
   │ 电源线 Power      │ 电池+/-, BEC输入输出     │
   │ I2C 总线          │ SDA, SCL, VCC, GND      │
   │ 舵机线 Servos     │ 4x 舵机信号线+电源       │
   │ 电机线 Motors     │ 2x PWM, 2x DIR, EN      │
   │ 编码器 Encoders   │ 4x 信号线+电源           │
   └──────────────────┴─────────────────────────┘

3. 固定方式 | Securing Methods
   ──────────────────────────────
   - 扎带：固定线束到结构件 | Zip ties: secure bundles to structure
   - 热缩管：保护连接点 | Heat shrink: protect connections
   - 双面胶：固定小板子 | Double-sided tape: mount small boards
   - 线槽/导管（如有空间）| Cable channels/conduit (if space allows)

4. 避免干扰 | Avoiding Interference
   ──────────────────────────────
   ⚠️ 电机线与信号线分开走线
   ⚠️ Separate motor wires from signal wires
   ⚠️ I2C 线尽量短且远离电机驱动
   ⚠️ Keep I2C wires short and away from motor drivers
```

#### 电气安全检查 | Electrical Safety Check

```cpp
// 上电前检查代码 | Pre-Power Checklist Code
// 在 setup() 中添加以下检查 | Add these checks in setup()

void prePowerCheck() {
    Serial.println("═══ 上电前检查 | Pre-Power Check ═══");

    // 1. 检查电池电压 | Check battery voltage
    float vbat = readBatteryVoltage();
    Serial.printf("电池电压 Battery: %.2fV", vbat);
    if (vbat < 6.4) {
        Serial.println(" ⚠️ 电压过低！请充电 | Voltage too low! Charge battery");
        while (1);  // 停止 | Halt
    } else if (vbat > 8.4) {
        Serial.println(" ⚠️ 电压过高！请检查 | Voltage too high! Check");
        while (1);
    } else {
        Serial.println(" ✓ 正常 OK");
    }

    // 2. 检查 IMU 连接 | Check IMU connection
    Wire.beginTransmission(0x68);  // MPU6050 地址 | MPU6050 address
    if (Wire.endTransmission() == 0) {
        Serial.println("IMU 连接 ✓ | IMU connected OK");
    } else {
        Serial.println("IMU 连接失败！请检查接线 | IMU failed! Check wiring");
        while (1);
    }

    // 3. 逐一测试舵机响应 | Test each servo response
    Serial.println("测试舵机 | Testing servos...");
    for (int i = 0; i < NUM_SERVOS; i++) {
        servos[i].servo.write(90);
        delay(100);
        Serial.printf("  舵机 %d (%s): 90° 已发送 | 90° sent\n",
                      i, servos[i].name);
    }

    // 4. 测试电机驱动（低速）| Test motor drivers (low speed)
    Serial.println("测试电机（低速）| Testing motors (low speed)...");
    setMotorSpeed(0.1);
    delay(500);
    setMotorSpeed(0.0);
    Serial.println("  电机测试完成 | Motor test complete");

    Serial.println("═══ 所有检查通过！| All checks passed! ═══");
}
```

---

## 下午 (4h) | Afternoon Session

### 2. 最终参数调优 (2h) | Final Parameter Tuning

#### PID 参数调优流程 | PID Parameter Tuning Process

```
PID 调优步骤（齐格勒-尼科尔斯法）| PID Tuning Steps (Ziegler-Nichols):

步骤1: 只用 P 控制 | Step 1: P-only Control
──────────────────────────────
  Ki = 0, Kd = 0
  从 Kp = 5 开始，逐步增大
  Start from Kp = 5, gradually increase
  直到机器人出现持续振荡
  Until sustained oscillation occurs
  记录临界增益 Ku 和振荡周期 Tu
  Record critical gain Ku and oscillation period Tu

步骤2: 计算 PID 参数 | Step 2: Calculate PID Parameters
──────────────────────────────
  Kp = 0.6 × Ku
  Ki = 2 × Kp / Tu
  Kd = Kp × Tu / 8

步骤3: 微调 | Step 3: Fine Tune
──────────────────────────────
  - 振荡太强 → 减小 Kp | Too much oscillation → decrease Kp
  - 回中太慢 → 增大 Ki | Returns to center too slowly → increase Ki
  - 响应迟钝 → 增大 Kd | Sluggish response → increase Kd
  - 高频抖动 → 减小 Kd | High frequency jitter → decrease Kd
```

**参数调优代码 | Parameter Tuning Code:**

```cpp
// 实时调参通过蓝牙串口 | Real-time tuning via Bluetooth serial
void handleTuningCommand(char cmd, int value) {
    switch (cmd) {
        case 'P':  // 设置 Kp
            Kp = value / 10.0;  // 输入 250 → 25.0
            balancePID.SetTunings(Kp, Ki, Kd);
            Serial.printf("Kp = %.1f\n", Kp);
            break;
        case 'I':  // 设置 Ki
            Ki = value / 100.0;  // 输入 50 → 0.5
            balancePID.SetTunings(Kp, Ki, Kd);
            Serial.printf("Ki = %.2f\n", Ki);
            break;
        case 'D':  // 设置 Kd
            Kd = value / 10.0;  // 输入 8 → 0.8
            balancePID.SetTunings(Kp, Ki, Kd);
            Serial.printf("Kd = %.1f\n", Kd);
            break;
        case 'G':  // 打印当前参数 | Print current params
            Serial.printf("PID: Kp=%.1f Ki=%.2f Kd=%.1f\n", Kp, Ki, Kd);
            Serial.printf("角度 Angle=%.1f° 速度 Speed=%.2f\n", angle, currentSpeed);
            break;
    }
}

// 在 loop() 中处理调参命令 | Handle tuning commands in loop()
void loop() {
    if (SerialBT.available()) {
        String msg = SerialBT.readStringUntil('\n');
        if (msg.length() >= 2) {
            char cmd = msg.charAt(0);
            int value = msg.substring(1).toInt();
            handleTuningCommand(cmd, value);
        }
    }
    // ... 其余控制代码 | ... rest of control code
}
```

```
调参命令说明 | Tuning Command Reference:
═════════════════════════════════════
  P250 → 设置 Kp=25.0
  I50  → 设置 Ki=0.50
  D8   → 设置 Kd=0.8
  G    → 查看当前参数 | Get current parameters

示例调参流程 | Example Tuning Flow:
  1. P100  → Kp=10, 观察是否振荡 | observe if oscillation
  2. P200  → Kp=20, 更强响应 | stronger response
  3. P300  → Kp=30, 振荡太强 | too much oscillation
  4. P250  → Kp=25, 合适 | just right
  5. D5    → Kd=0.5, 加阻尼 | add damping
  6. D10   → Kd=1.0, 阻尼合适 | damping right
  7. I10   → Ki=0.10, 加积分 | add integral
  8. G     → 记录最终参数 | Record final parameters
```

#### 多表面测试 | Multi-Surface Testing

```
测试矩阵 | Test Matrix:
═══════════════════════════════════════════════════════════

┌─────────────────┬─────────┬──────────┬──────────┬──────────┐
│ 表面 Surface     │ 纯轮 Wheel│ 纯足 Leg │ 混合Hybrid│ 备注 Note│
├─────────────────┼─────────┼──────────┼──────────┼──────────┤
│ 平滑地板         │         │          │          │ 木地板    │
│ Smooth floor     │  ___s   │   ___s   │   ___s   │ Hardwood │
├─────────────────┼─────────┼──────────┼──────────┼──────────┤
│ 水泥地           │         │          │          │          │
│ Concrete         │  ___s   │   ___s   │   ___s   │          │
├─────────────────┼─────────┼──────────┼──────────┼──────────┤
│ 草地             │         │          │          │          │
│ Grass            │  ___s   │   ___s   │   ___s   │          │
├─────────────────┼─────────┼──────────┼──────────┼──────────┤
│ 地毯             │         │          │          │          │
│ Carpet           │  ___s   │   ___s   │   ___s   │          │
├─────────────────┼─────────┼──────────┼──────────┼──────────┤
│ 坡道 (10°)       │         │          │          │ 斜坡      │
│ Ramp (10°)       │  ___s   │   ___s   │   ___s   │ Incline  │
├─────────────────┼─────────┼──────────┼──────────┼──────────┤
│ 障碍物 (2cm)     │         │          │          │ 门槛/书本 │
│ Obstacle (2cm)   │  ___s   │   ___s   │   ___s   │ Doorstep │
└─────────────────┴─────────┴──────────┴──────────┴──────────┘

评分标准 | Scoring:
  ★★★ 完美通过 | Perfect pass
  ★★☆ 轻微摇摆 | Minor wobble
  ★☆☆ 勉强通过 | Barely passed
  ☆☆☆ 失败 | Failed

记录每次测试的 PID 参数和观察结果
Record PID parameters and observations for each test
```

---

### 3. 美化与展示准备 (2h) | Aesthetics & Presentation Prep

#### 外观美化选项 | Aesthetics Options

```
美化方案 | Aesthetics Options:

方案1: 贴纸/贴膜 | Option 1: Stickers/Vinyl
  - 用切割机制作自定义贴纸 | Make custom stickers with vinyl cutter
  - 贴在顶盖和侧面 | Apply on top cover and sides
  - 包含：队名、Logo、项目名 | Include: team name, logo, project name

方案2: LED 灯效 | Option 2: LED Effects
  - WS2812 LED 灯带 (可选) | WS2812 LED strip (optional)
  - 状态指示：绿色=正常，红色=低电量，蓝色=蓝牙连接
  - Status: Green=OK, Red=low battery, Blue=BT connected

方案3: 喷漆 | Option 3: Spray Paint
  - PLA 可以喷漆 | PLA can be spray painted
  - 先打底漆，再喷面漆 | Primer first, then color coat
  - 使用丙烯颜料也可以 | Acrylic paint also works

方案4: 3D 打印颜色搭配 | Option 4: Color-coordinated Printing
  - 不同零件用不同颜色耗材 | Different color filament for different parts
  - 底盘：深色（黑/灰）| Chassis: dark (black/grey)
  - 腿部：亮色（红/蓝）| Legs: bright (red/blue)
  - 盖板：透明或白色 | Cover: transparent or white
```

**可选 LED 状态指示代码 | Optional LED Status Indicator Code:**

```cpp
#include <Adafruit_NeoPixel.h>

#define LED_PIN     4       // WS2812 数据引脚 | Data pin
#define LED_COUNT   8       // LED 数量 | Number of LEDs

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

// 状态颜色定义 | Status color definitions
#define COLOR_OK      strip.Color(0, 255, 0)     // 绿色 正常
#define COLOR_WARN    strip.Color(255, 255, 0)   // 黄色 警告
#define COLOR_ERROR   strip.Color(255, 0, 0)     // 红色 错误
#define COLOR_BT      strip.Color(0, 100, 255)   // 蓝色 蓝牙
#define COLOR_OFF     strip.Color(0, 0, 0)       // 关闭

void updateStatusLED() {
    float vbat = readBatteryVoltage();

    if (vbat < 6.8) {
        // 低电量：红色闪烁 | Low battery: red blink
        static bool blink = false;
        blink = !blink;
        setAllLEDs(blink ? COLOR_ERROR : COLOR_OFF);
    } else if (currentMode == MODE_TRANSITION) {
        // 过渡中：黄色 | Transitioning: yellow
        setAllLEDs(COLOR_WARN);
    } else {
        // 正常：根据模式显示 | Normal: show by mode
        switch (currentMode) {
            case MODE_WHEEL:  setAllLEDs(strip.Color(0, 255, 100)); break;  // 绿 Green
            case MODE_LEG:    setAllLEDs(strip.Color(255, 100, 0));  break;  // 橙 Orange
            case MODE_HYBRID: setAllLEDs(strip.Color(0, 150, 255));  break;  // 蓝 Blue
            default:          setAllLEDs(COLOR_OFF); break;
        }
    }
    strip.show();
}

void setAllLEDs(uint32_t color) {
    for (int i = 0; i < LED_COUNT; i++) {
        strip.setPixelColor(i, color);
    }
}
```

#### 性能记录模板 | Performance Recording Template

```
项目性能记录 | Project Performance Record:
═══════════════════════════════════════════════

团队名 Team Name: ________________
日期 Date: ________________

基础参数 | Base Parameters:
  重量 Weight:        _____g (含电池 with battery)
  高度 Height:        _____mm
  轮距 Wheel track:   _____mm
  电池容量 Battery:   _____mAh

PID 参数 | PID Parameters:
  Kp: _____  Ki: _____  Kd: _____

性能指标 | Performance Metrics:
┌─────────────────────────┬──────────┬──────────┐
│ 指标 Metric             │ 结果 Result│ 备注 Note│
├─────────────────────────┼──────────┼──────────┤
│ 最大平衡时间（纯轮）     │          │          │
│ Max balance time (wheel)│    ___s   │          │
├─────────────────────────┼──────────┼──────────┼──────────┤
│ 最大行走距离（纯足）     │          │          │
│ Max walk distance (leg) │    ___m   │          │
├─────────────────────────┼──────────┼──────────┼──────────┤
│ 模式切换成功率           │          │          │
│ Mode switch success rate│    ___%   │          │
├─────────────────────────┼──────────┼──────────┼──────────┤
│ 障碍物通过高度           │          │          │
│ Obstacle clearance       │    ___mm  │          │
├─────────────────────────┼──────────┼──────────┼──────────┤
│ 续航时间                 │          │          │
│ Battery endurance        │    ___min │          │
├─────────────────────────┼──────────┼──────────┼──────────┤
│ 最大速度                 │          │          │
│ Max speed                │    ___m/s │          │
├─────────────────────────┼──────────┼──────────┼──────────┤
│ 蓝牙控制距离             │          │          │
│ Bluetooth range          │    ___m   │          │
└─────────────────────────┴──────────┴──────────┘
```

#### 拍摄记录建议 | Video Recording Tips

```
拍摄清单 | Video Shot List:

必拍镜头 | Required Shots:
  □ 全景静态展示（360° 旋转）| Full static display (360° rotation)
  □ 纯轮模式平衡演示 | Wheel mode balance demo
  □ 纯足模式步行演示 | Leg mode walking demo
  □ 混合模式演示 | Hybrid mode demo
  □ 模式切换过程 | Mode switching process
  □ 障碍物跨越 | Obstacle traversal
  □ 蓝牙遥控操作 | Bluetooth remote operation

拍摄技巧 | Filming Tips:
  - 使用三脚架保持稳定 | Use tripod for stability
  - 横拍（横屏）| Landscape orientation
  - 每个功能 5-10 秒 | 5-10 seconds per feature
  - 总长度不超过 2 分钟 | Total length under 2 minutes
  - 在安静环境下录制 | Record in quiet environment
  - 多拍几条选最好的 | Multiple takes, pick the best
```

---

## 今日作业 | Today's Task

1. **完成组装 | Complete Assembly**
   - 按照组装顺序将所有机械和电子部件组装完毕
   - Assemble all mechanical and electronic components following the sequence
   - 确保每个螺丝都紧固，每个连接都可靠
   - Ensure every screw is tightened, every connection is secure

2. **线缆整理 | Cable Management**
   - 用扎带和热缩管整理所有线缆
   - Use zip ties and heat shrink to organize all cables
   - 拍摄内部布线照片作为文档记录
   - Take photos of internal wiring for documentation

3. **参数调优 | Parameter Tuning**
   - 使用蓝牙串口实时调参
   - Use Bluetooth serial for real-time parameter tuning
   - 在至少 3 种表面上测试并记录结果
   - Test on at least 3 surfaces and record results
   - 记录最终 PID 参数值 | Record final PID parameter values

4. **拍摄演示视频 | Record Demo Video**
   - 按照拍摄清单录制各功能演示
   - Record feature demos following the shot list
   - 保存原始视频素材以备明天编辑
   - Save raw video footage for tomorrow's editing

---

## 今日检查点 | Checkpoint

- [ ] 所有 3D 打印件已安装到位 | All 3D printed parts installed in place
- [ ] 电路连接完成并通过上电检查 | Wiring complete and passed power-on check
- [ ] 线缆整齐固定，无松散线路 | Cables neatly secured, no loose wires
- [ ] 舵机在中位安装，角度正确 | Servos installed at center position, angles correct
- [ ] PID 参数调优完成，平衡稳定 | PID tuning complete, stable balance
- [ ] 至少在 3 种表面上测试通过 | Tested successfully on at least 3 surfaces
- [ ] 三种运动模式均可正常切换 | All three motion modes switch correctly
- [ ] 演示视频素材已拍摄 | Demo video footage recorded
- [ ] 性能记录表已填写 | Performance record sheet filled out

---

### 常见问题排查 | Troubleshooting

| 问题 Problem | 可能原因 Possible Cause | 解决方案 Solution |
|---|---|---|
| 上电后无反应 No response after power-on | 电池没电或接线错误 Dead battery or wiring error | 万用表测电压，检查正负极 Measure voltage, check polarity |
| 平衡不稳定 Unstable balance | PID 参数不合适或重心偏移 Bad PID params or CG offset | 重新调参，检查重心位置 Retune PID, check CG position |
| 舵机抖动不止 Servos jittering | 供电不足或信号干扰 Low power or signal noise | 检查 BEC 输出，加信号线磁环 Check BEC output, add ferrite bead |
| 蓝牙断连 Bluetooth disconnects | 距离太远或电池电量低 Too far or low battery | 靠近控制，检查电池电压 Move closer, check battery |
| 电机异响 Motor noise | 齿轮啮合不良或参数错误 Bad gear mesh or wrong params | 检查安装，调低 PWM 频率 Check mounting, lower PWM freq |
| 底盘共振 Chassis vibration | 螺丝松动或电机频率共振 Loose screws or motor freq resonance | 紧固螺丝，加橡胶垫 Tighten screws, add rubber pads |
| 轮子打滑 Wheels slip | 地面太滑或 PID 输出过大 Surface too slippery or PID output too large | 换表面，降低 PID 增益 Change surface, lower PID gain |
| 步行时倾倒 Tipping during walk | 步态不协调或重心过高 Uncoordinated gait or CG too high | 调步态参数，降低电池位置 Tune gait, lower battery position |
