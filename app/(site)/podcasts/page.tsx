import type { Metadata } from 'next'
import { getAllPodcasts } from '@/lib/data/podcasts'

export const metadata: Metadata = {
  title: 'Podcasts',
  description: 'Podcast interviews and conversations with E. Randolph Richards on Scripture, culture, and his books.',
}

export const revalidate = 60

export default async function PodcastsPage() {
  const podcasts = await getAllPodcasts()

  return (
    <>
      {/* HERO — parallax, matches CV/Endorsements pattern */}
      <section
        className="page-hero"
        style={{
          backgroundImage: "url('/assets/images/portraits/speaking-photo.jpg')",
          minHeight: '50vh',
        }}
      >
        <div className="container-wide" style={{ zIndex: 2, textAlign: 'center' }}>
          <p
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(var(--gold-rgb),0.9)',
              fontFamily: '"Inter", sans-serif',
              marginBottom: '1.25rem',
            }}
          >
            Listen & Watch
          </p>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 400,
              color: 'white',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            Podcasts
          </h1>
          <div className="gold-divider" style={{ margin: '1.5rem auto' }} />
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Conversations on Scripture, culture, and the books, from a few of
            the shows Randy has joined.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,6rem) 0' }}>
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {podcasts.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderLeft: '3px solid var(--gold)',
                  padding: '1.75rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'box-shadow 0.2s ease',
                }}
                className="podcast-card"
              >
                <p
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontFamily: '"Inter", sans-serif',
                    marginBottom: '0.6rem',
                  }}
                >
                  {p.source}
                </p>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 400,
                    fontSize: '1.15rem',
                    lineHeight: 1.3,
                    marginBottom: '0.6rem',
                    color: 'var(--ink)',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#5a5a5a',
                    lineHeight: 1.65,
                    marginBottom: '1rem',
                  }}
                >
                  {p.description}
                </p>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  Listen / watch →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
