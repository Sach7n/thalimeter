import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { writeFileSync } from 'node:fs';

// Cloudflare adds missing trailing slashes with a 307; search engines want a permanent 301.
const slashRedirects = {
  name: 'slash-redirects',
  hooks: {
    'astro:build:done': ({ dir, pages }) => {
      const rules = pages.map((p) => '/' + p.pathname).filter((p) => p.length > 1 && p.endsWith('/') && !/^\/(404|500)\/$/.test(p))
        .map((p) => `${p.slice(0, -1)} ${p} 301`);
      writeFileSync(new URL('_redirects', dir), rules.join('\n') + '\n');
    },
  },
};

const TOOL_PAGES = ['/rice-calculator/', '/rice-to-water-ratio/', '/uncooked-to-cooked-rice/', '/pasta-calculator/', '/meat-per-person-calculator/'];

export default defineConfig({
  site: 'https://thalimeter.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    react(),
    slashRedirects,
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
