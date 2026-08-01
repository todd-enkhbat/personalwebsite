import Image from "next/image";
import Link from "next/link";
import { LetterShell } from "./components/LetterShell";
import { linkedReferences, person, trainings } from "./data/content";

export default function MainPage() {
  return (
    <LetterShell>
      <div className="main-split">
        <div className="main-copy">
          <p className="kicker">Main</p>
          <h1 className="headline-inline">
            <span>{person.opener}&nbsp;</span>
            <Link href="/nomos" className="accent-link">
              {person.openerEmphasis}
            </Link>
            <span>&nbsp;{person.openerTail}</span>
          </h1>
          <p className="body-copy" style={{ width: "100%", maxWidth: 720 }}>
            {person.letter}
          </p>
          <div className="linked-block">
            <p className="ui-label">Linked</p>
            <p className="linked-line">
              {linkedReferences.map((item, index) => (
                <span key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                  {" → "}
                  {item.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  {index < linkedReferences.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
          <p className="education-line">{person.education}</p>
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
            </article>
          ))}
        </div>
      </section>
    </LetterShell>
  );
}
