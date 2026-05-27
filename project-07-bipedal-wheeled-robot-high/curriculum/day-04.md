# Day 04: 运动学与物理建模 | Kinematics & Physical Modeling

## 今日目标 | Today's Goals

- 理解为什么机器人需要平衡（倒立摆模型）| Understand why robots need balance (inverted pendulum model)
- 学习力矩、转动惯量等基础物理概念 | Learn basic physics concepts: torque, moment of inertia, etc.
- 建立倒立摆的数学模型 | Build the mathematical model of an inverted pendulum
- 用 Python 进行数值仿真验证 | Verify with Python numerical simulation
- 将理论模型与实际机器人对应 | Connect theoretical model to our actual robot

---

## 上午 (3h) | Morning Session

### 1. 为什么机器人需要平衡？ | Why Do Robots Need Balance? (45min)

**自然界中的平衡 | Balance in Nature:**

```
为什么平衡是"反直觉"的？

想象你拿一根筷子，尖端朝下立在手指上:
- 筷子会倒 → 因为重心在支点上方 → 不稳定平衡
- 你需要不断移动手指来维持平衡 → 这就是"倒立摆"问题!

Imagine balancing a chopstick point-down on your finger:
- It falls → center of mass above pivot → unstable equilibrium
- You must constantly move your finger → this IS the "inverted pendulum" problem!

稳定的 vs 不稳定的:
┌──────────────────────────────────────────────────┐
│                                                   │
│  稳定平衡 (Stable)        不稳定平衡 (Unstable)   │
│                                                   │
│     ╱│╲                      │                    │
│    ╱ │ ╲                     ╱│╲                  │
│   ╱  │  ╲                   ╱ │ ╲                 │
│  ────┼────                ──┼──┼──┼──             │
│       ▲                     ▲  ▲  ▲               │
│    重心在支点下方          重心在支点上方            │
│    推一下会回来            推一下就倒了!            │
│                                                   │
│  例: 不倒翁              例: 立着的筷子             │
│  例: 吊灯               例: 我们的机器人!          │
└──────────────────────────────────────────────────┘
```

> **我们的轮足机器人就是一个倒立摆!** 它的重心在轮子上方，天然不稳定。如果不主动控制，它会倒下。我们的任务是通过控制轮子的加速度，让机器人"一直快要倒但永远不倒"。

> **Our wheeled robot IS an inverted pendulum!** Its center of mass is above the wheels, inherently unstable. Without active control, it falls. Our task: control wheel acceleration so the robot is "always about to fall but never does."

**倒立摆类比 | Inverted Pendulum Analogy:**

```
人站立平衡 vs 机器人平衡:

人类:                           机器人:
眼睛/内耳 感知倾斜              MPU6050 感知倾斜
  ↓                               ↓
大脑 计算需要多少力量            ESP32 计算 PID 输出
  ↓                               ↓
腿部肌肉 移动身体               BLDC电机 驱动轮子
  ↓                               ↓
重心回到支撑点上方              重心回到轮子上方

人类从小学会了平衡 (大约1岁)
我们要教会机器人做同样的事!
Humans learn to balance at ~1 year old.
We need to teach our robot the same thing!
```

---

### 2. 基础物理概念回顾 | Basic Physics Review (1h)

**笨鸟先飞: 如果你没学过高中物理，别怕！这里只用到最基础的几个概念，我们会用生活化的例子解释。**

**Don't worry if you haven't studied high school physics! We only use the most basic concepts, explained with everyday examples.**

**概念 1: 力 (Force)**

```
力 = 推或拉的作用
Force = a push or pull

单位: 牛顿 (N)
日常例子:
- 1 N ≈ 手托起一个苹果的力
- 人的体重 ≈ 500-700 N

重要: 重力 = 质量 × 重力加速度
  F_gravity = m × g
  g ≈ 9.8 m/s² (地球表面)

一个 2kg 的机器人:
  重力 = 2 × 9.8 = 19.6 N
```

**概念 2: 力矩 (Torque)**

```
力矩 = 力 × 力臂 = 让物体旋转的"推力"
Torque = Force × Arm = the "push" that makes things rotate

公式: τ = F × r

其中:
  τ (tau) = 力矩 (N·m)
  F = 力 (N)
  r = 力臂 (m) = 从旋转轴到力作用点的距离

日常例子:
- 推门: 靠门把手推(力臂大)比靠门轴推(力臂小)省力得多
  推门力矩 = 手推力 × 门把手到铰链的距离

    门把手 ←──r──→ 铰链
      ↓ F
    ┌──┤
    │  │ ← 门
    │  │
    └──┘
    力矩 τ = F × r

- 跷跷板: 重的人坐近一点, 轻的人坐远一点, 可以平衡
  平衡条件: m1 × r1 = m2 × r2
```

**概念 3: 转动惯量 (Moment of Inertia)**

```
转动惯量 = 物体抵抗旋转变化的"惯性"
Moment of inertia = object's resistance to rotational change

类比:
- 质量 → 线性运动中的惯性 (越重越难加速)
- 转动惯量 → 旋转运动中的惯性 (越"分散"越难转)

公式 (简单情况): I = m × r²

其中:
  I = 转动惯量 (kg·m²)
  m = 质量 (kg)
  r = 质量到旋转轴的距离 (m)

日常例子:
- 花样滑冰旋转:
  手臂张开 → 转动惯量大 → 旋转慢
  手臂收紧 → 转动惯量小 → 旋转快
  
  ╱    ╲        │ │
 │  ●  │   →   │●│
  ╲    ╱        │ │
  (慢转)       (快转)

- 轮足机器人:
  重心越高 → 转动惯量越大 → 倒得越慢 (容易控制)
  重心越低 → 转动惯量越小 → 倒得越快 (难控制)
```

**概念 4: 角速度与角加速度**

```
角速度 (ω, omega) = 旋转的快慢 = 角度变化率
Angular velocity = how fast it spins

  ω = dθ / dt     单位: 弧度/秒 (rad/s) 或 度/秒 (°/s)
  例: 陀螺仪测量的就是角速度

角加速度 (α, alpha) = 角速度的变化率
Angular acceleration = rate of change of angular velocity

  α = dω / dt     单位: rad/s²

牛顿第二定律 (旋转版本):
Newton's second law (rotation version):

  τ = I × α

  力矩 = 转动惯量 × 角加速度

类比:
  F = m × a    (线性: 力 = 质量 × 加速度)
  τ = I × α    (旋转: 力矩 = 转动惯量 × 角加速度)
```

---

### 3. 倒立摆数学建模 | Inverted Pendulum Mathematical Model (1h15min)

**系统描述 | System Description:**

```
我们的轮足机器人简化模型:
Simplified model of our wheeled robot:

            m = 车体质量 (kg)
            │
            │ L = 质心到轮轴的距离 (m)
            │
     θ      │
      ╲     │ ● ← 质心 (Center of Mass)
       ╲    │
        ╲   │
    ─────○─────
         ↑
      M = 轮子等效质量 (kg)
      x = 轮子位置 (m)
      θ = 倾斜角 (rad), 正方向 = 向右倒
      F = 电机施加的力 (N)

    ─────────────────────→ x (地面)
    │
    ↓ 重力 g

参数:
  M = 轮子质量 + 电机等效质量 ≈ 0.3 kg
  m = 车体质量 (含电池、电路板) ≈ 1.5 kg
  L = 质心到轮轴距离 ≈ 0.08 m
  g = 9.8 m/s²
  R = 轮子半径 ≈ 0.03 m
```

**推导过程 (简化版) | Derivation (Simplified):**

```
对机器人进行受力分析:

1. 车体 (pendulum) 绕轮轴的力矩平衡:

   τ_net = I_pendulum × θ̈

   其中:
   - 重力力矩 = m × g × L × sin(θ)  (让机器人倒下)
   - 惯性力矩 (车体加速度引起) = m × L × ẍ × cos(θ)

   所以: m × L² × θ̈ = m × g × L × sin(θ) - m × L × ẍ × cos(θ)

   简化 (两边除以 m×L):
   L × θ̈ = g × sin(θ) - ẍ × cos(θ)  ... (方程1)


2. 整体 (轮+车体) 在水平方向的力平衡:

   总外力 = 总质量 × 加速度
   F = (M + m) × ẍ + m × L × θ̈ × cos(θ) - m × L × θ̇² × sin(θ)

   简化:
   ẍ = [F - m × L × θ̈ × cos(θ) + m × L × θ̇² × sin(θ)] / (M + m)  ... (方程2)


3. 对于小角度 (θ ≈ 0), 线性化:
   sin(θ) ≈ θ
   cos(θ) ≈ 1
   θ̇² ≈ 0 (忽略)

   方程1 变成: L × θ̈ = g × θ - ẍ
   方程2 变成: ẍ = [F - m × L × θ̈] / (M + m)

   联立求解:
   θ̈ = [(M+m)×g] / (M×L) × θ - 1/(M×L) × F

   令 a = (M+m)×g / (M×L), b = 1/(M×L)

   θ̈ = a × θ - b × F   ← 这就是我们要的控制方程!
```

> **关键理解: 倒立摆是一个"不稳定系统"**。看方程 `θ̈ = a × θ - b × F` 中，`a > 0` 意味着倾斜角 θ 会自己增大（倒下）。系数 a 越大，倒得越快。我们必须通过施加力 F 来对抗这个"倒下趋势"。

> **Key insight: The inverted pendulum is an "unstable system."** In the equation `θ̈ = a × θ - b × F`, `a > 0` means the tilt angle θ grows on its own (falling). Larger a = faster falling. We must apply force F to counteract this "falling tendency."

**状态空间表示 | State-Space Representation:**

```
将二阶微分方程转化为一阶方程组 (状态空间):

定义状态变量:
  x₁ = θ     (倾斜角)
  x₂ = θ̇    (角速度)

则:
  ẋ₁ = x₂                     (角速度)
  ẋ₂ = a × x₁ - b × u         (角加速度, u = 控制力 F)

矩阵形式:
  ┌    ┐     ┌      ┐ ┌    ┐     ┌   ┐
  │ ẋ₁ │  =  │ 0  1 │ │ x₁ │  +  │ 0 │ × u
  │ ẋ₂ │     │ a  0 │ │ x₂ │     │-b │
  └    ┘     └      ┘ └    ┘     └   ┘

  ẋ  =  A    ×  x   +  B  × u

这就是"状态空间方程"的标准形式。

A 矩阵的特征值决定了系统是否稳定:
  λ = ±√a

因为 a > 0, 所以 λ = ±√a, 一个特征值为正!
→ 正特征值 = 不稳定 (指数增长)
→ 必须通过反馈控制来"稳定化"
```

---

## 下午 (4h) | Afternoon Session

### 4. 线性化与传递函数 | Linearization & Transfer Function (1h)

**为什么要线性化？** 真实的倒立摆方程是非线性的（有 sin, cos）。非线性系统很难分析。但在小角度时（θ < 15°），sin(θ) ≈ θ，方程就变简单了。这就是"线性化"。

**Why linearize?** The real inverted pendulum equation is nonlinear (sin, cos). Nonlinear systems are hard to analyze. But at small angles (θ < 15°), sin(θ) ≈ θ, simplifying the equation. This is "linearization."

**传递函数 | Transfer Function:**

```
从状态空间到传递函数 (拉普拉斯变换):

  G(s) = Θ(s) / U(s) = -b / (s² - a)

其中:
  s = 拉普拉斯变量 (复频率)
  Θ(s) = 角度 θ 的拉普拉斯变换 (输出)
  U(s) = 控制力 F 的拉普拉斯变换 (输入)
  a = (M+m)×g / (M×L)
  b = 1 / (M×L)

这个传递函数告诉我们:
- 极点在 s = ±√a (一个在右半平面 → 不稳定)
- 这是一个"双积分器 + 不稳定极点"系统
- 我们需要设计控制器把极点移到左半平面
```

**可控性分析 | Controllability Analysis:**

```
可控性矩阵:
  C = [B  AB]

  A = ┌ 0  1 ┐     B = ┌ 0 ┐
      │ a  0 │         │-b │
      └      ┘         └   ┘

  AB = A × B = ┌ 0  1 ┐ × ┌ 0 ┐ = ┌ -b ┐
               │ a  0 │   │-b │   │ 0  │
               └      ┘   └   ┘   └    ┘

  C = [B  AB] = ┌ 0  -b ┐
                │-b  0  │
                └       ┘

  det(C) = 0 × 0 - (-b)×(-b) = -b²

因为 b > 0, det(C) = -b² ≠ 0
→ 系统是可控的!

可控意味着: 存在一个控制律 u = -K×x 使得系统稳定。
这是我们明天学 PID 控制器的理论基础!
```

> **这意味着什么？** 数学告诉我们：只要参数合理（质量、长度不为零），倒立摆一定是可以被控制稳定的。这给了我们信心 -- 问题不在于"能不能平衡"，而在于"怎么找到合适的控制器参数"。

> **What does this mean?** The math tells us: as long as parameters are reasonable, the inverted pendulum CAN be stabilized. This gives us confidence -- the question isn't "can it balance" but "how to find the right controller parameters."

---

### 5. Python 仿真验证 | Python Simulation (2h)

**为什么用 Python 仿真？** 在实际机器人上调参数很危险（可能摔倒损坏）。先用电脑仿真验证理论，确认模型正确，然后再在真实硬件上实现。

**Why Python simulation?** Tuning parameters on a real robot is risky (it can fall and break). First verify theory in computer simulation, confirm the model, then implement on real hardware.

**安装 Python 环境 | Install Python Environment:**

```powershell
# 安装 Python (如果还没有)
# 从 https://www.python.org/downloads/ 下载安装

# 安装需要的库
pip install numpy matplotlib scipy
```

**仿真 1: 无控制的倒立摆 (自由倒下) | Simulation 1: Uncontrolled Pendulum (Free Fall)**

```python
"""
倒立摆仿真 - 无控制 (自由倒下)
Inverted Pendulum Simulation - No Control (Free Fall)

笨鸟先飞:
- 这个仿真展示: 不加控制时, 倒立摆会怎样?
- 答案: 倒下! 而且倒下的速度和方式完全由物理定律决定
- 仿真是用计算机"算出"物理过程, 像在电脑里放慢镜头

This simulation shows: what happens without control?
Answer: It falls! And the falling speed is determined by physics.
Simulation uses a computer to "calculate" the physical process.
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint

# ==========================================
# 机器人物理参数 (Robot Physical Parameters)
# ==========================================

M = 0.3     # 轮子等效质量 (kg) | Wheel equivalent mass
m = 1.5     # 车体质量 (kg) | Body mass
L = 0.08    # 质心到轮轴距离 (m) | Distance from pivot to CoM
g = 9.8     # 重力加速度 (m/s²) | Gravitational acceleration
R = 0.03    # 轮子半径 (m) | Wheel radius

# 系统参数
a = (M + m) * g / (M * L)
b = 1.0 / (M * L)

print(f"系统参数: a = {a:.2f}, b = {b:.2f}")
print(f"不稳定极点: λ = ±{np.sqrt(a):.2f}")
print(f"特征时间常数: τ = {1.0/np.sqrt(a):.3f} 秒")
print(f"(机器人倒下大约需要 {1.0/np.sqrt(a):.2f} 秒)")
print()

# ==========================================
# 状态方程 (State Equations)
# ==========================================

def pendulum_no_control(state, t):
    """
    无控制的倒立摆状态方程
    Uncontrolled inverted pendulum state equations

    state = [theta, theta_dot, x, x_dot]
    theta = 倾斜角 (rad)
    x = 轮子位置 (m)
    """
    theta, theta_dot, x, x_dot = state
    F = 0  # 无控制力 | No control force

    # 非线性方程 (完整版, 不做小角度近似)
    # Nonlinear equations (full version, no small angle approximation)
    denominator = M + m * np.sin(theta)**2

    # 轮子加速度
    x_ddot = (F + m * np.sin(theta) * (L * theta_dot**2 + g * np.cos(theta))) / denominator

    # 角加速度
    theta_ddot = (-F * np.cos(theta) - m * L * theta_dot**2 * np.cos(theta) * np.sin(theta)
                  - (M + m) * g * np.sin(theta)) / (L * denominator)

    return [theta_dot, theta_ddot, x_dot, x_ddot]

# ==========================================
# 仿真运行 (Run Simulation)
# ==========================================

# 初始条件: 轻微倾斜 5° (0.087 rad)
theta0 = 5 * np.pi / 180  # 5 度转换为弧度
state0 = [theta0, 0, 0, 0]  # [角度, 角速度, 位置, 速度]

# 仿真时间
t = np.linspace(0, 2, 1000)  # 2 秒, 1000 个时间点

# 解微分方程
solution = odeint(pendulum_no_control, state0, t)

theta = solution[:, 0]  # 角度
x_pos = solution[:, 2]  # 位置

# ==========================================
# 绘图 (Plotting)
# ==========================================

# 设置中文字体 (如果matplotlib支持)
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'Arial']
plt.rcParams['axes.unicode_minus'] = False

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 图1: 倾斜角随时间变化
axes[0, 0].plot(t, np.degrees(theta), 'r-', linewidth=2)
axes[0, 0].set_xlabel('Time (s) / 时间 (秒)')
axes[0, 0].set_ylabel('Tilt Angle (°) / 倾斜角 (°)')
axes[0, 0].set_title('Uncontrolled: Tilt Angle vs Time / 无控制: 倾斜角随时间变化')
axes[0, 0].grid(True)
axes[0, 0].axhline(y=0, color='k', linestyle='--', alpha=0.3)

# 图2: 轮子位置随时间变化
axes[0, 1].plot(t, x_pos, 'b-', linewidth=2)
axes[0, 1].set_xlabel('Time (s) / 时间 (秒)')
axes[0, 1].set_ylabel('Wheel Position (m) / 轮子位置 (m)')
axes[0, 1].set_title('Uncontrolled: Wheel Position / 无控制: 轮子位置')
axes[0, 1].grid(True)

# 图3: 动画帧 (机器人姿态在不同时间点)
ax3 = axes[1, 0]
ax3.set_xlim(-0.3, 0.3)
ax3.set_ylim(-0.05, 0.25)
ax3.set_aspect('equal')
ax3.set_title('Robot Posture at Different Times / 不同时刻的机器人姿态')
ax3.grid(True)

# 画几个关键时刻的姿态
for i, ti in enumerate([0, 0.1, 0.2, 0.3, 0.5]):
    idx = int(ti / 2 * 1000)
    if idx >= len(solution):
        continue
    th = solution[idx, 0]
    xp = solution[idx, 2]
    # 轮子 (圆)
    circle = plt.Circle((xp, R), R, fill=False, color='blue')
    ax3.add_patch(circle)
    # 车体 (线段)
    body_x = xp + L * np.sin(th)
    body_y = R + L * np.cos(th)
    ax3.plot([xp, body_x], [R, body_y], 'r-', linewidth=2)
    ax3.plot(body_x, body_y, 'ro', markersize=6)
    ax3.annotate(f't={ti}s', (body_x + 0.01, body_y + 0.01))

# 图4: 相平面 (角度 vs 角速度)
theta_dot = solution[:, 1]
axes[1, 1].plot(np.degrees(theta), np.degrees(theta_dot), 'g-', linewidth=2)
axes[1, 1].plot(np.degrees(theta[0]), np.degrees(theta_dot[0]), 'go', markersize=10, label='Start')
axes[1, 1].set_xlabel('Tilt Angle (°) / 倾斜角 (°)')
axes[1, 1].set_ylabel('Angular Velocity (°/s) / 角速度 (°/s)')
axes[1, 1].set_title('Phase Portrait / 相平面图')
axes[1, 1].legend()
axes[1, 1].grid(True)

plt.tight_layout()
plt.savefig('inverted_pendulum_no_control.png', dpi=150)
plt.show()

print("仿真完成! 图像已保存为 inverted_pendulum_no_control.png")
print("Simulation complete! Image saved as inverted_pendulum_no_control.png")
```

**仿真 2: 加入简单比例控制 (PD 控制) | Simulation 2: With Simple Proportional Control**

```python
"""
倒立摆仿真 - 加入 PD 控制器
Inverted Pendulum Simulation - With PD Controller

笨鸟先飞:
- PD 控制器 = "比例-微分" 控制器
- 比例项 (P): 角度越大, 纠正力越大 (像弹簧)
- 微分项 (D): 角速度越大, 阻尼越大 (像减震器)
- 明天我们会详细学习 PID 控制器, 今天先用起来

PD controller = Proportional-Derivative controller
- P term: larger angle → larger correction (like a spring)
- D term: larger angular velocity → more damping (like a shock absorber)
- We'll study PID in detail tomorrow, let's use it first today
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint

# 物理参数 (同上)
M = 0.3
m = 1.5
L = 0.08
g = 9.8
R = 0.03

# PD 控制器参数 (先手动选, 明天学习如何系统地调整)
# PD controller parameters (manually chosen for now)
Kp = 150.0   # 比例增益 | Proportional gain
Kd = 15.0    # 微分增益 | Derivative gain

def pendulum_with_pd_control(state, t):
    """
    有 PD 控制的倒立摆
    Inverted pendulum with PD control
    """
    theta, theta_dot, x, x_dot = state

    # ============================================
    # PD 控制律
    # PD control law
    # ============================================

    # 控制力 = -Kp × 倾斜角 - Kd × 角速度
    # Control force = -Kp × tilt angle - Kd × angular velocity
    #
    # 为什么是负号?
    # - θ > 0 (向右倒) → 需要向右加速轮子 → F > 0
    # - 但在倒立摆方程中, F 正方向也是向右
    # - 所以 F = Kp × θ + Kd × θ_dot (让轮子追着重心跑)

    F = Kp * theta + Kd * theta_dot

    # 限制最大力 (模拟电机能力限制)
    F = np.clip(F, -20, 20)  # 最大 20N

    # 非线性方程
    denominator = M + m * np.sin(theta)**2

    x_ddot = (F + m * np.sin(theta) * (L * theta_dot**2 + g * np.cos(theta))) / denominator

    theta_ddot = (-F * np.cos(theta) - m * L * theta_dot**2 * np.cos(theta) * np.sin(theta)
                  - (M + m) * g * np.sin(theta)) / (L * denominator)

    return [theta_dot, theta_ddot, x_dot, x_ddot]

# ==========================================
# 仿真: 初始倾斜 10°, 模拟 5 秒
# ==========================================

theta0 = 10 * np.pi / 180  # 10°
state0 = [theta0, 0, 0, 0]
t = np.linspace(0, 5, 2000)

solution = odeint(pendulum_with_pd_control, state0, t)

theta = solution[:, 0]
theta_dot = solution[:, 1]
x_pos = solution[:, 2]
x_vel = solution[:, 3]

# 计算控制力
F_control = Kp * theta + Kd * theta_dot
F_control = np.clip(F_control, -20, 20)

# ==========================================
# 绘图
# ==========================================

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'Arial']
plt.rcParams['axes.unicode_minus'] = False

# 图1: 倾斜角
axes[0, 0].plot(t, np.degrees(theta), 'r-', linewidth=2)
axes[0, 0].set_xlabel('Time (s)')
axes[0, 0].set_ylabel('Tilt Angle (°)')
axes[0, 0].set_title(f'PD Controlled: Tilt Angle (Kp={Kp}, Kd={Kd})')
axes[0, 0].grid(True)
axes[0, 0].axhline(y=0, color='k', linestyle='--', alpha=0.3)

# 图2: 轮子位置
axes[0, 1].plot(t, x_pos * 100, 'b-', linewidth=2)  # 转换为 cm
axes[0, 1].set_xlabel('Time (s)')
axes[0, 1].set_ylabel('Wheel Position (cm)')
axes[0, 1].set_title('PD Controlled: Wheel Position')
axes[0, 1].grid(True)

# 图3: 控制力
axes[1, 0].plot(t, F_control, 'g-', linewidth=2)
axes[1, 0].set_xlabel('Time (s)')
axes[1, 0].set_ylabel('Control Force (N)')
axes[1, 0].set_title('Control Force Over Time')
axes[1, 0].grid(True)

# 图4: 相平面
axes[1, 1].plot(np.degrees(theta), np.degrees(theta_dot), 'purple', linewidth=2)
axes[1, 1].plot(0, 0, 'r*', markersize=15, label='Equilibrium Point')
axes[1, 1].plot(np.degrees(theta[0]), np.degrees(theta_dot[0]), 'go', markersize=10, label='Start')
axes[1, 1].set_xlabel('Tilt Angle (°)')
axes[1, 1].set_ylabel('Angular Velocity (°/s)')
axes[1, 1].set_title('Phase Portrait (PD Controlled)')
axes[1, 1].legend()
axes[1, 1].grid(True)

plt.tight_layout()
plt.savefig('inverted_pendulum_pd_control.png', dpi=150)
plt.show()

# 计算性能指标
settling_time = None
for i in range(len(t)):
    if abs(np.degrees(theta[i])) < 1.0 and i > 100:
        settling_time = t[i]
        break

overshoot = max(np.degrees(np.abs(theta)))

print(f"\n仿真结果 (Simulation Results):")
print(f"  初始倾斜角: {np.degrees(theta0):.1f}°")
print(f"  最大超调: {overshoot:.2f}°")
print(f"  稳定时间 (<1°): {settling_time:.2f} 秒" if settling_time else "  未能稳定!")
print(f"  最大控制力: {max(np.abs(F_control)):.2f} N")
print(f"  最终轮子偏移: {x_pos[-1]*100:.2f} cm")
```

**仿真 3: 不同参数对比 | Simulation 3: Parameter Comparison**

```python
"""
不同控制器参数对比
Comparing different controller parameters

笨鸟先飞:
- 这个实验让你直观看到: 参数不同, 效果完全不同
- Kp 太小 → 机器人倒了 (纠正力不够)
- Kp 太大 → 机器人振荡 (纠正过猛)
- Kd 太小 → 振荡衰减慢
- Kd 适当 → 快速稳定

Different parameters → completely different results:
- Kp too small → robot falls (not enough correction)
- Kp too large → robot oscillates (over-correction)
- Kd too small → slow oscillation decay
- Kd appropriate → fast stabilization
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint

M, m, L, g, R = 0.3, 1.5, 0.08, 9.8, 0.03

def simulate_pendulum(Kp, Kd, theta0_deg=10, t_max=5):
    """用给定参数仿真倒立摆 | Simulate with given parameters"""
    theta0 = theta0_deg * np.pi / 180
    state0 = [theta0, 0, 0, 0]
    t = np.linspace(0, t_max, 2000)

    def dynamics(state, t):
        theta, theta_dot, x, x_dot = state
        F = np.clip(Kp * theta + Kd * theta_dot, -20, 20)
        denom = M + m * np.sin(theta)**2
        x_ddot = (F + m * np.sin(theta) * (L * theta_dot**2 + g * np.cos(theta))) / denom
        theta_ddot = (-F * np.cos(theta) - m * L * theta_dot**2 * np.cos(theta) * np.sin(theta)
                      - (M + m) * g * np.sin(theta)) / (L * denom)
        return [theta_dot, theta_ddot, x_dot, x_ddot]

    sol = odeint(dynamics, state0, t)
    return t, sol[:, 0]

# 不同参数组合
params = [
    (50,   5,    'Kp=50, Kd=5 (太弱/Too weak)'),
    (150,  5,    'Kp=150, Kd=5 (D不够/Low D)'),
    (150,  15,   'Kp=150, Kd=15 (较好/Good)'),
    (300,  30,   'Kp=300, Kd=30 (较强/Strong)'),
    (500,  5,    'Kp=500, Kd=5 (D太小振荡/Oscillating)'),
]

plt.figure(figsize=(14, 8))
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'Arial']
plt.rcParams['axes.unicode_minus'] = False

for Kp, Kd, label in params:
    t, theta = simulate_pendulum(Kp, Kd)
    plt.plot(t, np.degrees(theta), linewidth=2, label=label)

plt.xlabel('Time (s) / 时间 (秒)', fontsize=12)
plt.ylabel('Tilt Angle (°) / 倾斜角 (°)', fontsize=12)
plt.title('Effect of Controller Parameters / 控制器参数对比', fontsize=14)
plt.legend(fontsize=10)
plt.grid(True)
plt.axhline(y=0, color='k', linestyle='--', alpha=0.3)
plt.ylim(-20, 20)

plt.tight_layout()
plt.savefig('parameter_comparison.png', dpi=150)
plt.show()

print("参数对比图已保存! | Parameter comparison saved!")
print("\n观察结论:")
print("  - Kp 太小: 无法维持平衡 (红色线倒下)")
print("  - Kd 太小: 振荡衰减慢 (来回晃)")
print("  - Kp/Kd 合适: 快速稳定到 0° (最佳)")
print("  - Kp 太大: 高频振荡")
```

---

### 6. 理论联系实际 | Connecting Theory to Practice (1h)

**将仿真参数映射到真实机器人 | Mapping Simulation Parameters to Real Robot:**

```
仿真模型 → 真实机器人的对应关系:

仿真参数              真实机器人
──────────           ──────────
θ (倾斜角)          MPU6050 测量的 pitch 角
θ̇ (角速度)          MPU6050 陀螺仪测量的角速度
F (控制力)          电机驱动力 = 电机力矩 / 轮半径
ẍ (轮子加速度)      编码器测量的速度变化率

控制律在代码中的实现:

  // 读取传感器
  float theta = complementary_filter_output;  // 倾斜角 (rad)
  float theta_dot = gyro_rate;                 // 角速度 (rad/s)

  // PD 控制律
  float F = Kp * theta + Kd * theta_dot;

  // 转换为电机速度命令
  float motor_speed = F * some_conversion_factor;
  motor.setSpeed(motor_speed);
```

**真实世界与仿真的差异 | Differences Between Simulation and Reality:**

```
仿真假设的理想情况:          真实世界的挑战:
─────────────────          ────────────────
完美的角度测量               MPU6050 有噪声
无延时                       传感器读取+计算+电机响应有延迟
精确的力控制                 电机有死区、非线性
无摩擦                      齿轮和轴承有摩擦
参数精确已知                 质量和距离只能估算
地面平坦                     地面可能不平

→ 真实机器人需要的 Kp/Kd 可能与仿真不同
→ 仿真给我们"大致范围", 实际需要微调
→ 这就是为什么 Day 9 专门做参数调优!
```

**从力到电机命令的转换 | Converting Force to Motor Command:**

```
控制力 F 如何变成电机 PWM?

步骤:
1. PD 控制器输出力 F (N)
2. 力转换为力矩: τ = F × R (R = 轮半径)
3. 力矩转换为电流: I = τ / Kt (Kt = 电机力矩常数)
4. 电流转换为 PWM 占空比: PWM = I / Imax × 255

简化版 (直接用速度控制):
   目标速度 = F × 转换系数

StackForce 驱动板已经封装了这些转换,
我们只需要给驱动板一个"目标速度"值。
```

---

## 常见问题 | Common Issues

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| Python 没装 | 未安装 Python | 从 python.org 下载安装，勾选"Add to PATH" |
| pip install 报错 | 网络问题或权限问题 | 使用 `pip install --user` 或换镜像源 |
| 仿真角度爆炸 | ODE 数值不稳定 | 减小时间步长，或使用更稳定的积分器 |
| 机器人倒得太快 | 参数 L 估计不对 | 重新测量质心到轮轴的距离 |
| Kp 调不大就振荡 | 实际系统有延迟 | 减小 Kp，增大 Kd |
| 仿真稳定但实际不稳定 | 传感器噪声/延迟 | 仿真只是参考，需要实际调参 |

---

## 今日作业 | Today's Task

1. **必做 | Required:** 运行"无控制倒立摆"仿真，观察并截图倾斜角随时间的变化曲线
   Run the "uncontrolled pendulum" simulation, observe and screenshot the tilt angle curve.

2. **必做 | Required:** 运行"PD 控制倒立摆"仿真，找到一组能让系统稳定的 Kp/Kd 参数
   Run the "PD controlled pendulum" simulation, find a set of Kp/Kd that stabilizes the system.

3. **必做 | Required:** 运行"参数对比"仿真，记录不同参数组合的效果
   Run the "parameter comparison" simulation, record results of different parameter combinations.

4. **选做 | Optional:** 修改机器人物理参数 (M, m, L)，观察系统动态如何变化。例如: 把 L 增大一倍 (质心更高)，系统变容易还是变困难？
   Modify physical parameters (M, m, L), observe how dynamics change. E.g., double L (higher CoM) - easier or harder?

5. **思考 | Reflection:**
   - 为什么 Kd (微分项) 能减少振荡？提示: 想想减震器的工作原理。
   - 如果传感器有 10ms 的延迟，对控制效果有什么影响？
   - 为什么仿真稳定但实际可能不稳定？

   - Why does Kd (derivative term) reduce oscillation? Hint: think about shock absorbers.
   - If the sensor has 10ms delay, what's the impact on control?
   - Why might simulation be stable but reality unstable?

---

## 今日检查点 | Checkpoint

- [ ] 你能用直觉解释为什么倒立摆会倒下吗？
  Can you intuitively explain why an inverted pendulum falls?
- [ ] 你理解力矩 (torque) 的概念吗？能给出一个生活例子吗？
  Do you understand torque? Can you give a real-life example?
- [ ] 你能写出倒立摆的线性化方程吗？
  Can you write the linearized inverted pendulum equation?
- [ ] 无控制仿真运行成功，看到角度指数增长？
  Uncontrolled simulation runs, showing exponential angle growth?
- [ ] PD 控制仿真运行成功，系统被稳定住？
  PD controlled simulation runs, system stabilized?
- [ ] 你理解状态空间方程 x_dot = Ax + Bu 的含义吗？
  Do you understand the state-space equation x_dot = Ax + Bu?
- [ ] 你能解释为什么系统是"可控的"意味着什么吗？
  Can you explain what "controllable" means for the system?

---

## 参考资源 | References

- [倒立摆 - 维基百科](https://en.wikipedia.org/wiki/Inverted_pendulum)
- [控制系统基础 (B站)](https://search.bilibili.com/all?keyword=%E6%8E%A7%E5%88%B6%E7%B3%BB%E7%BB%9F%20%E5%80%92%E7%AB%8B%E6%91%86)
- [Python 科学计算 (NumPy)](https://numpy.org/doc/stable/user/quickstart.html)
- [Matplotlib 绘图教程](https://matplotlib.org/stable/tutorials/index.html)
- [Scipy ODE 求解器文档](https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.odeint.html)
- [Brian Douglas - 控制系统视频教程 (YouTube)](https://www.youtube.com/playlist?list=PLUMWjy5jgHK1NC52DXXmriCc06LgxPFD)
- [Self-Balancing Robot Theory](https://www.instructables.com/Arduino-Self-Balancing-Robot-1/)

---

*最后更新: 2026-05-27*
