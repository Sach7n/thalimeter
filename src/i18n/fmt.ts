// Client-safe helpers (no dictionaries here, so calculator islands stay small).
import { cupsText, cupsNum, gramsText, lbText, litresText, quartsText } from '../lib/kitchen';

/** Fill {placeholders}; an unknown key is left visible so a missing value is easy to spot. */
export const tpl = (s: string, v: Record<string, string | number> = {}) => s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : m));

export type Units = { cup: string; cups: string };
/** Kitchen-friendly numbers in the visitor's language: localized cup words and decimal commas. */
export function makeFmt(u: Units, comma: boolean, rtl = false) {
  const dec = (s: string) => (comma ? s.replace(/(\d)\.(\d)/g, '$1,$2') : s);
  // In right-to-left text, keep "300 g" in one left-to-right run (Unicode isolate) so it is not split.
  const q = (s: string) => (rtl ? `⁦${dec(s)}⁩` : dec(s));
  return {
    dec,
    cups: (n: number) => cupsText(n).replace(/ cups?$/, (m) => ` ${m === ' cup' ? u.cup : u.cups}`),
    cupsNum: (n: number) => cupsNum(n),
    g: (g: number) => q(gramsText(g)),
    lb: (g: number) => q(lbText(g)),
    l: (ml: number) => q(litresText(ml)),
    qt: (ml: number) => q(quartsText(ml)),
    n: (n: number) => dec(String(n)),
  };
}
export type Fmt = ReturnType<typeof makeFmt>;
