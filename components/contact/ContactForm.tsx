'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) {
      setStatus('error')
      setErrorMsg('Please fill in the required fields.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const d = await res.json()
        setStatus('error')
        setErrorMsg(d.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.9rem 1rem', fontSize: '0.88rem',
    fontFamily: '"Inter", sans-serif', fontWeight: 300,
    background: 'white', color: '#1c1a17',
    border: '1px solid rgba(0,0,0,0.18)', borderRadius: '2px',
    outline: 'none', marginBottom: '1rem',
  }

  if (status === 'success') {
    return (
      <div style={{ padding: '3rem 0' }}>
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: '#1c1a17', marginBottom: '0.75rem' }}>
          Message sent.
        </p>
        <p style={{ color: '#6b6b6b', fontSize: '0.88rem' }}>
          If you sent an interesting one, you&rsquo;ll get an interesting response.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', fontFamily: '"Inter", sans-serif', marginBottom: '0.4rem' }}>
            First Name *
          </label>
          <input style={inputStyle} type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', fontFamily: '"Inter", sans-serif', marginBottom: '0.4rem' }}>
            Last Name
          </label>
          <input style={inputStyle} type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
        </div>
      </div>

      <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', fontFamily: '"Inter", sans-serif', marginBottom: '0.4rem' }}>
        Email *
      </label>
      <input style={inputStyle} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />

      <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', fontFamily: '"Inter", sans-serif', marginBottom: '0.4rem' }}>
        Subject
      </label>
      <input style={inputStyle} type="text" value={form.subject} onChange={(e) => update('subject', e.target.value)} />

      <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', fontFamily: '"Inter", sans-serif', marginBottom: '0.4rem' }}>
        Message *
      </label>
      <textarea style={{ ...inputStyle, minHeight: '160px', resize: 'vertical' }}
        value={form.message} onChange={(e) => update('message', e.target.value)} />

      {status === 'error' && (
        <p style={{ color: '#c0392b', fontSize: '0.8rem', marginBottom: '1rem' }}>{errorMsg}</p>
      )}

      <button onClick={handleSubmit} disabled={status === 'loading'}
        style={{
          padding: '0.9rem 2.5rem', background: '#1c1a17', color: 'white', border: 'none',
          fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
          fontFamily: '"Inter", sans-serif', fontWeight: 500, cursor: 'pointer',
          borderRadius: '2px', transition: 'background 0.2s ease',
          opacity: status === 'loading' ? 0.7 : 1,
        }}>
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </div>
  )
}
