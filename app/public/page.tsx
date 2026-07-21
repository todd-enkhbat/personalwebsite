import Image from "next/image";
import { publications, writings } from "../data/content";

const blocks = [
  { title: "In The Press", items: publications },
  {
    title: "Updates",
    items: writings.map((item) => ({
      title: item.title,
      source: `${item.source} - ${item.date}`,
      href: item.href
    }))
  },
  {
    title: "Sources & Appearances",
    items: [
      { title: "Profile links and archives", source: "Reference hub", href: "https://www.linkedin.com/in/tsogt-enkhbat" }
    ]
  }
];

export default function PublicPage() {
  return (
    <main className="page-shell">
      <section className="hero-dark mb-4 p-3">
        <div className="relative aspect-[18/5] w-full overflow-hidden border border-[var(--line)]">
          <Image src="/images/nyse.jpg" alt="Public profile visual" fill sizes="90vw" className="object-cover" />
        </div>
      </section>
      <section className="grid gap-3 md:grid-cols-3">
        {blocks.map((block) => (
          <article key={block.title} className="hard-card p-4">
            <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">{block.title}</p>
            <div className="mt-3 grid gap-2">
              {block.items.map((item) => (
                <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="border border-[var(--line)] bg-[var(--bg)] p-3">
                  <p className="text-sm leading-snug text-[var(--ink)]">{item.title}</p>
                  <p className="ui-sans mt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--ink-muted)]">{item.source}</p>
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
