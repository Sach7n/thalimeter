/**
 * Answer pages built from what people actually search (Search Console queries, Nov 2026).
 * Every number is computed from kitchen.ts, so answers stay in step with the calculators.
 */
import { RICE, RICE_MEAL, PASTA, PASTA_MEAL, MEAT, G_PER_LB, G_PER_OZ, convertRice, cupsText, gramsText, lbText, round, type MeatType } from './kitchen';

export type QA = { q: string; a: string };
export type Guide = { slug: string; group: 'Rice' | 'Pasta' | 'Meat'; title: string; h1: string; description: string; lede: string; faq: QA[] };

const side = RICE_MEAL.side.g, main = RICE_MEAL.main.g, dish = RICE_MEAL.ricedish.g;
const white = RICE.white;
const kg = (g: number) => gramsText(g);
const people = (g: number, per: number) => Math.floor(g / per);
const cupG = white.gPerCup;

export const GUIDES: Guide[] = [
  {
    slug: '/rice/kg-of-rice-for-people/', group: 'Rice',
    title: 'How Many Kg of Rice for 10, 20, 50 or 100 People? (Chart)',
    h1: 'How many kg of rice for a crowd?',
    description: `Kg of uncooked rice for 5 to 500 people: ${kg(100 * main)} for 100 people as a main, ${kg(100 * dish)} for biryani or pulao. Plus how many people 5, 10 or 25 kg of rice feeds.`,
    lede: `Plan ${main} g of uncooked rice per adult when rice is the main part of the meal, ${dish} g for biryani, pulao or fried rice, and ${side} g as a side. So 1 kg of rice feeds about ${people(1000, main)} people as a main.`,
    faq: [
      { q: 'How many kg of rice for 10 people?', a: `<b>${kg(10 * main)}</b> of uncooked rice when rice is the main dish, ${kg(10 * dish)} for biryani or pulao, and ${kg(10 * side)} as a side.` },
      { q: 'How many kg of rice for 50 people?', a: `<b>${kg(50 * main)}</b> as a main and ${kg(50 * dish)} for biryani. For a wedding or party buffet with many other dishes, use about three quarters: ${kg(50 * main * 0.75)}.` },
      { q: 'How many kg of rice for 100 people?', a: `<b>${kg(100 * main)}</b> of uncooked rice as a main, ${kg(100 * dish)} for biryani or pulao, and ${kg(100 * side)} if rice is one side among many.` },
      { q: '25 kg of rice feeds how many people?', a: `About <b>${people(25000, main)} people</b> as a main dish, ${people(25000, dish)} as biryani, or ${people(25000, side)} as a side.` },
      { q: '10 aadmi ke liye kitna chawal lagega?', a: `10 logon ke liye lagbhag <b>${kg(10 * main)} kachcha chawal</b> lagega jab chawal mukhya bhojan ho. Biryani ya pulao ke liye ${kg(10 * dish)}, aur side ke roop mein ${kg(10 * side)}.` },
    ],
  },
  {
    slug: '/rice/how-many-people-does-rice-feed/', group: 'Rice',
    title: 'How Many People Does 1, 2, 4 or 8 Cups of Rice Feed?',
    h1: 'How many people does a cup of rice feed?',
    description: `1 cup of uncooked rice feeds about ${people(cupG, main)} people as a main or ${people(cupG, side)} as a side. Chart for 1 to 20 cups and 1 to 25 lb of rice.`,
    lede: `1 US cup of uncooked white rice weighs about ${cupG} g and makes about ${cupsText(white.yieldVol)} cooked. That feeds ${people(cupG, main)} adults when rice is the main part of the meal, or ${people(cupG, side)} as a side dish.`,
    faq: [
      { q: 'Is 1 cup of rice enough for 2 people?', a: `Yes. 1 cup of uncooked rice makes about ${cupsText(white.yieldVol)} cooked, enough for 2 people as a main with a little left over.` },
      { q: 'Is 1 cup of rice enough for 4 people?', a: `Only as a side dish. As a main, 4 people need about ${cupsText(4 * main / cupG)} of uncooked rice.` },
      { q: 'Is 2 cups of rice enough for 4 people?', a: `Yes. 2 cups uncooked makes about ${cupsText(2 * white.yieldVol)} cooked, which feeds 4 adults as a main.` },
      { q: '4 cups of rice feeds how many people?', a: `About <b>${people(4 * cupG, main)} people</b> as a main and ${people(4 * cupG, side)} as a side.` },
      { q: '8 cups of rice feeds how many people?', a: `About <b>${people(8 * cupG, main)} people</b> as a main and ${people(8 * cupG, side)} as a side. That is about ${kg(8 * cupG)} of uncooked rice.` },
      { q: 'How many people will 5 pounds of rice feed?', a: `About <b>${people(5 * G_PER_LB, main)} people</b> as a main and ${people(5 * G_PER_LB, side)} as a side. Brown rice feeds about the same number by weight.` },
    ],
  },
  {
    slug: '/rice/uncooked-to-cooked-grams/', group: 'Rice',
    title: 'Uncooked to Cooked Rice in Grams: 40 g, 50 g, 70 g, 100 g Chart',
    h1: 'Uncooked to cooked rice in grams',
    description: `100 g of uncooked white rice makes about ${round(100 * white.yieldWt, 5)} g cooked. Chart from 25 g to 250 g for white, basmati, jasmine and brown rice, and cooked back to uncooked.`,
    lede: `Rice takes in water as it cooks. 100 g of uncooked white or basmati rice becomes about ${round(100 * white.yieldWt, 5)} g cooked, and brown rice about ${round(100 * RICE.brown.yieldWt, 5)} g. Weigh rice uncooked if you count calories: its weight does not depend on how much water you used.`,
    faq: [
      { q: '100 g of uncooked rice is how much cooked?', a: `About <b>${round(100 * white.yieldWt, 5)} g</b> of cooked white or basmati rice, ${round(100 * RICE.jasmine.yieldWt, 5)} g of jasmine and ${round(100 * RICE.brown.yieldWt, 5)} g of brown rice.` },
      { q: '50 g of uncooked rice is how much cooked?', a: `About <b>${round(50 * white.yieldWt, 5)} g</b> cooked, which is about ${cupsText(convertRice(50, 'grams', 'toCooked', 'white').cookedCups)}. That is one side-dish portion.` },
      { q: '70 g of uncooked rice is how much cooked?', a: `About <b>${round(70 * white.yieldWt, 5)} g</b> of cooked white rice.` },
      { q: 'How much uncooked rice makes 100 g cooked?', a: `About <b>${round(100 / white.yieldWt)} g</b> of uncooked white rice, or ${round(100 / RICE.brown.yieldWt)} g of brown rice.` },
      { q: '1 cup of cooked rice is how much uncooked?', a: `About <b>${cupsText(1 / white.yieldVol)}</b> (${round(cupG / white.yieldVol, 5)} g) of uncooked white rice.` },
      { q: '3/4 cup of uncooked rice is how much cooked?', a: `About <b>${cupsText(0.75 * white.yieldVol)}</b> of cooked white rice.` },
    ],
  },
  {
    slug: '/pasta/ounces-grams-cups/', group: 'Pasta',
    title: 'How Much Is 2 oz of Pasta? Ounces to Grams, Cups and Servings',
    h1: 'Pasta in ounces, grams and cups',
    description: `2 oz of dry pasta is ${round(2 * G_PER_OZ)} g, one side serving. 8 oz is ${round(8 * G_PER_OZ)} g and feeds about 2 as a main. Chart for 2 to 32 oz, with cups and servings.`,
    lede: `Pasta packs list ounces, recipes list grams, and you want to know how many plates it makes. A main course is about ${PASTA_MEAL.main.g} g (3½ oz) of dry pasta per person, and a side is ${PASTA_MEAL.side.g} g (2 oz).`,
    faq: [
      { q: 'How much is 2 oz of pasta?', a: `2 oz is <b>${round(2 * G_PER_OZ)} g</b> of dry pasta: one side serving. For spaghetti, that is a bundle about the width of a US quarter. For short pasta like penne, it is about ½ cup.` },
      { q: 'How much is 8 oz of pasta in grams?', a: `8 oz is <b>${round(8 * G_PER_OZ)} g</b>, half of a 1 lb box. It feeds 2 people as a main or 4 as a side.` },
      { q: 'How many people does 16 oz of pasta feed?', a: `A 16 oz (1 lb, ${round(16 * G_PER_OZ)} g) box feeds <b>about 4 people as a main</b> and 8 as a side.` },
      { q: 'Is 1 lb of pasta enough for 6 people?', a: `Only as a side or starter. As a main course, 6 people need about ${gramsText(6 * PASTA_MEAL.main.g)} (${lbText(6 * PASTA_MEAL.main.g)}), so buy 2 boxes.` },
      { q: '12 oz of pasta is how many cups?', a: `About <b>${cupsText(12 * G_PER_OZ / PASTA.dryShort.gPerCup!)}</b> of dry short pasta such as penne or macaroni. Shapes vary, so weigh it if you can.` },
      { q: 'How many kilos of spaghetti for 30 people?', a: `<b>${kg(30 * PASTA_MEAL.main.g)}</b> of dry spaghetti for 30 people as a main, or ${kg(30 * PASTA_MEAL.side.g)} as a side.` },
    ],
  },
  {
    slug: '/meat/per-person-in-kg/', group: 'Meat',
    title: 'How Much Meat Per Person in Kg and Pounds (Chart)',
    h1: 'How much meat per person, in kg and pounds',
    description: `Plan ${MEAT.boneless.rawG} g (½ lb) of raw boneless meat per adult, ${MEAT.bonein.rawG} g (¾ lb) bone-in. Chart by cut for 1, 10, 25 and 50 people, in kg and lb.`,
    lede: `Buy meat by raw weight. Plan ${MEAT.boneless.rawG} g (½ lb) per adult for boneless cuts and ${MEAT.bonein.rawG} g (¾ lb) for bone-in, when meat is the only main dish. With two mains, use about 60% of that.`,
    faq: [
      { q: 'How much meat per person in kg?', a: `About <b>${(MEAT.boneless.rawG / 1000).toFixed(2)} kg</b> of raw boneless meat per adult, or ${(MEAT.bonein.rawG / 1000).toFixed(2)} kg bone-in. So 1 kg of boneless meat feeds about 4 people.` },
      { q: '1 pound of meat feeds how many people?', a: `<b>About 2 people</b> for boneless meat as the only main, 4 people as taco or sauce meat, and 1 to 2 people for bone-in cuts.` },
      { q: 'How many kg of meat for 50 people?', a: `About <b>${kg(50 * MEAT.boneless.rawG)}</b> of raw boneless meat, or ${kg(50 * MEAT.bonein.rawG)} bone-in, when it is the only main.` },
    ],
  },
];

/** Meat rows for the meat guide's chart. */
export const MEAT_ROWS = (['boneless', 'bonein', 'ground', 'burgers', 'wholeChicken', 'turkey', 'brisket', 'porkShoulder'] as MeatType[]);
export const guide = (slug: string) => GUIDES.find((g) => g.slug === slug)!;
