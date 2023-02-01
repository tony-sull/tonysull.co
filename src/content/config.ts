import { defineCollection } from 'astro:content'
import { articleSchema, cardSchema, noteSchema } from '../types.js'

export const collections = {
  notes: defineCollection({
    schema: noteSchema.omit({ bookmarkOf: true }),
  }),
  articles: defineCollection({
    schema: articleSchema,
  }),
  bookmarks: defineCollection({
    schema: noteSchema.required({ bookmarkOf: true }),
  }),
  personas: defineCollection({
    schema: cardSchema.required({ nickname: true }),
  }),
}
