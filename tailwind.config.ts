import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        rotate: {
          '0%': {
            transform: 'translate3d(-50%, 0, 0) rotate3d(0, 1, 0, -45deg) scale(0.5)',
            opacity: '0.25',
          },
          '35%': { transform: 'translate3d(0, 0, 0) rotate3d(0, 1, 0, -40deg) scale(0.75)' },
          '50%': {
            transform: 'translate3d(0, 0, 1em) rotate3d(0, 1, 0, 0) scale(1)',
            opacity: '1',
          },
          '65%': { transform: 'translate3d(0, 0, 0) rotate3d(0, 1, 0, 40deg) scale(0.75)' },
          '100%': {
            transform: 'translate3d(50%, 0, 0) rotate3d(0, 1, 0, 45deg) scale(0.5)',
            opacity: '0.25',
          },
        },
        adjustZIndex: {
          '0%, 100%': { zIndex: 1 },
          '50%': { zIndex: 100 },
        },
      },
      animation: {
        rotate: 'rotate 2s linear both',
        adjustZIndex: 'adjustZIndex 2s linear both',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
