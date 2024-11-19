export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      mainColor: "#0a6bff",
      secondColor: "#065dd8",
      white: "#ffffff",
      red: "#ff0f0f",
    },
    extend: {
      fontFamily: {
        main: ["Montserrat", "sans-serif"],
        second: ["Lato", "sans-serif"],
        arabic: ["Noto Naskh Arabic", "serif"],
      },
    },
  },
  plugins: [],
};
