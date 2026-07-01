# 第一阶段：项目调研指令 | Phase 1: Research Phase Instructions
<!-- 注：价格信息已注释隐藏（查价不准确，仅作参考不严谨）/ Note: price info commented out (inaccurate, not rigorous as reference) -->

> 本文件指导调研员 Agent 如何搜索、筛选和记录候选开源项目。
> This file guides researcher agents on how to search, filter, and document candidate open-source projects.

---

## 调研目标 | Research Goals

从真实开源社区中找到 **适合高中生在 10-20 天内完成** 的硬件项目，每个方向至少 8 个候选。

---

## 搜索策略 | Search Strategy

### GitHub 搜索

**桌宠/陪伴机器人方向：**
- `desktop pet robot servo`
- `companion robot raspberry pi`
- `LLM robot chat`
- `robot arm servo python`
- `desktop buddy robot`

**智能音箱/语音助手方向：**
- `raspberry pi smart speaker`
- `voice assistant offline`
- `whisper raspberry pi`
- `wake word detection`
- `local LLM voice chat`

**环境感知 IoT 方向：**
- `ESP32 weather station`
- `air quality monitor ESP32`
- `IoT dashboard MQTT`
- `home environmental sensor`
- `smart plant monitor`

**视觉/CV 方向：**
- `opencv realtime detection`
- `mediapipe interactive installation`
- `face detection raspberry pi`
- `gesture recognition python`
- `pose detection interactive art`

### Hugging Face 搜索
- 搜索相关模型和 Spaces
- 关注易于部署的模型（ONNX、TFLite）
- 查看是否有教育类项目展示

### 立创开源平台 / B站
- 搜索中文关键词
- 关注有详细教程的项目
- 记录视频教程链接

---

## 筛选标准 | Filtering Criteria

**必须满足（硬性条件）：**
1. 开源且有公开代码/硬件设计
2. 核心功能可在 10-20 天内实现
3. 硬件总成本 <!-- < ¥500 -->（单套）
4. 有社区讨论或教程资源

**优先考虑（软性条件）：**
1. 项目文档质量高
2. 最近 1 年内有更新
3. 已有人复现成功
4. 技术栈对初学者友好（Python 优先）
5. 有视觉冲击力的最终效果

---

## 输出格式 | Output Format

每个候选项目按以下模板记录：

```markdown
### [项目编号]. [项目名称]

- **链接：** GitHub/社区 URL
- **方向分类：** 桌宠机器人 / 智能音箱 / IoT / CV
- **核心技术栈：** 列出主要技术和框架
- **硬件平台：** Raspberry Pi / ESP32 / Arduino 等
- **关键组件：** 传感器、执行器、显示屏等
- **社区数据：** ⭐ Stars | 最近更新 | Issues 数
- **难度评分：** 1-5（1=入门，5=高级）
- **成本估算：** <!-- ¥XXX -->
- **适合改编度：** 1-5（1=不适合，5=非常适合）
- **改编理由：** 一句话说明为什么适合/不适合高中生
- **参考教程：** 相关教程链接（如有）
```

---

## 质量要求

- 每个方向 ≥ 8 个候选项目
- 所有项目必须是真实存在的（提供可验证链接）
- 成本估算基于实际市场价格
- 不得编造项目信息
