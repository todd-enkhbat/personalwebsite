"use client";

import { useRef, useState } from "react";
import { availableWork, createWorld, diffuseWorld, entropyChange, WORLD_COLUMNS, WORLD_ROWS, type WorldPattern } from "../../lib/entropy";
import { appendSample, Metric, ModelNote, Range, Trace, Transport, useSimulation, type Sample } from "./LabTools";

export function WorldExperiment({ active, onObserve }: { active: boolean; onObserve: (note: string) => void }) {
  const [contrast, setContrast] = useState(80);
  const [coupling, setCoupling] = useState(1);
  const [speed, setSpeed] = useState(4);
  const [pattern, setPattern] = useState<WorldPattern>("island");
  const [running, setRunning] = useState(false);
  const [temperatures, setTemperatures] = useState(() => createWorld(0.8, "island"));
  const live = useRef(temperatures);
  const initial = useRef(temperatures);
  const time = useRef(0);
  const lastSample = useRef(0);
  const [history, setHistory] = useState<Sample[]>([{ time: 0, value: availableWork(temperatures) }]);
  const potential = availableWork(temperatures);
  const startingPotential = availableWork(initial.current);
  const totalEnergy = temperatures.reduce((sum, t) => sum + t, 0);
  const deltaS = entropyChange(temperatures, initial.current);
  const difference = Math.max(...temperatures) - Math.min(...temperatures);
  const exhausted = potential < 0.05;

  function reset(nextContrast = contrast, nextPattern = pattern) {
    const next = createWorld(nextContrast / 100, nextPattern);
    live.current = next; initial.current = next; setTemperatures(next); time.current = 0; lastSample.current = 0;
    setRunning(false); setHistory([{ time: 0, value: availableWork(next) }]);
    if (availableWork(next) < 0.05) onObserve("Equal beginning: an isolated world prepared at one temperature had no thermal work potential from the start.");
  }
  function advance(dt: number) {
    const next = diffuseWorld(live.current, dt, coupling);
    live.current = next; setTemperatures(next); time.current += dt;
    const work = availableWork(next);
    if (time.current - lastSample.current > 0.5) {
      const sample = { time: time.current, value: work };
      setHistory((past) => appendSample(past, sample)); lastSample.current = time.current;
    }
    if (work < 0.05) {
      setRunning(false);
      if (startingPotential > 1) onObserve(`Finite world: ${Math.round(totalEnergy).toLocaleString("en-US")} J of thermal energy remained, while less than 0.05 J of work potential was left. Temperature differences disappeared.`);
      else onObserve("Equal beginning: an isolated world prepared at one temperature had no thermal work potential from the start.");
    }
  }
  useSimulation(active && running, (dt) => advance(dt * speed));

  return <div className="ph-experiment">
    <div className="ph-experiment-intro"><h2>Give a world nowhere to lose its heat.</h2><p>No outside. No new fuel. Just a finite supply of temperature differences, and time.</p></div>
    <Transport running={running} finished={exhausted} onToggle={() => setRunning(!running)} onReset={() => reset()} onStep={() => advance(1)} />
    <div className="ph-apparatus-layout">
      <div className="ph-apparatus">
        <div className="ph-stage-heading"><span>128 thermal regions · insulated boundary</span><span className={running ? "ph-status is-running" : "ph-status"}>{exhausted ? "Near thermal equilibrium" : running ? "Running" : "Paused"}</span></div>
        <div className="ph-world-map" role="img" aria-label={`Thermal map of 128 regions. Temperatures span ${Math.min(...temperatures).toFixed(1)} to ${Math.max(...temperatures).toFixed(1)} kelvin. Work potential ${potential.toFixed(2)} joules.`}>
          <svg viewBox={`0 0 ${WORLD_COLUMNS * 40} ${WORLD_ROWS * 40}`} aria-hidden="true">
            {temperatures.map((temperature, i) => {
              const intensity = Math.min(1, temperature / 2000);
              return <g key={i}><rect x={i % WORLD_COLUMNS * 40 + 2} y={Math.floor(i / WORLD_COLUMNS) * 40 + 2} width="36" height="36" rx="0" fill="#8b2942" opacity={(0.05 + intensity * 0.75).toFixed(4)} /><circle cx={i % WORLD_COLUMNS * 40 + 20} cy={Math.floor(i / WORLD_COLUMNS) * 40 + 20} r={(1.5 + Math.sqrt(intensity) * 9).toFixed(4)} fill="#8b2942" opacity={(0.5 + intensity * 0.5).toFixed(4)} /></g>;
            })}
          </svg>
        </div>
        <div className="ph-map-legend"><span><i aria-hidden="true" />lower temperature</span><span><i aria-hidden="true" />higher temperature</span><span>Fixed scale · 0 to 2,000 K</span></div>
        <Trace samples={history} label="Work still available" max={Math.max(1, startingPotential)} unit="J" reference="a thermal resource, slowly disappearing" />
      </div>
      <aside className="ph-controls" aria-label="Finite world controls">
        <label className="ph-select-label" htmlFor="world-start">Choose a beginning</label>
        <select id="world-start" value={pattern} onChange={(e) => { const next = e.target.value as WorldPattern; setPattern(next); reset(contrast, next); }}><option value="island">One hot region</option><option value="scattered">Scattered hot regions</option><option value="equal">Already at equilibrium</option></select>
        <Range id="world-contrast" label="Initial unevenness" value={contrast} min={0} max={95} step={5} suffix="%" onChange={(value) => { setContrast(value); reset(value); }} description="New preparations keep the same total energy. Equal starts stay equal." />
        <Range id="world-coupling" label="Thermal contact" value={coupling} min={0} max={2} step={0.1} onChange={setCoupling} description="Zero isolates each region, preserving its temperature." />
        <Range id="world-speed" label="Playback speed" value={speed} min={1} max={20} suffix="×" onChange={setSpeed} />
        <button className="ph-button" onClick={() => { setRunning(false); for (let i = 0; i < 40; i++) advance(5); }}>Advance 200 time units →</button>
      </aside>
    </div>
    <div className="ph-metrics"><Metric label="Thermal energy" value={totalEnergy.toLocaleString("en-US", { maximumFractionDigits: 0 })} unit="J" detail="Still here. Still conserved." /><Metric label="Work still available" value={potential.toFixed(2)} unit="J" detail={exhausted ? "No appreciable temperature resource remains." : "Maximum work from ideal reversible engines."} /><Metric label="Entropy gained" value={Math.max(0, deltaS).toFixed(2)} unit="J/K" detail={`Temperature range: ${difference.toFixed(1)} K.`} /></div>
    <div className={`ph-observation ${exhausted ? "ph-observation-complete" : ""}`}><span>{exhausted ? "Notice what remains" : "Try this"}</span><p>{exhausted ? "The regions are still warm. What has nearly vanished is the difference between them. In this world, energy remains while the capacity to extract more work runs out." : "Give the world a different beginning. Make its thermal contact faster or slower. With contact enabled, does either choice rescue its temperature differences?"}</p></div>
    <ModelNote><p>This is a finite heat-diffusion model, not a cosmological simulation. Each of the 128 cells has constant heat capacity 1 J/K. Heat passes only between adjacent cells; no energy crosses the outside boundary. Every preparation has the same mean temperature, 300 K, and total thermal energy, 38,400 J.</p><p>Pairwise heat transfer is proportional to temperature difference. Conservative substeps keep temperatures positive and ΔS = Σ ln(Tᵢ/Tᵢ₀) nonnegative. The potential work is ΣTᵢ − N exp(Σln Tᵢ/N), the ideal work obtainable by reversibly bringing all cells to a common temperature. Passive diffusion captures none of it.</p><p>Changing the beginning resets the system. Changing contact or playback speed preserves its current state. The color scale stays fixed across time and clips above 2,000 K; the equations do not. The model pauses below 0.05 J of remaining potential, a display threshold rather than literal equality. This continuum model omits microscopic fluctuations and recurrences.</p><p>Reading: Albert, ch. 2, pp. 31-34; ch. 3, pp. 48-51, 70. Cosmic expansion, gravity, stars, black holes, and dark energy are outside this model.</p></ModelNote>
  </div>;
}
