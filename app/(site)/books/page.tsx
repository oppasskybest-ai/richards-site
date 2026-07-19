import type { Metadata } from 'next'
import Link from 'next/link'
import ClientImage from '@/components/ui/ClientImage'
import { getAllBooks } from '@/lib/data/books'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'The Books',
  description: 'Books by E. Randolph Richards: Misreading Scripture with Western Eyes, Rediscovering Paul, Rediscovering Jesus, and A Little Book for New Biblical Scholars.',
}

export default async function BooksPage() {
  const ALL = await getAllBooks()
  // Main authored, finished books -> the big parallax showcase below.
  const mainBooks = ALL.filter((b) => b.role !== 'foreword' && b.role !== 'translation' && !b.workingOn)
  // Forthcoming / under contract -> "Books I'm Working On" section.
  const workingOnBooks = ALL.filter((b) => b.workingOn)
  // He didn't write these -- foreword, or a translated edition of his own
  // book -- so they're shown separately and clearly labeled, never mixed
  // in with his authored work.
  const otherEditions = ALL.filter((b) => b.role === 'foreword' || b.role === 'translation')
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'var(--nav-height)',
        backgroundImage: "url('/assets/images/books/the-firm.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.82) 100%)',
          zIndex: 0,
        }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{
            fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(var(--gold-rgb),0.9)', fontFamily: '"Inter", sans-serif', marginBottom: '1.25rem',
          }}>
            The Books
          </p>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 400, color: 'white',
            lineHeight: 1.06, letterSpacing: '-0.02em',
          }}>
            {mainBooks.length} books.<br />
            <span style={{ color: 'rgba(255,255,255,0.42)', fontStyle: 'italic' }}>One writer.</span>
          </h1>
          <div style={{ width: '48px', height: '2px', background: 'var(--gold)', margin: '1.5rem auto' }} />
        </div>
      </section>

      {/* ── EACH BOOK AS ITS OWN PARALLAX SECTION ── */}
      {mainBooks.map((book) => (
        <section
          key={book.slug}
          style={{
            position: 'relative',
            backgroundImage: `url('${book.coverImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* OVERLAY */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.4) 100%)',
            zIndex: 0,
          }} />

          <div className="container-wide" style={{
            position: 'relative', zIndex: 1,
            display: 'flex', gap: 'clamp(2.5rem,6vw,5rem)',
            alignItems: 'center', flexWrap: 'wrap',
            padding: 'clamp(5rem,10vw,7rem) clamp(1.25rem,5vw,4rem)',
          }}>
            {/* COVER — floating card */}
            <div style={{ flexShrink: 0 }}>
              <Link href={`/books/${book.slug}`}>
                <div style={{
                  width: 'clamp(140px,16vw,220px)',
                  borderRadius: '3px', overflow: 'hidden', lineHeight: 0,
                  boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
                  transition: 'transform 0.3s ease',
                }}>
                  <ClientImage
                    src={book.coverImage}
                    alt={book.title}
                    width={220} height={330}
                    style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </Link>
            </div>

            {/* INFO */}
            <div style={{ flex: 1, minWidth: '260px' }}>
              <p style={{
                fontSize: '0.65rem', color: 'rgba(var(--gold-rgb),0.9)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: '"Inter", sans-serif', marginBottom: '0.75rem',
              }}>
                {book.year}
              </p>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 400, color: 'white',
                lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '0.6rem',
              }}>
                {book.title}
              </h2>
              {book.subtitle && (
                <p style={{
                  fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
                  color: 'rgba(255,255,255,0.5)',
                  fontStyle: 'italic', lineHeight: 1.55, marginBottom: '1.75rem',
                  maxWidth: '520px',
                }}>
                  {book.subtitle}
                </p>
              )}
              <p style={{
                lineHeight: 1.85, color: 'rgba(255,255,255,0.72)',
                marginBottom: '2rem', maxWidth: '540px',
                fontSize: 'clamp(0.92rem, 1.15vw, 1rem)',
              }}>
                {book.description.slice(0, 220)}{book.description.length > 220 ? '…' : ''}
              </p>

              {/* FIRST QUOTE */}
              {book.quotes[0] && (
                <div style={{
                  borderLeft: '2px solid rgba(var(--gold-rgb),0.6)',
                  paddingLeft: '1.25rem', marginBottom: '2rem',
                }}>
                  <p style={{
                    fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.7, fontStyle: 'italic',
                  }}>
                    &ldquo;{book.quotes[0].quote}&rdquo;
                  </p>
                  <p style={{
                    fontSize: '0.7rem', color: 'var(--gold)',
                    fontFamily: '"Inter", sans-serif', marginTop: '0.4rem',
                  }}>
                    — {book.quotes[0].attribution}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link
                  href={`/books/${book.slug}`}
                  style={{
                    padding: '0.9rem 2rem',
                    background: 'var(--gold)', color: 'white',
                    fontSize: '0.7rem', letterSpacing: '0.12em',
                    textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
                    fontWeight: 500, borderRadius: '2px', display: 'inline-block',
                    textDecoration: 'none',
                  }}
                >
                  About This Book
                </Link>
                <a
                  href={book.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.9rem 2rem',
                    background: 'transparent', color: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    fontSize: '0.7rem', letterSpacing: '0.12em',
                    textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
                    fontWeight: 400, borderRadius: '2px', display: book.buyUrl ? 'inline-block' : 'none',
                    textDecoration: 'none',
                  }}
                >
                  Buy on Amazon ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── BOOKS I'M WORKING ON ── matches the real site's separate /books-im-working-on/ page */}
      {workingOnBooks.length > 0 && (
        <section style={{ background: '#111', padding: 'clamp(4rem,8vw,6rem) 0' }}>
          <div className="container-wide">
            <p style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.75rem', textAlign: 'center' }}>
              In Progress
            </p>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 400, color: 'white', textAlign: 'center', marginBottom: '3rem' }}>
              Books I&rsquo;m Working On
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
              {workingOnBooks.map((book) => (
                <div key={book.slug} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem', display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: '80px', flexShrink: 0, borderRadius: '2px', overflow: 'hidden', lineHeight: 0 }}>
                    <ClientImage src={book.coverImage} alt={book.title} width={80} height={120} style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.4rem', fontFamily: '"Inter", sans-serif' }}>{book.year}</p>
                    <h3 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: '1.05rem', color: 'white', marginBottom: '0.4rem', lineHeight: 1.25 }}>{book.title}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{book.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER EDITIONS & CONTRIBUTIONS ── forewords + translations, clearly separate from his own authored books */}
      {otherEditions.length > 0 && (
        <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,6rem) 0' }}>
          <div className="container-wide">
            <p style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.75rem', textAlign: 'center' }}>
              Not His Own Books
            </p>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 400, color: 'var(--ink)', textAlign: 'center', marginBottom: '0.75rem' }}>
              Other Editions &amp; Contributions
            </h2>
            <p style={{ textAlign: 'center', color: '#6a6a6a', fontSize: '0.85rem', maxWidth: '480px', margin: '0 auto 3rem' }}>
              A foreword he wrote for someone else&rsquo;s book, and a foreign-language edition of one of his own.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
              {otherEditions.map((book) => (
                <div key={book.slug} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem', display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: '80px', flexShrink: 0, borderRadius: '2px', overflow: 'hidden', lineHeight: 0 }}>
                    <ClientImage src={book.coverImage} alt={book.title} width={80} height={120} style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div>
                    <span style={{ display: 'inline-block', fontSize: '0.58rem', color: 'white', background: book.role === 'foreword' ? '#a8402f' : '#0f5c73', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', marginBottom: '0.5rem', borderRadius: '2px' }}>
                      {book.role === 'foreword' ? 'Foreword only' : 'Translated edition'}
                    </span>
                    <h3 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '0.3rem', lineHeight: 1.25 }}>{book.title}</h3>
                    {book.authorsLine && (
                      <p style={{ fontSize: '0.78rem', color: '#7a7a7a', fontStyle: 'italic', marginBottom: '0.5rem' }}>{book.authorsLine}</p>
                    )}
                    {book.buyUrl && (
                      <a href={book.buyUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}>
                        View on Amazon →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CLOSING CTA ── */}
      <section style={{
        position: 'relative',
        padding: 'clamp(5rem,10vw,7rem) 0',
        textAlign: 'center',
        backgroundImage: "url('/assets/images/articles/unsplash-image-cl1vms3jlue.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.78)', zIndex: 0,
        }} />
        <div className="container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '1rem',
          }}>
            Stay in Touch
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 400, color: 'white',
            letterSpacing: '-0.01em', marginBottom: '0.75rem',
          }}>
            New work, when it arrives.
          </h2>
          <div style={{ width: '48px', height: '2px', background: 'var(--gold)', margin: '1.25rem auto' }} />
          <Link
            href="/#subscribe"
            style={{
              padding: '0.9rem 2.5rem',
              background: 'rgba(var(--gold-rgb),0.18)',
              border: '1px solid rgba(var(--gold-rgb),0.45)',
              color: 'var(--gold)',
              fontSize: '0.72rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
              fontWeight: 400, borderRadius: '2px', display: 'inline-block',
              marginTop: '1rem', textDecoration: 'none',
            }}
          >
            Subscribe →
          </Link>
        </div>
      </section>
    </>
  )
}
