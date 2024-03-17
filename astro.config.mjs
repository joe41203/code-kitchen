import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';
import { remarkMermaid } from "./remark-mermaid.mjs";
import robotsTxt from "astro-robots-txt";
import compress from "astro-compress";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://code-kitchen.pages.dev',
  integrations: [mdx(), sitemap(), tailwind(), robotsTxt(), compress(), partytown()],
  base: '/',
  trailingSlash: "ignore",
  markdown: {
    remarkPlugins: [remarkMermaid],
    shikiConfig: {
      theme: 'github-dark',
      langs: [],
      wrap: false
    }
  }
});