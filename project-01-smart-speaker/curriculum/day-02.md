# Day 2: Python 温故知新 | Python Refresher

## 学习目标 | Learning Objectives

- 复习 Python 核心语法和数据结构
- 掌握 pip 包管理和虚拟环境使用
- 学习 Python 模块和包的组织方式
- 编写模块化的 Python 代码

> Review core Python syntax and data structures; master pip package management and virtual environments; learn Python module and package organization; write modular Python code.

## 前置准备检查 | Prerequisites Check

- [ ] 树莓派已正常启动
- [ ] 虚拟环境已激活
- [ ] 已完成 Day 1 的所有任务

---

## 为什么学这个 | Why Learn This

**真实世界应用：** Python 是 AI 和数据科学领域最流行的编程语言。几乎所有主流 AI 框架（PyTorch、TensorFlow）和库（OpenAI API、Whisper）都使用 Python 接口。掌握 Python 是进入 AI 领域的必备技能。

> **Real-world application:** Python is the most popular programming language in AI and data science. Almost all mainstream AI frameworks (PyTorch, TensorFlow) and libraries (OpenAI API, Whisper) use Python interfaces. Mastering Python is an essential skill for entering the AI field.

---

## 任务一：Python 基础复习 | Task 1: Python Basics Review

### 步骤 1：数据类型练习

创建文件 `src/datatypes_practice.py`：

```python
"""
Python 数据类型练习
练习变量、列表、字典的基本操作
"""

def practice_strings():
    """字符串操作"""
    name = "小智同学"
    greeting = f"你好，我是{name}"
    print(greeting)
    print(f"字符串长度: {len(name)}")

def practice_lists():
    """列表操作"""
    # 创建一个设备列表
    devices = ["麦克风", "喇叭", "树莓派"]

    # 添加元素
    devices.append("USB线")

    # 遍历列表
    print("\n我的硬件清单:")
    for i, device in enumerate(devices, 1):
        print(f"{i}. {device}")

    # 列表切片
    print(f"\n前两个设备: {devices[:2]}")

def practice_dictionaries():
    """字典操作"""
    # 创建配置字典
    config = {
        "sample_rate": 16000,
        "channels": 1,
        "wake_word": "小智",
        "language": "zh-CN"
    }

    # 访问字典值
    print(f"\n采样率: {config['sample_rate']} Hz")

    # 添加新的配置
    config["volume"] = 0.8

    # 遍历字典
    print("\n配置信息:")
    for key, value in config.items():
        print(f"  {key}: {value}")

if __name__ == "__main__":
    practice_strings()
    practice_lists()
    practice_dictionaries()
```

运行测试：
```bash
python src/datatypes_practice.py
```

### 步骤 2：控制结构练习

创建文件 `src/controlflow_practice.py`：

```python
"""
Python 控制结构练习
练习条件判断和循环
"""

def check_audio_device(sample_rate):
    """检查音频设备采样率是否合适"""
    if sample_rate >= 44100:
        return "高音质"
    elif sample_rate >= 16000:
        return "语音识别推荐"
    else:
        return "音质较低"

def find_optimal_sample_rate():
    """找到最佳采样率"""
    sample_rates = [8000, 16000, 44100, 48000]

    print("采样率测试:")
    for rate in sample_rates:
        quality = check_audio_device(rate)
        print(f"  {rate} Hz: {quality}")

def simulate_wake_word_detection():
    """模拟唤醒词检测"""
    attempts = 0
    max_attempts = 3

    print("\n唤醒词检测模拟:")

    while attempts < max_attempts:
        attempts += 1
        print(f"  第 {attempts} 次尝试...")

        # 模拟检测成功
        if attempts == 2:
            print("  ✓ 检测到唤醒词！")
            break
    else:
        print("  × 未检测到唤醒词")

if __name__ == "__main__":
    find_optimal_sample_rate()
    simulate_wake_word_detection()
```

运行测试：
```bash
python src/controlflow_practice.py
```

### 预期结果 | Expected Result

- 两个练习文件都能正常运行
- 理解字符串格式化（f-string）
- 理解列表和字典的常用操作
- 理解 if/else 和 for/while 循环

### 常见问题 | Common Issues

**Q: f-string 报错？**
A: 确保使用 Python 3.6+ 版本。检查 `python3 --version`。

**Q: enumerate 是什么？**
A: `enumerate()` 可以同时获取索引和值，非常实用。

---

## 任务二：函数和模块化 | Task 2: Functions and Modularity

### 步骤 1：创建工具模块

创建文件 `src/audio_utils.py`：

```python
"""
音频工具模块
包含音频相关的辅助函数
"""

def calculate_audio_duration(samples, sample_rate):
    """
    计算音频时长

    Args:
        samples: 采样点数量
        sample_rate: 采样率（Hz）

    Returns:
        时长（秒）
    """
    return samples / sample_rate

def format_duration(seconds):
    """
    格式化时长显示

    Args:
        seconds: 秒数

    Returns:
        格式化的时长字符串 (如 "1:23")
    """
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{minutes}:{secs:02d}"

def validate_audio_config(config):
    """
    验证音频配置是否有效

    Args:
        config: 配置字典

    Returns:
        (is_valid, error_message)
    """
    required_keys = ["sample_rate", "channels"]

    for key in required_keys:
        if key not in config:
            return False, f"缺少必要配置: {key}"

    if config["sample_rate"] not in [8000, 16000, 44100, 48000]:
        return False, f"不支持的采样率: {config['sample_rate']}"

    if config["channels"] not in [1, 2]:
        return False, f"不支持的声道数: {config['channels']}"

    return True, "配置有效"

# 模块常量
DEFAULT_SAMPLE_RATE = 16000
DEFAULT_CHANNELS = 1
```

### 步骤 2：使用工具模块

创建文件 `src/test_audio_utils.py`：

```python
"""
测试音频工具模块
演示如何导入和使用自定义模块
"""

# 从同一目录导入模块
from audio_utils import (
    calculate_audio_duration,
    format_duration,
    validate_audio_config,
    DEFAULT_SAMPLE_RATE
)

def test_duration_calculation():
    """测试时长计算"""
    print("=== 时长计算测试 ===")

    # 假设我们录制了 16000 个采样点，采样率 16000Hz
    samples = 16000
    sample_rate = 16000

    duration = calculate_audio_duration(samples, sample_rate)
    formatted = format_duration(duration)

    print(f"采样点: {samples}")
    print(f"采样率: {sample_rate} Hz")
    print(f"时长: {formatted}")

def test_config_validation():
    """测试配置验证"""
    print("\n=== 配置验证测试 ===")

    # 测试有效配置
    valid_config = {
        "sample_rate": 16000,
        "channels": 1
    }
    is_valid, message = validate_audio_config(valid_config)
    print(f"配置1: {message}")

    # 测试无效配置
    invalid_config = {
        "sample_rate": 12000,  # 不支持的采样率
        "channels": 1
    }
    is_valid, message = validate_audio_config(invalid_config)
    print(f"配置2: {message}")

    # 测试缺少配置
    incomplete_config = {
        "sample_rate": 16000
        # 缺少 channels
    }
    is_valid, message = validate_audio_config(incomplete_config)
    print(f"配置3: {message}")

def test_module_constants():
    """测试模块常量"""
    print(f"\n默认采样率: {DEFAULT_SAMPLE_RATE} Hz")

if __name__ == "__main__":
    test_duration_calculation()
    test_config_validation()
    test_module_constants()
```

运行测试：
```bash
python src/test_audio_utils.py
```

### 预期结果 | Expected Result

- 模块导入成功
- 所有测试函数正常运行
- 理解 `import` 和 `from...import` 的区别

### 常见问题 | Common Issues

**Q: 导入模块时报错 ModuleNotFoundError？**
A: 确保文件在同一目录，并且运行时使用 `python src/test_audio_utils.py` 而不是 `python test_audio_utils.py`。

**Q: 什么是 `if __name__ == "__main__":`？**
A: 这是一个 Python 惯用法，确保代码只在直接运行文件时执行，而被导入时不执行。

---

## 任务三：异常处理和文件操作 | Task 3: Exception Handling and File Operations

### 步骤 1：创建配置管理模块

创建文件 `src/config_manager.py`：

```python
"""
配置管理模块
演示文件操作和异常处理
"""
import yaml
import os

def load_config(config_path):
    """
    加载配置文件

    Args:
        config_path: 配置文件路径

    Returns:
        配置字典，失败返回 None
    """
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = yaml.safe_load(f)
        return config

    except FileNotFoundError:
        print(f"错误: 配置文件不存在: {config_path}")
        return None

    except yaml.YAMLError as e:
        print(f"错误: YAML 格式错误: {e}")
        return None

    except Exception as e:
        print(f"未知错误: {e}")
        return None

def save_config(config, config_path):
    """
    保存配置到文件

    Args:
        config: 配置字典
        config_path: 保存路径

    Returns:
        是否成功
    """
    try:
        # 确保目录存在
        os.makedirs(os.path.dirname(config_path), exist_ok=True)

        with open(config_path, 'w', encoding='utf-8') as f:
            yaml.dump(config, f, allow_unicode=True)

        return True

    except Exception as e:
        print(f"保存配置失败: {e}")
        return False

def get_default_config():
    """
    获取默认配置

    Returns:
        默认配置字典
    """
    return {
        "audio": {
            "sample_rate": 16000,
            "channels": 1,
            "chunk_size": 1024
        },
        "stt": {
            "model": "tiny",
            "language": "zh"
        },
        "tts": {
            "voice": "zh-CN-XiaoxiaoNeural",
            "rate": "+0%"
        },
        "llm": {
            "api_key": "your-api-key-here",
            "model": "deepseek-chat",
            "temperature": 0.7
        }
    }
```

### 步骤 2：测试配置管理

创建文件 `src/test_config.py`：

```python
"""
测试配置管理模块
"""
from config_manager import load_config, save_config, get_default_config

def test_config_operations():
    """测试配置操作"""
    print("=== 配置管理测试 ===\n")

    # 1. 获取默认配置
    print("1. 创建默认配置...")
    config = get_default_config()
    print(f"   配置创建成功，采样率: {config['audio']['sample_rate']}")

    # 2. 保存配置
    config_path = "config_test.yaml"
    print(f"\n2. 保存配置到 {config_path}...")
    if save_config(config, config_path):
        print("   ✓ 保存成功")
    else:
        print("   × 保存失败")

    # 3. 加载配置
    print(f"\n3. 从 {config_path} 加载配置...")
    loaded_config = load_config(config_path)
    if loaded_config:
        print("   ✓ 加载成功")
        print(f"   采样率: {loaded_config['audio']['sample_rate']}")
        print(f"   模型: {loaded_config['stt']['model']}")
    else:
        print("   × 加载失败")

    # 4. 测试加载不存在的文件
    print("\n4. 测试错误处理（加载不存在的文件）...")
    result = load_config("nonexistent.yaml")
    if result is None:
        print("   ✓ 错误处理正确")

if __name__ == "__main__":
    test_config_operations()
```

运行测试：
```bash
python src/test_config.py
```

### 预期结果 | Expected Result

- 配置文件成功创建和保存
- 加载配置成功
- 错误处理正确工作
- 生成 `config_test.yaml` 文件

### 常见问题 | Common Issues

**Q: yaml 模块导入失败？**
A: 安装 PyYAML：`pip install pyyaml`

**Q: 为什么要用 with 语句？**
A: `with` 语句会自动管理文件资源，确保文件正确关闭，即使发生异常。

---

## 今日作业 | Today's Assignment

1. **完成所有练习**（必须）
   - 运行所有测试文件并截图

2. **编写自己的模块**（必须）
   - 创建 `src/math_utils.py` 模块
   - 包含至少 3 个数学相关的函数
   - 编写测试文件验证功能

3. **调试练习**（可选）
   - 故意在代码中制造错误
   - 使用 try/except 捕获并处理错误
   - 打印有用的错误信息

---

## 明日预告 | Preview of Tomorrow

明天我们将进入音频世界！你将学习声音是如何被数字化和存储的，并编写代码录制和播放你的第一段音频。

> Tomorrow we enter the world of audio! You will learn how sound is digitized and stored, and write code to record and play your first audio clip.

---

## 参考资源 | References

- **Python 官方教程**：https://docs.python.org/zh-cn/3/tutorial/
- **Python 异常处理**：https://docs.python.org/3/tutorial/errors.html
- **PyYAML 文档**：https://pyyaml.org/wiki/PyYAMLDocumentation

---

*预计完成时间：4-6 小时*
*Estimated completion time: 4-6 hours*
