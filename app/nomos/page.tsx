import Link from "next/link";
import { nomos } from "../data/content";

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
            <a href="#continuity" className="nomos-scroll">SCROLL TO EXAMINE THE SYSTEM ↓</a>
          </div>
        </div>
      </section>

      <section id="continuity" className="nomos-section nomos-continuity">
        <div className="nomos-intro">
          <p className="nomos-label">{nomos.continuity.label}</p>
          <h2>{nomos.continuity.headline}</h2>
          <p className="nomos-body nomos-body--large">{nomos.continuity.body}</p>
        </div>
        <div className="nomos-continuity__diagram">
          <div className="nomos-note nomos-note--current">
            <span />
            <b>CURRENT STATE</b>
            <p>One biosphere. One power grid. One communications layer.</p>
          </div>
          <div className="nomos-continuity__image" role="img" aria-label="Orbital continuity illustration" />
          <div className="nomos-note nomos-note--desired">
            <span />
            <b>DESIRED STATE</b>
            <p>Independent nodes that preserve context and coordinate across delay.</p>
          </div>
        </div>
        <div className="nomos-continuity__footer">
          <div className="nomos-note">
            <span />
            <b>DESIGN REQUIREMENT 01</b>
            <strong>Memory must survive the institution that stores it.</strong>
          </div>
          <div className="nomos-definition">
            <b>NOMOS / WORKING DEFINITION</b>
            <p>A space systems company building the operational layer for long-duration intelligence: sense, retain, decide, and act.</p>
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
          <div className="nomos-loop-list">
            {nomos.cortex.loops.map(([title, description], index) => (
              <div className={`nomos-loop ${index === 0 ? "is-active" : ""}`} key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nomos-section nomos-requirements">
        <div className="nomos-requirements__lead">
          <p className="nomos-label">03 / PHILOSOPHY, TRANSLATED INTO REQUIREMENTS</p>
          <h2>We are not trying to defeat impermanence. We are designing for continuity through it.</h2>
          <div className="nomos-requirements__copy">
            <h3>That changes the engineering question.</h3>
            <p className="nomos-body">The objective is not permanence. It is to prevent a break in the chain of context—from one person to another, one machine to another, and eventually one world to another.</p>
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
          <h2>The philosophy is useful only where it changes what we build, test, or refuse.</h2>
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
            <p className="nomos-label nomos-label--light">05 / CURRENT PROGRAM / JULY 2026</p>
            <h2>From thesis to an operating system.</h2>
            <p className="nomos-body">Nomos is early. The work is being reduced into components that can be tested independently before they become a mission architecture.</p>
          </div>
          <div className="nomos-program__list">
            {nomos.program.map(([title, description], index) => (
              <div className={`nomos-program-row ${index === 0 ? "is-active" : ""}`} key={title}>
                <span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="nomos-section nomos-closing">
        <div className="nomos-closing__head">
          <p className="nomos-label">06 / OPERATING PREMISE</p>
          <h2>Keep the chain of intelligence unbroken.</h2>
        </div>
        <div className="nomos-closing__footer">
          <div><h3>Nomos Orbital</h3><p>Building long-duration systems for memory, autonomy, and off-world continuity.</p></div>
          <div className="nomos-contact-links">
            <p><span>WEBSITE</span><a href="https://nomosorbital.com" target="_blank" rel="noreferrer">nomosorbital.com ↗</a></p>
            <p><span>CONTACT</span><a href="mailto:tsogt.e@columbia.edu">tsogt.e@columbia.edu ↗</a></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
