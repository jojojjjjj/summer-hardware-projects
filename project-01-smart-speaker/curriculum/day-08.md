# Day 8: 优化与调试 | Optimization and Debugging

## 学习目标 | Learning Objectives

- 学习系统性能优化方法
- 掌握常见错误的调试技巧
- 实现日志记录和错误处理
- 优化响应延迟和内存使用

> Learn system performance optimization methods; master debugging techniques for common errors; implement logging and error handling; optimize response latency and memory usage.

## 前置准备检查 | Prerequisites Check

- [ ] MVP 已经可以运行
- [ ] 能够进行基本的语音对话
- [ ] 已完成 Day 7 的作业

---

## 为什么学这个 | Why Learn This

**真实世界应用：** 完成功能只是第一步，优化和调试才能让产品真正可用。在生产环境中，性能优化和错误处理与功能开发同样重要。

> **Real-world application:** Completing functionality is just the first step; optimization and debugging make the product truly usable. In production environments, performance optimization and error handling are as important as feature development.

---

## 任务一：性能分析 | Task 1: Performance Analysis

### 步骤 1：创建性能分析工具

创建文件 `src/performance_monitor.py`：

```python
"""
性能监控工具
"""
import time
import functools
from collections import defaultdict

class PerformanceMonitor:
    """性能监控器"""

    def __init__(self):
        self.metrics = defaultdict(list)

    def time_it(self, name):
        """装饰器：测量函数执行时间"""
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                start = time.time()
                result = func(*args, **kwargs)
                elapsed = time.time() - start
                self.metrics[name].append(elapsed)
                return result
            return wrapper
        return decorator

    def measure(self, name):
        """上下文管理器：测量代码块执行时间"""
        class Timer:
            def __init__(self, monitor, name):
                self.monitor = monitor
                self.name = name
                self.start = None

            def __enter__(self):
                self.start = time.time()
                return self

            def __exit__(self, *args):
                elapsed = time.time() - self.start
                self.monitor.metrics[self.name].append(elapsed)

        return Timer(self, name)

    def get_stats(self, name=None):
        """获取统计信息"""
        if name:
            times = self.metrics.get(name, [])
        else:
            return {k: self._calc_stats(v) for k, v in self.metrics.items()}

        return self._calc_stats(times)

    def _calc_stats(self, times):
        """计算统计数据"""
        if not times:
            return {}

        return {
            "count": len(times),
            "min": min(times),
            "max": max(times),
            "avg": sum(times) / len(times),
            "total": sum(times)
        }

    def print_report(self):
        """打印性能报告"""
        print("\n=== 性能报告 ===")

        stats = self.get_stats()
        for name, data in stats.items():
            if data:
                print(f"\n{name}:")
                print(f"  调用次数: {data['count']}")
                print(f"  平均时间: {data['avg']:.3f}秒")
                print(f"  最小时间: {data['min']:.3f}秒")
                print(f"  最大时间: {data['max']:.3f}秒")
                print(f"  总时间: {data['total']:.3f}秒")

# 使用示例
monitor = PerformanceMonitor()

@monitor.time_it("test_function")
def test_function():
    time.sleep(0.1)
```

### 步骤 2：集成性能监控

更新 `src/main.py`，添加性能监控：

```python
from performance_monitor import PerformanceMonitor

class SmartSpeaker:
    def __init__(self, config):
        # ... 原有代码 ...
        self.perf_monitor = PerformanceMonitor()

    def listen(self, duration=5):
        with self.perf_monitor.measure("listen"):
            # ... 原有代码 ...

    def think(self, text):
        with self.perf_monitor.measure("think"):
            # ... 原有代码 ...

    def speak(self, text):
        with self.perf_monitor.measure("speak"):
            # ... 原有代码 ...

    def print_performance_report(self):
        """打印性能报告"""
        self.perf_monitor.print_report()
```

### 预期结果 | Expected Result

- 能够测量各模块的执行时间
- 识别性能瓶颈

---

## 任务二：延迟优化 | Task 2: Latency Optimization

### 步骤 1：模型预热

Whisper 模型首次运行较慢，创建预热功能：

```python
class SpeechToText:
    def __init__(self, model_size="tiny", language="zh"):
        # ... 原有代码 ...
        self.warmed_up = False

    def warm_up(self):
        """预热模型"""
        if not self.warmed_up and self.model:
            print("正在预热模型...")
            # 创建一个虚拟音频文件
            dummy_audio = numpy.zeros(16000)  # 1秒静音
            # 运行一次识别
            _ = self.model.transcribe(dummy_audio)
            self.warmed_up = True
            print("✓ 模型预热完成")
```

### 步骤 2：异步处理

使用异步提高响应速度：

```python
import asyncio
import threading

class SmartSpeaker:
    def __init__(self, config):
        # ... 原有代码 ...

    def think_async(self, text, callback):
        """异步思考"""
        def _think():
            response = self.chat.chat(text)
            callback(response)

        thread = threading.Thread(target=_think)
        thread.start()

    def run_async(self):
        """异步运行"""
        user_text = self.listen()

        if user_text:
            # 立即开始播放确认音
            self.play_acknowledgment()

            # 异步处理
            def on_response(response):
                self.speak(response)

            self.think_async(user_text, on_response)
```

---

## 任务三：错误处理和日志 | Task 3: Error Handling and Logging

### 步骤 1：创建日志系统

创建文件 `src/logger.py`：

```python
"""
日志系统
"""
import logging
import os
from datetime import datetime

class Logger:
    """日志管理器"""

    def __init__(self, name="xiaozhi", log_dir="logs"):
        """初始化日志"""
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.DEBUG)

        # 确保日志目录存在
        os.makedirs(log_dir, exist_ok=True)

        # 文件处理器
        log_file = os.path.join(
            log_dir,
            f"{name}_{datetime.now().strftime('%Y%m%d')}.log"
        )
        file_handler = logging.FileHandler(log_file, encoding='utf-8')
        file_handler.setLevel(logging.DEBUG)

        # 控制台处理器
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)

        # 格式化
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)

        # 添加处理器
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)

    def debug(self, message):
        """调试日志"""
        self.logger.debug(message)

    def info(self, message):
        """信息日志"""
        self.logger.info(message)

    def warning(self, message):
        """警告日志"""
        self.logger.warning(message)

    def error(self, message):
        """错误日志"""
        self.logger.error(message)

    def exception(self, message):
        """异常日志"""
        self.logger.exception(message)

# 全局日志实例
logger = Logger()
```

### 步骤 2：集成错误处理

更新 `src/main.py`：

```python
from logger import logger

class SmartSpeaker:
    def listen(self, duration=5):
        """听取用户语音（带错误处理）"""
        try:
            logger.info("开始录音")
            # ... 录音代码 ...
            logger.info(f"录音完成，识别结果: {text}")
            return text

        except Exception as e:
            logger.error(f"录音失败: {e}")
            return None

    def think(self, text):
        """思考并生成回复（带错误处理）"""
        try:
            logger.info(f"处理用户输入: {text}")
            # ... 思考代码 ...
            logger.info(f"生成回复: {response}")
            return response

        except Exception as e:
            logger.error(f"对话失败: {e}")
            return "抱歉，我遇到了一些问题"

    def speak(self, text):
        """朗读回复（带错误处理）"""
        try:
            logger.info(f"开始朗读: {text}")
            # ... 朗读代码 ...
            logger.info("朗读完成")

        except Exception as e:
            logger.error(f"朗读失败: {e}")
```

---

## 任务四：常见问题排查 | Task 4: Troubleshooting Common Issues

### 创建诊断脚本

创建文件 `src/diagnose.py`：

```python
"""
系统诊断工具
"""
import os
import sys
import sounddevice as sd
import torch

def check_python_version():
    """检查 Python 版本"""
    print("=== Python 版本 ===")
    version = sys.version_info
    print(f"Python {version.major}.{version.minor}.{version.micro}")

    if version >= (3, 8):
        print("✓ 版本符合要求")
        return True
    else:
        print("✗ 版本过低，需要 3.8+")
        return False

def check_audio_devices():
    """检查音频设备"""
    print("\n=== 音频设备 ===")

    devices = sd.query_devices()
    print(f"找到 {len(devices)} 个音频设备")

    has_input = False
    has_output = False

    for i, device in enumerate(devices):
        if device['max_input_channels'] > 0:
            print(f"✓ 输入设备 {i}: {device['name']}")
            has_input = True
        if device['max_output_channels'] > 0:
            print(f"✓ 输出设备 {i}: {device['name']}")
            has_output = True

    return has_input and has_output

def check_dependencies():
    """检查依赖包"""
    print("\n=== 依赖包 ===")

    packages = [
        'whisper',
        'edge_tts',
        'openai',
        'pygame',
        'yaml'
    ]

    all_ok = True
    for package in packages:
        try:
            __import__(package)
            print(f"✓ {package}")
        except ImportError:
            print(f"✗ {package} 未安装")
            all_ok = False

    return all_ok

def check_gpu():
    """检查 GPU"""
    print("\n=== GPU 检查 ===")

    if torch.cuda.is_available():
        print(f"✓ 检测到 GPU: {torch.cuda.get_device_name(0)}")
        return True
    else:
        print("ℹ 未检测到 GPU，将使用 CPU")
        return True

def check_disk_space():
    """检查磁盘空间"""
    print("\n=== 磁盘空间 ===")

    import shutil
    total, used, free = shutil.disk_usage("/")

    total_gb = total // (1024**3)
    used_gb = used // (1024**3)
    free_gb = free // (1024**3)

    print(f"总空间: {total_gb} GB")
    print(f"已使用: {used_gb} GB")
    print(f"可用: {free_gb} GB")

    if free_gb < 2:
        print("✗ 磁盘空间不足")
        return False
    else:
        print("✓ 磁盘空间充足")
        return True

def run_diagnosis():
    """运行完整诊断"""
    print("小智同学系统诊断")
    print("=" * 50)

    checks = [
        check_python_version,
        check_audio_devices,
        check_dependencies,
        check_gpu,
        check_disk_space
    ]

    results = [check() for check in checks]

    print("\n" + "=" * 50)
    if all(results):
        print("✓ 所有检查通过")
    else:
        print("✗ 部分检查失败，请解决问题")

    return all(results)

if __name__ == "__main__":
    run_diagnosis()
```

---

## 今日作业 | Today's Assignment

1. **性能优化**（必须）
   - 运行性能监控
   - 识别并优化至少一个瓶颈
   - 记录优化前后的对比数据

2. **错误处理**（必须）
   - 为所有模块添加错误处理
   - 运行诊断脚本
   - 修复发现的问题

3. **日志分析**（可选）
   - 运行程序并收集日志
   - 分析日志找出潜在问题

---

## 明日预告 | Preview of Tomorrow

明天我们将添加唤醒词功能！这样小智同学就可以一直待机，只在听到"小智同学"时才激活，就像真正的智能音箱。

> Tomorrow we will add wake word detection! This allows Xiao Zhi to stay standby and only activate when hearing "Xiao Zhi", just like a real smart speaker.

---

## 参考资源 | References

- **Python 日志教程**：https://docs.python.org/3/howto/logging.html
- **Python 性能优化**：https://wiki.python.org/moin/PythonSpeed/PerformanceTips

---

*预计完成时间：5-7 小时*
*Estimated completion time: 5-7 hours*
