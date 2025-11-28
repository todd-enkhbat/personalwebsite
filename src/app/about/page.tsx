const stats = [
  { label: "Current Base", value: "Columbia University · NYC" },
  { label: "Obsessions", value: "Space systems, Renaissance Technologies, Mongolian futures" },
  { label: "Allies", value: "NASA JPL, MIT Lincoln Labs, Brown, Princeton Space Physics Lab" }
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted">Profile</p>
        <h1 className="text-4xl font-semibold uppercase leading-tight">Todd Enkhbat</h1>
        <p className="max-w-3xl text-base text-muted">
          Serial entrepreneur, black hole researcher, and utopian thinker. I explore the overlap of philosophy, science,
          and business—drawing lines between Mongolian history and the frontier of modern finance.
        </p>
      </header>

      <section className="grid gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-card md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted">{stat.label}</p>
            <p className="text-base font-medium">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-black/10 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold uppercase">Quick bio</h2>
        <p className="text-sm text-muted">
          I work on deep-tech infrastructure that feels inevitable: imaging black holes, designing rocket engines, and
          publishing essays that mix systems thinking with nomadic governance. I am building Cosmos Institute, an
          education and research collective focused on long-horizon experiments.
        </p>
        <p className="text-sm text-muted">
          If you want to jam on R&D, editorial collaborations, or Mongolian impact, send a note to{" "}
          <a className="underline" href="mailto:tsogt.e@columbia.com">
            tsogt.e@columbia.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

