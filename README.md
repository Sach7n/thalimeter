# ThaliMeter — cook the right amount

Free kitchen calculators at https://thalimeter.com. Astro 7 (static) + React islands.

## Tools
| Page | What it does |
|---|---|
| `/` and `/rice-calculator/` | Rice per person: uncooked cups / grams / rice-cooker cups, water, cooked yield, pot size, time |
| `/rice-to-water-ratio/` | Water for any amount of 5 rice types × stove / rice cooker / Instant Pot |
| `/uncooked-to-cooked-rice/` | Uncooked ↔ cooked rice, cups or grams |
| `/pasta-calculator/` | Pasta per person, boxes, water, salt, sauce |
| `/meat-per-person-calculator/` | Raw meat to buy for 10 meat types |
| `/rice/for-N-people/`, `/rice/<type>-rice-per-person/`, `/pasta/for-N-people/`, `/meat/<occasion>/` | Static answer pages with charts + the calculator preset |

All maths is in `src/lib/kitchen.ts` (no imports, tested by `scripts/check.ts`). Every assumption is listed on `/how-we-calculate/`.

## Languages
English at the root; Spanish, Italian, French, Greek, Arabic (right-to-left), Turkish and Chinese under `/es/`, `/it/`, `/fr/`, `/el/`, `/ar/`, `/tr/`, `/zh/`. Every word lives in `src/i18n/<lang>.ts`, shaped exactly like `en.ts`; `npm run check` fails if a language is missing a key or a {placeholder}. Pages read their language from the URL; `src/pages/[lang]/` only re-renders the English page files. To change copy, edit `en.ts` and the same key in each language.

## Commands
```
npm install
npm run dev      # http://localhost:4321
npm run check    # maths tests
npm run build    # -> dist/
```

## Deploy (never by hand)
Push to `main` → Cloudflare Workers Builds builds the site and serves `dist/` (`wrangler.jsonc`). GitHub Actions (`.github/workflows/ci.yml`) runs check + build on every push and pull request.

Ads: set build variables `PUBLIC_ADSENSE_CLIENT` (ca-pub-…) and `PUBLIC_ADSENSE_SLOT` (one responsive display unit id) in Cloudflare Workers Builds. Ads and ads.txt stay off until both are set. Slots sit only between content sections, never inside a calculator or above the answer, with reserved height so nothing shifts.

## Brand
See `DESIGN.md`. Painted tiffin-lid codes on brushed steel: ink `#16191B`, steel `#E6E9E8`, and one code colour per tool (rice `#D7261E`, water `#2443B8`, pasta `#F2B705`, meat `#1F8A4C`). Fonts: Big Shoulders (numbers, headings), Public Sans (text). Logo: a plate seen from above with a gauge and three small bowls (`scripts/brand/mark.svg`).

Re-render the favicon PNGs and OG image after changing `scripts/brand/mark.svg` or `og.html`:
```
PW_CHANNEL=msedge PLAYWRIGHT=<path to playwright/index.js> node scripts/brand/render.mjs
```
