import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        baseDark: "#0B1624",
        baseDarkSecondary: "#111E2D",
        lightBg: "#F5F0E8",
        lightCard: "#EEE8DF",
        textPrimary: "#0B1624",
        textSecondary: "#4F5D6E",
        accent: "#BF7F3D"
      }
    }
  },
  plugins: []
};

export default config;
