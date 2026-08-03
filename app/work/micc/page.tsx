import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const micc = work.find((item) => item.id === "micc")!;

export default function MiccPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">MICC Capital · Industrials IB · 2025</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>Eight weeks, nine deliverables, two names on Capital IQ</h1>
        </header>

        <p className="case-byline">
          {micc.role} · Mongolia ·{" "}
          <a href="https://en.micc.mn" target="_blank" rel="noreferrer">
            en.micc.mn ↗
          </a>
        </p>

        <p className="case-deck">
          An intensive investment-banking program built around publication-grade equity research, live market writing,
          and deal support — not classroom comps alone.
        </p>
        <p className="case-dateline">
          Gobi HK · Erdenes Tavan Tolgoi · StorePay · Sartoria · DCF · ESG · INSEAD negotiation
        </p>

        <figure className="case-hero">
          <img src="/paper-assets/micc-hero.jpg" alt="Financial district towers" />
          <figcaption>
            <span>Capital markets atmosphere</span>
            <span>Industrials · commodities</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>The output</h2>
            <p>
              Over eight weeks I produced nine research deliverables. Two of them were full professional equity research
              reports — Gobi HK and Erdenes Tavan Tolgoi — published on S&P Capital IQ with financial modeling,
              forecasting, valuation, and ESG analysis. That is the bar the desk held: work that could live next to
              sell-side writing, not intern scratchpads.
            </p>
          </section>

          <section>
            <h2>Coverage rhythm</h2>
            <p>
              Weekly global and domestic market updates sat beside sector deep dives across Mongolia’s major industries —
              commodities, mining, dairy, beverages, fintech, retail, and consumer goods. I also contributed to drafting
              Information Memoranda for StorePay and Sartoria, and ran through bond-issuance exercises and negotiation
              workshops, including case work with INSEAD MBAs on business negotiation and investing.
            </p>
          </section>

          <section>
            <h2>Craft</h2>
            <p>
              The toolkit was deliberate: DCF and trading comps, peer benchmarking, qualitative and quantitative risk,
              sustainability integration where it belonged in the story, and executive-ready writing. Business Model
              Canvas work — partners, activities, resources, value propositions, relationships, segments, channels, cost,
              revenue — kept the research tied to how companies actually make money.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/micc-trading.jpg" alt="" />
              <figcaption>Terminals · tape</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/micc-exchange.jpg" alt="" />
              <figcaption>Charting session</figcaption>
            </figure>
          </div>
          <figure className="case-plate">
            <img src="/paper-assets/micc-nyse.jpg" alt="" />
            <figcaption>NYSE Space Summit</figcaption>
          </figure>
        </div>
      </article>
    </LetterShell>
  );
}
