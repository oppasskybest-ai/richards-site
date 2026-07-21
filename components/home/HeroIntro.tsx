import Link from 'next/link'

// Replaces the old typewriter-cycling-word effect (which also hardcoded its
// own random color array, completely bypassing the site's actual color
// system). A confident, static editorial headline instead -- no gimmick
// animation, just real type doing the work.
export default function HeroIntro() {
  return (
    <div style={{ maxWidth: '820px' }}>
      {/* EYEBROW */}
      <p className="animate-fade-in" style={{
        fontSize: '0.7rem', letterSpacing: '0.26em', textTransform: 'uppercase',
        color: 'rgba(var(--gold-rgb),0.85)', fontFamily: '"Inter", sans-serif',
        marginBottom: '1.75rem',
      }}>
        Biblical Thoughts
      </p>

      {/* STATIC HEADLINE */}
      <h1 className="animate-fade-up delay-100" style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(2.6rem, 6.4vw, 5.4rem)',
        fontWeight: 400, color: 'white',
        lineHeight: 1.08, letterSpacing: '-0.02em',
        marginBottom: '1.5rem',
      }}>
        Professor. Author.<br />
        <span style={{ color: 'var(--gold)' }}>Provost.</span>
      </h1>

      {/* SUBHEADLINE */}
      <p className="animate-fade-up delay-200" style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(1.15rem, 2.5vw, 1.6rem)',
        color: 'rgba(255,255,255,0.45)',
        fontStyle: 'italic',
        marginBottom: '1.25rem',
        fontWeight: 400,
      }}>
        Ph.D., retired Professor of New Testament.
      </p>

      {/* BIO LINE */}
      <p className="animate-fade-up delay-300" style={{
        fontSize: 'clamp(0.95rem, 1.5vw, 1.08rem)',
        color: 'rgba(255,255,255,0.58)',
        lineHeight: 1.8,
        maxWidth: '560px',
        marginBottom: '3rem',
        fontWeight: 300,
      }}>
        Author of Misreading Scripture with Western Eyes, Rediscovering Paul,
        and other books. Former Provost. I&apos;ve spent a career trying to help
        people read Scripture a little more carefully — this is where I keep writing about it.
      </p>

      {/* CTA BUTTONS */}
      <div className="animate-fade-up delay-400 hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/articles" className="btn-gold" style={{
          padding: '1rem 2.25rem',
          fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: '"Inter", sans-serif', fontWeight: 500, borderRadius: '2px',
          display: 'inline-block',
        }}>
          Read the Work
        </Link>
        <Link href="/books" className="btn-ghost" style={{
          padding: '1rem 2.25rem',
          fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: '"Inter", sans-serif', fontWeight: 400, borderRadius: '2px',
          display: 'inline-block',
        }}>
          The Books
        </Link>
      </div>
    </div>
  )
}
