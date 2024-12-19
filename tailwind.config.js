const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "background-shade": "var(--color-background-shade)",
        text: "var(--color-text)",
        "text-shade": "var(--color-text-shade)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
    },
  },
  darkMode: "class",
 plugins: [nextui()],
  i18n: {
    defaultLocale: 'en', // Idioma por defecto  
    locales: ['es', 'en'], // Lista de idiomas disponibles
  },
};
