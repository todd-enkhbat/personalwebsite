import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const cfa = work.find((item) => item.id === "cfa")!;

export default function CfaPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">Harvard & Smithsonian CfA · 2022</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <div className="case-org-logos" aria-label="Affiliated institutions">
            <img
              src="/paper-assets/orgs/harvard-logo.svg"
              alt="Harvard University"
              className="case-org-logo case-org-logo--harvard"
            />
            <img
              src="/paper-assets/orgs/cfa-logo.png"
              alt="Center for Astrophysics | Harvard & Smithsonian"
              className="case-org-logo case-org-logo--cfa"
            />
          </div>
          <h1>Could K2-18b be habitable, and what does the star allow?</h1>
        </header>

        <p className="case-byline">
          {cfa.role} ·{" "}
          <a href="https://cfa.harvard.edu" target="_blank" rel="noreferrer">
            cfa.harvard.edu ↗
          </a>
        </p>

        <p className="case-deck">
          A temperate super-Earth 124 light-years away, modeled with TESS data and Exofast on Harvard’s Canon
          cluster, planet and host star treated as one system.
        </p>
        <p className="case-dateline">K2-18b · TESS · Exofast · NASA Exoplanet Archive · ExoFOP · Canon cluster</p>

        <figure className="case-hero">
          <img src="/paper-assets/cfa-k218b.jpg" alt="Artist impression of exoplanet K2-18b" />
          <figcaption>
            <span>K2-18b habitability apprenticeship</span>
            <span>Exoplanet research</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>The question</h2>
            <p>
              Habitability is not a single number. Assessing K2-18b meant joint work on mass, orbit, and atmospheric
              conditions while keeping the host star’s properties in view, what the planet does only makes sense if the
              stellar context is honest.
            </p>
          </section>

          <section>
            <h2>Method</h2>
            <p>
              I used TESS data and Exofast modeling, pulling from the NASA Exoplanet Archive and ExoFOP, and ran
              computations on Harvard’s Canon cluster. The apprenticeship was as much about scientific hygiene, provenance, assumptions, what the instruments can and cannot say, as about any single fitted parameter.
            </p>
          </section>
        </div>
      </article>
    </LetterShell>
  );
}
