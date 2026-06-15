"use client"

/**
 * 学员评价 Section — Apple Customer Story 大引言风格
 *
 * 设计理念:
 * - 只展示 3 条精选引言，不再是均匀网格
 * - 第一个大引言占满整行
 * - 第二第三个并排显示
 * - 大号引言文字 (24-32px)，如 Apple pull quote
 */
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "张同学",
    grade: "高一",
    project: "天气魔方",
    quote: "第一次自己焊接电路板，虽然手抖了好几次，但看到 OLED 屏幕亮起来的时候超有成就感。",
    featured: true,
  },
  {
    name: "王同学",
    grade: "高一",
    project: "轮足机器人",
    quote: "PID 调参真的很上头，调了两天终于让机器人站起来了。物理课学的控制理论终于派上用场。",
  },
  {
    name: "赵同学",
    grade: "高三",
    project: "ElectronBot",
    quote: "这个项目让我确定了大学要学电子工程。从 PCB 到 Unity 上位机，真正体验了全栈开发。",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-dark py-24 md:py-36 lg:py-44">
      <div className="mx-auto max-w-5xl px-6">
        {/* Apple 式 eyebrow + 大标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <p className="eyebrow mb-4">学员反馈</p>
          <h2 className="text-responsive-section font-bold tracking-tight text-text-primary">
            他们的第一次
          </h2>
        </motion.div>

        {/* 大引言 — 精选首条 */}
        <FeaturedQuote testimonial={testimonials[0]} />

        {/* 小引言 — 其余两条并排 */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {testimonials.slice(1).map((t, i) => (
            <QuoteCard key={t.name} testimonial={t} delay={0.1 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedQuote({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl bg-white/[0.03] p-8 md:p-12"
    >
      {/* 大引言文字 */}
      <blockquote className="text-[20px] sm:text-[24px] md:text-[28px] leading-snug font-medium text-text-primary tracking-tight">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* 人物信息 */}
      <div className="mt-8 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-semibold"
          style={{
            background: "linear-gradient(135deg, #c9944a30, #3d8b5e30)",
            color: "#c9944a",
          }}
        >
          {testimonial.name[0]}
        </div>
        <div className="text-[14px]">
          <span className="font-medium text-text-primary">{testimonial.name}</span>
          <span className="text-text-tertiary"> · {testimonial.grade} · {testimonial.project}</span>
        </div>
      </div>
    </motion.div>
  )
}

function QuoteCard({ testimonial, delay }: { testimonial: typeof testimonials[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="card-glow rounded-2xl border border-white/[0.10] bg-white/[0.03] p-6 sm:p-7"
    >
      <blockquote className="text-[15px] sm:text-[16px] leading-relaxed text-text-secondary/90">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="mt-5 flex items-center gap-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold"
          style={{
            background: "linear-gradient(135deg, #c9944a30, #3d8b5e30)",
            color: "#c9944a",
          }}
        >
          {testimonial.name[0]}
        </div>
        <div className="text-[13px]">
          <span className="font-medium text-text-primary">{testimonial.name}</span>
          <span className="text-text-tertiary"> · {testimonial.grade} · {testimonial.project}</span>
        </div>
      </div>
    </motion.div>
  )
}
