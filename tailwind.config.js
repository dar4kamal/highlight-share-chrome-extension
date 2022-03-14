module.exports = {
  content: ["./src/**/*.html", "./src/**/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "425px",
      },
      colors: {
        primary: "#101C2F",
        secondary: "#EDDEC0",
        error: {
          dark: "#dc2626",
          light: "#f87171",
        },
        action: {
          dark: "#07635D",
          light: "#51918d",
          lighter: "#19C8BC",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
