import type { APIRoute } from 'astro'
import { getFeed } from './_feed.js'

export const GET: APIRoute = async context => {
  const feed = await getFeed(context)

  // hacky!  A bug in the Atom feed is keeping empty titles
  return new Response(feed.atom1().replace('<title type="html"><![CDATA[]]></title>', ''))
}
