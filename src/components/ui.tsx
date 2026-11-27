import { useEffect, useState, type ReactNode } from 'react';
import type { UnitSystem } from '../lib/kitchen';

export function Stepper({ label, value, onChange, min = 0, max = 500, hint }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; hint?: string }) {
  const set = (v: number) => onChange(Math.max(min, Math.min(max, Math.round(v) || 0)));
  const id = `st-${label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{label}{hint && <small> {hint}</small>}</label>
      <div className="stepper">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => set(value - 1)}><Icon d="minus" /></button>
        <input id={id} type="number" inputMode="numeric" min={min} max={max} value={value} onChange={(e) => set(Number(e.target.value))} />
        <button type="button" aria-label={`More ${label.toLowerCase()}`} onClick={() => set(value + 1)}><Icon d="plus" /></button>
      </div>
    </div>
  );
}

/** Authored icons: one 24px grid, 2.5 stroke, round caps (the painted-stroke set). */
export function Icon({ d }: { d: 'plus' | 'minus' }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d={d === 'plus' ? 'M12 5v14M5 12h14' : 'M5 12h14'} /></svg>;
}
/** The painted lid: headcount on a steel-rimmed plate. Re-keyed so each change re-stamps it. */
export function ResultLid({ n }: { n: number }) {
  const v = n;
  return <span key={v} className="lid lid-live" role="img" aria-label={`${v} people`}>{v}</span>;
}

export function Choice<T extends string>({ label, value, options, onChange, wide }: { label: string; value: T; options: { v: T; label: string; hint?: string }[]; onChange: (v: T) => void; wide?: boolean }) {
  return (
    <fieldset className={`field choice${wide ? ' choice-wide' : ''}`}>
      <legend className="field-label">{label}</legend>
      <div className="chips">
        {options.map((o) => (
          <button key={o.v} type="button" className="chip" aria-pressed={o.v === value} onClick={() => onChange(o.v)} title={o.hint}>
            {o.label}{o.hint && <small>{o.hint}</small>}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Check({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}{hint && <small>{hint}</small>}</span>
    </label>
  );
}

export function Stat({ label, main, sub }: { label: string; main: ReactNode; sub?: ReactNode }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-main">{main}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  );
}

/** US cups / metric preference, remembered in this browser when possible. */
export function useUnits(): [UnitSystem, (u: UnitSystem) => void] {
  const [u, setU] = useState<UnitSystem>('us');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tm-units');
      if (saved === 'us' || saved === 'metric') setU(saved);
      else if (!/^en-US/.test(navigator.language)) setU('metric');
    } catch { /* storage blocked */ }
  }, []);
  const set = (v: UnitSystem) => { setU(v); try { localStorage.setItem('tm-units', v); } catch { /* ignore */ } };
  return [u, set];
}
export function UnitToggle({ value, onChange }: { value: UnitSystem; onChange: (u: UnitSystem) => void }) {
  return (
    <div className="units" role="group" aria-label="Units">
      <button type="button" aria-pressed={value === 'us'} onClick={() => onChange('us')}>US cups · lb</button>
      <button type="button" aria-pressed={value === 'metric'} onClick={() => onChange('metric')}>Metric · g · L</button>
    </div>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className="btn btn-ghost" onClick={async () => { try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); } catch { /* ignore */ } }}>
      {done ? 'Copied' : 'Copy result'}
    </button>
  );
}

/** Small sticky result bar for phones, so the answer stays visible while you change inputs. */
export function MobileBar({ label, value, people }: { label: string; value: ReactNode; people?: number }) {
  return <div className="mbar" aria-hidden="true">{people !== undefined && <span className="lid">{people}</span>}<span>{label}</span><b>{value}</b></div>;
}
