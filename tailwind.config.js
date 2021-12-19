module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    fontFamily: {
      sans: ["Inter var", "system-ui", "sans-serif"],
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
