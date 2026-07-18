'use client'
import React from 'react'

type SpinnerSize = 'sm' | 'md' | 'lg'

interface LoadingSpinnerProps {
  size?: SpinnerSize
  dark?: boolean
  label?: string
  center?: boolean
}

const SIZES: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 40,
}

export default function LoadingSpinner({
  size = 'md',
  dark = false,
  label,
  center = false,
}: LoadingSpinnerProps) {
  const px = SIZES[size]
  const color = dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.35)'
  const accent = '#0f5c73'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: center ? 'center' : 'flex-start',
        gap: '0.6rem',
        ...(center ? { width: '100%', padding: '3rem 0' } : {}),
      }}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'richards-spin 0.75s linear infinite', flexShrink: 0 }}
        aria-label={label || 'Loading'}
        role="status"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 2 a10 10 0 0 1 10 10"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <style>{`
          @keyframes richards-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      </svg>

      {label && (
        <p
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: '"Inter", sans-serif',
            color,
          }}
        >
          {label}
        </p>
      )}
    </div>
  )
}
