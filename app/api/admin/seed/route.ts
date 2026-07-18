import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { SEED_ARTICLES } from '@/lib/config/articles'
import { BOOKS as STATIC_BOOKS } from '@/lib/config/books'

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = {
    articles: { inserted: 0, skipped: 0, errors: 0 },
    books:    { inserted: 0, skipped: 0, errors: 0 },
  }

  // ── SEED ARTICLES ──────────────────────────────────────────────────────────
  // Get existing slugs so we never overwrite admin-edited content
  const { data: existingArticles } = await supabaseAdmin
    .from('articles')
    .select('slug')

  const existingSlugs = new Set((existingArticles || []).map((a: { slug: string }) => a.slug))

  for (const article of SEED_ARTICLES) {
    // Skip if already in DB (was seeded before, or admin created/edited it)
    if (existingSlugs.has(article.id)) {
      results.articles.skipped++
      continue
    }

    const payload = {
      slug:         article.id,          // seed articles use id as slug
      title:        article.title,
      publication:  article.publication,
      category:     article.category,
      url:          article.url || null,
      date:         article.date || null,
      excerpt:      article.excerpt || '',
      image:        article.image || '',
      featured:     article.featured ?? false,
      status:       'published',
      content_type: 'external',
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

  return NextResponse.json({
    success: true,
    message: `Seeded ${results.articles.inserted} articles (${results.articles.skipped} already existed, ${results.articles.errors} errors) and ${results.books.inserted} books (${results.books.skipped} already existed, ${results.books.errors} errors).`,
    results,
  })
}
