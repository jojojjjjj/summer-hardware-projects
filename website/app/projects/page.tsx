/**
 * 项目列表页 — /projects
 *
 * 复用 ProjectsSection 组件，提供独立的项目浏览入口
 */
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "项目列表 — 高中生暑期硬件实践课程",
  description: "浏览全部 9 个硬件项目，从入门到高级，总有一个适合你。",
}

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <ProjectsSection />
      </div>
      <Footer />
    </main>
  )
}
