'use client';

import Image from 'next/image';
import modelPreviewAssets from '../data/modelPreviewAssets.json';
import type { ProjectStory } from '../data/projectStories';
import { projectExhibits } from '../data/projectExhibits';
import { OrganizationMarks } from './OrganizationMarks';

export function PortfolioCard({ story, onOpen, priority = false }: { story: ProjectStory; onOpen: () => void; priority?: boolean }) {
  const exhibit = projectExhibits[story.id];
  const metric = story.metrics[0];
  return <article className={`exhibit exhibit--${story.id}`}>
    <button className="exhibit-open" onClick={onOpen} aria-label={`Explore ${story.title}`} aria-haspopup="dialog">
      <span className="exhibit-stage">
        <Image quality={90} className="exhibit-hero" src={`/paper-assets/${exhibit.hero}`} alt={exhibit.heroAlt} fill sizes="(max-width: 540px) 92vw, (max-width: 980px) 46vw, 420px" priority={priority} style={{objectPosition: exhibit.position || 'center'}} />
        <span className="exhibit-artifact" aria-hidden="true"><Image quality={90} src={modelPreviewAssets[exhibit.artifact]} alt="" width={768} height={768} sizes="(max-width: 540px) 60vw, (max-width: 980px) 30vw, 270px" /></span>
        {exhibit.heroCredit ? <span className="exhibit-image-credit">{exhibit.heroCredit}</span> : null}
        <span className="exhibit-plus" aria-hidden="true">↗</span>
      </span>
      <span className="exhibit-heading"><OrganizationMarks marks={exhibit.marks} /><span className="exhibit-title">{story.id === 'cfa' ? 'Exoplanet research' : story.shortTitle || story.title}</span></span>
      <span className="exhibit-context">{exhibit.context}</span>
      <span className="exhibit-description">{exhibit.description}</span>
      <span className="exhibit-meta"><span>{story.role.split(' · ')[0]}</span><span>{story.year.split(' · ')[0]}</span></span>
    </button>
    <div className="exhibit-bottom">
      {metric ? <p><strong>{metric.value}</strong><span>{metric.label}</span></p> : <p className="exhibit-discipline">{story.skills.slice(0,2).join(' · ')}</p>}
      <a href={`/work/${story.id === 'trend-mart' ? 'trend' : story.id}`} aria-label={`Read ${story.title} project page`}>View project ↗</a>
    </div>
  </article>;
}
