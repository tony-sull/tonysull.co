import type { APIRoute } from 'astro'
import { getFeed } from './_feed.js'

export const GET: APIRoute = async context => {
  const feed = await getFeed(context)

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml',
    },
  })
}
