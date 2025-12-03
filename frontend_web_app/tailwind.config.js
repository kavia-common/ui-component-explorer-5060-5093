 /** @type {import('tailwindcss').Config} */
const prelinePlugin = (() => {
  try {
    return require('preline/plugin');
  } catch {
    try {
      return require('preline/plugin.cjs');
    } catch {
      return null;
    }
  }
})();

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/preline/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#F59E0B',
        success: '#F59E0B',
        error: '#EF4444',
        background: '#f9fafb',
        surface: '#ffffff',
        text: '#111827'
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, rgba(59,130,246,0.10), #f9fafb)',
        'app-gradient': 'linear-gradient(87deg, #95bff0 20%, #ac7de9 80%)',
        'main-gradient': 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a 100%)'
      }
    }
  },
  plugins: [
    ...(prelinePlugin ? [prelinePlugin] : [])
  ]
};
