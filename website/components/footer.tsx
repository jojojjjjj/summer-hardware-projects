/**
 * Footer 组件 — Apple 式精致
 *
 * 设计理念:
 * - 更紧凑的布局
 * - 链接更小更密
 * - 社交图标更精致
 * - 版权信息更紧凑
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
      { label: "学员反馈", href: "#testimonials" },
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
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Tv, href: "https://bilibili.com", label: "Bilibili" },
  { icon: MessageCircle, href: "#", label: "微信公众号" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.10] bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* 品牌 */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src={`${process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : ''}/logo.png`}
                alt="Logo"
                width={100}
                height={24}
                className="h-6 w-auto object-contain opacity-70"
              />
            </Link>
            <p className="mt-4 text-[13px] text-text-tertiary leading-relaxed">
              面向高中生的暑期硬件实践课程，
              9 个真实开源硬件项目。
            </p>

            {/* 社交图标 */}
            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-text-tertiary transition-all duration-200 hover:bg-white/[0.08] hover:text-text-secondary"
                  aria-label={social.label}
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* 导航链接列 */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-text-tertiary transition-colors duration-200 hover:text-text-secondary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部 */}
        <div className="mt-10 border-t border-white/[0.10] pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-[11px] text-text-tertiary/60 md:flex-row">
            <p>© 2026 硬件夏令营</p>
            <p>本项目基于多个开源项目改编，遵循各自的开源协议</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
