import type { APIRoute } from "astro"
import { Feed } from "feed"
import { type Entry, getAllEntries, isArticle, isBookmark, isNote } from "@data/entries.js"
import siteData from '@data/site.json'

function getTitle(entry: Entry) {
    if (isArticle(entry)) {
        return entry.title
    } else if (isBookmark(entry)) {
        return entry.metadata.title
    } else if (isNote(entry)) {
        return entry.content.value
    }

    return undefined
}

function getSummary(entry: Entry) {
    if (isArticle(entry)) {
        return entry.summary
    }

    return undefined
}

function getImage(entry: Entry): string | undefined {
    if ('image' in entry && !!entry.image) {
        return entry.image as string
    }

    return undefined
}

function getUrl(entry: Entry): string | undefined {
    if (isArticle(entry)) {
        return `/articles/${entry.slug}/`
    } else if (isBookmark(entry)) {
        return entry['bookmark-of'].toString()
    } else if (isNote(entry)) {
        return `/notes/${entry.slug}/`
    }

    return undefined
}

function getDate(entry: Entry): Date {
    if ('published' in entry) {
        return entry.published!
    } else {
        return entry.date
    }
}

export const get: APIRoute = async ({ site, generator }) => {
    const allEntries = await getAllEntries()

    const feed = new Feed({
        title: siteData.title,
        description: siteData.description,
        id: site!.toString(),
        link: site!.toString(),
        language: 'en',
        image: siteData.social.image,
        favicon: new URL('/favicon.svg', site).toString(),
        copyright: `All rights reserved ${new Date().getFullYear()}, Tony Sullivan`,
        generator,
        author: {
            name: siteData.author
        }
    })

    allEntries.forEach(entry => {
        feed.addItem({
            title: getTitle(entry)!,
            id: getUrl(entry)!,
            link: getUrl(entry)!,
            description: getSummary(entry),
            content: isArticle(entry) || isNote(entry) ? entry.content.html : getSummary(entry),
            date: getDate(entry),
            image: getImage(entry)
        })
    })

    return {
        body: feed.json1(),
        encoding: 'application/feed+json'
    }
}