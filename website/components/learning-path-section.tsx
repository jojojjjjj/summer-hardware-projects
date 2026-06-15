"use client"

/**
 * 学习路径 Section — Apple 横向芯片代际风格
 *
 * 设计理念:
 * - 横向 5 列卡片布局（桌面），垂直堆叠（移动）
 * - 大号步骤编号 + 色环
 * - 卡片顶部有色条标记难度
 * - 连接线在卡片顶部，水平走向
 * - 卡片高度对齐，形成对比
 */
import { motion } from "framer-motion"

const pathStages = [
  {
    level: "入门",
    days: "Day 1–4",
    color: "#3d8b5e",
    projects: ["P06 天气魔方"],
    description: "零基础入门，掌握嵌入式开发基础",
    skills: ["Arduino IDE", "C 语言", "WiFi 联网", "I2C/SPI"],
  },
  {
    level: "基础",
    days: "Day 5–8",
    color: "#5aad7a",
    projects: ["P02 环境感知监测站"],
    description: "构建完整 IoT 系统，理解数据流",
    skills: ["MicroPython", "MQTT", "Web 仪表盘", "传感器"],
  },
  {
    level: "中等",
    days: "Day 9–12",
    color: "#c9944a",
    projects: ["P01 热成像仪", "P05 桌宠机器人"],
    description: "多模块系统开发，引入 AI 能力",
    skills: ["ESP-IDF", "OpenCV", "LLM API", "LVGL"],
  },
  {
    level: "进阶",
    days: "Day 13–16",
    color: "#d4845a",
    projects: ["P03 机械键盘", "P09 卫星气象站"],
    description: "复杂 PCB 设计，多 MCU 协作",
    skills: ["FOC 控制", "四层 PCB", "USB HID", "电源管理"],
  },
  {
    level: "高级",
    days: "Day 17–20",
    color: "#e85d3a",
    projects: ["P04 信号发生器", "P07 轮足机器人", "P08 ElectronBot"],
    description: "全栈项目，从 FPGA 到 Unity 上位机",
    skills: ["FPGA/Verilog", "PID", "Unity/C#", "OpenPose"],
  },
]

export function LearningPathSection() {
  return (
    <section id="learning-path" className="section-elevated py-24 md:py-36 lg:py-44">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple 式 eyebrow + 大标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <p className="eyebrow mb-4">学习路径</p>
          <h2 className="text-responsive-section font-bold tracking-tight text-text-primary">
            循序渐进，
            <br />
            从焊接到系统
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] text-text-secondary">
            5 个难度梯度，每个阶段都对应可完成的项目
          </p>
        </motion.div>

        {/* 横向阶段卡片 — 桌面端 */}
        <div className="hidden lg:block">
          {/* 顶部连接线 + 步骤点 */}
          <div className="relative mb-10">
            <div
              className="absolute top-4 left-[10%] right-[10%] h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, #3d8b5e, #5aad7a, #c9944a, #d4845a, #e85d3a)",
              }}
            />
            <div className="relative grid grid-cols-5 gap-4">
              {pathStages.map((stage, i) => (
                <motion.div
                  key={stage.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex justify-center"
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold font-mono"
                    style={{
                      backgroundColor: stage.color,
                      color: "#0a0a0b",
                      boxShadow: `0 0 0 4px #111113, 0 0 0 5px ${stage.color}40`,
                    }}
                  >
                    {i + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 卡片网格 */}
          <div className="grid grid-cols-5 gap-4">
            {pathStages.map((stage, i) => (
              <motion.div
                key={stage.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                className="card-glow rounded-2xl border border-white/[0.10] bg-white/[0.03] overflow-hidden"
              >
                {/* 顶部色条 */}
                <div
                  className="h-1"
                  style={{ backgroundColor: stage.color }}
                />

                <div className="p-5">
                  {/* 阶段名 */}
                  <div className="mb-1 flex items-center justify-between">
                    <span
                      className="text-[13px] font-bold font-mono"
                      style={{ color: stage.color }}
                    >
                      {stage.level}
                    </span>
                    <span className="text-[10px] font-mono text-text-tertiary">
                      {stage.days}
                    </span>
                  </div>

                  {/* 描述 */}
                  <p className="mb-4 text-[13px] text-text-secondary leading-relaxed min-h-[3em]">
                    {stage.description}
                  </p>

                  {/* 对应项目 */}
                  <div className="mb-3 space-y-1">
                    {stage.projects.map((p) => (
                      <div
                        key={p}
                        className="text-[12px] font-medium text-text-primary"
                      >
                        {p}
                      </div>
                    ))}
                  </div>

                  {/* 关键技能 */}
                  <div className="flex flex-wrap gap-1">
                    {stage.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full px-1.5 py-0.5 text-[10px] font-medium bg-white/[0.06] text-text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 移动端 — 水平滚动 */}
        <div className="lg:hidden">
          <div className="overflow-x-auto -mx-6 px-6 pb-4">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {pathStages.map((stage, i) => (
                <motion.div
                  key={stage.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="w-64 shrink-0 rounded-2xl border border-white/[0.10] bg-white/[0.03] overflow-hidden"
                >
                  <div
                    className="h-1"
                    style={{ backgroundColor: stage.color }}
                  />
                  <div className="p-5">
                    <div className="mb-1 flex items-center justify-between">
                      <span
                        className="text-[13px] font-bold font-mono"
                        style={{ color: stage.color }}
                      >
                        {stage.level}
                      </span>
                      <span className="text-[10px] font-mono text-text-tertiary">
                        {stage.days}
                      </span>
                    </div>
                    <p className="mb-4 text-[13px] text-text-secondary leading-relaxed">
                      {stage.description}
                    </p>
                    <div className="mb-3 space-y-1">
                      {stage.projects.map((p) => (
                        <div
                          key={p}
                          className="text-[12px] font-medium text-text-primary"
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {stage.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full px-1.5 py-0.5 text-[10px] font-medium bg-white/[0.06] text-text-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
