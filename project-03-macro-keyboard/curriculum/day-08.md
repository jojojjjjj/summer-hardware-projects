# Day 08: QMK 固件基础 | QMK Firmware Fundamentals

> **今日目标 Today's Goals:**
> - 理解 QMK 固件的架构和工作流程
> - 搭建 QMK 编译环境（QMK MSYS）
> - 创建自定义键盘定义文件（keyboard.json / config.h / rules.mk）
> - 编写第一个 keymap.c 并成功编译
>
> **产出 Deliverable:** 编译成功的 QMK 固件文件 + Week 2 进度汇报

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | PCB 打样进展 + 固件开发介绍 |
| 09:15–10:30 | 讲解 | QMK 架构与文件结构 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | 安装 QMK MSYS + 环境配置 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 创建自定义键盘 + keymap |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | 编译与调试 |
| 16:30–17:00 | 总结 | Week 2 总结 + 明日预告 |

---

## 上午：QMK 架构与环境搭建 | Morning: QMK Architecture & Setup

### 为什么要学这个? | Why Learn This?

QMK（Quantum Mechanical Keyboard）是全球最流行的开源键盘固件，支持数千种键盘设计。它用 C 语言编写，功能极其丰富：矩阵扫描、RGB 灯效、OLED 显示、旋钮编码器、宏定义、层切换、VIA 运行时改键……几乎所有你能想到的键盘功能，QMK 都已经实现了。

QMK is the world's most popular open-source keyboard firmware, supporting thousands of keyboard designs. Written in C, it's feature-rich: matrix scanning, RGB, OLED, encoders, macros, layers, VIA remapping — virtually every keyboard feature you can imagine.

学会 QMK 意味着你不需要"重新发明轮子"。你只需要告诉 QMK "我的键盘长什么样"，它就会帮你处理所有底层细节。这正是优秀软件框架的价值所在。

---

### 任务 8.1: QMK 架构讲解 (75 分钟)

**QMK 文件结构 QMK File Structure:**

```
qmk_firmware/
├── keyboards/                    # 所有键盘定义
│   └── keyverse/                 # 你的自定义键盘（本项目）
│       ├── keyboard.json         # 键盘基本信息（推荐格式）
│       ├── config.h              # C 语言配置头文件
│       ├── rules.mk              # 编译规则（启用哪些功能）
│       ├── keymaps/              # 键位映射
│       │   └── default/
│       │       └── keymap.c      # 默认键位映射
│       ├── matrix.c              # 自定义矩阵扫描（可选）
│       └── info.json             # 键盘元信息（新格式）
├── quantum/                      # QMK 核心库
│   ├── matrix_common.c           # 通用矩阵扫描
│   ├── keyboard.c                # 主循环
│   └── ...
├── drivers/                      # 外设驱动
│   ├── ssd1306.c                 # OLED 驱动
│   ├── ws2812.c                  # WS2812B 驱动
│   └── ...
└── lib/                          # 第三方库
```

**QMK 主循环 QMK Main Loop:**

```c
// 简化的 QMK 主循环 | Simplified QMK main loop
// 这段代码已经由 QMK 框架提供，你不需要自己写

void keyboard_task(void) {
    // 1. 扫描矩阵
    matrix_scan();

    // 2. 处理按键事件
    for (每个按键) {
        if (按键状态变化) {
            处理按键事件(keycode, pressed/released);
        }
    }

    // 3. 更新 RGB 灯效
    rgb_matrix_task();

    // 4. 更新 OLED 显示
    oled_task();

    // 5. 处理旋钮编码器
    encoder_read();

    // 6. 发送 USB HID 报告
    host_keyboard_send(report);
}
```

**QMK 关键文件说明 Key Files:**

| 文件 File | 作用 Purpose | 你需要修改? |
|---|---|---|
| keyboard.json | 键盘硬件定义 | 是 — 定义矩阵大小、引脚等 |
| config.h | C 配置宏 | 是 — 启用功能、设置参数 |
| rules.mk | 编译开关 | 是 — 启用 RGB、OLED、编码器 |
| keymap.c | 键位映射 | 是 — 定义每个键的功能 |
| matrix.c | 矩阵驱动 | 通常不需要（QMK 内置） |

**常用键码 Common Keycodes:**

| 键码 Keycode | 说明 Description |
|---|---|
| KC_A ~ KC_Z | 字母键 |
| KC_1 ~ KC_9, KC_0 | 数字键 |
| KC_ENTER | 回车 |
| KC_SPACE | 空格 |
| KC_ESC | Esc |
| KC_TAB | Tab |
| KC_LSFT | 左 Shift |
| KC_LCTL | 左 Ctrl |
| KC_LALT | 左 Alt |
| KC_LGUI | 左 Win/Cmd |
| KC_MUTE | 静音 |
| KC_VOLU | 音量加 |
| KC_VOLD | 音量减 |
| MO(1) | 切换到层 1（按住） |
| TG(1) | 切换层 1（切换） |

---

### 任务 8.2: 搭建 QMK 编译环境 (75 分钟)

**步骤 Steps:**

1. **安装 QMK MSYS**：
   - 下载：https://msys.qmk.fm/
   - 运行安装程序，按默认设置安装
   - 安装完成后，打开 QMK MSYS 终端

2. **初始化 QMK**：
   ```bash
   # 设置 QMK 仓库路径
   qmk setup

   # 这会克隆 qmk_firmware 仓库到本地
   # 首次运行需要较长时间（仓库较大）
   ```

3. **验证安装**：
   ```bash
   # 检查 QMK 版本
   qmk --version

   # 列出支持的键盘
   qmk list-keyboards | head -20

   # 测试编译一个已有的键盘
   qmk compile -kb planck/rev6 -km default
   ```

4. **配置编译器路径**（如果编译失败）：
   ```bash
   # 检查 ARM 工具链
   arm-none-eabi-gcc --version

   # 如果没有，QMK MSYS 通常会自动安装
   # 手动安装：https://developer.arm.com/downloads/-/gnu-rm
   ```

**预期结果 Expected Result:**
- `qmk --version` 显示版本号
- `qmk compile` 能成功编译一个测试键盘
- 生成 .bin 或 .hex 固件文件

**常见问题 Common Issues:**

| 问题 Problem | 原因 Cause | 解决方法 Solution |
|---|---|---|
| qmk 命令不存在 | PATH 未配置 | 重启 QMK MSYS 或手动添加 PATH |
| 克隆仓库超时 | 网络问题 | 使用镜像或 VPN |
| 编译报错缺少工具链 | ARM GCC 未安装 | 重新运行 qmk setup |
| 中文路径问题 | Windows 路径含中文 | 将 QMK 放在英文路径下 |

---

## 下午：创建自定义键盘 | Afternoon: Custom Keyboard Definition

### 任务 8.3: 创建键盘定义文件 (90 分钟)

**创建键盘目录 Create Keyboard Directory:**

```bash
# 在 qmk_firmware/keyboards/ 下创建项目目录
mkdir -p keyboards/keyverse/keymaps/default
```

**文件 1: keyboard.json**

```json
{
    "keyboard_name": "KeyVerse Macro Keyboard",
    "manufacturer": "Summer Project",
    "url": "",
    "maintainer": "student",
    "usb": {
        "vid": "0xFEED",
        "pid": "0x6060",
        "device_version": "0.0.1"
    },
    "processor": "STM32F103",
    "bootloader": "stm32-dfu",
    "matrix_pins": {
        "rows": ["A0", "A1", "A2", "A3"],
        "cols": ["A4", "A5", "A6", "A7"]
    },
    "diode_direction": "ROW2COL",
    "layouts": {
        "LAYOUT_ortho_4x4": {
            "layout": [
                {"x": 0, "y": 0}, {"x": 1, "y": 0}, {"x": 2, "y": 0}, {"x": 3, "y": 0},
                {"x": 0, "y": 1}, {"x": 1, "y": 1}, {"x": 2, "y": 1}, {"x": 3, "y": 1},
                {"x": 0, "y": 2}, {"x": 1, "y": 2}, {"x": 2, "y": 2}, {"x": 3, "y": 2},
                {"x": 0, "y": 3}, {"x": 1, "y": 3}, {"x": 2, "y": 3}, {"x": 3, "y": 3}
            ]
        }
    }
}
```

**文件 2: config.h**

```c
// config.h - 键盘配置头文件 | Keyboard configuration header
// 本文件定义了 QMK 固件的硬件参数和功能开关

#pragma once

// ===== 矩阵配置 | Matrix Configuration =====
#define MATRIX_ROWS 4          // 矩阵行数
#define MATRIX_COLS 4          // 矩阵列数

// ===== USB 配置 | USB Configuration =====
#define USB_MAX_POWER_CONSUMPTION 100  // 最大功耗 100mA
#define DEBOUNCE 5                      // 消抖时间 5ms

// ===== OLED 配置 | OLED Configuration =====
#define OLED_DISPLAY_128X64     // 128x64 像素 OLED
#define I2C_DRIVER I2CD1       // 使用 I2C1
#define OLED_IC OLED_IC_SSD1306 // SSD1306 驱动芯片

// ===== RGB 灯效配置 | RGB Configuration =====
#define RGBLED_NUM 16           // 16 颗 WS2812B
#define RGB_DI_PIN A8           // 数据引脚 PA8
#define RGBLIGHT_EFFECT_BREATHING
#define RGBLIGHT_EFFECT_RAINBOW_MOOD
#define RGBLIGHT_EFFECT_RAINBOW_SWIRL
#define RGBLIGHT_EFFECT_STATIC_GRADIENT
#define RGBLIGHT_LIMIT_VAL 128 // 限制最大亮度（保护电源）

// ===== 旋钮编码器配置 | Encoder Configuration =====
#define ENCODERS_PAD_A { B0 }   // A 相引脚 PB0
#define ENCODERS_PAD_B { B1 }   // B 相引脚 PB1
#define ENCODER_RESOLUTION 4    // 每个棘格的脉冲数
```

**文件 3: rules.mk**

```makefile
# rules.mk - 编译规则 | Compilation rules

# 启用功能模块 | Enable feature modules
OLED_ENABLE = yes              # 启用 OLED 显示
RGBLIGHT_ENABLE = yes          # 启用 RGB 灯效
ENCODER_ENABLE = yes           # 启用旋钮编码器

# RGB 驱动类型 | RGB driver type
RGBLIGHT_DRIVER = ws2812       # 使用 WS2812B 驱动

# OLED 驱动类型 | OLED driver type
OLED_DRIVER = ssd1306          # 使用 SSD1306 驱动
```

**文件 4: keymap.c**

```c
// keymap.c - 键位映射 | Key Mapping
// 定义 4x4 宏键盘的 16 个按键功能
// Defines the function of all 16 keys on the 4x4 macro keyboard

#include QMK_KEYBOARD_H

// 层定义 | Layer definitions
enum layers {
    _BASE = 0,   // 基础层：数字和运算符
    _FN = 1,     // 功能层：媒体控制和宏
};

// 键位映射表 | Keymap table
// LAYOUT_ortho_4x4: 4行 x 4列 正交布局
const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {

    /* 基础层 _BASE
     * +------+------+------+------+
     * |  7   |  8   |  9   |  /   |
     * +------+------+------+------+
     * |  4   |  5   |  6   |  *   |
     * +------+------+------+------+
     * |  1   |  2   |  3   |  -   |
     * +------+------+------+------+
     * |  0   |  .   | Enter|  +   |
     * +------+------+------+------+
     */
    [_BASE] = LAYOUT_ortho_4x4(
        KC_P7,   KC_P8,   KC_P9,   KC_PSLS,
        KC_P4,   KC_P5,   KC_P6,   KC_PAST,
        KC_P1,   KC_P2,   KC_P3,   KC_PMNS,
        KC_P0,   KC_PDOT, KC_PENT, KC_PPLS
    ),

    /* 功能层 _FN (按住左下角键切换)
     * +------+------+------+------+
     * | Mute | Vol+ | RGB+ |      |
     * +------+------+------+------+
     * | Prev | Play | Next |      |
     * +------+------+------+------+
     * | Vol- |      |      |      |
     * +------+------+------+------+
     * | MO(1)|      |      | Reset|
     * +------+------+------+------+
     */
    [_FN] = LAYOUT_ortho_4x4(
        KC_MUTE, KC_VOLU, RGB_MOD, _______,
        KC_MPRV, KC_MPLY, KC_MNXT, _______,
        KC_VOLD, _______, _______, _______,
        _______, _______, _______, QK_BOOT
    ),
};

// ===== 旋钮编码器映射 | Encoder Mapping =====
#if defined(ENCODER_MAP_ENABLE)
const uint16_t PROGMEM encoder_map[][NUM_ENCODERS][NUM_DIRECTIONS] = {
    [_BASE] = { ENCODER_CCW_CW(KC_VOLD, KC_VOLU) },  // 基础层：音量调节
    [_FN]   = { ENCODER_CCW_CW(RGB_HUD, RGB_HUI) },  // 功能层：色相调节
};
#endif

// ===== OLED 显示回调 | OLED Display Callback =====
#if defined(OLED_ENABLE)
bool oled_task_user(void) {
    // 显示当前层名称 | Display current layer name
    switch (get_highest_layer(layer_state)) {
        case _BASE:
            oled_write_P(PSTR("Layer: Base\n"), false);
            oled_write_P(PSTR("Numpad Mode\n"), false);
            break;
        case _FN:
            oled_write_P(PSTR("Layer: FN\n"), false);
            oled_write_P(PSTR("Media Mode\n"), false);
            break;
    }
    return false;
}
#endif
```

**编译命令 Compile Commands:**

```bash
# 编译固件
qmk compile -kb keyverse -km default

# 编译成功后，固件文件在 .build/ 目录下
# 文件名格式：keyverse_default.bin
```

**预期结果 Expected Result:**
- 编译过程无错误
- 生成 .bin 固件文件
- 固件文件大小约 20-60KB

**常见问题 Common Issues:**

| 问题 Problem | 原因 Cause | 解决方法 Solution |
|---|---|---|
| 编译报错 "keyboard not found" | 键盘目录路径不对 | 检查 keyboards/keyverse/ 是否正确 |
| 编译报错 "undefined reference" | 缺少驱动或函数 | 检查 rules.mk 是否启用了对应功能 |
| 编译报错 "matrix_pins" | 引脚格式错误 | 检查 keyboard.json 中的引脚格式 |
| 固件太大 | 启用了太多功能 | 关闭不需要的功能模块 |

---

## 今日作业 | Homework

1. **提交编译成功的截图**：包含编译命令和最终的 "Compiling keyverse:default...done" 输出
2. **提交固件文件**：将 .bin 文件保存到仓库
3. **回答思考题**：
   - QMK 的"层"（Layer）概念有什么用？为什么不只是一个平铺的键位表？
   - keymap.c 中的 `MO(1)` 和 `TG(1)` 有什么区别？
   - config.h 和 rules.mk 各自控制什么？
4. **提交 Week 2 进度汇报**
   详见 [week-2-checkin.md](../assignments/week-2-checkin.md)

---

## 明日预告 | Tomorrow's Preview

明天你将学习 **USB HID 协议**——键盘如何向电脑"说话"。你还会将编译好的固件刷入 STM32，让你的键盘第一次被电脑识别为真正的 USB 键盘！

Tomorrow you'll learn **USB HID protocol** — how keyboards "talk" to computers. You'll flash the firmware into STM32 and have your keyboard recognized as a real USB keyboard for the first time!

---

## 参考资源 | References

- QMK 官方文档：https://docs.qmk.fm/
- QMK 在线配置器：https://config.qmk.fm/
- [QMK 教程] HiryKun 完整教学（ARM 移植）：https://www.bilibili.com/video/BV1pt4y1a7dG/
- QMK 环境搭建（浮靈君）：https://www.bilibili.com/video/BV1T44y1j7nm/
- 入门客制化键盘 QMK 工具介绍（浚达良）：https://www.bilibili.com/video/BV1JS4y1D79D/

---

*最后更新 | Last updated: 2026-05-26*
