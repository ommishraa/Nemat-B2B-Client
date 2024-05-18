/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roxboroughnormal: ["Roxborough CF Bold", "serif"],
        roxborough: ["Roxborough  CF Thin"],
        Marcellus: ["Marcellus"],
        Abel: ["Abel, sans-serif"],
        roxboroughnormal2: ["Roxborough CF Bold"],
      },
      fontWeight: {
        mid_semi: "520",
      },
      colors: {
        bg_green: "#60713a",
        text_Color2: "#60713A",
        text_Color: "#642F29",
        light_Green: "#8FA75B",
        Cream: "#FEEEE2",
        LightCream: "#FFFBF0",
        CartRightColor: "#F6F5F0",
        borderColorBeige: "#C28E5E",
        hoverBGGreen: "#425711",
      },
      screens: {
        mobile: "220px",
      },
      borderRadius: {
        iFull: "9999px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".custom-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".custom-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    require("tailwind-scrollbar"),
  ],
};
