// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tinaDirective from "./astro-tina-directive/register"

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || `https://fontainesgaronne.github.io/`,
	integrations: [mdx(), sitemap(), react({
		experimentalReactChildren: true,
	}), tinaDirective()],
	vite: {
    plugins: [tailwindcss()],
  },	
});
