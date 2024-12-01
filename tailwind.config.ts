
import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from 'tailwindcss';
import flowbitePlugin from "flowbite/plugin";
export default {
  content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
	darkMode: "selector",

	theme: {
		extend: {
			fontFamily: {
				sans: ["Sora", ...defaultTheme.fontFamily.sans],
			},
colors: {// flowbite-svelte

  primary: {
    "50": "#fef2e0",
    "100": "#fedeb1",
    "200": "#fcc97f",
    "300": "#fbb24d",
    "400": "#faa227",
    "500": "#ebbe4d",
    "600": "#f58606",
    "700": "#BA8E23",
    "800": "#6e5415",
    "900": "#df4c05",
  },

},
},
},

  plugins: [flowbitePlugin],
} satisfies Config;
