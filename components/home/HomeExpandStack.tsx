'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'

interface CardItem {
  id: string
  title: string
  publication: string
  url: string
  date: string
  excerpt?: string
  image?: string
  category?: string
  slug?: string
  content_type?: 'external' | 'native'
}

const POSITIONS = [
  { top: '10%', left: '3%'  },
  { top: '8%',  left: '27%' },
  { top: '9%',  left: '52%' },
  { top: '11%', left: '74%' },
  { top: '32%', left: '5%'  },
  { top: '30%', left: '29%' },
  { top: '31%', left: '54%' },
  { top: '33%', left: '75%' },
  { top: '54%', left: '4%'  },
  { top: '53%', left: '26%' },
  { top: '55%', left: '50%' },
  { top: '52%', left: '73%' },
  { top: '74%', left: '6%'  },
  { top: '73%', left: '30%' },
  { top: '75%', left: '55%' },
  { top: '72%', left: '76%' },
]

interface Props {
  cards: CardItem[]
  label: string
  accent?: string
  bgColor?: string
}

export default function HomeExpandStack({
  cards,
  label,
  accent = '#0f5c73',
  bgColor = 'rgba(8,18,32,0.97)',
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpand = useCallback(() => setIsExpanded(true), [])
  const handleShrink = useCallback(() => setIsExpanded(false), [])

  return (
    <div style={{ position: 'relative' }}>
      {/* FULLSCREEN OVERLAY */}
      {isExpanded && (
        <div style={{
          position: 'fixed', inset: 0,
          background: bgColor,
          zIndex: 100, overflow: 'auto',
        }}>
          {/* TOP BAR */}
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            padding: '1.75rem 2.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            zIndex: 110,
            background: `linear-gradient(to bottom, ${bgColor} 60%, transparent)`,
          }}>
            <div>
              <p style={{
                fontSize: '0.62rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: accent,
                fontFamily: '"Inter", sans-serif', marginBottom: '0.3rem',
              }}>
                {cards.length} pieces
              </p>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                fontWeight: 400, color: 'white', letterSpacing: '-0.01em',
              }}>
                {label}
              </h2>
            </div>
            <Link
              href="/articles"
              style={{
                fontSize: '0.65rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: accent,
                fontFamily: '"Inter", sans-serif', fontWeight: 500,
                padding: '0.65rem 1.25rem',
                border: `1px solid ${accent}55`,
                borderRadius: '2px', textDecoration: 'none',
              }}
            >
              Full Archive →
            </Link>
          </div>

          {/* FLOATING CARDS */}
          <div style={{ paddingTop: '7rem', paddingBottom: '8rem', minHeight: '100vh', position: 'relative' }}>
            {cards.map((card, i) => {
              const pos = POSITIONS[i % POSITIONS.length]
              const delay = (i * 50) % 500
              const rotation = ((i * 7) % 9) - 4
              const isNative = card.content_type === 'native'
              const rawUrl = card.url || ''
              const safeUrl = rawUrl.startsWith('http') ? rawUrl : rawUrl ? `https://${rawUrl}` : null
              const href = isNative && card.slug && card.category
                ? `/articles/${card.category}/${card.slug}`
                : safeUrl || '#'

              return (
                <a
                  key={card.id}
                  href={href}
                  target={isNative ? '_self' : '_blank'}
                  rel={isNative ? undefined : 'noopener noreferrer'}
                  style={{
                    position: 'absolute',
                    top: pos.top, left: pos.left,
                    width: 'clamp(180px, 18vw, 230px)',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderTop: `2px solid ${accent}`,
                    padding: '1rem 1.1rem 1.1rem',
                    borderRadius: '2px', textDecoration: 'none',
                    transform: `rotate(${rotation}deg)`,
                    backdropFilter: 'blur(6px)',
                    zIndex: 105,
                    animationName: 'floatIn',
                    animationDuration: '0.45s',
                    animationDelay: `${delay}ms`,
                    animationFillMode: 'both',
                    animationTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
                    transition: 'transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'rotate(0deg) translateY(-8px) scale(1.05)'
                    el.style.background = 'rgba(255,255,255,0.14)'
                    el.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)'
                    el.style.zIndex = '120'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.transform = `rotate(${rotation}deg) translateY(0px) scale(1)`
                    el.style.background = 'rgba(255,255,255,0.07)'
                    el.style.boxShadow = 'none'
                    el.style.zIndex = '105'
                  }}
                >
                  <p style={{
                    fontSize: '0.56rem', color: accent,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    fontFamily: '"Inter", sans-serif', marginBottom: '0.4rem',
                  }}>
                    {card.publication}
                  </p>
                  <p style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '0.88rem', color: 'white', lineHeight: 1.45,
                  }}>
                    {card.title.slice(0, 75)}{card.title.length > 75 ? '…' : ''}
                  </p>
                  {card.date && (
                    <p style={{
                      fontSize: '0.56rem', color: 'rgba(255,255,255,0.28)',
                      fontFamily: '"Inter", sans-serif', marginTop: '0.5rem',
                    }}>
                      {card.date}
                    </p>
                  )}
                </a>
              )
            })}
          </div>

          {/* SHRINK BOX */}
          <div
            onMouseEnter={handleShrink}
            onClick={handleShrink}
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 120,
              padding: '0.9rem 1.5rem',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '2px', cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.16)'
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.08)'
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>↙</span>
            <span style={{
              fontSize: '0.62rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
              fontFamily: '"Inter", sans-serif',
            }}>
              Hover here to shrink back
            </span>
          </div>
        </div>
      )}

      {/* NORMAL CARD STACK PREVIEW */}
      <div
        onMouseEnter={handleExpand}
        style={{
          position: 'relative', cursor: 'pointer',
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: `2px solid ${accent}`,
          borderRadius: '3px',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
          minHeight: '160px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
        onMouseOver={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = 'translateY(-4px)'
          el.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'
          el.style.background = 'rgba(255,255,255,0.07)'
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
          el.style.background = 'rgba(255,255,255,0.04)'
        }}
      >
        <span style={{
          position: 'absolute', top: '0.5rem', right: '1rem',
          fontSize: '5rem', fontFamily: '"Playfair Display", serif',
          color: 'rgba(255,255,255,0.05)', lineHeight: 1,
          pointerEvents: 'none', userSelect: 'none',
        }}>
          {cards.length}
        </span>
        <p style={{
          fontSize: '0.58rem', color: accent, letterSpacing: '0.18em',
          textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.4rem',
        }}>
          {cards.length} pieces
        </p>
        <h3 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.2rem', fontWeight: 400, color: 'white',
          lineHeight: 1.2, marginBottom: '0.5rem',
        }}>
          {label}
        </h3>
        <p style={{
          fontSize: '0.62rem', color: 'rgba(255,255,255,0.28)',
          fontFamily: '"Inter", sans-serif', letterSpacing: '0.06em',
        }}>
          Hover to explore →
        </p>
      </div>

      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: rotate(0deg) translateY(40px); }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
