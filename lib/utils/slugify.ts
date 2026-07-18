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
  if (pub.includes('stone chapel')) return 'pub-stone-chapel'
  if (pub.includes('clarity podcast')) return 'pub-clarity-podcast'
  if (pub.includes('moody radio') || pub.includes('moody')) return 'pub-moody-radio'
  if (pub.includes('christianity today')) return 'pub-christianity-today'
  if (pub.includes('gospel coalition')) return 'pub-gospel-coalition'
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
