import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      crollSnapType: {
        y: 'y mandatory',
      },
      zIndex: {
        '-10': '-10',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        backgroundColor:"#FFF9E9",
        primaryYellow: "#FFC629",
        lightYello:"#F9D689",
        green: "#33775A",
        lavender: "#9975C1",
        blue: "#B5DDEA",
        goldLight: "#FFE7CC",
        goldDark: "#FFDBB3",
        black: "#000000",
        darkGray: "#393938",
        goldFont:"#95742E",
        lightGray: "#B2B2B2",
        lightGreen:"#C7FFC7",
        white: "#FFFFFF",
        bgColor: "#FFFCF4",
        tranparent: "transparent",
        gradientStart: '#C33764',
        gradientEnd: '#1D2671',
      },
      fontFamily: {
        sans: ["normalFont", "sans-serif"],
        lightFont: ["lightFont"],
        boldFont: ["boldFont"],
        mediumFont: ["mediumFont"],
        normalFont: ["normalFont"],
        heavyFont: ["heavyFont"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1.0rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3.0rem",
        "6xl": "4.0rem",
        "7xl": "5.0rem",
        "8xl": "6.0rem",
        "9xl": "8.0rem",
      },
      boxShadow: {
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      textShadow: {
        md: '0 1px 3px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0.5'},
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0'},
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.7s ease-out forwards',
        fadeIn: 'fadeIn 0.7s ease-out forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        '.text-shadow-md': {
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
export default config;
