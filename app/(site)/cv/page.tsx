import type { Metadata } from 'next'
import { CV_HTML } from '@/lib/config/cv'

export const metadata: Metadata = {
  title: 'CV',
  description: 'Full curriculum vitae of E. Randolph Richards, Ph.D. -- publications, presentations, and administrative experience.',
}

export default function CVPage() {
  return (
    <>
      {/* HERO — parallax, matches About/Endorsements pattern */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/assets/images/portraits/speaking-photo.jpg')",
          minHeight: '50vh',
        }}
      >
        <div className="container-wide" style={{ zIndex: 2, textAlign: 'center' }}>
          <p
            className="animate-fade-in"
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(var(--gold-rgb),0.9)',
              fontFamily: '"Inter", sans-serif',
              marginBottom: '1.25rem',
            }}
          >
            Curriculum Vitae
          </p>
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 400,
              color: 'white',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            CV
          </h1>
          <div className="gold-divider" style={{ margin: '1.5rem auto' }} />
        </div>
      </section>

      {/* FULL CV — paper bg, same article-prose typography as Articles */}
      <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,6rem) 0' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(1.25rem,5vw,4rem)' }}>
          <div className="article-prose" dangerouslySetInnerHTML={{ __html: CV_HTML }} />
        </div>
      </section>
    </>
  )
}
