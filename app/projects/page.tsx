"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { Project, projects } from "../data/content";

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % projects.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const featured = projects[index];

  return (
    <main className="page-shell">
      <section className="hero-dark mb-4 flex items-end justify-between gap-3 p-4">
        <div>
          <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">Haven-1 hardware development progress</p>
          <h1 className="mt-2 text-2xl text-[var(--ink)]">Recent Projects</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="ui-sans border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2 text-xs uppercase tracking-[0.14em]"
        >
          {showAll ? "[LESS]" : "[MORE]"}
        </button>
      </section>

      <section className="hard-card p-2">
        <div className="grid gap-2 md:grid-cols-[1.6fr_0.8fr]">
          <AnimatePresence mode="wait">
            <motion.button
              key={featured.id}
              type="button"
              onClick={() => setActiveProject(featured)}
              initial={{ opacity: 0.2, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.2, x: -20 }}
              transition={{ duration: 0.45 }}
              className="relative aspect-[16/7] overflow-hidden border border-[var(--line)] text-left"
            >
              <Image src={featured.image} alt={featured.title} fill sizes="70vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/5 p-4">
                <p className="ui-mono text-[11px] text-[#e9dcc8]">{featured.year}</p>
                <p className="mt-2 max-w-xl text-lg text-[#f7f1e8]">{featured.title}</p>
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#eadfcd]">{featured.shortDescription}</p>
              </div>
            </motion.button>
          </AnimatePresence>
          <div className="hard-card p-3">
            <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">Progress Feed</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
              Auto-advancing mission-style visual updates. Click any frame to expand project details.
            </p>
            <div className="mt-4 flex gap-1">
              {projects.map((project, marker) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setIndex(marker)}
                  className={`h-2 w-full border border-[var(--line)] ${marker === index ? "bg-[var(--accent)]" : "bg-transparent"}`}
                  aria-label={`Go to ${project.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
        ))}
      </section>

      <AnimatePresence>
        {showAll ? (
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 hard-card p-3">
            <p className="ui-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">Expanded Explorer</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {projects.map((project) => (
                <button
                  key={`${project.id}-expand`}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="flex items-center gap-3 border border-[var(--line)] bg-[var(--bg)] p-2 text-left"
                >
                  <div className="relative h-20 w-24 shrink-0 border border-[var(--line)]">
                    <Image src={project.image} alt={project.title} fill sizes="120px" className="object-cover" />
                  </div>
                  <div>
                    <p className="ui-mono text-[10px] text-[var(--ink-muted)]">{project.year}</p>
                    <p className="text-sm text-[var(--ink)]">{project.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}
