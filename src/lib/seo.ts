import { site } from '../config';
const strip = (s: string) => s.replace(/<[^>]+>/g, '');
export const faqLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })),
});
export const appLd = (name: string, path: string, description: string) => ({
  '@context': 'https://schema.org', '@type': 'WebApplication', name, url: new URL(path, site.url).href, description,
  applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
});
export const crumbLd = (trail: [string, string][]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: new URL(path, site.url).href })),
});
