import { defineCollection } from 'astro:content'
import { createSchemas } from "@indiepub/core"

const { articleSchema, bookmarkSchema, noteSchema, personSchema, photoSchema } = createSchemas()

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
    // nicknames are ALWAYS required in the site's UI
    schema: personSchema.required({ nickname: true, logo: true }),
  }),
  photos: defineCollection({
    schema: photoSchema
  })
}
