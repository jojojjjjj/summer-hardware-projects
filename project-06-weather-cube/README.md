# 桌面气象站 "天气魔方" | Desktop Weather Station "Weather Cube"

> 面向高中生的暑期IoT实践项目 | A Summer IoT Practicum Project for High School Students

---

## 项目概述 | Project Overview

本项目将带领学员从零开始构建一台**桌面迷你气象站时钟**，使用 ESP8266 微控制器驱动 0.96 寸 OLED 显示屏，通过网络 API 获取实时天气数据，在桌面上展示时间、日期、天气图标、体感温度、PM2.5 浓度等信息。学员将掌握嵌入式 C 语言编程、WiFi 联网、HTTP API 调用、JSON 数据解析、I2C OLED 显示驱动等核心物联网技能。

> This project guides students to build a **desktop mini weather station clock** from scratch, using an ESP8266 microcontroller to drive a 0.96-inch OLED display. The device fetches real-time weather data via web APIs and displays time, date, weather icons, apparent temperature, PM2.5 concentration, and more. Students will master embedded C programming, WiFi networking, HTTP API calls, JSON data parsing, I2C OLED display driving, and other core IoT skills.

---

## 最终效果 | Final Result

完成本项目后，你将拥有一台：

Upon completing this project, you will own a device that can:

- 通过 NTP 自动同步网络时间，精确到分钟
- 显示实时天气图标（晴、多云、阴、雨、雪、雾霾等 15+ 种）
- 显示体感温度和 PM2.5 空气质量指数
- 支持 WiFi 配网（AP 模式 + 网页配置）
- 可选：显示哔哩哔哩粉丝数（UP 主定制版）
- 可选：接收 PC 性能数据（CPU/内存/温度）
- Automatically sync network time via NTP with minute precision
- Display real-time weather icons (15+ types: sunny, cloudy, overcast, rain, snow, haze, etc.)
- Display apparent temperature and PM2.5 air quality index
- Support WiFi provisioning (AP mode + web configuration)
- Optional: Display Bilibili follower count (content creator version)
- Optional: Receive PC performance data (CPU/memory/temperature)

## 核心技术 | Core Technologies

| 技术 Technology | 用途 Purpose | 说明 Description |
|----------------|-------------|-----------------|
| ESP8266 (ESP-01S) | 主控制器 | Tensilica L106 32-bit MCU, 80MHz, WiFi 内置 |
| SSD1306 OLED | 显示 | 0.96 寸 128x64 像素, I2C 通信 |
| U8g2 库 | 显示驱动 | 支持多种字体（含中文）、位图绘制 |
| 和风天气 API v7 | 天气数据 | HTTPS RESTful API，免费版每日 1000 次调用 |
| NTP 协议 | 时间同步 | 阿里云 NTP 服务器, UTC+8 时区 |
| wifi_link_tool | WiFi 配网 | AP 模式 + Web 配网页面，支持微信小程序 |
| ArduinoJson | JSON 解析 | 解析和风天气 API 返回的 JSON 数据 |
| BearSSL | HTTPS 加密 | ESP8266 上的 TLS 安全通信 |
| HTTP Server | Web 服务 | 端口 80 提供配网页面和 PC 监控接口 |

## 硬件清单 | Hardware List

| 部件 Component | 规格 Specification | 数量 | 参考价格 Price | 购买建议 Source |
|---------------|-------------------|------|--------------|----------------|
| ESP-01S 模块 | ESP8266, 2MB Flash | 1 | 8 元 | 淘宝搜索"ESP-01S" |
| SSD1306 OLED 屏 | 0.96寸 128x64 I2C, 蓝色/白色 | 1 | 12 元 | 淘宝搜索"0.96 OLED I2C" |
| USB 转 ESP-01S 烧录器 | CH340G, 带开关 | 1 | 10 元 | 淘宝搜索"ESP-01S 烧录器" |
| 面包板 | 400 孔 | 1 | 5 元 | 淘宝 |
| 杜邦线 | 母对母 20cm | 10 根 | 5 元 | 淘宝 |
| USB 数据线 | Micro-USB | 1 | 5 元 | 淘宝 |
| **合计 Total** | | | **约 45 元** | **远低于 500 元预算** |

> 注：ESP-01S 模块引脚较少（仅 8 个），接线简单，非常适合入门学习。如需扩展功能可换用 NodeMCU 开发板（约 15 元），引脚更丰富。
> Note: The ESP-01S module has few pins (only 8), making wiring very simple and ideal for beginners. For expanded features, upgrade to a NodeMCU dev board (~15 CNY) with richer pin options.

## 软件环境 | Software Environment

| 工具 Tool | 版本 Version | 用途 Purpose | 获取方式 |
|-----------|-------------|-------------|---------|
| Arduino IDE | 1.8.x / 2.x | 代码编写与编译烧录 | arduino.cc 免费下载 |
| ESP8266 开发板支持包 | 3.0+ | ESP8266 编译工具链 | Arduino IDE 开发板管理器 |
| U8g2 库 | 最新版 | OLED 显示驱动 | Arduino IDE 库管理器 |
| ArduinoJson 库 | 5.x | JSON 数据解析 | Arduino IDE 库管理器 |
| wifi_link_tool 库 | 最新版 | WiFi 配网工具 | GitHub 下载安装 |
| ESP8266 烧录工具 | 最新版 | 固件烧录 | 淘宝烧录器附带 / 官网下载 |
| 串口调试助手 | 任意 | 调试输出查看 | 免费下载 |

## 快速开始 | Quick Start

### 硬件准备 Hardware Setup

1. 准备 ESP-01S 模块、SSD1306 OLED、面包板、杜邦线
2. 按照 `hardware/wiring-guide.md` 接线（仅需 4 根线：VCC/GND/SCL/SDA）
3. 将 ESP-01S 插入 USB 烧录器，连接电脑

### 软件准备 Software Setup

1. 安装 Arduino IDE，添加 ESP8266 开发板支持
2. 安装 U8g2、ArduinoJson、wifi_link_tool 库
3. 申请和风天气免费 API Key（https://console.heweather.com/app/index）
4. 在代码中填入你的 API Key 和城市编号
5. 编译并烧录 `software/src/standard/weather_cube.ino`

### 第一次运行 First Run

1. 上电后 OLED 显示"开机 WiFi to Link"
2. 首次使用自动进入配网模式（AP: wifi_link_tool）
3. 手机连接 AP 后打开 6.6.6.6，选择家中 WiFi 并输入密码
4. 配网成功后自动获取天气数据并显示
5. 设备每 30 秒刷新时间，每 30 分钟更新天气

## 项目结构 | Project Structure

```
project-06-weather-cube/
├── README.md                              # 本文件，项目总览
├── curriculum/                            # 课程文档
│   ├── overview.md                        # 课程大纲总览
│   ├── prerequisites.md                   # 前置知识与准备
│   ├── assignments.md                     # 作业说明
│   ├── grading-rubric.md                  # 详细评分标准
│   └── day-01.md ~ day-12.md              # 每日课程内容
├── hardware/                              # 硬件相关
│   ├── BOM.md                             # 物料清单
│   ├── wiring-guide.md                    # 接线指南
│   ├── assembly-steps.md                  # 组装步骤
│   └── troubleshooting.md                 # 硬件故障排除
├── software/                              # 软件代码
│   ├── requirements.txt                   # Arduino 库依赖列表
│   ├── config.template.h                  # 配置模板（API Key 等）
│   ├── src/
│   │   ├── standard/
│   │   │   ├── weather_cube.ino           # 标准版主程序（v5）
│   │   │   └── zlt.h                      # OLED 位图资源
│   │   ├── bilibili/
│   │   │   ├── weather_cube_bilibili.ino  # B站UP主版主程序（v3b）
│   │   │   └── zlt.h                      # OLED 位图资源（含动画帧）
│   │   └── libraries/
│   │       └── Time/                      # Arduino Time 库
│   │           ├── Time.h / TimeLib.h     # 时间库头文件
│   │           ├── Time.cpp               # 时间库实现
│   │           └── DateStrings.cpp        # 日期字符串
│   └── data/
│       ├── config.html                    # WiFi 配网 Web 页面
│       └── index.html                     # 管理设置页面
├── assignments/                           # 作业与评分
│   ├── week-1-checkin.md                  # 第一周进度报告
│   ├── week-2-checkin.md                  # 第二周进度报告
│   ├── final-presentation.md              # 最终展示要求
│   └── rubric.md                          # 详细评分表
└── resources/
    └── search-results.md                  # 资源搜索结果
```

## 课程安排 | Course Schedule

12 天全日制课程，分为三个阶段：

12-day full-time course, divided into three phases:

### 第一阶段 Phase 1：嵌入式基础与开发环境 | Embedded Basics & Dev Environment (Day 1-4)

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|----------|----------|---------------------|
| Day 1 | 项目启动与 ESP8266 入门 | ESP8266 架构、Arduino IDE 配置、第一个 Blink 程序 |
| Day 2 | I2C 通信与 OLED 显示 | I2C 协议原理、SSD1306 驱动、U8g2 库使用、中文显示 |
| Day 3 | WiFi 联网与 HTTP 请求 | ESP8266 WiFi Station 模式、HTTP/HTTPS 协议、API 调用 |
| Day 4 | JSON 解析与天气数据 | ArduinoJson 库、JSON 格式、和风天气 API 数据提取 |

### 第二阶段 Phase 2：核心功能开发 | Core Feature Development (Day 5-8)

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|----------|----------|---------------------|
| Day 5 | NTP 时间同步 | UDP 协议、NTP 报文格式、网络时间获取与时区转换 |
| Day 6 | OLED 屏幕布局设计 | 界面设计、U8g2 多字体混排、位图绘制、像素级布局 |
| Day 7 | WiFi 配网系统 | wifi_link_tool 库、AP 模式、Web 配网页面原理 |
| Day 8 | 天气图标与整合 | 天气代码映射、BMP 位图嵌入、全功能整合测试 |

### 第三阶段 Phase 3：功能拓展与展示 | Extension & Presentation (Day 9-12)

| 天数 Day | 主题 Topic | 核心内容 Key Content |
|----------|----------|---------------------|
| Day 9 | B站粉丝数显示（拓展1） | Bilibili API 调用、HTTP 请求、粉丝数替换 PM2.5 显示 |
| Day 10 | PC 性能监控（拓展2） | HTTP Server 接收数据、AIDA64 上位机、PC 硬件信息显示 |
| Day 11 | 外壳设计与系统集成 | 3D 打印 / 亚克力外壳设计、整机组装与美化 |
| Day 12 | 项目展示与总结 | 成果演示、Demo 网站部署、技术分享、项目复盘 |

详细每日课程内容请查看 `curriculum/day-01.md` 至 `curriculum/day-12.md`。

> For detailed daily course content, see `curriculum/day-01.md` through `curriculum/day-12.md`.

## 评分标准 | Grading Rubric

| 维度 Dimension | 权重 Weight | 说明 Description |
|----------------|-----------|-----------------|
| 技术实现 Technical Implementation | 35% | 功能完整度、数据准确性、显示稳定性 |
| 文档质量 Documentation | 9% | README、注释、接线图、原理说明 |
| 演示展示 Presentation | 17% | 最终展示的清晰度、深度与表达能力 |
| 进度汇报 Check-ins | 17% | 每周进度报告的质量与及时性 |
| 团队协作 Collaboration | 9% | Git 记录、分工合理性、互助精神 |
| Demo 网站 Project Demo Website | 13% | 项目展示网站的内容完整性、视觉呈现、技术深度 |

## 学习资源 | Learning Resources

### 推荐 B 站视频 | Recommended Bilibili Videos

**DIY 制作教程 (必看) | DIY Build Tutorials (Must Watch):**

1. **基于 ESP8266 的 0.96 寸 OLED 天气预报时钟** - 发明控
   - https://www.bilibili.com/video/BV1ui4y1o78d/
   - 项目原作者视频教程，涵盖全部制作流程

2. **ESP8266 物联网开发入门** - 太极创客
   - https://www.bilibili.com/video/BV1L7411c7jw/
   - ESP8266 入门必看系列，基础全面

3. **Arduino ESP8266 OLED 显示天气时钟** - 各种UP主
   - 搜索 "ESP8266 OLED 天气时钟" 获取大量相关教程

**原理与知识教程 | Theory & Knowledge Tutorials:**

4. **I2C 通信协议详解**
   - 搜索 "I2C 协议 单片机" 了解 I2C 总线工作原理

5. **HTTP/HTTPS 协议基础**
   - 搜索 "HTTP 协议入门" 了解 Web API 调用基础

6. **JSON 数据格式入门**
   - 搜索 "JSON 教程" 了解数据交换格式

### GitHub 开源项目 | Open Source Projects

| 项目 Project | Stars | 说明 Description |
|-------------|-------|-----------------|
| [ESP_weather_Cube](https://github.com/bilibilifmk/ESP_weather_Cube) | 原作者 | 本项目原始仓库，含完整源码和图片资源 |
| [wifi_link_tool](https://github.com/bilibilifmk/wifi_link_tool) | - | 配套 WiFi 配网工具库 |
| [esp8266-weather-station](https://github.com/ThingPulse/esp8266-weather-station) | 1,000+ | ThingPulse 天气站，经典参考项目 |
| [ESP8266-OLED-Weather](https://github.com/search?q=esp8266+oled+weather) | - | GitHub 搜索获取更多参考项目 |

### 参考文档 | Reference Docs

- [ESP8266 Arduino Core 文档](https://arduino-esp8266.readthedocs.io/)
- [U8g2 库参考手册](https://github.com/olikraus/u8g2/wiki)
- [和风天气 API 开发文档](https://dev.qweather.com/)
- [SSD1306 数据手册](https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf)
- [NTP 协议 RFC 5905](https://tools.ietf.org/html/rfc5905)

## 常见问题 | FAQ

**Q: 没有任何嵌入式编程基础可以做这个项目吗？**
A: 可以！课程 Day 1 从 Arduino IDE 安装和 Blink 程序开始，逐步引入所有必要知识。但建议提前了解 C 语言基本语法（变量、函数、if/else）。

> I have no embedded programming background. Can I still do this project?
> Yes! Day 1 starts from Arduino IDE installation and the Blink program, gradually introducing all necessary knowledge. However, it is recommended to learn basic C syntax beforehand (variables, functions, if/else).

**Q: ESP-01S 和 NodeMCU 应该选哪个？**
A: 推荐 ESP-01S。引脚少（8 个）、接线简单、价格最低（8 元），非常适合入门。本项目的核心功能（OLED + WiFi）只需 4 根线即可完成。学完后如需扩展更多传感器，再换用 NodeMCU（15 元）。

> Should I choose ESP-01S or NodeMCU?
> ESP-01S is recommended. Few pins (8), simple wiring, lowest price (8 CNY) -- perfect for beginners. The core features (OLED + WiFi) only need 4 wires. After mastering this, switch to NodeMCU (15 CNY) for more sensor expansions.

**Q: 和风天气 API 免费吗？**
A: 是的，和风天气提供免费开发者账户，每天最多 1000 次 API 调用。本设备每 30 分钟更新一次（每天 48 次），完全在免费额度内。

> Is the HeFeng Weather API free?
> Yes. HeFeng Weather offers free developer accounts with up to 1000 API calls per day. This device updates every 30 minutes (48 calls/day), well within the free tier.

**Q: 屏幕为什么是蓝色的？可以换成白色吗？**
A: SSD1306 OLED 有蓝色、白色、黄蓝双色等版本。代码兼容所有颜色版本（直接替换即可）。建议购买黄蓝双色版，上半部分黄色显示天气图标，下半部分蓝色显示文字，视觉效果非常好。

> Why is the screen blue? Can I use white instead?
> SSD1306 OLEDs come in blue, white, and yellow-blue dual-color variants. The code works with all versions (just swap the display). The yellow-blue version is recommended -- yellow section for weather icons and blue section for text looks great.

**Q: 可以不使用 wifi_link_tool 配网吗？**
A: 可以。直接在代码中写入 WiFi SSID 和密码即可跳过配网流程。wifi_link_tool 的优势在于配网过程对用户友好（扫描、选择、输入密码），且支持微信小程序发现设备。

> Can I skip the wifi_link_tool provisioning?
> Yes. Hardcode the WiFi SSID and password in the code to skip provisioning. wifi_link_tool's advantage is its user-friendly flow (scan, select, enter password) and WeChat mini-program device discovery.

**Q: 时间不准怎么办？**
A: NTP 服务器使用了阿里云的公共 NTP 服务器（120.25.115.20）。如果该服务器失效，可以修改代码中的 timeServer 地址，替换为其他公共 NTP 服务器（如 ntp.aliyun.com、ntp1.aliyun.com、pool.ntp.org 等）。

> What if the time is inaccurate?
> The code uses Alibaba Cloud's public NTP server (120.25.115.20). If it fails, modify the timeServer address in the code to another public NTP server (e.g., ntp.aliyun.com, ntp1.aliyun.com, pool.ntp.org).

## 许可证 | License

本项目课程文档采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议发布。

软件代码基于原项目 [GPL License](https://github.com/bilibilifmk/ESP_weather_Cube) 发布。

> This project course materials are released under CC BY-NC-SA 4.0.
> Software code is released under the original project's GPL License.

---

*最后更新：2026-05-27*
*Last updated: 2026-05-27*
