import Image from "next/image";

const topics = [
  "Explanation, Truth, Inevitability",
  "Entropy and Time",
  "Time, Space, and Einstein",
  "The Origin of the Universe",
  "The Quantum Revolution and the Nature of the Future",
  "Evolution and Life",
  "The Origin of Mind",
  "Language and Story",
  "Brains and Belief",
  "Art and Transcendence",
  "The Future",
  "In Search of Meaning"
];

export default function PhilosophyPage() {
  return (
    <main className="page-shell">
      <section className="hard-card p-4">
        <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">Philosophy</p>
        <h1 className="mt-2 text-2xl text-[var(--ink)]">Origins and Meaning</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
          This section keeps the spirit of the prior philosophy page: existentialism, origins, time, mind, and the human search for meaning.
        </p>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-[1.4fr_0.8fr]">
        <div className="grid gap-2 md:grid-cols-2">
          {topics.map((topic, idx) => (
            <article key={topic} className="hard-card p-3">
              <p className="ui-mono text-[11px] text-[var(--ink-muted)]">{String(idx + 1).padStart(2, "0")}</p>
              <h2 className="mt-1 text-sm leading-snug text-[var(--ink)]">{topic}</h2>
            </article>
          ))}
        </div>
        <aside className="hard-card p-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--line)]">
            <Image src="/images/project-scroll-reference.png" alt="Philosophy visual reference" fill sizes="35vw" className="object-cover" />
          </div>
          <p className="ui-mono mt-2 text-[10px] uppercase tracking-[0.12em] text-[var(--ink-muted)]">Visual Notebook</p>
        </aside>
      </section>
    </main>
  );
}
