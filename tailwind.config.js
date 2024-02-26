/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "l-text-primary": "#000000",
        "l-text-secondary": "#666666",
        "l-bg-primary": "#fafafa",
        "l-bg-secondary": "#f2f2f2",
        "d-text-primary": "#ffffff",
        "d-text-secondary": "#858585",
        "d-bg-primary": "#111111",
        "d-bg-secondary": "#222222",
        "l-border": "#ebebeb",
        "d-border": "#333333",
        accent: "#ffbb55",
        "accent-fade": "#F3B251",
        error: "rgb(239 68 68)",
      },
    },
  },
  plugins: [],
};
