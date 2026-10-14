"use client";

import { useRef, useState } from "react";
import { availableWork, conduct, entropyChange, runEngine, type Reservoirs } from "../../lib/entropy";
import { appendSample, Metric, ModelNote, Range, Trace, Transport, useSimulation, type Sample } from "./LabTools";

export function HeatExperiment({ active, onObserve }: { active: boolean; onObserve: (note: string) => void }) {
  const [hot, setHot] = useState(600);
  const [cold, setCold] = useState(200);
  const [coupling, setCoupling] = useState(0.2);
  const [mode, setMode] = useState<"conduction" | "engine">("conduction");
  const [running, setRunning] = useState(false);
  const [state, setState] = useState<Reservoirs>({ hot: 600, cold: 200, work: 0 });
  const live = useRef(state);
  const time = useRef(0);
  const lastSample = useRef(0);
  const [history, setHistory] = useState<Sample[]>([{ time: 0, value: 0 }]);
  const potential = availableWork([state.hot, state.cold]);
  const initialPotential = availableWork([hot, cold]);
  const isEqual = Math.abs(state.hot - state.cold) < 0.2;

  function reset(nextHot = hot, nextCold = cold) {
    const next = { hot: nextHot, cold: nextCold, work: 0 };
    live.current = next; setState(next); time.current = 0; lastSample.current = 0;
    setRunning(false); setHistory([{ time: 0, value: 0 }]);
  }
  function advance(dt: number) {
    const next = mode === "engine" ? runEngine(live.current, dt, coupling) : conduct(live.current, dt, coupling);
    live.current = next; setState(next); time.current += dt;
    if (time.current - lastSample.current > 0.15) {
      const sample = { time: time.current, value: Math.max(0, entropyChange([next.hot, next.cold], [hot, cold])) };
      setHistory((past) => appendSample(past, sample));
      lastSample.current = time.current;
    }
    if (Math.abs(next.hot - next.cold) < 0.2) {
      setRunning(false);
      onObserve(mode === "engine" ? `Heat engine: the temperature difference produced ${next.work.toFixed(1)} J of stored work before reaching equilibrium. An ideal reversible engine creates no entropy.` : "Heat flow: temperatures equalized and entropy rose. Energy stayed in the reservoirs, but their capacity to produce work was lost.");
    }
  }
  useSimulation(active && running, advance);
  const finalPassive = (hot + cold) / 2;
  const maxDeltaS = entropyChange([finalPassive, finalPassive], [hot, cold]);

  return <div className="ph-experiment">
    <div className="ph-experiment-intro"><h2>Energy is not the same as possibility.</h2><p>Connect a hot body to a cold one. Let heat flow, or make it do some work along the way.</p></div>
    <Transport running={running} finished={isEqual} onToggle={() => setRunning(!running)} onReset={() => reset()} onStep={() => advance(1)} />
    <div className="ph-apparatus-layout">
      <div className="ph-apparatus">
        <div className="ph-stage-heading"><span>Two finite reservoirs · C = 1 J/K each</span><span className={running ? "ph-status is-running" : "ph-status"}>{isEqual ? "Near equilibrium" : running ? "Running" : "Paused"}</span></div>
        <div className="ph-reservoirs" role="img" aria-label={`Hot reservoir ${state.hot.toFixed(1)} kelvin, cold reservoir ${state.cold.toFixed(1)} kelvin; ${state.work.toFixed(1)} joules of stored work.`}>
          <div className="ph-vessel"><div className="ph-vessel-fill" style={{ height: `${state.hot / 1000 * 100}%`, opacity: 0.18 + state.hot / 1000 * 0.55 }} /><span>Body A</span><strong>{state.hot.toFixed(1)}<small>K</small></strong><i>initially {hot} K</i></div>
          <div className="ph-thermal-bridge"><div className="ph-heat-path" aria-hidden="true"><span>{isEqual || coupling === 0 ? "↔" : "→"}</span></div>{mode === "engine" ? <><span className="ph-engine-wheel" style={{ transform: `rotate(${state.work * 8}deg)` }} aria-hidden="true">✳</span><span>Ideal engine</span><strong>{state.work.toFixed(1)} J</strong><small>stored as work</small></> : <><span>Thermal contact</span><strong>{Math.max(0, (hot - state.hot)).toFixed(1)} J</strong><small>heat transferred to B</small></>}</div>
          <div className="ph-vessel"><div className="ph-vessel-fill" style={{ height: `${state.cold / 1000 * 100}%`, opacity: 0.18 + state.cold / 1000 * 0.55 }} /><span>Body B</span><strong>{state.cold.toFixed(1)}<small>K</small></strong><i>initially {cold} K</i></div>
        </div>
        <Trace samples={history} label="Total entropy change, ΔS" max={Math.max(0.1, maxDeltaS)} unit="J/K" reference={mode === "engine" ? "reversible limit: ΔS = 0" : "heat flow creates entropy"} />
      </div>
      <aside className="ph-controls" aria-label="Heat controls">
        <Range id="heat-hot" label="Body A · initial" value={hot} min={cold} max={1000} step={10} suffix=" K" onChange={(value) => { setHot(value); reset(value, cold); }} />
        <Range id="heat-cold" label="Body B · initial" value={cold} min={100} max={hot} step={10} suffix=" K" onChange={(value) => { setCold(value); reset(hot, value); }} />
        <Range id="heat-coupling" label="Coupling rate" value={coupling} min={0} max={1} step={0.05} onChange={setCoupling} description="Zero disconnects the bodies. This changes the rate, not the destination." />
        <fieldset className="ph-radio-group"><legend>How energy travels</legend><label><input type="radio" name="heat-mode" value="conduction" checked={mode === "conduction"} onChange={() => { setMode("conduction"); reset(); }} /> Let heat flow</label><label><input type="radio" name="heat-mode" value="engine" checked={mode === "engine"} onChange={() => { setMode("engine"); reset(); }} /> Harvest work</label></fieldset>
        <p className="ph-control-hint">Choosing a new path resets the same initial temperatures for a fair comparison.</p>
      </aside>
    </div>
    <div className="ph-metrics"><Metric label="Reservoirs + stored work" value={(state.hot + state.cold + state.work).toFixed(1)} unit="J" detail={`Initial energy: ${hot + cold} J. Always conserved.`} /><Metric label="Work still available" value={potential.toFixed(1)} unit="J" detail={`Initially ${initialPotential.toFixed(1)} J of potential.`} /><Metric label="Work captured" value={state.work.toFixed(1)} unit="J" detail={mode === "engine" ? "Useful energy stored outside the reservoirs." : "No engine: the potential is dissipated."} /></div>
    <div className="ph-observation"><span>Try this</span><p>Run both paths from the same temperatures. The engine leaves the reservoirs cooler, because some energy is now stored as work. Then try equal starting temperatures.</p></div>
    <ModelNote><p>Two uniform bodies have equal, constant heat capacities of 1 J/K and exchange no heat with an exterior. Their modeled thermal energy is U = Tᴬ + Tᴮ joules, using a fixed reference. Passive heat flow follows dQ/dt = g(Tᴬ − Tᴮ); ΔS = ln(Tᴬ/Tᴬ₀) + ln(Tᴮ/Tᴮ₀) J/K.</p><p>The engine is the ideal reversible limit, approached infinitely slowly in real thermodynamics. Its on-screen speed is illustrative. TᴬTᴮ stays constant, the final temperature is √(Tᴬ₀Tᴮ₀), and stored work equals the decrease in reservoir energy. The maximum remaining work is Tᴬ + Tᴮ − 2√(TᴬTᴮ). No external cold bath is assumed.</p><p>Passive contact instead ends at the arithmetic mean. Equal temperature removes this thermal opportunity; it does not remove work that the engine has already stored. Real engines create entropy and capture less work. The animation pauses when the temperature difference is below 0.2 K; this is a display threshold, not exact equality.</p><p>Reading: Albert, ch. 2, pp. 24-34; appendix, pp. 165-170. The finite-reservoir equations are a teaching implementation of those principles.</p></ModelNote>
  </div>;
}
