import { z } from 'astro/zod'
import type { ImageFunction } from 'astro:content'
import { baseEntrySchema } from './base'

export function photoSchema({ image }: { image: ImageFunction }) {
  return baseEntrySchema({ image }).extend({
    type: z.literal('photo').default('photo'),
    name: z
      .string()
      .describe('caption of the photo, often used for figure captions'),
    summary: z
      .string()
      .describe('description of the photo, often used for alt text')
      .optional(),
    photo: image()
      .describe('src URL for the original image file'),
  })
}

export type Photo = z.infer<ReturnType<typeof photoSchema>>
