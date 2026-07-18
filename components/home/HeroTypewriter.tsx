'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const WORDS = ['Scholar.', 'Author.', 'Professor.', 'Provost.']
const TYPE_SPEED = 80
const DELETE_SPEED = 45
const PAUSE_AFTER = 2200
const PAUSE_BEFORE = 400

// Cycles the headline through a few warm, restrained tones drawn from the
// site palette (teal + brick) rather than arbitrary rainbow colors — keeps
// the effect subtle and in keeping with an academic, understated tone.
const WORD_COLORS = ['#5ab8cc', '#e8ddc7', '#d8836f', '#8fd0de']
let colorCursor = 0
function randomWordColor() {
  colorCursor = (colorCursor + 1) % WORD_COLORS.length
  return WORD_COLORS[colorCursor]
}

export default function HeroTypewriter() {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('typing')
  const [color, setColor] = useState(randomWordColor)

  useEffect(() => {
    const target = WORDS[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), PAUSE_AFTER)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 0)
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED)
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % WORDS.length)
          setColor(randomWordColor())
          setPhase('waiting')
        }, PAUSE_BEFORE)
      }
    } else if (phase === 'waiting') {
      timeout = setTimeout(() => setPhase('typing'), 100)
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, wordIndex])

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

      {/* TYPEWRITER HEADLINE */}
      <h1 className="animate-fade-up delay-100" style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
        fontWeight: 400, color,
        lineHeight: 1.04, letterSpacing: '-0.025em',
        marginBottom: '1.5rem',
        minHeight: 'clamp(4.5rem, 10vw, 8.5rem)',
        transition: 'color 0.3s ease',
      }}>
        {displayed}
        <span className="typewriter-cursor" aria-hidden="true" />
      </h1>

      {/* SUBHEADLINE */}
      <p className="animate-fade-up delay-200" style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(1.15rem, 2.5vw, 1.6rem)',
        color: 'rgba(255,255,255,0.38)',
        fontStyle: 'italic',
        marginBottom: '1.25rem',
        fontWeight: 400,
      }}>
        Ph.D., retired Professor of New Testament.
      </p>

      {/* BIO LINE */}
      <p className="animate-fade-up delay-300" style={{
        fontSize: 'clamp(0.95rem, 1.5vw, 1.08rem)',
        color: 'rgba(255,255,255,0.52)',
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
