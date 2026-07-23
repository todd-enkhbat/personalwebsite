import Link from "next/link";
import { work } from "../../data/content";

const trex = work.find((item) => item.id === "trex")!;

export default function TrexPage() {
  return (
    <main className="page-shell">
      <section className="letter-sheet animate-rise">
        <Link href="/work" className="ui-label no-underline hover:text-[var(--accent)]">
          ← Back to Work
        </Link>
        <p className="kicker mt-6">Work — Expanded</p>
        <h1 className="display mt-3 text-4xl md:text-5xl">{trex.title}</h1>
        <p className="mt-3 font-[family-name:var(--font-ui)] text-sm tracking-[0.04em] text-[var(--ink-soft)]">
          {trex.role} · {trex.place} · {trex.dates}
        </p>
        <hr className="rule animate-rule my-8" />

        <h2 className="display text-2xl">What I achieved</h2>
        <p className="body-copy mt-4 max-w-3xl">{trex.summary}</p>
        <ul className="body-copy mt-5 max-w-3xl list-disc space-y-2 pl-5">
          {trex.achievements.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h2 className="display mt-10 text-2xl">At a glance</h2>
        <div className="tag-row">
          {trex.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            className="cta"
            href="https://www.t-rexsat.org"
            target="_blank"
            rel="noreferrer"
          >
            Mission site
          </a>
          <Link href="/contact" className="cta cta-ghost">
            Collaborate
          </Link>
        </div>
      </section>
    </main>
  );
}
