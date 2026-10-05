"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { LetterShell } from "../components/LetterShell";
import { publications } from "../data/content";
import { resolvePublicationEmbed, type PublicationMediaEmbed } from "../lib/publicationEmbed";

const sortedPublications = [...publications].sort((a, b) => b.date.localeCompare(a.date));

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
        title={`${title} — source site`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export default function PublicationsPage() {
  const [activeId, setActiveId] = useState(sortedPublications[0]?.id);
  const active =
    sortedPublications.find((item) => item.id === activeId) ?? sortedPublications[0];
  const activeIndex = sortedPublications.findIndex((item) => item.id === active.id);
  const yearRange = useMemo(() => {
    const years = sortedPublications.map((item) => item.year);
    const newest = years[0];
    const oldest = years[years.length - 1];
    return newest === oldest ? newest : `${oldest}-${newest}`;
  }, []);

  const embed = useMemo(() => resolvePublicationEmbed(active), [active]);
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
        Select a piece from the index. Plates sit with the copy: a short lead, then the fuller
        grounding.
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
                onClick={() => setActiveId(item.id)}
              >
                <div className="pub-thumb">
                  <Image src={item.image} alt="" width={74} height={58} />
                </div>
                <div className="pub-item-copy">
                  <p className="pub-item-title" style={{ whiteSpace: "pre-wrap" }}>
                    {(item.titleLines ?? [item.title]).join("\n")}
                  </p>
                  <p className="pub-item-summary">{item.summary}</p>
                  <p className="pub-item-meta">
                    {item.month} {item.year} / {item.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <p className="pub-rail-note">Ordered by date.</p>
        </aside>

        <section className="pub-feature">
          <div className="pub-feature-head">
            <span>Featured / {active.title}</span>
            <span>
              0{activeIndex + 1} / 0{sortedPublications.length}
            </span>
          </div>

          {embed ? <PublicationMedia embed={embed} title={active.title} /> : null}
          {secondaryVideoEmbed ? (
            <PublicationMedia
              embed={{ kind: "youtube", src: secondaryVideoEmbed }}
              title={`${active.title} — featured episode`}
            />
          ) : null}

          <div className={`pub-spread${embed ? " pub-spread--with-media" : ""}`}>
            {plates.length > 0 ? (
              <div className="pub-plates">
                {plates.map((plate, index) => (
                  <figure key={`${plate.image}-${index}`} className="pub-plate">
                    <div className="pub-plate-frame">
                      <Image
                        src={plate.image}
                        alt={plate.caption || active.title}
                        width={480}
                        height={360}
                      />
                    </div>
                    {plate.kicker || plate.caption ? (
                      <figcaption className="pub-plate-cap">
                        <span>{plate.kicker ?? `Plate 0${index + 1}`}</span>
                        {plate.caption ? <span>{plate.caption}</span> : null}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ) : null}

            <div className="pub-feature-copy">
              <h2 className="pub-feature-title" style={{ whiteSpace: "pre-wrap" }}>
                {(active.titleLines ?? [active.title]).join("\n")}
              </h2>
              <p className="pub-feature-meta">{active.meta}</p>
              <div className="pub-feature-actions">
                {active.href ? (
                  <a href={active.href} target="_blank" rel="noreferrer">
                    {active.linkLabel ?? "OPEN SOURCE ↗"}
                  </a>
                ) : (
                  <span>{active.linkLabel ?? "OPEN SOURCE ↗"}</span>
                )}
                {active.reach ? <span>{active.reach}</span> : null}
              </div>
              <p className="pub-feature-intro">{active.intro}</p>
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
