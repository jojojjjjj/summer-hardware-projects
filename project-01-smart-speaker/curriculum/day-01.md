# Day 1: 项目介绍 + 环境搭建 | Project Introduction + Environment Setup

## 学习目标 | Learning Objectives

- 理解智能音箱项目的整体架构和技术栈
- 完成 Raspberry Pi OS 系统安装和初始化配置
- 配置 Python 开发环境
- 理解项目目录结构和代码组织方式

> Understand the overall architecture and tech stack of the smart speaker project; complete Raspberry Pi OS installation and initial configuration; set up Python development environment; understand project directory structure and code organization.

## 前置准备检查 | Prerequisites Check

- [ ] 已收到树莓派硬件套件
- [ ] 准备好 MicroSD 卡（至少 32GB）
- [ ] 准备好电脑（Windows/Mac/Linux均可）
- [ ] 准备好网线和显示器（或 HDMI 线）
- [ ] 已阅读 prerequisites.md 中的前置知识

---

## 为什么学这个 | Why Learn This

**真实世界应用：** 环境搭建是所有软件项目的第一步。无论是开发手机 App、网站还是智能设备，第一步都是配置开发环境。掌握环境搭建能力意味着你可以独立开始任何新项目。

> **Real-world application:** Environment setup is the first step in all software projects. Whether developing mobile apps, websites, or smart devices, the first step is configuring the development environment. Mastering environment setup means you can independently start any new project.

---

## 任务一：安装 Raspberry Pi OS | Task 1: Install Raspberry Pi OS

### 步骤 | Steps

1. **下载 Raspberry Pi Imager**
   - 访问：https://www.raspberrypi.com/software/
   - 下载并安装适合你操作系统的版本

2. **准备 MicroSD 卡**
   - 将 MicroSD 卡插入读卡器
   - 连接到电脑

3. **使用 Imager 写入系统**
   - 打开 Raspberry Pi Imager
   - 选择 "CHOOSE OS" → "Raspberry Pi OS (64-bit)"
   - 选择 "CHOOSE STORAGE" → 选择你的 MicroSD 卡
   - 点击设置（齿轮图标），配置以下内容：
     * 设置主机名：`xiaozhi.local`
     * 启用 SSH：使用密码认证
     * 设置用户名和密码（记录下来！）
     * 配置 Wi-Fi（如果使用无线连接）
   - 点击 "WRITE" 开始写入

4. **等待写入完成**
   - 这可能需要 10-15 分钟
   - 完成后，Imager 会显示成功信息

### 预期结果 | Expected Result

- MicroSD 卡已经成功烧录 Raspberry Pi OS
- 卡的名称可能变为 "boot" 或类似名称

### 常见问题 | Common Issues

**Q: Imager 无法检测到 SD 卡？**
A: 尝试重新插拔读卡器，或更换读卡器。

**Q: 写入过程中报错？**
A: 检查 SD 卡是否损坏，尝试使用另一张 SD 卡。

---

## 任务二：启动树莓派并配置 | Task 2: Boot Raspberry Pi and Configure

### 步骤 | Steps

1. **连接硬件**
   - 将烧录好系统的 SD 卡插入树莓派
   - 连接 USB 麦克风（任意 USB 接口）
   - 连接显示器（HDMI）和键盘鼠标
   - 连接电源（最后一步！）

2. **首次启动**
   - 树莓派会自动启动并进入桌面
   - 使用你设置的用户名和密码登录

3. **更新系统**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```
   这可能需要 10-20 分钟。

4. **配置音频设备**
   ```bash
   # 查看音频设备
   aplay -l

   # 设置 3.5mm 接口为默认输出
   sudo raspi-config

   # 在菜单中选择：System Options → Audio → Force 3.5mm jack
   ```

### 预期结果 | Expected Result

- 树莓派成功启动并进入桌面
- 音频输出设置为 3.5mm 接口
- 系统已更新到最新版本

### 常见问题 | Common Issues

**Q: 显示器无信号？**
A: 检查 HDMI 线是否插紧，尝试重新插拔。

**Q: 无法连接 Wi-Fi？**
A: 使用网线连接，或检查 Wi-Fi 密码是否正确。

---

## 任务三：配置 Python 环境 | Task 3: Set Up Python Environment

### 步骤 | Steps

1. **检查 Python 版本**
   ```bash
   python3 --version
   ```
   应该显示 Python 3.9 或更高版本

2. **安装 pip 和虚拟环境工具**
   ```bash
   sudo apt install python3-pip python3-venv -y
   ```

3. **创建项目目录和虚拟环境**
   ```bash
   # 创建项目目录
   mkdir -p ~/smart-speaker
   cd ~/smart-speaker

   # 创建虚拟环境
   python3 -m venv venv

   # 激活虚拟环境
   source venv/bin/activate
   ```

4. **升级 pip**
   ```bash
   pip install --upgrade pip
   ```

5. **安装基础依赖**
   ```bash
   pip install numpy pyaudio sounddevice
   ```

### 预期结果 | Expected Result

- 虚拟环境成功创建并激活
- 命令提示符前出现 `(venv)` 标记
- 基础库安装成功

### 常见问题 | Common Issues

**Q: pip 安装很慢？**
A: 使用国内镜像源：
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple numpy
```

**Q: 虚拟环境激活失败？**
A: 确保使用完整路径：`source ~/smart-speaker/venv/bin/activate`

---

## 任务四：理解项目结构 | Task 4: Understand Project Structure

### 步骤 | Steps

1. **创建项目目录结构**
   ```bash
   cd ~/smart-speaker
   mkdir -p src tests
   touch src/__init__.py
   touch tests/__init__.py
   ```

2. **创建基础文件**
   ```bash
   # 创建 requirements.txt
   cat > requirements.txt << 'EOF'
   numpy>=1.21.0
   pyaudio>=0.2.11
   sounddevice>=0.4.6
   openai-whisper>=20230314
   edge-tts>=6.1.9
   openai>=1.0.0
   pyyaml>=6.0
   EOF
   ```

3. **创建第一个测试文件**
   ```bash
   cat > tests/test_environment.py << 'EOF'
   """
   环境测试文件
   用于验证 Python 环境配置正确
   """
   import sys

   def test_python_version():
       """测试 Python 版本"""
       print(f"Python 版本: {sys.version}")

   def test_imports():
       """测试基础库导入"""
       try:
           import numpy
           print(f"NumPy 版本: {numpy.__version__}")
       except ImportError:
           print("NumPy 未安装")

       try:
           import sounddevice as sd
           print(f"SoundDevice 已安装")
       except ImportError:
           print("SoundDevice 未安装")

   if __name__ == "__main__":
       test_python_version()
       test_imports()
       print("\n环境测试完成！")
   EOF
   ```

4. **运行测试**
   ```bash
   python tests/test_environment.py
   ```

### 预期结果 | Expected Result

- 项目目录结构创建完成
- 测试文件成功运行，显示 Python 和库版本信息

### 常见问题 | Common Issues

**Q: 运行测试时报错找不到模块？**
A: 确保虚拟环境已激活（检查是否有 `(venv)` 前缀）。

---

## 今日作业 | Today's Assignment

1. **完成环境搭建**（必须）
   - 提交一张树莓派桌面截图
   - 提交 `test_environment.py` 的运行结果

2. **编写配置笔记**（必须）
   - 创建一个 `setup_notes.md` 文件
   - 记录你遇到的问题和解决方案
   - 记录你的用户名、密码、Wi-Fi 信息（自己保存，不要提交）

3. **探索任务**（可选）
   - 尝试在树莓派上播放一段音频：
   ```bash
   aplay /usr/share/sounds/alsa/Front_Center.wav
   ```

---

## 明日预告 | Preview of Tomorrow

明天我们将复习 Python 基础语法，并学习如何使用 pip 管理依赖包。我们将编写一些小练习来巩固 Python 基础知识。

> Tomorrow we will review basic Python syntax and learn how to use pip for dependency management. We will write small exercises to consolidate Python fundamentals.

---

## 参考资源 | References

- **树莓派官方文档**：https://www.raspberrypi.com/documentation/
- **Raspberry Pi Imager 下载**：https://www.raspberrypi.com/software/
- **Python 虚拟环境教程**：https://docs.python.org/3/tutorial/venv.html
- **树莓派音频配置**：https://www.raspberrypi.com/documentation/computers/configuration.html

---

*预计完成时间：4-6 小时*
*Estimated completion time: 4-6 hours*
