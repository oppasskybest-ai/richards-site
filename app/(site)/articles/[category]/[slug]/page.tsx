import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase/server'
import { CATEGORY_LABELS, JournalismCategory } from '@/types/journalism'
import type { Article } from '@/types/database'
import { SEED_ARTICLES } from '@/lib/config/articles'
import ArticleComments from '@/components/journalism/ArticleComments'
import BibleVerseInteractive from '@/components/journalism/BibleVerseInteractive'
import { wrapBibleRefs } from '@/lib/utils/wrapBibleRefs'

export const revalidate = 60

interface Props {
  params: Promise<{ category: string; slug: string }>
}

// Falls back to the real static article content (lib/config/articles.ts)
// when Supabase has nothing for this slug -- either because it hasn't been
// seeded yet, or a specific row was deleted/edited away. Without this,
// every single article 404s until someone clicks "Run Seed" in
// /admin/settings, which is a trap: the article text is real and already
// in the codebase, there's no reason a missing DB row should 404 it.
function getStaticArticle(category: string, slug: string): Article | null {
  const found = SEED_ARTICLES.find((a) => a.slug === slug && a.category === category)
  if (!found) return null
  return {
    id: found.id,
    title: found.title,
    slug: found.slug || found.id,
    publication: found.publication,
    category: found.category,
    url: found.url || '',
    date: found.date || '',
    excerpt: found.excerpt || '',
    image: found.image || '',
    featured: found.featured ?? false,
    status: 'published',
    content_type: found.content_type || 'native',
    content_html: found.content_html || null,
    pdf_url: null,
    comments_enabled: found.comments_enabled ?? true,
    created_at: found.date || '',
    updated_at: found.date || '',
  }
}

async function getArticle(category: string, slug: string): Promise<Article | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('category', category)
      .eq('content_type', 'native')
      .eq('status', 'published')
      .single()
    if (!error && data) return data as Article
  } catch {
    // Supabase unreachable -- fall through to static content below
  }
  return getStaticArticle(category, slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const article = await getArticle(category, slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || '',
      images: article.image ? [article.image] : [],
    },
  }
}

export default async function NativeArticlePage({ params }: Props) {
  const { category, slug } = await params
  const article = await getArticle(category, slug)
  if (!article) notFound()

  const catLabel = CATEGORY_LABELS[category as JournalismCategory] || category
  const publishDate = article.date
    ? new Date(article.date + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : new Date(article.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })

  return (
    <>
      {/* HERO — parallax */}
      <section
        className="page-hero"
        style={{
          backgroundImage: article.image
            ? `url('${article.image}')`
            : "url('/assets/images/portraits/speaking-photo.jpg')",
          minHeight: '55vh',
        }}
      >
        <div
          className="container-wide"
          style={{ zIndex: 2, maxWidth: '760px', margin: '0 auto', padding: '0 clamp(1.25rem,5vw,4rem)' }}
        >
          {/* BREADCRUMB */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/articles" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', textDecoration: 'none' }}>
              Articles
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem' }}>›</span>
            <Link href={`/articles/${category}`} style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', textDecoration: 'none' }}>
              {catLabel}
            </Link>
          </div>

          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
              fontWeight: 400, color: 'white',
              lineHeight: 1.12, letterSpacing: '-0.01em',
              marginBottom: '1rem',
            }}
          >
            {article.title}
          </h1>

          {article.excerpt && (
            <p style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.65,
              marginBottom: '1.25rem',
              fontStyle: 'italic',
            }}>
              {article.excerpt}
            </p>
          )}

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(var(--gold-rgb),0.8)', fontFamily: '"Inter", sans-serif',
            }}>
              {publishDate}
            </span>
            <span style={{
              fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', fontFamily: '"Inter", sans-serif',
            }}>
              {catLabel}
            </span>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY — paper bg */}
      <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,6rem) 0' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(1.25rem,5vw,4rem)' }}>

          {/* RICH CONTENT — Bible references (e.g. "Jn. 14:27") are detected
              server-side and made hoverable/clickable to show the verse
              inline, sourced from a local public-domain KJV dataset so
              readers don't have to leave the page. */}
          {article.content_html ? (
            <BibleVerseInteractive>
              <div
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: wrapBibleRefs(article.content_html) }}
              />
            </BibleVerseInteractive>
          ) : (
            <p style={{ color: '#6b6b6b', fontStyle: 'italic' }}>Content coming soon.</p>
          )}

          {/* PDF DOWNLOAD */}
          {article.pdf_url && (
            <div style={{
              marginTop: '2.5rem',
              padding: '1.25rem 1.5rem',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.08)',
              borderLeft: '4px solid var(--gold)',
              borderRadius: '0 3px 3px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.25rem' }}>
                  Attachment
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink)', fontFamily: '"Playfair Display", serif' }}>
                  Download PDF version of this article
                </p>
              </div>
              <a
                href={article.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--gold)', color: 'white', borderRadius: '2px',
                  fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: '"Inter", sans-serif', fontWeight: 500,
                  textDecoration: 'none', flexShrink: 0,
                }}
              >
                Download PDF ↓
              </a>
            </div>
          )}

          {/* FOOTER NAV */}
          <div style={{
            marginTop: '3.5rem', paddingTop: '2rem',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
          }}>
            <Link
              href={`/articles/${category}`}
              style={{
                fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--gold)', fontFamily: '"Inter", sans-serif', fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              ← Back to {catLabel}
            </Link>
            <Link
              href="/articles"
              style={{
                fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.35)', fontFamily: '"Inter", sans-serif',
                textDecoration: 'none',
              }}
            >
              Full Archive →
            </Link>
          </div>

          {/* COMMENTS — only shown when enabled on this article */}
          {article.comments_enabled && (
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(article.id) ? (
              <ArticleComments articleId={article.id} />
            ) : (
              <p style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(0,0,0,0.08)', color: '#999', fontSize: '0.85rem', fontFamily: '"Inter", sans-serif' }}>
                Comments open once this article is synced to the database — run
                &ldquo;Run Seed&rdquo; in Admin → Settings to enable them here.
              </p>
            )
          )}
        </div>
      </section>
    </>
  )
}
