import Link from "next/link";
import { LetterShell } from "../../components/LetterShell";
import { work } from "../../data/content";

const piano = work.find((item) => item.id === "piano")!;

export default function PianoPage() {
  return (
    <LetterShell showHeader={false}>
      <article className="case-editorial">
        <header className="case-header">
          <div className="case-header-top">
            <p className="case-kicker">Concert Piano · 2016–2018</p>
            <Link href="/work" className="open-arrow">
              ← Portfolio
            </Link>
          </div>
          <h1>Eleven years at the keys, stages across continents</h1>
        </header>

        <p className="case-byline">
          {piano.role} · Saya Piano School | C.E.M. Tchaikovsky Huesca · Benasque, Aragon
        </p>

        <p className="case-deck">
          A competitive concert path under pianist Saya Sangidorj: invitations from Carnegie Hall and the
          Mongolian Musical Conservatory, stages from Windsor Castle to the Mongolian Philharmonic, and medals
          across Europe and Asia.
        </p>
        <p className="case-dateline">
          Grand Prix · Gold · Silver · Paris · Madrid · Rome · London · Windsor · Moscow · Seoul
        </p>

        <figure className="case-hero">
          <img
            src="/paper-assets/piano-hero.png"
            alt="Portrait looking out from inside a grand piano on a dark stage"
          />
          <figcaption>
            <span>Beyond the Music Festival</span>
            <span>Concert piano</span>
          </figcaption>
        </figure>

        <div className="case-body">
          <section>
            <h2>The path</h2>
            <p>
              From age through adolescence I trained and competed internationally under Saya Sangidorj at Saya Piano
              School and C.E.M. Tchaikovsky in Huesca. The work was part-time on paper and full-intensity in practice:
              repertoire, juries, and the discipline of walking onto a stage alone.
            </p>
          </section>

          <section>
            <h2>Stages</h2>
            <p>
              Professional invitations arrived from Carnegie Hall and the Mongolian Musical Conservatory. I performed
              at the Queen&apos;s palace, Windsor Castle, and the Mongolian Philharmonic, and competed for Grand Prix,
              gold, and silver medals in France, Spain, Italy, England, South Korea, and Russia. The cities still read
              like a tour list: Paris, Lyon, Montrond-les-Bains, Madrid, Barcelona, Benasque, Huesca, Rome, Ragusa,
              London, Windsor, Moscow.
            </p>
          </section>

          <section>
            <h2>What remains</h2>
            <p>
              The piano years taught attention under pressure and a feel for structure that still shapes how I work:
              listen carefully, then commit. The journey sits beside the science and building work as an earlier craft
              of presence.
            </p>
          </section>
        </div>
      </article>
    </LetterShell>
  );
}
