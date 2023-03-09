declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodString;
	}>;

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

	const entryMap: {
		"articles": {
"accessibility-skip-to-content.md": {
  id: "accessibility-skip-to-content.md",
  slug: "accessibility-skip-to-content",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"astro-plus-forestry-revisited.md": {
  id: "astro-plus-forestry-revisited.md",
  slug: "astro-plus-forestry-revisited",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"astro-plus-forestry.md": {
  id: "astro-plus-forestry.md",
  slug: "astro-plus-forestry",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"astro-plus-netlify-cms.md": {
  id: "astro-plus-netlify-cms.md",
  slug: "astro-plus-netlify-cms",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"astro-plus-snipcart.md": {
  id: "astro-plus-snipcart.md",
  slug: "astro-plus-snipcart",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"astro-plus-swup.md": {
  id: "astro-plus-swup.md",
  slug: "astro-plus-swup",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"astro-showcase.mdx": {
  id: "astro-showcase.mdx",
  slug: "astro-showcase",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"astro-themes-and-integrations.mdx": {
  id: "astro-themes-and-integrations.mdx",
  slug: "astro-themes-and-integrations",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"converting-navillus-to-astro.md": {
  id: "converting-navillus-to-astro.md",
  slug: "converting-navillus-to-astro",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"introducing-astro-fathom.mdx": {
  id: "introducing-astro-fathom.mdx",
  slug: "introducing-astro-fathom",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"introducing-astro-webfinger.md": {
  id: "introducing-astro-webfinger.md",
  slug: "introducing-astro-webfinger",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"introducing-chisel.md": {
  id: "introducing-chisel.md",
  slug: "introducing-chisel",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"introducing-svelte-entity-store.md": {
  id: "introducing-svelte-entity-store.md",
  slug: "introducing-svelte-entity-store",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"jamstack-2_0.md": {
  id: "jamstack-2_0.md",
  slug: "jamstack-2_0",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"json-ld-in-sveltekit.md": {
  id: "json-ld-in-sveltekit.md",
  slug: "json-ld-in-sveltekit",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"keeping-it-simple-with-astro.mdx": {
  id: "keeping-it-simple-with-astro.mdx",
  slug: "keeping-it-simple-with-astro",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"my-ideal-ssr-router.md": {
  id: "my-ideal-ssr-router.md",
  slug: "my-ideal-ssr-router",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"power-of-simplicity.md": {
  id: "power-of-simplicity.md",
  slug: "power-of-simplicity",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"power-of-svelte-actions.md": {
  id: "power-of-svelte-actions.md",
  slug: "power-of-svelte-actions",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"progressive-enhancement.md": {
  id: "progressive-enhancement.md",
  slug: "progressive-enhancement",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"routing-is-complicated.md": {
  id: "routing-is-complicated.md",
  slug: "routing-is-complicated",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"svelte-class-props.md": {
  id: "svelte-class-props.md",
  slug: "svelte-class-props",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"the-web-needs-more-indie.md": {
  id: "the-web-needs-more-indie.md",
  slug: "the-web-needs-more-indie",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
"web-components-in-astro.md": {
  id: "web-components-in-astro.md",
  slug: "web-components-in-astro",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] },
},
"bookmarks": {
"1672522643.md": {
  id: "1672522643.md",
  slug: "1672522643",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
} & { render(): Render[".md"] },
"1673618890.md": {
  id: "1673618890.md",
  slug: "1673618890",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
} & { render(): Render[".md"] },
"1673700622.md": {
  id: "1673700622.md",
  slug: "1673700622",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
} & { render(): Render[".md"] },
"1674305948.md": {
  id: "1674305948.md",
  slug: "1674305948",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
} & { render(): Render[".md"] },
"2358572395.md": {
  id: "2358572395.md",
  slug: "2358572395",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
} & { render(): Render[".md"] },
"3934174328.md": {
  id: "3934174328.md",
  slug: "3934174328",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
} & { render(): Render[".md"] },
"8924753241.md": {
  id: "8924753241.md",
  slug: "8924753241",
  body: string,
  collection: "bookmarks",
  data: InferEntrySchema<"bookmarks">
} & { render(): Render[".md"] },
},
"notes": {
"dom-as-state.md": {
  id: "dom-as-state.md",
  slug: "dom-as-state",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"federation-not-decentralization.md": {
  id: "federation-not-decentralization.md",
  slug: "federation-not-decentralization",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"html-is-forever.md": {
  id: "html-is-forever.md",
  slug: "html-is-forever",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"indieweb-schemas.md": {
  id: "indieweb-schemas.md",
  slug: "indieweb-schemas",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"modern-web-astro.md": {
  id: "modern-web-astro.md",
  slug: "modern-web-astro",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"prediction-google-disables-js.md": {
  id: "prediction-google-disables-js.md",
  slug: "prediction-google-disables-js",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"self-host-webfinger.md": {
  id: "self-host-webfinger.md",
  slug: "self-host-webfinger",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"surface-duo-camera.md": {
  id: "surface-duo-camera.md",
  slug: "surface-duo-camera",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"tailwind-blockers.md": {
  id: "tailwind-blockers.md",
  slug: "tailwind-blockers",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"tailwind-logical-properties.md": {
  id: "tailwind-logical-properties.md",
  slug: "tailwind-logical-properties",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
"would-you-like-a-straw.md": {
  id: "would-you-like-a-straw.md",
  slug: "would-you-like-a-straw",
  body: string,
  collection: "notes",
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] },
},
"personas": {
"astro.md": {
  id: "astro.md",
  slug: "astro",
  body: string,
  collection: "personas",
  data: InferEntrySchema<"personas">
} & { render(): Render[".md"] },
"navillus.md": {
  id: "navillus.md",
  slug: "navillus",
  body: string,
  collection: "personas",
  data: InferEntrySchema<"personas">
} & { render(): Render[".md"] },
"tony.md": {
  id: "tony.md",
  slug: "tony",
  body: string,
  collection: "personas",
  data: InferEntrySchema<"personas">
} & { render(): Render[".md"] },
},
"photos": {
"2021-06-14-navillus-dev-tools.md": {
  id: "2021-06-14-navillus-dev-tools.md",
  slug: "2021-06-14-navillus-dev-tools",
  body: string,
  collection: "photos",
  data: InferEntrySchema<"photos">
} & { render(): Render[".md"] },
"2022-04-06-astro-partytown.md": {
  id: "2022-04-06-astro-partytown.md",
  slug: "2022-04-06-astro-partytown",
  body: string,
  collection: "photos",
  data: InferEntrySchema<"photos">
} & { render(): Render[".md"] },
"2022-04-06-astro-themes-integrations.md": {
  id: "2022-04-06-astro-themes-integrations.md",
  slug: "2022-04-06-astro-themes-integrations",
  body: string,
  collection: "photos",
  data: InferEntrySchema<"photos">
} & { render(): Render[".md"] },
"2022-04-06-astro-themes.md": {
  id: "2022-04-06-astro-themes.md",
  slug: "2022-04-06-astro-themes",
  body: string,
  collection: "photos",
  data: InferEntrySchema<"photos">
} & { render(): Render[".md"] },
"2022-04-08-astro-showcase-screenshot.md": {
  id: "2022-04-08-astro-showcase-screenshot.md",
  slug: "2022-04-08-astro-showcase-screenshot",
  body: string,
  collection: "photos",
  data: InferEntrySchema<"photos">
} & { render(): Render[".md"] },
"2023-01-22-astro-build-devtools.md": {
  id: "2023-01-22-astro-build-devtools.md",
  slug: "2023-01-22-astro-build-devtools",
  body: string,
  collection: "photos",
  data: InferEntrySchema<"photos">
} & { render(): Render[".md"] },
"avatar-tony-sull.md": {
  id: "avatar-tony-sull.md",
  slug: "avatar-tony-sull",
  body: string,
  collection: "photos",
  data: InferEntrySchema<"photos">
} & { render(): Render[".md"] },
"duo-sample-pandi.md": {
  id: "duo-sample-pandi.md",
  slug: "duo-sample-pandi",
  body: string,
  collection: "photos",
  data: InferEntrySchema<"photos">
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
