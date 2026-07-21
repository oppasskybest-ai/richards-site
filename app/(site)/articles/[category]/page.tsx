import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClientImage from '@/components/ui/ClientImage'
import CategoryFilter from '@/components/journalism/CategoryFilter'
import { getArticlesByCategory } from '@/lib/data/articles'
import { getAllBooks } from '@/lib/data/books'
import { CATEGORY_SLUGS, CATEGORY_LABELS, JournalismCategory } from '@/types/journalism'

export const revalidate = 60

interface Props {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}

// Category intro paragraphs — exact text from the original randolphrichards.com
const CATEGORY_INTRO: Record<string, string> = {
  'bible-culture':
    "Most of what I write here comes back to one idea: the Bible was written in a time and culture very different from ours, and we quietly bring modern, Western assumptions to the text without realizing it.\n\nSome of these posts grew out of questions from students. Others are things I noticed while teaching a passage for the tenth or twentieth time and finally saw differently. None of it is meant to be the final word — just an invitation to read a little more carefully, a little more humbly.",
  'family-faith':
    "These posts are less about biblical scholarship and more about ordinary life — raising kids, losing people we love, and trying to actually live out what we say we believe. Faith that only works in a classroom or a commentary isn't much use to anyone.",
}

// Each category gets its own parallax bg
const CATEGORY_BG: Record<string, string> = {
  'bible-culture': '/assets/images/portraits/speaking-photo.jpg',
  'family-faith':  '/assets/images/portraits/grandkids-2025.jpg',
}

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((c) => ({ category: c }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const slug = category as JournalismCategory
  if (!CATEGORY_SLUGS.includes(slug)) return {}
  return {
    title: CATEGORY_LABELS[slug],
    description: `Articles by E. Randolph Richards — ${CATEGORY_LABELS[slug]}`,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const { page: pageParam } = await searchParams
  const slug = category as JournalismCategory
  if (!CATEGORY_SLUGS.includes(slug)) notFound()

  const PER_PAGE = 10
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10) || 1)

  const [allArticlesInCategory, allBooks] = await Promise.all([
    getArticlesByCategory(slug),
    getAllBooks(),
  ])

  const totalPages = Math.max(1, Math.ceil(allArticlesInCategory.length / PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const articles = allArticlesInCategory.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)
  const label = CATEGORY_LABELS[slug]
  const heroBg = CATEGORY_BG[slug] || '/assets/images/portraits/speaking-photo.jpg'

  const featuredBook =
    slug === 'bible-culture' ? allBooks.find((b) => b.slug === 'misreading-scripture-with-western-eyes')
    : null

  return (
    <>
      {/* ── HERO — parallax per category ── */}
      <section
        className="page-hero"
        style={{
          backgroundImage: `url('${heroBg}')`,
          minHeight: '55vh',
        }}
      >
        <div className="container-wide" style={{ zIndex: 2, textAlign: 'center' }}>
          <Link
            href="/articles"
            style={{
              fontSize: '0.62rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(var(--gold-rgb),0.7)',
              fontFamily: '"Inter", sans-serif', display: 'inline-block',
              marginBottom: '1.5rem',
            }}
          >
            ← Articles
          </Link>
          <h1
            className="animate-fade-up"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 400, color: 'white',
              lineHeight: 1.08, letterSpacing: '-0.02em',
            }}
          >
            {label}
          </h1>
          <div className="gold-divider" style={{ margin: '1.5rem auto' }} />
          <p style={{
            color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem',
            fontFamily: '"Inter", sans-serif', fontWeight: 300,
            letterSpacing: '0.06em',
          }}>
            {allArticlesInCategory.length} piece{allArticlesInCategory.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* ── ARTICLES — paper bg ── */}
      <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,6rem) 0' }}>
        <div className="container-wide">
          <CategoryFilter />

          {/* CATEGORY INTRO TEXT — exact from original site */}
          {CATEGORY_INTRO[slug] && (
            <div style={{
              marginBottom: '3rem',
              maxWidth: '720px',
            }}>
              {CATEGORY_INTRO[slug].split('\n\n').map((para, i) => (
                <div key={i}>
                  <p style={{
                    lineHeight: 1.9,
                    color: '#3a3a3a',
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                    marginBottom: '1.25rem',
                    textAlign: 'left',
                  }}>
                    {para}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* RELATED BOOK BANNER */}
          {featuredBook && (
            <div style={{
              background: 'white', border: '1px solid rgba(0,0,0,0.08)',
              borderLeft: '4px solid var(--gold)',
              padding: '1.75rem 2rem', marginBottom: '3.5rem',
              display: 'flex', gap: '2rem', alignItems: 'center',
              flexWrap: 'wrap', borderRadius: '0 2px 2px 0',
            }}>
              <div style={{
                width: '70px', height: '100px', background: '#e8e4db',
                overflow: 'hidden', flexShrink: 0, borderRadius: '2px', lineHeight: 0,
              }}>
                <ClientImage
                  src={featuredBook.coverImage}
                  alt={featuredBook.title}
                  width={70} height={100}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.16em',
                  textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.35rem',
                }}>
                  Related Book
                </p>
                <h3 style={{
                  fontFamily: '"Playfair Display", serif', fontSize: '1.1rem',
                  fontWeight: 400, color: 'var(--ink)', marginBottom: '0.35rem',
                }}>
                  {featuredBook.title}
                </h3>
                <p style={{
                  fontSize: '0.8rem', color: '#6b6b6b', lineHeight: 1.6,
                  maxWidth: '500px', marginBottom: '0.75rem',
                }}>
                  {featuredBook.description.slice(0, 160)}…
                </p>
                <Link
                  href={`/books/${featuredBook.slug}`}
                  style={{
                    fontSize: '0.65rem', letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'var(--gold)',
                    fontFamily: '"Inter", sans-serif', fontWeight: 500,
                  }}
                >
                  About This Book →
                </Link>
              </div>
            </div>
          )}

          {/* ARTICLES — alternating zigzag spreads, not a card grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem,5vw,3.5rem)' }}>
            {articles.map((article, i) => {
              const href = article.content_type === 'native' && article.slug
                ? `/articles/${article.category}/${article.slug}`
                : (article.url || '#')
              const reversed = i % 2 === 1
              return (
                <Link
                  key={article.id}
                  href={href}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)',
                    gap: 'clamp(1.5rem,4vw,3rem)',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    paddingBottom: 'clamp(2.5rem,5vw,3.5rem)',
                    borderBottom: i < articles.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                  }}
                  className="category-article-row"
                >
                  <div
                    style={{
                      position: 'relative', aspectRatio: '5/4', overflow: 'hidden',
                      borderRadius: '3px', background: 'var(--paper-dark)',
                      order: reversed ? 2 : 1,
                    }}
                  >
                    {article.image ? (
                      <ClientImage src={article.image} alt={article.title} fill sizes="(max-width: 700px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, hsl(${(article.title.charCodeAt(0) * 7) % 360}, 45%, 52%), hsl(${(article.title.charCodeAt(0) * 7 + 60) % 360}, 55%, 42%))` }} />
                    )}
                  </div>
                  <div style={{ order: reversed ? 1 : 2 }}>
                    <p style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginBottom: '0.75rem' }}>
                      {article.date ? new Date(article.date).getFullYear() : ''}
                    </p>
                    <h3 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: 'clamp(1.2rem,2.2vw,1.6rem)', lineHeight: 1.28, color: 'var(--ink)', marginBottom: '0.85rem' }}>
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p style={{ fontSize: '0.9rem', color: '#6b6b6b', lineHeight: 1.75, marginBottom: '1rem' }}>
                        {article.excerpt}
                      </p>
                    )}
                    <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', fontFamily: '"Inter", sans-serif', fontWeight: 500, borderBottom: '1px solid var(--gold)', paddingBottom: '2px' }}>
                      Read the piece
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <style>{`
            @media (max-width: 700px) {
              .category-article-row { grid-template-columns: 1fr !important; }
              .category-article-row > div { order: 1 !important; }
            }
          `}</style>

          {allArticlesInCategory.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <p style={{ color: '#6b6b6b', fontSize: '0.9rem' }}>
                No articles in this category yet.
              </p>
            </div>
          )}

          {/* PAGINATION — 10 per page, real prev/next + page numbers,
              instead of the whole category growing on one endless page */}
          {totalPages > 1 && (
            <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
              <Link
                href={safePage > 1 ? `/articles/${slug}?page=${safePage - 1}` : `/articles/${slug}?page=${safePage}`}
                aria-disabled={safePage === 1}
                style={{
                  padding: '0.6rem 1.1rem', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: '"Inter", sans-serif', textDecoration: 'none',
                  color: safePage === 1 ? '#ccc' : 'var(--ink)',
                  border: '1px solid rgba(0,0,0,0.12)', borderRadius: '2px',
                  pointerEvents: safePage === 1 ? 'none' : 'auto',
                }}
              >
                ← Prev
              </Link>

              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1
                return (
                  <Link
                    key={n}
                    href={`/articles/${slug}?page=${n}`}
                    style={{
                      width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontFamily: '"Inter", sans-serif', textDecoration: 'none',
                      color: n === safePage ? 'white' : 'var(--ink)',
                      background: n === safePage ? 'var(--gold)' : 'transparent',
                      border: n === safePage ? 'none' : '1px solid rgba(0,0,0,0.12)',
                      borderRadius: '2px',
                    }}
                  >
                    {n}
                  </Link>
                )
              })}

              <Link
                href={safePage < totalPages ? `/articles/${slug}?page=${safePage + 1}` : `/articles/${slug}?page=${safePage}`}
                aria-disabled={safePage === totalPages}
                style={{
                  padding: '0.6rem 1.1rem', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: '"Inter", sans-serif', textDecoration: 'none',
                  color: safePage === totalPages ? '#ccc' : 'var(--ink)',
                  border: '1px solid rgba(0,0,0,0.12)', borderRadius: '2px',
                  pointerEvents: safePage === totalPages ? 'none' : 'auto',
                }}
              >
                Next →
              </Link>
            </nav>
          )}
        </div>
      </section>

      {/* ── CTA STRIP — parallax ── */}
      <section
        className="section-bg-image"
        style={{
          backgroundImage: `url('${heroBg}')`,
          padding: 'clamp(4rem,8vw,6rem) 0',
          textAlign: 'center',
        }}
      >
        <div className="container-narrow">
          <div className="gold-divider" />
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            fontWeight: 400, color: 'white',
            letterSpacing: '-0.01em', marginBottom: '1.5rem',
          }}>
            Explore the full archive
          </h2>
          <Link
            href="/articles"
            style={{
              padding: '0.9rem 2.5rem',
              background: 'transparent',
              color: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(255,255,255,0.3)',
              fontSize: '0.72rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
              fontWeight: 400, borderRadius: '2px', display: 'inline-block',
            }}
          >
            All Categories →
          </Link>
        </div>
      </section>
    </>
  )
}
