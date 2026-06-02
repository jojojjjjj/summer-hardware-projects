/**
 * 首页 — 单页滚动 Landing Page
 *
 * 页面结构来源: design-spec.md 三、页面详细设计
 * Section 顺序: Hero → 价值主张 → 项目展示 → 学习路径 → 学员评价 → CTA → Footer
 *
 * 所有 section 组件均为客户端组件（"use client"），
 * 本页面作为服务端组件组装它们。
 */
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ValuePropsSection } from "@/components/value-props-section"
import { ProjectsSection } from "@/components/projects-section"
import { LearningPathSection } from "@/components/learning-path-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      {/* 各 Section 之间的分隔由各组件内部处理 */}

      <ValuePropsSection />
      <ProjectsSection />
      <LearningPathSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
