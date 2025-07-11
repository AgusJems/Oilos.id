module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
          primary:"#00976e",
          secondary:"#28a745",
          smgreen:"#f0fff6",
          dark:"#111111",
          gdone:"#D5B400",
          gdtwo:"#FFD971",
          lightgreen:"#58CE93",
          footer:"#124f31",
        },
        container: {
          center: true,
          padding: {
            DEFAULT: "1rem",
            sm: "3rem",
        }
      },
    },
  },
  plugins: [],
};
