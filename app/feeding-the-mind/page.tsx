import { ReadingRoom } from "../components/ReadingRoom";
import { LetterShell } from "../components/LetterShell";
import { mindShelves, person, type ShelfBook } from "../data/content";

const featured: ShelfBook[] = [
  { id: "dispossessed", title: "The Dispossessed", author: "Ursula K. Le Guin", cover: "/paper-assets/books/dispossessed-featured.jpg" },
  { id: "nomos-of-the-earth", title: "The Nomos of the Earth", author: "Carl Schmitt", cover: "/paper-assets/books/nomos-of-the-earth.jpg" },
  { id: "human-condition", title: "The Human Condition", author: "Hannah Arendt", cover: "/paper-assets/books/human-condition-featured.jpg" },
  { id: "time-and-chance", title: "Time and Chance", author: "David Z. Albert", cover: "/paper-assets/books/time-and-chance-featured.jpg" }
];

const archive: ShelfBook[] = Array.from(
  { length: Math.max(...mindShelves.map((shelf) => shelf.books.length)) },
  (_, index) => mindShelves.flatMap((shelf) => shelf.books[index] ? [shelf.books[index]] : [])
).flat().filter((book) => !featured.some((current) => current.id === book.id));

const shelfLinks = [
  { label: "Goodreads", href: person.social.goodreads, external: true },
  { label: "Letterboxd", href: person.social.letterboxd, external: true }
];

export default function FeedingTheMindPage() {
  return (
    <LetterShell headerMeta={`${person.emails.academic} | ${person.location}, NY`}>
      <ReadingRoom featured={featured} archive={archive} email={person.emails.academic} links={shelfLinks} />
    </LetterShell>
  );
}
