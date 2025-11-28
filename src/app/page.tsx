import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Time Resolving Explorer",
    meta: "NASA JPL · MIT Lincoln Labs · 2025",
    body: "Building a VLBI satellite with a constellation of researchers to capture the first videos of black holes.",
    href: "https://t-rexsat.org/"
  },
  {
    title: "Talos Dispatch",
    meta: "Editorial · 2026",
    body: "Philosophy, technology, and business publication at Columbia that tracks the edges of institutional change.",
    href: "https://orchid-epoch-e90.notion.site/Philosophy-of-Tsogt-2b3532a0a48080cc878ffa137707827e"
  },
  {
    title: "Columbia Rocketry",
    meta: "Propulsion R&D",
    body: "Combustion device design for the Columbia Space Initiative—merging materials science with entrepreneurial instinct.",
    href: "#"
  }
];

const writings = [
  {
    title: "Elon Musk & Genghis Khan in HR Execution",
    date: "Nov 2025",
    excerpt:
      "On ruthless clarity, removing ego, and the compounding effects of selecting for unreasonable people.",
    href: "/writing#musk-genghis"
  },
  {
    title: "Consciousness & the Universe",
    date: "Dec 2025",
    excerpt: "Sketches on entropy, cosmic timelines, and what ambition means when heat death is inevitable.",
    href: "/writing#consciousness"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[48px] border border-white/50 bg-gradient-to-b from-[#e4f0ff] via-[#cfe4ff] to-[#a9d0ff] px-6 py-14 shadow-card sm:px-12 md:px-16">
        <div className="absolute inset-0">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_60%)]" />
          <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[clamp(4rem,22vw,14rem)] font-black uppercase tracking-[0.2em] text-white/40">
            Todd Enkhbat
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 text-center lg:flex-row lg:text-left">
          <div className="flex-1 space-y-4 text-ink">
            <p className="text-sm font-mono uppercase tracking-[0.4em] text-ink/70">Founder · Researcher · Speaker</p>
            <h1 className="text-5xl font-semibold uppercase leading-tight sm:text-6xl">Building the future from NYC</h1>
            <p className="max-w-xl text-base text-ink/80">
              Space systems, speculative finance, and Mongolian-first principles. Partnering with NASA JPL, MIT Lincoln
              Labs, Princeton Space Physics Lab, Columbia, and Brown to push filmed astronomy and high-trust teams.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-ink/80">
              <div>
                <span className="block font-semibold text-ink">Available</span>
                <span>Space · Systems · Writing</span>
              </div>
              <div>
                <span className="block font-semibold text-ink">Focus</span>
                <span>Brand, deep-tech, Renaissance thinking</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-4 text-sm uppercase">
              <Link href="/work" className="rounded-full bg-ink px-6 py-3 text-white shadow-lg">
                View work
              </Link>
              <Link
                href="/writing"
                className="rounded-full border border-white/60 px-6 py-3 text-ink transition hover:bg-white/60"
              >
                Read writing
              </Link>
              <Link
                href="https://orchid-epoch-e90.notion.site/Philosophy-of-Tsogt-2b3532a0a48080cc878ffa137707827e?source=copy_link"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/60 px-6 py-3 text-ink transition hover:bg-white/60"
              >
                Philosophy →
              </Link>
            </div>
          </div>

          <div className="flex flex-1 justify-center">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 translate-y-6 rounded-[50%] bg-white/50 blur-3xl" />
              <Image
                src="/subject.png"
                alt="Todd Enkhbat portrait"
                width={420}
                height={560}
                priority
                className="relative z-10 w-[280px] drop-shadow-2xl sm:w-[320px] lg:w-[360px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-ink">Active Programs</h2>
          <Link href="/work" className="text-sm uppercase text-soft hover:text-ink">
            All work →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col rounded-3xl border border-accentSoft bg-white p-6 shadow-card transition hover:-translate-y-1"
            >
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-soft">{project.meta}</div>
              <h3 className="mt-4 text-xl font-semibold uppercase text-ink">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm text-soft">{project.body}</p>
              <Link href={project.href} target="_blank" className="mt-6 text-sm uppercase text-ink underline">
                Explore →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-ink">Latest Writing</h2>
          <Link href="/writing" className="text-sm uppercase text-soft hover:text-ink">
            All essays →
          </Link>
        </div>
        <div className="grid gap-4">
          {writings.map((essay) => (
            <article key={essay.title} className="rounded-2xl border border-accentSoft bg-white p-6">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-soft">{essay.date}</div>
              <h3 className="mt-3 text-xl font-semibold uppercase text-ink">{essay.title}</h3>
              <p className="mt-3 text-sm text-soft">{essay.excerpt}</p>
              <Link href={essay.href} className="mt-4 inline-flex text-sm uppercase text-ink underline">
                Read abstract →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

