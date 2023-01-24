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

async function fetchWithTimeout(
  resource: RequestInfo | URL,
  options: { timeout?: number } & RequestInit = {}
) {
  const { timeout = 5000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => {
    controller.abort()
  }, timeout)

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  })

  clearTimeout(id)

  return response
}

const scrapeCache = new Map<string, Promise<string>>()

export async function scrape(url: URL): Promise<Metadata> {
  if (!scrapeCache.has(url.toString())) {
    scrapeCache.set(
      url.toString(),
      fetchWithTimeout(url, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        },
      }).then(res => res.text())
    )
  }

  const content = await scrapeCache.get(url.toString())
  return await scraper({ url: url.toString(), html: content })
}
