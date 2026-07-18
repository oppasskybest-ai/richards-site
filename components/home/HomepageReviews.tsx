'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

interface Review {
  id: string
  quote: string
  name: string
  location?: string
  rating?: number
  source: 'amazon' | 'reader'
  book_slug: string | null
}

const BOOK_TITLES: Record<string, string> = {
  'misreading-scripture-with-western-eyes': 'Misreading Scripture with Western Eyes',
  'rediscovering-jesus': 'Rediscovering Jesus',
  'rediscovering-paul': 'Rediscovering Paul',
  'a-little-book-for-new-biblical-scholars': 'A Little Book for New Biblical Scholars',
}

function getInitials(name: string) {
  return name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function avatarHue(name: string) {
  return name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
}

function StarDisplay({ rating = 5 }: { rating?: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '0.75rem' }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize: '0.9rem', color: s <= rating ? 'var(--gold)' : 'rgba(255,255,255,0.15)' }}>★</span>
      ))}
    </div>
  )
}

function SourceBadge({ source, bookSlug }: { source: 'amazon' | 'reader'; bookSlug: string | null }) {
  if (source === 'amazon' && bookSlug) {
    return (
      <a
        href={`/books/${bookSlug}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
          fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)', fontFamily: '"Inter", sans-serif',
          textDecoration: 'none', marginBottom: '0.75rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2px',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.1)"/>
          <text x="9" y="13" textAnchor="middle" fontSize="10" fontWeight="700" fill="#e47911" fontFamily="Georgia,serif">a</text>
        </svg>
        Amazon · {BOOK_TITLES[bookSlug] || bookSlug}
      </a>
    )
  }
  return (
    <span style={{
      display: 'inline-block', fontSize: '0.62rem', letterSpacing: '0.1em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
      fontFamily: '"Inter", sans-serif', marginBottom: '0.75rem',
    }}>
      ✦ Reader review
    </span>
  )
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
  return (
    <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button"
          onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.75rem', padding: '2px',
            color: s <= (hovered || value) ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
            transform: s <= (hovered || value) ? 'scale(1.15)' : 'scale(1)',
            transition: 'all 0.12s', lineHeight: 1,
          }}
        >★</button>
      ))}
      <span style={{ marginLeft: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', fontFamily: '"Inter", sans-serif' }}>
        {labels[hovered || value]}
      </span>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.85rem 1rem',
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
  color: 'white', fontFamily: '"Inter", sans-serif', fontWeight: 300,
  fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box',
  borderRadius: '2px', transition: 'border-color 0.2s ease',
}

// How many cards visible per breakpoint
const VISIBLE = 3

export default function HomepageReviews({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ quote: '', name: '', location: '', rating: 5 })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = reviews.length
  // max starting index so we never show blank slots
  const maxIndex = Math.max(0, total - 1)

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + total) % total)
  }, [total])

  // Auto-scroll every 5s unless paused or form open
  useEffect(() => {
    if (paused || showForm || total <= 1) return
    intervalRef.current = setInterval(next, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [next, paused, showForm, total])

  // Get the 3 visible reviews (with wraparound)
  const visible = Array.from({ length: Math.min(VISIBLE, total) }, (_, i) =>
    reviews[(current + i) % total]
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.quote.trim() || !form.name.trim()) { setError('Please fill in your review and name.'); return }
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/public/reviews', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) { setSubmitted(true); setShowForm(false) }
      else setError(data.error || 'Something went wrong.')
    } catch { setError('Connection error. Please try again.') }
    setSubmitting(false)
  }

  return (
    <>
      {/* ── CAROUSEL ── */}
      {total > 0 && (
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ position: 'relative', marginBottom: '2.5rem' }}
        >
          {/* Cards */}
          <div
            className="review-card-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(VISIBLE, total)}, 1fr)`,
              gap: '1.5rem',
            }}>
            {visible.map((r, i) => (
              <div
                key={`${r.id}-${i}`}
                className="review-card"
                style={{
                  opacity: 1,
                  transition: 'opacity 0.4s ease',
                  animationName: 'fadeSlide',
                  animationDuration: '0.4s',
                  animationFillMode: 'both',
                }}
              >
                {/* Big quote mark */}
                <span style={{
                  position: 'absolute', top: '1rem', right: '1.5rem',
                  fontSize: '3.5rem', color: 'rgba(var(--gold-rgb),0.18)',
                  fontFamily: '"Playfair Display", serif', lineHeight: 1, pointerEvents: 'none',
                }} aria-hidden="true">&rdquo;</span>

                <SourceBadge source={r.source} bookSlug={r.book_slug} />
                <StarDisplay rating={r.rating} />

                <p style={{
                  color: 'rgba(255,255,255,0.82)', fontFamily: '"Playfair Display", serif',
                  fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '1.5rem',
                }}>
                  {r.quote.length > 220 ? r.quote.slice(0, 220).trimEnd() + '…' : r.quote}
                </p>

                {/* Avatar + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: `hsl(${avatarHue(r.name)}, 38%, 32%)`,
                    border: '1px solid rgba(var(--gold-rgb),0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.9rem', color: 'var(--gold)' }}>
                      {getInitials(r.name)}
                    </span>
                  </div>
                  <div>
                    <p style={{ color: 'var(--gold)', fontSize: '0.8rem', fontFamily: '"Inter", sans-serif', margin: 0, fontWeight: 400 }}>
                      — {r.name}
                    </p>
                    {r.location && (
                      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontFamily: '"Inter", sans-serif', margin: 0, letterSpacing: '0.04em' }}>
                        {r.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next + dots */}
          {total > VISIBLE && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.75rem' }}>
              <button onClick={() => { prev(); setPaused(true) }} aria-label="Previous reviews"
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ‹
              </button>

              {/* Dot indicators — one per review */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '200px' }}>
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => { setCurrent(i); setPaused(true) }} aria-label={`Go to review ${i + 1}`}
                    style={{
                      width: i === current ? '18px' : '6px', height: '6px',
                      borderRadius: '3px', border: 'none', cursor: 'pointer', padding: 0,
                      background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>

              <button onClick={() => { next(); setPaused(true) }} aria-label="Next reviews"
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ›
              </button>
            </div>
          )}

          {/* Auto-play indicator */}
          {!paused && !showForm && total > VISIBLE && (
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', fontFamily: '"Inter", sans-serif', letterSpacing: '0.08em' }}>
                Auto-scrolling · hover to pause
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── ACTION ROW ── */}
      <div style={{
        display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
        marginBottom: showForm || submitted ? '2.5rem' : '0',
      }}>
        {!submitted && (
          <button onClick={() => setShowForm(f => !f)}
            style={{
              padding: '0.85rem 2.25rem',
              background: showForm ? 'rgba(255,255,255,0.05)' : 'rgba(var(--gold-rgb),0.18)',
              border: '1px solid rgba(var(--gold-rgb),0.45)', color: 'var(--gold)', cursor: 'pointer',
              fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif', fontWeight: 400, borderRadius: '2px', transition: 'all 0.2s ease',
            }}>
            {showForm ? '✕ Close' : '✦ Leave a Review'}
          </button>
        )}
      </div>

      {/* ── SUCCESS ── */}
      {submitted && (
        <div style={{ background: 'rgba(var(--gold-rgb),0.1)', border: '1px solid rgba(var(--gold-rgb),0.28)', padding: '1.5rem 2rem', textAlign: 'center', borderRadius: '2px' }}>
          <p style={{ color: 'var(--gold)', fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', fontStyle: 'italic' }}>
            Thank you — your review has been submitted and will appear once approved.
          </p>
        </div>
      )}

      {/* ── INLINE REVIEW FORM ── */}
      {showForm && !submitted && (
        <div style={{
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(var(--gold-rgb),0.18)',
          borderTop: '2px solid var(--gold)', padding: '2.5rem', marginTop: '2rem', borderRadius: '0 0 2px 2px',
        }}>
          <h3 style={{ color: 'white', fontFamily: '"Playfair Display", serif', fontSize: '1.7rem', fontWeight: 400, marginBottom: '0.5rem' }}>
            Share Your Experience
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.8rem', fontFamily: '"Inter", sans-serif', fontWeight: 300, marginBottom: '2rem', letterSpacing: '0.02em' }}>
            Reviews are approved before publishing.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.38)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.6rem' }}>
                Your Rating *
              </label>
              <StarPicker value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.38)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.6rem' }}>
                Your Review *
              </label>
              <textarea style={{ ...inputStyle, minHeight: '110px', resize: 'vertical' }}
                value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))}
                placeholder="Share your thoughts on Randy's work..." required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }} className="review-form-grid">
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.38)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.6rem' }}>
                  Name *
                </label>
                <input style={inputStyle} value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="First name or initials" required />
              </div>
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.38)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.6rem' }}>
                  Location / Context
                </label>
                <input style={inputStyle} value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Reader, New York" />
              </div>
            </div>

            {error && <p style={{ color: '#ff9999', fontSize: '0.82rem', marginBottom: '1rem', fontFamily: '"Inter", sans-serif' }}>{error}</p>}

            <button type="submit" disabled={submitting}
              style={{
                padding: '0.9rem 2.5rem',
                background: submitting ? 'rgba(var(--gold-rgb),0.4)' : 'var(--gold)',
                color: submitting ? 'rgba(255,255,255,0.5)' : 'white',
                border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                fontFamily: '"Inter", sans-serif', fontWeight: 500, borderRadius: '2px', transition: 'all 0.2s ease',
              }}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 760px) {
          .review-card-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .review-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
