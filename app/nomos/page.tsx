import Link from "next/link";
import Image from "next/image";
import { nomos } from "../data/content";
import { NomosProductPreview, NomosRecordGallery, NomosSelectableRows } from "../components/NomosDetails";
import "./enrichment.css";

export default function NomosPage() {
  return (
    <main className="nomos-site">
      <section id="thesis" className="nomos-hero">
        <div className="nomos-hero__image" aria-hidden />
        <div className="nomos-hero__veil" aria-hidden />
        <nav className="nomos-nav" aria-label="Nomos sections">
          <Link href="/" className="nomos-wordmark">NOMOS</Link>
          <div className="nomos-nav__links">
            <Link href="/">&larr; Main</Link>
            <a href="#thesis">Thesis</a>
            <a href="#system">System</a>
            <a href="#research">Research</a>
            <a href="#progress">Progress</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
        <div className="nomos-hero__content">
          <div>
            <p className="nomos-label nomos-label--light">{nomos.hero.label}</p>
            <h1>{nomos.hero.headline}</h1>
          </div>
          <div className="nomos-hero__aside">
            <span />
            <p>{nomos.hero.lede}</p>
            <a href="#continuity" className="nomos-scroll">See the planning workflow ↓</a>
            <a href="https://nomosorbital.com" className="nomos-hero__product" target="_blank" rel="noopener noreferrer">Open Nomos Orbital ↗</a>
          </div>
        </div>
      </section>

      <section className="nomos-proof" aria-label="Nomos project numbers">
        <div className="nomos-proof__intro"><p className="nomos-label">What exists now</p><h2>Space infrastructure software: a network atlas, API, and Python SDK.</h2></div>
        <div className="nomos-proof__facts">
          <details><summary><strong>$25k</strong><span>Grant funding secured</span></summary><p>Funding supports the solo-founder research and product work.</p></details>
          <details><summary><strong>30 pages</strong><span>Research and technology review</span></summary><p>A Columbia review of space policy, technology, and infrastructure capabilities.</p></details>
          <details><summary><strong>1 MVP</strong><span>Infrastructure software MVP</span></summary><p>FastAPI, Next.js, Python SDK, PostGIS and SGP4/Skyfield contact windows. Service booking and mission execution require provider integrations.</p></details>
        </div>
      </section>

      <section id="continuity" className="nomos-section nomos-continuity">
        <div className="nomos-continuity__intro">
          <div className="nomos-intro">
            <p className="nomos-label">{nomos.continuity.label}</p>
            <h2>{nomos.continuity.headline}</h2>
            <p className="nomos-body nomos-body--large">{nomos.continuity.body}</p>
          </div>
          <Image className="nomos-continuity__photo" src="/paper-assets/nomos-reference/components.webp" alt="Three technicians displaying the Voyager Golden Record and its protective assembly" width={1600} height={1131} sizes="(max-width: 900px) 92vw, 45vw" />
        </div>
        <div className="nomos-continuity__diagram">
          <div className="nomos-note nomos-note--current">
            <span />
            <b>SEPARATE INPUTS</b>
            <p>Satellite catalogs, ground-station records, and compute services are separate sources.</p>
          </div>
          <NomosProductPreview />
          <div className="nomos-note nomos-note--desired">
            <span />
            <b>COMBINED PLAN</b>
            <p>Compare those resources in one plan, with calculated contact windows and linked sources.</p>
          </div>
        </div>
        <div className="nomos-continuity__footer">
          <div className="nomos-note">
            <span />
            <b>DESIGN REQUIREMENT 01</b>
            <strong>Every recommendation needs a source and a feasibility check.</strong>
          </div>
          <div className="nomos-definition">
            <b>NOMOS / PRODUCT</b>
            <p>Software from Nomos Orbital, a space infrastructure company, connecting satellite access, ground contacts, and data processing.</p>
          </div>
        </div>
        <div id="record" className="nomos-lineage" aria-labelledby="nomos-lineage-title">
          <NomosRecordGallery />
          <div className="nomos-lineage__copy">
            <p className="nomos-label">THE GOLDEN RECORD</p>
            <h3 id="nomos-lineage-title">A message carried across distance.</h3>
            <p>Voyager’s Golden Records carry sounds and images selected to represent life on Earth. Each spacecraft launched in 1977 with a gold-plated copper record.</p>
            <p>The disc is a visual reference behind the Nomos mark. It also poses a question that matters to space infrastructure: what information deserves to cross a constrained link, and how do we preserve its meaning?</p>
            <p className="nomos-lineage__credit">Historical references from the NASA archive. <a href="https://science.nasa.gov/gallery/the-making-of-the-voyager-golden-record/" target="_blank" rel="noopener noreferrer">Explore the making of the Golden Record ↗</a></p>
          </div>
        </div>
      </section>

      <section id="system" className="nomos-section nomos-dark-section nomos-cortex">
        <div className="nomos-cortex__image" aria-hidden />
        <div className="nomos-dark-section__veil" aria-hidden />
        <div className="nomos-cortex__content">
          <div className="nomos-intro">
            <p className="nomos-label nomos-label--light">{nomos.cortex.label}</p>
            <h2>{nomos.cortex.headline}</h2>
            <p className="nomos-body">{nomos.cortex.body}</p>
          </div>
          <NomosSelectableRows items={nomos.cortex.loops} variant="workflow" />
        </div>
      </section>

      <section className="nomos-section nomos-requirements">
        <div className="nomos-requirements__lead">
          <p className="nomos-label">PLANNING REQUIREMENTS</p>
          <h2>Show what is feasible, what is calculated, and what still needs confirmation.</h2>
          <div className="nomos-requirements__copy">
            <h3>A plan needs more than a list of providers.</h3>
            <p className="nomos-body">A useful plan identifies a satellite opportunity, a ground contact, and a way to process the data. Users need to see the calculations, source records, and missing integrations before committing to a mission.</p>
          </div>
        </div>
        <div className="nomos-requirements__list">
          {nomos.requirements.map(([title, description], index) => (
            <div className="nomos-requirement" key={title}>
              <span>REQ.0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="research" className="nomos-section nomos-research">
        <div className="nomos-research__head">
          <p className="nomos-label">04 / RESEARCH INDEX</p>
          <h2>Orbital calculations, infrastructure records, and longer-term research.</h2>
        </div>
        <div className="nomos-research__list">
          {nomos.research.map(([id, title, description, state]) => (
            <article className="nomos-research-row" key={id}>
              <span>{id}</span><h3>{title}</h3><p>{description}</p><small>{state}</small>
            </article>
          ))}
        </div>
      </section>

      <section id="progress" className="nomos-section nomos-dark-section nomos-program">
        <div className="nomos-program__image" aria-hidden />
        <div className="nomos-dark-section__veil" aria-hidden />
        <div className="nomos-program__content">
          <div className="nomos-intro">
            <p className="nomos-label nomos-label--light">PRODUCT COMPONENTS</p>
            <h2>What the current product includes.</h2>
            <p className="nomos-body">The current product includes an interface, backend, and Python SDK developed by a solo founder. Orbital access is calculated; compute execution, detections, and confidence scores in the demo are simulated. Booking and mission execution depend on provider integrations.</p>
          </div>
          <NomosSelectableRows items={nomos.program} variant="product" />
        </div>
      </section>

      <footer id="contact" className="nomos-section nomos-closing">
        <div className="nomos-closing__head">
          <p className="nomos-label">TRY THE PRODUCT</p>
          <h2>Open the planner or inspect the network atlas.</h2>
        </div>
        <div className="nomos-closing__footer">
          <div><h3>Nomos Orbital</h3><p>A space infrastructure company connecting satellite, ground, and cloud systems.</p></div>
          <div className="nomos-contact-links">
            <p><span>WEBSITE</span><a href="https://nomosorbital.com" target="_blank" rel="noreferrer">nomosorbital.com ↗</a></p>
            <p><span>CONTACT</span><a href="mailto:tsogt.e@columbia.edu">tsogt.e@columbia.edu ↗</a></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
