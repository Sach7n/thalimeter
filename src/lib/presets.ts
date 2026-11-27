import type { RiceType } from './kitchen';
/** Headcounts that get their own answer page. Small counts match how people search ("rice for 6 people"). */
export const RICE_COUNTS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 24, 25, 30, 35, 40, 50, 60, 75, 100, 150, 200];
export const PASTA_COUNTS = [2, 4, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 100];
export const RICE_TYPE_PAGES: { slug: string; type: RiceType; name: string }[] = [
  { slug: 'white-rice-per-person', type: 'white', name: 'white rice' },
  { slug: 'basmati-rice-per-person', type: 'basmati', name: 'basmati rice' },
  { slug: 'jasmine-rice-per-person', type: 'jasmine', name: 'jasmine rice' },
  { slug: 'brown-rice-per-person', type: 'brown', name: 'brown rice' },
  { slug: 'sushi-rice-per-person', type: 'short', name: 'sushi rice' },
];
