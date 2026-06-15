"use client"

/**
 * 导航栏 — Apple 极简风格
 *
 * 变更:
 * - Logo 使用原始宽高比 (4:1)，不再 object-cover 压入正方形
 * - 去掉 Logo 旁文字，让 Logo 本身说话
 * - 导航链接更大间距、更细字重
 * - CTA 按钮更精致
 * - 滚动后背景更通透
 */
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
          setScrolled(window.scrollY > 40)
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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "navbar-blur border-b border-white/[0.12]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo — 使用原始宽高比 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src={`${process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : ''}/logo.png`}
            alt="多维国际教育"
            width={120}
            height={30}
            className="h-7 w-auto object-contain transition-opacity group-hover:opacity-80"
            priority
          />
        </Link>

        {/* 桌面导航 */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-text-secondary/80 transition-colors duration-200 hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA 按钮 */}
        <div className="hidden items-center md:flex">
          <a
            href="#projects"
            className="rounded-full bg-text-primary px-5 py-1.5 text-[13px] font-medium text-background transition-all duration-200 hover:bg-text-primary/90"
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
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="navbar-blur border-t border-white/[0.10] md:hidden"
          >
            <div className="flex flex-col gap-0.5 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex min-h-[44px] items-center text-[15px] text-text-secondary transition-colors hover:text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#projects"
                className="mt-2 flex min-h-[44px] items-center justify-center rounded-full bg-text-primary px-4 py-2 text-[15px] font-medium text-background"
                onClick={() => setMobileMenuOpen(false)}
              >
                查看项目
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
