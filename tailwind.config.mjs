/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,mdx,ts,tsx}'],
  darkMode: "class",
	theme: {
		extend: {},
	},
	plugins: [
    require('@tailwindcss/typography'),
  ],
  purge: {
    enabled: true,
    content: ['./src/**/*.{astro,mdx,ts,tsx}'],
    options: {
      safelist: [],
    },
  },
}
