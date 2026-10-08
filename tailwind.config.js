/** @type {import('tailwindcss').Config} */
module.exports = {
  // tailwind looks for class names in these files
  content: ["./index.html", "./scripts/*.js"],
  theme: {
    extend: {
      // names -> css variables from style.css
      colors: {
        bg: "var(--bg)",
        pane: "var(--pane)",
        bar: "var(--bar)",
        ink: "var(--ink)",
        mute: "var(--mute)",
        line: "var(--line)",
        acc: "var(--acc)",
        accink: "var(--accink)",
      },
      fontFamily: {
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      keyframes: { blink: { "50%": { opacity: "0" } } },
      animation: { blink: "blink 1s steps(2) infinite" },
    },
  },
  plugins: [],
};
