import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "@/app/globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import clsx from "clsx";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono"
});

export const metadata: Metadata = {
  title: "Todd Enkhbat — Portfolio",
  description: "Personal website for Todd Enkhbat"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "relative min-h-screen bg-paper text-ink",
          spaceGrotesk.variable,
          spaceMono.variable
        )}
      >
        <div className="mx-auto flex min-h-screen max-w-wrapper flex-col px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <SiteHeader />
          <main className="flex-1 py-10">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

