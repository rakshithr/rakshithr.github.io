/** Tailwind 2.x (PostCSS 7 compat for CRA 4) */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        story: {
          bg: "#080706",
          surface: "rgba(20, 18, 16, 0.65)",
          text: "#f2ebe3",
          muted: "#8e8a85",
          cyan: "#00e5ff",
          amber: "#ff9e2c",
          emerald: "#10b981",
          panel: "#0c0b0a",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        serif: ["Source Sans Pro", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        beam: "0 0 40px rgba(0, 229, 255, 0.12)",
        amber: "0 0 32px rgba(255, 158, 44, 0.2)",
      },
      keyframes: {
        slideInRight: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.3s ease-out",
        fadeUp: "fadeUp 0.65s ease-out forwards",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
