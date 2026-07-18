import type { Metadata } from 'next'
import ArticleCard from '@/components/journalism/ArticleCard'
import CategoryExpand from '@/components/journalism/CategoryExpand'
import { getAllArticles } from '@/lib/data/articles'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Journalism',
  description: 'Articles and reflections by E. Randolph Richards on Scripture, culture, and everyday faith.',
}

export default async function JournalismPage() {
  const articles = await getAllArticles()

  return (
    <>
      {/* HERO — parallax */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/assets/images/articles/screen-shot-2020-05-07-at-3.34.10-pm.png')",
          minHeight: '55vh',
        }}
      >
        <div className="container-wide" style={{ zIndex: 2, textAlign: 'center' }}>
          <p style={{
            fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(15,92,115,0.9)', fontFamily: '"Inter", sans-serif', marginBottom: '1.25rem',
          }}>
            Journalism
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
            {articles.length} pieces across four categories.
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

      {/* RECENT ARTICLES */}
      <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,6rem) 0' }}>
        <div className="container-wide">
          <div className="rule-line" style={{ marginBottom: '1.25rem' }} />
          <h2 style={{
            fontFamily: '"Playfair Display", serif', fontSize: '1.6rem',
            fontWeight: 400, marginBottom: '2.5rem', color: '#1c1a17',
          }}>
            Recent additions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}>
            {articles.slice(0, 12).map((article) => (
              <ArticleCard key={article.id} article={article as any} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
