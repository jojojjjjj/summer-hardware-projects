"use client"

/**
 * 项目展示 Section — Apple 产品货架风格
 *
 * 设计理念:
 * - 打破均匀 3×3 网格：featured project 占大位置
 * - 桌面端：第一行 1 大 + 1 小，剩余网格
 * - 减少标签数量
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
    <section id="projects" className="section-dark py-24 md:py-36 lg:py-44">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple 式 eyebrow + 大标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="eyebrow mb-4">9 个项目</p>
          <h2 className="text-responsive-section font-bold tracking-tight text-text-primary">
            从入门到高级
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] text-text-secondary">
            每个项目都基于真实开源硬件改编，成本 ≤¥500
          </p>
        </motion.div>

        {/* 难度筛选 — 水平滚动避免拥挤 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 -mx-6 px-6 overflow-x-auto"
        >
          <div className="flex items-center gap-2 min-w-max">
            {difficultyFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 whitespace-nowrap",
                  activeFilter === filter.value
                    ? "bg-text-primary text-background"
                    : "bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] hover:text-text-primary"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured 项目 + 网格 — 打破均匀布局 */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 && (
            <FeaturedLayout projects={filteredProjects} />
          )}
        </AnimatePresence>

        {/* 空状态 */}
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center text-[15px] text-text-tertiary">
            该难度暂无项目
          </div>
        )}
      </div>
    </section>
  )
}

function FeaturedLayout({ projects }: { projects: typeof import("@/lib/projects-data").projects }) {
  const [featured, ...rest] = projects
  return (
    <div>
      {/* Featured 大卡 — 桌面端：横跨 2 列 */}
      <motion.div
        layout
        className="mb-5"
      >
        <ProjectCard project={featured} index={0} featured />
      </motion.div>

      {/* 其余项目 — 2-3 列网格 */}
      <motion.div
        layout
        className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {rest.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
          />
        ))}
      </motion.div>
    </div>
  )
}
