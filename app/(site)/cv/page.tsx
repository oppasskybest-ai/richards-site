import type { Metadata } from 'next'
import { CV_HTML } from '@/lib/config/cv'
import CVSections from '@/components/cv/CVSections'

export const metadata: Metadata = {
  title: 'CV',
  description: 'Full curriculum vitae of E. Randolph Richards, Ph.D. -- publications, presentations, and administrative experience.',
}

function slugifySection(title: string) {
  return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

// A CV is a reference document people jump around in, not read start to
// finish -- reusing the same linear article-prose treatment (built for
// blog posts) didn't serve it well. Split the single CV_HTML blob into
// real sections at each <h2>, so a table of contents + distinct section
// numbering is possible, instead of one long undifferentiated scroll.
function parseSections(html: string) {
  const parts = html.split(/(?=<h2>)/)
  return parts
    .filter((p) => p.trim())
    .map((part) => {
      const match = part.match(/^<h2>([^<]*)<\/h2>/)
      const title = match ? match[1] : 'Overview'
      const body = match ? part.slice(match[0].length) : part
      return { title, id: slugifySection(title), body }
    })
}

export default function CVPage() {
  const sections = parseSections(CV_HTML)

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
          <p
            className="animate-fade-up delay-200"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {sections.length} sections — publications, presentations, and administrative experience
          </p>
        </div>
      </section>

      {/* FULL CV — sidebar table of contents + numbered sections */}
      <section style={{ background: '#f8f6f1', padding: 'clamp(3rem,7vw,5rem) 0' }}>
        <div className="container-wide">
          <CVSections sections={sections} />
        </div>
      </section>
    </>
  )
}
