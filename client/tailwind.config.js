/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#1976d2",
        grey: "#eeeeee",
        dark: "#555a57",
      },
    },
  },
  plugins: [],
};
