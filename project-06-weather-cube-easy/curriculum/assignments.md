# 作业说明 | Assignments Overview

> 本文档定义了天气魔方（Easy 难度）项目的全部作业。所有作业遵循 [ASSIGNMENT_DESIGN_STANDARD.md](../../example_course_course_work/ASSIGNMENT_DESIGN_STANDARD.md) 标准。

---

## 作业总览 | Assignment Summary

本项目共设 **3 份正式作业 + 1 份 Week 1 Check-in + 12 天每日课后任务**。

| 编号 | 作业 | 截止日期 | 权重 | 核心产出 |
|------|------|---------|------|---------|
| HW1 | 硬件搭建与屏幕驱动 | Day 4 结束时 | 30% | 可工作的 OLED 显示项目（自定义文本 + 位图） |
| Week 1 Check-in | 第一周进度汇报 | Day 6 结束时 | 10% | 进度汇报文档 |
| HW2 | 联网数据获取与功能集成 | Day 8 结束时 | 35% | 可工作的天气站（时间 + 天气 + OLED 联动） |
| HW3 | 系统完善、文档与展示 | Day 12 结束时 | 25% | 完整项目 + README + Demo 网站 |

### 作业 Pipeline 依赖链

```
HW1（硬件+显示基础）
  ├─ 产出：能点亮 OLED、显示自定义文本和位图
  └─→ HW2 依赖此基础，在其上叠加 WiFi + API 数据

HW2（联网+数据集成）
  ├─ 产出：天气站核心功能完整（时间/天气/屏幕联动）
  └─→ HW3 依赖此基础，在其上完善配网/图标/文档

HW3（系统完善+交付）
  └─ 产出：完整可交付项目 + 文档 + Demo 网站
```

### 知识深度分布

| 层级 | 占比 | 说明 |
|------|------|------|
| **Layer 1: Know-What** | 50% | 识别、描述、画图——知道每个模块是什么 |
| **Layer 2: Know-Why** | 40% | 设计权衡、原理追问——理解为什么这样选择 |
| **Layer 3: Know-How** | 10% | 基本实现——能完成关键操作步骤 |

---

## 每日课后任务 | Daily After-Class Tasks

> 每天课后花 20-30 分钟完成，不单独评分但计入 Week 1 Check-in 和最终"自主学习"维度。

| 天数 | 任务 | 产出 | 预计时间 |
|------|------|------|---------|
| Day 1 | 在笔记本上画出 ESP-01S 的 8 个引脚图，标注每个引脚名称和功能；记录 Blink 程序中 `setup()` 和 `loop()` 各执行了几次 | 引脚手绘图 + 笔记 | 20 min |
| Day 2 | 用自己的话解释 I2C 通信的"主从关系"（类比生活中的例子）；截图你的 OLED 显示效果 | 类比文字（3-5句）+ 截图 | 25 min |
| Day 3 | 画出 WiFi Station 模式的连接流程图（设备→路由器→互联网）；记录串口监视器中 WiFi 连接成功的输出信息 | 流程图 + 串口截图 | 20 min |
| Day 4 | 手动访问和风天气 API 网址（用浏览器），观察返回的 JSON 数据结构；在笔记本上列出你想显示的 3 个天气字段 | JSON 打印/截图 + 字段列表 | 25 min |
| Day 5 | 解释 NTP 与 HTTP 获取时间的区别（提示：精度、复杂度、可靠性）；记录你的设备获取到的时间是否准确 | 对比文字（5-8句）+ 时间截图 | 20 min |
| Day 6 | 完成并提交 **Week 1 Check-in**（见下方） | Check-in 文档 | 30 min |
| Day 7 | 画出 AP 模式配网的流程图（手机→ESP8266→路由器）；列出 wifi_link_tool 的 3 个优点 | 流程图 + 优点列表 | 20 min |
| Day 8 | 记录你的天气站目前能显示的所有信息；拍一张硬件实物照片 | 信息清单 + 照片 | 15 min |
| Day 9 | （选做）记录 B站 API 返回的粉丝数；对比 HTTP 和 HTTPS 请求的差异 | 笔记 | 15 min |
| Day 10 | 画出 PC 监控功能的系统架构图（PC→HTTP Server→ESP8266→OLED） | 架构图 | 20 min |
| Day 11 | 拍摄你的外壳/整体组装照片；列出你认为项目中最需要文档说明的 3 个部分 | 照片 + 列表 | 15 min |
| Day 12 | 写一段 200 字的项目感言 | 感言文字 | 10 min |

---

# HW1: 硬件搭建与屏幕驱动 | Hardware Setup & Display Driver

> **截止日期**：Day 4 结束时 | **权重**：30% | **预计耗时**：课后 2-3 小时

## 学习成果 | Learning Outcomes

完成本作业后，你将能够：

1. **识别** ESP8266 微控制器和 SSD1306 OLED 显示屏的关键参数和工作条件
2. **解释** I2C 通信协议的工作原理以及本项目选择 I2C 而非 SPI 的原因
3. **实现** 一个能在 OLED 上显示自定义文本和位图图形的 Arduino 程序
4. **分析** 硬件接线中的常见错误并制定排查策略

## 为什么学这个 | Why This Matters

硬件搭建和屏幕驱动是整个天气站的**地基**。后面的天气数据、时间同步、WiFi 配网——所有信息最终都要通过这块 OLED 屏幕展示给用户。如果地基不稳（接线错误、驱动不会用），后面再漂亮的网络功能也"看不见"。

**日常类比**：想象你在盖一栋大楼。HW1 做的事情相当于"打地基 + 装窗户"。OLED 屏幕就是这栋楼的窗户——不管大楼里有多少精彩的房间（数据），如果窗户装不好，外面的人什么都看不到。I2C 通信就像窗户和墙壁之间的连接方式——选对连接方式，安装又快又稳；选错了，窗户可能漏风甚至装不上。

## 前置知识 | Prerequisites

- [ ] 已完成 Day 1-3 的课程内容
- [ ] 已安装 Arduino IDE 并添加 ESP8266 开发板支持
- [ ] 已成功烧录 Blink 程序
- [ ] 了解 C 语言基本语法（变量、函数、if/else）
- [ ] 阅读课程前置知识文档 `curriculum/prerequisites.md`

**参考资源**：
- [U8g2 库 Wiki](https://github.com/olikraus/u8g2/wiki)
- [SSD1306 数据手册（选读）](https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf)
- [I2C 协议入门视频（推荐）](https://www.bilibili.com/video/BV1kW4y1G7Qv/)

## 任务清单 | Task List

### 任务 1: 硬件接线与验证 (难度: ⭐)

**目标**：将 ESP-01S 与 SSD1306 OLED 通过 I2C 总线正确连接，确保硬件就绪。

**操作步骤**：

1. 取出 ESP-01S 和 SSD1306 OLED 模块，放在桌面上
2. 按照下表完成 4 根线的连接：

| ESP-01S 引脚 | OLED 模块引脚 | 线的颜色（建议） | 说明 |
|-------------|-------------|-------------|------|
| VCC (3.3V) | VCC | 红色 | 供电，**必须是 3.3V** |
| GND | GND | 黑色 | 地线 |
| GPIO4 | SDA | 绿色 | I2C 数据线 |
| GPIO5 | SCL | 黄色 | I2C 时钟线 |

3. 检查接线：用手轻轻拉每根线，确认没有松动
4. 将 ESP-01S 插入烧录器，烧录器开关拨到 UART 位置
5. 通过 USB 连接电脑，观察 OLED 背光是否亮起

**⚠️ 常见错误预警**：
- 接到 5V 而不是 3.3V → **OLED 可能烧毁**
- SDA 和 SCL 接反 → 通信完全失败，但不会损坏硬件
- 忘记接 GND → 电路不完整，OLED 不亮

**预期产出**：
- 接线完成的硬件实物照片 1 张
- OLED 背光亮起的照片 1 张

**验证方法**：
- 目视检查 4 根线连接正确
- OLED 背光亮起说明供电正常
- 如果 OLED 不亮，用万用表测量 VCC 引脚电压是否为 3.3V

---

### 任务 2: U8g2 库安装与 Hello World (难度: ⭐)

**目标**：安装 U8g2 显示库，并在 OLED 上显示 "Hello, Weather Cube!" 文字。

**操作步骤**：

1. 打开 Arduino IDE
2. 点击 `工具` → `管理库`
3. 搜索 `U8g2`，安装 `U8g2 by Oliver` （选择最新版本）
4. 新建一个 Sketch，输入以下代码：

```cpp
#include <U8g2lib.h>

// 创建 OLED 显示对象
// 参数说明：U8G2_R0 = 不旋转, U8X8_PIN_NONE = 不使用硬件复位
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

void setup() {
  u8g2.begin();            // 初始化 OLED
  u8g2.setFont(u8g2_font_ncenB08_tr);  // 设置字体
  u8g2.clearBuffer();      // 清空缓冲区
  u8g2.drawStr(0, 10, "Hello,");        // 在 (0,10) 位置绘制文字
  u8g2.drawStr(0, 30, "Weather Cube!"); // 在 (0,30) 位置绘制文字
  u8g2.sendBuffer();       // 将缓冲区内容发送到屏幕显示
}

void loop() {
  // 本次不需要循环做任何事情
}
```

5. 选择开发板：`工具` → `开发板` → `Generic ESP8266 Module`
6. 选择端口：`工具` → `端口` → 选择对应的 COM 口
7. 点击上传按钮（→）
8. 等待编译和烧录完成
9. 将烧录器开关拨回 UART 位置，按 RESET 或重新上电

**预期产出**：
- OLED 上显示两行文字："Hello," 和 "Weather Cube!" 的照片
- 完整的 `.ino` 文件

**验证方法**：
- 屏幕上能看到清晰的文字
- 如果显示乱码，检查字体设置是否为 `u8g2_font_ncenB08_tr`
- 如果屏幕全黑，检查接线是否正确

---

### 任务 3: 自定义文本显示实验 (难度: ⭐⭐)

**目标**：修改程序，在 OLED 上显示你自己选择的文字，理解 `drawStr()` 的坐标系统。

**操作步骤**：

1. 复制任务 2 的代码作为起点
2. 修改显示内容为以下信息（模拟天气站的显示布局）：
   - 第 1 行（y=12）：你的名字（英文或拼音）
   - 第 2 行（y=30）：今天的日期（如 "2026-06-15"）
   - 第 3 行（y=48）：一句你喜欢的话（英文）
3. 尝试修改 `drawStr()` 的第一个参数（x 坐标），观察文字如何移动
4. 尝试修改 `drawStr()` 的第二个参数（y 坐标），观察文字如何移动
5. 在笔记本上记录你的发现：x 坐标增大时文字往哪个方向移动？y 坐标增大时呢？

**关键理解点**：
- OLED 的坐标系原点 (0,0) 在**左上角**
- x 向右增大，y 向下增大
- `drawStr(x, y, text)` 中的 y 是**文字基线**位置，不是顶部

**预期产出**：
- 修改后的 `.ino` 文件
- OLED 显示 3 行自定义文字的照片
- 坐标系观察笔记（手写或打字均可）

**验证方法**：
- 3 行文字都能清晰显示，没有互相重叠
- 坐标系观察笔记中正确记录了 x/y 增大时的移动方向

---

### 任务 4: 位图绘制实验 (难度: ⭐⭐)

**目标**：使用 `drawXBMP()` 函数在 OLED 上显示一个位图图标，理解位图在嵌入式显示中的工作原理。

**操作步骤**：

1. 从项目资源文件夹 `resources/icons/` 中选择一个天气图标 BMP 文件（如 `100_结果.bmp`——晴天图标）
2. 使用在线工具 [image2cpp](https://javl.github.io/image2cpp/) 将 BMP 转换为 C 语言数组：
   - 上传 BMP 文件
   - 设置尺寸为 32x32 像素
   - 选择 "Code output format" → "Arduino Code → click to expand"
   - 复制生成的 `const unsigned char` 数组
3. 在代码中添加位图数组和显示代码：

```cpp
#include <U8g2lib.h>

U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

// 在这里粘贴从 image2cpp 生成的位图数组
// const unsigned char myBitmap[] PROGMEM = { ... };

#define bitmap_width 32
#define bitmap_height 32

void setup() {
  u8g2.begin();
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_ncenB08_tr);

  // 显示位图图标
  u8g2.drawXBMP(0, 0, bitmap_width, bitmap_height, myBitmap);

  // 在图标右侧显示文字
  u8g2.drawStr(36, 12, "Sunny");
  u8g2.drawStr(36, 30, "28°C");

  u8g2.sendBuffer();
}

void loop() {}
```

4. 编译并烧录，观察位图是否正确显示
5. 如果位图显示不正常，检查：
   - 位图尺寸是否与 `#define` 中的宽高一致
   - 数组名是否与 `drawXBMP()` 中的名称一致

**预期产出**：
- 显示位图图标 + 文字的 OLED 照片
- 包含位图数组的完整 `.ino` 文件

**验证方法**：
- 屏幕上能看到一个可辨识的图标（不要求完美，但轮廓应可辨认）
- 图标和文字同时显示，互不遮挡

---

### 任务 5: 理解 I2C 通信原理 (难度: ⭐⭐)

**目标**：通过实际观察和记录，理解 I2C 通信在项目中的作用和特点。

**操作步骤**：

1. 回顾你的接线：ESP8266（主机）和 OLED（从机）之间只有 SDA 和 SCL 两根线
2. 在 Arduino IDE 中打开串口监视器（`工具` → `串口监视器`，波特率设为 115200）
3. 在你的代码 `setup()` 中添加以下调试输出：

```cpp
void setup() {
  Serial.begin(115200);
  delay(100);
  Serial.println("=== I2C Debug Info ===");
  Serial.print("SDA Pin: GPIO4, SCL Pin: GPIO5");
  Serial.println();

  u8g2.begin();
  if (u8g2.begin()) {
    Serial.println("OLED init: SUCCESS");
  } else {
    Serial.println("OLED init: FAILED - check wiring!");
  }

  // ... 其余代码 ...
}
```

4. 烧录并观察串口输出
5. 做一个实验：**拔掉 SDA 线**，重新上电，观察串口输出和屏幕表现
6. 重新插回 SDA 线，再次观察
7. 在笔记本上记录实验结果

**预期产出**：
- 串口输出的截图（正常和断线两种情况）
- 实验观察记录（2-3 句话描述你看到了什么）

**验证方法**：
- 正常情况下串口输出 "OLED init: SUCCESS"
- 断开 SDA 后串口输出 "OLED init: FAILED"
- 重新连接后恢复正常

## 理解验证问题 | Comprehension Check

> ⚠️ **请先回答以下问题，再提交作业。** 这些问题没有标准对错，但你的思考深度会直接影响评分。

**Q1（设计权衡题）**：I2C vs SPI

本项目使用 I2C 连接 OLED 而不是 SPI。从以下三个角度分析为什么 I2C 是更合适的选择：

1. **引脚数量**：ESP-01S 只有 8 个引脚，其中可用的 GPIO 仅有 4 个（GPIO0/2/4/5）
2. **速度需求**：OLED 刷新天气信息，每 30 分钟才更新一次
3. **多设备场景**：未来可能还要在 I2C 总线上挂载更多传感器

> **参考答案**：
> - 引脚数量：I2C 只需 2 根线（SDA + SCL），而 SPI 至少需要 4 根（MOSI + MISO + SCK + CS）。ESP-01S 的 GPIO 极其有限，用 I2C 可以省下宝贵的引脚给其他功能（如按钮、传感器）。这就像住在小公寓里，选择折叠家具（I2C）而不是固定家具（SPI），因为空间（引脚）有限。
> - 速度需求：SPI 的速度可达数十 MHz，I2C 标准模式只有 100 kHz。但我们的 OLED 每半小时才刷新一次，128x64 的屏幕数据量也很小（1KB），I2C 的速度完全够用。就像买菜不需要开跑车，自行车就够了。
> - 多设备场景：I2C 是总线结构，多个从机共享同一对 SDA/SCL 线，每个设备有不同的地址。如果未来添加 I2C 传感器（如 BME280 温湿度传感器），不需要额外引脚。SPI 每增加一个设备就需要多一根 CS 片选线。I2C 就像公交路线——一辆车可以经过多站；SPI 像出租车——每趟只服务一个乘客。

**Q2（原理追问题）**：3.3V 电压

ESP8266 的工作电压是 3.3V，而不是 Arduino Uno 的 5V。如果你不小心把 OLED 接到了 5V 电源上，会发生什么？为什么？

> **参考答案**：
> - SSD1306 OLED 的工作电压范围通常是 1.65V-3.3V。接到 5V 会超过其最大额定电压，可能导致芯片内部电路过压损坏——具体表现为 OLED 永久性黑屏或烧毁。
> - 更隐蔽的风险是：即使 OLED 模块上有稳压电路（有些模块自带 3.3V 稳压器），I2C 信号线的电平也会不匹配。ESP8266 的 GPIO 输出 3.3V 高电平，如果 OLED 期望 5V 电平的信号，可能无法正确识别"高"状态，导致通信失败。
> - 类比：就像给一个 110V 的美国电器插到 220V 的中国插座上——轻则工作异常，重则烧毁。

**Q3（故障分析题）**：坐标系

你的同学告诉你，他写的代码中 `drawStr(0, 0, "Hello")` 什么都看不到，但 `drawStr(0, 10, "Hello")` 就能正常显示。可能的原因是什么？

> **参考答案**：
> - `drawStr()` 的 y 坐标指定的是文字的**基线位置**（baseline），不是文字顶部。当 y=0 时，文字基线在最顶端，大部分像素画在了 y=0 以上的区域——即屏幕外面，所以看不到。当 y=10 时，基线下移，文字的主要像素都在可见区域内。
> - 这类似于在纸上写字：如果以纸的最边缘作为"行线"，字的上半部分就写到纸外面去了。你需要留出足够的上方空间来容纳字的上半部分。

## 提交要求 | Submission Requirements

请将以下文件打包提交（ZIP 或直接提交到 Git 仓库）：

1. **代码文件**：
   - `hw1_task2_helloworld.ino` — 任务 2 的 Hello World 代码
   - `hw1_task3_custom_text.ino` — 任务 3 的自定义文本代码
   - `hw1_task4_bitmap.ino` — 任务 4 的位图显示代码
2. **截图/照片**：
   - `hw1_wiring.jpg` — 硬件接线照片
   - `hw1_helloworld.jpg` — Hello World 显示照片
   - `hw1_custom_text.jpg` — 自定义文本显示照片
   - `hw1_bitmap.jpg` — 位图显示照片
   - `hw1_i2c_normal.jpg` — I2C 正常时串口截图
   - `hw1_i2c_failed.jpg` — I2C 断线时串口截图
3. **理解验证回答**：3 个问题的回答（写在 `hw1_comprehension.md` 中，每个回答 80-150 字）
4. **坐标系笔记**：`hw1_coordinate_notes.md`（简短即可，3-5 句话）

**代码规范检查清单**：
- [ ] 每个 `.ino` 文件开头有注释说明功能
- [ ] 关键代码行有中文或英文注释
- [ ] 变量名有意义（不用 a, b, c 等单字母名）
- [ ] 代码能正常编译和运行

## 评分标准 | Rubric

| 维度 | 满分 | 评分细则 |
|------|------|---------|
| **任务完成度** | 40 | 每完成一个任务得 8 分。任务 1-5 各 8 分，全部完成得 40 分。部分完成按完成程度给 3-6 分 |
| **理解验证质量** | 30 | 每题 10 分。能从多个角度分析且类比起当得 8-10 分；有分析但不够深入得 5-7 分；仅复述事实得 2-4 分；未作答 0 分 |
| **代码与文档质量** | 20 | 代码有注释、命名规范、文件齐全得 16-20 分；基本规范得 10-15 分；缺少注释或命名混乱得 5-9 分 |
| **坐标系实验笔记** | 10 | 正确描述 x/y 方向得 7-10 分；有记录但部分错误得 4-6 分；未提交 0 分 |
| **总计** | **100** | — |

---

# Week 1 Check-in: 第一周进度汇报 | Week 1 Progress Report

> **截止日期**：Day 6 结束时 | **权重**：10% | **预计耗时**：30 分钟

## 汇报要求

- **字数**：600-1200 字（中文或英文）
- **格式**：Markdown 文件，提交为 `week1-checkin.md`

## 必须包含的内容

### 1. 已完成的功能列表（配截图/照片）

列出 Day 1 到 Day 6 中你完成了哪些功能。每个功能配一张截图或照片作为证据。

**示例格式**：

| 功能 | 完成状态 | 证据 |
|------|---------|------|
| Blink 闪烁 | ✅ 完成 | 截图 hw1_blink.jpg |
| OLED 显示文字 | ✅ 完成 | 截图 hw1_helloworld.jpg |
| WiFi 连接 | ✅ 完成 | 串口截图 |
| 天气 API 调用 | 🔄 进行中 | — |
| NTP 时间同步 | ❌ 未开始 | — |

### 2. 遇到的主要困难和解决方案

至少描述 **3 个技术问题**，格式为：

- **现象**：你看到了什么不正常的表现？
- **原因分析**：你认为是什么导致了这个问题？
- **解决方法**：你做了什么来修复它？

**示例**：
> **问题**：OLED 屏幕不亮
> **现象**：上传代码后，OLED 完全黑屏
> **原因分析**：用万用表测量发现 VCC 引脚电压为 0V，说明供电线没有接好
> **解决方法**：重新插紧 VCC 排线，OLED 背光正常亮起

### 3. 第二周计划

逐日列出 Day 7-12 的预期目标：

| 天数 | 计划目标 |
|------|---------|
| Day 7 | 完成 WiFi 配网功能 |
| Day 8 | ... |
| ... | ... |

### 4. 个人反思

写一段 150-300 字的反思，回答以下问题：
- 这一周你学到的最重要的一个知识点是什么？
- 你觉得哪个部分最难？为什么？
- 如果重新来过，你会怎么做 differently？

## 评分标准 | Rubric

| 维度 | 满分 | 评分细则 |
|------|------|---------|
| **内容详细程度与真实性** | 40 | 功能列表完整且配证据得 30-40 分；基本完整但缺少证据得 20-29 分；内容简陋得 10-19 分 |
| **问题分析深度** | 30 | 3 个问题都有现象→原因→解决得 25-30 分；分析但不深入得 15-24 分；仅列出问题无分析得 5-14 分 |
| **计划的可行性** | 20 | 计划具体、可执行得 15-20 分；计划笼统得 8-14 分；无计划 0 分 |
| **反思的真诚度** | 10 | 有具体感悟而非套话得 8-10 分；有一定反思得 4-7 分；流水账 0-3 分 |
| **总计** | **100** | — |

---

# HW2: 联网数据获取与功能集成 | Network Data & Feature Integration

> **截止日期**：Day 8 结束时 | **权重**：35% | **预计耗时**：课后 3-4 小时

## 学习成果 | Learning Outcomes

完成本作业后，你将能够：

1. **识别** WiFi Station 模式、HTTP/HTTPS 请求、JSON 数据格式和 NTP 协议的基本概念
2. **解释** 为什么天气站需要 HTTPS 而不是 HTTP 来获取天气数据，以及 NTP 相比手动设置时间的优势
3. **实现** 一个能连接 WiFi、调用和风天气 API、解析 JSON 并在 OLED 上显示天气信息的完整程序
4. **分析** 当天气数据获取失败时的可能原因并制定排查方案

## 为什么学这个 | Why This Matters

HW1 让你的天气站有了"窗户"（OLED 屏幕），但窗户后面是空的——没有数据可显示。HW2 要做的是给大楼装上"水管和电线"：WiFi 是网络管道，API 是数据来源，JSON 解析是翻译器，NTP 是时钟校准。只有这些"基础设施"都通了，天气站才有灵魂——能显示**真实的、实时的**天气信息。

**日常类比**：HW1 像买了一台电视机（有屏幕），HW2 像接上有线电视信号（有内容）。电视再好，没有信号也只是个黑盒子。WiFi 连接就像拉网线，API 调用就像调到正确的频道，JSON 解析就像把电视信号翻译成画面。

## 前置知识 | Prerequisites

- [ ] **HW1 已完成**：OLED 能正常显示文字和位图
- [ ] 已完成 Day 3-6 的课程内容
- [ ] 了解 WiFi 的基本概念（SSID、密码、路由器）
- [ ] 已注册和风天气开发者账号并获取 API Key

**参考资源**：
- [和风天气 API 开发文档](https://dev.qweather.com/)
- [ArduinoJson 库文档](https://arduinojson.org/)
- [ESP8266 WiFiClientSecure 示例](https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi/examples)

## 任务清单 | Task List

### 任务 1: WiFi 连接测试 (难度: ⭐)

**目标**：编写程序让 ESP8266 连接到你的家庭 WiFi 网络，并在串口监视器中显示连接状态和 IP 地址。

**操作步骤**：

1. 新建一个 Arduino Sketch
2. 输入以下代码（将 SSID 和密码替换为你的 WiFi 信息）：

```cpp
#include <ESP8266WiFi.h>

const char* ssid = "你的WiFi名称";      // 替换为你的 WiFi SSID
const char* password = "你的WiFi密码";  // 替换为你的 WiFi 密码

void setup() {
  Serial.begin(115200);
  delay(100);
  Serial.println();
  Serial.println("=== WiFi Connection Test ===");

  WiFi.mode(WIFI_STA);          // 设置为 Station 模式
  WiFi.begin(ssid, password);   // 开始连接

  Serial.print("Connecting to ");
  Serial.print(ssid);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.println("WiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    Serial.print("Signal strength (RSSI): ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  } else {
    Serial.println();
    Serial.println("WiFi connection FAILED!");
    Serial.println("Check: 1) SSID/password 2) Router is on 3) Signal strength");
  }
}

void loop() {
  // 每 10 秒打印一次 WiFi 状态
  delay(10000);
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("WiFi OK, RSSI: ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  } else {
    Serial.println("WiFi disconnected! Reconnecting...");
    WiFi.begin(ssid, password);
  }
}
```

3. 编译烧录，打开串口监视器（波特率 115200）
4. 观察连接过程：打印了多少个点？最终显示的 IP 地址是什么？
5. 记录 RSSI 信号强度值（负数，越接近 0 信号越强）

**⚠️ 常见错误预警**：
- SSID 或密码写错 → 连接超时，串口显示 "FAILED"
- 学校/公共 WiFi 需要网页认证 → 无法直接连接
- ESP-01S 天线面朝金属物体 → 信号极弱

**预期产出**：
- `hw2_task1_wifi.ino` 文件
- 串口监视器截图（显示连接成功和 IP 地址）

**验证方法**：
- 串口输出显示 "WiFi connected!" 和有效的 IP 地址（如 192.168.x.x）
- RSSI 值在 -30 到 -70 之间表示信号正常

---

### 任务 2: 和风天气 API 调用 (难度: ⭐⭐)

**目标**：通过 HTTPS 请求调用和风天气 API，获取你所在城市的实时天气数据，并将返回的 JSON 打印到串口监视器。

**操作步骤**：

1. 确保你已有和风天气 API Key（在 [dev.qweather.com](https://dev.qweather.com/) 免费注册）
2. 查找你所在城市的 Location ID（在和风天气控制台搜索城市）
3. 新建 Sketch，输入以下代码（替换 API Key 和 Location ID）：

```cpp
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

const char* ssid = "你的WiFi名称";
const char* password = "你的WiFi密码";
const char* apiKey = "你的和风天气API_KEY";    // 替换
const char* location = "你的城市LocationID";    // 替换，如 "101010100" 为北京

void setup() {
  Serial.begin(115200);
  delay(100);

  // 连接 WiFi（同任务 1）
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");

  // 创建 HTTPS 客户端
  WiFiClientSecure client;
  client.setInsecure();  // 跳过证书验证（简化版，生产环境不推荐）

  // 构建 API 请求 URL
  String url = "/v7/weather/now?location=" + String(location) + "&key=" + String(apiKey);

  // 连接和风天气服务器
  const char* host = "devapi.qweather.com";
  if (client.connect(host, 443)) {
    Serial.println("Connected to weather server!");

    // 发送 HTTP GET 请求
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n\r\n");

    // 等待并读取响应
    delay(1000);
    String response = "";
    while (client.available()) {
      response += client.readString();
    }

    // 打印完整响应（用于调试）
    Serial.println("=== API Response ===");
    Serial.println(response);
  } else {
    Serial.println("Connection to server FAILED!");
  }
}

void loop() {}
```

4. 烧录运行，观察串口输出的 JSON 数据
5. 在串口输出中找到以下关键信息并记录：
   - `temp`（温度）
   - `text`（天气描述，如"晴"）
   - `icon`（天气图标代码）
   - `humidity`（湿度）

**⚠️ 常见错误预警**：
- `client.setInsecure()` 被误删 → HTTPS 连接会失败
- API Key 写错 → 返回 `"code": "401"` 错误
- Location ID 格式不对 → 返回 `"code": "404"` 错误
- 每日 API 调用超过 1000 次 → 返回 `"code": "429"` 限流

**预期产出**：
- `hw2_task2_api.ino` 文件
- 串口截图（显示完整的 JSON 响应）
- 手动记录的 4 个关键字段值

**验证方法**：
- 串口输出包含完整的 JSON 字符串
- JSON 中的 `"code": "200"` 表示请求成功
- 温度、天气描述等字段值合理（如温度在 -40 到 50 之间）

---

### 任务 3: JSON 数据解析 (难度: ⭐⭐)

**目标**：使用 ArduinoJson 库从 API 返回的 JSON 数据中提取天气关键字段，并格式化输出到串口。

**操作步骤**：

1. 在 Arduino IDE 中安装 `ArduinoJson` 库（`工具` → `管理库` → 搜索 "ArduinoJson"）
2. 在任务 2 的代码基础上添加 JSON 解析功能：

```cpp
#include <ArduinoJson.h>

// 在读取响应后，添加以下解析代码：
// （注意：实际代码中需要先分离 HTTP 头部和 JSON 正文）

// 假设 jsonBody 是纯 JSON 字符串
DynamicJsonDocument doc(1024);  // 分配 1024 字节的 JSON 缓冲区
deserializeJson(doc, jsonBody);

// 提取字段
const char* code = doc["code"];
if (strcmp(code, "200") == 0) {
  JsonObject now = doc["now"];
  const char* temp = now["temp"];       // 温度
  const char* text = now["text"];       // 天气描述
  const char* icon = now["icon"];       // 图标代码
  const char* humidity = now["humidity"];// 湿度

  Serial.println("=== Parsed Weather Data ===");
  Serial.print("Temperature: "); Serial.println(temp);
  Serial.print("Condition: "); Serial.println(text);
  Serial.print("Icon code: "); Serial.println(icon);
  Serial.print("Humidity: "); Serial.println(humidity);
} else {
  Serial.print("API error, code: "); Serial.println(code);
}
```

3. 提示：从 HTTP 响应中分离 JSON 正文的方法——找到第一个 `{` 的位置，从那里开始截取
4. 烧录运行，确认串口输出了解析后的天气数据

**预期产出**：
- `hw2_task3_json.ino` 文件
- 串口截图（显示解析后的天气数据，非原始 JSON）

**验证方法**：
- 串口输出的温度、天气描述等与和风天气网站/APP 上显示的一致
- 没有乱码或空白字段

---

### 任务 4: 天气数据 OLED 屏幕显示集成 (难度: ⭐⭐⭐)

**目标**：将 HW1 的 OLED 显示能力与任务 1-3 的 WiFi + API 数据能力整合，实现天气站的核心功能：OLED 上显示实时天气信息。

**操作步骤**：

1. 创建一个新的 Sketch `hw2_task4_weather_display.ino`
2. 整合之前所有模块的代码，实现以下显示布局：

```
┌────────────────────────┐
│  ☀  晴    28°C        │  ← 天气图标 + 描述 + 温度
│  湿度: 45%             │  ← 湿度
│  2026-06-15 14:30      │  ← 日期和时间（先用手动设置的固定值）
└────────────────────────┘
```

3. 代码结构建议：
   - `setup()` 中：初始化串口、WiFi、OLED
   - `loop()` 中：每 30 分钟调用一次 API，更新显示
   - 使用 `millis()` 而不是 `delay()` 来计时（避免阻塞）

4. 先用**固定数据**测试显示布局（不调用 API），确认布局正确
5. 然后替换为**真实 API 数据**，观察是否能正确显示

**关键理解点**：
- 先测试布局，再接入真实数据——这是嵌入式开发的常见策略
- `millis()` 返回从开机到现在的毫秒数，用差值计时比 `delay()` 更灵活

**预期产出**：
- `hw2_task4_weather_display.ino` 文件
- OLED 显示实时天气的照片
- 串口截图（显示 API 调用成功和解析结果）

**验证方法**：
- OLED 上显示的温度、天气与实际天气一致
- 布局清晰，文字不重叠、不溢出
- 30 分钟后能自动更新数据（或手动按 RESET 触发更新也可接受）

---

### 任务 5: NTP 时间同步 (难度: ⭐⭐)

**目标**：使用 NTP 协议从网络获取精确时间，替换任务 4 中手动设置的固定时间。

**操作步骤**：

1. 在任务 4 的代码中添加 NTP 功能
2. 参考课程 Day 5 的代码示例，在 `setup()` 中启动 NTP 同步
3. 在 `loop()` 中定期获取 NTP 时间并更新 OLED 显示
4. 测试时间是否准确（与手机时间对比，误差应在 1 分钟以内）

**代码片段提示**：

```cpp
#include <NtpClientLib.h>

// 在 setup() 中
NTP.begin("ntp.aliyun.com", 8);  // 使用阿里云 NTP，时区 UTC+8
NTP.setInterval(1800);            // 每 30 分钟同步一次

// 在显示函数中
String timeStr = NTP.getTimeStr();    // 获取时间字符串 "14:30"
String dateStr = NTP.getDateStr();    // 获取日期字符串 "2026-06-15"
```

5. 观察：首次同步需要多长时间？同步前后时间差多少？

**预期产出**：
- `hw2_task5_ntp.ino` 文件（在任务 4 基础上添加 NTP）
- OLED 显示正确时间的照片
- 与手机时间对比的照片

**验证方法**：
- OLED 显示的时间与手机时间一致（误差 < 1 分钟）
- 日期显示正确（年月日）

## 理解验证问题 | Comprehension Check

**Q1（设计权衡题）**：HTTPS vs HTTP

和风天气 API 使用 HTTPS（443 端口）而不是 HTTP（80 端口）。从以下角度分析为什么：

1. **数据安全**：你发送的请求和收到的响应中包含什么敏感信息？
2. **资源开销**：HTTPS 在 ESP8266 上需要额外的什么资源？代码中 `client.setInsecure()` 做了什么妥协？
3. **如果换用 HTTP**：会出现什么问题？

> **参考答案**：
> - 数据安全：请求中包含你的 API Key（相当于私人密码），响应中包含你所在位置的天气数据。如果用 HTTP，这些信息在网络上是明文传输的，任何中间节点（如路由器、运营商）都可以看到你的 API Key 并盗用。
> - 资源开销：HTTPS 需要 TLS 加密，ESP8266 上使用 BearSSL 库，大约占用 20KB 内存。`client.setInsecure()` 跳过了服务器证书验证——这意味着虽然数据是加密传输的，但我们不验证"对面是不是真的是和风天气服务器"。这是一个安全与便利的权衡：对于天气数据来说风险不大，但如果是银行交易就绝对不行。
> - 如果换用 HTTP：API Key 明文传输容易被截获盗用，且越来越多的 API 服务商已经完全禁止 HTTP 访问。就像寄信：HTTP 是明信片（谁都能看到内容），HTTPS 是密封信封（内容加密但 `setInsecure` 相当于没检查寄件人身份）。

**Q2（原理追问题）**：JSON vs 纯文本格式

和风天气 API 返回 JSON 格式的数据，而不是像"北京,晴,28度,45%"这样的纯文本。为什么 API 设计者选择 JSON？从以下角度分析：

1. **结构化程度**：天气数据包含哪些层级的信息？
2. **可扩展性**：如果未来要增加新的数据字段（如风速、紫外线指数），JSON 和纯文本哪个更容易？
3. **解析难度**：在 ESP8266 上，ArduinoJson 库帮我们做了什么？

> **参考答案**：
> - 结构化程度：天气数据是分层的——顶层有响应码 `code`，`now` 对象下有温度、天气描述、湿度等，`updateTime` 记录数据更新时间。JSON 的嵌套结构天然适合这种层级关系。纯文本需要约定分隔符顺序（如逗号分隔的第 3 个字段是湿度），容易出错。
> - 可扩展性：JSON 新增字段只需要在对象中加一个键值对，已有的解析代码不受影响（忽略未知字段即可）。纯文本新增字段可能导致位置偏移，所有解析代码都要改。就像书包：JSON 像有标签的多层文件夹，加一层不影响已有文件；纯文本像把所有东西排成一排，中间插一个后面的全要挪位。
> - ArduinoJson 做了：将 JSON 字符串解析为内存中的文档对象，你可以用 `doc["now"]["temp"]` 这样的方式直接"按名字查找"，而不需要手动数逗号位置。它还处理了内存分配和类型转换。

**Q3（故障分析题）**：网络请求

你的天气站运行了一天之后突然不再更新天气数据了。串口显示 API 返回 `"code": "429"`。这可能是什么原因？你会如何解决？

> **参考答案**：
> - `"code": "429"` 是 HTTP 状态码，表示"请求过多"（Too Many Requests）。和风天气免费版限制每天 1000 次调用。如果程序中的更新间隔太短（比如每 1 分钟更新一次），一天就会调用 1440 次，超过限制。
> - 解决方案：
>   1. 增大更新间隔：从 1 分钟改为 30 分钟，每天只需 48 次调用
>   2. 添加错误处理：收到 429 时停止请求，等到第二天重置
>   3. 本地缓存：上次获取的数据保存在变量中，网络失败时显示缓存数据而不是空白
> - 类比：就像手机流量套餐——用超了就被限速。合理使用的方式是控制每次刷新的频率，而不是无限制地请求。

## 提交要求 | Submission Requirements

请将以下文件打包提交：

1. **代码文件**：
   - `hw2_task1_wifi.ino` — WiFi 连接测试
   - `hw2_task2_api.ino` — API 调用
   - `hw2_task3_json.ino` — JSON 解析
   - `hw2_task4_weather_display.ino` — 完整天气显示集成
   - `hw2_task5_ntp.ino` — NTP 时间同步
2. **截图/照片**：
   - `hw2_wifi_connected.jpg` — WiFi 连接成功的串口截图
   - `hw2_api_response.jpg` — API 返回的 JSON 数据截图
   - `hw2_json_parsed.jpg` — 解析后的天气数据截图
   - `hw2_weather_display.jpg` — OLED 显示天气的照片
   - `hw2_ntp_time.jpg` — OLED 显示正确时间的照片
3. **理解验证回答**：`hw2_comprehension.md`（3 个问题，每个 80-150 字）
4. **API 数据记录**：`hw2_api_data.md`（记录你从 API 获取的 4 个关键字段值）

**代码规范检查清单**：
- [ ] 每个 `.ino` 文件开头有注释说明功能
- [ ] API Key 和 WiFi 密码使用变量，不硬编码在逻辑代码中
- [ ] 关键代码行有注释
- [ ] 网络请求有基本的错误处理（检查连接状态）

## 评分标准 | Rubric

| 维度 | 满分 | 评分细则 |
|------|------|---------|
| **任务完成度** | 35 | 每完成一个任务得 7 分（5 个任务）。部分完成按完成程度给 3-5 分 |
| **理解验证质量** | 30 | 每题 10 分。能从多个角度分析且类比起当得 8-10 分；有分析但不够深入得 5-7 分；仅复述事实得 2-4 分；未作答 0 分 |
| **代码与文档质量** | 20 | 代码有注释、错误处理、变量命名规范得 16-20 分；基本规范得 10-15 分；缺少注释或无错误处理得 5-9 分 |
| **集成效果** | 15 | 任务 4 的 OLED 显示布局清晰、数据正确得 12-15 分；能显示但布局有问题得 7-11 分；无法集成得 0-6 分 |
| **总计** | **100** | — |

---

# HW3: 系统完善、文档与展示 | System Polish, Documentation & Presentation

> **截止日期**：Day 12 结束时 | **权重**：25% | **预计耗时**：课后 3-4 小时

## 学习成果 | Learning Outcomes

完成本作业后，你将能够：

1. **识别** 一个完整的 IoT 项目应包含的文档要素（README、接线图、调试指南等）
2. **解释** WiFi 配网（AP 模式）相比硬编码 WiFi 密码的用户体验优势
3. **实现** 一个具备 WiFi 配网、完整 UI 显示、可选拓展功能的最终天气站
4. **设计** 并完成一个 5-8 分钟的项目演示，清晰讲解技术选择和设计权衡

## 为什么学这个 | Why This Matters

HW2 让天气站有了"灵魂"（能显示真实数据），但 HW3 要做的是让它成为一件**可交付的产品**。就像一栋大楼，主体结构完成了，还需要：装修（UI 完善、配网）、验收文档（README、接线图）、开放参观（Demo 演示）。

没有文档的项目，就像没有说明书的电器——别人不知道怎么用，甚至你自己一个月后也忘了怎么接线。没有演示的项目，就像只存在于图纸上的建筑——你的努力无法被看见和认可。

**日常类比**：HW1 是买电视，HW2 是接信号，HW3 是——调好画面、写好使用说明书、然后请朋友来看！

## 前置知识 | Prerequisites

- [ ] **HW2 已完成**：天气站核心功能可用（WiFi + API + JSON + OLED）
- [ ] 已完成 Day 7-11 的课程内容
- [ ] 了解 AP 模式的基本概念
- [ ] 了解 GitHub Pages 或其他静态网站托管方式

## 任务清单 | Task List

### 任务 1: WiFi 配网功能集成 (难度: ⭐⭐)

**目标**：使用 wifi_link_tool 库替换代码中硬编码的 WiFi 信息，实现用户友好的配网流程。

**操作步骤**：

1. 下载 wifi_link_tool 库：[github.com/bilibilifmk/wifi_link_tool](https://github.com/bilibilifmk/wifi_link_tool)
2. 将库文件放入 Arduino 的 `libraries` 文件夹
3. 在你的天气站代码中集成配网功能：

```cpp
#include <wifi_link_tool.h>

void setup() {
  Serial.begin(115200);

  // 启动配网（如果已保存过 WiFi 信息则自动连接）
  wifi_link_tool_start();

  // 检查是否连接成功
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi connected via wifi_link_tool!");
    // ... 初始化 OLED、NTP 等 ...
  } else {
    Serial.println("Please configure WiFi via AP mode");
    // 设备会自动开启 AP 模式，手机连接后访问 192.168.4.1 配置
  }
}
```

4. 测试配网流程：
   - 烧录代码后，用手机搜索 ESP8266 的 WiFi 热点
   - 连接热点，在浏览器中输入 `192.168.4.1`
   - 在网页中选择你的家庭 WiFi 并输入密码
   - 观察设备是否成功连接

5. 测试记忆功能：断电重启后，设备是否能自动连接上次配置的 WiFi

**预期产出**：
- 集成配网功能后的 `hw3_task1_wifi_config.ino` 文件
- 手机配网页面截图
- 配网成功后 OLED 显示天气的照片

**验证方法**：
- 手机能看到 ESP8266 的 AP 热点
- 配网页面能正常访问
- 输入 WiFi 密码后设备能成功连接并获取数据
- 重启后自动连接（不需要再次配网）

---

### 任务 2: UI 完善与图标集成 (难度: ⭐⭐)

**目标**：完善 OLED 显示界面，添加天气图标，使信息展示更加美观和专业。

**操作步骤**：

1. 从 `resources/icons/` 文件夹中选择所有需要的天气图标
2. 使用 image2cpp 工具批量转换为 C 数组
3. 设计最终的屏幕布局（建议）：

```
┌────────────────────────┐
│  ☀  晴   28°C  💧45%  │  ← 图标 + 描述 + 温度 + 湿度
│  PM2.5: 35 (良)        │  ← 空气质量
│  2026-06-15             │  ← 日期
│  14:30 更新             │  ← 时间 + 更新标记
└────────────────────────┘
```

4. 根据和风天气 API 返回的 `icon` 字段（如 "100" 表示晴天），用 `switch-case` 或数组映射选择对应的位图
5. 测试不同天气条件下的显示效果（可以手动修改 icon 代码测试）

**预期产出**：
- `hw3_task2_final_ui.ino` 文件
- 不同天气图标显示的照片（至少 3 种天气）

**验证方法**：
- 图标与 API 返回的天气描述一致
- 布局在 128x64 像素内合理排列
- 中文或英文文字都能正常显示

---

### 任务 3: 项目文档撰写 (难度: ⭐⭐)

**目标**：撰写完整的项目 README.md 文档，让一个从未见过此项目的人也能按文档复现。

**操作步骤**：

1. 在项目根目录创建或更新 `README.md`
2. 按以下结构撰写文档：

```markdown
# 桌面天气站 "天气魔方"

## 项目简介
（2-3 句话描述你的项目做什么）

## 最终效果
（添加 2-3 张实物照片）

## 硬件清单
（列出所有使用的硬件部件和规格）

## 接线图
（手画或用工具画，标注每根线的连接）

## 软件环境
- Arduino IDE 版本
- ESP8266 开发板版本
- 使用的库及版本

## 使用步骤
1. 克隆仓库
2. 在 config.h 中填入你的 API Key
3. 上传代码
4. 首次使用通过 AP 模式配网
5. 等待数据更新

## 功能列表
（列出所有已实现的功能）

## 已知问题
（列出你知道但未修复的问题）

## 致谢
（感谢开源项目、教程等）
```

3. 重点检查接线图是否清晰、使用步骤是否完整
4. 让一位同学阅读你的 README，看他是否能理解——如果不能，继续完善

**预期产出**：
- 完整的 `README.md` 文件

**验证方法**：
- 文档结构完整，每个章节都有内容
- 接线图清晰可读
- 按文档步骤可以成功运行项目

---

### 任务 4: Demo 网站搭建 (难度: ⭐)

**目标**：创建一个展示项目的静态网站，部署到 GitHub Pages 或其他免费托管平台。

**操作步骤**：

1. 在项目根目录创建 `docs/` 文件夹
2. 创建 `docs/index.html`，包含以下内容：
   - 项目标题和简介
   - 实物照片（2-3 张）
   - 功能展示（截图或 GIF）
   - 技术架构图（简单的方框图即可）
   - 制作过程和心得（200-300 字）
3. 部署到 GitHub Pages：
   - 在 GitHub 仓库的 Settings → Pages 中选择 `docs/` 文件夹
   - 等待部署完成
   - 访问 `https://你的用户名.github.io/仓库名/`
4. 如果没有 GitHub 账号，可以将 `index.html` 用浏览器本地打开截图

**预期产出**：
- `docs/index.html` 文件
- 网站 URL 或本地截图

**验证方法**：
- 网站能正常访问
- 内容完整（简介 + 照片 + 功能 + 架构 + 心得）

---

### 任务 5: 最终演示准备与执行 (难度: ⭐⭐)

**目标**：准备并完成 5-8 分钟的项目口头演示 + 2-3 分钟 Q&A。

**操作步骤**：

1. 准备演示 PPT 或大纲（3-5 页即可）：
   - 第 1 页：项目背景与目标
   - 第 2 页：技术架构（方框图：ESP8266 ↔ WiFi ↔ API ↔ OLED）
   - 第 3 页：实物展示 + 功能演示
   - 第 4 页：关键技术点讲解（重点：**为什么这样设计**）
   - 第 5 页：遇到的问题与收获

2. 准备演示用的实物：
   - 确保天气站能正常运行
   - 准备好备用方案（录制视频，以防现场网络问题）
   - 准备好展示不同天气图标的方式

3. 练习演示（至少 2 遍）：
   - 第 1 遍：自己对着镜子/手机录像练习
   - 第 2 遍：请朋友/同学当观众，模拟 Q&A

4. 在正式演示时遵循以下结构：
   | 部分 | 时长 | 内容 |
   |------|------|------|
   | 背景与目标 | 1 min | 为什么做这个项目 |
   | 技术架构 | 1 min | 系统由哪些模块组成 |
   | 实物演示 | 2-3 min | 展示硬件和功能 |
   | 技术讲解 | 1-2 min | 选一个设计权衡深入讲解 |
   | 问题与收获 | 1 min | 诚实分享遇到的困难 |

5. **演示技巧**：
   - ✅ 展示实物比 PPT 更重要
   - ✅ 讲你遇到的问题和怎么解决的（更真实、更打动人）
   - ✅ 诚实地面对不足（这展现工程思维）
   - ❌ 不要照着 PPT 念
   - ❌ 不要演示没准备好的功能
   - ❌ 不要超时

**预期产出**：
- 演示 PPT 文件（或大纲文档）
- 演示照片/视频（可选）

**验证方法**：
- 演示时长在 5-8 分钟内
- 涵盖了所有必要部分
- 能回答"为什么这样设计"类问题

## 理解验证问题 | Comprehension Check

**Q1（设计权衡题）**：AP 配网 vs 硬编码 WiFi

本项目使用 wifi_link_tool 实现 AP 模式配网，而不是直接在代码中写死 WiFi 密码。从以下角度分析为什么：

1. **用户友好性**：如果你把这个天气站送给你的奶奶用，两种方式哪种更方便？
2. **安全性**：把 WiFi 密码硬编码在代码里有什么风险？如果你的代码上传到了公开的 GitHub 仓库呢？
3. **灵活性**：如果你带着天气站从家带到学校，WiFi 名称变了，两种方式分别怎么处理？

> **参考答案**：
> - 用户友好性：AP 配网只需要用手机连接设备热点、在网页上选 WiFi 输密码——就像连酒店 WiFi 一样简单。硬编码需要用电脑打开代码、修改代码、重新编译烧录——对普通人来说几乎不可能。把设备送给奶奶的场景下，AP 配网是唯一可行的选择。
> - 安全性：WiFi 密码硬编码在代码中，如果你不小心把代码推送到公开 GitHub 仓库，全世界都能看到你家的 WiFi 密码。即使不公开，任何能接触到你电脑的人也可能看到。AP 配网把密码存在 ESP8266 的 Flash 中，不上传到任何服务器。
> - 灵活性：换 WiFi 时，AP 配网只需用手机重新配置，2 分钟搞定。硬编码需要电脑 + USB 线 + Arduino IDE + 修改代码 + 重新烧录，至少 10 分钟。类比：AP 配网就像手机的"选择 WiFi 网络"界面，硬编码就像每次换 WiFi 要重装手机系统。

**Q2（原理追问题）**：文档的受众分析

你的 README 文档应该写给谁看？以下两类读者对文档的需求有什么不同：

1. **一个月后的你**：你忘了自己怎么做的，需要文档帮你回忆
2. **一个完全不懂编程的朋友**：他想照着你的文档做一个同样的天气站

这两类读者最关心文档中的哪些部分？你会如何调整文档来同时服务他们？

> **参考答案**：
> - 一个月后的你：最关心"为什么这样设计"——为什么选 I2C 不选 SPI？为什么用这个库不用那个？为什么 API 调用间隔设为 30 分钟？这些"设计决策记录"是你最容易遗忘但最需要回忆的。建议在 README 中加一个"设计决策"章节。
> - 完全不懂编程的朋友：最关心"一步一步怎么做"——买什么硬件？怎么接线？代码怎么上传？任何步骤遗漏都可能导致失败。建议在 README 中加详细的分步操作指南，配截图。
> - 同时服务两者：可以在 README 开头放一个快速开始指南（给新手），后面放技术细节和设计决策（给有经验的人）。就像一本教材，前面有章节摘要，后面有详细推导。

**Q3（故障分析题）**：项目可复现性

你的同学照着你的 README 做项目，但遇到了以下问题。请分析每个问题最可能的原因和解决方法：

1. 编译报错：`'U8G2_SSD1306_128X64_NONAME_F_HW_I2C' does not name a type`
2. 上传成功但 OLED 不亮
3. 天气数据显示为空（温度显示 "--"）

> **参考答案**：
> 1. 编译报错 `does not name a type`：说明 U8g2 库没有安装或安装的版本不对。解决方法：在 Arduino IDE 的库管理器中搜索并安装 `U8g2 by Oliver`。这属于"环境配置"问题——README 中应该列出所有依赖库及版本。
> 2. OLED 不亮：最可能的原因是接线问题（VCC/GND 接反或没接好）或者 OLED 地址不是默认的 0x3C（有些模块是 0x3D）。解决方法：首先检查接线，然后用 I2C 扫描程序确认 OLED 的 I2C 地址。这属于"硬件差异"问题——README 中应该提醒用户确认 I2C 地址。
> 3. 天气数据为空：可能原因有：a) API Key 无效或过期；b) Location ID 错误；c) 网络未连接；d) API 调用次数超限。解决方法：打开串口监视器查看 API 返回的完整响应，根据错误码排查。这属于"运行时调试"问题——README 中应该提供常见的错误码含义和排查步骤。

## 提交要求 | Submission Requirements

请将以下文件打包提交：

1. **代码文件**：
   - `hw3_task1_wifi_config.ino` — WiFi 配网集成
   - `hw3_task2_final_ui.ino` — 最终 UI 显示代码
   - 所有位图头文件（如 `weather_icons.h`）
2. **文档**：
   - `README.md` — 完整项目文档
   - `docs/index.html` — Demo 网站文件
3. **截图/照片**：
   - `hw3_ap_config.jpg` — 手机配网页面截图
   - `hw3_final_display.jpg` — 最终 OLED 显示效果照片
   - `hw3_multiple_icons.jpg` — 至少 3 种天气图标显示的照片
   - `hw3_website.jpg` — Demo 网站截图（或提供 URL）
   - `hw3_device_photo.jpg` — 天气站实物照片
4. **演示材料**：
   - 演示 PPT 或大纲文档
5. **理解验证回答**：`hw3_comprehension.md`（3 个问题，每个 80-150 字）

**代码规范检查清单**：
- [ ] 主程序文件有完整的模块注释
- [ ] 配置信息（API Key、WiFi）集中在配置区域，方便修改
- [ ] 关键函数有注释说明功能和参数
- [ ] 代码中包含基本的错误处理逻辑
- [ ] 没有调试用的 `Serial.println()` 残留在最终版本中（或已注释）

## 评分标准 | Rubric

| 维度 | 满分 | 评分细则 |
|------|------|---------|
| **任务完成度** | 30 | 每完成一个任务得 6 分（5 个任务）。部分完成按完成程度给 2-4 分 |
| **理解验证质量** | 25 | 每题约 8 分。能从多角度分析且有深入见解得 7-8 分；有分析但浅显得 4-6 分；仅复述得 1-3 分 |
| **项目文档质量** | 20 | README 完整、接线图清晰、步骤可复现得 16-20 分；基本完整但缺少细节得 10-15 分；文档简陋得 5-9 分 |
| **Demo 网站与演示** | 15 | 网站可访问、内容完整、演示流畅得 12-15 分；基本完成得 7-11 分；未完成得 0-6 分 |
| **代码规范** | 10 | 代码整洁、注释清晰、配置集中得 8-10 分；基本规范得 5-7 分；缺少注释得 0-4 分 |
| **总计** | **100** | — |

---

## 总成绩计算 | Overall Grade Calculation

```
总成绩 = HW1 × 30% + Week1 Check-in × 10% + HW2 × 35% + HW3 × 25%
```

> **注**：独立完成项目的学员，"团队协作"维度转换为"自主学习"维度，考察独立解决问题和自主查阅资料的能力。该维度作为附加加减分项（±5 分），不单独占比。
