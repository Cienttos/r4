/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matrix-green': '#00FF00',
        'matrix-dark-green': '#008F11',
        'matrix-black': '#0A0A0A',
        'matrix-gray': '#AAAAAA',
        'matrix-red': '#FF0000', // For errors
        'terminal-bg': '#010101', // Even darker background
        'terminal-green-light': '#39FF14', // Brighter green for accents
        'terminal-green-dark': '#006400', // Darker green for depth
        'terminal-blue': '#00FFFF', // Cyan for highlights
        'terminal-purple': '#BF00FF', // Purple for unique elements
        'neon-green': '#39FF14', // More vibrant neon green
        'dark-neon-green': '#00B300', // Darker shade of neon green
        'deep-black': '#000000', // Pure black for backgrounds
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        mono: ['"Roboto Mono"', 'monospace'],
        sans: ['Orbitron', 'sans-serif'],
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scanline: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(0, 255, 0, 0.5)' },
          '50%': { borderColor: 'rgba(0, 255, 0, 1)' },
        },
        'neon-glow': {
          '0%, 100%': { textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 40px #39FF14' },
          '50%': { textShadow: '0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14, 0 0 50px #39FF14' },
        },
        'background-pulse': {
          '0%, 100%': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
          '50%': { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
        },
      },
      animation: {
        glitch: 'glitch 0.3s infinite',
        scanline: 'scanline 8s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'border-pulse': 'border-pulse 2s infinite alternate',
        'neon-glow': 'neon-glow 1.5s infinite alternate',
        'background-pulse': 'background-pulse 5s infinite alternate',
      },
    },
  },
  plugins: [],
}