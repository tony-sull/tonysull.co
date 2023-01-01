import type { MarkdownInstance } from 'astro'

type ArticleData = {
  type: 'h-entry'
  slug: string
  title: string
  description: string
  url?: string
  published?: string
  date?: string
  photo?: string
  tags?: string[]
  client_id?: string
}

export type ArticleSummary = {
  type: 'h-entry'
  slug: string
  title: string
  description: string
  url?: URL
  published: Date
  date?: Date
  photo?: string
  tags: string[]
  client_id?: string
}

export type Article = ArticleSummary & {
  content: {
    value: string
    html: string
  }
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

function safeDate(value?: string): Date | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  try {
    return new Date(value)
  } catch {
    console.warn(`[safeDate] invalid Date format "${value}"`)
    return undefined
  }
}

function isPublished(data: ArticleData) {
  return !!data.published
}

export async function fetchArticles(): Promise<ArticleSummary[]> {
  const content = await Promise.all(
    Object.values(
      await import.meta.glob<false, string, MarkdownInstance<ArticleData>>(
        '/content/articles/*.md'
      )
    ).map(c => c())
  )

  return content
    .filter(({ frontmatter }) => isPublished(frontmatter))
    .map(({ frontmatter }) => {
      return {
        ...frontmatter,
        url: safeUrl(frontmatter.url),
        published: new Date(frontmatter.published!),
        date: safeDate(frontmatter.date),
        tags: frontmatter.tags || []
      }
    })
}

export async function fetchArticle(slug: string): Promise<Article | undefined> {
  const content = await Promise.all(
    Object.values(
      await import.meta.glob<false, string, MarkdownInstance<ArticleData>>(
        '/content/articles/*.md'
      )
    ).map(c => c())
  )

  const articleContent = content.find(
    ({ frontmatter }) => frontmatter.slug === slug
  )

  if (!articleContent) {
    return undefined
  }

  const { frontmatter, rawContent, compiledContent } = articleContent

  return {
    ...frontmatter,
    url: safeUrl(frontmatter.url),
    published: new Date(frontmatter.published!),
    date: safeDate(frontmatter.date),
    tags: frontmatter.tags || [],
    content: {
      value: rawContent(),
      html: compiledContent(),
    },
  }
}
