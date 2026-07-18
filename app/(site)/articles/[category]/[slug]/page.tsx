import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase/server'
import { CATEGORY_LABELS, JournalismCategory } from '@/types/journalism'
import type { Article } from '@/types/database'
import ArticleComments from '@/components/journalism/ArticleComments'

export const revalidate = 60

interface Props {
  params: Promise<{ category: string; slug: string }>
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
    if (error || !data) return null
    return data as Article
  } catch {
    return null
  }
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
            : "url('/assets/images/articles/unsplash-image-cl1vms3jlue.jpg')",
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
              Journalism
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

          {/* RICH CONTENT */}
          {article.content_html ? (
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: article.content_html }}
            />
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
            <ArticleComments articleId={article.id} />
          )}
        </div>
      </section>

      {/* PROSE STYLES for rendered rich content */}
      <style>{`
        .article-prose {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 1.05rem;
          line-height: 1.88;
          color: #1c1c1c;
        }
        .article-prose h2 {
          font-size: 1.6rem; font-weight: 400;
          margin: 2rem 0 0.85rem; color: var(--ink);
          letter-spacing: -0.01em;
        }
        .article-prose h3 {
          font-size: 1.2rem; font-weight: 400;
          margin: 1.75rem 0 0.75rem; color: var(--ink);
        }
        .article-prose p { margin-bottom: 1.25rem; }
        .article-prose strong { color: var(--ink); font-weight: 600; }
        .article-prose em { color: #3a3a3a; }
        .article-prose ul, .article-prose ol {
          padding-left: 1.5rem; margin-bottom: 1.25rem;
        }
        .article-prose li { margin-bottom: 0.4rem; }
        .article-prose blockquote {
          border-left: 3px solid var(--gold);
          margin: 1.75rem 0; padding: 0.5rem 0 0.5rem 1.5rem;
          color: #3a3a3a; font-style: italic; font-size: 1.08rem;
        }
        .article-prose code {
          background: rgba(0,0,0,0.06); padding: 0.1rem 0.35rem;
          border-radius: 2px; font-family: monospace; font-size: 0.88em;
        }
        .article-prose pre {
          background: #1a1a1a; color: rgba(255,255,255,0.85);
          border-radius: 3px; padding: 1.25rem; margin-bottom: 1.25rem;
          overflow-x: auto;
        }
        .article-prose pre code { background: none; padding: 0; color: inherit; }
        .article-prose hr {
          border: none; border-top: 1px solid rgba(0,0,0,0.1);
          margin: 2rem 0;
        }
        .article-prose img {
          max-width: 100%; height: auto; border-radius: 3px;
          margin: 1.5rem 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  )
}
