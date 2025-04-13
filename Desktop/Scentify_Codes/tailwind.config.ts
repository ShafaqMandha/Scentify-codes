import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-lora)", "serif"],
        ui: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Nature-inspired palette
        "ivory-sand": "#F6EEE3",
        "sage-green": "#A3B18A",
        "dark-forest": "#1B3A2B",
        "warm-brown": "#8B5E3B",
        "deep-moss": "#1A1A1A",
        "muted-olive": "#C8C6A7",
        "soft-beige": "#EDE0D4",
        "espresso-brown": "#3D2C1D",

        // Extended green palette
        "leaf-green": "#5F8D4E",
        "forest-green": "#2C5E1A",
        "moss-green": "#8A9A5B",
        eucalyptus: "#44A08D",
        "fern-green": "#4F7942",
        "mint-green": "#98C9A3",
        "olive-drab": "#6B8E23",
        avocado: "#568203",

        // Sustainable accent colors
        "recycled-paper": "#D4C8B0",
        bamboo: "#B8C99D",
        "natural-cotton": "#F4F1DE",
        terracotta: "#C97C5D",
        "earth-clay": "#B56B45",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "leaf-pattern": "url('/patterns/leaf-pattern.svg')",
        "eco-texture": "url('/patterns/eco-texture.svg')",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: ".1em",
        "extra-wide": ".15em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

