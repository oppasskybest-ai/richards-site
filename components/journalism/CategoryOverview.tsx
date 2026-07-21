import Link from 'next/link'
import { CATEGORY_SLUGS, CATEGORY_LABELS, JournalismCategory } from '@/types/journalism'

interface Article {
  id: string
  title: string
  slug?: string
  category: string
  content_type?: 'external' | 'native'
  url: string
}

// Replaces the old fullscreen-overlay-on-hover mechanism (cards that
// expanded to fill the screen on mouseover, with a hardcoded color set
// that ignored the site's actual color system). This is deliberately
// plain: the content is just there, always visible, no interaction
// required to see what's inside a category.
export default function CategoryOverview({ articles }: { articles: Article[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {CATEGORY_SLUGS.map((slug: JournalismCategory) => {
        const inCategory = articles.filter((a) => a.category === slug)
        const recent = inCategory.slice(0, 3)
        return (
          <Link
            key={slug}
            href={`/articles/${slug}`}
            style={{
              display: 'block',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '3px',
              padding: 'clamp(1.5rem,3vw,2.25rem)',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            className="category-overview-card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: '1.4rem', color: 'white' }}>
                {CATEGORY_LABELS[slug]}
              </h3>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Inter", sans-serif' }}>
                {inCategory.length} piece{inCategory.length !== 1 ? 's' : ''}
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {recent.map((a) => (
                <li key={a.id} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, paddingLeft: '1rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>—</span>
                  {a.title}
                </li>
              ))}
            </ul>
            <span style={{ display: 'inline-block', marginTop: '1.5rem', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'white', fontFamily: '"Inter", sans-serif', borderBottom: '1px solid var(--gold)', paddingBottom: '2px' }}>
              Browse all →
            </span>
          </Link>
        )
      })}
      <style>{`
        .category-overview-card:hover { border-color: rgba(var(--gold-rgb),0.4) !important; background: rgba(255,255,255,0.05) !important; }
      `}</style>
    </div>
  )
}
