'use client'
import Link from 'next/link'
import ClientImage from '@/components/ui/ClientImage'
import { CardItem } from '@/types/journalism'
import { getPublicationTag, formatYear } from '@/lib/utils/slugify'

interface Props {
  article: CardItem
  compact?: boolean
}

// Ensures external URLs always have a protocol so the browser opens them properly
// instead of treating them as internal routes (which causes the 404 blank-page bug)
function sanitizeExternalUrl(url: string | undefined): string | null {
  if (!url || url.trim() === '' || url === '#') return null
  const trimmed = url.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  // Missing protocol — prefix https://
  return `https://${trimmed}`
}

function CardInner({ article, compact = false }: Props) {
  const tagClass = getPublicationTag(article.publication)
  const year = formatYear(article.date)
  const isNative = article.content_type === 'native'

  return (
    <>
      {/* THUMBNAIL */}
      <div style={{
        position: 'relative',
        width: compact ? '90px' : '100%',
        height: compact ? '90px' : '200px',
        flexShrink: 0,
        background: 'var(--paper-dark)',
        overflow: 'hidden',
      }}>
        {article.image ? (
          <div className="article-card-img" style={{ position: 'absolute', inset: 0 }}>
            <ClientImage
              src={article.image}
              alt={article.title}
              fill
              sizes={compact ? '90px' : '(max-width: 768px) 100vw, 400px'}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, hsl(${(article.title.charCodeAt(0) * 7) % 360}, 45%, 52%), hsl(${(article.title.charCodeAt(0) * 7 + 60) % 360}, 55%, 42%))`,
          }} />
        )}

        {/* NATIVE BADGE */}
        {isNative && (
          <span style={{
            position: 'absolute', top: '0.5rem', left: '0.5rem',
            background: 'rgba(var(--gold-rgb),0.9)', color: 'white',
            fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '0.2rem 0.45rem', borderRadius: '2px',
            fontFamily: '"Inter", sans-serif', fontWeight: 500,
          }}>
            On Site
          </span>
        )}
      </div>

      {/* TEXT BODY */}
      <div style={{ padding: compact ? '0.75rem 0.75rem 0.75rem 0' : '1.5rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.7rem', flexWrap: 'wrap' }}>
          {!isNative && (
            <span className={tagClass} style={{
              fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif', fontWeight: 500,
              padding: '0.2rem 0.55rem', borderRadius: '2px',
            }}>
              {article.publication}
            </span>
          )}
          {year && (
            <span style={{ fontSize: '0.7rem', color: '#aaa', fontFamily: '"Inter", sans-serif' }}>
              {year}
            </span>
          )}
        </div>

        <h3 style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 400,
          fontSize: compact ? '0.9rem' : '1.05rem',
          lineHeight: 1.38,
          color: 'var(--ink)',
          marginBottom: article.excerpt && !compact ? '0.65rem' : '1rem',
        }}>
          {article.title}
        </h3>

        {article.excerpt && !compact && (
          <p style={{ fontSize: '0.82rem', color: '#6b6b6b', lineHeight: 1.65, marginBottom: '1rem' }}>
            {article.excerpt}
          </p>
        )}

        <span style={{
          fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--gold)', fontFamily: '"Inter", sans-serif', fontWeight: 500,
        }}>
          {isNative ? 'Read →' : 'Read ↗'}
        </span>
      </div>
    </>
  )
}

const cardStyle = (compact: boolean): React.CSSProperties => ({
  display: 'flex',
  flexDirection: compact ? 'row' : 'column',
  gap: compact ? '1rem' : '0',
  background: 'white',
  border: '1px solid rgba(0,0,0,0.08)',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '3px',
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
})

export default function ArticleCard({ article, compact = false }: Props) {
  const isNative = article.content_type === 'native'

  if (isNative && article.slug && article.category) {
    return (
      <Link
        href={`/articles/${article.category}/${article.slug}`}
        className="article-card-hover"
        style={cardStyle(compact)}
      >
        <CardInner article={article} compact={compact} />
      </Link>
    )
  }

  const safeUrl = sanitizeExternalUrl(article.url)

  // No valid URL — render non-interactive card (no broken link)
  if (!safeUrl) {
    return (
      <div className="article-card-hover" style={{ ...cardStyle(compact), opacity: 0.7, cursor: 'default' }}>
        <CardInner article={article} compact={compact} />
      </div>
    )
  }

  return (
    <a
      href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card-hover"
      style={cardStyle(compact)}
    >
      <CardInner article={article} compact={compact} />
    </a>
  )
}
