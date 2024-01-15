/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {

					"primary": "#6a012d",

					"secondary": "#4f0020",

					"accent": "#830035",

					"neutral": "#4f0020",

					"base-100": "#fee5f4",

					"info": "#ffffff",

					"success": "#830035",

					"warning": "#ffffff",

					"error": "#ffffff",
				},
			},
		],
	},
	plugins: [require("daisyui")],
}
