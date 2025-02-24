/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        dividergray: "rgba(172, 172, 172, 0.2)",
        sideBarBgColor: "#f5f6fa",
        sideBarBgColorDark: "rgb(30, 30, 30)",
        layoutBgColor: "#F2F4F9",
        layoutBgDarkColor: "rgb(20, 20, 20)",
        relevantDark: "#3f3f3f",
        successColor: "#44bd32",
        primaryColor: {
          50: "#edf9ff",
          100: "#d7f1ff",
          200: "#b9e8ff",
          300: "#88dbff",
          400: "#50c5ff",
          500: "#28a7ff",
          600: "#1e90ff",
          700: "#0a71eb",
          800: "#0f5abe",
          900: "#134e95",
          950: "#11305a",
        },
      },
    },
  },
  plugins: [],
};
