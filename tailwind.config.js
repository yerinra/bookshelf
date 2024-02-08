/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "l-text-primary": "#000000",
      "l-text-secondary": "#666666",
      "l-bg-primary": "#fafafa",
      "l-bg-secondary": "#eaeaea",
      "d-text-primary": "#ffffff",
      "d-text-secondary": "#858585",
      "d-bg-primary": "#111111",
      "d-bg-secondary": "#222222",
      "l-border": "#eaeaea",
      "d-border": "#333333",
      accent: "#ffbb55",
    },
  },
  plugins: [],
};
