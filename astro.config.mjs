import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';
import { remarkDiagram } from "./remark-diagram.mjs";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: 'https://code-kitchen.pages.dev',
  integrations: [mdx(), sitemap(), tailwind(), robotsTxt()],
  base: '/',
  markdown: {
    remarkPlugins: [remarkDiagram],
    shikiConfig: {
      theme: 'dracula',
      langs: [],
      wrap: false,
    },
  }
});
