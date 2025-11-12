/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        night: '#0b0f1a',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
          '50%': { boxShadow: '0 30px 65px rgba(59, 130, 246, 0.28)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.85s ease-out forwards',
        'fade-up-delayed': 'fadeUp 0.85s ease-out 0.12s forwards',
        'gradient-move': 'gradientMove 22s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
