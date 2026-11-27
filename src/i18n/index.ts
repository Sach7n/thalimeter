import { en, type Dict } from './en';
import { makeFmt } from './fmt';
export { tpl } from './fmt';

export const LANGS = ['en'] as const;
export type Lang = 'en' | 'es' | 'it' | 'fr' | 'el' | 'ar' | 'tr' | 'zh';
/** htmlLang/hreflang code, endonym for the switcher, text direction, decimal comma. */
export const META: Record<Lang, { code: string; name: string; dir: 'ltr' | 'rtl'; comma: boolean }> = {
  en: { code: 'en', name: 'English', dir: 'ltr', comma: false },
  es: { code: 'es', name: 'Español', dir: 'ltr', comma: true },
  it: { code: 'it', name: 'Italiano', dir: 'ltr', comma: true },
  fr: { code: 'fr', name: 'Français', dir: 'ltr', comma: true },
  el: { code: 'el', name: 'Ελληνικά', dir: 'ltr', comma: true },
  ar: { code: 'ar', name: 'العربية', dir: 'rtl', comma: false },
  tr: { code: 'tr', name: 'Türkçe', dir: 'ltr', comma: true },
  zh: { code: 'zh-Hans', name: '中文', dir: 'ltr', comma: false },
};
const DICTS: Partial<Record<Lang, Dict>> = { en };

export const dict = (lang: Lang): Dict => DICTS[lang] ?? en;
export const fmtFor = (lang: Lang) => makeFmt(dict(lang).units, META[lang].comma);
/** Site path in a language: English stays at the root, others get a /xx/ prefix. */
export const href = (lang: Lang, path: string) => (lang === 'en' ? path : `/${lang}${path}`);
/** The language a URL path belongs to, and the path without its prefix. */
export function fromPath(path: string): { lang: Lang; base: string } {
  const m = path.match(/^\/(es|it|fr|el|ar|tr|zh)(\/.*)$/);
  return m ? { lang: m[1] as Lang, base: m[2] } : { lang: 'en', base: path };
}
/** getStaticPaths helper for /[lang]/ routes (every language except English). */
export const otherLangs = () => LANGS.filter((l) => l !== 'en').map((lang) => ({ params: { lang }, props: { lang } }));

/** Everything a page needs for its language, from its own URL. */
export function i18n(pathname: string) {
  const { lang, base } = fromPath(pathname);
  const d = dict(lang);
  return { lang, base, d, f: fmtFor(lang), m: META[lang], h: (p: string) => href(lang, p) };
}
/** The strings a calculator island needs (kept small: no page copy). */
export const islandT = (lang: Lang) => { const d = dict(lang); return { calc: d.calc, units: d.units, k: d.k, comma: META[lang].comma }; };
export type IslandT = ReturnType<typeof islandT>;
