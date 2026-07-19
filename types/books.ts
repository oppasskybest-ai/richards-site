export interface BookData {
  slug: string
  title: string
  year: string
  subtitle: string
  description: string
  coverImage: string
  buyUrl: string
  buyUrl2?: string
  quotes: BookQuote[]
  // 'author' = he wrote it (default). 'foreword' = he only wrote the
  // foreword/intro for someone else's book -- must be visually
  // differentiated so it's never confused with his own authored work.
  // 'translation' = a foreign-language edition of one of his own books.
  role?: 'author' | 'foreword' | 'translation'
  authorsLine?: string // overrides the default "by Randy" byline when role != 'author'
  workingOn?: boolean  // true = shows in "Books I'm Working On", false/undefined = "All Books"
}

export interface BookQuote {
  quote: string
  attribution: string
}

export interface BookExtraImage {
  src: string
  alt: string
}
