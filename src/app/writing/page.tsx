import Link from "next/link";

const essays = [
  {
    id: "musk-genghis",
    title: "Elon Musk & Genghis Khan in HR Execution",
    meta: "Nov 2025 · 2,300 words",
    source: "https://www.youtube.com/watch?v=dVqk42kjZsE",
    body: [
      "Genghis Khan is rarely remembered as a human capital strategist, yet his empire grew because of how he selected people. He wore what his soldiers wore and ate what they ate. When contrasted with Elon Musk, who optimizes for an ego-to-ability ratio close to zero, the similarities surface fast.",
      "Both leaders ignored pedigree. They tested for output, loyalty, and a taste for discomfort. Their teams were built by firing fast, but also by compounding trust with the people who could hang in thin air.",
      "Using Weatherford’s interview (02:15, 10:42, 18:03) as scaffolding, the essay argues that modern founders can borrow from nomadic governance: fewer titles, clearer demands, and day-one missions that feel a little unreasonable."
    ]
  },
  {
    id: "consciousness",
    title: "Consciousness & The Universe",
    meta: "Dec 2025 · 1,600 words",
    body: [
      "Notes on entropy, the heat death timeline, and why ambition still matters when the universe is cooling. A meditation on staying playful while building serious things.",
      "Drafting a framework that mixes astrophysics with Buddhist philosophy to keep long-term optimism intact."
    ]
  }
];

export default function WritingPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted">Writings & Field Notes</p>
        <h1 className="text-4xl font-semibold uppercase leading-tight">
          Essays on space, finance, philosophy, and the teams required to get us there.
        </h1>
        <p className="max-w-2xl text-base text-muted">
          Lightweight observations, newsletter drafts, and long-form essays. Everything lives here before it graduates to
          Talos Dispatch or a published research note.
        </p>
      </header>

      {essays.map((essay) => (
        <article key={essay.id} id={essay.id} className="space-y-4 rounded-3xl border border-black/10 bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.4em] text-muted">{essay.meta}</div>
              <h2 className="mt-2 text-2xl font-semibold uppercase">{essay.title}</h2>
            </div>
            {essay.source && (
              <Link
                href={essay.source}
                target="_blank"
                className="rounded-full border border-black px-4 py-2 text-xs uppercase"
              >
                Source video
              </Link>
            )}
          </div>
          <div className="space-y-3 text-sm text-muted">
            {essay.body.map((paragraph) => (
              <p key={paragraph.slice(0, 16)}>{paragraph}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

