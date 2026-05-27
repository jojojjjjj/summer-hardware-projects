# Day 12: 项目展示与创意拓展 | Project Presentation & Creative Extensions

> **今日目标:**
> - 完成系统集成与稳定性优化
> - 修复所有已知Bug，确保演示流畅
> - 进行正式项目展示（live demo + 技术讲解 + Q&A）
> - 讨论创意拓展方向
>
> **产出:** 一个功能完整的ElectronBot进阶桌宠，通过正式项目展示评审

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:30 | 系统检查 | 全功能连通测试、Bug清单梳理 |
| 09:30 - 10:30 | Bug修复 | 集中修复关键Bug，稳定性优化 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 演示准备 | 演示流程排练、备用方案准备 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:30 | 正式展示 | 每组10-15分钟（演示+讲解+Q&A） |
| 15:30 - 15:45 | 课间休息 | |
| 15:45 - 16:30 | 拓展讨论 | 创意方向、技术复盘、同行评审 |
| 16:30 - 17:00 | 结营仪式 | 颁发证书、合影、经验总结 |

---

## 上午: 稳定性优化与Bug修复 | Morning: Stability & Bug Fix

### 为什么要做稳定性测试? | Why Stability Testing?

Demo现场的环境往往与实验室不同——USB线可能松了、光线可能变化、网络可能不稳定。今天上午的目标是确保你的ElectronBot能在各种条件下稳定运行，不会在展示时"翻车"。

Demo environments are often different from the lab — USB cables may be loose, lighting may change, network may be unstable. This morning's goal is ensuring your ElectronBot runs stably under various conditions without "crashing" during presentation.

### 任务12.1: 全系统连通测试 (20分钟)

```markdown
## 功能检查清单 | Feature Checklist

### 核心功能（必须通过）
- [ ] USB连接正常，PC识别ElectronBot设备
- [ ] 圆形屏幕正确显示表情动画
- [ ] 6个舵机响应角度命令，运动平滑
- [ ] 基础表情切换正常（happy/sad/neutral/surprised）
- [ ] IMU数据读取正常（roll/pitch准确）

### 进阶功能（加分项）
- [ ] 摄像头采集正常，OpenCV画面显示
- [ ] 人脸检测实时工作
- [ ] 姿态模仿功能：人体动作→舵机角度映射
- [ ] LLM对话功能：语音输入→AI回复→语音输出
- [ ] 手势传感器触发事件

### 稳定性测试
- [ ] 连续运行10分钟无崩溃
- [ ] USB重新插拔后自动恢复
- [ ] 传感器遮挡/异常时不会死锁
- [ ] AI API超时时有优雅降级（不卡住）
```

### 任务12.2: 关键Bug修复 (40分钟)

常见展示前Bug及修复方案：

| Bug | 原因 | 修复方案 |
|-----|------|----------|
| USB断连后不恢复 | 串口未重新打开 | 添加重连逻辑：检测断连→关闭→重新打开→重试 |
| 表情动画卡顿 | SD卡读取延迟 | 预加载常用表情帧到RAM缓存 |
| 舵机抖动 | PID参数不当 | 降低P增益，增大D增益，加入死区 |
| LLM API超时卡住 | 无超时处理 | 设置timeout=10s，超时返回默认回复 |
| OpenCV内存泄漏 | 每帧创建新对象 | 复用buffer，及时release |
| 画面延迟大 | 分辨率太高 | 降至320x240，跳帧处理 |

**USB重连示例代码:**
```python
class RobustUSBBridge:
    def __init__(self, config):
        self.config = config
        self.bridge = None
        self.max_retries = 3

    def ensure_connected(self):
        if self.bridge and self.bridge.is_connected():
            return True
        for attempt in range(self.max_retries):
            try:
                self.bridge = USBBridge(self.config)
                self.bridge.connect()
                return True
            except Exception as e:
                print(f"USB reconnect attempt {attempt+1} failed: {e}")
                time.sleep(1)
        return False

    def send_command(self, cmd, data):
        if not self.ensure_connected():
            return False
        try:
            self.bridge.send_command(cmd, data)
            return True
        except Exception:
            self.bridge = None
            return False
```

### 任务12.3: 演示流程排练 (30分钟)

**推荐演示流程（10分钟）：**

| 时间 | 环节 | 内容 |
|------|------|------|
| 0:00-1:00 | 开场介绍 | 项目名称、团队成员、项目目标（30秒概述） |
| 1:00-2:00 | 硬件展示 | 展示3D打印外壳、PCB焊接、6自由度机械结构 |
| 2:00-4:00 | 核心功能演示 | 表情切换、舵机运动、传感器响应 |
| 4:00-6:00 | CV/AI功能演示 | 姿态模仿、人脸检测、语音对话 |
| 6:00-7:00 | 技术架构讲解 | 系统框图、SDK架构、关键设计决策 |
| 7:00-8:00 | 挑战与收获 | 遇到的最大困难、如何解决、学到了什么 |
| 8:00-10:00 | Q&A | 回答评委/同学提问 |

**演示注意事项:**
1. 准备备用视频——如果现场USB或网络出问题，播放预录的演示视频
2. 提前测试投影仪/大屏幕连接
3. 关掉其他可能弹通知的应用程序
4. 准备一个简短的PPT（8-12页），包含系统架构图和关键数据

---

## 下午: 正式展示 | Afternoon: Formal Presentation

### 展示评分标准 | Presentation Grading

| 维度 | 分值 | 评分要点 |
|------|------|----------|
| 功能完整度 | 25分 | 核心功能全部正常，进阶功能完成度 |
| 技术深度 | 25分 | 能清晰讲解技术原理，回答深入问题 |
| 演示流畅度 | 15分 | 演示过程流畅，遇到问题能从容应对 |
| 创新拓展 | 15分 | 个性化功能、创意交互、独特设计 |
| 文档质量 | 10分 | README、代码注释、硬件记录完整 |
| 表达能力 | 10分 | 语言清晰、逻辑连贯、时间控制 |

### 展示准备清单 | Demo Preparation

- [ ] 硬件检查：电池电量充足、USB线固定、螺丝紧固
- [ ] 软件检查：所有程序已编译、配置文件正确
- [ ] 网络检查：API Key有效、网络连接稳定
- [ ] PPT准备：架构图、数据流图、关键代码截图
- [ ] 备用方案：预录演示视频、离线功能展示
- [ ] 时间排练：确保在10分钟内完成

---

## 创意拓展方向 | Creative Extension Directions

### 方向1: 语音唤醒 + 离线语音命令
利用ElectronBot的USB HUB空余端口接入USB麦克风，实现：
- 自定义唤醒词（"小E小E"）
- 离线命令识别（开灯、跳舞、讲笑话）
- 声纹识别（区分不同用户）

### 方向2: 多机器人协同
利用ESP-NOW或USB级联实现多台ElectronBot联动：
- 两台机器人对话/吵架
- 编队舞蹈（多机同步运动）
- 接力传递物体

### 方向3: 桌面助手功能
集成PC端自动化功能：
- 日历提醒（时间到了机器人挥手提醒）
- 邮件/消息通知（新消息时机器人做特定动作）
- 番茄钟（每25分钟提醒休息）
- 代码编译结果反馈（编译成功→开心，失败→难过）

### 方向4: 个性化外壳设计
- 用Fusion 360设计新外壳（恐龙、猫、机器人等造型）
- 添加LED灯带/NeoPixel
- 更换不同尺寸/颜色的表盘玻璃

### 方向5: 编程接口开放
- 设计一个简单的Blockly/Scratch编程界面
- 让小学生也能拖拽编程控制ElectronBot
- 分享到社区，让更多人参与

---

## 项目复盘 | Project Retrospective

### 技术收获回顾

| 阶段 | 学到的核心技术 |
|------|---------------|
| Phase 1 | STM32CubeIDE、ARM Cortex-M4架构、QFN焊接、机械组装 |
| Phase 2 | USB HS通信、SPI显示驱动、I2C多设备总线、PID闭环控制、IMU姿态解算、表情动画系统 |
| Phase 3 | Unity开发、OpenCV/MediaPipe计算机视觉、LLM API集成、行为树设计、情感模型 |

### 关键经验总结

1. **焊接QFN封装时**，助焊膏+热风枪是最可靠的方法，拖焊法需要更多练习
2. **I2C多设备总线**上，地址冲突是最常见的Bug来源，务必先做I2C扫描
3. **USB通信**的数据格式设计要考虑校验和，避免数据错乱导致舵机失控
4. **PID调参**要从小值开始，先调P再调I最后调D，切忌一次调太多
5. **OpenCV+MediaPipe**的延迟优化关键在于降低分辨率和使用更轻量的模型

---

## Q&A准备 | Q&A Preparation

**常见问题及参考答案:**

**Q: 为什么选择STM32F405而不是更便宜的STM32F103?**
A: STM32F405支持USB High-Speed（需要外部PHY USB3300），而F103只支持USB Full-Speed。USB HS的480Mbps带宽才能流畅传输圆形屏幕的图像数据。此外F405的Cortex-M4有浮点运算单元(FPU)，对姿态解算和PID计算很有帮助。

**Q: 为什么舵机要用自定义驱动板而不是标准的PWM舵机?**
A: 标准PWM舵机只能单向控制位置，无法获取当前角度反馈。自定义STM32F042驱动板实现了I2C总线控制+ADC角度采样+PID闭环，能精确控制位置并检测堵转等异常状态。

**Q: 为什么用Unity而不是直接用Python?**
A: Unity提供了强大的3D渲染能力，可以在虚拟场景中同步显示机器人的3D模型。同时Unity的C#脚本可以方便地调用C++ DLL（UnityBridge），实现与底层USB通信的高效桥接。Python则用于OpenCV和AI相关的计算密集型任务。

**Q: 这个项目最难的部分是什么?**
A: [根据个人体验回答，可能是焊接、运动学、USB通信、或CV集成]

---

## 参考资源 | References

- [ElectronBot GitHub仓库](https://github.com/peng-zhihui/ElectronBot)
- [ElectronBot B站演示视频](https://www.bilibili.com/video/BV1ka411b76m)
- [ElectronBot Fusion 360 CAD](https://a360.co/3t6CUMS)
- [STM32F4参考手册](https://www.st.com/resource/en/reference_manual/dm00031020.pdf)
- [Unity官方教程](https://learn.unity.com/)
- [MediaPipe官方文档](https://google.github.io/mediapipe/)

---

*最后更新：2026-05-27*
