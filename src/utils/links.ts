export function isExternalLink(url: string) {
  return !/^\//.test(url)
}
