# ElectronBot Assembly Steps / ElectronBot 组装步骤

---

## Before You Begin / 开始之前

> **Safety Warning / 安全警告:**
> - Wear ESD wrist strap when handling PCBs and ICs.
>   处理 PCB 和 IC 时请佩戴防静电手环。
> - Soldering iron tip temperature exceeds 300C. Keep flammable materials away.
>   烙铁头温度超过 300C。远离易燃物品。
> - Work in a well-ventilated area. Solder fumes are toxic.
>   在通风良好的环境中工作。焊锡烟雾有毒。
> - Disconnect all power before making or changing connections.
>   进行连接或更改连接前，请断开所有电源。
> - Keep small parts away from children and pets (choking hazard).
>   小零件远离儿童和宠物（窒息危险）。

**Estimated assembly time / 预计组装时间: 6-10 hours**

---

## Phase 1: PCB Preparation and Soldering / 第一阶段：PCB 准备与焊接

### Step 1.1: Inspect PCBs / 检查 PCB 板

```
  Unpack and visually inspect all 7 PCBs:
  拆包并目视检查全部 7 块 PCB：

  [ ] Head board (主控板) x1
  [ ] Sensor board (传感器板) x1
  [ ] Servo driver board (舵机驱动板) x5

  Check for: manufacturing defects, misaligned pads, broken traces.
  检查：制造缺陷、焊盘错位、断线。
```

> **Warning / 警告:** If any PCB has visible damage, do not proceed.
> Contact the PCB manufacturer for replacement.
> 如果任何 PCB 有可见损坏，请勿继续。联系 PCB 制造商更换。

### Step 1.2: Solder Head Board / 焊接主控板

**Order: smallest to largest components / 焊接顺序：从小到大元件**

```
  1. Apply solder paste to all pads / 在所有焊盘上涂焊锡膏
     ┌────────────────────────────────────────────────────┐
     │  HEAD BOARD (top view) / 主控板（顶视图）           │
     │                                                    │
     │   ┌───┐           ┌──────┐        ┌───┐           │
     │   │Y1 │           │U1    │        │U3 │           │
     │   │8M │           │STM32 │        │USB│           │
     │   └───┘           │F405  │        │330│           │
     │                    └──────┘        │0  │           │
     │                                    └───┘           │
     │   ┌──────┐   ┌───┐                               │
     │   │U2    │   │J1 │  SD card                       │
     │   │LDO   │   │   │  slot                          │
     │   │3.3V  │   └───┘                                │
     │   └──────┘                                        │
     │                                                    │
     │   C1-C12  R1-R20  (passives, 0402)               │
     └────────────────────────────────────────────────────┘
```

1. **Passives first (0402 caps and resistors) / 被动元件优先（0402 电容电阻）**
   - Place with tweezers using microscope or magnifier.
     用镊子放置，使用显微镜或放大镜。
   - Reflow with hot air at 260C peak.
     使用热风枪回流焊，峰值温度 260C。

   > **Tip / 提示:** Use a stencil for solder paste application on fine-pitch components.
   > Use kapton tape to mask adjacent areas.
   > 细间距元件请使用钢网涂焊锡膏。用高温胶带遮蔽相邻区域。

2. **STM32F405RGT6 (U1) - LQFP64 / 主控芯片**
   - Align pin 1 dot with PCB silkscreen marker.
     将 1 号引脚圆点与 PCB 丝印标记对齐。
   - Verify all 64 pins are aligned before reflow.
     回流焊前确认所有 64 个引脚对齐。
   - Reflow with hot air: preheat 150C, ramp to 260C, cool slowly.
     热风回流焊：预热 150C，升温至 260C，缓慢冷却。

   > **Warning / 警告:** The LQFP64 has 0.5mm pin pitch.
   > Bridging is likely. Inspect EVERY pin under magnification after reflow.
   > LQFP64 引脚间距 0.5mm。桥接概率高。回流焊后请在放大镜下检查每个引脚。
   > Use flux and solder wick to remove bridges.
   > 使用助焊剂和吸锡带去除桥接。

3. **USB3300 (U3) - QFN-24 / USB PHY 芯片**
   - Apply paste to center thermal pad AND perimeter pads.
     在中心散热焊盘和周边焊盘上涂焊锡膏。
   - Align carefully — the QFN package has no visible pins.
     仔细对齐——QFN 封装没有可见引脚。
   - Reflow at 260C peak. The thermal pad must be well-soldered for heat dissipation.
     峰值 260C 回流焊。散热焊盘必须焊接良好以确保散热。

   > **Warning / 警告:** The USB3300 center pad is the primary heat path.
   > Insufficient solder here will cause thermal issues and USB instability.
   > USB3300 中心焊盘是主要散热路径。焊锡不足将导致散热问题和 USB 不稳定。

4. **Crystal oscillators (Y1: 8MHz, Y2: 12MHz) / 晶振**
5. **SD card slot (J1) / SD 卡槽**
6. **All remaining connectors, LDO, TVS diodes / 其余连接器、LDO、TVS 二极管**

### Step 1.3: Solder Sensor Board / 焊接传感器板

```
  1. Solder in order / 按顺序焊接:
     - Passives (0402) / 被动元件
     - CH334R USB HUB (QFN) / USB 集线器芯片
     - APDS-9960 (small QFN) / 手势传感器
     - MPU6050 (QFN) / 六轴传感器
     - USB camera FPC connector / USB 摄像头 FPC 连接器
     - I2C servo output connectors (x5) / I2C 舵机输出连接器
     - FFC input connector (to head board) / FFC 输入连接器（连主控板）
```

> **Note / 注意:** The APDS-9960 sensor lens must face outward through a
> transparent window in the housing. Note its orientation when soldering.
> APDS-9960 传感器镜头必须通过外壳的透明窗口朝外。焊接时注意方向。

### Step 1.4: Solder Servo Driver Boards (x5) / 焊接舵机驱动板（5 块）

```
  Repeat for all 5 boards / 重复 5 次:

  1. STM32F042P6 (TSSOP-20) — easier than LQFP, 0.65mm pitch
     STM32F042P6 (TSSOP-20) — 比 LQFP 简单，0.65mm 间距
  2. FM116B motor driver (SOT-23-6)
     FM116B 电机驱动
  3. Passives (decoupling caps, pull-ups)
     被动元件（去耦电容、上拉电阻）
  4. Address select jumpers — solder CLOSED or OPEN per address table:
     地址选择跳线——按地址表焊接闭合或断开：

     Board #1 (0x01): Bit2=H, Bit1=H, Bit0=L
     Board #2 (0x02): Bit2=H, Bit1=L, Bit0=H
     Board #3 (0x03): Bit2=H, Bit1=L, Bit0=L
     Board #4 (0x04): Bit2=L, Bit1=H, Bit0=H
     Board #5 (0x05): Bit2=L, Bit1=H, Bit0=L

     H = jumper open (pull-up to 3.3V), L = jumper closed (pull to GND)
     H = 跳线断开（上拉至3.3V），L = 跳线闭合（下拉至GND）
  5. I2C input/output connectors
     I2C 输入/输出连接器
  6. Motor wire pads (2 pads for DC motor)
     电机焊盘（2 个焊盘连接直流电机）
  7. Potentiometer input pad
     电位器输入焊盘
```

> **Warning / 警告:** Double-check address jumpers before proceeding.
> Two boards with the same I2C address will cause bus contention.
> 继续前请仔细检查地址跳线。两块板使用相同 I2C 地址将导致总线冲突。

---

## Phase 2: Servo Modification / 第二阶段：舵机改造

### Step 2.1: Disassemble Standard Servos / 拆解标准舵机

```
  For each of the 5 servos / 对每个舵机重复:

  1. Remove the 4 long case screws from the bottom.
     拆下底部 4 颗长外壳螺丝。
  2. Carefully separate the top case, middle case, and bottom case.
     小心分离上盖、中壳和底壳。
  3. Remove the original control PCB (contains pot + motor driver).
     拆下原始控制 PCB（包含电位器和电机驱动）。

  ┌───────────┐     ┌───────────┐     ┌───────────┐
  │ Top Case  │     │  Middle   │     │  Bottom   │
  │  上盖     │     │  Case     │     │  Case     │
  │  (output  │     │  中壳     │     │  底壳     │
  │   shaft)  │     │  (gears)  │     │  (motor,  │
  └───────────┘     └───────────┘     │   PCB)    │
                                      └───────────┘

  4. Desolder the motor wires from the original PCB.
     从原始 PCB 上拆焊电机线。
  5. Desolder the potentiometer wires from the original PCB.
     从原始 PCB 上拆焊电位器线。
  6. Remove the original PCB completely. Discard or keep for reference.
     完全拆下原始 PCB。丢弃或留作参考。
```

> **Warning / 警告:** Do NOT lose any gears. Keep gears in order.
> The gear train must be reassembled in exactly the same sequence.
> 不要丢失任何齿轮。保持齿轮顺序。齿轮组必须按完全相同的顺序重新组装。

### Step 2.2: Install Custom Driver Board / 安装自定义驱动板

```
  For each servo / 对每个舵机:

  1. Solder motor wires to the FM116B output pads on custom board.
     将电机线焊到自定义板上 FM116B 的输出焊盘。
  2. Solder potentiometer wires to the ADC input pad on custom board.
     将电位器线焊到自定义板的 ADC 输入焊盘。
  3. Fit the custom board into the servo bottom case.
     将自定义板装入舵机底壳。
  4. Verify board sits flat and does not interfere with gear train.
     确认电路板放平，不与齿轮组干涉。

  ┌────────────────────────────────────┐
  │           SERVO BOTTOM CASE        │
  │            舵机底壳                 │
  │                                    │
  │   ┌──────────┐    ┌────┐          │
  │   │ Custom   │    │ DC │          │
  │   │ STM32F042│────│motor           │
  │   │ Board    │    └────┘          │
  │   │ 自定义板 │                     │
  │   └──────────┘    ┌────┐          │
  │                   │Pot │          │
  │                   │电位│          │
  │                   │器  │          │
  │                   └────┘          │
  └────────────────────────────────────┘
```

> **Warning / 警告:** Ensure motor wires do not touch moving gears.
> Use hot glue or Kapton tape to secure wires away from gear train.
> 确保电机线不接触运动齿轮。使用热熔胶或高温胶带固定线缆远离齿轮组。

### Step 2.3: Reassemble Servos / 重新组装舵机

```
  1. Place middle case (with gears) onto bottom case.
     将中壳（含齿轮）放在底壳上。
  2. Route I2C cable through the case slot.
     将 I2C 线缆通过外壳槽口引出。
  3. Place top case. Align output shaft with gear train.
     放置上盖。将输出轴与齿轮组对齐。
  4. Reinstall 4 case screws. Do NOT over-tighten (plastic threads strip easily).
     重新安装 4 颗外壳螺丝。不要过紧（塑料螺纹容易滑丝）。
  5. Label each servo with its I2C address (#1-#5).
     用 I2C 地址（#1-#5）标记每个舵机。
```

> **Tip / 提示:** Before closing the case, manually rotate the output shaft
> through its full range to check for mechanical binding.
> 合盖前，手动旋转输出轴检查全程是否有机械卡滞。

---

## Phase 3: Mechanical Assembly / 第三阶段：机械组装

### Step 3.1: Prepare 3D Printed Parts / 准备 3D 打印件

```
  Clean and deburr all 3D printed parts:
  清洁并去毛刺所有 3D 打印件：

  [ ] Head housing (2 halves) / 头部外壳（两半）
  [ ] Neck cover / 颈部外壳
  [ ] Body/base / 身体底座
  [ ] Left upper arm shell / 左上臂外壳
  [ ] Left lower arm shell / 左下臂外壳
  [ ] Right upper arm shell / 右上臂外壳
  [ ] Right lower arm shell / 右下臂外壳
  [ ] Arm T-push rod (x4) / 手臂 T 型推杆（4个）
  [ ] Gear covers / 齿轮盖

  Test-fit all bearing seats:
  测试安装所有轴承座：
  - 4x MR106-2RS (6x10x3mm) → arm joints / 手臂关节
  - 1x 25x32x4mm → neck rotation / 颈部旋转
```

> **Warning / 警告:** Do not force bearings into tight seats.
> Use a arbor press or tap gently with a soft mallet.
> Do NOT use a hammer directly on bearings.
> 不要将轴承强行压入过紧的轴承座。使用压力机或用软锤轻敲。
> 不要直接用锤子敲打轴承。

### Step 3.2: Assemble Arms / 组装手臂

```
  For each arm (left and right, upper and lower) / 对每条手臂：

  1. Press bearing into the 3D printed joint.
     将轴承压入 3D 打印关节。

     ┌──────────────┐     ┌──────────────┐
     │  Upper Arm   │     │  Lower Arm   │
     │  Shell       │     │  Shell       │
     │  上臂外壳    │     │  下臂外壳    │
     │     │        │     │     │        │
     │     │ BRG    │     │     │ BRG    │
     │     │ 6x10x3 │     │     │ 6x10x3 │
     │     │        │     │     │        │
     └─────┼────────┘     └─────┼────────┘
           │                    │
           └──── Servo shaft ───┘
                 T-push rod
                 T型推杆连接

  2. Insert the T-push rod between servo output shaft and arm joint.
     在舵机输出轴和手臂关节之间插入 T 型推杆。
  3. Secure with set screws (M2).
     用紧定螺钉（M2）固定。

  Arm assembly order / 手臂组装顺序:
     Shoulder servo → Upper arm → Elbow servo → Lower arm
     肩部舵机 → 上臂 → 肘部舵机 → 下臂
```

> **Warning / 警告:** The T-push rod transmits torque from servo to arm.
> Ensure set screws are tightened with thread-locker (Loctite 222).
> T 型推杆将舵机扭矩传递到手臂。确保紧定螺钉使用螺纹锁固剂（Loctite 222）。

### Step 3.3: Assemble Neck and Waist / 组装颈部和腰部

```
  1. Install the 25x32x4mm bearing into the body base.
     将 25x32x4mm 轴承安装到机身底座中。

     ┌─────────────────────────┐
     │        BODY BASE        │
     │         机身底座         │
     │                         │
     │    ┌───────────────┐    │
     │    │  25x32x4 BRG  │    │
     │    │  Neck bearing │    │
     │    │  颈部轴承     │    │
     │    └───────┬───────┘    │
     │            │            │
     │  ┌─────┐  │  ┌─────┐   │
     │  │Arm  │  │  │Arm  │   │
     │  │L    │  │  │R    │   │
     │  │左臂 │  │  │右臂 │   │
     │  └─────┘  │  └─────┘   │
     │            │            │
     │     ┌──────┘            │
     │     │ Neck servo #5    │
     │     │ 颈部舵机 #5      │
     │     └──────────        │
     └─────────────────────────┘

  2. Mount neck servo (#5) to body base with M2 screws.
     用 M2 螺丝将颈部舵机（#5）安装到机身底座。
  3. Connect neck servo output to head via gear or direct coupling.
     通过齿轮或直接耦合将颈部舵机输出连接到头部。
  4. Route neck servo I2C cable through the bearing center.
     将颈部舵机 I2C 线缆通过轴承中心走线。
```

> **Warning / 警告:** The neck bearing carries the weight of the entire head.
> Ensure the bearing is fully seated and the head rotates smoothly without play.
> 颈部轴承承受整个头部的重量。确保轴承完全就位，头部旋转平稳无晃动。

### Step 3.4: Mount Servos in Body / 将舵机安装到机身

```
  1. Mount left shoulder servo (#1) in body base, left side.
     将左肩舵机（#1）安装在机身底座左侧。
  2. Mount left elbow servo (#2) in upper arm housing.
     将左肘舵机（#2）安装在上臂外壳中。
  3. Mount right shoulder servo (#3) in body base, right side.
     将右肩舵机（#3）安装在机身底座右侧。
  4. Mount right elbow servo (#4) in upper arm housing.
     将右肘舵机（#4）安装在上臂外壳中。
  5. Verify all servos are firmly mounted with no wobble.
     确认所有舵机安装牢固，无晃动。
```

---

## Phase 4: Cable Routing / 第四阶段：线缆走线

### Step 4.1: Head to Sensor Board FFC / 主控板到传感器板 FFC 排线

```
  1. Connect the 20-pin FFC cable from head board to sensor board.
     将 20 针 FFC 排线从主控板连接到传感器板。
  2. Ensure FFC orientation: pin 1 (marked with triangle) aligns with pin 1 on both connectors.
     确认 FFC 方向：1 针（三角形标记）与两端连接器的 1 针对齐。
  3. Route FFC through the neck passage without sharp bends.
     FFC 通过颈部通道走线，避免急弯。
  4. Minimum bend radius: 2mm. Do NOT crease the cable.
     最小弯曲半径：2mm。不要折叠排线。
```

> **Warning / 警告:** FFC cables are fragile. A creased cable will have intermittent connections.
> Always replace a damaged FFC rather than attempting to repair it.
> FFC 排线很脆弱。折痕会导致间歇性连接。损坏的 FFC 应更换而非修复。

### Step 4.2: Servo I2C Daisy Chain / 舵机 I2C 菊花链

```
  1. Connect sensor board I2C output → Servo #1 (left upper arm).
     连接传感器板 I2C 输出 → 舵机 #1（左上臂）。
  2. Connect Servo #1 I2C output → Servo #2 (left lower arm).
     连接舵机 #1 I2C 输出 → 舵机 #2（左下臂）。
  3. Connect sensor board I2C output → Servo #3 (right upper arm).
     连接传感器板 I2C 输出 → 舵机 #3（右上臂）。
  4. Connect Servo #3 I2C output → Servo #4 (right lower arm).
     连接舵机 #3 I2C 输出 → 舵机 #4（右下臂）。
  5. Connect Servo #3 I2C output → Servo #5 (neck).
     连接舵机 #3 I2C 输出 → 舵机 #5（颈部）。
  6. Secure all cables with cable ties or adhesive clips inside the body.
     用扎带或粘接夹固定机身内所有线缆。
```

> **Warning / 警告:** Do NOT route signal cables alongside motor power wires.
> Keep at least 5mm separation to avoid electromagnetic interference.
> 不要将信号线与电机电源线并行走线。保持至少 5mm 间距以避免电磁干扰。

### Step 4.3: USB and Power Wiring / USB 和电源接线

```
  1. Route USB-C cable from the body base to the head board USB-C connector.
     将 USB-C 线缆从机身底座引到主控板 USB-C 连接器。
  2. Connect USB camera module to the sensor board USB port.
     将 USB 摄像头模块连接到传感器板 USB 端口。
  3. Verify all power connections are correct polarity before proceeding.
     继续前确认所有电源连接极性正确。
```

> **Warning / 警告:** REVERSE POLARITY WILL DESTROY COMPONENTS INSTANTLY.
> Use a multimeter to verify voltage and polarity at every board before powering on.
> 反接极性将瞬间损坏元件。上电前用万用表检查每块板的电压和极性。

---

## Phase 5: Face Installation / 第五阶段：面部安装

### Step 5.1: Mount GC9A01 Display / 安装 GC9A01 显示屏

```
  1. Place the GC9A01 display into the head housing face recess.
     将 GC9A01 显示屏放入头部外壳面部凹槽。
  2. The display should sit flat with the ribbon cable pointing down.
     显示屏应放平，排线朝下。
  3. Secure with 2x M2 screws or adhesive tabs (do not over-tighten).
     用 2 颗 M2 螺丝或胶贴固定（不要过紧）。

     ┌──────────────────────┐
     │    HEAD HOUSING       │
     │    头部外壳           │
     │                      │
     │    ┌────────────┐    │
     │    │  GC9A01    │    │
     │    │  1.28" LCD │    │
     │    │  圆形屏幕  │    │
     │    └────────────┘    │
     │         │            │
     │    FPC cable down    │
     │    排线向下          │
     └──────────────────────┘
```

> **Warning / 警告:** Do not touch the LCD surface with bare fingers.
> Oils and pressure can damage the display. Handle by edges only.
> 不要用裸手指触摸 LCD 表面。油脂和压力可能损坏显示屏。仅从边缘拿取。

### Step 5.2: Install Glass Crystal Cover / 安装玻璃表蒙

```
  1. Clean the inside of the glass crystal with lens cleaner and microfiber cloth.
     用镜头清洁剂和超细纤维布清洁玻璃表蒙内侧。
  2. Clean the LCD surface.
     清洁 LCD 表面。
  3. Apply a thin bead of UV-cure adhesive around the inner rim of the face opening.
     在面部开口内缘涂一圈薄 UV 固化胶。
  4. Place the 31.5mm glass crystal into the opening.
     将 31.5mm 玻璃表蒙放入开口。
  5. Press gently and evenly. Wipe away excess adhesive immediately.
     均匀轻压。立即擦去多余胶水。
  6. Cure with UV light for 30 seconds.
     用 UV 灯照射 30 秒固化。

     ┌─── Head housing edge ──────────┐
     │  外壳边缘                       │
     │    ┌─── UV glue ──────────┐    │
     │    │  UV胶                 │    │
     │    │  ┌───────────────┐   │    │
     │    │  │  Glass 31.5mm │   │    │
     │    │  │  玻璃表蒙     │   │    │
     │    │  └───────────────┘   │    │
     │    └──────────────────────┘    │
     └────────────────────────────────┘
```

> **Warning / 警告:** Do NOT get adhesive on the LCD surface.
> It is nearly impossible to remove without damaging the display.
> 不要让胶水接触 LCD 表面。几乎不可能在不损坏显示屏的情况下去除。

### Step 5.3: Close Head Housing / 合上头部外壳

```
  1. Route all cables neatly through the neck opening.
     将所有线缆整齐地通过颈部开口引出。
  2. Verify no cables are pinched between housing halves.
     确认没有线缆被夹在两半外壳之间。
  3. Join the two halves of the head housing.
     合上头部外壳的两半。
  4. Secure with M2 screws (typically 4-6 screws).
     用 M2 螺丝固定（通常 4-6 颗）。
  5. Do NOT over-tighten — 3D printed plastic threads strip easily.
     不要过紧——3D 打印塑料螺纹容易滑丝。
```

---

## Phase 6: Testing and Calibration / 第六阶段：测试与校准

### Step 6.1: Pre-Power Checks / 上电前检查

```
  Use a multimeter to verify / 用万用表验证:

  [ ] No short between 3.3V and GND (measure resistance > 1k ohm)
      3.3V 和 GND 之间无短路（电阻 > 1k 欧姆）
  [ ] No short between 5V and GND
      5V 和 GND 之间无短路
  [ ] USB-C connector D+/D- not shorted to each other or to power
      USB-C 连接器 D+/D- 互不短路，且不与电源短路
  [ ] All decoupling capacitors are in place
      所有去耦电容已安装
  [ ] All polarized components (electrolytic caps, diodes) are correct orientation
      所有极性元件（电解电容、二极管）方向正确
```

> **Warning / 警告:** If any short is found, do NOT apply power.
> Find and fix the short before proceeding. Powering a shorted board can
> cause fire and permanent component damage.
> 如发现短路，切勿上电。先找到并修复短路。对短路板上电可能导致
> 火灾和永久性元件损坏。

### Step 6.2: Initial Power-On Test / 初次上电测试

```
  1. Connect USB-C to a USB power meter (to monitor current).
     将 USB-C 连接到 USB 功率计（监测电流）。
  2. Plug into PC USB port.
     插入电脑 USB 端口。
  3. Expected readings / 预期读数:
      - 3.3V rail: within 3.25V - 3.35V / 3.3V 电源轨在 3.25V-3.35V
      - Total current (idle, no servos moving): < 200mA
        总电流（空闲，舵机不动）：< 200mA
      - No component should be hot to touch (warm is OK for LDO)
        没有元件应烫手（LDO 温热正常）

  4. If current exceeds 300mA immediately, UNPLUG and check for shorts.
     如果电流立即超过 300mA，拔掉电源并检查短路。
```

### Step 6.3: Firmware Flash / 固件烧录

```
  1. Connect ST-Link to the SWD header on head board (SWDIO, SWCLK, GND).
     将 ST-Link 连接到主控板的 SWD 接口（SWDIO, SWCLK, GND）。
  2. Flash head board STM32F405 firmware.
     烧录主控板 STM32F405 固件。
  3. For each servo, connect ST-Link to its SWD pads and flash STM32F042 firmware.
     对每个舵机，连接 ST-Link 到其 SWD 焊盘，烧录 STM32F042 固件。
  4. Verify: run I2C scanner from head board. Expected output:
     验证：从主控板运行 I2C 扫描。预期输出：

     Scanning I2C bus...
     Found device at 0x01  (Servo #1 - Left Upper Arm)
     Found device at 0x02  (Servo #2 - Left Lower Arm)
     Found device at 0x03  (Servo #3 - Right Upper Arm)
     Found device at 0x04  (Servo #4 - Right Lower Arm)
     Found device at 0x05  (Servo #5 - Neck)
```

> **Warning / 警告:** If any servo does not appear in the I2C scan:
> 如果任何舵机未出现在 I2C 扫描中：
> - Check address jumpers on that servo's driver board.
>   检查该舵机驱动板的地址跳线。
> - Check I2C cable continuity.
>   检查 I2C 线缆连通性。
> - Check the servo board's 3.3V power supply.
>   检查舵机板的 3.3V 电源。

### Step 6.4: Servo Calibration / 舵机校准

```
  For each servo / 对每个舵机:

  1. Send target angle 0 degrees via I2C.
     通过 I2C 发送目标角度 0 度。
  2. Read back current angle. Verify it reaches 0 degrees (+/- 2 degrees).
     读取当前角度。验证到达 0 度（+/- 2 度）。
  3. Send target angle 90 degrees. Verify reach.
     发送目标角度 90 度。验证到达。
  4. Send target angle -90 degrees. Verify reach.
     发送目标角度 -90 度。验证到达。
  5. Test PID response: step from 0 to 90 degrees.
     测试 PID 响应：从 0 度阶跃到 90 度。
     - Should settle within 300ms with no overshoot > 5 degrees.
       应在 300ms 内稳定，超调不超过 5 度。
     - Adjust PID Kp/Ki/Kd registers if needed.
       如需调整，修改 PID Kp/Ki/Kd 寄存器。

  6. Mechanical range check / 机械范围检查:
     - Slowly sweep each servo through full range.
       缓慢扫过每个舵机的全范围。
     - Listen for grinding or binding.
       倾听是否有研磨或卡滞声。
     - If mechanical stop is hit, adjust software limits immediately.
       如碰到机械限位，立即调整软件限位。
```

> **Warning / 警告:** Driving a servo into a mechanical stop can strip gears
> or burn out the motor driver. Always set software angle limits before
> allowing full-speed motion.
> 驱动舵机碰到机械限位可能导致齿轮损坏或电机驱动烧毁。
> 在允许全速运动之前，务必设置软件角度限位。

### Step 6.5: Display Test / 显示屏测试

```
  1. Fill screen with solid colors: Red, Green, Blue, White, Black.
     用纯色填充屏幕：红色、绿色、蓝色、白色、黑色。
  2. Check for dead pixels, stuck pixels, or color banding.
     检查坏点、亮点或色带。
  3. Display a test pattern with fine lines to verify SPI/DMA is working.
     显示带有细线的测试图案，验证 SPI/DMA 工作正常。
  4. Display an animated face expression. Verify smooth updates at 30fps.
     显示动画表情。验证 30fps 平滑刷新。
```

### Step 6.6: Sensor Verification / 传感器验证

```
  1. MPU6050: Read accelerometer. Verify gravity vector is correct
     when robot is upright (~1g on Z axis, ~0g on X and Y).
     MPU6050：读取加速度计。机器人直立时验证重力向量正确
     （Z轴约1g，X和Y轴约0g）。
  2. APDS-9960: Wave hand above sensor. Verify gesture detection events.
     APDS-9960：在传感器上方挥手。验证手势检测事件。
  3. USB Camera: Verify video stream is received on PC.
     USB 摄像头：验证 PC 接收到视频流。
```

### Step 6.7: Final Assembly Check / 最终组装检查

```
  [ ] All screws tightened / 所有螺丝拧紧
  [ ] No cables pinched or stretched / 无线缆被夹或拉伸
  [ ] Head rotates smoothly through full range / 头部全程旋转顺畅
  [ ] Both arms move through full range without binding / 双臂全程运动无卡滞
  [ ] Display shows correct face animations / 显示屏显示正确表情动画
  [ ] USB communication stable for 10+ minutes / USB 通信稳定 10 分钟以上
  [ ] No abnormal heat on any component (touch test) / 无元件异常发热（触摸测试）
  [ ] Current draw within expected range / 电流消耗在预期范围内
```

---

## Assembly Completion / 组装完成

Congratulations! Your ElectronBot is assembled and ready for software configuration.
恭喜！您的 ElectronBot 已组装完成，可以进行软件配置。

Next steps / 后续步骤:
1. Install the ElectronBot PC software / 安装 ElectronBot PC 端软件
2. Connect via USB-C and verify device enumeration / 通过 USB-C 连接并验证设备枚举
3. Upload face animations to SD card / 上传表情动画到 SD 卡
4. Begin programming custom behaviors / 开始编写自定义行为

---

*最后更新：2026-05-27*
