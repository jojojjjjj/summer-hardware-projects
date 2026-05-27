# Day 04: 机械组装与舵机标定 | Mechanical Assembly & Servo Calibration

> **今日目标:**
> - 完成所有3D打印零件的检查与修整
> - 完成轴承安装和齿轮组装
> - 完成手臂和头部机械结构组装
> - 安装所有舵机并进行I2C地址分配
> - 完成舵机零位标定和PID参数初始调校
> - 首次上电测试，所有舵机响应I2C命令
>
> **产出:** ElectronBot机械组装完成，所有舵机正常响应控制命令，记录每个舵机的零位角度

---

## 时间安排 | Schedule

| 时间 | 活动类型 | 内容 |
|------|----------|------|
| 09:00 - 09:15 | 晨间活动 | 焊接板复查、3D打印件清点 |
| 09:15 - 10:30 | 知识讲解 | 机械结构设计原理、舵机工作原理、PID控制基础 |
| 10:30 - 10:45 | 课间休息 | |
| 10:45 - 12:00 | 动手实践 | 3D零件修整、轴承安装、齿轮组装 |
| 12:00 - 13:30 | 午餐休息 | |
| 13:30 - 15:00 | 项目实战 | 舵机安装、I2C地址配置、舵机标定 |
| 15:00 - 15:15 | 课间休息 | |
| 15:15 - 16:30 | 拓展练习 | PID参数调校、首次上电测试、基础动作验证 |
| 16:30 - 17:00 | 总结分享 | 组装成果展示、阶段总结 |

---

## 上午: 机械结构与组装 | Morning: Mechanical Structure & Assembly

### 为什么要学这个? | Why Learn This?

ElectronBot是一个有6个自由度（6-DOF）的小型桌面机器人。机械结构决定了它的运动范围、精度和可靠性。3D打印零件的精度、轴承的安装质量、齿轮的啮合间隙——这些都会直接影响机器人的表现。组装机械结构就像搭积木，但需要更高的精度和耐心。

ElectronBot is a 6-DOF (Degree of Freedom) small desktop robot. The mechanical structure determines its range of motion, precision, and reliability. 3D-printed part accuracy, bearing installation quality, and gear mesh clearance all directly affect the robot's performance. Assembling mechanical structures is like building with blocks, but requires greater precision and patience.

舵机（Servo）是连接电子世界和物理世界的桥梁。每个舵机驱动板内置电位器反馈和PID控制器，能精确控制关节角度。理解舵机标定和PID调参是让机器人"听话"的关键。

Servos are the bridge between the electronic world and the physical world. Each servo driver board has built-in potentiometer feedback and a PID controller for precise joint angle control. Understanding servo calibration and PID tuning is key to making the robot "obey."

### 任务4.1: 3D打印零件检查与修整 (30分钟)

**零件检查清单:**

```
3D打印零件检查要点:

1. 尺寸检查:
   ├── 用卡尺测量关键尺寸（孔径、间距）
   ├── 与设计尺寸对比（允许误差±0.2mm）
   ├── 螺丝孔是否贯通且直径正确
   └── 舵机安装座是否与舵机尺寸匹配

2. 外观检查:
   ├── 无明显层纹分离（层间结合不牢）
   ├── 无翘曲变形（特别是大平面零件）
   ├── 无缺失部分（悬空区域可能打印不完整）
   └── 无多余支撑残留

3. 配合检查:
   ├── 头部外壳上/下半能否贴合
   ├── 轴承能否压入轴承座
   ├── 齿轮能否与舵机输出轴配合
   └── 螺丝能否穿过螺丝孔
```

**常见修整操作:**

```
修整技巧:

1. 去除支撑:
   - 用斜口钳小心剪除支撑结构
   - 用美工刀修整支撑残留面
   - 用砂纸（240目）打磨粗糙表面

2. 扩孔（螺丝孔太小）:
   - 用对应尺寸的钻头手动旋转扩孔
   - 不要用电钻（3D打印件容易被钻头勾住旋转伤手）
   - 或者用丝锥攻丝（如果要拧入螺丝直接固定）

3. 修整配合面:
   - 两个零件配合太紧: 用砂纸打磨接触面
   - 两个零件配合太松: 垫薄纸片或用热熔胶辅助固定

4. 清理螺纹:
   - 如果螺丝孔需要螺纹:
     用对应规格的丝锥攻出内螺纹
   - 如果螺丝孔是通孔:
     确保螺丝能完全穿过，配合螺母使用
```

### 任务4.2: 轴承安装与齿轮组装 (30分钟)

**ElectronBot关节结构:**

```
ElectronBot 关节结构示意:

头部关节 (2-DOF: 左右摇头 + 上下点头):
┌──────────────┐
│   头部外壳    │
│  ┌────────┐  │
│  │GC9A01  │  │  ← 屏幕固定在头部外壳内
│  │圆形屏幕│  │
│  └────────┘  │
└──────┬───────┘
       │ 舵机2 (点头)  ← 通过齿轮/连杆驱动
    ┌──┴──┐
    │轴承  │ ← 减少摩擦，支持头部左右旋转
    └──┬──┘
       │ 舵机1 (摇头)  ← 直接驱动或齿轮驱动
    ┌──┴──┐
    │ 底座 │
    └──────┘

手臂关节 (2-DOF × 2: 肩关节 + 肘关节):
┌──────┐
│ 躯干  │
└──┬───┘
   │ 舵机3/4 (左/右肩关节)
┌──┴───┐
│ 上臂  │
└──┬───┘
   │ 舵机5/6 (左/右肘关节)
┌──┴───┐
│ 前臂  │
└──────┘

底座关节 (2-DOF: 左右转动 + 前后倾斜):
舵机0 安装在底座，控制整个身体的左右转动
```

**轴承安装步骤:**

```
微型轴承安装（型号: MR63ZZ 或类似, 3×6×2mm）:

1. 检查轴承:
   - 用手旋转内圈，确认转动顺畅
   - 检查无异常响声（如沙沙声表示有异物）

2. 压入轴承座:
   - 将轴承对准3D打印件的轴承座孔
   - 用拇指均匀施力压入（应该有一定阻力但不需要工具）
   - 如果太紧: 用砂纸稍微扩大轴承座孔
   - 如果太松: 在轴承外圈涂少量AB胶后压入

3. 安装后的检查:
   - 轴承外圈固定不动
   - 轴承内圈能自由旋转
   - 轴承没有歪斜（与安装面垂直）
```

**齿轮组装要点:**

```
舵机齿轮安装:

1. 舵机输出轴类型:
   - 标准舵机: 25T花键（25个齿）
   - 确认你的3D打印齿轮内孔匹配此花键

2. 安装齿轮/摇臂:
   - 将齿轮对准舵机输出轴
   - 轻轻按压到位（花键配合）
   - 用舵机自带的螺丝从顶部固定

3. 齿轮啮合检查:
   - 如果是齿轮传动（而非直接驱动）:
     - 两齿轮之间的啮合间隙应约0.1-0.2mm
     - 太紧: 转动阻力大，舵机发热，磨损快
     - 太松: 有回程间隙，运动不精确
     - 用手转动应该感觉顺滑但有轻微阻力
```

### 任务4.3: 手臂与头部结构组装 (30分钟)

**组装顺序: 从内到外，从底到顶**

Assembly order: inside to outside, bottom to top.

```
ElectronBot组装顺序:

步骤1: 安装底座舵机 (舵机0)
  ├── 将舵机0放入底座舵机安装座
  ├── 用M2螺丝固定（4颗）
  ├── 舵机线从底座预留线槽穿过
  └── 安装底座到身体的连接件

步骤2: 组装躯干框架
  ├── 安装身体内部PCB固定柱
  ├── 将主控板放入（暂不固定螺丝，方便后续接线）
  └── 安装身体的框架结构

步骤3: 安装肩部舵机 (舵机3, 4)
  ├── 左右各一个舵机
  ├── 舵机输出轴朝上
  ├── 用M2螺丝固定在躯干框架的肩部位置
  └── 连接上臂连杆

步骤4: 安装肘部舵机 (舵机5, 6)
  ├── 安装在上臂内部
  ├── 舵机输出轴朝侧面
  └── 连接前臂连杆

步骤5: 安装颈部舵机 (舵机1, 2)
  ├── 舵机1: 左右摇头（安装底板下方或颈部）
  ├── 舵机2: 上下点头（安装颈部或头部底座）
  └── 安装轴承减少摩擦

步骤6: 安装头部
  ├── GC9A01屏幕安装到头部外壳
  ├── 屏幕FPC排线穿过颈部
  ├── 头部外壳上/下两半合拢
  └── 连接到颈部舵机

步骤7: 线缆管理
  ├── 所有舵机线沿躯干内部走线
  ├── 用扎带或热缩管整理线束
  ├── 确保线缆不会干扰关节运动
  └── 预留足够的线缆长度（关节运动时不被拉扯）

重要: 每完成一步就检查该关节是否能自由运动
```

**机械组装常见问题:**

| 问题 | 原因 | 解决方法 |
|------|------|----------|
| 关节转动卡顿 | 零件配合太紧 | 砂纸打磨接触面，加少量润滑脂 |
| 关节晃动间隙大 | 零件配合太松 | 加垫片或薄纸，或用热熔胶填充 |
| 舵机线太短 | 走线路径不合理 | 重新规划走线，使用延长线 |
| 屏幕装不进外壳 | 打印件尺寸偏大 | 打磨外壳内壁或屏幕支架 |
| 舵机输出轴与齿轮打滑 | 花键未完全啮合 | 确认完全压入，拧紧顶部螺丝 |
| 关节转动范围不够 | 机械限位干涉 | 检查3D打印件是否有干涉，打磨去除 |

---

## 下午: 舵机安装与标定 | Afternoon: Servo Installation & Calibration

### 任务4.4: 舵机安装与I2C地址分配 (30分钟)

**ElectronBot的6个舵机I2C地址分配:**

```
I2C总线上的舵机地址映射:

I2C Bus (SDA=PB9, SCL=PB8, 400kHz Fast Mode)
    │
    ├── 舵机0 (底座旋转)  → I2C地址: 0x40
    ├── 舵机1 (头部左右)  → I2C地址: 0x41
    ├── 舵机2 (头部上下)  → I2C地址: 0x42
    ├── 舵机3 (左肩关节)  → I2C地址: 0x43
    ├── 舵机4 (右肩关节)  → I2C地址: 0x44
    └── 舵机5 (左手肘/其他) → I2C地址: 0x45

地址设置方法（取决于舵机驱动板设计）:
  方法1: 板上电阻分压（不同阻值对应不同地址）
  方法2: 板上跳线（焊盘短接选择地址位）
  方法3: 首次编程时写入Flash（软件配置）

每个舵机驱动板在出厂/烧录前必须确认其I2C地址
```

**舵机安装步骤:**

```
舵机安装要点:

1. 舵机归零（上电前）:
   - 在安装舵机到机械结构之前
   - 先给舵机驱动板供电和I2C连接
   - 发送命令让舵机转到"零位"（通常是90度或0度）
   - 然后再安装摇臂/齿轮到舵机输出轴
   - 这样确保机械零位和电气零位一致

2. 舵机固定:
   - 用M2自攻螺丝固定舵机到安装座
   - 螺丝不要拧太紧（塑料件会裂）
   - 舵机线朝向线槽方向

3. 连杆安装:
   - 舵机输出轴安装摇臂或齿轮
   - 连杆连接摇臂到下一个关节
   - 确保在零位时，连杆和关节处于正确位置

4. 接线:
   - 舵机驱动板的I2C线并联连接
   - 供电线从主控板分发（注意电流）
   - 所有舵机驱动板的GND必须连通
```

### 任务4.5: I2C扫描与舵机通信测试 (30分钟)

**步骤:**

1. **I2C总线扫描代码**

   在STM32CubeIDE中创建I2C扫描程序，用于检测总线上所有设备：

   ```c
   /* i2c_scan.c -- I2C总线扫描工具 */

   #include "main.h"

   extern I2C_HandleTypeDef hi2c1;

   void I2C_Scan(void)
   {
       printf("\r\n=== I2C Bus Scan ===\r\n");

       uint8_t found = 0;

       /* 扫描地址范围: 0x08 ~ 0x77 (标准7位地址) */
       for (uint8_t addr = 0x08; addr < 0x78; addr++)
       {
           /* 尝试与该地址的设备通信 */
           HAL_StatusTypeDef result;
           result = HAL_I2C_IsDeviceReady(&hi2c1,
                                           addr << 1,  /* 左移1位(8位地址格式) */
                                           3,           /* 尝试3次 */
                                           10);         /* 超时10ms */

           if (result == HAL_OK)
           {
               printf("  Device found at 0x%02X", addr);

               /* 识别已知的舵机地址 */
               switch (addr)
               {
                   case 0x40: printf(" -> Servo 0 (Base)");    break;
                   case 0x41: printf(" -> Servo 1 (Head H)");  break;
                   case 0x42: printf(" -> Servo 2 (Head V)");  break;
                   case 0x43: printf(" -> Servo 3 (L Shoulder)"); break;
                   case 0x44: printf(" -> Servo 4 (R Shoulder)"); break;
                   case 0x45: printf(" -> Servo 5 (L Elbow)");  break;
                   default:   printf(" -> Unknown device");     break;
               }
               printf("\r\n");
               found++;
           }
       }

       printf("Total devices found: %d\r\n", found);

       if (found < 6)
       {
           printf("WARNING: Expected 6 servos, found %d!\r\n", found);
           printf("Check I2C wiring and servo driver power.\r\n");
       }
       else
       {
           printf("All 6 servos detected. Ready!\r\n");
       }
   }
   ```

2. **在main函数中调用I2C扫描**

   ```c
   /* 在main.c中 */
   extern void I2C_Scan(void);

   int main(void)
   {
       HAL_Init();
       SystemClock_Config();

       MX_GPIO_Init();
       MX_USART1_UART_Init();
       MX_I2C1_Init();

       printf("\r\n=== ElectronBot Servo Test ===\r\n");

       /* 扫描I2C总线 */
       I2C_Scan();

       while (1)
       {
           HAL_Delay(1000);
       }
   }
   ```

3. **编译烧录并查看输出**
   ```
   预期串口输出:

   === I2C Bus Scan ===
     Device found at 0x40 -> Servo 0 (Base)
     Device found at 0x41 -> Servo 1 (Head H)
     Device found at 0x42 -> Servo 2 (Head V)
     Device found at 0x43 -> Servo 3 (L Shoulder)
     Device found at 0x44 -> Servo 4 (R Shoulder)
     Device found at 0x45 -> Servo 5 (L Elbow)
   Total devices found: 6
   All 6 servos detected. Ready!
   ```

**预期结果:**
- I2C扫描找到6个设备，地址0x40~0x45
- 如果少于6个，检查对应舵机的接线和供电
- 如果多于6个，可能有地址冲突

**常见问题:**
- **一个设备都没找到**: I2C接线错误（SDA/SCL接反或未接），上拉电阻缺失
- **只找到部分舵机**: 检查未检测到的舵机供电和I2C连线
- **地址不对**: 舵机驱动板的地址配置可能有误，检查地址设置电阻/跳线
- **I2C总线Busy**: SDA或SCL被拉低（某个设备出错），断电重启所有设备

### 任务4.6: 舵机标定——零位角度记录 (30分钟)

**为什么要标定?**
每个舵机安装到机械结构后，"零位"（机械中位）对应的电气角度各不相同。标定就是找出每个舵机的机械零位对应的ADC值（电位器读数）或PWM值，作为后续PID控制的参考基准。

Each servo, after mechanical installation, has a different electrical angle for its "zero position" (mechanical center). Calibration finds the ADC value (potentiometer reading) or PWM value corresponding to each servo's mechanical zero, serving as the reference for PID control.

**标定代码:**

```c
/* servo_calibrate.c -- 舵机零位标定工具 */

#include "main.h"

extern I2C_HandleTypeDef hi2c1;

/* 舵机I2C地址表 */
const uint8_t servo_addr[6] = {0x40, 0x41, 0x42, 0x43, 0x44, 0x45};
const char* servo_name[6] = {
    "Base", "Head-H", "Head-V",
    "L-Shoulder", "R-Shoulder", "L-Elbow"
};

/* 标定结果存储 */
typedef struct {
    uint16_t adc_zero;     /* 零位ADC值 (电位器读数) */
    int16_t angle_offset;  /* 角度偏移 (度) */
    uint16_t adc_min;      /* 最小ADC值 (机械限位) */
    uint16_t adc_max;      /* 最大ADC值 (机械限位) */
} ServoCalib_t;

ServoCalib_t calib_data[6];

/* 发送目标角度到指定舵机 */
HAL_StatusTypeDef Servo_SetAngle(uint8_t servo_index, float angle_deg)
{
    if (servo_index >= 6) return HAL_ERROR;

    /* 将角度打包为I2C数据帧 */
    /* 协议: [命令字节, 角度高字节, 角度低字节] */
    /* 角度单位: 0.01度 (例如 9000 = 90.00度) */
    int32_t angle_raw = (int32_t)(angle_deg * 100);

    uint8_t data[3];
    data[0] = 0x01;  /* 命令: 设置目标角度 */
    data[1] = (angle_raw >> 8) & 0xFF;  /* 高字节 */
    data[2] = angle_raw & 0xFF;         /* 低字节 */

    return HAL_I2C_Master_Transmit(&hi2c1,
                                    servo_addr[servo_index] << 1,
                                    data, 3, 100);
}

/* 读取舵机当前ADC值（电位器反馈） */
HAL_StatusTypeDef Servo_ReadADC(uint8_t servo_index, uint16_t *adc_value)
{
    if (servo_index >= 6) return HAL_ERROR;

    uint8_t data[2];
    data[0] = 0x10;  /* 命令: 读取ADC值 */

    HAL_StatusTypeDef status;
    status = HAL_I2C_Master_Transmit(&hi2c1,
                                      servo_addr[servo_index] << 1,
                                      data, 1, 100);
    if (status != HAL_OK) return status;

    status = HAL_I2C_Master_Receive(&hi2c1,
                                     servo_addr[servo_index] << 1,
                                     data, 2, 100);
    if (status != HAL_OK) return status;

    *adc_value = (data[0] << 8) | data[1];
    return HAL_OK;
}

/* 标定流程 */
void Servo_CalibrateAll(void)
{
    printf("\r\n=== Servo Calibration ===\r\n");
    printf("Instructions:\r\n");
    printf("  1. Each servo will be moved to its center position\r\n");
    printf("  2. Verify the joint is at the correct mechanical zero\r\n");
    printf("  3. Record the ADC value as the zero-point reference\r\n\r\n");

    for (int i = 0; i < 6; i++)
    {
        printf("Calibrating Servo %d (%s) at 0x%02X...\r\n",
               i, servo_name[i], servo_addr[i]);

        /* 发送90度命令（假设90度为中位） */
        Servo_SetAngle(i, 90.0f);
        HAL_Delay(1000);  /* 等待舵机到达目标位置 */

        /* 读取当前位置反馈 */
        uint16_t adc_val = 0;
        if (Servo_ReadADC(i, &adc_val) == HAL_OK)
        {
            calib_data[i].adc_zero = adc_val;
            printf("  Current ADC: %u (recorded as zero)\r\n", adc_val);
        }
        else
        {
            printf("  ERROR: Cannot read ADC from servo %d\r\n", i);
        }

        printf("  -> Visually confirm: Is the joint at center? (y/n)\r\n\r\n");
        HAL_Delay(500);
    }

    /* 打印标定结果汇总 */
    printf("\r\n=== Calibration Summary ===\r\n");
    printf("Servo  | Address | Name        | ADC Zero\r\n");
    printf("-------|---------|-------------|----------\r\n");
    for (int i = 0; i < 6; i++)
    {
        printf("  %d    | 0x%02X   | %-11s | %u\r\n",
               i, servo_addr[i], servo_name[i],
               calib_data[i].adc_zero);
    }
    printf("\r\n");
}
```

**手动标定操作:**

```
标定步骤（逐个舵机进行）:

1. 给单个舵机发送90度命令
   （大多数舵机的中位是90度，范围0-180度）

2. 观察该关节的机械位置:
   - 如果关节正处于机械中位: 完美！记录当前ADC值
   - 如果关节偏了一侧: 需要调整

3. 调整方法:
   方法A: 拆下摇臂，重新以正确角度装回
   方法B: 在软件中记录偏移量，后续运行时补偿

4. 逐个测试6个舵机:
   ├── 舵机0 (底座): 中位 = 正前方
   ├── 舵机1 (头左右): 中位 = 头部朝正前方
   ├── 舵机2 (头上下): 中位 = 头部水平
   ├── 舵机3 (左肩): 中位 = 手臂自然下垂
   ├── 舵机4 (右肩): 中位 = 手臂自然下垂
   └── 舵机5 (左肘): 中位 = 前臂伸直

5. 记录每个舵机的零位ADC值和角度偏移量
```

### 任务4.7: PID参数初始调校 (20分钟)

**PID控制基础:**

```
PID控制器原理:

         设定点(目标角度)
              │
              ▼
    ┌──────────────────────┐
    │  误差 = 设定点 - 反馈  │ (误差计算)
    │                      │
    │  P = Kp × 误差        │ (比例: 误差越大, 输出越大)
    │  I = Ki × ∑误差       │ (积分: 消除稳态误差)
    │  D = Kd × Δ误差/Δt    │ (微分: 抑制超调和振荡)
    │                      │
    │  输出 = P + I + D     │
    └──────────┬───────────┘
               │
               ▼
          PWM输出到舵机
               │
               ▼
          舵机转动
               │
               ▼
       电位器读取当前位置 ──→ 反馈回控制器

PID参数含义:
  Kp (比例增益): 越大响应越快，但太大会振荡
  Ki (积分增益): 消除稳态误差，但太大会导致超调
  Kd (微分增益): 抑制振荡，但太大会对噪声敏感

初始参数建议:
  Kp = 2.0   (先设一个较小的值)
  Ki = 0.1   (积分项从小开始)
  Kd = 0.5   (微分项帮助阻尼)
```

**PID调参口诀:**
1. 先只调P：逐渐增大Kp直到系统开始振荡，然后减小到振荡消失
2. 加入I：逐渐增大Ki直到消除稳态误差（舵机能精确到达目标位置）
3. 加入D：逐渐增大Kd直到响应平滑无超调

**首次上电测试:**

```c
/* 测试代码: 依次驱动每个舵机 */

void Servo_TestSequence(void)
{
    printf("\r\n=== Servo Test Sequence ===\r\n");

    /* 测试1: 逐个舵机转动到90度 */
    printf("Test 1: Each servo to 90 degrees\r\n");
    for (int i = 0; i < 6; i++)
    {
        printf("  Moving servo %d (%s) to 90 deg...\r\n",
               i, servo_name[i]);
        Servo_SetAngle(i, 90.0f);
        HAL_Delay(1500);
    }

    /* 测试2: 头部左右转动 */
    printf("Test 2: Head pan left-right\r\n");
    for (int angle = 60; angle <= 120; angle += 5)
    {
        Servo_SetAngle(1, (float)angle);  /* 舵机1 = 头左右 */
        HAL_Delay(200);
    }
    Servo_SetAngle(1, 90.0f);  /* 回中 */

    /* 测试3: 手臂挥动 */
    printf("Test 3: Arm wave\r\n");
    for (int wave = 0; wave < 3; wave++)
    {
        Servo_SetAngle(3, 60.0f);   /* 左肩抬起 */
        HAL_Delay(500);
        Servo_SetAngle(3, 120.0f);  /* 左肩放下 */
        HAL_Delay(500);
    }
    Servo_SetAngle(3, 90.0f);  /* 回中 */

    /* 测试4: 全部回零位 */
    printf("Test 4: All servos to zero position\r\n");
    for (int i = 0; i < 6; i++)
    {
        Servo_SetAngle(i, 90.0f);
    }

    printf("Test sequence complete!\r\n");
}
```

**上电测试检查清单:**

```
首次上电测试检查:

供电检查:
[ ] 主控板3.3V正常
[ ] 舵机供电5V正常
[ ] 总电流在合理范围 (<2A空载)

I2C通信检查:
[ ] I2C扫描找到全部6个舵机
[ ] 每个舵机能正确响应读命令

运动测试:
[ ] 舵机0 (底座): 能左右转动
[ ] 舵机1 (头部左右): 能左右摇头
[ ] 舵机2 (头部上下): 能上下点头
[ ] 舵机3 (左肩): 能抬起放下
[ ] 舵机4 (右肩): 能抬起放下
[ ] 舵机5 (左肘): 能弯曲伸直

标定记录:
[ ] 记录每个舵机的零位ADC值
[ ] 记录每个舵机的角度偏移量
[ ] 记录每个关节的机械限位范围

异常检查:
[ ] 无异常噪音（齿轮干涉、轴承卡顿）
[ ] 无过热（舵机驱动板不应烫手）
[ ] 线缆无拉扯（关节全范围运动时）
```

---

## 今日作业 | Homework

### 必做题
1. 完成ElectronBot全部机械组装
2. I2C扫描确认6个舵机全部在线（地址0x40~0x45）
3. 逐个测试6个舵机，确认每个都能响应角度命令
4. 填写舵机标定记录表:

   ```
   舵机标定记录表:
   ┌───────┬─────────┬──────────┬─────────┬──────────┐
   │ 舵机  │ I2C地址 │ 零位ADC  │ 角度偏移│ 运动范围 │
   ├───────┼─────────┼──────────┼─────────┼──────────┤
   │ 底座  │  0x40   │          │         │   ~      │
   │ 头左右│  0x41   │          │         │   ~      │
   │ 头上下│  0x42   │          │         │   ~      │
   │ 左肩  │  0x43   │          │         │   ~      │
   │ 右肩  │  0x44   │          │         │   ~      │
   │ 左肘  │  0x45   │          │         │   ~      │
   └───────┴─────────┴──────────┴─────────┴──────────┘
   ```

### 挑战题
1. 编写一个测试程序，让ElectronBot执行一个简单的"挥手"动作序列
2. 尝试手动调PID参数，使舵机响应更快且无超调（记录调参前后的对比）
3. 用串口命令控制单个舵机角度（实现一个简单的串口交互式控制器）

### 思考题
1. ElectronBot的6个自由度分别控制什么动作？如果要增加一个自由度（比如腰部弯曲），需要修改哪些设计？
2. PID控制中的"积分饱和"（Integral Windup）是什么？在舵机控制中如何避免？
3. 为什么舵机用I2C总线而不是PWM信号直接控制？对比I2C总线舵机和传统PWM舵机的优缺点。

---

## 明日预告 | Tomorrow's Preview

恭喜！硬件阶段完成！明天开始进入固件开发的核心阶段。我们将深入学习STM32 HAL库编程，开发USB CDC设备实现与PC的高速通信，并驱动GC9A01圆形屏幕显示你的第一个表情图案。准备好让ElectronBot拥有"面孔"！

Congratulations! The hardware phase is complete! Tomorrow we begin the core firmware development phase. We'll dive into STM32 HAL library programming, develop a USB CDC device for high-speed PC communication, and drive the GC9A01 round display to show your first facial expression. Get ready to give ElectronBot a "face"!

---

## 参考资源 | References

- [舵机控制与PID原理（B站搜索）](https://search.bilibili.com/all?keyword=PID%E8%88%B5%E6%9C%BA%E6%8E%A7%E5%88%B6)
- [I2C通信协议详解](https://search.bilibili.com/all?keyword=I2C%E9%80%9A%E4%BF%A1%E5%8D%8F%E8%AE%AE%E8%AF%A6%E8%A7%A3)
- [STM32 HAL库 I2C使用指南](https://www.st.com/resource/en/user_manual/um1725-description-of-stm32f4-hal-and-lowlayer-drivers-stmicroelectronics.pdf)
- [PID控制器调参指南](https://search.bilibili.com/all?keyword=PID%E8%B0%83%E5%8F%82%E6%95%99%E7%A8%8B)
- [3D打印件后处理与组装](https://search.bilibili.com/all?keyword=3D%E6%89%93%E5%8D%B0%20%E5%90%8E%E5%A4%84%E7%90%86%20%E7%BB%84%E8%A3%85)
- [ElectronBot 开源仓库](https://github.com/peng-zhihui/ElectronBot)
- [机器人运动学入门](https://search.bilibili.com/all?keyword=%E6%9C%BA%E5%99%A8%E4%BA%BA%E8%BF%90%E5%8A%A8%E5%AD%A6%20%E5%85%A5%E9%97%A8)

*最后更新：2026-05-27*
