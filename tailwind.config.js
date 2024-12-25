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
        "10p": "10px",
        "22": "22px",
        "24": "24px",
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
        "35": "35px",
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
        "18": "18px",
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
        "customBlack50": "rgba(0, 0, 0, .5)",
        "1B1A1E-50": "rgba(27, 26, 30, 0.5)",
        "1B1A1E-80": "rgba(27, 26, 30, 0.8)",
        "1B1A1E-100": "rgba(27, 26, 30, 1)",
        "FFFFFF-8": "rgba(255, 255, 255, 0.08)",
        "FFFFFF-15": "rgba(255, 255, 255, 0.15)",
        "FFFFFF-25": "rgba(255, 255, 255, 0.25)",
        "FFFFFF-50": "rgba(255, 255, 255, 0.5)",
        "FFFFFF-80": "rgba(255, 255, 255, 0.8)",
        "00BF33": "rgba(0, 191, 51, 1)",
        "00BF33-12": "rgba(0, 191, 51, .12)",
        "FAC21C-12": "rgba(250, 194, 28, 0.12)",
        "customBlue": "#3634A3"
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(to bottom, rgba(0, 191, 51, 1), rgba(0, 19, 5, 1))',
      },
      height: {
        "9": "9px",
        "34": "34px",
        "44px": "44px",
        "54": "54px",
        "57": "57px",
        "60px": "60px",
        "66": "66px",
        "68": "68px",
        "73": "73px",
        "74": "74px",
        "76": "76px",
        "82": "82px",
        "180": "180px",
        "220": "220px",
        "240": "240px",
        "249": "249px",
        "280": "280px",
        "300": "300px",
        "342": "342px",
      },
      width: {
        "44px": "44px",
        "52": "52px",
        "54": "54px",
        "60p": "60%",
        "60px": "60px",
        "66": "66px",
        "68": "68px",
        "76": "76px",
        "84": "84px",
        "116": "116px",
        "220": "220px",
        "240": "240px",
        "280": "280px",
        "300": "300px",
      },
      margin: {
        "6": "6px",
        "18": "18px",
        "24": "24px",
        "111": "111px",
      },
      boxShadow: {
        "customshadow": "0px 4px 16px 0px rgba(0, 0, 0, 0.4)",
        "swipe_box": "0px 6px 12px 0px rgba(0, 0, 0, 0.08)",
        "navigate_shadow": "0px 0px 25px -2px rgba(0, 191, 51, 0.5)",
        "green-shadow": "0px 8px 24px 0px rgba(0, 191, 51, 0.25)"
      },
      backdropBlur: {
        "50": "50px"
      },
      lineHeight: {
        "14": "14px",
        "22": "22px",
        "34": "34px",
      },
      screens: {
        "390": "390px"
      }
    },
  },
  plugins: [],
}