"use client";

import { motion } from "framer-motion";
import { writings } from "../data/content";

export default function WritingPage() {
  return (
    <main className="page-shell">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-dark p-5"
      >
        <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
          Writing
        </p>
        <h1 className="mt-2 text-3xl text-[var(--ink)]">
          Notes, essays, and mission narratives.
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]">
          Threads on shipping in ambiguity, hardware storytelling, and the meaning I keep chasing.
        </p>
      </motion.section>

      <section className="mt-5 grid gap-3 md:grid-cols-2">
        {writings.map((item, i) => (
          <motion.a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.06 * i }}
            whileHover={{ y: -4 }}
            className="hard-card sheen group relative p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="ui-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                {item.date}
              </p>
              <span className="ui-mono text-[11px] text-[var(--accent-strong)] transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
            <p className="mt-3 text-xl leading-snug text-[var(--ink)]">{item.title}</p>
            <p className="ui-sans mt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--accent-strong)]">
              {item.source}
            </p>
          </motion.a>
        ))}
      </section>
    </main>
  );
}
