"use client"

/**
 * 价值主张 Section — 3 张卡片
 *
 * 去掉了:
 * - 英文副标题 (College-Level Rigor 等)
 * - ✓ 对勾符号 → 用 PCB 焊点 (·) 代替
 *
 * 保留:
 * - 三栏布局
 * - 核心卖点
 */
import { motion } from "framer-motion"
import { GraduationCap, Wrench, ClipboardList } from "lucide-react"

const values = [
  {
    icon: GraduationCap,
    title: "大学课程标准",
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
    title: "真实开源项目",
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
    title: "完整课程体系",
    color: "text-accent-primary",
    bgColor: "bg-accent-primary/10",
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
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function ValuePropsSection() {
  return (
    <section id="value-props" className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* 标题 — 单语 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-responsive-section font-bold tracking-tighter">
            为什么选择我们？
          </h2>
        </motion.div>

        {/* 3 张卡片 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 md:grid-cols-3"
        >
          {values.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="card-glow rounded-radius-xl border border-border bg-bg-secondary p-6 sm:p-8"
            >
              {/* 图标 */}
              <div
                className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-radius-md ${item.bgColor}`}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>

              {/* 标题 — 无英文副标题 */}
              <h3 className="mb-4 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>

              {/* 要点列表 — PCB 焊点风格 */}
              <ul className="space-y-2.5">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${item.bgColor}`} />
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
