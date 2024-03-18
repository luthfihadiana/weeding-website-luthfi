import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily:{
      "display": ["Plus Jakarta Sans, sans-serif"],
      "arabic": ["Noto Naskh Arabic, serif"],
      "aesthetic": ["Sofia, cursive"]
    },
    extend: {
      backgroundImage: {
        "gradient-red": "linear-gradient(to right, #ff416c, #ff4b2b)",
        "gradient-blue": "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)",
        "ornament-1": "url('/images/ornament-1.png')",
        "ornament-3": "url('/images/ornament-3.png')",
      },
      colors: {
        "primary": {
          light: "#5B97BE",
          DEFAULT: "#1B418C",
          dark: "#244E74"
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config