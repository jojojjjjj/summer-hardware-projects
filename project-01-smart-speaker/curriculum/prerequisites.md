# 前置知识清单 | Prerequisites Checklist

## 概述 | Overview

本课程假设学员具备基础编程能力。以下是开始课程前需要掌握的知识点和相应的学习资源。

> This course assumes students have basic programming ability. Below are the knowledge points and learning resources needed before starting the course.

## 1. Python 基础 | Python Fundamentals

### 需要掌握的概念 | Concepts to Master

- [ ] **变量与数据类型** (Variables and Data Types)
  - 字符串 (string)、整数 (int)、浮点数 (float)、布尔值 (bool)
- [ ] **基本操作** (Basic Operations)
  - 算术运算 (+, -, *, /, %, **)
  - 比较运算 (==, !=, <, >, <=, >=)
  - 逻辑运算 (and, or, not)
- [ ] **控制结构** (Control Structures)
  - if/elif/else 条件语句
  - for 循环、while 循环
  - break、continue
- [ ] **数据结构** (Data Structures)
  - 列表 (list) - 创建、索引、切片、方法
  - 字典 (dict) - 键值对、常见操作
  - 元组 (tuple) - 不可变序列
- [ ] **函数** (Functions)
  - 函数定义 def、参数、返回值
  - 默认参数、关键字参数
- [ ] **文件操作** (File Operations)
  - 打开文件 open()、读取、写入
  - with 语句上下文管理器
- [ ] **异常处理** (Exception Handling)
  - try/except/finally

### 学习资源 | Learning Resources

- **廖雪峰 Python 教程**（中文）：https://www.liaoxuefeng.com/wiki/1016959663602400
- **Python 官方教程**（中文）：https://docs.python.org/zh-cn/3/tutorial/
- **Codecademy Python 课程**（英文，互动式）：https://www.codecademy.com/learn/learn-python-3

### 自检练习 | Self-Check Exercises

尝试完成以下任务来检验你的 Python 基础：

```python
# 1. 创建一个包含5个数字的列表，计算它们的平均值
numbers = [1, 2, 3, 4, 5]
average = sum(numbers) / len(numbers)
print(f"平均值: {average}")

# 2. 创建一个字典存储学生信息，并打印出来
student = {
    "name": "小明",
    "age": 16,
    "grade": "高二"
}
print(f"学生姓名: {student['name']}")

# 3. 写一个函数，判断一个数是否为偶数
def is_even(n):
    return n % 2 == 0

print(is_even(4))  # True
print(is_even(7))  # False

# 4. 使用 for 循环打印 1 到 10
for i in range(1, 11):
    print(i)
```

## 2. Linux 命令行基础 | Linux Command Line Basics

### 需要掌握的命令 | Commands to Master

- [ ] **文件系统导航**
  - `pwd` - 显示当前目录
  - `ls` - 列出目录内容
  - `cd` - 切换目录
- [ ] **文件操作**
  - `cp` - 复制文件
  - `mv` - 移动/重命名文件
  - `rm` - 删除文件
  - `cat` - 查看文件内容
- [ ] **权限管理**
  - `sudo` - 以管理员权限执行
  - `chmod` - 修改文件权限
- [ ] **系统信息**
  - `top` / `htop` - 查看系统资源
  - `df -h` - 查看磁盘使用
  - `free -h` - 查看内存使用

### 学习资源 | Learning Resources

- **Linux 命令行基础教程**（中文）：https://linuxjourney.com/（中文版可用）
- **树莓派官方文档**：https://www.raspberrypi.com/documentation/computers/linux.html

### 自检练习 | Self-Check Exercises

```bash
# 1. 创建一个新目录
mkdir test_folder

# 2. 进入该目录
cd test_folder

# 3. 创建一个文本文件并写入内容
echo "Hello Raspberry Pi" > hello.txt

# 4. 查看文件内容
cat hello.txt

# 5. 返回上级目录
cd ..
```

## 3. 网络基础概念 | Basic Networking Concepts

### 需要理解的概念 | Concepts to Understand

- [ ] **IP 地址** (IP Address)
  - 局域网 IP（如 192.168.x.x）
  - 本地回环（127.0.0.1）
- [ ] **端口** (Port)
  - 常见端口（80, 443, 22）
  - 端口占用问题
- [ ] **API 基础** (API Basics)
  - 什么是 API
  - HTTP 请求方法（GET, POST）
  - API Key 的概念

### 学习资源 | Learning Resources

- **计算机网络基础**（视频）：B站搜索"计算机网络入门"
- **RESTful API 入门**：https://restfulapi.net/

## 4. 音频基础概念 | Basic Audio Concepts

### 需要理解的概念 | Concepts to Understand

- [ ] **采样率** (Sample Rate)
  - CD 音质：44100 Hz
  - 语音识别推荐：16000 Hz
- [ ] **声道** (Channels)
  - 单声道 (mono) - 1个声道
  - 立体声 (stereo) - 2个声道
- [ ] **音频格式** (Audio Formats)
  - WAV - 无损格式
  - MP3 - 有损压缩格式
  - FLAC - 无损压缩格式

### 学习资源 | Learning Resources

- **数字音频基础**：https://www.izotope.com/en/learn/digital-audio-basics.html
- **音频采样率解释**：https://www.youtube.com/watch?v=x4sk77BLnP0

## 准备工作检查清单 | Preparation Checklist

开始课程前，请确保：

- [ ] 已完成 Python 基础自检练习
- [ ] 了解基本 Linux 命令
- [ ] 理解网络和音频基础概念
- [ ] 已准备好树莓派硬件
- [ ] 已准备好电脑（用于 SSH 连接树莓派）
- [ ] 已注册 DeepSeek 或 OpenAI 账号（获取 API Key）

## 常见问题 | FAQ

**Q: 如果我 Python 基础不够怎么办？**
A: 建议先花 2-3 天完成廖雪峰 Python 教程的前 8 章，再开始本项目。

**Q: 我没有 Linux 经验，可以学习吗？**
A: 可以。Day 1 课程会详细介绍树莓派和 Linux 基础操作。

**Q: 音频概念不理解会影响学习吗？**
A: 不会。Day 3 会有详细的音频原理讲解和实践。

---

*如有疑问，请在课程开始前咨询助教。*
*If you have questions, please consult the teaching assistant before the course starts.*
