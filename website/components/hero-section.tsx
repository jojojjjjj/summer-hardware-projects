"use client"

/**
 * Hero Section — Apple Keynote 风格
 *
 * 设计理念:
 * - 全屏沉浸式，Apple 产品页的 "Keynote" 感
 * - Logo 以原始宽高比展示，不再被裁切
 * - 巨型标题，3:1 的标题/正文比例
 * - 单一主 CTA，次级为文字链接
 * - 数据指标用 Apple 的 "specs bar" 风格
 * - 左右两侧添加 PCB 主题装饰元素作为视觉锚点
 */
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { NumberTicker } from "./number-ticker"

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
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

// PCB 装饰组件
function PcbDecoration({ side }: { side: "left" | "right" }) {
  const mirror = side === "left" ? "" : "scaleX(-1)"
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none ${side === "left" ? "left-8" : "right-8"}`}
      style={{ transform: `${mirror} translateY(-50%)` }}
    >
      <svg
        width="160"
        height="400"
        viewBox="0 0 160 400"
        fill="none"
        className="opacity-20"
      >
        {/* 主走线 */}
        <path
          d="M 10 50 L 80 50 L 80 120 L 150 120"
          stroke="#c9944a"
          strokeWidth="1.5"
        />
        <path
          d="M 10 150 L 60 150 L 60 220 L 130 220"
          stroke="#c9944a"
          strokeWidth="1.5"
        />
        <path
          d="M 10 250 L 100 250 L 100 320 L 150 320"
          stroke="#3d8b5e"
          strokeWidth="1.5"
        />
        <path
          d="M 10 350 L 70 350 L 70 380 L 140 380"
          stroke="#c9944a"
          strokeWidth="1.5"
        />
        {/* 元件节点 */}
        <rect x="0" y="40" width="20" height="20" rx="2" stroke="#c9944a" strokeWidth="1" fill="none" />
        <rect x="130" y="110" width="20" height="20" rx="2" stroke="#c9944a" strokeWidth="1" fill="none" />
        <circle cx="80" cy="120" r="4" fill="#c9944a" />
        <circle cx="60" cy="150" r="4" fill="#c9944a" />
        <circle cx="60" cy="220" r="4" fill="#c9944a" />
        <rect x="40" y="210" width="40" height="20" rx="2" stroke="#3d8b5e" strokeWidth="1" fill="none" />
        <circle cx="100" cy="250" r="4" fill="#3d8b5e" />
        <circle cx="100" cy="320" r="4" fill="#3d8b5e" />
        <rect x="120" y="310" width="20" height="20" rx="2" stroke="#c9944a" strokeWidth="1" fill="none" />
        <circle cx="70" cy="350" r="4" fill="#c9944a" />
        <circle cx="70" cy="380" r="4" fill="#c9944a" />
        {/* 二极管符号 */}
        <line x1="130" y1="380" x2="155" y2="380" stroke="#c9944a" strokeWidth="1" />
        <polygon points="148,376 155,380 148,384" fill="#c9944a" />
      </svg>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 背景 — Apple 式纯黑 + 微妙光晕 + PCB 网格 */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 45%, rgba(201, 148, 74, 0.10) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(61, 139, 94, 0.04) 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 148, 74, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 148, 74, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* PCB 装饰 — 左右两侧 */}
      <PcbDecoration side="left" />
      <PcbDecoration side="right" />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 品牌 Logo — 原始宽高比，大尺寸展示 */}
        <motion.div variants={itemVariants} className="mb-10 flex justify-center">
          <Image
            src={`${process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : ''}/logo.png`}
            alt="多维国际教育"
            width={280}
            height={68}
            className="h-16 sm:h-20 md:h-24 w-auto object-contain opacity-90"
            priority
          />
        </motion.div>

        {/* 主标题 — 全白无双色 */}
        <motion.h1
          variants={itemVariants}
          className="text-hero font-bold leading-[1.05] tracking-tight text-text-primary"
        >
          从零开始，亲手打造
          <br />
          9 个真实硬件项目
        </motion.h1>

        {/* 副标题 — 苹果的 tagline 风格 */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg sm:text-xl text-text-secondary/70 font-light max-w-2xl mx-auto leading-relaxed"
        >
          高中生暑期硬件实践课程
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-primary px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
          >
            查看项目
            <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#value-props"
            className="inline-flex items-center justify-center gap-1.5 text-[15px] font-medium text-text-secondary transition-colors duration-200 hover:text-accent-primary"
          >
            了解更多
          </a>
        </motion.div>

        {/* 移动端精简版数据指标 */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex sm:hidden items-center justify-center gap-4 text-[12px] text-text-tertiary"
        >
          <span className="font-mono"><span className="accent-text font-semibold">9</span> 项目</span>
          <span className="text-white/[0.12]">·</span>
          <span className="font-mono"><span className="accent-text font-semibold">10–20</span> 天</span>
          <span className="text-white/[0.12]">·</span>
          <span className="font-mono"><span className="accent-text font-semibold">≤¥500</span> 套</span>
        </motion.div>

        {/* 桌面端 specs bar */}
        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-20 hidden sm:flex items-center justify-center gap-10 sm:gap-16"
        >
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold accent-text tabular-nums font-mono tracking-tight">
              <NumberTicker value={9} />
            </div>
            <p className="mt-2 text-xs text-text-tertiary uppercase tracking-widest font-medium">
              项目
            </p>
          </div>
          <div className="h-10 w-px bg-white/[0.12]" />
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold accent-text tabular-nums font-mono tracking-tight">
              <NumberTicker value={20} prefix="10–" />
            </div>
            <p className="mt-2 text-xs text-text-tertiary uppercase tracking-widest font-medium">
              天
            </p>
          </div>
          <div className="h-10 w-px bg-white/[0.12]" />
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold accent-text tabular-nums font-mono tracking-tight">
              <NumberTicker value={500} prefix="≤¥" />
            </div>
            <p className="mt-2 text-xs text-text-tertiary uppercase tracking-widest font-medium">
              每套
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
