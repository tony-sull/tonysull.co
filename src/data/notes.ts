import type { MarkdownInstance } from 'astro'

type NoteData = {
  type: 'h-entry'
  slug?: string
  description: string
  url?: string
  date: string
  photo?: string
  tags?: string[]
  'in-reply-to'?: string
  client_id?: string
}

export type Note = {
  type: 'h-entry'
  slug: string
  description: string
  url?: URL
  date: Date
  photo?: string
  tags: string[]
  'in-reply-to'?: URL
  client_id?: string
  content: {
    value: string
    html: string
  }
}

function fileToSlug(filename: string) {
  return filename
    .split('/')
    .pop()!
    .replace(/\.[^.]*$/, '')
}

function safeUrl(value?: string): URL | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  try {
    return new URL(value)
  } catch {
    console.warn(`[safeDate] invalid URL "${value}"`)
    return undefined
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const content = await Promise.all(
    Object.values(
      await import.meta.glob<false, string, MarkdownInstance<NoteData>>(
        '/content/notes/*.md'
      )
    ).map(c => c())
  )

  return content.map(({ frontmatter, rawContent, compiledContent, file }) => {
    return {
      ...frontmatter,
      slug: frontmatter.slug || fileToSlug(file),
      url: safeUrl(frontmatter.url),
      date: new Date(frontmatter.date),
      tags: frontmatter.tags || [],
      'in-reply-to': safeUrl(frontmatter['in-reply-to']),
      content: {
        value: rawContent(),
        html: compiledContent(),
      },
    }
  })
}

export async function fetchNote(slug: string): Promise<Note | undefined> {
  const results = await import.meta.glob<false, string, MarkdownInstance<NoteData>>(
    '/content/notes/*.md'
  )
  
  const content = results[`/content/notes/${slug}.md`]

  if (!content) {
    return undefined
  }

  const { frontmatter, rawContent, compiledContent, file } = await content()

  return {
    ...frontmatter,
    slug: frontmatter.slug || fileToSlug(file),
    url: safeUrl(frontmatter.url),
    date: new Date(frontmatter.date),
    tags: frontmatter.tags || [],
    'in-reply-to': safeUrl(frontmatter['in-reply-to']),
    content: {
      value: rawContent(),
      html: compiledContent(),
    },
  }
}
