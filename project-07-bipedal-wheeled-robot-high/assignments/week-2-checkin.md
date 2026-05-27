# 第二周检查点 | Week 2 Check-in

## 概述 | Overview

第二周检查点用于评估学员在 Day 7-11 的学习成果，重点检查遥控功能实现、完整系统集成、3D 打印零件完成、整机组装，以及最终演示准备就绪程度。

> Week 2 check-in evaluates learning outcomes from Day 7-11, focusing on remote control implementation, full system integration, 3D printed parts completion, full assembly, and final demo readiness.

---

## 检查时间 | Check-in Time

**Day 11 下午 | Day 11 Afternoon**

---

## 学生/团队信息 | Student / Team Information

| 字段 | 内容 |
|------|------|
| **团队名称 / Team Name** | |
| **成员姓名 / Members** | |
| **项目仓库链接 / Repo URL** | |
| **检查日期 / Check-in Date** | |
| **第一周得分 / Week 1 Score** | |

---

## 进度检查清单 | Progress Checklist (Day 7-11)

### Day 7: 双轴平衡与遥控集成 | Dual-Axis Balancing & Remote Control

- [ ] 实现双轴（前后 + 左右）自平衡控制
- [ ] 机器人能在双轴上稳定站立 15 秒以上
- [ ] 完成蓝牙/WiFi 遥控模块集成
- [ ] 实现遥控器（手机 App 或手柄）连接
- [ ] 通过遥控器发送前进/后退/左转/右转指令
- [ ] 遥控指令响应延迟 < 200ms

> Implement dual-axis (front-back + left-right) self-balancing; robot stands stably for 15+ seconds on dual axes; integrate Bluetooth/WiFi remote control module; connect remote controller (phone app or gamepad); send forward/backward/left/right commands via remote; response latency < 200ms.

**验证方法 | Verification:**
```bash
# 运行双轴平衡 + 遥控程序
pio run -t upload -e balance_remote
# 机器人应双轴自平衡
# 通过手机 App 发送指令，机器人响应运动
pio device monitor
```

**提交材料 | Submission:**
- 双轴平衡演示视频
- 遥控控制演示视频
- 蓝牙/WiFi 通信协议说明

---

### Day 8: 完整系统集成与参数优化 | Full System Integration & Parameter Tuning

- [ ] 所有模块（IMU + 电机 + 遥控）协同工作
- [ ] PID 参数精细调优，平衡稳定性提升
- [ ] 实现平滑运动控制（加速/减速过渡自然）
- [ ] 添加安全保护（倾倒检测 + 电机停机）
- [ ] 系统连续运行 5 分钟以上不崩溃

> All modules (IMU + motors + remote) work together; fine-tune PID parameters for improved stability; implement smooth motion control with natural acceleration/deceleration; add safety protection (fall detection + motor shutdown); system runs continuously for 5+ minutes without crash.

**验证方法 | Verification:**
```bash
# 运行完整集成程序
pio run -t upload -e full_integration
# 测试各功能模块协同工作
# 进行 5 分钟连续运行测试
```

**提交材料 | Submission:**
- 完整集成演示视频
- 最终 PID 参数记录表
- 系统运行日志

---

### Day 9: 3D 打印零件验收 | 3D Printed Parts Inspection

- [ ] 所有 3D 打印零件已收到/打印完成
- [ ] 零件尺寸与设计图纸吻合（公差 +/- 0.3mm）
- [ ] 零件表面质量良好（无严重翘曲、层纹可接受）
- [ ] 测试零件配合度（螺丝孔位对齐、卡扣匹配）
- [ ] 对有缺陷的零件进行修整或重新打印

> All 3D printed parts received/completed; dimensions match design drawings (tolerance +/- 0.3mm); surface quality acceptable (no severe warping); test part fit (screw holes aligned, snaps matched); repair or reprint defective parts.

**验证方法 | Verification:**
- 逐一检查所有 3D 打印零件
- 测试零件之间的配合度
- 与 StackForce 官方 BOM 清单核对

**提交材料 | Submission:**
- 所有零件照片（标注零件名称）
- 零件验收检查表
- 需要重打的零件清单（如有）

---

### Day 10: 整机组装与布线 | Full Assembly & Wiring

- [ ] 按照 StackForce 装配图纸完成机械组装
- [ ] 所有螺丝紧固，结构稳固
- [ ] 电气布线整洁有序（无短路风险）
- [ ] MPU6050 安装位置正确且牢固
- [ ] 电机安装到位，轮子转动无干涉
- [ ] 电池安装并固定
- [ ] 电源开关和充电接口可正常使用

> Complete mechanical assembly per StackForce instructions; all screws tightened, structure solid; electrical wiring clean and safe; MPU6050 correctly mounted; motors installed without wheel interference; battery mounted and secured; power switch and charging port functional.

**验证方法 | Verification:**
```bash
# 上电前检查
# - 目视检查所有接线
# - 万用表检查电源对地无短路
# - 确认电池电压正常

# 上电测试
pio run -t upload -e full_integration
# 检查所有功能正常
```

**提交材料 | Submission:**
- 组装过程照片（至少 5 张关键步骤）
- 完整机器人外观照片（正面/侧面/背面）
- 布线细节照片

---

### Day 11: 功能测试与调优 | Function Testing & Fine Tuning

- [ ] 机器人上电后自动进入平衡状态
- [ ] 遥控前进/后退/左转/右转功能正常
- [ ] 平衡稳定性满足演示要求（站立 30 秒以上）
- [ ] 运动过程中无异常抖动或失控
- [ ] 电池续航满足演示需求（至少 15 分钟）
- [ ] 完成最终演示排练至少 1 次

> Robot auto-enters balancing mode on power-up; remote forward/backward/left/right functional; balance stability meets demo requirements (30+ seconds standing); no abnormal jitter or loss of control during movement; battery life sufficient for demo (15+ minutes); complete at least 1 full demo rehearsal.

**验证方法 | Verification:**
```bash
# 最终功能测试
pio run -t upload -e release
# 逐项测试所有功能
# 记录测试结果
```

**提交材料 | Submission:**
- 完整功能演示视频（平衡 + 遥控）
- 测试报告（功能清单 + 通过/未通过状态）
- 演示排练记录

---

## 技术问题记录 | Technical Questions Encountered

| 序号 | 问题描述 | 解决方案 | 状态 |
|------|---------|---------|------|
| 1 | | | 未解决/已解决 |
| 2 | | | 未解决/已解决 |
| 3 | | | 未解决/已解决 |
| 4 | | | 未解决/已解决 |
| 5 | | | 未解决/已解决 |

> Describe technical issues encountered, solutions applied, and current status.

---

## 关键功能确认 | Key Functionality Confirmation

### 遥控功能 | Remote Control

- [ ] 蓝牙/WiFi 连接稳定，不断线
- [ ] 前进指令响应正常
- [ ] 后退指令响应正常
- [ ] 左转指令响应正常
- [ ] 右转指令响应正常
- [ ] 停止指令响应正常
- [ ] 速度控制可用（如有实现）

> Bluetooth/WiFi connection stable; forward/backward/left/right/stop commands responsive; speed control functional (if implemented).

### 完整集成 | Full Integration

- [ ] 上电自动平衡
- [ ] 遥控与平衡功能同时工作不冲突
- [ ] 倾倒保护功能正常
- [ ] 系统运行 5 分钟以上稳定

> Auto-balance on power-up; remote and balance work simultaneously; fall protection functional; system stable for 5+ minutes.

### 3D 打印完成度 | 3D Printing Completion

- [ ] 所有零件已打印完成
- [ ] 零件尺寸准确
- [ ] 表面质量可接受
- [ ] 零件之间配合良好

> All parts printed; dimensions accurate; surface quality acceptable; parts fit well together.

### 整机组装 | Full Assembly

- [ ] 机械结构完整
- [ ] 电气连接正确
- [ ] 外观整洁美观
- [ ] 所有功能可用

> Mechanical structure complete; electrical connections correct; appearance clean; all functions operational.

---

## 最终演示准备度评估 | Final Demo Readiness Assessment

| 维度 | 准备度 (1-5) | 备注 |
|------|-------------|------|
| **自平衡稳定性** | | |
| Self-balancing Stability | | |
| **遥控功能完整度** | | |
| Remote Control Completeness | | |
| **系统稳定性** | | |
| System Stability | | |
| **外观完成度** | | |
| Appearance Completion | | |
| **演示流畅度** | | |
| Demo Smoothness | | |
| **文档完整度** | | |
| Documentation Completeness | |
| **Demo 网站进度** | | |
| Demo Website Progress | | |

> Rate readiness 1-5 for each dimension.

---

## 代码提交要求 | Code Submission Requirements

- [ ] 所有代码已推送到团队 Git 仓库
- [ ] 包含完整的项目 README.md
- [ ] 代码有清晰的中文注释
- [ ] Commit 历史完整，信息规范
- [ ] 包含最终的 PID 参数配置文件

**仓库链接：** _______________________

**总 Commit 数量：** ______

---

## 自我评估 | Self-Assessment

请对以下维度进行 1-5 分评分（1=需要大量帮助, 5=完全独立完成）：

> Rate each dimension 1-5 (1=need significant help, 5=completed independently).

| 维度 | 评分 (1-5) | 备注 |
|------|-----------|------|
| **双轴平衡实现** | | |
| Dual-Axis Balancing | | |
| **遥控功能实现** | | |
| Remote Control Implementation | | |
| **系统集成能力** | | |
| System Integration | | |
| **3D 打印与组装** | | |
| 3D Printing & Assembly | | |
| **问题解决能力** | | |
| Problem Solving | | |
| **团队合作** | | |
| Teamwork | | |
| **代码质量** | | |
| Code Quality | | |
| **文档撰写** | | |
| Documentation | | |

---

## 检查流程 | Check-in Process

### 准备阶段 (1 小时) | Preparation (1 hour)

1. **功能自检**
   - 运行完整系统
   - 修复发现的问题
   - 准备演示材料

2. **材料准备**
   - 整理代码和文档
   - 准备演示机器人
   - 准备遥控设备

3. **演示排练**
   - 预演演示流程
   - 准备演示脚本
   - 预设问题回答

### 演示阶段 (20 分钟/人) | Demo (20 min/person)

1. **硬件展示 (3 分钟)**
   - 展示组装完成的机器人
   - 说明结构设计
   - 展示布线

2. **平衡演示 (5 分钟)**
   - 单轴平衡展示
   - 双轴平衡展示
   - 抗干扰能力展示

3. **遥控演示 (5 分钟)**
   - 前进/后退
   - 左转/右转
   - 速度控制

4. **技术讲解 (5 分钟)**
   - 系统架构
   - PID 调参过程
   - 遇到的挑战

5. **问答环节 (2 分钟)**

### 评估阶段 (5 分钟) | Evaluation (5 min)

---

## 评分标准 | Grading Criteria

| 维度 | 权重 | 标准 |
|------|------|------|
| **遥控功能** | 25% | 遥控响应及时，运动流畅 |
| **完整集成** | 25% | 所有模块协同工作，系统稳定 |
| **3D 打印** | 15% | 零件完整，质量良好 |
| **整机组装** | 20% | 结构稳固，布线整洁 |
| **文档与代码** | 15% | 代码规范，文档完整 |

---

## 通过标准 | Pass Criteria

### 基础要求（必须）| Basic Requirements (Required)
- [x] 双轴自平衡功能正常
- [x] 遥控功能基本可用
- [x] 机器人组装完成
- [x] 代码有适当注释
- [x] 有基本项目文档

### 优秀标准（可选）| Excellence Standards (Optional)
- [ ] 平衡非常稳定（站立 1 分钟以上）
- [ ] 遥控响应平滑，运动自然
- [ ] 外观精美，布线专业
- [ ] 有创新的附加功能
- [ ] Demo 网站已部署

**总分 >= 70 分为通过，>= 90 分为优秀**

---

## 常见问题 | Common Issues

### Q1: 遥控连接不稳定怎么办？
**A:** 检查：
1. 蓝牙/WiFi 模块供电是否充足
2. 是否有其他设备干扰
3. 通信波特率是否匹配
4. ESP32 WiFi 和蓝牙不能同时使用，选择一种

### Q2: 组装后平衡效果变差？
**A:** 可能原因：
1. 重心偏移 — 调整电池/电路板位置
2. MPU6050 安装松动 — 重新固定
3. 轮子转动有摩擦 — 检查轮轴安装
4. 重新校准 MPU6050 零偏

### Q3: 电池续航不够？
**A:** 建议：
1. 使用更大容量电池（推荐 18650 锂电池 2S）
2. 优化代码减少不必要的计算
3. 降低电机功率输出
4. 准备备用电池

### Q4: 3D 打印零件不合适怎么办？
**A:** 方案：
1. 用砂纸/锉刀修整
2. 调整打印参数重打
3. 联系助教获取备用零件
4. 参考 StackForce 社区 Q 群 223211857

---

## 最终提交清单 | Final Submission Checklist

### 代码 | Code
- [ ] 所有源代码提交到 Git
- [ ] 代码有适当注释
- [ ] PID 参数配置文件
- [ ] 遥控通信代码

### 文档 | Documentation
- [ ] README 完善
- [ ] 接线图
- [ ] PID 调参记录
- [ ] 零件清单 (BOM)

### 演示 | Demo
- [ ] 演示视频录制
- [ ] 演示脚本准备
- [ ] 遥控设备调试

### Demo 网站 | Demo Website
- [ ] 网站已部署（GitHub Pages / Vercel / Netlify）
- [ ] 包含项目描述
- [ ] 包含照片/视频
- [ ] 包含技术文档

---

## 项目总结要求 | Project Summary Requirements

**要求提交 500 字项目总结，包含：**

> Submit a 500-word project summary including:

1. **完成情况 | Completion Status**
   - 实现的功能 / Features implemented
   - 达成的目标 / Goals achieved

2. **学习收获 | Learning Outcomes**
   - 技术技能 / Technical skills
   - 问题解决 / Problem solving
   - 项目经验 / Project experience

3. **遇到的问题 | Challenges Encountered**
   - 主要挑战 / Main challenges
   - 解决方案 / Solutions applied

4. **未来改进 | Future Improvements**
   - 功能扩展 / Feature extensions
   - 性能优化 / Performance improvements
   - 设计改进 / Design improvements

---

*恭喜接近项目完成！Congratulations on nearing project completion!*
*最后更新：2026-05-27*
