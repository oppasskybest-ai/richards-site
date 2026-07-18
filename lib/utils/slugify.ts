export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getPublicationTag(publication: string): string {
  const pub = publication.toLowerCase()
  if (pub.includes('vanity fair')) return 'pub-vanity-fair'
  if (pub.includes('wired')) return 'pub-wired'
  if (pub.includes('new yorker')) return 'pub-new-yorker'
  if (pub.includes('new york') || pub.includes('nymag') || pub.includes('intelligencer')) return 'pub-new-york'
  if (pub.includes('fortune')) return 'pub-fortune'
  if (pub.includes('esquire')) return 'pub-esquire'
  if (pub.includes('air mail')) return 'pub-air-mail'
  if (pub.includes('bloomberg') || pub.includes('businessweek')) return 'pub-bloomberg'
  if (pub.includes('observer') || pub.includes('nyo')) return 'pub-observer'
  if (pub.includes('medium')) return 'pub-medium'
  return 'pub-default'
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function formatYear(dateStr: string): string {
  if (!dateStr) return ''
  return dateStr.slice(0, 4)
}
