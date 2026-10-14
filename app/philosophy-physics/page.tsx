import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LetterShell } from "../components/LetterShell";
import { EntropyLab } from "./components/EntropyLab";
import "./physics.css";

export const metadata: Metadata = {
  title: "Philosophy / Physics | Entropy & the end of time",
  description: "Three interactive experiments in entropy, chance, and useful work, informed by David Z. Albert’s Time and Chance. A laboratory for thinking about heat death."
};

export default function PhilosophyPhysicsPage() {
  return <LetterShell headerStamp="philosophy / physics">
    <main className="ph-page">
      <header className="ph-intro">
        <div className="ph-intro-copy"><p className="kicker">Philosophy / Physics</p><h1>How does a universe<br />run out of <em>possibility?</em></h1><p>Three experiments in entropy, chance, and the differences that make things happen. Begin with a box. End with a question.</p><a className="ph-intro-link" href="#laboratory">Enter the laboratory <span aria-hidden="true">↘</span></a></div>
        <figure className="ph-book"><Image src="/paper-assets/books/time-and-chance-featured.jpg" alt="Time and Chance by David Z. Albert" width={158} height={222} priority unoptimized /><figcaption>In conversation with<br /><cite>Time and Chance</cite><span>David Z. Albert · 2000</span></figcaption></figure>
      </header>
      <EntropyLab />
      <footer className="ph-bibliography"><div><span>On the reading table</span><p>David Z. Albert. <cite>Time and Chance.</cite> Harvard University Press, 2000.<br />Chapter 2: Thermodynamics, pp. 22-34. Chapter 3: Statistical Mechanics, pp. 35-70.</p><p>Explanations and models are original teaching adaptations. Page references follow the book’s printed pagination.</p></div><Link href="/feeding-the-mind">Back to the reading room ↗</Link></footer>
    </main>
  </LetterShell>;
}
