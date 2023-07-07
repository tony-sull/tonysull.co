import { z } from 'astro/zod'
import { type ImageFunction, reference } from 'astro:content'

export const baseEntrySchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    published: z
      .date({ coerce: true })
      .describe('when the entry was published')
      .optional(),
    updated: z
      .date({ coerce: true })
      .describe('when the entry was updated')
      .optional(),
    author: reference('personas')
      .describe('who wrote the entry, optionally embedded as a Card')
      .default('tony'),
    category: z
      .string()
      .min(1)
      .or(z.array(z.string().min(1)))
      .describe('entry categories/tags')
      .optional()
      .transform(val => (Array.isArray(val) ? val : val ? [val] : [])),
    featured: image()
      .optional()
      .describe(
        'primary photo for an entry suitable for use in a link preview'
      ),
  })

export const baseCardSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    name: z
      .string()
      .describe('The full/formatted name of the person or organization'),
    nickname: z.string().describe('nickname, alias, or handle').optional(),
    email: z.string().email().describe('email address').optional(),
    logo: image()
      .describe(
        'a logo representing the person or organization, e.g. avatar icon'
      )
      .optional(),
    url: z
      .string()
      .url()
      .describe(
        'home page or other URL representing the person or organization'
      )
      .optional(),
  })
