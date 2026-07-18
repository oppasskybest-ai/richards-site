'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: 'Dashboard',   href: '/admin',              icon: '◈' },
  { label: 'Articles',    href: '/admin/articles',      icon: '✦' },
  { label: 'Comments',    href: '/admin/comments',      icon: '✎' },
  { label: 'Reviews',     href: '/admin/reviews',       icon: '★' },
  { label: 'Books',       href: '/admin/books',         icon: '▣' },
  { label: 'Events',      href: '/admin/events',        icon: '◆' },
  { label: 'Subscribers', href: '/admin/subscribers',   icon: '◎' },
  { label: 'Messages',    href: '/admin/messages',      icon: '◇' },
  { label: 'Settings',    href: '/admin/settings',      icon: '⚙' },
]

interface SidebarProps {
  onLogout: () => void
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside style={{
      width: '220px',
      background: '#111',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
      zIndex: 100,
    }}>
      {/* BRANDING */}
      <div style={{
        padding: '1.5rem 1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '0.95rem', color: 'white', marginBottom: '2px',
        }}>
          E. Randolph Richards
        </p>
        <p style={{
          fontSize: '0.58rem',
          color: 'rgba(var(--gold-rgb),0.6)',
          letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          Admin Panel
        </p>
      </div>

      {/* NAV */}
      <nav
        style={{ flex: 1, padding: '1rem 0.75rem', overflow: 'auto' }}
        aria-label="Admin navigation"
      >
        {NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '2px',
                padding: '0.55rem 0.75rem',
                borderRadius: '3px',
                fontSize: '0.8rem',
                textDecoration: 'none',
                fontFamily: '"Inter", sans-serif',
                transition: 'background 0.15s ease, color 0.15s ease',
                color: active ? '#e8c989' : 'rgba(255,255,255,0.55)',
                background: active ? 'rgba(var(--gold-rgb),0.12)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                }
              }}
            >
              <span style={{ fontSize: '0.8rem', opacity: 0.75, width: '1em', textAlign: 'center' }} aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div style={{
        padding: '1rem 0.75rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '0.5rem',
            textDecoration: 'none',
          }}
        >
          View Site ↗
        </Link>
        <button
          onClick={onLogout}
          style={{
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.72rem', cursor: 'pointer', padding: 0,
          }}
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
