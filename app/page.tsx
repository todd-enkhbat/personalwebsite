"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { about, projects, writings } from "./data/content";
import { MagneticButton } from "./components/MagneticButton";

const HERO_LINES = [
  "Engineering progress",
  "for missions, products,",
  "and ideas."
];

const TICKER = [
  "NASA NIAC · T-REX Mission",
  "Columbia Rocketry · Propulsion",
  "HUR. EdTech · Founder",
  "MARS-V · $5.8M Raised",
  "ONDO Space · Systems Intern",
  "Beyond The Music · Piano"
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroFade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <main className="page-shell">
      {/* HERO */}
      <section ref={heroRef} className="hero-dark grid gap-8 p-6 md:grid-cols-[1fr_0.65fr]">
        <motion.div style={{ y: heroY, opacity: heroFade }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex h-2 w-2 bg-[var(--accent)]" />
            <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
              Building next-generation systems · v2026.04
            </p>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="mt-6 max-w-2xl text-[clamp(34px,6vw,64px)] leading-[1.02] tracking-[-0.01em] text-[var(--ink)]"
          >
            {HERO_LINES.map((line, i) => (
              <span key={i} className="mask-line">
                <motion.span
                  variants={{
                    hidden: { y: "115%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                    }
                  }}
                  className="block"
                >
                  {i === 2 ? (
                    <>
                      and <span className="italic text-[var(--accent-strong)]">ideas.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]"
          >
            {about.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="/projects">See Recent Projects</MagneticButton>
            <MagneticButton href="/about" variant="ghost">
              About + Now
            </MagneticButton>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1 } } }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4"
          >
            {[
              ["$200K", "NASA NIAC"],
              ["$5.8M", "Mars Analog"],
              ["$800K+", "Youth Venture"]
            ].map(([value, label]) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <p className="text-lg font-semibold text-[var(--ink)]">{value}</p>
                <p className="ui-mono mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="hard-card relative p-2"
        >
          <motion.div
            style={{ scale: portraitScale }}
            className="relative aspect-[4/5] w-full max-h-[440px] overflow-hidden"
          >
            <Image
              src="/images/headshot-editorial.png"
              alt="Portrait of Tsogt Enkhbat"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(7,27,51,0.5) 100%)"
              }}
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <p className="ui-mono text-[10px] uppercase tracking-[0.2em] text-white">
                Columbia · NYC
              </p>
              <p className="ui-mono text-[10px] uppercase tracking-[0.2em] text-white">
                Available for 2026
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap mt-6">
        <div className="ticker">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT + NOW inline */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mt-6 grid gap-3 md:grid-cols-[0.7fr_1.3fr]"
      >
        <div className="hard-card p-4">
          <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            01 / About
          </p>
          <h2 className="mt-3 text-2xl leading-tight text-[var(--ink)]">
            Trajectory: aerospace, engineering, systems thinking.
          </h2>
        </div>
        <div className="hard-card p-4">
          <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
            Now
          </p>
          <p className="mt-3 text-base leading-relaxed text-[var(--ink)]">
            {about.now}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {[
              ["T-REX", "Mission proposal"],
              ["Rocketry", "Static fires"],
              ["HUR.", "Growth loops"]
            ].map(([k, v]) => (
              <div key={k} className="bg-[var(--surface-2)] p-3">
                <p className="ui-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                  {k}
                </p>
                <p className="mt-1 text-xs text-[var(--ink)]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FEATURED PROJECTS TEASE */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mt-6"
      >
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
              02 / Flagships
            </p>
            <h2 className="mt-2 text-2xl text-[var(--ink)]">Recent Projects</h2>
          </div>
          <Link
            href="/projects"
            className="ui-sans text-xs uppercase tracking-[0.18em] text-[var(--accent-strong)]"
          >
            [ View all → ]
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="hard-card group relative overflow-hidden p-2"
            >
              <Link href="/projects" className="block">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="30vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 45%, rgba(7,27,51,0.55) 100%)"
                    }}
                  />
                  <p className="absolute bottom-3 left-3 right-3 text-sm text-white">
                    {project.title}
                  </p>
                </div>
                <p className="ui-mono mt-3 px-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                  {project.year} · {project.stack[0]}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* UPDATES + CONTACT */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="mt-6 grid gap-3 md:grid-cols-[1.4fr_0.9fr]"
      >
        <div className="hard-card p-4">
          <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
            03 / Updates
          </p>
          <div className="mt-3 grid gap-2">
            {writings.slice(0, 3).map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i }}
                className="group flex items-center justify-between gap-3 bg-[var(--surface-2)] p-3 transition hover:bg-[var(--surface)]"
              >
                <div>
                  <p className="ui-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                    {item.date}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink)]">{item.title}</p>
                </div>
                <span className="ui-mono text-[11px] text-[var(--accent-strong)] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="hard-card flex flex-col justify-between p-4">
          <div>
            <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
              04 / Contact
            </p>
            <h3 className="mt-3 text-xl leading-snug text-[var(--ink)]">
              Ready to collaborate on space or systems?
            </h3>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <MagneticButton href="mailto:te2346@columbia.edu" external>
              Email Todd
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/tsogt-enkhbat"
              external
              variant="ghost"
            >
              LinkedIn
            </MagneticButton>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
