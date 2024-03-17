import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import { defineConfig } from "astro/config";
import serviceWorker from "astrojs-service-worker";
import { remarkMermaid } from "./remark-mermaid.mjs";
import partytown from "@astrojs/partytown";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://code-kitchen.tech",
  integrations: [mdx(), sitemap(), tailwind(), robotsTxt(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), serviceWorker(), webmanifest({
    name: 'CodeKitchen',
    icon: '/public/images/profile.webp',
    short_name: 'CodeKitchen',
    description: 'CodeKitchen',
    start_url: 'https://code-kitchen.tech/',
    theme_color: '#f4f4ff',
    background_color: '#f4f4ff',
    display: "standalone"
  }), compress()],
  base: "/",
  trailingSlash: "ignore",
  markdown: {
    remarkPlugins: [remarkMermaid],
    shikiConfig: {
      theme: "github-dark",
      langs: [],
      wrap: false
    }
  }
});