import { z } from 'astro/zod'
import type { ImageFunction } from 'astro:content'
import { baseEntrySchema } from './base'

export function articleSchema({ image }: { image: ImageFunction }) {
  return baseEntrySchema({ image }).extend({
    type: z.literal('article').default('article'),
    name: z.string().describe('entry name/title'),
    summary: z.string().describe('short entry summary'),
    uid: z
      .string()
      .url()
      .describe(
        'canonical URL for the article, used if the article was originally published on another site',
      )
      .optional(),
  })
}

export type Article = z.infer<ReturnType<typeof articleSchema>>
