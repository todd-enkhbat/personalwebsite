import Link from "next/link";
import { work } from "../data/content";

export default function WorkPage() {
  return (
    <main className="page-shell">
      <section className="letter-sheet animate-rise">
        <p className="kicker">Work</p>
        <h1 className="display mt-3 text-4xl md:text-5xl">Selected roles and builds</h1>
        <p className="body-copy mt-4 max-w-2xl">
          From black-hole imaging hardware to teen ventures in Central Asia — a record of
          systems work, founding, and research collaborations.
        </p>
        <hr className="rule animate-rule my-8" />
        <div className="stack">
          {work.map((item) => (
            <article key={item.id} className="work-item">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="display text-2xl md:text-3xl">{item.title}</h2>
                <p className="ui-label">{item.dates}</p>
              </div>
              <p className="mt-2 font-[family-name:var(--font-ui)] text-sm text-[var(--ink-soft)]">
                {item.role} · {item.place}
              </p>
              <p className="body-copy mt-4 max-w-3xl">{item.summary}</p>
              <div className="tag-row">
                {item.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {item.href ? (
                <div className="mt-5">
                  <Link href={item.href} className="cta">
                    Open expanded page →
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
