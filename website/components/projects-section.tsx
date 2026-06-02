"use client"

/**
 * 项目展示 Section — 核心区域
 *
 * 设计参考:
 * - Framer.com: 网格瀑布流卡片
 * - Nothing.tech: 产品中心布局
 *
 * 功能:
 * - 难度筛选标签栏
 * - 9 个项目卡片网格（响应式：桌面3列/平板2列/手机1列）
 * - Framer Motion layout animation 筛选切换动画
 *
 * 来源: design-spec.md 3.3 项目展示 Section
 */
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import { projects, difficultyFilters } from "@/lib/projects-data"
import { ProjectCard } from "./project-card"
import { cn } from "@/lib/utils"

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState(0)

  // 筛选逻辑
  const filteredProjects =
    activeFilter === 0
      ? projects
      : projects.filter((p) => p.difficulty === activeFilter)

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-accent-primary">
            <Search size={18} />
            <span className="text-sm font-medium uppercase tracking-widest">
              Explore Projects
            </span>
          </div>
          <h2 className="text-responsive-section font-bold tracking-tighter">
            探索 9 个硬件项目
          </h2>
          <p className="mt-3 text-lg text-text-secondary">
            从入门到高级，总有一个适合你
          </p>
        </motion.div>

        {/* 难度筛选标签栏 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
        >
          {difficultyFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "rounded-radius-lg px-4 py-2 text-sm font-medium transition-all",
                activeFilter === filter.value
                  ? "bg-accent-primary text-white shadow-glow"
                  : "border border-border bg-bg-secondary text-text-secondary hover:border-border-hover hover:text-text-primary"
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* 项目卡片网格 — AnimatePresence 实现筛选动画 */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 空状态 */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-text-tertiary">
            该难度暂无项目
          </div>
        )}
      </div>
    </section>
  )
}
