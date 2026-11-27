// Renders brand rasters from scripts/brand/*.svg|html into public/.
// Run: PLAYWRIGHT=<path to playwright> node scripts/brand/render.mjs  (defaults to the installed 'playwright' package)
import { pathToFileURL, fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
const pw = await import(process.env.PLAYWRIGHT ? pathToFileURL(process.env.PLAYWRIGHT).href : 'playwright');
const { chromium } = pw.default ?? pw;
const dir = new URL('.', import.meta.url);
const pub = new URL('../../public/', import.meta.url);
const mark = readFileSync(new URL('mark.svg', dir), 'utf8');
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL }); // e.g. PW_CHANNEL=msedge to use an installed browser
const page = await browser.newPage();
// App icons: mark on a steel square with safe padding (maskable-safe at 512).
for (const [file, size, pad] of [['apple-touch-icon.png', 180, 18], ['icon-192.png', 192, 20], ['icon-512.png', 512, 72]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<body style="margin:0;background:#e6e9e8;display:grid;place-items:center;width:${size}px;height:${size}px">${mark.replace('<svg ', `<svg width="${size - pad * 2}" height="${size - pad * 2}" `)}</body>`);
  await page.screenshot({ path: fileURLToPath(new URL(file, pub)) });
}
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto(new URL('og.html', dir).href);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: fileURLToPath(new URL('og-default.png', pub)) });
await browser.close();
console.log('brand rasters written to public/');
