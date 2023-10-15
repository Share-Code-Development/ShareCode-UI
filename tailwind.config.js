/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", {
      shareCode: {
        "primary": "#04a08e",
        "secondary": "#619bbf",
        "accent": "#5f62ce",
        "neutral": "#293138",
        "base-100": "#1f2937",
        "info": "#5392d5",
        "success": "#42e082",
        "warning": "#a9860a",
        "error": "#e86d69",
      },
    }],
  },
}
