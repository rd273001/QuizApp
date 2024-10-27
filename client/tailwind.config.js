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
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(to bottom right, #2563eb, #172554)', // from-blue-600 to-blue-950
        'gradient-blue-hover': 'linear-gradient(to bottom right, #2563eb, #1e3a8a)',
        'radial-grad': 'radial-gradient(var(--tw-gradient-stops))',
        'conic-grad': 'conic-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}