import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { Feed, Item } from 'feed'
import siteData from '~/data/site'
import { mdToHtml } from '~/utils/markdown'
import { sortByDate } from '~/utils/sortByDate'

export async function getFeed({ site, generator }: APIContext) {
  const articles = await getCollection('articles')
  const notes = await getCollection('notes')

  const entries = [...articles, ...notes]
    .filter(entry => entry.data.published)
    .sort(sortByDate)

  const feed = new Feed({
    title: siteData.title,
    description: siteData.description,
    id: site!.toString(),
    link: site!.toString(),
    language: 'en',
    image: new URL(siteData.social.image, site).toString(),
    favicon: new URL('/favicon.svg', site).toString(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Tony Sullivan`,
    generator,
    author: {
      name: siteData.author,
    },
  })

  entries.forEach(entry => {
    const url = new URL(`/${entry.collection}/${entry.slug}/`, site)

    let item: Item = {
      title: entry.collection === 'articles' ? entry.data.name : entry.body,
      id: url.toString(),
      link: url.toString(),
      content: mdToHtml(entry.body),
      date: entry.data.published!,
    }

    if ('summary' in entry.data && entry.data.summary) {
      item.description = entry.data.summary
    }

    if ('featured' in entry.data && entry.data.featured) {
      item.image = new URL(entry.data.featured.src, site).toString()
    }

    feed.addItem(item)
  })

  return feed
}
