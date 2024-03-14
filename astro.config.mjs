import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://joe41203.github.io',
  integrations: [mdx(), sitemap(), tailwind()],
  base: '/code-kitchen',
  markdown: {
    syntaxHighlight: 'prism',
  }
});
