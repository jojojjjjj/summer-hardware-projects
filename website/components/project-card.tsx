"use client"

/**
 * 项目卡片组件
 *
 * 设计参考: Nothing.tech（产品中心布局）+ Framer.com（卡片 hover）
 * 动效: CSS transition translateY + box-shadow — GPU 加速
 * 来源: design-spec.md 项目卡片设计规格
 */
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Coins } from "lucide-react"
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="card-glow group h-full rounded-radius-xl border border-border bg-bg-secondary overflow-hidden">
          {/* 项目封面图占位 — 渐变色块 + 项目图标 */}
          {/* TODO: 替换为真实项目图片 */}
          <div
            className="relative aspect-[16/10] w-full overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${project.colorHex}15, ${project.colorHex}05)`,
            }}
          >
            {/* 装饰性渐变圆 */}
            <div
              className="absolute left-1/2 top-1/2 h-20 w-20 sm:h-32 sm:w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-2xl"
              style={{ backgroundColor: project.colorHex }}
            />

            {/* 项目编号 + 名称 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-3xl sm:text-5xl font-extrabold opacity-10"
                style={{ color: project.colorHex }}
              >
                P{project.id}
              </span>
              <span
                className="mt-1 text-xs sm:text-sm font-medium opacity-40"
                style={{ color: project.colorHex }}
              >
                {project.titleEn}
              </span>
            </div>
          </div>

          {/* 卡片内容区 */}
          <div className="p-4 sm:p-5">
            {/* 项目名称 + 描述 */}
            <div className="mb-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: project.colorHex }}
                >
                  P{project.id}
                </span>
                <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                  {project.titleZh}
                </h3>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-1">
                {project.subtitle}
              </p>
            </div>

            {/* 参数行: 难度 + 天数 + 成本 */}
            <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-medium",
                  getDifficultyBg(project.difficulty)
                )}
              >
                {"⭐".repeat(project.difficulty)} {project.difficultyLabel}
              </span>
              <span className="flex items-center gap-1 text-text-tertiary">
                <Clock size={12} />
                {project.duration}{project.durationUnit}
              </span>
              <span className="flex items-center gap-1 text-text-tertiary">
                <Coins size={12} />
                {project.cost}
              </span>
            </div>

            {/* 技术标签 */}
            <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={cn(
                    "rounded-md px-2 py-0.5 text-xs font-mono",
                    tag.color
                  )}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* 查看详情链接 */}
            <div className="flex items-center gap-1 text-sm font-medium transition-colors"
                 style={{ color: project.colorHex }}>
              查看详情
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
