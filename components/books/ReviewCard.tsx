import type { FC } from 'react'

export interface ReviewData {
  id: string
  quote: string
  name: string
  location?: string
  rating?: number
  source?: 'goodreads' | 'amazon' | 'reader' | string
  date?: string
}

function Stars({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(0, Math.round(rating)))
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '0.75rem' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          aria-hidden="true"
          style={{
            fontSize: '0.85rem',
            color: s <= clamped ? 'var(--gold)' : 'rgba(0,0,0,0.15)',
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function Initials({ name }: { name: string }) {
  const letters = name
    .trim()
    .split(' ')
    .map((n) => n[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2)
  return (
    <div
      aria-hidden="true"
      style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: 'rgba(var(--gold-rgb),0.12)',
        border: '1px solid rgba(var(--gold-rgb),0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '0.82rem', color: 'var(--gold)', lineHeight: 1,
      }}>
        {letters}
      </span>
    </div>
  )
}

const SOURCE_LABELS: Record<string, string> = {
  goodreads: 'Goodreads',
  amazon:    'Amazon',
  reader:    'Reader',
}

interface ReviewCardProps {
  review: ReviewData
  /** dark — white card on dark bg (homepage / reviews page)
   *  light — card on paper/light bg (book detail page) */
  variant?: 'dark' | 'light'
}

const ReviewCard: FC<ReviewCardProps> = ({ review, variant = 'dark' }) => {
  const isDark = variant === 'dark'
  const cardBg  = isDark ? 'rgba(255,255,255,0.04)' : 'white'
  const cardBorder = isDark
    ? '1px solid rgba(var(--gold-rgb),0.18)'
    : '1px solid rgba(0,0,0,0.08)'
  const quoteColor  = isDark ? 'rgba(255,255,255,0.82)' : '#1c1c1c'
  const nameColor   = 'var(--gold)'
  const locationColor = isDark ? 'rgba(255,255,255,0.3)' : '#999'
  const dateColor     = isDark ? 'rgba(255,255,255,0.22)' : '#bbb'
  const bigQuoteMark  = isDark ? 'rgba(var(--gold-rgb),0.14)' : 'rgba(var(--gold-rgb),0.1)'

  return (
    <article
      style={{
        position: 'relative',
        background: cardBg,
        border: cardBorder,
        padding: '2rem 2rem 1.75rem',
        borderRadius: '2px',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* BIG DECORATIVE QUOTE MARK */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', top: '0.75rem', right: '1.25rem',
          fontSize: '4rem', color: bigQuoteMark,
          fontFamily: '"Playfair Display", serif',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        }}
      >
        &rdquo;
      </span>

      {/* STARS */}
      {typeof review.rating === 'number' && review.rating > 0 && (
        <Stars rating={review.rating} />
      )}

      {/* QUOTE */}
      <blockquote
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1rem', fontStyle: 'italic',
          lineHeight: 1.8, color: quoteColor,
          margin: '0 0 1.5rem',
        }}
      >
        {review.quote}
      </blockquote>

      {/* FOOTER — avatar + name + meta */}
      <footer style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Initials name={review.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            color: nameColor, fontSize: '0.78rem',
            fontFamily: '"Inter", sans-serif', fontWeight: 500,
            margin: 0, lineHeight: 1.3,
          }}>
            — {review.name}
          </p>
          {review.location && (
            <p style={{
              color: locationColor, fontSize: '0.68rem',
              fontFamily: '"Inter", sans-serif', margin: 0,
              letterSpacing: '0.03em', lineHeight: 1.4,
            }}>
              {review.location}
            </p>
          )}
        </div>
        {/* SOURCE BADGE */}
        {review.source && (
          <span style={{
            fontSize: '0.58rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
            color: 'rgba(var(--gold-rgb),0.65)',
            border: '1px solid rgba(var(--gold-rgb),0.2)',
            padding: '0.15rem 0.45rem', borderRadius: '2px',
            flexShrink: 0,
          }}>
            {SOURCE_LABELS[review.source] ?? review.source}
          </span>
        )}
      </footer>

      {/* DATE */}
      {review.date && (
        <p style={{
          color: dateColor, fontSize: '0.62rem',
          fontFamily: '"Inter", sans-serif',
          marginTop: '0.75rem', marginBottom: 0,
        }}>
          {review.date}
        </p>
      )}
    </article>
  )
}

export default ReviewCard
