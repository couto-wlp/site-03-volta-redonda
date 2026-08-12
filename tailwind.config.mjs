/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        base: '17px',
        lg: '17px',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: '#f97316', // Laranja
        secondary: '#3B82F6', // Azul unificado
        accent: '#000000',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
