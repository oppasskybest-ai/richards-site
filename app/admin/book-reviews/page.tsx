'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import Modal from '@/components/ui/Modal'

interface BookReviewRow {
  id: string
  book_slug: string
  reviewer: string
  title: string | null
  country: string | null
  review_date: string | null
  body: string
  rating: number
  source: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

interface BookOption {
  id: string
  slug: string
  title: string
}

const EMPTY: Partial<BookReviewRow> = {
  book_slug: '', reviewer: '', title: '', country: '', review_date: '',
  body: '', rating: 5, source: 'reader', status: 'approved',
}

const fieldStyle: React.CSSProperties = {
  width: '100%', padding: '0.6rem 0.85rem', background: '#222',
  border: '1px solid rgba(255,255,255,0.1)', color: 'white',
  fontSize: '0.83rem', borderRadius: '2px', outline: 'none', boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.62rem', color: 'rgba(var(--gold-rgb),0.7)',
  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem',
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '1px' }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  )
}

export default function AdminBookReviews() {
  const authFetch = useAuthFetch()

  const [reviews, setReviews] = useState<BookReviewRow[]>([])
  const [books, setBooks] = useState<BookOption[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<BookReviewRow> | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [filterSlug, setFilterSlug] = useState('all')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500) }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [reviewsRes, booksRes] = await Promise.all([
        authFetch('/api/admin/book-reviews'),
        authFetch('/api/admin/books'),
      ])
      const reviewsData = reviewsRes.ok ? await reviewsRes.json() : []
      const booksData = booksRes.ok ? await booksRes.json() : []
      setReviews(Array.isArray(reviewsData) ? reviewsData : [])
      setBooks(Array.isArray(booksData) ? booksData.map((b: { id: string; slug: string; title: string }) => ({ id: b.id, slug: b.slug, title: b.title })) : [])
    } catch {
      showToast('Could not load reviews.')
    }
    setLoading(false)
  }, [authFetch])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const isNew = !editing.id
    const url = isNew ? '/api/admin/book-reviews' : `/api/admin/book-reviews/${editing.id}`
    const method = isNew ? 'POST' : 'PUT'
    try {
      const res = await authFetch(url, { method, body: JSON.stringify(editing) })
      const d = await res.json()
      if (res.ok) { setEditing(null); load(); showToast(isNew ? 'Review added.' : 'Review saved.') }
      else showToast(d.error || d.message || 'Save failed.')
    } catch { showToast('Save failed.') }
    setSaving(false)
  }

  const del = async (id: string, reviewer: string) => {
    if (!confirm(`Delete the review by "${reviewer}"? This cannot be undone.`)) return
    try {
      await authFetch(`/api/admin/book-reviews/${id}`, { method: 'DELETE' })
      showToast('Review deleted.')
      load()
    } catch { showToast('Delete failed.') }
  }

  const bookTitle = (slug: string) => books.find(b => b.slug === slug)?.title || slug

  const visible = filterSlug === 'all' ? reviews : reviews.filter(r => r.book_slug === filterSlug)

  return (
    <div style={{ padding: '2.5rem' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem',
          background: 'var(--gold)', color: 'white', padding: '0.85rem 1.5rem',
          zIndex: 600, fontSize: '0.85rem', borderRadius: '2px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}>
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.25rem' }}>Book Reviews</h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{reviews.length} reader review{reviews.length !== 1 ? 's' : ''} across all books</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          style={{ padding: '0.65rem 1.4rem', background: 'var(--gold)', color: 'white', border: 'none', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}
        >
          + Add Review
        </button>
      </div>
      <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', marginBottom: '1.75rem', maxWidth: '640px', lineHeight: 1.6 }}>
        These are quotes you&rsquo;ve gathered yourself (Amazon, Goodreads, email, etc) and want to
        feature on a book&rsquo;s page — there&rsquo;s no public submission form for this one, so
        anything you save here goes live immediately.
      </p>

      {/* FILTER BY BOOK */}
      {books.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <select
            value={filterSlug}
            onChange={(e) => setFilterSlug(e.target.value)}
            style={{ ...fieldStyle, width: 'auto', minWidth: '220px' }}
          >
            <option value="all">All books</option>
            {books.map(b => <option key={b.slug} value={b.slug}>{b.title}</option>)}
          </select>
        </div>
      )}

      {/* LIST */}
      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading…</p>
      ) : visible.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>No reviews yet. Click &ldquo;+ Add Review&rdquo; to add one.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {visible.map(r => (
            <div key={r.id} style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginRight: '0.6rem' }}>{r.reviewer}</span>
                  {r.country && <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>{r.country}</span>}
                </div>
                <span style={{ color: 'var(--gold-light)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{bookTitle(r.book_slug)}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                <Stars rating={r.rating} />
                {r.review_date && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>{r.review_date}</span>}
                {r.status !== 'approved' && (
                  <span style={{ color: '#e67e22', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.status} — not shown publicly</span>
                )}
              </div>

              {r.title && <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>{r.title}</p>}
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1rem' }}>{r.body}</p>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button onClick={() => setEditing(r)} style={{ padding: '0.45rem 1rem', background: 'rgba(var(--gold-rgb),0.1)', color: 'var(--gold-light)', border: '1px solid rgba(var(--gold-rgb),0.25)', borderRadius: '2px', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => del(r.id, r.reviewer)} style={{ padding: '0.45rem 1rem', background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT / CREATE MODAL */}
      {editing && (
        <Modal
          open
          onClose={() => setEditing(null)}
          title={editing.id ? 'Edit Review' : 'Add Review'}
          maxWidth="620px"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

            {/* BOOK */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Book *</label>
              <select
                style={fieldStyle}
                value={editing.book_slug ?? ''}
                onChange={(e) => setEditing(v => ({ ...v, book_slug: e.target.value }))}
              >
                <option value="">Select a book…</option>
                {books.map(b => <option key={b.slug} value={b.slug}>{b.title}</option>)}
              </select>
            </div>

            {/* REVIEWER */}
            <div>
              <label style={labelStyle}>Reviewer Name *</label>
              <input style={fieldStyle} value={editing.reviewer ?? ''} onChange={(e) => setEditing(v => ({ ...v, reviewer: e.target.value }))} placeholder="e.g. Jane D." />
            </div>

            {/* COUNTRY */}
            <div>
              <label style={labelStyle}>Country (optional)</label>
              <input style={fieldStyle} value={editing.country ?? ''} onChange={(e) => setEditing(v => ({ ...v, country: e.target.value }))} placeholder="e.g. United States" />
            </div>

            {/* REVIEW TITLE */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Review Title (optional)</label>
              <input style={fieldStyle} value={editing.title ?? ''} onChange={(e) => setEditing(v => ({ ...v, title: e.target.value }))} placeholder="Short headline, if the review had one" />
            </div>

            {/* BODY */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Review Text *</label>
              <textarea style={{ ...fieldStyle, minHeight: '110px', resize: 'vertical' }} value={editing.body ?? ''} onChange={(e) => setEditing(v => ({ ...v, body: e.target.value }))} placeholder="Paste the review text…" />
            </div>

            {/* RATING */}
            <div>
              <label style={labelStyle}>Rating</label>
              <select style={fieldStyle} value={editing.rating ?? 5} onChange={(e) => setEditing(v => ({ ...v, rating: parseInt(e.target.value) }))}>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} star{n !== 1 ? 's' : ''}</option>)}
              </select>
            </div>

            {/* DATE */}
            <div>
              <label style={labelStyle}>Review Date (optional)</label>
              <input style={fieldStyle} value={editing.review_date ?? ''} onChange={(e) => setEditing(v => ({ ...v, review_date: e.target.value }))} placeholder="e.g. March 2024" />
            </div>

            {/* SOURCE */}
            <div>
              <label style={labelStyle}>Source</label>
              <select style={fieldStyle} value={editing.source ?? 'reader'} onChange={(e) => setEditing(v => ({ ...v, source: e.target.value }))}>
                <option value="reader">Reader</option>
                <option value="amazon">Amazon</option>
                <option value="goodreads">Goodreads</option>
              </select>
            </div>

            {/* STATUS */}
            <div>
              <label style={labelStyle}>Status</label>
              <select style={fieldStyle} value={editing.status ?? 'approved'} onChange={(e) => setEditing(v => ({ ...v, status: e.target.value as BookReviewRow['status'] }))}>
                <option value="approved">Approved (shown on site)</option>
                <option value="pending">Pending (hidden)</option>
                <option value="rejected">Rejected (hidden)</option>
              </select>
            </div>

          </div>

          {/* ACTIONS */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setEditing(null)}
              style={{ padding: '0.65rem 1.25rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving || !editing.book_slug || !editing.reviewer || !editing.body}
              style={{ padding: '0.65rem 1.5rem', background: 'var(--gold)', color: 'white', border: 'none', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer', borderRadius: '2px', opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Saving…' : 'Save Review'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
