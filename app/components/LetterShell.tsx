import { SiteHeader } from "./SiteHeader";

type LetterShellProps = {
  children: React.ReactNode;
  variant?: "letter" | "explorer";
  showHeader?: boolean;
  headerMeta?: string;
  headerStamp?: string;
};

export function LetterShell({
  children,
  variant = "letter",
  showHeader = true,
  headerMeta,
  headerStamp
}: LetterShellProps) {
  const pageClass =
    variant === "explorer" ? "letter-page letter-page--explorer" : "letter-page";

  return (
    <div className={pageClass}>
      <div className="paper-texture" aria-hidden />
      {variant === "explorer" ? (
        children
      ) : (
        <div className="letter-sheet">
          {showHeader ? <SiteHeader meta={headerMeta} stamp={headerStamp} /> : null}
          {children}
        </div>
      )}
    </div>
  );
}
