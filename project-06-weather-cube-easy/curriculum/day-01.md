# Day 1: 项目启动与 ESP8266 入门 | Project Kickoff & ESP8266 Basics

## 今日目标 | Today's Goals

- 了解项目全貌和最终效果
- 认识 ESP8266 硬件
- 配置 Arduino IDE 开发环境
- 成功烧录第一个程序（Blink）

---

## 上午 (3h) | Morning Session

### 1. 项目介绍 (1h)

**展示最终成品**：
- 一台正在运行的桌面气象站
- 屏幕显示：时间、日期、天气图标、温度、PM2.5

**介绍项目全貌**：
- 硬件：ESP8266 + OLED 屏
- 软件：Arduino（C语言）
- 数据来源：和风天气 API（网络）
- 时间同步：NTP 协议

**浏览课程安排**：见 README.md 课程安排表

**讨论**：你觉得这个东西最难的部分是什么？你最感兴趣的是什么？

### 2. ESP8266 硬件认知 (1h)

**认识手上的模块**：

```
ESP-01S 实物观察：
- 8 个引脚（金手指）
- 蓝色 LED（在 GPIO2 引脚上）
- PCB 天线（WiFi 信号收发）
- 主芯片（黑色小方块，ESP8266EX）
```

**关键知识点**：
- MCU = Microcontroller Unit（微控制器）= 一颗小小的计算机
- ESP8266 的特点：**自带 WiFi**，价格便宜（8元），适合 IoT 项目
- ESP-01S 是 ESP8266 系列中最小的模块（仅 8 引脚）
- 工作电压：**3.3V**（不是 5V！接 5V 会烧毁）

### 3. Arduino IDE 安装与配置 (1h)

**安装步骤**：
1. 访问 https://www.arduino.cc/en/software
2. 下载 Windows 版本（Win10+, 64bit）
3. 安装（全部默认选项）

**添加 ESP8266 支持**：
1. 文件 → 首选项 → 附加开发板管理器网址
2. 填入：`https://arduino.esp8266.com/stable/package_esp8266com_index.json`
3. 工具 → 开发板 → 开发板管理器
4. 搜索 "ESP8266" → 安装 `esp8266 by ESP8266 Community`

---

## 下午 (4h) | Afternoon Session

### 4. 第一个程序：Blink (1.5h)

**目标**：让 ESP-01S 上的蓝色 LED 闪烁。

```cpp
// Blink - 你的第一个 ESP8266 程序
// 让 GPIO2 上的蓝色 LED 以 1 秒间隔闪烁

void setup() {
  pinMode(2, OUTPUT);  // GPIO2 = ESP-01S 上的蓝色 LED
}

void loop() {
  digitalWrite(2, LOW);   // 点亮 LED (ESP-01S 是低电平点亮)
  delay(1000);            // 等待 1 秒
  digitalWrite(2, HIGH);  // 熄灭 LED
  delay(1000);            // 等待 1 秒
}
```

**烧录步骤**：
1. 将 ESP-01S 插入烧录器
2. 烧录器开关拨到 **PROG** 位置
3. 通过 USB 连接电脑
4. Arduino IDE → 工具 → 开发板 → Generic ESP8266 Module
5. 工具 → 端口 → 选择对应的 COM 口
6. 点击上传按钮 (→)
7. 烧录完成后开关拨回 **UART** 位置
8. 重新上电或按 RESET

**⚠️ 常见错误**：
- 上传失败 → 检查烧录器开关是否在 PROG 位置
- COM 口不显示 → 安装 CH340 驱动
- LED 不亮 → 检查代码中 GPIO 编号是否为 2

### 5. 理解程序结构 (1h)

**setup() vs loop()**：

```cpp
void setup() {
  // 只运行一次：初始化设置
  // 上电或复位后执行
}

void loop() {
  // 不断循环：主程序逻辑
  // setup() 完成后反复执行
}
```

**类比**：
- `setup()` = 早上起床后的准备工作（穿衣、刷牙）
- `loop()` = 一天中反复做的事情（呼吸、心跳）

### 6. 实验：修改闪烁模式 (1.5h)

**任务**：修改代码实现以下效果：

1. **SOS 信号**：快闪 3 次 → 慢闪 3 次 → 快闪 3 次 → 停顿
2. **呼吸灯效果**：LED 由暗变亮再变暗（提示：需要 `analogWrite()` 或 PWM）
3. **心跳效果**：两次快闪 → 停顿 → 重复

---

## 今日作业 | Today's Task

1. 确保 Blink 程序烧录成功并能正常运行
2. 完成至少一个闪烁模式修改实验
3. 阅读 `curriculum/prerequisites.md`，标记你不理解的名词
4. 在笔记本上画出 ESP-01S 的引脚图

## 今日检查点 | Checkpoint

上电后回答以下问题：
- [ ] ESP-01S 的蓝色 LED 在闪烁吗？
- [ ] 你知道 setup() 和 loop() 的区别吗？
- [ ] 你知道 ESP8266 的工作电压是多少吗？
- [ ] Arduino IDE 中能看到正确的 COM 口吗？
