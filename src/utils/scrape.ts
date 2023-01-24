import metascraper from 'metascraper'
import author from 'metascraper-author'
import description from 'metascraper-description'
import image from 'metascraper-image'
import logo from 'metascraper-logo'
import publisher from 'metascraper-publisher'
import title from 'metascraper-title'

export type Metadata = {
  author?: string
  description?: string
  image?: string
  logo?: string
  publisher?: string
  title: string
}

const scraper = metascraper([
  author(),
  description(),
  image(),
  logo(),
  publisher(),
  title(),
])

async function fetchWithTimeout(resource: RequestInfo | URL, options: { timeout?: number } & RequestInit = {}) {
  const { timeout = 5000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => {
    controller.abort()
  }, timeout)

  const response = await fetch(resource, { ...options, signal: controller.signal })

  clearTimeout(id)

  return response
}

export async function scrape(url: URL): Promise<Metadata> {
  const content = await fetchWithTimeout(url).then(res => res.text())
  return await scraper({ url: url.toString(), html: content })
}
