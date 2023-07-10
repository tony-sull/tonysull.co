import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import type { Entry } from '~/types'

export const get: APIRoute = async () => {
  const articles = await getCollection('articles')
  const bookmarks = await getCollection('bookmarks')
  const notes = await getCollection('notes')

  const entries = [...articles, ...bookmarks, ...notes]

  const uniq = entries.reduce((acc, next) => {
    next.data.category.forEach(tag => acc.add(tag))

    return acc
  }, new Set<string>())

  return {
    body: JSON.stringify(Array.from(uniq)),
  }
}
