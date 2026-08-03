import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const csi = work.find((item) => item.id === "rocketry")!;

export default function CsiPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">CSI Rockets · Ablatives · 2025</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>From homemade liners to a measurable thermal protection system</h1>
        </header>

        <p className="case-byline">
          {csi.role} · 6-inch hybrid ·{" "}
          <a href="https://columbiaspace.org/missions/rockets/" target="_blank" rel="noreferrer">
            columbiaspace.org ↗
          </a>
        </p>

        <p className="case-deck">
          CSI’s propulsion program needed more than intuition under fire. We built an ablative-engineering pipeline —
          materials, molds, instrumentation — so the team could measure what the chamber was actually doing.
        </p>
        <p className="case-dateline">
          Phenolic liners · CC–nozzle interface · regression rigs · K-type TC · MAX31855 · Arduino DAQ · ~500 psi class
        </p>

        <figure className="case-hero">
          <img src="/paper-assets/csi-hero.jpg" alt="Columbia Space Initiative Rocketry" />
          <figcaption>
            <span>CSI Rockets propulsion program</span>
            <span>Hybrid · ablatives</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>The shift</h2>
            <p>
              I helped move the team from slow, inconsistent homemade materials to a research-grade thermal protection
              approach for our 6-inch hybrid. That meant leading the adoption of phenolic chamber liners, designing the
              bonding and interface architecture for the combustion-chamber–to–nozzle transition, and treating the liner
              as a system — not a one-off shop experiment.
            </p>
          </section>

          <section>
            <h2>Infrastructure for truth</h2>
            <p>
              Testing had to be reproducible. I developed ablative regression rigs, mold and CAD tooling for aerospace
              manufacturing, resin-mixing protocols (resole/novolac thermosets with microballoon fillers), and
              thermocouple-instrumented heat-flux characterization — K-type thermocouples, MAX31855, Arduino DAQ. The
              point was a data-driven method for ablation rate, char formation, and thermal penetration under high
              pressure and extreme heat.
            </p>
            <p>
              That pipeline is what lets a student team approach industry-standard hybrid practices: safer static fires,
              higher confidence before launch, and a written trail of what the material did when the chamber lit.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/csi-workshop.jpg" alt="" />
              <figcaption>Workshop — chamber hardware</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/csi-field.jpg" alt="" />
              <figcaption>Field campaign</figcaption>
            </figure>
          </div>
        </div>
      </article>
    </LetterShell>
  );
}
