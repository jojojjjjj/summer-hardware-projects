# 物料清单 | Bill of Materials (BOM)

## 项目总预算 | Total Budget

| 类别 Category | 金额 Amount (CNY) |
|---|---|
| 核心元器件 | 61.2 |
| 连接与结构 | 60 |
| PCB 制造 | 5 |
| 其他耗材 | 20 |
| **总计 Total** | **~147.4** |

> 预算控制在 500 元以内。Budget well under 500 CNY.

---

## 完整物料清单 | Full BOM

### 一、核心元器件 | Core Components

| 编号 No. | 元件 Component | 型号 Specification | 数量 Qty | 单价 Unit Price (CNY) | 小计 Subtotal | 采购渠道 Source | 备注 Notes |
|---|---|---|---|---|---|---|---|
| 1 | 主控开发板 | STM32F103C8T6 最小系统板 | 1 | 8.0 | 8.0 | 淘宝/拼多多 | 带排针，方便连接 |
| 2 | 机械轴体 | 佳达隆 Gateron G Pro 3.0 | 16 | 2.0 | 32.0 | 淘宝客制化键盘店 | 可选红/青/茶轴 |
| 3 | 热插拔轴座 | Kailh 热插拔底座 | 16 | 0.4 | 6.4 | 淘宝 | 兼容 MX 十字轴 |
| 4 | OLED 显示屏 | SSD1306 0.96寸 128x64 I2C | 1 | 8.0 | 8.0 | 淘宝/嘉立创商城 | 蓝色或白色 |
| 5 | RGB 灯珠 | WS2812B 5050 封装 | 16 | 0.2 | 3.2 | 淘宝/嘉立创商城 | 可用灯带裁切 |
| 6 | 旋转编码器 | EC11 带按键功能 | 1 | 2.0 | 2.0 | 淘宝/嘉立创商城 | 含配套旋钮帽 |
| 7 | 二极管 | 1N4148 (SOD-123 或直插) | 16 | 0.05 | 0.8 | 淘宝/嘉立创商城 | 防鬼键用 |
| 8 | USB 接口 | Type-C 母座 16P | 1 | 1.0 | 1.0 | 淘宝/嘉立创商城 | SMD 贴片 |
| **小计 Subtotal** | | | | | **61.4** | | |

### 二、被动元件 | Passive Components

| 编号 No. | 元件 Component | 型号 Specification | 数量 Qty | 单价 Unit Price (CNY) | 小计 Subtotal | 说明 Notes |
|---|---|---|---|---|---|---|
| 9 | 电阻 220 ohm | 0805 封装 | 2 | 0.02 | 0.04 | LED 限流 + USB D+ 保护 |
| 10 | 电阻 330 ohm | 0805 封装 | 1 | 0.02 | 0.02 | WS2812B 数据线保护 |
| 11 | 电阻 4.7k ohm | 0805 封装 | 2 | 0.02 | 0.04 | I2C 上拉电阻 |
| 12 | 电阻 10k ohm | 0805 封装 | 1 | 0.02 | 0.02 | 复位电路上拉 |
| 13 | 电容 20pF | 0805 封装 | 2 | 0.02 | 0.04 | 晶振负载电容 |
| 14 | 电容 100nF | 0805 封装 | 4 | 0.02 | 0.08 | 电源旁路电容 |
| 15 | 电容 10uF | 0805 封装 | 2 | 0.05 | 0.10 | LDO 输入/输出滤波 |
| 16 | 电容 100uF | 电解 6.3V | 1 | 0.10 | 0.10 | WS2812B 电源滤波 |
| 17 | 晶振 8MHz | HC-49S 或 3225 封装 | 1 | 0.30 | 0.30 | STM32 外部时钟 |
| 18 | LDO 稳压器 | AMS1117-3.3 | 1 | 0.30 | 0.30 | 5V 转 3.3V |
| **小计 Subtotal** | | | | | **~2.0** | |

> 被动元件通常 10 个起卖（约 0.2 元/包），实际采购成本略高但总量很小。
> Passive components usually sold in packs of 10 (~0.2 CNY/pack).

### 三、PCB 制造 | PCB Manufacturing

| 编号 No. | 项目 Item | 规格 Specification | 数量 Qty | 价格 Price (CNY) | 采购渠道 Source |
|---|---|---|---|---|---|
| 19 | PCB 打样 | 双层板 80x80mm，1.6mm 厚，1oz 铜 | 5 片 | 5.0 | 嘉立创 jlc.com |

> 嘉立创新用户首单 5 片仅 5 元。运费约 8-15 元（取决于快递方式）。
> JLCPCB: 5 pcs for 5 CNY for new users. Shipping 8-15 CNY.

### 四、连接与结构件 | Connectors & Mechanical

| 编号 No. | 元件 Component | 型号 Specification | 数量 Qty | 价格 Price (CNY) | 说明 Notes |
|---|---|---|---|---|---|
| 20 | 键帽 | PBT 热升华 1U 键帽 | 16 颗 | 30.0 | 淘宝搜 "1U 键帽 套装" |
| 21 | 杜邦线 | 公对公 / 公对母 各 20 根 | 1 套 | 5.0 | 面包板调试用 |
| 22 | 面包板 | 830 孔 | 1 | 8.0 | Day 1-4 实验用 |
| 23 | 3D 打印外壳 | PLA 材质 FDM 打印 | 1 | 30.0 | 淘宝 3D 打印服务 |
| 24 | 旋钮帽 | 6mm 金属旋钮帽 | 1 | 2.0 | 配合 EC11 编码器 |
| **小计 Subtotal** | | | | **~75.0** | |

### 五、工具（教室共用或自备）| Tools (Shared/Self-prepared)

| 工具 Tool | 用途 Purpose | 是否必须 Required | 价格参考 Price |
|---|---|---|---|
| 烙铁 + 焊台 | 焊接元件 | 必须（教室提供） | — |
| 焊锡丝 | 0.8mm 含松香芯 | 必须（教室提供） | — |
| 万用表 | 测量电压/电流/通断 | 必须（教室提供） | — |
| 助焊剂 | 辅助焊接 | 建议 | ~5 元 |
| 吸锡带/吸锡器 | 去除多余焊锡 | 建议 | ~3 元 |
| 镊子 | 放置小元件 | 建议 | ~5 元 |

---

## 采购建议 | Purchasing Tips

### 一次性采购清单 (One-stop Shopping List)

**嘉立创商城** (https://www.szlcsc.com/)：
- 被动元件（电阻、电容、晶振）
- WS2812B、1N4148
- Type-C 母座
- EC11 编码器
- AMS1117-3.3

**嘉立创 PCB** (https://www.jlc.com/)：
- PCB 打样 5 片

**淘宝**：
- STM32F103C8T6 最小系统板
- 机械轴体（佳达隆/凯华）
- 热插拔轴座
- OLED 显示屏模块
- 键帽套装
- 3D 打印外壳
- 面包板 + 杜邦线

### 预计采购时间线 Timeline

| 时间 When | 采购内容 What | 说明 Notes |
|---|---|---|
| 开课前 1 周 | 面包板、杜邦线、STM32、被动元件 | Day 1-4 实验需要 |
| Day 6 后 | PCB 打样下单 | 约 3-5 天到货 |
| Day 6 后 | 3D 打印外壳下单 | 约 3-7 天到货 |
| Day 7 后 | 轴体、轴座、键帽、OLED、编码器 | Day 10 焊接需要 |

---

## 替代方案 | Alternative Parts

| 标准方案 Standard | 替代方案 Alternative | 价格差异 Price Diff | 说明 Notes |
|---|---|---|---|
| STM32F103C8T6 | ATmega32U4 | +15 元 | 内置 USB，QMK 原生支持更好 |
| STM32F103C8T6 | RP2040 (Raspberry Pi Pico) | +5 元 | Python 支持，社区活跃 |
| 佳达隆 Gateron | 凯华 Kailh | 相近 | 可选不同手感 |
| SSD1306 I2C | SSD1306 SPI | 相近 | SPI 速率更高但需要更多线 |
| 0805 封装 | 1206 封装 | 相近 | 更大更容易焊接 |

---

*最后更新 | Last updated: 2026-05-26*
