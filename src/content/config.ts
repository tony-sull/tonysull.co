import { defineCollection } from 'astro:content'
import {
  articleSchema,
  bookmarkSchema,
  noteSchema,
  personSchema,
  photoSchema,
} from '~/types'

export const collections = {
  notes: defineCollection({
    schema: noteSchema,
  }),
  articles: defineCollection({
    schema: articleSchema,
  }),
  bookmarks: defineCollection({
    schema: bookmarkSchema,
  }),
  personas: defineCollection({
    schema: ({ image }) => personSchema({ image }),
  }),
  photos: defineCollection({
    schema: photoSchema,
  }),
}
