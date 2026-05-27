# 接线指南 | Wiring Guide

## 总览 | Overview

本机器人使用 ESP32-S3 作为主控制器，通过 I2C 总线连接 MPU6050（姿态传感）和 PCA9685（舵机驱动），通过 UART Serial2 连接 StackForce 双 BLDC 驱动板（电机控制），通过 UART Serial1 连接 SBUS 遥控接收机。

> This robot uses the ESP32-S3 as the main controller. It connects to MPU6050 (IMU) and PCA9685 (servo driver) via I2C bus, to the StackForce Dual BLDC driver board via UART Serial2 (motor control), and to the SBUS RC receiver via UART Serial1.

---

## 整体接线拓扑图 | Overall Wiring Topology

```
                           ┌──────────────────────┐
                           │     3S LiPo (11.1V)   │
                           │    1500mAh XT60       │
                           └──────────┬───────────┘
                                      │ (+11.1V)
                            ┌─────────┴─────────┐
                            │   电源开关 (Power)  │
                            └─────────┬─────────┘
                                      │
                     ┌────────────────┼────────────────┐
                     │                │                │
              (VM 12V输入)     (5V 降压输出)           │
          ┌────┴─────┐    ┌────┴─────┐                │
          │  BLDC    │    │  ESP32   │                │
          │  驱动板   │    │  -S3     │                │
          │ (Dual 5A)│    │          │                │
          └──┬───┬───┘    └──┬───┬───┘                │
             │   │           │   │                    │
        ┌────┘   └────┐      │   │                    │
        │              │     │   │                    │
   ┌────┴────┐  ┌─────┴──┐  │   │                    │
   │ BLDC    │  │ BLDC   │  │   │                    │
   │ Motor 0 │  │ Motor 1│  │   │                    │
   │ (2808)  │  │ (2808) │  │   │                    │
   └─────────┘  └────────┘  │   │                    │
                             │   │                    │
                  ┌──────────┘   └──────────┐         │
                  │                         │         │
           (I2C Bus: SDA=GPIO1, SCL=GPIO2)  │         │
           ┌────────┴────────┐              │         │
           │                 │              │         │
     ┌─────┴─────┐   ┌──────┴──────┐  ┌────┴────┐   │
     │  MPU6050  │   │  PCA9685    │  │  SBUS   │   │
     │  IMU模块  │   │  舵机驱动    │  │  接收机  │   │
     │ (0x68)    │   │  (0x40)     │  │(Serial1)│   │
     └───────────┘   └──────┬──────┘  └─────────┘   │
                            │                        │
                     ┌──────┼──────┬──────┐           │
                     │      │      │      │           │
                ┌────┴─┐┌───┴─┐┌──┴──┐┌──┴──┐        │
                │舵机 0││舵机1││舵机2││舵机3│        │
                │左前  ││左后 ││右前 ││右后 │        │
                └──────┘└─────┘└─────┘└─────┘        │
                                                    │
               ESP32-S3 通过 USB-TypeC 连接电脑烧录  │
               ESP32-S3 powered via USB-C or 5V BEC │
```

---

## ESP32-S3 引脚分配表 | ESP32-S3 Pin Assignment

根据 StackForce 官方代码 (`main.cpp`) 的引脚定义：

> Based on the StackForce official code (`main.cpp`) pin definitions:

| ESP32-S3 GPIO | 功能 | 连接目标 | 备注 |
|--------------|------|---------|------|
| GPIO 1 | I2C SDA | MPU6050 SDA + PCA9685 SDA | `Wire.begin(1,2,400000UL)` |
| GPIO 2 | I2C SCL | MPU6050 SCL + PCA9685 SCL | 400kHz I2C 时钟 |
| GPIO 41 | SBUS RX | SBUS 遥控接收机 RX 信号 | `Serial1`，`SBUSPIN 41` |
| GPIO 42 | 舵机使能 | PCA9685 OE 引脚（高电平使能） | `SERVO_ENABLE_PIN 42` |
| Serial2 TX | UART TX | BLDC 驱动板 RX | 电机通信（波特率见驱动板设置） |
| Serial2 RX | UART RX | BLDC 驱动板 TX | 读取电机编码器反馈 |
| USB-C | USB | 电脑（烧录/调试） | `Serial.begin(921600)` |

### UART 串口分配 | UART Serial Assignment

| 串口 | 功能 | 对象 | 波特率 |
|------|------|------|--------|
| Serial (USB) | 调试输出 | 电脑串口监视器 | 921600 |
| Serial1 | SBUS 遥控 | 遥控接收机 | 100000 (SBUS 协议固定) |
| Serial2 | BLDC 电机通信 | StackForce 双 BLDC 驱动板 | 见驱动板配置 |

---

## I2C 总线接线 | I2C Bus Wiring

MPU6050 和 PCA9685 共用同一条 I2C 总线：

> MPU6050 and PCA9685 share the same I2C bus:

```
    ESP32-S3
  ┌──────────┐
  │ GPIO 1 (SDA) ──┬──── MPU6050 SDA (地址 0x68)
  │                └──── PCA9685 SDA (地址 0x40)
  │ GPIO 2 (SCL) ──┬──── MPU6050 SCL
  │                └──── PCA9685 SCL
  │ 3.3V ──────────┬──── MPU6050 VCC
  │                └──── PCA9685 VCC
  │ GND ───────────┬──── MPU6050 GND
  │                └──── PCA9685 GND
  └──────────┘
```

### MPU6050 接线详情 | MPU6050 Wiring Detail

| MPU6050 引脚 | 连接至 | 线色建议 |
|-------------|--------|---------|
| VCC | ESP32-S3 3.3V | 红色 |
| GND | ESP32-S3 GND | 黑色 |
| SCL | ESP32-S3 GPIO 2 | 黄色 |
| SDA | ESP32-S3 GPIO 1 | 绿色 |
| AD0 | 悬空或接 GND | --（地址 = 0x68） |
| INT | 未使用 | -- |

> 注意：MPU6050 使用 3.3V 供电（与 ESP32-S3 相同）。不要接 5V！I2C 地址为 0x68（AD0 接 GND 或悬空）。
>
> Note: MPU6050 is powered by 3.3V (same as ESP32-S3). Do NOT connect to 5V! I2C address is 0x68 (AD0 to GND or floating).

### PCA9685 舵机驱动接线 | PCA9685 Servo Driver Wiring

| PCA9685 引脚 | 连接至 | 线色建议 |
|-------------|--------|---------|
| SDA | ESP32-S3 GPIO 1 (I2C SDA) | 绿色 |
| SCL | ESP32-S3 GPIO 2 (I2C SCL) | 黄色 |
| VCC | ESP32-S3 3.3V（逻辑供电） | 红色 |
| GND | ESP32-S3 GND | 黑色 |
| V+ | 外部 5V-6V（舵机动力电源） | 红色（粗线） |
| OE | ESP32-S3 GPIO 42（使能引脚） | 橙色 |

舵机连接到 PCA9685 通道：

| PCA9685 通道 | 舵机 | 代码通道号 |
|-------------|------|-----------|
| CH 3 | 左前舵机 (Left Front) | `servos.setAngle(3, ...)` |
| CH 4 | 左后舵机 (Left Rear) | `servos.setAngle(4, ...)` |
| CH 5 | 右前舵机 (Right Front) | `servos.setAngle(5, ...)` |
| CH 6 | 右后舵机 (Right Rear) | `servos.setAngle(6, ...)` |

> 注意：舵机动力电源 (V+) 需要独立 5V~6V 供电（舵机总电流可达 4A+），不能从 ESP32-S3 取电。可使用电机驱动板上的 5V BEC 输出。
>
> Note: Servo power supply (V+) requires an independent 5V-6V source (servos can draw 4A+ total). Do NOT power servos from ESP32-S3. Use the 5V BEC output from the motor driver board.

---

## BLDC 电机驱动接线 | BLDC Motor Driver Wiring

StackForce 双 BLDC 5A 驱动板通过 UART 串口与 ESP32-S3 通信，控制两个无刷电机。

> The StackForce Dual BLDC 5A driver board communicates with the ESP32-S3 via UART serial, controlling two brushless motors.

### 驱动板到 ESP32-S3 | Driver Board to ESP32-S3

| 驱动板引脚 | 连接至 | 功能 |
|-----------|--------|------|
| RX | ESP32-S3 Serial2 TX | 接收电机指令 |
| TX | ESP32-S3 Serial2 RX | 返回编码器数据 |
| GND | ESP32-S3 GND | 共地（必须！） |
| 5V OUT (BEC) | PCA9685 V+ 或 ESP32-S3 VIN | 降压输出（可选） |

### 驱动板到电机 | Driver Board to Motors

| 驱动板端口 | 连接至 | 功能 |
|-----------|--------|------|
| M0 A/B/C 相 | BLDC Motor 0 三相线 | 驱动左轮电机 |
| M0 编码器 | Motor 0 磁编码器（如 AS5600） | 位置/速度反馈 |
| M1 A/B/C 相 | BLDC Motor 1 三相线 | 驱动右轮电机 |
| M1 编码器 | Motor 1 磁编码器（如 AS5600） | 位置/速度反馈 |

### 电机三相线接线 | Motor Phase Wiring

```
    BLDC 驱动板
  ┌──────────────┐
  │  M0_A ──── 电机0 A 相（黄/蓝线）
  │  M0_B ──── 电机0 B 相（绿/红线）
  │  M0_C ──── 电机0 C 相（红线/黑线）
  │               │
  │  M1_A ──── 电机1 A 相
  │  M1_B ──── 电机1 B 相
  │  M1_C ──── 电机1 C 相
  └──────────────┘
```

> 重要：电机三相线的顺序决定旋转方向。如果电机反转，交换任意两根相线即可。
>
> Important: The phase wire order determines the rotation direction. If the motor runs in reverse, swap any two phase wires.

---

## 电源接线 | Power Wiring

### 电源拓扑 | Power Topology

```
    3S LiPo (11.1V)
    XT60 插头
         │
    ┌────┴────┐
    │ 电源开关 │
    └────┬────┘
         │
    ┌────┴────────────────────────────────┐
    │                                     │
    │ (+11.1V)                    (+11.1V) │
    │                                     │
    │  BLDC 驱动板 VM                 降压模块（如需）│
    │  (12V 输入)                    (11.1V→5V)   │
    │    │                               │         │
    │    ├── 5V BEC 输出 ──→ PCA9685 V+  │         │
    │    │                    (舵机电源)  │         │
    │    │                               │         │
    │    └── 驱动 M0, M1 电机            │         │
    │                                    │         │
    │  ESP32-S3 VIN ← 5V (USB 或 BEC)   │         │
    │  ESP32-S3 3.3V → MPU6050 VCC      │         │
    │  ESP32-S3 3.3V → PCA9685 VCC (逻辑)│         │
    └────────────────────────────────────┘
```

### 电源接线详情 | Power Wiring Detail

| 连接 | 线径/规格 | 说明 |
|------|----------|------|
| 电池 (+) → 开关 → 驱动板 VM | ≥18AWG 硅胶线 | 主电源，电流可达 10A+ |
| 电池 (-) → 驱动板 GND | ≥18AWG 硅胶线 | 共地 |
| 驱动板 5V BEC → PCA9685 V+ | 20AWG | 舵机动力电源 |
| ESP32-S3 3.3V → MPU6050 VCC | 杜邦线 | IMU 供电 |
| ESP32-S3 3.3V → PCA9685 VCC | 杜邦线 | 逻辑供电（仅 I2C 通信） |
| 所有 GND 互连 | 杜邦线/硅胶线 | **必须共地！** |

### 电压等级说明 | Voltage Level Notes

| 设备 | 工作电压 | 注意事项 |
|------|---------|---------|
| 3S 锂电池 | 11.1V（满电 12.6V） | 主电源 |
| BLDC 驱动板 | 7.4V-14.8V | 直接接电池 |
| ESP32-S3 | 3.3V 逻辑，VIN 5V | 不要将 11.1V 直接接到 ESP32！ |
| MPU6050 模块 | 3.3V-5V（推荐 3.3V） | 与 ESP32-S3 共电压 |
| PCA9685 逻辑 | 3.3V-5V | I2C 信号 3.3V 即可 |
| 舵机 (MG996R) | 4.8V-7.2V | 推荐 6V 供电 |

> **危险警告：** ESP32-S3 的 GPIO 工作电压为 3.3V。绝对不要将 11.1V 电池电压直接连接到 ESP32-S3 的任何引脚！ESP32-S3 可通过 USB 供电，或通过 VIN 引脚输入 5V。如果从电池取电，必须使用降压模块（BEC）将 11.1V 降至 5V。
>
> **DANGER:** ESP32-S3 GPIOs operate at 3.3V. NEVER connect the 11.1V battery directly to any ESP32-S3 pin! ESP32-S3 can be powered via USB or through the VIN pin at 5V. If powering from the battery, you MUST use a step-down converter (BEC) to reduce 11.1V to 5V.

---

## SBUS 遥控接收机接线 | SBUS RC Receiver Wiring

（可选配件 - 用于遥控器控制机器人）

> (Optional -- for RC controller-based robot control)

| 接收机引脚 | 连接至 | 功能 |
|-----------|--------|------|
| SBUS 信号 | ESP32-S3 GPIO 41 (Serial1 RX) | 遥控信号输入 |
| GND | ESP32-S3 GND | 共地 |
| 5V | ESP32-S3 5V/VIN | 接收机供电 |

> 注意：SBUS 信号是反相串口（100000 波特率，8E2），需使用支持反相串口的 ESP32 硬件串口。ESP32-S3 的 Serial1 原生支持。
>
> Note: SBUS signal is an inverted serial protocol (100000 baud, 8E2). The ESP32-S3 Serial1 natively supports inverted serial.

---

## 分步接线指南 | Step-by-Step Wiring Instructions

### 第一步：电源接线（最重要！）| Step 1: Power Wiring (Most Important!)

> **安全警告：** 电源接线错误可能导致元件烧毁甚至电池起火。请务必反复检查后再通电。
>
> **Safety Warning:** Incorrect power wiring can destroy components or cause battery fire. Double-check all connections before powering on.

1. 检查电池电压（万用表测量，应为 11.1V-12.6V）
2. 确认电源开关处于 **关闭** 状态
3. 将电池 XT60 插头连接到电源线（红线接正极，黑线接负极）
4. 电源线另一端连接到电源开关
5. 开关输出端连接到 BLDC 驱动板 VM 和 GND
6. **暂不安装电池**，等待所有信号线接好

### 第二步：I2C 总线接线 | Step 2: I2C Bus Wiring

1. 用杜邦线连接 ESP32-S3 GPIO 1 (SDA) 到面包板/PCA9685 SDA
2. 用杜邦线连接 ESP32-S3 GPIO 2 (SCL) 到面包板/PCA9685 SCL
3. 连接 MPU6050 模块的 SDA/SCL 到同一总线
4. 连接 MPU6050 VCC → ESP32-S3 3.3V
5. 连接 MPU6050 GND → ESP32-S3 GND
6. 连接 PCA9685 VCC（逻辑）→ ESP32-S3 3.3V
7. 连接 PCA9685 GND → ESP32-S3 GND

### 第三步：电机驱动接线 | Step 3: Motor Driver Wiring

1. BLDC 驱动板 RX → ESP32-S3 Serial2 TX
2. BLDC 驱动板 TX → ESP32-S3 Serial2 RX
3. BLDC 驱动板 GND → ESP32-S3 GND（**必须共地**）
4. 电机 0 三相线连接到驱动板 M0 端口
5. 电机 1 三相线连接到驱动板 M1 端口
6. 编码器线连接到对应端口

### 第四步：舵机接线 | Step 4: Servo Wiring

1. PCA9685 OE 引脚 → ESP32-S3 GPIO 42
2. 舵机动力电源 (V+) → 5V BEC（来自驱动板或降压模块）
3. 左前舵机 → PCA9685 CH3
4. 左后舵机 → PCA9685 CH4
5. 右前舵机 → PCA9685 CH5
6. 右后舵机 → PCA9685 CH6

### 第五步：最终检查 | Step 5: Final Check

1. 检查所有电源线极性（红线=正，黑线=负）
2. 确认 ESP32-S3 任何引脚未直接连接到 11.1V
3. 确认所有 GND 已互连
4. 插入电池前用万用表测量关键节点电压
5. 先通过 USB 给 ESP32-S3 供电测试（不接电池）

---

## 接线验证清单 | Wiring Verification Checklist

上电前请逐项确认（每项打勾）：

> Check each item before powering on (check each box):

- [ ] 电池电压正确（11.1V-12.6V），正负极未接反
- [ ] 电源开关安装正确，处于关闭状态
- [ ] BLDC 驱动板 VM 连接电池正极（通过开关）
- [ ] BLDC 驱动板 GND 连接电池负极
- [ ] ESP32-S3 未直接连接到 11.1V（通过 USB 或 5V VIN 供电）
- [ ] MPU6050 VCC 连接到 ESP32-S3 3.3V（不是 5V）
- [ ] MPU6050 SDA → GPIO 1, SCL → GPIO 2
- [ ] PCA9685 SDA → GPIO 1, SCL → GPIO 2（与 MPU6050 共用总线）
- [ ] PCA9685 OE → GPIO 42
- [ ] PCA9685 V+（舵机电源）连接到独立 5V-6V 电源
- [ ] 电机三相线已连接到驱动板
- [ ] 所有 GND 已互连（电池 GND、驱动板 GND、ESP32-S3 GND）
- [ ] 没有裸露的导线接触（防止短路）
- [ ] SBUS 接收机信号线 → GPIO 41（如果使用遥控器）

---

## 快速测试步骤 | Quick Test Steps

### 测试 1：I2C 扫描 | Test 1: I2C Scan

上传 I2C 扫描程序到 ESP32-S3，确认检测到 0x68 (MPU6050) 和 0x40 (PCA9685)：

> Upload an I2C scanner program to the ESP32-S3 and confirm 0x68 (MPU6050) and 0x40 (PCA9685) are detected:

```cpp
#include <Wire.h>
void setup() {
  Serial.begin(115200);
  Wire.begin(1, 2, 400000UL);
  Serial.println("I2C Scanner starting...");
}
void loop() {
  Serial.println("Scanning...");
  for (byte addr = 1; addr < 127; addr++) {
    Wire.beginTransmission(addr);
    if (Wire.endTransmission() == 0) {
      Serial.printf("Device found at 0x%02X\n", addr);
    }
  }
  delay(3000);
}
```

期望输出 / Expected output:
- `Device found at 0x40` -- PCA9685 舵机驱动
- `Device found at 0x68` -- MPU6050 IMU

### 测试 2：IMU 数据读取 | Test 2: IMU Data Read

使用 StackForce 的 `SF_IMU` 库读取姿态角，确认 pitch/roll 数据正常变化。

### 测试 3：电机通信 | Test 3: Motor Communication

向 Serial2 发送测试指令，确认驱动板响应。观察电机是否能转动。

> 如果以上测试全部通过，恭喜！硬件接线正确。如遇问题，请参考 `troubleshooting.md`。
>
> If all tests pass, congratulations! The hardware wiring is correct. If you encounter issues, please refer to `troubleshooting.md`.
