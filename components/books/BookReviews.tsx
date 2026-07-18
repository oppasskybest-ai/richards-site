import { supabaseAdmin } from '@/lib/supabase/server'

interface BookReview {
  id: string
  reviewer: string
  title: string | null
  country: string | null
  review_date: string | null
  body: string
  rating: number
}

async function getBookReviews(bookSlug: string): Promise<BookReview[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('book_reviews')
      .select('id, reviewer, title, country, review_date, body, rating')
      .eq('book_slug', bookSlug)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(8)

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.min(5, Math.max(0, rating))
  return (
    <span style={{ color: '#e47911', fontSize: '0.85rem', letterSpacing: '1px' }}>
      {'★'.repeat(filled)}{'☆'.repeat(5 - filled)}
    </span>
  )
}

function getInitials(name: string) {
  return name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function avatarColor(name: string) {
  const hue = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  return `hsl(${hue}, 38%, 48%)`
}

interface Props {
  bookSlug: string
}

export default async function BookReviews({ bookSlug }: Props) {
  const reviews = await getBookReviews(bookSlug)

  if (reviews.length === 0) return null

  return (
    <section style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(1.3rem,2.2vw,1.7rem)',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          color: 'var(--ink)',
        }}>
          Reader Reviews
        </h2>
        <span style={{ fontSize: '0.75rem', color: '#888', fontFamily: '"Inter", sans-serif', letterSpacing: '0.06em' }}>
          via Amazon
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1.25rem' }}>
        {reviews.map((r) => (
          <div
            key={r.id}
            style={{
              background: '#faf9f6',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: '3px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: avatarColor(r.reviewer),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '0.7rem', fontWeight: 700,
                fontFamily: '"Inter", sans-serif', flexShrink: 0,
              }}>
                {getInitials(r.reviewer)}
              </div>
              <div>
                <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '0.85rem', color: 'var(--ink)' }}>
                  {r.reviewer}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px' }}>
                  <Stars rating={r.rating} />
                  {r.review_date && (
                    <span style={{ fontSize: '0.7rem', color: '#aaa', fontFamily: '"Inter", sans-serif' }}>
                      {r.review_date}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Review title */}
            {r.title && r.title.trim() && (
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: '0.85rem',
                color: '#1a1a1a',
                margin: 0,
              }}>
                {r.title}
              </p>
            )}

            {/* Body */}
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.85rem',
              lineHeight: 1.75,
              color: '#444',
              margin: 0,
              flex: 1,
            }}>
              {r.body}
            </p>

            {/* Country */}
            {r.country && (
              <p style={{ fontSize: '0.7rem', color: '#bbb', fontFamily: '"Inter", sans-serif', margin: 0 }}>
                Reviewed in {r.country}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
