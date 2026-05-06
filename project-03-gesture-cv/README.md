# 手势互动装置 "魔法手势" | Gesture Interactive Installation "Magic Gesture"

> **难度:** ★★★★☆ | **周期:** 14-18天 | **成本:** ¥300-500 | **方向:** 计算机视觉

---

## 项目简介 | Project Overview

本项目是一个基于计算机视觉的手势识别交互装置，能够实时捕捉用户的手部动作，将其转换为控制指令。学员将构建一个"魔法手势"装置——用简单的手势就能控制音量、在空中绘画、与LED灯光互动。

> This project is a gesture recognition interactive installation based on computer vision that captures user hand movements in real-time and converts them into control commands. Students will build a "Magic Gesture" device that can control volume, draw in the air, and interact with LED lights using simple hand gestures.

### 真实世界应用 | Real-world Applications

- **人机交互:** 智能汽车的手势控制、AR/VR 手势交互
- **无障碍技术:** 帮助残障人士通过手势操作设备
- **游戏娱乐:** 体感游戏、虚拟现实应用
- **安防监控:** 异常行为检测、手势警报系统

---

## 核心技术栈 | Tech Stack

| 类别 | 技术 | 说明 |
|------|------|------|
| 编程语言 | Python 3.10+ | 跨平台，丰富的CV库 |
| 计算机视觉 | OpenCV 4.8+ | 图像处理、摄像头操作 |
| 手部追踪 | MediaPipe 0.10+ | Google的21点手部关键点检测 |
| 数值计算 | NumPy 1.24+ | 矩阵运算、坐标变换 |
| 交互控制 | PyAutoGUI | 系统控制（音量、鼠标等） |
| 可选硬件 | Raspberry Pi 5 / LED灯带 | 移动部署、视觉反馈 |

---

## 项目亮点 | Project Highlights

1. **零基础友好:** 从图像像素基础讲起，逐步深入到手势算法
2. **实用性强:** 可直接制作成炫酷的展示项目（科技节、展览）
3. **可扩展:** 支持添加自定义手势、硬件交互（舵机、LED）
4. **开源生态:** MediaPipe 持续更新，社区资源丰富

---

## 学习成果 | Learning Outcomes

完成本项目后，你将掌握：

- ✅ 计算机视觉核心概念（图像采集、处理、分析）
- ✅ MediaPipe 手部追踪 API 的使用
- ✅ 手势识别算法设计（状态机、几何判断）
- ✅ 实时交互系统开发（帧率优化、多线程）
- ✅ Python 项目工程实践（模块化、测试、文档）

---

## 快速开始 | Quick Start

### 硬件准备

**方案A - 笔记本电脑（推荐新手）**
- USB摄像头或内置摄像头
- 成本：¥0（已有设备）

**方案B - 树莓派（进阶部署）**
- Raspberry Pi 5 (¥350)
- USB摄像头 (¥50)
- Micro SD卡 32GB+ (¥40)
- 5V电源适配器 (¥30)

**可选配件**
- WS2812B LED灯带 1米 (¥25) - 视觉反馈
- SG90舵机 (¥10) - 实体互动

### 软件安装

```bash
# 克隆项目
git clone <your-repo-url>
cd project-03-gesture-cv

# 创建虚拟环境（推荐）
python -m venv venv
source venv/bin/activate  # Linux/Mac: source venv/bin/activate

# 安装依赖
pip install -r software/requirements.txt

# 复制配置文件
cp software/config.template.yaml software/config.yaml
# 根据需要编辑 config.yaml

# 运行演示
python software/src/main.py
```

### 测试摄像头

```bash
# 测试摄像头是否正常
python software/demos/demo_volume_control.py
```

---

## 项目结构 | Project Structure

```
project-03-gesture-cv/
├── curriculum/              # 课程文档
│   ├── overview.md          # 15天课程总览
│   ├── prerequisites.md     # 前置知识清单
│   ├── day-01.md ~ day-15.md # 每日课程
│   ├── assignments.md       # 作业说明
│   └── grading-rubric.md    # 评分标准
├── hardware/                # 硬件文档
│   ├── BOM.md               # 物料清单
│   ├── wiring-guide.md      # 接线指南
│   ├── assembly-steps.md    # 组装步骤
│   └── troubleshooting.md   # 故障排查
├── software/                # 软件代码
│   ├── requirements.txt     # 依赖列表
│   ├── config.template.yaml # 配置模板
│   ├── src/                 # 源代码
│   │   ├── main.py          # 主程序入口
│   │   ├── camera.py        # 摄像头管理
│   │   ├── hand_tracker.py  # 手部追踪
│   │   ├── gesture_recognizer.py # 手势识别
│   │   ├── visualizer.py    # 可视化
│   │   └── utils.py         # 工具函数
│   ├── demos/               # 演示程序
│   │   ├── demo_volume_control.py
│   │   └── demo_virtual_canvas.py
│   └── tests/               # 测试代码
│       └── test_basic.py
└── assignments/             # 作业提交
    ├── week-1-checkin.md    # 第一周进度检查
    ├── week-2-checkin.md    # 第二周进度检查
    ├── final-presentation.md # 最终展示要求
    └── rubric.md            # 评分细则
```

---

## 课程安排 | Curriculum Overview (15 Days)

| 阶段 | 天数 | 主题 | 核心技能 |
|------|------|------|---------|
| **基础阶段** | Day 1-5 | 图像处理基础 | OpenCV、像素操作、颜色空间、轮廓检测 |
| **手势阶段** | Day 6-11 | MediaPipe + 手势识别 | 手部关键点、手势算法、交互控制 |
| **项目阶段** | Day 12-15 | 创意项目完善 | 自定义功能、优化、展示准备 |

详细课程大纲见 [`curriculum/overview.md`](curriculum/overview.md)

---

## 演示效果 | Demo Preview

### 功能1: 手势音量控制
- ✊ 握拳：静音
- ✋ 张开：恢复音量
- 👆 拇指上下：调节音量

### 功能2: 空中虚拟画板
- 食指追踪：在屏幕上绘画
- 握拳：切换画笔颜色
- 张开手：清除画布

### 功能3: LED灯互动（可选）
- 不同手势触发不同LED模式
- 颜色、速度随手势变化

---

## 常见问题 | FAQ

**Q: 我没有编程基础，能完成这个项目吗？**
A: 可以！课程从最基础的图像像素概念讲起，每天都有详细的"为什么"解释和分步指导。

**Q: 必须使用树莓派吗？**
A: 不必须。项目可以在Windows/Mac/Linux笔记本上完成，树莓派是可选的移动部署方案。

**Q: 摄像头分辨率有要求吗？**
A: 推荐720p以上，但640x480也可以正常工作。MediaPipe对低分辨率图像优化良好。

**Q: 能识别复杂手势（如"爱心"、"OK"）吗？**
A: 课程教授基础手势识别算法，学员可以在此基础上扩展自定义手势。

---

## 贡献与反馈 | Contributing

本项目是开源教育资源，欢迎：
- 报告Bug和问题
- 提出改进建议
- 分享你的创意扩展项目

---

## 许可证 | License

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE)

---

## 致谢 | Acknowledgments

- [MediaPipe](https://google.github.io/mediapipe/) - Google的机器学习解决方案
- [OpenCV](https://opencv.org/) - 开源计算机视觉库
- [Awesome Gesture Recognition](https://github.com/priya-dwivedi/Deep-Learning/blob/master/Gesture_Recognition) - 社区资源汇总

---

**准备好开始你的"魔法手势"之旅了吗？** 从 [`curriculum/day-01.md`](curriculum/day-01.md) 开始吧！

> **Ready to start your "Magic Gesture" journey?** Begin with [`curriculum/day-01.md`](curriculum/day-01.md)!
