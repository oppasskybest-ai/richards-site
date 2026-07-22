import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/home/ScrollReveal'
import { supabaseAdmin } from '@/lib/supabase/server'
import { STATIC_REVIEWS } from '@/lib/config/reviews'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Endorsements',
  description:
    'What readers, students, and colleagues are saying about the books of E. Randolph Richards.',
}

type Review = {
  id: string; quote: string; name: string; location: string
  rating: number; source: 'reader' | 'amazon'; book_slug: string | null
}

// Real endorsements, pulled word-for-word from randolphrichards.com/endorsements/.
// Defined in lib/config/reviews.ts (also used by /api/admin/seed to migrate
// these into Supabase so they're editable from /admin/reviews instead of
// only ever showing as read-only fallback text).
const FALLBACK: Review[] = STATIC_REVIEWS.map((r) => ({ ...r, source: 'reader' as const, book_slug: null }))

async function getAllReviews(): Promise<Review[]> {
  try {
    const [{ data: v }, { data: b }] = await Promise.all([
      supabaseAdmin.from('reviews').select('id,quote,name,location,rating').eq('status','approved').order('created_at',{ascending:false}),
      supabaseAdmin.from('book_reviews').select('id,reviewer,body,country,rating,book_slug').eq('status','approved').order('created_at',{ascending:false}),
    ])
    const visitor: Review[] = (v||[]).map(r => ({ id:r.id, quote:r.quote, name:r.name, location:r.location||'', rating:r.rating||5, source:'reader' as const, book_slug:null }))
    const amazon: Review[] = (b||[]).map(r => ({ id:r.id, quote:r.body, name:r.reviewer, location:r.country||'', rating:r.rating||5, source:'amazon' as const, book_slug:r.book_slug }))

    // Merge the static endorsements in by quote text rather than an
    // all-or-nothing swap -- once these are seeded into Supabase they'll
    // naturally show up in `visitor` and get deduped out here; until then
    // (or if Supabase is briefly unreachable) they still show rather than
    // the whole endorsements page going empty.
    const knownQuotes = new Set([...visitor, ...amazon].map(r => r.quote))
    const missingStatic = FALLBACK.filter(r => !knownQuotes.has(r.quote))

    const merged: Review[] = []
    const max = Math.max(visitor.length, amazon.length)
    for (let i = 0; i < max; i++) {
      if (amazon[i]) merged.push(amazon[i])
      if (visitor[i]) merged.push(visitor[i])
    }
    return [...merged, ...missingStatic]
  } catch { return FALLBACK }
}

export default async function ReviewsPage() {
  const reviews = await getAllReviews()
  return (
    <>
      {/* HERO — parallax */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            "url('/assets/images/portraits/speaking-photo.jpg')",
          minHeight: '55vh',
        }}
      >
        <div
          className="container-wide"
          style={{ zIndex: 2, textAlign: 'center' }}
        >
          <p
            className="animate-fade-in"
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(var(--gold-rgb),0.9)',
              fontFamily: '"Inter", sans-serif',
              marginBottom: '1.25rem',
            }}
          >
            Endorsements
          </p>
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 400,
              color: 'white',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            What People Are Saying
          </h1>
          <div
            className="gold-divider"
            style={{ margin: '1.5rem auto' }}
          />
          <p
            className="animate-fade-up delay-200"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontStyle: 'italic',
            }}
          >
            Words from readers, students, and colleagues.
          </p>
        </div>
      </section>

      {/* REVIEWS GRID — purpose-built for this light page (the dark-mode
          homepage carousel component was being reused here before, which is
          why the text was nearly invisible: white-on-cream, not white-on-dark) */}
      <section style={{ padding: 'clamp(5rem,10vw,7rem) 0', background: 'var(--paper)' }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}>
            {reviews.map((r, i) => (
              <ScrollReveal key={r.id} delay={i * 60}>
                <div style={{
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderTop: '3px solid var(--gold)',
                  padding: 'clamp(1.75rem,3vw,2.25rem)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                }}>
                  <span style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '3rem',
                    lineHeight: 1,
                    color: 'rgba(var(--gold-rgb),0.25)',
                    marginBottom: '0.5rem',
                  }}>
                    &ldquo;
                  </span>
                  <div style={{ marginBottom: '0.9rem' }}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} style={{ fontSize: '0.85rem', color: s < r.rating ? 'var(--gold)' : 'rgba(0,0,0,0.12)' }}>★</span>
                    ))}
                  </div>
                  <p style={{
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    fontSize: '1.02rem',
                    lineHeight: 1.7,
                    color: 'var(--ink)',
                    marginBottom: '1.5rem',
                    flex: 1,
                  }}>
                    {r.quote}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                      background: `hsl(${r.name.charCodeAt(0) * 11 % 360}, 42%, 40%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: '0.75rem', fontWeight: 600, fontFamily: '"Inter", sans-serif',
                    }}>
                      {r.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '0.85rem', color: 'var(--ink)', margin: 0 }}>
                        {r.name}
                      </p>
                      {r.location && (
                        <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.72rem', color: '#999', margin: 0 }}>
                          {r.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: 'var(--paper)',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          padding: 'clamp(4rem,8vw,5.5rem) 0',
          textAlign: 'center',
        }}
      >
        <div className="container-narrow">
          <div className="rule-line" style={{ margin: '0 auto 1.5rem' }} />
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 400,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            Explore the Books
          </h2>
          <p
            style={{
              color: '#6b6b6b',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              marginBottom: '2.25rem',
              maxWidth: '420px',
              margin: '0 auto 2.25rem',
            }}
          >
            Misreading Scripture with Western Eyes, Rediscovering Paul, and more.
          </p>
          <Link
            href="/books"
            className="btn-gold"
            style={{
              padding: '0.9rem 2.5rem',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              borderRadius: '2px',
              display: 'inline-block',
            }}
          >
            View All Books
          </Link>
        </div>
      </section>
    </>
  )
}
