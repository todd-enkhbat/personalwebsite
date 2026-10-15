"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { GasExperiment } from "./GasExperiment";
import { HeatExperiment } from "./HeatExperiment";
import { WorldExperiment } from "./WorldExperiment";

const experiments = [
  { title: "A gas in a box", theme: "Multiplicity & chance", number: "01" },
  { title: "Hot meets cold", theme: "Energy & useful work", number: "02" },
  { title: "A finite world", theme: "The approach to equilibrium", number: "03" }
];

export function EntropyLab() {
  const [selected, setSelected] = useState(0);
  const [notes, setNotes] = useState<string[]>([]);
  const seen = useRef(new Set<string>());
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const observe = useCallback((note: string) => {
    const key = note.split(":")[0];
    if (seen.current.has(key)) return;
    seen.current.add(key);
    setNotes((previous) => [...previous, note]);
  }, []);

  useEffect(() => {
    try { setReflection(localStorage.getItem("philosophy-physics-reflection-v1") ?? ""); }
    catch { /* The notebook also works without browser storage. */ }
    setStorageReady(true);
  }, []);

  function saveReflection(value: string) {
    setReflection(value);
    try { localStorage.setItem("philosophy-physics-reflection-v1", value); setSaved("Saved in this browser."); }
    catch { setSaved("Browser storage is unavailable. Download your notes to keep them."); }
  }

  function download() {
    const text = ["PHILOSOPHY / PHYSICS", "Notes on entropy, after David Z. Albert's Time and Chance", "", "OBSERVATIONS", ...(notes.length ? notes.map((note) => `• ${note}`) : ["No observations recorded yet."]), "", "MY REFLECTION", reflection || "No reflection written yet.", "", "These observations come from simplified teaching models, not a simulation of the universe.", "Reading: Time and Chance (2000), chapters 2 and 3; chapter 4 for the Past Hypothesis."].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "entropy-field-notes.txt"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % 3;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault(); setSelected(next); document.getElementById(`experiment-tab-${next}`)?.focus();
  }

  return <>
    <section id="laboratory" className="ph-laboratory" aria-label="Entropy laboratory">
      <div className="ph-lab-rail">
        <div className="ph-lab-rail-title">Three small experiments</div>
        <div className="ph-tabs" role="tablist" aria-label="Choose an experiment">
          {experiments.map((experiment, index) => <button key={experiment.number} type="button" role="tab" id={`experiment-tab-${index}`} aria-controls={`experiment-panel-${index}`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onKeyDown={(e) => moveTab(e, index)} onClick={() => setSelected(index)}><span className="ph-tab-number">{experiment.number}</span><span><strong>{experiment.title}</strong><small>{experiment.theme}</small></span><span className="ph-tab-arrow" aria-hidden="true">↗</span></button>)}
        </div>
        <a className="ph-rail-link" href="#the-larger-question">And then, the universe ↘</a>
      </div>
      <div className="ph-lab-panels">
        <div role="tabpanel" tabIndex={0} hidden={selected !== 0} id="experiment-panel-0" aria-labelledby="experiment-tab-0"><GasExperiment active={selected === 0} onObserve={observe} /></div>
        <div role="tabpanel" tabIndex={0} hidden={selected !== 1} id="experiment-panel-1" aria-labelledby="experiment-tab-1"><HeatExperiment active={selected === 1} onObserve={observe} /></div>
        <div role="tabpanel" tabIndex={0} hidden={selected !== 2} id="experiment-panel-2" aria-labelledby="experiment-tab-2"><WorldExperiment active={selected === 2} onObserve={observe} /></div>
        <div className="ph-next-experiment">{selected < 2 ? <button onClick={() => { setSelected(selected + 1); document.getElementById(`experiment-tab-${selected + 1}`)?.focus(); }}>Next experiment: {experiments[selected + 1].title} <span aria-hidden="true">→</span></button> : <a href="#the-larger-question">Take the question beyond the box <span aria-hidden="true">→</span></a>}</div>
      </div>
    </section>

    <section id="the-larger-question" className="ph-coda" aria-labelledby="ph-coda-title">
      <div className="ph-coda-margin"><span>Beyond the experiment</span><span className="ph-infinity" aria-hidden="true">∞</span><p>A conditional future,<br />not a countdown.</p></div>
      <div className="ph-coda-copy"><h2 id="ph-coda-title">The universe has no outside.</h2><p className="ph-lead">In the finite world, heat death looks surprisingly ordinary. The energy is still there. The differences that could make something happen are gone.</p><p>That is the thermodynamic idea behind a possible cosmic ending: accessible sources of free energy become exhausted, leaving progressively less capacity to sustain work. It need not mean absolute zero, or particles that stop moving.</p>
        <div className="ph-cosmic-sequence" aria-label="A possible sequence in a persistently expanding universe"><div><span>Stars</span><p>Finite fuel supports light and local activity.</p></div><span aria-hidden="true">→</span><div><span>Remnants</span><p>Long-lived objects outlast the stellar era.</p></div><span aria-hidden="true">→</span><div><span>A fading capacity</span><p>Accessible energy differences dwindle.</p></div></div>
        <p className="ph-cosmology-note">A box does not establish the fate of the cosmos. This extrapolation depends on continued expansion and the behavior of dark energy, gravity, and black holes. Cosmic entropy is not simply a map of temperatures, and a uniform early universe can have low gravitational entropy. These experiments do not model those effects. <a href="https://arxiv.org/abs/astro-ph/9701131" target="_blank" rel="noreferrer">Adams &amp; Laughlin, 1997 ↗</a> <a href="https://science.nasa.gov/astrophysics/programs/physics-of-the-cosmos/expand-our-knowledge-of-dark-energy/" target="_blank" rel="noreferrer">NASA on the universe’s fate ↗</a></p>
        <details className="ph-model-note ph-past-hypothesis"><summary>But why was there a difference to begin with? <span aria-hidden="true">+</span></summary><div><p>Every reset gave the experiments a special starting condition. The equations did not choose it. Reversing all the gas velocities makes that distinction visible: reversible laws alone do not select a future-directed arrow of time.</p><p>Albert develops this difficulty in chapter 4 and introduces the Past Hypothesis, a low-entropy boundary condition for the early universe. The experiments above explore consequences of prepared beginnings. They do not explain the universe’s beginning.</p><p>Reading: <cite>Time and Chance</cite>, ch. 4, pp. 71-96. This extends the thermodynamics and statistical mechanics of chapters 2 and 3.</p></div></details>
      </div>
    </section>

    <section className="ph-notebook" aria-labelledby="ph-notebook-title">
      <div><h2 id="ph-notebook-title">Record what changed in the experiments.</h2><p>Compare free expansion, heat exchange, and work extraction. Use these notes to record what changed when you adjusted the initial conditions or reversed the gas velocities.</p><div className="ph-recorded-notes"><h3>Your observations</h3>{notes.length ? <ul>{notes.map((note) => <li key={note}>{note}</li>)}</ul> : <p>Let an experiment unfold. Observations will collect here as you reach its turning points.</p>}<p role="status" className="ph-sr-only">{notes.length} observations recorded.</p></div></div>
      <div className="ph-writing"><label htmlFor="ph-reflection">Leave a thought for yourself.</label><textarea id="ph-reflection" value={reflection} disabled={!storageReady} maxLength={12000} placeholder="I noticed… I wonder…" onChange={(e) => saveReflection(e.target.value)} rows={6} aria-describedby="ph-reflection-privacy" /><p id="ph-reflection-privacy">Private to this browser. Nothing you write here is sent anywhere.</p><div className="ph-writing-actions"><button className="ph-button" onClick={download}>Download field notes ↓</button><span role="status">{saved}</span></div></div>
    </section>
  </>;
}
