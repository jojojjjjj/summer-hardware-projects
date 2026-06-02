"use client"

/**
 * Hero Section — 全屏 100vh
 *
 * 设计参考:
 * - Apple.com: 大留白 + 超大标题 + 一行核心标语
 * - Stripe.com: 渐变流动背景（CSS 实现，非 WebGL — 性能优化）
 * - Linear.app: 紧密字距 + Inter Variable 字体
 *
 * 动效来源: design-spec.md 动效清单
 * - 背景渐变: CSS @keyframes
 * - 标题: Framer Motion staggerChildren
 * - 数字: Number Ticker (自定义 requestAnimationFrame)
 */
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, Rocket, BookOpen } from "lucide-react"
import { NumberTicker } from "./number-ticker"

/** 交错动画配置 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* 渐变流动背景 — CSS animation，无 JS 开销 */}
      <div className="hero-gradient absolute inset-0" />

      {/* 装饰性光晕 — 增加视觉层次 */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent-primary/5 blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-secondary/5 blur-[128px]" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 品牌 Logo */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <Image
            src={`${process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : ''}/logo.png`}
            alt="多维国际教育"
            width={240}
            height={240}
            className="rounded-2xl object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </motion.div>

        {/* 课程标签 */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/50 px-4 py-1.5 text-sm text-text-secondary backdrop-blur-sm">
            🎓 高中生暑期硬件实践课程 · High School Summer Hardware Practicum
          </span>
        </motion.div>

        {/* 超大标题 — Apple 风格: 粗体 + 紧密字距 */}
        <motion.h1
          variants={itemVariants}
          className="text-responsive-hero font-extrabold leading-tight tracking-tighter"
        >
          从零开始，亲手打造
          <br />
          <span className="gradient-text">9 个真实硬件项目</span>
        </motion.h1>

        {/* 英文副标题 */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg text-text-tertiary md:text-xl"
        >
          Build 9 Real Hardware Projects from Scratch
        </motion.p>

        {/* 关键数字 — Number Ticker 动画 */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex items-center justify-center gap-8 md:gap-12"
        >
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl">
              <NumberTicker value={9} className="gradient-text" />
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              个项目
              <br />
              <span className="text-text-tertiary">Projects</span>
            </p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl">
              <NumberTicker value={20} prefix="10-" className="gradient-text" />
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              天完成
              <br />
              <span className="text-text-tertiary">Days</span>
            </p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl">
              <NumberTicker value={500} prefix="≤¥" className="gradient-text" />
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              每套成本
              <br />
              <span className="text-text-tertiary">Per Kit</span>
            </p>
          </div>
        </motion.div>

        {/* 双 CTA 按钮 — 来源: Vercel.com 双按钮模式 */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-accent px-8 py-3.5 text-base font-semibold text-white transition-all hover:shadow-glow hover:opacity-90"
          >
            <Rocket size={18} />
            探索项目
            <span className="ml-1 text-sm opacity-70">Explore</span>
          </a>
          <a
            href="#value-props"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-secondary/50 px-8 py-3.5 text-base font-semibold text-text-primary transition-colors hover:border-border-hover hover:bg-bg-secondary"
          >
            <BookOpen size={18} />
            了解更多
            <span className="ml-1 text-sm opacity-70">Learn More</span>
          </a>
        </motion.div>

        {/* 特点标签 */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-text-tertiary"
        >
          <span className="rounded-full border border-border px-3 py-1">
            大学级难度
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            全部开源
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            完整课程体系
          </span>
        </motion.div>
      </motion.div>

      {/* 向下滚动指示器 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <a
          href="#value-props"
          className="flex flex-col items-center gap-2 text-text-tertiary transition-colors hover:text-text-secondary"
          aria-label="向下滚动"
        >
          <span className="text-xs">滚动探索</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
