"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { LetterShell } from "../components/LetterShell";
import { publications } from "../data/content";
import imageSizes from "../data/portfolioImageSizes.json";
import { resolvePublicationEmbed, type PublicationMediaEmbed } from "../lib/publicationEmbed";

const sortedPublications = [...publications].sort((a, b) =>
  Number(b.id === "unread-journal") - Number(a.id === "unread-journal") ||
  b.date.localeCompare(a.date)
);

function PublicationMedia({
  embed,
  title
}: {
  embed: PublicationMediaEmbed;
  title: string;
}) {
  const className = `pub-feature-media pub-feature-media--${embed.kind}`;

  if (embed.kind === "youtube") {
    return (
      <div className={className}>
        <iframe
          src={embed.src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  if (embed.kind === "instagram") {
    return (
      <div className={className}>
        <iframe src={embed.src} title={`${title} on Instagram`} loading="lazy" referrerPolicy="no-referrer" />
      </div>
    );
  }

  if (embed.kind === "facebook") {
    return (
      <div className={className}>
        <iframe
          src={embed.src}
          title={`${title} on Facebook`}
          loading="lazy"
          referrerPolicy="no-referrer"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        src={embed.src}
        title={`${title}: source website`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export default function PublicationsPage() {
  const [activeId, setActiveId] = useState(sortedPublications[0]?.id);
  const [sourceIndex, setSourceIndex] = useState(0);
  const active =
    sortedPublications.find((item) => item.id === activeId) ?? sortedPublications[0];
  const activeIndex = sortedPublications.findIndex((item) => item.id === active.id);
  const yearRange = useMemo(() => {
    const years = sortedPublications.map((item) => item.year).sort((a, b) => b.localeCompare(a));
    const newest = years[0];
    const oldest = years[years.length - 1];
    return newest === oldest ? newest : `${oldest}-${newest}`;
  }, []);

  const previewSource = active.websitePreviews?.[sourceIndex] ?? active.websitePreviews?.[0];
  const embed = useMemo(() => previewSource
    ? { kind: "site" as const, src: previewSource.href }
    : resolvePublicationEmbed(active), [active, previewSource]);
  const secondaryVideoEmbed =
    active.websiteEmbed && active.videoEmbed ? active.videoEmbed : undefined;

  const plates = useMemo(() => {
    const figures = active.figures ?? [];
    if (embed) {
      return figures;
    }
    const lead = { image: active.image, kicker: "Plate", caption: active.title };
    return [lead, ...figures.filter((figure) => figure.image !== active.image)];
  }, [active, embed]);

  return (
    <LetterShell headerStamp={`publications / ${yearRange}`}>
      <p className="kicker">Publications</p>
      <h1 className="display pub-page-title">Writing, films, lectures, and conversations.</h1>
      <p className="body-copy pub-page-deck">
        Select a piece to read or watch.
      </p>

      <div className="pub-stage">
        <aside className="pub-rail">
          <div className="pub-rail-head">
            <span>Select a piece</span>
            <span>0{sortedPublications.length}</span>
          </div>
          <div className="pub-rail-list">
            {sortedPublications.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`pub-item${item.id === active.id ? " is-active" : ""}`}
                aria-pressed={item.id === active.id}
                onClick={() => { setActiveId(item.id); setSourceIndex(0); }}
              >
                <div className="pub-thumb">
                  <Image src={item.image} alt="" width={74} height={58} />
                </div>
                <div className="pub-item-copy">
                  <p className="pub-item-title">{item.title}</p>
                  <p className="pub-item-summary">{item.summary}</p>
                  <p className="pub-item-meta">
                    {item.month} {item.year} / {item.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <p className="pub-rail-note">UNREAD featured first. Other pieces by date.</p>
        </aside>

        <section className="pub-feature">
          <div className="pub-feature-head">
            <span>{active.category} / {active.year}</span>
            <span>
              0{activeIndex + 1} / 0{sortedPublications.length}
            </span>
          </div>

          <header className="pub-feature-lead">
            <h2 className="pub-feature-title">{active.title}</h2>
            <p className="pub-feature-meta">{active.meta}</p>
            <div className="pub-feature-actions">
              {active.href ? (
                <a href={active.href} target="_blank" rel="noreferrer">{active.linkLabel ?? "OPEN SOURCE ↗"}</a>
              ) : <span>{active.linkLabel ?? "OPEN SOURCE ↗"}</span>}
              {active.reach ? <span>{active.reach}</span> : null}
            </div>
            <p className="pub-feature-intro">{active.intro}</p>
          </header>

          {embed?.kind === "site" ? (
            <div className="pub-site-preview">
              <div className="pub-source-bar">
                {active.websitePreviews ? <div className="pub-source-switcher" role="group" aria-label="UNREAD websites">
                  {active.websitePreviews.map((source, index) => (
                    <button key={source.href} type="button" aria-pressed={index === sourceIndex}
                      onClick={() => setSourceIndex(index)}>{source.label}</button>
                  ))}
                </div> : <span>Website preview</span>}
                <a href={embed.src} target="_blank" rel="noreferrer">Open website ↗</a>
              </div>
              <PublicationMedia key={embed.src} embed={embed} title={previewSource?.label ?? active.title} />
            </div>
          ) : embed ? <PublicationMedia key={active.id} embed={embed} title={active.title} /> : null}
          {secondaryVideoEmbed ? (
            <PublicationMedia
              embed={{ kind: "youtube", src: secondaryVideoEmbed }}
              title={`${active.title}: featured episode`}
            />
          ) : null}

          <div className={`pub-spread${embed ? " pub-spread--with-media" : ""}`}>
            {plates.length > 0 ? (
              <div className="pub-plates">
                {plates.map((plate, index) => {
                  const size = (imageSizes as Record<string, { width: number; height: number }>)[plate.image];
                  return <figure key={`${plate.image}-${index}`} className={`pub-plate${plate.image.endsWith('/spot-stage.jpg') ? ' pub-plate--stage' : ''}`}>
                    <a className="pub-plate-frame" href={plate.image} target="_blank" rel="noreferrer" aria-label={`Open full image: ${plate.caption || active.title}`}>
                      <Image
                        src={plate.image}
                        alt={plate.caption || active.title}
                        width={size?.width ?? 480}
                        height={size?.height ?? 360}
                        sizes="(max-width: 760px) 85vw, 35vw"
                      />
                    </a>
                    {plate.kicker || plate.caption ? (
                      <figcaption className="pub-plate-cap">
                        <span>{plate.kicker ?? `Plate 0${index + 1}`}</span>
                        {plate.caption ? <span>{plate.caption}</span> : null}
                      </figcaption>
                    ) : null}
                  </figure>;
                })}
              </div>
            ) : null}

            <div className="pub-feature-copy">
              <p className="pub-feature-body">{active.body}</p>
              <div className="pub-tags">
                {active.tags.map((tag) => (
                  <span key={tag} className="pub-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {active.relatedLinks && active.relatedLinks.length > 0 ? (
                <div className="pub-related">
                  <p className="kicker">Further reading</p>
                  <ul className="pub-related-list">
                    {active.relatedLinks.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} target="_blank" rel="noreferrer">
                          {link.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </LetterShell>
  );
}
