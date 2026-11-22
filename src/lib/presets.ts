import type { RiceType } from './kitchen';
export const RICE_COUNTS = [2, 4, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 75, 100];
export const PASTA_COUNTS = [2, 4, 6, 8, 10, 12, 20, 25, 30, 40, 50, 100];
export const RICE_TYPE_PAGES: { slug: string; type: RiceType; name: string }[] = [
  { slug: 'white-rice-per-person', type: 'white', name: 'white rice' },
  { slug: 'basmati-rice-per-person', type: 'basmati', name: 'basmati rice' },
  { slug: 'jasmine-rice-per-person', type: 'jasmine', name: 'jasmine rice' },
  { slug: 'brown-rice-per-person', type: 'brown', name: 'brown rice' },
  { slug: 'sushi-rice-per-person', type: 'short', name: 'sushi rice' },
];
