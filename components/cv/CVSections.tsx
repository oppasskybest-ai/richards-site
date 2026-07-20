'use client'
import { useEffect, useState, useRef } from 'react'

interface Section {
  title: string
  id: string
  body: string
}

export default function CVSections({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id || '')
  const refs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )
    sections.forEach((s) => {
      const el = refs.current[s.id]
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,220px) minmax(0,1fr)', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'start' }} className="cv-layout">
      {/* TABLE OF CONTENTS — sticky, active-section highlighting */}
      <nav
        style={{
          position: 'sticky',
          top: 'calc(var(--nav-height) + 2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.15rem',
        }}
        className="cv-toc"
      >
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', fontFamily: '"Inter", sans-serif', marginBottom: '0.75rem' }}>
          On this page
        </p>
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{
              display: 'flex',
              gap: '0.6rem',
              alignItems: 'baseline',
              padding: '0.5rem 0',
              fontSize: '0.82rem',
              lineHeight: 1.35,
              textDecoration: 'none',
              color: active === s.id ? 'var(--ink)' : '#999',
              fontWeight: active === s.id ? 600 : 400,
              fontFamily: '"Inter", sans-serif',
              borderLeft: active === s.id ? '2px solid var(--gold)' : '2px solid transparent',
              paddingLeft: '0.85rem',
              transition: 'color 0.15s ease, border-color 0.15s ease',
            }}
          >
            <span style={{ fontSize: '0.68rem', color: active === s.id ? 'var(--gold)' : '#ccc', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {s.title}
          </a>
        ))}
      </nav>

      {/* SECTIONS */}
      <div style={{ maxWidth: '720px' }}>
        {sections.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={(el) => { refs.current[s.id] = el }}
            style={{ marginBottom: 'clamp(3rem,6vw,4.5rem)', scrollMarginTop: 'calc(var(--nav-height) + 1.5rem)' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.9rem', marginBottom: '1.5rem', paddingBottom: '0.9rem', borderBottom: '2px solid var(--ink)' }}>
              <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: 'var(--gold)', fontStyle: 'italic' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, fontSize: 'clamp(1.3rem,2.2vw,1.65rem)', color: 'var(--ink)', margin: 0 }}>
                {s.title}
              </h2>
            </div>
            <div className="article-prose cv-section-body" dangerouslySetInnerHTML={{ __html: s.body }} />
          </div>
        ))}
      </div>

      <style>{`
        .cv-section-body { font-size: 0.95rem; }
        .cv-section-body p { margin-bottom: 1.1em; }
        @media (max-width: 860px) {
          .cv-layout { grid-template-columns: 1fr !important; }
          .cv-toc {
            position: static !important;
            flex-direction: row !important;
            flex-wrap: wrap;
            gap: 0.5rem !important;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(0,0,0,0.08);
          }
          .cv-toc p { width: 100%; }
          .cv-toc a {
            border-left: none !important;
            padding: 0.4rem 0.75rem !important;
            background: white;
            border: 1px solid rgba(0,0,0,0.1) !important;
            border-radius: 999px;
          }
        }
      `}</style>
    </div>
  )
}
