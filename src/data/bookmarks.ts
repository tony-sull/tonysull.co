import type { MarkdownInstance } from 'astro'
import { Metadata, scrape } from '@utils/scrape.js'

type BookmarkData = {
  type: 'h-entry'
  'bookmark-of': string
  date: string
  client_id?: string
}

export type Bookmark = {
  type: 'h-entry'
  slug: string
  'bookmark-of': URL
  date: Date
  client_id?: string
  metadata: Metadata
}

function fileToSlug(filename: string) {
    return filename.split('/').pop()!.replace(/\.[^.]*$/,'')
}

async function withMetadata(bookmark: Omit<Bookmark, 'metadata'>): Promise<Bookmark> {
    return {
        ...bookmark,
        metadata: await scrape(bookmark['bookmark-of'])
    }
}

export async function fetchBookmarks(): Promise<Bookmark[]> {
  const content = await Promise.all(
    Object.values(
      await import.meta.glob<false, string, MarkdownInstance<BookmarkData>>(
        '/content/bookmarks/*.md'
      )
    ).map(c => c())
  )

  const bookmarks = content.map(({ frontmatter, file }) => {
    return {
      ...frontmatter,
      slug: fileToSlug(file),
      'bookmark-of': new URL(frontmatter['bookmark-of']),
      date: new Date(frontmatter.date),
    }
  })

  return await Promise.all(bookmarks.map((b) => withMetadata(b)))
}

export async function fetchBookmark(slug: string): Promise<Bookmark | undefined> {
    const results = await import.meta.glob<false, string, MarkdownInstance<BookmarkData>>(
        `/content/bookmarks/*.md`
    )

    const content = results[slug]

    if (!content) {
        return undefined
    }

    const { frontmatter, file } = await content()

    return await withMetadata({
        ...frontmatter,
        slug: fileToSlug(file),
        'bookmark-of': new URL(frontmatter['bookmark-of']),
        date: new Date(frontmatter.date)
    })
}
