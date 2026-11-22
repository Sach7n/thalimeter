import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const TOOL_PAGES = ['/rice-calculator/', '/rice-to-water-ratio/', '/uncooked-to-cooked-rice/', '/pasta-calculator/', '/meat-per-person-calculator/'];

export default defineConfig({
  site: 'https://thalimeter.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !/\/(404|500)(\/|\.html)?$/.test(new URL(page).pathname),
      serialize(item) {
        const path = new URL(item.url).pathname;
        item.lastmod = new Date().toISOString();
        item.changefreq = 'monthly';
        item.priority = path === '/' ? 1.0 : TOOL_PAGES.includes(path) ? 0.9 : /^\/(rice|pasta|meat)\//.test(path) ? 0.7 : 0.3;
        return item;
      },
    }),
  ],
});
