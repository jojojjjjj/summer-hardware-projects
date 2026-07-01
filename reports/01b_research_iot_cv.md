# 调研员B - 环境感知IoT & 视觉/CV方向调研报告
# Researcher B - Environmental IoT & Computer Vision Project Research Report
<!-- 注：价格信息已注释隐藏（查价不准确，仅作参考不严谨）/ Note: price info commented out (inaccurate, not rigorous as reference) -->

**调研日期 | Research Date:** 2026-05-05  
**调研员 | Researcher:** Researcher B  
**目标 | Objective:** 找到适合高中生在10-20天内完成的开源硬件项目(成本<!-- <¥500 -->)

---

## 执行摘要 | Executive Summary

本次调研聚焦于**环境感知IoT**和**视觉/CV**两个方向,通过GitHub Topics页面、Hugging Face论文库等渠道,共识别出**12个**具有可行性的开源项目候选,涵盖空气质量监测、环境传感网络、ESP32-CAM视觉应用、MediaPipe姿态检测等多个子方向。

This research focuses on **Environmental IoT** and **Computer Vision** directions. Through GitHub Topics, Hugging Face papers, and other channels, we identified **12** viable open-source project candidates, covering air quality monitoring, environmental sensor networks, ESP32-CAM vision applications, MediaPipe pose detection, and more.

---

## 一、环境感知IoT方向项目 | Environmental IoT Projects

### 1. Klimerko - DIY Air Quality Monitoring Device
- **项目链接 | Project URL:** https://github.com/koconde/Klimerko
- **方向 | Category:** 环境感知IoT
- **核心技术栈 | Tech Stack:** C++, ESP8266/ESP32, PM传感器
- **硬件平台 | Hardware:** ESP8266/ESP32
- **关键组件 | Key Components:** Plantower PM2.5传感器
- **社区数据 | Community:** GitHub活跃项目
- **难度评分 | Difficulty (1-5):** 3
- **成本估算 | Cost (¥):** <!-- ¥200-350 -->
- **适合改编度 | Adaptability (1-5):** 5
- **改编理由 | Adaptation Rationale:** 专为DIY设计,硬件清单清晰,代码开源,适合高中生理解空气质量监测原理

---

### 2. Smogly - PM2.5/PM10 Sensor Based on NodeMCU/ESP32
- **项目链接 | Project URL:** https://github.com/mschietec/smogly
- **方向 | Category:** 环境感知IoT
- **核心技术栈 | Tech Stack:** C++, ESP8266/ESP32
- **硬件平台 | Hardware:** NodeMCU (ESP8266) 或 ESP32
- **关键组件 | Key Components:** Plantower PMS x003系列传感器
- **社区数据 | Community:** GitHub活跃项目,持续更新
- **难度评分 | Difficulty (1-5):** 3
- **成本估算 | Cost (¥):** <!-- ¥180-300 -->
- **适合改编度 | Adaptability (1-5):** 4
- **改编理由 | Adaptation Rationale:** "简单便宜的PM2.5和PM10传感器",文档完整,社区活跃

---

### 3. ESPHome Indoor Air Quality Monitor
- **项目链接 | Project URL:** https://github.com/esphome/esphome-airquality
- **方向 | Category:** 环境感知IoT
- **核心技术栈 | Tech Stack:** ESPHome (YAML配置), C
- **硬件平台 | Hardware:** ESP32/ESP8266
- **关键组件 | Key Components:** CO₂传感器, PM2.5/PM10传感器, 温湿度传感器, 气压传感器
- **社区数据 | Community:** ESPHome官方生态,活跃社区
- **难度评分 | Difficulty (1-5):** 2
- **成本估算 | Cost (¥):** <!-- ¥250-400 -->
- **适合改编度 | Adaptability (1-5):** 5
- **改编理由 | Adaptation Rationale:** ESPHome提供图形化配置,降低编程门槛,非常适合零基础高中生

---

### 4. BME680 Python Library
- **项目链接 | Project URL:** https://github.com/pimoroni/bme680-python
- **方向 | Category:** 环境感知IoT
- **核心技术栈 | Tech Stack:** Python
- **硬件平台 | Hardware:** Raspberry Pi
- **关键组件 | Key Components:** BME680(气体、温度、湿度、气压四合一传感器)
- **社区数据 | Community:** Pimoroni官方库,活跃维护
- **难度评分 | Difficulty (1-5):** 2
- **成本估算 | Cost (¥):** <!-- ¥300-450 -->
- **适合改编度 | Adaptability (1-5):** 4
- **改编理由 | Adaptation Rationale:** Python库易于学习,四合一传感器提供丰富环境数据,适合教学

---

### 5. Smart Garbage Monitoring System using IoT
- **项目链接 | Project URL:** https://github.com/topics/iot-projects (引用项目)
- **方向 | Category:** 环境感知IoT
- **核心技术栈 | Tech Stack:** C++, HTML/JavaScript, MQTT
- **硬件平台 | Hardware:** ESP32/Arduino
- **关键组件 | Key Components:** 超声波距离传感器
- **社区数据 | Community:** 多个开源实现
- **难度评分 | Difficulty (1-5):** 3
- **成本估算 | Cost (¥):** <!-- ¥150-250 -->
- **适合改编度 | Adaptability (1-5):** 4
- **改编理由 | Adaptation Rationale:** 实际应用场景(智慧城市),超声波传感器简单可靠,可扩展性强

---

### 6. IoT Weather Station (Virtual Implementation on Proteus)
- **项目链接 | Project URL:** https://github.com/topics/iot-projects
- **方向 | Category:** 环境感知IoT
- **核心技术栈 | Tech Stack:** C++
- **硬件平台 | Hardware:** Arduino (Proteus仿真)
- **关键组件 | Key Components:** 温湿度传感器, 气压传感器
- **社区数据 | Community:** 教育项目
- **难度评分 | Difficulty (1-5):** 2
- **成本估算 | Cost (¥):** <!-- ¥100-200 -->
- **适合改编度 | Adaptability (1-5):** 5
- **改编理由 | Adaptation Rationale:** 可先在Proteus仿真,降低硬件成本,经典入门项目

---

## 二、视觉/CV方向项目 | Computer Vision Projects

### 7. ESP32-CAM Video Recorder with Telegram
- **项目链接 | Project URL:** https://github.com/jordansissel/esp32-cam-video-recorder-telegram
- **方向 | Category:** 视觉/CV
- **核心技术栈 | Tech Stack:** C++, HTTP/FTP, Telegram API
- **硬件平台 | Hardware:** ESP32-CAM
- **关键组件 | Key Components:** ESP32-CAM模块, microSD卡
- **社区数据 | Community:** GitHub活跃项目
- **难度评分 | Difficulty (1-5):** 3
- **成本估算 | Cost (¥):** <!-- ¥80-150 -->
- **适合改编度 | Adaptability (1-5):** 4
- **改编理由 | Adaptation Rationale:** ESP32-CAM成本低廉,可录制AVI视频并发送到Telegram,互动性强

---

### 8. ESP32-CAM MJPEG Streaming Server
- **项目链接 | Project URL:** https://github.com/yoursunny/esp32-cam-mjpeg
- **方向 | Category:** 视觉/CV
- **核心技术栈 | Tech Stack:** C++, HTTP/MJPEG
- **硬件平台 | Hardware:** ESP32-CAM
- **关键组件 | Key Components:** ESP32-CAM模块
- **社区数据 | Community:** 多个fork,活跃开发
- **难度评分 | Difficulty (1-5):** 3
- **成本估算 | Cost (¥):** <!-- ¥80-150 -->
- **适合改编度 | Adaptability (1-5):** 5
- **改编理由 | Adaptation Rationale:** 实时视频流是CV的基础,可扩展加入人脸检测等功能

---

### 9. MediaPipe Hand Gesture Recognition
- **项目链接 | Project URL:** https://github.com/google/mediapipe
- **方向 | Category:** 视觉/CV
- **核心技术栈 | Tech Stack:** C++, Python, JavaScript
- **硬件平台 | Hardware:** Raspberry Pi / PC
- **关键组件 | Key Components:** 摄像头(USB或CSI)
- **社区数据 | Community:** Google官方维护,1,783+相关仓库
- **难度评分 | Difficulty (1-5):** 4
- **成本估算 | Cost (¥):** <!-- ¥300-500(含RPi) -->
- **适合改编度 | Adaptability (1-5):** 5
- **改编理由 | Adaptation Rationale:** MediaPipe提供现成的手部、面部、姿态检测模型,Python API友好,适合快速原型开发

---

### 10. OpenCV Real-time Motion Detection
- **项目链接 | Project URL:** https://github.com/topics/opencv
- **方向 | Category:** 视觉/CV
- **核心技术栈 | Tech Stack:** Python, OpenCV
- **硬件平台 | Hardware:** Raspberry Pi / PC
- **关键组件 | Key Components:** 摄像头
- **社区数据 | Community:** OpenCV官方,庞大社区
- **难度评分 | Difficulty (1-5):** 3
- **成本估算 | Cost (¥):** <!-- ¥300-500 -->
- **适合改编度 | Adaptability (1-5):** 5
- **改编理由 | Adaptation Rationale:** OpenCV是CV教学的标准库,运动检测是经典入门项目

---

### 11. Full-body Gesture Keyboard using Computer Vision
- **项目链接 | Project URL:** https://github.com/topics/mediapipe
- **方向 | Category:** 视觉/CV
- **核心技术栈 | Tech Stack:** Python, MediaPipe
- **硬件平台 | Hardware:** PC/Raspberry Pi
- **关键组件 | Key Components:** 摄像头
- **社区数据 | Community:** MediaPipe社区
- **难度评分 | Difficulty (1-5):** 4
- **成本估算 | Cost (¥):** <!-- ¥300-500 -->
- **适合改编度 | Adaptability (1-5):** 4
- **改编理由 | Adaptation Rationale:** 创意性强(用全身手势打字),展示效果好,可简化为简单手势控制

---

### 12. ESP32-CAM Motion Detection with Notification (pycameresp)
- **项目链接 | Project URL:** https://github.com/techbase123/pycameresp
- **方向 | Category:** 视觉/CV + IoT
- **核心技术栈 | Tech Stack:** Python, ESP32-CAM
- **硬件平台 | Hardware:** ESP32-CAM + PC(RPi)
- **关键组件 | Key Components:** ESP32-CAM, 摄像头
- **社区数据 | Community:** GitHub活跃
- **难度评分 | Difficulty (1-5):** 3
- **成本估算 | Cost (¥):** <!-- ¥150-300 -->
- **适合改编度 | Adaptability (1-5):** 5
- **改编理由 | Adaptation Rationale:** 结合IoT和CV,运动检测后发送图片通知,实用且有趣

---

## 三、从Hugging Face论文中提取的相关研究方向 | Research Insights from Hugging Face Papers

### 相关学术研究支持 | Supporting Academic Research

1. **IoT-MCP (2025)** - LLM与IoT系统的桥接框架
   - 论文链接: https://hf.co/papers/2510.01260
   - 启示: 可探索将语音/文本交互集成到环境监测项目中

2. **T800 - ESP32上的ML数据包过滤 (2023)**
   - 论文链接: https://hf.co/papers/2305.19214
   - 启示: ESP32可运行轻量级ML算法,适合边缘计算教学

3. **WiFi CSI人体活动识别 (2024)**
   - 论文链接: https://hf.co/papers/2401.01388
   - 启示: ESP32-S3可用于非接触式活动检测,创新性强

4. **EdgeVL - 边缘设备视觉语言模型 (2024)**
   - 论文链接: https://hf.co/papers/2403.04908
   - 启示: 轻量级CV模型可在RPi等边缘设备运行

5. **TEED - 轻量级边缘检测器 (2023)**
   - 论文链接: https://hf.co/papers/2308.06468
   - 启示: 58K参数的超轻量模型,适合边缘设备CV教学

---

## 四、推荐TOP 5项目清单 | Recommended TOP 5 Projects

### 环境感知IoT方向 TOP 3:

| 排名 | 项目名称 | 综合评分 | 推荐理由 |
|------|---------|---------|---------|
| 1 | ESPHome Indoor Air Quality Monitor | 9.5/10 | 配置简单,传感器丰富,社区支持强 |
| 2 | Klimerko DIY Air Quality Monitor | 9/10 | 专为DIY设计,文档完整,成本可控 |
| 3 | IoT Weather Station | 8.5/10 | 经典项目,可仿真,教学资源丰富 |

### 视觉/CV方向 TOP 2:

| 排名 | 项目名称 | 综合评分 | 推荐理由 |
|------|---------|---------|---------|
| 1 | MediaPipe Hand Gesture Recognition | 9/10 | Google官方,模型丰富,Python API友好 |
| 2 | ESP32-CAM Motion Detection | 8.5/10 | 成本低,结合IoT+CV,实用性强 |

---

## 五、技术栈与学习曲线分析 | Tech Stack & Learning Curve Analysis

### 难度分级 | Difficulty Levels:

**Level 1 (最易 - 适合零基础):**
- ESPHome配置项目
- BME680 Python库

**Level 2 (较易 - 需基础编程):**
- IoT Weather Station (Arduino C++)
- ESP32-CAM基础项目

**Level 3 (中等 - 需编程基础):**
- Klimerko/Smogly空气质量监测
- OpenCV运动检测
- ESP32-CAM视频录制

**Level 4 (较高 - 需较强编程能力):**
- MediaPipe手势识别
- 全身姿态检测交互项目

---

<!--
## 六、硬件采购成本分析(人民币) | Hardware Cost Analysis (CNY)

| 硬件平台 | 核心成本 | 传感器成本 | 总计估算 | 备注 |
|---------|---------|-----------|---------|------|
| ESP32 | ¥30-50 | ¥50-200 | ¥80-250 | 最经济方案 |
| ESP32-CAM | ¥40-60 | ¥0(已集成) | ¥40-60 | 视觉项目首选 |
| NodeMCU (ESP8266) | ¥20-35 | ¥50-150 | ¥70-185 | 比ESP32便宜 |
| Raspberry Pi Zero | ¥100-150 | ¥50-200 | ¥150-350 | 可运行Python/Linux |
| Raspberry Pi 4 | ¥250-350 | ¥50-200 | ¥300-550 | 超预算,不推荐 |
-->

---

## 七、风险与挑战 | Risks & Challenges

### 技术风险 | Technical Risks:

1. **传感器精度问题** - 低成本传感器可能需要校准
2. **ESP32内存限制** - 复杂CV算法可能无法运行
3. **网络稳定性** - IoT项目依赖WiFi连接
4. **Python环境配置** - RPi环境配置对零基础学员有挑战

### 教学风险 | Educational Risks:

1. **调试困难** - 硬件调试比纯软件复杂
2. **时间压力** - 10-20天可能不够完成复杂项目
3. **前置知识** - 需要电子学+编程双重基础

---

## 八、改编建议 | Adaptation Recommendations

### 针对高中生的课程设计建议:

1. **分阶段实施** - Day 1-3:环境搭建; Day 4-7:基础功能; Day 8-14:核心功能; Day 15-20:优化与展示
2. **提供预配置镜像** - 为RPi项目提供预配置SD卡镜像
3. **简化入门** - 使用ESPHome/Arduino IDE等图形化工具
4. **模块化设计** - 每个传感器/功能独立成模块
5. **强调安全** - 电子安全(短路、过载)和网络安全

---

## 九、结论与下一步 | Conclusions & Next Steps

### 主要发现 | Key Findings:

1. **ESP32平台性价比最高** - <!-- ¥30-50 -->的主控板,支持WiFi/BLE,社区庞大
2. **ESPHome大幅降低IoT门槛** - YAML配置替代编程,适合零基础
3. **MediaPipe是CV教学最佳选择** - Google官方支持,模型丰富,Python API友好
4. **空气质量监测是最佳IoT入门项目** - 社会意义强,硬件成熟,资料丰富

### 建议进入可行性评估阶段的项目:

1. **ESPHome Indoor Air Quality Monitor** (IoT方向)
2. **Klimerko DIY Air Quality Monitor** (IoT方向)
3. **MediaPipe Hand Gesture Control** (CV方向)
4. **ESP32-CAM Security Camera** (CV+IoT混合)
5. **IoT Weather Station** (经典入门项目)

---

**调研员签名 | Researcher:** Researcher B  
**日期 | Date:** 2026-05-05

---

## 附录:参考文献与资源链接 | Appendix: References & Resources

- GitHub Topics: esp32-cam (317 repositories)
- GitHub Topics: air-quality (1,022 repositories)
- GitHub Topics: mediapipe (1,783 repositories)
- GitHub Topics: pose-estimation (1,770 repositories)
- GitHub Topics: iot-projects (51 repositories)
- Hugging Face Papers: ESP32 IoT environmental monitoring (48 papers)
- Hugging Face Papers: Edge computer vision education (120 papers)
