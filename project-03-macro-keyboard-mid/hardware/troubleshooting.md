# 故障排查指南 | Troubleshooting Guide

## 概述 | Overview

本指南帮助你排查宏键盘项目中常见的硬件和软件问题。问题按类别分组，每类提供症状、可能原因和解决方法。

This guide helps troubleshoot common hardware and software issues in the macro keyboard project. Issues are grouped by category, each with symptoms, likely causes, and solutions.

---

## 一、电源问题 | Power Issues

### 1.1 USB 连接后设备无反应

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 电脑无任何提示 | USB 线损坏 | 更换 USB 数据线（注意：部分线只有充电功能，没有数据线） |
| 电脑无任何提示 | Type-C 母座焊接不良 | 检查 USB 母座焊点，特别是 D+/D- 和 VBUS/GND |
| 电脑无任何提示 | STM32 未通电 | 万用表测量 3.3V 电源是否正常 |
| 电脑提示"无法识别的设备" | D+/D- 接线错误或虚焊 | 检查 USB D+/D- 走线和 22 ohm 电阻 |
| 设备管理器显示"未知设备" | 固件未刷入或刷入失败 | 重新进入 DFU 模式刷写固件 |

### 1.2 电源短路

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| USB 电流过大（电脑断开保护） | VCC 与 GND 短路 | 万用表蜂鸣档检查，找到短路点 |
| LDO 发热严重 | 输出短路或负载过大 | 检查 3.3V 线路是否有短路 |
| WS2812B 不亮 | 5V 供电不足 | 检查 USB 5V 到 WS2812B VCC 的连接 |

---

## 二、矩阵扫描问题 | Matrix Scanning Issues

### 2.1 按键不响应

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 单个按键不工作 | 轴体引脚与轴座接触不良 | 拔出轴体检查引脚，重新插入 |
| 单个按键不工作 | 热插拔轴座虚焊 | 补焊该轴座的两个焊盘 |
| 整行不工作 | ROW 线虚焊 | 万用表测量 ROW GPIO 到轴座的通断 |
| 整列不工作 | COL 线虚焊 | 万用表测量 COL GPIO 到轴座的通断 |
| 所有按键不工作 | 固件中矩阵引脚配置错误 | 检查 keyboard.json 中的 matrix_pins |

### 2.2 按键误触发（Ghosting）

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 按一个键出多个字符 | 二极管未安装或方向错误 | 检查 16 个 1N4148 二极管方向 |
| 同时按 L 形三键时出鬼键 | 二极管缺失 | 确保每个按键都有串联二极管 |

### 2.3 按键重复或粘滞

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 按一次出多个字符 | 消抖时间太短 | config.h 中增大 DEBOUNCE 值（如 10-15） |
| 按键松开后仍持续输出 | 轴体物理卡键 | 检查轴体是否正常回弹 |
| 按键响应延迟 | 消抖时间太长 | 减小 DEBOUNCE 值（推荐 5） |

---

## 三、OLED 显示问题 | OLED Display Issues

### 3.1 OLED 不显示

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 屏幕完全黑 | I2C 接线错误 | 检查 SCL→PB6, SDA→PB7 |
| 屏幕完全黑 | VCC/GND 接反 | 确认 VCC 接 3.3V，GND 接地 |
| 屏幕完全黑 | I2C 地址不对 | 尝试地址 0x3C 或 0x3D |
| 屏幕完全黑 | OLED 模块损坏 | 更换 OLED 模块测试 |

### 3.2 OLED 显示异常

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 显示乱码 | 初始化命令序列错误 | 对照 SSD1306 数据手册检查 |
| 显示位置偏移 | 寻址模式设置错误 | 检查 config.h 中的 OLED 配置 |
| 闪烁 | 刷新频率太高 | 降低 oled_task 调用频率 |
| 显示模糊 | 对比度设置不当 | 调整 oled_set_contrast() 值 |

---

## 四、RGB 灯效问题 | RGB LED Issues

### 4.1 RGB 不亮

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 全部灯不亮 | 数据线虚焊 | 补焊 PA8 到第一颗 LED DIN 的连接 |
| 全部灯不亮 | 5V 供电缺失 | 检查 WS2812B VCC 是否连接到 USB 5V |
| 全部灯不亮 | GPIO 引脚配置错误 | 检查 config.h 中 RGB_DI_PIN 定义 |

### 4.2 RGB 部分不亮

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 前几颗亮，后面不亮 | 级联中间某颗虚焊 | 检查不亮的第一颗 LED 的 DOUT 焊接 |
| 后面的颜色错误 | GRB 数据格式错误 | 确认代码中使用 GRB 顺序 |

### 4.3 RGB 闪烁或不稳定

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 灯光随机闪烁 | 电源噪声 | 添加 100uF 滤波电容 |
| 灯光颜色随机跳变 | 数据信号被干扰 | 数据线串联 330R 电阻 |
| 亮度不稳定 | 电流不足 | 降低 RGBLIGHT_LIMIT_VAL 或使用外部 5V |

---

## 五、旋钮编码器问题 | Encoder Issues

### 5.1 旋钮无响应

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 旋转无反应 | A/B 相接线错误 | 检查 PB0→A, PB1→B 的连接 |
| 旋转无反应 | 上拉电阻缺失 | 确认 config.h 中启用了内部上拉 |
| 旋转方向反了 | A/B 相接反 | 在 config.h 中交换 ENCODERS_PAD_A 和 ENCODERS_PAD_B |

### 5.2 旋钮按键不工作

| 现象 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 按下无反应 | SW 引脚接线错误 | 检查 PB5→SW 的连接 |
| 按下无反应 | 上拉电阻缺失 | 确认启用了内部上拉 |

---

## 六、固件编译问题 | Firmware Compilation Issues

### 6.1 QMK 环境问题

| 环 Symptom | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| "qmk: command not found" | PATH 未配置 | 重启 QMK MSYS 或运行 `qmk setup` |
| 编译时 "arm-none-eabi-gcc not found" | ARM 工具链未安装 | 运行 `qmk setup` 自动安装 |
| 克隆仓库失败 | 网络问题 | 使用镜像或配置代理 |

### 6.2 编译错误

| 错误信息 Error Message | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| "keyboard not found" | 键盘目录路径错误 | 检查 keyboards/keyverse/ 目录 |
| "matrix_pins: invalid" | keyboard.json 格式错误 | 参考 QMK 文档检查 JSON 格式 |
| "undefined reference" | 缺少驱动或功能未启用 | 检查 rules.mk 中的功能开关 |
| "region `flash' overflowed" | 固件太大 | 关闭不需要的功能模块 |

### 6.3 刷写问题

| 问题 Problem | 可能原因 Cause | 解决方法 Solution |
|---|---|---|
| 无法进入 DFU 模式 | BOOT0 按钮操作不对 | 按住 BOOT0，短按 RESET，松开 BOOT0 |
| QMK Toolbox 不识别设备 | DFU 驱动未安装 | 安装 STM32CubeProgrammer（含驱动） |
| 刷写后无反应 | 固件与硬件不匹配 | 检查引脚配置是否正确 |

---

## 七、调试工具使用 | Debugging Tools

### 7.1 万用表使用

| 测量项 Measurement | 档位 Setting | 方法 Method |
|---|---|---|
| 电压 | DCV 20V | 红笔接测量点，黑笔接 GND |
| 通断 | 蜂鸣档 | 两点之间应发出蜂鸣声 |
| 电阻 | ohm 档 | 测量前断开电源 |
| 电流 | DCA 档 | 串联到电路中（小心不要短路） |

### 7.2 QMK 控制台调试

```bash
# 启动 QMK 控制台
qmk console

# 在 keymap.c 中添加调试输出
#include "print.h"

void keyboard_post_init_user(void) {
    debug_enable = true;
    uprintf("KeyVerse keyboard initialized!\n");
}

bool process_record_user(uint16_t keycode, keyrecord_t *record) {
    uprintf("Key: %u, Row: %u, Col: %u, Pressed: %u\n",
            keycode, record->event.key.row,
            record->event.key.col, record->event.pressed);
    return true;
}
```

---

## 八、问题报告模板 | Bug Report Template

遇到无法解决的问题时，按以下格式记录：

When encountering unsolvable issues, document using this format:

```markdown
## 问题描述 | Problem Description
- 现象：
- 出现频率：总是 / 偶尔 / 仅一次

## 环境信息 | Environment
- 操作系统：
- QMK 版本：
- 固件编译命令：
- 硬件版本：

## 已尝试的解决方案 | Solutions Tried
1. xxx —— 无效
2. xxx —— 无效
3. xxx —— 部分有效

## 附加信息 | Additional Info
- 截图 / 照片：
- 串口输出日志：
- 万用表测量结果：
```

---

*最后更新 | Last updated: 2026-05-26*
