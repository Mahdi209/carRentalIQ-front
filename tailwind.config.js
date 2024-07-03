/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        home: ["Crimson Text", "serif"],
      },
      colors: {
        primary: "#15122A",
        secondary: "#FFC107",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
