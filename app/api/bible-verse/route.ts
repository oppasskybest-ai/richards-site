import { NextRequest, NextResponse } from 'next/server'
import { normalizeBookName } from '@/lib/utils/bibleBooks'
import bibleData from '@/lib/data/bible-kjv.json'

interface BibleBook {
  abbrev: string
  chapters: string[][]
}

const BOOKS = bibleData as unknown as BibleBook[]
const BY_ABBREV = new Map(BOOKS.map((b) => [b.abbrev, b]))

// Strips KJV translator notes/italics markers -- e.g. "{was}" and
// "{the light from...: Heb. between the light and between the darkness}"
// -- down to clean reading text.
function cleanVerseText(raw: string): string {
  return raw.replace(/\{[^}]*\}/g, '').replace(/\s{2,}/g, ' ').trim()
}

// Accepts refs like "John 3:16", "1 Thess. 5:3", "Rom 5:8", "Lk 24:21",
// and ranges like "Phil 3:20-21" or "1 Thess 4:13-5:11".
function parseRef(ref: string) {
  const m = ref.trim().match(/^(\d?\s?[A-Za-z]+)\.?\s+(\d+):(\d+)(?:-(\d+):?(\d+)?)?$/)
  if (!m) return null
  const [, rawBook, chapStr, verseStr, endChapStr, endVerseStr] = m
  const bookCode = normalizeBookName(rawBook.replace(/\s+/g, ''))
  if (!bookCode) return null
  const chapter = parseInt(chapStr, 10)
  const verse = parseInt(verseStr, 10)
  const endChapter = endChapStr ? parseInt(endChapStr, 10) : chapter
  const endVerse = endVerseStr ? parseInt(endVerseStr, 10) : (endChapStr ? undefined : verse)
  return { bookCode, chapter, verse, endChapter, endVerse }
}

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get('ref')
  if (!ref) return NextResponse.json({ error: 'Missing ref' }, { status: 400 })

  const parsed = parseRef(ref)
  if (!parsed) return NextResponse.json({ error: 'Could not parse reference' }, { status: 400 })

  const book = BY_ABBREV.get(parsed.bookCode)
  if (!book) return NextResponse.json({ error: 'Unknown book' }, { status: 404 })

  const { chapter, verse, endChapter, endVerse } = parsed
  const verses: string[] = []

  for (let c = chapter; c <= endChapter; c++) {
    const chapterVerses = book.chapters[c - 1]
    if (!chapterVerses) continue
    const startV = c === chapter ? verse : 1
    const endV = c === endChapter ? (endVerse || chapterVerses.length) : chapterVerses.length
    for (let v = startV; v <= endV; v++) {
      const text = chapterVerses[v - 1]
      if (text) verses.push(cleanVerseText(text))
    }
  }

  if (verses.length === 0) {
    return NextResponse.json({ error: 'Verse not found' }, { status: 404 })
  }

  return NextResponse.json({
    ref,
    text: verses.join(' '),
    translation: 'KJV',
  }, {
    headers: { 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800' },
  })
}
