'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { JournalismCategory } from '@/types/journalism'

const CATEGORIES: Array<{ slug: JournalismCategory | 'all'; label: string; href: string }> = [
  { slug: 'all', label: 'All', href: '/articles' },
  { slug: 'bible-culture', label: 'Bible & Culture', href: '/articles/bible-culture' },
  { slug: 'family-faith', label: 'Family & Faith', href: '/articles/family-faith' },
]

export default function CategoryFilter() {
  const pathname = usePathname()

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
      {CATEGORIES.map((cat) => {
        const isActive = pathname === cat.href || (cat.slug === 'all' && pathname === '/articles')
        return (
          <Link key={cat.slug} href={cat.href} style={{
            padding: '0.5rem 1.1rem', fontSize: '0.7rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', fontWeight: 400,
            border: `1px solid ${isActive ? 'var(--gold)' : 'rgba(var(--ink-rgb),0.2)'}`,
            color: isActive ? 'var(--gold)' : '#6b6258',
            background: isActive ? 'rgba(var(--gold-rgb),0.06)' : 'transparent',
            transition: 'all 0.2s ease', textDecoration: 'none',
            borderRadius: '2px',
          }}>
            {cat.label}
          </Link>
        )
      })}
    </div>
  )
}
