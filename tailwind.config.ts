import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "560px",
      md: "900px",
      lg: "1160px",
    },
    extend: {
      colors: {
        bg: "#060907",
        ink: "#F2F5F3",
        muted: "#8A938D",
        faint: "#565E58",
        green: "#CBF000",
        mint: "#B7F4D0",
        blue: "#4C8DFF",
        hair: "rgba(255,255,255,.08)",
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        num: ["var(--font-space-grotesk)", "monospace"],
        logo: ["var(--font-quicksand)", "sans-serif"],
      },
      maxWidth: {
        wrap: "1160px",
      },
      transitionTimingFunction: {
        curve: "cubic-bezier(.6,0,.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
