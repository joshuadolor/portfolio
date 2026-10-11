/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#f5b942",
        dark: "#0a0a0a",
        surface: "#141414",
        "surface-light": "#1c1c1c",
        paper: "#f5f5f5",
        "paper-muted": "#e5e5e5",
        mute: "#7a8499",
        ink: "#0a0a0a",
        stroke: "#8b95a8",
      },
      fontFamily: {
        sans: ["Source Sans 3", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Source Sans 3", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        custom: "999px",
        pill: "999px",
      },
      maxWidth: {
        content: "72rem",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
      lg: "1440px",
    },
  },
  plugins: [],
};
