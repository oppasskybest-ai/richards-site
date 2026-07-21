import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClientImage from '@/components/ui/ClientImage'
import { getAllBooks, getAllBookSlugs, getBook } from '@/lib/data/books'
import QuoteDisplay from '@/components/books/QuoteDisplay'
import GoodreadsRating from '@/components/books/GoodreadsRating'
import BookReviews from '@/components/books/BookReviews'
import { getGoodreadsBooks, matchBookToGoodreads } from '@/lib/rss/parseGoodreads'

export const revalidate = 60

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllBookSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const book = await getBook(slug)
  if (!book) return {}
  return {
    title: book.title,
    description: book.description.slice(0, 160),
    openGraph: {
      title: book.title,
      description: book.description.slice(0, 160),
      images: [book.coverImage],
    },
  }
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params
  const book = await getBook(slug)
  if (!book) notFound()

  const allBooks = await getAllBooks()
  const otherBooks = allBooks.filter((b) => b.slug !== book.slug).slice(0, 4)

  // Goodreads live rating — silently returns null if ID not yet configured
  const goodreadsBooks = await getGoodreadsBooks()
  const goodreadsMatch = matchBookToGoodreads(goodreadsBooks, book.title)

  // JSON-LD structured data — helps Google show rich results (cover, author, rating) in search.
  // IMPORTANT: for role === 'foreword', Randy is NOT the author — misattributing
  // authorship in structured data would misrepresent someone else's book.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    ...(book.role === 'foreword'
      ? { author: { '@type': 'Person', name: book.authorsLine?.replace(/^by\s+/i, '').split('—')[0].trim() || 'Unknown' },
          contributor: { '@type': 'Person', name: 'E. Randolph Richards', description: 'Foreword' } }
      : { author: { '@type': 'Person', name: 'E. Randolph Richards' } }),
    datePublished: book.year,
    description: book.description.slice(0, 500),
    image: `https://randolphrichards.com${book.coverImage}`,
    ...(book.buyUrl ? { offers: { '@type': 'Offer', url: book.buyUrl, availability: 'https://schema.org/InStock' } } : {}),
    ...(book.quotes && book.quotes.length > 0
      ? {
          review: book.quotes.slice(0, 5).map((q) => ({
            '@type': 'Review',
            reviewBody: q.quote.slice(0, 400),
            author: { '@type': 'Person', name: q.attribution },
          })),
        }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HERO — full viewport, book cover as background ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        paddingTop: 'var(--nav-height)',
        backgroundImage: `url('${book.coverImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* DARK OVERLAY */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.92) 100%)',
          zIndex: 0,
        }} />

        <div className="container-wide" style={{
          position: 'relative', zIndex: 1,
          display: 'flex', gap: '3rem',
          alignItems: 'flex-end', flexWrap: 'wrap',
          paddingBottom: '5rem',
        }}>
          {/* FLOATING COVER */}
          <div style={{ flexShrink: 0, lineHeight: 0 }}>
            <div style={{
              width: '180px',
              borderRadius: '3px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            }}>
              <ClientImage
                src={book.coverImage}
                alt={book.title}
                width={180} height={270}
                style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* TITLE BLOCK */}
          <div style={{ flex: 1, minWidth: '260px' }}>
            <p style={{
              fontSize: '0.65rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(var(--gold-rgb),0.9)',
              fontFamily: '"Inter", sans-serif', marginBottom: '0.75rem',
            }}>
              {book.year}
            </p>
            {book.role === 'foreword' && (
              <span style={{ display: 'inline-block', fontSize: '0.6rem', color: 'white', background: '#a8402f', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.7rem', marginBottom: '0.9rem', borderRadius: '2px' }}>
                Foreword only — not one of Randy&rsquo;s own books
              </span>
            )}
            {book.role === 'translation' && (
              <span style={{ display: 'inline-block', fontSize: '0.6rem', color: 'white', background: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.7rem', marginBottom: '0.9rem', borderRadius: '2px' }}>
                Translated edition
              </span>
            )}
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
              fontWeight: 400, color: 'white',
              lineHeight: 1.05, marginBottom: '0.75rem',
              letterSpacing: '-0.01em',
            }}>
              {book.title}
            </h1>
            {book.authorsLine && (
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                {book.authorsLine}
              </p>
            )}
            {book.subtitle && (
              <p style={{
                fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.5, fontStyle: 'italic',
                marginBottom: '2.5rem', maxWidth: '520px',
              }}>
                {book.subtitle}
              </p>
            )}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {book.buyUrl && (
                <a
                  href={book.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.9rem 2.25rem',
                    background: 'var(--gold)', color: 'white',
                    fontSize: '0.7rem', letterSpacing: '0.12em',
                    textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
                    fontWeight: 500, borderRadius: '2px', display: 'inline-block',
                    textDecoration: 'none',
                  }}
                >
                  Buy on Amazon ↗
                </a>
              )}
              <Link
                href="/books"
                style={{
                  padding: '0.9rem 2.25rem',
                  background: 'transparent', color: 'rgba(255,255,255,0.65)',
                  fontSize: '0.7rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
                  fontWeight: 400, borderRadius: '2px', display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.25)',
                  textDecoration: 'none',
                }}
              >
                ← All Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY — paper section ── */}
      <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,6rem) 0' }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '5rem', alignItems: 'start',
          }} className="book-body-grid">

            {/* MAIN CONTENT */}
            <div>
              <div className="rule-line" style={{ marginBottom: '1.5rem' }} />
              <p style={{
                fontSize: '1.05rem', lineHeight: 1.88, color: '#1c1c1c',
                marginBottom: '2.5rem',
                fontFamily: '"Playfair Display", serif', fontWeight: 400,
              }}>
                {book.description}
              </p>
              <h2 style={{
                fontFamily: '"Playfair Display", serif', fontSize: '1.4rem',
                fontWeight: 400, marginBottom: '1.5rem', color: 'var(--ink)',
              }}>
                What people said
              </h2>
              {book.quotes.map((q, i) => (
                <QuoteDisplay key={i} quote={q.quote} attribution={q.attribution} />
              ))}

              {/* GOODREADS LIVE RATING — shows once author ID is configured in parseGoodreads.ts */}
              {goodreadsMatch && (
                <div style={{ marginTop: '2rem' }}>
                  <GoodreadsRating book={goodreadsMatch} />
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div>
              <div style={{
                background: 'white', border: '1px solid rgba(0,0,0,0.08)',
                padding: '1.75rem', borderRadius: '2px', marginBottom: '1.5rem',
              }}>
                <p style={{
                  fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginBottom: '1.25rem',
                }}>
                  Get the Book
                </p>
                {book.buyUrl ? (
                  <a
                    href={book.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block', padding: '0.85rem', background: 'var(--ink)',
                      color: 'white', textAlign: 'center', fontSize: '0.7rem',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      fontFamily: '"Inter", sans-serif', fontWeight: 500,
                      borderRadius: '2px', textDecoration: 'none',
                    }}
                  >
                    Amazon ↗
                  </a>
                ) : (
                  <p style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.35)', fontStyle: 'italic' }}>
                    Buy link coming soon.
                  </p>
                )}
              </div>

              <div>
                <p style={{
                  fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginBottom: '1rem',
                }}>
                  Other Books
                </p>
                {otherBooks.map((ob) => (
                  <Link
                    key={ob.slug}
                    href={`/books/${ob.slug}`}
                    style={{
                      display: 'flex', gap: '0.9rem', marginBottom: '1rem',
                      textDecoration: 'none', alignItems: 'center',
                      padding: '0.75rem', border: '1px solid transparent',
                      borderRadius: '2px', transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      width: '44px', height: '62px', background: '#e8e4db',
                      overflow: 'hidden', borderRadius: '2px', flexShrink: 0,
                      position: 'relative',
                    }}>
                      <ClientImage src={ob.coverImage} alt={ob.title} fill sizes="44px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.3 }}>
                        {ob.title}
                      </p>
                      <p style={{ fontSize: '0.62rem', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginTop: '2px' }}>
                        {ob.year}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── READER REVIEWS — Amazon reviews seeded from OCR extraction ── */}
      <section style={{ background: '#f8f6f1', padding: 'clamp(3rem,6vw,5rem) 0' }}>
        <div className="container-wide" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,3rem)' }}>
          <BookReviews bookSlug={book.slug} />
        </div>
      </section>

      {/* ── CTA STRIP — book cover bg again ── */}
      <section style={{
        position: 'relative',
        padding: 'clamp(5rem,10vw,7rem) 0',
        textAlign: 'center',
        backgroundImage: `url('${book.coverImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.78)',
          zIndex: 0,
        }} />
        <div className="container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <div className="gold-divider" />
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 400, color: 'white',
            letterSpacing: '-0.01em', marginBottom: '1.5rem',
          }}>
            Ready to read {book.title}?
          </h2>
          {book.buyUrl && (
            <a
              href={book.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '1rem 2.5rem', fontSize: '0.72rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                fontFamily: '"Inter", sans-serif', fontWeight: 500,
                borderRadius: '2px', display: 'inline-block',
                background: 'var(--gold)', color: 'white', textDecoration: 'none',
              }}
            >
              Buy on Amazon ↗
            </a>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 700px) {
          .book-body-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
