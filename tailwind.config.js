// tailwind.config.js
module.exports = {
    darkMode: 'class', // Enables dark mode via class
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}", // in case you use /app folder
    ],
    theme: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
        },
        fontFamily: {
          sans: ["var(--font-sans)", "sans-serif"],
          mono: ["var(--font-mono)", "monospace"],
        },
      },
    },
    plugins: [],
  };
  