import Link from 'next/link'
import type { GoodreadsBook } from '@/lib/rss/parseGoodreads'

interface Props {
  book: GoodreadsBook
}

function StarBar({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
    </span>
  )
}

export default function GoodreadsRating({ book }: Props) {
  const rating = parseFloat(book.averageRating)
  const count = parseInt(book.ratingsCount || '0', 10)

  if (!rating) return null

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1.1rem',
      background: 'rgba(240,230,210,0.6)',
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: '3px',
      marginTop: '1rem',
    }}>
      {/* Goodreads logo mark */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Goodreads">
        <circle cx="9" cy="9" r="9" fill="#F4F1EA"/>
        <text x="9" y="13" textAnchor="middle" fontSize="11" fontWeight="700" fill="#553B08" fontFamily="Georgia,serif">g</text>
      </svg>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
          <span style={{ color: '#c8972a', fontSize: '1rem', lineHeight: 1 }}>
            <StarBar rating={rating} />
          </span>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#2a2a2a', fontFamily: '"Inter", sans-serif' }}>
            {rating.toFixed(2)}
          </span>
        </div>
        <div style={{ marginTop: '2px' }}>
          <Link
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.72rem',
              color: '#7b6544',
              fontFamily: '"Inter", sans-serif',
              textDecoration: 'none',
            }}
          >
            {count > 0 ? `${count.toLocaleString()} rating${count === 1 ? '' : 's'} on Goodreads ↗` : 'View on Goodreads ↗'}
          </Link>
        </div>
      </div>
    </div>
  )
}
