export function capitalize(value: string) {
  return value.replace(/(\b[a-z](?!\s))/g, c => c.toUpperCase())
}
