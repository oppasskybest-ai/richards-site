// Scans article HTML for Bible references in the text (Randy's real posts
// write them like "(Jn. 14:27)", "(1 Thess. 5:3)", "(Rom. 5:8)") and wraps
// each one in a span the client can hook hover/click handlers onto. Runs
// server-side on the HTML string, so it's careful to only match plain
// reference-shaped text and never touch anything inside an existing tag
// (href attributes, etc.) by processing text content between tags only.
//
// The recognized-book list is imported from bibleBooks.ts (BOOK_ALIASES)
// rather than kept as a separate hardcoded list here. It used to be a
// second, independent copy -- which is exactly how "Luk 2:20" went
// unrecognized: the two lists disagreed on which abbreviations counted,
// silently, with no error anywhere. Now there is exactly one list; adding
// a new abbreviation there fixes both detection and lookup at once, and
// any reference format Randy actually uses in a new article -- typed
// through the admin panel, not just these hardcoded examples -- is
// recognized consistently by both.

import { BOOK_ALIASES } from './bibleBooks'

const REF_PATTERN = /\b((?:[1-3]\s?)?[A-Za-z]{2,}\.?)\s+(\d{1,3}):(\d{1,3})(-(\d{1,3})?)?\b/g

const KNOWN_BOOK_WORDS = new Set(Object.keys(BOOK_ALIASES))

function isKnownBook(word: string): boolean {
  const clean = word.toLowerCase().replace(/[.\s]/g, '')
  return KNOWN_BOOK_WORDS.has(clean)
}

// Walks the HTML string and only rewrites text that's OUTSIDE of tags
// (i.e. not inside `<...>`), so it can never corrupt existing markup.
export function wrapBibleRefs(html: string): string {
  const parts = html.split(/(<[^>]+>)/) // keep tags as their own array items
  return parts
    .map((part) => {
      if (part.startsWith('<')) return part // leave tags untouched
      return part.replace(REF_PATTERN, (match, book, chap, verse) => {
        if (!isKnownBook(book)) return match
        const ref = match.trim()
        return `<span class="bible-ref" data-ref="${ref.replace(/"/g, '&quot;')}" tabindex="0">${match}</span>`
      })
    })
    .join('')
}
