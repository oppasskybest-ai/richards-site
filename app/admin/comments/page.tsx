'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'

interface CommentRow {
  id: string
  article_id: string
  author_name: string
  author_email: string | null
  body: string
  status: 'pending' | 'approved' | 'rejected'
  is_owner_reply?: boolean
  created_at: string
  articles?: { title: string; category: string; slug: string }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminComments() {
  const authFetch = useAuthFetch()
  const [comments, setComments] = useState<CommentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('approved')
  const [error, setError] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyBody, setReplyBody] = useState('')
  const [replySending, setReplySending] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await authFetch(`/api/admin/comments?status=${tab}`)
      if (!res.ok) {
        if (res.status !== 401) setError('Failed to load comments.')
        setComments([])
        return
      }
      const d = await res.json()
      setComments(d.data || [])
    } catch {
      setError('Network error loading comments.')
    } finally {
      setLoading(false)
    }
  }, [tab, authFetch])

  useEffect(() => { load() }, [load])

  const moderate = async (id: string, status: 'approved' | 'rejected') => {
    const res = await authFetch(`/api/admin/comments/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
    if (res.ok) load()
  }

  const del = async (id: string) => {
    if (!confirm('Permanently delete this comment?')) return
    const res = await authFetch(`/api/admin/comments/${id}`, { method: 'DELETE' })
    if (res.ok) load()
  }

  const sendReply = async (comment: CommentRow) => {
    if (!replyBody.trim()) return
    setReplySending(true)
    try {
      const res = await authFetch('/api/admin/comments/reply', {
        method: 'POST',
        body: JSON.stringify({ article_id: comment.article_id, parent_id: comment.id, body: replyBody }),
      })
      if (res.ok) { setReplyingTo(null); setReplyBody(''); load() }
    } finally {
      setReplySending(false)
    }
  }

  const tabs: Array<{ key: typeof tab; label: string }> = [
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ]

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.25rem' }}>Comments</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
          Comments post live immediately — no approval needed. Delete anything
          you don&rsquo;t want up, or reply in-thread as yourself.
        </p>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: '0.55rem 1.1rem', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.1)',
            background: tab === t.key ? 'var(--gold)' : 'transparent',
            color: tab === t.key ? '#0d0d0d' : 'rgba(255,255,255,0.6)',
            fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', fontFamily: '"Inter", sans-serif',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: '3px', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', color: '#e74c3c', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading…</p>
      ) : comments.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>No {tab} comments.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {comments.map(c => (
            <div key={c.id} style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginRight: '0.6rem' }}>{c.author_name}</span>
                  {c.is_owner_reply && (
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0d0d0d', background: 'var(--gold)', padding: '0.12rem 0.5rem', borderRadius: '2px', marginRight: '0.6rem' }}>
                      Your reply
                    </span>
                  )}
                  {c.author_email && <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>{c.author_email}</span>}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{formatDate(c.created_at)}</span>
              </div>

              {c.articles && (
                <p style={{ fontSize: '0.75rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                  on &ldquo;{c.articles.title}&rdquo; ({c.articles.category})
                </p>
              )}

              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1rem' }}>{c.body}</p>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {!c.is_owner_reply && (
                  <button onClick={() => { setReplyingTo(replyingTo === c.id ? null : c.id); setReplyBody('') }} style={{ padding: '0.45rem 1rem', background: 'rgba(var(--gold-rgb),0.12)', color: 'var(--gold-light)', border: '1px solid rgba(var(--gold-rgb),0.3)', borderRadius: '2px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    {replyingTo === c.id ? 'Cancel' : 'Reply as yourself'}
                  </button>
                )}
                {tab !== 'approved' && (
                  <button onClick={() => moderate(c.id, 'approved')} style={{ padding: '0.45rem 1rem', background: 'rgba(46,204,113,0.15)', color: '#2ecc71', border: '1px solid rgba(46,204,113,0.3)', borderRadius: '2px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    Approve
                  </button>
                )}
                {tab !== 'rejected' && (
                  <button onClick={() => moderate(c.id, 'rejected')} style={{ padding: '0.45rem 1rem', background: 'rgba(231,76,60,0.12)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '2px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    Reject
                  </button>
                )}
                <button onClick={() => del(c.id)} style={{ padding: '0.45rem 1rem', background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>

              {replyingTo === c.id && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <textarea value={replyBody} onChange={(e) => setReplyBody(e.target.value)} placeholder="Write your reply — posts immediately, badged as yours…" rows={3}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '0.85rem', borderRadius: '2px', resize: 'vertical', boxSizing: 'border-box', marginBottom: '0.6rem' }} />
                  <button onClick={() => sendReply(c)} disabled={replySending || !replyBody.trim()}
                    style={{ padding: '0.5rem 1.2rem', background: 'var(--gold)', color: 'white', border: 'none', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px', opacity: replySending ? 0.6 : 1 }}>
                    {replySending ? 'Posting…' : 'Post Reply'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
