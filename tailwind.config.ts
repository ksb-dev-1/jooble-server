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
        primary: "var(--primary)",
        light: "var(--light)",
        dark: "var(--dark)",
        hero: "var(--hero-bg)",
        modal: "var(--modal-bg)",
        skeleton: "var(--skeleton)",
        shadow: "var(--card-shadow)",
        text_primary: "var(--text-primary)",
        text_secondary: "var(--text-secondary)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
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
