"use client"

/**
 * 价值主张 Section — Apple Feature Grid 风格
 *
 * 设计理念:
 * - 不再用 3 张等高卡片，而是 Apple 式的大号 feature 展示
 * - 每个 feature 有 eyebrow label + 大标题 + 要点
 * - 更大的图标、更多的留白
 * - 2 列交替布局（左文右空 / 右文左空）
 */
import { motion } from "framer-motion"
import { GraduationCap, Wrench, ClipboardList } from "lucide-react"

const values = [
  {
    icon: GraduationCap,
    eyebrow: "课程标准",
    title: "大学级课程体系",
    description: "知识深度对标大学大二水平，配备正式的项目提案、评分体系与 Git 工作流规范。",
    points: [
      "正式项目提案与评分体系",
      "周进度汇报 + 最终展示",
      "Git 工作流与代码提交规范",
    ],
    accent: "#c9944a",
  },
  {
    icon: Wrench,
    eyebrow: "真实项目",
    title: "基于开源硬件改编",
    description: "每个项目都源自社区验证的开源项目，有真实论坛支持和可控的硬件成本。",
    points: [
      "社区验证的开源项目改编",
      "硬件选型成本 ≤¥500/套",
      "标准暑期时间内可完成 MVP",
    ],
    accent: "#3d8b5e",
  },
  {
    icon: ClipboardList,
    eyebrow: "课程体系",
    title: "完整的学习脚手架",
    description: "每日分步任务、完整代码框架与接线指南，每一步都解释「为什么」。",
    points: [
      "每日分步任务，从基础到进阶",
      "完整的代码框架与接线指南",
      "常见错误与调试指南",
    ],
    accent: "#c9944a",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export function ValuePropsSection() {
  return (
    <section id="value-props" className="section-elevated py-24 md:py-36 lg:py-44">
      <div className="mx-auto max-w-5xl px-6">
        {/* Apple 式 eyebrow + 大标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <p className="eyebrow mb-4">为什么选择我们</p>
          <h2 className="text-responsive-section font-bold tracking-tight text-text-primary">
            不只是夏令营，
            <br />
            是真正的工程训练
          </h2>
        </motion.div>

        {/* Features — Apple 式大卡片 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          {values.map((item) => (
            <motion.div
              key={item.eyebrow}
              variants={cardVariants}
              className="card-glow rounded-2xl border border-white/[0.10] bg-white/[0.03] p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-start md:gap-10">
                {/* 图标 — 更大更明显 */}
                <div
                  className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl md:mb-0"
                  style={{ backgroundColor: `${item.accent}18` }}
                >
                  <item.icon className="h-7 w-7" style={{ color: item.accent }} />
                </div>

                {/* 内容 */}
                <div className="flex-1">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                    {item.eyebrow}
                  </p>
                  <h3 className="mb-3 text-xl md:text-2xl font-semibold tracking-tight text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mb-5 text-[15px] text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="space-y-2.5">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[15px] text-text-secondary"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.accent }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
