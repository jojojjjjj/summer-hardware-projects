# 前置知识清单 | Prerequisites Checklist

> 在开始本项目前，请检查你是否具备以下知识基础。
>
> Before starting this project, please check if you have the following knowledge foundation.

---

## 必备知识 | Essential Knowledge

### 1. Python 编程基础 | Python Programming Fundamentals

**你需要掌握:**
- ✅ 变量、数据类型（int, float, string, bool）
- ✅ 基本运算（+、-、*、/、%）
- ✅ 条件语句（if/else/elif）
- ✅ 循环（for/while）
- ✅ 函数定义与调用
- ✅ 列表（list）和字典（dict）的基本操作
- ✅ 类（class）的基本概念（属性和方法）

**自我测试:**
```python
# 你能理解这段代码吗？
def calculate_gesture_score(landmarks, threshold=0.5):
    """
    计算手势置信度分数
    Calculate gesture confidence score
    """
    scores = []
    for point in landmarks:
        if point.visibility > threshold:
            scores.append(point.visibility)
    
    return sum(scores) / len(scores) if scores else 0

# 测试
class Landmark:
    def __init__(self, x, y, visibility):
        self.x = x
        self.y = y
        self.visibility = visibility

test_points = [Landmark(0.1, 0.2, 0.8), Landmark(0.5, 0.5, 0.3)]
print(calculate_gesture_score(test_points))  # 输出什么？
```

**如果不太理解，建议先学习:**
- 📚 [Python官方教程 - 基础部分](https://docs.python.org/zh-cn/3/tutorial/introduction.html)
- 📺 [B站: Python零基础教程](https://search.bilibili.com/all?keyword=Python零基础)

---

### 2. 图像基本概念 | Basic Image Concepts

**你需要理解:**
- ✅ 像素（Pixel）——数字图像的最小单位
- ✅ 分辨率（Resolution）——图像的宽x高（如640x480）
- ✅ RGB颜色模型——红(R)、绿(G)、蓝(B)三通道
- ✅ 灰度图像（Grayscale）——单通道，亮度信息
- ✅ 坐标系统——图像左上角为原点(0,0)

**自我测试:**
- 问题1: 一张1920x1080的RGB图像有多少个像素？
  - 答案: 1920 × 1080 = 2,073,600 像素
- 问题2: 每个RGB像素有多少个数值？
  - 答案: 3个（R、G、B各一个，通常0-255）

**为什么重要?**
> 在计算机视觉中，一切操作都是对这些数字（像素值）的计算。理解这些概念是学习OpenCV的基础。

---

### 3. 数学基础 | Mathematics Foundation

**你需要掌握:**
- ✅ 二维坐标系统（x轴水平向右，y轴垂直向下）
- ✅ 距离计算（两点间距离公式）
- ✅ 角度概念（度数与弧度）
- ✅ 基础三角函数（sin, cos）——用于计算关节角度

**自我测试:**
```python
import math

# 计算两点间距离
def distance(p1, p2):
    return math.sqrt((p2[0] - p1[0])**2 + (p2[1] - p1[1])**2)

# 测试：点(0,0)和点(3,4)的距离是多少？
print(distance((0, 0), (3, 4)))  # 应该输出 5.0
```

**为什么重要?**
> 手势识别需要计算手指之间的距离、手掌的方向角度等，这些都离不开基础数学。

---

### 4. 操作系统基础 | Operating System Basics

**你需要会:**
- ✅ 使用命令行/终端（Command Prompt / Terminal）
- ✅ 基本文件操作（cd, dir/ls, mkdir）
- ✅ 安装软件和Python包
- ✅ 理解文件路径（绝对路径 vs 相对路径）

**自我测试:**
```bash
# 你能理解这些命令在做什么吗？
cd D:\coding\Summer_project\project-03-gesture-cv
dir
mkdir test_folder
python --version
```

**如果不太熟悉，不要担心！** Day 1会详细讲解这些操作。

---

## 推荐知识（可选）| Recommended Knowledge (Optional)

### 1. NumPy 基础
NumPy是Python的数值计算库，OpenCV和MediaPipe都依赖它。

**有用但不必须:**
- 数组（array）的概念
- 数组切片和索引
- 基本数组运算

> **课程中会讲解**，提前了解可以加快进度。

### 2. Git 版本控制
用于代码管理和提交作业。

**基础命令:**
```bash
git add .
git commit -m "完成手势识别功能"
git push
```

> **Day 1会介绍基础使用**，没有Git经验也可以开始。

### 3. 物理概念（可选）
如果你计划使用LED灯带或舵机：
- 电压（V）和电流（A）的基本概念
- GPIO（通用输入输出）引脚的概念

> **没有物理背景也能完成纯软件版本**，这些只是扩展内容。

---

## 硬件准备检查 | Hardware Checklist

### 方案A：笔记本电脑（推荐新手）
- [ ] 笔记电脑或台式机
- [ ] 摄像头（内置或USB摄像头，720p以上）
- [ ] 稳定的网络连接（下载依赖包）

**总成本:** ¥0（使用已有设备）

### 方案B：树莓派（进阶）
- [ ] Raspberry Pi 5 (或RPi 4B, 4GB+内存)
- [ ] Micro SD卡（32GB+, Class 10）
- [ ] USB摄像头
- [ ] 5V 3A USB-C电源适配器
- [ ] HDMI显示器（或远程桌面连接）

**总成本:** 约¥400-500

### 可选配件
- [ ] WS2812B LED灯带（用于视觉反馈）
- [ ] SG90舵机（用于机械互动）
- [ ] 面包板和杜邦线（连接硬件）

---

## 软件准备检查 | Software Checklist

在开始Day 1之前，建议你:

- [ ] 确认Python版本（建议Python 3.10或3.11）
  ```bash
  python --version
  ```

- [ ] 选择一个代码编辑器
  - **推荐:** VS Code（免费，功能强大）
  - **可选:** PyCharm Community（专业版功能）
  - **临时:** IDLE（Python自带，简单项目可用）

- [ ] （推荐）安装Anaconda
  - 下载: https://www.anaconda.com/download
  - Anaconda简化了Python环境管理

---

## 学习心态准备 | Mindset Preparation

### 这个项目适合你，如果:
- ✅ 你对"让计算机看懂世界"感到好奇
- ✅ 你愿意尝试、犯错、再尝试
- ✅ 你能坚持每天完成小任务
- ✅ 你喜欢动手做项目而非只听理论

### 不必担心:
- ❌ 不需要你有编程竞赛经验
- ❌ 不需要你精通数学
- ❌ 不需要你有硬件经验
- ❌ 不需要你一次就写对代码

**记住: 计算机视觉专家也是从读取第一个像素开始的！**

---

## 预习资源 | Pre-study Resources

如果你想提前准备（可选）:

### 视频
- 📺 [5分钟理解计算机视觉](https://www.bilibili.com/video/BV1xx411c7mD)
- 📺 [MediaPipe手部追踪演示](https://www.youtube.com/watch?v=WCkyuo7vHac)

### 文章
- 📚 [什么是计算机视觉？](https://zh.wikipedia.org/wiki/计算机视觉)
- 📚 [MediaPipe官方介绍](https://mediapipe.dev/)

### 练习
- 💻 [Python基础练习 - LeetCode](https://leetcode.cn/)
- 💻 [NumPy 30分钟入门](https://numpy.org/doc/stable/user/quickstart.html)

---

## 准备好了吗？| Ready to Start?

如果你:
- ✅ 理解了Python基础（或愿意边学边做）
- ✅ 有一台可用的电脑
- ✅ 对项目主题感兴趣

**那么你准备好了！** 让我们从 **[Day 1: 项目启动](day-01.md)** 开始吧！

> **If you've checked the boxes above, you're ready!** Let's start with **[Day 1: Project Kickoff](day-01.md)**!
