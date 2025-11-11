/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dark"], // optional, keeps consistent dark theme
  },
};
