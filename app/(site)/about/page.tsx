import type { Metadata } from 'next'
import Link from 'next/link'
import ClientImage from '@/components/ui/ClientImage'
import BioTypewriter from '@/components/home/BioTypewriter'
import ScrollReveal from '@/components/home/ScrollReveal'
import PublicationBadge from '@/components/ui/PublicationBadge'

export const metadata: Metadata = {
  title: 'About',
  description: "E. Randolph Richards, Ph.D., is a retired Provost and Research Professor of New Testament at Palm Beach Atlantic University. Author of Misreading Scripture with Western Eyes, Rediscovering Paul, and other books.",
}

const MEDIA = [
  'The Stone Chapel Podcast', 'The Clarity Podcast',
]

export default function AboutPage() {
  return (
    <>
      {/* HERO — parallax */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            "url('/assets/images/portraits/speaking-photo.jpg')",
          minHeight: '60vh',
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
            About
          </p>
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 400,
              color: 'white',
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
            }}
          >
            E. Randolph Richards
          </h1>
          <div className="gold-divider" style={{ margin: '1.5rem auto' }} />
          <p
            className="animate-fade-up delay-200"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              color: 'rgba(255,255,255,0.55)',
              fontStyle: 'italic',
            }}
          >
            Professor. Author. Provost.
          </p>
        </div>
      </section>

      {/* BIO */}
      <section style={{ background: 'white', padding: 'clamp(4rem,8vw,7rem) 0' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 'clamp(2.5rem,6vw,5rem)', alignItems: 'start' }} className="about-bio-grid">
            <div>
              <ScrollReveal>
                <div className="rule-line" style={{ marginBottom: '1.75rem' }} />
                <BioTypewriter />
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <p className="drop-cap" style={{ lineHeight: 1.9, color: '#3a3a3a', marginBottom: '1.35rem', fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}>
                  I&apos;m Randy Richards. I&apos;ve been teaching the New Testament since 1986 — first at a state
                  university, then for several years as a missionary and seminary teacher in Indonesia, and since
                  2006 at Palm Beach Atlantic University, where I later served as Dean and then as Provost and
                  Chief Academic Officer for sixteen years before returning, happily, to the classroom.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p style={{ lineHeight: 1.9, color: '#3a3a3a', marginBottom: '1.35rem', fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}>
                  My wife, Stacia, and I have been together for over forty years, from the jungles of Indonesia to
                  rice fields in Arkansas to the beaches of South Florida. We have two grown sons, and now
                  grandchildren, who are frankly the best part of most weeks.
                </p>
              </ScrollReveal>

              {/* PULL QUOTE — editorial break, matches the treatment used on Endorsements */}
              <ScrollReveal delay={250}>
                <blockquote style={{
                  margin: '2.5rem 0',
                  padding: '0.25rem 0 0.25rem 1.75rem',
                  borderLeft: '3px solid var(--gold)',
                }}>
                  <p style={{
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
                    lineHeight: 1.55,
                    color: 'var(--ink)',
                  }}>
                    &ldquo;Scripture was written in a time and culture very different from ours — it&apos;s easy to
                    read our own assumptions into the text without noticing we&apos;ve done it.&rdquo;
                  </p>
                </blockquote>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <p style={{ lineHeight: 1.9, color: '#3a3a3a', marginBottom: '1.35rem', fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}>
                  Most of my writing — <em>Misreading Scripture with Western Eyes</em>, <em>Rediscovering Paul</em>,
                  and the rest — comes back to that one idea.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <p style={{ lineHeight: 1.9, color: '#3a3a3a', marginBottom: '2.5rem', fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}>
                  This site is where I keep the books, the articles, and the occasional podcast conversation — mostly
                  for students and colleagues who&apos;d rather find it here than dig through my Academia.edu page.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/books" className="btn-gold" style={{ padding: '0.9rem 2rem', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', fontWeight: 500, borderRadius: '2px', display: 'inline-block' }}>
                    The Books
                  </Link>
                  <Link href="/articles" style={{ padding: '0.9rem 2rem', background: 'transparent', color: 'var(--ink)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', fontWeight: 400, borderRadius: '2px', border: '1px solid rgba(0,0,0,0.2)', display: 'inline-block', transition: 'all 0.2s ease' }}>
                    Read the Articles
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* PORTRAIT */}
            <ScrollReveal>
              <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
                <div className="img-reveal" style={{ width: '100%', maxWidth: '320px', aspectRatio: '3/4', background: '#e8e4db', borderRadius: '3px', overflow: 'hidden', boxShadow: '16px 24px 80px rgba(0,0,0,0.14)' }}>
                  <ClientImage src="/assets/images/portraits/speaking-photo.jpg" alt="E. Randolph Richards" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CAREER TIMELINE — a distinct editorial element, built from real
          dates in his CV, not a layout reused from elsewhere on the site */}
      <section style={{ background: '#0d0d0d', padding: 'clamp(3.5rem,6vw,5rem) 0' }}>
        <div className="container-wide">
          <ScrollReveal>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginBottom: '2.5rem', textAlign: 'center' }}>
              Thirty-eight Years Teaching the New Testament
            </p>
          </ScrollReveal>
          <div className="about-timeline" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1.5rem',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: '9px', left: '5%', right: '5%', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            {[
              { year: '1986', label: 'Begins teaching the New Testament, at a state university' },
              { year: '1990s', label: 'Missionary and seminary teacher in Indonesia' },
              { year: '2006', label: 'Joins Palm Beach Atlantic University' },
              { year: '2017\u201322', label: 'Provost and Chief Academic Officer, sixteen years in administration total' },
              { year: '2022', label: 'Returns to the classroom as Research Professor of New Testament' },
            ].map((t) => (
              <div key={t.year} style={{ position: 'relative', paddingTop: '1.75rem' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '18px', height: '18px', borderRadius: '50%', background: '#0d0d0d', border: '2px solid var(--gold)' }} />
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', color: 'white', marginBottom: '0.5rem' }}>{t.year}</p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontFamily: '"Inter", sans-serif' }}>{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .about-timeline { grid-template-columns: 1fr 1fr !important; }
          .about-timeline > div:first-child { display: none; }
        }
      `}</style>

      {/* PUBLICATIONS */}
      <section style={{ background: 'var(--paper)', padding: 'clamp(4rem,7vw,5.5rem) 0', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="container-wide">
          <ScrollReveal>
            <div className="rule-line" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, marginBottom: '2.5rem', letterSpacing: '-0.01em' }}>
              As heard on
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {MEDIA.map((pub) => (
                <PublicationBadge key={pub} name={pub} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AGENT */}
      <section style={{ background: 'white', padding: 'clamp(4rem,7vw,5.5rem) 0', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="container-wide">
          <ScrollReveal>
            <div className="rule-line" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, marginBottom: '2rem', letterSpacing: '-0.01em' }}>
              Speaking &amp; inquiries
            </h2>
            <div style={{ background: 'var(--paper)', border: '1px solid rgba(0,0,0,0.08)', borderLeft: '3px solid var(--gold)', padding: '2rem 2.5rem', maxWidth: '440px', borderRadius: '0 3px 3px 0' }}>
              <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.25rem', fontWeight: 400 }}>E. Randolph Richards</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--gold)', marginBottom: '1.25rem', fontFamily: '"Inter", sans-serif', letterSpacing: '0.06em' }}>Palm Beach Atlantic University</p>
              <p style={{ fontSize: '0.88rem', color: '#3a3a3a', lineHeight: 1.85 }}>
                For speaking requests or general questions, use the contact form below —<br />
                messages go straight to my inbox.<br />
                <Link href="/contact" style={{ color: 'var(--gold)', fontWeight: 400 }}>Go to Contact →</Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
