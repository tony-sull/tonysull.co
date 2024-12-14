import { z } from 'astro/zod'
import { reference, type ImageFunction } from 'astro:content'
import { baseEntrySchema } from './base'
import { scrape } from '../utils/scrape'

export function noteSchema({ image }: { image: ImageFunction }) {
  return baseEntrySchema({ image }).extend({
    type: z.literal('note').default('note'),
    'in-reply-to': z
      .string()
      .url()
      .describe('the URL which the entry is considered a reply to')
      .optional()
      .transform(async val => {
        if (!val) {
          return undefined
        }

        return {
          url: val,
          ...(await scrape(val)),
        }
      }),
    rsvp: z.enum(['yes', 'maybe', 'no', 'interested']).optional(),
    'like-of': z
      .string()
      .url()
      .describe('the URL which the entry is considered a "like" of')
      .optional()
      .transform(async val => {
        if (!val) {
          return undefined
        }

        return {
          url: val,
          ...(await scrape(val)),
        }
      }),
    'repost-of': z
      .string()
      .url()
      .describe('the URL which the entry is considered a "repost" of')
      .optional()
      .transform(async val => {
        if (!val) {
          return undefined
        }

        return {
          url: val,
          ...(await scrape(val)),
        }
      }),
    /* Draft properties */
    photo: reference('photos')
      .or(z.array(reference('photos')))
      .describe(
        'one or more photos that is/are considered the primary content of the entry',
      )
      .optional(),
    video: z
      .string()
      .or(z.array(z.string()))
      .describe(
        'one or more videos that is/are considered the primary content of the entry',
      )
      .optional(),
  })
}

export type Note = z.infer<ReturnType<typeof noteSchema>>
