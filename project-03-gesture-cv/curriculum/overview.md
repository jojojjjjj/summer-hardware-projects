# 课程总览 | Curriculum Overview

> **手势互动装置"魔法手势"** - 15天完整课程大纲
>
> **Gesture Interactive Installation "Magic Gesture"** - 15-Day Complete Curriculum

---

## 课程设计理念 | Design Philosophy

本项目遵循**"笨鸟先飞"原则**——为技术背景薄弱的高中生提供：
- 比大学课程更细粒度的分步指导
- 每个概念的"为什么"解释（不只是"怎么做"）
- 真实世界的应用场景连接
- 常见错误的预防与调试指南

> This project follows the **"Fine-grained Scaffolding"** principle—providing high school students with limited technical background:
> - More granular step-by-step guidance than typical college courses
> - "Why" explanations for every concept (not just "how")
> - Connections to real-world applications
> - Prevention and debugging guides for common errors

---

## 三阶段课程结构 | Three-Phase Structure

| 阶段 | 天数 | 主题 | 技能目标 |
|------|------|------|----------|
| **Phase 1** | Day 1-5 | 计算机视觉基础 | OpenCV操作、图像处理、特征提取 |
| **Phase 2** | Day 6-11 | 手势识别与交互 | MediaPipe手部追踪、手势算法、实时控制 |
| **Phase 3** | Day 12-15 | 项目完善与展示 | 创意扩展、性能优化、成果展示 |

---

## 每日课程安排 | Daily Schedule (15 Days)

### Phase 1: 计算机视觉基础 | Computer Vision Basics

#### Day 1: 项目启动 + 环境搭建
**Project Kickoff + Environment Setup**

| 内容 | 说明 |
|------|------|
| 学习目标 | 了解项目全貌、搭建Python开发环境、安装OpenCV |
| 核心任务 | 安装Anaconda/Python、配置虚拟环境、测试摄像头 |
| 为什么学 | 环境搭建是所有编程项目的第一步，OpenCV是CV领域的瑞士军刀 |
| 预期成果 | 成功运行第一个摄像头捕捉程序 |

#### Day 2: 图像基础 | Image Fundamentals
**Understanding Digital Images**

| 内容 | 说明 |
|------|------|
| 学习目标 | 理解数字图像的像素表示、颜色空间（RGB/灰度） |
| 核心任务 | 读取/显示/保存图像、访问和修改像素值 |
| 为什么学 | 像素是图像的基本单位，RGB是所有显示设备的基础 |
| 真实应用 | Instagram滤镜、医疗影像分析、卫星图像处理 |

#### Day 3: 摄像头实时采集 | Real-time Camera Capture
**Working with Video Streams**

| 内容 | 说明 |
|------|------|
| 学习目标 | 从摄像头获取实时视频流、理解帧率概念 |
| 核心任务 | 打开摄像头、逐帧处理、释放资源 |
| 为什么学 | 实时视频是交互系统的基础，帧率影响用户体验 |
| 真实应用 | 视频会议、监控系统、自动驾驶感知 |

#### Day 4: 基础图像处理 | Basic Image Processing
**Image Processing Techniques**

| 内容 | 说明 |
|------|------|
| 学习目标 | 图像滤波、边缘检测、形态学操作 |
| 核心任务 | 高斯模糊、Canny边缘检测、阈值分割 |
| 为什么学 | 滤波去噪是预处理关键，边缘检测是特征提取基础 |
| 真实应用 | 手机美颜、人脸检测预处理、工业质检 |

#### Day 5: 颜色空间与对象追踪 | Color Spaces + Object Tracking
**HSV Color Space & Color Tracking**

| 内容 | 说明 |
|------|------|
| 学习目标 | 理解HSV颜色空间、实现颜色对象追踪 |
| 核心任务 | RGB→HSV转换、颜色范围定义、轮廓追踪 |
| 为什么学 | HSV比RGB更适合颜色识别，是第一代CV交互的基础 |
| 真实应用 | 机器人分拣、农业自动采摘、体育赛事追踪 |

---

### Phase 2: 手势识别与交互 | Gesture Recognition & Interaction

#### Day 6: MediaPipe 入门 | Introduction to MediaPipe
**Google's Hand Tracking Solution**

| 内容 | 说明 |
|------|------|
| 学习目标 | 安装MediaPipe、运行手部检测演示 |
| 核心任务 | 配置MediaPipe Hands、获取21个手部关键点 |
| 为什么学 | MediaPipe是轻量级、实时、跨平台的ML解决方案 |
| 真实应用 | TikTok手势特效、VR手部交互、手语识别 |

#### Day 7: 手部关键点分析 | Hand Landmark Analysis
**Understanding 21 Hand Landmarks**

| 内容 | 说明 |
|------|------|
| 学习目标 | 理解21个手部关键点的含义和坐标系统 |
| 核心任务 | 可视化关键点、计算手指之间的距离 |
| 为什么学 | 关键点是手势识别的"原材料"，坐标变换是算法核心 |
| 真实应用 | 触摸屏手势识别、书法教学、运动康复评估 |

#### Day 8: 手势识别算法 | Gesture Recognition Algorithms
**Designing Gesture Logic**

| 内容 | 说明 |
|------|------|
| 学习目标 | 基于几何特征识别基础手势（握拳、张开、比V） |
| 核心任务 | 实现状态机手势识别、编写手势判断函数 |
| 为什么学 | 算法设计能力比调用API更重要，理解特征工程 |
| 真实应用 | 非接触式控制、游戏体感操作、智能白板 |

#### Day 9: 手势控制——音量调节器 | Volume Control Demo
**Gesture → System Control**

| 内容 | 说明 |
|------|------|
| 学习目标 | 将手势映射到系统操作（音量控制） |
| 核心任务 | 实现手势→音量映射、平滑过渡处理 |
| 为什么学 | 学习人机交互设计、理解系统API调用 |
| 真实应用 | 智能家居控制、车载手势操作、无障碍接口 |

#### Day 10: 手势控制——虚拟画板 | Virtual Canvas Demo
**Air Drawing Application**

| 内容 | 说明 |
|------|------|
| 学习目标 | 实现手指追踪、空中绘画功能 |
| 核心任务 | 坐标映射、画布状态管理、多手势组合 |
| 为什么学 | 学习交互状态设计、体验创意编程的乐趣 |
| 真实应用 | 数字艺术创作、白板远程协作、AR涂鸦 |

#### Day 11: 姿态检测与扩展 | Pose Detection & Extensions
**Full Body Interaction (Optional)**

| 内容 | 说明 |
|------|------|
| 学习目标 | 了解MediaPipe Pose、探索全身姿态交互 |
| 核心任务 | 检测身体关键点、实现简单姿态识别 |
| 为什么学 | 拓展视野、理解从手部到全身的技术演进 |
| 真实应用 | 健身APP动作纠正、体感游戏、舞蹈教学 |

---

### Phase 3: 项目完善与展示 | Project Polish & Presentation

#### Day 12: 创意项目深化 | Creative Deep Dive
**Student-Driven Feature Development**

| 内容 | 说明 |
|------|------|
| 学习目标 | 选择一个方向深入开发（自定义手势/硬件集成） |
| 核心任务 | 设计新功能、编写代码、测试迭代 |
| 为什么学 | 项目完整性比技术广度更重要，培养产品思维 |
| 可选方向 | LED手势灯、舵机控制、自定义手势库 |

#### Day 13: 功能完善与优化 | Feature Polish & Optimization
**Refining the User Experience**

| 内容 | 说明 |
|------|------|
| 学习目标 | 性能优化、错误处理、用户体验提升 |
| 核心任务 | 帧率优化、异常捕获、UI美化 |
| 为什么学 | 工程实践不只是写代码，而是交付可用产品 |
| 真实应用 | 所有商业软件都必须考虑的性能和稳定性 |

#### Day 14: 演示准备与排练 | Presentation Preparation
**Demo Rehearsal**

| 内容 | 说明 |
|------|------|
| 学习目标 | 准备最终展示、组织演示流程 |
| 核心任务 | 制作PPT、录制演示视频、准备Q&A |
| 为什么学 | 表达能力与编码能力同等重要 |
| 评分维度 | 见 [`grading-rubric.md`](grading-rubric.md) |

#### Day 15: 最终展示日 | Final Demo Day
**Project Showcase**

| 内容 | 说明 |
|------|------|
| 形式 | 5-10分钟项目演示 + 3分钟答辩 |
| 评委 | 老师 + 同学互评 |
| 评分标准 | 技术实现(40%) + 文档(20%) + 演示(20%) + 进度(10%) + 协作(10%) |

---

## 课程时间分配建议 | Daily Time Allocation

| 时段 | 用途 | 时长 |
|------|------|------|
| 上午 | 理论讲解 + 核心任务 | 3小时 |
| 下午 | 动手实践 + 作业完成 | 3小时 |
| 晚上 | 自主探索 + 问题解决 | 2小时 |

**每日总投入:** 约8小时（符合全日制暑期营强度）

---

## 关键里程碑 | Key Milestones

| 时间点 | 里程碑 | 验收标准 |
|--------|--------|----------|
| Day 5 | 完成颜色追踪Demo | 能追踪指定颜色的物体并绘制轮廓 |
| Day 8 | 识别5种基础手势 | 握拳/张开/比V/OK/竖大拇指 |
| Day 10 | 完成虚拟画板 | 可在空中绘画并切换颜色 |
| Day 15 | 最终展示 | 功能完整 + 文档齐全 + 演示流畅 |

---

## 学习资源 | Learning Resources

### 核心文档
- [MediaPipe Hands Guide](https://google.github.io/mediapipe/solutions/hands.html)
- [OpenCV Python Tutorials](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- [NumPy Quickstart](https://numpy.org/doc/stable/user/quickstart.html)

### 推荐视频
- [Computer Vision Essentials (YouTube)](https://youtube.com/playlist)
- [MediaPipe官方演示](https://google.github.io/mediapipe/)

### 参考项目
- [MediaPipe Gesture Recognizer](https://github.com/google/mediapipe)
- [Hand Tracking VR](https://github.com/Nevernaire/HandTracking)

---

## 评估方式 | Assessment Methods

| 评估项 | 权重 | 说明 |
|--------|------|------|
| 每日作业 | 20% | 每天一个小任务，巩固当天内容 |
| 进度检查 | 20% | 每周Check-in，报告进展和问题 |
| 技术实现 | 30% | 最终代码质量、功能完整性 |
| 最终展示 | 30% | 演示效果、PPT质量、答辩表现 |

详细评分标准见 [`assignments/rubric.md`](../assignments/rubric.md)

---

## 开始学习 | Get Started

准备好了吗？从 **[Day 1: 项目启动](day-01.md)** 开始你的"魔法手势"之旅！

> Ready? Start your "Magic Gesture" journey with **[Day 1: Project Kickoff](day-01.md)**!
