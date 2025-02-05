import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "400px",
      sm_md: "650px",
      md: "800px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // (optional) Custom Colors
        handcraftedSlate: {
          50: "#e4e5e6",
          100: "#c8cbcc",
          200: "#a0a5a7",
          300: "#787e81",
          400: "#50585c",
          500: "#2B303A", // Base color #2B303A
          600: "#25292f",
          700: "#1e2124",
          800: "#17181a",
          900: "#101010",
          950: "#080808",
        },
        handcraftedBlue: {
          50: "#e6f7fa",
          100: "#cceff4",
          200: "#99dfeb",
          300: "#66cfe1",
          400: "#33bfd8",
          500: "#00afcf", // Base color #92DCE5
          600: "#008fb9",
          700: "#006f92",
          800: "#004f6b",
          900: "#002f44",
          950: "#001f22",
        },
        handcraftedPink: {
          50: "#fbf9fa",
          100: "#f7f3f4",
          200: "#efeaeb",
          300: "#e7e0e2",
          400: "#dfd6d9",
          500: "#d7cdd1", // Base color #EEE5E9
          600: "#b3a7ac",
          700: "#8f8288",
          800: "#6b5e63",
          900: "#47403f",
          950: "#2b2624",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
