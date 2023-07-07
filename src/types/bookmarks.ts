import { z } from 'astro/zod'
import type { ImageFunction } from 'astro:content'
import { baseEntrySchema } from './base'
import { scrape } from '../utils/scrape'

export function bookmarkSchema({ image }: { image: ImageFunction }) {
  return baseEntrySchema({ image }).extend({
    type: z.literal('bookmark').default('bookmark'),
    /* Proposed properties */
    'bookmark-of': z
      .string()
      .url()
      .describe('original URL the entry is considered a bookmark of')
      .transform(async val => ({
        url: val,
        ...(await scrape(val)),
      })),
  })
}

export type Bookmark = z.infer<ReturnType<typeof bookmarkSchema>>
