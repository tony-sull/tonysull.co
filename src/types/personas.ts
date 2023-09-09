import { z } from 'astro/zod'
import type { ImageFunction } from 'astro:content'
import { baseCardSchema } from './base'

export function personSchema({ image }: { image: ImageFunction }) {
	return baseCardSchema({ image }).extend({
		type: z.literal('person').default('person'),
	})
}

export type Person = z.infer<ReturnType<typeof personSchema>>
