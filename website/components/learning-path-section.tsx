"use client"

/**
 * 学习路径 Section — 电路走线风格
 *
 * 去掉了:
 * - 双语标签 (入门 Beginner 等)
 * - 图标方块
 *
 * 保留:
 * - 5 阶段路径
 * - 关联项目
 * - 技能标签
 */
import { motion } from "framer-motion"

const pathStages = [
  {
    level: "入门",
    color: "text-success",
    dotColor: "bg-success",
    borderColor: "border-success/20",
    projects: ["P06 天气魔方"],
    description: "零基础入门，掌握嵌入式开发基础",
    skills: ["Arduino IDE", "C 语言", "WiFi 联网", "I2C/SPI"],
  },
  {
    level: "基础",
    color: "text-accent-secondary",
    dotColor: "bg-accent-secondary",
    borderColor: "border-accent-secondary/20",
    projects: ["P02 环境感知监测站"],
    description: "构建完整 IoT 系统，理解数据流",
    skills: ["MicroPython", "MQTT", "Web 仪表盘", "传感器"],
  },
  {
    level: "中等",
    color: "text-accent-primary",
    dotColor: "bg-accent-primary",
    borderColor: "border-accent-primary/20",
    projects: ["P01 热成像仪", "P05 桌宠机器人"],
    description: "多模块系统开发，引入 AI 能力",
    skills: ["ESP-IDF", "OpenCV", "LLM API", "LVGL"],
  },
  {
    level: "进阶",
    color: "text-accent-primary",
    dotColor: "bg-accent-primary",
    borderColor: "border-accent-primary/20",
    projects: ["P03 机械键盘", "P09 卫星气象站"],
    description: "复杂 PCB 设计，多 MCU 协作",
    skills: ["FOC 控制", "四层 PCB", "USB HID", "电源管理"],
  },
  {
    level: "高级",
    color: "text-danger",
    dotColor: "bg-danger",
    borderColor: "border-danger/20",
    projects: ["P04 信号发生器", "P07 轮足机器人", "P08 ElectronBot"],
    description: "全栈项目，从 FPGA 到 Unity 上位机",
    skills: ["FPGA/Verilog", "PID", "Unity/C#", "OpenPose"],
  },
]

export function LearningPathSection() {
  return (
    <section id="learning-path" className="relative py-16 md:py-24 lg:py-32">
      <div className="section-divider mb-16 md:mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-responsive-section font-bold tracking-tighter">
            学习路径
          </h2>
          <p className="mt-2 text-sm text-text-tertiary">
            从入门到高级，循序渐进
          </p>
        </motion.div>

        {/* 路径图 — 水平走线 */}
        <div className="relative">
          {/* 连接线 — PCB 走线风格 */}
          <div className="absolute left-0 right-0 top-3 hidden h-px lg:block"
               style={{ background: 'linear-gradient(to right, #3d8b5e40, #c9944a60, #e85d3a40)' }} />

          <div className="grid gap-4 lg:grid-cols-5">
            {pathStages.map((stage, i) => (
              <motion.div
                key={stage.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                {/* 节点圆点 */}
                <div className="absolute left-1/2 top-0 z-10 hidden h-2.5 w-2.5 -translate-x-1/2 lg:block">
                  <div className={`h-full w-full rounded-full ${stage.dotColor} opacity-60`} />
                </div>

                {/* 卡片 */}
                <div className="mt-6 lg:mt-8">
                  <div className={`rounded-radius-lg border ${stage.borderColor} bg-bg-secondary p-4 sm:p-5`}>
                    {/* 阶段标题 — 色点 + 文字，无英文 */}
                    <div className="mb-3 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${stage.dotColor}`} />
                      <span className={`text-sm font-bold font-mono ${stage.color}`}>
                        {stage.level}
                      </span>
                    </div>

                    {/* 描述 */}
                    <p className="mb-3 text-xs sm:text-sm text-text-secondary">
                      {stage.description}
                    </p>

                    {/* 对应项目 */}
                    <div className="mb-2 space-y-0.5">
                      {stage.projects.map((p) => (
                        <div key={p} className="text-xs font-medium text-text-primary font-mono">
                          {p}
                        </div>
                      ))}
                    </div>

                    {/* 关键技能 */}
                    <div className="flex flex-wrap gap-1">
                      {stage.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-sm px-1.5 py-0.5 text-[10px] font-mono bg-bg-tertiary text-text-tertiary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
