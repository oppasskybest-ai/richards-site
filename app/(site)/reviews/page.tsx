import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/home/ScrollReveal'
import HomepageReviews from '@/components/home/HomepageReviews'
import { supabaseAdmin } from '@/lib/supabase/server'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Endorsements',
  description:
    'What readers, students, and colleagues are saying about the books of E. Randolph Richards.',
}

type Review = {
  id: string; quote: string; name: string; location: string
  rating: number; source: 'reader' | 'amazon'; book_slug: string | null
}

// Real endorsements, pulled word-for-word from randolphrichards.com/endorsements/.
// Used whenever the Supabase `reviews` table is empty/unreachable (i.e. before
// the DB is provisioned — see PROGRESS.md). Once Supabase is live, real
// reader-submitted reviews from the DB take precedence over this list.
const FALLBACK: Review[] = [
  { id: '1', quote: "Dr. Randy Richards taught me so much about the gospel of John from a new perspective. His teaching gives you insight into John's character and history of the times you didn't know. Dr. Richards has a wonderful way of speaking and making you feel wanting to continue learning. Dr. Richards also has a wonderful humor that puts you at ease.", name: 'Kathy Skinner', location: 'retired IT Director', rating: 5, source: 'reader', book_slug: null },
  { id: '2', quote: "Dr. Randy Richards is a gifted communicator and teacher of God's Word. He makes the text come alive with his extensive background knowledge, careful exposition, and practical application for today's world.", name: 'Jon Stubblefield', location: 'pastor', rating: 5, source: 'reader', book_slug: null },
  { id: '3', quote: 'Our presenter, Dr. Randy Richards is an incredible communicator. His biblical knowledge is unsurpassed. His presentations are fresh, extemporaneous, and winsome. It was a very pleasurable experience, and I look forward to hearing him again soon.', name: 'Del Gann', location: 'retired geology professor and pastor', rating: 5, source: 'reader', book_slug: null },
  { id: '4', quote: "I recently attended an expository Bible conference taught by Dr. Richards. His engaging teaching style and humor held everyone's attention through multiple sessions, and his knowledge of the historical context of the gospels gave me new insights into Jesus' life and ministry.", name: 'Kelly Hardin', location: 'former attorney and current church administrative assistant', rating: 5, source: 'reader', book_slug: null },
  { id: '5', quote: "Dr. Randy Richards made the 'Life of Jesus' come alive for us while leading our Expository Bible Conference last week. He pointed out some emotions and feelings the biblical characters were likely experiencing in a unique and meaningful presentation of John's Gospel. Attendance by our church members and guests was consistently high and our people were enthusiastic as we were drawn into the narrative through Randy's exciting style of teaching that kept us involved as if we were actually there. We would definitely like to have him return to lead future conferences.", name: 'Johnny Ross', location: 'Church Planter, Coronado Baptist Church, Hot Springs Village, Arkansas', rating: 5, source: 'reader', book_slug: null },
  { id: '6', quote: 'Dr. Richards teaches the hidden insights of antiquity into the life and times of Christ, presented in an enduring colloquial style. You will leave the conference in exhilarating wonderment, as if you have had a personal encounter with Jesus.', name: 'Gregg Cudworth', location: 'retired pharmacist and pastor', rating: 5, source: 'reader', book_slug: null },
]

async function getAllReviews(): Promise<Review[]> {
  try {
    const [{ data: v }, { data: b }] = await Promise.all([
      supabaseAdmin.from('reviews').select('id,quote,name,location,rating').eq('status','approved').order('created_at',{ascending:false}),
      supabaseAdmin.from('book_reviews').select('id,reviewer,body,country,rating,book_slug').eq('status','approved').order('created_at',{ascending:false}),
    ])
    const visitor: Review[] = (v||[]).map(r => ({ id:r.id, quote:r.quote, name:r.name, location:r.location||'', rating:r.rating||5, source:'reader', book_slug:null }))
    const amazon: Review[] = (b||[]).map(r => ({ id:r.id, quote:r.body, name:r.reviewer, location:r.country||'', rating:r.rating||5, source:'amazon', book_slug:r.book_slug }))
    const merged: Review[] = []
    const max = Math.max(visitor.length, amazon.length)
    for (let i = 0; i < max; i++) {
      if (amazon[i]) merged.push(amazon[i])
      if (visitor[i]) merged.push(visitor[i])
    }
    return merged.length > 0 ? merged : FALLBACK
  } catch { return FALLBACK }
}

export default async function ReviewsPage() {
  const reviews = await getAllReviews()
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
            Endorsements
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
            What People Are Saying
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
            Words from readers, students, and colleagues.
          </p>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section
        style={{
          padding: 'clamp(5rem,10vw,7rem) 0',
        }}
      >
        <div className="container-wide">
          <ScrollReveal>
            <HomepageReviews reviews={reviews} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: 'var(--paper)',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          padding: 'clamp(4rem,8vw,5.5rem) 0',
          textAlign: 'center',
        }}
      >
        <div className="container-narrow">
          <div className="rule-line" style={{ margin: '0 auto 1.5rem' }} />
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 400,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            Explore the Books
          </h2>
          <p
            style={{
              color: '#6b6b6b',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              marginBottom: '2.25rem',
              maxWidth: '420px',
              margin: '0 auto 2.25rem',
            }}
          >
            Misreading Scripture with Western Eyes, Rediscovering Paul, and more.
          </p>
          <Link
            href="/books"
            className="btn-gold"
            style={{
              padding: '0.9rem 2.5rem',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              borderRadius: '2px',
              display: 'inline-block',
            }}
          >
            View All Books
          </Link>
        </div>
      </section>
    </>
  )
}
