"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { about, contact } from "../data/content";
import { MagneticButton } from "../components/MagneticButton";

const TRAJECTORY = [
  ["2018", "Trend Mart founded (age 15)"],
  ["2022", "Harvard SSP · exoplanet detection"],
  ["2024", "MARS-V $5.8M · HUR. EdTech launch"],
  ["2025", "Columbia Rocketry · ONDO Space"],
  ["2026", "T-REX Phase I · NASA NIAC"]
] as const;

const FACETS = [
  ["Astrophysics", "Black-hole imaging, VLBI, exoplanets"],
  ["Space systems", "Propulsion, satellite bus, DAQ"],
  ["Startups", "Zero-to-one, growth, ops"],
  ["Philosophy", "Origins, meaning, mind"]
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hard-card p-2"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/headshot-editorial.png"
              alt="Tsogt portrait"
              fill
              priority
              sizes="40vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(7,27,51,0.5) 100%)"
              }}
            />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between">
              <span className="ui-mono text-[10px] uppercase tracking-[0.2em] text-white">
                {about.name}
              </span>
              <span className="ui-mono text-[10px] uppercase tracking-[0.2em] text-white">
                UB · NYC
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hard-card p-5"
        >
          <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
            About + Now
          </p>
          <h1 className="mt-3 max-w-lg text-3xl leading-tight text-[var(--ink)]">
            Humble, curious, and biased toward shipping.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">
            {about.intro}
          </p>

          <div className="mt-5 bg-[var(--surface-2)] p-4">
            <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
              Now
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">
              {about.now}
            </p>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {FACETS.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="bg-[var(--surface)] p-3"
              >
                <p className="ui-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  {k}
                </p>
                <p className="mt-1 text-xs text-[var(--ink)]">{v}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <MagneticButton href={`mailto:${contact.email}`} external>
              {contact.email}
            </MagneticButton>
            <MagneticButton href={contact.linkedin} external variant="ghost">
              LinkedIn
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* Trajectory timeline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mt-6 hard-card p-5"
      >
        <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
          Trajectory
        </p>
        <h2 className="mt-2 text-2xl text-[var(--ink)]">
          Aerospace, engineering, systems thinking.
        </h2>

        <ol className="mt-5 grid gap-3 md:grid-cols-5">
          {TRAJECTORY.map(([year, event], i) => (
            <motion.li
              key={year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="relative bg-[var(--surface)] p-3"
            >
              <span
                className="absolute left-0 top-0 h-[3px] bg-[var(--accent)]"
                style={{ width: `${((i + 1) / TRAJECTORY.length) * 100}%` }}
              />
              <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                {year}
              </p>
              <p className="mt-2 text-xs leading-snug text-[var(--ink)]">{event}</p>
            </motion.li>
          ))}
        </ol>
      </motion.section>
    </main>
  );
}
