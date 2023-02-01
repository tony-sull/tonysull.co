import type { APIRoute } from 'astro'
import { getFeed } from './_feed.js'

export const get: APIRoute = async context => {
  const feed = await getFeed(context)

  return {
    body: feed.atom1(),
  }
}
