"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import type { ProjectImage, ProjectStory } from "../data/projectStories";
import { projectPath } from "../data/projectStories";
import imageSizes from "../data/portfolioImageSizes.json";

export const ProjectModel = dynamic(() => import("./ModelViewer"), { ssr: false, loading: () => <div className="model-placeholder">Loading 3D model…</div> });

export function ProjectPhoto({ image, priority = false }: { image: ProjectImage; priority?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const size = (imageSizes as Record<string, { width: number; height: number }>)[image.src] ?? { width: 1200, height: 800 };
  return <figure className="dossier-figure">
    <button className="dossier-photo" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge: ${image.caption}`}>
      <Image src={image.src} alt={image.alt} width={size.width} height={size.height} sizes="(max-width: 760px) 92vw, 65vw" priority={priority} />
      <span className="photo-expand" aria-hidden>↗</span>
    </button>
    <figcaption>{image.caption}</figcaption>
    <dialog ref={dialog} className="photo-dialog" aria-label={image.caption} onCancel={event => event.stopPropagation()} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <button className="photo-close" onClick={() => dialog.current?.close()} autoFocus>Close image ×</button>
      <Image src={image.src} alt={image.alt} width={size.width} height={size.height} sizes="95vw" />
      <p>{image.caption}</p>
    </dialog>
  </figure>;
}

function ProjectSequence({ sequence }: { sequence: NonNullable<ProjectStory['sequence']> }) {
  const [active, setActive] = useState(0);
  return <section className="dossier-sequence" aria-label={sequence.title}>
    <h3>{sequence.title}</h3>
    <div className="sequence-steps" role="group" aria-label="Explore the workflow">{sequence.steps.map((step, index) => <button key={step.title} aria-pressed={index === active} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span>{step.title}</button>)}</div>
    <div className="sequence-detail" aria-live="polite"><strong>{sequence.steps[active].title}</strong><p>{sequence.steps[active].text}</p></div>
  </section>;
}

export function ProjectDossier({ story, standalone = false }: { story: ProjectStory; standalone?: boolean }) {
  const [showPhotos, setShowPhotos] = useState(false);
  const used = new Set(story.chapters.map(chapter => chapter.image).filter(index => index !== undefined));
  const extraImages = story.images.filter((_, index) => !used.has(index));
  const Heading = standalone ? 'h1' : 'h2';
  return <article className={`project-dossier${standalone ? ' project-dossier--standalone' : ''}`}>
    <aside className="dossier-rail">
      <p className="portfolio-kicker">{story.category} / {story.year}</p>
      <Heading id={`project-title-${story.id}`}>{story.title}</Heading>
      <p className="dossier-lead">{story.lead}</p>
      <dl className="dossier-meta"><div><dt>Role</dt><dd>{story.role}</dd></div><div><dt>Stage</dt><dd>{story.status}</dd></div></dl>
      <div className="dossier-links">{story.links.map(link => <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{link.label} ↗</a>)}
        {!standalone ? <Link href={projectPath(story.id)}>Open project page ↗</Link> : null}
        {story.model ? <a href={`/models/${story.model}.glb`} download>Download 3D model ↓</a> : null}
      </div>
      <div className="dossier-skills"><span>Practice</span><p>{story.skills.join(' · ')}</p></div>
    </aside>
    <div className="dossier-body">
      {story.metrics.length ? <dl className="dossier-metrics">{story.metrics.map(metric => <div key={metric.label}>
        <dd>{metric.value}</dd><dt>{metric.label}</dt>{metric.context ? <p>{metric.context}</p> : null}
      </div>)}</dl> : null}
      {story.model ? <section className="dossier-model" aria-label={`${story.shortTitle || story.title} 3D model`}>
        <ProjectModel kind={story.model} title={story.title} />
        <p className="model-caption">{story.modelNote}</p>
      </section> : null}
      <p className="dossier-introduction">{story.introduction}</p>
      {story.chapters.map((chapter, index) => <section className="dossier-chapter" key={chapter.title}>
        <div className="dossier-prose"><h3>{chapter.title}</h3>{chapter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        {chapter.image !== undefined && story.images[chapter.image] ? <ProjectPhoto image={story.images[chapter.image]} priority={standalone && index === 0 && !story.model} /> : null}
        {index === 0 && story.sequence ? <ProjectSequence sequence={story.sequence} /> : null}
      </section>)}
      {extraImages.length ? <section className="dossier-archive">
        <button className="archive-toggle" aria-expanded={showPhotos} onClick={() => setShowPhotos(value => !value)}><span>More from the project <small>{extraImages.length} {extraImages.length === 1 ? 'image' : 'images'}</small></span><span>{showPhotos ? '−' : '+'}</span></button>
        {showPhotos ? <div className="archive-images">{extraImages.map(image => <ProjectPhoto key={image.src} image={image} />)}</div> : null}
      </section> : null}
      {story.links.length ? <footer className="dossier-footer"><span>Continue exploring</span>{story.links.map(link => <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{link.label} ↗</a>)}</footer> : null}
    </div>
  </article>;
}
