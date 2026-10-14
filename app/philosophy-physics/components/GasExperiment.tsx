"use client";

import { useEffect, useRef, useState } from "react";
import { createGas, gasMacrostate, kineticEnergy, logChoose, reverseGas, stepGas } from "../../lib/entropy";
import { appendSample, Metric, ModelNote, Range, Trace, Transport, useSimulation, type Sample } from "./LabTools";

export function GasExperiment({ active, onObserve }: { active: boolean; onObserve: (note: string) => void }) {
  const [count, setCount] = useState(160);
  const [speed, setSpeed] = useState(1);
  const [running, setRunning] = useState(false);
  const [opened, setOpened] = useState(false);
  const [reversing, setReversing] = useState(false);
  const [returned, setReturned] = useState(false);
  const [spread, setSpread] = useState(false);
  const [seed, setSeed] = useState(42);
  const particles = useRef(createGas(160));
  const initialEnergy = useRef(kineticEnergy(particles.current));
  const timeline = useRef(0);
  const elapsed = useRef(0);
  const lastSample = useRef(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [macro, setMacro] = useState(() => gasMacrostate(particles.current));
  const [history, setHistory] = useState<Sample[]>([{ time: 0, value: 0 }]);

  function draw() {
    const element = canvas.current;
    const ctx = element?.getContext("2d");
    if (!element || !ctx) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = element.clientWidth;
    const height = width / 2;
    if (element.width !== Math.round(width * ratio) || element.height !== Math.round(height * ratio)) {
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const pad = 12;
    const scaleX = (width - pad * 2) / 2;
    const scaleY = height - pad * 2;
    ctx.strokeStyle = "#b6aaa0"; ctx.lineWidth = 1;
    ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);
    ctx.beginPath(); ctx.setLineDash(opened ? [3, 6] : []);
    ctx.moveTo(width / 2, pad); ctx.lineTo(width / 2, height - pad);
    ctx.strokeStyle = opened ? "#c5b9ac" : "#8b2942"; ctx.lineWidth = opened ? 1 : 2; ctx.stroke(); ctx.setLineDash([]);
    for (const p of particles.current) {
      ctx.beginPath(); ctx.arc(pad + p.x * scaleX, pad + p.y * scaleY, count > 256 ? 1.7 : 2.4, 0, Math.PI * 2);
      ctx.fillStyle = p.x < 1 ? "#8b2942" : "#514c46"; ctx.fill();
    }
  }

  useEffect(() => {
    draw();
    const observer = new ResizeObserver(draw);
    if (canvas.current) observer.observe(canvas.current);
    return () => observer.disconnect();
    // Particle motion is drawn by the simulation loop; these change the apparatus.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, count, active]);

  function reset(nextCount = count, nextSpread = spread, nextSeed = seed) {
    particles.current = createGas(nextCount, nextSeed, nextSpread);
    initialEnergy.current = kineticEnergy(particles.current);
    timeline.current = 0; elapsed.current = 0; lastSample.current = 0;
    const nextMacro = gasMacrostate(particles.current);
    setMacro(nextMacro); setHistory([{ time: 0, value: nextMacro.entropy }]);
    setRunning(false); setOpened(nextSpread); setReversing(false); setReturned(false);
    draw();
  }

  function advance(dt: number, releaseForward = false) {
    const isReversing = reversing && !releaseForward;
    const isOpen = opened || releaseForward;
    const increment = isReversing ? Math.min(dt, timeline.current) : dt;
    stepGas(particles.current, increment, !isOpen);
    if (isOpen) timeline.current += isReversing ? -increment : increment;
    elapsed.current += increment;
    if (elapsed.current - lastSample.current > 0.12 || increment === 0 || isReversing && timeline.current < 1e-8) {
      const next = gasMacrostate(particles.current);
      const sample = { time: elapsed.current, value: next.entropy };
      setMacro(next); setHistory((past) => appendSample(past, sample));
      lastSample.current = elapsed.current;
      if (isOpen && !isReversing && next.fraction > 0.98 && elapsed.current > 2) onObserve("Gas: the particles spread out while their total kinetic energy stayed constant. More arrangements fit a nearly even split.");
    }
    if (isReversing && timeline.current < 1e-8) {
      setRunning(false); setReturned(true);
      onObserve("Reversal: reversing every velocity returned the particles to their prepared positions. The microscopic motion permits entropy to decrease.");
    }
    draw();
  }

  useSimulation(active && running, (dt) => advance(dt * speed));
  const energyPercent = kineticEnergy(particles.current) / initialEnergy.current * 100;
  const probabilityExponent = Math.floor(-count * Math.log10(2));
  const probabilityMantissa = Math.pow(10, -count * Math.log10(2) - probabilityExponent);

  function toggle() {
    if (!opened) { setOpened(true); timeline.current = 0; }
    if (returned) { reverseGas(particles.current); setReversing(false); setReturned(false); }
    setRunning(!running);
  }

  return <div className="ph-experiment">
    <div className="ph-experiment-intro"><h2>A gas forgets its corner.</h2><p>Remove the partition. Nothing tells a particle to spread out. So why does the gas do it?</p></div>
    <Transport running={running} onToggle={toggle} onReset={() => reset()} onStep={() => { if (!opened) { setOpened(true); timeline.current = 0; advance(1, true); } else if (returned) { reverseGas(particles.current); setReversing(false); setReturned(false); advance(1, true); } else advance(1); }} />
    <div className="ph-apparatus-layout">
      <div className="ph-apparatus">
        <div className="ph-stage-heading"><span>Isolated box · elastic walls</span><span className={running ? "ph-status is-running" : "ph-status"}>{returned ? "Returned to the beginning" : reversing ? "Velocities reversed" : running ? "Running" : opened ? "Paused" : "Partition in place"}</span></div>
        <canvas ref={canvas} className="ph-gas-canvas" role="img" aria-label={`Gas box: ${macro.left} particles on the left, ${macro.right} on the right. ${opened ? "Partition removed." : "Partition closed."}`} />
        <div className="ph-box-labels"><span>Left <b>{macro.left}</b></span><span>{opened ? "The boundary is now only a way of counting." : "Start the experiment to lift the partition."}</span><span>Right <b>{macro.right}</b></span></div>
        <Trace samples={history} label="Positional entropy, S / kᵦ" max={macro.maxEntropy} reference="dashed line = largest macrostate" />
      </div>
      <aside className="ph-controls" aria-label="Gas controls">
        <Range id="gas-count" label="Particles" value={count} min={8} max={512} step={8} onChange={(value) => { setCount(value); reset(value); }} description="Changing the preparation starts a fresh experiment." />
        <Range id="gas-speed" label="Playback speed" value={speed} min={0.5} max={4} step={0.5} suffix="×" onChange={setSpeed} />
        <label className="ph-select-label" htmlFor="gas-start">Starting arrangement</label>
        <select id="gas-start" value={spread ? "spread" : "left"} onChange={(e) => { const next = e.target.value === "spread"; setSpread(next); reset(count, next); }}><option value="left">All in the left half</option><option value="spread">Already spread out</option></select>
        <button className="ph-button ph-reverse" disabled={!opened || timeline.current < 0.1 || reversing} onClick={() => { reverseGas(particles.current); setReversing(true); setReturned(false); setRunning(true); }}>Reverse every velocity ↶</button>
        <p className="ph-control-hint">Let it spread, then reverse. The same laws can take it back.</p>
        <button className="ph-text-button" onClick={() => { const next = seed + 1; setSeed(next); reset(count, spread, next); }}>Try another microstate ↗</button>
      </aside>
    </div>
    <div className="ph-metrics"><Metric label="Positional entropy" value={macro.entropy.toFixed(1)} unit="kᵦ" detail="S = kᵦ ln Ω" /><Metric label="Kinetic energy retained" value={energyPercent.toFixed(1)} unit="%" detail="Spreading does not use up energy." /><Metric label="Chance of all on the left" value={<>{probabilityMantissa.toFixed(1)} × 10<sup>{probabilityExponent}</sup></>} detail="For an equilibrium sample: (½)ᴺ." /></div>
    <div className="ph-observation"><span>Try this</span><p>Compare 8 particles with 512. Small systems visibly fluctuate. Large imbalances become much less likely as the number grows.</p></div>
    <ModelNote><p>Non-interacting classical point particles move in a two-dimensional box and reflect elastically. Particle dots are enlarged for visibility; they do not collide with one another. This illustrates free expansion and reversible mechanics, not complete molecular thermalization.</p><p>We count only left/right occupancy: Ω = N! / (Nᴸ! Nᴿ!) and S/kᵦ = ln Ω, up to a constant. The displayed entropy is a coarse positional contribution, not the full phase-space entropy. A new microstate samples different positions and velocities; it is not a new law of motion.</p><p>Reversal changes all velocities and evolves the actual particles back to the state at release, within floating-point precision. It is not a recording played backward. The equilibrium probability 2⁻ᴺ assumes independent, uniformly distributed positions; it is not a return-time estimate.</p><p>Reading: Albert, ch. 2, pp. 27-34; ch. 3, pp. 35-36, 43-51, 70. The reversal question continues in ch. 4, pp. 71-75.</p><p className="ph-equation">Ω at an even split: exp({logChoose(count, count / 2).toFixed(1)})</p></ModelNote>
  </div>;
}
