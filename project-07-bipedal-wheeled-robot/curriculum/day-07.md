# Day 07: 遥控与通信 | Remote Control & Communication

## 今日目标 | Today's Goals

- 理解蓝牙通信原理（Classic vs BLE）| Understand Bluetooth communication (Classic vs BLE)
- 设计串口通信协议（帧头+负载+校验和）| Design serial protocol (header+payload+checksum)
- 实现 ESP32 蓝牙串口通信代码 | Implement ESP32 Bluetooth serial code
- 用手机 App（Serial Bluetooth Terminal）遥控机器人 | Control robot via phone app
- 实现摇杆→速度/转向映射 | Implement joystick-to-velocity mapping

---

## 上午 (3h) | Morning Session

### 1. 蓝牙通信基础 | Bluetooth Communication Basics (45min)

#### 为什么选蓝牙？| Why Bluetooth?

```
可选的遥控方式 | Remote control options:

┌──────────────┬──────────┬──────────┬────────────┐
│     方式      │   距离   │   延迟   │    复杂度   │
│    Method     │ Distance │ Latency  │ Complexity │
├──────────────┼──────────┼──────────┼────────────┤
│ 红外 IR       │ 5m       │ 低 Low   │ 简单 Easy   │
│ Bluetooth     │ 10-50m   │ 低 Low   │ 中等 Medium │
│ WiFi          │ 50m+     │ 中 Med   │ 复杂 Complex│
│ 2.4G Radio    │ 100m+    │ 极低 Low │ 复杂 Complex│
└──────────────┴──────────┴──────────┴────────────┘

蓝牙的优势 | Bluetooth advantages:
  ✓ ESP32 内置，不需要额外硬件 | Built into ESP32, no extra hardware
  ✓ 手机直接连接 | Phone connects directly
  ✓ 低延迟 | Low latency
  ✓ 开发简单（串口模式）| Simple development (serial mode)
```

#### Bluetooth Classic vs BLE | 经典蓝牙 vs 低功耗蓝牙

```
Bluetooth Classic (经典蓝牙):
  - 就像打电话——持续连接，数据流不断
  - Like a phone call — continuous connection, constant data stream
  - 传输速率高 | High data rate (~2 Mbps)
  - 功耗较高 | Higher power consumption
  - ESP32 支持 Serial Port Profile (SPP)
  - 手机有现成的"蓝牙串口"App

BLE (Bluetooth Low Energy):
  - 就像发短信——断续连接，快速交换小数据
  - Like texting — intermittent connection, quick small data exchange
  - 传输速率低 | Lower data rate (~125 kbps)
  - 功耗极低 | Very low power consumption
  - 需要写 GATT Service/Characteristic
  - iOS 只支持 BLE

我们的选择：Bluetooth Classic (Serial)
Our choice: Bluetooth Classic (Serial)

原因 | Reason:
  - BluetoothSerial 库，就像用 Serial 一样简单
  - 手机端有免费现成的 App（Serial Bluetooth Terminal）
  - 不需要处理 BLE 的复杂配对和通知机制
  - 代码量最少、调试最方便

注意 | Note: iOS 不支持 Classic Bluetooth SPP！
  iPhone 用户需要使用 BLE 版本（下午提供简化版）
  iOS users need BLE version (provided in afternoon)
```

> **笨鸟先飞原则 | Smart Bird Principle**: 很多教程一上来就教 BLE，说它更现代。但对于我们的场景，Bluetooth Classic 的串口模式是最佳选择——代码量最少、调试最方便、手机 App 免费现成。先把东西做出来，优化以后再说。

> Many tutorials teach BLE first, calling it more modern. But for our scenario, Bluetooth Classic serial mode is the best choice — least code, easiest debugging, free phone apps. Build something first, optimize later.

---

### 2. ESP32 蓝牙串口编程 | ESP32 Bluetooth Serial Programming (45min)

#### 最简蓝牙串口示例 | Minimal Bluetooth Serial Example

```cpp
/**
 * bluetooth_basic.ino — 最简蓝牙串口示例
 * bluetooth_basic.ino — Minimal Bluetooth serial example
 *
 * 笨鸟先飞:
 * - BluetoothSerial 库让蓝牙通信和串口通信完全一样
 * - SerialBT.read() / SerialBT.println() 和 Serial 的用法一模一样
 * - 唯一的区别：数据通过无线传输而不是 USB 线
 */

#include <BluetoothSerial.h>

// 创建蓝牙串口对象 | Create Bluetooth serial object
BluetoothSerial SerialBT;

void setup() {
    Serial.begin(115200);

    // 初始化蓝牙，设置设备名称 | Init Bluetooth, set device name
    // 这个名字会显示在手机的蓝牙列表中
    // This name appears in phone's Bluetooth list
    if (!SerialBT.begin("BipedalBot")) {
        Serial.println("Bluetooth init failed! | 蓝牙初始化失败!");
        while (1);  // 停在这里 | Stop here
    }
    Serial.println("Bluetooth started! Device: BipedalBot");
    Serial.println("Search and pair with phone | 搜索并配对");
}

void loop() {
    // 从蓝牙接收 → 转发到串口（调试用）
    // Receive from Bluetooth → forward to Serial (debug)
    if (SerialBT.available()) {
        Serial.write(SerialBT.read());
    }

    // 从串口 → 转发到蓝牙
    // Send from Serial → forward to Bluetooth
    if (Serial.available()) {
        SerialBT.write(Serial.read());
    }
}
```

> **测试步骤 | Test Steps:**
> 1. 上传代码到 ESP32 | Upload code to ESP32
> 2. 手机蓝牙设置 → 搜索 "BipedalBot" | Phone BT settings → search "BipedalBot"
> 3. 配对（PIN 通常是 1234 或 0000）| Pair (PIN usually 1234 or 0000)
> 4. 下载 "Serial Bluetooth Terminal" App | Download app
> 5. 在 App 中连接 BipedalBot | Connect in app
> 6. 在 App 中发送文字，在串口监视器中观察 | Send text, observe in Serial Monitor

---

### 3. 通信协议设计 | Communication Protocol Design (1h15min)

#### 为什么需要协议？| Why Do We Need a Protocol?

直接发字符串（比如 "F" 前进、"B" 后退）虽然简单，但有问题：
- 不知道消息是否完整
- 不知道数据有没有出错
- 无法传递精确数值（如速度 = 35.5）

Sending raw strings (like "F" for forward) is simple but problematic:
- Don't know if message is complete
- Don't know if data is corrupted
- Can't transmit precise values (like speed = 35.5)

#### 数据包格式 | Data Packet Format

```
一个完整的数据包 | A complete data packet:

┌────────┬────────┬──────────┬──────────┬──────────┐
│ Header │  CMD   │ Length   │  Data    │ Checksum │
│ 帧头    │ 命令   │ 数据长度  │  数据    │ 校验和    │
│ 0xAA   │ 1 byte │ 1 byte   │ N bytes  │ 1 byte   │
└────────┴────────┴──────────┴──────────┴──────────┘

各字段说明 | Field descriptions:

帧头 Header (0xAA):
  - 固定值 0xAA，标识数据包的开始
  - Fixed value 0xAA, marks start of packet
  - 选 0xAA（二进制 10101010）因为不容易和普通数据冲突
  - 10101010 is unlikely to appear as normal data noise

命令 CMD (1 byte):
  0x01 = 速度控制 | Speed control
  0x02 = 转向控制 | Turn control
  0x03 = 模式切换 | Mode switch
  0x05 = 心跳包   | Heartbeat
  0x81 = 遥测数据（机器人→手机）| Telemetry (robot→phone)

数据长度 Length (1 byte):
  - Data 字段的字节数 | Number of bytes in Data

数据 Data (变长):
  - 命令的具体参数 | Specific parameters

校验和 Checksum (1 byte):
  - 所有前面字节的异或值（XOR）
  - XOR of all previous bytes
  - 用于检测传输错误 | Detect transmission errors
```

#### 协议定义头文件 | Protocol Header File

```cpp
// protocol.h — 通信协议定义
// protocol.h — Communication protocol definitions

#pragma once

// 帧头 | Frame header
#define FRAME_HEADER 0xAA

// 命令类型 | Command types
#define CMD_SPEED       0x01  // 速度控制 | Speed control
#define CMD_TURN        0x02  // 转向控制 | Turn control
#define CMD_MODE        0x03  // 模式切换 | Mode switch
#define CMD_PID_PARAMS  0x04  // PID 参数 | PID parameters
#define CMD_HEARTBEAT   0x05  // 心跳包   | Heartbeat
#define CMD_TELEMETRY   0x81  // 遥测数据（机器人→手机）| Telemetry
#define CMD_STATUS      0x82  // 状态报告 | Status

// 模式定义 | Mode definitions
#define MODE_STOP       0x00  // 停止 | Stop
#define MODE_BALANCE    0x01  // 平衡模式 | Balance mode
#define MODE_DRIVE      0x02  // 驾驶模式 | Drive mode

// 校验和计算 | Checksum calculation
inline uint8_t calculateChecksum(const uint8_t* data, size_t len) {
    uint8_t checksum = 0;
    for (size_t i = 0; i < len; i++) {
        checksum ^= data[i];  // 异或 | XOR
    }
    return checksum;
}
```

#### 数据包解析器（状态机）| Packet Parser (State Machine)

```cpp
/**
 * PacketParser.h — 数据包解析器
 * PacketParser.h — Packet parser
 *
 * 笨鸟先飞:
 * - 解析器使用"状态机"模式——每次读一个字节，根据当前状态决定怎么处理
 * - 这和快递分拣一样：先看包裹上的标签（帧头），再看收件人（命令），
 *   再看里面是什么（数据），最后检查是否完好（校验和）
 */

#pragma once
#include <Arduino.h>
#include "protocol.h"

// 解析器状态 | Parser states
enum ParseState {
    WAIT_HEADER,    // 等待帧头 | Waiting for header
    WAIT_CMD,       // 等待命令 | Waiting for command
    WAIT_LENGTH,    // 等待长度 | Waiting for length
    WAIT_DATA,      // 等待数据 | Waiting for data
    WAIT_CHECKSUM   // 等待校验 | Waiting for checksum
};

// 解析结果 | Parse result
struct Packet {
    uint8_t cmd;
    uint8_t length;
    uint8_t data[32];  // 最大32字节 | Max 32 bytes
    bool valid;
};

class PacketParser {
private:
    ParseState state;
    Packet packet;
    uint8_t data_index;

public:
    PacketParser() : state(WAIT_HEADER), data_index(0) {
        packet.valid = false;
    }

    /**
     * 输入一个字节，返回是否解析完成
     * Feed one byte, return true if complete packet received
     */
    bool feed(uint8_t byte) {
        switch (state) {
            case WAIT_HEADER:
                if (byte == FRAME_HEADER) {
                    state = WAIT_CMD;
                }
                break;

            case WAIT_CMD:
                packet.cmd = byte;
                state = WAIT_LENGTH;
                break;

            case WAIT_LENGTH:
                packet.length = byte;
                if (packet.length == 0) {
                    state = WAIT_CHECKSUM;
                } else {
                    data_index = 0;
                    state = WAIT_DATA;
                }
                break;

            case WAIT_DATA:
                packet.data[data_index++] = byte;
                if (data_index >= packet.length) {
                    state = WAIT_CHECKSUM;
                }
                break;

            case WAIT_CHECKSUM: {
                // 构建校验缓冲区 | Build checksum buffer
                uint8_t buf[34];
                buf[0] = FRAME_HEADER;
                buf[1] = packet.cmd;
                buf[2] = packet.length;
                for (int i = 0; i < packet.length; i++) {
                    buf[3 + i] = packet.data[i];
                }
                uint8_t expected = calculateChecksum(buf, 3 + packet.length);

                if (byte == expected) {
                    packet.valid = true;
                    state = WAIT_HEADER;
                    return true;  // 解析成功! | Parse success!
                } else {
                    Serial.print("Checksum FAIL! Expected: 0x");
                    Serial.print(expected, HEX);
                    Serial.print(" Got: 0x");
                    Serial.println(byte, HEX);
                    reset();
                }
                break;
            }
        }
        return false;
    }

    Packet getPacket() const { return packet; }

    void reset() {
        state = WAIT_HEADER;
        data_index = 0;
        packet.valid = false;
    }
};
```

#### 数据编码辅助 | Data Encoding Helpers

```cpp
// 编码辅助 — float 与字节的互相转换 | Encoding helpers — float <-> bytes

// 把 float 拆成 2 字节（精度 0.01）| Split float to 2 bytes (precision 0.01)
void floatToBytes(float value, uint8_t* bytes) {
    int16_t scaled = (int16_t)(value * 100.0f);
    bytes[0] = scaled & 0xFF;         // 低字节 | Low byte
    bytes[1] = (scaled >> 8) & 0xFF;  // 高字节 | High byte
}

// 把 2 字节合成 float | Combine 2 bytes to float
float bytesToFloat(const uint8_t* bytes) {
    int16_t scaled = bytes[0] | (bytes[1] << 8);
    return scaled / 100.0f;
}

// 构建速度命令包 | Build speed command packet
int buildSpeedPacket(uint8_t* buffer, float speed) {
    buffer[0] = FRAME_HEADER;
    buffer[1] = CMD_SPEED;
    buffer[2] = 2;  // 数据长度 2 字节 | Data length 2 bytes
    floatToBytes(speed, &buffer[3]);
    buffer[5] = calculateChecksum(buffer, 5);
    return 6;  // 总长度 | Total length
}
```

---

## 下午 (4h) | Afternoon Session

### 4. 简易遥控——文本命令模式 | Simple Remote — Text Command Mode (1h)

如果你觉得协议太复杂，可以先用简单的文本命令。不需要自己写 App，直接用蓝牙串口终端就行。

If the protocol feels complex, start with simple text commands. No custom app needed — just a Bluetooth serial terminal.

```cpp
/**
 * SimpleRemote.h — 简单文本命令遥控
 * SimpleRemote.h — Simple text command remote
 *
 * 命令格式 | Command format:
 *   F     → 前进 Forward      B     → 后退 Backward
 *   L     → 左转 Left         R     → 右转 Right
 *   S     → 停止 Stop         X     → 急停 Emergency Stop
 *   U     → 加速 Speed up     D     → 减速 Slow down
 *   V:5.0 → 精确速度 | Exact speed    T:3.0 → 精确转向 | Exact turn
 */

#pragma once
#include <BluetoothSerial.h>

class SimpleRemote {
private:
    BluetoothSerial btSerial;
    String buffer;

public:
    bool init(const char* name) {
        if (!btSerial.begin(name)) return false;
        btSerial.println("BipedalBot Ready!");
        btSerial.println("Commands: F/B/L/R/S/X/U/D or V:value/T:value");
        return true;
    }

    void update(float& target_speed, float& target_turn, uint8_t& mode) {
        while (btSerial.available()) {
            char c = btSerial.read();
            if (c == '\n' || c == '\r') {
                if (buffer.length() > 0) {
                    processCommand(buffer, target_speed, target_turn, mode);
                    buffer = "";
                }
            } else {
                buffer += c;
            }
        }
    }

    void sendText(const char* text) {
        btSerial.println(text);
    }

private:
    void processCommand(const String& cmd,
                        float& target_speed, float& target_turn, uint8_t& mode) {
        if (cmd == "F") {
            target_speed = 3.0;
            btSerial.println("OK: Forward");
        }
        else if (cmd == "B") {
            target_speed = -3.0;
            btSerial.println("OK: Backward");
        }
        else if (cmd == "L") {
            target_turn = -5.0;
            btSerial.println("OK: Left");
        }
        else if (cmd == "R") {
            target_turn = 5.0;
            btSerial.println("OK: Right");
        }
        else if (cmd == "S") {
            target_speed = 0;
            target_turn = 0;
            btSerial.println("OK: Stop");
        }
        else if (cmd == "X") {
            mode = 0;  // MODE_STOP
            target_speed = 0;
            target_turn = 0;
            btSerial.println("OK: EMERGENCY STOP");
        }
        else if (cmd == "U") {
            target_speed += 1.0;
            if (target_speed > 10.0) target_speed = 10.0;
            btSerial.print("OK: Speed=");
            btSerial.println(target_speed);
        }
        else if (cmd == "D") {
            target_speed -= 1.0;
            if (target_speed < -10.0) target_speed = -10.0;
            btSerial.print("OK: Speed=");
            btSerial.println(target_speed);
        }
        // 精确数值命令 | Exact value commands
        else if (cmd.startsWith("V:")) {
            target_speed = cmd.substring(2).toFloat();
            btSerial.print("OK: Speed=");
            btSerial.println(target_speed);
        }
        else if (cmd.startsWith("T:")) {
            target_turn = cmd.substring(2).toFloat();
            btSerial.print("OK: Turn=");
            btSerial.println(target_turn);
        }
        else {
            btSerial.print("ERR: Unknown: ");
            btSerial.println(cmd);
        }
    }
};
```

#### Serial Bluetooth Terminal 自定义按钮配置 | Custom Button Config

```
在 App 中设置自定义按钮 | Set custom buttons in app:

按钮1: "前进 Forward"  → 发送 "F\n"
按钮2: "后退 Backward" → 发送 "B\n"
按钮3: "左转 Left"     → 发送 "L\n"
按钮4: "右转 Right"    → 发送 "R\n"
按钮5: "停止 Stop"     → 发送 "S\n"
按钮6: "急停 E-Stop"   → 发送 "X\n"
按钮7: "加速 Faster"   → 发送 "U\n"
按钮8: "减速 Slower"   → 发送 "D\n"
```

---

### 5. 摇杆→速度/转向映射 | Joystick-to-Velocity Mapping (1h)

#### 摇杆值映射原理 | Joystick Value Mapping Principle

```
摇杆输出 | Joystick output:
  X: -100 ~ +100 (左右 | Left-Right)
  Y: -100 ~ +100 (上下 | Up-Down)

需要映射到 | Need to map to:
  target_speed: -10 ~ +10
  target_turn:  -10 ~ +10

映射函数 | Mapping function:
  target_speed = Y / 100 * max_speed
  target_turn  = X / 100 * max_turn

加上死区（防止漂移）| Add dead zone (prevent drift):
  if |X| < 10 → X = 0
  if |Y| < 10 → Y = 0
```

#### 摇杆映射代码 | Joystick Mapping Code

```cpp
/**
 * JoystickMapping.h — 摇杆到机器人命令的映射
 * JoystickMapping.h — Joystick to robot command mapping
 *
 * 笨鸟先飞:
 * - 摇杆推得越远 → 机器人速度/转向越大
 * - 死区：摇杆在中间位置时不输出（防止抖动）
 * - 支持线性和指数映射两种模式
 */

#pragma once

struct JoystickInput {
    int16_t x;  // -100 ~ +100 (左右)
    int16_t y;  // -100 ~ +100 (前后)
};

struct RobotCommand {
    float speed;     // 目标速度 | Target speed
    float turn_rate; // 目标转向率 | Target turn rate
};

class JoystickMapper {
private:
    float max_speed;    // 最大速度 | Max speed
    float max_turn;     // 最大转向率 | Max turn rate
    int16_t dead_zone;  // 死区大小 | Dead zone size

public:
    JoystickMapper(float max_spd = 5.0, float max_trn = 8.0, int16_t dead = 10)
        : max_speed(max_spd), max_turn(max_trn), dead_zone(dead) {}

    // 线性映射 | Linear mapping
    RobotCommand map(const JoystickInput& input) {
        RobotCommand cmd;
        int16_t x = input.x;
        int16_t y = input.y;

        // 死区处理 | Dead zone
        if (abs(x) < dead_zone) x = 0;
        if (abs(y) < dead_zone) y = 0;

        // 线性映射 | Linear mapping
        cmd.speed = (y / 100.0f) * max_speed;
        cmd.turn_rate = (x / 100.0f) * max_turn;

        return cmd;
    }

    // 指数映射（低速区更精细，高速区更猛）
    // Exponential mapping (finer at low speed, aggressive at high speed)
    RobotCommand mapExponential(const JoystickInput& input) {
        RobotCommand cmd;
        int16_t x = input.x;
        int16_t y = input.y;

        if (abs(x) < dead_zone) x = 0;
        if (abs(y) < dead_zone) y = 0;

        float fx = x / 100.0f;
        float fy = y / 100.0f;

        // output = sign(input) * input^2 * max
        // 二次曲线：小输入→小输出（精细），大输入→大输出（猛）
        cmd.speed = (fy > 0 ? 1 : -1) * fy * fy * max_speed;
        cmd.turn_rate = (fx > 0 ? 1 : -1) * fx * fx * max_turn;

        return cmd;
    }

    void setMaxSpeed(float s) { max_speed = s; }
    void setMaxTurn(float t) { max_turn = t; }
};
```

#### 映射曲线对比 | Mapping Curve Comparison

```
线性映射 | Linear mapping:
  输入:  0  25  50  75  100
  输出:  0  25  50  75  100%
  → 每一级增加相同的量 | Each step adds same amount

指数映射 | Exponential mapping:
  输入:  0  25  50  75  100
  输出:  0   6  25  56  100%
  → 低速区精细（不容易失控），高速区猛（有劲）
  → Fine at low speed (hard to lose control), aggressive at high speed

推荐 | Recommendation:
  对初学者用指数映射——低速时更容易控制
  Use exponential for beginners — easier to control at low speed
```

---

### 6. 完整遥控系统实现 | Complete Remote Control System (1.5h)

#### 集成蓝牙遥控到主控制程序 | Integrate BT Remote into Main Control

```cpp
// main.cpp — 带蓝牙遥控的串级 PID 控制
// main.cpp — Cascaded PID with Bluetooth remote

#include <Arduino.h>
#include "MPU6050.h"
#include "MotorController.h"
#include "PIDController.h"
#include "EncoderSpeed.h"
#include "SimpleRemote.h"
#include "JoystickMapping.h"

// ========== 全局对象 | Global Objects ==========
MPU6050 imu;
MotorController motors;
PIDController balance_pid;
PIDController velocity_pid;
PIDController turn_pid;
EncoderSpeed left_encoder(35);
EncoderSpeed right_encoder(36);
SimpleRemote remote;
JoystickMapper joystick(5.0, 8.0, 10);

// ========== 状态变量 | State Variables ==========
float target_speed = 0.0;
float target_yaw_rate = 0.0;
uint8_t current_mode = MODE_STOP;  // 初始停止 | Start in stop mode
float base_angle = 0.0;

float filtered_angle = 0.0;
float filtered_speed = 0.0;
float filtered_yaw_rate = 0.0;
float balance_output = 0.0;
float turn_output = 0.0;

unsigned long last_balance = 0;
unsigned long last_velocity = 0;
unsigned long last_turn = 0;

float lpf(float p, float c, float a) { return a * c + (1-a) * p; }
void IRAM_ATTR leftISR()  { left_encoder.onPulse(); }
void IRAM_ATTR rightISR() { right_encoder.onPulse(); }

// ========== Setup ==========
void setup() {
    Serial.begin(115200);
    Wire.begin();

    // 初始化硬件 | Initialize hardware
    imu.init();
    motors.init();
    left_encoder.init();
    right_encoder.init();
    attachInterrupt(digitalPinToInterrupt(35), leftISR, RISING);
    attachInterrupt(digitalPinToInterrupt(36), rightISR, RISING);

    // 初始化蓝牙遥控 | Initialize Bluetooth remote
    remote.init("BipedalBot");

    // 配置 PID（使用之前调好的参数）| Configure PID (previously tuned params)
    balance_pid.setTunings(30.0, 0.3, 0.8);
    balance_pid.setTarget(base_angle);
    balance_pid.setLimits(255.0, 100.0);
    balance_pid.setDerivativeFilter(0.7);

    velocity_pid.setTunings(0.5, 0.01, 0.0);
    velocity_pid.setTarget(target_speed);
    velocity_pid.setLimits(15.0, 50.0);

    turn_pid.setTunings(5.0, 0.0, 0.3);
    turn_pid.setTarget(target_yaw_rate);
    turn_pid.setLimits(100.0, 50.0);

    Serial.println("=== Remote Control Ready | 遥控系统就绪 ===");
    Serial.println("Connect phone to 'BipedalBot' | 手机连接 'BipedalBot'");
}

// ========== Loop ==========
void loop() {
    unsigned long now = micros();

    // 0. 处理蓝牙命令 | Process Bluetooth commands
    remote.update(target_speed, target_yaw_rate, current_mode);

    // 安全检查：停止模式时不控制 | Safety: no control in stop mode
    if (current_mode == MODE_STOP) {
        motors.setSpeed(0, 0);
        return;
    }

    // 1. 平衡环（200Hz）| Balance loop (200Hz)
    if (now - last_balance >= 5000) {
        last_balance = now;
        float raw = imu.getAngle();
        filtered_angle = lpf(filtered_angle, raw, 0.9);
        balance_output = balance_pid.compute(filtered_angle);
    }

    // 2. 速度环（50Hz）| Velocity loop (50Hz)
    if (now - last_velocity >= 20000) {
        last_velocity = now;
        velocity_pid.setTarget(target_speed);
        left_encoder.update();
        right_encoder.update();
        float avg = (left_encoder.getSpeed() + right_encoder.getSpeed()) / 2.0f;
        filtered_speed = lpf(filtered_speed, avg, 0.7);
        float vel_out = velocity_pid.compute(filtered_speed);
        balance_pid.setTarget(base_angle + vel_out);
    }

    // 3. 转向环（100Hz）| Turn loop (100Hz)
    if (now - last_turn >= 10000) {
        last_turn = now;
        turn_pid.setTarget(target_yaw_rate);
        float raw_yaw = imu.getGyroZ();
        filtered_yaw_rate = lpf(filtered_yaw_rate, raw_yaw, 0.8);
        turn_output = turn_pid.compute(filtered_yaw_rate);
    }

    // 4. 电机输出 | Motor output
    float left_motor  = balance_output - turn_output;
    float right_motor = balance_output + turn_output;
    motors.setSpeed(left_motor, right_motor);
}
```

---

### 7. BLE 简化版（iOS 用户）与测试 | BLE Simplified (iOS) & Testing (30min)

#### BLE 简化版（仅 iOS 需要）| BLE Simplified (iOS only)

> 只有必须用 iPhone 时才需要。Android 用户跳过。
> Only needed for iPhone. Android users skip this.

```cpp
// ble_remote.h — BLE 遥控（iOS 兼容）
// ble_remote.h — BLE remote (iOS compatible)

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

class BLERemote {
private:
    BLEServer* pServer;
    BLECharacteristic* pCharacteristic;
    bool deviceConnected = false;

public:
    void init() {
        BLEDevice::init("BipedalBot");
        pServer = BLEDevice::createServer();

        BLEService* pService = pServer->createService(SERVICE_UUID);
        pCharacteristic = pService->createCharacteristic(
            CHARACTERISTIC_UUID,
            BLECharacteristic::PROPERTY_READ |
            BLECharacteristic::PROPERTY_WRITE |
            BLECharacteristic::PROPERTY_NOTIFY
        );
        pCharacteristic->addDescriptor(new BLE2902());
        pService->start();

        BLEAdvertising* pAdvertising = BLEDevice::getAdvertising();
        pAdvertising->addServiceUUID(SERVICE_UUID);
        BLEDevice::startAdvertising();

        Serial.println("BLE started | BLE 已启动");
    }

    String readCommand() {
        std::string value = pCharacteristic->getValue();
        if (value.length() > 0) {
            return String(value.c_str());
        }
        return "";
    }

    void sendText(const char* text) {
        pCharacteristic->setValue(text);
        pCharacteristic->notify();
    }
};
```

#### 蓝牙连接测试步骤 | Bluetooth Connection Test Steps

```
步骤 1: 上传代码 | Upload code
  → 串口监视器显示 "Remote Control Ready"
  → Serial Monitor shows "Remote Control Ready"

步骤 2: 手机配对 | Phone pairing
  → 设置 → 蓝牙 → 搜索 "BipedalBot"
  → Settings → Bluetooth → Search "BipedalBot"
  → 配对 PIN: 1234 或 0000

步骤 3: 打开蓝牙串口 App | Open Bluetooth serial app
  → 连接 BipedalBot | Connect to BipedalBot
  → 发送 "F" → App 应显示 "OK: Forward"
  → 串口监视器同时显示速度变化

步骤 4: 测试所有命令 | Test all commands
  → F → 前进 | Forward
  → B → 后退 | Backward
  → L → 左转 | Left
  → R → 右转 | Right
  → S → 停止 | Stop
  → X → 急停 | Emergency stop
  → V:5.0 → 精确速度 | Exact speed
  → T:3.0 → 精确转向 | Exact turn

步骤 5: 放到机器人上测试 | Test on robot
  → 先用手拿着（不放到地面）
  → 发 F → 观察电机转动方向
  → 发 S → 电机应停止
  → 确认方向无误后再放到地面
```

#### 常见问题排查 | Common Issues

| 问题 | 原因 | 解决方法 |
|------|------|----------|
| 手机找不到蓝牙 | ESP32 BT 未启动 | 检查 `SerialBT.begin()` 返回值 |
| 配对失败 | PIN 不对 | 尝试 1234, 0000, 123456 |
| 连接后断开 | 距离太远/干扰 | 靠近 ESP32，远离 WiFi 路由器 |
| 发命令没反应 | App 没发换行符 | 命令后加 `\n`，或用自带终端 |
| 命令解析错误 | 格式不对 | 检查命令格式，用串口监视器调试 |
| 延迟很大 | 遥测太频繁/打印太多 | 减少串口打印频率 |
| 收到命令但不动 | 模式是 STOP | 先发 "S" 退出急停状态 |
| iOS 连不上 | iOS 不支持 SPP | 使用 BLE 版本 |

| Issue | Cause | Solution |
|-------|-------|----------|
| Phone can't find BT | ESP32 BT not started | Check `SerialBT.begin()` return value |
| Pairing fails | Wrong PIN | Try 1234, 0000, 123456 |
| Disconnects | Distance/interference | Move closer, away from WiFi |
| No response | App not sending newline | Add `\n`, use built-in terminal |
| Parse error | Wrong format | Check format, debug with Serial Monitor |
| High latency | Too much printing | Reduce print frequency |
| Receives but won't move | In STOP mode | Send "S" to exit emergency stop |
| iOS won't connect | iOS lacks SPP | Use BLE version |

---

## 今日作业 | Today's Task

1. **必做 | Required:** 实现蓝牙串口通信，手机能成功连接 ESP32
   Implement Bluetooth serial, phone successfully connects to ESP32

2. **必做 | Required:** 实现文本命令遥控（F/B/L/R/S），用手拿着机器人测试电机响应
   Implement text command remote (F/B/L/R/S), test motor response while holding robot

3. **必做 | Required:** 配置 Serial Bluetooth Terminal 的自定义按钮（至少 6 个）
   Configure Serial Bluetooth Terminal custom buttons (at least 6)

4. **必做 | Required:** 将蓝牙遥控集成到串级 PID 主程序中，测试遥控驾驶
   Integrate Bluetooth remote into cascaded PID main program, test remote driving

5. **选做 | Optional:** 实现摇杆映射（如果 App 支持虚拟摇杆）
   Implement joystick mapping (if app supports virtual joystick)

6. **思考 | Reflection:**
   - 为什么我们选 Bluetooth Classic 而不是 BLE？
   - 通信协议中校验和的作用是什么？如果不用校验和会怎样？
   - 死区（dead zone）在摇杆控制中为什么重要？

   - Why did we choose Classic Bluetooth over BLE?
   - What is the role of checksum in the protocol? What if we skip it?
   - Why is dead zone important in joystick control?

---

## 今日检查点 | Checkpoint

- [ ] ESP32 蓝牙已启动，手机能搜索到 "BipedalBot"
  ESP32 Bluetooth started, phone can discover "BipedalBot"
- [ ] 手机成功配对并连接
  Phone successfully paired and connected
- [ ] 文本命令遥控正常工作（F/B/L/R/S）
  Text command remote working (F/B/L/R/S)
- [ ] Serial Bluetooth Terminal 自定义按钮已配置
  Serial Bluetooth Terminal custom buttons configured
- [ ] 蓝牙遥控已集成到串级 PID 主程序
  Bluetooth remote integrated into cascaded PID main program
- [ ] 机器人能通过手机控制前进/后退/转弯/停止
  Robot controllable via phone: forward/backward/turn/stop
- [ ] 急停功能（X 命令）测试通过
  Emergency stop (X command) tested
- [ ] 理解了通信协议的基本结构（帧头+命令+数据+校验和）
  Understand basic protocol structure (header+cmd+data+checksum)

---

## 参考资源 | References

- [StackForce 轮足机器人 Gitee 仓库](https://gitee.com/StackForce/bipedal_wheeled_robot)
- [ESP32 BluetoothSerial 库文档](https://docs.espressif.com/projects/arduino-esp32/en/latest/libraries/bluetooth.html)
- [Serial Bluetooth Terminal (Google Play)](https://play.google.com/store/apps/details?id=de.kai_morich.serial_bluetooth_terminal)
- [ESP32 BLE 教程](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/bluetooth.html)

---

*最后更新: 2026-05-27*
