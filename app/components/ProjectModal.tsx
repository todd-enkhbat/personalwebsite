"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Project } from "../data/content";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project ? (
        <>
          <motion.button
            key="backdrop"
            aria-label="Close project modal"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0b1624]/55"
          />
          <motion.div
            key={project.id}
            layoutId={`project-shell-${project.id}`}
            className="fixed inset-x-4 top-10 z-50 mx-auto max-h-[86vh] w-full max-w-4xl overflow-auto border border-[var(--line)] bg-[var(--bg)] p-6 md:inset-x-10 md:p-8"
          >
            <div className="flex items-center justify-between">
              <motion.h3 layoutId={`project-title-${project.id}`} className="text-xl leading-tight text-[var(--ink)] md:text-3xl">
                {project.title}
              </motion.h3>
              <button
                type="button"
                onClick={onClose}
                className="ui-sans border border-[var(--line)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)] transition hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                Close
              </button>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } }
              }}
              className="mt-6 space-y-5"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="border border-[var(--line)] bg-[var(--surface)] p-5"
              >
                <p className="ui-sans text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">Overview</p>
                <div className="relative mt-3 aspect-[16/8] w-full overflow-hidden border border-[var(--line)]">
                  <Image src={project.image} alt={project.title} fill sizes="80vw" className="object-cover" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">{project.overview}</p>
              </motion.div>

              {[
                ["Problem", project.problem],
                ["Solution", project.solution]
              ].map(([label, value]) => (
                <motion.div
                  key={label}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="border border-[var(--line)] bg-[var(--surface)] p-5"
                >
                  <p className="ui-sans text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">{label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">{value}</p>
                </motion.div>
              ))}

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="grid gap-4 md:grid-cols-2">
                <div className="border border-[var(--line)] bg-[var(--surface)] p-5">
                  <p className="ui-sans text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">My Role</p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--ink)]">
                    {project.role.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="border border-[var(--line)] bg-[var(--surface)] p-5">
                  <p className="ui-sans text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">Tech Stack</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="ui-sans border border-[var(--line)] bg-[var(--bg)] px-3 py-1 text-xs text-[var(--ink)]">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="ui-sans mt-4 text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">Impact</p>
                  <ul className="mt-2 space-y-2 text-sm text-[var(--ink)]">
                    {project.impact.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
