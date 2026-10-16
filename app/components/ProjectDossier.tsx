"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import type { ProjectImage, ProjectStory } from "../data/projectStories";
import { projectPath } from "../data/projectStories";
import imageSizes from "../data/portfolioImageSizes.json";
import { YCBacking } from "./YCBacking";
import { projectExhibits } from "../data/projectExhibits";
import { OrganizationMarks } from "./OrganizationMarks";

export const ProjectModel = dynamic(() => import("./ModelViewer"), { ssr: false, loading: () => <div className="model-placeholder">Loading 3D model…</div> });

export function ProjectPhoto({ image, priority = false }: { image: ProjectImage; priority?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const size = (imageSizes as Record<string, { width: number; height: number }>)[image.src] ?? { width: 1200, height: 800 };
  return <figure className={`dossier-figure${size.width / size.height > 1.8 ? ' dossier-figure--wide' : ''}${image.src.endsWith('spacesuit-cutout.png') ? ' dossier-figure--cutout' : ''}`}>
    <button className="dossier-photo" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge: ${image.caption}`}>
      <Image quality={90} src={image.src} alt={image.alt} width={size.width} height={size.height} sizes="(max-width: 760px) 92vw, 65vw" priority={priority} />
      <span className="photo-expand" aria-hidden>↗</span>
    </button>
    <figcaption>{image.caption}</figcaption>
    <dialog ref={dialog} className="photo-dialog" aria-label={image.caption} onCancel={event => event.stopPropagation()} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <button className="photo-close" onClick={() => dialog.current?.close()} autoFocus>Close image ×</button>
      <Image quality={95} src={image.src} alt={image.alt} width={size.width} height={size.height} sizes="(max-width: 1560px) 95vw, 1450px" />
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

function ProjectWebsite({ story }: { story: ProjectStory }) {
  const [live, setLive] = useState(story.website?.href.startsWith('/') ?? false);
  if (!story.website) return null;
  const preview = story.cover ?? story.images[0];
  const size = preview ? (imageSizes as Record<string, { width: number; height: number }>)[preview.src] : undefined;
  return <section className="dossier-website" aria-label={`${story.website.label} website`}>
    <header><h3>{story.website.label} website</h3><a href={story.website.href} target="_blank" rel="noopener noreferrer">Open website ↗</a></header>
    <div className="dossier-website-preview">
      {live ? <iframe src={story.website.href} title={`${story.website.label} website preview`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /> : <button className="dossier-website-load" onClick={() => setLive(true)}>
        {preview ? <Image quality={90} src={preview.src} alt={preview.alt} width={size?.width ?? 1200} height={size?.height ?? 800} sizes="(max-width: 760px) 90vw, 65vw" /> : null}
        <span>View live website ↗</span>
      </button>}
    </div>
    {live ? <p className="dossier-website-fallback">You can also <a href={story.website.href} target="_blank" rel="noopener noreferrer">open the website in a new tab ↗</a>.</p> : null}
  </section>;
}

export function ProjectDossier({ story, standalone = false }: { story: ProjectStory; standalone?: boolean }) {
  const [showPhotos, setShowPhotos] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const exhibit = projectExhibits[story.id];
  const model = story.model ?? exhibit.artifact;
  const used = new Set(story.chapters.map(chapter => chapter.image).filter(index => index !== undefined));
  story.chapters.forEach(chapter => chapter.supportingImages?.forEach(index => used.add(index)));
  const extraImages = story.images.filter((_, index) => !used.has(index));
  const Heading = standalone ? 'h1' : 'h2';
  return <article className={`project-dossier${standalone ? ' project-dossier--standalone' : ''}`}>
    <aside className="dossier-rail">
      <p className="portfolio-kicker">{story.category} / {story.year}</p>
      <div className="dossier-title-row">
        <OrganizationMarks marks={exhibit.marks} />
        <Heading id={`project-title-${story.id}`}>{story.title}</Heading>
      </div>
      {story.id === 'thrive' ? <div className="dossier-yc"><YCBacking linked /></div> : null}
      <p className="dossier-lead">{story.lead}</p>
      <dl className="dossier-meta"><div><dt>Role</dt><dd>{story.role}</dd></div><div><dt>Stage</dt><dd>{story.status}</dd></div></dl>
      <div className="dossier-links">{story.links.map(link => <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{link.label} ↗</a>)}
        {!standalone ? <Link href={projectPath(story.id)}>Open project page ↗</Link> : null}
        {model ? <a href={`/models/${model}.glb`} download>Download 3D model ↓</a> : null}
      </div>
      <div className="dossier-skills"><span>Practice</span><p>{story.skills.join(' · ')}</p></div>
    </aside>
    <div className="dossier-body">
      {story.metrics.length ? <dl className="dossier-metrics">{story.metrics.map(metric => <div key={metric.label}>
        <dd>{metric.value}</dd><dt>{metric.label}</dt>{metric.context ? <p>{metric.context}</p> : null}
      </div>)}</dl> : null}
      <p className="dossier-introduction">{story.introduction}</p>
      {exhibit.contextDetail ? <p className="dossier-context-detail">{exhibit.contextDetail}</p> : null}
      <ProjectWebsite story={story} />
      {story.chapters.map((chapter, index) => <section className={`dossier-chapter${chapter.image !== undefined || chapter.film ? ' dossier-chapter--illustrated' : ''}`} key={chapter.title}>
        <div className="dossier-prose"><h3>{chapter.title}</h3>{chapter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        {chapter.image !== undefined || chapter.film ? <div className="dossier-chapter-media">
          {chapter.film && story.film ? <figure className="dossier-film">
            <video controls muted playsInline preload="none" poster={story.film.poster} aria-label={`${story.title} prototype footage, silent`}>
              <source src={story.film.src} type="video/mp4" />
              <a href={story.film.src}>Watch the prototype footage</a>
            </video>
            <figcaption>{story.film.caption}</figcaption>
          </figure> : null}
          {chapter.image !== undefined && story.images[chapter.image] ? <ProjectPhoto image={story.images[chapter.image]} priority={standalone && index === 0} /> : null}
        </div> : null}
        {chapter.supportingImages?.length ? <div className="dossier-supporting-images">{chapter.supportingImages.map(imageIndex => story.images[imageIndex] ? <ProjectPhoto key={imageIndex} image={story.images[imageIndex]} /> : null)}</div> : null}
        {index === 0 && story.sequence ? <ProjectSequence sequence={story.sequence} /> : null}
      </section>)}
      {model ? <details className="dossier-model" onToggle={event => setShowModel(event.currentTarget.open)}>
        <summary>Explore the {story.shortTitle || story.title} geometry in 3D <span>↗</span></summary>
        <div>{showModel ? <ProjectModel kind={model} title={story.title} /> : null}<p className="model-caption">{story.modelNote ?? exhibit.artifactNote}</p></div>
      </details> : null}
      {extraImages.length ? <section className="dossier-archive">
        <button className="archive-toggle" aria-expanded={showPhotos} onClick={() => setShowPhotos(value => !value)}><span>Project photographs & references <small>{extraImages.length} {extraImages.length === 1 ? 'image' : 'images'}</small></span><span>{showPhotos ? '−' : '+'}</span></button>
        {showPhotos ? <div className="archive-images">{extraImages.map(image => <ProjectPhoto key={image.src} image={image} />)}</div> : null}
      </section> : null}
      <section className="dossier-evidence" aria-label="Project context and sources">
        <h3>Context & sources</h3>
        <p>{exhibit.sources.length ? "Project records and published references provide the context below." : "Original project photographs, descriptions, and records are collected in this archive."}</p>
        {exhibit.sources.length ? <div>{exhibit.sources.map(source => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer"><strong>{source.label} <span>{source.language.toUpperCase()} ↗</span></strong><span>{source.supports}</span></a>)}</div> : null}
        <p className="dossier-artifact-note">3D study: {exhibit.artifactNote}</p>
      </section>
      {story.links.length ? <footer className="dossier-footer"><span>Continue exploring</span>{story.links.map(link => <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{link.label} ↗</a>)}</footer> : null}
    </div>
  </article>;
}
