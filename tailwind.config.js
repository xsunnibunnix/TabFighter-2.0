/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          'primary': "rgb(195, 0, 255)",
          'primary-focus': "#edb1ff",
          'primary-content': "rgb(255,255,255)",
          'secondary': "#f9e6ff",
          'neutral': "rgb(0,0,0)",
          'base-100': "rgb(255,255,255)"
        },
      },
      {
        dark: {
          'primary': "rgb(195, 0, 255)",
          'primary-focus': "#db63ff",
          'primary-content': "rgb(255,255,255)",
          'secondary': "#111519",
          'neutral': "rgb(255,255,255)",
          'base-100': "#191e24"
        },
      }
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
  }
}