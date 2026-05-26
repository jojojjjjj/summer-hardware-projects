# Day 10: 焊接与组装 | Soldering & Assembly

> **今日目标 Today's Goals:**
> - 掌握通孔焊接和贴片焊接的基础技能
> - 将所有元件焊接到 PCB 上
> - 安装热插拔轴座和机械轴体
> - 初步测试焊接后的 PCB 功能
>
> **产出 Deliverable:** 焊接完成的 PCB + 初步功能测试通过

---

## 时间安排 | Schedule

| 时间 Time | 活动类型 Type | 内容 Content |
|---|---|---|
| 09:00–09:15 | 晨会 | 安全注意事项，焊接流程讲解 |
| 09:15–10:30 | 讲解+演示 | 焊接基础与安全规范 |
| 10:30–10:45 | 休息 | — |
| 10:45–12:00 | 实验 | 焊接 STM32 主控和被动元件 |
| 12:00–13:30 | 午休 | — |
| 13:30–15:00 | 实验 | 焊接热插拔轴座和二极管 |
| 15:00–15:15 | 休息 | — |
| 15:15–16:30 | 实验 | 焊接外设接口 + 初步测试 |
| 16:30–17:00 | 总结 | 拍照记录 + 明日预告 |

---

## 上午：焊接基础与安全 | Morning: Soldering Fundamentals & Safety

### 为什么要学这个? | Why Learn This?

焊接是电子工程师最基本的动手技能之一。无论你设计的 PCB 多么完美，如果焊接质量不好，电路就不会正常工作。虚焊（cold joint）会导致间歇性接触，桥连（solder bridge）会导致短路——这些问题极其隐蔽，调试时会让你抓狂。

Soldering is one of the most fundamental hands-on skills for electronics engineers. No matter how perfect your PCB design, poor soldering quality means non-working circuits. Cold joints cause intermittent contact; solder bridges cause shorts — both are maddeningly hard to debug.

好消息是：焊接并不难，只需要掌握几个要点并多加练习。今天你将从最简单的通孔元件开始，逐步进阶到热插拔轴座和贴片元件。

---

### 任务 10.1: 焊接安全与规范 (30 分钟)

**安全守则 Safety Rules:**

| 规则 Rule | 说明 Explanation |
|---|---|
| 烙铁不用时放回烙铁架 | 烙铁头温度 300-380 度，可烫伤皮肤、烧毁桌面 |
| 不要触摸烙铁头 | 烫伤！即使看起来冷却了，余温也很高 |
| 保持通风 | 焊锡烟雾含有松香，长期吸入对健康有害 |
| 使用护目镜（可选） | 防止焊锡飞溅 |
| 焊接后洗手 | 焊锡含有铅（有铅焊锡）或助焊剂残留 |
| 远离易燃物 | 烙铁可点燃纸张、塑料 |

**焊接工具 Soldering Tools:**

| 工具 Tool | 用途 Purpose |
|---|---|
| 烙铁 Soldering Iron | 加热焊点 |
| 焊锡丝 Solder Wire | 提供焊料（推荐 0.8mm 含松香芯） |
| 助焊剂 Flux | 帮助焊锡流动和润湿 |
| 吸锡器/吸锡带 | 去除多余焊锡 |
| 镊子 Tweezers | 放置小元件 |
| 剪线钳 Flush Cutters | 剪掉多余引脚 |
| PCB 固定架 | 固定 PCB，解放双手 |

---

### 任务 10.2: 通孔焊接练习 (45 分钟)

**通孔焊接五步法 Through-hole Soldering 5-Step Method:**

```
Step 1: 对位 (Position)
  将元件引脚插入 PCB 对应的孔中
  从背面弯折一点引脚防止脱落

Step 2: 预热 (Preheat)
  烙铁头同时接触焊盘（铜环）和引脚
  预热约 1 秒

Step 3: 送锡 (Feed Solder)
  将焊锡丝送到焊盘和引脚的交汇处
  焊锡会自动熔化并流动

Step 4: 移锡 (Remove Solder)
  焊锡量足够后先移走焊锡丝
  保持烙铁继续加热约 0.5 秒

Step 5: 移铁 (Remove Iron)
  移走烙铁，等待焊点冷却（约 2 秒）
  冷却过程中不要移动元件！
```

**好焊点 vs 坏焊点 Good vs Bad Solder Joints:**

```
好焊点 (Good Joint):        坏焊点 (Bad Joints):
    _____                      _____
   /     \                    /     \       ← 虚焊：焊锡未
  |  光亮  |                  |  暗淡  |        润湿焊盘
  |  圆润  |                  |  凹凸  |
  \_______/                  \_______/
  焊盘                       焊盘

  焊锡光滑、有光泽、呈圆锥形    焊锡暗淡、粗糙、不规则
```

**练习 Practice:**
1. 在废弃 PCB 或练习板上焊接电阻
2. 确认每个焊点都光亮饱满
3. 用万用表检查是否虚焊

---

### 任务 10.3: 焊接 STM32 主控 (30 分钟)

**焊接顺序 Soldering Order（推荐）:**

```
1. 最矮的元件先焊：电阻、电容、二极管（贴片 0805）
2. 中等高度：STM32 最小系统板（排针连接或直焊）
3. 较高元件：USB Type-C 母座、OLED 接口排针
4. 最后：热插拔轴座（最后焊，避免影响其他操作）
```

**STM32 最小系统板焊接注意 STM32 Board Notes:**
- 如果使用带排针的最小系统板，直接焊接排针到 PCB
- 如果直接焊接芯片，先在一个角焊一个引脚固定，再焊其余引脚
- LQFP 封装引脚间距 0.65mm，需要使用助焊剂

---

## 下午：键盘元件焊接 | Afternoon: Keyboard Component Soldering

### 任务 10.4: 焊接热插拔轴座 (60 分钟)

**热插拔轴座介绍 Hot-swap Socket Introduction:**

```
热插拔轴座的作用：
  +-----------+
  |  机械轴体  |  <-- 可以随时拔出更换
  +-----------+
  |  热插拔轴座 |  <-- 焊接在 PCB 上
  +-----------+
  |    PCB     |
  +-----------+

好处：
1. 不用焊接就能更换轴体
2. 可以尝试不同的手感（线性/段落/有声段落）
3. 轴体损坏时方便更换
```

**焊接步骤 Steps:**

1. 将热插拔轴座对准 PCB 上的焊盘位置
2. 用镊子固定轴座，先焊一个引脚
3. 检查轴座是否平贴 PCB，如果歪了则重新加热修正
4. 焊接另一个引脚
5. 重复 16 次

> **注意**：热插拔轴座的焊盘比较小，控制好焊锡量，避免过多焊锡导致桥连。

---

### 任务 10.5: 焊接外设接口 (30 分钟)

**焊接清单 Soldering Checklist:**

| 元件 Component | 状态 Status | 检查 Check |
|---|---|---|
| STM32 主控 | [ ] 已焊 | [ ] 万用表测试 |
| 16 个热插拔轴座 | [ ] 已焊 | [ ] 轴体可插入 |
| 16 个 1N4148 二极管 | [ ] 已焊 | [ ] 方向正确 |
| USB Type-C 母座 | [ ] 已焊 | [ ] 通电测试 |
| OLED 接口排针 | [ ] 已焊 | [ ] 连接测试 |
| WS2812B 灯珠 | [ ] 已焊 | [ ] 供电测试 |
| EC11 旋钮 | [ ] 已焊 | [ ] 旋转测试 |
| 晶振 + 电容 | [ ] 已焊 | — |
| 滤波电容 | [ ] 已焊 | — |
| LDO 稳压器 | [ ] 已焊 | [ ] 输出 3.3V |
| 限流/保护电阻 | [ ] 已焊 | — |

---

### 任务 10.6: 初步通电测试 (30 分钟)

**测试步骤 Test Steps:**

1. **目视检查**：检查所有焊点，寻找虚焊和桥连
2. **短路检查**（未通电）：
   - 万用表蜂鸣档，检查 VCC 和 GND 是否短路
   - 检查相邻焊盘之间是否短路
3. **通电测试**：
   - USB 连接电脑
   - 检查 3.3V 电源是否正常（万用表测量）
   - 检查电流消耗（正常约 20-50mA，无短路）
4. **刷入固件**：
   - 进入 DFU 模式
   - 刷入 Day 8 编译的固件
   - 检查设备管理器是否识别为键盘

**预期结果 Expected Result:**
- 通电无短路（电流正常）
- 3.3V 电源输出正常
- USB 设备被识别
- 插入轴体后按键能正常触发

---

## 今日作业 | Homework

1. **拍摄焊接成果照片**：PCB 正面 + 背面（高清，能看清焊点）
2. **完成焊接检查清单**：标注每个元件的焊接状态
3. **回答思考题**：
   - 焊接贴片 LED（WS2812B）和焊接直插电阻有什么不同？
   - 为什么焊接顺序要从矮到高？
   - 如何判断一个焊点是虚焊？

---

## 明日预告 | Tomorrow's Preview

明天是**系统集成日**。你将把所有模块——矩阵扫描、OLED 显示、RGB 灯效、旋钮编码器——整合到一起，进行完整的功能联调。你还将设计和测试个性化灯效！

Tomorrow is **System Integration Day**. You'll integrate all modules — matrix scanning, OLED display, RGB lighting, rotary encoder — and conduct full functional testing. You'll also design and test personalized LED effects!

---

## 参考资源 | References

- [大佬勿入] 机械键盘 RGB 贴片灯珠焊接全过程（YK-Yan）：https://www.bilibili.com/video/BV1rh411U7wK/
- [零基础] PCB 焊接与固件刷写（丈二先生呀）：https://www.bilibili.com/video/BV1iu411U7FJ/
- B 站搜索 "热插拔轴座 焊接 教程"
- B 站搜索 "通孔焊接 入门 教程"

---

*最后更新 | Last updated: 2026-05-26*
