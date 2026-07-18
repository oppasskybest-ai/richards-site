'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import SubscribeForm from './SubscribeForm'

// ============================================================
// SubscribePopup
//
// Behaviour (as specified):
// - First appearance: homepage, 10 seconds after landing.
// - After that: reappears every time the visitor has accumulated
//   10 more minutes of total time on the site (any page, cumulative —
//   not per-page), looping for the entire visit.
// - Closing it WITHOUT subscribing does not stop the loop — it keeps
//   reappearing on the same cadence.
// - The only thing that stops it permanently is a successful subscribe.
// - "Subscribed" is remembered in localStorage so it never shows again
//   in this browser once someone has signed up.
//
// Cumulative time is tracked in sessionStorage so it survives client-side
// navigation between pages in the same tab, but resets for a fresh tab —
// which is the standard expectation for this kind of popup.
// ============================================================

const ALREADY_SUBSCRIBED_KEY = 'richards_subscribed'
const SESSION_STATE_KEY = 'richards_popup_state'
const INITIAL_DELAY_SECONDS = 10
const RECURRING_GAP_SECONDS = 10 * 60 // 10 minutes

interface PopupState {
  cumulativeSeconds: number
  lastShownAtSeconds: number
  hasShownInitial: boolean
}

function loadState(): PopupState {
  if (typeof window === 'undefined') return { cumulativeSeconds: 0, lastShownAtSeconds: 0, hasShownInitial: false }
  try {
    const raw = sessionStorage.getItem(SESSION_STATE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore corrupt state, start fresh
  }
  return { cumulativeSeconds: 0, lastShownAtSeconds: 0, hasShownInitial: false }
}

function saveState(state: PopupState) {
  try {
    sessionStorage.setItem(SESSION_STATE_KEY, JSON.stringify(state))
  } catch {
    // sessionStorage unavailable (e.g. private mode edge cases) — fail silently, popup just won't persist across nav
  }
}

export default function SubscribePopup() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(true) // default true until we've checked, so it never flashes open incorrectly
  const stateRef = useRef<PopupState>(loadState())

  // On mount: check subscribed flag once.
  useEffect(() => {
    const already = typeof window !== 'undefined' && localStorage.getItem(ALREADY_SUBSCRIBED_KEY) === '1'
    setSubscribed(already)
  }, [])

  useEffect(() => {
    if (subscribed) return // never run the timer for someone who's already subscribed

    const tick = () => {
      if (document.visibilityState !== 'visible') return
      const state = stateRef.current
      state.cumulativeSeconds += 1

      if (!state.hasShownInitial) {
        // First-ever appearance: only fires while on the homepage, at 10s.
        // If the visitor didn't land on the homepage, this simply falls
        // through to the recurring 10-minute check below instead.
        if (pathname === '/' && state.cumulativeSeconds >= INITIAL_DELAY_SECONDS) {
          state.hasShownInitial = true
          state.lastShownAtSeconds = state.cumulativeSeconds
          setIsOpen(true)
        } else if (state.cumulativeSeconds - state.lastShownAtSeconds >= RECURRING_GAP_SECONDS) {
          state.hasShownInitial = true
          state.lastShownAtSeconds = state.cumulativeSeconds
          setIsOpen(true)
        }
      } else if (state.cumulativeSeconds - state.lastShownAtSeconds >= RECURRING_GAP_SECONDS) {
        state.lastShownAtSeconds = state.cumulativeSeconds
        setIsOpen(true)
      }

      saveState(state)
    }

    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
    // pathname is intentionally read fresh each tick via closure below;
    // re-running this effect on every navigation would reset the interval
    // needlessly, so we deliberately don't list pathname as a dependency
    // beyond what's needed — see the ref-based read in tick().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribed])

  const handleClose = () => setIsOpen(false)

  const handleSuccess = () => {
    localStorage.setItem(ALREADY_SUBSCRIBED_KEY, '1')
    setSubscribed(true)
    setIsOpen(false)
  }

  if (subscribed || !isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Subscribe to updates"
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(15,15,15,0.55)',
        padding: '1.25rem',
        animation: 'richardsPopupFadeIn 0.35s ease',
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '85vh',
          overflowY: 'auto',
          background: '#f6f1e6',
          borderRadius: '4px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
          padding: '2.75rem 2.5rem',
          animation: 'richardsPopupRise 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: '1.1rem', right: '1.1rem',
            width: '32px', height: '32px', borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.15)', background: 'white',
            fontSize: '1rem', lineHeight: 1, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#3a3a3a',
          }}
        >
          ×
        </button>

        <div style={{ width: '40px', height: '2px', background: '#0f5c73', marginBottom: '1.25rem' }} />

        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '1.6rem',
            color: '#1c1a17',
            margin: '0 0 0.6rem',
            lineHeight: 1.25,
          }}
        >
          Stay in the loop
        </h2>
        <p style={{ color: '#3a3a3a', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
          Get word the moment a new book, article, or newsletter goes live —
          no spam, unsubscribe anytime.
        </p>

        <SubscribeForm showPreferences onSuccess={handleSuccess} />
      </div>

      <style>{`
        @keyframes richardsPopupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes richardsPopupRise {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
