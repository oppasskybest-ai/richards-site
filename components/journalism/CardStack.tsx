'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import VanillaTilt from 'vanilla-tilt'
import { CardItem } from '@/types/journalism'
import { getPublicationTag } from '@/lib/utils/slugify'

interface Props {
  cards: CardItem[]
  label: string
}

const OFFSETS = [
  { rotate: '0deg',    tx: '0px',  ty: '0px',  z: 4 },
  { rotate: '2deg',    tx: '6px',  ty: '5px',  z: 3 },
  { rotate: '-1.5deg', tx: '-5px', ty: '9px',  z: 2 },
  { rotate: '1deg',    tx: '10px', ty: '13px', z: 1 },
]

export default function CardStack({ cards, label }: Props) {
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = tiltRef.current
    // Disable on mobile — VanillaTilt has no touch value here
    if (!el || typeof window === 'undefined' || window.innerWidth < 768) return

    VanillaTilt.init(el, {
      max: 12,
      speed: 400,
      glare: false,
      scale: 1.025,
      perspective: 900,
      // Reset smoothly when mouse leaves
      reset: true,
    })

    // Proper cleanup — prevents memory leaks and stale event listeners
    return () => {
      (el as any).vanillaTilt?.destroy()
    }
  }, [])

  const visible = cards.slice(0, 4)

  return (
    <div>
      {/* CATEGORY LABEL */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '28px', height: '1.5px', background: 'var(--gold)', display: 'block', flexShrink: 0 }} />
        <span style={{
          fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--gold)', fontFamily: '"Inter", sans-serif', fontWeight: 500,
        }}>
          {label}
        </span>
      </div>

      {/* STACK */}
      <div
        ref={tiltRef}
        style={{
          position: 'relative',
          height: '220px',
          transition: 'transform 0.18s ease',
          transformStyle: 'preserve-3d',
          cursor: 'default',
        }}
      >
        {visible.map((card, i) => {
          const o = OFFSETS[i] || OFFSETS[OFFSETS.length - 1]
          const isTop = i === 0
          const tagClass = getPublicationTag(card.publication)

          return (
            <a
              key={card.id}
              href={isTop ? card.url : undefined}
              target={isTop ? '_blank' : undefined}
              rel={isTop ? 'noopener noreferrer' : undefined}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '220px',
                background: i === 0
                  ? 'white'
                  : `rgba(${240 - i * 8},${236 - i * 8},${228 - i * 6},${1 - i * 0.12})`,
                border: '1px solid rgba(0,0,0,0.09)',
                borderRadius: '2px',
                overflow: 'hidden',
                transform: `rotate(${o.rotate}) translate(${o.tx}, ${o.ty})`,
                zIndex: o.z,
                boxShadow: isTop
                  ? '0 6px 24px rgba(0,0,0,0.12)'
                  : '0 2px 8px rgba(0,0,0,0.06)',
                textDecoration: 'none', color: 'inherit',
                pointerEvents: isTop ? 'auto' : 'none',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {isTop && (
                <>
                  {/* THUMBNAIL if available */}
                  {card.image && (
                    <div style={{
                      position: 'relative', width: '100%', height: '100px',
                      flexShrink: 0, background: 'var(--paper-dark)', overflow: 'hidden',
                    }}>
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="320px"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          const el = e.currentTarget as HTMLImageElement
                          el.parentElement!.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* TEXT */}
                  <div style={{ padding: '0.9rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className={tagClass} style={{
                        fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                        fontFamily: '"Inter", sans-serif', fontWeight: 500,
                        padding: '0.15rem 0.45rem', borderRadius: '2px',
                        marginBottom: '0.5rem', display: 'inline-block',
                      }}>
                        {card.publication}
                      </span>
                      <p style={{
                        fontFamily: '"Playfair Display", serif', fontSize: '0.88rem',
                        lineHeight: 1.4, color: 'var(--ink)', fontWeight: 400,
                        display: '-webkit-box', WebkitLineClamp: card.image ? 2 : 3,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {card.title}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.1em',
                      textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
                    }}>
                      Read ↗
                    </span>
                  </div>
                </>
              )}
            </a>
          )
        })}
      </div>

      {/* COUNT */}
      <p style={{ fontSize: '0.68rem', color: '#999', fontFamily: '"Inter", sans-serif', marginTop: '0.85rem' }}>
        {cards.length} piece{cards.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
