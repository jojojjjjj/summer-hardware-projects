# Day 12: 项目展示与总结 | Final Presentation & Wrap-up

## 今日目标 | Today's Goals
- 完成项目演示视频和展示幻灯片的制作
- Complete the project demo video and presentation slides
- 搭建 GitHub Pages 项目展示网站
- Build a GitHub Pages project showcase website
- 进行项目展示、现场演示和同伴互评
- Conduct project presentations, live demos, and peer reviews
- 总结课程收获，展望未来学习方向
- Summarize course learnings and look ahead to future directions

---

## 上午 (3h) | Morning Session

### 1. 展示材料准备 (1.5h) | Presentation Material Preparation

#### 演示视频制作 | Demo Video Production

使用剪映 (CapCut) 或 DaVinci Resolve 编辑昨天拍摄的视频素材。

Use CapCut or DaVinci Resolve to edit the video footage shot yesterday.

```
视频编辑流程 | Video Editing Workflow:
═══════════════════════════════════════

推荐工具 | Recommended Tools:
  - 剪映 (免费，中文友好) | CapCut (free, Chinese-friendly)
  - DaVinci Resolve (免费版功能强大) | DaVinci Resolve (free, powerful)

视频结构模板 | Video Structure Template:
═══════════════════════════════════════

  [0:00-0:05] 片头 Intro
  ─────────────────────────────
  项目名称 + 团队成员
  Project name + Team members
  风格：简洁文字动画 | Style: Clean text animation

  [0:05-0:15] 项目简介 Overview
  ─────────────────────────────
  "我们做了一个轮足机器人，能..."
  "We built a bipedal wheeled robot that can..."
  配合静态全景镜头 | With static overview shot

  [0:15-0:30] 技术亮点 Technical Highlights
  ─────────────────────────────
  - 三种运动模式切换 | Three motion mode switching
  - IMU 姿态检测 | IMU attitude sensing
  - PID 平衡控制 | PID balance control
  - 3D 打印结构件 | 3D printed structure

  [0:30-1:00] 功能演示 Feature Demo
  ─────────────────────────────
  - 纯轮模式平衡（5s）| Wheel mode balance (5s)
  - 纯足模式步行（5s）| Leg mode walking (5s)
  - 混合模式（5s）| Hybrid mode (5s)
  - 遥控操作（5s）| Remote control (5s)
  - 障碍物跨越（5s）| Obstacle traversal (5s)

  [1:00-1:15] 技术细节 Technical Details
  ─────────────────────────────
  硬件清单、代码架构、3D 设计
  Hardware list, code architecture, 3D design
  用画面+文字叠加 | Overlay text on footage

  [1:15-1:30] 总结与展望 Summary & Future
  ─────────────────────────────
  学到了什么 + 可以改进的方向
  What we learned + improvement directions

总时长 Total: 1分30秒 (不超过2分钟 | Max 2 minutes)
```

#### 展示幻灯片制作 | Presentation Slides

```
幻灯片结构（10-12 页）| Slide Structure (10-12 slides):
═════════════════════════════════════════════════════════

Slide 1: 封面 | Cover
─────────────────────
  项目名称 | Project Title
  轮足机器人 - Bipedal Wheeled Robot
  团队成员 | Team Members: [姓名 Names]
  日期 | Date: 2025

Slide 2: 项目简介 | Introduction
─────────────────────
  一句话介绍 | One-line description
  "基于 ESP32 的轮足混合运动机器人"
  "ESP32-based hybrid wheeled-legged robot"
  灵感来源：StackForce 开源项目
  Inspiration: StackForce open-source project

Slide 3: 系统架构 | System Architecture
─────────────────────
  硬件框图 | Hardware block diagram
  ┌──────┐   ┌──────┐   ┌──────┐
  │ ESP32│──►│ 电机  │──►│ 轮子  │
  │      │──►│ 舵机  │──►│ 腿部  │
  │      │◄──│ IMU   │   │      │
  │      │◄──│ 蓝牙  │   │      │
  └──────┘   └──────┘   └──────┘

Slide 4: 硬件清单 | Hardware List
─────────────────────
  ┌────────────────────┬──────────┬────────┐
  │ 组件 Component     │ 型号 Model│ 数量 Qty│
  ├────────────────────┼──────────┼────────┤
  │ 主控 MCU           │ ESP32    │ 1      │
  │ 惯性测量 IMU       │ MPU6050  │ 1      │
  │ 无刷电机 BLDC      │ ___      │ 2      │
  │ 舵机 Servo         │ SG90/MG  │ 4      │
  │ 电池 Battery       │ 2S LiPo  │ 1      │
  │ 降压模块 BEC       │ 5V 3A    │ 1      │
  │ 电机驱动 Motor drv │ ___      │ 1      │
  │ 3D 打印件 Printed  │ PLA      │ ~12    │
  └────────────────────┴──────────┴────────┘

Slide 5: 三种运动模式 | Three Motion Modes
─────────────────────
  纯轮模式（平衡车）| Wheel Mode (Segway)
  纯足模式（步行）  | Leg Mode (Walking)
  混合模式（轮+足） | Hybrid Mode (Wheel+Leg)

Slide 6: PID 控制原理 | PID Control Principle
─────────────────────
  简单解释 PID 三个参数的作用
  Simple explanation of PID parameters
  我们的最终参数 | Our final parameters:
  Kp=___, Ki=___, Kd=___

Slide 7: 3D 建模与打印 | 3D Modeling & Printing
─────────────────────
  展示 Fusion 360 截图 | Show Fusion 360 screenshots
  打印参数设置 | Print settings
  设计改进点 | Design improvements

Slide 8: 遇到的挑战 | Challenges Faced
─────────────────────
  3个主要挑战和解决方案
  3 main challenges and solutions:
  1. 挑战 → 解决方案
  2. 挑战 → 解决方案
  3. 挑战 → 解决方案

Slide 9: 测试结果 | Test Results
─────────────────────
  多表面测试数据表 | Multi-surface test data
  最佳性能指标 | Best performance metrics

Slide 10: 未来改进 | Future Improvements
─────────────────────
  - 加入视觉传感器（摄像头）| Add vision sensor (camera)
  - 机器学习自适应步态 | ML adaptive gait
  - 更强劲的电机 | More powerful motors
  - ROS 机器人操作系统 | ROS Robot Operating System

Slide 11: 心得体会 | Learnings & Reflections
─────────────────────
  每位成员说一句 | Each member says one thing:
  "我学到了..." "I learned..."

Slide 12: 致谢 | Thank You
─────────────────────
  感谢老师和助教 | Thanks to teachers and TAs
  GitHub 仓库链接 | GitHub repo link
  Q&A
```

---

### 2. GitHub Pages 展示网站 (1.5h) | GitHub Pages Showcase Website

#### 创建项目仓库 | Creating Project Repository

```bash
# 在 GitHub 上创建项目仓库 | Create project repo on GitHub
# 仓库名建议 | Suggested repo name:
# bipedal-wheeled-robot-2025

# 克隆到本地 | Clone locally
git clone https://github.com/YOUR_USERNAME/bipedal-wheeled-robot-2025.git
cd bipedal-wheeled-robot-2025

# 创建项目结构 | Create project structure
mkdir -p docs/images docs/code docs/models
```

#### GitHub Pages 网页模板 | GitHub Pages Website Template

Create the file `docs/index.html`:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>轮足机器人 | Bipedal Wheeled Robot</title>
    <style>
        :root {
            --primary: #2563eb;
            --dark: #1e293b;
            --light: #f8fafc;
            --accent: #06b6d4;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: var(--dark);
            line-height: 1.6;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            text-align: center;
            padding: 80px 20px;
        }

        .hero h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .hero .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
        }

        /* Container */
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        /* Section */
        .section {
            margin-bottom: 60px;
        }

        .section h2 {
            color: var(--primary);
            font-size: 1.8em;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid var(--accent);
        }

        /* Card Grid */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .card {
            background: var(--light);
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.2s;
        }

        .card:hover {
            transform: translateY(-4px);
        }

        .card h3 {
            color: var(--primary);
            margin-bottom: 8px;
        }

        /* Feature List */
        .feature-list {
            list-style: none;
            padding: 0;
        }

        .feature-list li {
            padding: 8px 0;
            padding-left: 24px;
            position: relative;
        }

        .feature-list li::before {
            content: "▶";
            color: var(--accent);
            position: absolute;
            left: 0;
        }

        /* Code Block */
        pre {
            background: #1e293b;
            color: #e2e8f0;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 16px 0;
        }

        code {
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 0.9em;
        }

        /* Table */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
        }

        th, td {
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }

        th {
            background: var(--primary);
            color: white;
        }

        tr:nth-child(even) {
            background: var(--light);
        }

        /* Video */
        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            border-radius: 12px;
            margin: 20px 0;
        }

        .video-container video,
        .video-container iframe {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
        }

        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            text-align: center;
            padding: 30px 20px;
        }

        footer a {
            color: var(--accent);
        }

        /* Image */
        .project-image {
            width: 100%;
            border-radius: 12px;
            margin: 16px 0;
        }

        /* Team */
        .team-member {
            display: inline-block;
            text-align: center;
            margin: 10px 20px;
        }

        .team-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2em;
            margin: 0 auto 8px;
        }
    </style>
</head>
<body>

    <!-- Hero -->
    <div class="hero">
        <h1>轮足机器人</h1>
        <p class="subtitle">Bipedal Wheeled Robot | ESP32 + MPU6050 + PID + 3D Print</p>
        <p class="subtitle" style="margin-top: 10px; opacity: 0.8;">
            Team: [成员姓名 Members] | Summer 2025
        </p>
    </div>

    <div class="container">

        <!-- Overview -->
        <div class="section">
            <h2>项目简介 | Overview</h2>
            <p>
                本项目基于 ESP32 微控制器，结合 MPU6050 惯性测量单元、
                BLDC 无刷电机和舵机，实现了一个具有三种运动模式的轮足机器人。
                纯轮模式下像平衡车一样行驶，纯足模式下可以行走，
                混合模式结合两者优点。结构件采用 3D 打印制造。
            </p>
            <p style="margin-top: 10px;">
                This project uses an ESP32 MCU with MPU6050 IMU, BLDC motors,
                and servos to build a bipedal wheeled robot with three motion modes:
                pure wheel (Segway), pure leg (walking), and hybrid.
                The structure is 3D printed.
            </p>
        </div>

        <!-- Features -->
        <div class="section">
            <h2>核心功能 | Key Features</h2>
            <div class="card-grid">
                <div class="card">
                    <h3>纯轮模式 Wheel Mode</h3>
                    <p>两轮自平衡行驶，PID 控制保持直立。
                    Two-wheel self-balancing with PID control.</p>
                </div>
                <div class="card">
                    <h3>纯足模式 Leg Mode</h3>
                    <p>四舵机驱动双腿步行，预设步态序列。
                    Four-servo driven bipedal walking with preset gait.</p>
                </div>
                <div class="card">
                    <h3>混合模式 Hybrid Mode</h3>
                    <p>轮子快速移动 + 腿部辅助跨越障碍。
                    Fast wheels + leg-assisted obstacle traversal.</p>
                </div>
                <div class="card">
                    <h3>蓝牙遥控 Bluetooth</h3>
                    <p>手机蓝牙串口远程控制模式和运动。
                    Phone Bluetooth serial remote control.</p>
                </div>
            </div>
        </div>

        <!-- Hardware -->
        <div class="section">
            <h2>硬件清单 | Hardware</h2>
            <table>
                <thead>
                    <tr>
                        <th>组件 Component</th>
                        <th>型号 Model</th>
                        <th>数量 Qty</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>主控 MCU</td><td>ESP32 DevKit</td><td>1</td></tr>
                    <tr><td>IMU 传感器 IMU Sensor</td><td>MPU6050</td><td>1</td></tr>
                    <tr><td>无刷电机 BLDC Motor</td><td>___</td><td>2</td></tr>
                    <tr><td>舵机 Servo</td><td>SG90 / MG996R</td><td>4</td></tr>
                    <tr><td>电机驱动 Motor Driver</td><td>___</td><td>1</td></tr>
                    <tr><td>降压模块 BEC</td><td>5V 3A UBEC</td><td>1</td></tr>
                    <tr><td>电池 Battery</td><td>2S 7.4V LiPo</td><td>1</td></tr>
                    <tr><td>3D 打印结构件 3D Parts</td><td>PLA</td><td>~12</td></tr>
                </tbody>
            </table>
        </div>

        <!-- Demo Video -->
        <div class="section">
            <h2>演示视频 | Demo Video</h2>
            <div class="video-container">
                <!-- 替换为你的视频 | Replace with your video -->
                <video controls>
                    <source src="demo-video.mp4" type="video/mp4">
                    您的浏览器不支持视频标签 | Browser doesn't support video tag
                </video>
            </div>
        </div>

        <!-- Code Architecture -->
        <div class="section">
            <h2>代码架构 | Code Architecture</h2>
            <pre><code>project/
├── src/
│   ├── main.cpp          # 主程序入口 | Main entry
│   ├── balance.cpp/h     # PID 平衡控制 | PID balance
│   ├── imu.cpp/h         # MPU6050 读取 | IMU reading
│   ├── motors.cpp/h      # 电机驱动     | Motor drive
│   ├── servos.cpp/h      # 舵机控制     | Servo control
│   ├── gait.cpp/h        # 步态序列     | Gait sequence
│   ├── bluetooth.cpp/h   # 蓝牙遥控     | BT remote
│   └── modes.cpp/h       # 模式切换     | Mode switching
├── models/               # 3D 打印 STL 文件
└── docs/                 # 文档和图片</code></pre>
        </div>

        <!-- Results -->
        <div class="section">
            <h2>测试结果 | Test Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>指标 Metric</th>
                        <th>结果 Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>最大平衡时间 Max balance</td><td>___s</td></tr>
                    <tr><td>最大步行距离 Max walk</td><td>___m</td></tr>
                    <tr><td>模式切换成功率 Switch rate</td><td>___%</td></tr>
                    <tr><td>障碍物高度 Obstacle height</td><td>___mm</td></tr>
                    <tr><td>续航时间 Endurance</td><td>___min</td></tr>
                </tbody>
            </table>
        </div>

        <!-- Team -->
        <div class="section">
            <h2>团队 | Team</h2>
            <div style="text-align: center;">
                <div class="team-member">
                    <div class="team-avatar">A</div>
                    <p>[姓名 Name]</p>
                    <small>[角色 Role]</small>
                </div>
                <div class="team-member">
                    <div class="team-avatar">B</div>
                    <p>[姓名 Name]</p>
                    <small>[角色 Role]</small>
                </div>
                <!-- 添加更多成员 | Add more members -->
            </div>
        </div>

        <!-- Links -->
        <div class="section">
            <h2>链接 | Links</h2>
            <ul class="feature-list">
                <li><a href="https://github.com/YOUR_USERNAME/bipedal-wheeled-robot-2025">GitHub 代码仓库 | Code Repository</a></li>
                <li><a href="https://gitee.com/StackForce/bipedal_wheeled_robot">StackForce 开源参考 | StackForce Reference</a></li>
                <li><a href="#">演示视频 | Demo Video</a></li>
            </ul>
        </div>

    </div>

    <footer>
        <p>轮足机器人 | Bipedal Wheeled Robot - Summer Hardware Project 2025</p>
        <p>Based on <a href="https://gitee.com/StackForce/bipedal_wheeled_robot">StackForce</a> | Built with ESP32 + Love</p>
    </footer>

</body>
</html>
```

#### 启用 GitHub Pages | Enabling GitHub Pages

```
GitHub Pages 启用步骤 | GitHub Pages Setup Steps:
═══════════════════════════════════════

1. 推送代码到 GitHub | Push code to GitHub:
   git add .
   git commit -m "Add project website | 添加项目网站"
   git push origin main

2. 在 GitHub 仓库设置中启用 Pages:
   Enable Pages in GitHub repo settings:
   Settings → Pages → Source: Deploy from branch
   Branch: main → /docs → Save

3. 等待 1-2 分钟，访问你的网站:
   Wait 1-2 minutes, visit your site:
   https://YOUR_USERNAME.github.io/bipedal-wheeled-robot-2025/

4. 在仓库 README.md 中添加网站链接
   Add website link to repo README.md
```

---

## 下午 (4h) | Afternoon Session

### 2. 项目展示与评审 (2.5h) | Project Presentations & Review

#### 展示流程 | Presentation Flow

```
展示时间安排 | Presentation Schedule:
═══════════════════════════════════════════════════

每个团队 15 分钟 | Each team: 15 minutes:
  ├── 演示视频播放 Video:        2 分钟 min
  ├── 幻灯片讲解 Slides:         8 分钟 min
  ├── 现场演示 Live Demo:         3 分钟 min
  └── Q&A 提问回答 Q&A:          2 分钟 min

评审维度 | Evaluation Dimensions:
═══════════════════════════════════════
  ┌─────────────────────┬──────┬────────────────────────────┐
  │ 维度 Dimension       │ 分值 │ 说明 Description            │
  ├─────────────────────┼──────┼────────────────────────────┤
  │ 功能完成度           │ 25分 │ 三种模式是否都能工作         │
  │ Functionality       │  25  │ Do all three modes work     │
  ├─────────────────────┼──────┼────────────────────────────┤
  │ 代码质量             │ 20分 │ 结构清晰、有注释、模块化     │
  │ Code Quality        │  20  │ Clean, commented, modular   │
  ├─────────────────────┼──────┼────────────────────────────┤
  │ 机械设计             │ 20分 │ 3D 打印质量、装配工艺       │
  │ Mechanical Design   │  20  │ Print quality, assembly     │
  ├─────────────────────┼──────┼────────────────────────────┤
  │ 展示表达             │ 15分 │ 视频质量、讲解清晰度       │
  │ Presentation        │  15  │ Video quality, clarity      │
  ├─────────────────────┼──────┼────────────────────────────┤
  │ 创新与挑战           │ 10分 │ 有没有独特的改进或解决方案  │
  │ Innovation          │  10  │ Unique improvements or fixes│
  ├─────────────────────┼──────┼────────────────────────────┤
  │ 文档完整性           │ 10分 │ GitHub/网站文档是否完善     │
  │ Documentation       │  10  │ GitHub/website completeness │
  ├─────────────────────┼──────┼────────────────────────────┤
  │ 合计 Total          │ 100  │                            │
  └─────────────────────┴──────┴────────────────────────────┘
```

#### 同伴互评表 | Peer Review Form

```
同伴互评表 | Peer Review Form
═══════════════════════════════════════

评审团队 Reviewing Team: ______________
被评团队 Reviewed Team: _______________

1. 最令人印象深刻的方面 | Most Impressive Aspect:
   _________________________________________

2. 值得学习的技术亮点 | Technical Highlight Worth Learning:
   _________________________________________

3. 可以改进的建议 | Suggestions for Improvement:
   _________________________________________

4. 评分 | Scores:
   功能完成度 Functionality:     ___/25
   代码质量 Code Quality:        ___/20
   机械设计 Mechanical:          ___/20
   展示表达 Presentation:        ___/15
   创新挑战 Innovation:          ___/10
   文档完整 Documentation:       ___/10
   ─────────────────────────────────
   总分 Total:                   ___/100

5. 一句话评价 | One-line Comment:
   _________________________________________
```

#### 现场演示注意事项 | Live Demo Tips

```
现场演示要点 | Live Demo Key Points:

演示前准备 | Pre-Demo Prep:
  □ 电池充满电 | Fully charge battery
  □ 备用电池准备 | Backup battery ready
  □ 代码烧录最新版本 | Flash latest code version
  □ 蓝牙已配对测试 | Bluetooth paired and tested
  □ 准备 Plan B（如果硬件失败，播放视频）
  □ Prepare Plan B (play video if hardware fails)

演示顺序建议 | Demo Sequence Suggestion:
  1. 开机，展示 LED 状态灯 | Power on, show LED status
  2. 纯轮模式平衡 | Wheel mode balance
  3. 蓝牙遥控前进后退转弯 | BT remote forward/back/turn
  4. 切换到纯足模式 | Switch to leg mode
  5. 执行步行 | Execute walking
  6. 切换到混合模式 | Switch to hybrid mode
  7. 跨越小障碍物 | Traversal small obstacle

应急预案 | Contingency Plan:
  - 机器人倒地 → 重新启动平衡 → 继续演示
    Robot falls → restart balance → continue demo
  - 蓝牙断连 → 改用串口控制 或 播放预录视频
    BT disconnects → serial control or play pre-recorded video
  - 电池没电 → 换备用电池（1分钟内）
    Battery dies → swap backup (under 1 minute)
  - 完全无法工作 → 播放演示视频 + 详细讲解代码
    Total failure → play demo video + detailed code walkthrough
```

---

### 3. 课程总结与展望 (1.5h) | Course Summary & Future Directions

#### 课程知识回顾 | Course Knowledge Review

```
12 天课程知识图谱 | 12-Day Course Knowledge Map:
═════════════════════════════════════════════════════════

Day 01-02: 基础入门 | Fundamentals
  ├── ESP32 开发环境搭建 | ESP32 dev environment setup
  ├── Arduino IDE / PlatformIO 使用 | IDE usage
  ├── GPIO 数字输入输出 | Digital I/O
  └── 串口调试 | Serial debugging

Day 03-04: 传感器与电机 | Sensors & Motors
  ├── MPU6050 IMU 数据读取 | IMU data reading
  ├── 姿态解算（互补滤波）| Attitude estimation (complementary filter)
  ├── BLDC 电机控制 | BLDC motor control
  └── 编码器读取 | Encoder reading

Day 05-06: 控制理论 | Control Theory
  ├── PID 控制原理 | PID control principles
  ├── PID 参数调优 | PID parameter tuning
  ├── 自平衡实现 | Self-balance implementation
  └── 蓝牙遥控 | Bluetooth remote control

Day 07-08: 电机与机械 | Motors & Mechanics
  ├── 电机驱动电路 | Motor driver circuits
  ├── 电源管理 | Power management
  ├── 机械传动基础 | Mechanical transmission basics
  └── 底盘组装 | Chassis assembly

Day 09-10: 运动模式与建模 | Motion Modes & Modeling
  ├── 轮足混合运动模式 | Wheeled-legged hybrid modes
  ├── 舵机控制 | Servo control
  ├── 3D 建模基础 | 3D modeling basics
  └── 3D 打印技术 | 3D printing technology

Day 11-12: 集成与展示 | Integration & Presentation
  ├── 系统集成 | System integration
  ├── 参数调优 | Parameter tuning
  ├── 文档与展示 | Documentation & presentation
  └── 项目管理 | Project management
```

#### 技能掌握自评 | Skills Self-Assessment

```
技能掌握自评表 | Skills Self-Assessment:
═════════════════════════════════════════════════════════

请为每项技能打分 (1-5) | Rate each skill (1-5):
  5 = 熟练掌握 Can teach others
  4 = 能独立完成 Can do independently
  3 = 需要参考才能完成 Need references
  2 = 有基本了解 Basic understanding
  1 = 需要更多练习 Need more practice

硬件技能 | Hardware Skills:
  □ 电路接线与焊接 | Circuit wiring & soldering      ___/5
  □ 电源管理与测量 | Power management & measurement   ___/5
  □ 传感器使用      | Sensor usage                     ___/5
  □ 电机控制        | Motor control                    ___/5
  □ 3D 建模与打印   | 3D modeling & printing           ___/5

软件技能 | Software Skills:
  □ C/C++ 编程      | C/C++ programming               ___/5
  □ ESP32 开发      | ESP32 development                ___/5
  □ PID 控制算法    | PID control algorithm            ___/5
  □ 调试与排错      | Debugging & troubleshooting      ___/5
  □ Git 版本控制    | Git version control              ___/5

软技能 | Soft Skills:
  □ 团队协作        | Teamwork                         ___/5
  □ 项目管理        | Project management               ___/5
  □ 技术文档写作    | Technical writing                 ___/5
  □ 演讲与展示      | Presentation skills               ___/5
  □ 问题解决        | Problem solving                   ___/5
```

#### 未来学习方向 | Future Learning Directions

```
进阶方向推荐 | Advanced Direction Recommendations:
═════════════════════════════════════════════════════════

方向1: 机器人操作系统 (ROS) | ROS (Robot Operating System)
──────────────────────────────────────────────────────
  - 学习 ROS2 基础 | Learn ROS2 basics
  - 使用 SLAM 建图导航 | Use SLAM for mapping & navigation
  - 推荐资源：ROS2 官方教程 | Resource: ROS2 official tutorials

方向2: 计算机视觉 | Computer Vision
──────────────────────────────────────────────────────
  - ESP32-CAM 摄像头模块 | ESP32-CAM camera module
  - OpenCV 图像处理 | OpenCV image processing
  - 目标检测与跟踪 | Object detection & tracking

方向3: 机器学习 | Machine Learning
──────────────────────────────────────────────────────
  - TinyML 嵌入式机器学习 | TinyML embedded ML
  - 强化学习训练步态 | Reinforcement learning for gait
  - TensorFlow Lite for Microcontrollers

方向4: 高级控制理论 | Advanced Control Theory
──────────────────────────────────────────────────────
  - LQR 线性二次调节器 | LQR Linear Quadratic Regulator
  - 模型预测控制 MPC | Model Predictive Control
  - 自适应控制 Adaptive Control

方向5: 机械设计进阶 | Advanced Mechanical Design
──────────────────────────────────────────────────────
  - 更复杂的腿部机构（五连杆、弹簧腿）
  - More complex leg mechanisms (five-bar, spring legs)
  - 碳纤维 / 铝合金结构件 | Carbon fiber / aluminum structures
  - FE 有限元分析 | Finite Element Analysis

推荐学习资源 | Recommended Resources:
  ──────────────────────────────────
  书籍 Books:
    - 《机器人学导论》Introduction to Robotics - John Craig
    - 《现代控制工程》Modern Control Engineering - Ogata

  在线课程 Online:
    - Coursera: Control of Mobile Robots (Georgia Tech)
    - YouTube: James Bruton (机器人项目 OpenDog)

  开源项目 Open Source:
    - StackForce: https://gitee.com/StackForce/bipedal_wheeled_robot
    - Boston Dynamics Open Source (if available)
    - ROS2 官方示例: https://ros.org
```

#### 课程反馈 | Course Feedback

```
课程反馈问卷 | Course Feedback Form:
═══════════════════════════════════════

1. 课程难度是否合适？| Was the difficulty appropriate?
   □ 太简单 Too easy  □ 适中 Just right  □ 太难 Too hard

2. 最喜欢的部分 | Favorite part:
   _________________________________________

3. 最有挑战的部分 | Most challenging part:
   _________________________________________

4. 最想增加的内容 | Content you wish was added:
   _________________________________________

5. 给未来学员的建议 | Advice for future students:
   _________________________________________

6. 其他反馈 | Other feedback:
   _________________________________________
```

---

## 今日作业 | Today's Task

1. **完成展示材料 | Complete Presentation Materials**
   - 演示视频最终版导出（MP4 格式）
   - Export final demo video (MP4 format)
   - 幻灯片最终版保存为 PDF
   - Save final slides as PDF

2. **完成 GitHub Pages 网站 | Complete GitHub Pages Website**
   - 修改 HTML 模板，填入你的实际数据
   - Modify HTML template with your actual data
   - 添加项目照片和视频 | Add project photos and video
   - 确保网站可以正常访问 | Ensure website is accessible

3. **代码仓库整理 | Code Repository Cleanup**
   - 添加 README.md（包含项目说明、接线图、参数）
   - Add README.md (with project description, wiring diagram, parameters)
   - 代码添加充分注释 | Add thorough comments to code
   - 确保代码可以编译运行 | Ensure code compiles and runs

4. **个人学习总结 | Personal Learning Summary**
   - 填写技能自评表 | Complete skills self-assessment
   - 写一段 200 字以内的项目心得 | Write a 200-word project reflection
   - 列出 3 个你想深入学习的方向 | List 3 directions you want to explore

---

## 今日检查点 | Checkpoint

- [ ] 演示视频已完成并导出 | Demo video completed and exported
- [ ] 展示幻灯片已完成 | Presentation slides completed
- [ ] GitHub Pages 网站已上线 | GitHub Pages website is live
- [ ] 代码仓库 README.md 已完善 | Code repo README.md is complete
- [ ] 完成项目展示（讲解 + 演示）| Completed project presentation (talk + demo)
- [ ] 完成同伴互评 | Completed peer reviews
- [ ] 技能自评表已填写 | Skills self-assessment completed
- [ ] 课程反馈已提交 | Course feedback submitted

---

### 恭喜完成课程！| Congratulations on Completing the Course!

```
结课证书模板 | Certificate Template
═════════════════════════════════════════════════

  ┌──────────────────────────────────────────┐
  │                                          │
  │        结业证书 CERTIFICATE              │
  │                                          │
  │  兹证明 This certifies that              │
  │                                          │
  │          [姓名 Name]                     │
  │                                          │
  │  已成功完成 Has successfully completed    │
  │                                          │
  │   轮足机器人 - 硬件创客暑期课程           │
  │   Bipedal Wheeled Robot                  │
  │   Hardware Maker Summer Course           │
  │                                          │
  │  掌握技能：Skills Acquired:              │
  │  - ESP32 嵌入式开发 Embedded Dev         │
  │  - 传感器与电机控制 Sensor & Motor       │
  │  - PID 控制算法 PID Control              │
  │  - 3D 建模与打印 3D Modeling & Print     │
  │  - 团队协作 Teamwork                     │
  │                                          │
  │  日期 Date: ___________                  │
  │  讲师 Instructor: ___________            │
  │                                          │
  └──────────────────────────────────────────┘

  继续探索，持续创造！
  Keep exploring, keep creating!
```
