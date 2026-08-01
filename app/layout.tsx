import type { Metadata } from "next";
import { EB_Garamond, IBM_Plex_Mono } from "next/font/google";
import { AmbientScore } from "./components/AmbientScore";
import { person } from "./data/content";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"]
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: `${person.name} — ${person.tagline}`,
  description: person.letter,
  openGraph: {
    title: person.name,
    description: `${person.location} — ${person.tagline}`,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} ${plexMono.variable} ${garamond.className}`}>
        {children}
        <AmbientScore />
      </body>
    </html>
  );
}
