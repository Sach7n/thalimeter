// Sanity tests for the kitchen maths. CI runs this before every build: `npm run check`.
import * as K from '../src/lib/kitchen.ts';
let fails = 0;
const ok = (cond: boolean, msg: string) => { if (!cond) { fails++; console.error('✗ ' + msg); } };
const near = (a: number, b: number, tol: number) => Math.abs(a - b) <= tol;

// Rice: 4 adults, main, white → 340 g dry, about 1.8 cups
const r4 = K.rice({ ...K.RICE_DEFAULT, adults: 4, meal: 'main' });
ok(near(r4.dryG, 340, 1), `rice 4 main dry ${r4.dryG}`);
ok(near(r4.dryCups, 1.84, 0.05), `rice 4 main cups ${r4.dryCups}`);
ok(r4.waterMl > r4.dryCups * K.US_CUP_ML, 'water more than rice on the stove');
ok(near(r4.cookedG, 952, 5), `cooked ${r4.cookedG}`);
// Scaling is linear and kids count half
const r8 = K.rice({ ...K.RICE_DEFAULT, adults: 8, meal: 'main' });
ok(near(r8.dryG, 2 * r4.dryG, 0.01), 'linear in people');
const rk = K.rice({ ...K.RICE_DEFAULT, adults: 2, kids: 4, meal: 'main' });
ok(near(rk.dryG, r4.dryG, 0.01), 'two kids = one adult');
// Every rice type: sane ratios
for (const [k, t] of Object.entries(K.RICE)) {
  ok(t.water.stovetop >= t.water.cooker && t.water.cooker >= t.water.instantpot, `${k}: stovetop ≥ cooker ≥ IP water`);
  ok(t.yieldVol >= 2 && t.yieldVol <= 3.5 && t.yieldWt >= 2 && t.yieldWt <= 3.2, `${k}: yields in range`);
}
ok(K.cupsNum(1.7) === '1¾' && K.cupsNum(12.4) === '12½' && K.cupsNum(0.5) === '½', `cupsNum ${K.cupsNum(1.7)} ${K.cupsNum(12.4)}`);
// Converter round trip
const c = K.convertRice(1, 'cups', 'toCooked', 'white');
const back = K.convertRice(c.cookedCups, 'cups', 'toDry', 'white');
ok(near(back.dryCups, 1, 1e-9), 'cooked↔dry round trip (cups)');
const cg = K.convertRice(100, 'grams', 'toCooked', 'basmati');
ok(near(K.convertRice(cg.cookedG, 'grams', 'toDry', 'basmati').dryG, 100, 1e-9), 'cooked↔dry round trip (grams)');
// Pasta: 4 adults main dried → 400 g, about 0.88 of a 1 lb box, 4 L water
const p4 = K.pasta({ ...K.PASTA_DEFAULT, adults: 4 });
ok(near(p4.g, 400, 0.01) && near(p4.boxes16oz, 0.882, 0.01) && near(p4.waterL, 4, 0.01), `pasta 4 main ${p4.g} ${p4.boxes16oz} ${p4.waterL}`);
ok(K.pasta({ ...K.PASTA_DEFAULT, adults: 1, meal: 'side' }).waterL === 3, 'pasta water at least 3 L');
ok(near(K.pasta({ ...K.PASTA_DEFAULT, adults: 4, type: 'fresh' }).g, 520, 0.01), 'fresh pasta 30% more');
// Meat: 10 adults boneless only main → 2.25 kg; turkey 10 → 5.65 kg
ok(near(K.meat({ ...K.MEAT_DEFAULT }).rawG, 2250, 0.01), 'meat boneless 10');
ok(near(K.meat({ ...K.MEAT_DEFAULT, type: 'turkey' }).rawG, 5650, 0.01), 'turkey 10');
ok(K.meat({ ...K.MEAT_DEFAULT, type: 'burgers' }).patties === 15, 'burgers 10 → 15 patties');
// Formatting
ok(K.cupsText(1.84) === '1 ¾ cups', `cupsText ${K.cupsText(1.84)}`);
ok(K.gramsText(2250) === '2.25 kg' && K.gramsText(340) === '340 g', `gramsText ${K.gramsText(2250)} ${K.gramsText(340)}`);

// Translations: every language has exactly the English keys, the same {placeholders} and no empty text.
const { en } = await import('../src/i18n/en.ts');
const { readdirSync } = await import('node:fs');
const holes = (s: string) => [...new Set(s.match(/\{\w+\}/g) ?? [])].sort().join(',');
function sameShape(a: unknown, b: unknown, at: string, lang: string) {
  if (typeof a === 'string') {
    if (typeof b !== 'string') return ok(false, `${lang}: ${at} should be text`);
    ok(holes(a) === holes(b), `${lang}: ${at} placeholders ${holes(b)} ≠ ${holes(a)}`);
    ok(a === '' || b.trim() !== '', `${lang}: ${at} is empty`);
    return;
  }
  if (typeof b !== 'object' || b === null) return ok(false, `${lang}: ${at} missing`);
  if (Array.isArray(a)) ok(Array.isArray(b) && b.length === a.length, `${lang}: ${at} should have ${a.length} items`);
  for (const k of Object.keys(a as object)) sameShape((a as any)[k], (b as any)[k], `${at}.${k}`, lang);
  for (const k of Object.keys(b as object)) ok(k in (a as object), `${lang}: ${at}.${k} is not in English`);
}
for (const file of readdirSync(new URL('../src/i18n/', import.meta.url)).filter((x) => /^[a-z]{2}\.ts$/.test(x) && x !== 'en.ts')) {
  const lang = file.slice(0, 2);
  const mod = await import(`../src/i18n/${file}`);
  sameShape(en, mod[lang], lang, lang);
}

console.log(fails ? `${fails} check(s) failed` : 'All kitchen maths checks passed');
process.exit(fails ? 1 : 0);
