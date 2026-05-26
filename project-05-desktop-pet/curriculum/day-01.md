# Day 01: 项目启动与Python GUI入门 | Project Launch & Python GUI Basics

> **今日目标:**
> - 搭建完整的开发环境（Python + PyQt5 + IDE）
> - 理解PyQt5的基本架构：应用、窗口、控件
> - 创建第一个能显示图片的桌面窗口
> - 理解信号与槽机制
>
> **产出:** 一个能显示宠物图片的PyQt5窗口程序

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 项目介绍、学员互相认识 |
| 09:15 - 10:30 | 知识讲解 | Python GUI编程概念、PyQt5架构 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 环境搭建、第一个PyQt5窗口 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 在窗口中加载和显示宠物图片 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 自定义窗口样式、尝试不同控件 |
| 16:30 - 17:00 | 总结分享 | 今日收获、遇到的问题 |

---

## 上午: 环境搭建与PyQt5基础 | Morning: Setup & PyQt5 Basics

### 为什么要学这个? | Why Learn This?

在你每天使用的电脑软件中，从浏览器到微信，从游戏到办公软件，它们都有一个共同点：都是"图形界面程序"（GUI）。而PyQt5是Python世界中最强大的GUI框架之一，它被广泛应用于工业软件、科学可视化工具、甚至NASA的地面控制站。

Almost every app you use daily -- from browsers to WeChat, from games to office software -- is a GUI application. PyQt5 is one of the most powerful GUI frameworks in the Python ecosystem, used in industrial software, scientific visualization, and even NASA ground control stations.

学习PyQt5不仅是为了做桌宠，更是掌握一项通用的软件开发技能。未来如果你想做任何有界面的程序，PyQt5都是一个可靠的选择。

Learning PyQt5 is not just about making a desktop pet -- it's a universal software development skill for any GUI application you want to build.

### 任务1.1: 搭建开发环境 (30分钟)

**步骤:**

1. **安装Python 3.10+**
   - 访问 https://www.python.org/downloads/
   - 下载最新版本的Python
   - 安装时**务必勾选**"Add Python to PATH"
   - 打开命令行，验证安装：
   ```bash
   python --version
   # 应输出 Python 3.10.x 或更高版本
   ```

2. **安装VS Code（推荐IDE）**
   - 访问 https://code.visualstudio.com/
   - 安装后，安装Python扩展（搜索"Python"，安装Microsoft官方的那个）

3. **创建项目文件夹和虚拟环境**
   ```bash
   # 创建项目文件夹
   mkdir desktop-pet
   cd desktop-pet

   # 创建虚拟环境
   python -m venv venv

   # 激活虚拟环境
   venv\Scripts\activate        # Windows
   # source venv/bin/activate   # macOS/Linux

   # 安装依赖
   pip install PyQt5 Pillow
   ```

4. **验证安装**
   ```bash
   python -c "import PyQt5; print('PyQt5 version:', PyQt5.QtCore.PYQT_VERSION_STR)"
   ```

**预期结果:**
- `python --version` 输出3.10+
- `pip install PyQt5 Pillow` 安装成功无报错
- 验证命令输出PyQt5版本号

**常见问题:**
- **"python不是内部命令"**：安装时没有勾选"Add to PATH"，重新安装或手动添加环境变量
- **pip安装超时**：使用国内镜像 `pip install PyQt5 -i https://pypi.tuna.tsinghua.edu.cn/simple`
- **权限错误**：不要用管理员权限，确认已激活虚拟环境

### 任务1.2: 第一个PyQt5窗口 (30分钟)

**步骤:**

1. 创建文件 `hello_pet.py`，输入以下代码：

```python
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel
from PyQt5.QtCore import Qt

class PetWindow(QWidget):
    """桌宠的主窗口类"""

    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        """初始化窗口界面"""
        # 设置窗口标题
        self.setWindowTitle("萌桌面 - 我的第一个桌宠")
        # 设置窗口大小和位置
        self.setGeometry(100, 100, 400, 300)
        # 设置窗口背景色
        self.setStyleSheet("background-color: #f0f0f0;")

        # 添加一个文字标签
        label = QLabel("欢迎来到萌桌面！", self)
        label.setAlignment(Qt.AlignCenter)
        label.setGeometry(50, 100, 300, 50)
        label.setStyleSheet("font-size: 24px; color: #333;")

        # 显示窗口
        self.show()

# 程序入口
if __name__ == "__main__":
    # 创建应用对象（每个PyQt5程序必须有且只有一个）
    app = QApplication(sys.argv)
    # 创建窗口
    window = PetWindow()
    # 运行事件循环（保持窗口显示）
    sys.exit(app.exec_())
```

2. 运行程序：
```bash
python hello_pet.py
```

**预期结果:**
- 弹出一个400x300像素的灰色窗口
- 窗口标题为"萌桌面 - 我的第一个桌宠"
- 窗口中央显示"欢迎来到萌桌面！"文字
- 关闭窗口后程序正常退出

**常见问题:**
- **窗口一闪而过**：确认代码最后一行是 `sys.exit(app.exec_())`
- **报错"No module named 'PyQt5'"**：虚拟环境没有激活，运行 `venv\Scripts\activate`
- **中文显示乱码**：确保文件保存为UTF-8编码

### 任务1.3: 理解PyQt5的架构 (30分钟)

**为什么要理解架构？**
写代码就像盖房子，你需要先理解建筑结构。PyQt5的架构决定了你后续所有的编程方式。

Why understand the architecture? Writing code is like building a house -- you need to understand the structure first. PyQt5's architecture determines all your future programming patterns.

**核心概念：**

```
QApplication（应用）
  └── QWidget（窗口）
        ├── QLabel（文字标签）
        ├── QPushButton（按钮）
        ├── QLineEdit（输入框）
        └── ... 其他控件
```

1. **QApplication**：整个应用程序，有且只有一个。它管理事件循环。
2. **QWidget**：所有可视化组件的基类，窗口本身就是一个QWidget。
3. **控件（Widget）**：窗口上的元素，如按钮、标签、输入框等。

**动手实验 -- 添加一个按钮：**

```python
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QPushButton
from PyQt5.QtCore import Qt

class PetWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("萌桌面 - 按钮交互")
        self.setGeometry(100, 100, 400, 300)
        self.setStyleSheet("background-color: #f0f0f0;")

        # 文字标签
        self.label = QLabel("点击按钮和我打招呼！", self)
        self.label.setAlignment(Qt.AlignCenter)
        self.label.setGeometry(50, 80, 300, 50)
        self.label.setStyleSheet("font-size: 20px; color: #333;")

        # 按钮
        btn = QPushButton("摸摸我", self)
        btn.setGeometry(150, 180, 100, 40)
        btn.setStyleSheet("""
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border-radius: 10px;
                font-size: 16px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
        """)
        # 连接按钮点击信号到槽函数
        btn.clicked.connect(self.on_button_click)

        self.show()

    def on_button_click(self):
        """当按钮被点击时执行"""
        self.label.setText("喵~ 被摸到了！开心！")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = PetWindow()
    sys.exit(app.exec_())
```

**预期结果:**
- 窗口中有一个绿色按钮"摸摸我"
- 点击按钮后，文字变成"喵~ 被摸到了！开心！"
- 鼠标悬停在按钮上时，按钮颜色变深

### 任务1.4: 信号与槽机制 (20分钟)

**为什么要学信号与槽？**
信号与槽是PyQt5处理"事件"的核心机制。简单来说：当某件事发生时（信号），自动执行某个操作（槽）。这就是GUI编程的精髓 -- "事件驱动"。

Signals and slots are PyQt5's core mechanism for handling events. When something happens (signal), automatically execute an action (slot). This is the essence of GUI programming -- "event-driven" programming.

**类比理解：**
- **信号**：门铃响了（事件发生）
- **槽**：你去开门（响应动作）
- **连接**：你把门铃和开门这个动作关联起来

**常用信号示例：**
```python
# 按钮点击
button.clicked.connect(self.handle_click)

# 鼠标进入控件
widget.enterEvent = self.on_mouse_enter

# 窗口关闭
self.closeEvent = self.on_close

# 定时器触发（Day 3会用到）
timer.timeout.connect(self.on_timer)
```

---

## 下午: 加载和显示宠物图片 | Afternoon: Load & Display Pet Images

### 任务1.5: 准备宠物素材图片 (20分钟)

**步骤:**

1. **获取素材图片**
   - 方法一：从 [Piskel](https://www.piskelapp.com/) 在线绘制简单的像素画角色
   - 方法二：从 [itch.io](https://itch.io/game-assets/free/tag-pixel-art) 下载免费像素画素材
   - 方法三：使用课程提供的默认素材（教师分发）

2. **创建素材文件夹**
   ```
   desktop-pet/
   ├── assets/
   │   └── sprites/
   │       ├── idle_01.png    # 待机帧1
   │       ├── idle_02.png    # 待机帧2
   │       └── ...
   └── hello_pet.py
   ```

3. **图片规格建议**
   - 尺寸：128x128 或 256x256 像素
   - 格式：PNG（支持透明背景）
   - 角色应居中放置，周围留透明区域

### 任务1.6: 在窗口中显示宠物图片 (30分钟)

**步骤:**

创建文件 `pet_display.py`：

```python
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import Qt

class PetWindow(QWidget):
    """桌宠窗口 -- 显示宠物图片"""

    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("萌桌面")
        self.setGeometry(100, 100, 256, 256)

        # 创建图片标签
        self.pet_label = QLabel(self)
        self.pet_label.setGeometry(0, 0, 256, 256)
        self.pet_label.setAlignment(Qt.AlignCenter)

        # 加载宠物图片
        self.load_pet_image("assets/sprites/idle_01.png")

        self.show()

    def load_pet_image(self, image_path):
        """加载并显示宠物图片"""
        pixmap = QPixmap(image_path)
        if pixmap.isNull():
            # 如果图片加载失败，显示默认文字
            self.pet_label.setText("请放入宠物图片！")
            self.pet_label.setStyleSheet("font-size: 16px; color: red;")
        else:
            # 缩放图片以适应窗口
            scaled = pixmap.scaled(
                self.pet_label.size(),
                Qt.KeepAspectRatio,
                Qt.SmoothTransformation
            )
            self.pet_label.setPixmap(scaled)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = PetWindow()
    sys.exit(app.exec_())
```

**预期结果:**
- 窗口中显示你的宠物图片
- 如果图片路径错误，显示红色提示文字

**常见问题:**
- **图片不显示**：检查文件路径是否正确，使用绝对路径测试
- **图片太大/太小**：调整`scaled()`的参数或调整窗口大小
- **图片有白色背景**：确保图片是PNG格式且背景是透明的

### 任务1.7: 让窗口大小适应图片 (20分钟)

```python
def load_pet_image(self, image_path):
    """加载宠物图片，自动调整窗口大小"""
    pixmap = QPixmap(image_path)
    if not pixmap.isNull():
        # 获取图片原始大小
        img_width = pixmap.width()
        img_height = pixmap.height()

        # 调整窗口和标签大小以适应图片
        self.resize(img_width, img_height)
        self.pet_label.resize(img_width, img_height)

        # 显示图片
        self.pet_label.setPixmap(pixmap)
```

---

## 今日作业 | Homework

### 必做题
1. 完成环境搭建，确保PyQt5能正常运行
2. 创建一个能显示宠物图片的透明窗口
3. 添加一个按钮，点击后宠物图片切换为另一张

### 挑战题
1. 尝试修改窗口的样式（背景色、大小、位置）
2. 让窗口显示在屏幕右下角（提示：使用`QDesktopWidget`获取屏幕尺寸）
3. 绘制或下载至少2张不同状态的宠物图片

### 思考题
1. PyQt5中的`app.exec_()`为什么不能省略？它做了什么事情？
2. 信号和槽的关系是什么？请用自己的话解释。

---

## 明日预告 | Tomorrow's Preview

明天我们将学习如何让桌宠窗口变得"透明"，让宠物直接"站"在桌面上，而不是在一个方块窗口里。这是桌宠项目最关键的视觉技术之一！

Tomorrow we will learn how to make the window "transparent" so the pet stands directly on the desktop instead of inside a rectangular window. This is one of the most critical visual techniques for desktop pets!

---

## 参考资源 | References

- [PyQt5 入门教程（菜鸟教程）](https://www.runoob.com/pyqt5/pyqt5-introduction.html)
- [PyQt5 官方文档](https://www.riverbankcomputing.com/static/Docs/PyQt5/)
- [Python PyQt5 教程（B站推荐搜索）](https://search.bilibili.com/all?keyword=PyQt5%20%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B)
- [用Python制作专属桌面宠物（B站）](https://www.bilibili.com/video/BV1Yr421H7SV/)

*最后更新：2026-05-26*
