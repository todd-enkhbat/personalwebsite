import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const thrive = work.find((item) => item.id === "thrive")!;

export default function ThrivePage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">Thrive Agritech · YC S15 · Oct–Dec 2025</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>Leamington is not a market. It is a power structure.</h1>
        </header>

        <p className="case-byline">
          {thrive.role} · {thrive.dates} ·{" "}
          <a href="https://www.thriveagritech.com" target="_blank" rel="noreferrer">
            thriveagritech.com ↗
          </a>
        </p>

        <p className="case-deck">
          Thrive had product-market fit in the US. The question was whether — and how — to enter Leamington, the
          largest greenhouse cluster in North America, without burning cycles on outreach that the network would never
          answer.
        </p>
        <p className="case-dateline">100+ calls · OGVG · BioPhi · lighthouse installs · infrastructure positioning</p>

        <figure className="case-hero">
          <img src="/paper-assets/thrive-hero.jpg" alt="Thrive Agritech grow lighting" />
          <figcaption>
            <span>CEA lighting · expansion GTM</span>
            <span>Hardware · greenhouse</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>The brief</h2>
            <p>
              I led market intelligence and GTM strategy for a hardware startup’s expansion into a new geography at a
              critical inflection point. Through more than one hundred calls, primary research, and an expert interview,
              I mapped Leamington from scratch — not as a TAM slide, but as a concentrated power structure with specific
              gatekeepers (OGVG, BioPhi), trust networks, and decision-making patterns that structurally block
              conventional cold outreach.
            </p>
          </section>

          <section>
            <h2>The wedge</h2>
            <p>
              The strategic reframe: Thrive should sell as greenhouse power infrastructure, not as another lighting
              vendor lined up against Philips. That positioning sits underneath the incumbent rather than competing
              head-on on fixture brand. From there, a lighthouse path: land two or three credible installs, use
              validators to de-risk the category, then scale through local partners — how B2B enterprise sales actually
              compounds when relationships gate the door.
            </p>
            <p className="case-pull">
              Some markets are relationship-gated. Cold outreach is not a skill problem; it is a structural block.
            </p>
          </section>

          <section>
            <h2>What the work produced</h2>
            <p>
              A GTM narrative the C-suite could run: who holds trust, which intermediaries to route through, how to
              sequence proof, and why the product story must sound like infrastructure before it sounds like a lamp.
              Mentors and reviewers in the loop included Brian Bennet, Chuck Demilo, and Sean Kwon.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/thrive-altus-hero.jpg" alt="" />
              <figcaption>Altus greenhouse install</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/thrive-vertical.jpg" alt="" />
              <figcaption>Vertical farming</figcaption>
            </figure>
          </div>
          <figure className="case-plate">
            <img src="/paper-assets/thrive-facility.jpg" alt="" />
            <figcaption>CEA facility context</figcaption>
          </figure>
        </div>
      </article>
    </LetterShell>
  );
}
