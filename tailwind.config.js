/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Pinkish: "#D8D1D2",
        White: "#ffffff",
        Black: "#000000",
        DarkPink: "#d29da5",
      },
      fontFamily: {
        Monst: ["Montserrat", "sans-serif"],
      },
      screens: {
        sm: "320px",
        lsm: "375px",
        usm: "420px",
        md: "768px",
        lg: "1024px",
        xlg: "1440px",
      },
    },
  },
  plugins: [],
}
