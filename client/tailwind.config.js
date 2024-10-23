/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide': 'slide 1.5s ease-in-out infinite',
      },
      keyframes: {
        slide: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(3rem)' },
        }
      }
    },
  },
  plugins: [],
}