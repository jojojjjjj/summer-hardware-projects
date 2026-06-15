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
        /*
         * 设计方向: 工作台 / Workbench
         *
         * 色彩来源不是 "科技感渐变"，而是电子工作台的真实材质：
         * - PCB 走线的金色 ENIG 涂层
         * - 阻焊层的深绿色
         * - 烙铁头的暗橙红
         * - 焊锡的银灰色
         */
        /* 基础色 — 微暖深色系 */
        background: "#0c0c0e",
        "bg-secondary": "#141416",
        "bg-tertiary": "#1c1c1e",
        border: "#2a2724",
        "border-hover": "#3d3a35",
        /* 文字色 — 暖白/暖灰，非冷白 */
        "text-primary": "#ede9e1",
        "text-secondary": "#9a9590",
        "text-tertiary": "#6b6661",
        /* 强调色 — PCB 金色走线 + 阻焊绿 */
        "accent-primary": "#c9944a",
        "accent-secondary": "#3d8b5e",
        /* 语义色 — 工作台材质映射 */
        success: "#3d8b5e",
        warning: "#c9944a",
        danger: "#e85d3a",
        /* 项目标签色 — 暖色调，替代默认的冷色蓝/青/紫 */
        "tag-copper": { DEFAULT: "#c9944a33", text: "#c9944a" },
        "tag-bronze": { DEFAULT: "#b8733333", text: "#b87333" },
        "tag-gold": { DEFAULT: "#d4a85320", text: "#d4a853" },
        "tag-solder": { DEFAULT: "#3d8b5e20", text: "#5aad7a" },
        "tag-patina": { DEFAULT: "#5a9e8e20", text: "#5a9e8e" },
        "tag-rust": { DEFAULT: "#c46b3a20", text: "#d4845a" },
        "tag-clay": { DEFAULT: "#a0705020", text: "#b88868" },
        "tag-teal": { DEFAULT: "#3a7e7e20", text: "#5a9e9e" },
        "tag-olive": { DEFAULT: "#7a8a3a20", text: "#8a9a4a" },
        /* 项目主题色 */
        "project-01": "#e88a3a",
        "project-02": "#3d8b5e",
        "project-03": "#7c6bb5",
        "project-04": "#d45d8a",
        "project-05": "#c9944a",
        "project-06": "#3a9b9b",
        "project-07": "#d45050",
        "project-08": "#9a6bc9",
        "project-09": "#4a7abf",
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
        display: [
          "JetBrains Mono",
          "Fira Code",
          "monospace",
        ],
      },
      fontSize: {
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
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "radius-sm": "0.25rem",
        "radius-md": "0.375rem",
        "radius-lg": "0.5rem",
        "radius-xl": "0.75rem",
        "radius-2xl": "1rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
        "card-hover": "0 10px 40px rgba(0,0,0,0.4)",
        glow: "0 0 30px rgba(201,148,74,0.15)",
      },
      backgroundImage: {
        /* 渐变 — 金色→绿色，PCB 走线感 */
        "gradient-accent": "linear-gradient(135deg, #c9944a, #3d8b5e)",
        "gradient-accent-hover": "linear-gradient(135deg, #b5833f, #2d6e48)",
      },
      animation: {
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
