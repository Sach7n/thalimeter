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

console.log(fails ? `${fails} check(s) failed` : 'All kitchen maths checks passed');
process.exit(fails ? 1 : 0);
