/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#0f1729',
          800: '#1a2540',
          700: '#27314f',
          600: '#3a4566',
          500: '#525c7a',
          400: '#6b7592',
        },
        shield: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
        },
        vol: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        shock: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        mist: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        'slide-down': 'slideDown 0.4s ease-out both',
        'pulse-ring': 'pulseRing 1.8s ease-out infinite',
        'fill-bar': 'fillBar 1.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'count-up': 'countUp 1s ease-out forwards',
        'flow-pulse': 'flowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 2s linear infinite',
        'gauge-fill': 'gaugeFill 1.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'shake-x': 'shakeX 0.5s ease-in-out',
        'scan-line': 'scanLine 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.6' },
          '70%': { transform: 'scale(1.3)', opacity: '0' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        fillBar: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--target-width)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flowPulse: {
          '0%,100%': { opacity: '0.4', transform: 'scaleX(0.7)' },
          '50%': { opacity: '1', transform: 'scaleX(1)' },
        },
        gaugeFill: {
          '0%': { strokeDashoffset: '339' },
          '100%': { strokeDashoffset: 'var(--target-offset)' },
        },
        shakeX: {
          '0%,100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
      },
      boxShadow: {
        'premium': '0 2px 4px -1px rgba(15,23,41,0.04), 0 8px 24px -8px rgba(15,23,41,0.08)',
        'premium-lg': '0 4px 8px -2px rgba(15,23,41,0.06), 0 20px 48px -12px rgba(15,23,41,0.14)',
        'glow-shield': '0 0 0 1px rgba(16,185,129,0.2), 0 8px 32px -4px rgba(16,185,129,0.25)',
        'glow-shock': '0 0 0 1px rgba(239,68,68,0.2), 0 8px 32px -4px rgba(239,68,68,0.3)',
        'glow-vol': '0 0 0 1px rgba(245,158,11,0.2), 0 8px 32px -4px rgba(245,158,11,0.2)',
      },
    },
  },
  plugins: [],
};
