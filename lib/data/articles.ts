import { supabaseAdmin } from '@/lib/supabase/server'
import { SEED_ARTICLES } from '@/lib/config/articles'
import type { JournalismCategory } from '@/types/journalism'
import { toAbsoluteUrl } from '@/lib/utils/url'

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
    url: a.url ? toAbsoluteUrl(a.url) : '',
    date: a.date || a.created_at,
    excerpt: a.excerpt,
    image: a.image,
    featured: a.featured,
    content_type: a.content_type,
  }
}

// Merges live Supabase rows with the static seed list by slug. A Supabase
// row always wins over a seed entry with the same slug (it's either the
// migrated version or a genuine edit). Seed entries whose slug ISN'T in
// Supabase yet are kept, not dropped.
//
// This replaces an all-or-nothing fallback that used to say "if Supabase
// has *any* rows, use ONLY those, otherwise use ONLY the seed list." That
// meant the instant a single new article was added through the admin
// panel (before running Seed), every other real, already-published
// article vanished from every list on the site -- they were still
// individually reachable by direct URL (the single-article page has its
// own per-slug fallback), just missing from "all articles," category
// pages, and the featured rail. Merging fixes that for good: adding one
// new item can never again make the rest of the site's real content
// disappear.
function mergeBySlug<A extends { slug?: string; date?: string }, B extends { slug?: string; date?: string }>(
  dbItems: A[],
  seedItems: B[]
): (A | B)[] {
  const dbSlugs = new Set(dbItems.map((i) => i.slug))
  const missingFromDb = seedItems.filter((i) => !dbSlugs.has(i.slug))
  return [...dbItems, ...missingFromDb].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

// Fetch ALL published articles from Supabase, merged with any not-yet-migrated seed articles
export async function getAllArticles() {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    if (error) return SEED_ARTICLES
    return mergeBySlug(data.map(toCardItem), SEED_ARTICLES)
  } catch {
    return SEED_ARTICLES
  }
}

// Fetch articles by category — merged with any not-yet-migrated seed articles for that category
export async function getArticlesByCategory(category: JournalismCategory) {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    if (error) return SEED_ARTICLES.filter((a) => a.category === category)
    return mergeBySlug(data.map(toCardItem), SEED_ARTICLES.filter((a) => a.category === category))
  } catch {
    return SEED_ARTICLES.filter((a) => a.category === category)
  }
}

// Fetch featured articles for homepage — merged with any not-yet-migrated seed articles
export async function getFeaturedArticles(limit = 4) {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error) return SEED_ARTICLES.filter((a) => a.featured).slice(0, limit)
    return mergeBySlug(data.map(toCardItem), SEED_ARTICLES.filter((a) => a.featured)).slice(0, limit)
  } catch {
    return SEED_ARTICLES.filter((a) => a.featured).slice(0, limit)
  }
}
