/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        "190": "190px"
      },
      fontFamily: {
        "unbounded": ["Unbounded", "sans-serif"],
      },
      fontSize: {
        "22": "22px",
        "28": "28px"
      },
      colors: {
        "customGray": "#EFEFEF",
        "customGray1": "rgba(128, 128, 128, 0.55)"
      },
      height: {
        "54": "54px"
      },
      width: {
        "60p": "60%"
      }
    },
  },
  plugins: [],
}