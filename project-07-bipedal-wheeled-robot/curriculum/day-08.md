# Day 08: 整车集成调试 | Full System Integration

## 今日目标 | Today's Goals

- 完成机器人全系统硬件与软件的集成
- 系统性地调试和验证每个子系统
- 掌握嵌入式系统的调试方法论
- 首次实现机器人完整自主平衡

> - Complete the integration of all hardware and software subsystems
> - Systematically debug and verify each subsystem
> - Master embedded system debugging methodology
> - Achieve first full autonomous robot balance

---

## 上午 (3h) | Morning Session

### 1. 系统集成清单与安全检查 (1.5h) | Integration Checklist & Safety Check

**为什么要做集成检查？| Why Integration Check?**

在分别测试了电机、IMU、PID、蓝牙等模块后，将它们组装在一起时往往会出现意想不到的问题。就像盖房子——砖、钢筋、水泥单独都没问题，但组合起来可能出现结构问题。集成检查确保每个零件在整体中协调工作。

> After testing motors, IMU, PID, Bluetooth separately, combining them often reveals unexpected issues. Like building a house — bricks, steel, cement are fine individually, but structural problems may appear when combined. Integration checks ensure every part works harmoniously.

**集成前检查清单 | Pre-Integration Checklist：**

```
┌─────────────────────────────────────────────────┐
│           整车集成检查清单 | Integration Checklist       │
├─────────────────────────────────────────────────┤
│                                                 │
│  □ 硬件检查 Hardware Check                       │
│    □ 所有螺丝已拧紧 All screws tightened          │
│    □ 电池电量充足 Battery fully charged (>11.1V)  │
│    □ 接线无短路/松动 No short/loose connections   │
│    □ ESP32 供电稳定 ESP32 power stable (3.3V)     │
│    □ 电机线序正确 Motor phase wires correct        │
│    □ IMU 方向正确 IMU orientation correct          │
│                                                 │
│  □ 软件检查 Software Check                       │
│    □ config.h 配置正确 Config settings correct    │
│    □ 所有模块编译通过 All modules compile          │
│    □ PID 参数已加载 PID params loaded              │
│    □ 蓝牙已配对 Bluetooth paired                  │
│                                                 │
│  □ 安全检查 Safety Check                         │
│    □ 车轮悬空测试 Wheels elevated for first test  │
│    □ 紧急停止方案 Emergency stop ready             │
│    □ 旁边有人协助 Helper standing by              │
│                                                 │
└─────────────────────────────────────────────────┘
```

**⚠️ 安全警告 | Safety Warning：**

```
首次集成测试必须将车轮悬空！| First integration test MUST have wheels elevated!
- 用书本/盒子垫起机器人底盘 | Use books/boxes to elevate robot chassis
- 确保车轮可以自由转动但不接触地面 | Wheels spin freely without touching ground
- 准备随时断开电源 | Be ready to disconnect power at any time
- 不要用手触碰旋转中的车轮 | Do not touch spinning wheels with hands
```

### 2. 分子系统验证 (1.5h) | Subsystem Verification

**验证顺序 | Verification Order：**

按照以下顺序逐个验证，每一步通过后再进行下一步：

> Verify in this order, proceeding only after each step passes:

**Step 1: 电源系统 | Power System**

```cpp
// 电源验证代码 | Power verification code
void verifyPowerSystem() {
    Serial.println("=== 电源系统验证 | Power System Verification ===");

    // 读取电池电压 | Read battery voltage
    float voltage = readBatteryVoltage();
    Serial.printf("电池电压 Battery Voltage: %.2f V\n", voltage);

    if (voltage < 10.8) {
        Serial.println("⚠️ 电池电压过低！请充电！| Battery voltage too low! Charge first!");
        return;
    }
    if (voltage > 12.6) {
        Serial.println("⚠️ 电池电压过高！检查接线！| Battery voltage too high! Check wiring!");
        return;
    }

    // 检查 ESP32 供电 | Check ESP32 power
    Serial.printf("ESP32 供电 ESP32 Power: %.2f V\n", analogRead(36) * 3.3 / 4095.0);

    Serial.println("✅ 电源系统正常 | Power system OK");
}
```

**Step 2: IMU 系统 | IMU System**

```cpp
void verifyIMU() {
    Serial.println("=== IMU 验证 | IMU Verification ===");

    IMU imu;
    if (!imu.init()) {
        Serial.println("❌ IMU 初始化失败！| IMU init failed!");
        return;
    }
    Serial.println("✅ IMU 初始化成功 | IMU init OK");

    // 读取 10 次数据检查稳定性 | Read 10 times to check stability
    for (int i = 0; i < 10; i++) {
        float ax, ay, az, gx, gy, gz;
        imu.readRaw(ax, ay, az, gx, gy, gz);
        Serial.printf("  Accel: %.2f, %.2f, %.2f | Gyro: %.2f, %.2f, %.2f\n",
                      ax, ay, az, gx, gy, gz);
        delay(100);
    }

    // 检查角度计算 | Check angle calculation
    float angle = imu.getAngle();
    Serial.printf("当前倾斜角 Current tilt: %.2f°\n", angle);

    if (fabs(angle) > 45) {
        Serial.println("⚠️ 角度过大，检查 IMU 安装方向 | Angle too large, check IMU orientation");
    } else {
        Serial.println("✅ IMU 系统正常 | IMU system OK");
    }
}
```

**Step 3: 电机系统 | Motor System**

```cpp
void verifyMotors() {
    Serial.println("=== 电机验证 | Motor Verification ===");

    MotorControl motors;
    motors.init();

    // ⚠️ 确保车轮悬空！| Make sure wheels are elevated!

    // 测试左电机 | Test left motor
    Serial.println("左电机正转 Left motor forward...");
    motors.setSpeed(30, 0);  // 30% power, 0 = left only | 30%功率，仅左
    delay(2000);
    motors.setSpeed(0, 0);
    delay(1000);

    // 测试右电机 | Test right motor
    Serial.println("右电机正转 Right motor forward...");
    motors.setSpeed(0, 30);  // 0 = right only | 仅右
    delay(2000);
    motors.setSpeed(0, 0);

    Serial.println("✅ 电机系统正常 | Motor system OK");
}
```

**Step 4: 通信系统 | Communication System**

```cpp
void verifyBluetooth() {
    Serial.println("=== 蓝牙验证 | Bluetooth Verification ===");

    BluetoothSerial SerialBT;
    if (!SerialBT.begin("WheelWalker")) {
        Serial.println("❌ 蓝牙初始化失败！| Bluetooth init failed!");
        return;
    }
    Serial.println("✅ 蓝牙已启动：WheelWalker | Bluetooth started: WheelWalker");
    Serial.println("请用手机连接 | Connect with phone...");

    // 等待连接 | Wait for connection
    int timeout = 30; // 30 seconds | 30秒
    while (!SerialBT.connected() && timeout > 0) {
        Serial.printf("等待连接... %d秒\n", timeout);
        delay(1000);
        timeout--;
    }

    if (SerialBT.connected()) {
        Serial.println("✅ 蓝牙已连接 | Bluetooth connected");
    } else {
        Serial.println("⚠️ 蓝牙未连接（不影响平衡测试）| Not connected (OK for balance test)");
    }
}
```

---

## 下午 (4h) | Afternoon Session

### 3. 首次完整系统测试 (2h) | First Full System Test

**为什么从简单开始？| Why Start Simple?**

不要一开始就期望机器人完美平衡。就像学骑自行车——先有人扶着，再慢慢放手。我们按照以下渐进策略：

> Don't expect perfect balance right away. Like learning to ride a bike — start with support, then gradually release. Follow this progressive strategy:

**测试阶段 | Test Phases：**

```
阶段1: 悬空测试 (车轮离地) | Phase 1: Elevated test (wheels off ground)
  → 验证电机响应方向正确 | Verify motor response direction is correct
  → 验证 IMU 角度读数合理 | Verify IMU angle readings are reasonable
  → 验证 PID 输出方向正确 | Verify PID output direction is correct

阶段2: 扶持测试 (手扶机器人) | Phase 2: Supported test (hand-supported)
  → 轻轻放手观察反应 | Gently release and observe reaction
  → 如果电机朝正确方向补偿 → 继续 | If motors compensate correctly → continue
  → 如果方向反了 → 修改 M0Dir/M1Dir | If direction wrong → modify M0Dir/M1Dir

阶段3: 自主平衡测试 | Phase 3: Autonomous balance test
  → 放手让机器人自己平衡 | Release and let robot balance on its own
  → 记录平衡时间 | Record balance duration
  → 调整 PID 参数 | Tune PID parameters

阶段4: 遥控测试 | Phase 4: Remote control test
  → 通过蓝牙发送前进/后退命令 | Send forward/backward commands via Bluetooth
  → 测试转弯 | Test turning
  → 测试紧急停止 | Test emergency stop
```

**完整系统测试代码 | Full System Test Code：**

```cpp
// 整车集成测试主程序 | Full integration test main program
#include "config.template.h"
#include "imu.h"
#include "motor_control.h"
#include "balance.h"
#include "utils.h"
#include "BluetoothSerial.h"

BluetoothSerial SerialBT;

IMU imu;
MotorControl motors;
BalanceController balance;

// 状态变量 | State variables
bool systemReady = false;
bool balancing = false;
unsigned long lastControlTime = 0;
const int CONTROL_INTERVAL = 10; // 10ms 控制周期 | 10ms control period

void setup() {
    Serial.begin(115200);
    Serial.println("=== 轮足机器人系统集成测试 ===");
    Serial.println("=== WheelWalker Integration Test ===");

    // 1. 初始化 IMU | Init IMU
    Serial.println("[1/5] 初始化 IMU | Initializing IMU...");
    if (!imu.init()) {
        Serial.println("❌ IMU 失败！程序停止 | IMU failed! Halted.");
        while(1);
    }
    Serial.println("✅ IMU 就绪 | IMU ready");

    // 2. 初始化电机 | Init motors
    Serial.println("[2/5] 初始化电机 | Initializing motors...");
    motors.init();
    Serial.println("✅ 电机就绪 | Motors ready");

    // 3. 初始化平衡控制器 | Init balance controller
    Serial.println("[3/5] 初始化 PID | Initializing PID...");
    balance.init();
    Serial.println("✅ PID 就绪 | PID ready");

    // 4. 初始化蓝牙 | Init Bluetooth
    Serial.println("[4/5] 初始化蓝牙 | Initializing Bluetooth...");
    SerialBT.begin("WheelWalker");
    Serial.println("✅ 蓝牙就绪 | Bluetooth ready");

    // 5. 校准 IMU | Calibrate IMU
    Serial.println("[5/5] 校准 IMU（保持机器人竖直！）| Calibrating IMU (keep upright!)");
    Serial.println("3秒后开始校准... | Calibrating in 3 seconds...");
    delay(3000);
    imu.calibrate();
    Serial.println("✅ 校准完成 | Calibration done");

    systemReady = true;
    Serial.println("\n========================================");
    Serial.println("  系统就绪！输入命令开始测试");
    Serial.println("  System ready! Enter commands to start");
    Serial.println("  S=开始平衡 | S=start balance");
    Serial.println("  X=停止 | X=stop");
    Serial.println("  W/A/D=前/左/右 | forward/left/right");
    Serial.println("========================================\n");
}

void loop() {
    // 处理蓝牙命令 | Process Bluetooth commands
    if (SerialBT.available()) {
        char cmd = SerialBT.read();
        processCommand(cmd);
    }
    if (Serial.available()) {
        char cmd = Serial.read();
        processCommand(cmd);
    }

    // 主控制循环 | Main control loop (10ms)
    if (systemReady && balancing) {
        unsigned long now = millis();
        if (now - lastControlTime >= CONTROL_INTERVAL) {
            lastControlTime = now;

            // 读取 IMU | Read IMU
            float angle = imu.getAngle();
            float gyro = imu.getGyroY();
            float velocity = motors.getVelocity();
            float yawRate = imu.getGyroZ();

            // 检查安全限制 | Check safety limits
            if (fabs(angle) > SAFETY_MAX_ANGLE) {
                // 角度过大，紧急停止 | Angle too large, emergency stop
                motors.setSpeed(0, 0);
                balancing = false;
                Serial.println("⚠️ 安全停止！倾角过大 | Safety stop! Angle too large");
                return;
            }

            // PID 计算 | PID compute
            BalanceOutput output = balance.compute(angle, gyro, velocity, yawRate);

            // 驱动电机 | Drive motors
            motors.setSpeed(output.leftPWM, output.rightPWM);
        }
    }
}

void processCommand(char cmd) {
    switch(cmd) {
        case 'S': case 's':
            balancing = true;
            Serial.println("▶ 开始平衡 | Balance started");
            break;
        case 'X': case 'x':
            balancing = false;
            motors.setSpeed(0, 0);
            Serial.println("■ 停止 | Stopped");
            break;
        case 'W': case 'w':
            balance.setTargetVelocity(0.5);  // 前进 | Forward
            Serial.println("↑ 前进 | Forward");
            break;
        case 'A': case 'a':
            balance.setTargetYaw(-0.3);  // 左转 | Left turn
            Serial.println("← 左转 | Left turn");
            break;
        case 'D': case 'd':
            balance.setTargetYaw(0.3);  // 右转 | Right turn
            Serial.println("→ 右转 | Right turn");
            break;
        case 'F': case 'f':
            balance.setTargetVelocity(0);  // 停车 | Stop moving
            balance.setTargetYaw(0);
            Serial.println("◆ 停车 | Halt");
            break;
    }
}
```

### 4. 参数调优与稳定性测试 (2h) | Parameter Tuning & Stability Test

**参数调优工作流 | Tuning Workflow：**

```
调优顺序（非常重要！）| Tuning Order (Very Important!):

1️⃣ 先调直立环 (Kp1, Kd1) | Tune upright loop first
   - 只关注角度平衡，不关心位移
   - Focus only on angle balance, ignore position

2️⃣ 再调速度环 (Kp2, Ki2) | Then tune velocity loop
   - 直立环稳定后再加入速度环
   - Add velocity loop only after upright loop is stable

3️⃣ 最后调转向环 (Kp3, Kd3) | Finally tune yaw loop
   - 前两个环都稳定后再调转向
   - Tune yaw only after both loops are stable
```

**PID 调优参数记录表 | PID Tuning Parameter Log：**

```
┌──────┬──────┬──────┬──────┬──────────┬──────────┐
│ 尝试 │ Kp1  │ Kd1  │ 效果 │ 平衡时间 │ 备注     │
│ Try  │      │      │ Effect│Balance(s)│ Notes    │
├──────┼──────┼──────┼──────┼──────────┼──────────┤
│  1   │  10  │  0.5 │      │          │          │
│  2   │  15  │  0.5 │      │          │          │
│  3   │  15  │  1.0 │      │          │          │
│  4   │  20  │  1.0 │      │          │          │
│  5   │  20  │  1.5 │      │          │          │
│ ...  │      │      │      │          │          │
└──────┴──────┴──────┴──────┴──────────┴──────────┘
```

**稳定性测试清单 | Stability Test Checklist：**

| 测试项 Test Item | 通过标准 Pass Criteria | 结果 Result |
|-----------------|----------------------|------------|
| 静态平衡 Static balance | 独立站立 > 30s | ☐ |
| 前后推进恢复 Push recovery | 轻推后恢复平衡 | ☐ |
| 低速前进 Low-speed forward | 直线行驶 > 1m | ☐ |
| 低速后退 Low-speed backward | 直线后退 > 1m | ☐ |
| 原地转弯 Spot turning | 原地360°转弯 | ☐ |
| 不同地面 Different surfaces | 地砖/木地板均能平衡 | ☐ |
| 连续运行 Continuous run | 稳定运行 > 5 分钟 | ☐ |

**常见集成问题及解决 | Common Integration Issues：**

| 现象 Symptom | 可能原因 Possible Cause | 解决方法 Solution |
|-------------|----------------------|-----------------|
| 上电后立即倒下 Falls immediately | IMU 方向反了 IMU orientation reversed | 修改 config.h 中 IMU 方向设置 |
| 不停抖动/振荡 Continuous oscillation | Kp 太大 Kp too large | 减小 Kp 值，增大 Kd 值 |
| 缓慢向一个方向漂移 Slow drift one way | 速度环 I 项不足 Insufficient I term | 增大速度环 Ki 值 |
| 电机方向不对 Wrong motor direction | M0Dir/M1Dir 设置错误 | 修改电机方向参数 |
| 蓝牙命令无响应 BT commands ignored | 串口缓冲区满 Serial buffer full | 增加 SerialBT.available() 检查 |
| 运行一段时间后崩溃 Crashes after a while | 看门狗超时 Watchdog timeout | 减少控制循环中的耗时操作 |

---

## 今日作业 | Today's Task

1. 完成整车集成，记录每个子系统的验证结果
   Complete full integration, record each subsystem's verification results
2. 实现机器人首次自主平衡（哪怕只有几秒）
   Achieve first autonomous balance (even just a few seconds)
3. 填写 PID 调优参数记录表（至少 5 次尝试）
   Fill in PID tuning parameter log (at least 5 attempts)
4. 记录 3 个遇到的问题及解决方案
   Document 3 problems encountered and their solutions

---

## 今日检查点 | Checkpoint

- [ ] 所有子系统（电源/IMU/电机/蓝牙）独立验证通过 | All subsystems verified independently
- [ ] 机器人可以悬空正确响应 IMU 倾斜（电机方向正确）| Robot responds correctly to IMU tilt with wheels elevated
- [ ] 机器人至少实现了 3 秒以上的自主平衡 | Robot achieved at least 3 seconds of autonomous balance
- [ ] 蓝牙遥控可以发送前进/后退/停止命令 | Bluetooth remote can send forward/backward/stop commands
- [ ] 记录了 PID 参数调优过程 | PID tuning process documented
