import type { RiceType } from './kitchen';
/** Headcounts that get their own answer page. Small counts match how people search ("rice for 6 people"). */
export const RICE_COUNTS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 24, 25, 30, 35, 40, 50, 60, 75, 100, 150, 200];
export const PASTA_COUNTS = [2, 4, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 100];
export const RICE_TYPE_PAGES: { slug: string; type: RiceType }[] = [
  { slug: 'white-rice-per-person', type: 'white' },
  { slug: 'basmati-rice-per-person', type: 'basmati' },
  { slug: 'jasmine-rice-per-person', type: 'jasmine' },
  { slug: 'brown-rice-per-person', type: 'brown' },
  { slug: 'sushi-rice-per-person', type: 'short' },
];
/** Static paths for /rice/[slug]/, shared by the English and the /[lang]/ routes. */
export const riceSlugPaths = () => [
  ...RICE_COUNTS.map((n) => ({ params: { slug: `for-${n}-people` }, props: { kind: 'count' as const, n } })),
  ...RICE_TYPE_PAGES.map((p) => ({ params: { slug: p.slug }, props: { kind: 'type' as const, type: p.type } })),
];
export const pastaSlugPaths = () => PASTA_COUNTS.map((n) => ({ params: { slug: `for-${n}-people` }, props: { n } }));
