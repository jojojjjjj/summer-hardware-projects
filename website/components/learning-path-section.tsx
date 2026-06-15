"use client"

/**
 * 学习路径 Section — 可视化路径图
 *
 * 设计参考: Brilliant.org（学习路径可视化）+ Coursera（课程进度）
 * 功能: 展示项目之间的关联和进阶关系
 */
import { motion } from "framer-motion"
import { ArrowRight, Flame, Zap, Trophy, Star } from "lucide-react"

/** 学习路径阶段 */
const pathStages = [
  {
    level: "入门",
    levelEn: "Beginner",
    icon: Flame,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    projects: ["P06 天气魔方"],
    description: "零基础入门，掌握嵌入式开发基础",
    skills: ["Arduino IDE", "C 语言基础", "WiFi 联网", "I2C/SPI 通信"],
  },
  {
    level: "基础",
    levelEn: "Basic",
    icon: Star,
    color: "text-accent-secondary",
    bgColor: "bg-accent-secondary/10",
    borderColor: "border-accent-secondary/30",
    projects: ["P02 环境感知监测站"],
    description: "构建完整 IoT 系统，理解数据流",
    skills: ["MicroPython", "MQTT 协议", "Web 仪表盘", "传感器整合"],
  },
  {
    level: "中等",
    levelEn: "Intermediate",
    icon: Zap,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    projects: ["P01 热成像仪", "P05 桌宠机器人"],
    description: "多模块系统开发，引入 AI 能力",
    skills: ["ESP-IDF", "OpenCV", "LLM API", "LVGL GUI"],
  },
  {
    level: "进阶",
    levelEn: "Advanced",
    icon: Trophy,
    color: "text-accent-primary",
    bgColor: "bg-accent-primary/10",
    borderColor: "border-accent-primary/30",
    projects: ["P03 机械键盘", "P09 卫星气象站"],
    description: "复杂 PCB 设计，多 MCU 协作",
    skills: ["FOC 电机控制", "四层 PCB", "USB HID", "电源管理"],
  },
  {
    level: "高级",
    levelEn: "Expert",
    icon: Flame,
    color: "text-danger",
    bgColor: "bg-danger/10",
    borderColor: "border-danger/30",
    projects: ["P04 信号发生器", "P07 轮足机器人", "P08 ElectronBot"],
    description: "全栈项目，从 FPGA 到 Unity 上位机",
    skills: ["FPGA/Verilog", "PID 控制", "Unity/C#", "OpenPose"],
  },
]

export function LearningPathSection() {
  return (
    <section id="learning-path" className="relative py-16 md:py-24 lg:py-32">
      {/* 分隔线 */}
      <div className="section-divider mb-16 md:mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-responsive-section font-bold tracking-tighter">
            学习路径
          </h2>
          <p className="mt-3 text-lg text-text-secondary">
            从入门到高级，循序渐进的进阶之路
            <br />
            <span className="text-text-tertiary">
              A Progressive Learning Journey
            </span>
          </p>
        </motion.div>

        {/* 路径图 — 水平时间线 */}
        <div className="relative">
          {/* 连接线 — 桌面端水平线 */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-success via-warning to-danger lg:block" />

          <div className="grid gap-6 lg:grid-cols-5">
            {pathStages.map((stage, i) => (
              <motion.div
                key={stage.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* 节点圆点 — 桌面端 */}
                <div className="absolute left-1/2 top-8 z-10 hidden h-4 w-4 -translate-x-1/2 lg:block">
                  <div
                    className={`h-full w-full rounded-full ${stage.bgColor} border-2 ${stage.borderColor}`}
                  />
                </div>

                {/* 卡片内容 */}
                <div className="mt-12 lg:mt-16">
                  <div
                    className={`rounded-radius-xl border ${stage.borderColor} bg-bg-secondary p-5`}
                  >
                    {/* 阶段标题 */}
                    <div className="mb-3 flex items-center gap-2">
                      <div
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-radius-md ${stage.bgColor}`}
                      >
                        <stage.icon className={`h-4 w-4 ${stage.color}`} />
                      </div>
                      <div>
                        <span className={`text-sm font-bold ${stage.color}`}>
                          {stage.level}
                        </span>
                        <span className="ml-1 text-xs text-text-tertiary">
                          {stage.levelEn}
                        </span>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="mb-3 text-sm text-text-secondary">
                      {stage.description}
                    </p>

                    {/* 对应项目 */}
                    <div className="mb-3 space-y-1">
                      {stage.projects.map((p) => (
                        <div
                          key={p}
                          className="text-xs font-medium text-text-primary"
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
                          className="rounded px-1.5 py-0.5 text-xs bg-bg-tertiary text-text-tertiary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 箭头 — 移动端 */}
                {i < pathStages.length - 1 && (
                  <div className="flex justify-center py-2 lg:hidden">
                    <ArrowRight
                      size={16}
                      className="rotate-90 text-text-tertiary"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
