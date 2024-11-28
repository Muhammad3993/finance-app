/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        "6": "6px",
        "22": "22px",
        "190": "190px"
      },
      gap: {
        "61": "6px"
      },
      borderRadius: {
        "7": "7px",
        "10": "10px",
        "20": "20px",
        "22": "22px",
        "25": "25px",
        "50": "50px",
      },
      fontFamily: {
        "unbounded": ["Unbounded", "sans-serif"],
      },
      fontSize: {
        "8": "8px",
        "9": "9px",
        "10": "10px",
        "11": "11px",
        "13": "13px",
        "15": "15px",
        "22": "22px",
        "25": "25px",
        "28": "28px",
        "32": "32px",
      },
      colors: {
        "customGray": "#EFEFEF",
        "customGray1": "rgba(128, 128, 128, 0.55)",
        "customGray2": "#404040",
        "customGray3": "#D9D9D9",
        "customGray4": "#CECECE",
        "customGray5": "rgba(206, 206, 206, 0.5)",
        "customGray6": "rgba(64, 64, 64, 0.12)",
        "customGray7": "rgba(64, 64, 64, 0.25)",
        "customGray8": "#F2F2F7",
        "customGray9": "rgba(64, 64, 64, 0.5)",
        "customGray10": "rgba(64, 64, 64, 0.3)",
        "customGray11": "#989CB0",
        "customBlack": "#0F0F0F",
        "customBlue": "#3634A3"
      },
      height: {
        "9": "9px",
        "44px": "44px",
        "54": "54px",
        "57": "57px",
        "60px": "60px",
        "66": "66px",
        "68": "68px",
        "74": "74px",
        "82": "82px",
        "180": "180px",
        "249": "249px",
      },
      width: {
        "44px": "44px",
        "60p": "60%",
        "60px": "60px",
        "66": "66px",
        "68": "68px",
        "84": "84px",
      },
      margin: {
        "18": "18px",
      },
      boxShadow: {
        "customshadow": "0px 4px 16px 0px rgba(0, 0, 0, 0.4)"
      },
      screens: {
        "390": "390px"
      }
    },
  },
  plugins: [],
}