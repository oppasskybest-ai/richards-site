import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with E. Randolph Richards.',
}

export default function ContactPage() {
  return (
    <>
      <section
        className="page-hero"
        style={{
          backgroundImage:
            "url('/assets/images/portraits/grandkids-2025.jpg')",
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
            Contact
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
            Get in touch
          </h1>
          <div className="gold-divider" style={{ margin: '1.5rem auto' }} />
        </div>
      </section>

      {/* FORM SECTION — solid ink gradient, not another fixed photo directly
          stacked under the hero (two consecutive fixed-attachment photo
          sections with no visual break was reading as a collision/overlap) */}
      <section
        style={{
          background: 'linear-gradient(160deg, #14171c 0%, #0a0c10 100%)',
          padding: 'clamp(5rem,10vw,7rem) 0',
        }}
      >
        <div
          className="container-wide contact-grid"
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', alignItems: 'start' }}
        >
          {/* FORM CARD */}
          <div style={{
            background: 'rgba(255,255,255,0.97)',
            padding: 'clamp(2rem,4vw,3rem)',
            borderRadius: '3px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
          }}>
            <div className="rule-line" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '1.6rem',
              fontWeight: 400, marginBottom: '0.5rem', color: 'var(--ink)',
            }}>
              Send a message
            </h2>
            <p style={{ color: '#6b6b6b', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              If you send me an interesting message, I will send you an interesting response.
            </p>
            <ContactForm />
          </div>

          {/* SIDEBAR — info cards in dark glass style */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              padding: '1.75rem', borderRadius: '2px',
              backdropFilter: 'blur(8px)',
            }}>
              <p style={{
                fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginBottom: '1rem',
              }}>
                Direct
              </p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>
                <a href="mailto:e.randolph.richards@gmail.com" style={{ color: 'white', fontWeight: 500 }}>
                  e.randolph.richards@gmail.com
                </a>
              </p>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              padding: '1.75rem', borderRadius: '2px',
              backdropFilter: 'blur(8px)',
            }}>
              <p style={{
                fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginBottom: '1rem',
              }}>
                Connect
              </p>
              <a
                href="https://independent.academia.edu/ERandolphRichards"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block', fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em',
                  transition: 'color 0.2s ease',
                }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 700px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
