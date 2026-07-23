import type { Metadata } from "next";
import { Fraunces, Sora, Source_Serif_4 } from "next/font/google";
import { SiteHeader } from "./components/SiteHeader";
import { person } from "./data/content";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces"
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "500", "600"]
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600"]
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
      <body className={`${fraunces.variable} ${sourceSerif.variable} ${sora.variable}`}>
        <div className="site-frame">
          <SiteHeader />
          {children}
          <footer className="site-footer">
            <hr className="rule mb-4" />
            <p>
              {person.formalName} · {person.location} · Physics & Philosophy · Columbia
              College
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
