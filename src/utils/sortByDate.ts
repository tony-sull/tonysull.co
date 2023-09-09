import type { CollectionEntry } from 'astro:content'

type SortableEntry =
	| CollectionEntry<'articles'>
	| CollectionEntry<'bookmarks'>
	| CollectionEntry<'notes'>
	| CollectionEntry<'photos'>

export function sortByDate(a: SortableEntry, b: SortableEntry) {
	if (!a.data.published && !b.data.published) {
		const aText = a.collection === 'articles' ? a.data.name : a.body
		const bText = b.collection === 'articles' ? b.data.name : b.body

		return bText.localeCompare(aText)
	}

	if (a.data.published && b.data.published) {
		return b.data.published.getTime() - a.data.published.getTime()
	}

	return a.data.published ? -1 : 1
}
