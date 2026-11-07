import Image from "next/image";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { etymologies } from "./data/etymologies";
import { HomeIntro } from "./components/HomeIntro";
import Link from "next/link";
import type { ReactNode } from "react";
import { LetterShell } from "./components/LetterShell";
import { linkedReferences, person, trainings, type LinkItem } from "./data/content";

function linkifyText(text: string, links: LinkItem[]): ReactNode[] {
  const sorted = [...links].sort((a, b) => b.label.length - a.label.length);
  const pattern = sorted
    .map((item) => item.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  if (!pattern) return [text];

  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);
  const byLabel = new Map(sorted.map((item) => [item.label, item]));

  return parts.map((part, index) => {
    const link = byLabel.get(part);
    if (!link) return <span key={`t-${index}`}>{part}</span>;

    return (
      <a
        key={`l-${index}-${link.label}`}
        href={link.href}
        className="inline-ref"
        target="_blank"
        rel="noreferrer"
      >
        {link.label}
      </a>
    );
  });
}

export default async function MainPage() {
  // The background document uses Markdown headings followed by plain paragraphs.
  const background = await readFile(path.join(process.cwd(), "public/background.md"), "utf8");
  const backgroundSections = background.split(/^## /m).filter(Boolean).map((section) => {
    const [heading, ...body] = section.trim().split("\n");
    return { heading, body: body.join("\n").trim() };
  });

  return (
    <HomeIntro><LetterShell>
      <div className="main-split">
        <div className="main-copy">
          <p className="kicker">Main</p>
          <h1 className="headline-inline">
            <span>{person.opener}&nbsp;</span>
            <Link href={person.social.nomos} className="accent-link">
              {person.openerEmphasis}
            </Link>
            <span>&nbsp;{person.openerTail}</span>
          </h1>
          <p className="body-copy" style={{ width: "100%", maxWidth: 720 }}>
            {linkifyText(`${person.letter} ${person.inspiration}`, linkedReferences)}
          </p>
          <p className="body-copy">{person.researchInterests}</p>
          <details className="background-disclosure">
            <summary>
              Education &amp; background
              <span className="background-disclosure__indicator" aria-hidden="true" />
            </summary>
            <div className="background-markdown">
              {backgroundSections.map(({ heading, body }) => (
                <section key={heading}>
                  <h2>{heading}</h2>
                  <p>{body}</p>
                </section>
              ))}
            </div>
          </details>
        </div>

        <div className="portrait-stack" aria-label="Portrait composition">
          <div className="portrait-stack__statue">
            <Image
              src="/paper-assets/main-statue.png"
              alt=""
              width={332}
              height={430}
              priority
              unoptimized
            />
          </div>
          <div className="portrait-stack__person">
            <Image
              src="/paper-assets/portrait-suit.png"
              alt={`${person.formalName} portrait`}
              width={279}
              height={332}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      <section className="trainings" aria-label="Trainings">
        <div className="trainings-rule" aria-hidden />
        <div className="trainings-columns">
          {trainings.map((column) => (
            <article key={column.id} className="training-column">
              <header className="training-header">
                <span className="training-accent" aria-hidden />
                <h2>{column.title}</h2>
              </header>
              <div className="training-body">
                <div className="training-icon">
                  <Image
                    src={column.image}
                    alt=""
                    width={168}
                    height={240}
                    unoptimized
                  />
                </div>
                <div className="training-copy">
                  <h3>{column.subtitle}</h3>
                  <p>{column.body}</p>
                </div>
              </div>
              {column.id === "philosophy" && (
                <details className="etymology-list">
                  <summary>Etymology List <span>{etymologies.length} words</span></summary>
                  <p className="etymology-list__intro">Words I return to, and the histories they carry. A growing collection.</p>
                  <dl>
                    {etymologies.map((entry) => (
                      <div className="etymology-entry" key={entry.word}>
                        <dt>{entry.word} <span>{entry.language}</span></dt>
                        <dd>
                          <p className="etymology-entry__root">{entry.root}</p>
                          <p className="etymology-entry__meaning">{entry.meaning}</p>
                          <p>{entry.history}</p>
                          <a href={entry.source} target="_blank" rel="noreferrer">Source ↗</a>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </details>
              )}
              {column.id === "physics" && (
                <Link href="/philosophy-physics" className="training-page-link">
                  Philosophy/Physics <span aria-hidden="true">↗</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
    </LetterShell></HomeIntro>
  );
}
