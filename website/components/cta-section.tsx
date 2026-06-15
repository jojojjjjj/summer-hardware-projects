"use client"

/**
 * CTA Section — Apple Buy 风格
 *
 * 设计理念:
 * - 极简，单一焦点
 * - Apple 式的深色卡片，微妙的顶部光
 * - 单一主 CTA
 * - 更多的垂直留白
 */
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section id="contact" className="section-elevated py-24 md:py-36 lg:py-44">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] px-8 py-20 text-center sm:px-12 md:py-28"
        >
          {/* 顶部微光 */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />

          <p className="eyebrow mb-5">开始</p>
          <h2 className="text-responsive-section font-bold tracking-tight text-text-primary">
            准备好开始了吗？
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] sm:text-base text-text-secondary leading-relaxed">
            从焊接第一块 PCB 到调试完整的机器人系统，
            10–20 天，你将完成一次从零到一的硬件开发之旅。
          </p>

          {/* Apple 式单一主 CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:contact@example.com"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-primary px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20"
            >
              <Mail size={16} />
              联系我们
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center text-[15px] font-medium text-text-secondary transition-colors duration-200 hover:text-accent-primary"
            >
              查看项目
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
