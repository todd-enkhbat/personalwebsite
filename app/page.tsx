import Image from "next/image";
import Link from "next/link";
import { linkedReferences, person, sections } from "./data/content";

export default function MainPage() {
  return (
    <main className="page-shell">
      <section className="hero-plane animate-rise">
        <Image
          src="/images/headshot-editorial.png"
          alt={`${person.formalName} portrait`}
          fill
          priority
          sizes="100vw"
          className="opacity-90"
        />
        <div className="hero-plane-copy">
          <p className="kicker">{person.location}</p>
          <h1 className="display mt-3 max-w-3xl text-4xl md:text-6xl">{person.name}</h1>
          <p className="mt-4 max-w-xl font-[family-name:var(--font-ui)] text-sm tracking-[0.04em] text-[#d7ddd8]">
            {person.tagline}
          </p>
        </div>
      </section>

      <section className="letter-sheet mt-6 animate-rise animate-rise-delay-1">
        <p className="kicker">Main</p>
        <h2 className="display mt-4 max-w-3xl text-3xl md:text-5xl">
          {person.opener}{" "}
          <Link href="/nomos" className="underline decoration-[var(--accent)]">
            {person.openerEmphasis}
          </Link>{" "}
          {person.openerTail}
        </h2>
        <hr className="rule animate-rule my-7" />
        <p className="body-copy max-w-3xl animate-rise animate-rise-delay-2">{person.letter}</p>

        <div className="mt-8 animate-rise animate-rise-delay-3">
          <p className="ui-label">Linked</p>
          <div className="link-row mt-3">
            {linkedReferences.map((item, index) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
                {index < linkedReferences.length - 1 ? (
                  <span className="text-[var(--ink-faint)]">·</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="ui-label">Education</p>
          <p className="body-copy mt-2 max-w-3xl">{person.education}</p>
        </div>
      </section>

      <section className="letter-sheet mt-6 animate-rise animate-rise-delay-3">
        <p className="ui-label">Open a section — each is its own page</p>
        <div className="section-index mt-4">
          {sections.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="title">{item.label}</span>
              <span className="hint">Open page →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
