import { useState } from 'react';
import { RICE, RICE_DEFAULT, RICE_MEAL, RICE_METHOD_LABEL, rice, round, type RiceInput, type RiceType, type RiceMeal, type RiceMethod, type Appetite } from '../lib/kitchen';
import { tpl } from '../i18n/fmt';
import { Stepper, Choice, Check, Stat, useUnits, UnitToggle, CopyButton, MobileBar, ResultLid, appetiteOptions, fmtOf, type T } from './ui';

export default function RiceCalculator({ preset = {}, t }: { preset?: Partial<RiceInput>; t: T }) {
  const [s, setS] = useState<RiceInput>({ ...RICE_DEFAULT, ...preset });
  const [units, setUnits] = useUnits();
  const up = (p: Partial<RiceInput>) => setS((x) => ({ ...x, ...p }));
  const f = fmtOf(t), c = t.calc, cr = c.rice, k = t.k;
  const r = rice(s);
  const ty = RICE[s.type];
  const us = units === 'us';
  const people = s.adults + s.kids;
  const cooker = f.n(round(r.cookerCups, 0.5));
  const dryMain = us ? f.cups(r.dryCups) : f.g(r.dryG);
  const drySub = us ? tpl(cr.subUs, { g: f.g(r.dryG), cooker }) : tpl(cr.subMetric, { cups: f.cups(r.dryCups), cooker });
  const water = us ? f.cups(r.waterCups) : f.l(r.waterMl);
  const summary = tpl(cr.summary, {
    adults: s.adults, kids: s.kids ? tpl(cr.kids, { n: s.kids }) : '',
    meal: k.riceMeal[s.meal].label.toLowerCase(), type: k.rice[s.type].label.toLowerCase(),
    cups: f.cups(r.dryCups), g: f.g(r.dryG), wcups: f.cups(r.waterCups), wl: f.l(r.waterMl), ccups: f.cups(r.cookedCups), cg: f.g(r.cookedG),
  }) + ' — thalimeter.com';

  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="row-2">
          <Stepper t={t} label={c.adults} value={s.adults} onChange={(adults) => up({ adults })} />
          <Stepper t={t} label={c.children} hint={c.under12} value={s.kids} onChange={(kids) => up({ kids })} />
        </div>
        <Choice<RiceMeal> label={cr.served} value={s.meal} onChange={(meal) => up({ meal })}
          options={(Object.keys(RICE_MEAL) as RiceMeal[]).map((m) => ({ v: m, label: k.riceMeal[m].label, hint: k.riceMeal[m].hint }))} wide />
        <Choice<RiceType> label={cr.type} value={s.type} onChange={(type) => up({ type })}
          options={(Object.keys(RICE) as RiceType[]).map((m) => ({ v: m, label: k.rice[m].label }))} />
        <Choice<RiceMethod> label={cr.method} value={s.method} onChange={(method) => up({ method })}
          options={(Object.keys(RICE_METHOD_LABEL) as RiceMethod[]).map((m) => ({ v: m, label: k.method[m] }))} />
        <Choice<Appetite> label={c.appetite} value={s.appetite} onChange={(appetite) => up({ appetite })} options={appetiteOptions(t)} />
        <div className="checks">
          <Check label={c.buffet} checked={s.buffet} onChange={(buffet) => up({ buffet })} hint="−25%" />
          <Check label={c.extra} checked={s.extra} onChange={(extra) => up({ extra })} hint="+20%" />
        </div>
        <MobileBar label={cr.mobile} value={dryMain} people={people} />
      </div>

      <div className="calc-result" aria-live="polite">
        <div className="result-head">
          <span className="result-kicker">{cr.kicker}</span>
          <UnitToggle t={t} value={units} onChange={setUnits} />
        </div>
        <p className="result-big"><ResultLid t={t} n={people} />{dryMain}</p>
        <p className="result-sub">{drySub}</p>
        <div className="stats">
          <Stat label={cr.water} main={water} sub={s.method === 'cooker' ? cr.cookerLine : tpl(cr.ratio, { r: f.n(ty.water[s.method]) })} />
          <Stat label={cr.cooked} main={us ? f.cups(r.cookedCups) : f.g(r.cookedG)} sub={us ? f.g(r.cookedG) : f.cups(r.cookedCups)} />
          <Stat label={cr.pot} main={us ? f.qt(r.potL * 1000) : `${f.n(r.potL)} L`} sub={tpl(cr.potBigger, { v: us ? `${f.n(r.potL)} L` : f.qt(r.potL * 1000) })} />
          <Stat label={cr.time} main={r.minutes ? `${r.minutes} ${t.units.min}` : cr.cookerSetting}
            sub={s.method === 'instantpot' ? cr.ipNote : s.method === 'stovetop' ? cr.stoveNote : tpl(r.cookerBatches.small > 1 ? cr.batches : cr.batch, { n: r.cookerBatches.small })} />
        </div>
        <p className="result-note" dangerouslySetInnerHTML={{ __html: tpl(cr.note, { g: f.g(r.perPersonDryG), tip: k.rice[s.type].tip }) }} />
        <div className="result-actions"><CopyButton t={t} text={summary} /></div>
      </div>
    </div>
  );
}
