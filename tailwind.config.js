/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#f9a06f",
          secondary: "teal",
          "background-color": "#fff4ed",
        },
      },
      {
        synthwave: {
          ...require("daisyui/src/theming/themes")["synthwave"],
          primary: "#f9a06f",
          secondary: "teal",
          "background-color": "#1a103d",
        },
      },
    ],
  },
  darkMode: "class",
};
