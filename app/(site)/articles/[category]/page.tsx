import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClientImage from '@/components/ui/ClientImage'
import ArticleCard from '@/components/journalism/ArticleCard'
import CategoryFilter from '@/components/journalism/CategoryFilter'
import { getArticlesByCategory } from '@/lib/data/articles'
import { getAllBooks } from '@/lib/data/books'
import { CATEGORY_SLUGS, CATEGORY_LABELS, JournalismCategory } from '@/types/journalism'

export const revalidate = 60

interface Props { params: Promise<{ category: string }> }

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
    description: `Journalism by E. Randolph Richards — ${CATEGORY_LABELS[slug]}`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const slug = category as JournalismCategory
  if (!CATEGORY_SLUGS.includes(slug)) notFound()

  const [articles, allBooks] = await Promise.all([
    getArticlesByCategory(slug),
    getAllBooks(),
  ])
  const label = CATEGORY_LABELS[slug]
  const heroBg = CATEGORY_BG[slug] || '/assets/images/articles/unsplash-image-cl1vms3jlue.jpg'

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
            {articles.length} piece{articles.length !== 1 ? 's' : ''}
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

          {/* ARTICLES GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <p style={{ color: '#6b6b6b', fontSize: '0.9rem' }}>
                No articles in this category yet.
              </p>
            </div>
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
