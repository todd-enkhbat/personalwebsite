import { feedingTheMind, philosophyTopics } from "../data/content";

export default function FeedingTheMindPage() {
  return (
    <main className="page-shell">
      <section className="letter-sheet animate-rise">
        <p className="kicker">Feeding the Mind</p>
        <h1 className="display mt-3 text-4xl md:text-5xl">
          Reading, notebooks, and people worth tracking
        </h1>
        <p className="body-copy mt-4 max-w-2xl">
          A map for filling the mind — shelves, essay threads, field notes, and the
          perennial search for origins and meaning.
        </p>
        <hr className="rule animate-rule my-8" />

        <div>
          {feedingTheMind.map((item) =>
            item.href ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="mind-item block no-underline transition hover:text-[var(--accent)]"
              >
                <p className="ui-label">{item.kind}</p>
                <h2 className="display mt-2 text-2xl">{item.title}</h2>
                <p className="body-copy mt-2 max-w-3xl">{item.note}</p>
              </a>
            ) : (
              <article key={item.title} className="mind-item block">
                <p className="ui-label">{item.kind}</p>
                <h2 className="display mt-2 text-2xl">{item.title}</h2>
                <p className="body-copy mt-2 max-w-3xl">{item.note}</p>
              </article>
            )
          )}
        </div>
      </section>

      <section className="letter-sheet mt-6 animate-rise animate-rise-delay-1">
        <p className="ui-label">Origins and Meaning — topics</p>
        <h2 className="display mt-3 text-3xl">Notebook index</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {philosophyTopics.map((topic, index) => (
            <article key={topic} className="border-t border-[var(--line)] pt-3">
              <p className="ui-label">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="display mt-1 text-xl">{topic}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
