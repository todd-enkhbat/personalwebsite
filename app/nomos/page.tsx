import Link from "next/link";
import { nomos } from "../data/content";

export default function NomosPage() {
  return (
    <main className="page-shell">
      <section className="letter-sheet animate-rise">
        <p className="kicker">Nomos — Expanded</p>
        <h1 className="display mt-3 text-4xl md:text-6xl">{nomos.title}</h1>
        <p className="ui-label mt-4">{nomos.status}</p>
        <hr className="rule animate-rule my-8" />
        <p className="body-copy max-w-3xl text-lg">{nomos.lede}</p>
        <div className="mt-6 max-w-3xl space-y-4">
          {nomos.body.map((paragraph) => (
            <p key={paragraph} className="body-copy">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {nomos.pillars.map((pillar) => (
            <article key={pillar.title} className="border-t border-[var(--line)] pt-4">
              <h2 className="display text-xl">{pillar.title}</h2>
              <p className="body-copy mt-2 text-sm">{pillar.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/contact" className="cta">
            Talk about Nomos →
          </Link>
        </div>
      </section>
    </main>
  );
}
