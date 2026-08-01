import Link from "next/link";
import { LetterShell } from "../components/LetterShell";
import { portfolioRows } from "../data/content";

export default function WorkPage() {
  return (
    <LetterShell headerStamp="portfolio">
      <div className="portfolio-grid">
        {portfolioRows.map((row) => (
          <section key={row.year} className="portfolio-year-row" aria-labelledby={`year-${row.year}`}>
            <h2 id={`year-${row.year}`} className="portfolio-year">
              {row.year}
            </h2>
            <div className="portfolio-cards">
              {row.cards.map((card) => {
                const title = (
                  <h3 className="portfolio-card-title">
                    {card.title}
                    {card.href ? <span> · Expanded ↓</span> : null}
                  </h3>
                );

                return (
                  <article key={card.id} className="portfolio-card">
                    {card.href ? (
                      <Link href={card.href} className="portfolio-card-link" aria-label={`Open ${card.title}`}>
                        <CardMedia image={card.image} imagePosition={card.imagePosition} role={card.role} label={card.label} />
                        {title}
                      </Link>
                    ) : (
                      <>
                        <CardMedia image={card.image} imagePosition={card.imagePosition} role={card.role} label={card.label} />
                        {title}
                      </>
                    )}
                    <p className="portfolio-card-description">{card.description}</p>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </LetterShell>
  );
}

function CardMedia({
  image,
  imagePosition,
  role,
  label
}: {
  image?: string;
  imagePosition?: string;
  role: string;
  label: string;
}) {
  return (
    <div className="portfolio-card-media">
      {image ? <img src={image} alt="" style={{ objectPosition: imagePosition }} /> : <span className="portfolio-card-mark">{label}</span>}
      <div className="portfolio-card-overlay">
        <p>{role}</p>
        <strong>{label}</strong>
      </div>
    </div>
  );
}
