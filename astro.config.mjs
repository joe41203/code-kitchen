import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import { remarkMermaid } from "./remark-mermaid.mjs";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://code-kitchen.tech",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    robotsTxt(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  base: "/",
  trailingSlash: "ignore",
  markdown: {
    remarkPlugins: [remarkMermaid],
    shikiConfig: {
      theme: "github-dark",
      langs: [],
      wrap: false,
    },
  },
});
