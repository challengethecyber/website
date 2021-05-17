const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx"],
  darkMode: false,
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    fontFamily: {
      sans: ["Inter var", "system-ui", "sans-serif"],
    },
    colors: {
      ...colors,
      transparent: "transparent",
    },
    extend: {
      zIndex: {
        "-1": "-1",
      },
      maxWidth: {
        48: "12rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
}
