/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'general_body': '#F5F5F5',
        'principal_container': '#fffff',
        'principal_purple': '#29166F',
        'black_text': '#000000',
        'blue_button_login': '#1E3C72',
        'blue_button_login_hover': '#2A5298',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
