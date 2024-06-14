/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'dark',
  theme: {
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulse: {
          '50%': {
            opacity: 0.1,
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        pulse: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // colors: {},
    },
  },
  plugins: [],
};
