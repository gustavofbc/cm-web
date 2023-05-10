module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/styles/**/*.css",
    "./public/**/*.html", // importante para criar tags que vão ser usadas no CMS
  ],

  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        verde: {
          100: "#C9EDE0",
          200: "#98DBC2",
          300: "#6DC8A3",
          500: "#54B784",
          700: "#3E8963",
          800: "#275C42",
          900: "#102E21",
        },
        cinza: {
          300: "#BFBFBF",
          500: "#808080",
          700: "#404040",
          900: "#000",
        },
        roxo: {
          100: "#DCCEE7",
          200: "#B99CD0",
          300: "#976AB9",
          500: "#763AA2",
          700: "#592B7A",
          800: "#3A1D51",
          900: "#1E0F28",
        },
        rosa: {
          100: "#E6C1DD",
          200: "#D185BC",
          300: "#BF4B9B",
          500: "#AD237B",
          700: "#82185C",
          800: "#560C3E",
          900: "#2A031F",
        },
        laranja: {
          100: "#F8E0D1",
          200: "#F2C2A4",
          300: "#ECA577",
          500: "#E7874E",
          700: "#AD653A",
          800: "#734326",
          900: "#3A2113",
        },
        lightGreen: {
          500: "#89DDA2",
          600: "#5CBE8D",
        },
        orange: {
          500: "#ED8F56",
        },
        yellow: {
          400: "#F8CE61",
          500: "#F7CE60",
        },
        purple: {
          500: "#753FA8",
        },
        pink: {
          500: "#B32B7B",
          600: "#C24E7A",
        },
        lightBlue: {
          500: "#6CE8F8",
        },
        radar: {
          500: "#FFBF36",
        },
        hodl: {
          500: "#6CE0A1",
        },
        futuros: {
          500: "#7F37A4",
        },
        altFactor: {
          500: "#18ECFA",
        },
        altseason: {
          500: "#379BC9",
        },
        spot: {
          500: "#BB0A7C",
        },
        estrategias: {
          500: "#F86933",
        },
        vorange: {
          60: "#FFD4BC",
          80: "#FB9258",
          100: "#F5803E",
          800: "#D35109",
          900: "#9B3E0A",
        },
        vgreen: {
          60: "#9FEDD3",
          80: "#2AE7A9",
          100: "#05B97E",
          800: "#009D69",
          900: "#0B7351",
        },
        dark: "#1C1F22",
        panelBackground: "#171B26",
        purple: "#6644FF",
        darkness: "#111",
        darkImage: "#0F1110",
      },
      dropShadow: {
        "cm-logo": "0px 2px 30px rgba(255, 255, 255, 0.25)",
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
        Sora: ["Sora", "sans-serif"],
      },
    },
  },
};
