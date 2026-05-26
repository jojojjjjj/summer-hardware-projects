# 前置知识 | Prerequisites

## 必备基础 | Required Knowledge

### 1. Python基础语法
在开始本项目前，你应该掌握以下Python基础知识：

Before starting, you should be comfortable with these Python basics:

| 知识点 | 要求程度 | 学习建议 |
|--------|----------|----------|
| 变量和数据类型 | 熟练 | int, str, float, bool, list, dict |
| 条件判断 | 熟练 | if/elif/else |
| 循环 | 熟练 | for循环、while循环 |
| 函数定义 | 熟练 | def、参数、返回值 |
| 类和对象 | 基本了解 | class、__init__、self、方法 |
| 模块导入 | 基本了解 | import语句、from...import |
| 文件操作 | 了解即可 | open()、read/write |
| 异常处理 | 了解即可 | try/except |

**推荐学习资源：**
- [Python3 菜鸟教程](https://www.runoob.com/python3/python3-tutorial.html) -- 中文，适合零基础
- [Python官方教程](https://docs.python.org/zh-cn/3/tutorial/) -- 中文版官方文档
- B站搜索 "Python 入门教程" -- 视频学习

### 2. 计算机基本操作
- 能够使用命令行（CMD/PowerShell/Terminal）
- 了解文件路径的概念（绝对路径 vs 相对路径）
- 能够安装软件和配置环境变量

### 3. 英文阅读能力
- 能够阅读简单的英文技术文档和错误信息
- 能够使用英文关键词搜索技术问题

## 加分项 | Nice-to-Have (Not Required)

以下知识不是必需的，但有基础会学得更快：

The following are not required but will help you progress faster:

| 知识 | 加分点 |
|------|--------|
| 像素画基础 | 能够自己绘制角色素材 |
| Git基础 | 能够使用版本管理代码 |
| 其他编程语言经验 | 理解编程通用概念 |
| 数学坐标系知识 | 理解窗口坐标系统 |

## 自学检查清单 | Self-Study Checklist

在Day 1之前，请尝试完成以下练习：

Before Day 1, try completing these exercises:

### 检查1：基础语法
```python
# 请在Python中运行以下代码，理解每一行的含义
name = "桌宠"
age = 1
if age > 0:
    print(f"{name}今年{age}岁了")
for i in range(3):
    print(f"第{i+1}次说你好！")
```

### 检查2：函数定义
```python
# 请定义一个函数，输入宠物名字，返回问候语
def greet(pet_name):
    return f"你好，我是{pet_name}！"

print(greet("萌萌"))
```

### 检查3：类的基本使用
```python
# 请理解以下类的定义和使用
class Pet:
    def __init__(self, name):
        self.name = name
        self.mood = "开心"

    def say_hello(self):
        return f"我是{self.name}，我现在很{self.mood}"

my_pet = Pet("萌萌")
print(my_pet.say_hello())
```

### 检查4：命令行操作
```bash
# 请在命令行中完成以下操作
# 1. 创建一个文件夹
mkdir my_pet_project
# 2. 进入文件夹
cd my_pet_project
# 3. 运行一个Python脚本
python -c "print('Hello, PetDesk!')"
```

### 检查5：安装Python包
```bash
# 请尝试安装PyQt5
pip install PyQt5
# 验证安装
python -c "import PyQt5; print('PyQt5 installed successfully')"
```

## 如果你还没有准备好 | If You're Not Ready Yet

不要担心！以下是加速学习的建议：

Don't worry! Here are suggestions to catch up:

1. **Python零基础**：花1-2天集中学习Python基础语法（推荐B站小甲鱼Python教程）
2. **命令行不熟悉**：花2-3小时学习基本的命令行操作
3. **安装Python有困难**：Day 1的课程会详细指导环境配置

## 学习时间估算 | Time Estimate

| 学员水平 | 前置知识准备时间 |
|----------|-----------------|
| 有编程基础（学过其他语言） | 2-4小时 |
| 有Python基础 | 0小时（可以直接开始） |
| 完全零基础 | 2-3天集中学习 |

*最后更新：2026-05-26*
