"use client"

/**
 * 项目展示 Section
 *
 * 去掉了:
 * - "Explore Projects" 英文眉标
 * - ⭐ 难度筛选标签中的星号
 *
 * 保留:
 * - 难度筛选
 * - 项目卡片网格
 */
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects, difficultyFilters } from "@/lib/projects-data"
import { ProjectCard } from "./project-card"
import { cn } from "@/lib/utils"

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState(0)

  const filteredProjects =
    activeFilter === 0
      ? projects
      : projects.filter((p) => p.difficulty === activeFilter)

  return (
    <section id="projects" className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h2 className="text-responsive-section font-bold tracking-tighter">
            9 个硬件项目
          </h2>
          <p className="mt-2 text-sm text-text-tertiary">
            从入门到高级，总有一个适合你
          </p>
        </motion.div>

        {/* 难度筛选 — 无 ⭐ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8 md:mb-10 flex flex-wrap items-center justify-center gap-2"
        >
          {difficultyFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "rounded-radius-md px-3.5 py-1.5 text-xs font-medium font-mono transition-all",
                activeFilter === filter.value
                  ? "bg-accent-primary text-white"
                  : "border border-border bg-bg-secondary text-text-tertiary hover:border-border-hover hover:text-text-secondary"
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* 项目卡片网格 */}
        <motion.div
          layout
          className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
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
          <div className="py-20 text-center text-sm text-text-tertiary">
            该难度暂无项目
          </div>
        )}
      </div>
    </section>
  )
}
