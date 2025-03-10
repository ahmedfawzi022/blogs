/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b49df',
        'primary-dark': '#2f3ab2',
        'header-bg':'#F9F5FF'
      }
    },
  },
  plugins: [],
}