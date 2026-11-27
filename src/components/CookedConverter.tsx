import { useState } from 'react';
import { RICE, convertRice, cupsText, gramsText, type RiceType } from '../lib/kitchen';
import { Choice, Stat } from './ui';

export default function CookedConverter() {
  const [dir, setDir] = useState<'toCooked' | 'toDry'>('toCooked');
  const [unit, setUnit] = useState<'cups' | 'grams'>('cups');
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState<RiceType>('white');
  const c = convertRice(Math.max(0, amount), unit, dir, type);
  const toCooked = dir === 'toCooked';
  return (
    <div className="calc">
      <div className="calc-inputs">
        <Choice<'toCooked' | 'toDry'> label="I have" value={dir} onChange={setDir} options={[{ v: 'toCooked', label: 'Uncooked rice → cooked' }, { v: 'toDry', label: 'Cooked rice → uncooked' }]} />
        <div className="field">
          <label className="field-label" htmlFor="cv-amount">Amount of {toCooked ? 'uncooked' : 'cooked'} rice</label>
          <div className="amount">
            <input id="cv-amount" type="number" inputMode="decimal" min={0} step={unit === 'cups' ? 0.25 : 25} value={amount} onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))} />
            <div className="units" role="group" aria-label="Unit">
              <button type="button" aria-pressed={unit === 'cups'} onClick={() => setUnit('cups')}>cups</button>
              <button type="button" aria-pressed={unit === 'grams'} onClick={() => setUnit('grams')}>grams</button>
            </div>
          </div>
        </div>
        <Choice<RiceType> label="Type of rice" value={type} onChange={setType} options={(Object.keys(RICE) as RiceType[]).map((k) => ({ v: k, label: RICE[k].label }))} />
      </div>
      <div className="calc-result" aria-live="polite">
        <span className="result-kicker">{toCooked ? 'Makes about' : 'Start with about'}</span>
        <p className="result-big">{toCooked ? cupsText(c.cookedCups) : cupsText(c.dryCups)}</p>
        <p className="result-sub">{toCooked ? `${gramsText(c.cookedG)} of cooked rice` : `${gramsText(c.dryG)} of uncooked rice`}</p>
        <div className="stats">
          <Stat label="Volume" main={`× ${RICE[type].yieldVol}`} sub="cooked cups per uncooked cup" />
          <Stat label="Weight" main={`× ${RICE[type].yieldWt}`} sub="cooked grams per uncooked gram" />
          <Stat label="Servings" main={`${Math.max(1, Math.round(c.dryG / 85))}–${Math.max(1, Math.round(c.dryG / 50))}`} sub="as a main – as a side" />
        </div>
        <p className="result-note">Rice takes in water as it cooks, so it gets heavier and bigger. Weight grows less than volume because cooked grains are less tightly packed.</p>
      </div>
    </div>
  );
}
