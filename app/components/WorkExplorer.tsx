"use client";

import { useEffect, useRef, useState } from "react";
import { projectOrder, projectStories } from "../data/projectStories";
import { ProjectDossier } from "./ProjectDossier";
import { PortfolioCard } from "./PortfolioCard";

type Filter = "All work" | "Space" | "Business" | "Science" | "Culture";
const filters: Filter[] = ["All work", "Space", "Business", "Science", "Culture"];

export function WorkExplorer() {
  const [filter, setFilter] = useState<Filter>("All work");
  const [selected, setSelected] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = projectOrder.filter(id => filter === "All work" || projectStories[id].category === filter);
  const story = selected ? projectStories[selected] : null;

  useEffect(() => {
    if (!selected || !dialog.current) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal(); element.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, [selected]);

  return <main className="portfolio-collection">
    <header className="collection-intro">
      <div><p className="portfolio-kicker">Tsogt (Todd) Enkhbat</p><h1>Selected <em>work.</em></h1></div>
      <div className="collection-biography">
        <p>I won an international piano Grand Prix at <strong>7</strong>, started my first business at <strong>12</strong>, and reached <strong>$1 million in revenue by 17</strong>. After <strong>five years in the space industry</strong>, my focus is now <a href="/nomos" target="_blank" rel="noopener noreferrer">Nomos ↗</a>.</p>
        <p className="collection-nomos-note"><span lang="el">νόμος</span> <em>(nómos)</em> is Greek for “law” or “custom.” The name reflects Nomos: a space infrastructure company connecting satellite, ground, and cloud systems.</p>
      </div>
    </header>
    <div className="collection-navigation">
      <div className="collection-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <span className="collection-hint" aria-live="polite">{visible.length} experiences</span>
    </div>
    <div className="exhibit-grid">
      {visible.map((id, index) => <PortfolioCard key={id} story={projectStories[id]} priority={index < 4} onOpen={() => setSelected(id)} />)}
    </div>
    <p className="collection-end">Select a project for my role, technical work, photographs, and results.</p>
    <dialog ref={dialog} className="project-dialog" aria-labelledby={story ? `project-title-${story.id}` : undefined} onCancel={event => { if (event.target !== event.currentTarget) return; event.preventDefault(); setSelected(null); }} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      {story ? <div className="project-dialog-content">
        <div className="dossier-bar"><span>{story.category} / {story.shortTitle || story.title}</span><button onClick={() => setSelected(null)} autoFocus>Back to collection <span>×</span></button></div>
        <ProjectDossier key={story.id} story={story} />
      </div> : null}
    </dialog>
  </main>;
}
