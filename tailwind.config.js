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
    maxWidth: {
      48: "12rem",
    },
    extend: {
      zIndex: {
        "-1": "-1",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
}
