import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const kublai = work.find((item) => item.id === "kublai")!;

export default function KublaiPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">Kublai Institute of Astrophysics · 2023–2024</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>Sole intern under Mongolia’s first cosmonaut</h1>
        </header>

        <p className="case-byline">
          {kublai.role} · Mongolia · penumbral lunar eclipses · planetarium
        </p>

        <p className="case-deck">
          Observational science and public commentary at the country’s astronomy observatory — one intern, one mentor,
          work that had to stand up in both the data and the dome.
        </p>
        <p className="case-dateline">Gurragchaa · time-series · planetarium commentary · observatory</p>

        <figure className="case-hero">
          <img src="/paper-assets/kublai-visual.jpg" alt="Kublai Institute namesake portrait" />
          <figcaption>
            <span>Kublai Institute</span>
            <span>Astrophysics · Planetarium</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>Research</h2>
            <p>
              I was the only research intern at Mongolia’s astronomy observatory under the guidance of Mr. Gurragchaa,
              the first cosmonaut from Mongolia. The scientific thread was penumbral lunar eclipses — observational
              studies and time-series analysis that demanded patience with instruments and honesty with incomplete
              nights.
            </p>
          </section>

          <section>
            <h2>Planetarium</h2>
            <p>
              The other half of the role was translation: research assistant and planetarium commentator, turning
              orbital geometry into something a public audience could feel without lying about the physics. That dual
              posture — measure carefully, speak clearly — is the institute’s real product.
            </p>
          </section>
        </div>

        <div className="case-gallery">
          <div className="case-gallery-pair">
            <figure className="case-plate">
              <img src="/paper-assets/kublai-planetarium.jpg" alt="" />
              <figcaption>Deep-sky science context</figcaption>
            </figure>
            <figure className="case-plate">
              <img src="/paper-assets/kublai-telescope.jpg" alt="" />
              <figcaption>Observational platform</figcaption>
            </figure>
          </div>
          <figure className="case-plate">
            <img src="/paper-assets/kublai-stars.jpg" alt="" />
            <figcaption>Night sky · research domain</figcaption>
          </figure>
        </div>
      </article>
    </LetterShell>
  );
}
