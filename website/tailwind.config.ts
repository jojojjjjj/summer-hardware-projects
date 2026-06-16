import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,vue}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0b',
        'bg-secondary': '#111113',
        'bg-elevated': '#1c1c1e',
        border: '#2a2a2e',
        'border-hover': '#444448',
        'text-primary': '#f5f5f7',
        'text-secondary': '#a1a1a6',
        'text-tertiary': '#6e6e73',
        'warm-peach': '#ff9a76',
        'warm-coral': '#ff6b6b',
        'warm-honey': '#ffd93d',
        'accent-copper': '#c9944a',
        'accent-patina': '#3d8b5e',
        success: '#3d8b5e',
        warning: '#c9944a',
        danger: '#e85d3a',
      },
      fontFamily: {
        sans: ['DM Sans', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['DM Sans', 'Noto Sans SC', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'section': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 60px rgba(255,154,118,0.08)',
        'glow-strong': '0 0 80px rgba(255,154,118,0.15)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #ff9a76, #ff6b6b)',
        'gradient-warm-hover': 'linear-gradient(135deg, #ff8a66, #ff5b5b)',
        'gradient-accent': 'linear-gradient(135deg, #c9944a, #3d8b5e)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
