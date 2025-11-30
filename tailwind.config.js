/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkbg: "#0a0a0a",
        darkcard: "#121212",
        darkborder: "#222",
        primary: "#3b82f6",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        }
      },
      animation: {
        marquee: "marquee 15s linear infinite",
        fadein: "fadein 1.2s ease-out",
      },
      boxShadow: {
        neon: "0 0 20px rgba(59, 130, 246, 0.4)",
      },
    },
  },
  plugins: [],
};
