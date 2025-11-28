import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f6f7fb",
        cloud: "#ffffff",
        ink: "#081226",
        graphite: "#1f2937",
        soft: "#5f6b7d",
        accent: "#1d4ed8",
        accentSoft: "#e0ecff"
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)"],
        mono: ["var(--font-space-mono)"]
      },
      maxWidth: {
        wrapper: "1100px"
      },
      boxShadow: {
        card: "0 30px 80px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};

export default config;

