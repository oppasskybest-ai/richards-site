import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { SEED_ARTICLES } from '@/lib/config/articles'
import { BOOKS as STATIC_BOOKS } from '@/lib/config/books'
import { PODCASTS as STATIC_PODCASTS } from '@/lib/config/podcasts'
import { STATIC_REVIEWS } from '@/lib/config/reviews'
import { STATIC_EVENTS } from '@/lib/config/events'
import { LEGACY_COMMENTS } from '@/lib/data/legacy-comments'

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = {
    articles: { inserted: 0, skipped: 0, errors: 0 },
    books:    { inserted: 0, skipped: 0, errors: 0 },
    podcasts: { inserted: 0, skipped: 0, errors: 0 },
    reviews:  { inserted: 0, skipped: 0, errors: 0 },
    events:   { inserted: 0, skipped: 0, errors: 0 },
    comments: { inserted: 0, skipped: 0, errors: 0 },
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

  // ── SEED REVIEWS (Endorsements) ──────────────────────────────────────────
  // These were real testimonials sitting as a read-only fallback array in
  // the /reviews page component (see lib/config/reviews.ts) and were never
  // actually in Supabase, so they couldn't be edited from /admin/reviews.
  // Dedupe by quote text since there's no natural slug for a testimonial.
  const { data: existingReviews } = await supabaseAdmin
    .from('reviews')
    .select('quote')

  const existingQuotes = new Set((existingReviews || []).map((r: { quote: string }) => r.quote))

  for (const review of STATIC_REVIEWS) {
    if (existingQuotes.has(review.quote)) {
      results.reviews.skipped++
      continue
    }
    const { error } = await supabaseAdmin.from('reviews').insert({
      quote: review.quote,
      name: review.name,
      location: review.location,
      rating: review.rating,
      status: 'approved',
    })
    if (error) {
      console.error('[seed reviews]', review.id, error.message)
      results.reviews.errors++
    } else {
      results.reviews.inserted++
    }
  }

  // ── SEED EVENTS (Conferences) ────────────────────────────────────────────
  // Same situation as reviews: real conference history sitting only in
  // lib/config/events.ts, merged into the public page but never actually in
  // Supabase, so /admin/events had nothing to manage. Dedupe by title+date,
  // matching the merge key used in app/(site)/events/page.tsx.
  const { data: existingEvents } = await supabaseAdmin
    .from('events')
    .select('title,event_date')

  const existingEventKeys = new Set(
    (existingEvents || []).map((e: { title: string; event_date: string }) => `${e.title}::${e.event_date}`)
  )

  for (const event of STATIC_EVENTS) {
    if (existingEventKeys.has(`${event.title}::${event.event_date}`)) {
      results.events.skipped++
      continue
    }
    const { error } = await supabaseAdmin.from('events').insert({
      title: event.title,
      subtitle: event.subtitle || null,
      description: event.description || null,
      event_date: event.event_date,
      event_time: event.event_time || null,
      end_date: event.end_date || null,
      venue: event.venue || null,
      location: event.location || null,
      event_type: event.event_type || 'Talk',
      register_url: event.register_url || null,
      image: event.image || null,
      status: event.status || 'past',
    })
    if (error) {
      console.error('[seed events]', event.id, error.message)
      results.events.errors++
    } else {
      results.events.inserted++
    }
  }

  // ── SEED LEGACY COMMENTS ─────────────────────────────────────────────────
  // Real reader comments recovered from the old WordPress site export (see
  // lib/data/legacy-comments.ts). Only runs for articles that are actually
  // in the DB (so this must run after the article-seeding block above).
  // Dedupe by matching article_id + author_name + created_at, since the WP
  // comment id itself isn't stored -- that combination is effectively
  // unique per real comment and safe to check against on every re-run.
  const { data: articlesForComments } = await supabaseAdmin
    .from('articles')
    .select('id, slug')

  const articleIdBySlug = new Map(
    (articlesForComments || []).map((a: { id: string; slug: string }) => [a.slug, a.id])
  )

  for (const [slug, comments] of Object.entries(LEGACY_COMMENTS)) {
    const articleId = articleIdBySlug.get(slug)
    if (!articleId) {
      // Article isn't in the DB yet (seed ran with an error above, or this
      // article was never migrated) -- skip its comments for now, they'll
      // pick up next time seed runs after the article exists.
      results.comments.skipped += comments.length
      continue
    }

    const { data: existingForArticle } = await supabaseAdmin
      .from('comments')
      .select('author_name, created_at')
      .eq('article_id', articleId)

    const existingKeys = new Set(
      (existingForArticle || []).map(
        (c: { author_name: string; created_at: string }) => `${c.author_name}::${c.created_at}`
      )
    )

    // wpId -> real Supabase UUID, built up as we insert top-level comments
    // first so replies can reference the correct parent_id.
    const wpIdToRealId = new Map<string, string>()
    const sorted = [...comments].sort((a, b) => (a.parentWpId ? 1 : 0) - (b.parentWpId ? 1 : 0))

    for (const c of sorted) {
      const key = `${c.author}::${c.date}`
      if (existingKeys.has(key)) {
        results.comments.skipped++
        continue
      }
      const parentId = c.parentWpId ? wpIdToRealId.get(c.parentWpId) || null : null
      const { data, error } = await supabaseAdmin
        .from('comments')
        .insert({
          article_id: articleId,
          author_name: c.author,
          body: c.body,
          status: 'approved',
          parent_id: parentId,
          is_owner_reply: c.isOwnerReply,
          created_at: c.date,
        })
        .select('id')
        .single()
      if (error) {
        console.error('[seed comments]', slug, c.wpId, error.message)
        results.comments.errors++
      } else {
        results.comments.inserted++
        wpIdToRealId.set(c.wpId, data.id)
      }
    }
  }

  return NextResponse.json({
    success: true,
    message: `Seeded ${results.articles.inserted} articles (${results.articles.skipped} already existed, ${results.articles.errors} errors), ${results.books.inserted} books (${results.books.skipped} already existed, ${results.books.errors} errors), ${results.podcasts.inserted} podcasts (${results.podcasts.skipped} already existed, ${results.podcasts.errors} errors), ${results.reviews.inserted} endorsements (${results.reviews.skipped} already existed, ${results.reviews.errors} errors), ${results.events.inserted} conferences (${results.events.skipped} already existed, ${results.events.errors} errors), and ${results.comments.inserted} legacy comments (${results.comments.skipped} already existed, ${results.comments.errors} errors).`,
    results,
  })
}
