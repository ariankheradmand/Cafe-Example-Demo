/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#FEC800",
        primary: "#0f172a",
        secondary: "#1e293b",
        dark: "#020617",
        light: "#f8fafc",
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "Vazirmatn", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        card: "0 7px 20px 0 rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s infinite",
        float: "float 5s ease-in-out infinite",
      },
      backgroundImage: {
        "hero-pattern": "url('/hero-bg.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
