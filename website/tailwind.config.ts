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
        /* ── Background layers (cool deep-space) ── */
        background: '#0b0d12',
        'bg-secondary': '#11141b',
        'bg-elevated': '#181b24',
        'bg-surface': '#14171f',

        /* ── Borders (cool) ── */
        border: '#232734',
        'border-hover': '#3a4150',
        'border-subtle': '#1c2029',

        /* ── Text (cool neutrals) ── */
        'text-primary': '#f4f5f7',
        'text-secondary': '#9aa0ac',
        'text-tertiary': '#6b7280',
        'text-faint': '#454b57',

        /* ── Warm accent (restrained — CTA / brand) ── */
        'warm-peach': '#ff9a76',
        'warm-coral': '#ff6b6b',
        'warm-honey': '#ffd93d',
        'warm-blush': '#ffb4a2',
        'warm-amber': '#f4a261',

        /* ── Cool accents (Meta-style) ── */
        'cool-indigo': '#6366f1',
        'cool-blue': '#3b82f6',
        'cool-violet': '#8b5cf6',

        /* ── Accent metals ── */
        'accent-copper': '#c9944a',
        'accent-patina': '#3d8b5e',

        /* ── Status ── */
        success: '#3d8b5e',
        warning: '#c9944a',
        danger: '#e85d3a',

        /* ── Project colors ── */
        'project-01': '#f97316',
        'project-02': '#22c55e',
        'project-03': '#8b5cf6',
        'project-04': '#ef4444',
        'project-05': '#ec4899',
        'project-06': '#06b6d4',
        'project-07': '#f59e0b',
        'project-08': '#6366f1',
        'project-09': '#3b82f6',

        /* ── Tag system ── */
        'tag-bronze': '#c9944a',
        'tag-bronze-text': '#0b0d12',
        'tag-solder': '#ff9a76',
        'tag-solder-text': '#0b0d12',
        'tag-copper': '#d4845a',
        'tag-copper-text': '#0b0d12',
        'tag-teal': '#14b8a6',
        'tag-teal-text': '#0b0d12',
        'tag-patina': '#3d8b5e',
        'tag-patina-text': '#0b0d12',
        'tag-gold': '#ffd93d',
        'tag-gold-text': '#0b0d12',
        'tag-purple': '#8b5cf6',
        'tag-purple-text': '#0b0d12',
        'tag-pink': '#ec4899',
        'tag-pink-text': '#0b0d12',
      },

      fontFamily: {
        // DM Sans leads body copy; Plus Jakarta Sans for display
        sans: [
          'DM Sans',
          'Plus Jakarta Sans',
          'Noto Sans SC',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: [
          'Plus Jakarta Sans',
          'DM Sans',
          'Noto Sans SC',
          'sans-serif',
        ],
      },

      /* ── Apple-scale typography (weights lowered — no 800) ── */
      fontSize: {
        'display': [
          'clamp(4rem, 10vw, 9rem)',
          { lineHeight: '0.95', letterSpacing: '-0.05em', fontWeight: '700' },
        ],
        'hero': [
          'clamp(3.5rem, 8vw, 7.5rem)',
          { lineHeight: '1.0', letterSpacing: '-0.045em' },
        ],
        'hero-sm': [
          'clamp(2.75rem, 6vw, 5rem)',
          { lineHeight: '1.02', letterSpacing: '-0.04em' },
        ],
        'section': [
          'clamp(2.25rem, 5vw, 4.5rem)',
          { lineHeight: '1.06', letterSpacing: '-0.035em' },
        ],
        'subsection': [
          'clamp(1.5rem, 3vw, 2.75rem)',
          { lineHeight: '1.12', letterSpacing: '-0.025em' },
        ],
        'title': [
          '20px',
          { lineHeight: '1.3', letterSpacing: '-0.02em' },
        ],
        'body-lg': [
          '18px',
          { lineHeight: '1.7', letterSpacing: '-0.011em' },
        ],
        'body': [
          '16px',
          { lineHeight: '1.65', letterSpacing: '-0.006em' },
        ],
        'body-sm': [
          '14px',
          { lineHeight: '1.6', letterSpacing: '-0.004em' },
        ],
        'caption': [
          '13px',
          { lineHeight: '1.45', letterSpacing: '0.01em' },
        ],
        'micro': [
          '11px',
          { lineHeight: '1.35', letterSpacing: '0.02em' },
        ],
      },

      /* ── Spacing rhythm ── */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      /* ── Radii ── */
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      /* ── Shadows — layered depth; glow shadows are cool indigo (hover/active only) ── */
      boxShadow: {
        'glow': '0 0 40px rgba(99,102,241,0.16), 0 0 90px rgba(99,102,241,0.05)',
        'glow-strong': '0 0 55px rgba(99,102,241,0.22), 0 0 120px rgba(99,102,241,0.07)',
        'glow-subtle': '0 0 30px rgba(99,102,241,0.10)',
        'glow-cool': '0 0 50px rgba(99,102,241,0.18), 0 0 110px rgba(99,102,241,0.06)',
        'glow-warm': '0 0 50px rgba(255,107,107,0.18), 0 0 110px rgba(255,107,107,0.06)',
        'card': '0 2px 8px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.22)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.22), 0 16px 48px rgba(0,0,0,0.28)',
        'card-elevated': '0 8px 32px rgba(0,0,0,0.28), 0 24px 64px rgba(0,0,0,0.18)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
        'inner-glow-strong': 'inset 0 1px 0 rgba(255,255,255,0.08)',
        'elevation-1': '0 1px 2px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        'elevation-2': '0 2px 4px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.16)',
        'elevation-3': '0 4px 8px rgba(0,0,0,0.18), 0 16px 48px rgba(0,0,0,0.22)',
      },

      /* ── Gradients — warm reserved for CTA; cool ambient available ── */
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #ff9a76, #ff6b6b)',
        'gradient-warm-hover': 'linear-gradient(135deg, #ff8a66, #ff5b5b)',
        'gradient-peach-honey': 'linear-gradient(135deg, #ff9a76, #ffd93d)',
        'gradient-coral-honey': 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
        'gradient-accent': 'linear-gradient(135deg, #9aa3d4, #6366f1)',
        'gradient-sunset': 'linear-gradient(135deg, #ff6b6b, #ff9a76, #ffd93d)',
        'gradient-peach-blush': 'linear-gradient(135deg, #ff9a76, #ffb4a2)',
        'gradient-cool-radial': 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.05) 0%, transparent 65%)',
      },

      /* ── Transitions ── */
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '350': '350ms',
        '450': '450ms',
        '550': '550ms',
        '750': '750ms',
        '900': '900ms',
        '1200': '1200ms',
      },

      /* ── Animations — ONE-SHOT only (forwards). No infinite utilities. ── */
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-up-delayed': 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s forwards',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scaleIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-left': 'slideInLeft 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-right': 'slideInRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'reveal-up': 'revealUp 1s cubic-bezier(0.16,1,0.3,1) forwards',
      },

      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(48px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        revealUp: {
          from: { opacity: '0', transform: 'translateY(60px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
