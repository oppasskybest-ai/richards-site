'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { CATEGORY_SLUGS, CATEGORY_LABELS, JournalismCategory } from '@/types/journalism'

interface Article {
  id: string
  title: string
  publication: string
  url: string
  date: string
  excerpt?: string
  category: string
  slug?: string
  content_type?: 'external' | 'native'
}

const CATEGORY_COLORS: Record<JournalismCategory, string> = {
  'bible-culture': 'rgba(8,32,38,0.97)',
  'family-faith':  'rgba(38,16,10,0.97)',
}

const CATEGORY_ACCENT: Record<JournalismCategory, string> = {
  'bible-culture': '#5ab8cc',
  'family-faith':  '#d8836f',
}

const POSITIONS = [
  { top: '12%', left: '4%'  },
  { top: '10%', left: '28%' },
  { top: '11%', left: '53%' },
  { top: '13%', left: '74%' },
  { top: '34%', left: '2%'  },
  { top: '33%', left: '24%' },
  { top: '32%', left: '48%' },
  { top: '35%', left: '70%' },
  { top: '56%', left: '5%'  },
  { top: '55%', left: '27%' },
  { top: '54%', left: '51%' },
  { top: '57%', left: '72%' },
  { top: '76%', left: '3%'  },
  { top: '75%', left: '25%' },
  { top: '77%', left: '49%' },
  { top: '76%', left: '71%' },
  { top: '22%', left: '15%' },
  { top: '44%', left: '38%' },
  { top: '64%', left: '60%' },
  { top: '86%', left: '14%' },
]

export default function CategoryExpand({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState<JournalismCategory | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const byCategory = CATEGORY_SLUGS.map((slug) => ({
    slug,
    label: CATEGORY_LABELS[slug],
    articles: articles.filter((a) => a.category === slug),
  }))

  const handleCategoryHover = useCallback((slug: JournalismCategory) => {
    setActiveCategory(slug)
    setIsExpanded(true)
  }, [])

  const handleShrink = useCallback(() => {
    setIsExpanded(false)
    setActiveCategory(null)
  }, [])

  const activeData = byCategory.find((c) => c.slug === activeCategory)
  const bgColor = activeCategory ? CATEGORY_COLORS[activeCategory] : 'transparent'
  const accent = activeCategory ? CATEGORY_ACCENT[activeCategory] : 'var(--gold)'

  return (
    <div style={{ position: 'relative', width: '100%' }}>

      {/* ── FULLSCREEN EXPANDED OVERLAY ── */}
      {isExpanded && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: bgColor,
          zIndex: 100,
          overflow: 'auto',
          transition: 'background 0.3s ease',
        }}>
          {/* TOP BAR */}
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            padding: '1.75rem 2.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            zIndex: 110,
            background: `linear-gradient(to bottom, ${bgColor} 60%, transparent)`,
          }}>
            {/* TITLE */}
            {activeData && (
              <div>
                <p style={{
                  fontSize: '0.62rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: accent,
                  fontFamily: '"Inter", sans-serif', marginBottom: '0.3rem',
                }}>
                  {activeData.articles.length} pieces
                </p>
                <h2 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                  fontWeight: 400, color: 'white',
                  letterSpacing: '-0.01em', lineHeight: 1.1,
                }}>
                  {activeData.label}
                </h2>
              </div>
            )}

            {/* RIGHT BUTTONS */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexShrink: 0 }}>
              {activeCategory && (
                <Link
                  href={`/articles/${activeCategory}`}
                  style={{
                    fontSize: '0.65rem', letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: accent,
                    fontFamily: '"Inter", sans-serif', fontWeight: 500,
                    padding: '0.65rem 1.25rem',
                    border: `1px solid ${accent}55`,
                    borderRadius: '2px', textDecoration: 'none',
                  }}
                >
                  View All →
                </Link>
              )}
            </div>
          </div>

          {/* SCROLLABLE CARDS AREA */}
          <div style={{
            paddingTop: '7rem',
            paddingBottom: '8rem',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            minHeight: '100vh',
            position: 'relative',
          }}>
            {activeData && activeData.articles.map((article, i) => {
              const pos = POSITIONS[i % POSITIONS.length]
              const delay = (i * 50) % 500
              const rotation = ((i * 7) % 9) - 4
              const isNative = article.content_type === 'native'
              const rawUrl = article.url || ''
              const safeUrl = rawUrl.startsWith('http') ? rawUrl : rawUrl ? `https://${rawUrl}` : null
              const href = isNative && article.slug
                ? `/articles/${article.category}/${article.slug}`
                : safeUrl || '#'

              return (
                <a
                  key={article.id}
                  href={href}
                  target={isNative ? '_self' : '_blank'}
                  rel={isNative ? undefined : 'noopener noreferrer'}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    width: 'clamp(180px, 18vw, 230px)',
                    background: 'rgba(255,255,255,0.07)',
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderTop: `2px solid ${accent}`,
                    padding: '1rem 1.1rem 1.1rem',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    transform: `rotate(${rotation}deg)`,
                    cursor: 'pointer',
                    backdropFilter: 'blur(6px)',
                    zIndex: 105,
                    animationName: 'floatIn',
                    animationDuration: `0.45s`,
                    animationDelay: `${delay}ms`,
                    animationFillMode: 'both',
                    animationTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
                    transition: 'transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'rotate(0deg) translateY(-8px) scale(1.05)'
                    el.style.background = 'rgba(255,255,255,0.14)'
                    el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5)`
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
                    {article.publication}
                  </p>
                  <p style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '0.88rem', color: 'white',
                    lineHeight: 1.45, fontWeight: 400,
                  }}>
                    {article.title.slice(0, 75)}{article.title.length > 75 ? '…' : ''}
                  </p>
                  {article.date && (
                    <p style={{
                      fontSize: '0.56rem', color: 'rgba(255,255,255,0.28)',
                      fontFamily: '"Inter", sans-serif', marginTop: '0.5rem',
                    }}>
                      {article.date}
                    </p>
                  )}
                </a>
              )
            })}
          </div>

          {/* ── SHRINK BOX — fixed bottom right ── */}
          <div
            onMouseEnter={handleShrink}
            onClick={handleShrink}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 120,
              padding: '0.9rem 1.5rem',
              background: 'rgba(255,255,255,0.08)',
              border: `1px solid rgba(255,255,255,0.2)`,
              borderRadius: '2px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
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

      {/* ── CATEGORY GRID (normal state) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
      }} className="category-grid-resp">
        {byCategory.map(({ slug, label, articles: catArticles }) => (
          <div
            key={slug}
            onMouseEnter={() => handleCategoryHover(slug as JournalismCategory)}
            style={{
              position: 'relative',
              padding: '2.5rem',
              background: CATEGORY_COLORS[slug as JournalismCategory],
              borderRadius: '3px',
              cursor: 'pointer',
              overflow: 'hidden',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              border: `1px solid rgba(255,255,255,0.06)`,
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)'
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            <span style={{
              position: 'absolute', top: '0.75rem', right: '1.25rem',
              fontSize: '6rem', fontFamily: '"Playfair Display", serif',
              color: 'rgba(255,255,255,0.05)', fontWeight: 400, lineHeight: 1,
              pointerEvents: 'none', userSelect: 'none',
            }}>
              {catArticles.length}
            </span>
            <p style={{
              fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: CATEGORY_ACCENT[slug as JournalismCategory],
              fontFamily: '"Inter", sans-serif', marginBottom: '0.5rem',
            }}>
              {catArticles.length} pieces
            </p>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 400, color: 'white',
              lineHeight: 1.15, marginBottom: '0.6rem',
            }}>
              {label}
            </h3>
            <p style={{
              fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)',
              fontFamily: '"Inter", sans-serif', letterSpacing: '0.06em',
            }}>
              Hover to explore all pieces →
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: rotate(var(--r, 0deg)) translateY(40px); }
          to   { opacity: 1; transform: rotate(var(--r, 0deg)) translateY(0px); }
        }
        @media (max-width: 600px) {
          .category-grid-resp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
