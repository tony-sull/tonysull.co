import type { APIRoute } from "astro"
import { Feed } from "feed"
import { getAllEntries, isArticle, isNote } from "@data/entries.js"
import siteData from '@data/site.json'
import { getDate, getImage, getSummary, getTitle, getUrl } from "@utils/entries.js"

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
        body: feed.json1()
    }
}