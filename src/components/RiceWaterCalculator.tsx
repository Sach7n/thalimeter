import { useState } from 'react';
import { RICE, RICE_METHOD_LABEL, riceFromDry, US_CUP_ML, type RiceType, type RiceMethod } from '../lib/kitchen';
import { tpl } from '../i18n/fmt';
import { Choice, Stat, useUnits, UnitToggle, fmtOf, type T } from './ui';

export default function RiceWaterCalculator({ preset = {}, t }: { preset?: { type?: RiceType; method?: RiceMethod }; t: T }) {
  const [type, setType] = useState<RiceType>(preset.type ?? 'white');
  const [method, setMethod] = useState<RiceMethod>(preset.method ?? 'stovetop');
  const [units, setUnits] = useUnits();
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState<'cups' | 'grams'>('cups');
  const f = fmtOf(t), cw = t.calc.water, k = t.k;
  const ty = RICE[type];
  const dryG = unit === 'grams' ? amount : amount * ty.gPerCup;
  const r = riceFromDry(Math.max(0, dryG), type, method);
  const us = units === 'us';
  const methods = Object.keys(RICE_METHOD_LABEL) as RiceMethod[];
  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="field">
          <label className="field-label" htmlFor="rw-amount">{cw.amount}</label>
          <div className="amount">
            <input id="rw-amount" type="number" inputMode="decimal" min={0} step={unit === 'cups' ? 0.25 : 25} value={amount} onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))} />
            <div className="units" role="group" aria-label={t.units.amountAria}>
              <button type="button" aria-pressed={unit === 'cups'} onClick={() => { if (unit !== 'cups') { setUnit('cups'); setAmount(Math.round((amount / ty.gPerCup) * 4) / 4 || 1); } }}>{t.units.amountCups}</button>
              <button type="button" aria-pressed={unit === 'grams'} onClick={() => { if (unit !== 'grams') { setUnit('grams'); setAmount(Math.round(amount * ty.gPerCup / 5) * 5); } }}>{t.units.amountGrams}</button>
            </div>
          </div>
        </div>
        <Choice<RiceType> label={t.calc.rice.type} value={type} onChange={setType} options={(Object.keys(RICE) as RiceType[]).map((x) => ({ v: x, label: k.rice[x].label }))} />
        <Choice<RiceMethod> label={cw.method} value={method} onChange={setMethod} options={methods.map((x) => ({ v: x, label: k.method[x] }))} />
      </div>
      <div className="calc-result" aria-live="polite">
        <div className="result-head"><span className="result-kicker">{cw.kicker}</span><UnitToggle t={t} value={units} onChange={setUnits} /></div>
        <p className="result-big">{us ? f.cups(r.waterCups) : f.l(r.waterMl)}</p>
        <p className="result-sub" dangerouslySetInnerHTML={{ __html: tpl(cw.ratio, { r: f.n(ty.water[method]), alt: us ? f.l(r.waterMl) : f.cups(r.waterCups) }) }} />
        <div className="stats">
          <Stat label={cw.get} main={us ? f.cups(r.cookedCups) : f.g(r.cookedG)} sub={cw.cookedRice} />
          <Stat label={t.calc.rice.time} main={r.minutes ? `${r.minutes} ${t.units.min}` : t.calc.rice.cookerSetting} sub={method === 'instantpot' ? cw.ipSub : method === 'stovetop' ? cw.stoveSub : cw.cookerSub} />
          <Stat label={cw.serves} main={`${Math.max(1, Math.round(dryG / 85))}–${Math.max(1, Math.round(dryG / 50))}`} sub={cw.servesSub} />
        </div>
        <p className="result-note">{k.rice[type].tip} {method === 'cooker' ? cw.cookerNote : method === 'instantpot' ? cw.ipNote : cw.stoveNote}</p>
      </div>
      <div className="ratio-table">
        <h3>{cw.table}</h3>
        <table className="table">
          <thead><tr><th>{cw.rice}</th>{methods.map((m) => <th key={m} className="n">{k.method[m]}</th>)}</tr></thead>
          <tbody>{(Object.keys(RICE) as RiceType[]).map((x) => (
            <tr key={x} className={x === type ? 'is-on' : ''}><td>{k.rice[x].label}</td>{methods.map((m) => <td key={m} className="n">{f.n(RICE[x].water[m])} : 1</td>)}</tr>
          ))}</tbody>
        </table>
        <p className="muted small">{tpl(cw.tableNote, { ml: Math.round(US_CUP_ML) })}</p>
      </div>
    </div>
  );
}
