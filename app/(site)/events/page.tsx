import type { Metadata } from 'next'
import ClientImage from '@/components/ui/ClientImage'
import ScrollReveal from '@/components/home/ScrollReveal'
import SubscribeForm from '@/components/subscribe/SubscribeForm'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { Event } from '@/types/database'
import { STATIC_EVENTS } from '@/lib/config/events'

export const metadata: Metadata = {
  title: 'Conferences',
  description: 'Upcoming talks, readings, and appearances by E. Randolph Richards.',
}

export const revalidate = 60

function formatEventDate(dateStr: string, timeStr: string | null) {
  const d = new Date(dateStr + 'T00:00:00')
  const formatted = d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return timeStr ? `${formatted} · ${timeStr}` : formatted
}

// Merges live Supabase rows with the static conference history by
// title+date. A Supabase row wins if it matches; static entries not yet
// added through /admin/events are kept rather than dropped. This replaces
// an all-or-nothing fallback that made the entire real keynote history
// disappear the instant a single conference was added through the admin
// panel -- see the matching note in lib/data/articles.ts.
function mergeEvents(dbEvents: Event[], staticEvents: Event[]): Event[] {
  const dbKeys = new Set(dbEvents.map((e) => `${e.title}::${e.event_date}`))
  const missingFromDb = staticEvents.filter((e) => !dbKeys.has(`${e.title}::${e.event_date}`))
  return [...dbEvents, ...missingFromDb]
}

async function getEvents(): Promise<{ upcoming: Event[]; past: Event[] }> {
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .neq('status', 'cancelled')
      .order('event_date', { ascending: true })

    // Real conference history exists (see lib/config/events.ts) -- merge it
    // in rather than showing only whatever's in Supabase.
    const rows = (!error && data) ? mergeEvents(data, STATIC_EVENTS) : STATIC_EVENTS

    const today = new Date().toISOString().slice(0, 10)
    const upcoming = rows.filter((e: Event) => e.event_date >= today)
    const past = rows
      .filter((e: Event) => e.event_date < today)
      .reverse()
    return { upcoming, past }
  } catch {
    const today = new Date().toISOString().slice(0, 10)
    return {
      upcoming: STATIC_EVENTS.filter((e) => e.event_date >= today),
      past: STATIC_EVENTS.filter((e) => e.event_date < today).reverse(),
    }
  }
}

export default async function EventsPage() {
  const { upcoming, past } = await getEvents()
  const hasEvents = upcoming.length > 0 || past.length > 0

  return (
    <>
      {/* HERO — parallax */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            "url('/assets/images/portraits/speaking-photo.jpg')",
          minHeight: '55vh',
        }}
      >
        <div
          className="container-wide"
          style={{ zIndex: 2, textAlign: 'center' }}
        >
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
            Conferences
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
            Appearances
          </h1>
          <div
            className="gold-divider"
            style={{ margin: '1.5rem auto' }}
          />
          <p
            className="animate-fade-up delay-200"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontStyle: 'italic',
            }}
          >
            Talks, readings, and conversations — upcoming and past.
          </p>
        </div>
      </section>

      {/* EMPTY STATE */}
      {!hasEvents && (
        <section
          style={{
            background: '#f8f6f1',
            padding: 'clamp(6rem,12vw,9rem) 0',
            textAlign: 'center',
          }}
        >
          <ScrollReveal>
            <div className="container-narrow">
              <div className="rule-line" style={{ margin: '0 auto 1.5rem' }} />
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  fontWeight: 400,
                  marginBottom: '1rem',
                  letterSpacing: '-0.01em',
                  color: 'var(--ink)',
                }}
              >
                Stay tuned
              </h2>
              <p
                style={{
                  color: '#6b6b6b',
                  fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                  lineHeight: 1.85,
                  marginBottom: '2.5rem',
                  maxWidth: '480px',
                  margin: '0 auto 2.5rem',
                }}
              >
                There are no events on the calendar right now. When one is added,
                it will appear here — and if you&apos;re subscribed, you&apos;ll
                hear about it directly.
              </p>
              <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                <SubscribeForm />
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* UPCOMING EVENTS */}
      {upcoming.length > 0 && (
        <section style={{ background: '#f8f6f1', padding: 'clamp(4rem,8vw,6rem) 0' }}>
          <div className="container-wide">
            <ScrollReveal>
              <div className="rule-line" style={{ marginBottom: '1.25rem' }} />
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 400,
                  marginBottom: '2.5rem',
                  color: 'var(--ink)',
                }}
              >
                Upcoming
              </h2>
            </ScrollReveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {upcoming.map((ev, i) => (
                <ScrollReveal key={ev.id} delay={i * 80}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '2rem',
                      background: 'white',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderLeft: '4px solid var(--gold)',
                      padding: '2rem',
                      borderRadius: '0 3px 3px 0',
                      flexWrap: 'wrap',
                    }}
                    className="event-card-row"
                  >
                    {ev.image && (
                      <div
                        style={{
                          width: '140px',
                          height: '140px',
                          flexShrink: 0,
                          position: 'relative',
                          borderRadius: '2px',
                          overflow: 'hidden',
                          background: '#e8e4db',
                        }}
                      >
                        <ClientImage
                          src={ev.image}
                          alt={ev.title}
                          fill
                          sizes="140px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <p
                        style={{
                          fontSize: '0.62rem',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--gold)',
                          fontFamily: '"Inter", sans-serif',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {ev.event_type} · {formatEventDate(ev.event_date, ev.event_time)}
                      </p>
                      <h3
                        style={{
                          fontFamily: '"Playfair Display", serif',
                          fontSize: '1.3rem',
                          fontWeight: 400,
                          color: 'var(--ink)',
                          marginBottom: '0.4rem',
                        }}
                      >
                        {ev.title}
                      </h3>
                      {ev.subtitle && (
                        <p
                          style={{
                            fontSize: '0.9rem',
                            color: '#6b6b6b',
                            fontStyle: 'italic',
                            marginBottom: '0.75rem',
                          }}
                        >
                          {ev.subtitle}
                        </p>
                      )}
                      {(ev.venue || ev.location) && (
                        <p
                          style={{
                            fontSize: '0.82rem',
                            color: '#3a3a3a',
                            marginBottom: '0.75rem',
                          }}
                        >
                          {[ev.venue, ev.location].filter(Boolean).join(', ')}
                        </p>
                      )}
                      {ev.description && (
                        <p
                          style={{
                            fontSize: '0.88rem',
                            color: '#3a3a3a',
                            lineHeight: 1.7,
                            marginBottom: ev.register_url ? '1rem' : 0,
                          }}
                        >
                          {ev.description}
                        </p>
                      )}
                      {ev.register_url && (
                        <a
                          href={ev.register_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--gold)',
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 500,
                          }}
                        >
                          Register / Details →
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PAST EVENTS */}
      {past.length > 0 && (
        <section
          className="section-bg-image"
          style={{
            backgroundImage: "url('/assets/images/portraits/grandkids-2025.jpg')",
            padding: 'clamp(4rem,8vw,6rem) 0',
          }}
        >
          <div className="container-wide">
            <ScrollReveal>
              <div className="rule-line" style={{ marginBottom: '1.25rem' }} />
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 400,
                  marginBottom: '2.5rem',
                  color: 'white',
                }}
              >
                Past Events
              </h2>
            </ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {past.map((ev, i) => (
                <ScrollReveal key={ev.id} delay={i * 60}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '1.5rem',
                      borderRadius: '2px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(var(--gold-rgb),0.75)',
                        fontFamily: '"Inter", sans-serif',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {formatEventDate(ev.event_date, ev.event_time)}
                    </p>
                    <h3
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '1.05rem',
                        fontWeight: 400,
                        color: 'white',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {ev.title}
                    </h3>
                    {(ev.venue || ev.location) && (
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.4)',
                        }}
                      >
                        {[ev.venue, ev.location].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 560px) {
          .event-card-row { flex-direction: column !important; }
        }
      `}</style>
    </>
  )
}
