# 课程大纲总览 | Curriculum Overview

## 课程定位 | Course Positioning

本课程是面向高中生的**嵌入式 IoT 入门实践课程**。学员将在 12 天内从零开始构建一台桌面气象站，该设备可以显示时间、天气和空气质量信息。

> This is an **introductory embedded IoT practicum course** for high school students. In 12 days, students will build a desktop weather station from scratch that displays time, weather, and air quality information.

---

## 学习目标 | Learning Objectives

### 知识目标 Knowledge Goals

- 理解 ESP8266 微控制器的基本架构和 Arduino 编程模型
- 掌握 I2C 总线通信协议的基本原理
- 理解 WiFi 联网（Station 模式）和 HTTP/HTTPS 协议
- 理解 NTP 网络时间协议的工作原理
- 掌握 JSON 数据格式和 API 调用方式

### 技能目标 Skill Goals

- 能够使用 Arduino IDE 编写、编译、烧录 ESP8266 程序
- 能够使用 U8g2 库驱动 SSD1306 OLED 显示屏
- 能够调用 RESTful API 获取网络数据
- 能够解析 JSON 数据并提取所需字段
- 能够设计简单的嵌入式 UI 界面布局

### 素养目标 Quality Goals

- 培养工程思维：需求分析 → 方案设计 → 实现 → 测试 → 迭代
- 培养调试能力：使用串口输出定位问题
- 培养文档习惯：记录开发过程和遇到的问题
- 培养表达能力：最终展示和技术分享

---

## 项目版本说明 | Version Notes

本项目有两个版本可供选择：

| 版本 Version | 显示内容 | 适用人群 |
|-------------|---------|---------|
| **标准版 Standard** | 时间 + 天气 + PM2.5 | 所有学员 |
| **B站UP主版 Bilibili** | 时间 + 天气 + B站粉丝数 | 有B站账号的学员 |

两个版本的核心技术相同，仅数据展示侧重点不同。课程以标准版为主线。

---

## 每日课程速览 | Daily Course At-a-Glance

| 天数 | 主题 | 上午 (3h) | 下午 (4h) |
|------|------|----------|----------|
| Day 1 | ESP8266 入门 | 项目介绍 + 硬件认知 | Arduino IDE 配置 + Blink 程序 |
| Day 2 | OLED 显示 | I2C 协议原理 | U8g2 库 + 中文显示 |
| Day 3 | WiFi 联网 | WiFi Station 模式 | HTTP/HTTPS 请求 |
| Day 4 | 天气数据 | JSON 格式入门 | 和风天气 API 调用 |
| Day 5 | NTP 时间 | UDP 协议 + NTP 原理 | 网络时间获取实战 |
| Day 6 | 屏幕布局 | UI 设计原则 | 多字体混排 + 位图 |
| Day 7 | WiFi 配网 | AP 模式原理 | wifi_link_tool 集成 |
| Day 8 | 图标与整合 | 位图嵌入 | 全功能整合测试 |
| Day 9 | B站粉丝数 | Bilibili API | HTTP 请求实战 |
| Day 10 | PC 监控 | HTTP Server 原理 | 上位机数据接收 |
| Day 11 | 外壳制作 | 3D 设计 / DIY | 整机组装 |
| Day 12 | 项目展示 | 演示准备 | 成果展示与复盘 |

---

## 考核方式 | Assessment

| 考核项 | 占比 | 截止日期 |
|--------|------|---------|
| 第一周进度汇报 Week 1 Check-in | 17% | Day 6 |
| 第二周进度汇报 Week 2 Check-in | 17%（含最终） | Day 11 |
| 最终演示 Final Demo | 17% | Day 12 |
| 技术实现 Technical Implementation | 35% | Day 12 |
| 文档质量 Documentation | 9% | Day 12 |
| Demo 网站 Project Website | 13% | Day 12 |
| 团队协作 Collaboration | 9% | 全过程 |

> 注：独立完成项目的学员，"团队协作"分数将转换为"自主学习"分数，考察独立解决问题的能力。
