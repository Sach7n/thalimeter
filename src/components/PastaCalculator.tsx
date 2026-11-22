import { useState } from 'react';
import { PASTA, PASTA_DEFAULT, PASTA_MEAL, pasta, gramsText, lbText, cupsText, litresText, quartsText, round, type PastaInput, type PastaType, type PastaMeal, type Appetite } from '../lib/kitchen';
import { Stepper, Choice, Check, Stat, useUnits, UnitToggle, CopyButton, MobileBar } from './ui';

export default function PastaCalculator({ preset = {} }: { preset?: Partial<PastaInput> }) {
  const [s, setS] = useState<PastaInput>({ ...PASTA_DEFAULT, ...preset });
  const [units, setUnits] = useUnits();
  const up = (p: Partial<PastaInput>) => setS((x) => ({ ...x, ...p }));
  const r = pasta(s);
  const t = PASTA[s.type];
  const us = units === 'us';
  const dryWord = s.type === 'fresh' || s.type === 'filled' ? 'fresh' : 'dry';
  const packs = us ? `${round(r.boxes16oz, 0.25)} × 1 lb box` : `${round(r.packs500g, 0.25)} × 500 g pack`;
  const summary = `Pasta for ${s.adults} adults${s.kids ? ` and ${s.kids} children` : ''} (${PASTA_MEAL[s.meal].label.toLowerCase()}, ${t.label.toLowerCase()}): ${gramsText(r.g)} / ${lbText(r.g)} ${dryWord}, ${litresText(r.waterL * 1000)} water. — thalimeter.com`;
  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="row-2">
          <Stepper label="Adults" value={s.adults} onChange={(adults) => up({ adults })} />
          <Stepper label="Children" hint="(under 12)" value={s.kids} onChange={(kids) => up({ kids })} />
        </div>
        <Choice<PastaMeal> label="How is pasta served?" value={s.meal} onChange={(meal) => up({ meal })} wide
          options={(Object.keys(PASTA_MEAL) as PastaMeal[]).map((k) => ({ v: k, label: PASTA_MEAL[k].label, hint: PASTA_MEAL[k].hint }))} />
        <Choice<PastaType> label="Type of pasta" value={s.type} onChange={(type) => up({ type })}
          options={(Object.keys(PASTA) as PastaType[]).map((k) => ({ v: k, label: PASTA[k].label }))} />
        <Choice<Appetite> label="Appetite" value={s.appetite} onChange={(appetite) => up({ appetite })}
          options={[{ v: 'light', label: 'Light' }, { v: 'normal', label: 'Normal' }, { v: 'hearty', label: 'Hearty' }]} />
        <div className="checks">
          <Check label="Buffet with lots of other dishes" checked={s.buffet} onChange={(buffet) => up({ buffet })} hint="−25%" />
          <Check label="Extra for seconds or leftovers" checked={s.extra} onChange={(extra) => up({ extra })} hint="+20%" />
        </div>
        <MobileBar label={`${dryWord[0].toUpperCase()}${dryWord.slice(1)} pasta`} value={us ? lbText(r.g) : gramsText(r.g)} />
      </div>
      <div className="calc-result" aria-live="polite">
        <div className="result-head"><span className="result-kicker">Cook this much {dryWord} pasta</span><UnitToggle value={units} onChange={setUnits} /></div>
        <p className="result-big">{us ? lbText(r.g) : gramsText(r.g)}</p>
        <p className="result-sub">{us ? gramsText(r.g) : lbText(r.g)} · {packs}{r.cups ? ` · about ${cupsText(r.cups)} dry` : ''}{r.bundles ? ` · ${Math.ceil(r.bundles)} quarter-size bundles` : ''}</p>
        <div className="stats">
          <Stat icon="💧" label="Water to boil" main={us ? quartsText(r.waterL * 1000) : litresText(r.waterL * 1000)} sub="about 1 L per 100 g" />
          <Stat icon="🧂" label="Salt for the water" main={`${round(r.saltTsp, 0.5)} tsp`} sub={`about ${round(r.saltG, 5)} g table salt`} />
          <Stat icon="🫙" label="Sauce" main={us ? `${round(r.sauceJars24oz, 0.5)} × 24 oz jar` : gramsText(r.sauceG)} sub={us ? gramsText(r.sauceG) : `${round(r.sauceJars24oz, 0.5)} × 680 g jar`} />
          <Stat icon="🍝" label="Cooked pasta" main={us ? lbText(r.cookedG) : gramsText(r.cookedG)} sub="after draining" />
        </div>
        <p className="result-note">Per person: <b>{gramsText(r.perPersonG)}</b>. {t.tip}{r.waterL > 8 ? ' For this much pasta, cook in batches or use two pots.' : ''}</p>
        <div className="result-actions"><CopyButton text={summary} /></div>
      </div>
    </div>
  );
}
