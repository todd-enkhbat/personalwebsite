import type { PublicationPiece } from "../data/content";

export type PublicationMediaEmbed =
  | { kind: "youtube"; src: string }
  | { kind: "site"; src: string }
  | { kind: "instagram"; src: string }
  | { kind: "facebook"; src: string };

function youtubeIdFromHref(href: string): string | undefined {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      return id || undefined;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v") ?? undefined;
      }
      const shorts = url.pathname.match(/^\/shorts\/([^/]+)/);
      if (shorts) return shorts[1];
      const embed = url.pathname.match(/^\/embed\/([^/]+)/);
      if (embed) return embed[1];
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function instagramReelEmbed(href: string): string | undefined {
  try {
    const url = new URL(href);
    if (!url.hostname.includes("instagram.com")) return undefined;
    const match = url.pathname.match(/\/(reel|p|tv)\/([^/]+)/);
    if (!match) return undefined;
    return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
  } catch {
    return undefined;
  }
}

function facebookVideoEmbed(href: string): string | undefined {
  try {
    const url = new URL(href);
    if (!url.hostname.includes("facebook.com")) return undefined;
    if (!url.pathname.includes("/videos/")) return undefined;
    const embed = new URL("https://www.facebook.com/plugins/video.php");
    embed.searchParams.set("href", href);
    embed.searchParams.set("show_text", "false");
    embed.searchParams.set("width", "560");
    return embed.toString();
  } catch {
    return undefined;
  }
}

function siteEmbedFromHref(href: string): string | undefined {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    if (
      host === "deeptech-decoded.com" ||
      host === "mars-v.com" ||
      host === "unread.today" ||
      host === "edition.cnn.com"
    ) {
      return href;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

/** Resolve the in-panel embed for a publication (explicit fields, then href). */
export function resolvePublicationEmbed(piece: PublicationPiece): PublicationMediaEmbed | null {
  if (piece.websiteEmbed) {
    return { kind: "site", src: piece.websiteEmbed };
  }

  if (piece.videoEmbed) {
    return { kind: "youtube", src: piece.videoEmbed };
  }

  if (piece.href) {
    const youtubeId = youtubeIdFromHref(piece.href);
    if (youtubeId) {
      return { kind: "youtube", src: `https://www.youtube.com/embed/${youtubeId}` };
    }

    const instagram = instagramReelEmbed(piece.href);
    if (instagram) {
      return { kind: "instagram", src: instagram };
    }

    const facebook = facebookVideoEmbed(piece.href);
    if (facebook) {
      return { kind: "facebook", src: facebook };
    }

    const site = siteEmbedFromHref(piece.href);
    if (site) {
      return { kind: "site", src: site };
    }
  }

  return null;
}
