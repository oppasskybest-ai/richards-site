import { supabaseAdmin } from '@/lib/supabase/server'
import { SEED_ARTICLES } from '@/lib/config/articles'
import type { JournalismCategory } from '@/types/journalism'

export interface ArticleRow {
  id: string
  title: string
  slug: string
  publication: string
  category: string
  url: string | null
  date: string | null
  excerpt: string
  image: string
  featured: boolean
  status: string
  content_type: 'external' | 'native'
  content_html: string | null
  pdf_url: string | null
  created_at: string
}

// Convert DB row to the CardItem-compatible shape used by components
export function toCardItem(a: ArticleRow) {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    publication: a.publication || '',
    category: a.category,
    url: a.url || '',
    date: a.date || a.created_at,
    excerpt: a.excerpt,
    image: a.image,
    featured: a.featured,
    content_type: a.content_type,
  }
}

// Fetch ALL published articles from Supabase, fall back to seed data
export async function getAllArticles() {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    if (error || !data || data.length === 0) return SEED_ARTICLES
    return data.map(toCardItem)
  } catch {
    return SEED_ARTICLES
  }
}

// Fetch articles by category — falls back to seed data for that category
export async function getArticlesByCategory(category: JournalismCategory) {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    if (error || !data || data.length === 0) {
      return SEED_ARTICLES.filter((a) => a.category === category)
    }
    return data.map(toCardItem)
  } catch {
    return SEED_ARTICLES.filter((a) => a.category === category)
  }
}

// Fetch featured articles for homepage
export async function getFeaturedArticles(limit = 4) {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error || !data || data.length === 0) {
      return SEED_ARTICLES.filter((a) => a.featured).slice(0, limit)
    }
    return data.map(toCardItem)
  } catch {
    return SEED_ARTICLES.filter((a) => a.featured).slice(0, limit)
  }
}
