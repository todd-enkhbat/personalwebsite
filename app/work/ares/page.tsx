import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const ares = work.find((item) => item.id === "ares")!;

const evidence = [
  [
    { image: "/paper-assets/ares-topview.jpg", caption: "I · Site plan" },
    { image: "/paper-assets/ares-section.jpg", caption: "II · Habitat section" }
  ],
  [
    { image: "/paper-assets/ares-baseaxo.jpg", caption: "III · Base axonometric" },
    { image: "/paper-assets/ares-flpl.jpg", caption: "IV · Floor plan" },
    { image: "/paper-assets/ares-elevation.jpg", caption: "V · Elevation" }
  ],
  [{ image: "/paper-assets/ares-outside.jpg", caption: "VI · Exterior study" }]
];

export default function AresPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-manuscript">
        <header className="case-header">
          <div>
            <p className="case-kicker">NASA RASC-AL · Columbia ARES · 2025</p>
            <h1>Autonomous Red-Planet Experimental Shelter</h1>
          </div>
          <Link href="/work" className="open-arrow">
            ← Back to portfolio
          </Link>
        </header>

        <div className="case-summary">
          <div>
            <p className="case-kicker">Mission</p>
            <p>
              Fully autonomous Martian habitat deployable by 2037: two-phase architecture, ice-rich site selection,
              ISRU, and pressurized construction under the AERODOME.
            </p>
          </div>
          <div>
            <p className="case-kicker">My span</p>
            <p>
              Mission architecture, ISRU (MOXIE, Aqua Factorem, geopolymer), AERODOME materials/physics, Kilopower
              and failure modes, mass/power/TRL integration.
            </p>
          </div>
        </div>

        <dl className="case-metrics">
          {[
            ["Target", "2037"],
            ["ISRU", "MOXIE · ice · cement"],
            ["Dome", "AERODOME"],
            ["Constraint", "Starship payload"]
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <figure className="case-hero">
          <img src="/paper-assets/ares-dome.png" alt="ARES Martian habitat dome concept" />
          <figcaption>
            <span>Plate 00 · Autonomous shelter concept</span>
            <span>ARES / RASC-AL</span>
          </figcaption>
        </figure>

        <section className="case-section">
          <div className="case-section-head">
            <p className="case-kicker">Technical evidence</p>
            <span>06 plates</span>
          </div>
          {evidence.map((row, index) => (
            <div key={index} className={`case-evidence-row case-evidence-row--${row.length}`}>
              {row.map((plate) => (
                <figure key={plate.image} className="case-plate">
                  <img src={plate.image} alt="" />
                  <figcaption>{plate.caption}</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </section>

        <section className="case-section">
          <div className="case-section-head">
            <p className="case-kicker">What I owned</p>
          </div>
          <div className="case-ownership">
            {ares.achievements.map((item, index) => (
              <div key={item}>
                <p>{String(index + 1).padStart(2, "0")}</p>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <p className="body-copy" style={{ color: "var(--ink-soft)", margin: 0 }}>
          {ares.summary}
        </p>
      </article>
    </LetterShell>
  );
}
