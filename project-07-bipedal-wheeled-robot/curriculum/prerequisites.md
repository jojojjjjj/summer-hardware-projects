# 前置知识 | Prerequisites

## 必备基础 | Required Basics

### C/C++ 语言基础
- 变量与数据类型（int, float, char, bool）
- 条件判断（if / else if / else）
- 循环（for, while）
- 函数定义与调用
- 数组与指针基础
- 类与对象的基本概念（面向对象编程入门）
- 头文件（.h）与源文件（.cpp）的分离编写

> ### C/C++ Language Basics
> - Variables and data types (int, float, char, bool)
> - Conditional statements (if / else if / else)
> - Loops (for, while)
> - Function definition and invocation
> - Arrays and pointer basics
> - Basic concepts of classes and objects (intro to OOP)
> - Separate compilation with header files (.h) and source files (.cpp)

### 物理基础
- 牛顿运动定律（力、加速度、质量的关系 F=ma）
- 力矩和转动惯量的基本概念
- 简单的受力分析和力平衡
- 角速度和角加速度的概念
- 基本的运动学知识（位移、速度、加速度）

> ### Physics Basics
> - Newton's laws of motion (force, acceleration, mass relationship F=ma)
> - Basic concepts of torque and moment of inertia
> - Simple force analysis and equilibrium
> - Concepts of angular velocity and angular acceleration
> - Basic kinematics (displacement, velocity, acceleration)

### 数学基础
- 代数运算（一元一次方程、一元二次方程）
- 三角函数（sin, cos, tan）的基本概念
- 简单的微积分概念（导数 = 变化率，积分 = 累加）—— 不要求会计算，理解含义即可
- 坐标系的概念（直角坐标系）

> ### Mathematics Basics
> - Algebraic operations (linear and quadratic equations)
> - Basic trigonometric functions (sin, cos, tan)
> - Simple calculus concepts (derivative = rate of change, integral = accumulation) -- understanding the meaning is sufficient, no calculation required
> - Coordinate system concepts (Cartesian coordinates)

### 计算机基础
- 了解什么是编程（写代码让硬件做事）
- 了解什么是文件（.cpp, .h, .ini 文件类型）
- 会使用浏览器和搜索引擎查找资料
- 基本的命令行操作（cd, ls, 命令行参数）

> ### Computer Basics
> - Understanding what programming is (writing code to make hardware do things)
> - Understanding files (.cpp, .h, .ini file types)
> - Ability to use a browser and search engine to find resources
> - Basic command-line operations (cd, ls, command arguments)

### 硬件基础
- 知道什么是电压（3.3V vs 5V vs 12V）
- 知道什么是 GND（地线）和电源正负极
- 了解电阻、电容的基本作用
- 不要求焊接经验（本项目使用杜邦线连接，但有焊接基础更好）

> ### Hardware Basics
> - Knowing what voltage is (3.3V vs 5V vs 12V)
> - Knowing what GND (ground) is and power supply polarity
> - Basic understanding of resistors and capacitors
> - No soldering experience required (this project uses Dupont wires), though basic soldering skills are helpful

---

## 推荐自学资源 | Recommended Self-Study Resources

### C/C++ 速成 (2-3 天可完成)
- [菜鸟教程 C 语言](https://www.runoob.com/cprogramming/c-tutorial.html) -- 看 1-12 章即可
- [菜鸟教程 C++ 面向对象](https://www.runoort.com/cplusplus/cpp-tutorial.html) -- 重点看类与对象章节
- [C 语言入门视频](https://www.bilibili.com/video/BV1q54y1q79w/) -- 2 小时快速入门

### 物理知识回顾 (1-2 天可完成)
- [高中物理必修一](https://www.bilibili.com/video/BV1vE411M7Kg/) -- 牛顿运动定律回顾
- [力矩与转动](https://www.bilibili.com/video/BV1GJ41137Dr/) -- 理解力矩概念

### 控制理论入门 (可选，1 天)
- [PID 控制最通俗讲解](https://www.bilibili.com/video/BV1et4y1i7pG/) -- 直观理解 PID
- [倒立摆控制动画演示](https://www.bilibili.com/video/BV1Y54y1Q7Jx/) -- 理解倒立摆原理

### 3D 建模入门 (可选)
- [Fusion 360 入门教程](https://www.bilibili.com/video/BV1dz4y1X7Eg/) -- 基本操作即可

---

## 软件安装清单 | Software Installation Checklist

在课程开始前，请确保以下软件已安装：

Before the course begins, please ensure the following software is installed:

| 软件 Software | 版本 Version | 下载地址 Download | 用途 Purpose |
|--------------|-------------|------------------|-------------|
| VSCode | 最新版 Latest | [code.visualstudio.com](https://code.visualstudio.com/) | 代码编辑器 |
| PlatformIO 插件 | 最新版 Latest | VSCode 扩展商店搜索 "PlatformIO" | 嵌入式开发环境 |
| Python | 3.8+ | [python.org](https://www.python.org/downloads/) | PlatformIO 依赖 |
| Git | 最新版 Latest | [git-scm.com](https://git-scm.com/downloads) | 版本管理 |
| CH340 驱动 | 最新版 Latest | [南京沁恒官网](http://www.wch.cn/downloads/CH341SER_EXE.html) | USB 串口驱动 |
| Fusion 360 | 教育版 | [autodesk.com](https://www.autodesk.com/products/fusion-360/education) | 3D 建模（可选） |
| 串口调试助手 | 任意 | 如 SSCOM、PuTTY | 调试输出查看 |
| 蓝牙串口 APP | 任意 | 手机应用商店搜索 "蓝牙串口" | 遥控测试 |

### 安装步骤 Installation Steps

1. **安装 Python**：下载并安装 Python 3.8+，安装时勾选 "Add Python to PATH"
2. **安装 VSCode**：下载并安装 Visual Studio Code
3. **安装 PlatformIO**：打开 VSCode，在扩展商店搜索 "PlatformIO IDE"，点击安装
4. **安装 Git**：下载并安装 Git，使用默认设置即可
5. **安装 CH340 驱动**：下载并安装 CH340 驱动程序（用于 ESP32 USB 串口通信）
6. **验证安装**：打开 VSCode，左侧应出现 PlatformIO 图标（外星人头像）

> 1. **Install Python**: Download and install Python 3.8+, check "Add Python to PATH" during installation
> 2. **Install VSCode**: Download and install Visual Studio Code
> 3. **Install PlatformIO**: Open VSCode, search for "PlatformIO IDE" in the Extensions marketplace, click Install
> 4. **Install Git**: Download and install Git with default settings
> 5. **Install CH340 Driver**: Download and install the CH340 driver (for ESP32 USB serial communication)
> 6. **Verify Installation**: Open VSCode, the PlatformIO icon (alien head) should appear on the left sidebar

---

## 硬件准备清单 | Hardware Preparation Checklist

请在课程开始前准备好以下硬件：

Please prepare the following hardware before the course begins:

- [ ] ESP32 开发板 x1
- [ ] BLDC 电机（2808 规格，带编码器）x2
- [ ] BLDC 电机驱动板 x1
- [ ] MPU6050 模块 x1
- [ ] 3S 锂电池（11.1V 1500mAh）x1
- [ ] 3D 打印结构件 1套（或课程中打印）
- [ ] 杜邦线（母对母 20cm）x20
- [ ] 螺丝螺母套装（M2/M3）x1
- [ ] 电源拨动开关 x1
- [ ] USB 数据线 x1
- [ ] 面包板 x1（可选，用于前期测试）

---

## 名词速查 | Quick Glossary

| 名词 Term | 解释 Definition |
|----------|----------------|
| **MCU** | 微控制器（单片机），一颗集成了处理器、存储器和外设的芯片 |
| **ESP32** | 乐鑫科技推出的双核 MCU，内置 WiFi 和蓝牙，适合 IoT 和机器人项目 |
| **GPIO** | 通用输入输出引脚，MCU 与外部世界交互的接口 |
| **BLDC** | 无刷直流电机，没有电刷磨损，效率高、寿命长、力矩输出平滑 |
| **FOC** | 磁场定向控制，通过精确控制电机内部磁场实现高效力矩输出 |
| **IMU** | 惯性测量单元，包含加速度计和陀螺仪，用于测量姿态和运动 |
| **MPU6050** | InvenSense 生产的 6 轴 IMU 芯片（3轴加速度计 + 3轴陀螺仪） |
| **PID** | 比例-积分-微分控制器，一种经典反馈控制算法 |
| **I2C** | 一种两线制通信协议（SCL 时钟线 + SDA 数据线），用于短距离设备通信 |
| **PWM** | 脉冲宽度调制，通过改变脉冲占空比来控制电压/功率输出 |
| **编码器 Encoder** | 安装在电机上的传感器，用于测量电机转动的角度和速度 |
| **倒立摆 Inverted Pendulum** | 一种经典的控制问题模型，重心在支点之上，需要持续控制才能保持平衡 |
| **PlatformIO** | 跨平台嵌入式开发工具，支持多种 MCU 和开发框架 |
| **串级控制 Cascade Control** | 多个控制器串联工作，外环的输出作为内环的输入 |
| **姿态解算 Attitude Estimation** | 从 IMU 原始数据计算物体姿态角（俯仰角、横滚角）的过程 |
