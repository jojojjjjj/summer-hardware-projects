# Day 1: 项目启动 + 环境搭建 | Project Kickoff + Environment Setup

> **今日目标:** 了解项目全貌，搭建开发环境，运行第一个摄像头程序
>
> **Today's Goal:** Understand the project scope, set up the development environment, and run your first camera program

---

## 学习目标 | Learning Objectives

完成今天的学习后，你将能够:
- ✅ 解释"魔法手势"项目的核心功能和应用场景
- ✅ 在你的电脑上安装和配置Python开发环境
- ✅ 使用pip安装OpenCV和其他必要的库
- ✅ 编写并运行第一个摄像头捕捉程序

> After completing today's lesson, you will be able to:
> - ✅ Explain the core features and applications of the "Magic Gesture" project
> - ✅ Install and configure Python development environment on your computer
> - ✅ Use pip to install OpenCV and other necessary libraries
> - ✅ Write and run your first camera capture program

---

## 前置准备检查 | Prerequisites Check

开始前请确认:
- [ ] 你有一台可用的电脑（Windows/Mac/Linux均可）
- [ ] 你有管理员权限（用于安装软件）
- [ ] 你的电脑有摄像头（内置或USB）
- [ ] 你有稳定的网络连接

---

## 为什么学这个？| Why Learn This?

### 环境搭建是编程的第一步
> 所有软件开发，从简单的脚本到复杂的人工智能系统，都始于配置开发环境。就像烹饪前要准备厨具和食材一样，编程也需要准备好"代码厨房"。

### OpenCV是计算机视觉的"瑞士军刀"
> OpenCV（Open Source Computer Vision Library）是全球最流行的计算机视觉库，拥有超过2500个优化算法。从NASA的火星探测器到你手机的美颜滤镜，都可能在使用OpenCV。

### 摄像头是机器的"眼睛"
> 让计算机"看见"世界，是人工智能的核心能力之一。今天你将教会计算机"睁开眼睛"——这将为后续的手势识别打下基础。

---

## 任务一: 了解项目 | Task 1: Understand the Project (30分钟)

### 1.1 项目演示（5分钟）

**看老师演示**（或观看项目演示视频）:
- 用手势控制电脑音量
- 用手指在空中绘画
- 用手势控制LED灯颜色

### 1.2 项目拆解（10分钟）

这个项目实际上分为三个部分:

```
输入(Input) → 处理(Process) → 输出(Output)
  摄像头   →  手势识别   →  控制指令
```

**类比理解:**
- **摄像头** = 人的眼睛（捕捉图像）
- **MediaPipe** = 人的大脑（理解手势）
- **控制指令** = 人的手（执行操作）

### 1.3 技术路线图（10分钟）

```
Day 1-5:  计练"眼睛"（计算机视觉基础）
Day 6-11: 训练"大脑"（手势识别算法）
Day 12-15: 完成作品（项目完善与展示）
```

### 1.4 设定个人目标（5分钟）

**写下你希望完成:**
- [ ] 基础功能（识别5种手势）
- [ ] 进阶功能（音量控制+虚拟画板）
- [ ] 创意扩展（自定义功能或硬件集成）

---

## 任务二: 安装Python环境 | Task 2: Install Python Environment (60分钟)

### 2.1 检查现有Python（5分钟）

打开命令行/终端:

**Windows:** 按 `Win + R`，输入 `cmd`，回车
**Mac:** 按 `Cmd + Space`，输入 `Terminal`，回车
**Linux:** 按 `Ctrl + Alt + T`

输入以下命令:

```bash
python --version
# 或
python3 --version
```

**可能的输出:**
- `Python 3.10.x` ✅ 可以直接使用
- `Python 3.8.x` ✅ 可以使用，但建议升级
- `Python 3.7.x` ⚠️ 勉强可用，建议升级
- `Python 2.7.x` ❌ 版本过旧，必须升级
- `command not found` ❌ 未安装Python

### 2.2 安装Python（如需要）（15分钟）

**方案A: 使用Anaconda（推荐新手）**

1. 访问 https://www.anaconda.com/download
2. 下载适合你系统的版本（Windows/Mac/Linux）
3. 运行安装程序，使用默认设置
4. 安装完成后重启命令行

**方案B: 直接安装Python**

1. 访问 https://www.python.org/downloads/
2. 下载最新版Python（推荐3.11或3.12）
3. **重要:** 安装时勾选 "Add Python to PATH"
4. 完成安装

### 2.3 验证安装（5分钟）

```bash
python --version
# 应该显示 Python 3.10.x 或更高
```

### 2.4 安装代码编辑器（10分钟）

**推荐使用VS Code:**

1. 访问 https://code.visualstudio.com/
2. 下载并安装
3. 打开VS Code，安装Python扩展:
   - 点击左侧扩展图标
   - 搜索 "Python"
   - 安装Microsoft官方的Python扩展

### 2.5 创建项目文件夹（5分钟）

```bash
# 创建项目目录
mkdir Summer_project
cd Summer_project
mkdir project-03-gesture-cv
cd project-03-gesture-cv
```

### 2.6 创建虚拟环境（10分钟）

**为什么使用虚拟环境?**
> 虚拟环境就像一个"沙盒"，让你为不同项目安装不同的库，而不会相互冲突。

```bash
# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

**激活成功后，你会看到命令行前缀出现 `(venv)`**

### 2.7 升级pip（5分钟）

```bash
python -m pip install --upgrade pip
```

### 2.8 安装项目依赖（10分钟）

创建一个临时文件 `requirements.txt`:

```bash
# 在命令行输入（或用编辑器创建）
notepad requirements.txt  # Windows
# 或
nano requirements.txt      # Mac/Linux
```

粘贴以下内容:

```text
opencv-python==4.8.1.78
mediapipe==0.10.8
numpy==1.24.3
pyautogui==0.9.54
pygame==2.5.2
```

安装依赖:

```bash
pip install -r requirements.txt
```

**常见问题:**
- ❌ 如果网络错误，尝试使用国内镜像:
  ```bash
  pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```
- ❌ 如果权限错误，确保使用虚拟环境

---

## 任务三: 第一个摄像头程序 | Task 3: First Camera Program (40分钟)

### 3.1 创建程序文件（5分钟）

在VS Code中创建新文件 `test_camera.py`:

```python
import cv2

def main():
    """
    测试摄像头
    Test camera functionality
    """
    # 打开摄像头（0表示默认摄像头）
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("无法打开摄像头 | Cannot open camera")
        return
    
    print("摄像头已打开 | Camera opened")
    print("按 'q' 键退出 | Press 'q' to quit")
    
    while True:
        # 读取一帧图像
        ret, frame = cap.read()
        
        if not ret:
            print("无法获取画面 | Cannot capture frame")
            break
        
        # 显示图像
        cv2.imshow('Camera Test', frame)
        
        # 按q退出
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    # 释放资源
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
```

### 3.2 运行程序（5分钟）

```bash
python test_camera.py
```

**预期结果:**
- 弹出一个窗口，显示你的摄像头画面
- 窗口标题为 "Camera Test"
- 按 `q` 键可以关闭程序

**调试问题:**
- ❌ 如果画面卡顿: 检查USB带宽，尝试拔掉其他USB设备
- ❌ 如果画面倒置: 在某些笔记本上是正常的，后续可调整
- ❌ 如果无法打开: 检查摄像头权限设置

### 3.3 理解代码（10分钟）

让我们逐行分析:

```python
import cv2  # 导入OpenCV库
```

```python
cap = cv2.VideoCapture(0)  # 打开第0号摄像头
# 如果有多个摄像头，可以尝试VideoCapture(1)
```

```python
ret, frame = cap.read()
# ret: 是否成功读取（True/False）
# frame: 图像数据（numpy数组）
```

```python
cv2.imshow('Camera Test', frame)
# 在名为'Camera Test'的窗口中显示图像
```

```python
if cv2.waitKey(1) & 0xFF == ord('q'):
# 等待1毫秒的键盘输入
# 如果按下'q'键，则退出循环
```

### 3.4 添加文字（10分钟）

修改代码，在画面上添加文字:

```python
import cv2
import datetime

def main():
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 添加文字
        text = f"Magic Gesture - {datetime.datetime.now().strftime('%H:%M:%S')}"
        cv2.putText(frame, text, (10, 30), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        cv2.imshow('Camera Test', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
```

### 3.5 保存照片（10分钟）

添加按 `s` 键保存照片的功能:

```python
import cv2
import datetime
import os

def main():
    cap = cv2.VideoCapture(0)
    
    # 创建保存目录
    if not os.path.exists('photos'):
        os.makedirs('photos')
    
    photo_count = 0
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # 显示提示
        cv2.putText(frame, "Press 's' to save, 'q' to quit", 
                    (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        cv2.putText(frame, f"Photos saved: {photo_count}", 
                    (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        cv2.imshow('Camera Test', frame)
        
        key = cv2.waitKey(1) & 0xFF
        
        if key == ord('q'):
            break
        elif key == ord('s'):
            # 保存照片
            filename = f'photos/photo_{photo_count}.jpg'
            cv2.imwrite(filename, frame)
            photo_count += 1
            print(f"已保存: {filename} | Saved: {filename}")
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
```

---

## 今日作业 | Today's Assignment

### 基础作业（必做）
1. ✅ 成功安装Python和OpenCV
2. ✅ 运行摄像头测试程序，能正常显示画面
3. ✅ 修改程序，在画面上显示你的名字

### 进阶作业（选做）
1. 按空格键切换显示效果（原图/灰度/翻转）
2. 创建一个"拍照模式"，连续拍照后按特定键停止

### 提交方式
将你的 `test_camera.py` 代码和运行截图（1-2张）提交到学习平台。

---

## 明日预告 | Tomorrow's Preview

**Day 2: 图像基础**
- 我们将深入理解数字图像的本质
- 学习如何读取、显示、保存图像文件
- 探索像素值的含义和操作

**预告:** 你将学会如何用代码"打开"一张照片，并"修改"它的每一个像素！

---

## 常见问题 | FAQ

### Q1: pip安装速度很慢怎么办？
**A:** 使用国内镜像源:
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple opencv-python
```

### Q2: 摄像头画面是倒的？
**A:** 这是某些摄像头的正常现象。在代码中添加翻转:
```python
frame = cv2.flip(frame, 1)  # 水平翻转
```

### Q3: 闪退或没有错误提示？
**A:** 在程序末尾添加:
```python
input("按回车退出...")  # 防止窗口立即关闭
```

---

## 参考资源 | Resources

- 📚 [OpenCV Python教程](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- 📺 [Python虚拟环境解释](https://www.youtube.com/watch?v=KgJYbUxB2w)
- 💻 [VS Code Python设置](https://code.visualstudio.com/docs/python/python-tutorial)

---

**恭喜你完成第一天！** 你已经搭建好了开发环境，这是最重要的一步。明天我们将深入探索图像的奥秘！

> **Congratulations on completing Day 1!** You've set up your development environment—the most important step. Tomorrow we'll dive into the mysteries of images!
