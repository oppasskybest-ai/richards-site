import type { Metadata } from 'next'
import { getAllPodcasts } from '@/lib/data/podcasts'
import { getEmbedInfo } from '@/lib/utils/podcastEmbed'
import ClientImage from '@/components/ui/ClientImage'

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
            Conversations on Scripture, culture, and the books — a few play
            right here, the rest open where they were recorded.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,6rem) 0' }}>
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              alignItems: 'start',
            }}
          >
            {podcasts.map((p) => {
              const embed = getEmbedInfo(p.url)
              const previewImage = p.image || embed?.thumbnail

              return (
                <div
                  key={p.id}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderTop: '3px solid var(--gold)',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* PLAYABLE EMBED — plays directly on the page */}
                  {embed ? (
                    <div style={{ position: 'relative', width: '100%', aspectRatio: embed.aspectRatio, background: '#000' }}>
                      <iframe
                        src={embed.embedUrl}
                        title={p.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                      />
                    </div>
                  ) : previewImage ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative', width: '100%', aspectRatio: '16/9', background: '#111' }}>
                      <ClientImage src={previewImage} alt={p.title} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '14px solid var(--gold)', marginLeft: '3px' }} />
                        </div>
                      </div>
                    </a>
                  ) : null}

                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', marginBottom: '0.6rem' }}>
                      {p.source}
                    </p>
                    <h3 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: '1.1rem', lineHeight: 1.3, marginBottom: '0.6rem', color: 'var(--ink)' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.83rem', color: '#5a5a5a', lineHeight: 1.6, marginBottom: embed ? 0 : '1rem' }}>
                      {p.description}
                    </p>
                    {!embed && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', fontWeight: 500, textDecoration: 'none' }}
                      >
                        Listen / watch →
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
