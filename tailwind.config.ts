import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        ink: {
          50: "#faf9f7",
          100: "#f0eeea",
          200: "#e0dcd4",
          300: "#c9c2b5",
          400: "#a89f8c",
          500: "#8a806e",
          600: "#6b6355",
          700: "#4f4a40",
          800: "#36332c",
          900: "#1f1d1a",
          950: "#0f0e0d",
        },
        accent: {
          DEFAULT: "#2d5a4a",
          muted: "#4a7d6a",
          fg: "#e8f2ed",
        },
      },
    },
  },
  plugins: [],
};

export default config;
