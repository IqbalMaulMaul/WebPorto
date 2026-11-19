/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#08090d",
          card: "rgba(18, 20, 29, 0.6)",
          cardHover: "rgba(25, 28, 42, 0.8)",
          glass: "rgba(255, 255, 255, 0.03)",
        },
        cyan: {
          accent: "#00f0ff",
          glow: "rgba(0, 240, 255, 0.4)",
        },
        purple: {
          accent: "#8a2be2",
          glow: "rgba(138, 43, 226, 0.4)",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          bright: "rgba(0, 240, 255, 0.3)",
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
