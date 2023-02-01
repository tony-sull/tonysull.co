import { type Metadata, scrape } from '@utils/scrape.js'
import type { MarkdownInstance } from 'astro'

type LikeData = {
  type: 'h-entry'
  'like-of': string
  title: string
  date: string
  client_id?: string
}

export type Like = {
  type: 'h-entry'
  slug: string
  'like-of': URL
  title: string
  date: Date
  client_id?: string
  metadata: Metadata
}

function fileToSlug(filename: string) {
  return filename
    .split('/')
    .pop()!
    .replace(/\.[^.]*$/, '')
}

async function withMetadata(like: Omit<Like, 'metadata'>): Promise<Like> {
  return {
    ...like,
    metadata: await scrape(like['like-of']),
  }
}

export async function fetchLikes(): Promise<Like[]> {
  const content = await Promise.all(
    Object.values(
      await import.meta.glob<false, string, MarkdownInstance<LikeData>>(
        '/content/likes/*.md'
      )
    ).map(c => c())
  )

  const likes = content.map(({ frontmatter, file }) => {
    return {
      ...frontmatter,
      slug: fileToSlug(file),
      'like-of': new URL(frontmatter['like-of']),
      date: new Date(frontmatter.date),
    }
  })

  return await Promise.all(likes.map(l => withMetadata(l)))
}

export async function fetchLike(slug: string): Promise<Like | undefined> {
  const results = await import.meta.glob<
    false,
    string,
    MarkdownInstance<LikeData>
  >(`/content/likes/*.md`)

  const content = results[`/content/likes/${slug}.md`]

  if (!content) {
    return undefined
  }

  const { frontmatter, file } = await content()

  return withMetadata({
    ...frontmatter,
    slug: fileToSlug(file),
    'like-of': new URL(frontmatter['like-of']),
    date: new Date(frontmatter.date),
  })
}
