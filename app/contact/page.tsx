import { LetterShell } from "../components/LetterShell";
import { ContactEmblem } from "../components/ContactEmblem";
import { ContactStarfield } from "../components/ContactStarfield";
import { contactMap } from "../data/content";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <ContactStarfield />
      <LetterShell>
      <div className="contact-map" aria-label="Contact channels">
        <ContactEmblem />

        <svg
          className="contact-map__lines contact-map__lines--left"
          viewBox="0 0 201 400"
          fill="none"
          aria-hidden
        >
          <path d="M201 1H0M201 100H0M201 200H0M201 300H0M201 398H0" stroke="currentColor" />
        </svg>
        <svg
          className="contact-map__lines contact-map__lines--right"
          viewBox="0 0 202 400"
          fill="none"
          aria-hidden
        >
          <path d="M0 1H202M0 100H202M0 200H202M0 300H202M0 398H202" stroke="currentColor" />
        </svg>

        <div className="contact-map__col contact-map__col--left">
          {contactMap.left.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="contact-map__item"
              {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="contact-map__glyph" aria-hidden>
                {item.glyph}
              </span>
              <span className="contact-map__text">
                <strong>{item.label}</strong>
                <em>{item.note}</em>
              </span>
            </a>
          ))}
        </div>

        <div className="contact-map__col contact-map__col--right">
          {contactMap.right.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="contact-map__item contact-map__item--right"
              {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="contact-map__glyph" aria-hidden>
                {item.glyph}
              </span>
              <span className="contact-map__text">
                <strong>{item.label}</strong>
                <em>{item.note}</em>
              </span>
            </a>
          ))}
        </div>
      </div>
      </LetterShell>
    </div>
  );
}
