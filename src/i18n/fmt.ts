// Client-safe helpers (no dictionaries here, so calculator islands stay small).
import { cupsText, cupsNum, gramsText, lbText, litresText, quartsText } from '../lib/kitchen';

/** Fill {placeholders}; an unknown key is left visible so a missing value is easy to spot. */
export const tpl = (s: string, v: Record<string, string | number> = {}) => s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : m));

export type Units = { cup: string; cups: string };
/** Kitchen-friendly numbers in the visitor's language: localized cup words and decimal commas. */
export function makeFmt(u: Units, comma: boolean) {
  const dec = (s: string) => (comma ? s.replace(/(\d)\.(\d)/g, '$1,$2') : s);
  return {
    dec,
    cups: (n: number) => cupsText(n).replace(/ cups?$/, (m) => ` ${m === ' cup' ? u.cup : u.cups}`),
    cupsNum: (n: number) => cupsNum(n),
    g: (g: number) => dec(gramsText(g)),
    lb: (g: number) => dec(lbText(g)),
    l: (ml: number) => dec(litresText(ml)),
    qt: (ml: number) => dec(quartsText(ml)),
    n: (n: number) => dec(String(n)),
  };
}
export type Fmt = ReturnType<typeof makeFmt>;
