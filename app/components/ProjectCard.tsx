"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "../data/content";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => {
        if (project.href) {
          window.open(project.href, "_blank", "noopener,noreferrer");
          return;
        }
        onOpen(project);
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative h-full w-full overflow-hidden border border-[var(--line)] bg-[var(--surface)] p-6 text-left"
    >
      <motion.div layoutId={`project-shell-${project.id}`} className="relative z-10">
        <div className="relative aspect-[16/10] w-full overflow-hidden border border-[var(--line)]">
          <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="ui-sans text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">Project</p>
          <p className="ui-mono text-[11px] text-[var(--ink-muted)]">{project.year}</p>
        </div>
        <div className="mt-3 border-t border-[var(--line)] pt-4">
          <p className="ui-sans text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">{project.media}</p>
        </div>
        <motion.h3 layoutId={`project-title-${project.id}`} className="mt-5 text-xl leading-snug text-[var(--ink)]">
          {project.title}
        </motion.h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{project.shortDescription}</p>
        <p className="ui-sans mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          {project.href ? "[Visit Site]" : "[Open Details]"}
        </p>
      </motion.div>
    </motion.button>
  );
}
