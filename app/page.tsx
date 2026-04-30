"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { about, writings } from "./data/content";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-dark grid gap-8 p-6 md:grid-cols-[1fr_0.65fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">
            Building next-generation systems
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-4 max-w-2xl text-3xl leading-[1.14] text-[var(--ink)] md:text-5xl"
          >
            Engineering progress for missions, products, and ideas.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]"
          >
            {about.intro}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-7 grid gap-2 sm:grid-cols-2">
            {[
              ["Recent Projects", "/projects"],
              ["About", "/about"],
              ["Public", "/public"],
              ["Writing", "/writing"],
              ["Philosophy", "/philosophy"]
            ].map(([label, href]) => (
              <Link key={href} href={href} className="ui-sans border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2 text-xs uppercase tracking-[0.14em] text-[var(--ink)] transition hover:border-[var(--accent)]">
                {label}
              </Link>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="hard-card p-2">
          <div className="relative aspect-[4/5] w-full max-h-[440px]">
            <Image src="/images/headshot-editorial.png" alt="Portrait of Tsogt Enkhbat" fill priority sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" />
          </div>
        </motion.div>
      </section>

      <section className="mt-5 grid gap-3 md:grid-cols-[1.7fr_0.9fr]">
        <div className="hard-card p-2">
          <div className="relative aspect-[16/7] w-full overflow-hidden border border-[var(--line)]">
            <Image src="/images/project-scroll-reference.png" alt="Mission progress panel" fill sizes="70vw" className="object-cover" />
          </div>
          <div className="mt-3 flex items-start justify-between gap-3 px-1">
            <p className="ui-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-muted)]">Haven-style progress layout adapted for portfolio updates.</p>
            <Link href="/projects" className="ui-sans text-xs uppercase tracking-[0.14em] text-[var(--accent-strong)]">
              Find out more
            </Link>
          </div>
        </div>
        <div className="hard-card p-4">
          <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">Updates</p>
          <div className="mt-3 grid gap-3">
            {writings.slice(0, 3).map((item) => (
              <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="border border-[var(--line)] bg-[var(--surface-2)] p-3">
                <p className="ui-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-muted)]">{item.date}</p>
                <p className="mt-1 text-sm text-[var(--ink)]">{item.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
