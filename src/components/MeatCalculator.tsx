import { useState } from 'react';
import { MEAT, MEAT_DEFAULT, MEAT_SHARE, meat, gramsText, lbText, type MeatInput, type MeatType, type MeatShare, type Appetite } from '../lib/kitchen';
import { Stepper, Choice, Check, Stat, useUnits, UnitToggle, CopyButton, MobileBar, ResultLid } from './ui';

export default function MeatCalculator({ preset = {} }: { preset?: Partial<MeatInput> }) {
  const [s, setS] = useState<MeatInput>({ ...MEAT_DEFAULT, ...preset });
  const [units, setUnits] = useUnits();
  const up = (p: Partial<MeatInput>) => setS((x) => ({ ...x, ...p }));
  const r = meat(s);
  const t = MEAT[s.type];
  const us = units === 'us';
  const summary = `${t.label} for ${s.adults} adults${s.kids ? ` and ${s.kids} children` : ''}: buy ${lbText(r.rawG)} / ${gramsText(r.rawG)} raw. — thalimeter.com`;
  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="row-2">
          <Stepper label="Adults" value={s.adults} onChange={(adults) => up({ adults })} />
          <Stepper label="Children" hint="(under 12)" value={s.kids} onChange={(kids) => up({ kids })} />
        </div>
        <Choice<MeatType> label="What meat?" value={s.type} onChange={(type) => up({ type })}
          options={(Object.keys(MEAT) as MeatType[]).map((k) => ({ v: k, label: MEAT[k].label }))} />
        <Choice<MeatShare> label="Other mains?" value={s.share} onChange={(share) => up({ share })}
          options={(Object.keys(MEAT_SHARE) as MeatShare[]).map((k) => ({ v: k, label: MEAT_SHARE[k].label }))} />
        <Choice<Appetite> label="Appetite" value={s.appetite} onChange={(appetite) => up({ appetite })}
          options={[{ v: 'light', label: 'Light' }, { v: 'normal', label: 'Normal' }, { v: 'hearty', label: 'Hearty' }]} />
        <div className="checks">
          <Check label="Lots of sides or a buffet" checked={s.buffet} onChange={(buffet) => up({ buffet })} hint="−25%" />
          <Check label="Extra for seconds or leftovers" checked={s.extra} onChange={(extra) => up({ extra })} hint="+20%" />
        </div>
        <MobileBar label="Raw meat to buy" value={us ? lbText(r.rawG) : gramsText(r.rawG)} people={s.adults + s.kids} />
      </div>
      <div className="calc-result" aria-live="polite">
        <div className="result-head"><span className="result-kicker">Buy this much (raw weight)</span><UnitToggle value={units} onChange={setUnits} /></div>
        <p className="result-big"><ResultLid n={s.adults + s.kids} />{us ? lbText(r.rawG) : gramsText(r.rawG)}</p>
        <p className="result-sub">{us ? gramsText(r.rawG) : lbText(r.rawG)}{r.patties ? ` · ${r.patties} patties of ⅓ lb (150 g)` : ''}</p>
        <div className="stats">
          <Stat label="Per person" main={us ? lbText(r.perPersonG) : gramsText(r.perPersonG)} sub="raw" />
          <Stat label="On the plate" main={t.cookedNote.split(';')[0]} sub="per adult, only main" />
          <Stat label="Examples" main={<span className="stat-text">{t.examples}</span>} />
        </div>
        <p className="result-note">Raw weight is what you buy. Meat loses about 25% of its weight when cooked, and slow-cooked cuts like brisket and pork shoulder lose about half.</p>
        <div className="result-actions"><CopyButton text={summary} /></div>
      </div>
    </div>
  );
}
