'use client'
import { useState } from 'react'

interface Props {
  dark?: boolean
  /** Show newsletter / new book / new article opt-in checkboxes (used by the subscribe popup). */
  showPreferences?: boolean
  /** Called after a successful subscribe (new or re-subscribe). Used by the popup to persist "already subscribed" and close itself. */
  onSuccess?: () => void
}

export default function SubscribeForm({ dark = false, showPreferences = false, onSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [wantsNewsletter, setWantsNewsletter] = useState(true)
  const [wantsBookUpdates, setWantsBookUpdates] = useState(true)
  const [wantsArticleUpdates, setWantsArticleUpdates] = useState(true)
  const [wantsEventUpdates, setWantsEventUpdates] = useState(true)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          ...(showPreferences
            ? {
                preferences: {
                  newsletter: wantsNewsletter,
                  bookUpdates: wantsBookUpdates,
                  articleUpdates: wantsArticleUpdates,
                  eventUpdates: wantsEventUpdates,
                },
              }
            : {}),
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'You\'re in.')
        setEmail('')
        setFirstName('')
        onSuccess?.()
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  const inputStyle = {
    flex: 1, padding: '0.9rem 1.1rem', fontSize: '0.85rem', fontFamily: '"Inter", sans-serif',
    background: dark ? 'rgba(255,255,255,0.08)' : 'white',
    color: dark ? 'white' : '#1c1a17',
    border: dark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.2)',
    borderRadius: '2px', outline: 'none',
  }

  if (status === 'success') {
    return (
      <p style={{ color: dark ? 'rgba(255,255,255,0.8)' : '#3a3a3a', fontSize: '0.9rem', fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>
        {message}
      </p>
    )
  }

  const checkboxLabelStyle = {
    display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem',
    fontFamily: '"Inter", sans-serif', color: dark ? 'rgba(255,255,255,0.85)' : '#3a3a3a',
    cursor: 'pointer',
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        <input type="text" placeholder="First name (optional)" value={firstName} onChange={(e) => setFirstName(e.target.value)}
          style={{ ...inputStyle, flex: '0 0 160px' }} />
        <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          style={inputStyle} required />
      </div>
      {showPreferences && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', margin: '0.9rem 0 1.1rem' }}>
          <label style={checkboxLabelStyle}>
            <input type="checkbox" checked={wantsNewsletter} onChange={(e) => setWantsNewsletter(e.target.checked)} />
            Newsletter updates
          </label>
          <label style={checkboxLabelStyle}>
            <input type="checkbox" checked={wantsBookUpdates} onChange={(e) => setWantsBookUpdates(e.target.checked)} />
            New book releases
          </label>
          <label style={checkboxLabelStyle}>
            <input type="checkbox" checked={wantsArticleUpdates} onChange={(e) => setWantsArticleUpdates(e.target.checked)} />
            New articles &amp; journalism
          </label>
          <label style={checkboxLabelStyle}>
            <input type="checkbox" checked={wantsEventUpdates} onChange={(e) => setWantsEventUpdates(e.target.checked)} />
            New events
          </label>
        </div>
      )}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <button onClick={handleSubmit} disabled={status === 'loading' || !email}
          style={{
            padding: '0.9rem 1.75rem', background: '#0f5c73', color: 'white', border: 'none',
            fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            fontFamily: '"Inter", sans-serif', fontWeight: 500, cursor: 'pointer',
            borderRadius: '2px', transition: 'background 0.2s ease',
            opacity: status === 'loading' ? 0.7 : 1,
          }}>
          {status === 'loading' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p style={{ color: '#c0392b', fontSize: '0.78rem', marginTop: '0.4rem' }}>{message}</p>
      )}
    </div>
  )
}
