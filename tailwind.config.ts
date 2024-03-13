import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-red": "linear-gradient(to right, #ff416c, #ff4b2b)",
        "gradient-blue": "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)"
      },
      colors: {
        "primary": {
          light: "#5B97BE",
          DEFAULT: "#1B418C",
          dark: "#244E74"
        },
      },
    },
    fontFamily:{
      "display": ["Plus Jakarta Sans, sans-serif"],
      "arabic": ["Noto Naskh Arabic, serif"],
      "aesthetic": ["Sofia, cursive"]
    }
  },
  plugins: [],
};
export default config;
