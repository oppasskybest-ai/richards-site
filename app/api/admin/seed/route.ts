import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { SEED_ARTICLES } from '@/lib/config/articles'
import { BOOKS as STATIC_BOOKS } from '@/lib/config/books'
import { PODCASTS as STATIC_PODCASTS } from '@/lib/config/podcasts'

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = {
    articles: { inserted: 0, skipped: 0, errors: 0 },
    books:    { inserted: 0, skipped: 0, errors: 0 },
    podcasts: { inserted: 0, skipped: 0, errors: 0 },
  }

  // ── SEED ARTICLES ──────────────────────────────────────────────────────────
  // Get existing slugs so we never overwrite admin-edited content
  const { data: existingArticles } = await supabaseAdmin
    .from('articles')
    .select('slug')

  const existingSlugs = new Set((existingArticles || []).map((a: { slug: string }) => a.slug))

  for (const article of SEED_ARTICLES) {
    // Skip if already in DB (was seeded before, or admin created/edited it)
    if (existingSlugs.has(article.slug || article.id)) {
      results.articles.skipped++
      continue
    }

    const payload = {
      slug:         article.slug || article.id,
      title:        article.title,
      publication:  article.publication,
      category:     article.category,
      url:          article.url || null,
      date:         article.date || null,
      excerpt:      article.excerpt || '',
      image:        article.image || '',
      featured:     article.featured ?? false,
      status:       'published',
      content_type: article.content_type || 'external',
      content_html: article.content_type === 'native' ? (article.content_html || '') : null,
      comments_enabled: article.comments_enabled ?? true,
    }

    const { error } = await supabaseAdmin.from('articles').insert(payload)
    if (error) {
      console.error('[seed articles]', article.id, error.message)
      results.articles.errors++
    } else {
      results.articles.inserted++
    }
  }

  // ── SEED BOOKS ─────────────────────────────────────────────────────────────
  const { data: existingBooks } = await supabaseAdmin
    .from('books')
    .select('slug')

  const existingBookSlugs = new Set((existingBooks || []).map((b: { slug: string }) => b.slug))

  for (let i = 0; i < STATIC_BOOKS.length; i++) {
    const book = STATIC_BOOKS[i]

    // Skip if already in DB
    if (existingBookSlugs.has(book.slug)) {
      results.books.skipped++
      continue
    }

    const payload = {
      slug:        book.slug,
      title:       book.title,
      year:        book.year,
      subtitle:    book.subtitle,
      description: book.description,
      cover_image: book.coverImage,
      buy_url:     book.buyUrl,
      buy_url_2:   book.buyUrl2 || null,
      order_index: i + 1,
      quotes:      book.quotes || [],
    }

    const { error } = await supabaseAdmin.from('books').insert(payload)
    if (error) {
      console.error('[seed books]', book.slug, error.message)
      results.books.errors++
    } else {
      results.books.inserted++
    }
  }

  // ── SEED PODCASTS ──────────────────────────────────────────────────────────
  // No natural slug column on this table -- dedupe by url instead, since
  // every real entry links to a distinct episode.
  const { data: existingPodcasts } = await supabaseAdmin
    .from('podcasts')
    .select('url')

  const existingPodcastUrls = new Set((existingPodcasts || []).map((p: { url: string }) => p.url))

  for (let i = 0; i < STATIC_PODCASTS.length; i++) {
    const podcast = STATIC_PODCASTS[i]

    if (existingPodcastUrls.has(podcast.url)) {
      results.podcasts.skipped++
      continue
    }

    const payload = {
      title:       podcast.title,
      source:      podcast.source,
      description: podcast.description || '',
      url:         podcast.url,
      embed_url:   podcast.embedUrl || null,
      date:        podcast.date || null,
      order_index: i + 1,
    }

    const { error } = await supabaseAdmin.from('podcasts').insert(payload)
    if (error) {
      console.error('[seed podcasts]', podcast.id, error.message)
      results.podcasts.errors++
    } else {
      results.podcasts.inserted++
    }
  }

  return NextResponse.json({
    success: true,
    message: `Seeded ${results.articles.inserted} articles (${results.articles.skipped} already existed, ${results.articles.errors} errors), ${results.books.inserted} books (${results.books.skipped} already existed, ${results.books.errors} errors), and ${results.podcasts.inserted} podcasts (${results.podcasts.skipped} already existed, ${results.podcasts.errors} errors).`,
    results,
  })
}
