import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4f6f2",
        ink: "#141a17",
        accent: "#245c4a"
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-source-serif)", "serif"],
        ui: ["var(--font-sora)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
