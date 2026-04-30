import { writings } from "../data/content";

export default function WritingPage() {
  return (
    <main className="page-shell">
      <section className="hero-dark p-4">
        <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">Writing</p>
        <h1 className="mt-2 text-2xl text-[var(--ink)]">Notes, essays, and mission narratives</h1>
      </section>
      <section className="mt-4 grid gap-3 md:grid-cols-2">
        {writings.map((item) => (
          <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="hard-card p-4">
            <p className="ui-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">{item.date}</p>
            <p className="mt-2 text-lg leading-snug text-[var(--ink)]">{item.title}</p>
            <p className="ui-sans mt-2 text-xs uppercase tracking-[0.12em] text-[var(--accent-strong)]">{item.source}</p>
          </a>
        ))}
      </section>
    </main>
  );
}
