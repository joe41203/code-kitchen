import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import { defineConfig } from "astro/config";
import serviceWorker from "astrojs-service-worker";
import iconData from "./public/icons/icons.json";
import { remarkMermaid } from "./remark-mermaid.mjs";


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
    serviceWorker({
      workbox: {
        inlineWorkboxRuntime: true,
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg}'],
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
    webmanifest({
      name: "CodeKitchen",
      short_name: "CodeKitchen",
      description: "CodeKitchen",
      start_url: "https://code-kitchen.tech/",
      theme_color: "#f4f4ff",
      background_color: "#f4f4ff",
      display: "standalone",
      icons: iconData["icons"],
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
