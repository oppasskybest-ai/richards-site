'use client'
import { useEffect, useRef, useState } from 'react'

interface Popover {
  ref: string
  text: string | null
  loading: boolean
  error: boolean
  x: number
  y: number
}

// Wraps an already-rendered article body (server-side, wrapBibleRefs()
// already added <span class="bible-ref" data-ref="..."> around each
// detected reference) and adds hover/click behavior via event delegation
// on the container -- one set of listeners handles every reference in the
// article, rather than a component per reference.
export default function BibleVerseInteractive({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [popover, setPopover] = useState<Popover | null>(null)
  const cache = useRef<Map<string, string>>(new Map())
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    async function showVerse(target: HTMLElement) {
      const ref = target.dataset.ref
      if (!ref) return
      const rect = target.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top

      if (cache.current.has(ref)) {
        setPopover({ ref, text: cache.current.get(ref)!, loading: false, error: false, x, y })
        return
      }

      setPopover({ ref, text: null, loading: true, error: false, x, y })
      try {
        const res = await fetch(`/api/bible-verse?ref=${encodeURIComponent(ref)}`)
        const data = await res.json()
        if (!res.ok || !data.text) throw new Error('not found')
        cache.current.set(ref, data.text)
        setPopover({ ref, text: data.text, loading: false, error: false, x, y })
      } catch {
        setPopover({ ref, text: null, loading: false, error: true, x, y })
      }
    }

    function onOver(e: Event) {
      const target = (e.target as HTMLElement).closest('.bible-ref') as HTMLElement | null
      if (!target) return
      if (closeTimer.current) clearTimeout(closeTimer.current)
      showVerse(target)
    }

    function onOut(e: Event) {
      const target = (e.target as HTMLElement).closest('.bible-ref')
      if (!target) return
      closeTimer.current = setTimeout(() => setPopover(null), 200)
    }

    function onClick(e: Event) {
      const target = (e.target as HTMLElement).closest('.bible-ref') as HTMLElement | null
      if (!target) return
      e.preventDefault()
      showVerse(target)
    }

    container.addEventListener('mouseover', onOver)
    container.addEventListener('mouseout', onOut)
    container.addEventListener('click', onClick)
    container.addEventListener('focusin', onOver)

    return () => {
      container.removeEventListener('mouseover', onOver)
      container.removeEventListener('mouseout', onOut)
      container.removeEventListener('click', onClick)
      container.removeEventListener('focusin', onOver)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {children}

      {popover && (
        <div
          onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current) }}
          onMouseLeave={() => setPopover(null)}
          style={{
            position: 'fixed',
            left: Math.min(Math.max(popover.x, 160), (typeof window !== 'undefined' ? window.innerWidth - 160 : popover.x)),
            top: popover.y,
            transform: 'translate(-50%, calc(-100% - 12px))',
            width: 'min(320px, 90vw)',
            background: 'var(--ink)',
            color: 'white',
            borderRadius: '4px',
            padding: '1rem 1.15rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
            zIndex: 500,
            fontFamily: '"Georgia", serif',
          }}
        >
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-light)', fontFamily: '"Inter", sans-serif', marginBottom: '0.5rem' }}>
            {popover.ref} <span style={{ opacity: 0.5 }}>· KJV</span>
          </p>
          {popover.loading && <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Loading…</p>}
          {popover.error && <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Couldn&rsquo;t load this verse.</p>}
          {popover.text && (
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic' }}>{popover.text}</p>
          )}
          <div style={{
            position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)',
            width: '12px', height: '12px', background: 'var(--ink)',
          }} />
        </div>
      )}

      <style>{`
        .bible-ref {
          border-bottom: 1px dotted var(--gold);
          cursor: help;
          color: inherit;
        }
        .bible-ref:hover, .bible-ref:focus {
          background: rgba(var(--gold-rgb), 0.12);
          outline: none;
        }
      `}</style>
    </div>
  )
}
