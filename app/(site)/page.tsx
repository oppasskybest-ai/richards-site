import Link from 'next/link'
import ClientImage from '@/components/ui/ClientImage'
import SubscribeForm from '@/components/subscribe/SubscribeForm'
import HeroIntro from '@/components/home/HeroIntro'
import ScrollReveal from '@/components/home/ScrollReveal'
import HomepageReviews from '@/components/home/HomepageReviews'
import { BOOKS } from '@/lib/config/books'
import { getFeaturedArticles } from '@/lib/data/articles'
import { supabaseAdmin } from '@/lib/supabase/server'

// Static placeholder reviews — shown only until real approved reviews exist in Supabase.
// Replace with genuine endorsements/reader notes before launch.
const STATIC_REVIEWS = [
  {
    id: '1',
    quote: 'Placeholder endorsement — replace with a real blurb or reader note via the admin.',
    name: 'Name',
    location: 'Affiliation',
    rating: 5,
    source: 'reader' as const,
    book_slug: null as string | null,
  },
]

async function getApprovedReviews() {
  try {
    // Fetch visitor-submitted reviews (homepage reviews table)
    const { data: visitorReviews } = await supabaseAdmin
      .from('reviews')
      .select('id, quote, name, location, rating, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(20)

    // Fetch Amazon book reviews (book_reviews table)
    const { data: bookReviews } = await supabaseAdmin
      .from('book_reviews')
      .select('id, reviewer, body, country, review_date, rating, book_slug')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(30)

    type NormalisedReview = {
      id: string
      quote: string
      name: string
      location: string
      rating: number
      source: 'reader' | 'amazon'
      book_slug: string | null
    }

    // Normalise both into the same shape
    const visitor: NormalisedReview[] = (visitorReviews || []).map(r => ({
      id: r.id,
      quote: r.quote,
      name: r.name,
      location: r.location || '',
      rating: r.rating || 5,
      source: 'reader' as const,
      book_slug: null,
    }))

    const amazon: NormalisedReview[] = (bookReviews || []).map(r => ({
      id: r.id,
      quote: r.body,
      name: r.reviewer,
      location: r.country || '',
      rating: r.rating || 5,
      source: 'amazon' as const,
      book_slug: r.book_slug,
    }))

    // Interleave: amazon and visitor reviews alternated so carousel is varied
    const merged: NormalisedReview[] = []
    const maxLen = Math.max(visitor.length, amazon.length)
    for (let i = 0; i < maxLen; i++) {
      if (amazon[i]) merged.push(amazon[i])
      if (visitor[i]) merged.push(visitor[i])
    }

    // Fall back to static placeholders if both tables are empty
    if (merged.length === 0) return STATIC_REVIEWS
    return merged
  } catch {
    return STATIC_REVIEWS
  }
}

export const revalidate = 60

export default async function HomePage() {
  const featuredArticles = await getFeaturedArticles(4)
  const topBooks = BOOKS.slice(0, 3)
  const reviews = await getApprovedReviews()

  return (
    <>
      {/* ── HERO — parallax bg with typewriter ── */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            "url('/assets/images/portraits/speaking-photo.jpg')",
        }}
      >
        {/* GRID TEXTURE OVERLAY */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        {/* GOLD GLOW */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            right: '-8%',
            width: '600px',
            height: '600px',
            background:
              'radial-gradient(circle, rgba(var(--gold-rgb),0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div
          className="container-wide"
          style={{ padding: '7rem clamp(1.25rem,5vw,4rem)', zIndex: 2 }}
        >
          <HeroIntro />
        </div>

        {/* SCROLL INDICATOR */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: '1px',
              height: '56px',
              background: 'rgba(var(--gold-rgb),0.25)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              className="scroll-line-animate"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(var(--gold-rgb),0.6)',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ── ABOUT STRIP — white section ── */}
      <section
        style={{
          background: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          padding: 'clamp(4rem,8vw,6rem) 0',
        }}
      >
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 'clamp(2rem,6vw,5rem)',
              alignItems: 'center',
            }}
            className="about-bio-grid"
          >
            <div>
              <ScrollReveal>
                <div className="rule-line" style={{ marginBottom: '1.5rem' }} />
                <h2
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 400,
                    marginBottom: '1.25rem',
                    color: 'var(--ink)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  The point of this site
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p
                  style={{
                    color: '#3a3a3a',
                    lineHeight: 1.85,
                    marginBottom: '1.1rem',
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                    maxWidth: '600px',
                  }}
                >
                  I&apos;ve been teaching the New Testament since 1986 — in
                  Texas, in Indonesia, in Arkansas, and now at Palm Beach
                  Atlantic University in Florida.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p
                  style={{
                    color: '#3a3a3a',
                    lineHeight: 1.85,
                    marginBottom: '1.75rem',
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                    maxWidth: '600px',
                  }}
                >
                  I&apos;ve written a handful of books, including{' '}
                  <em>Misreading Scripture with Western Eyes</em> and{' '}
                  <em>Rediscovering Paul</em>, and I still love teaching
                  students how to read Scripture a little more like its
                  first readers would have. This site is where I keep the
                  books, the articles, and the occasional podcast
                  conversation.
                </p>
                <Link
                  href="/about"
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  More about Randy →
                </Link>
              </ScrollReveal>
            </div>

            {/* PORTRAIT */}
            <ScrollReveal>
              <div
                className="img-reveal"
                style={{
                  width: 'clamp(180px,20vw,260px)',
                  height: 'clamp(230px,26vw,340px)',
                  background: '#e8e4db',
                  borderRadius: '3px',
                  boxShadow: '12px 20px 60px rgba(0,0,0,0.15)',
                  flexShrink: 0,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <ClientImage
                  src="/assets/images/portraits/speaking-photo.jpg"
                  alt="E. Randolph Richards"
                  fill
                  style={{ objectFit: 'cover', borderRadius: '3px' }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── RECENT WORK — parallax dark bg ── */}
      <section
        className="section-bg-image"
        style={{
          backgroundImage:
            "url('/assets/images/portraits/grandkids-2025.jpg')",
          padding: 'clamp(5rem,10vw,7rem) 0',
        }}
      >
        <div className="container-wide">
          <ScrollReveal>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '3rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div
                  className="rule-line"
                  style={{ marginBottom: '1.1rem' }}
                />
                <h2
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    color: 'white',
                  }}
                >
                  Recent Work
                </h2>
              </div>
              <Link
                href="/articles"
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 500,
                }}
              >
                Full Archive →
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(1.5rem,3vw,2.5rem)',
              }}
            >
              {featuredArticles.slice(0, 6).map((article) => {
                const href = article.content_type === 'native' && article.slug
                  ? `/articles/${article.category}/${article.slug}`
                  : (article.url || '#')
                return (
                  <Link
                    key={article.id}
                    href={href}
                    style={{
                      display: 'block',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s ease, background 0.2s ease',
                    }}
                    className="recent-work-card"
                  >
                    <div style={{ position: 'relative', aspectRatio: '16/10', background: 'rgba(0,0,0,0.3)' }}>
                      {article.image ? (
                        <ClientImage src={article.image} alt={article.title} fill sizes="(max-width: 700px) 100vw, 30vw" style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, hsl(${(article.title.charCodeAt(0) * 7) % 360}, 35%, 22%), hsl(${(article.title.charCodeAt(0) * 7 + 60) % 360}, 40%, 16%))` }} />
                      )}
                    </div>
                    <div style={{ padding: '1.35rem 1.5rem' }}>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginBottom: '0.65rem' }}>
                        {article.date ? new Date(article.date).getFullYear() : ''}
                      </p>
                      <h3 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: '1.05rem', lineHeight: 1.32, color: 'white' }}>
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
            <style>{`
              .recent-work-card:hover { border-color: rgba(var(--gold-rgb),0.45) !important; background: rgba(255,255,255,0.07) !important; }
            `}</style>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BOOKS — dark section with own bg ── */}
      <section
        className="section-bg-image"
        style={{
          backgroundImage:
            "url('/assets/images/portraits/napkins-that-started-individualist-eyes.jpg')",
          padding: 'clamp(5rem,10vw,7rem) 0',
        }}
      >
        {/* TOP RULE */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.4), transparent)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-wide">
          <ScrollReveal>
            <div style={{ marginBottom: '3.5rem' }}>
              <div
                className="rule-line"
                style={{ marginBottom: '1.1rem' }}
              />
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight: 400,
                  color: 'white',
                  letterSpacing: '-0.01em',
                }}
              >
                The Books
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%,300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3.5rem',
            }}
          >
            {topBooks.map((book, i) => (
              <ScrollReveal key={book.slug} delay={i * 120}>
                <Link
                  href={`/books/${book.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    className="book-card-hover"
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      alignItems: 'flex-start',
                      padding: '1.75rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: '3px',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <div style={{ flexShrink: 0 }}>
                      <div
                        className="img-reveal"
                        style={{
                          width: '80px',
                          height: '112px',
                          background: '#2a2a2a',
                          borderRadius: '2px',
                          overflow: 'hidden',
                          boxShadow: '4px 8px 24px rgba(0,0,0,0.4)',
                        }}
                      >
                        <ClientImage
                          src={book.coverImage}
                          alt={book.title}
                          width={80}
                          height={112}
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: '0.62rem',
                          color: 'rgba(var(--gold-rgb),0.75)',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          fontFamily: '"Inter", sans-serif',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {book.year}
                      </p>
                      <h3
                        style={{
                          fontFamily: '"Playfair Display", serif',
                          fontSize: '1.1rem',
                          fontWeight: 400,
                          color: 'white',
                          lineHeight: 1.25,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {book.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: 'rgba(255,255,255,0.38)',
                          lineHeight: 1.55,
                          fontStyle: 'italic',
                        }}
                      >
                        {book.subtitle?.slice(0, 72)}
                        {(book.subtitle?.length ?? 0) > 72 ? '…' : ''}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <Link
              href="/books"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
              }}
            >
              All {BOOKS.length} Books →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── REVIEWS — dark parallax bg ── */}
      <section
        className="section-bg-image"
        style={{
          backgroundImage:
            "url('/assets/images/portraits/img_1958.jpg')",
          padding: 'clamp(5rem,10vw,7rem) 0',
        }}
      >
        <div className="container-wide">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p
                style={{
                  color: 'var(--gold)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontFamily: '"Inter", sans-serif',
                  marginBottom: '1rem',
                }}
              >
                Reader Reviews
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight: 400,
                  color: 'white',
                  letterSpacing: '-0.01em',
                  marginBottom: '1rem',
                }}
              >
                What Readers Are Saying
              </h2>
              <div className="gold-divider" />
            </div>
          </ScrollReveal>
          <HomepageReviews reviews={reviews} />
        </div>
      </section>

      {/* ── SUBSCRIBE — paper bg ── */}
      <section
        id="subscribe"
        style={{
          background: 'var(--paper)',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          padding: 'clamp(4rem,8vw,6rem) 0',
          scrollMarginTop: 'var(--nav-height)',
        }}
      >
        <ScrollReveal>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <div
              className="rule-line"
              style={{ margin: '0 auto 1.5rem' }}
            />
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 400,
                marginBottom: '0.9rem',
                letterSpacing: '-0.01em',
              }}
            >
              Stay in touch
            </h2>
            <p
              style={{
                color: '#6b6b6b',
                fontSize: 'clamp(0.92rem, 1.3vw, 1rem)',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
                maxWidth: '480px',
                margin: '0 auto 2.5rem',
              }}
            >
              When I publish something new — an article, a new book,
              a podcast conversation — you&apos;ll hear about it.
            </p>
            <div style={{ maxWidth: '520px', margin: '0 auto' }}>
              <SubscribeForm />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
