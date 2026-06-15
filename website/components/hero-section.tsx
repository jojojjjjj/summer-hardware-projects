"use client"

/**
 * Hero Section — 工作台风格
 *
 * 去掉了:
 * - 🎓 emoji 徽章 + 双语标题
 * - 渐变文字效果 (gradient-text)
 * - 模糊光晕装饰球
 * - 底部药丸标签 (大学级难度/全部开源/完整课程体系)
 * - 双语按钮文字 (Explore / Learn More)
 * - 向下滚动指示器
 *
 * 保留:
 * - 品牌 Logo
 * - 核心标题
 * - 关键数字
 * - 双 CTA 按钮
 */
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, ArrowDown } from "lucide-react"
import { NumberTicker } from "./number-ticker"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* 背景层 — 静态微光，非流动渐变 */}
      <div className="hero-gradient absolute inset-0" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 品牌 Logo — 缩小尺寸 */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <Image
            src={`${process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : ''}/logo.png`}
            alt="多维国际教育"
            width={80}
            height={80}
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover opacity-80"
          />
        </motion.div>

        {/* 主标题 — 实色金色强调，无渐变 */}
        <motion.h1
          variants={itemVariants}
          className="text-responsive-hero font-extrabold leading-tight tracking-tighter text-text-primary"
        >
          从零开始，亲手打造
          <br />
          <span className="accent-text">9 个真实硬件项目</span>
        </motion.h1>

        {/* 一句话说明 */}
        <motion.p
          variants={itemVariants}
          className="mt-5 text-base sm:text-lg text-text-secondary max-w-xl mx-auto"
        >
          高中生暑期硬件实践课程 — 10–20 天完成，每套成本 ≤¥500
        </motion.p>

        {/* 关键数字 */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex items-center justify-center gap-8 sm:gap-14"
        >
          <div className="text-center">
            <div className="text-3xl font-bold font-mono sm:text-4xl accent-text tabular-nums">
              <NumberTicker value={9} />
            </div>
            <p className="mt-1 text-xs text-text-tertiary uppercase tracking-wider font-mono">
              项目
            </p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold font-mono sm:text-4xl accent-text tabular-nums">
              <NumberTicker value={20} prefix="10–" />
            </div>
            <p className="mt-1 text-xs text-text-tertiary uppercase tracking-wider font-mono">
              天
            </p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold font-mono sm:text-4xl accent-text tabular-nums">
              <NumberTicker value={500} prefix="≤¥" />
            </div>
            <p className="mt-1 text-xs text-text-tertiary uppercase tracking-wider font-mono">
              /套
            </p>
          </div>
        </motion.div>

        {/* CTA 按钮 — 单语，简洁 */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto"
        >
          <a
            href="#projects"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-accent-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-primary/90"
          >
            查看项目
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#value-props"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border bg-bg-secondary/50 px-7 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border-hover hover:bg-bg-secondary"
          >
            了解更多
          </a>
        </motion.div>
      </motion.div>

      {/* 向下提示 — 极简 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <ArrowDown size={16} className="text-text-tertiary" />
      </motion.div>
    </section>
  )
}
