import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          base: "#0B1220",
          surface1: "#101A2E",
          surface2: "#15233F",
          border: "#1E2D4D",
        },
        cobalt: {
          DEFAULT: "#2D5BFF",
          hover: "#4A73FF",
          ring: "#2D5BFF",
        },
        slate: {
          cool: "#5B6B8A",
        },
        green: {
          accent: "#34D399",
        },
        amber: {
          accent: "#F5B544",
        },
        red: {
          accent: "#EF4444",
        },
        text: {
          primary: "#E6EDF7",
          secondary: "#8FA0BF",
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
        display: ['"Inter Tight"', '"IBM Plex Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "12": "0.75rem",
        "13": "0.8125rem",
        "14": "0.875rem",
        "16": "1rem",
        "20": "1.25rem",
        "24": "1.5rem",
        "32": "2rem",
        "44": "2.75rem",
        "56": "3.5rem",
      },
      spacing: {
        "56px": "56px",
        "64px": "64px",
        "240px": "240px",
      },
      borderRadius: {
        "8": "8px",
      },
      maxWidth: {
        "1280": "1280px",
      },
      keyframes: {
        "pulse-live": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "type-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "pulse-live": "pulse-live 2s ease-in-out infinite",
        "slide-in-right": "slide-in-right 250ms ease-out",
        "fade-in": "fade-in 250ms ease-out",
        "type-cursor": "type-cursor 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
