module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'about': "url('/about-background.jpg')",
        'leaderboard': "url('/leaderboard.jpg')",
        'girl': "url('/bored-girl.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

