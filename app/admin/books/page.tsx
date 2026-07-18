'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../layout'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import Modal from '@/components/ui/Modal'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Book } from '@/types/database'

type Quote = { quote: string; attribution: string }

const EMPTY: Partial<Book> = {
  title: '', slug: '', year: '', subtitle: '',
  description: '', cover_image: '', buy_url: '',
  order_index: 0, quotes: [],
}

const fieldStyle: React.CSSProperties = {
  width: '100%', padding: '0.6rem 0.85rem', background: '#222',
  border: '1px solid rgba(255,255,255,0.1)', color: 'white',
  fontSize: '0.83rem', borderRadius: '2px', outline: 'none', boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.62rem', color: 'rgba(15,92,115,0.7)',
  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem',
}

export default function AdminBooks() {
  const { token } = useAdmin()
  const authFetch = useAuthFetch()

  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Book> | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authFetch('/api/admin/books')
      if (!res.ok) { setLoading(false); return }
      const data = await res.json()
      setBooks(Array.isArray(data) ? data : [])
    } catch {
      showToast('Could not load books.')
    }
    setLoading(false)
  }, [authFetch])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const isNew = !editing.id
    const url = isNew ? '/api/admin/books' : `/api/admin/books/${editing.id}`
    const method = isNew ? 'POST' : 'PUT'
    const slug = editing.slug?.trim() ||
      (editing.title || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
    const payload = { ...editing, slug }
    try {
      const res = await authFetch(url, { method, body: JSON.stringify(payload) })
      const d = await res.json()
      if (res.ok) { setEditing(null); load(); showToast(isNew ? 'Book created.' : 'Book saved.') }
      else showToast(d.error || 'Save failed.')
    } catch { showToast('Save failed.') }
    setSaving(false)
  }

  const del = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await authFetch(`/api/admin/books/${id}`, { method: 'DELETE' })
      showToast('Book deleted.')
      load()
    } catch { showToast('Delete failed.') }
  }

  // Quote helpers
  const addQuote = () => {
    setEditing(v => ({
      ...v,
      quotes: [...(v?.quotes || []), { quote: '', attribution: '' }],
    }))
  }

  const updateQuote = (i: number, field: keyof Quote, value: string) => {
    setEditing(v => {
      const quotes = [...(v?.quotes || [])]
      quotes[i] = { ...quotes[i], [field]: value }
      return { ...v, quotes }
    })
  }

  const removeQuote = (i: number) => {
    setEditing(v => ({
      ...v,
      quotes: (v?.quotes || []).filter((_, idx) => idx !== i),
    }))
  }

  return (
    <div style={{ padding: '2.5rem' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem',
          background: '#0f5c73', color: 'white', padding: '0.85rem 1.5rem',
          zIndex: 600, fontSize: '0.85rem', borderRadius: '2px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}>
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.25rem' }}>Books</h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{books.length} book{books.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          style={{ padding: '0.65rem 1.4rem', background: '#0f5c73', color: 'white', border: 'none', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}
        >
          + Add Book
        </button>
      </div>

      {/* TABLE */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Loading…</p>
        ) : books.length === 0 ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
            No books in the database yet. Click "+ Add Book" to add one, or run the seed SQL first.
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Cover', 'Title', 'Year', 'Quotes', 'Order', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(15,92,115,0.6)', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {/* COVER THUMBNAIL */}
                  <td style={{ padding: '0.75rem 1rem', width: '60px' }}>
                    {book.cover_image ? (
                      <div style={{
                        width: '44px', height: '62px', background: '#2a2a2a',
                        borderRadius: '2px', overflow: 'hidden', lineHeight: 0,
                      }}>
                        <img
                          src={book.cover_image}
                          alt={book.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      </div>
                    ) : (
                      <div style={{ width: '44px', height: '62px', background: '#2a2a2a', borderRadius: '2px' }} />
                    )}
                  </td>

                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', maxWidth: '260px' }}>
                    <p style={{ fontFamily: '"Playfair Display", serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</p>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{book.slug}</p>
                  </td>

                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', color: 'rgba(15,92,115,0.7)', whiteSpace: 'nowrap' }}>{book.year}</td>

                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>
                    {(book.quotes?.length || 0)} quote{(book.quotes?.length || 0) !== 1 ? 's' : ''}
                  </td>

                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>{book.order_index}</td>

                  <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                    <button onClick={() => setEditing(book)} style={{ background: 'none', border: 'none', color: '#17798f', fontSize: '0.72rem', cursor: 'pointer', marginRight: '0.75rem' }}>Edit</button>
                    <button onClick={() => del(book.id, book.title)} style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)', fontSize: '0.72rem', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* EDIT / CREATE MODAL */}
      {editing && (
        <Modal
          open
          onClose={() => setEditing(null)}
          title={editing.id ? 'Edit Book' : 'Add Book'}
          maxWidth="680px"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

            {/* TITLE */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Title *</label>
              <input style={fieldStyle} value={editing.title ?? ''} onChange={(e) => setEditing(v => ({ ...v, title: e.target.value }))} placeholder="Book title" />
            </div>

            {/* SLUG */}
            <div>
              <label style={labelStyle}>Slug</label>
              <input style={fieldStyle} value={editing.slug ?? ''} onChange={(e) => setEditing(v => ({ ...v, slug: e.target.value }))} placeholder="auto-generated from title" />
            </div>

            {/* YEAR */}
            <div>
              <label style={labelStyle}>Year</label>
              <input style={fieldStyle} value={editing.year ?? ''} onChange={(e) => setEditing(v => ({ ...v, year: e.target.value }))} placeholder="e.g. 2022" />
            </div>

            {/* SUBTITLE */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Subtitle</label>
              <input style={fieldStyle} value={editing.subtitle ?? ''} onChange={(e) => setEditing(v => ({ ...v, subtitle: e.target.value }))} placeholder="Subtitle or tagline" />
            </div>

            {/* DESCRIPTION */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...fieldStyle, minHeight: '100px', resize: 'vertical' }} value={editing.description ?? ''} onChange={(e) => setEditing(v => ({ ...v, description: e.target.value }))} placeholder="Book description…" />
            </div>

            {/* COVER IMAGE — upload or paste URL */}
            <div style={{ gridColumn: '1/-1' }}>
              <ImageUpload
                value={editing.cover_image ?? ''}
                onChange={(url) => setEditing(v => ({ ...v, cover_image: url }))}
                bucket="article-images"
                label="Cover Image"
                token={token}
              />
            </div>

            {/* BUY URL */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Buy URL (Amazon)</label>
              <input style={fieldStyle} type="url" value={editing.buy_url ?? ''} onChange={(e) => setEditing(v => ({ ...v, buy_url: e.target.value }))} placeholder="https://amazon.com/…" />
            </div>

            {/* ORDER */}
            <div>
              <label style={labelStyle}>Display Order</label>
              <input style={fieldStyle} type="number" min={0} value={editing.order_index ?? 0} onChange={(e) => setEditing(v => ({ ...v, order_index: parseInt(e.target.value) || 0 }))} />
            </div>

            {/* AUTO-NOTIFY DELAY — only relevant on creation; scheduling is one-time per book */}
            {!editing.id && (
              <div>
                <label style={labelStyle}>Notify subscribers after (minutes)</label>
                <input style={fieldStyle} type="number" min={5} max={10080} value={(editing as any).send_delay_minutes ?? 30}
                  onChange={(e) => setEditing(v => ({ ...v, send_delay_minutes: parseInt(e.target.value) || 30 } as any))} />
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.35rem' }}>
                  Default 30. Range 5–10080 (7 days). Cancelled automatically if you delete this book first.
                </p>
              </div>
            )}
          </div>

          {/* QUOTES */}
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label style={labelStyle}>Press Quotes</label>
              <button
                type="button"
                onClick={addQuote}
                style={{ background: 'none', border: '1px solid rgba(15,92,115,0.4)', color: '#0f5c73', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 0.75rem', cursor: 'pointer', borderRadius: '2px' }}
              >
                + Add Quote
              </button>
            </div>
            {(editing.quotes || []).map((q, i) => (
              <div key={i} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px', padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ marginBottom: '0.6rem' }}>
                  <label style={{ ...labelStyle, color: 'rgba(255,255,255,0.25)' }}>Quote</label>
                  <textarea
                    style={{ ...fieldStyle, minHeight: '60px', resize: 'vertical' }}
                    value={q.quote}
                    onChange={(e) => updateQuote(i, 'quote', e.target.value)}
                    placeholder="Quote text…"
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ ...labelStyle, color: 'rgba(255,255,255,0.25)' }}>Attribution</label>
                    <input
                      style={fieldStyle}
                      value={q.attribution}
                      onChange={(e) => updateQuote(i, 'attribution', e.target.value)}
                      placeholder="e.g. The New York Times"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQuote(i)}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)', fontSize: '0.72rem', cursor: 'pointer', paddingBottom: '0.6rem', flexShrink: 0 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
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
              disabled={saving || !editing.title}
              style={{ padding: '0.65rem 1.5rem', background: '#0f5c73', color: 'white', border: 'none', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer', borderRadius: '2px', opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Saving…' : 'Save Book'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
