/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {
        "banner-clip-right":
          "polygon(100% 0, 11% 0, 8% 18%, 0 70%, 0 100%, 100% 100%)",
        "banner-clip-left":
          "polygon(0 0, 89% 0, 91% 13%, 100% 68%, 100% 100%, 0 100%)",
      },
    },
  },
  plugins: [],
};
