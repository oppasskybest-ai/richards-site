import { BookData } from '@/types/books'

// NOTE: descriptions below are written in our own words, not copied from jacket
// copy. Reviewer/endorsement quotes were intentionally left out rather than
// invented -- Randy can paste in real ones (from the back cover or IVP/Zondervan's
// page) through the admin Books tab once the site is live.

export const BOOKS: BookData[] = [
  {
    slug: 'misreading-scripture-with-western-eyes',
    title: 'Misreading Scripture with Western Eyes',
    year: '2012',
    subtitle: 'Removing Cultural Blinders to Better Understand the Bible',
    description: `Written with Brandon J. O'Brien, this is Randy's best-known book -- over 150,000 copies sold. It looks at the cultural distance between the biblical world and modern Western readers, showing how assumptions about individualism, time, and social custom can quietly reshape how we read familiar passages. The goal isn't to unsettle readers for its own sake, but to help them read Scripture more like its first audience would have.`,
    coverImage: '/assets/images/books/misreading-scripture.jpg',
    buyUrl: 'https://www.ivpress.com/misreading-scripture-with-western-eyes',
    buyUrl2: 'https://www.amazon.com/Misreading-Scripture-Western-Eyes-Understand/dp/0830837825',
    quotes: [],
  },
  {
    slug: 'rediscovering-jesus',
    title: 'Rediscovering Jesus',
    year: '2015',
    subtitle: 'An Introduction to Biblical, Religious and Cultural Perspectives on Christ',
    description: `A survey of the many portraits of Jesus found across the New Testament and the wider tradition -- the Jesus of Matthew, of Paul, of John, of the early creeds, and of world religions' own accounts of him. Written with a team of co-authors as an accessible entry point for students encountering these questions for the first time.`,
    coverImage: '/assets/images/books/rediscovering-jesus.jpg',
    buyUrl: 'https://www.ivpress.com/rediscovering-jesus',
    quotes: [],
  },
  {
    slug: 'rediscovering-paul',
    title: 'Rediscovering Paul',
    year: '2017',
    subtitle: "An Introduction to His World, Letters and Theology (2nd ed.)",
    description: `Co-authored with Brandon J. O'Brien, this textbook places Paul back in his first-century context -- his travels, his letter-writing practices, his converts and co-workers -- before turning to the theology of the letters themselves. Now in its second edition and widely used in seminary and college classrooms.`,
    coverImage: '/assets/images/books/book-cover-2d-ed-of-rediscovering-paul.jpg',
    buyUrl: 'https://www.ivpress.com/rediscovering-paul-2nd-edition',
    quotes: [],
  },
  {
    slug: 'a-little-book-for-new-biblical-scholars',
    title: 'A Little Book for New Biblical Scholars',
    year: '2015',
    subtitle: 'Big Help for Beginning Students of the Bible',
    description: `A short, practical guide for students just starting out in biblical studies -- how to read scholarship well, how to argue carefully, and how to hold rigorous study and personal faith together rather than treating them as competitors.`,
    coverImage: '/assets/images/books/little-book.jpg',
    buyUrl: 'https://www.ivpress.com/a-little-book-for-new-biblical-scholars',
    quotes: [],
  },
]

export function getBookBySlug(slug: string): BookData | undefined {
  return BOOKS.find((b) => b.slug === slug)
}
