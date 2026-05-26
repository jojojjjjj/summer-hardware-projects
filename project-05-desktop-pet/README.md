# 桌宠 "萌桌面" | Desktop Pet "PetDesk"

## 项目简介 | Project Overview

你是否想过在电脑桌面上养一只属于自己的小宠物？"萌桌面"是一个基于Python和PyQt5的桌面宠物项目，让你从零开始打造一个会在屏幕上行走、跳跃、打瞌睡，甚至能和你聊天的虚拟小伙伴。

Have you ever wanted to keep your own pet on the computer desktop? "PetDesk" is a Python + PyQt5 project where you build a virtual companion from scratch -- one that walks, jumps, naps, and even chats with you right on your screen.

本项目以软件开发为主线，涵盖GUI编程、帧动画系统、状态机设计、事件处理等核心编程概念。在掌握基础功能后，还可以通过AI对话（调用LLM API）和硬件互动（Arduino传感器）两个拓展方向，让你的桌宠变得更加智能和有趣。整个项目为期12天，从Python GUI入门到完整项目展示，循序渐进地引导你掌握现代软件开发的核心技能。

The project focuses on software development, covering GUI programming, sprite animation systems, state machine design, and event handling. After mastering the basics, two extension directions -- AI dialogue (calling LLM APIs) and hardware interaction (Arduino sensors) -- make your pet smarter and more engaging. The 12-day curriculum guides you from Python GUI basics to a complete project demo.

## 最终效果 | Final Result

完成本项目后，你将拥有：
- 一个在桌面上自由行走、会多种动作动画的虚拟宠物
- 支持鼠标点击、拖拽等交互操作
- 气泡对话框显示宠物的心情和想法
- 可选：AI智能对话功能，宠物能理解你说的话并做出回应
- 可选：通过实体按键传感器与桌宠互动
- 一个可以打包为exe分享给朋友的完整程序

After completing this project, you will have:
- A virtual pet that walks freely on the desktop with multi-state animations
- Mouse click, drag, and other interactive operations
- Bubble dialog boxes showing the pet's mood and thoughts
- Optional: AI-powered intelligent dialogue capability
- Optional: Physical button sensor interaction
- A complete program packaged as an .exe to share with friends

## 核心技术 | Core Technologies

| 技术 | 用途 | 说明 |
|------|------|------|
| Python 3.10+ | 主语言 | 简洁易学的编程语言 |
| PyQt5 | GUI框架 | 创建透明无边框窗口、处理鼠标事件 |
| 状态机模式 | 行为管理 | 管理宠物的idle/walk/sleep/eat等状态切换 |
| Sprite帧动画 | 视觉表现 | 通过快速切换图片帧实现动画效果 |
| QTimer | 定时驱动 | 驱动动画帧切换和宠物自主行为 |
| pyserial（可选） | 硬件通信 | 通过串口与Arduino传感器通信 |
| OpenAI API（可选） | AI对话 | 调用LLM实现智能对话功能 |
| PyInstaller | 打包发布 | 将Python程序打包为可执行文件 |

## 硬件清单 | Hardware List

### 基础版（纯软件）| Basic Version (Software Only)

| 部件 | 规格 | 价格 | 说明 |
|------|------|------|------|
| 电脑 | Windows 10/11 | 已有 | 开发和运行环境 |

**基础版总成本：0元** -- 只需要一台电脑即可开始！

### 拓展版（硬件互动）| Extension Version (With Hardware)

| 部件 | 规格 | 价格 | 购买建议 |
|------|------|------|----------|
| Arduino Nano | ATmega328P | ~15元 | 淘宝/拼多多搜索"Arduino Nano" |
| 按键传感器模块 | 带自锁开关 | ~5元 | 搜索"Arduino 按键模块" |
| 温湿度传感器 | DHT11 | ~8元 | 搜索"DHT11 温湿度传感器" |
| 面包板 | 400孔 | ~5元 | 搜索"400孔面包板" |
| 杜邦线 | 公对母 20cm | ~5元 | 搜索"杜邦线 公对母" |
| USB数据线 | Type-B/Type-C | ~5元 | 根据Arduino接口选择 |

**拓展版总成本：~43元**（远低于500元预算）

## 软件环境 | Software Environment

| 软件 | 版本 | 用途 |
|------|------|------|
| Python | 3.10+ | 主运行环境 |
| PyQt5 | 5.15+ | GUI框架 |
| Pillow | 10.0+ | 图像处理 |
| PyInstaller | 6.0+ | 程序打包（Day 11使用） |
| pyserial | 3.5+ | 串口通信（拓展功能） |
| openai | 1.0+ | AI对话（拓展功能） |

## 快速开始 | Quick Start

```bash
# 1. 克隆或下载项目
cd project-05-desktop-pet

# 2. 创建虚拟环境（推荐）
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# 3. 安装依赖
pip install -r software/requirements.txt

# 4. 复制配置模板
copy software\config.template.yaml software\config.yaml
# 编辑 config.yaml 设置你的偏好

# 5. 运行桌宠
cd software
python src/main.py
```

## 课程安排 | Course Schedule

### 第一阶段：Python GUI基础与动画入门（Day 1-4）

| 天数 | 主题 | 核心知识点 |
|------|------|-----------|
| Day 1 | 项目启动与Python GUI入门 | PyQt5基础、窗口创建、信号与槽 |
| Day 2 | 窗口透明与无边框技术 | 透明窗口、鼠标穿透、自定义标题栏 |
| Day 3 | 帧动画与Sprite系统 | Sprite图片加载、QTimer定时器、帧动画播放 |
| Day 4 | 事件处理与鼠标交互 | 鼠标事件、点击检测、右键菜单 |

### 第二阶段：宠物行为与状态系统（Day 5-8）

| 天数 | 主题 | 核心知识点 |
|------|------|-----------|
| Day 5 | 状态机设计模式 | 有限状态机原理、状态转换图、State模式 |
| Day 6 | 宠物行为系统 | 行为逻辑实现、自主移动、随机行为 |
| Day 7 | 气泡对话框与文字显示 | 自定义Widget、文字气泡、QSS样式 |
| Day 8 | 音效与特效系统 | QMediaPlayer音效、粒子特效、视觉反馈 |

### 第三阶段：功能拓展与展示（Day 9-12）

| 天数 | 主题 | 核心知识点 |
|------|------|-----------|
| Day 9 | 拖拽与桌面互动 | 拖拽实现、桌面边界检测、屏幕适配 |
| Day 10 | AI对话功能 | LLM API调用、异步请求、对话上下文管理 |
| Day 11 | 系统集成与打包发布 | 模块集成测试、PyInstaller打包、跨平台适配 |
| Day 12 | 项目展示与总结 | 演示准备、Demo网站部署、技术总结、拓展方向讨论 |

## 评分标准 | Grading Rubric

| 维度 | 权重 | 说明 |
|------|------|------|
| 技术实现 | 40% | 功能完整度、代码质量、bug修复能力 |
| 文档质量 | 15% | README、代码注释、设计文档 |
| 演示展示 | 15% | Final Demo清晰度、表达能力、Q&A应对 |
| Demo网站 | 15% | 项目展示网站的可访问性、内容完整性、视觉呈现 |
| 进度汇报 | 10% | 每周Check-in质量、问题分析深度 |
| 创新拓展 | 10% | 额外功能、创意设计、个性化定制 |

## 项目结构 | Project Structure

```
project-05-desktop-pet/
├── README.md                           # 项目说明文档
├── resources/
│   └── search-results.md              # 搜索结果资源
├── curriculum/                         # 课程文档
│   ├── overview.md                    # 课程总览
│   ├── prerequisites.md               # 前置知识
│   ├── assignments.md                 # 作业说明
│   ├── grading-rubric.md             # 评分标准
│   └── day-01.md ~ day-12.md         # 每日课程
├── hardware/                           # 硬件文档（拓展功能）
│   ├── BOM.md                         # 物料清单
│   ├── wiring-guide.md               # 接线指南
│   ├── assembly-steps.md             # 组装步骤
│   └── troubleshooting.md            # 硬件故障排除
├── software/                           # 软件源码
│   ├── requirements.txt               # Python依赖
│   ├── config.template.yaml          # 配置模板
│   ├── src/                           # 源代码
│   │   ├── main.py                    # 主入口
│   │   ├── pet.py                     # 宠物主类
│   │   ├── animation.py              # 动画系统
│   │   ├── state_machine.py          # 状态机
│   │   ├── interaction.py            # 交互处理
│   │   ├── dialog.py                 # 对话系统
│   │   └── utils.py                  # 工具函数
│   └── tests/
│       └── test_basic.py             # 基础测试
└── assignments/                        # 作业文档
    ├── week-1-checkin.md              # 第一周进度汇报
    ├── week-2-checkin.md              # 第二周进度汇报
    ├── final-presentation.md          # 最终展示要求
    └── rubric.md                      # 详细评分表
```

## 学习资源 | Learning Resources

### B站视频教程 | Bilibili Video Tutorials

| 视频 | UP主 | 时长 | 推荐理由 |
|------|------|------|----------|
| [用Python制作专属桌面宠物（保姆级教程）](https://www.bilibili.com/video/BV1Yr421H7SV/) | 账号已注销 | 01:40 | Python桌宠入门首选，附完整源码 |
| [全流程！一个视频学会制作桌宠（BongoCat）](https://www.bilibili.com/video/BV1EB4y1v7B4/) | 海哲桑 | 03:11:57 | 最详细的桌宠全流程教程 |
| [五分钟学会自制桌面宠物](https://www.bilibili.com/video/BV1YmCdYhEoc/) | 阿空的游戏部屋 | 05:22 | 快速入门，适合了解整体流程 |
| [AI桌宠详细教程](https://www.bilibili.com/video/BV1KMQnBFEHu/) | VOID造物主 | 08:27 | AI对话功能参考 |
| [5分钟开发AI桌宠助手](https://www.bilibili.com/video/BV1N7ymBpEzt/) | IT咖啡馆 | 05:33 | AI桌宠热门教程（12.5万播放） |
| [零基础AI多功能桌宠](https://www.bilibili.com/video/BV1MaSeBPEus/) | 彻喵 | 04:27 | 零基础也能上手的AI桌宠 |
| [Python桌面宠物游戏脚本](https://www.bilibili.com/video/BV1DE4m1R7z5/) | Python_七点半1mo | 01:18 | 简洁的Python桌宠实现参考 |
| [Shimeji桌宠制作教程](https://www.bilibili.com/video/BV1q441127zw/) | 角银- | 04:41 | 经典Shimeji桌宠机制学习 |

### GitHub开源项目 | Open Source References

| 项目 | Stars | 说明 |
|------|-------|------|
| [VPet - 虚拟桌宠模拟器](https://github.com/LorisYounger/VPet) | 6,206 | 最完整的开源桌宠，架构设计最佳参考 |
| [ChatWaifu_Mobile](https://github.com/Voine/ChatWaifu_Mobile) | 1,403 | AI对话+语音合成参考 |
| [Shijima-Qt](https://github.com/pixelomer/Shijima-Qt) | 191 | 基于Qt的Shimeji运行器 |
| [pixelgotchi](https://github.com/elohcrypto/pixelgotchi) | 1 | Pygame桌宠+LLM，模块化设计参考 |
| [DigimonVPet](https://github.com/Berational91/DigimonVPet) | 201 | ESP32硬件桌宠参考 |

### 官方文档与教程 | Official Documentation

- [PyQt5 官方文档](https://www.riverbankcomputing.com/static/Docs/PyQt5/)
- [PyQt5 入门教程（菜鸟教程）](https://www.runoob.com/pyqt5/pyqt5-introduction.html)
- [状态机设计模式详解](https://refactoring.guru/design-patterns/state)
- [Piskel 在线像素画编辑器](https://www.piskelapp.com/) -- 制作帧动画素材
- [Pixabay 免费音效](https://pixabay.com/sound-effects/) -- 获取宠物音效素材

### 素材资源 | Asset Resources

- [itch.io 免费像素画素材](https://itch.io/game-assets/free/tag-pixel-art)
- [Kenney 高质量免费游戏素材](https://kenney.nl/assets)
- [OpenGameArt 开源游戏素材库](https://opengameart.org/)

## 常见问题 | FAQ

**Q: 我没有Python基础，能做这个项目吗？**
A: 可以！Day 1会从最基础的Python知识开始。但建议提前自学Python基础语法（变量、循环、函数），参考菜鸟教程的Python3教程。

I have no Python background. Can I still do this project?
Yes. Day 1 starts from the very basics. However, it is recommended to self-study Python basics (variables, loops, functions) beforehand.

**Q: 我的电脑是Mac/Linux，可以做吗？**
A: PyQt5支持跨平台，大部分代码可以直接运行。某些Windows特定的API（如系统托盘）可能需要小幅调整。

Can I use Mac or Linux?
PyQt5 is cross-platform. Most code runs as-is. A few Windows-specific APIs (e.g., system tray) may need minor adjustments.

**Q: 素材图片从哪里来？**
A: 可以使用Piskel在线工具自己画像素画角色，也可以从itch.io、Kenney等网站下载免费素材。课程Day 3会教授基本的素材制作方法。

Where do I get sprite assets?
You can draw pixel-art characters with the online tool Piskel, or download free assets from itch.io / Kenney. Day 3 covers basic asset creation.

**Q: AI对话功能需要付费吗？**
A: 大部分LLM API提供免费额度（如OpenAI新用户赠送$5额度）。也可以使用国内免费或低成本的API服务。如果预算有限，可以跳过Day 10的AI功能。

Does the AI chat feature cost money?
Most LLM APIs provide free credits (e.g., OpenAI gives new users $5). Domestic Chinese API services may also offer free tiers. You can skip Day 10 if budget is a concern.

**Q: 打包后的exe文件很大怎么办？**
A: PyQt5打包后通常有50-100MB。可以使用`--onefile`模式压缩，或考虑使用Nuitka替代PyInstaller获得更小的体积。

The packaged .exe is very large. What should I do?
PyQt5 apps typically package to 50-100MB. Use `--onefile` mode, or try Nuitka for a smaller binary.

## 许可证 | License

本项目采用 [MIT License](https://opensource.org/licenses/MIT) 开源协议。

This project is licensed under the MIT License.

---

*最后更新：2026-05-26*
