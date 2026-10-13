import Link from "next/link";
import { LetterShell } from "./LetterShell";
import { ProjectDossier } from "./ProjectDossier";
import { projectOrder, projectPath, projectStories } from "../data/projectStories";

export function CaseStudy({ id }: { id: string }) {
  const story = projectStories[id];
  const next = projectStories[projectOrder[(projectOrder.indexOf(id) + 1) % projectOrder.length]];
  return <LetterShell headerStamp="portfolio">
    <main className="portfolio-project-page">
      <nav className="project-page-nav" aria-label="Project navigation"><Link href="/work">← All work</Link><Link href={projectPath(next.id)}>Next: {next.shortTitle || next.title} →</Link></nav>
      <ProjectDossier story={story} standalone />
      <Link className="project-page-next" href={projectPath(next.id)}><span>Next project</span><strong>{next.title} ↗</strong></Link>
    </main>
  </LetterShell>;
}
