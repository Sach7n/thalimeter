import { useState } from 'react';
import { MEAT, MEAT_DEFAULT, MEAT_SHARE, meat, type MeatInput, type MeatType, type MeatShare, type Appetite } from '../lib/kitchen';
import { tpl } from '../i18n/fmt';
import { Stepper, Choice, Check, Stat, useUnits, UnitToggle, CopyButton, MobileBar, ResultLid, appetiteOptions, fmtOf, type T } from './ui';

export default function MeatCalculator({ preset = {}, t }: { preset?: Partial<MeatInput>; t: T }) {
  const [s, setS] = useState<MeatInput>({ ...MEAT_DEFAULT, ...preset });
  const [units, setUnits] = useUnits();
  const up = (p: Partial<MeatInput>) => setS((x) => ({ ...x, ...p }));
  const f = fmtOf(t), c = t.calc, cm = c.meat, k = t.k;
  const r = meat(s);
  const m = k.meat[s.type];
  const us = units === 'us';
  const people = s.adults + s.kids;
  const summary = tpl(cm.summary, { type: m.label, adults: s.adults, kids: s.kids ? tpl(c.rice.kids, { n: s.kids }) : '', lb: f.lb(r.rawG), g: f.g(r.rawG) }) + ' — thalimeter.com';
  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="row-2">
          <Stepper t={t} label={c.adults} value={s.adults} onChange={(adults) => up({ adults })} />
          <Stepper t={t} label={c.children} hint={c.under12} value={s.kids} onChange={(kids) => up({ kids })} />
        </div>
        <Choice<MeatType> label={cm.type} value={s.type} onChange={(type) => up({ type })}
          options={(Object.keys(MEAT) as MeatType[]).map((x) => ({ v: x, label: k.meat[x].label }))} />
        <Choice<MeatShare> label={cm.share} value={s.share} onChange={(share) => up({ share })}
          options={(Object.keys(MEAT_SHARE) as MeatShare[]).map((x) => ({ v: x, label: k.share[x] }))} />
        <Choice<Appetite> label={c.appetite} value={s.appetite} onChange={(appetite) => up({ appetite })} options={appetiteOptions(t)} />
        <div className="checks">
          <Check label={cm.buffet} checked={s.buffet} onChange={(buffet) => up({ buffet })} hint="−25%" />
          <Check label={c.extra} checked={s.extra} onChange={(extra) => up({ extra })} hint="+20%" />
        </div>
        <MobileBar label={cm.mobile} value={us ? f.lb(r.rawG) : f.g(r.rawG)} people={people} />
      </div>
      <div className="calc-result" aria-live="polite">
        <div className="result-head"><span className="result-kicker">{cm.kicker}</span><UnitToggle t={t} value={units} onChange={setUnits} /></div>
        <p className="result-big"><ResultLid t={t} n={people} />{us ? f.lb(r.rawG) : f.g(r.rawG)}</p>
        <p className="result-sub">{us ? f.g(r.rawG) : f.lb(r.rawG)}{r.patties ? ` · ${tpl(cm.patties, { n: r.patties })}` : ''}</p>
        <div className="stats">
          <Stat label={cm.perPerson} main={us ? f.lb(r.perPersonG) : f.g(r.perPersonG)} sub={cm.raw} />
          <Stat label={cm.plate} main={m.cookedNote.split(';')[0]} sub={cm.plateSub} />
          <Stat label={cm.examples} main={<span className="stat-text">{m.examples}</span>} />
        </div>
        <p className="result-note">{cm.note}</p>
        <div className="result-actions"><CopyButton t={t} text={summary} /></div>
      </div>
    </div>
  );
}
