/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Darker panels for stronger contrast against the foreground content
        panel: {
          DEFAULT: '#0b1220',
          light: '#111a2c',
          border: '#2a3a55', // brighter border so cards visually "pop"
        },
        // Even deeper page background — true near-black
        ink: {
          DEFAULT: '#050913',
          deep: '#02050c',
        },
        // Slightly brighter, more saturated accents
        accent: {
          blue: '#60a5fa',
          cyan: '#22d3ee',
          green: '#34d399',
          amber: '#fbbf24',
          red: '#f87171',
        },
        // Lighter muted text → far better readability on dim or color-shifted screens
        muted: {
          DEFAULT: '#c0cad9',
          dark: '#8a99b3',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1.1s steps(1) infinite',
        'scan': 'scan 6s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
