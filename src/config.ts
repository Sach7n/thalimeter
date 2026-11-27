export const site = {
  name: 'ThaliMeter',
  url: 'https://thalimeter.com',
  tagline: 'Cook the right amount.',
  contactEmail: 'hello@thalimeter.com', // TODO: create this mailbox (Cloudflare Email Routing → your inbox)
  operator: 'Macsera Pty Ltd',          // TODO: confirm the legal entity that runs the site
  adsenseClient: import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '',
  // One responsive display unit, reused in every slot. Ads stay off until both values are set.
  adsenseSlot: import.meta.env.PUBLIC_ADSENSE_SLOT ?? '',
};
export type Tool = 'rice' | 'water' | 'pasta' | 'meat';
export const TOOLS: { href: string; tool: Tool; tag: string; name: string; blurb: string }[] = [
  { href: '/rice-calculator/', tool: 'rice', tag: 'Rice', name: 'Rice calculator', blurb: 'How much rice per person, for any number of guests, in cups and grams.' },
  { href: '/rice-to-water-ratio/', tool: 'water', tag: 'Water', name: 'Rice to water ratio', blurb: 'Exact water for white, basmati, jasmine, brown and sushi rice.' },
  { href: '/uncooked-to-cooked-rice/', tool: 'rice', tag: 'Convert', name: 'Uncooked to cooked rice', blurb: 'Dry rice to cooked rice, and back, in cups or grams.' },
  { href: '/pasta-calculator/', tool: 'pasta', tag: 'Pasta', name: 'Pasta calculator', blurb: 'How much pasta per person, plus water, salt and sauce.' },
  { href: '/meat-per-person-calculator/', tool: 'meat', tag: 'Meat', name: 'Meat per person', blurb: 'How much meat to buy for BBQs, tacos, turkey and parties.' },
];
/** Which painted code colour a path wears. */
export const toolFor = (path: string): Tool =>
  path.startsWith('/rice-to-water') ? 'water' : path.startsWith('/pasta') ? 'pasta' : path.startsWith('/meat') ? 'meat' : 'rice';
