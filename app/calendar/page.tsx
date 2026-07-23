import { calendar } from "../data/content";

export default function CalendarPage() {
  return (
    <main className="page-shell">
      <section className="letter-sheet animate-rise">
        <p className="kicker">Calendar</p>
        <h1 className="display mt-3 text-4xl md:text-5xl">Where attention is scheduled</h1>
        <p className="body-copy mt-4 max-w-2xl">
          Programs, mission cadence, and public conversations currently shaping the year.
        </p>
        <hr className="rule animate-rule my-8" />
        <div>
          {calendar.map((item) => (
            <article key={item.title} className="cal-item">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="display text-2xl">{item.title}</h2>
                <p className="ui-label">{item.when}</p>
              </div>
              <p className="mt-2 font-[family-name:var(--font-ui)] text-sm text-[var(--ink-soft)]">
                {item.where}
              </p>
              <p className="body-copy mt-3 max-w-3xl">{item.note}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
