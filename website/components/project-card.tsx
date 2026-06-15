"use client"

/**
 * 项目卡片 — Apple App Store 风格
 *
 * 设计理念:
 * - 更大的视觉空间，更少的装饰
 * - 封面区有微妙的渐变而非纯色块
 * - 项目编号作为精致的 eyebrow
 * - 难度用小色点，不用 badge
 * - 标签更小更精致
 * - hover 时整个卡片微微提升
 */
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, Coins } from "lucide-react"
import { type Project, getDifficultyBg } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  index: number
  featured?: boolean
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        <div className={`card-glow h-full rounded-2xl border border-white/[0.10] bg-white/[0.03] overflow-hidden ${featured ? 'md:flex' : ''}`}>
          {/* 封面 — PCB 走线风格几何图案 */}
          <div
            className={`relative ${featured ? 'md:w-3/5 aspect-[16/9] md:aspect-auto' : 'aspect-[16/10]'} w-full flex items-center justify-center overflow-hidden`}
            style={{
              background: `linear-gradient(145deg, ${project.colorHex}12 0%, ${project.colorHex}06 50%, ${project.colorHex}02 100%)`,
            }}
          >
            {/* PCB 网格背景 */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `
                  linear-gradient(${project.colorHex}15 1px, transparent 1px),
                  linear-gradient(90deg, ${project.colorHex}15 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
            />

            {/* PCB 走线装饰 */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" fill="none">
              <line x1="10%" y1="20%" x2="40%" y2="20%" stroke={project.colorHex} strokeWidth="1.5" />
              <line x1="40%" y1="20%" x2="40%" y2="60%" stroke={project.colorHex} strokeWidth="1.5" />
              <line x1="40%" y1="60%" x2="70%" y2="60%" stroke={project.colorHex} strokeWidth="1.5" />
              <line x1="70%" y1="60%" x2="70%" y2="35%" stroke={project.colorHex} strokeWidth="1.5" />
              <circle cx="10%" cy="20%" r="3" fill={project.colorHex} />
              <circle cx="70%" cy="35%" r="3" fill={project.colorHex} />
            </svg>

            {/* 项目编号 — Apple 式精致标签 */}
            <div className="absolute top-4 left-4">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold font-mono tracking-wide"
                style={{
                  backgroundColor: `${project.colorHex}20`,
                  color: project.colorHex,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: project.colorHex }}
                />
                P{project.id}
              </span>
            </div>

            {/* 中心 — 项目英文代号 */}
            <span
              className={`font-mono font-bold tracking-tighter select-none ${featured ? 'text-6xl md:text-7xl opacity-[0.10]' : 'text-5xl sm:text-6xl opacity-[0.10]'}`}
              style={{ color: project.colorHex }}
            >
              {project.titleEn}
            </span>

            {/* 右上角难度 */}
            <div className="absolute top-4 right-4">
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-medium",
                  getDifficultyBg(project.difficulty)
                )}
              >
                {project.difficultyLabel}
              </span>
            </div>
          </div>

          {/* 内容区 — 更多留白 */}
          <div className={`${featured ? 'md:w-2/5 md:p-8' : 'p-5 sm:p-6'} flex flex-col`}>
            {/* 项目名称 */}
            <h3 className={`${featured ? 'text-xl md:text-2xl' : 'text-[15px] sm:text-base'} font-semibold tracking-tight text-text-primary`}>
              {project.titleZh}
            </h3>
            <p className={`mt-1 ${featured ? 'text-[14px]' : 'text-[13px] sm:text-sm'} text-text-secondary`}>
              {project.subtitle}
            </p>

            {/* 参数行 — Apple 式精致图标 */}
            <div className="mt-3 flex items-center gap-4 text-[12px] text-text-tertiary">
              <span className="flex items-center gap-1.5">
                <Clock size={11} className="opacity-60" />
                {project.duration}{project.durationUnit}
              </span>
              <span className="flex items-center gap-1.5">
                <Coins size={11} className="opacity-60" />
                {project.cost}
              </span>
            </div>

            {/* 技术标签 — 精选 2-3 个最关键的 */}
            {project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.slice(0, featured ? 4 : 3).map((tag) => (
                  <span
                    key={tag.label}
                    className="rounded-full px-2 py-0.5 text-[11px] font-medium bg-white/[0.05] text-text-secondary"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}

            {/* 箭头 — Apple 式的微妙提示 */}
            <div className="mt-auto pt-4 flex items-center justify-end">
              <ArrowUpRight
                size={featured ? 18 : 14}
                className="text-text-tertiary/50 transition-all duration-200 group-hover:text-accent-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
