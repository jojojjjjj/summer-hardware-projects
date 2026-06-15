"use client"

/**
 * CTA Section — 底部行动号召
 *
 * 去掉了:
 * - 双语按钮标签 (Contact Us / View Projects)
 * - 合作伙伴 Marquee 滚动墙
 * - 渐变背景覆盖层
 *
 * 保留:
 * - 核心号召文案
 * - 双按钮
 */
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-32">
      <div className="section-divider mb-16 md:mb-24" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-radius-xl border border-border bg-bg-secondary px-6 py-16 text-center sm:px-12 md:py-24"
        >
          {/* 微弱的顶部光 */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />

          <h2 className="text-responsive-section font-bold tracking-tighter">
            准备好开始了吗？
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-text-secondary">
            从焊接第一块 PCB 到调试完整的机器人系统，
            10–20 天，你将完成一次从零到一的硬件开发之旅。
          </p>

          {/* 按钮 */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:contact@example.com"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-accent-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-primary/90"
            >
              <Mail size={16} />
              联系我们
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border bg-bg-secondary px-7 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border-hover"
            >
              查看项目
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
