/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greenM: "#004643",
        goldenM: "#F9BC60",
        lgreenM: "#ABD1C6",
        redM: "#E16162",
        whiteM: "#EFF0F3",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "background-color": "#004643",
        },
      },
    ],
  },
  darkMode: "class",
};
