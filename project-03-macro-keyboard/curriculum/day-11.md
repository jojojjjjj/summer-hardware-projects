# Day 11: 系统集成与调试 | System Integration & Debugging

> **今日目标 Today's Goals:**
> - 将所有模块整合为完整的宏键盘系统
> - 调试并解决集成中遇到的问题
> - 优化 RGB 灯效和 OLED 显示
> - 安装 3D 打印外壳（如果已到货）
>
> **产出 Deliverable:** 功能完整、灯效美观的成品宏键盘

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 回顾 Day 10 焊接，列出调试计划 |
| 09:15–10:30 | 实验 | 矩阵扫描调试与修复 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | OLED + RGB + 旋钮集成调试 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 灯效定制与优化 |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | 外壳安装 + 最终测试 |
| 16:30–17:00 | 总结 | 整理文档 + 明日展示准备 |

---

## 上午：模块集成调试 | Morning: Module Integration & Debugging

### 为什么要学这个? | Why Learn This?

系统集成是硬件项目中最具挑战性的环节。单独工作正常的模块，放在一起可能会出现意想不到的问题：信号干扰、供电不足、时序冲突……真正的工程师能力体现在"遇到问题、定位问题、解决问题"的过程中。

System integration is the most challenging phase of any hardware project. Modules that work individually may exhibit unexpected issues when combined: signal interference, insufficient power, timing conflicts. Real engineering ability shows in "encountering problems, locating them, solving them."

调试思维（Debugging Mindset）是工程师最重要的素养。不要害怕问题——每一个 bug 都是一次学习机会。

---

### 任务 11.1: 矩阵扫描调试 (75 分钟)

**调试步骤 Debugging Steps:**

1. **启用 QMK 控制台调试**：
   ```c
   // config.h
   #define CONSOLE_ENABLE
   #define DEBUG_MATRIX_SCAN_RATE
   ```

   ```bash
   # 查看串口调试输出
   qmk console
   ```

2. **逐键测试**：
   - 插入 4-5 个轴体（不要全部插入，逐个测试更高效）
   - 按下每个按键，观察串口输出是否正确报告行/列
   - 记录哪些按键正常，哪些有问题

3. **常见矩阵问题排查**：

   | 现象 Symptom | 可能原因 Likely Cause | 排查方法 Debug |
   |---|---|---|
   | 整行不工作 | 行线虚焊 | 万用表测量行线与 STM32 引脚的通断 |
   | 整列不工作 | 列线虚焊 | 同上，测量列线 |
   | 单键不工作 | 轴座虚焊或轴体问题 | 更换轴体测试；检查轴座焊点 |
   | 按一键出多键 | 相邻焊盘桥连 | 目视检查 + 万用表短路检测 |
   | 按键不灵敏 | 接触不良 | 清洁轴座触点，检查轴体是否完全插入 |

4. **修复方法**：
   - **虚焊**：重新加热焊点，添加少量焊锡
   - **桥连**：使用吸锡带去除多余焊锡
   - **断路**：用细导线飞线连接

---

### 任务 11.2: OLED + RGB + 旋钮集成 (75 分钟)

#### OLED 调试

| 问题 Problem | 排查 Debug |
|---|---|
| OLED 不亮 | 检查 I2C 接线；确认 I2C 地址（0x3C 或 0x3D）|
| 显示乱码 | 检查 OLED 初始化命令；确认 SSD1306 型号 |
| 显示闪烁 | 降低刷新频率；检查 I2C 速率 |

```bash
# 使用 QMK 控制台检查 OLED 状态
# 在 keymap.c 中添加
void oled_task_user(void) {
    oled_write_P(PSTR("Hello KeyVerse!\n"), false);
}
```

#### RGB 调试

| 问题 Problem | 排查 Debug |
|---|---|
| 灯不亮 | 检查数据线接线；确认 GPIO 引脚正确 |
| 颜色不对 | GRB 顺序；检查 QMK 中 RGB 驱动类型 |
| 只有部分灯亮 | 检查级联连接；中间的灯珠可能虚焊 |
| 闪烁不稳定 | 电源供电不足；添加外部 5V 电源 |

#### 旋钮调试

| 问题 Problem | 排查 Debug |
|---|---|
| 旋钮无反应 | 检查 A/B 相接线；确认 GPIO 引脚配置 |
| 方向反了 | 交换 config.h 中 ENCODERS_PAD_A 和 ENCODERS_PAD_B |
| 按键不工作 | 检查 ENC_SW 接线；确认上拉电阻 |

---

## 下午：定制优化 | Afternoon: Customization & Optimization

### 任务 11.3: 灯效定制 (90 分钟)

**自定义灯效示例 Custom Effect Example:**

```c
// 在 keymap.c 中添加自定义灯效

// 层切换时改变灯效 | Change lighting on layer switch
layer_state_t layer_state_set_user(layer_state_t state) {
    switch (get_highest_layer(state)) {
        case _BASE:
            // 基础层：蓝色呼吸灯
            rgblight_sethsv(HSV_BLUE);
            rgblight_mode(RGBLIGHT_MODE_BREATHING);
            break;
        case _FN:
            // 功能层：红色常亮
            rgblight_sethsv(HSV_RED);
            rgblight_mode(RGBLIGHT_MODE_STATIC_LIGHT);
            break;
    }
    return state;
}

// 按键按下时的灯光反馈 | Light feedback on key press
bool process_record_user(uint16_t keycode, keyrecord_t *record) {
    if (record->event.pressed) {
        // 获取按下的键位坐标
        uint8_t row = record->event.key.row;
        uint8_t col = record->event.key.col;
        uint8_t led_index = row * MATRIX_COLS + col;

        // 短暂点亮被按下的键位
        rgb_set_color(led_index, 255, 255, 255);
        rgb_update();
    }
    return true;
}
```

**旋钮功能扩展 Encoder Extensions:**

```c
// 编码器回调函数
bool encoder_update_user(uint8_t index, bool clockwise) {
    if (index == 0) {  // 只有一个编码器
        switch (get_highest_layer(layer_state)) {
            case _BASE:
                // 基础层：音量控制
                if (clockwise) {
                    tap_code(KC_VOLU);
                } else {
                    tap_code(KC_VOLD);
                }
                break;
            case _FN:
                // 功能层：RGB 亮度调节
                if (clockwise) {
                    rgblight_increase_val();
                } else {
                    rgblight_decrease_val();
                }
                break;
        }
    }
    return false;
}
```

---

### 任务 11.4: 3D 打印外壳安装 (30 分钟)

**外壳设计要点 Case Design Notes:**
- 3D 打印外壳通常在 Day 7 前后下单，今天应该到货
- PLA 材质，FDM 打印
- 内部空间需容纳 PCB + 轴体 + 键帽高度
- USB 接口处需留出开口

**安装步骤 Installation Steps:**
1. 将焊好的 PCB 放入外壳底部
2. 确认 USB 接口对准外壳开口
3. 使用 M3 螺丝固定 PCB（如果外壳有螺丝柱）
4. 安装旋钮帽
5. 插入全部 16 个轴体
6. 安装键帽

---

### 任务 11.5: 最终全面测试 (30 分钟)

**完整功能测试清单 Final Test Checklist:**

| 测试项 Test | 方法 Method | 结果 Result |
|---|---|---|
| USB 识别 | 设备管理器 | [ ] 通过 |
| 全部 16 键响应 | 逐一按键测试 | [ ] 通过 |
| 旋钮旋转 | 音量调节 | [ ] 通过 |
| 旋钮按下 | 静音切换 | [ ] 通过 |
| OLED 显示 | 目视检查 | [ ] 通过 |
| RGB 全亮 | 灯效切换 | [ ] 通过 |
| 层切换 | MO(1) + 按键 | [ ] 通过 |
| VIA 识别 | VIA 软件 | [ ] 通过 / [ ] 未启用 |
| 外壳安装 | 目视检查 | [ ] 通过 |

---

## 今日作业 | Homework

1. **拍摄功能演示视频**：2-3 分钟，展示所有功能
2. **记录调试过程**：遇到了什么问题，如何解决的
3. **准备明日展示**：
   - 制作 PPT（10-15 页）
   - 准备实物演示流程
   - 预想可能被问到的问题
4. **完善项目文档**：更新 README.md，检查代码注释

---

## 明日预告 | Tomorrow's Preview

明天是**最后一天**！你将在全班面前展示你的宏键盘作品，分享你在 12 天中学到的知识和技术。这也是一个互相学习的好机会——看看其他同学的设计有什么不同。

Tomorrow is the **final day**! You'll present your macro keyboard to the class and share what you've learned in 12 days. It's also a great opportunity to learn from each other's designs.

---

## 参考资源 | References

- QMK RGB 文档：https://docs.qmk.fm/features/rgblight
- QMK OLED 文档：https://docs.qmk.fm/features/oled_driver
- QMK 编码器文档：https://docs.qmk.fm/features/encoders
- [QMK 教程] RGB 灯效开关 + EEPROM（HiryKun）：https://www.bilibili.com/video/BV1bN4y1c7JW/

---

*最后更新 | Last updated: 2026-05-26*
