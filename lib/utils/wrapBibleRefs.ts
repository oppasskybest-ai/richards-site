// Scans article HTML for Bible references in the text (Randy's real posts
// write them like "(Jn. 14:27)", "(1 Thess. 5:3)", "(Rom. 5:8)") and wraps
// each one in a span the client can hook hover/click handlers onto. Runs
// server-side on the HTML string, so it's careful to only match plain
// reference-shaped text and never touch anything inside an existing tag
// (href attributes, etc.) by processing text content between tags only.

const REF_PATTERN = /\b((?:[1-3]\s?)?[A-Za-z]{2,}\.?)\s+(\d{1,3}):(\d{1,3})(-(\d{1,3})?)?\b/g

const KNOWN_BOOK_WORDS = new Set([
  'gen','genesis','ex','exod','exodus','lev','leviticus','num','numbers','deut','deuteronomy',
  'josh','joshua','judg','judges','ruth','sam','samuel','kgs','kings','chron','chronicles',
  'ezra','neh','nehemiah','esth','esther','job','ps','psa','psalm','psalms','prov','proverbs',
  'eccl','ecclesiastes','song','isa','isaiah','jer','jeremiah','lam','lamentations','ezek','ezekiel',
  'dan','daniel','hos','hosea','joel','amos','obad','obadiah','jonah','jon','mic','micah','nah','nahum',
  'hab','habakkuk','zeph','zephaniah','hag','haggai','zech','zechariah','mal','malachi',
  'matt','mt','matthew','mark','mk','luke','lk','john','jn','jhn','acts','rom','romans',
  'cor','corinthians','gal','galatians','eph','ephesians','phil','philippians','col','colossians',
  'thess','thessalonians','th','tim','timothy','titus','tit','philem','philemon','heb','hebrews',
  'jas','james','pet','peter','pt','jo','jude','rev','revelation',
])

function isKnownBook(word: string): boolean {
  const clean = word.toLowerCase().replace(/[.\s]/g, '').replace(/^[1-3]/, '')
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
