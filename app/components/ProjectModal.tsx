"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { Project } from "../data/content";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const fade = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <>
          <motion.button
            key="backdrop"
            aria-label="Close project"
            onClick={onClose}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(7,27,51,0.55)" }}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:p-10">
            <motion.div
              key={project.id}
              layoutId={`project-shell-${project.id}`}
              transition={{ layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
              className="pointer-events-auto relative w-full max-w-4xl bg-[var(--bg)] p-6 shadow-[0_40px_120px_-40px_rgba(7,27,51,0.55)] md:p-10"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="ui-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-strong)]"
                  >
                    {project.year} · {project.stack[0]}
                  </motion.p>
                  <motion.h3
                    layoutId={`project-title-${project.id}`}
                    className="mt-2 text-2xl leading-tight text-[var(--ink)] md:text-4xl"
                  >
                    {project.title}
                  </motion.h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="magnetic ghost shrink-0"
                >
                  <span>Close</span>
                  <span className="magnetic-arrow">×</span>
                </button>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } }
                }}
                className="mt-6 space-y-5"
              >
                <motion.div variants={fade}>
                  <div className="relative aspect-[16/8] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="80vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fade}>
                  <p className="ui-sans text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                    Overview
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-[var(--ink)]">
                    {project.overview}
                  </p>
                </motion.div>

                <div className="grid gap-5 md:grid-cols-2">
                  <motion.div variants={fade} className="bg-[var(--surface)] p-5">
                    <p className="ui-sans text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                      Problem
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">
                      {project.problem}
                    </p>
                  </motion.div>
                  <motion.div variants={fade} className="bg-[var(--surface)] p-5">
                    <p className="ui-sans text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                      Solution
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">
                      {project.solution}
                    </p>
                  </motion.div>
                </div>

                <motion.div variants={fade} className="grid gap-5 md:grid-cols-2">
                  <div className="bg-[var(--surface)] p-5">
                    <p className="ui-sans text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                      My Role
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--ink)]">
                      {project.role.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1 w-3 shrink-0 bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--surface)] p-5">
                    <p className="ui-sans text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                      Tech Stack
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="ui-sans px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--ink)]"
                          style={{ background: "var(--surface-2)" }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="ui-sans mt-5 text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                      Impact
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-[var(--ink)]">
                      {project.impact.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1 w-3 shrink-0 bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {project.href ? (
                  <motion.div variants={fade}>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="magnetic sheen"
                    >
                      <span>Visit project</span>
                      <span className="magnetic-arrow">→</span>
                    </a>
                  </motion.div>
                ) : null}
              </motion.div>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
