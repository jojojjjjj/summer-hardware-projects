# 组装步骤 | Assembly Steps

## 概述 | Overview

本机器人的组装分为机械结构组装和电子元件安装两大阶段。请严格按照步骤顺序进行，特别注意重心平衡和螺丝紧固。

> The assembly of this robot is divided into two major phases: mechanical structure assembly and electronic component installation. Follow the steps strictly in order, paying special attention to center of gravity balance and screw tightness.

---

## 所需工具 | Tools Required

| 工具 | 用途 | 规格 |
|------|------|------|
| 十字螺丝刀 | 拧紧螺丝 | PH1 (M2) / PH2 (M3) |
| 内六角扳手 | 电机固定螺丝 | 1.5mm, 2mm, 2.5mm |
| 尖嘴钳 | 夹持螺母 | -- |
| 烙铁+焊锡 | 焊接电机线/电源线 | 建议 60W 以上 |
| 剥线钳 | 剥电源线外皮 | -- |
| 热风枪/打火机 | 热缩管 | -- |
| 万用表 | 测量电压/通断 | -- |
| 游标卡尺 | 测量零件（可选） | -- |
| 螺丝胶 | 防振松脱（推荐） | Loctite 243（中强度） |

---

## 3D 打印件清单 | 3D Printed Parts List

根据 StackForce 仓库 `模型/` 目录，需要打印以下零件：

> Based on the StackForce repository `模型/` directory, the following parts need to be printed:

| 文件名 | 中文名称 | 数量 | 打印时间（约） | 说明 |
|--------|---------|------|-------------|------|
| 框架.stl | 主体框架 | 1 | ~3h | 核心承重结构 |
| 大腿1.stl ~ 大腿4.stl | 腿部连杆 | 各 1 | ~1h/个 | 四条腿的上连杆 |
| 前小臂X1/X2.stl | 前小臂 | 各 1 | ~40min/个 | 前腿下连杆 |
| 后小臂X1/X2.stl | 后小臂 | 各 1 | ~40min/个 | 后腿下连杆 |
| 电机固定X1/X2.stl | 电机支架 | 各 1 | ~30min/个 | 固定 BLDC 电机 |
| 舵机接口1~4.stl | 舵机连接件 | 各 1 | ~20min/个 | 舵机到连杆的接口 |
| 轮毂X1/X2.stl | 轮毂 | 各 1 | ~30min/个 | 连接电机和轮子 |
| 轮固定X1/X2.stl | 轮子固定件 | 各 1 | ~20min/个 | 固定轮子 |
| 盖板1~4.stl | 盖板 | 各 1 | ~20min/个 | 保护内部元件 |
| 上盖.stl | 顶部盖板 | 1 | ~1h | 顶部覆盖 |
| 电池架.stl | 电池架 | 1 | ~30min | 固定电池 |
| 外固定1~4.stl | 外部固定件 | 各 1 | ~15min/个 | 外壳固定 |

> 打印建议：PLA 材质，层高 0.2mm，填充率 20%-30%，无需支撑（大部分零件）。总打印材料约 200-300g。
>
> Print settings: PLA material, 0.2mm layer height, 20%-30% infill, no supports needed for most parts. Total material approximately 200-300g.

---

## 组装步骤 | Assembly Steps

### 阶段一：底盘框架组装 | Phase 1: Base Frame Assembly

#### 步骤 1：检查 3D 打印件

1. 清点所有 3D 打印件，对照上表确认无遗漏
2. 用砂纸或美工刀去除打印件上的毛刺和支撑残留
3. 试装各零件，确认孔位对齐（不拧螺丝）
4. 如有公差问题，用锉刀微调孔位

> Inspect all 3D printed parts. Remove burrs and support residue. Dry-fit parts before tightening screws.

#### 步骤 2：组装主框架

1. 取出 `框架.stl`，将其平放在桌面上
2. 检查框架上的安装孔位（电机安装位、舵机安装位、PCB 安装位）
3. 在框架底部安装 4 个 `外固定` 件（用 M3x8 螺丝+螺母）
4. 确认所有固定件稳固无松动

```
        ┌──────────────────────────┐
        │                          │
        │    ┌────────────────┐    │
        │    │   主框架 (框架)  │    │
        │    │                │    │
        │    │  ○电机位  ○电机位│    │   ← 两个 BLDC 电机安装位
        │    │                │    │
        │    │  ○舵机 ○舵机   │    │   ← 四个舵机安装位
        │    │  ○舵机 ○舵机   │    │
        │    └────────────────┘    │
        │                          │
        └──────────────────────────┘
        外固定件安装在四角
```

### 阶段二：电机安装 | Phase 2: Motor Installation

#### 步骤 3：安装电机支架

1. 取 `电机固定X1.stl` 和 `电机固定X2.stl`
2. 将电机固定件安装到框架两侧对应位置
3. 用 M3x12 螺丝 + 螺母固定（先不拧紧）
4. 确认安装方向正确（注意左右对称）

#### 步骤 4：安装 BLDC 电机

1. 将 2808 BLDC 电机放入电机固定件中
2. 用 M3x8 或 M2x8 内六角螺丝固定电机（具体看电机安装孔）
3. 注意电机轴朝向（应朝外侧，用于安装轮毂）
4. **建议在螺丝上点少量螺丝胶**（防止振动松脱）
5. 确认电机引出线朝向框架内侧（方便接线）

```
    安装方向示意（俯视图）：

         轮子侧（外侧）
            ↑
    ┌───────┼───────┐
    │  ┌────┴────┐  │
    │  │ BLDC    │  │  ← 电机轴朝外
    │  │ Motor   │  │
    │  └────┬────┘  │
    │       │       │
    └───────┼───────┘
            ↓
         框架内侧（接线侧）
```

#### 步骤 5：安装轮毂和轮子

1. 将 `轮毂X1.stl` 安装到左侧电机轴上（紧配合或顶丝固定）
2. 将 `轮毂X2.stl` 安装到右侧电机轴上
3. 将轮子（或 `轮固定X1/X2.stl`）安装到轮毂上
4. 确认轮子转动顺畅无摩擦

> 扭矩要求：轮毂顶丝拧紧至手感到阻力即可（约 0.3-0.5 Nm）。过紧可能损坏电机轴。
>
> Torque spec: Tighten the wheel hub set screw until hand-tight resistance is felt (approx. 0.3-0.5 Nm). Over-tightening may damage the motor shaft.

### 阶段三：腿部机构组装 | Phase 3: Leg Mechanism Assembly

#### 步骤 6：组装大腿连杆

1. 将舵机安装到 `舵机接口1~4.stl` 中
2. 舵机输出轴应与接口件的中心孔对齐
3. 用舵机自带的自攻螺丝固定（M2 或 M2.5）
4. 将 `大腿1~4.stl` 连接到舵机接口件
5. 用 M3x8 螺丝 + 螺母连接大腿和舵机接口

#### 步骤 7：组装小臂连杆

1. 将 `前小臂X1.stl` 连接到前左大腿下端
2. 将 `前小臂X2.stl` 连接到前右大腿下端
3. 将 `后小臂X1.stl` 连接到后左大腿下端
4. 将 `后小臂X2.stl` 连接到后右大腿下端
5. 所有关节用 M3x8 螺丝 + 螺母连接
6. **螺丝不要拧太紧** -- 关节应能自由转动

```
    腿部机构示意（侧视图）：

          ┌─── 框架 ───┐
          │             │
          │   [舵机]    │  ← 舵机接口
          │     │       │
          │     │ 大腿  │  ← 大腿1/2/3/4
          │     │       │
          │   [关节]    │  ← M3 螺丝（可旋转）
          │     │       │
          │     │ 小臂  │  ← 前小臂/后小臂
          │     │       │
          │   ────      │  ← 脚部（接触地面）
          └─────────────┘
```

#### 步骤 8：安装腿部到主框架

1. 将组装好的 4 条腿分别安装到框架的 4 个舵机位置
2. 左前腿 → 框架左前舵机位
3. 左后腿 → 框架左后舵机位
4. 右前腿 → 框架右前舵机位
5. 右后腿 → 框架右后舵机位
6. 用 M3x12 螺丝固定

> 重要：安装前先将所有舵机转到 90 度（中位），确保组装后腿部对称。
>
> Important: Before installation, center all servos to 90 degrees to ensure the legs are symmetrical after assembly.

### 阶段四：电子元件安装 | Phase 4: Electronics Installation

#### 步骤 9：安装铜柱和 PCB

1. 在框架上预留的 PCB 安装孔处安装 M3x20 铜柱（4 个）
2. 用 M3x8 螺丝从框架底部固定铜柱
3. 将 BLDC 驱动板安装到铜柱上（用 M3 螺丝固定）
4. 在驱动板上方再加一层铜柱（M3x10）
5. 将 ESP32-S3 开发板安装到上层铜柱

```
    电子元件安装层级（截面图）：

         ┌──────────────┐
         │   ESP32-S3   │  ← 顶层
         ├──────────────┤
         │  M3x10 铜柱  │
         ├──────────────┤
         │ BLDC 驱动板   │  ← 中层
         ├──────────────┤
         │  M3x20 铜柱  │
         ├──────────────┤
         │    框架       │  ← 底层
         └──────────────┘
```

#### 步骤 10：安装 PCA9685 舵机驱动板

1. 在框架合适位置安装 PCA9685 舵机驱动板
2. 可使用双面胶或铜柱固定
3. 注意 PCA9685 应靠近舵机，减少舵机线长度

#### 步骤 11：安装 MPU6050 IMU

1. 将 MPU6050 模块安装在框架顶部中心位置
2. **安装方向至关重要**：IMU 的 X 轴应朝向机器人前方
3. 使用双面胶或 M2 螺丝固定
4. 确保 IMU 模块紧贴框架，不能松动

```
    MPU6050 安装方向（俯视图）：

              前 (Forward)
               ↑
          ┌────┼────┐
          │    │  X │  ← X 轴朝前
          │ MPU6050 │
          │    │    │
          └────┼────┘
               │
              后 (Rear)
```

> 关键：IMU 的安装方向直接影响姿态数据。如果安装方向与代码不一致，机器人将无法正常平衡。代码中 pitch = -mpu6050.angle[0], roll = mpu6050.angle[1] 对应特定的安装方向。
>
> Critical: IMU orientation directly affects attitude data. If the orientation does not match the code, the robot will not balance properly. The code maps pitch = -mpu6050.angle[0], roll = mpu6050.angle[1] for a specific mounting orientation.

### 阶段五：电源和电池安装 | Phase 5: Power and Battery Installation

#### 步骤 12：安装电池架和电池

1. 将 `电池架.stl` 安装到框架底部或指定位置
2. 用 M3x8 螺丝固定电池架
3. 将 3S 锂电池放入电池架
4. 用扎带固定电池（防止运行中脱落）
5. 电池引出线朝向电源开关位置

> 重心提示：电池是机器人最重的部件。电池位置直接影响重心。建议将电池安装在框架中心偏下位置，有助于降低重心、提高稳定性。
>
> Center of gravity tip: The battery is the heaviest component. Its position directly affects the center of gravity. Install it low and centered on the frame to lower the center of gravity and improve stability.

#### 步骤 13：安装电源开关

1. 在框架侧面选择合适位置安装电源开关
2. 焊接电池正极到开关一端
3. 开关另一端连接到驱动板 VM 输入
4. 用热缩管绝缘所有焊接点
5. 确认开关操作顺畅

### 阶段六：接线 | Phase 6: Wiring

#### 步骤 14：连接电机线

1. 将两个 BLDC 电机的三相线分别连接到驱动板的 M0 和 M1 端口
2. 连接编码器线
3. 用扎带理线，避免线与运动部件摩擦

#### 步骤 15：连接舵机线

1. 四个舵机信号线分别连接到 PCA9685 的 CH3-CH6
2. 舵机电源线连接到 PCA9685 的 V+ 端子
3. 注意舵机线顺序：左前=CH3, 左后=CH4, 右前=CH5, 右后=CH6

#### 步骤 16：连接信号线

1. I2C 总线：MPU6050 和 PCA9685 的 SDA/SCL 连接到 ESP32-S3 GPIO 1/GPIO 2
2. 驱动板 UART：连接到 ESP32-S3 Serial2
3. PCA9685 OE 使能：连接到 GPIO 42
4. （可选）SBUS 接收机：连接到 GPIO 41
5. 用扎带整理所有线缆

### 阶段七：最终组装 | Phase 7: Final Assembly

#### 步骤 17：安装盖板

1. 安装 `盖板1~4.stl` 到框架侧面
2. 安装 `上盖.stl` 到框架顶部
3. 用 M3x8 螺丝固定
4. 确认所有盖板不影响腿部运动

#### 步骤 18：最终检查

1. 用手轻轻转动每个轮子，确认无摩擦
2. 手动摆动腿部，确认关节运动顺畅
3. 检查所有螺丝是否拧紧
4. 检查线缆是否与运动部件干涉
5. 将机器人放在平面上，确认四脚平稳着地
6. 接通电源前再次核对 `wiring-guide.md` 中的检查清单

---

## 螺丝规格参考 | Screw Specification Reference

| 位置 | 螺丝规格 | 数量 | 扭矩建议 |
|------|---------|------|---------|
| 框架 → 外固定件 | M3x8 | 8 | 手紧 + 1/4 圈 |
| 电机 → 电机固定件 | M3x8 或 M2x8 | 4-8 | 0.5 Nm |
| 舵机 → 舵机接口 | M2 或 M2.5 自攻 | 4-8 | 手紧即可 |
| 大腿/小臂关节 | M3x8 + 螺母 | 8 | 手紧，关节需能转动 |
| 铜柱 → 框架/PCB | M3x8 | 8-12 | 手紧 + 1/4 圈 |
| 盖板 | M3x8 | 4-8 | 手紧 |
| 电池架 | M3x8 | 2-4 | 手紧 |

> 提示：电机固定螺丝建议使用螺丝胶（Loctite 243），防止电机振动导致螺丝松脱。
>
> Tip: Use thread-locker (Loctite 243) on motor mounting screws to prevent loosening from motor vibration.

---

## 重心调整指南 | Center of Gravity Adjustment Guide

机器人重心对平衡控制至关重要：

> The robot's center of gravity is critical for balance control:

1. **电池位置**：电池是主要重物，放在中心偏下最佳
2. **ESP32 和驱动板**：尽量靠近框架中心
3. **线缆管理**：将多余线缆用扎带固定，避免线缆影响重心
4. **测试方法**：用手指支撑框架两侧中心点，机器人应能基本水平（左右不倾倒）
5. **前后重心**：略偏后（电机侧）有助于前进稳定性

---

## 首次启动步骤 | First Boot Steps

1. **不要将机器人悬空或放在地上**：用手托住机器人或将轮子架空
2. 打开电源开关
3. 通过 USB 连接 ESP32-S3 到电脑
4. 上传 StackForce 课程代码（推荐从第三课开始）
5. 打开串口监视器（921600 波特率）
6. 观察串口输出：
   - I2C 是否检测到 MPU6050（角度数据是否合理）
   - 电机是否正常通信
   - 舵机是否响应
7. 确认一切正常后，轻轻放在地面上测试

> **安全提示：** 首次启动时，务必将机器人架空（轮子离地），避免电机失控导致机器人冲出。确认电机方向和速度正确后再放到地面。
>
> **Safety Tip:** For the first boot, keep the robot elevated (wheels off the ground) to prevent runaway if motors behave unexpectedly. Only place on the ground after confirming motor direction and speed are correct.
