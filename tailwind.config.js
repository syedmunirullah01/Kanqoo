// tailwind.config.js
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        bg: "var(--color-bg)",
        white: "var(--color-white)",
        // optional aliases if you want rgb-based colors:
        "primary-rgb": "rgb(var(--primary))",
        "secondary-rgb": "rgb(var(--secondary))",
      },
      fontFamily: {
        sans: ["Encode Sans", "system-ui", "sans-serif"],
        unbounded: ["Unbounded", "sans-serif"],
      },
    },
  },
  plugins: [],
}