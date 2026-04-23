/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          500: '#4e6cf5',
          600: '#3f5ae0',
        },
      },
      boxShadow: {
        panel: '0 10px 30px rgba(32, 50, 89, 0.06)',
      },
      borderRadius: {
        panel: '16px',
      },
    },
  },
  plugins: [],
}
