module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'about': "url('/about-background.jpg')",
        'leaderboard': "url('/leaderboard.jpg')",
        'girl': "url('/bored-girl.png')",
        'woman': "url('/businessWoman.png')",
      },
      fontFamily: {
        'retro': ['Press Start 2P', 'system-ui', 'sans-serif'],
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

