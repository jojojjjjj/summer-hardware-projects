# Day 11: 系统集成与打包发布 | System Integration & Packaging

> **今日目标:**
> - 整合所有模块为一个完整的程序
> - 编写配置文件系统
> - 使用PyInstaller打包为可执行文件
> - 测试和修复集成bug
>
> **产出:** 一个完整的、可分发的桌宠程序（.exe文件）

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | AI对话功能演示 |
| 09:15 - 10:30 | 知识讲解 | 模块化架构、配置管理、打包原理 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 整合所有模块 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | PyInstaller打包 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | 测试、修复bug、优化性能 |
| 16:30 - 17:00 | 总结分享 | 集成经验讨论 |

---

## 上午: 模块整合 | Morning: Module Integration

### 为什么要学这个? | Why Learn This?

到目前为止，我们的桌宠代码分散在多个文件中：animation_manager.py、state_machine.py、dialog.py、sound_manager.py等等。今天我们要把这些"零件"组装成一个"完整的机器"。

So far, our pet code is spread across multiple files. Today we assemble these "parts" into a "complete machine".

模块整合是软件工程的核心环节。学会如何把大问题分解为小模块（然后重新组装），是每个软件工程师必须掌握的技能。这也是为什么我们从第一天就开始分开写模块，而不是把所有代码塞进一个文件。

Module integration is a core software engineering skill. Learning to decompose big problems into small modules (and reassemble them) is essential for every software engineer.

### 任务11.1: 创建主入口文件 (30分钟)

**步骤:**

创建文件 `main.py`：

```python
"""
桌宠 "萌桌面" -- 主入口文件
Desktop Pet "PetDesk" -- Main Entry Point

运行方式: python src/main.py
"""

import sys
import os
import yaml
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import Qt

# 添加当前目录到Python路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from pet import PetWindow


def load_config():
    """加载配置文件"""
    config_path = os.path.join(os.path.dirname(__file__), "..", "config.yaml")

    # 默认配置
    default_config = {
        "pet": {
            "name": "萌萌",
            "size": 200,
            "start_position": "bottom_right",
        },
        "animation": {
            "sprites_dir": "assets/sprites",
            "default_fps": 8,
        },
        "sound": {
            "enabled": True,
            "volume": 50,
            "sounds_dir": "assets/sounds",
        },
        "ai": {
            "enabled": False,
            "api_key": "",
            "base_url": "https://api.deepseek.com",
            "model": "deepseek-chat",
        },
    }

    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                user_config = yaml.safe_load(f)
            # 合并配置
            if user_config:
                _deep_merge(default_config, user_config)
        except Exception as e:
            print(f"[配置] 加载配置失败，使用默认配置: {e}")

    return default_config


def _deep_merge(base, override):
    """深度合并两个字典"""
    for key, value in override.items():
        if key in base and isinstance(base[key], dict) and isinstance(value, dict):
            _deep_merge(base[key], value)
        else:
            base[key] = value


def main():
    """程序主入口"""
    # 设置高DPI支持（Windows高分辨率屏幕适配）
    QApplication.setAttribute(Qt.AA_EnableHighDpiScaling, True)

    # 创建应用
    app = QApplication(sys.argv)
    app.setQuitOnLastWindowClosed(False)  # 关闭窗口不退出程序

    # 加载配置
    config = load_config()
    print(f"[启动] 桌宠 '{config['pet']['name']}' 启动中...")

    # 创建桌宠窗口
    pet = PetWindow(config)
    pet.show()

    print("[启动] 桌宠已就绪！")
    print("[提示] 右键点击桌宠查看菜单")

    # 运行事件循环
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
```

### 任务11.2: 统一配置管理 (20分钟)

创建配置模板 `config.template.yaml`：

```yaml
# 桌宠配置文件 | Desktop Pet Configuration
# 将此文件复制为 config.yaml 并修改

# 宠物设置
pet:
  name: "萌萌"           # 宠物名字
  size: 200              # 显示大小（像素）
  start_position: "bottom_right"  # 起始位置: bottom_right, center, random

# 动画设置
animation:
  sprites_dir: "assets/sprites"  # 素材目录
  default_fps: 8                 # 默认帧率

# 音效设置
sound:
  enabled: true          # 是否开启音效
  volume: 50             # 音量 (0-100)
  sounds_dir: "assets/sounds"

# AI对话设置（可选）
ai:
  enabled: false         # 是否开启AI对话
  api_key: ""            # API密钥
  base_url: "https://api.deepseek.com"  # API地址
  model: "deepseek-chat"  # 使用的模型
```

### 任务11.3: 模块整合测试 (30分钟)

检查清单：
- [ ] main.py能正确加载配置并启动宠物窗口
- [ ] 窗口透明无边框，宠物图片正常显示
- [ ] 帧动画系统正常工作（idle、walk、happy动画切换）
- [ ] 状态机正常运行（自动切换状态）
- [ ] 需求系统正常运行（数值随时间衰减）
- [ ] 鼠标交互正常（点击、拖拽）
- [ ] 右键菜单正常工作
- [ ] 气泡对话框正常显示
- [ ] 音效正常播放
- [ ] 粒子特效正常显示
- [ ] 物理效果正常（抛掷、反弹）
- [ ] AI对话功能正常（如已配置）

---

## 下午: 打包发布 | Afternoon: Packaging & Distribution

### 为什么要打包? | Why Package?

你在自己的电脑上运行Python脚本很正常，但如果你把.py文件发给朋友，他们需要：
1. 安装Python
2. 安装所有依赖库
3. 配置路径和资源文件
4. 在命令行中运行脚本

Running .py scripts works on your machine, but sharing with friends requires them to install Python, all dependencies, configure paths, and run from the command line.

打包成.exe后，朋友只需要双击就能运行，不需要安装任何东西。这就是"打包发布"的意义。

After packaging as .exe, friends just double-click to run -- no installation needed. That is the purpose of packaging.

### 任务11.4: 使用PyInstaller打包 (40分钟)

**步骤:**

1. **安装PyInstaller**
   ```bash
   pip install pyinstaller
   ```

2. **创建打包配置文件** `build.spec`：
   ```python
   # -*- mode: python ; coding: utf-8 -*-
   # PyInstaller配置文件

   a = Analysis(
       ['src/main.py'],
       pathex=[],
       binaries=[],
       datas=[
           ('assets', 'assets'),          # 包含素材文件夹
           ('config.yaml', '.'),           # 包含配置文件
       ],
       hiddenimports=[],
       hookspath=[],
       hooksconfig={},
       runtime_hooks=[],
       excludes=[],
       noarchive=False,
   )

   pyz = PYZ(a.pure)

   exe = EXE(
       pyz,
       a.scripts,
       a.binaries,
       a.datas,
       [],
       name='PetDesk',
       debug=False,
       bootloader_ignore_signals=False,
       strip=False,
       upx=True,
       upx_exclude=[],
       runtime_tmpdir=None,
       console=False,          # 不显示控制台窗口
       disable_windowed_traceback=False,
       argv_emulation=False,
       target_arch=None,
       codesign_identity=None,
       entitlements_file=None,
       icon='assets/icon.ico',  # 程序图标
   )
   ```

3. **运行打包命令**
   ```bash
   pyinstaller build.spec
   ```

4. **查看打包结果**
   ```
   dist/
   └── PetDesk.exe    # 可执行文件（约50-100MB）
   ```

5. **测试打包结果**
   ```bash
   cd dist
   PetDesk.exe
   ```

**预期结果:**
- `dist/PetDesk.exe` 文件生成成功
- 双击exe文件，桌宠正常启动和运行
- 所有功能正常（动画、交互、音效等）

**常见问题:**
- **打包后找不到资源文件**：确认`datas`配置正确，代码中使用`sys._MEIPASS`获取打包后的路径
- **打包体积太大**：使用`--exclude-module`排除不需要的模块
- **启动时报错**：使用`console=True`模式打包，查看错误信息
- **杀毒软件误报**：添加白名单或使用代码签名

### 任务11.5: 处理打包后的资源路径 (20分钟)

```python
import sys
import os

def get_resource_path(relative_path):
    """获取资源文件的绝对路径（兼容打包和开发模式）

    打包后的exe中，资源文件在临时目录 sys._MEIPASS 中
    开发模式下，资源文件在项目目录中
    """
    if getattr(sys, 'frozen', False):
        # 打包后的模式
        base_path = sys._MEIPASS
    else:
        # 开发模式
        base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    return os.path.join(base_path, relative_path)

# 使用示例
sprite_path = get_resource_path("assets/sprites/idle/idle_01.png")
sound_path = get_resource_path("assets/sounds/click.wav")
config_path = get_resource_path("config.yaml")
```

### 任务11.6: 性能优化建议 (10分钟)

| 问题 | 优化方案 |
|------|----------|
| 启动慢 | 减少打包的模块数量，使用`--exclude-module`排除 |
| 内存占用高 | 限制粒子数量，定期清理死亡粒子 |
| CPU占用高 | 降低动画帧率，减少定时器频率 |
| 界面卡顿 | 确保API调用在后台线程，不阻塞UI |

---

## 今日作业 | Homework

### 必做题
1. 整合所有模块到main.py，确保程序能正常运行
2. 使用PyInstaller打包为.exe文件
3. 测试打包后的程序，确保所有功能正常

### 挑战题
1. 制作一个精美的程序图标（.ico格式）
2. 生成安装包（使用Inno Setup或NSIS）
3. 编写一个"使用说明.txt"随程序一起分发

### 思考题
1. 为什么打包后的exe文件这么大（50-100MB）？有没有办法减小体积？
2. 如何确保打包后的程序在不同的Windows版本上都能运行？

---

## 明日预告 | Tomorrow's Preview

明天是最后一天！你将向全班同学展示你的桌宠作品，讲述你的开发过程和设计决策。准备好你的演示文稿，让你的桌宠给所有人留下深刻印象！

Tomorrow is the final day! You will present your desktop pet to the class, explaining your development process and design decisions. Prepare your slides and impress everyone with your pet!

---

## 参考资源 | References

- [PyInstaller 官方文档](https://pyinstaller.org/en/stable/)
- [PyInstaller 中文教程（菜鸟教程）](https://www.runoob.com/w3cnote/pyinstaller-tutorial.html)
- [Python 程序打包exe（B站搜索）](https://search.bilibili.com/all?keyword=Python%20%E6%89%93%E5%8C%85%20exe%20PyInstaller)
- [Nuitka 打包工具（替代方案）](https://nuitka.net/)

*最后更新：2026-05-26*
