/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark1: '#141414',
        dark2: '#222222',
        dark3: '#3b3b3b',
        dark4: '#636363',
      },
      keyframes: {
        zoomInBounce: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        zoomInBounce: 'zoomInBounce 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },

    },
  },

  plugins: [],
};