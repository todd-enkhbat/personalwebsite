import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const marsV = work.find((item) => item.id === "mars-v")!;

export default function MarsVPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">MARS-V · 2023-2025</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>EVA suits for Utah, and the capital to keep the analog alive</h1>
        </header>

        <p className="case-byline">
          {marsV.role} · Mongolia / MDRS ·{" "}
          <a href="https://www.mars-v.com" target="_blank" rel="noreferrer">
            mars-v.com ↗
          </a>
        </p>

        <p className="case-deck">
          Engineering at the suit level and fundraising at national scale, the same program asked for both.
        </p>
        <p className="case-dateline">$5.8M raised · 4,500+ stakeholders · 8,000 km campaigns · 1,000+ lecture attendees</p>

        <figure className="case-hero">
          <img src="/paper-assets/marsv-hero.png" alt="MARS-V program visual" />
          <figcaption>
            <span>Mars-analog program</span>
            <span>MDRS · EVA</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>Design & engineering</h2>
            <p>
              As a core member I led EVA-suit research and prototyping with UCCS scientists for Utah’s Mars Desert
              Research Station — concept suit design, habitat visualization, and the field hardware that makes an
              analog crew’s time outside the habitat believable as practice, not costume.
            </p>
          </section>

          <section>
            <h2>Capital & public story</h2>
            <p>
              In parallel I raised $5.8M in commitments across more than 4,500 stakeholders and 8,000 kilometers of
              in-person campaigns. The public face of that effort included MARS-V Spot, a lecture to more than a
              thousand people, and national documentary coverage that carried the analog story beyond the desert.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img
                src="/paper-assets/marsv-suit-render.jpg"
                alt="Concept EVA spacesuit design with white and charcoal panels"
              />
              <figcaption>EVA suit concept · white / charcoal suit system</figcaption>
            </figure>
            <figure className="case-plate">
              <img
                src="/paper-assets/marsv-habitat-render.jpg"
                alt="Astronaut approaching a modular Mars habitat under Mongolian and MARS flags"
              />
              <figcaption>Habitat & EVA concept · Mars-analog station</figcaption>
            </figure>
          </div>

          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img
                src="/paper-assets/marsv-crew-field.jpg"
                alt="MARS-V crew in prototype EVA suits at a Mars-analog desert site"
              />
              <figcaption>Field EVA suits · Mars-analog campaign</figcaption>
            </figure>
            <figure className="case-plate">
              <img
                src="/paper-assets/marsv-marsa-flag.jpg"
                alt="Crew in EVA suits holding the MARSA flag on analog terrain"
              />
              <figcaption>MARSA field crew · suit prototypes</figcaption>
            </figure>
          </div>

          <figure className="case-plate">
            <img
              src="/paper-assets/marsv-eva-crew.png"
              alt="MARS-V crew wearing the EVA suit prototype in desert terrain"
            />
            <figcaption>Crew in the EVA suit I designed · Mars-analog field campaign</figcaption>
          </figure>

          <figure className="case-plate">
            <img
              src="/paper-assets/marsv-analog-terrain.jpg"
              alt="Layered red and purple badlands under a sunset sky, Mars-analog terrain"
            />
            <figcaption>Analog terrain · Mars-like badlands</figcaption>
          </figure>
        </div>
      </article>
    </LetterShell>
  );
}
