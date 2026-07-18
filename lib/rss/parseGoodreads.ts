/**
 * parseGoodreads.ts
 *
 * Fetches E. Randolph Richards' Goodreads author RSS feed and returns
 * a list of reviews/books for display on the site.
 *
 * HOW TO ACTIVATE:
 *   1. Go to Randy's Goodreads (or Academia.edu) author profile
 *   2. Find his author ID in the URL:
 *      https://www.goodreads.com/author/show/XXXXXXX.E_Randolph_Richards
 *   3. Replace GOODREADS_AUTHOR_ID below with that number
 *   4. The RSS feed URL becomes:
 *      https://www.goodreads.com/author/list/XXXXXXX.rss
 *
 * CURRENT STATUS: Placeholder ID — replace with real author ID.
 * Once activated, Goodreads reviews will appear on each book's
 * detail page below the press quotes section.
 */

const GOODREADS_AUTHOR_ID = 'REPLACE_WITH_REAL_ID'

export interface GoodreadsBook {
  title: string
  link: string
  imageUrl: string
  averageRating: string
  ratingsCount: string
  description: string
  isbn: string
  pubDate: string
}

/**
 * Fetches the author's book list from Goodreads RSS.
 * Returns an empty array on any error so the page never breaks.
 * Results are cached for 1 hour via Next.js fetch cache.
 */
export async function getGoodreadsBooks(): Promise<GoodreadsBook[]> {
  const url = `https://www.goodreads.com/author/list/${GOODREADS_AUTHOR_ID}.rss`

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cache for 1 hour
      headers: { 'User-Agent': 'randolphrichards.com/1.0' },
    })

    if (!res.ok) {
      console.error(`[Goodreads] RSS fetch failed: ${res.status}`)
      return []
    }

    const xml = await res.text()
    return parseGoodreadsXml(xml)
  } catch (err) {
    console.error('[Goodreads] RSS fetch error:', err)
    return []
  }
}

/**
 * Parses the Goodreads author RSS XML into structured book objects.
 * Uses regex-based parsing to avoid needing a DOM parser in the edge runtime.
 */
function parseGoodreadsXml(xml: string): GoodreadsBook[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || []

  return items.map((item) => {
    const get = (tag: string) => {
      const match = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\/${tag}>|<${tag}[^>]*>([^<]*)<\/${tag}>`))
      return match ? (match[1] || match[2] || '').trim() : ''
    }

    // Goodreads uses book:image_url and book:average_rating tags
    const imageMatch = item.match(/<book:image_url>([^<]*)<\/book:image_url>/)
    const ratingMatch = item.match(/<book:average_rating>([^<]*)<\/book:average_rating>/)
    const ratingsCountMatch = item.match(/<book:ratings_count>([^<]*)<\/book:ratings_count>/)
    const isbnMatch = item.match(/<book:isbn>([^<]*)<\/book:isbn>/)

    return {
      title: get('title'),
      link: get('link'),
      imageUrl: imageMatch ? imageMatch[1].trim() : '',
      averageRating: ratingMatch ? ratingMatch[1].trim() : '',
      ratingsCount: ratingsCountMatch ? ratingsCountMatch[1].trim() : '',
      description: get('description').replace(/<[^>]*>/g, '').slice(0, 400),
      isbn: isbnMatch ? isbnMatch[1].trim() : '',
      pubDate: get('pubDate'),
    }
  }).filter(b => b.title && b.link)
}

/**
 * Finds the Goodreads entry that best matches a given book title.
 * Used by the book detail page to show the Goodreads rating for that specific book.
 */
export function matchBookToGoodreads(
  books: GoodreadsBook[],
  bookTitle: string
): GoodreadsBook | null {
  const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  const target = normalise(bookTitle)
  return books.find(b => normalise(b.title).includes(target) || target.includes(normalise(b.title))) ?? null
}
