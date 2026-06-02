/**
 * Footer 组件
 *
 * 设计参考: Linear.app（简洁底部导航）+ Vercel.com（品牌标识）
 * 内容: 导航链接、社交媒体图标、版权信息
 * 来源: design-spec.md 7. Footer
 */
import Image from "next/image"
import Link from "next/link"
import { Github, Tv, MessageCircle } from "lucide-react"

const footerLinks = {
  project: {
    title: "项目",
    links: [
      { label: "全部项目", href: "#projects" },
      { label: "学习路径", href: "#learning-path" },
      { label: "学员评价", href: "#testimonials" },
    ],
  },
  resources: {
    title: "资源",
    links: [
      { label: "GitHub 仓库", href: "https://github.com" },
      { label: "B站教程", href: "https://bilibili.com" },
      { label: "OSHWhub 开源", href: "https://oshwhub.com" },
    ],
  },
  about: {
    title: "关于",
    links: [
      { label: "课程设计理念", href: "#" },
      { label: "联系我们", href: "#contact" },
      { label: "常见问题", href: "#" },
    ],
  },
}

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: Tv,
    href: "https://bilibili.com",
    label: "Bilibili",
  },
  {
    icon: MessageCircle,
    href: "#",
    label: "微信公众号",
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* 品牌 + 简介 */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src={`${process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : ''}/logo.png`} alt="Logo" width={32} height={32} className="rounded-lg object-cover" />
              <span className="text-lg font-semibold tracking-tight">
                硬件夏令营
              </span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary">
              面向高中生的暑期硬件实践课程，
              <br />
              9 个真实开源硬件项目。
            </p>
            {/* 社交媒体 — 图标 + 可见文字标签 */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-radius-lg border border-border px-3 py-1.5 text-xs text-text-tertiary transition-colors hover:border-border-hover hover:text-text-primary"
                  aria-label={social.label}
                >
                  <social.icon size={14} />
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* 导航链接列 */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold text-text-primary">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部分隔线 + 版权 */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-text-tertiary md:flex-row">
            <p>© 2026 Summer Hardware Projects. All rights reserved.</p>
            <p>
              本项目基于多个开源项目改编，遵循各自的开源协议。
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
