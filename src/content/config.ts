import { defineCollection } from 'astro:content'
import { createSchemas } from "@indiepub/core"

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL

const { articleSchema, bookmarkSchema, noteSchema, personSchema, photoSchema } = createSchemas({ site: NETLIFY_PREVIEW_SITE || 'https://tonysull.co' })

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
    schema: personSchema.required({ nickname: true }),
  }),
  photos: defineCollection({
    schema: photoSchema
  })
}
