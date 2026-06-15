"use client"

/**
 * 导航栏
 *
 * 去掉了:
 * - 双语导航标签 (项目 Projects)
 * - 渐变按钮 → 实色按钮
 *
 * 保留:
 * - 固定顶部
 * - 滚动模糊
 * - 移动端菜单
 */
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#projects", label: "项目" },
  { href: "#learning-path", label: "学习路径" },
  { href: "#testimonials", label: "学员反馈" },
  { href: "#contact", label: "联系我们" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={`${process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : ''}/logo.png`} alt="Logo" width={28} height={28} className="rounded-md object-cover" />
          <span className="text-base font-semibold tracking-tight text-text-primary sm:text-lg">
            硬件夏令营
          </span>
        </Link>

        {/* 桌面导航 */}
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

        {/* CTA 按钮 — 实色 */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#projects"
            className="rounded-md bg-accent-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-primary/90"
          >
            查看项目
          </a>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden text-text-secondary hover:text-text-primary"
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
          <div className="flex flex-col gap-1 px-4 py-3 sm:px-6 sm:py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex min-h-[44px] items-center text-base text-text-secondary transition-colors hover:text-text-primary sm:text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#projects"
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-md bg-accent-primary px-4 py-2 text-base font-medium text-white sm:text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              查看项目
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
