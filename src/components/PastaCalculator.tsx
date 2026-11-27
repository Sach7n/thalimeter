import { useState } from 'react';
import { PASTA, PASTA_DEFAULT, PASTA_MEAL, pasta, round, type PastaInput, type PastaType, type PastaMeal, type Appetite } from '../lib/kitchen';
import { tpl } from '../i18n/fmt';
import { Stepper, Choice, Check, Stat, useUnits, UnitToggle, CopyButton, MobileBar, ResultLid, appetiteOptions, fmtOf, type T } from './ui';

export default function PastaCalculator({ preset = {}, t }: { preset?: Partial<PastaInput>; t: T }) {
  const [s, setS] = useState<PastaInput>({ ...PASTA_DEFAULT, ...preset });
  const [units, setUnits] = useUnits();
  const up = (p: Partial<PastaInput>) => setS((x) => ({ ...x, ...p }));
  const f = fmtOf(t), c = t.calc, cp = c.pasta, k = t.k;
  const r = pasta(s);
  const us = units === 'us';
  const people = s.adults + s.kids;
  const fresh = s.type === 'fresh' || s.type === 'filled';
  const packs = us ? tpl(cp.box, { n: f.n(round(r.boxes16oz, 0.25)) }) : tpl(cp.pack, { n: f.n(round(r.packs500g, 0.25)) });
  const jars = f.n(round(r.sauceJars24oz, 0.5));
  const summary = tpl(cp.summary, {
    adults: s.adults, kids: s.kids ? tpl(c.rice.kids, { n: s.kids }) : '',
    meal: k.pastaMeal[s.meal].label.toLowerCase(), type: k.pasta[s.type].label.toLowerCase(),
    g: f.g(r.g), lb: f.lb(r.g), dry: fresh ? cp.fresh : cp.dry, water: f.l(r.waterL * 1000),
  }) + ' — thalimeter.com';
  const sub = [us ? f.g(r.g) : f.lb(r.g), packs, r.cups ? tpl(cp.aboutDry, { cups: f.cups(r.cups) }) : '', r.bundles ? tpl(cp.bundles, { n: Math.ceil(r.bundles) }) : ''].filter(Boolean).join(' · ');
  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="row-2">
          <Stepper t={t} label={c.adults} value={s.adults} onChange={(adults) => up({ adults })} />
          <Stepper t={t} label={c.children} hint={c.under12} value={s.kids} onChange={(kids) => up({ kids })} />
        </div>
        <Choice<PastaMeal> label={cp.served} value={s.meal} onChange={(meal) => up({ meal })} wide
          options={(Object.keys(PASTA_MEAL) as PastaMeal[]).map((m) => ({ v: m, label: k.pastaMeal[m].label, hint: k.pastaMeal[m].hint }))} />
        <Choice<PastaType> label={cp.type} value={s.type} onChange={(type) => up({ type })}
          options={(Object.keys(PASTA) as PastaType[]).map((m) => ({ v: m, label: k.pasta[m].label }))} />
        <Choice<Appetite> label={c.appetite} value={s.appetite} onChange={(appetite) => up({ appetite })} options={appetiteOptions(t)} />
        <div className="checks">
          <Check label={c.buffet} checked={s.buffet} onChange={(buffet) => up({ buffet })} hint="−25%" />
          <Check label={c.extra} checked={s.extra} onChange={(extra) => up({ extra })} hint="+20%" />
        </div>
        <MobileBar label={fresh ? cp.mobileFresh : cp.mobileDry} value={us ? f.lb(r.g) : f.g(r.g)} people={people} />
      </div>
      <div className="calc-result" aria-live="polite">
        <div className="result-head"><span className="result-kicker">{fresh ? cp.kickerFresh : cp.kickerDry}</span><UnitToggle t={t} value={units} onChange={setUnits} /></div>
        <p className="result-big"><ResultLid t={t} n={people} />{us ? f.lb(r.g) : f.g(r.g)}</p>
        <p className="result-sub">{sub}</p>
        <div className="stats">
          <Stat label={cp.water} main={us ? f.qt(r.waterL * 1000) : f.l(r.waterL * 1000)} sub={cp.waterSub} />
          <Stat label={cp.salt} main={`${f.n(round(r.saltTsp, 0.5))} ${t.units.tsp}`} sub={tpl(cp.saltSub, { g: f.g(round(r.saltG, 5)) })} />
          <Stat label={cp.sauce} main={us ? tpl(cp.jarUs, { n: jars }) : f.g(r.sauceG)} sub={us ? f.g(r.sauceG) : tpl(cp.jarMetric, { n: jars })} />
          <Stat label={cp.cooked} main={us ? f.lb(r.cookedG) : f.g(r.cookedG)} sub={cp.drained} />
        </div>
        <p className="result-note" dangerouslySetInnerHTML={{ __html: tpl(cp.note, { g: f.g(r.perPersonG), tip: k.pasta[s.type].tip }) + (r.waterL > 8 ? cp.batches : '') }} />
        <div className="result-actions"><CopyButton t={t} text={summary} /></div>
      </div>
    </div>
  );
}
