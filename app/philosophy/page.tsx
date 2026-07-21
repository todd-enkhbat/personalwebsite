"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const topics = [
  ["Explanation, Truth, Inevitability", "Foundations of understanding, immutable law."],
  ["Entropy and Time", "The arrow of time and the drift toward disorder."],
  ["Time, Space, and Einstein", "Spacetime, general relativity, the shape of the universe."],
  ["The Origin of the Universe", "From the first moments to the cosmic web."],
  ["The Quantum Revolution", "Uncertainty, probability, the nature of the future."],
  ["Evolution and Life", "Complexity emerging over billions of years."],
  ["The Origin of Mind", "Consciousness, awareness, subjective experience."],
  ["Language and Story", "How we construct meaning and share narrative."],
  ["Brains and Belief", "The neural architecture of conviction."],
  ["Art and Transcendence", "The impulse to create beauty and reach further."],
  ["The Future", "Possibility, uncertainty, the landscape of what may come."],
  ["In Search of Meaning", "Purpose within a universe of physical law."]
] as const;

export default function PhilosophyPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <main className="page-shell">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="hard-card p-5"
      >
        <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
          Philosophy · Origins and Meaning
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl leading-tight text-[var(--ink)] md:text-4xl">
          Mapping the wild and entirely baffling existence we share.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
          Twelve threads I keep returning to — existence, time, mind, and the search for meaning.
          Hover a card to focus it; the others recede.
        </p>
      </motion.section>

      <section className="mt-4 grid gap-3 md:grid-cols-[1.4fr_0.8fr]">
        <div
          className="grid gap-2 md:grid-cols-2"
          onMouseLeave={() => setActive(null)}
        >
          {topics.map(([topic, blurb], idx) => {
            const dimmed = active !== null && active !== idx;
            return (
              <motion.article
                key={topic}
                onMouseEnter={() => setActive(idx)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.03 * idx }}
                animate={{
                  opacity: dimmed ? 0.4 : 1,
                  scale: active === idx ? 1.01 : 1
                }}
                className="hard-card relative cursor-default p-4"
              >
                <div className="flex items-start justify-between">
                  <p className="ui-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <span
                    className="h-1 w-1 shrink-0 bg-[var(--accent)]"
                    style={{ opacity: active === idx ? 1 : 0.35 }}
                  />
                </div>
                <h2 className="mt-2 text-sm leading-snug text-[var(--ink)]">{topic}</h2>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink-muted)]">
                  {blurb}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hard-card sticky top-24 h-fit p-2"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/project-scroll-reference.png"
              alt="Philosophy visual notebook"
              fill
              sizes="35vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 45%, rgba(7,27,51,0.6) 100%)"
              }}
            />
            <p className="absolute bottom-3 left-3 right-3 text-xs text-white">
              {active !== null ? topics[active][0] : "Visual notebook"}
            </p>
          </div>
          <p className="ui-mono mt-2 px-1 text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
            Hover a card to focus · {String((active ?? 0) + 1).padStart(2, "0")} /{" "}
            {topics.length}
          </p>
        </motion.aside>
      </section>
    </main>
  );
}
