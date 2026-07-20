import type { Metadata } from 'next'
import Link from 'next/link'
import ClientImage from '@/components/ui/ClientImage'
import CategoryExpand from '@/components/journalism/CategoryExpand'
import { getAllArticles } from '@/lib/data/articles'
import { formatYear } from '@/lib/utils/slugify'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles and reflections by E. Randolph Richards on Scripture, culture, and everyday faith.',
}

export default async function JournalismPage() {
  const articles = await getAllArticles()
  const [featured, ...rest] = articles
  const list = rest.slice(0, 9)

  return (
    <>
      {/* HERO — parallax */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/assets/images/portraits/speaking-photo.jpg')",
          minHeight: '55vh',
        }}
      >
        <div className="container-wide" style={{ zIndex: 2, textAlign: 'center' }}>
          <p style={{
            fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(var(--gold-rgb),0.9)', fontFamily: '"Inter", sans-serif', marginBottom: '1.25rem',
          }}>
            Articles
          </p>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 400, color: 'white',
            lineHeight: 1.08, letterSpacing: '-0.02em',
          }}>
            The Archive
          </h1>
          <div className="gold-divider" style={{ margin: '1.5rem auto' }} />
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
            lineHeight: 1.7, maxWidth: '480px', margin: '0 auto',
            fontFamily: '"Inter", sans-serif', fontWeight: 300,
          }}>
            {articles.length} pieces across two categories.
          </p>
        </div>
      </section>

      {/* INTERACTIVE CATEGORY SECTION */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(4rem,8vw,6rem) 0' }}>
        <div className="container-wide">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="rule-line" style={{ marginBottom: '1.25rem' }} />
            <p style={{
              color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem',
              fontFamily: '"Inter", sans-serif', fontWeight: 300,
              letterSpacing: '0.04em',
            }}>
              Hover a category to explore all pieces inside it.
            </p>
          </div>
          <CategoryExpand articles={articles as any} />
        </div>
      </section>

      {/* MOST RECENT — one large featured piece, editorial style, not a card */}
      {featured && (
        <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,5rem) 0 clamp(2rem,4vw,3rem)' }}>
          <div className="container-wide">
            <div className="rule-line" style={{ marginBottom: '1.25rem' }} />
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginBottom: '2rem' }}>
              Most Recent
            </p>
            <Link
              href={featured.content_type === 'native' && featured.slug ? `/articles/${featured.category}/${featured.slug}` : (featured.url || '#')}
              className="featured-article-link"
              style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '3px', background: 'var(--paper-dark)' }}>
                {featured.image ? (
                  <ClientImage src={featured.image} alt={featured.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, hsl(${(featured.title.charCodeAt(0) * 7) % 360}, 45%, 52%), hsl(${(featured.title.charCodeAt(0) * 7 + 60) % 360}, 55%, 42%))` }} />
                )}
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#999', fontFamily: '"Inter", sans-serif', marginBottom: '0.75rem' }}>
                  {formatYear(featured.date)}
                </p>
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1.2, color: 'var(--ink)', marginBottom: '1rem' }}>
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p style={{ color: '#6b6b6b', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                    {featured.excerpt}
                  </p>
                )}
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', fontWeight: 500 }}>
                  Read →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* MORE ARTICLES — tight list rows, not cards, so this reads distinct from every other card-grid page on the site */}
      <section style={{ background: '#f8f6f1', padding: '0 0 clamp(4rem,8vw,6rem)' }}>
        <div className="container-wide">
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.09)' }}>
            {list.map((article) => {
              const href = article.content_type === 'native' && article.slug
                ? `/articles/${article.category}/${article.slug}`
                : (article.url || '#')
              return (
                <Link
                  key={article.id}
                  href={href}
                  className="article-row-link"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '90px minmax(0,1fr) auto',
                    gap: '1.5rem',
                    alignItems: 'center',
                    padding: '1.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.09)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div style={{ position: 'relative', width: '90px', height: '68px', borderRadius: '2px', overflow: 'hidden', background: 'var(--paper-dark)', flexShrink: 0 }}>
                    {article.image ? (
                      <ClientImage src={article.image} alt={article.title} fill sizes="90px" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, hsl(${(article.title.charCodeAt(0) * 7) % 360}, 45%, 52%), hsl(${(article.title.charCodeAt(0) * 7 + 60) % 360}, 55%, 42%))` }} />
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: '1.05rem', lineHeight: 1.3, color: 'var(--ink)', marginBottom: '0.3rem' }}>
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p style={{ fontSize: '0.8rem', color: '#8a8a8a', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#999', fontFamily: '"Inter", sans-serif', whiteSpace: 'nowrap' }}>
                    {formatYear(article.date)}
                  </span>
                </Link>
              )
            })}
          </div>

          {articles.length > 10 && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/articles/bible-culture" className="btn-gold" style={{ padding: '0.9rem 2.5rem', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', fontWeight: 500, borderRadius: '2px', display: 'inline-block' }}>
                Browse All Categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
