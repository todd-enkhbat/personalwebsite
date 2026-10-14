"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type Sample = { time: number; value: number };

export function appendSample(history: Sample[], sample: Sample) {
  return [...history.slice(-239), sample];
}

/** 30 updates/s, suspended in background tabs. All experiments start paused. */
export function useSimulation(active: boolean, step: (dt: number) => void) {
  const callback = useRef(step);
  useEffect(() => { callback.current = step; }, [step]);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let previous = 0;
    let accumulated = 0;
    const tick = (now: number) => {
      if (document.hidden) { previous = 0; accumulated = 0; }
      else {
        if (previous) accumulated += Math.min((now - previous) / 1000, 0.1);
        previous = now;
        if (accumulated >= 1 / 30) { callback.current(accumulated); accumulated = 0; }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);
}

export function Range({ id, label, value, min, max, step = 1, suffix = "", onChange, description }: {
  id: string; label: string; value: number; min: number; max: number; step?: number;
  suffix?: string; onChange: (value: number) => void; description?: string;
}) {
  return <div className="ph-control">
    <label htmlFor={id}>{label}<output htmlFor={id}>{value}{suffix}</output></label>
    <input id={id} type="range" min={min} max={max} step={step} value={value}
      aria-describedby={description ? `${id}-help` : undefined} onChange={(e) => onChange(Number(e.target.value))} />
    {description ? <p id={`${id}-help`}>{description}</p> : null}
  </div>;
}

export function Metric({ label, value, unit, detail }: { label: string; value: ReactNode; unit?: string; detail?: string }) {
  return <div className="ph-metric"><span>{label}</span><strong>{value}{unit ? <small> {unit}</small> : null}</strong>{detail ? <p>{detail}</p> : null}</div>;
}

export function Trace({ samples, label, max, unit = "", reference }: { samples: Sample[]; label: string; max: number; unit?: string; reference?: string }) {
  const start = samples[0]?.time ?? 0;
  const end = Math.max(start + 1, samples.at(-1)?.time ?? 1);
  const ceiling = Math.max(max, 0.0001);
  const points = samples.map((sample) => `${48 + (sample.time - start) / (end - start) * 620},${88 - Math.max(0, Math.min(1, sample.value / ceiling)) * 65}`).join(" ");
  return <figure className="ph-trace">
    <figcaption><span>{label}</span><span>{reference ?? unit}</span></figcaption>
    <svg viewBox="0 0 700 118" role="img" aria-label={`${label}. Latest value: ${(samples.at(-1)?.value ?? 0).toFixed(2)} ${unit}. Time ${start.toFixed(1)} to ${end.toFixed(1)}.`}>
      <line x1="48" y1="23" x2="668" y2="23" className="ph-chart-guide" />
      <line x1="48" y1="88" x2="668" y2="88" className="ph-chart-axis" />
      <text x="38" y="27" textAnchor="end">{max >= 10 ? Math.round(max) : max.toFixed(1)}</text>
      <text x="38" y="92" textAnchor="end">0</text>
      <polyline points={points} fill="none" className="ph-chart-line" />
      <text x="48" y="111">{start.toFixed(0)}</text><text x="668" y="111" textAnchor="end">{end.toFixed(0)} model time</text>
    </svg>
  </figure>;
}

export function ModelNote({ children }: { children: ReactNode }) {
  return <details className="ph-model-note"><summary>Inside this model <span aria-hidden="true">+</span></summary><div>{children}</div></details>;
}

export function Transport({ running, finished = false, onToggle, onReset, onStep, children }: { running: boolean; finished?: boolean; onToggle: () => void; onReset: () => void; onStep?: () => void; children?: ReactNode }) {
  return <div className="ph-transport">
    <button type="button" className="ph-button ph-button-primary" disabled={finished} onClick={onToggle}>{finished ? "At equilibrium" : running ? "Pause" : "Run experiment"}<span aria-hidden="true">{finished ? "✓" : running ? "Ⅱ" : "▷"}</span></button>
    {onStep ? <button type="button" className="ph-button" onClick={onStep} disabled={running}>Step +1</button> : null}
    <button type="button" className="ph-text-button" onClick={onReset}>Reset ↺</button>
    {children}
  </div>;
}
