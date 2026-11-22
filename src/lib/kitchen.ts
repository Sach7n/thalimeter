/**
 * ThaliMeter kitchen maths. No imports, so scripts/check.ts can test it directly.
 * All amounts are planning estimates. Sources and assumptions: /how-we-calculate/.
 */

/* ---------------- Units ---------------- */
export const US_CUP_ML = 236.588;
export const METRIC_CUP_ML = 250;
export const RICE_COOKER_CUP_ML = 180;
export const G_PER_OZ = 28.3495;
export const G_PER_LB = 453.592;
export const ML_PER_US_QT = 946.353;
export type UnitSystem = 'us' | 'metric';

export const round = (n: number, step = 1) => Math.round(n / step) * step;
/** Kitchen-friendly cups: nearest quarter below 10 cups, nearest half above. */
export function cupsText(cups: number): string {
  if (cups <= 0) return '0 cups';
  const step = cups < 10 ? 0.25 : 0.5;
  const v = Math.max(step, round(cups, step));
  const whole = Math.floor(v), frac = v - whole;
  const f = frac === 0.25 ? '¼' : frac === 0.5 ? '½' : frac === 0.75 ? '¾' : '';
  const num = whole === 0 ? f : `${whole}${f ? ' ' + f : ''}`;
  return `${num} ${v <= 1 ? 'cup' : 'cups'}`;
}
export function gramsText(g: number): string {
  if (g >= 1000) return `${(round(g, 50) / 1000).toFixed(g >= 10000 ? 1 : 2).replace(/\.?0+$/, '')} kg`;
  return `${round(g, g >= 200 ? 10 : 5)} g`;
}
export function lbText(g: number): string {
  const lb = g / G_PER_LB;
  if (lb < 1) return `${round(g / G_PER_OZ, 0.5)} oz`;
  return `${round(lb, lb < 10 ? 0.25 : 0.5)} lb`;
}
export function litresText(ml: number): string {
  if (ml < 1000) return `${round(ml, 10)} ml`;
  return `${(round(ml, 50) / 1000).toFixed(2).replace(/\.?0+$/, '')} L`;
}
export function quartsText(ml: number): string { return `${round(ml / ML_PER_US_QT, 0.25)} qt`; }

/* ---------------- Rice ---------------- */
export type RiceType = 'white' | 'basmati' | 'jasmine' | 'brown' | 'short';
export type RiceMethod = 'stovetop' | 'cooker' | 'instantpot';
export type RiceMeal = 'side' | 'main' | 'ricedish';

export const RICE: Record<RiceType, {
  label: string; gPerCup: number; yieldVol: number; yieldWt: number;
  water: Record<RiceMethod, number>; minutes: { stovetop: number; instantpot: number }; tip: string;
}> = {
  white:   { label: 'Long-grain white', gPerCup: 185, yieldVol: 3,    yieldWt: 2.8, water: { stovetop: 1.75, cooker: 1.2, instantpot: 1 },    minutes: { stovetop: 15, instantpot: 4 },  tip: 'Rinse once or twice for fluffier, less sticky rice.' },
  basmati: { label: 'Basmati',          gPerCup: 185, yieldVol: 3,    yieldWt: 2.8, water: { stovetop: 1.5, cooker: 1.2, instantpot: 1 },     minutes: { stovetop: 12, instantpot: 5 },  tip: 'Rinse until the water runs clear, then soak 20–30 minutes for long, separate grains.' },
  jasmine: { label: 'Jasmine',          gPerCup: 190, yieldVol: 2.75, yieldWt: 2.7, water: { stovetop: 1.5, cooker: 1.1, instantpot: 1 },     minutes: { stovetop: 12, instantpot: 4 },  tip: 'Rinse 2–3 times. Jasmine needs less water than most long-grain rice.' },
  brown:   { label: 'Brown',            gPerCup: 190, yieldVol: 3,    yieldWt: 2.5, water: { stovetop: 2.25, cooker: 1.5, instantpot: 1.25 }, minutes: { stovetop: 40, instantpot: 22 }, tip: 'Brown rice needs more water and about 3 times longer than white rice.' },
  short:   { label: 'Short-grain / sushi', gPerCup: 200, yieldVol: 2.5, yieldWt: 2.3, water: { stovetop: 1.2, cooker: 1.1, instantpot: 1 },    minutes: { stovetop: 15, instantpot: 6 },  tip: 'Rinse until clear and rest 30 minutes before cooking for even, sticky grains.' },
};
export const RICE_METHOD_LABEL: Record<RiceMethod, string> = { stovetop: 'Pot on the stove', cooker: 'Rice cooker', instantpot: 'Instant Pot' };
export const RICE_MEAL: Record<RiceMeal, { label: string; g: number; hint: string }> = {
  side:     { label: 'Side dish',  g: 50,  hint: 'Rice next to a curry, stir-fry or grill' },
  main:     { label: 'Main part',  g: 85,  hint: 'Rice is the base: rice bowls, curry and rice' },
  ricedish: { label: 'Rice dish',  g: 100, hint: 'Biryani, fried rice, paella, pilaf' },
};
export const APPETITE = { light: 0.8, normal: 1, hearty: 1.25 } as const;
export type Appetite = keyof typeof APPETITE;

export type RiceInput = { adults: number; kids: number; meal: RiceMeal; type: RiceType; method: RiceMethod; appetite: Appetite; buffet: boolean; extra: boolean };
export const RICE_DEFAULT: RiceInput = { adults: 4, kids: 0, meal: 'side', type: 'white', method: 'stovetop', appetite: 'normal', buffet: false, extra: false };

export function rice(i: RiceInput) {
  const r = RICE[i.type];
  const people = Math.max(0, i.adults) + Math.max(0, i.kids) * 0.5;
  let dryG = people * RICE_MEAL[i.meal].g * APPETITE[i.appetite];
  if (i.buffet) dryG *= 0.75;
  if (i.extra) dryG *= 1.2;
  return riceFromDry(dryG, i.type, i.method, people);
}
export function riceFromDry(dryG: number, type: RiceType, method: RiceMethod, people = 0) {
  const r = RICE[type];
  const dryCups = dryG / r.gPerCup;
  const dryMl = dryCups * US_CUP_ML;
  const waterMl = dryMl * r.water[method];
  const cookedG = dryG * r.yieldWt;
  const cookedCups = dryCups * r.yieldVol;
  const cookedMl = cookedCups * US_CUP_ML;
  const potMl = Math.max(cookedMl, dryMl + waterMl) * 1.4;
  const POTS = [1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 30, 40];
  const potL = POTS.find((p) => p * 1000 >= potMl) ?? Math.ceil(potMl / 1000);
  const cookerCups = dryMl / RICE_COOKER_CUP_ML;
  return {
    people, dryG, dryCups, metricCups: dryMl / METRIC_CUP_ML, cookerCups,
    waterMl, waterCups: waterMl / US_CUP_ML, cookedG, cookedCups, potL,
    cookerBatches: { small: Math.ceil(cookerCups / 5.5), large: Math.ceil(cookerCups / 10) },
    minutes: method === 'instantpot' ? r.minutes.instantpot : method === 'stovetop' ? r.minutes.stovetop : null,
    perPersonDryG: people > 0 ? dryG / people : 0,
  };
}

/** Uncooked ↔ cooked conversion. */
export function convertRice(amount: number, unit: 'cups' | 'grams', direction: 'toCooked' | 'toDry', type: RiceType) {
  const r = RICE[type];
  if (direction === 'toCooked') {
    const dryG = unit === 'grams' ? amount : amount * r.gPerCup;
    const dryCups = dryG / r.gPerCup;
    return { dryG, dryCups, cookedG: dryG * r.yieldWt, cookedCups: dryCups * r.yieldVol };
  }
  // cooked → dry
  const cookedCups = unit === 'cups' ? amount : (amount / r.yieldWt) / r.gPerCup * r.yieldVol;
  const cookedG = unit === 'grams' ? amount : (amount / r.yieldVol) * r.gPerCup * r.yieldWt;
  const dryCups = cookedCups / r.yieldVol;
  return { dryG: dryCups * r.gPerCup, dryCups, cookedG, cookedCups };
}

/* ---------------- Pasta ---------------- */
export type PastaType = 'dryLong' | 'dryShort' | 'fresh' | 'filled';
export type PastaMeal = 'side' | 'main' | 'hearty';
export const PASTA: Record<PastaType, { label: string; factor: number; yieldWt: number; gPerCup: number | null; tip: string }> = {
  dryLong:  { label: 'Dried long (spaghetti, linguine)', factor: 1,   yieldWt: 2.25, gPerCup: null, tip: 'A 2 oz (56 g) bundle of spaghetti is about the width of a US quarter coin.' },
  dryShort: { label: 'Dried short (penne, fusilli, macaroni)', factor: 1, yieldWt: 2.25, gPerCup: 100, tip: 'About 1 US cup of dry short pasta weighs roughly 100 g (3.5 oz). It varies by shape.' },
  fresh:    { label: 'Fresh egg pasta', factor: 1.3, yieldWt: 1.5, gPerCup: null, tip: 'Fresh pasta holds water, so you need about 30% more by weight than dried. It cooks in 2–4 minutes.' },
  filled:   { label: 'Filled (ravioli, tortellini)', factor: 1.5, yieldWt: 1.2, gPerCup: null, tip: 'Filled pasta is heavier because of the filling. Cook in gently boiling water so it does not burst.' },
};
export const PASTA_MEAL: Record<PastaMeal, { label: string; g: number; hint: string }> = {
  side:   { label: 'Side or starter', g: 55,  hint: 'A small plate before a main, or next to meat' },
  main:   { label: 'Main course',     g: 100, hint: 'Pasta is the meal' },
  hearty: { label: 'Big eaters',      g: 125, hint: 'Teenagers, athletes, very hungry guests' },
};
export type PastaInput = { adults: number; kids: number; meal: PastaMeal; type: PastaType; appetite: Appetite; buffet: boolean; extra: boolean };
export const PASTA_DEFAULT: PastaInput = { adults: 4, kids: 0, meal: 'main', type: 'dryLong', appetite: 'normal', buffet: false, extra: false };
export function pasta(i: PastaInput) {
  const t = PASTA[i.type];
  const people = Math.max(0, i.adults) + Math.max(0, i.kids) * 0.5;
  let g = people * PASTA_MEAL[i.meal].g * t.factor * APPETITE[i.appetite];
  if (i.buffet) g *= 0.75;
  if (i.extra) g *= 1.2;
  const dryBase = g / t.factor; // dried-pasta equivalent, used for water and sauce
  const waterL = Math.max(3, dryBase / 100); // 1 litre per 100 g, at least 3 L
  return {
    people, g, cookedG: g * t.yieldWt,
    boxes16oz: g / (16 * G_PER_OZ), packs500g: g / 500,
    cups: t.gPerCup ? g / t.gPerCup : null,
    bundles: i.type === 'dryLong' ? g / 56 : null,
    waterL, saltG: waterL * 7, saltTsp: (waterL * 7) / 6,
    sauceG: dryBase * 1.5, sauceJars24oz: (dryBase * 1.5) / 680,
    perPersonG: people > 0 ? g / people : 0,
  };
}

/* ---------------- Meat ---------------- */
export type MeatType = 'boneless' | 'bonein' | 'ribs' | 'ground' | 'burgers' | 'wholeChicken' | 'turkey' | 'brisket' | 'porkShoulder' | 'ham';
export const MEAT: Record<MeatType, { label: string; rawG: number; cookedNote: string; examples: string }> = {
  boneless:     { label: 'Boneless cuts', rawG: 225, cookedNote: 'about 170 g (6 oz) cooked', examples: 'Chicken breast, steak, pork loin, fish fillets' },
  bonein:       { label: 'Bone-in pieces', rawG: 340, cookedNote: 'about 170 g (6 oz) of meat after bones', examples: 'Chicken thighs and drumsticks, chops, wings' },
  ribs:         { label: 'Pork ribs', rawG: 450, cookedNote: 'about ½ rack of baby back ribs', examples: 'Baby back or spare ribs' },
  ground:       { label: 'Ground meat (tacos, sauces)', rawG: 115, cookedNote: 'enough for 2–3 tacos', examples: 'Ground beef, chicken or lamb in tacos, chili or sauces' },
  burgers:      { label: 'Burgers', rawG: 225, cookedNote: '1½ patties of ⅓ lb (150 g)', examples: 'Beef or chicken patties' },
  wholeChicken: { label: 'Whole chicken', rawG: 450, cookedNote: 'a 1.8 kg (4 lb) chicken feeds about 4', examples: 'Roast or rotisserie chicken' },
  turkey:       { label: 'Whole turkey', rawG: 565, cookedNote: 'includes some leftovers', examples: 'Thanksgiving or Christmas turkey' },
  brisket:      { label: 'Brisket (raw, untrimmed)', rawG: 360, cookedNote: 'about 180 g (6 oz) cooked; brisket loses about half its weight', examples: 'Smoked or braised brisket' },
  porkShoulder: { label: 'Pork shoulder (pulled pork)', rawG: 360, cookedNote: 'about 180 g (6 oz) pulled pork', examples: 'Bone-in pork butt or shoulder' },
  ham:          { label: 'Ham (bone-in)', rawG: 340, cookedNote: 'about 225 g (½ lb) of meat', examples: 'Baked holiday ham' },
};
export type MeatShare = 'only' | 'two' | 'three';
export const MEAT_SHARE: Record<MeatShare, { label: string; f: number }> = { only: { label: 'The only main', f: 1 }, two: { label: 'One of 2 mains', f: 0.6 }, three: { label: 'One of 3 mains', f: 0.45 } };
export type MeatInput = { adults: number; kids: number; type: MeatType; share: MeatShare; appetite: Appetite; buffet: boolean; extra: boolean };
export const MEAT_DEFAULT: MeatInput = { adults: 10, kids: 0, type: 'boneless', share: 'only', appetite: 'normal', buffet: false, extra: false };
export function meat(i: MeatInput) {
  const people = Math.max(0, i.adults) + Math.max(0, i.kids) * 0.5;
  let g = people * MEAT[i.type].rawG * MEAT_SHARE[i.share].f * APPETITE[i.appetite];
  if (i.buffet) g *= 0.75;
  if (i.extra) g *= 1.2;
  return {
    people, rawG: g, perPersonG: people > 0 ? g / people : 0,
    patties: i.type === 'burgers' ? Math.ceil(people * 1.5 * MEAT_SHARE[i.share].f * APPETITE[i.appetite] * (i.buffet ? 0.75 : 1) * (i.extra ? 1.2 : 1)) : null,
    turkeyNote: i.type === 'turkey' ? g : null,
  };
}
