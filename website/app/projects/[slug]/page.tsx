/**
 * 项目详情页 — /projects/[slug]
 *
 * 服务端组件 — 使用 generateStaticParams 在构建时预生成 9 个静态页面
 * 用于 GitHub Pages 静态部署
 */
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects-data"
import { Navbar } from "@/components/navbar"
import ProjectDetailClient from "@/components/project-detail-client"

/** 预生成所有项目页面 — 静态导出必需 */
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

/** 动态元数据 — 每个项目有独立的 SEO 信息 */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: "项目未找到" }

  return {
    title: `${project.titleZh} ${project.titleEn} — 暑期硬件实践课程`,
    description: project.descriptionEn,
    openGraph: {
      title: `${project.titleZh} | ${project.titleEn}`,
      description: project.subtitleEn,
    },
  }
}

interface PageProps {
  params: { slug: string }
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
