// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tinaDirective from "./astro-tina-directive/register"
import redirects from "./_redirects.mjs";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || `https://fontaines-garonne.fr/`,
  integrations: [
    mdx(),
    sitemap(),
    react({
      experimentalReactChildren: true,
    }),
    tinaDirective(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects,
});
