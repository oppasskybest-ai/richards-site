import { MetadataRoute } from 'next'
import { getAllBooks } from '@/lib/data/books'
import { getAllArticles } from '@/lib/data/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://randolphrichards.com'
  const now = new Date()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/articles`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/articles/bible-culture`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/articles/family-faith`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/books`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/events`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ]

  // Dynamic book routes
  const books = await getAllBooks()
  const bookRoutes: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${base}/books/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Dynamic native article routes
  const articles = await getAllArticles()
  const nativeArticles = articles.filter(a => a.content_type === 'native' && a.slug && a.category)
  const articleRoutes: MetadataRoute.Sitemap = nativeArticles.map((a) => ({
    url: `${base}/articles/${a.category}/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...bookRoutes, ...articleRoutes]
}
