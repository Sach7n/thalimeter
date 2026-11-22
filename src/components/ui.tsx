import { useEffect, useState, type ReactNode } from 'react';
import type { UnitSystem } from '../lib/kitchen';

export function Stepper({ label, value, onChange, min = 0, max = 500, hint }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; hint?: string }) {
  const set = (v: number) => onChange(Math.max(min, Math.min(max, Math.round(v) || 0)));
  const id = `st-${label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{label}{hint && <small> {hint}</small>}</label>
      <div className="stepper">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => set(value - 1)}>−</button>
        <input id={id} type="number" inputMode="numeric" min={min} max={max} value={value} onChange={(e) => set(Number(e.target.value))} />
        <button type="button" aria-label={`More ${label.toLowerCase()}`} onClick={() => set(value + 1)}>+</button>
      </div>
    </div>
  );
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

export function Stat({ label, main, sub, icon }: { label: string; main: ReactNode; sub?: ReactNode; icon?: string }) {
  return (
    <div className="stat">
      <span className="stat-label">{icon && <span aria-hidden="true" className="stat-icon">{icon}</span>}{label}</span>
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
      {done ? 'Copied ✓' : 'Copy result'}
    </button>
  );
}

/** Small sticky result bar for phones, so the answer stays visible while you change inputs. */
export function MobileBar({ label, value }: { label: string; value: ReactNode }) {
  return <div className="mbar" aria-hidden="true"><span>{label}</span><b>{value}</b></div>;
}
