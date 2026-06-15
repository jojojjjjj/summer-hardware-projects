"use client"

/**
 * CTA Section — 底部行动号召
 *
 * 设计参考: Vercel.com（双按钮 CTA）+ Stripe.com（渐变背景）
 * 功能: 渐变背景 + 双按钮 + 合作机构 Logo 滚动墙
 */
import { motion } from "framer-motion"
import { Mail, Rocket, Github, Tv, MessageCircle } from "lucide-react"
import { Marquee } from "./marquee"

/** 模拟合作机构/平台 — Logo 占位 */
const partners = [
  { name: "GitHub", icon: Github },
  { name: "Bilibili", icon: Tv },
  { name: "OSHWhub", icon: Rocket },
  { name: "Espressif", icon: MessageCircle },
  { name: "嘉立创 JLC", icon: Mail },
  { name: "Arduino", icon: Rocket },
  { name: "PlatformIO", icon: Mail },
  { name: "SimpleFOC", icon: Rocket },
]

export function CtaSection() {
  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-32">
      <div className="section-divider mb-16 md:mb-24" />

      {/* 渐变背景 */}
      <div className="relative overflow-hidden md:rounded-radius-2xl mx-auto max-w-7xl px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-accent opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 py-16 text-center md:py-24"
        >
          <h2 className="text-responsive-section font-bold tracking-tighter">
            准备好开始了吗？
          </h2>
          <p className="mt-3 text-lg text-text-secondary">
            Ready to Start Your Hardware Journey?
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            从焊接第一块 PCB 到调试完整的机器人系统，
            <br className="hidden sm:block" />
            10-20 天，你将完成一次从零到一的硬件开发之旅。
          </p>

          {/* 双按钮 */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:contact@example.com"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-accent px-6 sm:px-8 py-3.5 text-base font-semibold text-white transition-all hover:shadow-glow hover:opacity-90"
            >
              <Mail size={18} />
              联系我们
              <span className="ml-1 text-sm opacity-70">Contact Us</span>
            </a>
            <a
              href="#projects"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-bg-secondary/80 px-6 sm:px-8 py-3.5 text-base font-semibold text-text-primary transition-colors hover:border-border-hover"
            >
              <Rocket size={18} />
              查看项目
              <span className="ml-1 text-sm opacity-70">View Projects</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* 合作平台 Logo 滚动墙 — 来源: Magic UI Marquee */}
      <div className="mt-16">
        <p className="mb-6 text-center text-xs text-text-tertiary uppercase tracking-widest">
          技术生态合作伙伴 &amp; 开源平台
        </p>
        <Marquee speed={35} pauseOnHover>
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex shrink-0 items-center gap-2 rounded-radius-lg border border-border bg-bg-secondary px-5 py-3 text-text-secondary"
            >
              <partner.icon size={18} className="text-text-tertiary" />
              <span className="text-sm font-medium">{partner.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
