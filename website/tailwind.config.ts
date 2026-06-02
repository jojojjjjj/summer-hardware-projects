import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* 基础色 — 来源: design-spec.md */
        background: "#09090b",
        "bg-secondary": "#111113",
        "bg-tertiary": "#18181b",
        border: "#27272a",
        "border-hover": "#3f3f46",
        /* 文字色 */
        "text-primary": "#fafafa",
        "text-secondary": "#a1a1aa",
        "text-tertiary": "#71717a",
        /* 强调色 */
        "accent-primary": "#6366f1",
        "accent-secondary": "#06b6d4",
        /* 语义色 */
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        /* 项目主题色 — 来源: design-spec.md 项目特色色 */
        "project-01": "#f97316",
        "project-02": "#22c55e",
        "project-03": "#8b5cf6",
        "project-04": "#ec4899",
        "project-05": "#f59e0b",
        "project-06": "#06b6d4",
        "project-07": "#ef4444",
        "project-08": "#a855f7",
        "project-09": "#3b82f6",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans SC",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        /* 字号层级 — 来源: design-spec.md */
        "text-xs": ["0.75rem", { lineHeight: "1rem" }],
        "text-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "text-base": ["1rem", { lineHeight: "1.75" }],
        "text-lg": ["1.125rem", { lineHeight: "1.75" }],
        "text-xl": ["1.25rem", { lineHeight: "1.75" }],
        "text-2xl": ["1.5rem", { lineHeight: "2rem" }],
        "text-3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "text-4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "text-5xl": ["3rem", { lineHeight: "1" }],
        "text-6xl": ["3.75rem", { lineHeight: "1" }],
        "text-7xl": ["4.5rem", { lineHeight: "1" }],
        "text-8xl": ["6rem", { lineHeight: "1" }],
      },
      spacing: {
        /* 8px 网格 — 来源: design-spec.md */
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "radius-sm": "0.375rem",
        "radius-md": "0.5rem",
        "radius-lg": "0.75rem",
        "radius-xl": "1rem",
        "radius-2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
        "card-hover": "0 10px 40px rgba(0,0,0,0.4)",
        glow: "0 0 40px rgba(99,102,241,0.15)",
      },
      backgroundImage: {
        /* 主渐变 — 来源: design-spec.md */
        "gradient-accent": "linear-gradient(135deg, #6366f1, #06b6d4)",
        "gradient-accent-hover": "linear-gradient(135deg, #4f46e5, #0891b2)",
      },
      animation: {
        /* 动效 — 来源: design-spec.md 动效清单 */
        "gradient-flow": "gradient-flow 8s ease infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
      keyframes: {
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
