import { publications } from "../data/content";

export default function PublicationsPage() {
  return (
    <main className="page-shell">
      <section className="letter-sheet animate-rise">
        <p className="kicker">Publications</p>
        <h1 className="display mt-3 text-4xl md:text-5xl">Essays, proposals, and press</h1>
        <p className="body-copy mt-4 max-w-2xl">
          Mission writing, public notes, and features — the paper trail of research and
          founder thinking.
        </p>
        <hr className="rule animate-rule my-8" />
        <div>
          {publications.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="pub-item block no-underline transition hover:text-[var(--accent)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="display text-2xl">{item.title}</h2>
                {item.date ? <p className="ui-label">{item.date}</p> : null}
              </div>
              <p className="mt-2 font-[family-name:var(--font-ui)] text-sm text-[var(--ink-soft)]">
                {item.source}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
