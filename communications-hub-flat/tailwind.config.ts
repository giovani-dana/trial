import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        brand: {
          50: "#eef7ff", 100: "#d9edff", 200: "#bce0ff", 300: "#8eceff", 400: "#59b2ff",
          500: "#2b94f5", 600: "#108ee9", 700: "#0b72c4", 800: "#0f5c9f", 900: "#124e82", 950: "#0b2a4a",
        },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 0 0 1px rgba(11,42,74,.04), 0 1px 2px rgba(11,42,74,.04), 0 6px 20px -10px rgba(11,42,74,.10)",
        lift: "0 2px 4px rgba(11,42,74,.05), 0 20px 40px -16px rgba(16,142,233,.28)",
        glass: "inset 0 1px 0 rgba(255,255,255,.6), 0 8px 32px -8px rgba(11,42,74,.18)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(60% 50% at 50% 0%, rgba(16,142,233,.18) 0%, rgba(16,142,233,0) 70%), radial-gradient(40% 40% at 90% 10%, rgba(142,206,255,.35) 0%, rgba(142,206,255,0) 70%)",
        "brand-gradient": "linear-gradient(135deg, #108ee9 0%, #0b5ca3 100%)",
      },
      keyframes: {
        aurora: { "0%,100%": { transform: "translate3d(0,0,0) scale(1)" }, "33%": { transform: "translate3d(6%,-4%,0) scale(1.1)" }, "66%": { transform: "translate3d(-5%,5%,0) scale(.95)" } },
        shimmer: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
        "pulse-ring": { "0%": { boxShadow: "0 0 0 0 rgba(16,142,233,.45)" }, "100%": { boxShadow: "0 0 0 10px rgba(16,142,233,0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        dots: { "0%,80%,100%": { opacity: ".25" }, "40%": { opacity: "1" } },
      },
      animation: { aurora: "aurora 18s ease-in-out infinite", "aurora-slow": "aurora 26s ease-in-out infinite reverse", shimmer: "shimmer 6s linear infinite", "pulse-ring": "pulse-ring 1.8s ease-out infinite", "accordion-down": "accordion-down .25s ease-out", "accordion-up": "accordion-up .25s ease-out", float: "float 6s ease-in-out infinite", dots: "dots 1.2s infinite" },
    },
  },
  plugins: [animate],
};

export default config;
