import { useState } from 'react';
import { RICE, RICE_DEFAULT, RICE_MEAL, RICE_METHOD_LABEL, rice, cupsText, gramsText, litresText, quartsText, round, type RiceInput, type RiceType, type RiceMeal, type RiceMethod, type Appetite } from '../lib/kitchen';
import { Stepper, Choice, Check, Stat, useUnits, UnitToggle, CopyButton, MobileBar, ResultLid } from './ui';

export default function RiceCalculator({ preset = {} }: { preset?: Partial<RiceInput> }) {
  const [s, setS] = useState<RiceInput>({ ...RICE_DEFAULT, ...preset });
  const [units, setUnits] = useUnits();
  const up = (p: Partial<RiceInput>) => setS((x) => ({ ...x, ...p }));
  const r = rice(s);
  const t = RICE[s.type];
  const us = units === 'us';
  const dryMain = us ? cupsText(r.dryCups) : gramsText(r.dryG);
  const drySub = us ? `${gramsText(r.dryG)} · ${round(r.cookerCups, 0.5)} rice-cooker cups` : `${cupsText(r.dryCups)} (US) · ${round(r.cookerCups, 0.5)} rice-cooker cups`;
  const water = us ? cupsText(r.waterCups) : litresText(r.waterMl);
  const summary = `Rice for ${s.adults} adults${s.kids ? ` and ${s.kids} children` : ''} (${RICE_MEAL[s.meal].label.toLowerCase()}, ${t.label.toLowerCase()}): ${cupsText(r.dryCups)} / ${gramsText(r.dryG)} uncooked, ${cupsText(r.waterCups)} / ${litresText(r.waterMl)} water, makes about ${cupsText(r.cookedCups)} (${gramsText(r.cookedG)}) cooked. — thalimeter.com`;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="row-2">
          <Stepper label="Adults" value={s.adults} onChange={(adults) => up({ adults })} />
          <Stepper label="Children" hint="(under 12)" value={s.kids} onChange={(kids) => up({ kids })} />
        </div>
        <Choice<RiceMeal> label="How is rice served?" value={s.meal} onChange={(meal) => up({ meal })}
          options={(Object.keys(RICE_MEAL) as RiceMeal[]).map((k) => ({ v: k, label: RICE_MEAL[k].label, hint: RICE_MEAL[k].hint }))} wide />
        <Choice<RiceType> label="Type of rice" value={s.type} onChange={(type) => up({ type })}
          options={(Object.keys(RICE) as RiceType[]).map((k) => ({ v: k, label: RICE[k].label }))} />
        <Choice<RiceMethod> label="How will you cook it?" value={s.method} onChange={(method) => up({ method })}
          options={(Object.keys(RICE_METHOD_LABEL) as RiceMethod[]).map((k) => ({ v: k, label: RICE_METHOD_LABEL[k] }))} />
        <Choice<Appetite> label="Appetite" value={s.appetite} onChange={(appetite) => up({ appetite })}
          options={[{ v: 'light', label: 'Light' }, { v: 'normal', label: 'Normal' }, { v: 'hearty', label: 'Hearty' }]} />
        <div className="checks">
          <Check label="Buffet with lots of other dishes" checked={s.buffet} onChange={(buffet) => up({ buffet })} hint="−25%" />
          <Check label="Extra for seconds or leftovers" checked={s.extra} onChange={(extra) => up({ extra })} hint="+20%" />
        </div>
        <MobileBar label="Uncooked rice" value={dryMain} people={s.adults + s.kids} />
      </div>

      <div className="calc-result" aria-live="polite">
        <div className="result-head">
          <span className="result-kicker">Cook this much uncooked rice</span>
          <UnitToggle value={units} onChange={setUnits} />
        </div>
        <p className="result-big"><ResultLid n={s.adults + s.kids} />{dryMain}</p>
        <p className="result-sub">{drySub}</p>
        <div className="stats">
          <Stat label="Water" main={water} sub={s.method === 'cooker' ? 'or fill to your cooker’s line' : `${t.water[s.method]} : 1 water to rice`} />
          <Stat label="Cooked rice" main={us ? cupsText(r.cookedCups) : gramsText(r.cookedG)} sub={us ? gramsText(r.cookedG) : cupsText(r.cookedCups)} />
          <Stat label="Pot size" main={us ? quartsText(r.potL * 1000) : `${r.potL} L`} sub={us ? `${r.potL} L or bigger` : `${quartsText(r.potL * 1000)} or bigger`} />
          <Stat label="Cook time" main={r.minutes ? `${r.minutes} min` : 'Cooker setting'} sub={s.method === 'instantpot' ? 'high pressure + 10 min natural release' : s.method === 'stovetop' ? 'covered, low heat, then rest 10 min' : `${r.cookerBatches.small} batch${r.cookerBatches.small > 1 ? 'es' : ''} in a 5.5-cup cooker`} />
        </div>
        <p className="result-note">Per person: <b>{gramsText(r.perPersonDryG)}</b> uncooked. {t.tip}</p>
        <div className="result-actions"><CopyButton text={summary} /></div>
      </div>
    </div>
  );
}
