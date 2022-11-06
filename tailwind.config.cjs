/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "brand":{
          DEFAULT:"#2C2C38",
          "dark":"#21212D"
        },
        "primary":{
          DEFAULT:"#645FC6",
          "light":"#A8A4FF"
        },
        "secondary":{
          DEFAULT: "#828FA3"
        },
        "border": {
          DEFAULT: "#3E3F4E"
        }
      }
    },
  },
  plugins: [],
}
