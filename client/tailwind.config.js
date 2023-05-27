/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141414",
        secondary: "#181818",
        tertiary: "#272828",

        "primary-base": "#9c88ff",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
  },
  important: true,
  safelist: [
    "border-yellow-600",
    "border-green-600",
    "border-red-600",
    "border-yellow-400",
    "border-primary-base",
  ],

  plugins: [],
};
