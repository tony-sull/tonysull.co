import { createSchemas } from "@indiepub/core"
import { defineCollection, getEntryBySlug, image, z } from "astro:content"

const schemas = createSchemas()

function relation<C extends Parameters<typeof getEntryBySlug>[0]>(
	collection: C,
	schema: z.ZodType<any, any, any>,
) {
	return z
		.string()
		.refine(
			async (value: string) => {
				return !!(await getEntryBySlug(collection, value))
			},
			{
				message: `"${collection}" slug not found. Does the file exist in /src/content/${collection}?`,
			},
		)
		.transform(async (value: string) => {
			const { data } = (await getEntryBySlug(collection, value)) as { data: z.infer<typeof schema> }
			return data
		})
}

const photoSchema = schemas.photoSchema.extend({
	photo: image(),
})

// nicknames are ALWAYS required in the site's UI
const personaSchema = schemas.personSchema
	.extend({
		logo: relation("photos", photoSchema),
	})
	.required({ nickname: true, logo: true })

const articleSchema = schemas.articleSchema.extend({
	author: relation("personas", personaSchema).default("tony"),
	featured: image(),
})

const bookmarkSchema = schemas.bookmarkSchema.extend({
	author: relation("personas", personaSchema).default("tony"),
})

const noteSchema = schemas.noteSchema.extend({
	author: relation("personas", personaSchema).default("tony"),
	photo: relation("photos", photoSchema).optional(),
})

export const collections = {
	articles: defineCollection({
		schema: articleSchema,
	}),
	bookmarks: defineCollection({
		schema: bookmarkSchema,
	}),
	notes: defineCollection({
		schema: noteSchema,
	}),
	personas: defineCollection({
		schema: personaSchema,
	}),
	photos: defineCollection({
		schema: photoSchema,
	}),
}
