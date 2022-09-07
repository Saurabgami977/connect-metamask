/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			textColor: {
				skin: {
					base: "var(--color-text-base)",
					inverted: "var(--color-text-inverted)",
				},
			},
		},
	},
	plugins: [],
};
