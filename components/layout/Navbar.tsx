'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Books', href: '/books' },
  {
    label: 'Articles',
    href: '/articles',
    children: [
      { label: 'All Articles', href: '/articles' },
      { label: 'Bible & Culture', href: '/articles/bible-culture' },
      { label: 'Family & Faith', href: '/articles/family-faith' },
    ],
  },
  { label: 'Conferences', href: '/events' },
  { label: 'Contact', href: '/contact' },
  // TODO: Podcasts is one of the 4 required content types in the master prompt
  // and has no feature here yet (no table, no admin tab, no public page).
  // See PROGRESS.md — this needs to be built before launch.
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.35s ease',
      background: scrolled ? 'rgba(15,15,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(15,92,115,0.18)' : 'none',
      padding: scrolled ? '0.85rem 0' : '1.5rem 0',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* WORDMARK */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', fontWeight: 400, color: 'white', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              E. Randolph Richards
            </span>
            <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(15,92,115,0.9)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '2px' }}>
              Biblical Thoughts
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <div key={link.label} style={{ position: 'relative' }}
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}>
              <Link href={link.href} className="nav-link" style={{
                color: 'rgba(255,255,255,0.82)', fontSize: '0.7rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', fontWeight: 400,
                padding: '0.5rem 0.9rem', display: 'block',
              }}>
                {link.label}
                {link.children && <span style={{ marginLeft: '4px', fontSize: '0.55rem', opacity: 0.6 }}>▾</span>}
              </Link>

              {link.children && activeDropdown === link.label && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: 'rgba(15,15,15,0.97)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(15,92,115,0.15)', minWidth: '210px', padding: '0.5rem 0',
                }}>
                  {link.children.map((child) => (
                    <Link key={child.label} href={child.href} style={{
                      display: 'block', color: 'rgba(255,255,255,0.75)',
                      fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                      fontFamily: '"Inter", sans-serif', fontWeight: 300,
                      padding: '0.7rem 1.5rem', borderLeft: '2px solid transparent',
                      transition: 'all 0.2s ease',
                    }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#17798f'; (e.currentTarget as HTMLElement).style.borderLeftColor = '#0f5c73'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; }}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* HAMBURGER */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-btn"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
          aria-label="Toggle menu">
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: '22px', height: '1.5px', background: 'white', marginBottom: i < 2 ? '5px' : '0',
              transition: 'all 0.3s ease',
              transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(4.5px,4.5px)' : i === 2 ? 'rotate(-45deg) translate(4.5px,-4.5px)' : 'scaleX(0)') : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ background: 'rgba(12,12,12,0.99)', padding: '1.5rem 2rem', borderTop: '1px solid rgba(15,92,115,0.15)' }}>
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link href={link.href} onClick={() => setMenuOpen(false)} className="nav-link-mobile" style={{
                display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: '"Inter", sans-serif', fontWeight: 300,
                padding: '0.9rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                {link.label}
              </Link>
              {link.children && menuOpen && link.children.map((child) => (
                <Link key={child.label} href={child.href} onClick={() => setMenuOpen(false)} style={{
                  display: 'block', color: 'rgba(15,92,115,0.85)', fontSize: '0.72rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: '"Inter", sans-serif', fontWeight: 300,
                  padding: '0.55rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
