import Image from "next/image";
import { about, contact } from "../data/content";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="hard-card p-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--line)]">
            <Image src="/images/headshot-editorial.png" alt="Tsogt portrait" fill sizes="40vw" className="object-cover" />
          </div>
        </div>
        <div className="hard-card p-4">
          <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">About</p>
          <h1 className="mt-2 text-2xl text-[var(--ink)]">Humble and curious builder</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{about.intro}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{about.now}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a className="ui-sans border border-[var(--line)] px-3 py-2 text-xs uppercase tracking-[0.12em]" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <a className="ui-sans border border-[var(--line)] px-3 py-2 text-xs uppercase tracking-[0.12em]" href={contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <div className="mt-4 border border-[var(--line)] bg-[var(--surface-2)] p-3">
            <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">Typography Spec</p>
            <p className="mt-2 text-xs text-[var(--ink)]">Purpose: Primary Font | Font Family: Montserrat | Type: Sans-serif | Notes: Used for most text, headings, body, navigation, buttons.</p>
            <p className="mt-1 text-xs text-[var(--ink)]">Purpose: Secondary Font | Font Family: Montserrat Light | Type: Sans-serif | Notes: Used for technical labels and timelines.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
