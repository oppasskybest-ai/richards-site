'use client'
import { useState, useEffect, useCallback } from 'react'

interface Comment {
  id: string
  author_name: string
  body: string
  parent_id: string | null
  created_at: string
  is_owner_reply?: boolean
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

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: '2px', fontSize: '0.9rem', fontFamily: '"Inter", sans-serif',
  background: 'white', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
}

export default function ArticleComments({ articleId }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [replyTo, setReplyTo] = useState<string | null>(null) // null = top-level form

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

  const submitComment = async (name: string, email: string, body: string, parentId: string | null) => {
    const res = await fetch('/api/public/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article_id: articleId, author_name: name, author_email: email, body, parent_id: parentId }),
    })
    const d = await res.json()
    if (!res.ok) return { ok: false, error: d.error || 'Failed to submit.' }
    // Comments show immediately -- append locally instead of waiting on a refetch
    if (d.comment) setComments(prev => [...prev, d.comment])
    setReplyTo(null)
    return { ok: true }
  }

  // Build a real tree so replies-to-replies nest to any depth, not just one level.
  const childrenOf = (parentId: string | null) => comments.filter(c => (c.parent_id || null) === parentId)
  const topLevel = childrenOf(null)

  return (
    <section style={{ marginTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '3rem' }}>
      <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 400, marginBottom: '2rem', letterSpacing: '-0.01em' }}>
        {loading ? 'Comments' : `${comments.length} Comment${comments.length !== 1 ? 's' : ''}`}
      </h2>

      {!loading && topLevel.length > 0 && (
        <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {topLevel.map(c => (
            <CommentThread
              key={c.id}
              comment={c}
              depth={0}
              childrenOf={childrenOf}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              submitComment={submitComment}
            />
          ))}
        </div>
      )}

      {!loading && topLevel.length === 0 && (
        <p style={{ color: '#888', fontSize: '0.9rem', fontFamily: '"Inter", sans-serif', marginBottom: '2.5rem' }}>
          No comments yet. Be the first to leave one.
        </p>
      )}

      {/* MAIN FORM — always visible for a fresh top-level comment */}
      {replyTo === null && (
        <div style={{ background: 'var(--paper)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '3px', padding: 'clamp(1.5rem,4vw,2.5rem)' }}>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.25rem', fontWeight: 400, marginBottom: '1.5rem' }}>
            Leave a comment
          </h3>
          <ReplyForm onSubmit={(n, e, b) => submitComment(n, e, b, null)} />
        </div>
      )}
    </section>
  )
}

// Recursive — renders a comment plus all of its descendants at any depth.
function CommentThread({
  comment, depth, childrenOf, replyTo, setReplyTo, submitComment,
}: {
  comment: Comment
  depth: number
  childrenOf: (parentId: string | null) => Comment[]
  replyTo: string | null
  setReplyTo: (id: string | null) => void
  submitComment: (name: string, email: string, body: string, parentId: string | null) => Promise<{ ok: boolean; error?: string }>
}) {
  const kids = childrenOf(comment.id)
  const avatarSize = depth === 0 ? 40 : 32

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{
          width: `${avatarSize}px`, height: `${avatarSize}px`, borderRadius: '50%', flexShrink: 0,
          background: comment.is_owner_reply ? 'var(--gold)' : `hsl(${comment.author_name.charCodeAt(0) * 13 % 360},42%,52%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
          fontSize: depth === 0 ? '0.75rem' : '0.65rem', fontWeight: 600, fontFamily: '"Inter", sans-serif',
        }}>
          {getInitials(comment.author_name)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: depth === 0 ? '0.88rem' : '0.82rem', color: 'var(--ink)' }}>
              {comment.author_name}
            </span>
            {comment.is_owner_reply && (
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'white', background: 'var(--gold)', padding: '0.12rem 0.5rem', borderRadius: '2px' }}>
                Randy
              </span>
            )}
            <span style={{ fontSize: '0.75rem', color: '#aaa', fontFamily: '"Inter", sans-serif' }}>{formatDate(comment.created_at)}</span>
          </div>
          <p style={{ lineHeight: 1.8, color: '#3a3a3a', fontSize: depth === 0 ? '0.93rem' : '0.88rem', marginBottom: '0.5rem' }}>{comment.body}</p>
          <button onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', padding: 0, letterSpacing: '0.06em' }}>
            {replyTo === comment.id ? 'Cancel reply' : '↩ Reply'}
          </button>

          {replyTo === comment.id && (
            <div style={{ marginTop: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--gold)' }}>
              <ReplyForm onSubmit={(n, e, b) => submitComment(n, e, b, comment.id)} />
            </div>
          )}
        </div>
      </div>

      {/* Descendants — indent grows with depth but is capped so deep threads don't run off-screen */}
      {kids.length > 0 && (
        <div style={{
          marginLeft: `clamp(${Math.min(depth + 1, 3) * 0.9}rem, ${Math.min(depth + 1, 3) * 3}vw, ${Math.min(depth + 1, 3) * 3.25}rem)`,
          marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem',
          borderLeft: '2px solid rgba(0,0,0,0.07)', paddingLeft: '1.25rem',
        }}>
          {kids.map(k => (
            <CommentThread
              key={k.id}
              comment={k}
              depth={depth + 1}
              childrenOf={childrenOf}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              submitComment={submitComment}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ReplyForm({ onSubmit }: { onSubmit: (name: string, email: string, body: string) => Promise<{ ok: boolean; error?: string }> }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!name.trim() || !body.trim()) { setError('Name and comment are required.'); return }
    setSubmitting(true)
    const result = await onSubmit(name, email, body)
    setSubmitting(false)
    if (!result.ok) { setError(result.error || 'Failed to submit.'); return }
    setName(''); setEmail(''); setBody('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name *" style={inputStyle} maxLength={80} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email (optional, not shown)" type="email" style={inputStyle} maxLength={120} />
      </div>
      <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write your comment..." rows={4}
        style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} maxLength={2000} />
      {error && <p style={{ color: '#c0392b', fontSize: '0.82rem', fontFamily: '"Inter", sans-serif' }}>{error}</p>}
      <button onClick={handleSubmit} disabled={submitting} style={{
        alignSelf: 'flex-start', padding: '0.8rem 2rem', background: submitting ? '#888' : 'var(--gold)',
        color: 'white', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
        fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
        fontFamily: '"Inter", sans-serif', fontWeight: 500, borderRadius: '2px',
      }}>
        {submitting ? 'Posting…' : 'Post Comment'}
      </button>
    </div>
  )
}
