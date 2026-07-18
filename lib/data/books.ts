import { supabaseAdmin } from '@/lib/supabase/server'
import { BOOKS as STATIC_BOOKS } from '@/lib/config/books'
import type { Book } from '@/types/database'
import type { BookData } from '@/types/books'

export const revalidate = 60

// Convert a Supabase Book row into the BookData shape used across the site.
// Field names differ slightly (cover_image vs coverImage, buy_url vs buyUrl)
// so this adapter keeps the public pages free of Supabase-specific field names.
function toBookData(b: Book): BookData {
  return {
    slug: b.slug,
    title: b.title,
    year: b.year,
    subtitle: b.subtitle,
    description: b.description,
    coverImage: b.cover_image,
    buyUrl: b.buy_url || '',
    quotes: Array.isArray(b.quotes) ? b.quotes : [],
  }
}

// Fetch all books from Supabase, ordered by order_index.
// Falls back to static config if DB returns nothing or errors.
export async function getAllBooks(): Promise<BookData[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('books')
      .select('*')
      .order('order_index', { ascending: true })
    if (error || !data || data.length === 0) return STATIC_BOOKS
    return data.map(toBookData)
  } catch {
    return STATIC_BOOKS
  }
}

// Fetch a single book by slug.
// Falls back to static config if not found in DB.
export async function getBook(slug: string): Promise<BookData | undefined> {
  try {
    const { data, error } = await supabaseAdmin
      .from('books')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error || !data) {
      return STATIC_BOOKS.find((b) => b.slug === slug)
    }
    return toBookData(data)
  } catch {
    return STATIC_BOOKS.find((b) => b.slug === slug)
  }
}

// Used by generateStaticParams — always returns all slugs, from DB if possible.
export async function getAllBookSlugs(): Promise<string[]> {
  const books = await getAllBooks()
  return books.map((b) => b.slug)
}
