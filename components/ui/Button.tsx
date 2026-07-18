import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  href?: string
}

const BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4rem',
  fontFamily: '"Inter", sans-serif',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  border: 'none',
  borderRadius: '2px',
  cursor: 'pointer',
  transition: 'background 0.2s ease, opacity 0.2s ease, border-color 0.2s ease',
  textDecoration: 'none',
}

const VARIANTS: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: '#0f5c73',
    color: 'white',
    border: '1px solid #0f5c73',
  },
  secondary: {
    background: '#1c1a17',
    color: 'white',
    border: '1px solid #1c1a17',
  },
  ghost: {
    background: 'transparent',
    color: '#1c1a17',
    border: '1px solid rgba(0,0,0,0.25)',
  },
  danger: {
    background: 'transparent',
    color: 'rgba(220,80,80,0.85)',
    border: '1px solid rgba(220,80,80,0.3)',
  },
}

const SIZES: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: '0.62rem', padding: '0.45rem 0.9rem' },
  md: { fontSize: '0.7rem', padding: '0.75rem 1.6rem' },
  lg: { fontSize: '0.75rem', padding: '0.95rem 2.25rem' },
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  href,
}: ButtonProps) {
  const style: React.CSSProperties = {
    ...BASE,
    ...VARIANTS[variant],
    ...SIZES[size],
    ...(fullWidth ? { width: '100%' } : {}),
    opacity: disabled || loading ? 0.6 : 1,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
  }

  if (href) {
    return (
      <a href={href} style={style}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} style={style}>
      {loading ? 'Loading…' : children}
    </button>
  )
}
