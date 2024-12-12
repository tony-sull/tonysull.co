import { defineCollection, reference, z } from 'astro:content'
import { createSchemas } from "@indiepub/core"

const { articleSchema, bookmarkSchema, noteSchema, personSchema, photoSchema } = createSchemas()

export const collections = {
  notes: defineCollection({
    schema: noteSchema.extend({
      author: reference("personas")
        .describe("who wrote the entry, optionally embedded as a Card")
        .optional()
        .default("tony"),
      photo:
        reference("photos")
          .or(z.array(reference("photos")))
          .describe("one or more photos that is/are considered the primary content of the entry")
          .optional()
          .default([])
          .transform((val) => Array.isArray(val) ? val : [val])
    }),
  }),
  articles: defineCollection({
    schema: ({ image }) => articleSchema.extend({
      author: reference("personas")
        .describe("who wrote the entry, optionally embedded as a Card")
        .optional()
        .default("tony"),
      featured: image()
        .describe("primary photo for an article suitable for use in a link preview")
        .optional(),
    }),
  }),
  bookmarks: defineCollection({
    schema: bookmarkSchema.extend({
      author: reference("personas")
        .describe("who wrote the entry, optionally embedded as a Card")
        .optional()
        .default("tony"),
    }),
  }),
  personas: defineCollection({
    // nicknames are ALWAYS required in the site's UI
    schema: ({ image }) => personSchema
      .required({ nickname: true })
      .extend({
        logo: image()
          .describe("a logo representing the person or organization, e.g. avatar icon")
      }),
  }),
  photos: defineCollection({
    schema: ({ image }) => photoSchema.extend({
      photo: image()
        .describe("src URL for the original image file")
    })
  })
}
