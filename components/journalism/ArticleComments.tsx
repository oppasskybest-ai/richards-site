'use client'
import { useState, useEffect, useCallback } from 'react'

interface Comment {
  id: string
  author_name: string
  body: string
  parent_id: string | null
  created_at: string
}

interface Props {
  articleId: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function getInitials(name: string) {
  return name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function ArticleComments({ articleId }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [replyTo, setReplyTo] = useState<string | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/public/comments?article_id=${articleId}`)
      const d = await res.json()
      setComments(d.data || [])
    } catch {
      // silently fail — comments are non-critical
    } finally {
      setLoading(false)
    }
  }, [articleId])

  useEffect(() => { loadComments() }, [loadComments])

  const submit = async () => {
    setError('')
    if (!name.trim() || !body.trim()) {
      setError('Name and comment are required.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/public/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article_id: articleId, author_name: name, author_email: email, body, parent_id: replyTo }),
      })
      const d = await res.json()
      if (!res.ok) { setError(d.error || 'Failed to submit.'); return }
      setSubmitted(true)
      setName(''); setEmail(''); setBody(''); setReplyTo(null)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Nest replies under their parent
  const topLevel = comments.filter(c => !c.parent_id)
  const replies = (parentId: string) => comments.filter(c => c.parent_id === parentId)

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '2px', fontSize: '0.9rem', fontFamily: '"Inter", sans-serif',
    background: 'white', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <section style={{ marginTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '3rem' }}>
      <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 400, marginBottom: '2rem', letterSpacing: '-0.01em' }}>
        {loading ? 'Comments' : `${comments.length} Comment${comments.length !== 1 ? 's' : ''}`}
      </h2>

      {/* COMMENT LIST */}
      {!loading && topLevel.length > 0 && (
        <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {topLevel.map(c => (
            <div key={c.id}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {/* Avatar */}
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `hsl(${c.author_name.charCodeAt(0) * 13 % 360},42%,52%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 600, fontFamily: '"Inter", sans-serif', flexShrink: 0 }}>
                  {getInitials(c.author_name)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink)' }}>{c.author_name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#aaa', fontFamily: '"Inter", sans-serif' }}>{formatDate(c.created_at)}</span>
                  </div>
                  <p style={{ lineHeight: 1.8, color: '#3a3a3a', fontSize: '0.93rem', marginBottom: '0.5rem' }}>{c.body}</p>
                  <button onClick={() => setReplyTo(replyTo === c.id ? null : c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', padding: 0, letterSpacing: '0.06em' }}>
                    {replyTo === c.id ? 'Cancel reply' : '↩ Reply'}
                  </button>

                  {/* Inline reply form */}
                  {replyTo === c.id && !submitted && (
                    <div style={{ marginTop: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--gold)' }}>
                      <ReplyForm name={name} email={email} body={body} error={error} submitting={submitting}
                        onName={setName} onEmail={setEmail} onBody={setBody} onSubmit={submit} inputStyle={inputStyle} />
                    </div>
                  )}
                </div>
              </div>

              {/* Replies */}
              {replies(c.id).length > 0 && (
                <div style={{ marginLeft: '3.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid rgba(0,0,0,0.07)', paddingLeft: '1.25rem' }}>
                  {replies(c.id).map(r => (
                    <div key={r.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `hsl(${r.author_name.charCodeAt(0) * 13 % 360},42%,52%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', fontWeight: 600, flexShrink: 0 }}>
                        {getInitials(r.author_name)}
                      </div>
                      <div>
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '0.82rem', color: 'var(--ink)' }}>{r.author_name}</span>
                          <span style={{ fontSize: '0.72rem', color: '#aaa', fontFamily: '"Inter", sans-serif' }}>{formatDate(r.created_at)}</span>
                        </div>
                        <p style={{ lineHeight: 1.8, color: '#3a3a3a', fontSize: '0.88rem' }}>{r.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && topLevel.length === 0 && (
        <p style={{ color: '#888', fontSize: '0.9rem', fontFamily: '"Inter", sans-serif', marginBottom: '2.5rem' }}>
          No comments yet. Be the first to leave one.
        </p>
      )}

      {/* MAIN FORM — shown when not replying inline */}
      {!replyTo && (
        <div style={{ background: 'var(--paper)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '3px', padding: 'clamp(1.5rem,4vw,2.5rem)' }}>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.25rem', fontWeight: 400, marginBottom: '1.5rem' }}>
            Leave a comment
          </h3>
          {submitted ? (
            <div style={{ background: 'rgba(var(--gold-rgb),0.08)', border: '1px solid rgba(var(--gold-rgb),0.3)', borderRadius: '2px', padding: '1.25rem 1.5rem' }}>
              <p style={{ color: 'var(--gold)', fontFamily: '"Inter", sans-serif', fontSize: '0.9rem', fontWeight: 500 }}>
                ✓ Thank you — your comment has been submitted and is awaiting approval.
              </p>
            </div>
          ) : (
            <ReplyForm name={name} email={email} body={body} error={error} submitting={submitting}
              onName={setName} onEmail={setEmail} onBody={setBody} onSubmit={submit} inputStyle={inputStyle} />
          )}
        </div>
      )}
    </section>
  )
}

function ReplyForm({ name, email, body, error, submitting, onName, onEmail, onBody, onSubmit, inputStyle }: {
  name: string; email: string; body: string; error: string; submitting: boolean
  onName: (v: string) => void; onEmail: (v: string) => void; onBody: (v: string) => void
  onSubmit: () => void; inputStyle: React.CSSProperties
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input value={name} onChange={e => onName(e.target.value)} placeholder="Your name *" style={inputStyle} maxLength={80} />
        <input value={email} onChange={e => onEmail(e.target.value)} placeholder="Email (optional, not shown)" type="email" style={inputStyle} maxLength={120} />
      </div>
      <textarea value={body} onChange={e => onBody(e.target.value)} placeholder="Write your comment..." rows={5}
        style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} maxLength={2000} />
      {error && <p style={{ color: '#c0392b', fontSize: '0.82rem', fontFamily: '"Inter", sans-serif' }}>{error}</p>}
      <button onClick={onSubmit} disabled={submitting} style={{
        alignSelf: 'flex-start', padding: '0.8rem 2rem', background: submitting ? '#888' : 'var(--gold)',
        color: 'white', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
        fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
        fontFamily: '"Inter", sans-serif', fontWeight: 500, borderRadius: '2px',
      }}>
        {submitting ? 'Submitting…' : 'Post Comment'}
      </button>
      <p style={{ fontSize: '0.72rem', color: '#999', fontFamily: '"Inter", sans-serif' }}>
        Comments are reviewed before appearing publicly.
      </p>
    </div>
  )
}
