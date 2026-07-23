import { contactChannels, person } from "../data/content";

export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="letter-sheet animate-rise">
        <p className="kicker">Contact</p>
        <h1 className="display mt-3 text-4xl md:text-5xl">Write to Todd</h1>
        <p className="body-copy mt-4 max-w-2xl">
          For research collaborations, Nomos conversations, speaking, or introductions —
          the fastest path is email.
        </p>
        <hr className="rule animate-rule my-8" />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="ui-label">Direct</p>
            <a
              className="display mt-3 block text-2xl no-underline hover:text-[var(--accent)]"
              href={`mailto:${person.emails.academic}`}
            >
              {person.emails.academic}
            </a>
            <a
              className="mt-2 block font-[family-name:var(--font-ui)] text-sm text-[var(--ink-soft)] no-underline hover:text-[var(--accent)]"
              href={`mailto:${person.emails.personal}`}
            >
              {person.emails.personal}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="cta" href={`mailto:${person.emails.academic}`}>
                Email Todd
              </a>
              <a className="cta cta-ghost" href={person.social.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <p className="ui-label">Channels</p>
            <div className="section-index mt-3">
              {contactChannels.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  <span className="title text-xl">{item.label}</span>
                  <span className="hint">Open →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
