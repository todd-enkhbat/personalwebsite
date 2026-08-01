"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { LetterShell } from "../components/LetterShell";
import { publications, type PublicationFeatureLayout } from "../data/content";

const sortedPublications = publications;

function featureLayoutFor(index: number, explicit?: PublicationFeatureLayout): PublicationFeatureLayout {
  if (explicit) return explicit;
  const cycle: PublicationFeatureLayout[] = ["inset", "letterbox", "square"];
  return cycle[index % cycle.length];
}

export default function PublicationsPage() {
  const [activeId, setActiveId] = useState(sortedPublications[0]?.id);
  const active =
    sortedPublications.find((item) => item.id === activeId) ?? sortedPublications[0];
  const activeIndex = sortedPublications.findIndex((item) => item.id === active.id);
  const layout = featureLayoutFor(activeIndex, active.featureLayout);
  const yearRange = useMemo(() => {
    const years = sortedPublications.map((item) => item.year);
    const newest = years[0];
    const oldest = years[years.length - 1];
    return newest === oldest ? newest : `${oldest}—${newest}`;
  }, []);

  return (
    <LetterShell headerStamp={`publications / ${yearRange}`}>
      <p className="kicker">Publications</p>
      <h1
        className="display"
        style={{ fontSize: 32, lineHeight: "38px", marginTop: 12, marginBottom: 12 }}
      >
        Writing, films, lectures, and conversations.
      </h1>
      <p className="body-copy" style={{ maxWidth: 640, marginBottom: 36 }}>
        Select a piece from the index. The featured panel updates with a plate, context, and a
        direct link — each piece keeps its own orientation so soft covers stay readable.
      </p>

      <div className="pub-stage">
        <aside className="pub-rail">
          <div className="pub-rail-head">
            <span>Select a piece</span>
            <span>0{sortedPublications.length}</span>
          </div>
          <div>
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
                <div>
                  <p className="pub-item-title" style={{ whiteSpace: "pre-wrap" }}>
                    {(item.titleLines ?? [item.title]).join("\n")}
                  </p>
                  <p className="pub-item-meta">
                    {item.year} / {item.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <p className="pub-rail-note">
            Ordered by date. Selecting a piece updates only the feature panel.
          </p>
        </aside>

        <section className={`pub-feature layout-${layout}`}>
          <div className="pub-feature-head">
            <span>Featured / {active.title}</span>
            <span>
              ← 0{activeIndex + 1} / 0{sortedPublications.length} →
            </span>
          </div>

          <div className="pub-feature-main">
            <div className="pub-feature-image">
              <Image
                src={active.image}
                alt={active.title}
                width={layout === "letterbox" ? 1280 : layout === "square" ? 720 : 640}
                height={layout === "letterbox" ? 280 : layout === "square" ? 720 : 800}
              />
            </div>
            <div className="pub-feature-copy">
              <div className="pub-feature-primary">
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
              </div>
              <div className="pub-feature-secondary">
                <p className="pub-feature-blurb">{active.blurb}</p>
                <div className="pub-tags">
                  {active.tags.map((tag) => (
                    <span key={tag} className="pub-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {active.printImage ? (
            <figure className="pub-print">
              <div className="pub-print-image">
                <Image
                  src={active.printImage}
                  alt={`${active.title} printed edition`}
                  width={280}
                  height={374}
                />
              </div>
              <figcaption className="pub-print-copy">
                <p className="kicker">Figure · Printed edition</p>
                <p className="body-copy">{active.printCaption}</p>
              </figcaption>
            </figure>
          ) : null}
        </section>
      </div>
    </LetterShell>
  );
}
