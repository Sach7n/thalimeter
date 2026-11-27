import { useState } from 'react';
import { RICE, RICE_METHOD_LABEL, riceFromDry, cupsText, gramsText, litresText, US_CUP_ML, type RiceType, type RiceMethod } from '../lib/kitchen';
import { Choice, Stat, useUnits, UnitToggle } from './ui';

export default function RiceWaterCalculator({ preset = {} }: { preset?: { type?: RiceType; method?: RiceMethod } }) {
  const [type, setType] = useState<RiceType>(preset.type ?? 'white');
  const [method, setMethod] = useState<RiceMethod>(preset.method ?? 'stovetop');
  const [units, setUnits] = useUnits();
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState<'cups' | 'grams'>('cups');
  const t = RICE[type];
  const dryG = unit === 'grams' ? amount : amount * t.gPerCup;
  const r = riceFromDry(Math.max(0, dryG), type, method);
  const us = units === 'us';
  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="field">
          <label className="field-label" htmlFor="rw-amount">How much uncooked rice?</label>
          <div className="amount">
            <input id="rw-amount" type="number" inputMode="decimal" min={0} step={unit === 'cups' ? 0.25 : 25} value={amount} onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))} />
            <div className="units" role="group" aria-label="Amount unit">
              <button type="button" aria-pressed={unit === 'cups'} onClick={() => { if (unit !== 'cups') { setUnit('cups'); setAmount(Math.round((amount / t.gPerCup) * 4) / 4 || 1); } }}>cups</button>
              <button type="button" aria-pressed={unit === 'grams'} onClick={() => { if (unit !== 'grams') { setUnit('grams'); setAmount(Math.round(amount * t.gPerCup / 5) * 5); } }}>grams</button>
            </div>
          </div>
        </div>
        <Choice<RiceType> label="Type of rice" value={type} onChange={setType} options={(Object.keys(RICE) as RiceType[]).map((k) => ({ v: k, label: RICE[k].label }))} />
        <Choice<RiceMethod> label="Cooking method" value={method} onChange={setMethod} options={(Object.keys(RICE_METHOD_LABEL) as RiceMethod[]).map((k) => ({ v: k, label: RICE_METHOD_LABEL[k] }))} />
      </div>
      <div className="calc-result" aria-live="polite">
        <div className="result-head"><span className="result-kicker">Add this much water</span><UnitToggle value={units} onChange={setUnits} /></div>
        <p className="result-big">{us ? cupsText(r.waterCups) : litresText(r.waterMl)}</p>
        <p className="result-sub">Ratio <b>{t.water[method]} : 1</b> (water : rice, by volume) · {us ? litresText(r.waterMl) : cupsText(r.waterCups)}</p>
        <div className="stats">
          <Stat label="You will get" main={us ? cupsText(r.cookedCups) : gramsText(r.cookedG)} sub="cooked rice" />
          <Stat label="Cook time" main={r.minutes ? `${r.minutes} min` : 'Cooker setting'} sub={method === 'instantpot' ? '+ 10 min natural release' : method === 'stovetop' ? 'then rest 10 min, lid on' : 'use the white or brown rice setting'} />
          <Stat label="Serves about" main={`${Math.max(1, Math.round(dryG / 85))}–${Math.max(1, Math.round(dryG / 50))}`} sub="as a main – as a side" />
        </div>
        <p className="result-note">{t.tip} {method === 'cooker' ? 'Rice cookers lose very little water, so they need less than a pot.' : method === 'instantpot' ? 'Never fill an Instant Pot above the half line with rice.' : 'Bring to a boil, cover, turn the heat to low and do not lift the lid.'}</p>
      </div>
      <div className="ratio-table">
        <h3>Water-to-rice ratios at a glance</h3>
        <table className="table">
          <thead><tr><th>Rice</th>{(Object.keys(RICE_METHOD_LABEL) as RiceMethod[]).map((m) => <th key={m} className="n">{RICE_METHOD_LABEL[m]}</th>)}</tr></thead>
          <tbody>{(Object.keys(RICE) as RiceType[]).map((k) => (
            <tr key={k} className={k === type ? 'is-on' : ''}><td>{RICE[k].label}</td>{(Object.keys(RICE_METHOD_LABEL) as RiceMethod[]).map((m) => <td key={m} className="n">{RICE[k].water[m]} : 1</td>)}</tr>
          ))}</tbody>
        </table>
        <p className="muted small">Cups of water for each cup of uncooked rice. 1 US cup = {Math.round(US_CUP_ML)} ml.</p>
      </div>
    </div>
  );
}
