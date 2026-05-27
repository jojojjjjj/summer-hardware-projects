# ElectronBot Troubleshooting Guide / ElectronBot 故障排除指南

---

## How to Use This Guide / 如何使用本指南

Each section is organized by subsystem. For each problem:
每个部分按子系统组织。每个问题的格式为：

- **Symptom / 症状:** What you observe / 观察到的现象
- **Possible Cause / 可能原因:** Why it might happen / 可能的原因
- **Solution / 解决方案:** How to fix it / 如何修复

> **General Rule / 通用原则:** Always check power supply first.
> Most electronics problems are caused by insufficient or noisy power.
> 始终先检查电源。大多数电子问题由供电不足或电源噪声导致。

---

## 1. Power / 电源

### 1.1 Robot does not power on / 机器人无法开机

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| No LED activity, no display, PC does not detect USB device | USB cable is charge-only (no data wires) | Use a known-good USB-C cable that supports data transfer. Test with another device. / 使用确认支持数据传输的 USB-C 线缆。用其他设备测试。 |
| No LED activity | Polyfuse tripped due to short circuit | Unplug USB. Measure resistance between 3.3V and GND, and between 5V and GND. Should be > 1k ohm. If near 0 ohm, find and fix the short. / 拔掉 USB。测量 3.3V-GND 和 5V-GND 电阻。应大于 1k 欧姆。如接近 0 欧姆，找到并修复短路。 |
| No LED activity | DC-DC converter failed | Measure output of DC-DC converter. Should be 3.3V. If 0V, check input (5V from USB). Replace converter if input is present but no output. / 测量 DC-DC 输出。应为 3.3V。如为 0V，检查输入（USB 5V）。如输入正常但无输出，更换转换器。 |
| LED blinks then dies | Inrush current trip | Add a soft-start circuit or increase input capacitance gradually. / 增加软启动电路或逐步增加输入电容。 |

### 1.2 Intermittent reboots / 间歇性重启

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Robot resets when servos move | Voltage sag on 3.3V rail due to servo current spike | Add 470uF electrolytic capacitor + 100nF ceramic on the 5V servo bus, close to servos. Ensure 3.3V LDO has sufficient headroom (input > 4.5V). / 在 5V 舵机总线上靠近舵机处加 470uF 电解电容 + 100nF 陶瓷电容。确保 3.3V LDO 有足够余量（输入 > 4.5V）。 |
| Robot resets during USB communication | USB power instability or ground bounce | Use a powered USB hub instead of direct PC connection. Verify GND connections are solid between all boards. / 使用带电源的 USB 集线器代替直连电脑。验证所有板之间 GND 连接可靠。 |
| Random reboots during idle | Brown-out detector (BOD) triggering | Check STM32 BOD threshold setting. If 2.7V threshold, and 3.3V rail dips below 2.7V, raise threshold or fix power supply. / 检查 STM32 BOD 阈值设置。如阈值为 2.7V 且 3.3V 电源跌至 2.7V 以下，提高阈值或修复电源。 |

### 1.3 Servo power issues / 舵机电源问题

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Servos move slowly or weakly | Insufficient current from USB | USB 2.0 provides 500mA guaranteed. 5 servos can draw 1.5A peak. Use USB-C power delivery (negotiate 5V/2A) or external 5V supply. / USB 2.0 保证 500mA。5个舵机峰值电流 1.5A。使用 USB-C PD（协商 5V/2A）或外部 5V 电源。 |
| Servo power enable does not work | MOSFET gate not driven properly | Check PA1 GPIO output. Verify MOSFET gate-source voltage > 2.5V when enabled. Check gate pull-down resistor. / 检查 PA1 GPIO 输出。使能时确认 MOSFET 栅源电压 > 2.5V。检查栅极下拉电阻。 |
| One servo has no power | Broken wire in daisy chain | Measure continuity of 5V and GND at each servo board. The daisy chain must have solid connections. / 测量每个舵机板 5V 和 GND 的连通性。菊花链必须有可靠连接。 |

---

## 2. Display / 显示屏

### 2.1 Blank screen / 屏幕空白

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Display is completely black, no backlight | Backlight not powered or MOSFET off | Check 3.3V at LED pin of GC9A01. Verify PWM on PC1 (backlight control). Test with backlight forced ON. / 检查 GC9A01 LED 引脚的 3.3V。验证 PC1 上的 PWM（背光控制）。强制开启背光测试。 |
| Backlight on but screen is white/gray | SPI communication failure | Check SPI1 connections: PA5 (SCK), PA7 (MOSI), PB2 (DC), PB12 (CS). Use oscilloscope to verify SPI clock and data signals. / 检查 SPI1 连接：PA5 (SCK)、PA7 (MOSI)、PB2 (DC)、PB12 (CS)。用示波器验证 SPI 时钟和数据信号。 |
| Backlight on but screen is white | Display reset not asserted | GC9A01 requires a proper reset sequence. Check PB11 (RST) — must be pulled LOW for > 10us, then HIGH. Verify with oscilloscope. / GC9A01 需要正确的复位序列。检查 PB11 (RST)——必须拉低 > 10us 再拉高。用示波器验证。 |
| Screen shows random noise | SPI speed too high or wiring too long | Reduce SPI clock speed (try 1MHz). Check for loose connections. Verify 100nF decoupling cap is on GC9A01 VCC. / 降低 SPI 时钟速度（尝试 1MHz）。检查松动连接。验证 GC9A01 VCC 上有 100nF 去耦电容。 |

### 2.2 Wrong colors / 颜色错误

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Red and blue are swapped | RGB vs BGR pixel format | GC9A01 supports both RGB and BGR. Change MADCTL register (0x36) bit 3 (RGB/BGR). / GC9A01 支持 RGB 和 BGR。修改 MADCTL 寄存器（0x36）第 3 位。 |
| Colors are shifted or corrupted | DMA alignment issue | Ensure frame buffer is aligned to 32-bit boundary for DMA. Verify pixel format is RGB565 (16-bit per pixel). / 确保帧缓冲区对齐到 32 位边界以供 DMA 使用。验证像素格式为 RGB565（每像素 16 位）。 |
| Screen has a color tint | Incorrect gamma or brightness settings | Adjust GC9A01 gamma registers. Check backlight PWM duty cycle — too dim can cause color shift. / 调整 GC9A01 伽马寄存器。检查背光 PWM 占空比——过暗可能导致偏色。 |

### 2.3 Display artifacts / 显示异常

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Horizontal lines or tearing | SPI/DMA bandwidth insufficient or not vsynced | Use DMA double-buffering. Ensure frame buffer is fully written before sending to display. Reduce FPS if needed. / 使用 DMA 双缓冲。确保帧缓冲区完全写入后再发送到显示屏。必要时降低帧率。 |
| Partial screen update | CS pin toggling during transfer | Ensure CS stays LOW for the entire frame. Check for interrupt handler that might toggle CS prematurely. / 确保 CS 在整个帧传输期间保持低电平。检查是否有中断处理程序提前切换 CS。 |
| Image freezes after some time | SPI DMA transfer error | Check DMA transfer complete callback. Enable DMA error interrupt. Verify no memory corruption in frame buffer. / 检查 DMA 传输完成回调。启用 DMA 错误中断。验证帧缓冲区无内存损坏。 |

---

## 3. Servo / 舵机

### 3.1 Servo jitter / 舵机抖动

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Servo vibrates at target position | PID Kp too high (oscillation) | Reduce PID Kp value. Start with Kp=1.0, Ki=0, Kd=0. Increase Kp until oscillation starts, then reduce by 30%. / 降低 PID Kp 值。从 Kp=1.0, Ki=0, Kd=0 开始。增加 Kp 直到开始振荡，然后降低 30%。 |
| Servo vibrates continuously | Noisy potentiometer feedback | Add 100nF capacitor between pot wiper and GND, as close to ADC input as possible. Use software low-pass filter on ADC readings (moving average, 8 samples). / 在电位器滑动端和 GND 之间加 100nF 电容，尽量靠近 ADC 输入。对 ADC 读数使用软件低通滤波（滑动平均，8个样本）。 |
| Servo vibrates when others move | Ground bounce / shared power noise | Add decoupling capacitors at each servo board (100uF + 100nF). Use star ground topology instead of daisy-chain ground. / 在每个舵机板加去耦电容（100uF + 100nF）。使用星形接地拓扑代替菊花链接地。 |
| Low-frequency oscillation (hunting) | PID integral windup | Add integral windup limit. Clamp Ki accumulator to +/- 50% of output range. / 增加积分限幅。将 Ki 累加器钳位到输出范围的 +/- 50%。 |

### 3.2 Servo no response / 舵机无响应

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Servo not found in I2C scan | Wrong I2C address (jumper misconfiguration) | Verify address jumpers on the servo driver board match the expected address. Use the truth table in the assembly guide. / 验证舵机驱动板上的地址跳线是否与预期地址匹配。使用组装指南中的真值表。 |
| Servo not found in I2C scan | I2C bus wiring error (SDA/SCL swapped) | SDA and SCL must not be swapped. Verify pin mapping. I2C bus will not function with swapped lines. / SDA 和 SCL 不能互换。验证引脚映射。I2C 总线在线缆互换时无法工作。 |
| Servo not found in I2C scan | Broken wire in daisy chain | Test continuity of SDA and SCL at each servo board. One broken connection will disable all downstream servos. / 测试每个舵机板 SDA 和 SCL 的连通性。一个断开的连接将禁用所有下游舵机。 |
| I2C scan finds device but servo does not move | FM116B motor driver not enabled | Check PA6 (motor enable) on the servo board. Must be HIGH for motor to run. / 检查舵机板上的 PA6（电机使能）。必须为高电平电机才能运行。 |
| I2C scan finds device but servo does not move | Motor disconnected or burned out | Measure motor coil resistance (should be 5-20 ohm for small DC motor). If open circuit, motor is burned out — replace. / 测量电机线圈电阻（小型直流电机应为 5-20 欧姆）。如开路，电机已烧毁——更换。 |
| Servo does not hold position under load | PID gain too low | Increase Kp until servo holds against expected load. If motor stalls before holding, check power supply voltage under load. / 增加 Kp 直到舵机能抵抗预期负载。如果电机堵转前无法保持，检查负载下的电源电压。 |

### 3.3 Servo overshoot / 舵机超调

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Servo overshoots target, then settles | PID Kd too low (insufficient damping) | Increase Kd to add damping. Typical starting values: Kp=2.0, Ki=0.1, Kd=0.5. Adjust gradually. / 增加 Kd 增加阻尼。典型起始值：Kp=2.0, Ki=0.1, Kd=0.5。逐步调整。 |
| Large overshoot on fast movements | Velocity too high for PID to track | Limit maximum velocity in firmware. Ramp target position gradually instead of step changes. / 在固件中限制最大速度。渐进式改变目标位置而非阶跃变化。 |
| Overshoot only in one direction | Asymmetric mechanical load | The arm has gravity working with or against it depending on direction. Use asymmetric PID gains or add gravity compensation term. / 手臂在不同方向受不同重力影响。使用非对称 PID 增益或增加重力补偿项。 |

### 3.4 PID tuning guide / PID 调参指南

```
  Step-by-step PID tuning / 逐步 PID 调参:

  1. Set Ki=0, Kd=0. Increase Kp until oscillation, then reduce by 30%.
     设 Ki=0, Kd=0。增加 Kp 直到振荡，然后降低 30%。
  2. With Kp set, slowly increase Kd until oscillation stops.
     保持 Kp，缓慢增加 Kd 直到振荡停止。
  3. Only if steady-state error exists, add small Ki (start at 0.01).
     仅当存在稳态误差时，增加小 Ki（从 0.01 开始）。
  4. Monitor for integral windup. Limit integral accumulator.
     监控积分饱和。限制积分累加器。

  Typical values for ElectronBot servos / ElectronBot 舵机典型值:
  ┌────────────────┬──────┬──────┬──────┐
  │ Servo / 舵机   │ Kp   │ Ki   │ Kd   │
  ├────────────────┼──────┼──────┼──────┤
  │ Arm (light)    │ 1.5  │ 0.05 │ 0.3  │
  │ Arm (heavy)    │ 2.5  │ 0.1  │ 0.5  │
  │ Neck           │ 2.0  │ 0.08 │ 0.4  │
  └────────────────┴──────┴──────┴──────┘

  These are starting points. Every servo will be slightly different
  due to mechanical variation.
  这些是起始值。由于机械差异，每个舵机会略有不同。
```

---

## 4. USB Communication / USB 通信

### 4.1 Driver installation / 驱动安装

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Windows: "USB device not recognized" | ElectronBot uses custom VID/PID, no driver installed | Install WinUSB driver using Zadig (https://zadig.akeo.ie). Select the ElectronBot device, set driver to WinUSB, click Replace Driver. / 使用 Zadig 安装 WinUSB 驱动。选择 ElectronBot 设备，设置驱动为 WinUSB，点击替换驱动。 |
| Windows: Device appears and disappears repeatedly | USB descriptor is malformed | Check USB device descriptor in firmware. Verify bLength, bDescriptorType, and all fields match USB specification. Use USB descriptor verification tool. / 检查固件中的 USB 设备描述符。验证所有字段符合 USB 规范。使用 USB 描述符验证工具。 |
| Linux: Permission denied accessing device | udev rules not configured | Create file /etc/udev/rules.d/99-electronbot.rules with: SUBSYSTEM=="usb", ATTR{idVendor}=="XXXX", ATTR{idProduct}=="YYYY", MODE="0666". Then run: sudo udevadm control --reload-rules / 创建 udev 规则文件，然后重新加载规则。 |

### 4.2 USB enumeration failure / USB 枚举失败

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Device not detected at all | USB3300 not properly soldered | Inspect USB3300 solder joints under magnification. The QFN thermal pad is critical. Reflow if necessary. / 在放大镜下检查 USB3300 焊点。QFN 散热焊盘至关重要。必要时回流焊。 |
| Device detected as "Unknown Device" | ULPI wiring error | Verify all 12 ULPI signal connections between STM32F405 and USB3300. One wrong wire will cause enumeration failure. / 验证 STM32F405 和 USB3300 之间所有 12 条 ULPI 信号连接。一根错误连线将导致枚举失败。 |
| Device detected but cannot transfer data | USB HS pull-ups missing or incorrect | USB3300 handles pull-ups internally. Verify RREF resistor (12k to GND) is correct. / USB3300 内部处理上拉。验证 RREF 电阻（12k 到 GND）正确。 |
| Works at Full-Speed but not High-Speed | 12MHz crystal for USB3300 missing or wrong frequency | USB3300 requires a precise 12MHz or 24MHz clock for HS operation. Verify crystal is oscillating with oscilloscope. / USB3300 HS 操作需要精确的 12MHz 或 24MHz 时钟。用示波器验证晶振正在振荡。 |
| Enumeration fails after firmware update | Firmware USB stack misconfigured | Verify USB HS clock is enabled (PLLSAI or alternative 48MHz source for USB). Check GPIO ULPI pin mux configuration. / 验证 USB HS 时钟已启用。检查 GPIO ULPI 引脚复用配置。 |

### 4.3 USB disconnection during operation / 运行中 USB 断开

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Disconnects when servos move | Voltage drop below USB minimum (4.5V) | Monitor 5V at USB connector with oscilloscope during servo movement. Add bulk capacitance (1000uF) at power input. / 用示波器监测舵机运动时 USB 连接器的 5V。在电源输入加储能电容（1000uF）。 |
| Random disconnections | Electromagnetic interference from motors | Add ferrite beads on motor power lines. Route USB cable away from motor wires. Use shielded USB cable. / 在电机电源线上加铁氧体磁珠。USB 线远离电机线。使用屏蔽 USB 线。 |
| Disconnects at specific arm positions | Cable pulled or pinched | Check USB cable routing. Ensure cable has slack for full range of motion. / 检查 USB 线缆走线。确保线缆在全运动范围内有余量。 |

---

## 5. Sensors / 传感器

### 5.1 MPU6050 IMU / 六轴传感器

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Accelerometer readings drift slowly | Temperature drift (normal behavior) | Implement temperature compensation. MPU6050 has internal temperature sensor. Record calibration at multiple temperatures. / 实施温度补偿。MPU6050 有内部温度传感器。在多个温度点记录校准数据。 |
| Gyroscope drift (integration error accumulates) | Gyro bias not calibrated | Calibrate at startup: keep robot still for 2 seconds, average gyro readings, store as bias offset. Subtract bias from all subsequent readings. / 启动时校准：保持机器人静止 2 秒，取陀螺仪读数平均值作为偏移。从后续读数中减去偏移。 |
| IMU values are all zero or constant | I2C communication failure | Verify I2C2 bus connections (PB10/PB11). Run I2C scan — MPU6050 should appear at 0x68. Check pull-up resistors (4.7k to 3.3V). / 验证 I2C2 总线连接。运行 I2C 扫描——MPU6050 应出现在 0x68。检查上拉电阻。 |
| IMU orientation seems wrong | Axes not aligned with robot frame | MPU6050 axes depend on module orientation. Map axes in software to match robot coordinate frame. / MPU6050 轴取决于模块方向。在软件中映射轴以匹配机器人坐标系。 |

### 5.2 APDS-9960 Gesture Sensor / APDS-9960 手势传感器

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| No gesture detection | Sensor window blocked by housing | Ensure the transparent window in the housing is clean and properly aligned with APDS-9960 lens. / 确保外壳透明窗口清洁且与 APDS-9960 镜头对齐。 |
| False gesture triggers | Ambient light interference | Adjust APDS-9960 proximity threshold (register 0x8C). Increase threshold to reduce false triggers. Shield sensor from direct sunlight. / 调整 APDS-9960 接近阈值（寄存器 0x8C）。提高阈值减少误触发。遮挡传感器避免直射阳光。 |
| Only detects swipes in one direction | Sensor orientation wrong in firmware | The APDS-9960 UP/DOWN/LEFT/RIGHT directions are relative to the sensor. Map them to robot's coordinate frame based on sensor orientation. / APDS-9960 的上下左右方向相对于传感器。根据传感器方向映射到机器人坐标系。 |
| Gesture range too short | Proximity gain too low | Increase proximity LED drive strength and receiver gain in APDS-9960 configuration registers. / 增加 APDS-9960 配置寄存器中的接近 LED 驱动强度和接收增益。 |

### 5.3 USB Camera / USB 摄像头

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Camera not detected on PC | CH334R USB HUB not working | Verify CH334R power and crystal. Check USB passthrough from head board through HUB to camera. / 验证 CH334R 电源和晶振。检查从主控板通过 HUB 到摄像头的 USB 直通。 |
| Camera image is black | Camera module defective or not initialized | Test camera module on a separate USB port first. Replace if confirmed defective. / 先在单独的 USB 端口测试摄像头模块。如确认损坏则更换。 |
| Camera image corrupted | USB bandwidth issue (HS/FS mismatch) | Ensure CH334R is operating at USB 2.0 HS. Check USB camera resolution and frame rate settings. Reduce resolution if bandwidth is limited. / 确保 CH334R 工作在 USB 2.0 HS 模式。检查 USB 摄像头分辨率和帧率设置。如带宽受限则降低分辨率。 |

---

## 6. Mechanical / 机械

### 6.1 Joint binding / 关节卡滞

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Arm movement is stiff or sticky | Bearing not fully seated or misaligned | Disassemble joint. Clean bearing and bearing seat. Re-press bearing until fully seated. Check for debris or 3D print burrs. / 拆开关节。清洁轴承和轴承座。重新压入轴承直到完全就位。检查是否有碎屑或 3D 打印毛刺。 |
| Arm catches at a specific angle | Internal cable rubbing on moving part | Open housing and inspect cable routing at the problem angle. Reroute or secure cables with adhesive clips. / 打开外壳，检查问题角度的线缆走线。重新走线或用胶扣固定。 |
| Neck rotation has tight spots | Neck bearing misaligned or overloaded | Check that head weight is centered on bearing. Verify bearing outer race is level in its seat. / 检查头部重量是否居中在轴承上。验证轴承外圈在其座中水平。 |

### 6.2 Backlash / 间隙回差

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Arm has play/wobble at rest | Gear backlash in servo gear train | This is inherent in standard servo gear trains. Minimize by using software backlash compensation: apply a small holding torque in the direction of gravity. / 这是标准舵机齿轮组的固有特性。使用软件间隙补偿最小化：在重力方向施加小保持扭矩。 |
| T-push rod has play at joint | Set screw loose on servo output shaft | Tighten set screw with thread-locker (Loctite 222). Check for wear on the flat spot of the output shaft. / 用螺纹锁固剂（Loctite 222）拧紧紧定螺钉。检查输出轴平面是否磨损。 |
| Direction changes cause a "click" and delay | Gear mesh too loose | Standard servos have fixed gear mesh. If backlash is excessive, the gears may be worn — replace servo. / 标准舵机齿轮啮合固定。如回差过大，齿轮可能已磨损——更换舵机。 |

### 6.3 Grinding or noise / 研磨或异响

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Grinding sound during movement | Servo driven past mechanical limit | Immediately stop movement. Set software angle limits to prevent reaching mechanical stops. Check for bent or deformed parts. / 立即停止运动。设置软件角度限位防止到达机械限位。检查是否有弯曲或变形零件。 |
| Clicking sound at certain angles | Cable catching on gear or structure | Inspect cable routing at the clicking angle. Reroute or secure cables. Replace damaged cables. / 检查异响角度的线缆走线。重新走线或固定线缆。更换损坏的线缆。 |
| Whining sound from servo | Motor bearing wear or gear friction | Normal to some extent for inexpensive servos. If loud, add a drop of light machine oil to the motor bearings. / 廉价舵机有一定程度的正常噪音。如声音大，在电机轴承上加一滴轻机油。 |
| Squeaking at joints | Dry bearing or plastic-on-plastic contact | Add PTFE lubricant or light oil to bearing surfaces. Do NOT use WD-40 (attracts dust, degrades plastic). / 在轴承表面加 PTFE 润滑剂或轻油。不要使用 WD-40（吸引灰尘，降解塑料）。 |

### 6.4 Mechanical drift / 机械漂移

| Symptom / 症状 | Possible Cause / 可能原因 | Solution / 解决方案 |
|---|---|---|
| Arm slowly droops over time | Potentiometer drift or PID not holding | Check potentiometer reading stability (should be within +/- 1 count at rest). Increase PID holding gain. / 检查电位器读数稳定性（静止时应 +/- 1 计数以内）。增加 PID 保持增益。 |
| Position drifts after many movements | Potentiometer wiper wear | Standard potentiometers wear over time. If drift is progressive, consider upgrading to magnetic encoder (AS5600) for longer life. / 标准电位器会随时间磨损。如漂移持续恶化，考虑升级为磁性编码器（AS5600）。 |

---

## 7. Diagnostic Tools / 诊断工具

### 7.1 I2C Bus Scanner / I2C 总线扫描器

```c
// Run on STM32F405 to scan I2C bus
// 在 STM32F405 上运行以扫描 I2C 总线

HAL_StatusTypeDef result;
uint8_t found = 0;

printf("Scanning I2C bus...\r\n");
for (uint8_t addr = 1; addr < 127; addr++) {
    result = HAL_I2C_IsDeviceReady(&hi2c1, (addr << 1), 3, 50);
    if (result == HAL_OK) {
        printf("Found device at 0x%02X\r\n", addr);
        found++;
    }
}
printf("Scan complete. %d device(s) found.\r\n", found);
```

Expected output / 预期输出:
```
Scanning I2C bus...
Found device at 0x01  (Servo #1)
Found device at 0x02  (Servo #2)
Found device at 0x03  (Servo #3)
Found device at 0x04  (Servo #4)
Found device at 0x05  (Servo #5)
Found device at 0x39  (APDS-9960, if on same bus)
Found device at 0x68  (MPU6050, if on same bus)
Scan complete. 5-7 device(s) found.
```

### 7.2 SPI Display Test / SPI 显示测试

```c
// Fill screen with solid color to test SPI/DMA
// 填充纯色以测试 SPI/DMA

void test_display_fill(uint16_t color) {
    // Set column address (0-239)
    // Set row address (0-239)
    // Write 240*240 pixels = 57600 pixels * 2 bytes = 115200 bytes
    HAL_SPI_Transmit_DMA(&hspi1, (uint8_t*)framebuffer, 115200);
    // Wait for DMA complete
    while (HAL_SPI_GetState(&hspi1) != HAL_SPI_STATE_READY);
}

// Test colors / 测试颜色
test_display_fill(0xF800);  // Red / 红色
HAL_Delay(1000);
test_display_fill(0x07E0);  // Green / 绿色
HAL_Delay(1000);
test_display_fill(0x001F);  // Blue / 蓝色
HAL_Delay(1000);
test_display_fill(0xFFFF);  // White / 白色
HAL_Delay(1000);
test_display_fill(0x0000);  // Black / 黑色
```

### 7.3 Servo Response Test / 舵机响应测试

```c
// Test individual servo response
// 测试单个舵机响应

uint8_t buf[4];
int16_t target = 0;

// Read current angle / 读取当前角度
HAL_I2C_Mem_Read(&hi2c1, (0x01 << 1), 0x02, 1, buf, 2, 100);
int16_t current = (buf[0] << 8) | buf[1];
printf("Servo #1 current angle: %d (0.01 deg)\r\n", current);

// Set target angle 4500 (45.00 degrees) / 设置目标角度 4500（45.00度）
target = 4500;
buf[0] = (target >> 8) & 0xFF;
buf[1] = target & 0xFF;
HAL_I2C_Mem_Write(&hi2c1, (0x01 << 1), 0x01, 1, buf, 2, 100);
printf("Set target to 45.00 degrees\r\n");

HAL_Delay(500);

// Read back current angle / 读回当前角度
HAL_I2C_Mem_Read(&hi2c1, (0x01 << 1), 0x02, 1, buf, 2, 100);
current = (buf[0] << 8) | buf[1];
printf("Servo #1 current angle: %d (0.01 deg) = %.2f deg\r\n",
       current, current / 100.0);
```

---

## 8. Quick Reference: LED Error Codes / 快速参考：LED 错误代码

```
  Status LED on PC13 (head board) / 状态 LED 在 PC13（主控板）:

  Pattern                          Meaning / 含义
  ─────────────────────────────────────────────────────────
  Solid ON                         Bootloader mode / 引导加载模式
  1 blink per second               Normal operation / 正常运行
  2 fast blinks, pause, repeat     I2C bus error / I2C 总线错误
  3 fast blinks, pause, repeat     USB enumeration failed / USB 枚举失败
  4 fast blinks, pause, repeat     Display SPI error / 显示 SPI 错误
  5 fast blinks, pause, repeat     Sensor error / 传感器错误
  Continuous fast blink            Fault / Hard fault / 故障 / 硬件错误
```

---

## 9. Getting Help / 获取帮助

If you cannot resolve an issue using this guide:
如果本指南无法解决您的问题：

1. Check the ElectronBot GitHub repository for known issues and firmware updates.
   查看 ElectronBot GitHub 仓库的已知问题和固件更新。
2. Use an oscilloscope or logic analyzer to capture the failing signal.
   使用示波器或逻辑分析仪捕获故障信号。
3. Simplify the system: test each subsystem individually.
   简化系统：单独测试每个子系统。
4. Verify power supply voltages under load with a multimeter.
   用万用表验证负载下的电源电压。

---

*最后更新：2026-05-27*
