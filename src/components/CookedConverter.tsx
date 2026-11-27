import { useState } from 'react';
import { RICE, convertRice, type RiceType } from '../lib/kitchen';
import { tpl } from '../i18n/fmt';
import { Choice, Stat, fmtOf, type T } from './ui';

export default function CookedConverter({ t }: { t: T }) {
  const [dir, setDir] = useState<'toCooked' | 'toDry'>('toCooked');
  const [unit, setUnit] = useState<'cups' | 'grams'>('cups');
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState<RiceType>('white');
  const f = fmtOf(t), cc = t.calc.convert;
  const c = convertRice(Math.max(0, amount), unit, dir, type);
  const toCooked = dir === 'toCooked';
  return (
    <div className="calc">
      <div className="calc-inputs">
        <Choice<'toCooked' | 'toDry'> label={cc.have} value={dir} onChange={setDir} options={[{ v: 'toCooked', label: cc.toCooked }, { v: 'toDry', label: cc.toDry }]} />
        <div className="field">
          <label className="field-label" htmlFor="cv-amount">{toCooked ? cc.amountUncooked : cc.amountCooked}</label>
          <div className="amount">
            <input id="cv-amount" type="number" inputMode="decimal" min={0} step={unit === 'cups' ? 0.25 : 25} value={amount} onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))} />
            <div className="units" role="group" aria-label={t.units.amountAria}>
              <button type="button" aria-pressed={unit === 'cups'} onClick={() => setUnit('cups')}>{t.units.amountCups}</button>
              <button type="button" aria-pressed={unit === 'grams'} onClick={() => setUnit('grams')}>{t.units.amountGrams}</button>
            </div>
          </div>
        </div>
        <Choice<RiceType> label={t.calc.rice.type} value={type} onChange={setType} options={(Object.keys(RICE) as RiceType[]).map((x) => ({ v: x, label: t.k.rice[x].label }))} />
      </div>
      <div className="calc-result" aria-live="polite">
        <span className="result-kicker">{toCooked ? cc.makes : cc.start}</span>
        <p className="result-big">{toCooked ? f.cups(c.cookedCups) : f.cups(c.dryCups)}</p>
        <p className="result-sub">{toCooked ? tpl(cc.ofCooked, { g: f.g(c.cookedG) }) : tpl(cc.ofUncooked, { g: f.g(c.dryG) })}</p>
        <div className="stats">
          <Stat label={cc.volume} main={`× ${f.n(RICE[type].yieldVol)}`} sub={cc.volumeSub} />
          <Stat label={cc.weight} main={`× ${f.n(RICE[type].yieldWt)}`} sub={cc.weightSub} />
          <Stat label={cc.servings} main={`${Math.max(1, Math.round(c.dryG / 85))}–${Math.max(1, Math.round(c.dryG / 50))}`} sub={t.calc.water.servesSub} />
        </div>
        <p className="result-note">{cc.note}</p>
      </div>
    </div>
  );
}
