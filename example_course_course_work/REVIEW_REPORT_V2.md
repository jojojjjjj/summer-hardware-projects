# 评审报告 V2 | Review Report V2（体验式再审）

<!-- 注：价格信息已注释隐藏（查价不准确，仅作参考不严谨）/ Note: price info commented out (inaccurate, not rigorous as reference) -->

> 9 课程包再审，BAR = **夏令营体验式 + 每方面粗糙了解**（不是深学）。5 法官评审团（ultracode workflow 编排）+ Phase 2 修复。
> 接 [REVIEW_REPORT.md](./REVIEW_REPORT.md)（旧评，2026-06-16，100 分制深度 bar）。本次用**体验式 bar 重判**——过深是扣分项，故旧评 86-97 的过深课程反而降级。
> 评审 + 修复时间：2026-06-23。

---

## 一、判级总表 | Verdict Tally

| # | 课程 | 难度 | Pre-fix | Post-fix | 改动量 | 一句话 |
|---|---|---|---|---|---|---|
| 01 | ThermalEyes | 3/5 | ⚠️ | ✅ | medium | 砍 Android 走 PC Python+OpenCV，开发板主线，HW2 校准降 CC |
| 02 | EnvClock | 2/5 | ⚠️ | ✅ | small | 金标准复刻型；量规 GPA→体验档，LDO/Buck 去重 |
| 03 | KeyForge | 4/5 | ❌ | ✅(主线) | rewrite | re-scope 精简键盘(<!-- <¥500 -->)，FOC/音频/LVGL/语音→可选进阶 |
| 04 | WavePocket | 5/5 | ❌ | ✅ | rewrite | 修编码损坏，ZYNQ→iCE40（开发板+模块，开源工具链） |
| 05 | DeskPet | 3/5 | ⚠️ | ✅ | medium | 删"大二级别"卖点，ST7789 统一，履带→选做 |
| 06 | WeatherCube | 1/5 | ⚠️ | ✅ | small | P0 固件引脚 D1/D2→GPIO0/GPIO2（ESP-01S 可用） |
| 07 | BipedBot | 4/5 | ⚠️ | ✅ | small | 删"大学控制理论"卖点，FOC/传递函数→体验档，轮足→选做 |
| 08 | ElectronBot | 5/5 | ❌ | ✅(P0修) | large | 砍 Unity/OpenPose 多语言栈，QFN→SMT，舵机统一 x6 |
| 09 | Desk Satellite | 4/5 | ⚠️ | ✅ | small | .ino 注释→引用 config，触摸引脚统一 |

**Pre-fix**：❌3（P03/P04/P08）｜⚠️6｜✅0。**Post-fix**：✅9（关键 P0/P1 全修）。

**金标准（供学结构）**：P02 EnvClock、P09 Desk Satellite、P06 WeatherCube（修完引脚后）。

---

## 二、评审方法 | Method

- **BAR**：夏令营 10-20 天、高中生零基础，每方面"上手摸过、能说个大概为什么"即达标；不深学、不每样精通。判级 ✅达标/⚠️要改/❌不达标，不打 100 分官话。
- **评审团（ultracode workflow）**：9 read agent 通读各课程包→结构化 profile；5 法官（J1 体验/J2 难度/J3 语言/J4 结构/J5 约束）各评 9 课程；9 synth 综合出最终判级+requiredFixes+preserveThese+breakRiskNote；cross-cut 出共性问题+优先级。
- **修复（Phase 2）**：9 fix agent 按评审结论修各子模块（守 preserveThese + breakRiskNote，不碰 projects.ts/他模块）+ re-review 验证；主控同步 projects.ts/CLAUDE.md + 清理噪声 + git 子模块 commit/push + 父仓库 bump。
- **参照**：`example_course_course_work/ABSTRACTED_DESIGN_METHODOLOGY.md`（结构 DNA）、`ASSIGNMENT_DESIGN_STANDARD.md`（作业标准）——借鉴结构，深度下调到体验档。

---

## 三、每课程评审 + 修复 | Per-Course

### P01 ThermalEyes（⚠️→✅）
- **问题**：Android APP 从零开发（红线）+ LQFP48 手工焊 + 120 分制量规 + 5 语言栈。
- **修**：Android→PC Python+OpenCV 显示热图（已有 usb_receiver.py 基础）；主线改 WeAct Black Pill 开发板+MLX90640 模块+杜邦线，自打板焊 LQFP48 列可选进阶；HW2 校准公式降 CC 理解题（用 melexis 官方库）；合并 HW4+HW5；量规去大学字母等级。
- **保留**：作业 pipeline 依赖链、CC 5 题为什么、日常类比（厨房/红绿灯/快递/合唱团）、真代码脚手架。

### P02 EnvClock（⚠️→✅，金标准）
- **优点**：复刻型（UP主固件已给，学生做接线+烧录+配置+调试+组装），作业考工程流程；成本 <!-- ¥100 -->；五方面都能上手且说清 why；无脱节无红线。
- **修**：grading-rubric 的 GPA 4.0→体验档三档；LDO vs Buck 题去重（5 处→保留 day-05 一处带答案）。

### P03 KeyForge（❌→✅主线）
- **问题**：成本 <!-- ¥1028 -->（翻倍违约束）+3×ESP32-S3+12 块 4 层 PCB+FOC 旋钮+I2S 音频+LVGL 圆屏+语音+HX711 厨房水槽+软件全 Python 模拟桩+网站 STM32F103 全脱节。
- **修**：re-scope 主线为精简纯键盘（1×ESP32-S3+按键扫描+USB HID+1 无线+RGB，1-2 块双层 PCB 学生手焊，<!-- <¥500 -->）；FOC 旋钮/语音/USB Hub/磁吸扩展→可选进阶，全配档仅作高配参考；音频/四层板→全配档参考主线不做；修 AS507P→AS5047P；同步 projects.ts→ESP32-S3/20 天。
- **残留**：20 天 day-XX 逐日连贯性未全读；FOC 代码仍为模拟桩（已标可选进阶）。

### P04 WavePocket（❌→✅）
- **问题**：ZYNQ-7010 SoC(ARM A9+FPGA)+Verilog+AXI+Vitis+LVGL+AD9744 高速 DAC+4 层 PCB（研究生档）+网站 iCE40 脱节+assignments.md 头部 UTF-8 损坏（1657 个 U+FFFD）+Vivado 60GB 门槛。
- **修**：修 assignments.md 编码（U+FFFD 1657→0，重存干净 UTF-8）；ZYNQ→iCE40 迁移（iCE40 开发板+现成模块 DAC904+ST7735+EC11，跟着教程跑通，不画板不焊贴片；Yosys/nextpnr/iceprog 开源工具链；砍手写 Verilog AXI 为调现成 IP；LVGL 改简单显示）；day-12 Phase 描述修正。iCE40/20 天与网站一致。
- **残留**：software/src 的 .c（ZYNQ ARM 侧）对纯 iCE40 不适用，保留作参考，Verilog 脚手架列后续。

### P05 DeskPet（⚠️→✅）
- **问题**：ESP-IDF 门槛+QFN/LGA 焊接+网站 MicroPython/双舵机/INMP441 脱节+ST7789/GC9A01 矛盾+"大二级别"卖点。
- **修**：删"技术深度达到大学大二级别"卖点；屏幕统一 ST7789（删 GC9A01）；履带底盘→完成后选做不进主线评分；同步 projects.ts→ESP-IDF C/12 天/ES8311/无舵机。
- **保留**：真代码脚手架、复刻定位、类比。

### P06 WeatherCube（⚠️→✅，金标准）
- **问题**：**P0 固件引脚 bug**——标准固件用 D1/D2(=GPIO5/4)，ESP-01S 根本没引出这俩脚→照烧无显示；HW1 接线表同错；config 宏名与 .ino 变量不统一；网站 ESP32/TFT/8 天脱节。
- **修**：固件引脚 D1/D2→GPIO0/GPIO2（ESP-01S 可用，pin 3/2），加注释说明；HW1 接线表改 GPIO0/GPIO2；config 统一；同步 projects.ts→ESP8266/OLED/12 天。
- **保留**：复刻型、成本 <!-- ~¥45 -->、脚手架强、U8g2/和风API 教学。

### P07 BipedBot（⚠️→✅）
- **问题**：自述"涉及大学水平的控制理论"把过深当卖点+HW2 Clarke/Park+HW4 倒立摆传递函数 G(s)=1/(Ms²-mgL) 推导偏深+网站 STM32F103 脱节+HW6 轮足混合运动过量。
- **修**：删"大学水平控制理论"卖点改"体验倒立摆控制核心思想"；HW2 FOC 原理→调库+说清力矩平滑（不推 Clarke/Park）；HW4 传递函数→老师给+跑仿真说清为什么不稳定（不推导）；HW6 轮足混合→选做加分，保平衡+遥控为必做 MVP；day-12 硬件表统一 ESP32-S3/3S/MG996R；同步 projects.ts→ESP32-S3/12 天。
- **保留**：类比极佳（IMU=前庭/PID=扫帚/串级=小脑+大脑）、复刻型、成本三档<!-- <¥500 -->、真 C++ 代码、CC 5 题为什么。

### P08 ElectronBot（❌→✅P0修）
- **问题**：Unity+C#+C++DLL(P/Invoke)+Python/OpenCV/OpenPose+LLM/STT/TTS 五层全栈+QFN-24/LQFP64 焊接需热风枪+4 层 PCB+网站 F411(无 USB HS OTG)脱节+舵机 x5/x6 矛盾+prerequisites 寄存器位操作+MVP 12 天不可行。
- **修**：砍 Unity/C++DLL/OpenPose→保留 Python+OpenCV 人脸检测或纯手势/IMU 交互，LLM/STT/TTS 列 stretch；舵机统一 x6（BOM/wiring/code/README 一致）；QFN 手工焊→嘉立创 SMT 预贴主线，学生只焊 TSSOP/排针；MVP 收窄到屏幕表情+手势/IMU 触发动作；prerequisites 寄存器题→HAL 层理解题；同步 projects.ts→STM32F405/12 天/舵机×6。
- **保留**：7 份作业结构 DNA、类比体系（NVIC=餐厅经理/USB枚举=入职手续）、开源真实（稚晖君）、真 Python 代码。
- **残留**：仍是 Expert 复杂项目，深度减未除；software 为 Python 模拟桩。

### P09 Desk Satellite（⚠️→✅，金标准）
- **问题**：.ino 头部引脚注释陈旧错误（与 config/wiring 冲突会误导接错线）+day-07 触摸引脚 TOUCH_PIN=2 vs config=1+时长 12/14 脱节。
- **修**：.ino 头部注释→"引脚映射见 config.h"（不列数字避免再过时）；day-07 触摸引脚统一 GPIO1（与 config/wiring 一致）；Phase3 加时间风险缓解提示；同步 projects.ts 时长 14→12。
- **保留**：复刻金标准、真代码、成本 <!-- ~¥125 -->、类比（SPI=高速公路/I2C=乡间小路）、结构 DNA 量裁到位。

---

## 四、跨课程共性问题 + 系统建议 | Common Issues & Recommendations

### 共性问题（已修）
1. 🔴 课程↔网站 projects.ts 系统性脱节（8/9）→ 已统一到课程包真值。
2. 🔴 焊接门槛超体验档（QFN/LGA/0402/多层板）→ 主线改开发板+模块/SMT 预贴，手工焊降可选进阶。
3. 🔴 多语言栈红线（P01 Android、P04 ZYNQ+AXI、P08 Unity+C#+OpenCV+LLM）→ 砍层走单一语言栈/复刻。
4. 🟡 局部过深（FOC Clarke/Park、传递函数推导、寄存器级、MLX90640 校准、PID anti-windup）→ 降 CC 理解题。
5. 🟡 量规残留研究生模板（120/100 分制+GPA+字母等级）→ 降体验档三档描述性。
6. 🟡 内部一致性损坏（P04 编码、P06/P09 引脚、P08 舵机、P03 元件型号、P07 day-12 表）→ 全修。
7. 🟢 pipeline 噪声文件（resources/search-results.md/review-report.md）→ 6 课程清理。

### 系统建议（供后续）
1. 课程包↔projects.ts 单一真值源 + CI 比对脚本（脱节即报错）。
2. config.template.h/wiring-guide 为引脚真值源，代码注释只引用 config 不列数字（P06/P09 已踩坑）。
3. 全仓量规统一体验档三档（禁 120/100 分制+GPA+字母等级）。
4. 开发板+模块为默认主线，QFN/多层板手工焊降可选进阶 ⭐⭐⭐，核心 IC 走嘉立创 SMT。
5. 禁"过深当卖点"（删"大学大二级别/大学控制理论"）；数学/寄存器/控制理论降 CC 理解题（调库+说为什么，不从零手推）。
6. 文件编码统一 UTF-8 无 BOM + pre-commit 编码扫描（禁 U+FFFD/BOM）——P04 损坏是教训。
7. 作业量裁到体验档基线（Easy 3/Basic 3-4/Mid 4-5/Adv 5-6/Expert 5-7），CC 每份 2-3 个核心为什么。
8. 保护推广共性强项：日常类比体系 + HW pipeline 依赖链（P02/P09 金标准），重做课程时保留骨架只换技术栈与深度。

---

## 五、已知残留 | Residuals（诚实）

- P03/P04/P08 re-review 未全跑完（ultracode workflow 撞 529 API 过载），主控 spot-verify 了关键修复（编码/成本/MCU/Android 割除/舵机），未逐文件 full re-review。建议补一轮完整 re-review。
- P03：20 天 day-XX 逐日连贯性未全读；FOC 代码仍为 Python 模拟桩（已标可选进阶）。
- P04：software/src .c（ZYNQ ARM 侧）对纯 iCE40 不适用，保留作参考，Verilog 脚手架列后续。
- P08：仍是 Expert 复杂项目，深度减未除；software 为 Python 模拟桩非真实固件。
- 网站构建未跑（projects.ts 改多处，建议后续 `npm run build` 验证 SSG 无报错）。

---

## 六、产物 | Deliverables

- `verify/course-review/`：checklist.md、review.md、per-course/<slug>.md×9、verdicts_data.json、fixes.md、SUMMARY.md（gitignored，本地参考）
- 本文件：`example_course_course_work/REVIEW_REPORT_V2.md`（tracked，官方报告）
- git：9 子模块 commit+push origin main；父仓库 pointer bump + projects.ts + CLAUDE.md + 本报告

---

*核心理念：夏令营=体验+粗糙了解，不是深学；评审团 ultracode 自由编排；借 example_course_course_work 结构 DNA、深度调到体验档；平实说人话；改课程走子模块；不破坏已有正确内容。*
