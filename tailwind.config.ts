import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],

  theme: {
    extend: {
      colors: {
        ...colors,
        primary: "var(--primary-color)",
        light: "var(--light-color)",
        dark: "var(--dark-color)",
        hero: "var(--hero-bg-color)",
        modal: "var(--modal-bg-color)",
        skeleton: "var(--skeleton)",
        shadow: "var(--card-shadow)",
        text: "var(--text-color)",
      },
      borderColor: {
        DEFAULT: "var(--border-color)",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      boxShadow: {
        card: "var(--card-shadow)",
      },
    },
  },
  plugins: [],
};
export default config;
