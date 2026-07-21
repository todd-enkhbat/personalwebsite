"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { Project, projects } from "../data/content";

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % projects.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const filters = ["All", ...Array.from(new Set(projects.flatMap((p) => p.stack.slice(0, 1))))];
  const visible = filter === "All" ? projects : projects.filter((p) => p.stack.includes(filter));
  const featured = projects[index];

  return (
    <main className="page-shell">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-dark mb-4 flex flex-wrap items-end justify-between gap-3 p-4"
      >
        <div>
          <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
            Haven-1 hardware development progress
          </p>
          <h1 className="mt-2 text-3xl text-[var(--ink)]">Recent Projects</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]">
            Interactive case studies. Hover a card to tilt it. Click any project to open the full
            problem / solution / role / impact breakdown.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {filters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="relative ui-sans px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition"
                style={{
                  background: active ? "var(--ink)" : "var(--surface-2)",
                  color: active ? "var(--surface)" : "var(--ink-muted)"
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* Featured auto-rotating panel */}
      <section className="hard-card p-2">
        <div className="grid gap-2 md:grid-cols-[1.6fr_0.8fr]">
          <div className="relative aspect-[16/7] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.button
                key={featured.id}
                type="button"
                onClick={() => setActiveProject(featured)}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 text-left"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="70vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 p-5"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(7,27,51,0.15) 0%, rgba(7,27,51,0.75) 100%)"
                  }}
                >
                  <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[#e9dcc8]">
                    Featured · {featured.year}
                  </p>
                  <motion.p
                    key={`t-${featured.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="mt-2 max-w-xl text-2xl leading-tight text-white md:text-3xl"
                  >
                    {featured.title}
                  </motion.p>
                  <motion.p
                    key={`d-${featured.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    className="mt-3 max-w-xl text-sm leading-relaxed text-[#eadfcd]"
                  >
                    {featured.shortDescription}
                  </motion.p>
                </div>
              </motion.button>
            </AnimatePresence>
          </div>

          <div className="hard-card flex flex-col justify-between p-3">
            <div>
              <p className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                Progress Feed
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                Auto-advancing mission-style rotation. Tap any indicator to jump, or click the
                image to open the case study.
              </p>
            </div>
            <div className="mt-4 space-y-2">
              {projects.map((project, marker) => {
                const active = marker === index;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setIndex(marker)}
                    className="group flex w-full items-center gap-3 bg-transparent py-1 text-left"
                    aria-label={`Go to ${project.title}`}
                  >
                    <span
                      className="h-[3px] shrink-0 transition-all"
                      style={{
                        width: active ? 32 : 18,
                        background: active
                          ? "var(--accent)"
                          : "rgba(7,27,51,0.25)"
                      }}
                    />
                    <span
                      className="ui-mono text-[10px] uppercase tracking-[0.18em] transition-colors"
                      style={{
                        color: active ? "var(--ink)" : "var(--ink-muted)"
                      }}
                    >
                      {String(marker + 1).padStart(2, "0")} · {project.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setActiveProject}
            />
          ))}
        </AnimatePresence>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}
