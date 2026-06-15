import type { Metadata, Viewport } from "next"
import "./globals.css"

/**
 * 根布局 — 来源: design-spec.md 技术栈
 *
 * SEO 元数据参考: design-spec.md 六、SEO & 元数据
 * 字体方案: Inter Variable (英文) + Noto Sans SC (中文) — Google Fonts CDN
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "高中生暑期硬件实践课程 — 9 个真实开源项目",
  description:
    "10-20 天亲手打造热成像仪、机械键盘、轮足机器人等 9 个真实硬件项目。大学级难度，完整课程体系，全部基于开源项目。",
  keywords: [
    "高中生",
    "暑期课程",
    "硬件项目",
    "开源",
    "ESP32",
    "STM32",
    "嵌入式",
    "IoT",
    "机器人",
  ],
  openGraph: {
    title: "高中生暑期硬件实践课程",
    description: "9 个真实开源硬件项目 · 10-20 天完成 · 大学级难度",
    type: "website",
    locale: "zh_CN",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        {/* 结构化数据 — 来源: design-spec.md SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: "高中生暑期硬件实践课程",
              description: "9 个真实开源硬件项目，10-20 天完成",
              provider: {
                "@type": "Organization",
                name: "Summer Hardware Projects",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
