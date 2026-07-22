import { supabaseAdmin } from '@/lib/supabase/server'
import { BOOKS as STATIC_BOOKS } from '@/lib/config/books'
import type { Book } from '@/types/database'
import type { BookData } from '@/types/books'

export const revalidate = 60

// Convert a Supabase Book row into the BookData shape used across the site.
// Field names differ slightly (cover_image vs coverImage, buy_url vs buyUrl)
// so this adapter keeps the public pages free of Supabase-specific field names.
import { toAbsoluteUrl } from '@/lib/utils/url'

function toBookData(b: Book): BookData {
  return {
    slug: b.slug,
    title: b.title,
    year: b.year,
    subtitle: b.subtitle,
    description: b.description,
    coverImage: b.cover_image,
    buyUrl: toAbsoluteUrl(b.buy_url) || '',
    buyUrl2: b.buy_url_2 ? toAbsoluteUrl(b.buy_url_2) : undefined,
    quotes: Array.isArray(b.quotes) ? b.quotes : [],
  }
}

// Merges live Supabase rows with the static book list by slug. A Supabase
// row wins over a static entry with the same slug; static entries not yet
// migrated to Supabase are kept rather than dropped. See the matching note
// in lib/data/articles.ts -- this replaces an all-or-nothing fallback that
// made every real book vanish from "Other Books" sidebars the instant a
// single new book was added through the admin panel.
function mergeBooksBySlug(dbBooks: BookData[], staticBooks: BookData[]): BookData[] {
  const dbSlugs = new Set(dbBooks.map((b) => b.slug))
  const missingFromDb = staticBooks.filter((b) => !dbSlugs.has(b.slug))
  return [...dbBooks, ...missingFromDb]
}

// Fetch all books from Supabase, merged with any not-yet-migrated static books.
export async function getAllBooks(): Promise<BookData[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('books')
      .select('*')
      .order('order_index', { ascending: true })
    if (error || !data) return STATIC_BOOKS
    return mergeBooksBySlug(data.map(toBookData), STATIC_BOOKS)
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
