/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1800px',
    },
    extend: {
      colors: {
        'tokyo-base': '#1a1b26',
        'tokyo-surface': '#16161e',
        'tokyo-fg': '#c0caf5',
        'tokyo-muted': '#a9b1d6',
        'tokyo-blue': '#7aa2f7',
        'tokyo-purple': '#bb9af7',
        'tokyo-cyan': '#7dcfff',
        'tokyo-green': '#9ece6a',
        'tokyo-red': '#f7768e',
        'tokyo-yellow': '#e0af68',
        'tokyo-comment': '#565f89',
        'tokyo-orange': '#ff9e64',
        'tokyo-card': '#1f2335',
        'tokyo-border': '#2f3549',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}
