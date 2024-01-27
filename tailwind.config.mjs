/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/preline/preline.js',],
	theme: {
		colors: {
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
		extend: {
			colors: {
			}
		},
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
	plugins: [require("daisyui"), require('preline/plugin'),require('@tailwindcss/typography')],
});
