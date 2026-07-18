import React from 'react'

type InputType = 'text' | 'email' | 'password' | 'url' | 'date' | 'tel'

interface InputProps {
  value: string
  onChange: (value: string) => void
  type?: InputType
  placeholder?: string
  label?: string
  error?: string | null
  disabled?: boolean
  required?: boolean
  dark?: boolean
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

interface TextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  error?: string | null
  disabled?: boolean
  required?: boolean
  dark?: boolean
  rows?: number
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  label?: string
  error?: string | null
  disabled?: boolean
  dark?: boolean
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.62rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontFamily: '"Inter", sans-serif',
  marginBottom: '0.4rem',
}

const errorStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#c0392b',
  marginTop: '0.3rem',
  fontFamily: '"Inter", sans-serif',
}

function getFieldStyle(dark: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '0.75rem 0.9rem',
    fontSize: '0.85rem',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    background: dark ? 'rgba(255,255,255,0.08)' : 'white',
    color: dark ? 'white' : 'var(--ink)',
    border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.18)',
    borderRadius: '2px',
    outline: 'none',
    boxSizing: 'border-box',
  }
}

export function Input({
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  dark = false,
  onKeyDown,
}: InputProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ ...labelStyle, color: dark ? 'rgba(var(--gold-rgb),0.7)' : '#6b6b6b' }}>
          {label}{required && ' *'}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onKeyDown={onKeyDown}
        style={{
          ...getFieldStyle(dark),
          borderColor: error
            ? '#c0392b'
            : dark
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(0,0,0,0.18)',
          opacity: disabled ? 0.6 : 1,
        }}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
}

export function Textarea({
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  dark = false,
  rows = 5,
}: TextareaProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ ...labelStyle, color: dark ? 'rgba(var(--gold-rgb),0.7)' : '#6b6b6b' }}>
          {label}{required && ' *'}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        style={{
          ...getFieldStyle(dark),
          resize: 'vertical',
          minHeight: `${rows * 1.6}rem`,
          lineHeight: 1.6,
          borderColor: error
            ? '#c0392b'
            : dark
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(0,0,0,0.18)',
          opacity: disabled ? 0.6 : 1,
        }}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
}

export function Select({
  value,
  onChange,
  options,
  label,
  error,
  disabled = false,
  dark = false,
}: SelectProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ ...labelStyle, color: dark ? 'rgba(var(--gold-rgb),0.7)' : '#6b6b6b' }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{
          ...getFieldStyle(dark),
          borderColor: error
            ? '#c0392b'
            : dark
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(0,0,0,0.18)',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
}

export default Input
