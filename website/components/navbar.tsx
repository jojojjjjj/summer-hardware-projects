"use client"

/**
 * 导航栏组件
 *
 * 设计参考: Aceternity UI Floating Navbar + Linear.app
 * 功能: 固定顶部、滚动时添加背景模糊、响应式
 * 动效: CSS transition backdrop-blur — 来源: design-spec.md 动效清单
 */
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#projects", label: "项目", labelEn: "Projects" },
  { href: "#learning-path", label: "学习路径", labelEn: "Path" },
  { href: "#testimonials", label: "学员评价", labelEn: "Reviews" },
  { href: "#contact", label: "联系我们", labelEn: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 监听滚动 — 节流处理避免性能问题
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 100)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "navbar-blur" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* 渐变 Logo 标识 — 来源: Stripe.com 渐变美感 */}
          <Image src={`${process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : ''}/logo.png`} alt="Logo" width={32} height={32} className="rounded-lg object-cover" />
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            硬件夏令营
          </span>
        </Link>

        {/* 桌面导航链接 */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA 按钮 */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#projects"
            className="rounded-lg bg-gradient-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            探索项目
          </a>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="navbar-blur border-t border-border md:hidden"
        >
          <div className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#projects"
              className="rounded-lg bg-gradient-accent px-4 py-2 text-center text-sm font-medium text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              探索项目
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
