# Day 10: 3D建模与结构件设计 | 3D Modeling & Structural Design

## 今日目标 | Today's Goals
- 掌握 Fusion 360 / Tinkercad 基础建模操作：草图、拉伸、倒角
- Master basic 3D modeling in Fusion 360 / Tinkercad: sketch, extrude, fillet
- 理解 StackForce 开源 3D 模型的设计思路和结构特点
- Understand the design philosophy and structural features of StackForce open-source 3D models
- 掌握 3D 打印参数设置和切片软件操作
- Master 3D printing parameter settings and slicing software operation

---

## 上午 (3h) | Morning Session

### 1. 3D建模基础 (1.5h) | 3D Modeling Fundamentals

#### 建模软件选择 | Modeling Software Selection

```
3D 建模软件对比 | 3D Modeling Software Comparison

┌─────────────────┬──────────────────┬───────────────────┐
│                 │  Tinkercad       │  Fusion 360       │
│                 │  (入门 Beginner)  │  (进阶 Advanced)   │
├─────────────────┼──────────────────┼───────────────────┤
│ 价格 Price      │ 免费 Free        │ 教育版免费 Edu free│
│ 上手难度        │ ★☆☆☆☆ Easy     │ ★★★☆☆ Moderate   │
│ 适用场景        │ 简单零件 Simple  │ 复杂装配件 Complex │
│ 精度控制        │ 有限 Limited     │ 精确 Precise      │
│ 导出格式        │ STL, OBJ        │ STL, STEP, OBJ    │
│ 参数化设计      │ 不支持 No        │ 支持 Yes           │
│ 在线使用        │ 需要 Online only │ 本地安装 Local     │
└─────────────────┴──────────────────┴───────────────────┘

推荐路径 | Recommended Path:
  初学者 Beginner → Tinkercad (快速上手 Quick start)
  有经验者 Experienced → Fusion 360 (更精确 More precise)
```

#### Tinkercad 快速入门 | Tinkercad Quick Start

Tinkercad 是 Autodesk 提供的免费在线 3D 建模工具，适合初学者快速创建简单零件。

Tinkercad is a free online 3D modeling tool by Autodesk, ideal for beginners to quickly create simple parts.

```
Tinkercad 建模核心流程 | Tinkercad Core Workflow

  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ 选择基础  │ ──►│ 调整尺寸  │ ──►│ 组合形状  │ ──►│ 导出 STL │
  │ 形状      │    │ 位置      │    │ 布尔运算  │    │ 打印     │
  │ Pick shape│    │ Resize    │    │ Combine  │    │ Export   │
  └──────────┘    └──────────┘    └──────────┘    └──────────┘

  基本操作 Basic Operations:
  ─────────────────────────────────
  左键拖拽 | Left-click drag → 移动图形 Move shape
  滚轮     | Scroll wheel   → 缩放视图 Zoom view
  右键拖拽 | Right-click drag → 旋转视图 Rotate view
```

#### Fusion 360 建模基础 | Fusion 360 Modeling Basics

Fusion 360 是专业级参数化建模软件，支持精确尺寸控制和复杂装配。

Fusion 360 is a professional parametric modeling software that supports precise dimensional control and complex assemblies.

```
Fusion 360 核心建模流程 | Fusion 360 Core Modeling Workflow

  ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
  │ 创建    │ ──►│ 绘制    │ ──►│ 约束    │ ──►│ 拉伸    │ ──►│ 添加    │
  │ 草图    │    │ 轮廓    │    │ 标注    │    │ 旋转    │    │ 倒角    │
  │ Sketch  │    │ Profile │    │ Dim    │    │ Extrude │    │ Fillet  │
  └────────┘    └────────┘    └────────┘    └────────┘    └────────┘

  常用快捷键 | Common Shortcuts:
  ─────────────────────────────────
  S → 草图 Sketch       E → 拉伸 Extrude
  F → 倒角 Fillet       C → 倒角 Chamfer
  M → 移动 Move         R → 矩形 Rectangle
  C → 圆 Circle         L → 直线 Line
  D → 标注 Dimension    T → 文字 Text
```

**Fusion 360 设计电机支架示例 | Fusion 360 Motor Bracket Design Example:**

```
设计目标 | Design Goal:
  为 BLDC 电机设计一个 L 型安装支架
  Design an L-shaped mounting bracket for a BLDC motor

步骤 Step 1 - 创建草图 | Create Sketch:
  1. 选择前视平面 | Select Front plane
  2. 绘制矩形 50mm x 30mm | Draw rectangle 50mm x 30mm
  3. 标注并锁定尺寸 | Dimension and lock

步骤 Step 2 - 拉伸 | Extrude:
  1. 选择轮廓 | Select profile
  2. 拉伸厚度 5mm | Extrude thickness 5mm

步骤 Step 3 - 添加侧板 | Add Side Panel:
  1. 选择顶面创建新草图 | Select top face, new sketch
  2. 绘制 30mm x 25mm 矩形 | Draw 30mm x 25mm rectangle
  3. 拉伸 5mm | Extrude 5mm

步骤 Step 4 - 安装孔 | Mounting Holes:
  1. 在底面绘制 2 个圆 (直径 4mm) | Draw 2 circles (4mm dia) on bottom face
  2. 位置居中，间距 40mm | Centered, 40mm apart
  3. 拉伸切割 Through All | Extrude cut - Through All

步骤 Step 5 - 倒角 | Fillet:
  1. 选择内角边 | Select inner corner edge
  2. 倒角半径 3mm | Fillet radius 3mm

步骤 Step 6 - 电机安装孔 | Motor Mount Holes:
  1. 在侧板绘制 4 个 M3 安装孔 | Draw 4 M3 mount holes on side panel
  2. 按电机安装孔距排列 | Arrange per motor mounting pattern

步骤 Step 7 - 导出 STL | Export STL:
  1. 文件 → 导出 → STL | File → Export → STL
  2. 选择高精度 | Select High refinement
```

---

### 2. StackForce 模型分析 (1.5h) | StackForce Model Analysis

#### 获取 StackForce 开源模型 | Obtaining StackForce Open-Source Models

StackForce 轮足机器人项目在 Gitee 上提供了完整的 3D 打印文件。

The StackForce bipedal wheeled robot project provides complete 3D printing files on Gitee.

```
获取步骤 | Acquisition Steps:

1. 访问仓库 | Visit repository:
   https://gitee.com/StackForce/bipedal_wheeled_robot

2. 找到 3D 模型目录 | Find 3D model directory:
   /models/  或  /3d_print/

3. 下载文件 | Download files:
   - 下载单个 STL: 点击文件 → 下载 | Click file → Download
   - 下载全部: 克隆仓库 | Clone entire repo
     git clone https://gitee.com/StackForce/bipedal_wheeled_robot.git

4. 关键文件说明 | Key file descriptions:

   ┌────────────────────────┬───────────────────────────────────┐
   │ 文件名 Filename         │ 用途 Purpose                      │
   ├────────────────────────┼───────────────────────────────────┤
   │ chassis_bottom.stl      │ 底盘底板 Bottom chassis plate     │
   │ chassis_top.stl         │ 底盘顶板 Top chassis plate        │
   │ wheel_hub.stl           │ 轮毂 x2 Wheel hubs (print 2)     │
   │ leg_left.stl            │ 左腿 Left leg                     │
   │ leg_right.stl           │ 右腿 Right leg                    │
   │ hip_joint.stl           │ 髋关节 Hip joints                  │
   │ knee_joint.stl          │ 膝关节 Knee joints                 │
   │ servo_bracket.stl       │ 舵机支架 Servo brackets            │
   │ motor_mount.stl         │ 电机安装座 Motor mount             │
   │ battery_holder.stl      │ 电池固定座 Battery holder          │
   │ imu_mount.stl           │ IMU 安装座 IMU mount              │
   │ cover.stl               │ 外壳盖板 Cover panel               │
   └────────────────────────┴───────────────────────────────────┘
```

#### 结构设计分析 | Structural Design Analysis

```
轮足机器人结构层次 | Bipedal Robot Structural Layers

                  ┌─────────────────────┐
                  │     顶盖 Cover       │  ← 装饰/保护 Decoration/protection
                  ├─────────────────────┤
                  │  电池 Battery        │  ← 供电 Power supply
                  │  ESP32 + IMU         │  ← 控制器 Controller
                  ├─────────────────────┤
                  │   底盘 Chassis       │  ← 主承载 Main load bearing
                  ├────┬───────────┬────┤
                  │电机 │           │ 电机│  ← BLDC 驱动 BLDC drive
                  │ L  │           │  R │
                  ├────┤           ├────┤
                  │轮子│           │轮子│  ← 运动驱动 Motion drive
                  │Wheel           Wheel│
                  ├────┴───────────┴────┤
                  │  腿部机构 Legs        │  ← 步行/辅助 Walking/assist
                  │  ┌──┐       ┌──┐    │
                  │  │髋│       │髋│    │
                  │  └┬┬┘       └┬┬┘    │
                  │   ││         ││     │
                  │  ┌┼┼┐       ┌┼┼┐    │
                  │  │膝│       │膝│    │
                  │  └┬┬┘       └┬┬┘    │
                  │   ││         ││     │
                  │  ┌┴┴┐       ┌┴┴┐    │
                  │  │足│       │足│    │
                  │  └──┘       └──┘    │
                  └─────────────────────┘

设计关键尺寸 | Design Key Dimensions:
──────────────────────────────────
  总高度 Total height:    200-250mm
  底盘宽度 Chassis width: 120-150mm
  轮子直径 Wheel dia:     65-80mm
  腿部总长 Leg length:    80-100mm
  重心高度 CG height:     60-80mm (越低越稳定 Lower = more stable)
```

#### 关键设计原则 | Key Design Principles

```
轮足机器人设计原则 | Bipedal Robot Design Principles

1. 重心控制 | Center of Gravity Control
   ─────────────────────────────────
   - 电池放在最底部（降低重心）| Battery at lowest point (lowers CG)
   - 重型组件对称分布 | Heavy components symmetrically placed
   - IMU 靠近旋转中心 | IMU near rotation center
   - 目标：重心在两轮轴线上方 | Goal: CG above wheel axis

2. 强度与重量平衡 | Strength-to-Weight Balance
   ─────────────────────────────────
   - 受力部位（电机座、轮毂）壁厚 ≥ 3mm
     Load-bearing parts (motor mount, wheel hub) wall ≥ 3mm
   - 非受力部位壁厚 1.5-2mm | Non-load-bearing walls 1.5-2mm
   - 总重量目标 < 500g（不含电池）| Target weight < 500g (excl. battery)

3. 安装与拆卸 | Assembly & Disassembly
   ─────────────────────────────────
   - 使用 M2/M3 螺丝固定 | Use M2/M3 screws for fastening
   - 关键部件可独立拆卸 | Key components independently removable
   - 预留调试窗口 | Reserve debug access windows

4. 线缆管理 | Cable Management
   ─────────────────────────────────
   - 设计线缆通道 | Design cable channels
   - 舵机线长度刚好够到主控板 | Servo cable length just reaches main board
   - 避免线缆靠近运动部件 | Keep cables away from moving parts
```

---

## 下午 (4h) | Afternoon Session

### 2. 零件定制与修改 (2h) | Part Customization & Modification

#### 在 Fusion 360 中修改现有模型 | Modifying Existing Models in Fusion 360

```cpp
/*
 * 本节不是代码，而是 Fusion 360 操作步骤说明
 * This section is not code, but Fusion 360 operation instructions
 */
```

```
修改 STL 模型的步骤 | Steps to Modify STL Models:

方法一：网格编辑 | Method 1: Mesh Editing
─────────────────────────────────────
1. 插入 → 插入网格 | Insert → Insert Mesh
2. 选择下载的 STL 文件 | Select downloaded STL file
3. 网格 → 转换实体（可选）| Mesh → Convert BRep (optional)
4. 使用推拉工具修改尺寸 | Use Push/Pull to modify dimensions

方法二：在原模型基础上设计 | Method 2: Design Based on Original
─────────────────────────────────────────
1. 导入原始 STL 作为参考 | Import original STL as reference
2. 在旁边创建新的草图和实体 | Create new sketch and body alongside
3. 匹配安装孔位和接口尺寸 | Match mounting holes and interface dims
4. 导出新的 STL | Export new STL
```

#### 常见零件修改需求 | Common Part Modification Needs

```
修改案例1：调整轮毂尺寸 | Example 1: Adjusting Wheel Hub Size

  原始设计 Original: 65mm 外径, 5mm 轴孔
  需求 Need: 80mm 外径, 8mm 轴孔（适配不同电机）

  步骤 Steps:
  1. 打开原始轮毂 STL | Open original hub STL
  2. 测量关键尺寸 | Measure key dimensions
  3. 创建新草图，基于新尺寸建模 | New sketch based on new dimensions
  4. 添加轮胎纹理（增加摩擦力）| Add tire tread (increase friction)
  5. 导出并切片测试 | Export and slice test


修改案例2：电池仓适配 | Example 2: Battery Compartment Adaptation

  原始设计 Original: 18650 单节 | Single 18650 cell
  需求 Need: 2S 锂电池包 (7.4V 1500mAh)

  步骤 Steps:
  1. 测量电池包尺寸（长x宽x高）| Measure battery pack dimensions
  2. 修改 battery_holder 模型 | Modify battery_holder model
  3. 添加固定带卡扣 | Add strap retention clips
  4. 预留电源线出口 | Reserve power cable exit hole
  5. 确保电池不会影响重心 | Verify battery doesn't affect CG
```

#### 设计 ESP32 安装座 | Designing an ESP32 Mount

```
ESP32 开发板尺寸 | ESP32 Dev Board Dimensions:
  PCB: 55mm x 28mm (约 approximately)
  高度（含排针）Height (with headers): ~15mm
  安装孔 M2.5, 间距 ~49mm x 22mm

设计步骤 | Design Steps:
─────────────────────
1. 新建草图 60mm x 35mm | New sketch 60mm x 35mm
2. 拉伸 3mm 厚底板 | Extrude 3mm thick base plate
3. 四角添加 2mm 高固定柱 (内径 2.5mm) | Add 2mm tall mounting posts at corners (ID 2.5mm)
4. 中间留出 USB 口缺口 (~12mm 宽) | Leave USB port notch (~12mm wide)
5. 添加卡扣或螺丝孔 | Add clips or screw holes
6. 倒角所有锐边 0.5mm | Fillet all sharp edges 0.5mm
7. 导出 STL | Export STL
```

---

### 3. 3D打印设置与切片 (2h) | 3D Printing Settings & Slicing

#### Cura 切片软件设置 | Cura Slicer Settings

```
UltiMaker Cura 下载 | Download:
  https://ultimaker.com/software/ultimaker-cura

推荐的打印参数 | Recommended Print Settings:
═══════════════════════════════════════════════════

┌─────────────────────┬───────────────┬───────────────┐
│ 参数 Parameter       │ 受力件 Load   │ 装饰件 Deco   │
│                     │ Bearing       │ rative        │
├─────────────────────┼───────────────┼───────────────┤
│ 层高 Layer height   │ 0.15-0.20mm   │ 0.20-0.30mm   │
│ 壁厚 Wall thickness │ 2.0mm (5线)   │ 1.2mm (3线)   │
│ 顶层/底层 Top/Bottom │ 1.0mm (5层)   │ 0.8mm (4层)   │
│ 填充密度 Infill      │ 30-50%        │ 15-20%        │
│ 填充图案 Infill ptrn │ Gyroscope     │ Grid          │
│ 打印温度 Temperature │ 200-210°C     │ 195-205°C     │
│ 热床温度 Bed temp    │ 60°C          │ 60°C          │
│ 打印速度 Speed       │ 40-50mm/s     │ 50-60mm/s     │
│ 支撑 Supports        │ 需要 Yes      │ 按需 As needed│
│ 支撑类型 Support type│ Tree 树状     │ Normal 普通   │
│ 附着 Adhesion        │ Brim 裙边     │ Skirt 简裙    │
└─────────────────────┴───────────────┴───────────────┘

材料：PLA（推荐初学者）| Material: PLA (recommended for beginners)
```

#### 各零件打印设置指南 | Per-Part Print Settings Guide

```
零件打印参数表 | Part Print Parameters Sheet
═══════════════════════════════════════════════════════

1. 轮毂 Wheel Hub (x2)
   ─────────────────────
   层高: 0.15mm          填充: 40%
   壁厚: 2.0mm           支撑: 是 (内部)
   方向: 平放，轴孔朝上
   预计时间: 1.5-2h 每个 | Est. time: 1.5-2h each

2. 底盘 Chassis
   ─────────────────────
   层高: 0.20mm          填充: 30%
   壁厚: 2.0mm           支撑: 是
   方向: 平放最大面朝下
   预计时间: 3-4h | Est. time: 3-4h

3. 腿部零件 Leg Parts (x4)
   ─────────────────────
   层高: 0.15mm          填充: 35%
   壁厚: 1.5mm           支撑: 是 (树状)
   方向: 长边平行于 X 轴
   预计时间: 1-1.5h 每个 | Est. time: 1-1.5h each

4. 关节件 Joint Parts (x4)
   ─────────────────────
   层高: 0.15mm          填充: 40%
   壁厚: 2.0mm           支撑: 是
   方向: 轴孔垂直
   预计时间: 0.5-1h 每个 | Est. time: 0.5-1h each

5. 舵机支架 Servo Brackets (x4)
   ─────────────────────
   层高: 0.20mm          填充: 30%
   壁厚: 2.0mm           支撑: 是
   预计时间: 0.5h 每个 | Est. time: 0.5h each

6. 电池座 Battery Holder
   ─────────────────────
   层高: 0.20mm          填充: 25%
   壁厚: 1.5mm           支撑: 轻微
   预计时间: 0.5h | Est. time: 0.5h
```

#### Cura 切片操作流程 | Cura Slicing Workflow

```
Cura 操作步骤 | Cura Operation Steps:

1. 导入模型 | Import Model
   文件 → 打开文件 → 选择 STL | File → Open File → Select STL

2. 调整摆放 | Adjust Placement
   - 拖拽移动 | Drag to move
   - 使用旋转工具找到最佳打印方向 | Use rotate tool for optimal print orientation
   - 底面尽量平整（减少支撑）| Flat bottom face (minimize supports)

3. 设置参数 | Set Parameters
   - 选择层高 | Select layer height
   - 设置填充密度 | Set infill density
   - 开启/关闭支撑 | Enable/disable supports
   - 选择附着方式 | Select adhesion type

4. 切片预览 | Slice & Preview
   - 点击"切片" | Click "Slice"
   - 查看层预览（逐层检查）| View layer preview (check layer by layer)
   - 检查是否有悬空区域需要支撑 | Check for overhangs needing support

5. 导出 G-code | Export G-code
   - 保存到 SD 卡或直接连接打印机 | Save to SD or direct print
   - 文件名用英文（某些打印机不支持中文）| English filename (some printers reject Chinese)

   估算信息 | Estimated Info:
   - 打印时间 Print time: ___h ___m
   - 耗材用量 Filament: ___g (___m)
   - 估计成本 Est. cost: ¥___
```

#### 打印前检查清单 | Pre-Print Checklist

```
打印前必查项目 | Pre-Print Checklist:
═════════════════════════════════════
□ 打印机热床已调平 | Printer bed is leveled
□ 热床表面清洁（酒精擦拭）| Bed surface clean (alcohol wipe)
□ 耗材已装入并预热挤出 | Filament loaded and extruded
□ STL 模型无错误（Cura 无警告）| STL model error-free (no Cura warnings)
□ 打印方向已优化 | Print orientation optimized
□ 支撑设置已确认 | Support settings confirmed
□ 附着方式已选择 | Adhesion type selected
□ 打印机喷嘴无堵塞 | Nozzle not clogged
□ SD 卡空间充足 | SD card has sufficient space
```

#### 打印后处理 | Post-Print Processing

```
后处理步骤 | Post-Processing Steps:

1. 冷却 | Cooling
   等热床冷却到室温再取下（避免翘曲）
   Wait for bed to cool to room temp before removing (prevent warping)

2. 去支撑 | Remove Supports
   - 用尖嘴钳小心拆支撑 | Use needle-nose pliers to remove supports
   - 树状支撑比普通支撑更容易拆除 | Tree supports easier to remove than normal
   - 注意不要损坏零件本体 | Be careful not to damage part body

3. 打磨 | Sanding
   - 粗砂纸 (120目) 去毛刺 | Coarse sandpaper (120 grit) remove burrs
   - 细砂纸 (400目) 抛光 | Fine sandpaper (400 grit) polish
   - 安装面必须平整 | Mounting surfaces must be flat

4. 试装 | Test Fit
   - 所有零件先用手试装，不涂胶不拧螺丝 | Hand test fit first, no glue no screws
   - 检查孔位对齐 | Check hole alignment
   - 电机/舵机是否能顺畅装入 | Motor/servo fit smoothly
   - 螺丝是否能顺利穿过 | Screws pass through easily

5. 最终装配 | Final Assembly
   - 确认所有零件配合良好后正式组装
   - Confirm all parts fit well before final assembly
```

---

## 今日作业 | Today's Task

1. **3D 建模练习 | 3D Modeling Practice**
   - 使用 Tinkercad 或 Fusion 360 创建至少 2 个自定义零件
   - Use Tinkercad or Fusion 360 to create at least 2 custom parts
   - 建议：ESP32 安装座 + 电池固定座
   - Suggestion: ESP32 mount + battery holder
   - 导出为 STL 格式 | Export as STL format

2. **下载与分析 StackForce 模型 | Download & Analyze StackForce Models**
   - 从 Gitee 克隆 StackForce 仓库，查看所有 STL 文件
   - Clone the StackForce repo from Gitee, examine all STL files
   - 在切片软件中打开每个零件，估算总打印时间
   - Open each part in slicer, estimate total print time

   ```
   git clone https://gitee.com/StackForce/bipedal_wheeled_robot.git
   ```

3. **开始 3D 打印 | Begin 3D Printing**
   - 打印优先级最高的零件：轮毂 (x2) + 电机座
   - Print highest priority parts: wheel hubs (x2) + motor mounts
   - 记录实际打印参数和时间 | Record actual print settings and time

4. **设计文档 | Design Documentation**
   - 为你修改/设计的零件制作简单的尺寸标注图
   - Create simple dimensioned drawings for your modified/designed parts
   - 记录设计决策理由（为什么这样设计）
   - Document design decision rationale (why designed this way)

   ```
   打印记录表 | Print Log Sheet
   ┌──────────┬────────┬────────┬────────┬────────┬────────┐
   │ 零件名    │ 层高    │ 填充   │ 支撑   │ 预计时间│ 实际时间│
   │ Part     │ Layer  │ Infill │Support │ Est.   │ Actual │
   ├──────────┼────────┼────────┼────────┼────────┼────────┤
   │ 轮毂 Hub │ 0.15mm │ 40%   │ Yes    │ 2h     │        │
   │ 底盘 Ch. │ 0.20mm │ 30%   │ Yes    │ 3.5h   │        │
   │ ...      │        │       │        │        │        │
   └──────────┴────────┴────────┴────────┴────────┴────────┘
   ```

---

## 今日检查点 | Checkpoint

- [ ] 能说出 Fusion 360 建模的基本流程 | Can describe basic Fusion 360 modeling workflow
- [ ] 已下载并查看 StackForce 仓库的 3D 模型文件 | Downloaded and examined StackForce repo 3D model files
- [ ] 至少完成 2 个自定义零件的建模 | Completed modeling of at least 2 custom parts
- [ ] 理解层高、填充率、支撑等打印参数的含义 | Understand layer height, infill, supports etc.
- [ ] 能独立使用 Cura 进行切片操作 | Can independently use Cura for slicing
- [ ] 至少开始打印 1 个零件 | Started printing at least 1 part
- [ ] 完成打印记录表 | Completed print log sheet

---

### 常见问题排查 | Troubleshooting

| 问题 Problem | 可能原因 Possible Cause | 解决方案 Solution |
|---|---|---|
| STL 导入 Cura 报错 STL import error in Cura | 文件损坏或格式异常 Corrupt file or format issue | 重新导出 STL，检查单位 Re-export STL, check units |
| 打印件翘曲 Print warping | 热床温度不够或未调平 Bed temp too low or unlevel | 调平热床，温度 60°C，用胶水 Level bed, 60°C, use glue |
| 支撑难以拆除 Supports hard to remove | 支撑密度太高 Support density too high | 降低支撑密度到 10-15% Reduce support density to 10-15% |
| 孔位对不上 Holes misaligned | 打印精度问题或设计尺寸偏差 Print accuracy issue or design tolerance | 设计时预留 0.2-0.3mm 公差 Add 0.2-0.3mm tolerance in design |
| 舵机装不进支架 Servo won't fit bracket | 打印收缩或设计公差不足 Print shrinkage or insufficient tolerance | 用锉刀微调或重新设计加大孔位 File to adjust or redesign with larger hole |
| 层分离 Layer separation | 打印温度太低或速度太快 Print temp too low or speed too high | 提高温度 5-10°C，降低速度 Raise temp 5-10°C, reduce speed |
| 模型悬空塌陷 Overhang sagging | 缺少支撑或支撑不够 Missing or insufficient supports | 添加树状支撑，调整打印方向 Add tree supports, adjust orientation |
| Tinkercad 无法导出 Can't export from Tinkercad | 网络问题或浏览器兼容性 Network or browser compatibility | 换浏览器或检查网络 Try different browser or check network |
