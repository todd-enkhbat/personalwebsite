import type { Metadata } from "next";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Tsogt Enkhbat | Space Systems Portfolio",
  description: "Interactive portfolio focused on aerospace systems, product design, and research execution."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <header className="site-header">
          <div className="site-inner">
            <Link href="/" className="brand">
              Tsogt Enkhbat
            </Link>
            <nav className="site-nav">
              <Link href="/projects">Recent Projects</Link>
              <Link href="/about">About</Link>
              <Link href="/public">Public</Link>
              <Link href="/writing">Writing</Link>
              <Link href="/philosophy">Philosophy</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
