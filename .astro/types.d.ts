declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"articles": {
"accessibility-skip-to-content.md": {
  id: "accessibility-skip-to-content.md",
  slug: "accessibility-skip-to-content",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"astro-plus-forestry-revisited.md": {
  id: "astro-plus-forestry-revisited.md",
  slug: "astro-plus-forestry-revisited",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"astro-plus-forestry.md": {
  id: "astro-plus-forestry.md",
  slug: "astro-plus-forestry",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"astro-plus-netlify-cms.md": {
  id: "astro-plus-netlify-cms.md",
  slug: "astro-plus-netlify-cms",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"astro-plus-snipcart.md": {
  id: "astro-plus-snipcart.md",
  slug: "astro-plus-snipcart",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"astro-plus-swup.md": {
  id: "astro-plus-swup.md",
  slug: "astro-plus-swup",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"astro-showcase.md": {
  id: "astro-showcase.md",
  slug: "astro-showcase",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"astro-themes-and-integrations.md": {
  id: "astro-themes-and-integrations.md",
  slug: "astro-themes-and-integrations",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"converting-navillus-to-astro.md": {
  id: "converting-navillus-to-astro.md",
  slug: "converting-navillus-to-astro",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"introducing-astro-fathom.md": {
  id: "introducing-astro-fathom.md",
  slug: "introducing-astro-fathom",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"introducing-astro-webfinger.md": {
  id: "introducing-astro-webfinger.md",
  slug: "introducing-astro-webfinger",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"introducing-chisel.md": {
  id: "introducing-chisel.md",
  slug: "introducing-chisel",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"introducing-svelte-entity-store.md": {
  id: "introducing-svelte-entity-store.md",
  slug: "introducing-svelte-entity-store",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"jamstack-2_0.md": {
  id: "jamstack-2_0.md",
  slug: "jamstack-2_0",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"json-ld-in-sveltekit.md": {
  id: "json-ld-in-sveltekit.md",
  slug: "json-ld-in-sveltekit",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"keeping-it-simple-with-astro.md": {
  id: "keeping-it-simple-with-astro.md",
  slug: "keeping-it-simple-with-astro",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"power-of-simplicity.md": {
  id: "power-of-simplicity.md",
  slug: "power-of-simplicity",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"power-of-svelte-actions.md": {
  id: "power-of-svelte-actions.md",
  slug: "power-of-svelte-actions",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"progressive-enhancement.md": {
  id: "progressive-enhancement.md",
  slug: "progressive-enhancement",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"svelte-class-props.md": {
  id: "svelte-class-props.md",
  slug: "svelte-class-props",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"the-web-needs-more-indie.md": {
  id: "the-web-needs-more-indie.md",
  slug: "the-web-needs-more-indie",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"web-components-in-astro.md": {
  id: "web-components-in-astro.md",
  slug: "web-components-in-astro",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
},
"bookmarks": {
"1672522643.md": {
  id: "1672522643.md",
  slug: "1672522643",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
},
"1673618890.md": {
  id: "1673618890.md",
  slug: "1673618890",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
},
"1673700622.md": {
  id: "1673700622.md",
  slug: "1673700622",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
},
"1674305948.md": {
  id: "1674305948.md",
  slug: "1674305948",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
},
"2358572395.md": {
  id: "2358572395.md",
  slug: "2358572395",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
},
"3934174328.md": {
  id: "3934174328.md",
  slug: "3934174328",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
},
"8924753241.md": {
  id: "8924753241.md",
  slug: "8924753241",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
},
},
"notes": {
"federation-not-decentralization.md": {
  id: "federation-not-decentralization.md",
  slug: "federation-not-decentralization",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
},
"indieweb-schemas.md": {
  id: "indieweb-schemas.md",
  slug: "indieweb-schemas",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
},
"self-host-webfinger.md": {
  id: "self-host-webfinger.md",
  slug: "self-host-webfinger",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
},
"surface-duo-camera.md": {
  id: "surface-duo-camera.md",
  slug: "surface-duo-camera",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
},
"tailwind-logical-properties.md": {
  id: "tailwind-logical-properties.md",
  slug: "tailwind-logical-properties",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
},
"would-you-like-a-straw.md": {
  id: "would-you-like-a-straw.md",
  slug: "would-you-like-a-straw",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
},
},
"personas": {
"astro.md": {
  id: "astro.md",
  slug: "astro",
  body: string,
  collection: "personas",
  data: InferEntrySchema<"personas">
},
"navillus.md": {
  id: "navillus.md",
  slug: "navillus",
  body: string,
  collection: "personas",
  data: InferEntrySchema<"personas">
},
"tony.md": {
  id: "tony.md",
  slug: "tony",
  body: string,
  collection: "personas",
  data: InferEntrySchema<"personas">
},
},
"photos": {
"duo-sample-pandi.md": {
  id: "duo-sample-pandi.md",
  slug: "duo-sample-pandi",
  body: string,
  collection: "photos",
  data: InferEntrySchema<"photos">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
