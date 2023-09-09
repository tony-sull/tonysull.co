import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import sanitizeHtml from 'sanitize-html'

marked.use(gfmHeadingId())

export function mdToHtml(markdown: string) {
	const html = marked.parse(markdown, { mangle: false })
	return sanitizeHtml(html)
}
