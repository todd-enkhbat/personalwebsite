import type { Metadata } from "next";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { CursorGlow } from "./components/CursorGlow";
import { NavLinks } from "./components/NavLinks";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Tsogt Enkhbat | Space Systems Portfolio",
  description:
    "Interactive portfolio focused on aerospace systems, product design, and research execution."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <AnimatedBackground />
        <CursorGlow />
        <header className="site-header">
          <div className="site-inner">
            <Link href="/" className="brand">
              <span className="brand-dot" aria-hidden />
              Tsogt Enkhbat
            </Link>
            <NavLinks />
          </div>
        </header>
        <div className="page-frame">{children}</div>
      </body>
    </html>
  );
}
