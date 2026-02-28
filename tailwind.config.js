/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0b',
          card: 'rgba(28, 28, 30, 0.72)',
          'card-solid': '#1c1c1e',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-strong': 'rgba(255, 255, 255, 0.12)',
        },
        accent: {
          DEFAULT: '#0a84ff',
          hover: '#409cff',
          muted: 'rgba(10, 132, 255, 0.25)',
        },
        apple: {
          gray: '#8e8e93',
          'gray-light': '#aeaeb2',
          'gray-dark': '#636366',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'mesh-drift': 'meshDrift 20s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        meshDrift: {
          '0%, 100%': { opacity: '1', transform: 'scale(1) translate(0, 0)' },
          '33%': { opacity: '0.9', transform: 'scale(1.08) translate(2%, 1%)' },
          '66%': { opacity: '0.95', transform: 'scale(0.97) translate(-1%, 2%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.9' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(10, 132, 255, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(88, 86, 214, 0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(10, 132, 255, 0.08) 0px, transparent 50%)',
      },
      boxShadow: {
        'apple': '0 4px 24px rgba(0, 0, 0, 0.25)',
        'apple-lg': '0 8px 32px rgba(0, 0, 0, 0.35)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 40px rgba(10, 132, 255, 0.15)',
        'glow-strong': '0 0 60px rgba(10, 132, 255, 0.2)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        'card-hover': '0 20px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        'premium': '0 24px 48px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'premium-lg': '0 32px 64px -16px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
