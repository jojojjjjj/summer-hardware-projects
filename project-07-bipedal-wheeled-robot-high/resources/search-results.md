# 轮足机器人项目资源搜索结果 | Bipedal Wheeled Robot Project Resource Search Results

搜索日期：2026-05-27

---

## 一、StackForce 官方资源 | StackForce Official Resources

### 1. 核心开源仓库 | Core Open-Source Repository

**StackForce/bipedal_wheeled_robot** — StackForce 双足轮机器人开源套件
- **链接：** https://gitee.com/StackForce/bipedal_wheeled_robot
- **语言：** C++
- **许可证：** Apache License 2.0
- **Star：** 16 | Fork：144 | Watch：54
- **简介：** 本项目基于 StackForce 轻量级机器人开发平台，旨在制作一款轮足机器人，并在 B 站推出【手把手教做轮足机器人】系列课程。课程内容涵盖从原理讲解到代码实操与实物调试，循序渐进地带领大家深入学习轮足机器人的核心原理和算法知识，最终制作出属于自己的轮足机器人。
- **仓库内容：**
  - `模型/` — 所有实现轮足机器人的 3D 模型文件（STL 格式）
  - `BOM/` — 制作整个轮足机器人的所有零件列表
  - `课程代码/` — 每节课所讲解功能实现对应的 PlatformIO 项目
- **技术交流 Q 群：** 223211857

> This project is based on the StackForce lightweight robot development platform. It features a bipedal wheeled robot with a companion Bilibili tutorial series covering principles, coding, and debugging. The repo includes 3D models, BOM, and PlatformIO course code.

---

### 2. StackForce 平台官网 | StackForce Platform Website

- **链接：** http://stackforce.cc
- **简介：** StackForce 轻量级机器人开发平台官方网站，提供平台文档、使用说明和技术资料。
- **内容：** 开发平台介绍、电机控制上位机说明、API 文档

> Official website for the StackForce lightweight robot development platform with documentation and technical resources.

---

### 3. StackForce 其他相关项目 | Other StackForce Projects

| 项目名 | 链接 | Star/Fork | 简介 |
|--------|------|-----------|------|
| **Quadrupedal wheeled robot** | https://gitee.com/StackForce/quadrupedal-wheeled-robot | 5/30/6 | StackForce 四轮足机器狗开源项目，类似架构但为四足设计，可参考其电机驱动和运动控制代码 |
| **Gaint bipedal wheeled robot** | https://gitee.com/StackForce/gaint-bipedal-wheeled-robot | 4/13/2 | StackForce 大轮足机器人开源项目，大型版双足轮机器人，结构设计可参考 |
| **StackForce_Studio** | https://gitee.com/StackForce/StackForce_Studio | 2/6/2 | StackForce 电机控制上位机（Python），用于电机参数调试和监控，含 GUI 界面 |
| **Dual BLDC Motor Driver 5A** | https://gitee.com/StackForce/Dual-BLDC-Motor-Driver-5A | 2/5/2 | 5A 双路无刷电机小功率驱动板设计文件，本项目使用的电机驱动板，含原理图和 PCB |
| **Digital_Twins** | https://gitee.com/StackForce/Digital_Twins | 1/2/1 | 数字孪生项目，可在仿真环境中测试控制算法，适合前期开发和调试 |

---

## 二、B 站教程视频 | Bilibili Tutorial Videos

### StackForce 官方系列（核心推荐）

**【StackForce 手把手教做轮足机器人】系列**
- **UP 主：** StackForce 官方账号
- **搜索关键词：** "StackForce 轮足机器人" 或 "手把手教做轮足机器人"
- **B 站搜索链接：** https://search.bilibili.com/all?keyword=StackForce%20%E8%BD%AE%E8%B6%B3%E6%9C%BA%E5%99%A8%E4%BA%BA
- **简介：** 官方推出的系列课程视频，内容涵盖：
  - 轮足机器人原理讲解
  - 硬件组装指导
  - 代码逐行解读
  - PID 调参实操
  - 实物调试过程
- **推荐度：** 必看（本项目的核心教程资源）

> Official StackForce tutorial series on Bilibili covering principles, hardware assembly, code walkthrough, PID tuning, and physical debugging. Essential resource for this project.

---

### 相关机器人自平衡教程

1. **自平衡小车/机器人系列教程**
   - 搜索关键词： "自平衡小车 PID" 或 "两轮自平衡机器人 ESP32"
   - B 站搜索链接： https://search.bilibili.com/all?keyword=%E8%87%AA%E5%B9%B3%E8%A1%A1%E6%9C%BA%E5%99%A8%E4%BA%BA%20PID
   - 推荐内容：PID 控制原理讲解、MPU6050 使用教程、自平衡算法实现

2. **MPU6050 姿态解算教程**
   - 搜索关键词： "MPU6050 姿态解算" 或 "MPU6050 互补滤波"
   - B 站搜索链接： https://search.bilibili.com/all?keyword=MPU6050%20%E5%A7%BF%E6%80%81%E8%A7%A3%E7%AE%97
   - 推荐内容：加速度计/陀螺仪数据融合、欧拉角计算、滤波算法

3. **FOC 无刷电机控制教程**
   - 搜索关键词： "FOC 无刷电机控制" 或 "BLDC FOC 入门"
   - B 站搜索链接： https://search.bilibili.com/all?keyword=FOC%20%E6%97%A0%E5%88%B7%E7%94%B5%E6%9C%BA
   - 推荐内容：FOC 原理讲解、SimpleFOC 库使用、电机参数调试

4. **ESP32 开发教程**
   - 搜索关键词： "ESP32 入门教程" 或 "PlatformIO ESP32"
   - B 站搜索链接： https://search.bilibili.com/all?keyword=ESP32%20PlatformIO%20%E6%95%99%E7%A8%8B
   - 推荐内容：ESP32 基础开发、WiFi/蓝牙通信、PlatformIO 使用

---

## 三、PID 控制算法资源 | PID Control Algorithm Resources

### 入门教程

1. **PID 控制原理（中文）**
   - 搜索建议：CSDN 搜索 "PID 控制算法 详解 入门"
   - 核心概念：
     - P（比例）：输出与误差成正比，越大响应越快但可能振荡
     - I（积分）：累积历史误差，消除稳态误差
     - D（微分）：预测误差变化趋势，抑制超调和振荡

2. **PID 调参实践指南**
   - **Ziegler-Nichols 方法：** 先只用 P，增大到系统持续振荡，记录临界增益 Ku 和振荡周期 Tu
   - **手动调参法（推荐初学者）：**
     1. 先只用 Kp：从小到大增加，直到系统开始振荡
     2. 将 Kp 减小到振荡值的 60-70%
     3. 加入 Kd：逐渐增加直到振荡减弱
     4. 最后加入 Ki：少量增加消除稳态误差
   - 搜索建议：B 站搜索 "PID 调参 实践"

3. **经典 PID 教程视频**
   - B 站搜索关键词： "PID控制 通俗易懂"
   - B 站搜索链接： https://search.bilibili.com/all?keyword=PID%E6%8E%A7%E5%88%B6%20%E9%80%9A%E4%BF%97%E6%98%93%E6%87%82

### 进阶资源

4. **互补滤波与卡尔曼滤波**
   - 互补滤波（Complementary Filter）：简单高效，适合本项目
     ```c
     angle = 0.98 * (angle + gyro_rate * dt) + 0.02 * accel_angle;
     ```
   - 卡尔曼滤波（Kalman Filter）：更精确但计算量更大
   - 搜索建议：CSDN 搜索 "互补滤波 卡尔曼滤波 MPU6050"

5. **串级 PID 控制**
   - 位置环 + 速度环 + 电流环
   - 搜索建议：B 站搜索 "串级PID 控制"

---

## 四、MPU6050 教程资源 | MPU6050 Tutorial Resources

### 基础知识

1. **MPU6050 工作原理**
   - 六轴传感器：3 轴加速度计 + 3 轴陀螺仪
   - I2C 通信接口（地址 0x68 或 0x69）
   - 16 位 ADC 精度
   - 可编程陀螺仪量程：+/-250/+500/+1000/+2000 deg/s
   - 可编程加速度计量程：+/-2g/+4g/+8g/+16g

2. **Arduino/ESP32 MPU6050 库**
   - **Wire.h**（内置）：I2C 通信基础库
   - **MPU6050_light**（推荐）：轻量级 MPU6050 库
     - GitHub: https://github.com/rfetick/MPU6050_light
   - **Adafruit_MPU6050**：Adafruit 官方库，文档完善
     - GitHub: https://github.com/adafruit/Adafruit_MPU6050

3. **数据融合算法**
   - **互补滤波（Complementary Filter）：** 简单高效，推荐本项目使用
     - 高通滤波陀螺仪 + 低通滤波加速度计
     - 典型系数：alpha = 0.96-0.98
   - **卡尔曼滤波（Kalman Filter）：** 最优估计，计算量较大
     - 参考实现：https://github.com/TKJElectronics/Kalman

### 教程链接

4. **MPU6050 中文教程**
   - B 站搜索关键词： "MPU6050 教程 ESP32"
   - CSDN 搜索： "MPU6050 姿态角计算"
   - 推荐阅读：MPU6050 寄存器手册（InvenSense 官方文档）

---

## 五、ESP32 开发资源 | ESP32 Development Resources

### 开发环境

1. **PlatformIO（推荐）**
   - 官网：https://platformio.org/
   - VS Code 插件安装：在 VS Code 扩展商店搜索 "PlatformIO IDE"
   - ESP32 平台文档：https://docs.platformio.org/en/stable/platforms/espressif32.html
   - 与 StackForce 项目完全兼容

2. **Arduino IDE（备选）**
   - 官网：https://www.arduino.cc/en/software
   - ESP32 插件安装：https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html

### ESP32 核心特性

- **处理器：** Xtensa 双核 32 位 LX6，240 MHz
- **WiFi：** 802.11 b/g/n
- **蓝牙：** Bluetooth 4.2 + BLE
- **GPIO：** 34 个可编程 GPIO
- **ADC：** 18 通道 12 位 SAR ADC
- **I2C：** 2 个 I2C 控制器
- **PWM：** 16 通道 LED PWM
- **推荐开发板：** ESP32-DevKitC 或 NodeMCU-32S

### ESP32 蓝牙遥控

3. **Bluetooth Classic 遥控**
   - 使用 Bluetooth Serial（串口蓝牙）
   - 手机端可使用 Serial Bluetooth Terminal App
   - ESP32 代码参考：
     ```cpp
     #include "BluetoothSerial.h"
     BluetoothSerial SerialBT;
     SerialBT.begin("BipedalRobot");  // 蓝牙设备名
     ```

4. **WiFi 遥控（备选方案）**
   - ESP32 作为 WiFi AP 或连接路由器
   - 手机通过 HTTP/WebSocket 控制机器人
   - 参考库：ESPAsyncWebServer
     - GitHub: https://github.com/me-no-dev/ESPAsyncWebServer

---

## 六、BLDC 电机 / FOC 控制资源 | BLDC Motor / FOC Control Resources

### FOC 基础知识

1. **FOC（磁场定向控制）原理**
   - 目标：精确控制无刷电机的扭矩和转速
   - 核心步骤：
     1. 测量电机相电流
     2. Clarke 变换（三相 -> 两相静止坐标系）
     3. Park 变换（静止坐标系 -> 旋转坐标系）
     4. PI 控制器计算电压矢量
     5. 反 Park 变换
     6. SVPWM 生成 PWM 信号
   - 搜索建议：B 站搜索 "FOC 磁场定向控制 原理"

2. **SimpleFOC 库（推荐）**
   - GitHub: https://github.com/simplefoc/Arduino-FOC
   - Star: 3000+
   - 简介：开源 FOC 电机控制库，支持 Arduino/ESP32/STM32
   - 特点：
     - API 简洁易用
     - 支持多种电机和编码器
     - 有完善的文档和教程
   - 官网：https://docs.simplefoc.com/

### StackForce 电机驱动

3. **StackForce Dual BLDC Motor Driver 5A**
   - 仓库：https://gitee.com/StackForce/Dual-BLDC-Motor-Driver-5A
   - 5A 双路无刷电机驱动板
   - 含原理图和 PCB 设计文件
   - 配合 StackForce 电机控制代码使用

4. **StackForce_Studio 上位机**
   - 仓库：https://gitee.com/StackForce/StackForce_Studio
   - Python 编写的电机控制上位机
   - 用于电机参数调试和实时监控

---

## 七、3D 建模与打印资源 | 3D Modeling & Printing Resources

### StackForce 3D 模型

1. **官方模型文件**
   - 位置：StackForce 仓库 `模型/` 目录
   - 格式：STL
   - 包含：机器人所有结构件的 3D 打印文件
   - 链接：https://gitee.com/StackForce/bipedal_wheeled_robot/tree/master/%E6%A8%A1%E5%9E%8B

### 切片软件

2. **UltiMaker Cura（推荐）**
   - 官网：https://ultimaker.com/software/ultimaker-cura
   - 免费、开源、跨平台
   - 内置大量打印机配置

3. **PrusaSlicer**
   - 官网：https://www.prusa3d.com/prusaslicer/
   - 免费、开源
   - 支持多种 FDM 打印机

### 3D 建模工具（用于修改设计）

4. **TinkerCAD（入门推荐）**
   - 官网：https://www.tinkercad.com/
   - 在线 3D 建模工具，免费
   - 适合简单修改和设计

5. **Fusion 360（进阶）**
   - 官网：https://www.autodesk.com/products/fusion-360/
   - 专业级 CAD 软件
   - 教育版免费

6. **FreeCAD（开源）**
   - 官网：https://www.freecadweb.org/
   - 完全免费开源的参数化 3D 建模工具

### 3D 打印参数建议

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| 层高 | 0.2mm | 平衡打印速度和精度 |
| 填充率 | 20-30% | 结构件建议 30% |
| 壁厚 | 3 层（约 1.2mm） | 保证强度 |
| 支撑 | 按需开启 | 悬空角度 >45 度需要支撑 |
| 材料 | PLA | 最容易打印的材料 |

### 3D 打印服务

- **淘宝 3D 打印服务：** 搜索 "3D 打印 代打"
- **嘉立创 3D 打印：** https://www.jlc.com/3d-printing
- **学校/实验室打印机：** 如有条件可自行打印

---

## 八、硬件采购参考 | Hardware Procurement Reference

### 核心元器件（参考 BOM）

| 元器件 | 型号/规格 | 参考价格 | 采购渠道 | 备注 |
|--------|----------|---------|---------|------|
| 主控板 | ESP32-DevKitC | 20-40 元 | 淘宝/嘉立创 | 推荐使用官方指定型号 |
| 姿态传感器 | MPU6050 模块 | 5-10 元 | 淘宝 | GY-521 模块 |
| BLDC 电机 | 轮毂电机/无刷电机 | 30-60 元 x2 | 淘宝 | 参考 StackForce BOM |
| 电机驱动板 | StackForce Dual BLDC 5A | 50-80 元 | StackForce 官方/淘宝 | 官方指定驱动板 |
| 电池 | 18650 锂电池 2S | 20-40 元 | 淘宝 | 含电池盒 |
| 蓝牙模块 | ESP32 内置 | - | - | 无需额外购买 |
| 杜邦线 | 公对公/公对母 | 5-10 元 | 淘宝 | 一套 |
| 螺丝螺母 | M2/M3 规格 | 5 元 | 淘宝 | 一套 |
| 3D 打印 | PLA 材料 | 30-50 元 | 淘宝代打/自印 | 所有结构件 |
| USB 数据线 | Type-C | 5-10 元 | 淘宝 | 用于烧录和供电 |

**预估总成本：约 200-400 元**

### 推荐采购渠道

- **StackForce 官方：** 参考 http://stackforce.cc 获取推荐采购清单
- **淘宝：** 搜索 "ESP32 开发板"、"MPU6050 模块"、"18650 电池盒"
- **嘉立创商城：** https://www.szlcsc.com/ （标准电子元器件）
- **StackForce 技术交流 Q 群：** 223211857（可询问采购建议）

---

## 九、学习路线图建议 | Recommended Learning Path

### 第一阶段：基础知识（项目前自学）
- [ ] 了解 ESP32 基础开发（PlatformIO 环境搭建）
- [ ] 了解 I2C 通信协议基础
- [ ] 了解 PID 控制基本概念
- [ ] 了解 3D 打印基本流程

### 第二阶段：跟随课程（Day 1-6）
- [ ] 跟随 StackForce 视频教程逐步搭建
- [ ] 逐个模块测试（传感器、电机、通信）
- [ ] 实践 PID 调参

### 第三阶段：集成优化（Day 7-11）
- [ ] 完成全系统集成
- [ ] 精细调参
- [ ] 组装和测试

### 第四阶段：展示（Day 12）
- [ ] 准备演示和 PPT
- [ ] 部署 Demo 网站
- [ ] 最终展示

---

## 十、补充搜索建议 | Supplementary Search Suggestions

### B 站搜索关键词
- "StackForce 轮足机器人" — 官方系列教程
- "自平衡机器人 ESP32" — 类似项目参考
- "MPU6050 姿态角 互补滤波" — 传感器教程
- "FOC 无刷电机控制 入门" — 电机控制教程
- "PID 调参 实践" — 控制算法教程
- "PlatformIO ESP32 入门" — 开发环境教程
- "3D 打印入门 FDM" — 3D 打印教程

### GitHub/Gitee 搜索
- 搜索 `bipedal wheeled robot` — 查找类似项目
- 搜索 `self balancing robot ESP32` — 自平衡机器人项目
- 搜索 `SimpleFOC` — FOC 电机控制库
- 搜索 `MPU6050 ESP32` — MPU6050 驱动代码

### 技术论坛
- **StackForce Q 群：** 223211857（官方技术交流群）
- **Arduino 中文社区：** https://www.arduino.cn/
- **CSDN：** 搜索相关技术文章
- **ESP32 官方论坛：** https://esp32.com/

---

*最后更新：2026-05-27*
