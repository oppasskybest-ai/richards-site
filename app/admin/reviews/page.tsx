'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'

interface ReviewRow {
  id: string
  quote: string
  name: string
  location: string | null
  rating: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '1px' }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  )
}

export default function AdminReviews() {
  const authFetch = useAuthFetch()
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await authFetch(`/api/admin/reviews?status=${tab}`)
      if (!res.ok) {
        if (res.status !== 401) setError('Failed to load reviews.')
        setReviews([])
        return
      }
      const d = await res.json()
      setReviews(d.data || [])
    } catch {
      setError('Network error loading reviews.')
    } finally {
      setLoading(false)
    }
  }, [tab, authFetch])

  useEffect(() => { load() }, [load])

  const moderate = async (id: string, status: 'approved' | 'rejected') => {
    const res = await authFetch(`/api/admin/reviews/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
    if (res.ok) load()
  }

  const del = async (id: string) => {
    if (!confirm('Permanently delete this review?')) return
    const res = await authFetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })
    if (res.ok) load()
  }

  const tabs: Array<{ key: typeof tab; label: string }> = [
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved (live on site)' },
    { key: 'rejected', label: 'Rejected' },
  ]

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.25rem' }}>Reviews</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Moderate reviews submitted from the homepage. Approved reviews appear publicly.</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
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
      ) : reviews.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>No {tab} reviews.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {reviews.map(r => (
            <div key={r.id} style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginRight: '0.6rem' }}>{r.name}</span>
                  {r.location && <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>{r.location}</span>}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{formatDate(r.created_at)}</span>
              </div>

              <div style={{ marginBottom: '0.6rem' }}><Stars rating={r.rating} /></div>

              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '1rem' }}>&ldquo;{r.quote}&rdquo;</p>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {tab !== 'approved' && (
                  <button onClick={() => moderate(r.id, 'approved')} style={{ padding: '0.45rem 1rem', background: 'rgba(46,204,113,0.15)', color: '#2ecc71', border: '1px solid rgba(46,204,113,0.3)', borderRadius: '2px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    Approve
                  </button>
                )}
                {tab !== 'rejected' && (
                  <button onClick={() => moderate(r.id, 'rejected')} style={{ padding: '0.45rem 1rem', background: 'rgba(231,76,60,0.12)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', borderRadius: '2px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    Reject
                  </button>
                )}
                <button onClick={() => del(r.id)} style={{ padding: '0.45rem 1rem', background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
