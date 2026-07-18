'use client'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(var(--gold-rgb),0.15)', padding: 'clamp(3.5rem,7vw,5rem) 0 2.5rem' }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

          {/* BRAND */}
          <div>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'white', marginBottom: '0.4rem', fontWeight: 400 }}>
              E. Randolph Richards
            </p>
            <p style={{ fontSize: '0.62rem', color: 'rgba(var(--gold-rgb),0.8)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: '"Inter", sans-serif' }}>
              Biblical Thoughts
            </p>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.8 }}>
              Retired Professor of New Testament<br />and former Provost.<br />Teaching, writing, and speaking since 1986.
            </p>
          </div>

          {/* ARTICLES */}
          <div>
            <p style={{ fontSize: '0.62rem', color: 'rgba(var(--gold-rgb),0.7)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem', fontFamily: '"Inter", sans-serif' }}>
              Articles
            </p>
            {[
              { label: 'All Articles', href: '/articles' },
              { label: 'Bible & Culture', href: '/articles/bible-culture' },
              { label: 'Family & Faith', href: '/articles/family-faith' },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="footer-link" style={{ display: 'block', color: 'rgba(255,255,255,0.48)', fontSize: '0.84rem', marginBottom: '0.55rem' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* THE BOOKS */}
          <div>
            <p style={{ fontSize: '0.62rem', color: 'rgba(var(--gold-rgb),0.7)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem', fontFamily: '"Inter", sans-serif' }}>
              Books
            </p>
            {[
              { title: 'Misreading Scripture with Western Eyes', slug: 'misreading-scripture-with-western-eyes' },
              { title: 'Rediscovering Jesus', slug: 'rediscovering-jesus' },
              { title: 'Rediscovering Paul', slug: 'rediscovering-paul' },
              { title: 'A Little Book for New Biblical Scholars', slug: 'a-little-book-for-new-biblical-scholars' },
            ].map(({ title, slug }) => (
              <Link key={slug} href={`/books/${slug}`} className="footer-link" style={{ display: 'block', color: 'rgba(255,255,255,0.48)', fontSize: '0.84rem', marginBottom: '0.55rem' }}>
                {title}
              </Link>
            ))}
          </div>

          {/* GET IN TOUCH */}
          <div>
            <p style={{ fontSize: '0.62rem', color: 'rgba(var(--gold-rgb),0.7)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem', fontFamily: '"Inter", sans-serif' }}>
              Get in Touch
            </p>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, marginBottom: '0.6rem' }}>
              <a href="mailto:e.randolph.richards@gmail.com" className="footer-link" style={{ color: 'rgba(255,255,255,0.55)' }}>
                e.randolph.richards@gmail.com
              </a>
            </p>
            <a href="https://independent.academia.edu/ERandolphRichards" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif' }}>
              Academia.edu ↗
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
            © {year} E. Randolph Richards · Biblical Thoughts
          </p>
          <Link href="/admin" className="footer-link" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
