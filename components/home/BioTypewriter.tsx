'use client'
import { useEffect, useState, useRef } from 'react'

const FULL_TEXT = `I've been teaching the New Testament since 1986 — in Texas, in Indonesia, in Arkansas, and now in Florida. I've spent most of that time trying to help people read Scripture a little more like its first readers would have.`

const TYPE_SPEED = 28

export default function BioTypewriter() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || done) return
    if (displayed.length < FULL_TEXT.length) {
      const t = setTimeout(() => setDisplayed(FULL_TEXT.slice(0, displayed.length + 1)), TYPE_SPEED)
      return () => clearTimeout(t)
    } else {
      setDone(true)
    }
  }, [started, displayed, done])

  return (
    <p ref={ref} style={{
      fontSize: 'clamp(1rem, 1.5vw, 1.12rem)',
      color: '#1c1c1c',
      lineHeight: 1.9,
      fontFamily: '"Playfair Display", serif',
      fontStyle: 'italic',
      fontWeight: 400,
      marginBottom: '1.5rem',
      minHeight: '5rem',
    }}>
      {displayed}
      {!done && (
        <span style={{
          display: 'inline-block', width: '2px', height: '1em',
          background: 'var(--gold)', marginLeft: '2px', verticalAlign: 'middle',
          animation: 'blink 1s step-end infinite',
        }} aria-hidden="true" />
      )}
    </p>
  )
}
