module.exports = {
  content: ["./views/**/*.ejs", "./public/scripts/*.js"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#fdfdfd",
        whiteGradient: "rgba(255, 255, 255, 0.833)",
        whiteGradientClear: "rgba(255, 255, 255, 0.7)",
      },
    },
  },
  plugins: [],
};
