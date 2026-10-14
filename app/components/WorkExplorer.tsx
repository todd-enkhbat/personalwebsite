"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projectOrder, projectStories } from "../data/projectStories";
import { ProjectDossier, ProjectModel } from "./ProjectDossier";
import imageSizes from "../data/portfolioImageSizes.json";

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
        <p>I won an international piano Grand Prix at <strong>7</strong>, started my first business at <strong>12</strong>, and reached <strong>$1 million in revenue by 17</strong>. After <strong>five years in the space industry</strong>, my focus is now <a href="https://nomosorbital.com/" target="_blank" rel="noopener noreferrer">Nomos ↗</a>.</p>
        <p className="collection-nomos-note"><span lang="el">νόμος</span> <em>(nómos)</em> is Greek for “law” or “custom.” The name reflects what I’m building: a framework for bringing order to space mission planning.</p>
      </div>
    </header>
    <div className="collection-navigation">
      <div className="collection-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <span className="collection-hint">Select a project to explore</span>
    </div>
    <div className="exhibit-grid">
      {visible.map(id => {
        const project = projectStories[id];
        const cover = project.images[0];
        const modelPreview = ['trex', 'ares', 'halo'].includes(id) && project.model;
        const metric = project.metrics[0];
        const size = cover ? (imageSizes as Record<string, { width: number; height: number }>)[cover.src] : undefined;
        return <article className={`exhibit exhibit--${id}${modelPreview ? ' exhibit--object' : ''}`} key={id}>
          <button className="exhibit-open" onClick={() => setSelected(id)} aria-label={`Explore ${project.title}`} aria-haspopup="dialog">
            <div className="exhibit-stage">
              {modelPreview ? <div aria-hidden="true"><ProjectModel kind={modelPreview} title={project.title} preview /></div> : cover ? <Image src={cover.src} alt={cover.alt} width={size?.width ?? 1200} height={size?.height ?? 800} sizes="(max-width: 620px) 90vw, (max-width: 980px) 45vw, 30vw" /> : <div className="exhibit-type-object" aria-hidden><span>☾</span><em>Observations<br />of the sky.</em></div>}
              <span className="exhibit-plus" aria-hidden>+</span>
              {modelPreview ? <span className="exhibit-model-label">Interactive 3D</span> : null}
            </div>
            <span className="exhibit-meta">{project.role.split(' · ')[0]} <span>{project.year.split(' · ')[0]}</span></span>
            <span className="exhibit-title">{project.shortTitle || project.title}</span>
            <span className="exhibit-description">{project.lead}</span>
          </button>
          <div className="exhibit-bottom">
            {metric ? <p><strong>{metric.value}</strong><span>{metric.label}</span></p> : <p className="exhibit-discipline">{project.skills.slice(0, 2).join(' · ')}</p>}
            {project.links[0]?.href.startsWith('http') ? <a href={project.links[0].href} target="_blank" rel="noopener noreferrer" aria-label={project.links[0].label}>Website ↗</a> : null}
          </div>
        </article>;
      })}
    </div>
    <p className="collection-end">Built over time. From Ulaanbaatar to New York.</p>
    <dialog ref={dialog} className="project-dialog" aria-labelledby={story ? `project-title-${story.id}` : undefined} onCancel={event => { if (event.target !== event.currentTarget) return; event.preventDefault(); setSelected(null); }} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      {story ? <div className="project-dialog-content">
        <div className="dossier-bar"><span>{story.category} / {story.shortTitle || story.title}</span><button onClick={() => setSelected(null)} autoFocus>Back to collection <span>×</span></button></div>
        <ProjectDossier key={story.id} story={story} />
      </div> : null}
    </dialog>
  </main>;
}
