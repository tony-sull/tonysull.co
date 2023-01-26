import { defineCollection, z } from "astro:content";
import { safeDate } from "../utils/dates.js";

const baseCollection = z.object({
  date: z.string().datetime().transform(safeDate),
  updated: z.string().datetime().transform(safeDate).optional(),
  deleted: z.boolean().optional(),
  category: z.array(z.string()).optional(),
  photo: z.string().optional(),
  draft: z.boolean().optional(),
  syndication: z.array(z.string().url()).optional(),
  persona: z.string().optional(),
});

const noteSchema = baseCollection.extend({
  "in-reply-to": z.string().url().optional(),
  url: z.string().url().optional(),
});

const articleSchema = noteSchema.extend({
  name: z.string(),
  summary: z.string().optional(),
});

const bookmarkSchema = baseCollection.extend({
  "bookmark-of": z.string().url(),
  name: z.string().optional(),
});

export const collections = {
  notes: defineCollection({ schema: noteSchema }),
  articles: defineCollection({ schema: articleSchema }),
  bookmarks: defineCollection({ schema: bookmarkSchema }),
  personas: defineCollection({
    schema: z.object({
      name: z.string(),
      handle: z.string(),
      avatar: z.string(),
      url: z.string().url(),
    }),
  }),
};
