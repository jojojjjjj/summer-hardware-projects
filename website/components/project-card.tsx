"use client"

/**
 * 项目卡片 — IC 元件数据表风格
 *
 * 去掉了:
 * - 渐变色背景占位 + 模糊圆 → 替换为等宽字体器件编号
 * - ⭐ 星号难度 → 替换为色点 + 文字
 * - 查看详情 → 替换为简洁箭头
 *
 * 保留:
 * - 项目编号
 * - 核心信息
 * - 技术标签
 */
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, Coins } from "lucide-react"
import { type Project, getDifficultyBg } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        <div className="card-glow h-full rounded-radius-xl border border-border bg-bg-secondary overflow-hidden">
          {/* 封面 — 等宽字体器件编号，类似 IC 丝印 */}
          <div
            className="relative aspect-[16/9] w-full flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${project.colorHex}08, ${project.colorHex}03)`,
            }}
          >
            {/* 左上角编号标签 — 类似 IC pin 1 标记 */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: project.colorHex }}
              />
              <span
                className="font-mono text-[10px] font-semibold tracking-wider uppercase"
                style={{ color: project.colorHex, opacity: 0.7 }}
              >
                P{project.id}
              </span>
            </div>

            {/* 中心器件编号 — 大号等宽 */}
            <div className="text-center">
              <span
                className="font-mono text-4xl sm:text-5xl font-bold tracking-tighter opacity-[0.07]"
                style={{ color: project.colorHex }}
              >
                {project.titleEn}
              </span>
            </div>

            {/* 右上角难度色条 */}
            <div className="absolute top-3 right-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[11px] font-medium font-mono",
                  getDifficultyBg(project.difficulty)
                )}
              >
                {project.difficultyLabel}
              </span>
            </div>
          </div>

          {/* 内容区 */}
          <div className="p-4 sm:p-5">
            {/* 项目名称 + 描述 */}
            <div className="mb-3">
              <h3 className="text-sm sm:text-base font-semibold tracking-tight text-text-primary">
                {project.titleZh}
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-text-secondary">
                {project.subtitle}
              </p>
            </div>

            {/* 参数行 */}
            <div className="mb-3 flex items-center gap-3 text-xs text-text-tertiary">
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {project.duration}{project.durationUnit}
              </span>
              <span className="flex items-center gap-1">
                <Coins size={11} />
                {project.cost}
              </span>
            </div>

            {/* 技术标签 */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={cn(
                    "rounded-sm px-1.5 py-0.5 text-[11px] font-mono",
                    tag.color
                  )}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* 箭头 */}
            <div className="mt-3 flex items-center justify-end">
              <ArrowUpRight
                size={14}
                className="text-text-tertiary transition-all group-hover:text-accent-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
