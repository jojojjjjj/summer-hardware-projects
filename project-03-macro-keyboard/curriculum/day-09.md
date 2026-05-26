# Day 09: USB HID 协议与固件编译 | USB HID Protocol & Firmware Build

> **今日目标 Today's Goals:**
> - 理解 USB HID（Human Interface Device）协议的基本原理
> - 了解键盘 HID 报告描述符和数据格式
> - 使用 QMK Toolbox 将固件刷入 STM32
> - 在 PC 上验证键盘被正确识别并能发送按键
>
> **产出 Deliverable:** 刷入固件后能在 PC 上识别的 USB 键盘

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 回顾 QMK 编译，答疑 |
| 09:15–10:30 | 讲解 | USB HID 协议原理 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | 固件刷写与键盘识别 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 功能测试与调试 |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | VIA/Vial 可视化改键（选做） |
| 16:30–17:00 | 总结 | 日终回顾 + 明日预告 |

---

## 上午：USB HID 协议 | Morning: USB HID Protocol

### 为什么要学这个? | Why Learn This?

USB HID（Human Interface Device）是 USB 设备中最常见的类型之一——键盘、鼠标、游戏手柄都是 HID 设备。当你按下键盘上的一个键，操作系统会在几毫秒内收到一个 8 字节的数据包，告诉你哪些键被按下了。这个看似简单的过程，背后是一套精心设计的协议。

USB HID (Human Interface Device) is one of the most common USB device types — keyboards, mice, and game controllers are all HID devices. When you press a key, the OS receives an 8-byte data packet within milliseconds. This seemingly simple process is backed by a carefully designed protocol.

理解 HID 协议不仅对键盘项目有用，也是学习嵌入式 USB 开发的基础。以后你想做自定义游戏手柄、MIDI 控制器、或者任何自定义 USB 设备，都需要 HID 协议知识。

---

### 任务 9.1: USB HID 协议详解 (75 分钟)

**核心概念 Core Concepts:**

#### 1. USB 设备枚举 USB Enumeration

```
当你将键盘插入电脑时，会发生以下过程：

1. 物理连接：USB 插入，VBUS (5V) 供电
2. 设备复位：主机发送复位信号
3. 获取描述符：主机询问 "你是什么设备？"
   - 设备描述符 (Device Descriptor)：VID, PID, 设备类别
   - 配置描述符 (Configuration Descriptor)：电源、接口数
   - 接口描述符 (Interface Descriptor)：HID 类设备
   - HID 描述符 (HID Descriptor)：报告描述符长度
   - 端点描述符 (Endpoint Descriptor)：数据传输方式
4. 加载驱动：操作系统识别为 HID 设备
5. 就绪：开始接收键盘报告
```

#### 2. 键盘 HID 报告格式 Keyboard HID Report

```
标准键盘报告 = 8 字节 (64 bits)

Byte 0: 修饰键 (Modifier Keys)
  Bit 0: Left Ctrl     Bit 4: Right Ctrl
  Bit 1: Left Shift    Bit 5: Right Shift
  Bit 2: Left Alt      Bit 6: Right Alt
  Bit 3: Left GUI      Bit 7: Right GUI

Byte 1: 保留 (Reserved, 0x00)

Byte 2-7: 按键码 (Keycodes, 最多 6 键同时)
  每个字节一个键码 (按 USB HID Usage Table 定义)
  0x04 = 'a', 0x05 = 'b', ... 0x1D = 'z'
  0x1E = '1', 0x1F = '2', ... 0x27 = '0'
  0x28 = Enter, 0x29 = Esc, 0x2C = Space

示例：按下 Ctrl+C
报告 = [0x01, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00]
         Ctrl   保留   'c'   空    空    空    空    空
```

#### 3. QMK 如何处理 HID QMK's HID Handling

```
QMK 内部流程：

keymap.c 中的键码
    ↓
QMK 核心处理 (quantum/)
    ↓
将键码映射为 HID 使用码 (Usage Code)
    ↓
填充 8 字节 HID 报告
    ↓
通过 USB 端点发送给主机
    ↓
操作系统接收并执行按键动作

你不需要自己编写 HID 报告描述符
QMK 已经为你处理了一切
```

#### 4. NKRO vs 6KRO

| 模式 Mode | 说明 Description | 优缺点 |
|---|---|---|
| 6KRO | 最多同时 6 个键 + 修饰键 | 兼容性最好，够用 |
| NKRO | 无限制同时按键数 | 需要特殊驱动，不兼容所有系统 |

QMK 默认使用 6KRO，这对宏键盘完全够用。

---

### 任务 9.2: 固件刷写 (75 分钟)

**刷写方法 Flashing Methods:**

| 方法 Method | 适用情况 When | 工具 Tool |
|---|---|---|
| DFU 模式 | STM32 默认方式 | QMK Toolbox |
| SWD/J-Tag | 有调试器时 | ST-Link |
| 串口 | 有 bootloader 时 | STM32CubeProgrammer |
| Web Flasher | 兼容键盘 | https://keyboards.qmk.fm/ |

**步骤 Steps (使用 QMK Toolbox):**

1. **安装 QMK Toolbox**：
   - 下载：https://github.com/qmk/qmk_toolbox/releases
   - 安装 QMK.Toolbox.exe

2. **进入 DFU 模式**：
   - 方法 A：按住 BOOT0 按钮，同时按 RESET
   - 方法 B：连接 BOOT0 到 3.3V，然后上电
   - 方法 C：在 QMK 固件中按 Reset 键（如果已定义）

3. **刷写固件**：
   ```
   a. 打开 QMK Toolbox
   b. 点击 "Open" 选择 .bin 固件文件
   c. 确认左下角显示 "STM32 DFU device connected"
   d. 点击 "Flash" 开始刷写
   e. 等待 "Flash complete!" 提示
   ```

4. **验证刷写成功**：
   - 刷写完成后，键盘会自动重启
   - 在 Windows 设备管理器中应该出现 "HID Keyboard Device"
   - 打开记事本，按下宏键盘的按键，应该能输入数字

**预期结果 Expected Result:**
- QMK Toolbox 显示 "Flash complete!"
- Windows 设备管理器显示 "HID Keyboard Device"
- 在记事本中按按键能输入对应字符

**常见问题 Common Issues:**

| 问题 Problem | 原因 Cause | 解决方法 Solution |
|---|---|---|
| 设备未识别 | 未进入 DFU 模式 | 重新按 BOOT0 + RESET |
| 驱动安装失败 | 缺少 STM32 DFU 驱动 | 安装 STM32CubeProgrammer（含驱动） |
| 刷写后无反应 | 固件有 bug | 检查引脚配置是否与硬件匹配 |
| 按键输出错误 | keymap.c 映射错误 | 修改键位映射重新编译刷写 |

---

## 下午：功能测试与调试 | Afternoon: Testing & Debugging

### 任务 9.3: 全功能测试 (90 分钟)

**测试清单 Test Checklist:**

| 测试项 Test Item | 方法 Method | 通过标准 Pass Criteria |
|---|---|---|
| USB 识别 | 设备管理器查看 | 显示 HID 键盘 |
| 按键 1-9 | 记事本输入 | 输出正确数字 |
| 按键 0 Enter | 记事本输入 | 正确输出 |
| 旋钮转动 | 调节系统音量 | 音量增减 |
| 旋钮按下 | 按键事件 | 静音切换 |
| OLED 显示 | 目视检查 | 显示层名 |
| RGB 灯效 | 目视检查 | 灯光正常 |

**串口调试 Serial Debugging:**

```c
// 在 config.h 中启用控制台输出
#define CONSOLE_ENABLE

// 在 keymap.c 中添加调试代码
void keyboard_post_init_user(void) {
    debug_enable = true;    // 启用调试输出
    debug_matrix = true;    // 打印矩阵扫描结果
    debug_keyboard = true;  // 打印按键事件
}
```

```bash
# 在 QMK MSYS 中查看串口调试输出
qmk console
```

---

### 任务 9.4: VIA/Vial 可视化改键（选做）(60 分钟)

**VIA 是什么? What is VIA?**

VIA 是一个可视化键盘配置工具，可以在运行时修改键位映射，无需重新编译固件。Vial 是 VIA 的开源替代品，功能更丰富。

**启用 VIA 支持 Enable VIA Support:**

```makefile
# 在 rules.mk 中添加
VIA_ENABLE = yes
```

```c
// 在 config.h 中添加
#define DYNAMIC_KEYMAP_LAYER_COUNT 4  // 支持 4 个层
```

重新编译后，打开 VIA 软件（https://usevia.app/），键盘将被自动识别。

---

## 今日作业 | Homework

1. **提交刷写成功的截图**：设备管理器截图 + 记事本输入测试截图
2. **提交功能测试报告**：填写上面的测试清单
3. **回答思考题**：
   - 为什么标准键盘报告只有 8 字节？这样设计有什么局限性？
   - DFU 模式和普通 USB 模式有什么区别？
   - VIA 如何在不重新编译的情况下修改键位？
4. **预习 Day 10**：明天是焊接日！回顾 Day 1 的焊接基础，准备好手稳心态

---

## 明日预告 | Tomorrow's Preview

明天是激动人心的**焊接日**！你将把 PCB、轴座、二极管、OLED 接口等元件焊接在一起。从面包板原型到真正的电路板，这是项目从"纸面"走向"实物"的关键一步。

Tomorrow is the exciting **Soldering Day**! You'll solder PCB, hot-swap sockets, diodes, and OLED connectors. From breadboard prototype to real circuit board — this is the pivotal step from "paper" to "product."

---

## 参考资源 | References

- QMK 刷写教程（未来工具研究所）：https://www.bilibili.com/video/BV1NP4y177ey/
- 固件篇三部曲（浚达良）：
  - 第一集：https://www.bilibili.com/video/BV1CT4y1v7PQ/
  - 第二集：https://www.bilibili.com/video/BV1o34y1x7B1/
  - 第三集：https://www.bilibili.com/video/BV1Ta411b7Ts/
- USB HID 官方规范：https://www.usb.org/hid
- 《圈圈教你玩USB》— 中文 USB 入门书籍

---

*最后更新 | Last updated: 2026-05-26*
