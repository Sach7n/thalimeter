export const site = {
  name: 'ThaliMeter',
  url: 'https://thalimeter.com',
  tagline: 'Cook the right amount.',
  contactEmail: 'hello@thalimeter.com', // TODO: create this mailbox (Cloudflare Email Routing → your inbox)
  operator: 'Macsera Pty Ltd',          // TODO: confirm the legal entity that runs the site
  adsenseClient: import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '',
};
export const TOOLS = [
  { href: '/rice-calculator/', icon: '🍚', name: 'Rice calculator', blurb: 'How much rice per person, for any number of guests.' },
  { href: '/rice-to-water-ratio/', icon: '💧', name: 'Rice to water ratio', blurb: 'Exact water for white, basmati, jasmine, brown and sushi rice.' },
  { href: '/uncooked-to-cooked-rice/', icon: '⚖️', name: 'Uncooked ↔ cooked rice', blurb: 'Convert dry rice to cooked rice, and back, in cups or grams.' },
  { href: '/pasta-calculator/', icon: '🍝', name: 'Pasta calculator', blurb: 'How much pasta per person, plus water, salt and sauce.' },
  { href: '/meat-per-person-calculator/', icon: '🍗', name: 'Meat per person', blurb: 'How much meat to buy for BBQs, tacos, turkey and parties.' },
];
