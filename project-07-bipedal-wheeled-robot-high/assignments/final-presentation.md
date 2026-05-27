# 最终展示要求 | Final Presentation Requirements

## 概述 | Overview

最终展示是轮足机器人项目的重要环节，学员将向老师和同学展示团队构建的双足轮式自平衡机器人，包括平衡控制、遥控功能、技术实现细节以及 Demo 网站演示。

> The final presentation is a critical component of the bipedal wheeled robot project, where students present their team-built self-balancing robot to teachers and classmates, including balance control, remote functionality, technical implementation details, and a Demo website walkthrough.

---

## 展示时间 | Presentation Time

**Day 12 下午 | Day 12 Afternoon**
- 每队 10-15 分钟（含演示和问答）
- 10-15 minutes per team (demo + Q&A included)

---

## 展示结构 | Presentation Structure

### 1. 项目概述 (2 分钟) | Project Overview (2 min)

**内容要求：**
- 团队介绍
- 项目名称和定位
- 核心功能介绍（自平衡 + 遥控）
- 技术栈概述（ESP32 + MPU6050 + BLDC 电机 + 3D 打印）
- 各成员贡献说明

**PPT 页数：** 2 页

> Team introduction; project name and positioning; core features (self-balancing + remote control); tech stack overview (ESP32 + MPU6050 + BLDC motor + 3D printing); individual contributions.

---

### 2. 技术架构 (3 分钟) | Technical Architecture (3 min)

**内容要求：**
- 系统架构框图（硬件 + 软件）
- 硬件组成说明：
  - ESP32 主控
  - MPU6050 六轴传感器
  - BLDC 电机驱动
  - 蓝牙/WiFi 遥控模块
  - 电池与电源管理
- 软件架构说明：
  - 姿态解算模块
  - PID 控制器
  - 电机驱动层
  - 通信协议层
- 数据流程图（传感器数据采集 -> 姿态计算 -> PID 运算 -> 电机输出）

**PPT 页数：** 2-3 页

> System architecture diagram (hardware + software); hardware components; software architecture; data flow (sensor -> attitude calculation -> PID -> motor output).

---

### 3. 关键挑战与解决方案 (2 分钟) | Key Challenges & Solutions (2 min)

**内容要求：**
- 列出 2-3 个主要技术挑战
- 每个挑战的解决方案
- 从中获得的工程经验

**示例挑战：**
1. **MPU6050 数据噪声** — 使用互补滤波/卡尔曼滤波
2. **PID 调参困难** — 分步调参法（先 P 再 D 最后 I）
3. **机械结构共振** — 调整结构刚度或控制频率
4. **电池供电不足** — 优化功耗或更换大容量电池

**PPT 页数：** 2 页

> List 2-3 key technical challenges; solutions for each; engineering lessons learned.

---

### 4. 实物演示 (5 分钟) | Live Demo (5 min)

**必演功能：**
- [ ] 机器人上电自平衡（站立 30 秒以上）
- [ ] 遥控前进 / 后退
- [ ] 遥控左转 / 右转
- [ ] 平衡抗干扰（轻推后恢复）

**选演功能（加分项）：**
- 指定轨迹行驶
- 速度渐变控制
- 手机 App 界面展示
- 编程舞蹈/动作序列

**演示注意事项：**
- 提前确保电池电量充足
- 准备备用电池
- 确保演示场地平整
- 准备 Plan B（演示视频）以防硬件故障

> Required: self-balancing for 30+ seconds, remote forward/backward/left/right, disturbance recovery. Optional bonus: programmed trajectory, speed control, phone app, dance sequence.

---

### 5. Demo 网站演示 (2 分钟) | Demo Website Walkthrough (2 min)

**内容要求：**
- 展示已部署的 Demo 网站
- 网站必须包含的内容：
  - 项目描述
  - 照片 / 视频展示
  - 技术文档
  - 团队信息
- 额外加分项：
  - PID 参数交互式调参可视化
  - 实时数据图表
  - 响应式设计

**PPT 页数：** 1 页（含网站链接）

> Show deployed Demo website with project description, photos/video, technical writeup, team info. Bonus: interactive PID tuning visualization, real-time data charts, responsive design.

---

### 6. 学习收获 (1 分钟) | What You Learned (1 min)

**内容要求：**
- 技术层面的收获（嵌入式开发、控制理论、3D 打印）
- 软技能层面的收获（团队协作、项目管理、问题解决）
- 对未来学习方向的思考

**PPT 页数：** 1 页

> Technical gains (embedded development, control theory, 3D printing); soft skills (teamwork, project management, problem solving); future learning directions.

---

### 7. 未来改进方向 (1 分钟) | Future Improvements (1 min)

**内容要求：**
- 功能扩展计划（如加入视觉、语音交互等）
- 性能优化方向（如更高级的控制算法）
- 设计改进建议（如更紧凑的结构设计）

**PPT 页数：** 1 页

> Feature extension plans (vision, voice interaction); performance optimization (advanced control algorithms); design improvements.

---

## PPT 要求 | PPT Requirements

### 整体要求
- **总页数：** 10-15 页
- **风格：** 简洁、专业、图文并茂
- **语言：** 中英双语

### 必含页面

1. **封面页** (1 页)
   - 项目名称（中英文）
   - 团队成员姓名
   - 日期

2. **项目概述** (2 页)
   - 项目简介
   - 核心功能列表
   - 技术栈

3. **系统架构** (2-3 页)
   - 硬件架构图
   - 软件架构图
   - 数据流程图

4. **关键技术** (2-3 页)
   - PID 控制算法
   - 姿态解算
   - 遥控通信

5. **挑战与解决** (2 页)
   - 遇到的问题
   - 解决方案

6. **Demo 网站展示** (1 页)
   - 网站截图
   - 部署链接

7. **总结与展望** (1-2 页)
   - 学习收获
   - 未来改进

---

## Demo 网站要求 | Demo Website Requirements

### 部署要求 | Deployment Requirements

- **必须部署**到以下平台之一：
  - GitHub Pages: https://pages.github.com/
  - Vercel: https://vercel.com/
  - Netlify: https://www.netlify.com/

### 内容要求 | Content Requirements

| 内容 | 必需/加分 | 说明 |
|------|----------|------|
| 项目描述 | 必需 | 中英双语项目介绍 |
| 照片/视频 | 必需 | 机器人照片、演示视频 |
| 技术文档 | 必需 | PID 原理、系统架构说明 |
| 团队信息 | 必需 | 成员介绍和分工 |
| 接线图 | 加分 | 硬件接线示意图 |
| PID 交互调参 | 加分 | 网页端 PID 参数调节可视化 |
| 实时数据图表 | 加分 | 姿态角/电机输出等实时曲线 |
| 响应式设计 | 加分 | 适配手机/平板访问 |

### 技术建议 | Technical Suggestions

- **静态网站推荐：** HTML/CSS/JS + GitHub Pages（最简单）
- **框架推荐：** React / Vue + Vercel（适合有一定前端基础的同学）
- **可视化推荐：** Chart.js / ECharts（用于 PID 参数可视化）

---

## 演示准备清单 | Demo Preparation Checklist

### 硬件准备 | Hardware
- [ ] 机器人电池充满电
- [ ] 准备备用电池
- [ ] 遥控设备充电/测试
- [ ] 检查所有螺丝紧固
- [ ] 演示场地确认（平坦地面）

### 软件准备 | Software
- [ ] 最终固件已烧录
- [ ] PID 参数锁定（不再修改）
- [ ] 安全保护功能确认
- [ ] 备用固件准备（以防万一）

### 材料准备 | Materials
- [ ] PPT 制作完成
- [ ] 演示脚本准备
- [ ] Demo 网站已部署
- [ ] 演示视频录制（Plan B）

### 排练 | Rehearsal
- [ ] 完整排练至少 2 次
- [ ] 时间控制在 10-15 分钟
- [ ] 准备常见问题答案
- [ ] 确认演示流程无卡点

---

## 评分标准 | Grading Criteria

| 项目 | 分数 | 标准 |
|------|------|------|
| **实物演示效果** | 25 分 | 平衡稳定、遥控流畅、功能完整 |
| **技术讲解深度** | 20 分 | 原理清晰、架构完整、有深度 |
| **PPT 质量** | 15 分 | 美观专业、内容完整、图文并茂 |
| **Demo 网站** | 15 分 | 已部署、内容完整、设计美观 |
| **沟通表达** | 15 分 | 清晰流畅、逻辑连贯、互动良好 |
| **问答环节** | 10 分 | 回答准确、思路清晰 |

---

## 常见问题准备 | Common Q&A Preparation

### 技术问题

1. **为什么选择 ESP32 而不是 STM32？**
   - ESP32 内置 WiFi/蓝牙，方便遥控功能实现
   - StackForce 平台基于 ESP32 开发，资源丰富
   - 双核处理器，可并行处理传感器和控制任务

2. **为什么使用 MPU6050 而不是更新的 IMU？**
   - MPU6050 社区资源最丰富，教程最多
   - 对于本项目精度足够
   - 价格便宜，易于采购

3. **PID 参数是怎么调的？**
   - 先只用 P：从小到大增加，直到系统开始振荡
   - 加入 D：抑制振荡，提高稳定性
   - 最后加入 I：消除稳态误差
   - 在实际机器人上反复微调

4. **如何处理 MPU6050 的数据噪声？**
   - 使用互补滤波（Complementary Filter）融合加速度计和陀螺仪数据
   - 也可使用卡尔曼滤波（Kalman Filter）效果更好
   - 控制循环频率足够高（建议 200Hz 以上）

### 项目问题

1. **最大的挑战是什么？**
   - PID 调参需要耐心和经验
   - 机械结构和电子电路的集成调试
   - 3D 打印零件的精度问题

2. **学到了什么？**
   - 嵌入式系统开发（ESP32 + PlatformIO）
   - 控制理论的实际应用（PID）
   - 3D 打印和机械设计基础
   - 团队协作和项目管理

3. **如果重新开始，会做什么不同？**
   - 更早开始 PID 调参
   - 更仔细地规划布线
   - 预留更多测试时间

---

## 成功标准 | Success Criteria

### 基础成功 (60-70 分)
- [ ] 完成机器人实物演示
- [ ] 自平衡功能正常
- [ ] 遥控功能基本可用
- [ ] 讲解清晰有条理

### 优秀展示 (80-90 分)
- [ ] 演示流畅无故障
- [ ] 技术讲解深入
- [ ] Demo 网站完整美观
- [ ] PPT 制作精美

### 卓越表现 (90+ 分)
- [ ] 有创新的附加功能
- [ ] PID 调参可视化
- [ ] 完美的演示表现
- [ ] 对技术有深刻理解和独到见解

---

*祝演示成功！Good luck with your presentation!*
*最后更新：2026-05-27*
