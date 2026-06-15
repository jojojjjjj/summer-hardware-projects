"use client"

/**
 * 项目详情页 — Apple 产品页风格
 *
 * 设计理念:
 * - 大号排版，Apple 式 eyebrow labels
 * - 更多留白
 * - 圆角 pill 替代方形 badge
 * - 更精致的卡片和表格
 */
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft, Clock, Coins, Cpu, ExternalLink, Github, Tv,
  Wrench, BookOpen, Layers, Code, Cog, Zap,
} from "lucide-react"
import { type Project } from "@/lib/projects-data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

const skillCategories = [
  { key: "hardware" as const, label: "硬件", icon: Cpu, color: "#3d8b5e" },
  { key: "software" as const, label: "软件", icon: Code, color: "#c9944a" },
  { key: "system" as const, label: "系统", icon: Layers, color: "#c9944a" },
  { key: "engineering" as const, label: "工程", icon: Cog, color: "#3d8b5e" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <main>
      <Navbar />

      {/* Hero — Apple 产品页风格 */}
      <section
        className="project-hero-gradient relative min-h-[55vh] sm:min-h-[65vh] pt-24 sm:pt-28 pb-16 sm:pb-20"
        style={{ "--project-color": `${project.colorHex}20` } as React.CSSProperties}
      >
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/#projects" className="mb-8 inline-flex items-center gap-2 text-[13px] text-text-secondary transition-colors hover:text-text-primary">
              <ArrowLeft size={14} /> 返回项目列表
            </Link>
          </motion.div>

          <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {/* Eyebrow */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: project.colorHex }} />
                <span className="text-xs font-semibold font-mono uppercase tracking-widest" style={{ color: project.colorHex }}>
                  Project {project.id}
                </span>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{project.titleZh}</h1>
                <p className="mt-2 text-lg sm:text-xl text-text-secondary font-mono">{project.titleEn}</p>
              </motion.div>

              <motion.p variants={fadeInUp} className="mt-5 text-[15px] sm:text-base text-text-secondary leading-relaxed">{project.description}</motion.p>

              <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-2">
                <span className={cn("rounded-full px-3 py-1 text-[12px] font-medium",
                  project.difficulty <= 2 ? "bg-success/15 text-success" :
                  project.difficulty === 3 ? "bg-warning/15 text-warning" :
                  project.difficulty === 4 ? "bg-accent-primary/15 text-accent-primary" : "bg-danger/15 text-danger"
                )}>{project.difficultyLabel}</span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/[0.12] px-3 py-1 text-[12px] text-text-secondary"><Clock size={12} /> {project.duration} {project.durationUnit}</span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/[0.12] px-3 py-1 text-[12px] text-text-secondary"><Coins size={12} /> {project.cost}</span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/[0.12] px-3 py-1 text-[12px] text-text-secondary"><Cpu size={12} /> {project.mcu}</span>
              </motion.div>
            </motion.div>

            {/* 右侧视觉区域 */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex items-center justify-center order-first md:order-last">
              <div className="aspect-video w-full max-w-lg rounded-2xl" style={{ background: `linear-gradient(135deg, ${project.colorHex}0a, ${project.colorHex}03)` }}>
                <div className="flex h-full flex-col items-center justify-center">
                  <span className="text-6xl sm:text-8xl font-mono font-bold opacity-[0.04]" style={{ color: project.colorHex }}>{project.titleEn}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 快速信息卡 — Apple specs 风格 */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 sm:mt-16 grid gap-3 grid-cols-2 lg:grid-cols-4">
            {[
              { label: "主控芯片", value: project.mcu, icon: Cpu },
              { label: "核心技术", value: project.coreTech, icon: Zap },
              { label: "课程天数", value: `${project.duration} ${project.durationUnit}`, icon: Clock },
              { label: "预估成本", value: project.cost, icon: Coins },
            ].map((card) => (
              <motion.div key={card.label} variants={fadeInUp} className="rounded-2xl border border-white/[0.10] bg-white/[0.03] p-4 sm:p-5">
                <div className="mb-2 flex items-center gap-1.5 text-text-tertiary">
                  <card.icon size={12} className="opacity-60" />
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest">{card.label}</span>
                </div>
                <p className="text-[13px] sm:text-sm font-medium text-text-primary">{card.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 技能 — Apple Feature Grid */}
      <section className="section-elevated py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <p className="eyebrow mb-4">技能</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">你能学到什么？</h2>
          </motion.div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat) => (
              <motion.div key={cat.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-white/[0.10] bg-white/[0.03] p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <cat.icon size={16} style={{ color: cat.color }} />
                  <h3 className="font-semibold text-[14px]">{cat.label}</h3>
                </div>
                <ul className="space-y-2.5">
                  {project.skills[cat.key].map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                      <span className="h-1 w-1 rounded-full opacity-60" style={{ backgroundColor: cat.color }} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 时间线 — Apple progression */}
      <section className="section-dark py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <p className="eyebrow mb-4">时间线</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">课程时间线</h2>
          </motion.div>
          <div className="mx-auto max-w-2xl space-y-5 sm:space-y-6">
            {project.timeline.map((phase, i) => (
              <motion.div key={phase.days} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-4 sm:gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-bold font-mono" style={{ backgroundColor: `${project.colorHex}12`, color: project.colorHex }}>{i + 1}</div>
                  {i < project.timeline.length - 1 && <div className="w-px flex-1 bg-white/[0.06]" />}
                </div>
                <div className="pb-6">
                  <div className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">{phase.days}</div>
                  <h4 className="mt-1 font-semibold text-[14px] sm:text-base">{phase.title}</h4>
                  <p className="mt-1 text-[13px] sm:text-sm text-text-secondary">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 硬件清单 */}
      <section className="section-elevated py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <p className="eyebrow mb-4">硬件</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">硬件清单</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="overflow-x-auto rounded-2xl border border-white/[0.10]">
            <table className="w-full text-[13px] sm:text-sm">
              <thead><tr className="border-b border-white/[0.10] bg-white/[0.03]"><th className="px-4 sm:px-6 py-3 text-left font-semibold text-text-tertiary text-[11px] uppercase tracking-wider">部件</th><th className="px-4 sm:px-6 py-3 text-left font-semibold text-text-tertiary text-[11px] uppercase tracking-wider">规格</th><th className="px-4 sm:px-6 py-3 text-right font-semibold text-text-tertiary text-[11px] uppercase tracking-wider">参考价格</th></tr></thead>
              <tbody>
                {project.hardware.map((item) => (
                  <tr key={item.name} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]">
                    <td className="px-4 sm:px-6 py-3 font-medium text-text-primary">{item.name}</td>
                    <td className="px-4 sm:px-6 py-3 text-text-secondary">{item.spec}</td>
                    <td className="px-4 sm:px-6 py-3 text-right font-mono text-text-secondary">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 开源资源 */}
      <section className="section-dark py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="eyebrow mb-4">开源</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">开源资源</h2>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
              {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]"><Github size={15} />GitHub</a>}
              {project.links.bilibili && <a href={project.links.bilibili} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]"><Tv size={15} />B站视频</a>}
              {project.links.oshwhub && <a href={project.links.oshwhub} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]"><ExternalLink size={15} />OSHWhub</a>}
              {project.links.gitee && <a href={project.links.gitee} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]"><ExternalLink size={15} />Gitee</a>}
              {project.links.other?.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]"><ExternalLink size={15} />{link.label}</a>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="#" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: project.colorHex, boxShadow: `0 4px 20px ${project.colorHex}20` }}><Wrench size={16} />开始学习</a>
              <Link href="/#projects" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 text-[15px] font-medium text-text-secondary transition-colors hover:text-accent-primary"><BookOpen size={16} />浏览其他项目</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
