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
}

export interface BookQuote {
  quote: string
  attribution: string
}

export interface BookExtraImage {
  src: string
  alt: string
}
