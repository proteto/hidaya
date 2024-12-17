/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        ripple: 'ripple 500ms linear'
      },
      keyframes: {
        ripple: {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(4)',
            opacity: '0'
          }
        }
      }
    },
  },
  variants: {
    extend: {}
  },
  plugins: []
};
