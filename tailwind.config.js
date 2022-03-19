module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

      animation: {
        fade: 'fadeIn 1s ease',
      },
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%':  { opacity: 1 },
        },
      }),

      screens: {
        "sm": "500px",
        'md': '750px',
        'lg': "1000px",
        '2xl':"1250px"
      },
      colors: {
        'github': '#24292F'
      },
      fontFamily: {
        body: ['Pushster'],
        footer: ['Tinos']

      }
    },
  },

  variants: {
    extend: {},
  },
  plugins: [
  ]
}
