# Day 07: PCB 布局与打样 | PCB Layout & Fabrication

> **今日目标 Today's Goals:**
> - 从原理图导入网表到 PCB 编辑器
> - 完成元件布局（Layout）和铜导线布线（Routing）
> - 理解 PCB 布线规则（线宽、间距、过孔）
> - 运行 DRC 检查并导出 Gerber 文件
> - 在嘉立创下单打样
>
> **产出 Deliverable:** 通过 DRC 的 PCB 文件 + 嘉立创打样订单

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 原理图回顾，PCB 设计重要性 |
| 09:15–10:30 | 讲解 | PCB 布局布线规则与技巧 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | 元件布局 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 铜导线布线 |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | DRC 检查 + Gerber 导出 + 下单 |
| 16:30–17:00 | 总结 | 日终回顾 + 明日预告 |

---

## 上午：PCB 布局 | Morning: PCB Layout

### 为什么要学这个? | Why Learn This?

PCB 布局是硬件设计中最具创造性的环节之一。好的布局不仅让电路工作可靠，还决定了产品的外观和可制造性。工程师常说"布局决定成败"——一个糟糕的布局可能导致信号干扰、散热不良、甚至无法焊接。

PCB layout is one of the most creative aspects of hardware design. A good layout ensures reliable operation, appearance, and manufacturability. Engineers say "layout determines success or failure" — a poor layout can cause signal interference, heat issues, or even unsolderable boards.

---

### 任务 7.1: 从原理图导入到 PCB (30 分钟)

**步骤 Steps:**

1. 在嘉立创 EDA 中点击 "设计" -> "导入网表到 PCB"
2. 系统自动从原理图生成所有元件和连接关系
3. 所有元件以"飞线"（Ratsnest）方式显示——这就是需要你在 PCB 上连接的导线
4. 设置 PCB 板框尺寸：约 80mm x 80mm（4x4 键盘 + 旋钮的紧凑尺寸）

**预期结果 Expected Result:**
- 所有 16 个按键开关封装 + 16 个二极管封装 + STM32 + OLED 接口 + WS2812B + EC11 + USB 接口 + 被动元件全部出现在 PCB 编辑器中
- 飞线显示元件间的连接关系

---

### 任务 7.2: 元件布局 (90 分钟)

**布局原则 Layout Principles:**

1. **核心器件优先**：先放 STM32 主控，再放按键矩阵，最后放外设
2. **信号流向**：输入在左/上，输出在右/下
3. **功能分组**：同一功能模块的元件尽量靠近
4. **对称美观**：按键矩阵保持对称排列
5. **可制造性**：元件间距 >= 0.2mm，避免过于密集

**布局步骤 Layout Steps:**

```
Step 1: 放置主控
┌─────────────────────────────┐
│         STM32F103C8T6       │
│        (板子中央偏左)         │
└─────────────────────────────┘

Step 2: 放置按键矩阵
┌─────────────────────────────┐
│  [K00] [K01] [K02] [K03]   │
│  [K10] [K11] [K12] [K13]   │  <-- 按键矩阵区域
│  [K20] [K21] [K22] [K23]   │     (右侧)
│  [K30] [K31] [K32] [K33]   │
└─────────────────────────────┘

Step 3: 放置二极管（靠近对应按键）
每个按键旁边放一个 1N4148

Step 4: 放置外设
- OLED 接口（4 针排针）：板子顶部
- WS2812B（按键下方或周围）
- EC11 旋钮：矩阵右侧或角落
- USB Type-C：板子顶部边缘

Step 5: 放置被动元件
- 晶振 + 电容：靠近 STM32
- 上拉电阻：靠近 I2C 引脚
- LDO + 滤波电容：靠近 USB 接口
- 330R 电阻：靠近 WS2812B 数据线
```

**按键间距参考 Key Spacing:**
- 标准键帽间距：19.05mm (0.75 英寸)
- 宏键盘可适当缩小到 18mm 或 16mm
- 本项目推荐 19.05mm（与标准键帽兼容）

**预期结果 Expected Result:**
- 所有元件放置到位，无重叠
- 按键矩阵排列整齐
- 飞线交叉尽量少

---

## 下午：布线与制造 | Afternoon: Routing & Manufacturing

### 任务 7.3: PCB 布线 (90 分钟)

**布线规则 Routing Rules:**

| 参数 Parameter | 推荐值 Recommended | 说明 Notes |
|---|---|---|
| 信号线宽 Signal Width | 0.25mm (10mil) | 一般信号 |
| 电源线宽 Power Width | 0.5mm (20mil) 或更宽 | VCC 和 GND |
| 最小间距 Minimum Clearance | 0.2mm (8mil) | 线与线之间 |
| 过孔直径 Via Diameter | 0.6mm (外) / 0.3mm(内) | 双层板过孔 |
| 铜皮间距 Copper Clearance | 0.3mm | 铺铜与走线间距 |

**布线策略 Routing Strategy:**

1. **先布电源和地**：确保供电充足
2. **先布重要信号**：USB 差分对、I2C、晶振
3. **矩阵布线**：行列走线尽量短且直
4. **差分对布线**：USB D+/D- 要等长等距
5. **避免直角走线**：使用 45 度角或圆弧

**USB 差分对注意事项 USB Differential Pair:**
```
D+ 和 D- 必须：
- 线宽一致（0.25mm）
- 间距一致（0.25mm）
- 长度尽量相等
- 远离其他信号线
```

**铺铜 Pour Copper:**
- 在顶层和底层都铺 GND 铜皮
- 铺铜可以提供更好的接地和屏蔽效果
- 铺铜间距设置为 0.3mm

---

### 任务 7.4: DRC 检查与 Gerber 导出 (30 分钟)

**DRC (Design Rules Check) 常见问题:**

| 问题 Problem | 原因 Cause | 修正 Fix |
|---|---|---|
| 间距违规 Clearance Violation | 线与线/焊盘太近 | 调整走线位置 |
| 未连接网络 Unconnected Net | 飞线未全部布完 | 继续布线 |
| 线宽违规 Width Violation | 电源线太细 | 加宽到 0.5mm+ |
| 孔径违规 Hole Size | 过孔太小 | 增大过孔尺寸 |

**Gerber 导出步骤:**

1. 运行 DRC，确保 0 错误
2. 点击 "制造" -> "生成 Gerber"
3. 检查各层文件：
   - F.Cu（顶层铜）
   - B.Cu（底层铜）
   - F.SilkS（顶层丝印）
   - F.Mask（顶层阻焊）
   - Edge.Cuts（板框）
4. 下载 Gerber 文件（.zip）

**嘉立创下单步骤:**

1. 访问 https://www.jlc.com/
2. 选择 "PCB 下单"
3. 上传 Gerber 文件
4. 设置参数：
   - 板子尺寸：80mm x 80mm
   - 层数：2 层
   - 板厚：1.6mm
   - 铜厚：1oz
   - 阻焊颜色：绿色（最便宜）
   - 数量：5 片
5. 确认价格（约 5 元 + 运费）
6. 下单付款

> **嘉立创新用户优惠**：首次下单可能免运费或打折，记得使用新人优惠！
> JLCPCB new user discount: first order may have free shipping or discount.

---

## 今日作业 | Homework

1. **提交 PCB 文件**：PCB 文件截图（正面 + 背面）+ DRC 报告截图
2. **提交 Gerber 文件**：下载并保存到项目仓库
3. **提交打样订单**：截图嘉立创订单确认页
4. **回答思考题**：
   - 为什么电源线要比信号线宽？
   - 为什么 USB 差分对需要等长？
   - 铺铜有什么好处？
5. **预习 Day 8**：搜索 "QMK 固件 入门教程"，了解 QMK 的基本结构

---

## 明日预告 | Tomorrow's Preview

明天开始进入**固件开发**阶段！你将学习 **QMK 固件框架**——全球最流行的开源键盘固件。到 Day 9 结束时，你的键盘就能被电脑识别为真正的 HID 设备了！

Tomorrow starts the **firmware development** phase! You'll learn the **QMK firmware framework** — the world's most popular open-source keyboard firmware. By Day 9, your keyboard will be recognized as a real HID device!

---

## 参考资源 | References

- [免费将你的 DIY 键盘主控 PCB 印出来！](https://www.bilibili.com/video/BV1hL411H7vv/) — 嘉立创打样教程
- [苏达] 从 PCB 开始打造专属终极键盘（第十集-组装）：https://www.bilibili.com/video/BV1mB4y1F7oj/
- 嘉立创下单指南：https://www.jlc.com/
- QMK 官方文档：https://docs.qmk.fm/

---

*最后更新 | Last updated: 2026-05-26*
