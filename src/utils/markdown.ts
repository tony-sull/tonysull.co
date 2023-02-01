import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

export function mdToHtml(markdown: string) {
  const html = marked.parse(markdown)
  return sanitizeHtml(html)
}
