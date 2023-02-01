import { z } from 'astro:content'

const URL_REGEX =
  /(http(s)?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/

function isUrl(value: string) {
  return URL_REGEX.test(value)
}

function safeDate() {
  return z.date().or(z.string().transform(value => new Date(value)))
}

function safeUrl(root: string | URL = import.meta.env.SITE) {
  return z.string().transform((value: string) => {
    try {
      return isUrl(value) ? value : new URL(value, root).toString()
    } catch {
      return value
    }
  })
}

const baseSchema = z.object({
  published: safeDate().describe('when the entry was published').optional(),
  updated: safeDate().describe('when the entry was updated').optional(),
  author: z
    .string()
    .describe('who wrote the entry, optionally embedded as a Card')
    .optional(),
  category: z
    .array(z.string().min(1))
    .describe('entry categories/tags')
    .default([]),
})

export const noteSchema = baseSchema.extend({
  inReplyTo: z
    .string()
    .url()
    .describe('the URL which the entry is considered a reply to')
    .optional(),
  rsvp: z.enum(['yes', 'maybe', 'no', 'interested']).optional(),
  likeOf: z
    .string()
    .url()
    .describe('the URL which the entry is considered a "like" of')
    .optional(),
  repostOf: z
    .string()
    .url()
    .describe('the URL which the entry is considered a "repost" of')
    .optional(),
  /* Draft properties */
  photo: safeUrl()
    .or(z.array(safeUrl()))
    .describe(
      'one or more photos that is/are considered the primary content of the entry'
    )
    .optional(),
  video: safeUrl()
    .or(z.array(safeUrl()))
    .describe(
      'one or more videos that is/are considered the primary content of the entry'
    )
    .optional(),
  /* Proposed properties */
  bookmarkOf: z
    .string()
    .url()
    .describe('original URL the entry is considered a bookmark of')
    .optional(),
})
export type Note = z.infer<typeof noteSchema>

export const articleSchema = baseSchema.extend({
  name: z.string().min(1).describe('entry name/title'),
  summary: z.string().min(1).describe('short entry summary').optional(),

  /* Proposed properties */
  bookmarkOf: z
    .string()
    .url()
    .describe('original URL the entry is considered a bookmark of')
    .optional(),
  featured: safeUrl()
    .describe(
      'a representative photo or image for the entry, e.g. primary photo for an article suitable for use in a link preview'
    )
    .optional(),
})
export type Article = z.infer<typeof articleSchema>

export const cardSchema = z.object({
  name: z
    .string()
    .describe('The full/formatted anme of the person or organization'),
  nickname: z.string().describe('nickname, alias, or handle').optional(),
  email: z.string().email().describe('email address').optional(),
  logo: safeUrl()
    .describe(
      'a logo representing the person or organization, e.g. avatar icon'
    )
    .optional(),
  url: safeUrl()
    .describe('home page or other URL representing the person or organization')
    .optional(),
})
export type Card = z.infer<typeof cardSchema>
