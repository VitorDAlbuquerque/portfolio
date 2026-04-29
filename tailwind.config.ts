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
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
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
        frieren: {
          base: "#0B1210",
          surface: "#0E1812",
          deep: "#080F0A",
          overlay: "#060907",

          border: "#1A2418",
          "border-md": "#243A22",
          "border-lg": "#3A5A38",

          text: "#C4D0C8",
          "text-md": "#6A8070",
          "text-sm": "#3A5040",
          "text-muted": "#203020",

          green: "#5A8A58",
          "green-md": "#3A5A38",
          "green-dim": "#243A22",
          "green-deep": "#0E1A0C",

          purple: "#8A7AAE",
          "purple-md": "#6A5A8A",
          "purple-dim": "#2E2248",
          "purple-deep": "#180E28",

          amber: "#B87840",
          "amber-md": "#8A5828",
          "amber-dim": "#3A2010",
          "amber-deep": "#140C04",

          mist: "#8AB4A0",
          "mist-dim": "#2A4038",
        },
      },
    },
  },
  plugins: [],
};

export default config;
