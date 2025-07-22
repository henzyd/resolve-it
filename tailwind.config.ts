import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      maxWidth: {
        App: "1300px",
      },
      screens: {
        smallMobile: { max: "320px" },

        mediumMobile: { max: "375px" },

        largeMobile: { max: "425px" },

        largeMobile_545: { max: "545px" },

        tablet_768: { max: "768px" },

        tablet: { max: "900px" },

        largeTabletAndBelow: { max: "1024px" },

        laptopAndAbove: { min: "1024px" },

        largeLaptop: { min: "1440px" },
      },
    },
  },
  plugins: [],
} satisfies Config;
