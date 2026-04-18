import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B35",
        secondary: "#4ECDC4",
        accent: "#FFE66D",
        space: "#1A1A2E",
        portal: "#0a0a2e",
        cream: "#FFF9F0",
        ink: "#2D2D2D",
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "space-hero":
          "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(255,107,53,0.18), transparent 55%), radial-gradient(ellipse 90% 60% at 80% 20%, rgba(78,205,196,0.16), transparent 50%), radial-gradient(ellipse 70% 50% at 10% 40%, rgba(255,230,109,0.12), transparent 45%)",
      },
    },
  },
  plugins: [],
};
export default config;
