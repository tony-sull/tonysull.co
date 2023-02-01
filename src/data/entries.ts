import { type Metadata, scrape } from "@utils/scrape.js"
import type { MarkdownInstance } from "astro"

type BaseEntryFrontmatter = {
    type: 'h-entry'
    slug?: string
    date: string
    tags?: string[]
    client_id?: string
}

type NoteFrontmatter = BaseEntryFrontmatter & {
    photo?: string
    url?: string
    'in-reply-to'?: string
}

type ArticleFrontmatter = NoteFrontmatter & {
    title: string
    summary: string
    published?: string
}

type BookmarkFrontmatter = BaseEntryFrontmatter & {
    'bookmark-of': string
}

type Frontmatter =
    | ArticleFrontmatter
    | BookmarkFrontmatter
    | NoteFrontmatter

function isArticleFrontmatter(instance: MarkdownInstance<BaseEntryFrontmatter>): instance is MarkdownInstance<ArticleFrontmatter> {
    return 'title' in instance.frontmatter && !!instance.rawContent()
}

function isBookmarkFrontmatter(instance: MarkdownInstance<BaseEntryFrontmatter>): instance is MarkdownInstance<BookmarkFrontmatter> {
    return 'bookmark-of' in instance.frontmatter
}

function isNoteFrontmatter(instance: MarkdownInstance<NoteFrontmatter>): instance is MarkdownInstance<NoteFrontmatter> {
    return !!instance.rawContent() && !('title' in instance.frontmatter)
}

export type BaseEntry = {
    type: 'h-entry'
    slug: string
    date: Date
    tags: string[]
    url: URL
    client_id?: string
}

export type Note = BaseEntry & {
    photo?: string
    'in-reply-to'?: URL
    content: {
        value: string
        html: string
    }
}

export type Article = Note & {
    title: string
    summary: string
    published?: Date
}

export type Bookmark = BaseEntry & {
    'bookmark-of': URL
    metadata: Metadata
}

export type Entry =
    | Article
    | Bookmark
    | Note

export function isArticle(entry: Entry): entry is Article {
    return 'content' in entry && 'title' in entry
}

export function isNote(entry: Entry): entry is Note {
    return 'content' in entry && !('title' in entry)
}

export function isBookmark(entry: Entry): entry is Bookmark {
    return 'bookmark-of' in entry
}

function safeDate(value?: string | Date): Date | undefined {
    if (!value) {
        return undefined
    }

    try {
        return new Date(value.toString().replace(/Z$/, ''))
    } catch {
        console.warn(`[safeDate] invalid date value "${value}"`)
        return undefined
    }
}

function safeUrl(value?: string | URL): URL | undefined {
    if (!value) {
        return undefined
    }

    try {
        return new URL(value)
    } catch {
        console.warn(`[safeUrl] invalid URL value "${value}"`)
    }
}

function fileToSlug(filename: string) {
    return filename
    .split('/')
    .pop()!
    .replace(/\.[^.]*$/, '')
}

async function parseBaseEntry({ frontmatter, file }: MarkdownInstance<BaseEntryFrontmatter>): Promise<BaseEntry | undefined> {
    if (!frontmatter.date) {
        console.warn(`[parseBaseEntry] date not found, ignoring entry ${file}`)
        return undefined
    }

    return {
        ...frontmatter,
        slug: frontmatter.slug || fileToSlug(file),
        date: safeDate(frontmatter.date)!,
        tags: frontmatter.tags || [],
        url: new URL(file.replace(/^\/content/, ''), import.meta.env.SITE)
    }
}

async function parseNote(instance: MarkdownInstance<NoteFrontmatter>): Promise<Note | undefined> {
    const entry = await parseBaseEntry(instance)

    if (!entry) {
        return entry
    }

    const { frontmatter, compiledContent, rawContent } = instance

    return {
        ...entry,
        'in-reply-to': safeUrl(frontmatter["in-reply-to"]),
        content: {
            value: rawContent(),
            html: compiledContent()
        }
    }
}

async function parseArticle(instance: MarkdownInstance<ArticleFrontmatter>): Promise<Article | undefined> {
    const note = await parseNote(instance)

    if (!note) {
        return undefined
    }

    const { frontmatter: { url, 'in-reply-to': inReplyTo, ...frontmatter } } = instance

    return {
        ...frontmatter,
        ...note,
        published: safeDate(frontmatter.published)
    }
}

async function parseBookmark(instance: MarkdownInstance<BookmarkFrontmatter>): Promise<Bookmark | undefined> {
    const entry = await parseBaseEntry(instance)

    if (!entry) {
        return undefined
    }

    const { frontmatter } = instance

    if (!('bookmark-of' in frontmatter)) {
        console.warn(`[parseBookmark] "bookmark-of" not found, ignoring entry`)
        return undefined
    }

    const url = safeUrl(frontmatter['bookmark-of'])!

    return {
        ...entry,
        'bookmark-of': url,
        metadata: await scrape(url)
    }
}

async function parseEntry(instance: MarkdownInstance<BaseEntryFrontmatter>): Promise<Entry | undefined> {
    if (isArticleFrontmatter(instance)) {
        return await parseArticle(instance)
    } else if (isBookmarkFrontmatter(instance)) {
        return await parseBookmark(instance)
    } else if (isNoteFrontmatter(instance)) {
        return await parseNote(instance)
    }

    return undefined
}

export async function getAllEntries(): Promise<Entry[]> {
    const content = await import.meta.glob<true, string, MarkdownInstance<BaseEntryFrontmatter>>('/content/*/*.md', { eager: true })

    const entries = await Promise.all(Object.values(content).map((entry) => parseEntry(entry)))

    return (entries.filter(Boolean) as Entry[])
        .sort((a, b) => b.date.getTime() - a.date.getTime())
}
