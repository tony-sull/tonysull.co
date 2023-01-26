import type { CollectionEntry } from "astro:content";

export type Entry =
  | CollectionEntry<"articles">
  | CollectionEntry<"bookmarks">
  | CollectionEntry<"notes">;

export function getTitle(entry: Co) {
  if (isArticle(entry)) {
    return entry.title;
  } else if (isBookmark(entry)) {
    return entry.metadata.title;
  } else if (isNote(entry)) {
    return entry.content.value;
  }

  return undefined;
}

export function getSummary(entry: Entry) {
  if (isArticle(entry)) {
    return entry.summary;
  }

  return undefined;
}

export function getImage(entry: Entry): string | undefined {
  if ("image" in entry && !!entry.image) {
    return entry.image as string;
  }

  return undefined;
}

export function getUrl(entry: Entry): string | undefined {
  if (isArticle(entry)) {
    return `/articles/${entry.slug}/`;
  } else if (isBookmark(entry)) {
    return entry["bookmark-of"].toString();
  } else if (isNote(entry)) {
    return `/notes/${entry.slug}/`;
  }

  return undefined;
}

export function getDate(entry: Entry): Date {
  if ("published" in entry) {
    return entry.published!;
  } else {
    return entry.date;
  }
}

export function getAuthor(entry: Entry): Persona {
  const author = (entry as any).author || "tony";

  return personas[author];
}

export function isExternalLink(url: string) {
  return !/^\//.test(url);
}
