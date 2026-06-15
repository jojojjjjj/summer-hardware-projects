"use client"

/**
 * 价值主张 Section — 3 张价值卡片
 *
 * 设计参考: Linear.app（深色卡片）+ Apple.com（大留白）
 * 动效: Framer Motion whileInView + once: true — 来源: design-spec.md
 */
import { motion } from "framer-motion"
import { GraduationCap, Wrench, ClipboardList } from "lucide-react"

const values = [
  {
    icon: GraduationCap,
    titleZh: "大学课程标准",
    titleEn: "College-Level Rigor",
    color: "text-accent-primary",
    bgColor: "bg-accent-primary/10",
    points: [
      "知识难度达大学大二水平",
      "正式的项目提案与评分体系",
      "进度汇报 + 最终展示",
      "Git 工作流与代码提交规范",
    ],
  },
  {
    icon: Wrench,
    titleZh: "真实开源项目",
    titleEn: "Real Open-Source Projects",
    color: "text-accent-secondary",
    bgColor: "bg-accent-secondary/10",
    points: [
      "基于社区验证的开源项目改编",
      "有真实的论坛和社区支持",
      "硬件选型成本可控（≤¥500/套）",
      "在标准暑期时间内可完成 MVP",
    ],
  },
  {
    icon: ClipboardList,
    titleZh: "完整课程体系",
    titleEn: "Complete Curriculum",
    color: "text-success",
    bgColor: "bg-success/10",
    points: [
      "每日分步任务，从基础到进阶",
      "完整的代码框架与接线指南",
      "常见错误与调试指南",
      "每一步的「为什么」解释",
    ],
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
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function ValuePropsSection() {
  return (
    <section id="value-props" className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-responsive-section font-bold tracking-tighter">
            为什么选择我们的课程？
          </h2>
          <p className="mt-3 text-lg text-text-secondary">
            Why Choose Our Program?
          </p>
        </motion.div>

        {/* 3 张价值卡片 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {values.map((item) => (
            <motion.div
              key={item.titleZh}
              variants={cardVariants}
              className="card-glow group rounded-radius-xl border border-border bg-bg-secondary p-6 sm:p-8"
            >
              {/* 图标 */}
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-radius-lg ${item.bgColor}`}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>

              {/* 标题 */}
              <h3 className="mb-1 text-xl font-semibold tracking-tight">
                {item.titleZh}
              </h3>
              <p className="mb-5 text-sm text-text-tertiary">{item.titleEn}</p>

              {/* 要点列表 */}
              <ul className="space-y-3">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className={`mt-1 text-xs ${item.color}`}>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
