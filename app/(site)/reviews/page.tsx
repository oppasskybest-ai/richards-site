import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/home/ScrollReveal'
import HomepageReviews from '@/components/home/HomepageReviews'
import { supabaseAdmin } from '@/lib/supabase/server'

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

// Placeholder only — replace with Randy's real endorsements/blurbs (from back
// covers or his publisher's page) via the admin, or wire this table up to
// pull genuine reader-submitted notes. Do not publish these as-is.
const FALLBACK: Review[] = [
  { id: '1', quote: 'Placeholder endorsement — add a real blurb from the back cover or a colleague here.', name: 'Name', location: 'Affiliation', rating: 5, source: 'reader', book_slug: null },
]

async function getAllReviews(): Promise<Review[]> {
  try {
    const [{ data: v }, { data: b }] = await Promise.all([
      supabaseAdmin.from('reviews').select('id,quote,name,location,rating').eq('status','approved').order('created_at',{ascending:false}),
      supabaseAdmin.from('book_reviews').select('id,reviewer,body,country,rating,book_slug').eq('status','approved').order('created_at',{ascending:false}),
    ])
    const visitor: Review[] = (v||[]).map(r => ({ id:r.id, quote:r.quote, name:r.name, location:r.location||'', rating:r.rating||5, source:'reader', book_slug:null }))
    const amazon: Review[] = (b||[]).map(r => ({ id:r.id, quote:r.body, name:r.reviewer, location:r.country||'', rating:r.rating||5, source:'amazon', book_slug:r.book_slug }))
    const merged: Review[] = []
    const max = Math.max(visitor.length, amazon.length)
    for (let i = 0; i < max; i++) {
      if (amazon[i]) merged.push(amazon[i])
      if (visitor[i]) merged.push(visitor[i])
    }
    return merged.length > 0 ? merged : FALLBACK
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
              color: 'rgba(15,92,115,0.9)',
              fontFamily: '"Inter", sans-serif',
              marginBottom: '1.25rem',
            }}
          >
            Voices
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
            Reader Reviews
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

      {/* REVIEWS GRID */}
      <section
        style={{
          padding: 'clamp(5rem,10vw,7rem) 0',
        }}
      >
        <div className="container-wide">
          <ScrollReveal>
            <HomepageReviews reviews={reviews} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: '#f6f1e6',
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
