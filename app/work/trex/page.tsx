import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const trex = work.find((item) => item.id === "trex")!;

export default function TrexPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">T-REX · NASA NIAC · 2025–Present</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>Video of a black hole — from low Earth orbit</h1>
        </header>

        <p className="case-byline">
          {trex.role} · {trex.place} ·{" "}
          <a href="https://www.t-rexsat.org" target="_blank" rel="noreferrer">
            t-rexsat.org ↗
          </a>
        </p>

        <p className="case-deck">
          Time-Resolving Explorer: an 86 GHz LEO VLBI SmallSat aimed at time-resolved video of Sgr A*, advanced to NASA
          NIAC final round with $175,000 in funding behind the collaboration.
        </p>
        <p className="case-dateline">
          Brown · JPL · Princeton · MIT Lincoln Lab · Columbia · Utah State · ~87 kg · ~22 min temporal resolution
        </p>

        <figure className="case-hero">
          <img src="/paper-assets/trex-hero.jpg" alt="T-REX satellite mission concept" />
          <figcaption>
            <span>Mission concept · 86 GHz LEO VLBI</span>
            <span>SmallSat</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>The mission</h2>
            <p>
              T-REX targets ≤10% spin and mass constraints on Sagittarius A* via roughly twenty-two-minute temporal
              resolution at 86 GHz. The collaboration spans NASA JPL, Princeton Space Physics, MIT Lincoln Lab, Brown,
              Columbia, and Utah State — a distributed engineering problem as much as an astrophysics one.
            </p>
          </section>

          <section>
            <h2>What I carry</h2>
            <p>
              As founding engineer I lead CAD modeling of subsystems drawn from the published T-REX research program:
              thermal and structural analyses, quantum-link architectures, observation simulations, data-downlink
              calculations, and the integration work that keeps multi-institution designs from drifting apart on the
              page.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/trex-sat.jpg" alt="" />
              <figcaption>Satellite study</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/trex-antenna.jpg" alt="" />
              <figcaption>Antenna concept</figcaption>
            </figure>
          </div>
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/trex-diagram.jpg" alt="" />
              <figcaption>Mission architecture</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/trex-fig2.jpg" alt="" />
              <figcaption>System evidence</figcaption>
            </figure>
          </div>
        </div>
      </article>
    </LetterShell>
  );
}
