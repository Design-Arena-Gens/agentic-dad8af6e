import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0f172a",
        dawn: "#fecd1a",
        slate: {
          950: "#020617"
        }
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui"],
        body: ["var(--font-inter)", "system-ui"]
      },
      boxShadow: {
        soft: "0 24px 48px -24px rgba(15, 23, 42, 0.3)"
      }
    }
  },
  plugins: []
};

export default config;
