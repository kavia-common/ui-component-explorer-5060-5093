/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#F59E0B",
        success: "#F59E0B",
        error: "#EF4444",
        background: "#f9fafb",
        surface: "#ffffff",
        text: "#111827"
      },
      backgroundImage: {
        // legacy subtle bg
        "ocean-gradient": "linear-gradient(135deg, rgba(59,130,246,0.10), #f9fafb)",
        // new app background gradient (bg-app)
        "app-gradient": "linear-gradient(87deg, #95bff0 20%, #ac7de9 80%)",
        // new main accent gradient (main color)
        "main-gradient": "linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)"
      }
    }
  },
  plugins: []
};
