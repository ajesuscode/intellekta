/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                intelekta: {
                    primary: "#059669",
                    secondary: "#bf95f9",
                    accent: "#ffb86b",
                    neutral: "#414558",
                    "base-100": "#272935",
                    info: "#8be8fd",
                    success: "#52fa7c",
                    warning: "#f1fa89",
                    error: "#ff5757",
                },
            },
            "dracula",
        ],
    },
};
