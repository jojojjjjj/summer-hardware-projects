# 物料清单 | Bill of Materials (BOM)

本项目基于 StackForce 双足轮机器人开源套件。以下列出标准版（预算 ~300 CNY）和拓展版物料。

> This project is based on the StackForce bipedal wheeled robot open-source kit. Below are the standard version (~300 CNY budget) and extension version materials.

---

## 标准版物料 | Standard Version BOM

| 序号 | 物料名称 | 型号/规格 | 数量 | 单价 (CNY) | 小计 |
|------|---------|----------|------|-----------|------|
| 1 | ESP32-S3 开发板 | ESP32-S3-DevKitC-1（或兼容板） | 1 | 35 | 35 |
| 2 | 无刷直流电机 (BLDC) | 2808 规格，带编码器 | 2 | 45 | 90 |
| 3 | 双 BLDC 5A 电机驱动板 | StackForce Dual BLDC Driver 5A | 1 | 59 | 59 |
| 4 | MPU6050 六轴 IMU 模块 | MPU-6050 GY-521 模块，I2C 接口 | 1 | 8 | 8 |
| 5 | PCA9685 舵机驱动板 | 16 路 PWM 驱动，I2C 接口 | 1 | 12 | 12 |
| 6 | 舵机（总线/模拟） | MG996R 或 DS3218（20kg） | 4 | 15 | 60 |
| 7 | 3D 打印结构件 | PLA 材质，框架+大腿+小臂+轮毂+盖板（共 ~30 件） | 1 套 | 50 | 50 |
| 8 | 3S 锂电池 | 11.1V 1500mAh 25C（带 XT60 插头） | 1 | 45 | 45 |
| 9 | 电源开关 | 带线拨动开关（额定 >5A） | 1 | 2 | 2 |
| 10 | 杜邦线（母对母） | 20cm，多种颜色 | 1 包 (40根) | 5 | 5 |
| 11 | 杜邦线（公对母） | 20cm | 1 包 (40根) | 5 | 5 |
| 12 | 螺丝包 | M2/M3 不锈钢螺丝+螺母套装（含 M2x8、M3x8、M3x12） | 1 | 8 | 8 |
| 13 | 尼龙柱/铜柱 | M3x20+M3x10 铜柱 | 1 包 | 5 | 5 |
| 14 | 热缩管 | 2mm / 3mm / 5mm 混合 | 1 套 | 5 | 5 |
| 15 | USB 数据线 | Type-C（ESP32-S3 烧录用） | 1 | 5 | 5 |
| 16 | 电池扎带 | 3x200mm 尼龙扎带 | 1 包 | 3 | 3 |
| **总合计** | | | | | **402** |

> 注意：标准版总计约 400 CNY。若自行打印 3D 结构件（学校/社区 3D 打印机），可省去 50 元打印费，总成本降至 ~350 CNY。
>
> Note: The standard version totals approximately 400 CNY. If you self-print the 3D structural parts (using a school/community 3D printer), you can save the 50 CNY printing fee, bringing the total to ~350 CNY.

### 降低成本方案 | Cost Reduction Options

| 序号 | 替代方案 | 节省 |
|------|---------|------|
| 1 | 使用通用 ESP32 开发板代替 ESP32-S3（注意引脚差异） | -15 CNY |
| 2 | 2808 电机选用无编码器版本（失去闭环控制能力） | -30 CNY (x2) |
| 3 | 3D 打印件自行打印 | -50 CNY |
| 4 | 使用 2S 锂电池代替 3S（需确认驱动板支持范围） | -15 CNY |
| **最低成本** | | **~292 CNY** |

---

## 拓展版物料 | Extension Version BOM

在标准版基础上增加/升级以下组件：

| 序号 | 物料名称 | 型号/规格 | 数量 | 单价 (CNY) | 小计 |
|------|---------|----------|------|-----------|------|
| 17 | 升级电池 | 3S 11.1V 2200mAh 30C（更长续航） | 1 | 65 | 65 |
| 18 | 升级电机 | 2808 高扭矩版（带磁编码器 AS5600） | 2 | 65 | 130 |
| 19 | 专业 3D 打印 | PETG/ABS 材质，工业级打印精度 | 1 套 | 120 | 120 |
| 20 | SBUS 遥控器+接收机 | 飞航 / 富斯 i6S 或同等级 | 1 | 180 | 180 |
| 21 | 电压显示器 | 小型 LED 电压表（监测电池） | 1 | 8 | 8 |
| 22 | 减震脚垫 | 硅胶脚垫（保护底盘） | 4 | 2 | 8 |
| **拓展总合计** | | | | | **~813 CNY** |

> 注意：拓展版含遥控器总费用较高。遥控器为可选配件，也可用手机蓝牙/WiFi 控制。
>
> Note: The extension version includes a radio controller which raises the total cost significantly. The RC controller is optional -- you can also use Bluetooth/WiFi control from a phone.

---

## 工具清单 | Tools Needed

| 工具 | 用途 | 是否必需 |
|------|------|---------|
| 电脑 (Windows/Mac/Linux) | 写代码、烧录固件 | 必需 |
| USB Type-C 数据线 | 连接 ESP32-S3 到电脑 | 必需 |
| 十字螺丝刀 (PH1/PH0) | 组装螺丝 | 必需 |
| 内六角扳手套装 (1.5-5mm) | 组装电机和结构件 | 必需 |
| 烙铁 + 焊锡 | 焊接电机线、电源线 | 推荐 |
| 万用表 | 检查电路、测量电压 | 推荐 |
| 剥线钳 | 处理电源线 | 推荐 |
| 3D 打印机 (FDM) | 打印结构件 | 可选（可用代打印服务） |
| 热风枪 | 热缩管收缩 | 可选（可用打火机代替） |
| 游标卡尺 | 测量零件尺寸 | 可选 |
| 螺丝胶 (Loctite) | 防止电机振动松螺丝 | 可选 |
| 尖嘴钳 | 夹持小零件 | 推荐 |

---

## 采购渠道 | Where to Buy

### 淘宝关键词搜索推荐 | Taobao Search Keywords

| 物料 | 搜索关键词 |
|------|-----------|
| ESP32-S3 开发板 | "ESP32-S3-DevKitC 开发板" |
| 2808 BLDC 电机 | "2808 无刷电机 编码器" 或 "2808 BLDC 编码器" |
| StackForce 电机驱动板 | "StackForce BLDC 驱动板 5A" 或 "StackForce 双无刷驱动" |
| MPU6050 模块 | "MPU6050 GY-521 模块" |
| PCA9685 舵机驱动 | "PCA9685 16路舵机驱动 I2C" |
| MG996R 舵机 | "MG996R 舵机 20kg" 或 "DS3218 数字舵机" |
| 3S 锂电池 | "3S 11.1V 1500mAh 锂电池 XT60" |
| 杜邦线 | "杜邦线 母对母 20cm 40根" |
| M2/M3 螺丝包 | "M2 M3 不锈钢螺丝螺母套装" |
| 3D 打印服务 | "3D打印代打 PLA"（将 STL 文件发给商家打印） |

### 店铺推荐 | Recommended Stores

| 店铺 | 主营 | 备注 |
|------|------|------|
| **StackForce 官方** (Gitee/淘宝) | BLDC 驱动板、电机、整套配件 | 官方开源项目，QQ 群 223211857 |
| 亚博智能 | ESP32 开发板、传感器模块 | 品质稳定，教学资源丰富 |
| 创客工坊 | 一站式创客配件 | 杜邦线、螺丝、工具齐全 |
| 深圳市聚优信电子 | 电机、驱动板 | BLDC 电机种类多 |
| 嘉立创 | 3D 打印服务、PCB 打样 | 可上传 STL 文件代打印 |

### StackForce 官方渠道 | StackForce Official Channels

- 官网 Website: http://stackforce.cc/#/
- 仓库 Repository: https://gitee.com/StackForce/bipedal_wheeled_robot
- 技术交流QQ群 QQ Group: 223211857
- B站视频教程 Bilibili Video Course: 搜索 "StackForce 轮足机器人"

> 提示：淘宝购买时建议在同一家店铺购买多件商品以节省运费。3D 打印件可使用仓库 `模型/` 目录下的 STL 文件自行打印或找代打服务。
>
> Tip: Buy multiple items from the same Taobao store to save on shipping. For 3D printed parts, use the STL files in the repository `模型/` directory to self-print or order from a 3D printing service.
