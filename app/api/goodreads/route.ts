import { NextResponse } from "next/server";

type Book = {
  title: string;
  author: string;
  cover: string;
  href: string;
};

const PROFILE_URL = "https://www.goodreads.com/user/show/189398350-tsogt-enkhbat";

export async function GET() {
  try {
    const response = await fetch(PROFILE_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      next: { revalidate: 21600 }
    });

    if (!response.ok) {
      return NextResponse.json({ books: [] });
    }

    const html = await response.text();
    const books: Book[] = [];
    const regex =
      /<a class="bookTitle"[^>]*href="([^"]+)"[^>]*>\s*<span[^>]*>([^<]+)<\/span>[\s\S]*?<a class="authorName"[^>]*>\s*<span[^>]*>([^<]+)<\/span>[\s\S]*?<img[^>]*src="([^"]+)"/g;

    let match = regex.exec(html);
    while (match && books.length < 12) {
      books.push({
        href: `https://www.goodreads.com${match[1]}`,
        title: match[2].trim(),
        author: match[3].trim(),
        cover: match[4].trim()
      });
      match = regex.exec(html);
    }

    return NextResponse.json({ books });
  } catch {
    return NextResponse.json({ books: [] });
  }
}
