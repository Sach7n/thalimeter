/**
 * Answer pages built from what people actually search (Search Console queries, Nov 2026).
 * Text lives in the dictionaries (guide.<key>); every number is computed here from kitchen.ts,
 * so answers stay in step with the calculators in every language.
 */
import { RICE, RICE_MEAL, PASTA, PASTA_MEAL, MEAT, G_PER_LB, G_PER_OZ, convertRice, round, type MeatType } from './kitchen';
import type { Fmt } from '../i18n/fmt';

export type GuideKey = 'kg' | 'feeds' | 'grams' | 'oz' | 'meatKg';
export type Guide = { slug: string; group: 'Rice' | 'Pasta' | 'Meat'; key: GuideKey; tool: { href: string; name: 'rice' | 'convert' | 'pasta' | 'meat' } };

export const GUIDES: Guide[] = [
  { slug: '/rice/kg-of-rice-for-people/', group: 'Rice', key: 'kg', tool: { href: '/rice-calculator/', name: 'rice' } },
  { slug: '/rice/how-many-people-does-rice-feed/', group: 'Rice', key: 'feeds', tool: { href: '/rice-calculator/', name: 'rice' } },
  { slug: '/rice/uncooked-to-cooked-grams/', group: 'Rice', key: 'grams', tool: { href: '/uncooked-to-cooked-rice/', name: 'convert' } },
  { slug: '/pasta/ounces-grams-cups/', group: 'Pasta', key: 'oz', tool: { href: '/pasta-calculator/', name: 'pasta' } },
  { slug: '/meat/per-person-in-kg/', group: 'Meat', key: 'meatKg', tool: { href: '/meat-per-person-calculator/', name: 'meat' } },
];
export const guide = (slug: string) => GUIDES.find((g) => g.slug === slug)!;

const side = RICE_MEAL.side.g, main = RICE_MEAL.main.g, dish = RICE_MEAL.ricedish.g;
const white = RICE.white, cupG = white.gPerCup;
const feeds = (g: number, per: number) => Math.floor(g / per);

/** The numbers each guide's text refers to, formatted for one language. */
export function guideVars(key: GuideKey, f: Fmt): Record<string, string | number> {
  const r5 = (n: number) => f.n(round(n, 5));
  switch (key) {
    case 'kg': return {
      main, dish, side, perKg: feeds(1000, main),
      m10: f.g(10 * main), d10: f.g(10 * dish), s10: f.g(10 * side),
      m50: f.g(50 * main), d50: f.g(50 * dish), b50: f.g(50 * main * 0.75),
      m100: f.g(100 * main), d100: f.g(100 * dish), s100: f.g(100 * side),
      f25m: feeds(25000, main), f25d: feeds(25000, dish), f25s: feeds(25000, side),
    };
    case 'feeds': return {
      cupG, cupCooked: f.cups(white.yieldVol), cupMain: feeds(cupG, main), cupSide: feeds(cupG, side),
      four: f.cups(4 * main / cupG), twoCooked: f.cups(2 * white.yieldVol),
      f4m: feeds(4 * cupG, main), f4s: feeds(4 * cupG, side), f8m: feeds(8 * cupG, main), f8s: feeds(8 * cupG, side), g8: f.g(8 * cupG),
      f5lbm: feeds(5 * G_PER_LB, main), f5lbs: feeds(5 * G_PER_LB, side),
    };
    case 'grams': return {
      w100: r5(100 * white.yieldWt), j100: r5(100 * RICE.jasmine.yieldWt), b100: r5(100 * RICE.brown.yieldWt),
      w50: r5(50 * white.yieldWt), c50: f.cups(convertRice(50, 'grams', 'toCooked', 'white').cookedCups), w70: r5(70 * white.yieldWt),
      r100: f.n(round(100 / white.yieldWt)), rb100: f.n(round(100 / RICE.brown.yieldWt)),
      cupDry: f.cups(1 / white.yieldVol), cupDryG: r5(cupG / white.yieldVol), c34: f.cups(0.75 * white.yieldVol),
    };
    case 'oz': return {
      main: PASTA_MEAL.main.g, side: PASTA_MEAL.side.g,
      g2: f.n(round(2 * G_PER_OZ)), g8: f.n(round(8 * G_PER_OZ)), g16: f.n(round(16 * G_PER_OZ)),
      six: f.g(6 * PASTA_MEAL.main.g), sixLb: f.lb(6 * PASTA_MEAL.main.g),
      c12: f.cups(12 * G_PER_OZ / PASTA.dryShort.gPerCup!), k30: f.g(30 * PASTA_MEAL.main.g), k30s: f.g(30 * PASTA_MEAL.side.g),
    };
    case 'meatKg': return {
      bl: MEAT.boneless.rawG, bi: MEAT.bonein.rawG,
      blKg: f.dec((MEAT.boneless.rawG / 1000).toFixed(2)), biKg: f.dec((MEAT.bonein.rawG / 1000).toFixed(2)),
      bl50: f.g(50 * MEAT.boneless.rawG), bi50: f.g(50 * MEAT.bonein.rawG),
    };
  }
}

/** Meat rows for the meat guide's chart. */
export const MEAT_ROWS = (['boneless', 'bonein', 'ground', 'burgers', 'wholeChicken', 'turkey', 'brisket', 'porkShoulder'] as MeatType[]);
