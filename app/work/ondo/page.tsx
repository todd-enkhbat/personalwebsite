import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const ondo = work.find((item) => item.id === "ondo")!;

export default function OndoPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">ONDO Space · Summer 2025</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>Inside ONDO — and the making of GerGrid</h1>
        </header>

        <p className="case-byline">
          {ondo.role} · CEO Nami Bold · Investor pitch Aug 18, 2025 ·{" "}
          <a href="https://ondospace.com" target="_blank" rel="noreferrer">
            ondospace.com ↗
          </a>
        </p>

        <p className="case-deck">
          A summer spent at the elbow of a deep-tech CEO: negotiations, pivots, and pitches — while helping build
          GerGrid, an AI network-planning surface meant to replace slow manual RF workflows.
        </p>
        <p className="case-dateline">
          ArcGIS · RF ray-tracing · B2B/B2G SaaS · Mongolia & Central Asia · Seraphim context
        </p>

        <figure className="case-hero">
          <img src="/paper-assets/gergrid-hero.jpg" alt="Earth at night — networked city lights from orbit" />
          <figcaption>
            <span>Connectivity at planetary scale</span>
            <span>GerGrid · coverage thinking</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>Shadowing the CEO</h2>
            <p>
              I worked directly under CEO Nami Bold — in the room for strategic negotiations, partner discussions, and
              internal decision-making. The job was not observation alone. I represented ONDO in early-stage startup
              evaluation and pivot planning, contributed research and design validation, and helped write the technical
              documentation that made geospatial product choices defensible to partners and investors.
            </p>
            <p>
              Across the summer I co-developed investor pitches, refined financial projections, and sat in C-suite
              conversations that shaped long-term strategy. The August 18, 2025 ONDO Holding investor pitch was part of
              that arc: packing research experience into a story that could incorporate ONDO Space without flattening
              the engineering.
            </p>
            <p className="case-pull">
              “The hardest thing to do as a CEO is to motivate and encourage your team. Humans are dynamic.” — Nami
              Bold
            </p>
          </section>

          <section>
            <h2>Teaching the stack</h2>
            <p>
              ONDO’s builders needed a shared language across space industry, satellite coverage, and RF. I ran team
              education on those fundamentals — enough that product and ops could reason about infrastructure without
              waiting for a specialist translation every time.
            </p>
          </section>

          <section>
            <h2>GerGrid</h2>
            <p>
              GerGrid is an AI-driven telecom network-planning platform. It fuses ArcGIS terrain models (DEM/DSM),
              land-use layers, satellite imagery, population density, and usage data to propose tower placement and
              coverage simulations in minutes — not the multi-week grind of stitching Atoll, GlobalMapper, and ArcGIS by
              hand.
            </p>
            <p>
              My work spanned system design, geospatial modeling, data cleaning and spatial analytics, and RF
              optimization with 3D ray-tracing on dynamic GIS layers. The differentiators we pushed: terrain-agnostic
              accuracy, automated planning that displaces slow engineering workflows, and a SaaS model that can travel
              into geographies where coverage is hard to model and CAPEX mistakes are expensive.
            </p>
          </section>

          <section>
            <h2>What stayed with me</h2>
            <p>
              Pitch style has to innovate — not conform to a template. A resume has to show obvious transfer and growth.
              And the useful shape of a builder is T-shaped: deep vertical craft (programming, engineering, design) and
              horizontal literacy across domains so you can speak product, business, and RF in the same sentence.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/gergrid-rf.jpg" alt="" />
              <figcaption>Network infrastructure</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/gergrid-map.jpg" alt="" />
              <figcaption>Geospatial coverage surface</figcaption>
            </figure>
          </div>
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/pub-gergrid-ui.png" alt="" />
              <figcaption>GerGrid UI · ray tracing</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/pub-gergrid-before-after.png" alt="" />
              <figcaption>Planning before / after</figcaption>
            </figure>
          </div>
        </div>
      </article>
    </LetterShell>
  );
}
