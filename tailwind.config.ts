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
      md: "800px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // (optional) Custom Colors
        customColor: {
          100: "#b3e6ff",
          300: "#8fdaff",
          500: "#5fcaff",
          700: "#34bbff",
          900: "#00aaff",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
