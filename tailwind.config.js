const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      red: {
        500: "#DC4646",
      },
      blue: {
        500: "#2691CD",
      },
      green: {
        500: "#4EC26E",
      },
      yellow: {
        500: "#F39123",
      },
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
      brown: {
        500: "#6A4225",
        600: "#482e1c",
      },
    },
    fontFamily: {
      sans: ["Silkscreen", "sans-serif"],
    },
  },
  plugins: [],
};
