# Day 11: 功能扩展 | Feature Extensions

## 学习目标 | Learning Objectives

- 为智能音箱添加实用功能
- 学习如何集成外部 API
- 实现插件化架构
- 优化用户交互体验

> Add practical features to the smart speaker; learn how to integrate external APIs; implement plugin architecture; optimize user interaction experience.

## 前置准备检查 | Prerequisites Check

- [ ] 硬件组装完成
- [ ] MVP 稳定运行
- [ ] 已完成 Day 10 的测试

---

## 为什么学这个 | Why Learn This

**真实世界应用：** 一个成功的智能音箱需要丰富的功能。通过添加实用功能，你可以学到如何设计模块化、可扩展的软件架构。

> **Real-world application:** A successful smart speaker needs rich features. By adding practical features, you learn how to design modular, extensible software architecture.

---

## 任务一：插件系统设计 | Task 1: Plugin System Design

### 步骤 1：创建插件基类

创建文件 `src/plugins/base_plugin.py`：

```python
"""
插件基类
"""
from abc import ABC, abstractmethod

class BasePlugin(ABC):
    """插件基类"""

    def __init__(self, name):
        """初始化"""
        self.name = name
        self.enabled = True

    @abstractmethod
    def get_commands(self):
        """返回插件支持的命令列表"""
        pass

    @abstractmethod
    def handle_command(self, command, params):
        """处理命令"""
        pass

    @abstractmethod
    def get_help(self):
        """返回帮助信息"""
        pass

    def is_enabled(self):
        """是否启用"""
        return self.enabled

    def enable(self):
        """启用插件"""
        self.enabled = True

    def disable(self):
        """禁用插件"""
        self.enabled = False
```

### 步骤 2：创建插件管理器

创建文件 `src/plugins/plugin_manager.py`：

```python
"""
插件管理器
"""
import importlib
import os
from .base_plugin import BasePlugin

class PluginManager:
    """插件管理器"""

    def __init__(self):
        """初始化"""
        self.plugins = []

    def load_plugin(self, plugin_class):
        """加载插件"""
        try:
            plugin = plugin_class()
            self.plugins.append(plugin)
            print(f"✓ 加载插件: {plugin.name}")
            return True
        except Exception as e:
            print(f"✗ 加载插件失败: {e}")
            return False

    def get_all_commands(self):
        """获取所有命令"""
        commands = {}

        for plugin in self.plugins:
            if plugin.is_enabled():
                for cmd in plugin.get_commands():
                    commands[cmd] = plugin

        return commands

    def handle_command(self, command, params):
        """处理命令"""
        commands = self.get_all_commands()

        if command in commands:
            plugin = commands[command]
            return plugin.handle_command(command, params)

        return None

    def get_all_help(self):
        """获取所有帮助信息"""
        help_text = ""

        for plugin in self.plugins:
            if plugin.is_enabled():
                help_text += f"\n{plugin.name}:\n"
                help_text += plugin.get_help()
                help_text += "\n"

        return help_text
```

---

## 任务二：实用功能插件 | Task 2: Practical Feature Plugins

### 插件 1：时间功能

创建文件 `src/plugins/time_plugin.py`：

```python
"""
时间功能插件
"""
from datetime import datetime
from .base_plugin import BasePlugin

class TimePlugin(BasePlugin):
    """时间插件"""

    def __init__(self):
        super().__init__("时间功能")

    def get_commands(self):
        """支持的命令"""
        return ["现在几点", "今天几号", "现在时间", "今天日期"]

    def handle_command(self, command, params):
        """处理命令"""
        now = datetime.now()

        if "几点" in command or "时间" in command:
            time_str = now.strftime("%H点%M分")
            return f"现在是{time_str}"

        elif "几号" in command or "日期" in command:
            date_str = now.strftime("%Y年%m月%d日")
            weekday = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
            return f"今天是{date_str}，{weekday[now.weekday()]}"

        return "抱歉，我不理解"

    def get_help(self):
        """帮助信息"""
        return """
        - 现在几点 / 现在时间：查询当前时间
        - 今天几号 / 今天日期：查询当前日期
        """
```

### 插件 2：计算功能

创建文件 `src/plugins/calculator_plugin.py`：

```python
"""
计算器插件
"""
import re
from .base_plugin import BasePlugin

class CalculatorPlugin(BasePlugin):
    """计算器插件"""

    def __init__(self):
        super().__init__("计算器")

    def get_commands(self):
        """支持的命令"""
        return ["计算", "等于", "加", "减", "乘", "除"]

    def handle_command(self, command, params):
        """处理命令"""
        try:
            # 提取数学表达式
            # 例如："计算 3 加 5" 或 "3 + 5"

            # 中文数字转换
            expr = command
            expr = expr.replace("加", "+")
            expr = expr.replace("减", "-")
            expr = expr.replace("乘", "*")
            expr = expr.replace("除", "/")
            expr = expr.replace("等于", "=")

            # 提取表达式
            match = re.search(r'([\d+\-*/().\s]+)', expr)

            if match:
                expr = match.group(1)
                result = eval(expr)
                return f"计算结果是{result}"
            else:
                return "请提供要计算的表达式"

        except Exception as e:
            return "计算出错，请检查表达式"

    def get_help(self):
        """帮助信息"""
        return """
        - 计算 3 加 5：执行加法
        - 计算 10 减 3：执行减法
        - 计算 4 乘 6：执行乘法
        - 计算 20 除 4：执行除法
        """
```

### 插件 3：天气功能（需要 API）

创建文件 `src/plugins/weather_plugin.py`：

```python
"""
天气功能插件
"""
import requests
from .base_plugin import BasePlugin

class WeatherPlugin(BasePlugin):
    """天气插件"""

    def __init__(self, api_key=None):
        super().__init__("天气查询")
        self.api_key = api_key or "your-api-key"
        self.base_url = "http://api.openweathermap.org/data/2.5/weather"

    def get_commands(self):
        """支持的命令"""
        return ["天气", "气温", "温度"]

    def handle_command(self, command, params):
        """处理命令"""
        if not self.api_key or self.api_key == "your-api-key":
            return "天气功能需要配置 API Key"

        try:
            # 简单实现：查询默认城市
            # 实际应用中可以从 command 中提取城市名

            response = requests.get(
                self.base_url,
                params={
                    "q": "Beijing",  # 默认北京
                    "appid": self.api_key,
                    "units": "metric",
                    "lang": "zh_cn"
                }
            )

            data = response.json()

            if response.status_code == 200:
                temp = data["main"]["temp"]
                desc = data["weather"][0]["description"]
                return f"北京今天{desc}，气温{temp}度"
            else:
                return "无法获取天气信息"

        except Exception as e:
            return f"查询天气出错: {e}"

    def get_help(self):
        """帮助信息"""
        return """
        - 北京天气：查询北京天气
        - 上海气温：查询上海气温
        """
```

---

## 任务三：集成插件系统 | Task 3: Integrate Plugin System

### 更新主程序

更新 `src/main.py`：

```python
from plugins.plugin_manager import PluginManager
from plugins.time_plugin import TimePlugin
from plugins.calculator_plugin import CalculatorPlugin
from plugins.weather_plugin import WeatherPlugin

class SmartSpeaker:
    def __init__(self, config):
        # ... 原有代码 ...

        # 初始化插件系统
        self.plugin_manager = PluginManager()
        self._load_plugins(config)

    def _load_plugins(self, config):
        """加载插件"""
        print("加载插件...")

        # 加载内置插件
        self.plugin_manager.load_plugin(TimePlugin)
        self.plugin_manager.load_plugin(CalculatorPlugin)

        # 天气插件需要 API Key
        weather_key = config.get('plugins.weather_api_key')
        if weather_key and weather_key != 'your-api-key':
            weather_plugin = WeatherPlugin(api_key=weather_key)
            self.plugin_manager.load_plugin(lambda: weather_plugin)

        print(f"已加载 {len(self.plugin_manager.plugins)} 个插件")

    def think(self, text):
        """思考并生成回复"""
        # 首先检查是否有插件可以处理
        plugin_result = self.plugin_manager.handle_command(text, None)

        if plugin_result:
            return plugin_result

        # 没有插件处理，使用 AI
        # ... 原 AI 对话代码 ...
```

---

## 任务四：更多创意功能 | Task 4: More Creative Features

### 功能 1：记事本

```python
class NotesPlugin(BasePlugin):
    """记事本插件"""

    def __init__(self):
        super().__init__("记事本")
        self.notes = []

    def get_commands(self):
        return ["记下来", "我的笔记", "清空笔记"]

    def handle_command(self, command, params):
        if "记下来" in command:
            # 提取要记录的内容
            content = command.replace("记下来", "").strip()
            self.notes.append(content)
            return f"已记下：{content}"

        elif "我的笔记" in command:
            if self.notes:
                return "你的笔记有：" + "，".join(self.notes)
            else:
                return "你还没有任何笔记"

        elif "清空笔记" in command:
            self.notes.clear()
            return "笔记已清空"
```

### 功能 2：笑话

```python
class JokePlugin(BasePlugin):
    """笑话插件"""

    def __init__(self):
        super().__init__("笑话")
        self.jokes = [
            "为什么程序员总是混淆圣诞节和万圣节？因为 Oct 31 等于 Dec 25。",
            "一个 SQL 语句走进一家酒吧，走到两张桌子中间，问：我可以 join 你们吗？",
            "程序员最讨厌的四个字：'在我机器上能运行'。"
        ]

    def get_commands(self):
        return ["讲个笑话", "来个笑话"]

    def handle_command(self, command, params):
        import random
        return random.choice(self.jokes)
```

---

## 今日作业 | Today's Assignment

1. **完成插件系统**（必须）
   - 实现插件管理器
   - 实现至少 3 个插件
   - 测试插件功能

2. **创意功能**（必须）
   - 设计并实现一个自己的插件
   - 功能要实用或有趣

3. **文档编写**（可选）
   - 为插件编写使用说明
   - 创建插件开发指南

---

## 明日预告 | Preview of Tomorrow

明天是项目的最后一天！我们将进行最终优化、演示准备，并完成所有文档。

> Tomorrow is the final day of the project! We will do final optimization, prepare for demonstration, and complete all documentation.

---

## 参考资源 | References

- **Python ABC 模块**：https://docs.python.org/3/library/abc.html
- **OpenWeatherMap API**：https://openweathermap.org/api

---

*预计完成时间：6-8 小时*
*Estimated completion time: 6-8 hours*
