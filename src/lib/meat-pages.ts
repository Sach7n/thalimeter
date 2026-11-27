import type { MeatType } from './kitchen';
/** Occasion pages; their text lives in the dictionaries under meatOcc.pages[slug]. */
export const MEAT_PAGES: { slug: 'bbq' | 'tacos' | 'turkey' | 'pulled-pork' | 'brisket' | 'burgers'; type: MeatType }[] = [
  { slug: 'bbq', type: 'boneless' },
  { slug: 'tacos', type: 'ground' },
  { slug: 'turkey', type: 'turkey' },
  { slug: 'pulled-pork', type: 'porkShoulder' },
  { slug: 'brisket', type: 'brisket' },
  { slug: 'burgers', type: 'burgers' },
];
export const meatSlugPaths = () => MEAT_PAGES.map((p) => ({ params: { slug: p.slug }, props: { p } }));
