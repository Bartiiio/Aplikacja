/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         boxSizing: {
            borderBox: "border-box",
         },
         fontFamily: {
            serif: ["serif"],
         },
      },
   },
   plugins: [],
};
