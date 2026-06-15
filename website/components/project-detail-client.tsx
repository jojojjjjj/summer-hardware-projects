"use client"

/**
 * 项目详情页 — 客户端展示组件
 *
 * 由服务端 page.tsx 通过 generateStaticParams 预生成 9 个静态页面
 * 本组件负责所有 Framer Motion 动画和交互逻辑
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
  { key: "hardware" as const, label: "硬件", labelEn: "Hardware", icon: Cpu, color: "text-accent-secondary" },
  { key: "software" as const, label: "软件", labelEn: "Software", icon: Code, color: "text-accent-primary" },
  { key: "system" as const, label: "系统", labelEn: "System", icon: Layers, color: "text-warning" },
  { key: "engineering" as const, label: "工程", labelEn: "Engineering", icon: Cog, color: "text-success" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section
        className="project-hero-gradient relative min-h-[50vh] sm:min-h-[60vh] pt-20 sm:pt-24 pb-12 sm:pb-16"
        style={{ "--project-color": `${project.colorHex}20` } as React.CSSProperties}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/#projects" className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary">
              <ArrowLeft size={16} /> 返回项目列表
            </Link>
          </motion.div>

          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeInUp}>
                <span className="text-sm font-mono font-bold" style={{ color: project.colorHex }}>P{project.id}</span>
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tighter md:text-5xl">{project.titleZh}</h1>
                <p className="mt-1 text-lg sm:text-xl text-text-secondary">{project.titleEn}</p>
              </motion.div>
              <motion.p variants={fadeInUp} className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">{project.description}</motion.p>
              <motion.div variants={fadeInUp} className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                <span className={cn("rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium",
                  project.difficulty <= 2 ? "bg-success/20 text-success" :
                  project.difficulty === 3 ? "bg-warning/20 text-warning" :
                  project.difficulty === 4 ? "bg-accent-primary/20 text-accent-primary" : "bg-danger/20 text-danger"
                )}>{"⭐".repeat(project.difficulty)} {project.difficultyLabel}</span>
                <span className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-border px-2 sm:px-3 py-1 text-xs sm:text-sm text-text-secondary"><Clock size={14} /> {project.duration} {project.durationUnit}</span>
                <span className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-border px-2 sm:px-3 py-1 text-xs sm:text-sm text-text-secondary"><Coins size={14} /> {project.cost}</span>
                <span className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-border px-2 sm:px-3 py-1 text-xs sm:text-sm text-text-secondary"><Cpu size={14} /> {project.mcu}</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center justify-center order-first md:order-last">
              <div className="aspect-video w-full max-w-lg rounded-radius-xl" style={{ background: `linear-gradient(135deg, ${project.colorHex}20, ${project.colorHex}05)` }}>
                <div className="flex h-full flex-col items-center justify-center">
                  <span className="text-5xl sm:text-8xl font-extrabold opacity-10" style={{ color: project.colorHex }}>P{project.id}</span>
                  <span className="mt-2 text-base sm:text-lg font-medium opacity-30" style={{ color: project.colorHex }}>{project.titleEn}</span>
                  <span className="mt-1 text-xs text-text-tertiary">项目图片占位 — Project Image Placeholder</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 sm:mt-12 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "主控芯片", value: project.mcu, icon: Cpu },
              { label: "核心技术", value: project.coreTech, icon: Zap },
              { label: "课程天数", value: `${project.duration} ${project.durationUnit}`, icon: Clock },
              { label: "预估成本", value: project.cost, icon: Coins },
            ].map((card) => (
              <motion.div key={card.label} variants={fadeInUp} className="rounded-radius-xl border border-border bg-bg-secondary p-3 sm:p-5">
                <div className="mb-2 flex items-center gap-1.5 sm:gap-2 text-text-tertiary"><card.icon size={14} className="sm:w-4 sm:h-4" /><span className="text-[10px] sm:text-xs uppercase tracking-wider">{card.label}</span></div>
                <p className="text-xs sm:text-sm font-medium">{card.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 技能 */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">你能学到什么？</h2>
            <p className="mt-2 text-text-secondary">What Will You Learn?</p>
          </motion.div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat) => (
              <motion.div key={cat.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-radius-xl border border-border bg-bg-secondary p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex items-center gap-2"><cat.icon className={cat.color} size={18} /><h3 className="font-semibold text-sm sm:text-base">{cat.label}<span className="ml-1 text-xs sm:text-sm text-text-tertiary">{cat.labelEn}</span></h3></div>
                <ul className="space-y-2">
                  {project.skills[cat.key].map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-text-secondary"><span className={`text-xs ${cat.color}`}>▸</span>{skill}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 时间线 */}
      <section className="py-14 sm:py-20 bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">课程时间线</h2>
            <p className="mt-2 text-text-secondary">Course Timeline</p>
          </motion.div>
          <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
            {project.timeline.map((phase, i) => (
              <motion.div key={phase.days} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: `${project.colorHex}20`, color: project.colorHex }}>{i + 1}</div>
                  {i < project.timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-6">
                  <div className="text-xs font-mono text-text-tertiary">{phase.days}</div>
                  <h4 className="mt-1 font-semibold text-sm sm:text-base">{phase.title}<span className="ml-2 text-xs sm:text-sm text-text-tertiary">{phase.titleEn}</span></h4>
                  <p className="mt-1 text-sm text-text-secondary">{phase.description}</p>
                  <p className="text-xs text-text-tertiary">{phase.descriptionEn}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 硬件清单 */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">硬件清单</h2>
            <p className="mt-2 text-text-secondary">Hardware Bill of Materials</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="overflow-x-auto rounded-radius-xl border border-border">
            <table className="w-full text-xs sm:text-sm">
              <thead><tr className="border-b border-border bg-bg-secondary"><th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-medium text-text-tertiary">部件</th><th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-medium text-text-tertiary">规格</th><th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-text-tertiary">参考价格</th></tr></thead>
              <tbody>
                {project.hardware.map((item) => (
                  <tr key={item.name} className="border-b border-border/50 transition-colors hover:bg-bg-secondary/50">
                    <td className="px-3 sm:px-6 py-2 sm:py-3 font-medium">{item.name}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-3 text-text-secondary">{item.spec}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-3 text-right font-mono text-text-secondary">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 开源资源 */}
      <section className="py-14 sm:py-20 bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">开源资源</h2>
            <p className="mt-2 text-text-secondary">Open Source Resources</p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
              {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-bg-secondary px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-text-primary transition-colors hover:border-border-hover"><Github size={16} />GitHub 仓库</a>}
              {project.links.bilibili && <a href={project.links.bilibili} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-bg-secondary px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-text-primary transition-colors hover:border-border-hover"><Tv size={16} />B站视频</a>}
              {project.links.oshwhub && <a href={project.links.oshwhub} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-bg-secondary px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-text-primary transition-colors hover:border-border-hover"><ExternalLink size={16} />OSHWhub PCB</a>}
              {project.links.gitee && <a href={project.links.gitee} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-bg-secondary px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-text-primary transition-colors hover:border-border-hover"><ExternalLink size={16} />Gitee 仓库</a>}
              {project.links.other?.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-bg-secondary px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-text-primary transition-colors hover:border-border-hover"><ExternalLink size={16} />{link.label}</a>
              ))}
            </div>
            <div className="mt-8 sm:mt-12 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center">
              <a href="#" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:opacity-90" style={{ background: `linear-gradient(135deg, ${project.colorHex}, ${project.colorHex}88)` }}><Wrench size={16} />开始学习</a>
              <Link href="/#projects" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-text-primary transition-colors hover:border-border-hover"><BookOpen size={16} />浏览其他项目</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
