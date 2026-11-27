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
/** key indexes the dictionary's `tools` entry for the tag, name and blurb. */
export const TOOLS: { href: string; tool: Tool; key: 'rice' | 'water' | 'convert' | 'pasta' | 'meat' }[] = [
  { href: '/rice-calculator/', tool: 'rice', key: 'rice' },
  { href: '/rice-to-water-ratio/', tool: 'water', key: 'water' },
  { href: '/uncooked-to-cooked-rice/', tool: 'rice', key: 'convert' },
  { href: '/pasta-calculator/', tool: 'pasta', key: 'pasta' },
  { href: '/meat-per-person-calculator/', tool: 'meat', key: 'meat' },
];
/** Which painted code colour a path wears. */
export const toolFor = (path: string): Tool => // path without its /xx/ language prefix
  path.startsWith('/rice-to-water') ? 'water' : path.startsWith('/pasta') ? 'pasta' : path.startsWith('/meat') ? 'meat' : 'rice';
