/**
 * Tailwind configuration for the UI component explorer.
 *
 * Preline integration notes:
 * - Use the official plugin from 'preline/plugin' (or 'preline/plugin.cjs' for older versions).
 * - Ensure Tailwind scans compiled JS in node_modules to pick up Preline class usage.
 * - Do NOT reference 'preline/src' or any TS paths; CRA/Webpack doesn't transpile TS in dependencies.
 */
/** @type {import('tailwindcss').Config} */
const prelinePlugin = (() => {
  try {
    // Preferred entry for Preline v3+
    // eslint-disable-next-line global-require
    return require('preline/plugin');
  } catch {
    try {
      // Fallback for environments where CJS export is required
      // eslint-disable-next-line global-require
      return require('preline/plugin.cjs');
    } catch {
      return null;
    }
  }
})();

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Include compiled JS files from Preline; this avoids scanning TS sources or d.ts.
    "./node_modules/preline/**/*.js"
  ],
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
  plugins: [
    ...(prelinePlugin ? [prelinePlugin] : [])
  ]
};
