export interface CardItem {
  id: string
  title: string
  publication: string
  url: string
  date: string
  excerpt?: string
  image?: string
  slug?: string
  category?: string
  content_type?: 'external' | 'native'
  content_html?: string
}

export type JournalismCategory = 'bible-culture' | 'family-faith'

export const CATEGORY_LABELS: Record<JournalismCategory, string> = {
  'bible-culture': 'Bible & Culture',
  'family-faith': 'Family & Faith',
}

export const CATEGORY_SLUGS: JournalismCategory[] = [
  'bible-culture',
  'family-faith',
]
