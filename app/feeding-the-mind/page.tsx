import { DualShelf } from "../components/DualShelf";
import { LetterShell } from "../components/LetterShell";
import { mindShelves, person } from "../data/content";

const shelfLinks = [
  { label: "Goodreads", href: person.social.goodreads, external: true },
  { label: "Letterboxd", href: person.social.letterboxd, external: true },
  {
    label: "Columbia CC syllabus",
    href: "https://www.college.columbia.edu/core-curriculum/classes/contemporary-civilization",
    external: true
  }
];

export default function FeedingTheMindPage() {
  return (
    <LetterShell headerMeta={`${person.emails.academic} | ${person.location}, NY`}>
      <DualShelf shelves={mindShelves} links={shelfLinks} />
    </LetterShell>
  );
}
