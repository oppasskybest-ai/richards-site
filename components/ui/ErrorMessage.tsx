'use client'
import React from 'react'

type ErrorVariant = 'inline' | 'banner' | 'page'

interface ErrorMessageProps {
  message: string | null | undefined
  variant?: ErrorVariant
  onRetry?: () => void
  dark?: boolean
}

export default function ErrorMessage({
  message,
  variant = 'inline',
  onRetry,
  dark = false,
}: ErrorMessageProps) {
  if (!message) return null

  // ── INLINE — single line under a field or action ──────────────────────
  if (variant === 'inline') {
    return (
      <p
        role="alert"
        style={{
          fontSize: '0.75rem',
          color: dark ? 'rgba(255,120,120,0.9)' : '#c0392b',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 400,
          marginTop: '0.35rem',
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>
    )
  }

  // ── BANNER — full-width coloured bar ─────────────────────────────────
  if (variant === 'banner') {
    return (
      <div
        role="alert"
        style={{
          background: dark ? 'rgba(192,57,43,0.15)' : 'rgba(192,57,43,0.06)',
          border: `1px solid ${dark ? 'rgba(192,57,43,0.35)' : 'rgba(192,57,43,0.2)'}`,
          borderRadius: '2px',
          padding: '0.85rem 1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <p
          style={{
            fontSize: '0.82rem',
            color: dark ? 'rgba(255,140,130,0.9)' : '#c0392b',
            fontFamily: '"Inter", sans-serif',
            lineHeight: 1.5,
          }}
        >
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif',
              color: dark ? 'rgba(255,140,130,0.8)' : '#c0392b',
              cursor: 'pointer',
              flexShrink: 0,
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            Try again
          </button>
        )}
      </div>
    )
  }

  // ── PAGE — centred block for full-page load failures ─────────────────
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(192,57,43,0.08)',
          border: '1px solid rgba(192,57,43,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          fontSize: '1.1rem',
        }}
      >
        ✕
      </div>
      <p
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.1rem',
          color: dark ? 'white' : '#1c1a17',
          marginBottom: '0.5rem',
          fontWeight: 400,
        }}
      >
        Something went wrong
      </p>
      <p
        style={{
          fontSize: '0.82rem',
          color: dark ? 'rgba(255,255,255,0.45)' : '#6b6b6b',
          fontFamily: '"Inter", sans-serif',
          lineHeight: 1.6,
          maxWidth: '360px',
          marginBottom: onRetry ? '1.5rem' : 0,
        }}
      >
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.7rem 1.5rem',
            background: 'transparent',
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '2px',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: '"Inter", sans-serif',
            color: '#1c1a17',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      )}
    </div>
  )
}
